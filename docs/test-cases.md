# TEST CASES - PERSONAL FINANCE MANAGEMENT

## 1. Authentication

### TC01 - Đăng ký tài khoản hợp lệ
- Nhập họ tên, email mới và mật khẩu từ 6 ký tự.
- Kết quả mong đợi: Tạo tài khoản thành công và chuyển hướng về trang đăng nhập.

### TC02 - Đăng ký bằng email đã tồn tại
- Nhập email của một tài khoản đã có trong hệ thống.
- Kết quả mong đợi: Hiển thị thông báo "Email đã tồn tại".

### TC03 - Đăng ký với mật khẩu dưới 6 ký tự
- Nhập mật khẩu ngắn dưới 6 ký tự.
- Kết quả mong đợi: Hiển thị lỗi validation và từ chối tạo tài khoản.

### TC04 - Đăng nhập hợp lệ
- Nhập đúng email và mật khẩu đã đăng ký.
- Kết quả mong đợi: Đăng nhập thành công, lưu session vào HTTP-only Cookie và chuyển đến Dashboard.

### TC05 - Đăng nhập sai mật khẩu
- Nhập đúng email nhưng sai mật khẩu.
- Kết quả mong đợi: Hiển thị thông báo "Email hoặc mật khẩu không đúng".

### TC06 - Đăng nhập với email không tồn tại
- Nhập email chưa từng được đăng ký trong hệ thống.
- Kết quả mong đợi: Hiển thị thông báo "Email hoặc mật khẩu không đúng".

### TC07 - Đăng xuất
- Bấm nút "Đăng xuất" trên thanh Header.
- Kết quả mong đợi: Xóa session cookie và chuyển hướng an toàn về trang đăng nhập.


## 2. Authorization & Data Isolation

### TC08 - Cô lập dữ liệu giữa các User
- Đăng nhập bằng 2 tài khoản User khác nhau trên 2 trình duyệt.
- Kết quả mong đợi: Mỗi User chỉ nhìn thấy đúng các giao dịch, danh mục và số dư tài chính của chính mình.

### TC09 - Ngăn chặn sửa giao dịch của User khác
- User cố tình gửi yêu cầu cập nhật giao dịch (`transactionId`) thuộc quyền sở hữu của User khác.
- Kết quả mong đợi: Server Action từ chối cập nhật và trả về lỗi không có quyền.

### TC10 - Ngăn chặn xóa giao dịch của User khác
- User gửi yêu cầu xóa bản ghi giao dịch không thuộc tài khoản của mình.
- Kết quả mong đợi: Server Action từ chối xóa và bảo toàn dữ liệu gốc.


## 3. CRUD Transactions (Quản lý thu chi)

### TC11 - Thêm giao dịch Thu nhập (INCOME) hợp lệ
- Nhập tiêu đề, số tiền > 0, chọn loại "Tiền Thu", chọn danh mục và ngày giao dịch.
- Kết quả mong đợi: Giao dịch được lưu vào Supabase, hiển thị lên danh sách và cộng thêm vào Tổng Thu Nhập / Tổng Số Dư.

### TC12 - Thêm giao dịch Chi tiêu (EXPENSE) hợp lệ
- Nhập tiêu đề, số tiền > 0, chọn loại "Tiền Chi", chọn danh mục và ngày giao dịch.
- Kết quả mong đợi: Giao dịch được lưu vào database, hiển thị dấu trừ màu đỏ và trừ trực tiếp vào Tổng Số Dư.

### TC13 - Tiêu đề giao dịch để trống
- Không nhập tiêu đề và bấm lưu.
- Kết quả mong đợi: Form hiển thị cảnh báo lỗi và chặn submit.

### TC14 - Số tiền giao dịch bằng 0 hoặc số âm
- Nhập số tiền `<= 0` hoặc để trống.
- Kết quả mong đợi: Validation chặn gửi form và thông báo số tiền phải lớn hơn 0.

### TC15 - Mở Modal chỉnh sửa giao dịch
- Bấm icon cây bút chì (Sửa) trên một dòng giao dịch.
- Kết quả mong đợi: Modal hiện lên và điền sẵn đúng thông tin (tiêu đề, số tiền, danh mục, ngày, loại thu/chi) của giao dịch đó.

### TC16 - Cập nhật giao dịch thành công
- Thay đổi số tiền hoặc tiêu đề trong Modal và bấm "Cập Nhật".
- Kết quả mong đợi: Thông tin được cập nhật tức thì, Modal đóng lại và các thẻ thống kê tự động tính toán lại số dư mới.

### TC17 - Hủy thao tác xóa giao dịch
- Bấm icon thùng rác (Xóa) rồi chọn "Hủy" trên hộp thoại xác nhận.
- Kết quả mong đợi: Giao dịch vẫn được giữ nguyên vẹn trên hệ thống.

### TC18 - Xác nhận xóa giao dịch
- Bấm icon thùng rác (Xóa) và chọn "Xác nhận xóa".
- Kết quả mong đợi: Giao dịch bị xóa khỏi database, biến mất khỏi danh sách và số dư được hoàn lại tương ứng.


## 4. Dashboard & Thống kê / Bộ lọc

### TC19 - Tính toán chính xác Tổng Số Dư
- Thực hiện thêm nhiều khoản thu và chi xen kẽ.
- Kết quả mong đợi: `Tổng Số Dư = Tổng Thu - Tổng Chi` luôn tính toán chính xác 100%.

### TC20 - Cảnh báo số dư âm
- Tổng chi vượt quá tổng thu dẫn đến số dư khả dụng `< 0`.
- Kết quả mong đợi: Số tiền hiển thị đổi màu cảnh báo (màu đỏ).

### TC21 - Lọc giao dịch Tất cả (ALL)
- Bấm vào thẻ "Tổng Số Dư".
- Kết quả mong đợi: Hiển thị toàn bộ lịch sử bao gồm cả khoản thu lẫn khoản chi.

### TC22 - Lọc danh sách Tiền Thu (INCOME)
- Bấm vào thẻ "Tổng Thu Nhập".
- Kết quả mong đợi: Danh sách chỉ hiển thị các khoản tiền Thu (+), ẩn toàn bộ các khoản Chi.

### TC23 - Lọc danh sách Tiền Chi (EXPENSE)
- Bấm vào thẻ "Tổng Chi Tiêu".
- Kết quả mong đợi: Danh sách chỉ hiển thị các khoản tiền Chi (-), ẩn toàn bộ các khoản Thu.


## 5. UI / UX & Performance

### TC24 - Empty State (Chưa có dữ liệu)
- Đăng nhập bằng tài khoản mới chưa ghi nhận giao dịch nào (hoặc lọc sang mục không có giao dịch).
- Kết quả mong đợi: Hiển thị giao diện thông báo "Chưa có giao dịch nào".

### TC25 - Loading State (Trạng thái chờ)
- Thực hiện thao tác đăng nhập hoặc gửi form thêm/sửa giao dịch.
- Kết quả mong đợi: Nút bấm hiển thị trạng thái Loading / Spinner và vô hiệu hóa click lặp lại.

### TC26 - Responsive trên đa thiết bị
- Kiểm tra toàn bộ giao diện trên Mobile (màn hình dọc), Tablet và Desktop.
- Kết quả mong đợi: Khung hình co giãn mượt mà, không bị tràn thanh cuộn ngang, modal hiển thị vừa vặn khung hình.