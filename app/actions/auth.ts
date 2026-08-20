'use server'

import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function register(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Vui lòng điền đầy đủ email và mật khẩu' }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: 'Email này đã được sử dụng' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name: name || 'Người dùng mới',
      email,
      password: hashedPassword,
    },
  })

  const cookieStore = await cookies()
  cookieStore.set('userId', user.id, { httpOnly: true, path: '/' })

  redirect('/')
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Vui lòng điền đầy đủ email và mật khẩu' }
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return { error: 'Tài khoản không tồn tại' }
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return { error: 'Mật khẩu không chính xác' }
  }

  const cookieStore = await cookies()
  cookieStore.set('userId', user.id, { httpOnly: true, path: '/' })

  redirect('/')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('userId')
  redirect('/login')
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value

  if (!userId) return null

  return await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true },
  })
}