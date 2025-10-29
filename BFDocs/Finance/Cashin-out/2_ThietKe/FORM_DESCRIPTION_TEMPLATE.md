# Template Mô Tả Form Bằng Text
## Hướng dẫn Mô tả Form để tạo HTML Prototype

Tài liệu này giúp bạn mô tả form/màn hình bằng text, từ đó tôi có thể tạo HTML prototype phù hợp.

---

## Ví dụ: Form "Tạo Giao dịch Thu" (2_create-cashin.html)

### Cách mô tả chi tiết:

#### **1. Thông tin chung về form**
```
Form Name: Tạo Giao dịch Thu Tiền (Cash-In)
File Name: 2_create-cashin.html
Icon/Title: 💰 Tạo Giao dịch Thu Tiền
Purpose: Tạo giao dịch thu tiền vào tài khoản công ty
Max Width: 800px (form dạng single column)
```

#### **2. Navigation Bar**
```
Header:
- Back Button: Quay lại "Danh sách Giao dịch" (link: 1_transaction-list.html)
- Title: Tạo phiếu thu (Cash-In)
- Color: Dark (background #2c3e50)
```

#### **3. Section 1: Thông tin giao dịch**
```
Section Title: "Thông tin giao dịch"

Fields:
1. Ngày giao dịch
   - Type: Date Input
   - Required: YES (*)
   - Layout: col-md-6 (2 columns)
   - Placeholder: -

2. Loại thu
   - Type: Select Dropdown
   - Required: YES (*)
   - Layout: col-md-6
   - Options:
     * -- Chọn loại thu --
     * Thu bán hàng
     * Thu tiền hợp đồng
     * Thu lãi suất
     * Thu hỗ trợ/tài trợ
     * Thu khác

3. Số tiền
   - Type: Number Input
   - Required: YES (*)
   - Layout: col-md-6
   - Placeholder: 0
   - Helper Text: Đơn vị: VNĐ

4. Loại tiền tệ
   - Type: Select Dropdown
   - Required: NO
   - Layout: col-md-6
   - Default: VNĐ
   - Options:
     * VNĐ
     * USD
     * EUR
```

#### **4. Section 2: Thông tin người nộp tiền**
```
Section Title: "Thông tin người nộp tiền"

Fields:
1. Tên khách hàng/Đơn vị
   - Type: Text Input
   - Required: YES (*)
   - Layout: col-md-6
   - Placeholder: VD: Công ty ABC Việt Nam

2. Số điện thoại
   - Type: Tel Input
   - Required: NO
   - Layout: col-md-6
   - Placeholder: 0912345678

3. Email
   - Type: Email Input
   - Required: NO
   - Layout: col-md-6
   - Placeholder: email@example.com

4. Mã số thuế / Số định danh
   - Type: Text Input
   - Required: NO
   - Layout: col-md-6
   - Placeholder: 0123456789
```

#### **5. Section 3: Thông tin tài khoản nhận tiền**
```
Section Title: "Thông tin tài khoản nhận tiền"

Fields:
1. Tài khoản ngân hàng
   - Type: Select Dropdown
   - Required: YES (*)
   - Layout: col-md-6
   - Options:
     * -- Chọn tài khoản --
     * VCB - 0123456789 (Vietcombank)
     * ACB - 0987654321 (Á Châu Bank)
     * VIB - 1234567890 (VIB)

2. Tên ngân hàng
   - Type: Text Input (disabled)
   - Required: NO
   - Layout: col-md-6
   - Placeholder: Tự động điền
   - Note: Disabled - auto fill từ tài khoản được chọn
```

#### **6. Section 4: Thông tin chi tiết**
```
Section Title: "Thông tin chi tiết"

Fields:
1. Mô tả giao dịch / Nội dung thanh toán
   - Type: Textarea
   - Required: YES (*)
   - Rows: 3
   - Placeholder: VD: Thanh toán hóa đơn bán hàng tháng 10...

2. Số hóa đơn / Số chứng từ
   - Type: Text Input
   - Required: NO
   - Placeholder: VD: HĐ-2024-001

3. Bộ phận liên quan
   - Type: Select Dropdown
   - Required: NO
   - Layout: col-md-6
   - Options:
     * -- Chọn bộ phận --
     * Kế toán
     * Bán hàng
     * Marketing
     * Công ty

4. Dự án / Mã chi phí
   - Type: Text Input
   - Required: NO
   - Layout: col-md-6
   - Placeholder: VD: PRJ-2024-001
```

#### **7. Section 5: Tài liệu hỗ trợ**
```
Section Title: "Tài liệu hỗ trợ"

Fields:
1. Tải lên tài liệu
   - Type: File Input (multiple)
   - Required: NO
   - Helper Text: Cho phép: PDF, Excel, Image (Max 5MB/file)

2. Ghi chú thêm
   - Type: Textarea
   - Required: NO
   - Rows: 2
   - Placeholder: Ghi chú nội bộ (không hiển thị cho khách hàng)
```

#### **8. Action Buttons**
```
Button Layout: Right-aligned, stacked trên mobile

Buttons:
1. Hủy
   - Type: Link Button
   - Style: btn-outline-secondary
   - Action: Navigate to 1_transaction-list.html

2. Xóa
   - Type: Reset Button
   - Style: btn-outline-secondary
   - Action: Clear form

3. Lưu Nháp
   - Type: Submit Button
   - Style: btn-success
   - Action: Save draft

4. Tạo & Gửi Duyệt
   - Type: Submit Button
   - Style: btn-primary
   - Action: Submit & send to approval
```

#### **9. Bottom Info Box**
```
Type: Alert (info style)
Title: 💡 Quy tắc kiểm tra:

Content:
- Các trường có dấu * là bắt buộc
- Số tiền phải > 0
- Ngày giao dịch không được ở quá khứ quá 30 ngày
- Khi nhấn "Tạo & Gửi Duyệt", giao dịch sẽ được gửi đến người duyệt
```

---

## Format Tóm Tắt (Dùng Bảng)

Ngoài cách mô tả chi tiết ở trên, bạn cũng có thể dùng **Bảng** nhanh hơn:

```markdown
### Fields Structure

| Section | Field Name | Type | Required | Options/Placeholder | Width |
|---------|-----------|------|----------|-------------------|-------|
| Thông tin giao dịch | Ngày giao dịch | Date | * | - | col-md-6 |
| | Loại thu | Select | * | [Thu bán hàng, Thu tiền hợp đồng, ...] | col-md-6 |
| | Số tiền | Number | * | 0 | col-md-6 |
| | Loại tiền tệ | Select | | [VNĐ, USD, EUR] | col-md-6 |
| Thông tin người nộp | Tên khách hàng | Text | * | Công ty ABC | col-md-6 |
| | Số điện thoại | Tel | | 0912345678 | col-md-6 |
| | Email | Email | | email@example.com | col-md-6 |
| | Mã số thuế | Text | | 0123456789 | col-md-6 |
| ... | ... | ... | ... | ... | ... |
```

---

## Các Loại Form Fields & Cách Mô tả

| Field Type | Cách Mô tả | Ví dụ |
|-----------|-----------|-------|
| **Text Input** | Type: Text, Placeholder, Width | `Type: Text, Placeholder: "Nhập tên...", col-md-6` |
| **Number Input** | Type: Number, Min, Max, Placeholder | `Type: Number, Placeholder: "0", col-md-6` |
| **Date Input** | Type: Date | `Type: Date, col-md-6` |
| **Email Input** | Type: Email, Placeholder | `Type: Email, Placeholder: "email@example.com"` |
| **Tel Input** | Type: Tel, Placeholder | `Type: Tel, Placeholder: "0912345678"` |
| **Textarea** | Type: Textarea, Rows, Placeholder | `Type: Textarea, Rows: 3, Placeholder: "Mô tả..."` |
| **Select Dropdown** | Type: Select, Options: [opt1, opt2, ...] | `Type: Select, Options: [--Chọn--, Thu bán hàng, Thu khác]` |
| **Checkbox** | Type: Checkbox, Label | `Type: Checkbox, Label: "Đồng ý điều khoản"` |
| **Radio** | Type: Radio, Options: [opt1, opt2] | `Type: Radio, Options: [Có, Không]` |
| **File Upload** | Type: File, Multiple (Y/N), Accept | `Type: File, Multiple: Yes, Accept: .pdf, .xlsx, .jpg` |
| **Button** | Type: Button, Style, Action | `Type: Button, Style: btn-primary, Action: Submit` |
| **Link Button** | Type: Link, Style, Href | `Type: Link, Style: btn-outline-secondary, Href: page.html` |

---

## Cấu Trúc Tổng Quan

Dưới đây là outline tổng quát để mô tả bất kỳ form nào:

```
1. Tổng quan Form
   - Form Name / Title
   - File Name (HTML output)
   - Purpose / Mục đích
   - Layout Width (max-width)

2. Navigation
   - Back button / Breadcrumb
   - Header title

3. Sections (lặp lại cho mỗi section)
   3.1 Section Title
   3.2 Fields (lặp lại)
       - Field Label
       - Type (text, date, select, etc)
       - Required (Y/N)
       - Placeholder / Options
       - Layout (width - col-md-6, col-md-12, etc)
       - Helper Text (nếu có)
       - Special Rules (disabled, readonly, etc)

4. Buttons
   - Button Name
   - Style (btn-primary, btn-secondary, etc)
   - Action (submit, reset, navigate, etc)
   - Target Link (nếu navigate)

5. Bottom Info (nếu có)
   - Type (alert, info box, etc)
   - Content / Rules
```

---

## Ví dụ Thực Tế: Mô tả Form Chi (Bản tóm tắt)

Nếu bạn muốn mô tả form "Tạo Giao dịch Chi" bằng cách **tóm tắt**, có thể như thế này:

```
FORM: Tạo Giao dịch Chi Tiền
FILE: 3_create-cashout.html
TITLE: 💸 Tạo Giao dịch Chi Tiền
ICON: Warning alert (Cần phê duyệt từ Trưởng phòng KT & Giám đốc)

SECTIONS:
1. Thông tin giao dịch
   - Ngày giao dịch (Date*) | Loại chi phí (Select*, [Lương, Chi phí vận hành, ...])
   - Số tiền (Number*, unit VNĐ) | Phương thức thanh toán (Select*, [Chuyển khoản, Tiền mặt, ...])

2. Thông tin người nhận
   - Tên người/Công ty (Text*) | Số điện thoại (Tel)
   - Email (Email) | Mã số thuế (Text)

3. Tài khoản thanh toán
   - Tài khoản (Select*, show số dư) | Số dư (Text, disabled)

4. Chi tiết
   - Mô tả (Textarea*)
   - Số hóa đơn (Text) | Liên quan tài liệu (Text)
   - Bộ phận (Select) | Dự án (Text)

5. Phê duyệt
   - Trưởng phòng KT (Select*) | Giám đốc (Select*)

6. Tài liệu
   - File upload (multiple) | Ghi chú (Textarea)

BUTTONS:
- Hủy (outline, navigate to list)
- Xóa (outline, reset)
- Lưu Nháp (warning style)
- Tạo & Gửi Duyệt (danger style)

INFO: Alert box với warning về quy trình phê duyệt
```

---

## Tips Mô tả Hiệu Quả

✅ **Nên làm:**
- Mô tả từ trên xuống dưới (theo flow tự nhiên)
- Rõ ràng field nào bắt buộc (*)
- Liệt kê rõ các option trong Select
- Nêu rõ width (col-md-6, col-md-12, full-width)
- Nêu rõ type của field

❌ **Không nên:**
- Không mô tả từng pixel CSS
- Không mô tả màu sắc chi tiết (chỉ cần đó là primary, danger, success, etc)
- Không quá vắn tắt (khó hiểu)

---

## Khi Nào Dùng Template Nào?

| Tình huống | Template |
|-----------|----------|
| Mô tả **form đơn giản** (< 10 fields) | **Bảng tóm tắt** |
| Mô tả **form phức tạp** (> 10 fields, nhiều section) | **Chi tiết theo section** |
| Mô tả **màn hình có nhiều thành phần** (list, filter, detail) | **Chi tiết theo section** |
| **Update/sửa form tồn tại** | Liệt kê các thay đổi cụ thể |

---

## Bước 1: Bạn Mô tả Bằng Text
## Bước 2: Tôi Tạo HTML từ Mô tả Đó
## Bước 3: Bạn Review & Feedback (nếu cần)
## Bước 4: Tôi Update HTML

**Ưu điểm của cách làm này:**
✅ Rõ ràng về yêu cầu
✅ Dễ track & version control
✅ Có tài liệu gốc
✅ Dễ update sau này
✅ Dev dễ hiểu requirements

---

**Created:** 2024-10-28
**Version:** 1.0
