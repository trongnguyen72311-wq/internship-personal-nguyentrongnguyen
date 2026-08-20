import { getTransactions, getCategories } from '@/app/actions/transactions'
import { getCurrentUser, logout } from '@/app/actions/auth'
import TransactionForm from '@/components/TransactionForm'
import DeleteButton from '@/components/DeleteButton'
import { redirect } from 'next/navigation'
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  LogOut, 
  CreditCard,
  Calendar,
  Tag,
  ReceiptText,
  User as UserIcon
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const [transRes, catRes] = await Promise.all([
    getTransactions(user.id),
    getCategories(),
  ])

  const transactions = transRes.data || []
  const categories = catRes.data || []

  // Tính toán
  const totalIncome = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((acc, curr) => acc + curr.amount, 0)

  const totalExpense = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((acc, curr) => acc + curr.amount, 0)

  const balance = totalIncome - totalExpense

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* 1. TOP HEADER: Tiêu đề bên trái - User & Logout bên phải */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl shadow-slate-950/40">
          
          {/* Bên trái: Tiêu đề & Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl shadow-md shadow-indigo-500/30">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Sổ Thu Chi Cá Nhân
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Quản lý ngân sách & theo dõi chi tiêu
              </p>
            </div>
          </div>

          {/* Bên phải: Thông tin User & Nút Đăng xuất */}
          <div className="flex items-center gap-3 self-end sm:self-auto bg-slate-950/60 border border-slate-800/80 px-3.5 py-1.5 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <UserIcon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-200">
                {user.name || user.email}
              </span>
            </div>

            <div className="h-4 w-px bg-slate-800" />

            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-rose-400 transition"
                title="Đăng xuất"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Đăng Xuất</span>
              </button>
            </form>
          </div>
        </header>

        {/* 2. ACTION BAR: Nút thêm giao dịch nằm riêng biệt ngay dưới Header */}
        <section className="flex items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-slate-800/60">
          <div>
            <h2 className="text-sm font-semibold text-slate-200">Bảng điều khiển tài chính</h2>
            <p className="text-xs text-slate-400">Xem biến động số dư và ghi chép chi tiêu mới</p>
          </div>
          <TransactionForm categories={categories} userId={user.id} />
        </section>

        {/* 3. THỐNG KÊ: Tổng số dư, Tổng Thu, Tổng Chi */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Tổng số dư */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 p-6 rounded-2xl border border-indigo-500/20 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider">Tổng Số Dư</span>
              <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <p className={`text-3xl font-extrabold mt-3 tracking-tight ${balance >= 0 ? 'text-white' : 'text-rose-400'}`}>
              {balance.toLocaleString('vi-VN')} <span className="text-xs font-normal text-slate-400">VNĐ</span>
            </p>
          </div>

          {/* Tổng Thu */}
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Tổng Thu Nhập</span>
              <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
                <ArrowDownLeft className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold mt-3 text-emerald-400 tracking-tight">
              +{totalIncome.toLocaleString('vi-VN')} <span className="text-xs font-normal text-emerald-500/80">VNĐ</span>
            </p>
          </div>

          {/* Tổng Chi */}
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-rose-400 uppercase tracking-wider">Tổng Chi Tiêu</span>
              <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20 text-rose-400">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold mt-3 text-rose-400 tracking-tight">
              -{totalExpense.toLocaleString('vi-VN')} <span className="text-xs font-normal text-rose-500/80">VNĐ</span>
            </p>
          </div>

        </section>

        {/* 4. LỊCH SỬ GIAO DỊCH: Bảng danh sách chi tiết */}
        <section className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-xl overflow-hidden backdrop-blur-md">
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ReceiptText className="w-4 h-4 text-indigo-400" />
              <h2 className="font-semibold text-white text-sm">Lịch sử giao dịch</h2>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {transactions.length} giao dịch
            </span>
          </div>

          <div className="divide-y divide-slate-800/50">
            {transactions.length === 0 ? (
              <div className="py-16 text-center text-slate-500 space-y-2">
                <ReceiptText className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-sm">Chưa có giao dịch nào được ghi nhận</p>
              </div>
            ) : (
              transactions.map((t) => (
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
    </main>
  )
}