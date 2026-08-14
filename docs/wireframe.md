# 📐 TÀI LIỆU THIẾT KẾ GIAO DIỆN & BỐ CỤC (WIREFRAME & UI LAYOUT)

**Tên dự án:** Quản Lý Thu Chi Cá Nhân (Personal Finance Management)  
**Sinh viên thực hiện:** Nguyễn Trọng Nguyễn  
**MSSV:** 2411020013  
**Đơn vị thực tập:** Kyanon Digital - Nhóm 2  
**Phiên bản:** 1.0.0  

---

## 1. Hệ Thống Màu Sắc & Typography (Design System)

### 1.1. Bảng màu (Color Palette)
| Vai trò | Mã màu (HEX) | Tailwind Class | Mục đích sử dụng |
| :--- | :--- | :--- | :--- |
| **Primary** | `#2563EB` | `bg-blue-600` / `text-blue-600` | Màu thương hiệu, nút hành động chính, active state |
| **Income (Thu nhập)** | `#16A34A` | `text-emerald-600` / `bg-emerald-50` | Hiển thị số tiền thu, icon tăng trưởng (+) |
| **Expense (Chi tiêu)** | `#DC2626` | `text-rose-600` / `bg-rose-50` | Hiển thị số tiền chi, icon giảm (-) |
| **Background** | `#F8FAFC` | `bg-slate-50` | Nền toàn bộ ứng dụng |
| **Card Surface** | `#FFFFFF` | `bg-white` | Thẻ nội dung, modal, dropdown |
| **Text Primary** | `#0F172A` | `text-slate-900` | Tiêu đề, số tiền chính |
| **Text Secondary** | `#64748B` | `text-slate-500` | Mô tả phụ, ngày tháng, danh mục |
| **Border** | `#E2E8F0` | `border-slate-200` | Đường kẻ phân cách, viền input |

### 1.2. Phông chữ (Typography)
* **Font Family:** `Inter`, `system-ui`, sans-serif.
* **Heading 1:** 24px - 30px, Font-weight: `700 (Bold)`.
* **Heading 2 / Thẻ:** 18px - 20px, Font-weight: `600 (Semi-bold)`.
* **Body / Content:** 14px - 16px, Font-weight: `400 (Regular)` / `500 (Medium)`.
* **Số tiền (Amount):** 18px - 28px, Font-weight: `700 (Bold)`.

---

## 2. Bố Cục Trang Chủ (Dashboard - Desktop View)

```text
+--------------------------------------------------------------------------------------------------+
|  [Logo] QUẢN LÝ THU CHI CÁ NHÂN                              [🔍 Tìm kiếm...]   [+ Thêm Thu/Chi] |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|   TỔNG QUAN TÀI CHÍNH                                                                            |
|   +--------------------------+  +--------------------------+  +--------------------------+       |
|   | 💳 SỐ DƯ HIỆN TẠI        |  | 📈 TỔNG THU NHẬP         |  | 📉 TỔNG CHI TIÊU         |       |
|   | 16.830.000 đ             |  | +18.000.000 đ            |  | -1.170.000 đ             |       |
|   | (+1.250k so với tháng trc)|  | (2 khoản thu)            |  | (3 khoản chi)            |       |
|   +--------------------------+  +--------------------------+  +--------------------------+       |
|                                                                                                  |
|   --------------------------------------------------------------------------------------------   |
|                                                                                                  |
|   LỊCH SỬ GIAO DỊCH GẦN ĐÂY                          [ Lọc loại: Tất cả v ] [ Tháng 08/2026 v ]  |
|   +------------------------------------------------------------------------------------------+   |
|   | [Icon] | Tiêu đề & Danh mục                | Ngày phát sinh | Ghi chú        |   Số tiền     |   |
|   +--------+-----------------------------------+----------------+----------------+-----------+   |
|   |  🟢   | Tiền thưởng dự án (Thu nhập phụ)  | 10/08/2026     | Thưởng KPI Q2  | +3.000.000đ   |   |
|   |  🔴   | Mua sắm nhu yếu phẩm (Mua sắm)    | 07/08/2026     | Go! Ca Mau     | -1.200.000đ   |   |
|   |  🔴   | Thanh toán tiền điện (Hóa đơn)    | 05/08/2026     | Hóa đơn tháng 7|   -850.000đ   |   |
|   |  🟢   | Lương tháng 08/2026 (Thu nhập)    | 01/08/2026     | Nhận qua VCB   |+15.000.000đ   |   |
|   +------------------------------------------------------------------------------------------+   |
|   |                                         [ << Trang 1 / 3 >> ]                            |   |
|   +------------------------------------------------------------------------------------------+   |
+--------------------------------------------------------------------------------------------------+