# 💰 Quản Lý Thu Chi Cá Nhân (Personal Finance Management)

> Dự án cá nhân trong chương trình thực tập tại **Kyanon Digital**.

---

## 📌 Thông Tin Sinh Viên Thực Tập

* **Họ và tên:** Nguyễn Trọng Nguyễn
* **Mã số sinh viên (MSSV):** 2411020013
* **Nhóm thực tập:** Nhóm 2
* **Đơn vị thực tập:** Kyanon Digital
* **GitHub Repository:** [internship-personal-nguyentrongnguyen](https://github.com/trongnguyen72311-wq/internship-personal-nguyentrongnguyen)
* **Demo Deployment (Vercel):** [https://internship-personal-nguyentrongnguyen.vercel.app](https://internship-personal-nguyentrongnguyen.vercel.app)

---

## 🚀 Giới Thiệu Dự Án

**Quản Lý Thu Chi Cá Nhân** là ứng dụng web hiện đại giúp người dùng theo dõi thu - chi hằng ngày, quản lý danh mục tài chính và phân tích dòng tiền cá nhân trực quan, tức thì.

### ✨ Tính Năng Chính
* 📊 **Tổng quan tài chính:** Hiển thị tự động Số dư hiện tại, Tổng thu nhập và Tổng chi tiêu.
* 📝 **Quản lý giao dịch:** Thêm, sửa, xóa, và phân loại các khoản thu chi.
* 🏷️ **Phân loại danh mục:** Quản lý danh mục linh hoạt (Ăn uống, Tiền điện, Lương, Thưởng...).
* 🔍 **Tìm kiếm & Bộ lọc:** Lọc theo loại (Thu/Chi) và mốc thời gian.
* 📱 **Responsive Design:** Giao diện tối ưu hoàn hảo trên Desktop, Tablet và Mobile.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Frontend:** [Next.js 16](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/).
* **Backend:** Next.js Server Actions / API Routes.
* **Database & ORM:** [Prisma ORM](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/) (Supabase).
* **Deployment & CI/CD:** [Vercel](https://vercel.com/), [GitHub](https://github.com/).

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
internship-personal-nguyentrongnguyen/
├── app/                  # Next.js App Router (Giao diện & Trang)
│   ├── favicon.ico
│   ├── globals.css       # Cấu hình Tailwind CSS
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Dashboard chính của ứng dụng
├── docs/                 # Tài liệu thiết kế hệ thống
│   ├── requirements.md   # Đặc tả yêu cầu phần mềm
│   ├── wireframe.md      # Thiết kế giao diện & UI layout
│   └── erd.md            # Sơ đồ CSDL & Schema
├── lib/                  # Tiện ích dùng chung & Mock data
│   └── mock-data.ts      # Dữ liệu mẫu ban đầu
├── prisma/               # Cấu hình Database & Schema ORM
│   └── schema.prisma     # Định nghĩa model Prisma
├── public/               # Static assets (hình ảnh, icons)
├── reports/              # Báo cáo thực tập theo tuần
│   ├── week-01.md        # Báo cáo tiến độ Tuần 1
│   └── slide-w1.md       # Nội dung Slide báo cáo Tuần 1
├── package.json          # Dependencies & Scripts
├── tsconfig.json         # Cấu hình TypeScript
└── README.md             # Tài liệu tổng quan dự án