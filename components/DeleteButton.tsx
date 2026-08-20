'use client'

import { useTransition } from 'react'
import { deleteTransaction } from '@/app/actions/transactions'

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (confirm('Bạn có chắc muốn xóa giao dịch này?')) {
          startTransition(async () => {
            await deleteTransaction(id)
          })
        }
      }}
      className="text-xs px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded border border-rose-200 transition disabled:opacity-50"
    >
      {isPending ? 'Đang xóa...' : 'Xóa'}
    </button>
  )
}