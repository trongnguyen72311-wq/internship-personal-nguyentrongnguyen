'use client'

import { useState } from 'react'
import { createTransaction } from '@/app/actions/transactions'
import { Plus, X, ArrowDownLeft, ArrowUpRight } from 'lucide-react'

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
        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-indigo-600/30 active:scale-95"
      >
        <Plus className="w-4 h-4" />
        <span>Thêm Giao Dịch</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white">Thêm Giao Dịch Mới</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Toggle Loại tiền */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800/80">
              <button
                type="button"
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg font-medium text-xs transition ${
                  type === 'EXPENSE'
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                onClick={() => {
                  setType('EXPENSE')
                  setCategoryId('')
                }}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                Tiền Chi
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg font-medium text-xs transition ${
                  type === 'INCOME'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                onClick={() => {
                  setType('INCOME')
                  setCategoryId('')
                }}
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                Tiền Thu
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tên giao dịch</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Ăn trưa, Nhận lương..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 placeholder:opacity-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Số tiền (VNĐ)</label>
                <input
                  type="number"
                  required
                  min="1000"
                  placeholder="Ví dụ: 50000"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 placeholder:opacity-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Danh mục</label>
                <select
                  required
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="" className="text-slate-400">-- Chọn danh mục --</option>
                  {filteredCategories.map((c) => (
                    <option key={c.id} value={c.id} className="text-white bg-slate-900">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Ghi chú (tùy chọn)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Mua cho cả nhóm..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 placeholder:opacity-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-slate-800 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold disabled:opacity-50 transition shadow-lg shadow-indigo-600/30"
                >
                  {loading ? 'Đang lưu...' : 'Lưu Giao Dịch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}