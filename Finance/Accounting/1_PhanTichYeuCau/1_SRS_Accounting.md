# Software Requirements Specification (SRS)
# Hệ thống Kế toán - Accounting Module

## Lịch sử Phiên bản

| Phiên bản | Ngày       | Tác giả | Mô tả Thay đổi |
|-----------|------------|---------|----------------|
| 1.0       | 2024-10-03 | BA Team | Phiên bản khởi tạo |

---

## MỤC LỤC

1. [Giới thiệu](#1-giới-thiệu)
2. [Mô tả Tổng quan](#2-mô-tả-tổng-quan)
3. [Yêu cầu Chức năng](#3-yêu-cầu-chức-năng)
4. [Yêu cầu Phi chức năng](#4-yêu-cầu-phi-chức-năng)
5. [Yêu cầu Giao diện](#5-yêu-cầu-giao-diện)
6. [Ràng buộc và Giả định](#6-ràng-buộc-và-giả-định)
7. [Tiêu chí Chấp nhận](#7-tiêu-chí-chấp-nhận)

---

## 1. GIỚI THIỆU

### 1.1 Mục đích Tài liệu
Tài liệu này mô tả chi tiết các yêu cầu chức năng và phi chức năng cho **Module Kế toán (Accounting)** trong hệ thống quản lý doanh nghiệp tích hợp. Module này tuân thủ Chuẩn mực Kế toán Việt Nam (VAS) và các quy định pháp luật hiện hành.

### 1.2 Phạm vi Dự án

**Trong phạm vi:**
- ✅ Kế toán tổng hợp (General Ledger)
- ✅ Quản lý công nợ phải thu/phải trả (AR/AP)
- ✅ Quản lý tài sản cố định (Fixed Assets)
- ✅ Quản lý ngân quỹ (Cash Management)
- ✅ Báo cáo tài chính theo VAS
- ✅ Quản lý thuế (VAT, CIT, PIT)
- ✅ Kết chuyển cuối kỳ
- ✅ Tích hợp với Payroll/HRM

**Ngoài phạm vi:**
- ❌ Kế toán chi phí sản xuất (Manufacturing Costing)
- ❌ Kế toán dự án (Project Accounting)
- ❌ Consolidation kế toán tập đoàn
- ❌ Ngân sách và lập kế hoạch tài chính

### 1.3 Đối tượng Sử dụng Tài liệu
- **Business Analyst**: Xác nhận yêu cầu nghiệp vụ
- **Kế toán trưởng/CFO**: Phê duyệt quy trình và báo cáo
- **Technical Lead/Architect**: Thiết kế giải pháp kỹ thuật
- **Developers**: Tham khảo yêu cầu trong quá trình phát triển
- **QA Team**: Xây dựng test cases
- **Product Owner**: Quản lý backlog và ưu tiên

### 1.4 Tài liệu Tham khảo
- Chuẩn mực Kế toán Việt Nam (VAS 01-26)
- Thông tư 200/2014/TT-BTC - Hệ thống tài khoản kế toán
- Thông tư 133/2016/TT-BTC - Báo cáo tài chính
- Nghị định 123/2020/NĐ-CP - Hóa đơn điện tử
- Luật Kế toán số 88/2015/QH13
- ISO/IEC 25010 - Software Quality Requirements

### 1.5 Thuật ngữ và Viết tắt

| Thuật ngữ | Định nghĩa |
|-----------|------------|
| VAS | Vietnamese Accounting Standards - Chuẩn mực Kế toán Việt Nam |
| GL | General Ledger - Sổ cái tổng hợp |
| AR | Accounts Receivable - Công nợ phải thu |
| AP | Accounts Payable - Công nợ phải trả |
| FA | Fixed Assets - Tài sản cố định |
| VAT | Value Added Tax - Thuế GTGT |
| CIT | Corporate Income Tax - Thuế TNDN |
| PIT | Personal Income Tax - Thuế TNCN |
| BCTC | Báo cáo Tài chính |
| Chứng từ | Document - Hóa đơn, phiếu thu/chi, chứng từ kế toán |
| Bút toán | Journal Entry - Định khoản kế toán |

---

## 2. MÔ TẢ TỔNG QUAN

### 2.1 Bối cảnh Hệ thống

Module Accounting là thành phần cốt lõi của hệ thống quản lý doanh nghiệp (ERP), đảm bảo:
- Ghi nhận, xử lý toàn bộ nghiệp vụ kế toán theo VAS
- Tích hợp dữ liệu từ các module khác (Payroll, Inventory, Sales)
- Tự động hóa quy trình kế toán, giảm sai sót thủ công
- Đảm bảo tuân thủ pháp luật và minh bạch tài chính

### 2.2 Chức năng Chính

```
Accounting Module
│
├── 1. General Ledger (Kế toán tổng hợp)
│   ├── Quản lý hệ thống tài khoản
│   ├── Ghi sổ nhật ký chung
│   ├── Sổ cái chi tiết
│   └── Kết chuyển cuối kỳ
│
├── 2. Accounts Payable (Công nợ phải trả)
│   ├── Quản lý hóa đơn nhà cung cấp
│   ├── Thanh toán và đối chiếu
│   └── Báo cáo công nợ AP
│
├── 3. Accounts Receivable (Công nợ phải thu)
│   ├── Quản lý hóa đơn khách hàng
│   ├── Thu tiền và đối chiếu
│   └── Báo cáo công nợ AR
│
├── 4. Fixed Assets (Tài sản cố định)
│   ├── Quản lý TSCĐ
│   ├── Khấu hao tự động
│   └── Thanh lý TSCĐ
│
├── 5. Cash Management (Quản lý ngân quỹ)
│   ├── Sổ quỹ tiền mặt
│   ├── Sổ tiền gửi ngân hàng
│   └── Đối chiếu ngân hàng
│
├── 6. Tax Management (Quản lý thuế)
│   ├── Khai báo thuế VAT
│   ├── Khai báo thuế CIT
│   └── Khai báo thuế PIT (từ Payroll)
│
└── 7. Financial Reporting (Báo cáo tài chính)
    ├── Báo cáo tài chính theo VAS
    ├── Báo cáo quản trị
    └── Báo cáo thuế
```

### 2.3 Người dùng Hệ thống

| Vai trò | Mô tả | Quyền chính |
|---------|-------|-------------|
| **Kế toán viên** | Ghi sổ kế toán hàng ngày | Nhập chứng từ, ghi nhận bút toán, xem báo cáo |
| **Kế toán trưởng** | Quản lý & phê duyệt | Phê duyệt bút toán, kết chuyển, ký BCTC |
| **Kế toán thuế** | Khai báo và quyết toán thuế | Lập tờ khai thuế, nộp thuế |
| **Thủ quỹ** | Quản lý tiền mặt | Nhập phiếu thu/chi, đối chiếu quỹ |
| **Kế toán ngân hàng** | Quản lý giao dịch ngân hàng | Nhập sao kê, đối chiếu NH |
| **Kiểm toán nội bộ** | Kiểm tra & đối chiếu | Xem báo cáo, audit trail |
| **CFO/Giám đốc Tài chính** | Quản lý tài chính cấp cao | Xem mọi báo cáo, dashboard tài chính |
| **System Admin** | Quản trị hệ thống | Cấu hình, phân quyền, backup |

---

## 3. YÊU CẦU CHỨC NĂNG

### 3.1 General Ledger (Kế toán Tổng hợp)

#### FR-GL-001: Quản lý Hệ thống Tài khoản (Chart of Accounts)

**Mô tả:** Hệ thống phải hỗ trợ quản lý danh mục tài khoản kế toán tuân thủ Thông tư 200/2014/TT-BTC.

**Yêu cầu chi tiết:**
- ✅ Hỗ trợ cấu trúc tài khoản theo Thông tư 200 (10 bậc: 1-9 + 0)
- ✅ Cho phép tùy chỉnh/mở rộng tài khoản chi tiết (cấp 2, 3, 4)
- ✅ Phân loại tài khoản: Tài sản, Nguồn vốn, Doanh thu, Chi phí
- ✅ Đặc tính tài khoản:
  - Tài khoản tổng hợp / Chi tiết
  - Tài khoản có số dư / Không có số dư
  - Loại số dư: Nợ, Có, hoặc Lưỡng tính
  - Theo dõi ngoại tệ (có/không)
  - Theo dõi đối tượng (có/không)
- ✅ Import/Export danh mục tài khoản (Excel)
- ✅ Version control: Lưu lịch sử thay đổi tài khoản

**Ràng buộc:**
- Không cho phép xóa tài khoản đã phát sinh số liệu
- Tài khoản chi tiết mới phải tuân thủ cấu trúc cha-con

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

#### FR-GL-002: Nhập và Quản lý Bút toán (Journal Entry)

**Mô tả:** Hệ thống cho phép nhập và quản lý bút toán kế toán theo nguyên tắc kế toán bút toán kép.

**Yêu cầu chi tiết:**
- ✅ Nhập bút toán thủ công:
  - Ngày chứng từ, số chứng từ
  - Tài khoản Nợ/Có
  - Số tiền (VNĐ và ngoại tệ nếu có)
  - Diễn giải
  - Đối tượng (khách hàng, nhà cung cấp, nhân viên)
  - Đính kèm file (hóa đơn, chứng từ scan)
- ✅ Bút toán phức hợp: Nhiều Nợ - Nhiều Có
- ✅ Template bút toán: Lưu mẫu bút toán thường xuyên
- ✅ Auto-complete tài khoản, đối tượng
- ✅ Kiểm tra cân đối: Tổng Nợ = Tổng Có
- ✅ Trạng thái bút toán:
  - Draft (Nháp)
  - Pending Approval (Chờ duyệt)
  - Posted (Đã ghi sổ)
  - Reversed (Đã đảo bút toán)
- ✅ Quy trình phê duyệt:
  - Kế toán viên → Kế toán trưởng
  - Thiết lập ngưỡng duyệt theo số tiền
- ✅ Đảo bút toán (Reversal):
  - Đảo thủ công
  - Đảo tự động kỳ sau
- ✅ Sao chép bút toán
- ✅ Tìm kiếm nâng cao và filter

**Ràng buộc:**
- Bút toán đã Posted chỉ được sửa bằng Reversal
- Kỳ kế toán đã đóng không cho phép ghi bút toán mới
- Quyền phê duyệt phải cao hơn quyền nhập liệu

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

#### FR-GL-003: Sổ Cái và Sổ Chi tiết

**Mô tả:** Hệ thống tự động tạo sổ cái và các sổ chi tiết từ bút toán.

**Yêu cầu chi tiết:**
- ✅ **Sổ Cái (General Ledger)**:
  - Hiển thị theo tài khoản
  - Số dư đầu kỳ / Phát sinh Nợ-Có / Số dư cuối kỳ
  - Lọc theo khoảng thời gian
- ✅ **Sổ Chi tiết**:
  - Sổ chi tiết theo tài khoản
  - Sổ chi tiết theo đối tượng (khách hàng, NCC, nhân viên)
  - Sổ theo dõi ngoại tệ
- ✅ **Nhật ký chung** (General Journal): Toàn bộ bút toán theo thời gian
- ✅ **Bảng cân đối số phát sinh**: Tổng hợp theo tài khoản cấp 1, 2, 3
- ✅ Export to Excel, PDF
- ✅ Drill-down: Click vào số liệu → Xem chi tiết bút toán

**Ràng buộc:**
- Sổ chi tiết chỉ hiển thị khi có bút toán phát sinh
- Dữ liệu real-time, không delay

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

#### FR-GL-004: Kết chuyển Cuối kỳ

**Mô tả:** Hệ thống hỗ trợ quy trình kết chuyển cuối kỳ kế toán.

**Yêu cầu chi tiết:**
- ✅ Kết chuyển cuối tháng:
  - Kết chuyển chi phí vào 911 (Xác định KQKD)
  - Kết chuyển doanh thu vào 911
  - Tự động tạo bút toán kết chuyển
- ✅ Kết chuyển cuối quý:
  - Trích lập thuế TNDN tạm tính
  - Bút toán thuế CIT
- ✅ Kết chuyển cuối năm:
  - Kết chuyển lãi/lỗ vào 421 (LNST)
  - Đóng kỳ kế toán
  - Chuyển số dư sang năm sau
- ✅ Checklist trước khi kết chuyển:
  - Đối chiếu công nợ
  - Kiểm kê tài sản
  - Xác nhận mọi bút toán đã được Posted
- ✅ Preview kết quả trước khi thực hiện
- ✅ Rollback kết chuyển nếu phát hiện sai sót

**Ràng buộc:**
- Chỉ Kế toán trưởng được phép kết chuyển
- Kỳ đã kết chuyển không cho phép nhập bút toán mới
- Phải backup dữ liệu trước khi kết chuyển

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

### 3.2 Accounts Payable (Công nợ Phải trả)

#### FR-AP-001: Quản lý Hóa đơn Nhà cung cấp

**Mô tả:** Hệ thống quản lý hóa đơn mua hàng/dịch vụ từ nhà cung cấp.

**Yêu cầu chi tiết:**
- ✅ Nhập hóa đơn nhà cung cấp:
  - Thông tin NCC (tên, MST, địa chỉ)
  - Số hóa đơn, ngày hóa đơn
  - Chi tiết hàng hóa/dịch vụ
  - Thuế VAT (0%, 5%, 8%, 10%)
  - Hạn thanh toán (payment term)
  - Trạng thái: Unpaid, Partially Paid, Paid
- ✅ Tích hợp hóa đơn điện tử (e-Invoice):
  - Đồng bộ từ cổng hóa đơn điện tử
  - Validation thông tin thuế
- ✅ Matching 3-way:
  - Purchase Order ↔ Goods Receipt ↔ Invoice
  - Cảnh báo nếu có chênh lệch
- ✅ Auto-generate bút toán khi hóa đơn được approve:
  - Nợ 156/211/611/642... (tùy loại)
  - Có 331 (Phải trả NCC)
  - Nợ 133 (thuế GTGT được khấu trừ)

**Ràng buộc:**
- MST nhà cung cấp phải hợp lệ (13 số hoặc 10 số)
- Thuế VAT phải đúng theo quy định

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

#### FR-AP-002: Thanh toán Nhà cung cấp

**Mô tả:** Hệ thống quản lý thanh toán cho nhà cung cấp.

**Yêu cầu chi tiết:**
- ✅ Tạo lệnh thanh toán (Payment Voucher):
  - Chọn hóa đơn cần thanh toán
  - Số tiền thanh toán (toàn bộ hoặc một phần)
  - Phương thức: Tiền mặt, Chuyển khoản
  - Ngày thanh toán
- ✅ Tự động tạo bút toán:
  - Nợ 331 (Giảm công nợ)
  - Có 111/112 (Giảm tiền mặt/ngân hàng)
- ✅ Đối chiếu công nợ với NCC:
  - Xuất báo cáo đối chiếu
  - Ghi nhận chênh lệch (nếu có)
- ✅ Theo dõi hạn thanh toán:
  - Cảnh báo hóa đơn sắp đến hạn
  - Báo cáo hóa đơn quá hạn
- ✅ Thanh toán hàng loạt (Batch Payment)
- ✅ Hủy thanh toán (với phê duyệt)

**Ràng buộc:**
- Số tiền thanh toán không được vượt quá công nợ còn lại
- Phải có đủ số dư tiền mặt/ngân hàng

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

#### FR-AP-003: Báo cáo Công nợ AP

**Mô tả:** Hệ thống cung cấp các báo cáo công nợ phải trả.

**Yêu cầu chi tiết:**
- ✅ **Aging Report** (Báo cáo phân tích tuổi nợ):
  - 0-30 ngày, 31-60 ngày, 61-90 ngày, >90 ngày
  - Theo nhà cung cấp
- ✅ **Supplier Ledger** (Sổ chi tiết nhà cung cấp)
- ✅ **Payment Schedule** (Lịch thanh toán dự kiến)
- ✅ **Cash Flow Forecast** (Dự báo dòng tiền chi)
- ✅ Export Excel, PDF
- ✅ Filter: Theo NCC, theo khoảng thời gian, theo trạng thái

**Độ ưu tiên:** ⭐⭐ HIGH (Should Have)

---

### 3.3 Accounts Receivable (Công nợ Phải thu)

#### FR-AR-001: Quản lý Hóa đơn Khách hàng

**Mô tả:** Hệ thống quản lý hóa đơn bán hàng/dịch vụ cho khách hàng.

**Yêu cầu chi tiết:**
- ✅ Nhập/tạo hóa đơn khách hàng:
  - Thông tin KH (tên, MST, địa chỉ)
  - Chi tiết hàng hóa/dịch vụ
  - Thuế VAT
  - Hạn thanh toán
  - Trạng thái: Unpaid, Partially Paid, Paid
- ✅ Tích hợp hóa đơn điện tử:
  - Xuất hóa đơn điện tử theo Nghị định 123/2020
  - Ký số hóa đơn
  - Gửi email cho khách hàng
- ✅ Auto-generate bút toán:
  - Nợ 131 (Phải thu khách hàng)
  - Có 511/512 (Doanh thu)
  - Có 3331 (Thuế GTGT phải nộp)
- ✅ Credit limit check: Cảnh báo nếu vượt hạn mức công nợ

**Ràng buộc:**
- Hóa đơn điện tử phải tuân thủ định dạng XML theo quy định
- MST khách hàng phải hợp lệ

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

#### FR-AR-002: Thu tiền Khách hàng

**Mô tả:** Hệ thống quản lý thu tiền từ khách hàng.

**Yêu cầu chi tiết:**
- ✅ Tạo phiếu thu (Receipt Voucher):
  - Chọn hóa đơn cần thu
  - Số tiền thu (toàn bộ hoặc một phần)
  - Phương thức: Tiền mặt, Chuyển khoản, Séc
  - Ngày thu
- ✅ Tự động tạo bút toán:
  - Nợ 111/112 (Tăng tiền mặt/ngân hàng)
  - Có 131 (Giảm công nợ phải thu)
- ✅ Đối chiếu công nợ với KH
- ✅ Theo dõi hạn thu tiền:
  - Cảnh báo hóa đơn sắp đến hạn
  - Báo cáo hóa đơn quá hạn (Overdue)
- ✅ Xử lý chiết khấu thanh toán sớm
- ✅ Hủy phiếu thu (với phê duyệt)

**Ràng buộc:**
- Số tiền thu không được vượt quá công nợ còn lại
- Phải có chứng từ hợp lệ (hóa đơn, biên lai)

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

#### FR-AR-003: Báo cáo Công nợ AR

**Mô tả:** Hệ thống cung cấp các báo cáo công nợ phải thu.

**Yêu cầu chi tiết:**
- ✅ **Aging Report** (Báo cáo phân tích tuổi nợ)
- ✅ **Customer Ledger** (Sổ chi tiết khách hàng)
- ✅ **Collection Schedule** (Lịch thu tiền dự kiến)
- ✅ **Cash Flow Forecast** (Dự báo dòng tiền thu)
- ✅ **Bad Debt Analysis** (Phân tích nợ xấu)
- ✅ Export Excel, PDF

**Độ ưu tiên:** ⭐⭐ HIGH (Should Have)

---

### 3.4 Fixed Assets (Tài sản Cố định)

#### FR-FA-001: Quản lý Tài sản Cố định

**Mô tả:** Hệ thống quản lý tài sản cố định từ mua sắm đến thanh lý.

**Yêu cầu chi tiết:**
- ✅ Đăng ký TSCĐ mới:
  - Mã TSCĐ (tự động/thủ công)
  - Tên TSCĐ, loại TSCĐ
  - Ngày mua, nguyên giá
  - Thời gian sử dụng (theo VAS)
  - Phương pháp khấu hao: Đường thẳng, Số dư giảm dần
  - Bộ phận quản lý
  - Thông tin vị trí, mã QR/Barcode
- ✅ Phân loại TSCĐ:
  - Nhà cửa, vật kiến trúc
  - Máy móc thiết bị
  - Phương tiện vận tải
  - Thiết bị văn phòng
  - Tài sản vô hình
- ✅ Quản lý thông tin bổ sung:
  - Hình ảnh TSCĐ
  - File tài liệu kỹ thuật
  - Lịch sử bảo trì
- ✅ Điều chuyển TSCĐ giữa các bộ phận
- ✅ Đánh giá lại TSCĐ
- ✅ In tem mã QR/Barcode

**Ràng buộc:**
- Mã TSCĐ không được trùng
- Thời gian khấu hao phải tuân thủ VAS và pháp luật thuế

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

#### FR-FA-002: Khấu hao Tự động

**Mô tả:** Hệ thống tự động tính và ghi nhận khấu hao TSCĐ hàng tháng.

**Yêu cầu chi tiết:**
- ✅ Tính khấu hao theo phương pháp:
  - **Đường thẳng**: Khấu hao = Nguyên giá / Số tháng SD
  - **Số dư giảm dần**: Khấu hao giảm dần theo năm
- ✅ Tự động chạy cuối tháng:
  - Tính khấu hao cho tất cả TSCĐ đang sử dụng
  - Tạo bút toán khấu hao:
    - Nợ 627/641/642 (Chi phí khấu hao)
    - Có 214 (Hao mòn TSCĐ)
- ✅ Preview trước khi Post
- ✅ Báo cáo khấu hao tháng/quý/năm
- ✅ Điều chỉnh khấu hao (nếu có thay đổi)

**Ràng buộc:**
- Chỉ tính khấu hao cho TSCĐ có trạng thái "Đang sử dụng"
- Ngừng khấu hao khi giá trị còn lại = 0

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

#### FR-FA-003: Thanh lý/Nhượng bán TSCĐ

**Mô tả:** Hệ thống hỗ trợ quy trình thanh lý, nhượng bán TSCĐ.

**Yêu cầu chi tiết:**
- ✅ Ghi nhận thanh lý:
  - Ngày thanh lý
  - Lý do thanh lý (hỏng, hết khấu hao, bán)
  - Thu hồi (nếu bán): Số tiền thu
- ✅ Tự động tạo bút toán:
  - **Trường hợp thanh lý vì hỏng:**
    - Nợ 214 (Khấu hao lũy kế)
    - Nợ 811 (Chi phí khác)
    - Có 211 (Nguyên giá TSCĐ)
  - **Trường hợp bán:**
    - Nợ 111/112 (Tiền thu)
    - Nợ 214 (Khấu hao lũy kế)
    - Có 211 (Nguyên giá)
    - Có 711 (Thu nhập khác) - nếu lãi
    - Nợ 811 (Chi phí khác) - nếu lỗ
- ✅ Lịch sử TSCĐ đã thanh lý
- ✅ Báo cáo thanh lý TSCĐ

**Ràng buộc:**
- Phải có phê duyệt từ cấp quản lý
- Không cho phép khôi phục TSCĐ đã thanh lý

**Độ ưu tiên:** ⭐⭐ HIGH (Should Have)

---

### 3.5 Cash Management (Quản lý Ngân quỹ)

#### FR-CM-001: Quản lý Sổ quỹ Tiền mặt

**Mô tả:** Hệ thống quản lý thu chi tiền mặt.

**Yêu cầu chi tiết:**
- ✅ Phiếu thu tiền mặt:
  - Số phiếu thu (tự động)
  - Người nộp, lý do thu
  - Số tiền, ngày thu
  - Tài khoản đối ứng
- ✅ Phiếu chi tiền mặt:
  - Số phiếu chi (tự động)
  - Người nhận, lý do chi
  - Số tiền, ngày chi
  - Tài khoản đối ứng
- ✅ Tự động tạo bút toán khi phê duyệt
- ✅ Kiểm tra số dư quỹ: Cảnh báo nếu chi vượt tồn quỹ
- ✅ Sổ quỹ tiền mặt real-time
- ✅ Kiểm kê quỹ: Đối chiếu sổ sách với thực tế
- ✅ Giới hạn tồn quỹ tối đa (theo quy định)

**Ràng buộc:**
- Thủ quỹ phải kiểm kê cuối ngày
- Tồn quỹ không được vượt mức quy định (thường 50-100 triệu)

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

#### FR-CM-002: Quản lý Tiền gửi Ngân hàng

**Mô tả:** Hệ thống quản lý giao dịch tiền gửi ngân hàng.

**Yêu cầu chi tiết:**
- ✅ Quản lý nhiều tài khoản ngân hàng
- ✅ Giao dịch ngân hàng:
  - Tiền gửi vào ngân hàng
  - Rút tiền từ ngân hàng
  - Chuyển khoản đi
  - Chuyển khoản đến
- ✅ Import sao kê ngân hàng (Excel, CSV, API):
  - Tự động mapping với bút toán
  - Tự động khớp lệnh thanh toán
- ✅ Đối chiếu ngân hàng:
  - So sánh sổ sách vs sao kê ngân hàng
  - Ghi nhận chênh lệch (lãi tiền gửi, phí NH)
  - Bank Reconciliation Statement
- ✅ Báo cáo tồn quỹ ngân hàng theo thời gian thực

**Ràng buộc:**
- STK ngân hàng phải được validate
- Import sao kê phải đúng format

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

### 3.6 Tax Management (Quản lý Thuế)

#### FR-TAX-001: Khai báo Thuế GTGT

**Mô tả:** Hệ thống hỗ trợ lập tờ khai thuế GTGT (VAT).

**Yêu cầu chi tiết:**
- ✅ Thu thập dữ liệu:
  - Thuế GTGT đầu ra (từ hóa đơn bán hàng)
  - Thuế GTGT đầu vào (từ hóa đơn mua hàng)
- ✅ Tính toán:
  - Thuế GTGT phải nộp = Đầu ra - Đầu vào
  - Xử lý trường hợp thuế âm (khấu trừ kỳ sau)
- ✅ Xuất tờ khai:
  - Mẫu 01/GTGT (tháng/quý)
  - Phụ lục 01-1/GTGT (Hàng hóa, dịch vụ bán ra)
  - Phụ lục 01-2/GTGT (Hàng hóa, dịch vụ mua vào)
- ✅ Xuất file XML theo chuẩn Tổng cục thuế
- ✅ Nộp thuế điện tử (tích hợp eTax)
- ✅ Lưu trữ tờ khai đã nộp

**Ràng buộc:**
- Dữ liệu hóa đơn phải đầy đủ và chính xác
- Tờ khai phải đúng mẫu theo Thông tư mới nhất

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

#### FR-TAX-002: Khai báo Thuế TNDN (CIT)

**Mô tả:** Hệ thống hỗ trợ tính và khai báo thuế thu nhập doanh nghiệp.

**Yêu cầu chi tiết:**
- ✅ Tính thuế TNDN tạm tính (quý):
  - Dựa trên lợi nhuận trước thuế
  - Tỷ lệ thuế: 20% (hoặc theo quy định)
  - Điều chỉnh chi phí không hợp lý
- ✅ Quyết toán thuế TNDN (năm):
  - Tổng hợp doanh thu, chi phí cả năm
  - Điều chỉnh tăng/giảm
  - Tính thuế phải nộp hoặc được hoàn
- ✅ Xuất tờ khai:
  - Mẫu 02/TNDN (tạm tính quý)
  - Mẫu 03/TNDN (quyết toán năm)
- ✅ Xuất file XML, nộp điện tử

**Ràng buộc:**
- Phải có BCTC đã kiểm toán (đối với quyết toán năm)
- Tuân thủ Thông tư 78/2014/TT-BTC

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

#### FR-TAX-003: Tích hợp Thuế TNCN từ Payroll

**Mô tả:** Hệ thống nhận dữ liệu thuế TNCN từ module Payroll để khai báo.

**Yêu cầu chi tiết:**
- ✅ Đồng bộ dữ liệu từ Payroll:
  - Thu nhập chịu thuế của từng nhân viên
  - Thuế TNCN đã khấu trừ
  - Giảm trừ gia cảnh, người phụ thuộc
- ✅ Lập tờ khai thuế TNCN:
  - Mẫu 05/KK-TNCN (khấu trừ tháng/quý)
  - Phụ lục 05-1/BK-TNCN (chi tiết từng nhân viên)
- ✅ Nộp thuế TNCN:
  - Ghi nhận bút toán nộp thuế
  - Đối chiếu với cơ quan thuế
- ✅ Xuất file XML, nộp điện tử

**Ràng buộc:**
- Dữ liệu Payroll phải được đóng kỳ
- Phải đúng hạn nộp (ngày 20 tháng sau)

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

### 3.7 Financial Reporting (Báo cáo Tài chính)

#### FR-FR-001: Báo cáo Tài chính Theo VAS

**Mô tả:** Hệ thống tự động tạo các báo cáo tài chính theo Chuẩn mực VAS.

**Yêu cầu chi tiết:**
- ✅ **Bảng cân đối kế toán** (Balance Sheet):
  - Theo Thông tư 200/2014/TT-BTC (Mẫu B01-DN)
  - Tài sản = Nguồn vốn
  - So sánh với kỳ trước
- ✅ **Báo cáo kết quả hoạt động kinh doanh** (Income Statement):
  - Mẫu B02-DN
  - Doanh thu, Chi phí, Lợi nhuận
  - So sánh với kỳ trước
- ✅ **Báo cáo lưu chuyển tiền tệ** (Cash Flow Statement):
  - Mẫu B03-DN
  - Phương pháp trực tiếp hoặc gián tiếp
  - Hoạt động kinh doanh, đầu tư, tài chính
- ✅ **Thuyết minh báo cáo tài chính**:
  - Mẫu B09-DN
  - Chính sách kế toán
  - Thông tin bổ sung
- ✅ Export PDF, Excel
- ✅ Lưu trữ phiên bản BCTC theo kỳ
- ✅ Chữ ký điện tử (Kế toán trưởng, Giám đốc)

**Ràng buộc:**
- BCTC phải cân đối chính xác
- Tuân thủ format theo Thông tư 133/2016/TT-BTC

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

#### FR-FR-002: Báo cáo Quản trị

**Mô tả:** Hệ thống cung cấp các báo cáo phục vụ quản lý doanh nghiệp.

**Yêu cầu chi tiết:**
- ✅ **Financial Dashboard**:
  - Tổng quan tài chính (KPIs)
  - Revenue, Expenses, Profit trends
  - Cash flow summary
  - AR/AP aging charts
- ✅ **Báo cáo chi phí theo bộ phận**
- ✅ **Phân tích tỷ lệ tài chính**:
  - Tỷ suất lợi nhuận
  - Khả năng thanh toán
  - Vòng quay tài sản
- ✅ **Budget vs Actual**: So sánh ngân sách vs thực tế
- ✅ **Trend Analysis**: Phân tích xu hướng theo thời gian
- ✅ Tùy chỉnh báo cáo theo nhu cầu

**Độ ưu tiên:** ⭐⭐ HIGH (Should Have)

---

#### FR-FR-003: Báo cáo Thuế

**Mô tả:** Hệ thống cung cấp báo cáo hỗ trợ khai thuế và kiểm tra.

**Yêu cầu chi tiết:**
- ✅ Báo cáo thuế GTGT chi tiết
- ✅ Báo cáo thuế TNDN chi tiết
- ✅ Báo cáo thuế TNCN (từ Payroll)
- ✅ Sổ sách liên quan thuế:
  - Sổ theo dõi hóa đơn
  - Sổ mua hàng
  - Sổ bán hàng
- ✅ Audit trail: Nhật ký thay đổi dữ liệu thuế

**Độ ưu tiên:** ⭐⭐⭐ CRITICAL (Must Have)

---

## 4. YÊU CẦU PHI CHỨC NĂNG

### 4.1 Performance (Hiệu năng)

| Yêu cầu | Mục tiêu |
|---------|----------|
| **Response Time** | < 2 giây cho thao tác đơn giản |
| | < 5 giây cho báo cáo phức tạp |
| **Throughput** | Xử lý 1000 bút toán/phút |
| **Concurrent Users** | Hỗ trợ 100 users đồng thời |
| **Database** | Xử lý 10 triệu bút toán mà không giảm performance |
| **Report Generation** | BCTC tháng < 10 giây, năm < 30 giây |

### 4.2 Scalability (Khả năng Mở rộng)

- ✅ Horizontal scaling: Thêm server khi tăng users
- ✅ Hỗ trợ multi-company: Nhiều công ty trong 1 hệ thống
- ✅ Hỗ trợ multi-branch: Chi nhánh/văn phòng đại diện
- ✅ Database partitioning theo năm tài chính

### 4.3 Reliability (Độ tin cậy)

| Yêu cầu | Mục tiêu |
|---------|----------|
| **Uptime** | 99.5% (downtime < 3.5 giờ/tháng) |
| **Data Integrity** | 100% - Không được mất dữ liệu |
| **Transaction Consistency** | ACID compliance |
| **Backup** | Daily incremental, Weekly full backup |
| **Recovery Time Objective (RTO)** | < 4 giờ |
| **Recovery Point Objective (RPO)** | < 1 giờ |

### 4.4 Security (Bảo mật)

- ✅ **Authentication**:
  - Username/Password + MFA (2FA)
  - SSO integration (LDAP/Active Directory)
  - Session timeout: 30 phút không hoạt động
- ✅ **Authorization**:
  - Role-based Access Control (RBAC)
  - Function-level permissions
  - Data-level permissions (chỉ xem dữ liệu bộ phận mình)
- ✅ **Audit Trail**:
  - Log mọi thao tác: Ai, Làm gì, Khi nào
  - Không được xóa/sửa audit log
  - Lưu trữ audit log tối thiểu 10 năm
- ✅ **Data Encryption**:
  - Encryption at rest (database)
  - Encryption in transit (HTTPS/TLS 1.2+)
  - Mã hóa thông tin nhạy cảm (STK, MST)
- ✅ **Compliance**:
  - Tuân thủ Luật An toàn thông tin mạng VN
  - ISO 27001 compliance (nếu có)

### 4.5 Usability (Khả năng Sử dụng)

- ✅ Giao diện tiếng Việt (chính), hỗ trợ tiếng Anh
- ✅ Responsive design: Desktop, Tablet
- ✅ Keyboard shortcuts cho thao tác thường xuyên
- ✅ Auto-save: Tự động lưu dữ liệu nháp
- ✅ Undo/Redo: Cho các thao tác quan trọng
- ✅ Contextual help: Tooltip, hướng dẫn inline
- ✅ Error messages rõ ràng, hướng dẫn khắc phục

### 4.6 Maintainability (Khả năng Bảo trì)

- ✅ Modular architecture: Dễ thay đổi, mở rộng
- ✅ Logging: Chi tiết lỗi, warning, info
- ✅ Monitoring: Dashboard theo dõi hệ thống
- ✅ Configuration: Tách riêng config khỏi code
- ✅ Documentation: API docs, technical docs, user manuals

### 4.7 Compatibility (Tương thích)

**Browser Support:**
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Edge (latest 2 versions)
- Safari (latest 2 versions)

**Operating System:**
- Windows 10/11
- macOS 12+
- Linux (Ubuntu 20.04+)

**Integration:**
- API: RESTful JSON
- Import/Export: Excel, CSV, XML, PDF
- Database: MySQL 8.0+, PostgreSQL 13+, SQL Server 2019+

### 4.8 Compliance (Tuân thủ Pháp luật)

- ✅ **Luật Kế toán** số 88/2015/QH13
- ✅ **VAS** (Chuẩn mực Kế toán Việt Nam)
- ✅ **Thông tư 200/2014/TT-BTC** - Hệ thống tài khoản
- ✅ **Thông tư 133/2016/TT-BTC** - Báo cáo tài chính
- ✅ **Nghị định 123/2020/NĐ-CP** - Hóa đơn điện tử
- ✅ **Luật An toàn thông tin mạng** - Bảo mật dữ liệu

---

## 5. YÊU CẦU GIAO DIỆN

### 5.1 User Interface Requirements

**Layout:**
- ✅ Header: Logo, Menu chính, User info, Notifications
- ✅ Sidebar: Menu chức năng (có thể collapse)
- ✅ Main content: Nội dung chính
- ✅ Footer: Version info, links

**Navigation:**
- ✅ Breadcrumb: Hiển thị vị trí hiện tại
- ✅ Quick access: Phím tắt cho chức năng thường dùng
- ✅ Recent items: Danh sách giao dịch gần đây

**Data Entry:**
- ✅ Form validation real-time
- ✅ Auto-complete cho tài khoản, đối tượng
- ✅ Date picker (calendar)
- ✅ Number format: Ngăn cách hàng nghìn, 2 số thập phân
- ✅ File upload: Drag & drop

**Data Display:**
- ✅ Table: Sortable, filterable, paginated
- ✅ Grid: Editable inline (nếu cần)
- ✅ Charts: Line, Bar, Pie cho báo cáo

### 5.2 External Interface Requirements

**Integration với Module khác:**
- ✅ **Payroll**: Nhận dữ liệu lương, thuế TNCN
- ✅ **Inventory**: Nhận dữ liệu xuất nhập kho
- ✅ **Sales**: Nhận dữ liệu hóa đơn bán hàng
- ✅ **Purchasing**: Nhận dữ liệu hóa đơn mua hàng

**Integration với Hệ thống Bên ngoài:**
- ✅ **Banking**: Import sao kê ngân hàng (API/file)
- ✅ **e-Invoice**: Tích hợp cổng hóa đơn điện tử
- ✅ **e-Tax**: Nộp tờ khai thuế điện tử
- ✅ **ERP cũ**: Import dữ liệu migration

---

## 6. RÀNG BUỘC VÀ GIẢ ĐỊNH

### 6.1 Ràng buộc (Constraints)

**Pháp lý:**
- ✅ Phải tuân thủ 100% pháp luật kế toán và thuế Việt Nam
- ✅ Dữ liệu phải lưu trữ trong nước (theo Luật An toàn thông tin)
- ✅ Hóa đơn điện tử phải đúng format theo Tổng cục thuế

**Kỹ thuật:**
- ✅ Phải tương thích với hạ tầng hiện tại
- ✅ Database phải hỗ trợ Unicode (tiếng Việt)
- ✅ Không được làm gián đoạn hoạt động hiện tại khi triển khai

**Ngân sách:**
- ✅ Chi phí phát triển: 500M VNĐ (toàn bộ hệ thống)
- ✅ Chi phí bảo trì/năm: 10% chi phí phát triển

**Thời gian:**
- ✅ Go-live: 6 tháng kể từ kickoff
- ✅ Giai đoạn Requirements: 1 tháng
- ✅ Giai đoạn Design: 1 tháng
- ✅ Giai đoạn Development: 3 tháng
- ✅ Giai đoạn UAT: 2 tuần
- ✅ Giai đoạn Deployment: 2 tuần

### 6.2 Giả định (Assumptions)

- ✅ Users có kiến thức kế toán cơ bản
- ✅ Có đội ngũ IT hỗ trợ triển khai và vận hành
- ✅ Hạ tầng mạng ổn định, băng thông đủ
- ✅ Có ngân sách cho đào tạo người dùng
- ✅ Stakeholders sẵn sàng tham gia UAT
- ✅ Dữ liệu từ hệ thống cũ có thể migrate

---

## 7. TIÊU CHÍ CHẤP NHẬN

### 7.1 Functional Acceptance Criteria

| Tiêu chí | Mục tiêu |
|----------|----------|
| **Requirements Coverage** | 100% yêu cầu Must Have được implement |
| **Test Pass Rate** | ≥ 98% test cases pass |
| **Defect Density** | ≤ 1 critical bug/module |
| **User Acceptance** | ≥ 90% UAT scenarios pass |

### 7.2 Non-Functional Acceptance Criteria

| Tiêu chí | Mục tiêu |
|----------|----------|
| **Performance** | Đạt mục tiêu theo mục 4.1 |
| **Security** | Pass security audit |
| **Usability** | SUS score ≥ 70 |
| **Compliance** | 100% tuân thủ VAS và pháp luật |

### 7.3 Documentation Acceptance Criteria

- ✅ User Manual hoàn chỉnh
- ✅ Technical Documentation đầy đủ
- ✅ API Documentation (nếu có)
- ✅ Training Materials sẵn sàng

### 7.4 Sign-off Criteria

**Requirements Sign-off:**
- ✅ CFO/Kế toán trưởng phê duyệt
- ✅ IT Lead phê duyệt tính khả thi kỹ thuật
- ✅ Product Owner chấp nhận scope

**UAT Sign-off:**
- ✅ ≥ 90% test scenarios pass
- ✅ Critical bugs = 0
- ✅ User satisfaction ≥ 80%

**Go-live Sign-off:**
- ✅ Production environment ready
- ✅ Data migration completed & verified
- ✅ Users trained
- ✅ Support team ready

---

## PHỤ LỤC

### Phụ lục A: Danh sách Tài khoản Kế toán (Chart of Accounts)

*Xem file riêng: ChartOfAccounts_VAS.xlsx*

### Phụ lục B: Mẫu Chứng từ Kế toán

*Xem file riêng: AccountingForms.pdf*

### Phụ lục C: Luồng Dữ liệu Tích hợp

*Xem file riêng: 7_DataFlowDiagram.md*

### Phụ lục D: Quy định Pháp luật Tham khảo

- Luật Kế toán số 88/2015/QH13
- Thông tư 200/2014/TT-BTC
- Thông tư 133/2016/TT-BTC
- Nghị định 123/2020/NĐ-CP
- VAS 01-26

---

**Phê duyệt:**

| Vai trò | Họ tên | Chữ ký | Ngày |
|---------|--------|--------|------|
| **CFO/Kế toán trưởng** | | | |
| **Product Owner** | | | |
| **Technical Lead** | | | |
| **Business Analyst Lead** | | | |

---

*Tài liệu này là tài sản của dự án và được bảo mật. Mọi thay đổi phải được phê duyệt bởi Product Owner.*

**Phiên bản:** 1.0
**Ngày tạo:** 2024-10-03
**Người tạo:** BA Team
**Trạng thái:** ✅ Draft - Pending Review
