# 📋 Yêu Cầu Hệ Thống (System Requirements)

**Dự án:** Quản Lý Thu Chi Cá Nhân  
**Tác giả:** Nguyễn Trọng Nguyễn  
**Công nghệ:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Prisma, PostgreSQL.

---

## 1. Mục Tiêu Dự Án
Ứng dụng giúp người dùng ghi chép, theo dõi các khoản thu - chi hằng ngày, tính toán tự động số dư và xem báo cáo tài chính một cách trực quan, rõ ràng.

---

## 2. Yêu Cầu Chức Năng (Functional Requirements)

### 2.1. Quản lý Giao dịch (Transactions)
* **Thêm giao dịch:** Người dùng có thể nhập giao dịch mới gồm: tiêu đề, số tiền, loại (Thu / Chi), danh mục và ngày thực hiện.
* **Xem danh sách giao dịch:** Hiển thị danh sách các khoản thu/chi theo thứ tự thời gian mới nhất.
* **Lọc & Tìm kiếm:** Lọc giao dịch theo loại (Thu/Chi), theo danh mục, hoặc theo khoảng thời gian (tháng/năm).
* **Sửa & Xóa giao dịch:** Cho phép chỉnh sửa thông tin hoặc xóa các giao dịch đã ghi chép.

### 2.2. Quản lý Danh mục (Categories)
* Danh mục chi tiêu mẫu: Ăn uống, Mua sắm, Đi lại, Nhà ở, Học tập, Giải trí.
* Danh mục thu nhập mẫu: Lương, Thưởng, Đầu tư, Thu nhập phụ.

### 2.3. Tổng quan & Thống kê Tài chính (Dashboard / Analytics)
* Tự động tính toán và hiển thị:
  * **Tổng Thu:** Tổng các khoản tiền thu vào.
  * **Tổng Chi:** Tổng các khoản chi tiêu.
  * **Số Dư Hiện Tại:** $\text{Số Dư} = \text{Tổng Thu} - \text{Tổng Chi}$.
* Biểu đồ trực quan hóa tỷ lệ chi tiêu theo danh mục.

---

## 3. Yêu Cầu Phi Chức Năng (Non-Functional Requirements)
* **Hiệu năng:** Tốc độ tải trang nhanh, thời gian phản hồi API dưới 500ms.
* **Giao diện (UI/UX):** Chuẩn Responsive, hiển thị tốt trên Desktop, Tablet và Điện thoại thông minh.
* **Bảo mật:** Xác thực dữ liệu đầu vào (Validation), bảo vệ dữ liệu người dùng.
* **Độ tin cậy:** Cơ sở dữ liệu toàn vẹn, không xảy ra sai lệch số dư trong các phép tính toán tài chính.