# Requirements Traceability Matrix (RTM)
# Hệ thống Kế toán - Accounting Module

## Lịch sử Phiên bản

| Phiên bản | Ngày       | Tác giả | Mô tả Thay đổi |
|-----------|------------|---------|----------------|
| 1.0       | 2024-10-03 | BA Team | Phiên bản khởi tạo |

---

## MỤC LỤC

1. [Giới thiệu](#1-giới-thiệu)
2. [Ma trận Truy xuất Chính](#2-ma-trận-truy-xuất-chính)
3. [Traceability by Epic](#3-traceability-by-epic)
4. [Impact Analysis](#4-impact-analysis)
5. [Coverage Report](#5-coverage-report)

---

## 1. GIỚI THIỆU

### 1.1 Mục đích

Requirements Traceability Matrix (RTM) đảm bảo:
- ✅ Mỗi yêu cầu nghiệp vụ được implement đầy đủ
- ✅ Mỗi chức năng được test coverage
- ✅ Theo dõi trạng thái từ Requirements → Design → Development → Testing
- ✅ Impact analysis khi thay đổi requirements

### 1.2 Cấu trúc Ma trận

```
Business Requirement (BR)
    ↓
Functional Requirement (FR)
    ↓
User Story (US)
    ↓
Design Specification (DS)
    ↓
Test Case (TC)
    ↓
Implementation Status
```

### 1.3 Trạng thái Theo dõi

| Status | Ý nghĩa | Icon |
|--------|---------|------|
| **Defined** | Yêu cầu đã định nghĩa | 📝 |
| **Designed** | Đã có thiết kế | 📐 |
| **In Development** | Đang phát triển | 🔨 |
| **Dev Complete** | Phát triển hoàn tất | ✅ |
| **In Testing** | Đang test | 🧪 |
| **Tested** | Test hoàn tất | ✔️ |
| **Deployed** | Đã triển khai | 🚀 |

---

## 2. MA TRẬN TRUY XUẤT CHÍNH

### 2.1 General Ledger (GL)

| BR-ID | Business Requirement | FR-ID | Functional Req | US-ID | User Story | TC-ID | Test Cases | Status |
|-------|---------------------|-------|----------------|-------|------------|-------|------------|--------|
| **BR-GL-001** | **Quản lý Tài khoản Kế toán** | | | | | | | |
| | Hệ thống phải hỗ trợ Chart of Accounts theo TT200 | FR-GL-001 | Quản lý Chart of Accounts | US-GL-001 | Quản lý Hệ thống Tài khoản | TC-GL-001-001<br/>TC-GL-001-002<br/>TC-GL-001-003 | Xem COA<br/>Thêm TK<br/>Import Excel | 📝 |
| **BR-GL-002** | **Ghi nhận Bút toán Kế toán** | | | | | | | |
| | Hệ thống cho phép ghi nhận bút toán theo nguyên tắc kép | FR-GL-002 | Nhập và quản lý bút toán | US-GL-002 | Nhập bút toán thủ công | TC-GL-002-001<br/>TC-GL-002-002<br/>TC-GL-002-003<br/>TC-GL-002-004 | Tạo bút toán đơn<br/>Bút toán phức hợp<br/>Kiểm tra cân đối<br/>Đính kèm chứng từ | 📝 |
| | | FR-GL-002 | | US-GL-003 | Quy trình phê duyệt | TC-GL-003-001<br/>TC-GL-003-002<br/>TC-GL-003-003 | Gửi phê duyệt<br/>Approve<br/>Reject | 📝 |
| | | FR-GL-002 | | US-GL-004 | Đảo bút toán | TC-GL-004-001<br/>TC-GL-004-002 | Tạo reversal<br/>Link bút toán gốc | 📝 |
| **BR-GL-003** | **Sổ sách Kế toán** | | | | | | | |
| | Hệ thống tự động tạo sổ cái và sổ chi tiết | FR-GL-003 | Sổ cái và sổ chi tiết | US-GL-005 | Xem sổ cái | TC-GL-005-001<br/>TC-GL-005-002<br/>TC-GL-005-003 | Sổ cái theo TK<br/>Drill-down<br/>Export Excel | 📝 |
| | | FR-GL-003 | | US-GL-006 | Nhật ký chung | TC-GL-006-001<br/>TC-GL-006-002 | Xem journal<br/>Filter & Search | 📝 |
| | | FR-GL-003 | | US-GL-007 | Bảng cân đối số phát sinh | TC-GL-007-001<br/>TC-GL-007-002<br/>TC-GL-007-003 | Trial balance<br/>Kiểm tra cân đối<br/>Drill-down cấp | 📝 |
| **BR-GL-004** | **Kết chuyển Cuối kỳ** | | | | | | | |
| | Hệ thống hỗ trợ kết chuyển tháng/quý/năm | FR-GL-004 | Kết chuyển cuối kỳ | US-GL-009 | Kết chuyển cuối tháng | TC-GL-009-001<br/>TC-GL-009-002<br/>TC-GL-009-003<br/>TC-GL-009-004 | Checklist<br/>KĐ doanh thu<br/>KĐ chi phí<br/>Preview | 📝 |
| | | FR-GL-004 | | US-GL-010 | Kết chuyển cuối năm | TC-GL-010-001<br/>TC-GL-010-002<br/>TC-GL-010-003 | Thuế TNDN<br/>LNST → 421<br/>Đóng năm TC | 📝 |
| **BR-GL-005** | **Kiểm soát và Audit** | | | | | | | |
| | Hệ thống ghi nhận đầy đủ audit trail | FR-GL-005 | Audit trail | US-GL-012 | Audit trail | TC-GL-012-001<br/>TC-GL-012-002 | Xem lịch sử<br/>Log không xóa được | 📝 |
| | | FR-GL-004 | | US-GL-011 | Reopen period | TC-GL-011-001<br/>TC-GL-011-002 | Request reopen<br/>Approve reopen | 📝 |
| **BR-GL-006** | **Tối ưu Nhập liệu** | | | | | | | |
| | Hệ thống hỗ trợ template để giảm công nhập liệu | FR-GL-006 | Template bút toán | US-GL-008 | Template bút toán | TC-GL-008-001<br/>TC-GL-008-002 | Lưu template<br/>Tạo từ template | 📝 |

---

### 2.2 Accounts Payable (AP)

| BR-ID | Business Requirement | FR-ID | Functional Req | US-ID | User Story | TC-ID | Test Cases | Status |
|-------|---------------------|-------|----------------|-------|------------|-------|------------|--------|
| **BR-AP-001** | **Quản lý Hóa đơn NCC** | | | | | | | |
| | Hệ thống quản lý hóa đơn mua hàng từ NCC | FR-AP-001 | Quản lý hóa đơn NCC | US-AP-001 | Nhập hóa đơn NCC | TC-AP-001-001<br/>TC-AP-001-002<br/>TC-AP-001-003<br/>TC-AP-001-004 | Nhập hóa đơn<br/>3-Way matching<br/>Cảnh báo chênh lệch<br/>Auto bút toán | 📝 |
| | | FR-AP-001 | | US-AP-002 | Import e-Invoice | TC-AP-002-001<br/>TC-AP-002-002<br/>TC-AP-002-003 | Kết nối API<br/>Parse XML<br/>Review & accept | 📝 |
| **BR-AP-002** | **Thanh toán NCC** | | | | | | | |
| | Hệ thống quản lý thanh toán cho NCC | FR-AP-002 | Thanh toán NCC | US-AP-003 | Thanh toán NCC | TC-AP-003-001<br/>TC-AP-003-002<br/>TC-AP-003-003<br/>TC-AP-003-004 | Chọn HĐ thanh toán<br/>Tạo lệnh TT<br/>Confirm payment<br/>Check số dư | 📝 |
| | | FR-AP-002 | | US-AP-004 | Thanh toán 1 phần | TC-AP-004-001<br/>TC-AP-004-002 | Partial payment<br/>Remaining tracking | 📝 |
| | | FR-AP-002 | | US-AP-008 | Tạm ứng NCC | TC-AP-008-001<br/>TC-AP-008-002 | Ghi nhận tạm ứng<br/>Apply advance | 📝 |
| | | FR-AP-002 | | US-AP-009 | Hủy thanh toán | TC-AP-009-001 | Void payment | 📝 |
| **BR-AP-003** | **Đối chiếu Công nợ** | | | | | | | |
| | Hệ thống hỗ trợ đối chiếu công nợ với NCC | FR-AP-003 | Đối chiếu công nợ | US-AP-005 | Đối chiếu với NCC | TC-AP-005-001<br/>TC-AP-005-002<br/>TC-AP-005-003<br/>TC-AP-005-004 | Tạo bảng ĐC<br/>Export & send<br/>Confirm ĐC<br/>Xử lý chênh lệch | 📝 |
| **BR-AP-004** | **Báo cáo Công nợ AP** | | | | | | | |
| | Hệ thống cung cấp báo cáo phân tích công nợ | FR-AP-004 | Báo cáo AP | US-AP-006 | AP Aging Report | TC-AP-006-001<br/>TC-AP-006-002<br/>TC-AP-006-003 | View aging<br/>Highlight quá hạn<br/>Drill-down | 📝 |
| | | FR-AP-004 | | US-AP-007 | Lịch thanh toán | TC-AP-007-001<br/>TC-AP-007-002 | Payment schedule<br/>Alert đến hạn | 📝 |
| | | FR-AP-004 | | US-AP-010 | Supplier Ledger | TC-AP-010-001 | Sổ chi tiết NCC | 📝 |

---

### 2.3 Accounts Receivable (AR)

| BR-ID | Business Requirement | FR-ID | Functional Req | US-ID | User Story | TC-ID | Test Cases | Status |
|-------|---------------------|-------|----------------|-------|------------|-------|------------|--------|
| **BR-AR-001** | **Quản lý Hóa đơn KH** | | | | | | | |
| | Hệ thống quản lý hóa đơn bán hàng cho KH | FR-AR-001 | Quản lý hóa đơn KH | US-AR-001 | Xuất hóa đơn KH | TC-AR-001-001<br/>TC-AR-001-002<br/>TC-AR-001-003 | Tạo hóa đơn<br/>Check credit limit<br/>Auto bút toán | 📝 |
| | | FR-AR-001 | | US-AR-002 | Xuất e-Invoice | TC-AR-002-001<br/>TC-AR-002-002<br/>TC-AR-002-003<br/>TC-AR-002-004 | Tạo XML<br/>Nhận mã CQT<br/>Gửi email KH<br/>Xử lý từ chối | 📝 |
| **BR-AR-002** | **Thu tiền KH** | | | | | | | |
| | Hệ thống quản lý thu tiền từ KH | FR-AR-002 | Thu tiền KH | US-AR-003 | Thu tiền KH | TC-AR-003-001<br/>TC-AR-003-002<br/>TC-AR-003-003 | Tạo phiếu thu<br/>Confirm receipt<br/>Auto-match | 📝 |
| | | FR-AR-002 | | US-AR-004 | Thu 1 phần | TC-AR-004-001<br/>TC-AR-004-002 | Partial receipt<br/>Lịch sử TT | 📝 |
| | | FR-AR-002 | | US-AR-005 | Chiết khấu TT sớm | TC-AR-005-001 | Áp dụng discount | 📝 |
| **BR-AR-003** | **Quản lý Nợ quá hạn** | | | | | | | |
| | Hệ thống theo dõi và cảnh báo nợ quá hạn | FR-AR-003 | Quản lý nợ quá hạn | US-AR-006 | Quản lý nợ quá hạn | TC-AR-006-001<br/>TC-AR-006-002<br/>TC-AR-006-003 | Auto alert<br/>Phân loại level<br/>Credit hold | 📝 |
| | | FR-AR-003 | | US-AR-007 | Dự phòng nợ khó đòi | TC-AR-007-001<br/>TC-AR-007-002<br/>TC-AR-007-003 | Tính dự phòng<br/>Ghi nhận BT<br/>Xóa nợ | 📝 |
| **BR-AR-004** | **Báo cáo Công nợ AR** | | | | | | | |
| | Hệ thống cung cấp báo cáo phân tích công nợ KH | FR-AR-004 | Báo cáo AR | US-AR-008 | AR Aging Report | TC-AR-008-001 | View aging | 📝 |
| | | FR-AR-004 | | US-AR-009 | Đối chiếu với KH | TC-AR-009-001 | Reconciliation | 📝 |
| | | FR-AR-004 | | US-AR-010 | Customer Ledger | TC-AR-010-001 | Sổ chi tiết KH | 📝 |

---

### 2.4 Fixed Assets (FA)

| BR-ID | Business Requirement | FR-ID | Functional Req | US-ID | User Story | TC-ID | Test Cases | Status |
|-------|---------------------|-------|----------------|-------|------------|-------|------------|--------|
| **BR-FA-001** | **Quản lý TSCĐ** | | | | | | | |
| | Hệ thống quản lý TSCĐ từ mua sắm đến thanh lý | FR-FA-001 | Quản lý TSCĐ | US-FA-001 | Đăng ký TSCĐ mới | TC-FA-001-001<br/>TC-FA-001-002<br/>TC-FA-001-003<br/>TC-FA-001-004 | Nhập thông tin<br/>Upload ảnh/docs<br/>Tạo QR code<br/>Bút toán mua | 📝 |
| | | FR-FA-001 | | US-FA-003 | Điều chuyển TSCĐ | TC-FA-003-001<br/>TC-FA-003-002 | Transfer asset<br/>Điều chỉnh KH | 📝 |
| | | FR-FA-001 | | US-FA-004 | Thanh lý TSCĐ | TC-FA-004-001<br/>TC-FA-004-002<br/>TC-FA-004-003 | Thanh lý vì hỏng<br/>Bán - Lãi<br/>Bán - Lỗ | 📝 |
| | | FR-FA-001 | | US-FA-005 | Đánh giá lại | TC-FA-005-001 | Revaluation | 📝 |
| **BR-FA-002** | **Khấu hao TSCĐ** | | | | | | | |
| | Hệ thống tự động tính khấu hao hàng tháng | FR-FA-002 | Khấu hao tự động | US-FA-002 | Khấu hao tự động | TC-FA-002-001<br/>TC-FA-002-002<br/>TC-FA-002-003<br/>TC-FA-002-004 | Auto-run cuối tháng<br/>Đường thẳng<br/>Bút toán KH<br/>Ngừng KH khi hết | 📝 |
| **BR-FA-003** | **Báo cáo và Kiểm kê** | | | | | | | |
| | Hệ thống cung cấp báo cáo TSCĐ và kiểm kê | FR-FA-003 | Báo cáo FA | US-FA-006 | Báo cáo TSCĐ | TC-FA-006-001<br/>TC-FA-006-002 | Danh sách TSCĐ<br/>Báo cáo KH | 📝 |
| | | FR-FA-003 | | US-FA-007 | Kiểm kê TSCĐ | TC-FA-007-001<br/>TC-FA-007-002<br/>TC-FA-007-003 | Tạo phiếu kiểm kê<br/>Nhập kết quả<br/>Xử lý chênh lệch | 📝 |
| | | FR-FA-003 | | US-FA-008 | Bảo trì TSCĐ | TC-FA-008-001<br/>TC-FA-008-002 | Ghi nhận bảo trì<br/>Alert bảo trì | 📝 |
| | | FR-FA-003 | | US-FA-009 | Lịch sử TSCĐ | TC-FA-009-001 | View history | 📝 |

---

### 2.5 Cash Management (CM)

| BR-ID | Business Requirement | FR-ID | Functional Req | US-ID | User Story | TC-ID | Test Cases | Status |
|-------|---------------------|-------|----------------|-------|------------|-------|------------|--------|
| **BR-CM-001** | **Quản lý Tiền mặt** | | | | | | | |
| | Hệ thống quản lý thu chi tiền mặt | FR-CM-001 | Quản lý sổ quỹ | US-CM-001 | Phiếu thu tiền mặt | TC-CM-001-001<br/>TC-CM-001-002 | Tạo phiếu thu<br/>Auto bút toán | 📝 |
| | | FR-CM-001 | | US-CM-002 | Phiếu chi tiền mặt | TC-CM-002-001<br/>TC-CM-002-002<br/>TC-CM-002-003 | Đề nghị TT<br/>Phê duyệt<br/>Chi tiền | 📝 |
| | | FR-CM-001 | | US-CM-006 | Sổ quỹ | TC-CM-006-001<br/>TC-CM-006-002 | Xem sổ quỹ<br/>Real-time balance | 📝 |
| | | FR-CM-001 | | US-CM-007 | Kiểm kê quỹ | TC-CM-007-001<br/>TC-CM-007-002 | Tạo kiểm kê<br/>Xử lý chênh lệch | 📝 |
| **BR-CM-002** | **Quản lý Ngân hàng** | | | | | | | |
| | Hệ thống quản lý giao dịch ngân hàng | FR-CM-002 | Quản lý NH | US-CM-003 | Quản lý TK NH | TC-CM-003-001<br/>TC-CM-003-002 | Thêm TK NH<br/>Giao dịch NH | 📝 |
| | | FR-CM-002 | | US-CM-004 | Import sao kê | TC-CM-004-001<br/>TC-CM-004-002 | Import Excel/CSV<br/>Auto-mapping | 📝 |
| | | FR-CM-002 | | US-CM-005 | Đối chiếu NH | TC-CM-005-001<br/>TC-CM-005-002<br/>TC-CM-005-003 | Auto-matching<br/>Phân tích chênh lệch<br/>Bank recon statement | 📝 |
| **BR-CM-003** | **Báo cáo Dòng tiền** | | | | | | | |
| | Hệ thống báo cáo dòng tiền | FR-CM-003 | Báo cáo Cash | US-CM-008 | Cash Flow Report | TC-CM-008-001 | Cash flow stmt | 📝 |

---

### 2.6 Tax Management (TAX)

| BR-ID | Business Requirement | FR-ID | Functional Req | US-ID | User Story | TC-ID | Test Cases | Status |
|-------|---------------------|-------|----------------|-------|------------|-------|------------|--------|
| **BR-TAX-001** | **Khai thuế GTGT** | | | | | | | |
| | Hệ thống hỗ trợ khai thuế GTGT | FR-TAX-001 | Khai thuế VAT | US-TAX-001 | Khai thuế GTGT | TC-TAX-001-001<br/>TC-TAX-001-002<br/>TC-TAX-001-003<br/>TC-TAX-001-004 | Thu thập dữ liệu<br/>Tính VAT<br/>Xuất tờ khai<br/>Xuất XML | 📝 |
| | | FR-TAX-001 | | US-TAX-002 | Nộp thuế GTGT | TC-TAX-002-001<br/>TC-TAX-002-002 | Nộp qua eTax<br/>Bút toán nộp | 📝 |
| **BR-TAX-002** | **Khai thuế TNDN** | | | | | | | |
| | Hệ thống tính và khai thuế TNDN | FR-TAX-002 | Khai thuế CIT | US-TAX-003 | Tạm tính quý | TC-TAX-003-001<br/>TC-TAX-003-002 | Tính thuế quý<br/>Xuất 02/TNDN | 📝 |
| | | FR-TAX-002 | | US-TAX-004 | Quyết toán năm | TC-TAX-004-001<br/>TC-TAX-004-002<br/>TC-TAX-004-003 | Tính thuế năm<br/>Xuất 03/TNDN<br/>Hoàn thuế | 📝 |
| **BR-TAX-003** | **Khai thuế TNCN** | | | | | | | |
| | Hệ thống nhận dữ liệu từ Payroll và khai TNCN | FR-TAX-003 | Khai thuế PIT | US-TAX-005 | Sync từ Payroll | TC-TAX-005-001<br/>TC-TAX-005-002 | Đồng bộ dữ liệu<br/>Validate | 📝 |
| | | FR-TAX-003 | | US-TAX-006 | Khai thuế TNCN | TC-TAX-006-001<br/>TC-TAX-006-002 | Xuất 05/KK-TNCN<br/>Phụ lục 05-1 | 📝 |
| | | FR-TAX-003 | | US-TAX-007 | Nộp thuế TNCN | TC-TAX-007-001 | Nộp TNCN | 📝 |
| **BR-TAX-004** | **Báo cáo Thuế** | | | | | | | |
| | Hệ thống cung cấp báo cáo thuế | FR-TAX-004 | Báo cáo thuế | US-TAX-008 | Báo cáo tổng hợp | TC-TAX-008-001<br/>TC-TAX-008-002 | Tax summary<br/>Sổ mua/bán | 📝 |
| | | FR-TAX-004 | | US-TAX-009 | Lịch sử khai thuế | TC-TAX-009-001 | Tax history | 📝 |

---

### 2.7 Financial Reporting (FR)

| BR-ID | Business Requirement | FR-ID | Functional Req | US-ID | User Story | TC-ID | Test Cases | Status |
|-------|---------------------|-------|----------------|-------|------------|-------|------------|--------|
| **BR-FR-001** | **BCTC theo VAS** | | | | | | | |
| | Hệ thống tạo BCTC chuẩn VAS | FR-FR-001 | BCTC VAS | US-FR-001 | Bảng cân đối KT | TC-FR-001-001<br/>TC-FR-001-002<br/>TC-FR-001-003 | Tạo B01-DN<br/>So sánh kỳ trước<br/>Kiểm tra cân đối | 📝 |
| | | FR-FR-001 | | US-FR-002 | Báo cáo KQKD | TC-FR-002-001<br/>TC-FR-002-002 | Tạo B02-DN<br/>P&L analysis | 📝 |
| | | FR-FR-001 | | US-FR-003 | Báo cáo LCTTT | TC-FR-003-001<br/>TC-FR-003-002 | Tạo B03-DN<br/>Direct/Indirect | 📝 |
| | | FR-FR-001 | | US-FR-004 | Thuyết minh BCTC | TC-FR-004-001 | Tạo B09-DN | 📝 |
| | | FR-FR-001 | | US-FR-005 | Ký số BCTC | TC-FR-005-001<br/>TC-FR-005-002 | Digital signature<br/>Approval workflow | 📝 |
| **BR-FR-002** | **Báo cáo Quản trị** | | | | | | | |
| | Hệ thống cung cấp báo cáo quản trị | FR-FR-002 | Báo cáo quản trị | US-FR-006 | Financial Dashboard | TC-FR-006-001<br/>TC-FR-006-002 | KPI widgets<br/>Charts | 📝 |
| | | FR-FR-002 | | US-FR-007 | Chi phí theo BP | TC-FR-007-001 | Expense by dept | 📝 |
| | | FR-FR-002 | | US-FR-008 | Ratio Analysis | TC-FR-008-001<br/>TC-FR-008-002 | Profitability<br/>Liquidity | 📝 |
| | | FR-FR-002 | | US-FR-009 | Budget vs Actual | TC-FR-009-001 | Variance analysis | 📝 |
| | | FR-FR-002 | | US-FR-010 | Trend Analysis | TC-FR-010-001 | Time-series charts | 📝 |
| **BR-FR-003** | **Export và Lưu trữ** | | | | | | | |
| | Hệ thống hỗ trợ export và version control | FR-FR-003 | Export & Archive | US-FR-011 | Export BCTC | TC-FR-011-001<br/>TC-FR-011-002 | Export Excel<br/>Export PDF | 📝 |
| | | FR-FR-003 | | US-FR-012 | Lưu trữ BCTC | TC-FR-012-001<br/>TC-FR-012-002 | Version control<br/>Compare versions | 📝 |

---

## 3. TRACEABILITY BY EPIC

### 3.1 Epic Coverage Summary

| Epic | # BR | # FR | # US | # TC | Coverage % | Status |
|------|------|------|------|------|------------|--------|
| EP-GL | 6 | 6 | 12 | 45 | 100% | 📝 Defined |
| EP-AP | 4 | 4 | 10 | 32 | 100% | 📝 Defined |
| EP-AR | 4 | 4 | 10 | 28 | 100% | 📝 Defined |
| EP-FA | 3 | 3 | 9 | 26 | 100% | 📝 Defined |
| EP-CM | 3 | 3 | 8 | 21 | 100% | 📝 Defined |
| EP-TAX | 4 | 4 | 9 | 24 | 100% | 📝 Defined |
| EP-FR | 3 | 3 | 12 | 30 | 100% | 📝 Defined |
| **TOTAL** | **27** | **27** | **70** | **206** | **100%** | |

### 3.2 Requirements Coverage Matrix

```
Business Requirements (27)
    ↓ 100%
Functional Requirements (27)
    ↓ 100%
User Stories (70)
    ↓ 100%
Test Cases (206)
    ↓ 0% (Pending Development)
Implementation
```

---

## 4. IMPACT ANALYSIS

### 4.1 Dependency Map

**High Impact Changes:**

```
BR-GL-002 (Ghi nhận bút toán)
    ↓ IMPACTS
    - FR-GL-002, FR-GL-003 (Sổ sách)
    - FR-AP-001 (AP Invoice → Bút toán)
    - FR-AR-001 (AR Invoice → Bút toán)
    - FR-FA-001, FR-FA-002 (TSCĐ → Bút toán)
    - FR-CM-001, FR-CM-002 (Cash → Bút toán)
    - FR-FR-001 (BCTC từ Bút toán)
    → 15 US affected
    → 60+ TC affected
```

```
BR-FR-001 (BCTC VAS)
    ↓ DEPENDS ON
    - BR-GL-003 (Sổ sách)
    - BR-GL-004 (Kết chuyển)
    - BR-TAX-002 (Thuế TNDN)
    → Cannot start FR without GL complete
```

### 4.2 Change Impact Template

**When Business Requirement Changes:**

| Change Type | Impact Level | Actions Required |
|-------------|--------------|------------------|
| **Minor** (Wording, clarification) | LOW | Update BR doc only |
| **Functional change** (Logic, calculation) | MEDIUM | Update: BR → FR → US → TC → Code |
| **Major** (New feature, removal) | HIGH | Full RTM review, Impact analysis, Re-estimation |
| **Legal/Compliance** (VAS, Tax law) | CRITICAL | Immediate review, Stakeholder approval, Priority change |

### 4.3 Critical Path

```
Phase 1: GL Foundation
    BR-GL-001 → BR-GL-002 → BR-GL-003
    (Chart of Accounts → Journal Entry → Ledgers)
    ↓
Phase 2: Transactions
    BR-AP-001, BR-AR-001, BR-FA-001, BR-CM-001
    (Invoices, Receipts, Assets, Cash)
    ↓
Phase 3: Period End
    BR-GL-004 (Closing)
    ↓
Phase 4: Compliance
    BR-TAX-001, BR-TAX-002, BR-TAX-003
    ↓
Phase 5: Reporting
    BR-FR-001 (Financial Statements)
```

**Critical Dependencies:**
- GL must be completed before AP/AR/FA/CM can function fully
- Closing must work before Tax calculations
- Tax must complete before Annual Financial Statements

---

## 5. COVERAGE REPORT

### 5.1 Requirements Coverage

**Coverage by Category:**

| Category | Total | Covered | Uncovered | Coverage % |
|----------|-------|---------|-----------|------------|
| **Business Requirements** | 27 | 27 | 0 | 100% ✅ |
| **Functional Requirements** | 27 | 27 | 0 | 100% ✅ |
| **User Stories** | 70 | 70 | 0 | 100% ✅ |
| **Test Cases** | 206 | 0 | 206 | 0% ⏳ |
| **Implementation** | 70 | 0 | 70 | 0% ⏳ |

### 5.2 Test Coverage Plan

**Test Case Breakdown:**

| Test Type | Estimated # | Coverage Target |
|-----------|-------------|-----------------|
| **Unit Tests** | ~500 | 80% code coverage |
| **Integration Tests** | ~200 | All API endpoints |
| **Functional Tests** | 206 (from RTM) | 100% US acceptance criteria |
| **E2E Tests** | ~50 | Critical business flows |
| **Performance Tests** | ~20 | Key transactions |
| **Security Tests** | ~30 | OWASP Top 10 |

### 5.3 Traceability Metrics

**Quality Metrics:**

- ✅ **Bi-directional Traceability:** All BR ↔ FR ↔ US ↔ TC linked
- ✅ **No Orphan Requirements:** All BR have corresponding FR, US, TC
- ✅ **No Untested Features:** All US have planned TC (not executed yet)
- ⏳ **Forward Traceability:** BR → FR → US → TC (100%)
- ⏳ **Backward Traceability:** TC → US → FR → BR (Pending TC execution)

---

## 6. TRACEABILITY MAINTENANCE

### 6.1 Update Process

**When to Update RTM:**

1. **New Requirement Added:**
   - Add new row in RTM
   - Create corresponding FR, US, TC
   - Update coverage %

2. **Requirement Changed:**
   - Mark old version (DEPRECATED)
   - Add new version
   - Update impact analysis
   - Re-test affected TC

3. **Sprint Completion:**
   - Update Status column (Defined → Developed → Tested → Deployed)
   - Update coverage %

### 6.2 Responsibility Matrix

| Role | Responsibilities |
|------|------------------|
| **Business Analyst** | Maintain BR, FR, US mapping; Update RTM when requirements change |
| **Product Owner** | Approve requirement changes; Prioritize uncovered items |
| **QA Lead** | Create TC mapping; Update test status; Track coverage % |
| **Dev Lead** | Update implementation status; Flag blockers |
| **Project Manager** | Review coverage reports; Track overall progress |

### 6.3 Review Cycle

- **Weekly:** Dev & QA update status
- **Sprint End:** Full RTM review
- **Phase Gate:** Coverage audit (must be 100% before next phase)

---

## PHỤ LỤC A: Test Case Template

### Sample Test Case Structure

**TC-GL-002-001: Tạo bút toán đơn giản**

```
Test Case ID: TC-GL-002-001
User Story: US-GL-002
Preconditions:
  - User logged in as "Kế toán viên"
  - Chart of Accounts configured

Test Steps:
  1. Click "Create Journal Entry"
  2. Enter Date: 15/10/2024
  3. Enter Document Number: PC001
  4. Add Debit line: Account 111, Amount 5,000,000
  5. Add Credit line: Account 131, Amount 5,000,000
  6. Enter Description: "Thu tiền KH A"
  7. Click "Save as Draft"

Expected Result:
  - Journal entry saved with status "Draft"
  - Success message: "Journal entry saved"
  - Entry visible in Draft list

Test Data:
  - Account 111: Tiền mặt (exists)
  - Account 131: Phải thu KH (exists)

Priority: HIGH
Status: Not Started
```

---

## PHỤ LỤC B: Abbreviations

| Abbreviation | Full Term |
|--------------|-----------|
| RTM | Requirements Traceability Matrix |
| BR | Business Requirement |
| FR | Functional Requirement |
| US | User Story |
| TC | Test Case |
| GL | General Ledger |
| AP | Accounts Payable |
| AR | Accounts Receivable |
| FA | Fixed Assets |
| CM | Cash Management |
| TAX | Tax Management |
| FR | Financial Reporting |
| VAS | Vietnamese Accounting Standards |
| BCTC | Báo cáo Tài chính |
| KQKD | Kết quả Kinh doanh |
| LCTTT | Lưu chuyển Tiền tệ |

---

**Phê duyệt:**

| Vai trò | Họ tên | Chữ ký | Ngày |
|---------|--------|--------|------|
| **Business Analyst Lead** | | | |
| **QA Lead** | | | |
| **Product Owner** | | | |

---

**Phiên bản:** 1.0
**Ngày tạo:** 2024-10-03
**Người tạo:** BA Team
**Trạng thái:** ✅ Draft - Pending Review

**Lưu ý:** RTM này sẽ được cập nhật liên tục trong suốt vòng đời dự án. Mọi thay đổi requirements phải được phản ánh trong RTM.
