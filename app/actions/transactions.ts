'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// 1. Lấy danh sách giao dịch
export async function getTransactions(userId?: string) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: userId ? { userId } : {},
      include: { category: true },
      orderBy: { date: 'desc' },
    })
    return { success: true, data: transactions }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách giao dịch:', error)
    return { success: false, error: 'Không thể tải dữ liệu giao dịch' }
  }
}

// 2. Lấy danh sách danh mục (Categories)
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

// 3. Thêm giao dịch mới
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

    revalidatePath('/')
    revalidatePath('/dashboard')
    return { success: true, data: transaction }
  } catch (error) {
    console.error('Lỗi khi tạo giao dịch:', error)
    return { success: false, error: 'Không thể tạo giao dịch' }
  }
}

// 4. Cập nhật / Chỉnh sửa giao dịch
export async function updateTransaction(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const amount = parseFloat(formData.get('amount') as string)
  const type = formData.get('type') as 'INCOME' | 'EXPENSE'
  const categoryId = formData.get('categoryId') as string
  const dateStr = formData.get('date') as string
  const note = (formData.get('note') as string) || undefined

  if (!id || !title || isNaN(amount) || !type || !categoryId) {
    return { success: false, error: 'Vui lòng nhập đầy đủ thông tin bắt buộc' }
  }

  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        title,
        amount,
        type,
        categoryId,
        date: dateStr ? new Date(dateStr) : new Date(),
        note,
      },
    })

    revalidatePath('/')
    revalidatePath('/dashboard')
    return { success: true, data: updatedTransaction }
  } catch (error) {
    console.error('Lỗi khi cập nhật giao dịch:', error)
    return { success: false, error: 'Không thể cập nhật giao dịch' }
  }
}

// 5. Xóa giao dịch
export async function deleteTransaction(id: string) {
  if (!id) {
    return { success: false, error: 'Thiếu ID giao dịch cần xóa' }
  }

  try {
    await prisma.transaction.delete({
      where: { id },
    })

    revalidatePath('/')
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Lỗi khi xóa giao dịch:', error)
    return { success: false, error: 'Không thể xóa giao dịch' }
  }
}