import React from 'react'
import { FadeLoader } from 'react-spinners'

export function LoadingSpinner() {
  return (
    <div className="h-screen fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <FadeLoader color="white" />
    </div>
  )
}
