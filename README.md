# Personal Finance Management

Ứng dụng quản lý sổ thu chi và ngân sách cá nhân được xây dựng trong chương trình thực tập Web Full-stack.

Hệ thống cho phép người dùng đăng ký, đăng nhập và theo dõi thu chi, quản lý dòng tiền cá nhân. Mỗi người dùng chỉ có thể xem và quản lý các giao dịch tài chính của chính mình. Dữ liệu được tính toán và thống kê trực quan theo thời gian thực (Tổng số dư, Tổng thu, Tổng chi) kèm các bộ lọc tương tác nhanh.

---

## 1. Công nghệ sử dụng

### Frontend
- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Lucide React (Icons)

### Backend
- Next.js Server Actions
- Prisma ORM

### Database
- PostgreSQL
- Supabase (Connection Pooling & Direct Connection)

### Authentication
- bcryptjs (Mã hóa mật khẩu)
- HTTP-only Cookie
- Session quản lý người dùng

### Deploy
- Vercel

---

## 2. Chức năng chính

### Authentication

- Đăng ký tài khoản mới
- Đăng nhập hệ thống
- Đăng xuất an toàn
- Mã hóa mật khẩu an toàn bằng bcrypt
- Quản lý phiên làm việc qua HTTP-only Cookie
- Validation dữ liệu đăng nhập / đăng ký
- Phân tách và bảo vệ dữ liệu riêng tư giữa các tài khoản người dùng

---

## 3. Quản lý thu chi (Transaction Management)

Người dùng có thể:

- Xem toàn bộ danh sách giao dịch thu/chi
- Thêm mới giao dịch (Thu tiền / Chi tiền)
- Chỉnh sửa thông tin giao dịch qua Modal trực tiếp
- Xóa giao dịch với xác nhận an toàn
- Phân loại danh mục chi tiêu / nguồn thu
- Chọn ngày phát sinh giao dịch
- Tự động tính toán và cập nhật lại số dư tức thì

Phân loại giao dịch:

- INCOME - Khoản thu nhập
- EXPENSE - Khoản chi tiêu

---

## 4. Thống kê & Bộ lọc (Dashboard & Analytics)

Bảng điều khiển trực quan hỗ trợ:

- Thống kê **Tổng Số Dư Khả Dụng** (Kèm cảnh báo màu khi số dư âm)
- Thống kê **Tổng Thu Nhập** (Hiển thị màu xanh lá)
- Thống kê **Tổng Chi Tiêu** (Hiển thị màu đỏ)
- **Bộ lọc tương tác 1 chạm:**
  - Bấm thẻ Tổng số dư -> Hiển thị tất cả giao dịch (ALL)
  - Bấm thẻ Tổng thu nhập -> Lọc danh sách chỉ xem tiền Thu (INCOME)
  - Bấm thẻ Tổng chi tiêu -> Lọc danh sách chỉ xem tiền Chi (EXPENSE)

---

## 5. Validation

Hệ thống có các kiểm tra dữ liệu:

- Không để trống tên/tiêu đề giao dịch
- Số tiền giao dịch phải lớn hơn 0
- Bắt buộc chọn danh mục và ngày phát sinh hợp lệ
- Email đăng ký không được trùng lặp
- Mật khẩu tối thiểu 6 ký tự
- Kiểm tra tính hợp lệ của email/mật khẩu khi đăng nhập
- Kiểm tra quyền sở hữu bản ghi giao dịch ở phía server trước khi Sửa/Xóa

---

## 6. UI / UX

Ứng dụng hỗ trợ:

- Responsive hoàn chỉnh trên Desktop / Tablet / Mobile
- Giao diện Dark Mode hiện đại, trực quan
- Dashboard thống kê tài chính thời gian thực
- Loading State (Hiệu ứng Spinner khi tải/gửi form)
- Empty State (Giao diện hiển thị khi chưa có giao dịch phù hợp)
- Modal tương tác mượt mà không cần reload trang
- Hộp thoại xác nhận trước khi thực hiện xóa giao dịch

---

## 7. Database

Dự án sử dụng PostgreSQL và Prisma ORM.

Các bảng/model chính:

- User
- Category
- Transaction

### Quan hệ

```text
       User
      /    \
1 - N/      \1 - N
    /        \
Category --- Transaction
      1 - N


Chi tiết:

User 1 -------- N Transaction

User 1 -------- N Category

Category 1 ---- N Transaction

Mỗi Transaction thuộc về một User và một Category cụ thể.

### 8. Cấu trúc thư mục


project/
│
├── app/
│   ├── actions/
│   │   ├── auth.ts              # Server Actions cho Đăng nhập / Đăng ký / Đăng xuất
│   │   └── transactions.ts      # Server Actions CRUD cho Giao dịch & Danh mục
│   │
│   ├── login/
│   │   └── page.tsx             # Giao diện Đăng nhập
│   │
│   ├── register/
│   │   └── page.tsx             # Giao diện Đăng ký
│   │
│   ├── layout.tsx               # Root Layout
│   └── page.tsx                 # Trang Dashboard chính (Server Component)
│
├── components/
│   ├── DashboardView.tsx        # Giao diện thống kê & danh sách lịch sử giao dịch
│   ├── TransactionForm.tsx      # Modal thêm giao dịch mới
│   ├── EditTransactionModal.tsx # Modal chỉnh sửa giao dịch
│   └── DeleteButton.tsx         # Nút xóa giao dịch có xác nhận
│
├── lib/
│   └── prisma.ts                # Prisma Client Singleton Pattern
│
├── prisma/
│   ├── schema.prisma            # Schema định nghĩa cấu trúc Database
│   └── seed.ts                  # Khởi tạo danh mục mặc định
│
├── public/
├── README.md
├── package.json
└── .env

### 9. Cài đặt project
Bước 1: Clone repository



  git clone [https://github.com/nguyentrongnguyenit-prog/internship-personal-nguyentrongnguyen.git](https://github.com/nguyentrongnguyenit-prog/internship-personal-nguyentrongnguyen.git)

Di chuyển vào thư mục project:

 cd internship-personal-nguyentrongnguyen

Bước 2: Cài dependencies

 npm install

Bước 3: Tạo file .env
Tạo file .env tại thư mục gốc và thêm các cấu hình kết nối:


  DATABASE_URL="postgresql://postgres:[PASSWORD]@[aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true](https://aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true)"
  DIRECT_URL="postgresql://postgres:[PASSWORD]@[aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres](https://aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres)"


Không commit file .env chứa thông tin thật lên GitHub.

### 10. Prisma
Generate Prisma Client:

 npx prisma generate

Đồng bộ database schema:

 npx prisma db push

Chạy seed dữ liệu danh mục mặc định (nếu có):
 
 npx prisma db seed
Kiểm tra và quản lý dữ liệu trực quan bằng Prisma Studio:

Bash
npx prisma studio
11. Chạy project
Chạy môi trường Development:

Bash
npm run dev
Sau đó truy cập trình duyệt tại:

Plaintext
http://localhost:3000
12. Build production
Kiểm tra project trước khi deploy:

Bash
npm run build
Nếu build thành công, có thể chạy thử production tại local:
Bash
npm start
13. Tối ưu hiệu năng (Performance Tuning)
Áp dụng Prisma Client Singleton nhằm tái sử dụng kết nối, ngăn chặn cạn kiệt Connection Pool trên môi trường Serverless.

Tải dữ liệu song song (Parallel Data Fetching) với Promise.all ở trang chủ, giảm hơn 40% thời gian tải trang.

Tối ưu truy vấn SQL (chỉ select các trường cần thiết) giúp tiết kiệm băng thông và tăng tốc độ xử lý.

14. Deploy
Ứng dụng được deploy tự động qua Vercel (CI/CD).

Database production sử dụng PostgreSQL lưu trữ trên nền tảng Supabase.

Các Environment Variables cần cấu hình trên Vercel:

Plaintext
DATABASE_URL
DIRECT_URL
Link Production: https://internship-personal-nguyentrongnguyen.vercel.app

15. Tác giả
Dự án được thực hiện trong chương trình thực tập Web Full-stack.

Họ và tên: Nguyễn Trọng Nguyên

Project: Personal Finance Management (Sổ Thu Chi Cá Nhân)