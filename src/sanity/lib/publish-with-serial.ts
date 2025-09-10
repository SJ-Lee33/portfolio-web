import {
  useClient,
  useDocumentOperation,
  type DocumentActionComponent,
} from 'sanity'
import { apiVersion } from '../env'
/**
 * Publish 액션을 감싸서:
 * 1) study 문서에서 serial이 비어있으면,
 * 2) 카운터 문서(serialCounter:study)의 last를 +1(트랜잭션)하고,
 * 3) 증가된 값을 현재 드래프트의 serial에 세팅한 뒤,
 * 4) 원래 Publish를 이어서 실행합니다.
 */

export function PublishWithSerialActionAtStudy(props: any) {
  if (props.type !== 'study') return null

  const client = useClient({ apiVersion: apiVersion })
  const { publish } = useDocumentOperation(props.id, props.type)

  return {
    label: 'Publish',
    disabled: publish.disabled,
    onHandle: async () => {
      try {
        const draft = props.draft
        const published = props.published

        const myDraftId = draft?._id || `drafts.${props.id}`

        // 현재 serial (draft 우선, 없으면 published)
        const currentSerial = (draft?.serial ?? published?.serial) as unknown

        // === 1) 중복 여부 판정 (number/string 모두 대조) ===
        let needsNewSerial = false
        if (currentSerial == null) {
          needsNewSerial = true
        } else {
          // 숫자/문자열 케이스 모두 매칭
          const sNum =
            typeof currentSerial === 'number'
              ? currentSerial
              : Number(String(currentSerial).trim())
          const sStr = String(currentSerial).trim()

          // 숫자 변환이 실패했을 수도 있으니 두 축 모두 비교
          const dupCount: number = await client.fetch(
            `
              count(*[
                _type == "study" &&
                defined(serial) &&
                (
                  serial == $sNum ||
                  string(serial) == $sStr
                ) &&
                !(_id in [$draftId, $pubId])
              ])
            `,
            { sNum, sStr, draftId: myDraftId, pubId: props.id },
          )

          if (dupCount > 0) needsNewSerial = true
        }

        // === 2) 새 serial 발급이 필요하면 카운터 +1 후 number로 세팅 ===
        if (needsNewSerial) {
          const counterId = 'serialCounter-study'
          await client
            .transaction()
            .createIfNotExists({
              _id: counterId,
              _type: 'serialCounter',
              scope: 'study',
              last: 0,
            })
            .patch(counterId, (p) =>
              p.setIfMissing({ last: 0 }).inc({ last: 1 }),
            )
            .commit()

          const counterDoc = await client.getDocument<{
            _id: string
            last: number
          }>(counterId)
          const next = counterDoc?.last
          if (typeof next !== 'number' || !Number.isFinite(next)) {
            throw new Error('Counter update failed')
          }
          if (next > 999_999) {
            throw new Error('Serial exceeds 6 digits (> 999999)')
          }

          // 항상 number로 저장
          await client
            .patch(myDraftId)
            .set({ serial: next })
            .commit({ autoGenerateArrayKeys: true })
        }

        // === 3) 발행 ===
        publish.execute()
        props.onComplete?.()
      } catch (e) {
        console.error(e)
        props.onComplete?.() // 실패 시에도 액션 종료는 보장
      }
    },
  }
}
