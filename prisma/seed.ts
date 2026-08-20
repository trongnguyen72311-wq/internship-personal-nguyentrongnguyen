import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Tạo 1 User mẫu
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      id: 'demo-user-id',
      email: 'demo@example.com',
      name: 'Nguyễn Trọng Nguyên',
      password: 'demopassword123',
    },
  })

  // 2. Tạo các Danh mục mặc định
  const categories = [
    { name: 'Ăn uống', type: 'EXPENSE', icon: 'Utensils' },
    { name: 'Mua sắm', type: 'EXPENSE', icon: 'ShoppingBag' },
    { name: 'Đi lại', type: 'EXPENSE', icon: 'Car' },
    { name: 'Hóa đơn', type: 'EXPENSE', icon: 'Receipt' },
    { name: 'Lương', type: 'INCOME', icon: 'Briefcase' },
    { name: 'Thưởng', type: 'INCOME', icon: 'Award' },
  ]

  for (const cat of categories) {
    const existing = await prisma.category.findFirst({
      where: { name: cat.name },
    })

    if (!existing) {
      await prisma.category.create({
        data: {
          name: cat.name,
          type: cat.type as 'INCOME' | 'EXPENSE',
          icon: cat.icon,
        },
      })
    }
  }

  console.log('✅ Seed dữ liệu mẫu thành công!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })