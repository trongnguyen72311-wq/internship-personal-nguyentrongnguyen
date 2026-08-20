'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Lấy danh sách giao dịch
export async function getTransactions(userId?: string) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: userId ? { userId } : {},
      include: { category: true },
      orderBy: { date: 'desc' },
    })
    return { success: true, data: transactions }
  } catch (error) {
    console.error('Lỗi khi lấy giao dịch:', error)
    return { success: false, error: 'Không thể tải dữ liệu' }
  }
}

// Lấy danh sách danh mục (Category)
export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    })
    return { success: true, data: categories }
  } catch (error) {
    console.error('Lỗi khi lấy danh mục:', error)
    return { success: false, error: 'Không thể tải danh mục' }
  }
}

// Thêm giao dịch mới
export async function createTransaction(data: {
  title: string
  amount: number
  type: 'INCOME' | 'EXPENSE'
  date: Date
  note?: string
  categoryId: string
  userId: string
}) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        title: data.title,
        amount: data.amount,
        type: data.type,
        date: data.date,
        note: data.note,
        categoryId: data.categoryId,
        userId: data.userId,
      },
    })
    revalidatePath('/dashboard')
    return { success: true, data: transaction }
  } catch (error) {
    console.error('Lỗi khi tạo giao dịch:', error)
    return { success: false, error: 'Không thể tạo giao dịch' }
  }
}

// Xóa giao dịch
export async function deleteTransaction(id: string) {
  try {
    await prisma.transaction.delete({
      where: { id },
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Lỗi khi xóa giao dịch:', error)
    return { success: false, error: 'Không thể xóa giao dịch' }
  }
}