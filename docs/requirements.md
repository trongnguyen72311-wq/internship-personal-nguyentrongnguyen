# 📋 TÀI LIỆU ĐẶC TẢ YÊU CẦU DỰ ÁN (SOFTWARE REQUIREMENTS SPECIFICATION)

**Tên dự án:** Quản Lý Thu Chi Cá Nhân (Personal Finance Management)  
**Sinh viên thực hiện:** Nguyễn Trọng Nguyễn  
**MSSV:** 2411020013  
**Đơn vị thực tập:** Kyanon Digital - Nhóm 2  
**Phiên bản:** 1.0.0  

---

## 1. Giới Thiệu & Mục Tiêu Dự Án (Introduction & Objectives)

### 1.1. Bối cảnh
Quản lý tài chính cá nhân là nhu cầu thiết yếu hàng ngày. Việc không kiểm soát được các khoản thu chi dẫn đến chi tiêu vượt ngân sách và khó tích lũy tài chính.

### 1.2. Mục tiêu
* Xây dựng ứng dụng web hiện đại giúp người dùng dễ dàng ghi chép, theo dõi và kiểm soát dòng tiền thu - chi hằng ngày.
* Cung cấp số liệu tổng quan (Tổng thu, Tổng chi, Số dư) tức thì và trực quan.
* Áp dụng kiến trúc Next.js App Router, TypeScript, Tailwind CSS kết hợp với Prisma ORM và cơ sở dữ liệu PostgreSQL.

---

## 2. Đối Tượng Người Dùng (Target Users)
* Sinh viên, nhân viên văn phòng, cá nhân có nhu cầu ghi chú nhanh các giao dịch thu - chi hàng ngày và kiểm soát ngân sách cá nhân.

---

## 3. Công Nghệ Sử Dụng (Tech Stack)
* **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Lucide Icons.
* **Backend:** Next.js Server Actions / API Routes.
* **Database & ORM:** PostgreSQL / Supabase, Prisma ORM.
* **Quản lý mã nguồn & CI/CD:** GitHub, Vercel Deployment.

---

## 4. Yêu Cầu Chức Năng (Functional Requirements)

### 4.1. Quản lý Giao Dịch Thu / Chi (Transaction Management)
* **FR-01 (Thêm giao dịch):** Cho phép người dùng tạo khoản thu/chi mới gồm các trường:
  * Tiêu đề giao dịch (Title - Bắt buộc).
  * Số tiền (Amount - Bắt buộc, số dương).
  * Loại giao dịch (Type: `INCOME` - Thu nhập hoặc `EXPENSE` - Chi tiêu).
  * Danh mục (Category - Bắt buộc).
  * Ngày phát sinh (Date - Mặc định ngày hiện tại).
  * Ghi chú (Note - Tùy chọn).
* **FR-02 (Xem danh sách giao dịch):**
  * Hiển thị danh sách các khoản thu chi theo thứ tự ngày phát sinh mới nhất.
  * Phân biệt trực quan: Thu nhập (màu xanh lá `+`), Chi tiêu (màu đỏ `-`).
* **FR-03 (Chỉnh sửa giao dịch):** Cho phép người dùng cập nhật thông tin khoản thu/chi đã ghi chép.
* **FR-04 (Xóa giao dịch):** Cho phép người dùng xóa giao dịch khi có nhu cầu (kèm hộp thoại xác nhận).
* **FR-05 (Tìm kiếm & Bộ lọc):**
  * Tìm kiếm giao dịch theo từ khóa (tiêu đề, ghi chú).
  * Lọc giao dịch theo loại (`Tất cả`, `Chỉ Thu nhập`, `Chỉ Chi tiêu`).
  * Lọc theo mốc thời gian (tháng/năm).

### 4.2. Quản lý Danh Mục (Category Management)
* **FR-06 (Danh mục mặc định):** Cung cấp sẵn các danh mục chi tiêu cơ bản:
  * *Chi tiêu:* Ăn uống, Mua sắm, Đi lại, Nhà ở, Học tập, Giải trí, Hóa đơn điện nước.
  * *Thu nhập:* Lương, Thưởng, Đầu tư, Thu nhập phụ, Khác.
* **FR-07 (Tùy chỉnh danh mục):** Cho phép người dùng thêm danh mục tùy chỉnh theo nhu cầu cá nhân.

### 4.3. Bảng Điều Khiển & Thống Kê (Dashboard & Summary)
* **FR-08 (Thẻ chỉ số tổng quan):**
  * **Tổng Thu:** $\sum \text{Amount}_{\text{INCOME}}$
  * **Tổng Chi:** $\sum \text{Amount}_{\text{EXPENSE}}$
  * **Số Dư Hiện Tại:** $\text{Số Dư} = \text{Tổng Thu} - \text{Tổng Chi}$
* **FR-09 (Biểu đồ phân tích):** Trực quan hóa tỷ trọng chi tiêu theo từng danh mục.

---

## 5. Yêu Cầu Phi Chức Năng (Non-Functional Requirements)

### 5.1. Hiệu Năng (Performance)
* Thời gian tải trang ban đầu (FCP) dưới 1.5 giây.
* Thời gian phản hồi xử lý các thao tác thêm, sửa, xóa giao dịch dưới 500ms.

### 5.2. Giao Diện & Trải Nghiệm Người Dùng (UI/UX)
* Thiết kế phẳng, hiện đại, màu sắc trực quan (Xanh dương chủ đạo, Xanh lá cho thu, Đỏ cho chi).
* Giao diện Responsive hoàn toàn, hiển thị tối ưu trên cả Mobile, Tablet và Desktop.

### 5.3. Tính Toàn Vẹn Dữ Liệu & Bảo Mật (Data Integrity & Security)
* Kiểm tra tính hợp lệ dữ liệu (Input Validation) ở cả client-side và server-side (Zod / TypeScript).
* Không cho phép lưu số tiền $\le 0$.
* Tự động đồng bộ và tính toán số dư chính xác, không sai lệch số liệu.

---

## 6. Kế Hoạch Triển Khai (Roadmap 3 Tuần)

* **Tuần 1: Khởi tạo Dự án, Thiết kế UI & Hoàn thiện Tài liệu Kỹ thuật**
  * Thiết lập môi trường dự án với Next.js 16 (App Router), TypeScript và Tailwind CSS.
  * Xây dựng giao diện UI cho Authentication (Login/Register), Dashboard tài chính và Modal thêm giao dịch (Mock Data).
  * Soạn thảo bộ tài liệu kỹ thuật hoàn chỉnh: Đặc tả Requirements, Wireframe, ERD, Test Cases và Slide thuyết trình tuần 1.
  * Cấu hình kho lưu trữ GitHub (Git Flow), thiết lập CI/CD và triển khai bản Preview lên Vercel.

* **Tuần 2: Tích hợp Cơ sở dữ liệu, Xác thực & Nghiệp vụ CRUD**
  * Thiết kế Database Schema và kết nối Supabase PostgreSQL thông qua Prisma ORM.
  * Tích hợp luồng xác thực người dùng (Authentication) và bảo mật dữ liệu.
  * Xây dựng Server Actions / API Routes để xử lý trọn vẹn nghiệp vụ CRUD cho giao dịch (Thu/Chi) và Danh mục.
  * Kết nối dữ liệu động từ Database vào giao diện Dashboard.

* **Tuần 3: Bộ lọc Nâng cao, Thống kê Biểu đồ, Testing & Nghiệm thu Dự án**
  * Tích hợp tính năng tìm kiếm, bộ lọc giao dịch và biểu đồ phân tích/thống kê tài chính.
  * Thực thi kịch bản kiểm thử (Test Cases), rà soát và khắc phục các lỗi phát sinh (Bug Fixing).
  * Tối ưu hóa hiệu năng, bảo mật và hoàn tất bản Final Deployment trên Vercel.
  * Hoàn thiện tài liệu kỹ thuật tổng kết, Slide nghiệm thu và bảo vệ Dự án Cá nhân.