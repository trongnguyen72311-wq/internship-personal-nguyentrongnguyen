# YÊU CẦU HỆ THỐNG SỔ THU CHI CÁ NHÂN

## 1. Mục tiêu

Xây dựng ứng dụng web quản lý tài chính cá nhân giúp người dùng ghi chép, theo dõi, cập nhật, phân loại và quản lý các khoản thu chi, dòng tiền hằng ngày.

## 2. Đối tượng sử dụng

Người dùng cá nhân có nhu cầu quản lý ngân sách, kiểm soát chi tiêu và theo dõi số dư thu chi hằng ngày.

## 3. Chức năng chính

### 3.1. Xem danh sách giao dịch

Người dùng có thể xem danh sách toàn bộ các giao dịch thu/chi đã được lưu trong hệ thống.

Mỗi giao dịch hiển thị:

- Tiêu đề (Tên khoản thu/chi)
- Số tiền (Amount)
- Loại giao dịch (Thu nhập / Chi tiêu)
- Danh mục phân loại
- Ngày phát sinh giao dịch

### 3.2. Thêm giao dịch

Người dùng có thể tạo một giao dịch mới vào sổ thu chi.

Thông tin gồm:

- Tiêu đề
- Số tiền
- Loại giao dịch (`INCOME` - Thu nhập hoặc `EXPENSE` - Chi tiêu)
- Danh mục
- Ngày giao dịch

### 3.3. Sửa giao dịch

Người dùng có thể cập nhật lại thông tin giao dịch trực tiếp qua Modal:

- Tiêu đề
- Số tiền
- Loại giao dịch
- Danh mục
- Ngày giao dịch

### 3.4. Xóa giao dịch

Người dùng có thể xóa giao dịch không còn chính xác kèm hộp thoại xác nhận an toàn và tự động tính toán lại số dư ngay lập tức.

### 3.5. Bảng điều khiển & Thống kê (Dashboard)

Hệ thống tự động tính toán theo thời gian thực:

- Tổng Số Dư = Tổng Thu Nhập - Tổng Chi Tiêu
- Tổng Thu Nhập
- Tổng Chi Tiêu

### 3.6. Lọc giao dịch

Người dùng có thể lọc nhanh danh sách giao dịch thông qua tương tác 1 chạm vào các thẻ thống kê:

- ALL - Xem tất cả giao dịch (Bấm thẻ Tổng số dư)
- INCOME - Chỉ xem các khoản Thu nhập (Bấm thẻ Tổng thu)
- EXPENSE - Chỉ xem các khoản Chi tiêu (Bấm thẻ Tổng chi)

## 4. Validation

Hệ thống cần kiểm tra dữ liệu trước khi lưu:

- Tiêu đề không được để trống.
- Tiêu đề phải có ít nhất 2 ký tự.
- Số tiền phải lớn hơn 0.
- Bắt buộc chọn loại giao dịch và danh mục hợp lệ.
- Ngày giao dịch không được để trống.

## 5. Trạng thái giao diện

Ứng dụng cần hỗ trợ:

- Loading state (Hiệu ứng Spinner khi tải trang hoặc gửi form)
- Empty state (Hiển thị khi chưa có giao dịch phù hợp)
- Error state (Thông báo lỗi khi thao tác thất bại)

Khi lọc danh sách không có dữ liệu phù hợp, hệ thống hiển thị thông báo:

`Chưa có giao dịch nào trong danh mục này.`

## 6. Responsive

Ứng dụng phải sử dụng được trên:

- Desktop
- Tablet
- Mobile

Giao diện Dark Mode hiện đại, tự động co giãn và không bị tràn ngang trên màn hình nhỏ.

## 7. Công nghệ

- Next.js 15 (App Router, Server Actions)
- TypeScript
- Tailwind CSS & Lucide React
- PostgreSQL
- Supabase (Connection Pooling)
- Prisma ORM
- bcryptjs (Mã hóa mật khẩu)
- Git/GitHub
- Vercel (CI/CD Deployment)

## 8. Cơ sở dữ liệu

Hệ thống sử dụng 3 bảng chính:

### User

Lưu thông tin tài khoản người dùng và mật khẩu đã mã hóa.

### Category

Lưu danh mục thu/chi (Ăn uống, Tiền lương, Mua sắm, Di chuyển,...).

### Transaction

Lưu thông tin chi tiết từng khoản giao dịch tài chính.

### Quan hệ:

- User 1 - N Transaction (Một người dùng có nhiều giao dịch)
- User 1 - N Category (Một người dùng có thể tạo/sở hữu các danh mục)
- Category 1 - N Transaction (Một danh mục chứa nhiều giao dịch)