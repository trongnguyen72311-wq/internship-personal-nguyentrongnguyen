import { getTransactions, getCategories } from '@/app/actions/transactions'
import { getCurrentUser, logout } from '@/app/actions/auth'
import TransactionForm from '@/components/TransactionForm'
import DeleteButton from '@/components/DeleteButton'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const user = await getCurrentUser()

  // Nếu chưa đăng nhập thì tự động chuyển sang trang Login
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
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header & User Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Quản Lý Thu Chi Cá Nhân
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Xin chào, <span className="font-semibold text-slate-700 dark:text-slate-300">{user.name || user.email}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <TransactionForm categories={categories} userId={user.id} />
            <form action={logout}>
              <button
                type="submit"
                className="px-3.5 py-2 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition"
              >
                Đăng Xuất
              </button>
            </form>
          </div>
        </div>

        {/* Thống kê Tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng số dư</span>
            <p className={`text-2xl font-bold mt-2 ${balance >= 0 ? 'text-slate-800 dark:text-white' : 'text-rose-600'}`}>
              {balance.toLocaleString('vi-VN')} đ
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Tổng Thu</span>
            <p className="text-2xl font-bold text-emerald-600 mt-2">
              +{totalIncome.toLocaleString('vi-VN')} đ
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">Tổng Chi</span>
            <p className="text-2xl font-bold text-rose-500 mt-2">
              -{totalExpense.toLocaleString('vi-VN')} đ
            </p>
          </div>
        </div>

        {/* Danh sách Giao dịch */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-semibold text-slate-800 dark:text-white">Lịch sử giao dịch</h2>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {transactions.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                Chưa có giao dịch nào. Bấm nút "+ Thêm Giao Dịch" để bắt đầu ghi chép.
              </div>
            ) : (
              transactions.map((t) => (
                <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      t.type === 'INCOME' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {t.type === 'INCOME' ? '↓' : '↑'}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{t.title}</p>
                      <p className="text-xs text-slate-400">
                        {t.category?.name || 'Khác'} • {new Date(t.date).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`font-bold ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {t.type === 'INCOME' ? '+' : '-'}{t.amount.toLocaleString('vi-VN')} đ
                    </span>
                    <DeleteButton id={t.id} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  )
}