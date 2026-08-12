import { mockTransactions } from '@/lib/mock-data';

export default function HomePage() {
  const totalIncome = mockTransactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = mockTransactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="border-b pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Quản Lý Thu Chi Cá Nhân
          </h1>
          <p className="text-gray-500 text-sm">Dự án cá nhân - Kyanon Internship 2026</p>
        </header>

        {/* Tổng quan tài chính */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Tổng Thu</p>
            <p className="text-xl font-bold text-green-600">
              +{totalIncome.toLocaleString('vi-VN')} đ
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Tổng Chi</p>
            <p className="text-xl font-bold text-red-600">
              -{totalExpense.toLocaleString('vi-VN')} đ
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Số Dư</p>
            <p className="text-xl font-bold text-blue-600">
              {(totalIncome - totalExpense).toLocaleString('vi-VN')} đ
            </p>
          </div>
        </div>

        {/* Danh sách giao dịch */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Lịch Sử Giao Dịch
          </h2>
          <div className="space-y-3">
            {mockTransactions.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-50 hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400">
                    {item.category} • {item.date}
                  </p>
                </div>
                <span
                  className={`font-semibold ${
                    item.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.type === 'INCOME' ? '+' : '-'}
                  {item.amount.toLocaleString('vi-VN')} đ
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}