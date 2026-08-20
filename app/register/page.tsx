'use client'

import { useState } from 'react'
import { register } from '@/app/actions/auth'
import Link from 'next/link'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const res = await register(formData)
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
            ✨
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Tạo Tài Khoản Mới</h1>
          <p className="text-sm text-slate-500 mt-1">Bắt đầu quản lý tài chính cá nhân</p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Họ và tên</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Nguyễn Văn A"
              className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="nguyen@example.com"
              className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Đang tạo...' : 'Đăng Ký'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Đăng nhập
          </Link>
        </p>
      </div>
    </main>
  )
}