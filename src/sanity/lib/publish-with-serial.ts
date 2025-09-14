import {
  useClient,
  useDocumentOperation,
  type DocumentActionComponent,
  type DocumentActionProps,
} from 'sanity'
import { apiVersion } from '../env'
/**
 * Publish 액션을 감싸서:
 * 1) study 문서에서 serial이 비어있으면,
 * 2) 카운터 문서(serialCounter:study)의 last를 +1(트랜잭션)하고,
 * 3) 증가된 값을 현재 드래프트의 serial에 세팅한 뒤,
 * 4) 원래 Publish를 이어서 실행합니다.
 */
type Props = {
  types: string[] // 시리얼 부여할 스키마 타입들
  max?: number // 최대 시리얼 값 (기본: 999_999)
  counterType?: string // 카운터 도큐먼트 스키마 타입 (기본: serialCounter)
}

export function createPublishWithSerialAction({
  types,
  max = 999_999,
  counterType = 'serialCounter',
}: Props): DocumentActionComponent {
  const PublishWithSerialAction = (props: DocumentActionProps): any => {
    if (!types.includes(props.type)) return null

    const client = useClient({ apiVersion: apiVersion })
    const { publish } = useDocumentOperation(props.id, props.type)

    return {
      label: 'Publish',
      disabled: publish.disabled,
      onHandle: async () => {
        try {
          const draft = props.draft as any | null
          const published = props.published as any | null
          const myDraftId = draft?._id || `drafts.${props.id}`
          const currentSerial = (draft?.serial ?? published?.serial) as unknown

          let needsNewSerial = false
          if (currentSerial == null) {
            needsNewSerial = true
          } else {
            const sNum =
              typeof currentSerial === 'number'
                ? currentSerial
                : Number(String(currentSerial).trim())
            const sStr = String(currentSerial).trim()

            const dupCount: number = await client.fetch(
              `
                count(*[
                  _type == $schemaType &&
                  defined(serial) &&
                  (
                    serial == $sNum ||
                    string(serial) == $sStr
                  ) &&
                  !(_id in [$draftId, $pubId])
                ])
              `,
              {
                schemaType: props.type,
                sNum,
                sStr,
                draftId: myDraftId,
                pubId: props.id,
              },
            )
            if (dupCount > 0) needsNewSerial = true
          }

          if (needsNewSerial) {
            const counterId = `serialCounter-${props.type}`
            await client
              .transaction()
              .createIfNotExists({
                _id: counterId,
                _type: counterType,
                scope: props.type,
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
            if (typeof next !== 'number' || !Number.isFinite(next))
              throw new Error('Counter update failed')
            if (next > max) throw new Error(`Serial exceeds max (${max})`)

            await client
              .patch(myDraftId)
              .set({ serial: next })
              .commit({ autoGenerateArrayKeys: true })
          }

          publish.execute()
          props.onComplete?.()
        } catch (e) {
          console.error(e)
          props.onComplete?.()
        }
      },
    }
  }

  return PublishWithSerialAction
}
