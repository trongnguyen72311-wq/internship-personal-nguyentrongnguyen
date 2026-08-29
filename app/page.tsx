import { getTransactions, getCategories } from '@/app/actions/transactions'
import { getCurrentUser, logout } from '@/app/actions/auth'
import TransactionForm from '@/components/TransactionForm'
import DashboardView from '@/components/DashboardView'
import { redirect } from 'next/navigation'
import { Wallet, LogOut, User as UserIcon } from 'lucide-react'

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

  // Tính toán số dư
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
        
        {/* 1. TOP HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl shadow-slate-950/40">
          
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

        {/* 2. ACTION BAR */}
        <section className="flex items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-slate-800/60">
          <div>
            <h2 className="text-sm font-semibold text-slate-200">Bảng điều khiển tài chính</h2>
            <p className="text-xs text-slate-400">Bấm vào từng thẻ Thống kê bên dưới để lọc nhanh danh sách</p>
          </div>
          <TransactionForm categories={categories} userId={user.id} />
        </section>

        {/* 3 & 4. THỐNG KÊ & LỊCH SỬ GIAO DỊCH (Đã thêm categories) */}
        <DashboardView 
          transactions={transactions}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          balance={balance}
          categories={categories}
        />

      </div>
    </main>
  )
}