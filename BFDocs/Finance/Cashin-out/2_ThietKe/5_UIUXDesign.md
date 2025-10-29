# 5. UI/UX Design Document
## Hệ thống Quản lý Thu Chi (Cashin-out)

**Phiên bản:** 1.0
**Ngày tạo:** 2024-10-28
**Trạng thái:** Draft - HTML Prototypes Ready

---

## 1. Tổng Quan Thiết Kế

### 1.1 Mục Tiêu Thiết Kế
- Cung cấp giao diện đơn giản, trực quan cho người dùng
- Tối ưu hóa quy trình nhập liệu và quản lý giao dịch thu/chi
- Hỗ trợ quy trình phê duyệt rõ ràng và minh bạch
- Giảm thiểu sai sót thao tác người dùng

### 1.2 Các Nguyên Tắc Thiết Kế
- **Simplicity** - Giao diện đơn giản, dễ sử dụng
- **Clarity** - Rõ ràng về các bước và yêu cầu
- **Feedback** - Phản hồi rõ ràng các hành động
- **Consistency** - Nhất quán trong toàn bộ hệ thống
- **Accessibility** - Có thể sử dụng dễ dàng bởi mọi người

### 1.3 Công nghệ Sử dụng
- **Framework:** Bootstrap 5.3
- **JavaScript:** Vanilla JS (không cần framework nặng)
- **Build Tool:** Không cần build (sử dụng CDN)
- **Browser Compatibility:** Modern browsers (Chrome, Firefox, Safari, Edge)

---

## 2. Các Màn Hình Chính

### 2.1 Dashboard / Trang Chính
**Mục đích:** Cấp bách các tính năng chính
**Trạng thái:** [📌 Xem Prototype](./html-prototypes/index.html)

**Nội dung chính:**
- Danh sách các màn hình chức năng
- Hướng dẫn nhanh
- Links nhanh đến các tính năng thường dùng

---

### 2.2 Danh sách Giao dịch (Transaction List)
**Mục đích:** Xem toàn bộ giao dịch thu/chi, tìm kiếm, lọc
**Trạng thái:** [✅ Xem Prototype](./html-prototypes/1_transaction-list.html)

#### 2.2.1 Các Thành phần
| Thành phần | Mô tả |
|-----------|------|
| **Sidebar Filter** | Bộ lọc giao dịch theo loại, ngày, số tiền, trạng thái |
| **Summary Cards** | Thống kê: Tổng Thu, Tổng Chi, Lệnh chờ duyệt |
| **Transaction Table** | Bảng liệt kê giao dịch chi tiết |
| **Action Buttons** | Tạo Thu, Tạo Chi, Xuất Excel, Chi tiết giao dịch |

#### 2.2.2 Dữ liệu Hiển thị
```
Các cột bảng:
- Mã giao dịch (ID)
- Loại (Badge: Thu/Chi)
- Số tiền (Amount)
- Ngày giao dịch (Date)
- Mô tả (Description)
- Trạng thái (Status Badge)
- Thao tác (Action Links)
```

#### 2.2.3 Quy tắc Hiển thị
- **Màu sắc Loại:**
  - 🟢 Thu (Cash-in) = Green
  - 🔴 Chi (Cash-out) = Red

- **Trạng thái:**
  - 🟡 Chờ duyệt (Pending) = Yellow
  - 🟢 Đã duyệt (Approved) = Green
  - 🔴 Từ chối (Rejected) = Red

- **Sắp xếp:** Mặc định theo ngày mới nhất trước
- **Phân trang:** 10 / 20 / 50 giao dịch/trang

---

### 2.3 Tạo Giao dịch Thu (Create Cash-in)
**Mục đích:** Tạo giao dịch thu tiền vào
**Trạng thái:** [✅ Xem Prototype](./html-prototypes/2_create-cashin.html)

#### 2.3.1 Các Section Form
| Section | Trường | Loại | Bắt buộc |
|---------|--------|------|----------|
| **Thông tin giao dịch** | Ngày giao dịch | Date | ✓ |
| | Loại thu | Select | ✓ |
| | Số tiền | Number | ✓ |
| | Loại tiền tệ | Select | ✗ |
| **Thông tin người nộp** | Tên khách hàng | Text | ✓ |
| | Số điện thoại | Tel | ✗ |
| | Email | Email | ✗ |
| | Mã số thuế | Text | ✗ |
| **Tài khoản nhận** | Tài khoản ngân hàng | Select | ✓ |
| | Tên ngân hàng | Text | ✗ |
| **Chi tiết** | Mô tả | Textarea | ✓ |
| | Số hóa đơn | Text | ✗ |
| | Bộ phận | Select | ✗ |
| | Dự án | Text | ✗ |
| **Tài liệu** | Tải lên file | File | ✗ |
| | Ghi chú | Textarea | ✗ |

#### 2.3.2 Quy tắc Validate
- Các trường bắt buộc phải điền
- Số tiền > 0
- Ngày giao dịch không quá 30 ngày trong quá khứ
- Email phải hợp lệ nếu nhập
- File upload: PDF, Excel, Image, Max 5MB/file

#### 2.3.3 Hành động
- **Lưu Nháp** - Lưu dự thảo, có thể sửa sau
- **Tạo & Gửi Duyệt** - Tạo giao dịch và gửi duyệt ngay

---

### 2.4 Tạo Giao dịch Chi (Create Cash-out)
**Mục đích:** Tạo giao dịch chi tiền ra
**Trạng thái:** [✅ Xem Prototype](./html-prototypes/3_create-cashout.html)

#### 2.4.1 Các Section Form
| Section | Trường | Loại | Bắt buộc |
|---------|--------|------|----------|
| **Thông tin giao dịch** | Ngày giao dịch | Date | ✓ |
| | Loại chi phí | Select | ✓ |
| | Số tiền | Number | ✓ |
| | Phương thức thanh toán | Select | ✓ |
| **Thông tin người nhận** | Tên người/Công ty | Text | ✓ |
| | Số điện thoại | Tel | ✗ |
| | Email | Email | ✗ |
| | Mã số thuế | Text | ✗ |
| **Tài khoản thanh toán** | Tài khoản | Select | ✓ |
| | Số dư tài khoản | Text | ✗ |
| **Chi tiết** | Mô tả | Textarea | ✓ |
| | Số hóa đơn | Text | ✗ |
| | Liên quan tài liệu | Text | ✗ |
| | Bộ phận | Select | ✗ |
| | Dự án / Chi phí | Text | ✗ |
| **Phê duyệt** | Người yêu cầu | Text | ✗ |
| | Trưởng phòng KT | Select | ✓ |
| | Giám đốc | Select | ✓ |
| **Tài liệu** | Tải lên file | File | ✗ |
| | Ghi chú | Textarea | ✗ |

#### 2.4.2 Điểm Khác biệt so với Thu
- **Cần phê duyệt** từ 2 người (Trưởng phòng KT + Giám đốc)
- **Hiển thị số dư** tài khoản (tự động điền khi chọn)
- **Validate:** Số tiền <= Số dư tài khoản
- **Warning Alert** - Nhắc nhở cần phê duyệt

#### 2.4.3 Hành động
- **Lưu Nháp** - Lưu dự thảo
- **Tạo & Gửi Duyệt** - Gửi đến người phê duyệt

---

### 2.5 Chi tiết Giao dịch (Transaction Detail)
**Mục đích:** Xem chi tiết, lịch sử, trạng thái phê duyệt
**Trạng thái:** [✅ Xem Prototype](./html-prototypes/4_transaction-detail.html)

#### 2.5.1 Các Thành phần
- **Thông tin Tóm tắt** - Loại, số tiền, ngày, trạng thái
- **Thông tin Người/Đơn vị** - Chi tiết người thu/chi
- **Thông tin Tài khoản** - Tài khoản ngân hàng
- **Mô tả Chi tiết** - Mô tả, hóa đơn, bộ phận, dự án
- **Tài liệu Đính kèm** - File đính kèm
- **Quá trình Phê duyệt** - Danh sách phê duyệt + nhận xét
- **Lịch sử Thay đổi** - Timeline các sự kiện

#### 2.5.2 Hiển thị Phê duyệt
```
Approval Item:
├─ Tên người duyệt + Chức vụ
├─ Trạng thái (Đã duyệt/Chờ/Từ chối)
├─ Thời gian
└─ Nhận xét (nếu có)
```

#### 2.5.3 Hành động Khả dụng
- Dựa vào **Trạng thái & Quyền người dùng:**
  - Nếu **Chờ duyệt** + Người duyệt: Duyệt / Từ chối
  - Nếu **Đã duyệt**: Xem chi tiết, In/Xuất, Sao chép
  - Nếu **Từ chối**: Xem chi tiết, Sửa, Gửi lại

---

### 2.6 Báo cáo Thu Chi (Report)
**Mục đích:** Báo cáo tổng hợp, thống kê
**Trạng thái:** [✅ Xem Prototype](./html-prototypes/5_report.html)

#### 2.6.1 Các Phần Báo cáo
1. **Bộ lọc** - Lọc theo khoảng ngày, loại, bộ phận
2. **Thống kê Tóm tắt** - Tổng Thu, Tổng Chi, Lợi nhuận, Số giao dịch
3. **Breakdown** - Chi tiết theo loại chi phí, loại thu
4. **Chi tiết theo Bộ phận** - Thu, Chi, Lợi nhuận per bộ phận
5. **Danh sách Chi tiết** - Tất cả giao dịch trong kỳ

#### 2.6.2 Hành động
- Tạo báo cáo
- Xóa bộ lọc
- Xuất Excel
- In báo cáo PDF

---

## 3. Flow & Navigation

### 3.1 Main Navigation Flow
```
Dashboard
├─ Danh sách Giao dịch
│  ├─ Tạo Thu
│  │  └─ Chi tiết (sau tạo)
│  ├─ Tạo Chi
│  │  └─ Chi tiết (sau tạo)
│  └─ Xem Chi tiết (click hàng)
│     ├─ Duyệt (nếu cần duyệt)
│     ├─ Sửa (nếu là nháp)
│     └─ In / Xuất
└─ Báo cáo
```

### 3.2 Breadcrumb Navigation
- Tất cả các trang sẽ có breadcrumb hoặc "Quay lại"
- Giúp người dùng dễ dàng quay lại trang trước

---

## 4. Responsive Design

### 4.1 Breakpoints
- **Desktop (≥1200px):** Full layout
- **Tablet (768px-1199px):** Sidebar collapsible
- **Mobile (<768px):** Stack layout, fullwidth

### 4.2 Quy tắc Mobile
- Form input: Full width
- Table: Horizontal scroll hoặc card view
- Buttons: Full width trong mobile
- Navigation: Hamburger menu nếu cần

---

## 5. Hướng Dẫn Sử dụng HTML Prototype

### 5.1 Cách Sử dụng
1. Mở file HTML trong browser
2. Không cần build hay install
3. Tham khảo code HTML/CSS/JS để implement thực tế

### 5.2 Cấu trúc File
```
html-prototypes/
├── index.html                  (Trang chính)
├── 1_transaction-list.html    (Danh sách)
├── 2_create-cashin.html       (Form Thu)
├── 3_create-cashout.html      (Form Chi)
├── 4_transaction-detail.html  (Chi tiết)
└── 5_report.html              (Báo cáo)
```

### 5.3 Bootstrap Classes Sử dụng
- `container` / `container-fluid` - Wrapper
- `row` / `col-md-*` - Grid system
- `form-control` / `form-label` - Form elements
- `btn btn-*` - Buttons
- `table` / `thead` / `tbody` - Tables
- `badge` - Status badges
- `alert` - Alerts
- `card` - Card components

### 5.4 Tùy chỉnh
- Màu sắc: Có thể tùy chỉnh bằng CSS inline hoặc SCSS
- Font: Bootstrap mặc định (có thể import Google Fonts)
- Icons: Có thể thêm Font Awesome nếu cần

---

## 6. Quy tắc Thiết kế Chi tiết

### 6.1 Typography
- **Headings:** Bootstrap defaults (h1-h6)
- **Body Text:** 14-16px, line-height 1.5
- **Labels:** 12-14px, font-weight 500

### 6.2 Color Scheme
| Use Case | Color | Hex |
|----------|-------|-----|
| Success / Thu | Green | #28a745 |
| Danger / Chi | Red | #dc3545 |
| Warning / Pending | Yellow | #ffc107 |
| Info | Blue | #007bff |
| Neutral / Text | Gray | #333333 |
| Background | Light Gray | #f8f9fa |

### 6.3 Spacing
- Margin: 8px, 16px, 20px, 30px
- Padding: 8px, 12px, 15px, 20px
- Gap (grid): 16px, 20px

### 6.4 Border & Shadow
- Border: 1px solid #e9ecef
- Border-radius: 4-8px
- Box-shadow: 0 2px 8px rgba(0,0,0,0.1)

---

## 7. Validation & Error Handling

### 7.1 Form Validation
- **Client-side:** HTML5 validation + JS
- **Server-side:** Backend validation (trong API Design)
- **Error Messages:** Hiển thị dưới field hoặc alert

### 7.2 Error States
```html
<div class="form-group">
    <label>Email</label>
    <input type="email" class="form-control is-invalid">
    <div class="invalid-feedback">Email không hợp lệ</div>
</div>
```

### 7.3 Success States
- Green border
- Success icon
- Confirmation message

---

## 8. Accessibility

### 8.1 WCAG Guidelines
- Proper heading hierarchy (h1 → h6)
- Alt text cho hình ảnh (nếu có)
- Label cho form inputs
- Color contrast ratio ≥ 4.5:1

### 8.2 Keyboard Navigation
- Tab order logic
- Focus visible
- Skip links nếu cần

### 8.3 ARIA Labels
- `aria-label` cho icons
- `aria-hidden` cho decorative elements

---

## 9. Performance & Browser Support

### 9.1 Performance
- Bootstrap CDN (cached globally)
- Minimal custom JS
- No heavy libraries
- Image optimization nếu có image

### 9.2 Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

---

## 10. Next Steps & Implementation Guide

### 10.1 Cho Designer
- [ ] Review HTML prototypes
- [ ] Confirm layout & flow
- [ ] Suggest color improvements (nếu cần)
- [ ] Add detailed graphics/mockups (Figma)

### 10.2 Cho Developer
- [ ] Code review: HTML structure
- [ ] Extract CSS variables
- [ ] Implement API integration
- [ ] Add form validation logic
- [ ] Implement authentication & authorization
- [ ] Write unit tests

### 10.3 Cho QA/Tester
- [ ] Test all flows
- [ ] Check responsive design
- [ ] Validate form inputs
- [ ] Test approval workflow
- [ ] Performance testing

---

## 11. Tài liệu Tham khảo

### Bootstrap Documentation
- https://getbootstrap.com/docs/5.3/

### HTML Prototype Files
- [Trang chính](./html-prototypes/index.html)
- [Danh sách](./html-prototypes/1_transaction-list.html)
- [Form Thu](./html-prototypes/2_create-cashin.html)
- [Form Chi](./html-prototypes/3_create-cashout.html)
- [Chi tiết](./html-prototypes/4_transaction-detail.html)
- [Báo cáo](./html-prototypes/5_report.html)

---

**Document Version:** 1.0
**Last Updated:** 2024-10-28
**Status:** Ready for Development Review
