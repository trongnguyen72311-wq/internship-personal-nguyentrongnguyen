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

  let success = false

  try {
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
    cookieStore.set('userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    success = true
  } catch (err) {
    console.error('Register error:', err)
    return { error: 'Lỗi kết nối cơ sở dữ liệu khi đăng ký' }
  }

  if (success) {
    redirect('/')
  }
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Vui lòng điền đầy đủ email và mật khẩu' }
  }

  let success = false

  try {
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
    cookieStore.set('userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    success = true
  } catch (err) {
    console.error('Login error:', err)
    return { error: 'Lỗi kết nối cơ sở dữ liệu khi đăng nhập' }
  }

  if (success) {
    redirect('/')
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('userId')
  redirect('/login')
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value

    if (!userId) return null

    return await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    })
  } catch (err) {
    console.error('Get user error:', err)
    return null
  }
}