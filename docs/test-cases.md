# 🧪 TÀI LIỆU KỊCH BẢN KIỂM THỬ (SOFTWARE TEST CASES SPECIFICATION)

**Tên dự án:** Quản Lý Thu Chi Cá Nhân (Personal Finance Management)  
**Sinh viên thực hiện:** Nguyễn Trọng Nguyễn  
**MSSV:** 2411020013  
**Đơn vị thực tập:** Kyanon Digital - Nhóm 2  
**Môi trường kiểm thử:** Localhost (`http://localhost:3000`), Vercel Production  
**Phiên bản:** 1.0.0  

---

## 1. Quy Ước Mức Độ Ưu Tiên & Trạng Thái

* **Mức độ ưu tiên (Priority):**
  * `P1 (Cao nhất)`: Chức năng cốt lõi (Tạo, tính toán số dư, hiển thị giao dịch).
  * `P2 (Trung bình)`: Bộ lọc, tìm kiếm, sửa/xóa giao dịch.
  * `P3 (Thấp)`: Giao diện, responsive, animation, thông báo phụ.
* **Trạng thái (Status):** `Passed` (Đạt), `Failed` (Lỗi), `Pending` (Chờ kiểm thử).

---

## 2. Danh Sách Kịch Bản Kiểm Thử (Test Cases List)

### 2.1. Module Dashboard & Tính Toán Số Dư (Financial Summary)

| ID | Chức năng | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả kỳ vọng (Expected Result) | Mức độ | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Hiển thị số dư ban đầu | 1. Truy cập vào trang Dashboard chính. | Không có | Hiển thị chính xác Tổng Thu, Tổng Chi và Số Dư = (Tổng Thu - Tổng Chi). | `P1` | Passed |
| **TC-02** | Cập nhật số dư khi có giao dịch Thu | 1. Thêm mới 1 giao dịch loại Thu nhập với số tiền 2.000.000 đ.<br>2. Quan sát thẻ Tổng Thu và Số Dư. | Tiêu đề: "Thưởng dự án"<br>Số tiền: `2000000`<br>Loại: `INCOME` | Tổng Thu và Số Dư đều tự động cộng thêm đúng 2.000.000 đ. | `P1` | Passed |
| **TC-03** | Cập nhật số dư khi có giao dịch Chi | 1. Thêm mới 1 giao dịch loại Chi tiêu với số tiền 500.000 đ.<br>2. Quan sát thẻ Tổng Chi và Số Dư. | Tiêu đề: "Mua sắm"<br>Số tiền: `500000`<br>Loại: `EXPENSE` | Tổng Chi tăng thêm 500.000 đ, Số Dư bị trừ đi đúng 500.000 đ. | `P1` | Passed |

---

### 2.2. Module Thêm Giao Dịch Mới (Create Transaction)

| ID | Chức năng | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả kỳ vọng (Expected Result) | Mức độ | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-04** | Thêm giao dịch hợp lệ | 1. Bấm nút `+ Thêm Thu/Chi`.<br>2. Điền đầy đủ trường hợp lệ.<br>3. Bấm `Lưu Giao Dịch`. | Tiêu đề: "Ăn tối"<br>Số tiền: `150000`<br>Loại: `EXPENSE`<br>Danh mục: `Ăn uống` | Modal đóng lại, giao dịch mới xuất hiện đầu danh sách với màu đỏ và dấu `-150.000 đ`. | `P1` | Passed |
| **TC-05** | Bỏ trống trường bắt buộc | 1. Bấm `+ Thêm Thu/Chi`.<br>2. Để trống Tiêu đề và Số tiền.<br>3. Bấm `Lưu Giao Dịch`. | Tiêu đề: `""`<br>Số tiền: `""` | Hệ thống chặn submit, hiển thị thông báo lỗi yêu cầu nhập đầy đủ trường bắt buộc. | `P1` | Passed |
| **TC-06** | Nhập số tiền $\le 0$ hoặc ký tự chữ | 1. Nhập số tiền âm hoặc số `0`.<br>2. Bấm `Lưu Giao Dịch`. | Số tiền: `-50000` hoặc `0` | Báo lỗi validation: "Số tiền phải lớn hơn 0". Không lưu vào hệ thống. | `P1` | Passed |

---

### 2.3. Module Tìm Kiếm & Bộ Lọc Giao Dịch (Search & Filter)

| ID | Chức năng | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả kỳ vọng (Expected Result) | Mức độ | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-07** | Tìm kiếm theo từ khóa | 1. Nhập từ khóa vào thanh tìm kiếm trên trang chủ. | Từ khóa: `"Lương"` | Danh sách chỉ hiển thị các giao dịch có tiêu đề hoặc ghi chú chứa từ "Lương". | `P2` | Passed |
| **TC-08** | Lọc theo loại (Chỉ Thu nhập) | 1. Tại dropdown bộ lọc loại, chọn `Chỉ các khoản Thu`. | Filter: `INCOME` | Danh sách chỉ hiển thị các giao dịch mang dấu `+` màu xanh lá. | `P2` | Passed |
| **TC-09** | Lọc theo loại (Chỉ Chi tiêu) | 1. Tại dropdown bộ lọc loại, chọn `Chỉ các khoản Chi`. | Filter: `EXPENSE` | Danh sách chỉ hiển thị các giao dịch mang dấu `-` màu đỏ. | `P2` | Passed |
| **TC-10** | Tìm kiếm không có kết quả | 1. Nhập từ khóa không tồn tại vào ô Search. | Từ khóa: `"xyz12345"` | Hiển thị thông báo rỗng: "Không tìm thấy giao dịch nào phù hợp". | `P3` | Passed |

---

### 2.4. Module Sửa & Xóa Giao Dịch (Update & Delete)

| ID | Chức năng | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả kỳ vọng (Expected Result) | Mức độ | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-11** | Chỉnh sửa số tiền giao dịch | 1. Chọn 1 giao dịch và bấm Sửa.<br>2. Thay đổi số tiền từ `100.000` thành `200.000`.<br>3. Bấm `Cập nhật`. | Số tiền mới: `200000` | Thông tin giao dịch thay đổi, Tổng Chi và Số Dư trên Dashboard được tính toán lại ngay lập tức. | `P2` | Passed |
| **TC-12** | Xóa giao dịch | 1. Bấm icon Xóa tại 1 hàng giao dịch.<br>2. Xác nhận `Đồng ý xóa` trên hộp thoại. | ID giao dịch cần xóa | Giao dịch biến mất khỏi danh sách, số tiền tương ứng được hoàn lại vào Số Dư. | `P2` | Passed |

---

### 2.5. Module Giao Diện & Khả Năng Đáp Ứng (UI/UX & Responsive)

| ID | Chức năng | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả kỳ vọng (Expected Result) | Mức độ | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-13** | Hiển thị trên Desktop ($> 1024\text{px}$) | Mở ứng dụng trên màn hình máy tính. | Màn hình $1920 \times 1080$ | Bố cục 3 cột thẻ tổng quan nằm ngang, danh sách bảng giao dịch rộng rãi, không vỡ layout. | `P3` | Passed |
| **TC-14** | Hiển thị trên Mobile ($< 768\text{px}$) | Mở DevTools chuyển chế độ mobile view (iPhone/Android). | Màn hình $375 \times 667$ | Thẻ tổng quan tự động chuyển về dạng 1 cột dọc, các nút bấm và chữ không bị tràn viền (overflow). | `P3` | Passed |