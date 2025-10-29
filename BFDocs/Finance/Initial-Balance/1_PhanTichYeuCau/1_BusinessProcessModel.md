# Business Process Model: Khởi Tạo Số Dư Đầu Kỳ (Opening Balance Initialization)

**Created:** 2024-10-29
**Status:** Draft - Ready for Review
**Version:** 1.0

---

## 1. Executive Summary

Tính năng khởi tạo số dư đầu kỳ (Opening Balance Initialization) là một tính năng **bắt buộc và quan trọng** trong hệ thống kế toán.

**Tầm Quan Trọng:**
- Bắt buộc thực hiện khi công ty bắt đầu sử dụng hệ thống phần mềm kế toán mới
- Không có số dư đầu kỳ → Hệ thống không thể vận hành đúng
- Các báo cáo tài chính sẽ sai lệch nếu thiếu opening balance
- Là nền tảng để tính toán chính xác lợi nhuận lỗ, tình hình tài chính

---

## 2. AS-IS Process (Quy Trình Hiện Tại)

### 2.1 Phương Pháp Thủ Công
```
Quy trình cũ (không dùng hệ thống):
┌─────────────────────────────────────────────────────────┐
│ Bước 1: Lập Danh Sách Số Dư Đầu Kỳ                     │
│ - Thu thập dữ liệu từ hệ thống cũ / sổ sách thủ công   │
│ - Lập bảng tính/danh sách các tài khoản có số dư       │
│ - Xác định Debit/Credit cho từng tài khoản             │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ Bước 2: Nhập Liệu Thủ Công                              │
│ - Nhân viên kế toán nhập từng dòng vào hệ thống        │
│ - Hoặc nhập bằng tay vào sổ cái                        │
│ - Tốn thời gian, dễ sai sót                            │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ Bước 3: Kiểm Tra Cân Bằng                              │
│ - Kiểm tra Nợ = Có (Balance sheet kiểm tra)           │
│ - Nếu không cân bằng → Xác định sai sót và sửa        │
│ - Có thể cần nhiều vòng kiểm tra                       │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ Bước 4: Xác Nhận                                         │
│ - Kế toán trưởng xác nhận số dư đúng                    │
│ - Bắt đầu sử dụng hệ thống                              │
└─────────────────────────────────────────────────────────┘
```

**Vấn Đề AS-IS:**
- ❌ Thủ công, tốn thời gian
- ❌ Dễ sai sót con người
- ❌ Không có quy trình chuẩn
- ❌ Khó kiểm tra lỗi
- ❌ Không theo dõi được audit trail

---

## 3. TO-BE Process (Quy Trình Được Cải Tiến)

### 3.1 Quy Trình Khởi Tạo Số Dư Toàn Bộ

```
┌─────────────────────────────────────────────────────────────────┐
│ Bước 1: Chuẩn Bị Dữ Liệu                                         │
│ - Thu thập dữ liệu từ hệ thống cũ / các báo cáo                │
│ - Lập danh sách các tài khoản cần khởi tạo                     │
│ - Ghi chép giá trị số dư và Debit/Credit                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Bước 2: Truy Cập Tính Năng Opening Balance                      │
│ - Nhân viên kế toán đăng nhập hệ thống                         │
│ - Chọn: Accounting > Opening Balance > Create New              │
│ - Chọn công ty / chi nhánh (nếu multi-company)                │
│ - Chọn kỳ khởi tạo (thường là tháng 1 năm đầu sử dụng)        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Bước 3: Nhập Dữ Liệu - 2 Phương Pháp:                           │
│                                                                   │
│ A. NHẬP THỦ CÔNG (Form Entry)                                  │
│    - Chọn tài khoản cụ thể                                     │
│    - Nhập số dư (amount)                                        │
│    - Chọn hướng: Nợ (Debit) hay Có (Credit)                   │
│    - Thêm ghi chú (tùy chọn)                                   │
│    - Nhấn "Add" → Thêm vào danh sách                          │
│    - Lặp lại cho từng tài khoản                                │
│                                                                   │
│ B. IMPORT KHỐI LƯỢNG (Bulk Import)                             │
│    - Chuẩn bị file Excel/CSV với định dạng chuẩn             │
│    - Format: [Tài khoản | Số Dư | Debit/Credit]              │
│    - Upload file vào hệ thống                                  │
│    - Hệ thống xử lý import tất cả dòng                        │
│    - Validation tự động kiểm tra lỗi                          │
│    - Hiển thị kết quả: Thành công / Lỗi                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Bước 4: Kiểm Tra & Xác Thực                                      │
│ - Hệ thống hiển thị bảng tóm tắt:                              │
│   • Tổng Nợ (Total Debit)                                      │
│   • Tổng Có (Total Credit)                                     │
│   • Chênh lệch (Difference)                                    │
│ - Người dùng kiểm tra cân bằng:                               │
│   ✓ Nếu Nợ = Có → Cân bằng ✅ (Có thể confirm)               │
│   ✗ Nếu Nợ ≠ Có → Không cân bằng ❌                           │
│     (Cần sửa dữ liệu)                                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Bước 5: Sửa Lỗi & Điều Chỉnh (Nếu Cần)                          │
│ - Nếu không cân bằng:                                           │
│   • Chỉnh sửa số dư từng tài khoản                            │
│   • Xóa dòng sai lệch                                         │
│   • Thêm tài khoản còn thiếu                                   │
│   • Quay lại Bước 4 để kiểm tra lại                          │
│ - Nếu cân bằng → Tiến hành Bước 6                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Bước 6: Review & Approval                                        │
│ - Kế toán trưởng / Quản lý xem lại                            │
│ - Kiểm tra đầy đủ dữ liệu                                      │
│ - Phê duyệt (Approve) hoặc Từ chối (Reject)                   │
│ - Nếu từ chối → Quay lại Bước 5 chỉnh sửa                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Bước 7: Xác Nhận & Ghi Nhận Vào Hệ Thống                        │
│ - Nhấn "Confirm Opening Balance"                               │
│ - Hệ thống ghi nhận dữ liệu:                                  │
│   • Tạo bản ghi opening balance entry                         │
│   • Ghi tăng/giảm tài khoản (chỉ MỘT phía)                  │
│   • Lưu audit trail (ai, khi nào, thay đổi gì)             │
│ - Bắt đầu sử dụng hệ thống từ kỳ tiếp theo                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Quy Tắc Ghi Nhận Kế Toán (Accounting Entry Rules)

### 4.1 Kỹ Thuật Ghi Nhận (Technical Implementation)

**Đặc Điểm Quan Trọng:** ⚠️ **Khởi tạo số dư KHÔNG tuân thủ quy tắc kế toán kép (Double-Entry Bookkeeping)**

```
Quy tắc bình thường (Double-Entry):
Ghi Nợ TK A  100 VNĐ    ←→    Ghi Có TK B  100 VNĐ
(2 phía, cân bằng)

Khởi tạo số dư (Opening Balance - MỘT PHÍA):
Ghi Nợ TK 111 (Tiền mặt)  100,000,000 VNĐ
(Không ghi có tài khoản nào đối ứng)
```

### 4.2 Các Loại Số Dư Cần Khai Báo

| Loại Tài Sản / Nợ | Tài Khoản | Ví Dụ | Hướng Ghi | Mô Tả |
|------------------|----------|-------|----------|-------|
| **Tiền Mặt** | 111 | Tiền VNĐ trong tủ | Nợ | Ghi Nợ TK 111 |
| **Tiền Gởi Ngân Hàng** | 112 | Tiền gởi tại ACB, VCB | Nợ | Ghi Nợ TK 112 |
| **Hàng Hóa / Kho** | 156 | Hàng hoá bán, đồ dùng | Nợ | Ghi Nợ TK 156 |
| **Nguyên Vật Liệu** | 151 | NVL trực tiếp sản xuất | Nợ | Ghi Nợ TK 151 |
| **Tài Sản Cố Định** | 1531 | Máy móc, dây chuyền | Nợ | Ghi Nợ TK 1531 |
| **Công Cụ Dụng Cụ** | 1541 | Máy vi tính, bàn ghế | Nợ | Ghi Nợ TK 1541 |
| **Chi Phí Trả Trước** | 1612 | Bảo hiểm, phí thuê | Nợ | Ghi Nợ TK 1612 |
| **Nợ Phải Thu Từ Khách** | 131 | Khách chưa thanh toán | Nợ | Ghi Nợ TK 131 |
| **Nợ Phải Trả Nhà Cung Cấp** | 331 | Nhà cung cấp chưa trả tiền | Có | Ghi Có TK 331 |
| **Nợ Vay Từ Ngân Hàng** | 341 | Khoản vay tín dụng | Có | Ghi Có TK 341 |
| **Vốn Chủ Sở Hữu** | 411 | Vốn ban đầu | Có | Ghi Có TK 411 |

### 4.3 Ví Dụ Chi Tiết

**Ví dụ 1: Khởi Tạo Tiền Mặt**
```
Công ty A khởi tạo tiền mặt 100 triệu VNĐ

Ghi Nhận:
  Nợ TK 111 (Tiền mặt)           100,000,000 VNĐ
  Có TK ??? (KHÔNG ghi bất kỳ TK đối ứng nào)

Kết Quả:
  TK 111 tăng 100 triệu
  Không có tài khoản nào bị ảnh hưởng
  (Khác với quy tắc kế toán kép)
```

**Ví dụ 2: Khởi Tạo Hàng Hóa**
```
Công ty A khởi tạo hàng hóa 50 triệu VNĐ

Ghi Nhận:
  Nợ TK 156 (Hàng hóa)            50,000,000 VNĐ
  Có TK ??? (KHÔNG ghi bất kỳ TK đối ứng nào)

Kết Quả:
  TK 156 tăng 50 triệu
  Không có tài khoản nào bị ảnh hưởng
```

**Ví dụ 3: Khởi Tạo Nợ Phải Trả**
```
Công ty A có nợ nhà cung cấp 30 triệu VNĐ

Ghi Nhận:
  Nợ TK ??? (KHÔNG ghi bất kỳ TK nào)
  Có TK 331 (Nợ phải trả)        30,000,000 VNĐ

Kết Quả:
  TK 331 tăng 30 triệu
  Không có tài khoản nào bị ảnh hưởng
```

**Ví dụ 4: Khởi Tạo Toàn Bộ Số Dư Ban Đầu**
```
Công ty B bắt đầu sử dụng hệ thống:

Nợ:
  TK 111 (Tiền mặt)               50,000,000
  TK 112 (Tiền gởi NH)            200,000,000
  TK 131 (Nợ phải thu)            100,000,000
  TK 156 (Hàng hóa)               150,000,000
                          Tổng =  500,000,000

Có:
  TK 331 (Nợ phải trả)            200,000,000
  TK 341 (Nợ vay NH)              150,000,000
  TK 411 (Vốn chủ sở hữu)         150,000,000
                          Tổng =  500,000,000

Kiểm Tra: Nợ (500M) = Có (500M) ✅ Cân bằng
```

---

## 5. Các Loại Số Dư Chính

### 5.1 Tài Sản (Assets)
```
Tiền Mặt (Cash)
├─ TK 111: Tiền VNĐ
├─ TK 112: Tiền USD/Ngoại tệ
└─ TK 113: Tiền gởi ngân hàng

Hàng Hóa, Kho (Inventory)
├─ TK 156: Hàng hóa bán
├─ TK 151: Nguyên vật liệu
└─ TK 154: Sản phẩm dở dang

Tài Sản Cố Định (Fixed Assets)
├─ TK 1531: Máy móc, dây chuyền
├─ TK 1541: Công cụ, dụng cụ
└─ TK 1521: Nhà cửa, kho xưởng

Nợ Phải Thu (Receivables)
├─ TK 131: Nợ phải thu từ khách hàng
└─ TK 136: Nợ phải thu khác

Chi Phí Trả Trước (Prepaid Expenses)
├─ TK 1612: Bảo hiểm trả trước
└─ TK 1619: Chi phí khác trả trước
```

### 5.2 Nợ & Vốn (Liabilities & Equity)
```
Nợ Phải Trả (Payables)
├─ TK 331: Nợ phải trả cho nhà cung cấp
└─ TK 338: Nợ phải trả khác

Nợ Vay (Loans)
├─ TK 341: Nợ vay từ ngân hàng (dài hạn)
├─ TK 342: Nợ vay từ ngân hàng (ngắn hạn)
└─ TK 348: Nợ vay khác

Vốn Chủ Sở Hữu (Equity)
├─ TK 411: Vốn góp/Vốn điều lệ
├─ TK 412: Vốn thêm vào (nếu tăng vốn)
└─ TK 414: Lợi nhuận chưa phân phối
```

---

## 6. Điểm Khác Biệt: Opening Balance vs Giao Dịch Thường Ngày

| Yếu Tố | Opening Balance | Giao Dịch Thường Ngày |
|--------|-----------------|----------------------|
| **Quy Tắc Ghi Nhận** | MỘT PHÍA (không đối ứng) | KÉP (nợ-có cân bằng) |
| **Kỳ Ghi Nhận** | Đầu kỳ (Kỳ 1 năm đầu) | Hàng ngày khi xảy ra |
| **Tần Suất** | 1 lần duy nhất | Nhiều lần |
| **Approval** | Cần phê duyệt quản lý | Có thể tự động hoặc phê duyệt |
| **Audit Trail** | Rất quan trọng (lưu ai, khi nào) | Bình thường |
| **Sửa Đổi Sau Đó** | Khó, có thể ảnh hưởng lớn | Có thể sửa thông qua nghiệp vụ khác |
| **Impact** | Ảnh hưởng toàn bộ tính toán còn lại | Ảnh hưởng trực tiếp giao dịch |

---

## 7. Vòng Đời Số Dư Đầu Kỳ

```
┌──────────────────────────────────────────────────────────┐
│ Trạng Thái: DRAFT (Nháp)                                │
│ - Vừa tạo, chưa ghi nhận vào hệ thống                   │
│ - Có thể chỉnh sửa hoặc xóa                            │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│ Trạng Thái: PENDING APPROVAL (Chờ Phê Duyệt)           │
│ - Gửi để quản lý xem xét                                │
│ - Người tạo không thể sửa                              │
│ - Quản lý có thể từ chối hoặc phê duyệt                │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│ Trạng Thái: APPROVED (Đã Phê Duyệt)                     │
│ - Chuẩn bị ghi nhận vào hệ thống                        │
│ - Có thể xác nhận (confirm) để ghi nhận                │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│ Trạng Thái: CONFIRMED (Đã Xác Nhận)                     │
│ - Ghi nhận vào hệ thống                                 │
│ - Các tài khoản được cập nhật số dư                    │
│ - KHÔNG thể sửa hoặc xóa                              │
│ - Chỉ có thể xem hoặc xuất báo cáo                     │
└──────────────────────────────────────────────────────────┘
```

---

## 8. Quy Trình Chi Tiết Kỹ Thuật

### 8.1 Nhập Thủ Công (Manual Entry Flow)
```
User nhập data → Validation (Check account exists, etc.)
    ↓
Data lưu tạm (Draft status)
    ↓
User xem lại, chỉnh sửa
    ↓
Submit for approval
    ↓
Approver review + phê duyệt
    ↓
System tính tổng Nợ/Có
    ↓
Cân bằng?
  YES → Cho phép Confirm
  NO  → Yêu cầu sửa dữ liệu
    ↓
User confirm
    ↓
Hệ thống ghi nhận:
  - Tạo Opening Balance Entry record
  - Cập nhật account balance
  - Lưu audit trail
  - Bắt đầu sử dụng hệ thống từ kỳ tiếp theo
```

### 8.2 Import Khối Lượng (Bulk Import Flow)
```
User chuẩn bị file Excel/CSV
    ↓
Upload file
    ↓
System parse file
    ↓
Validation tất cả dòng:
  - Account exists?
  - Amount valid format?
  - Debit/Credit valid?
    ↓
Lỗi?
  YES → Hiển thị error list (không import)
        User sửa file và upload lại
  NO  → Tạo Opening Balance Entry (Draft)
    ↓
User xem lại danh sách data
    ↓
Submit for approval
    ↓
(Tiếp tục như Manual Entry flow từ Approver review)
```

---

## 9. Yêu Cầu Hệ Thống

### 9.1 Dữ Liệu Đầu Vào (Inputs)
- Danh sách tài khoản kế toán (Chart of Accounts)
- Số dư cho từng tài khoản
- Hướng ghi (Debit/Credit)
- Công ty / Chi nhánh (nếu multi-company)
- Kỳ khởi tạo

### 9.2 Xử Lý (Processing)
- Validation số dư (format, value range)
- Kiểm tra tài khoản tồn tại
- Kiểm tra quyền truy cập (user có quyền với công ty?)
- Tính tổng Nợ/Có
- Kiểm tra cân bằng
- Tạo audit trail entry

### 9.3 Đầu Ra (Outputs)
- Opening Balance record được lưu
- Account balances được cập nhật
- Audit log được tạo
- Notification gửi cho approver (nếu approval required)
- Báo cáo Opening Balance (có thể xuất Excel/PDF)

---

## 10. Kết Luận

Tính năng Opening Balance Initialization là:
- ✅ **Bắt buộc** khi bắt đầu sử dụng hệ thống
- ✅ **Quan trọng** cho độ chính xác báo cáo tài chính
- ✅ **Đặc biệt** về mặt kỹ thuật (ghi nhận MỘT phía, không kép)
- ✅ **Cần quản lý chặt chẽ** (approval, audit trail)
- ✅ **Không thể sửa sau khi confirm** (để đảm bảo tính toàn vẹn dữ liệu)

---

**Document Status:** Draft - Ready for Review
**Last Updated:** 2024-10-29
**Next Step:** Create Use Cases & User Stories based on this process model
