'use client'

import { useState } from 'react'
import { createTransaction } from '@/app/actions/transactions'

interface Category {
  id: string
  name: string
  type: 'INCOME' | 'EXPENSE'
}

export default function TransactionForm({
  categories,
  userId,
}: {
  categories: Category[]
  userId: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [note, setNote] = useState('')

  const filteredCategories = categories.filter((c) => c.type === type)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !amount || !categoryId) return alert('Vui lòng điền đủ thông tin')

    setLoading(true)
    const res = await createTransaction({
      title,
      amount: parseFloat(amount),
      type,
      date: new Date(),
      note,
      categoryId,
      userId,
    })
    setLoading(false)

    if (res.success) {
      setTitle('')
      setAmount('')
      setNote('')
      setIsOpen(false)
    } else {
      alert('Có lỗi xảy ra khi tạo giao dịch')
    }
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition shadow-sm"
      >
        + Thêm Giao Dịch
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
              Thêm Giao Dịch Mới
            </h2>

            <div className="grid grid-cols-2 gap-2 mb-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                type="button"
                className={`py-1.5 rounded-md font-semibold text-sm transition ${
                  type === 'EXPENSE'
                    ? 'bg-rose-500 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
                onClick={() => {
                  setType('EXPENSE')
                  setCategoryId('')
                }}
              >
                Tiền Chi
              </button>
              <button
                type="button"
                className={`py-1.5 rounded-md font-semibold text-sm transition ${
                  type === 'INCOME'
                    ? 'bg-emerald-500 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
                onClick={() => {
                  setType('INCOME')
                  setCategoryId('')
                }}
              >
                Tiền Thu
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Tên giao dịch
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Ăn trưa, Tiền lương..."
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Số tiền (VNĐ)
                </label>
                <input
                  type="number"
                  required
                  min="1000"
                  placeholder="50000"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Danh mục
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {filteredCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Ghi chú (tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="Ghi chú thêm..."
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50"
                >
                  {loading ? 'Đang lưu...' : 'Lưu giao dịch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}