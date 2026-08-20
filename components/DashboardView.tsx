'use client'

import { useState } from 'react'
import DeleteButton from '@/components/DeleteButton'
import { 
  CreditCard, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ReceiptText, 
  Tag, 
  Calendar,
  Filter
} from 'lucide-react'

interface Transaction {
  id: string
  title: string
  amount: number
  type: 'INCOME' | 'EXPENSE'
  date: Date | string
  category?: { name: string } | null
}

export default function DashboardView({
  transactions,
  totalIncome,
  totalExpense,
  balance,
}: {
  transactions: Transaction[]
  totalIncome: number
  totalExpense: number
  balance: number
}) {
  const [filterType, setFilterType] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL')

  const filteredTransactions = transactions.filter((t) => {
    if (filterType === 'ALL') return true
    return t.type === filterType
  })

  return (
    <div className="space-y-6">
      {/* 3. THỐNG KÊ (Bấm vào để xem danh sách tương ứng) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Tổng số dư -> Bấm vào để xem TẤT CẢ */}
        <div 
          onClick={() => setFilterType('ALL')}
          className={`cursor-pointer transition-all duration-200 p-6 rounded-2xl border shadow-lg ${
            filterType === 'ALL'
              ? 'bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border-indigo-500 ring-2 ring-indigo-500/30 scale-[1.02]'
              : 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900'
          }`}
          title="Bấm để xem tất cả giao dịch"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Tổng Số Dư</span>
              {filterType === 'ALL' && (
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-medium">
                  Đang xem
                </span>
              )}
            </div>
            <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className={`text-3xl font-extrabold mt-3 tracking-tight ${balance >= 0 ? 'text-white' : 'text-rose-400'}`}>
            {balance.toLocaleString('vi-VN')} <span className="text-xs font-normal text-slate-400">VNĐ</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-2">Bấm để xem toàn bộ giao dịch</p>
        </div>

        {/* Tổng Thu -> Bấm vào để chỉ xem TIỀN THU */}
        <div 
          onClick={() => setFilterType('INCOME')}
          className={`cursor-pointer transition-all duration-200 p-6 rounded-2xl border shadow-lg ${
            filterType === 'INCOME'
              ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/30 scale-[1.02]'
              : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900'
          }`}
          title="Bấm để lọc các khoản Thu"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Tổng Thu Nhập</span>
              {filterType === 'INCOME' && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-medium">
                  Đang lọc
                </span>
              )}
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold mt-3 text-emerald-400 tracking-tight">
            +{totalIncome.toLocaleString('vi-VN')} <span className="text-xs font-normal text-emerald-500/80">VNĐ</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-2">Bấm để chỉ xem tiền Thu</p>
        </div>

        {/* Tổng Chi -> Bấm vào để chỉ xem TIỀN CHI */}
        <div 
          onClick={() => setFilterType('EXPENSE')}
          className={`cursor-pointer transition-all duration-200 p-6 rounded-2xl border shadow-lg ${
            filterType === 'EXPENSE'
              ? 'bg-slate-900 border-rose-500 ring-2 ring-rose-500/30 scale-[1.02]'
              : 'bg-slate-900/80 border-slate-800 hover:border-rose-500/50 hover:bg-slate-900'
          }`}
          title="Bấm để lọc các khoản Chi"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Tổng Chi Tiêu</span>
              {filterType === 'EXPENSE' && (
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-medium">
                  Đang lọc
                </span>
              )}
            </div>
            <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20 text-rose-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold mt-3 text-rose-400 tracking-tight">
            -{totalExpense.toLocaleString('vi-VN')} <span className="text-xs font-normal text-rose-500/80">VNĐ</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-2">Bấm để chỉ xem tiền Chi</p>
        </div>

      </section>

      {/* 4. LỊCH SỬ GIAO DỊCH (Thay đổi theo thẻ được bấm) */}
      <section className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-xl overflow-hidden backdrop-blur-md">
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ReceiptText className="w-4 h-4 text-indigo-400" />
            <h2 className="font-semibold text-white text-sm">
              Lịch sử giao dịch 
              {filterType === 'INCOME' && ' (Chỉ tiền Thu)'}
              {filterType === 'EXPENSE' && ' (Chỉ tiền Chi)'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {filterType !== 'ALL' && (
              <button 
                onClick={() => setFilterType('ALL')}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 transition"
              >
                <Filter className="w-3 h-3" />
                <span>Hiển thị tất cả</span>
              </button>
            )}
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {filteredTransactions.length} giao dịch
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-800/50">
          {filteredTransactions.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-2">
              <ReceiptText className="w-10 h-10 mx-auto opacity-30" />
              <p className="text-sm">Không có giao dịch nào phù hợp</p>
            </div>
          ) : (
            filteredTransactions.map((t) => (
              <div 
                key={t.id} 
                className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition group"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base transition ${
                    t.type === 'INCOME' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105' 
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-105'
                  }`}>
                    {t.type === 'INCOME' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100 text-sm group-hover:text-indigo-300 transition">
                      {t.title}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-slate-500" />
                        {t.category?.name || 'Khác'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {new Date(t.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold tracking-wide ${
                    t.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {t.type === 'INCOME' ? '+' : '-'}{t.amount.toLocaleString('vi-VN')} đ
                  </span>
                  <DeleteButton id={t.id} />
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}