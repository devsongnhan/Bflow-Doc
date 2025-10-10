# User Stories & Acceptance Criteria
# Hệ thống Kế toán - Accounting Module

## Lịch sử Phiên bản

| Phiên bản | Ngày       | Tác giả | Mô tả Thay đổi |
|-----------|------------|---------|----------------|
| 1.0       | 2024-10-03 | BA Team | Phiên bản khởi tạo |

---

## MỤC LỤC

1. [Giới thiệu](#1-giới-thiệu)
2. [Epic Overview](#2-epic-overview)
3. [General Ledger Stories](#3-general-ledger-stories)
4. [Accounts Payable Stories](#4-accounts-payable-stories)
5. [Accounts Receivable Stories](#5-accounts-receivable-stories)
6. [Fixed Assets Stories](#6-fixed-assets-stories)
7. [Cash Management Stories](#7-cash-management-stories)
8. [Tax Management Stories](#8-tax-management-stories)
9. [Financial Reporting Stories](#9-financial-reporting-stories)
10. [Story Mapping & Prioritization](#10-story-mapping--prioritization)

---

## 1. GIỚI THIỆU

### 1.1 Mục đích
Tài liệu này tổng hợp các User Stories cho module Accounting, tuân theo format Agile/Scrum:
```
As a [Role]
I want [Feature/Capability]
So that [Business Value]
```

### 1.2 Phạm vi
- **77 User Stories** chia thành **8 Epics** chính
- Story Points: Ước lượng theo Fibonacci (1, 2, 3, 5, 8, 13, 21)
- Acceptance Criteria: Định dạng Given-When-Then (Gherkin)

### 1.3 Definition of Ready (DoR)

User Story được coi là "Ready" khi:
- ✅ Title rõ ràng, mô tả đầy đủ
- ✅ Acceptance Criteria đã định nghĩa
- ✅ Dependencies được xác định
- ✅ Story Points được ước lượng
- ✅ Business value được hiểu rõ
- ✅ Testable (có thể viết test cases)

### 1.4 Definition of Done (DoD)

User Story được coi là "Done" khi:
- ✅ Code hoàn thành và reviewed
- ✅ Unit tests pass (coverage ≥ 80%)
- ✅ Integration tests pass
- ✅ Acceptance Criteria được verify
- ✅ UI/UX đúng design
- ✅ Không có critical/high bugs
- ✅ Documentation cập nhật
- ✅ Product Owner chấp nhận

---

## 2. EPIC OVERVIEW

### Epic Summary

| Epic ID | Epic Name | # Stories | Total Points | Priority | Status |
|---------|-----------|-----------|--------------|----------|--------|
| **EP-GL** | General Ledger | 12 | 55 | ⭐⭐⭐ Critical | 📋 Planned |
| **EP-AP** | Accounts Payable | 10 | 45 | ⭐⭐⭐ Critical | 📋 Planned |
| **EP-AR** | Accounts Receivable | 10 | 45 | ⭐⭐⭐ Critical | 📋 Planned |
| **EP-FA** | Fixed Assets | 9 | 38 | ⭐⭐ High | 📋 Planned |
| **EP-CM** | Cash Management | 8 | 32 | ⭐⭐⭐ Critical | 📋 Planned |
| **EP-TAX** | Tax Management | 9 | 42 | ⭐⭐⭐ Critical | 📋 Planned |
| **EP-FR** | Financial Reporting | 12 | 50 | ⭐⭐⭐ Critical | 📋 Planned |
| **EP-SYS** | System & Integration | 7 | 28 | ⭐⭐ High | 📋 Planned |
| **TOTAL** | | **77** | **335** | | |

### Epic Roadmap

```
Sprint 1-2:  EP-GL (Core foundation)
Sprint 3-4:  EP-AP + EP-AR (Receivables/Payables)
Sprint 5:    EP-CM (Cash management)
Sprint 6:    EP-FA (Fixed assets)
Sprint 7-8:  EP-TAX (Tax compliance)
Sprint 9-10: EP-FR (Reporting)
Sprint 11:   EP-SYS (Integration & polish)
Sprint 12:   Buffer & UAT
```

---

## 3. GENERAL LEDGER STORIES

### Epic: EP-GL - General Ledger

**Epic Goal:** Xây dựng hệ thống kế toán tổng hợp, cho phép ghi nhận, quản lý và tra cứu bút toán kế toán theo chuẩn VAS.

---

#### US-GL-001: Quản lý Hệ thống Tài khoản

**Story:**
```
As a Kế toán trưởng
I want to configure and manage the Chart of Accounts
So that the accounting system follows Vietnamese accounting standards (Circular 200/2014)
```

**Story Points:** 8

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Xem danh mục tài khoản**
```gherkin
Given tôi đã đăng nhập với role "Kế toán trưởng"
When tôi truy cập menu "Chart of Accounts"
Then hệ thống hiển thị danh sách tài khoản theo cấu trúc cây
And tài khoản được nhóm theo: Tài sản (1), Nguồn vốn (2-4), Chi phí (6), Doanh thu (5,7,8,9)
And mỗi tài khoản hiển thị: Số TK, Tên TK, Loại, Trạng thái
```

**AC2: Thêm tài khoản chi tiết mới**
```gherkin
Given tôi đang xem tài khoản tổng hợp "131 - Phải thu của khách hàng"
When tôi click "Add Detail Account"
And nhập: Số TK = "1311", Tên = "Phải thu KH nội địa", Loại số dư = "Nợ"
And click "Save"
Then hệ thống tạo tài khoản 1311 là con của 131
And hiển thị thông báo "Account created successfully"
```

**AC3: Validation tài khoản**
```gherkin
Given tôi đang tạo tài khoản mới
When tôi nhập số TK đã tồn tại
Then hệ thống hiển thị lỗi "Account number already exists"
And không cho phép lưu
```

**AC4: Không cho xóa tài khoản đã phát sinh**
```gherkin
Given tài khoản "1311" đã có bút toán phát sinh
When tôi click "Delete" trên tài khoản 1311
Then hệ thống hiển thị cảnh báo "Cannot delete account with transactions"
And tài khoản vẫn tồn tại
```

**AC5: Import Chart of Accounts từ Excel**
```gherkin
Given tôi có file Excel chứa danh sách tài khoản theo template
When tôi click "Import from Excel"
And chọn file và click "Upload"
Then hệ thống validate dữ liệu
And import thành công các tài khoản hợp lệ
And hiển thị báo cáo: X created, Y errors
```

**Dependencies:** None (Core feature)

**Technical Notes:**
- Database: Sử dụng hierarchical structure (parent_id)
- Validation: Unique account number, valid parent-child relationship

---

#### US-GL-002: Nhập Bút toán Thủ công

**Story:**
```
As a Kế toán viên
I want to manually enter journal entries
So that I can record accounting transactions with proper documentation
```

**Story Points:** 5

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Tạo bút toán đơn giản (1 Nợ - 1 Có)**
```gherkin
Given tôi đã đăng nhập với role "Kế toán viên"
When tôi click "Create Journal Entry"
And nhập:
  - Ngày: 15/10/2024
  - Số chứng từ: PC001
  - Nợ: 111 (Tiền mặt) - 5,000,000
  - Có: 131 (Phải thu KH) - 5,000,000
  - Diễn giải: "Thu tiền khách hàng A"
And click "Save as Draft"
Then hệ thống lưu bút toán với status = "Draft"
And hiển thị thông báo "Journal entry saved"
```

**AC2: Kiểm tra cân đối Nợ - Có**
```gherkin
Given tôi đang nhập bút toán
When tổng Nợ = 5,000,000 và tổng Có = 4,000,000
Then hệ thống hiển thị lỗi "Entry is not balanced: Debit 5,000,000 ≠ Credit 4,000,000"
And không cho phép Save
```

**AC3: Bút toán phức hợp (Nhiều Nợ - Nhiều Có)**
```gherkin
Given tôi đang tạo bút toán mới
When tôi thêm nhiều dòng:
  - Nợ: 156 (Hàng hóa) - 10,000,000
  - Nợ: 133 (VAT đầu vào) - 1,000,000
  - Có: 331 (Phải trả NCC) - 11,000,000
And tổng Nợ = tổng Có = 11,000,000
Then hệ thống chấp nhận bút toán
And cho phép Save
```

**AC4: Đính kèm chứng từ**
```gherkin
Given tôi đã tạo bút toán Draft
When tôi click "Attach Document"
And upload file PDF/JPG (hóa đơn scan)
Then hệ thống lưu file đính kèm
And hiển thị icon "📎" trên bút toán
```

**AC5: Auto-complete tài khoản**
```gherkin
Given tôi đang nhập tài khoản
When tôi gõ "131"
Then hệ thống hiển thị dropdown gợi ý:
  - 131 - Phải thu của khách hàng
  - 1311 - Phải thu KH nội địa
  - 1312 - Phải thu KH xuất khẩu
And tôi có thể chọn từ danh sách
```

**Dependencies:** US-GL-001 (Chart of Accounts)

**Technical Notes:**
- Real-time validation: Debit = Credit
- File upload: Max 10MB, allowed formats: PDF, JPG, PNG, XLSX

---

#### US-GL-003: Quy trình Phê duyệt Bút toán

**Story:**
```
As a Kế toán trưởng
I want to review and approve journal entries before posting
So that we maintain proper internal control over accounting transactions
```

**Story Points:** 5

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Gửi bút toán để phê duyệt**
```gherkin
Given tôi (Kế toán viên) đã tạo bút toán Draft
When tôi click "Submit for Approval"
Then hệ thống chuyển status = "Pending Approval"
And gửi notification cho Kế toán trưởng
And tôi không thể sửa bút toán này nữa
```

**AC2: Kế toán trưởng xem danh sách chờ duyệt**
```gherkin
Given tôi đã đăng nhập với role "Kế toán trưởng"
When tôi click menu "Pending Approvals"
Then hệ thống hiển thị danh sách bút toán status = "Pending Approval"
And sắp xếp theo ngày submit (mới nhất trước)
And hiển thị: Số CT, Ngày, Người tạo, Số tiền
```

**AC3: Phê duyệt bút toán**
```gherkin
Given tôi (Kế toán trưởng) đang xem bút toán Pending Approval
When tôi click "Approve"
And xác nhận
Then hệ thống:
  - Chuyển status = "Approved"
  - Tự động Post bút toán
  - Cập nhật Sổ cái
  - Ghi log: Approved by [User] at [Time]
And gửi notification cho Kế toán viên tạo bút toán
```

**AC4: Từ chối bút toán**
```gherkin
Given tôi (Kế toán trưởng) đang xem bút toán Pending Approval
When tôi click "Reject"
And nhập lý do: "Thiếu chứng từ hóa đơn"
And click "Confirm Reject"
Then hệ thống:
  - Chuyển status = "Rejected"
  - Ghi log: Rejected by [User], Reason: [Text]
  - Gửi notification + lý do cho Kế toán viên
And Kế toán viên có thể sửa và submit lại
```

**AC5: Tự động phê duyệt với ngưỡng**
```gherkin
Given quy định: Bút toán < 10 triệu được tự động phê duyệt
When Kế toán viên submit bút toán 5 triệu
Then hệ thống:
  - Bỏ qua bước Pending Approval
  - Tự động Approve và Post
  - Ghi log: Auto-approved (amount < threshold)
```

**Dependencies:** US-GL-002

**Technical Notes:**
- Approval routing dựa trên amount thresholds (configurable)
- Email/In-app notification

---

#### US-GL-004: Đảo Bút toán (Reversal)

**Story:**
```
As a Kế toán viên
I want to reverse posted journal entries
So that I can correct accounting errors properly without deleting original entries
```

**Story Points:** 3

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Tạo bút toán đảo**
```gherkin
Given bút toán JE-001 đã được Posted:
  - Nợ: 111 - 5,000,000
  - Có: 131 - 5,000,000
When tôi click "Reverse Entry" trên JE-001
And chọn ngày đảo: 20/10/2024
And nhập lý do: "Ghi nhầm tài khoản"
Then hệ thống tạo bút toán đảo JE-001-REV:
  - Nợ: 131 - 5,000,000
  - Có: 111 - 5,000,000
  - Diễn giải: "Reversal of JE-001 - Ghi nhầm tài khoản"
  - Status: Pending Approval
```

**AC2: Đánh dấu bút toán gốc**
```gherkin
Given bút toán đảo JE-001-REV đã được Approved
Then hệ thống:
  - Đánh dấu JE-001 với badge "Reversed"
  - Link JE-001 ↔ JE-001-REV
  - JE-001 vẫn hiển thị trong Sổ cái
  - Số dư net = 0 (bút toán gốc + bút toán đảo)
```

**AC3: Không cho đảo bút toán đã đảo**
```gherkin
Given bút toán JE-001 đã có status "Reversed"
When tôi click "Reverse Entry"
Then hệ thống hiển thị cảnh báo "This entry has already been reversed"
And không cho phép tạo reversal
```

**Dependencies:** US-GL-002, US-GL-003

---

#### US-GL-005: Xem Sổ Cái (General Ledger)

**Story:**
```
As a Kế toán viên
I want to view the general ledger by account
So that I can track all transactions and balances for each account
```

**Story Points:** 3

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Xem sổ cái theo tài khoản**
```gherkin
Given hệ thống có bút toán đã Posted
When tôi truy cập "General Ledger Report"
And chọn tài khoản: 131 - Phải thu KH
And chọn kỳ: 01/10/2024 - 31/10/2024
Then hệ thống hiển thị:
  | Ngày | Số CT | Diễn giải | Nợ | Có | Số dư |
  | 01/10 | | Số dư đầu kỳ | | | 10,000,000 |
  | 05/10 | HD001 | Bán hàng KH A | 5,000,000 | | 15,000,000 |
  | 10/10 | PT001 | Thu tiền KH A | | 5,000,000 | 10,000,000 |
  | 31/10 | | Số dư cuối kỳ | | | 10,000,000 |
  | | | **Tổng** | **5,000,000** | **5,000,000** | |
```

**AC2: Drill-down vào bút toán**
```gherkin
Given tôi đang xem Sổ cái
When tôi click vào dòng "HD001"
Then hệ thống mở chi tiết bút toán HD001
And hiển thị đầy đủ: Tất cả dòng Nợ/Có, chứng từ đính kèm, lịch sử phê duyệt
```

**AC3: Export sổ cái**
```gherkin
Given tôi đang xem Sổ cái
When tôi click "Export to Excel"
Then hệ thống tạo file Excel với format:
  - Sheet 1: Sổ cái chi tiết
  - Header: Công ty, Tài khoản, Kỳ báo cáo
  - Footer: Người lập, Kế toán trưởng
And download file về máy
```

**Dependencies:** US-GL-002, US-GL-003

---

#### US-GL-006: Nhật ký Chung (General Journal)

**Story:**
```
As a Kế toán viên
I want to view all journal entries in chronological order
So that I can see complete transaction history
```

**Story Points:** 2

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Xem nhật ký chung**
```gherkin
Given hệ thống có nhiều bút toán đã Posted
When tôi truy cập "General Journal"
And chọn kỳ: 01/10/2024 - 31/10/2024
Then hệ thống hiển thị tất cả bút toán theo thời gian
And sắp xếp: Ngày CT (cũ → mới), sau đó theo Số CT
And hiển thị: Ngày, Số CT, Diễn giải, Tài khoản Nợ, Tài khoản Có, Số tiền
```

**AC2: Filter và Search**
```gherkin
Given tôi đang xem Nhật ký chung
When tôi nhập vào ô Search: "Khách hàng A"
Then hệ thống hiển thị chỉ các bút toán có diễn giải chứa "Khách hàng A"
```

**Dependencies:** US-GL-002

---

#### US-GL-007: Bảng Cân đối Số phát sinh

**Story:**
```
As a Kế toán trưởng
I want to view the trial balance report
So that I can verify that total debits equal total credits across all accounts
```

**Story Points:** 5

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Xem bảng cân đối số phát sinh**
```gherkin
Given hệ thống có dữ liệu kế toán tháng 10/2024
When tôi truy cập "Trial Balance Report"
And chọn kỳ: 01/10/2024 - 31/10/2024
Then hệ thống hiển thị:
  | TK | Tên TK | Số dư đầu kỳ (Nợ) | Số dư đầu kỳ (Có) | Phát sinh Nợ | Phát sinh Có | Số dư cuối kỳ (Nợ) | Số dư cuối kỳ (Có) |
  | 111 | Tiền mặt | 10,000,000 | | 50,000,000 | 30,000,000 | 30,000,000 | |
  | 131 | Phải thu KH | 20,000,000 | | 100,000,000 | 80,000,000 | 40,000,000 | |
  | ... | | | | | | | |
  | **Tổng** | | **XXX** | **XXX** | **YYY** | **YYY** | **ZZZ** | **ZZZ** |
```

**AC2: Kiểm tra cân đối**
```gherkin
Given Bảng cân đối đã tạo
Then:
  - Tổng Số dư đầu kỳ Nợ = Tổng Số dư đầu kỳ Có
  - Tổng Phát sinh Nợ = Tổng Phát sinh Có
  - Tổng Số dư cuối kỳ Nợ = Tổng Số dư cuối kỳ Có
And nếu không cân đối, hệ thống highlight màu đỏ
```

**AC3: Drill-down từng cấp**
```gherkin
Given tôi đang xem Bảng cân đối cấp 1 (tài khoản tổng hợp)
When tôi click vào TK 13 (Phải thu)
Then hệ thống hiển thị chi tiết cấp 2:
  - 131 - Phải thu KH
  - 133 - Thuế GTGT được khấu trừ
  - 136 - Phải thu nội bộ
When tôi click vào 131
Then hiển thị chi tiết cấp 3 (nếu có)
```

**Dependencies:** US-GL-005

---

#### US-GL-008: Template Bút toán

**Story:**
```
As a Kế toán viên
I want to save and reuse journal entry templates
So that I can quickly create recurring transactions
```

**Story Points:** 3

**Priority:** ⭐ MEDIUM (Could Have)

**Acceptance Criteria:**

**AC1: Lưu template từ bút toán**
```gherkin
Given tôi đã tạo bút toán lương hàng tháng
When tôi click "Save as Template"
And nhập tên: "Trả lương tháng"
Then hệ thống lưu template bao gồm:
  - Các dòng Nợ/Có (không bao gồm số tiền cụ thể)
  - Diễn giải mẫu
And hiển thị trong danh sách "My Templates"
```

**AC2: Tạo bút toán từ template**
```gherkin
Given tôi có template "Trả lương tháng"
When tôi click "Create from Template"
And chọn template "Trả lương tháng"
Then hệ thống tạo bút toán mới với:
  - Cấu trúc Nợ/Có giống template
  - Ngày = hôm nay
  - Số tiền = trống (cần nhập)
And tôi chỉ cần điền số tiền và Save
```

**Dependencies:** US-GL-002

---

#### US-GL-009: Kết chuyển Cuối kỳ - Tháng

**Story:**
```
As a Kế toán trưởng
I want to perform month-end closing
So that I can determine the monthly financial results
```

**Story Points:** 8

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Checklist trước khi kết chuyển**
```gherkin
Given đã đến cuối tháng
When tôi click "Month-End Closing"
Then hệ thống hiển thị checklist:
  - [ ] Tất cả bút toán đã Posted
  - [ ] Đối chiếu công nợ hoàn tất
  - [ ] Đối chiếu ngân hàng hoàn tất
  - [ ] Khấu hao TSCĐ đã chạy
  - [ ] Lương tháng đã ghi nhận
And chỉ cho phép tiếp tục khi tất cả checked
```

**AC2: Kết chuyển doanh thu**
```gherkin
Given tháng 10/2024 có:
  - TK 511 (Doanh thu bán hàng): 100,000,000 (Có)
  - TK 515 (Doanh thu tài chính): 5,000,000 (Có)
When tôi click "Process Closing"
Then hệ thống tạo bút toán tự động:
  - Nợ: 511 - 100,000,000
  - Nợ: 515 - 5,000,000
  - Có: 911 - 105,000,000
  - Diễn giải: "Kết chuyển doanh thu tháng 10/2024"
```

**AC3: Kết chuyển chi phí**
```gherkin
Given tháng 10/2024 có:
  - TK 632 (Giá vốn hàng bán): 60,000,000 (Nợ)
  - TK 641 (Chi phí bán hàng): 10,000,000 (Nợ)
  - TK 642 (Chi phí QLDN): 15,000,000 (Nợ)
When hệ thống kết chuyển chi phí
Then tạo bút toán:
  - Nợ: 911 - 85,000,000
  - Có: 632 - 60,000,000
  - Có: 641 - 10,000,000
  - Có: 642 - 15,000,000
  - Diễn giải: "Kết chuyển chi phí tháng 10/2024"
```

**AC4: Xác định kết quả kinh doanh**
```gherkin
Given đã kết chuyển doanh thu và chi phí
When tôi xem TK 911
Then:
  - Nếu TK 911 bên Có: Lãi = 20,000,000
  - Hiển thị: "Lãi tháng 10/2024: 20,000,000 VNĐ"
And TK 911 giữ nguyên số dư (không kết chuyển vào 421 cho đến cuối năm)
```

**AC5: Preview trước khi Post**
```gherkin
Given hệ thống đã tính toán kết chuyển
When tôi xem màn hình Preview
Then hiển thị:
  - Bút toán kết chuyển dự kiến
  - Số dư TK 911 sau kết chuyển
  - Lãi/Lỗ tháng
And tôi có thể "Confirm" hoặc "Cancel"
```

**Dependencies:** US-GL-002, US-GL-007

**Technical Notes:**
- Chỉ Kế toán trưởng có quyền chạy closing
- Sau khi close, không cho phép ghi bút toán vào tháng đó (lock period)

---

#### US-GL-010: Kết chuyển Cuối năm

**Story:**
```
As a Kế toán trưởng
I want to perform year-end closing
So that I can finalize annual financial results and prepare for the new fiscal year
```

**Story Points:** 13

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Kết chuyển lãi/lỗ vào TK 421**
```gherkin
Given đã kết chuyển tháng 12/2024
And TK 911 có số dư Có: 120,000,000 (Lãi cả năm)
When tôi click "Year-End Closing"
Then hệ thống:
  - Trích lập thuế TNDN: 120,000,000 × 20% = 24,000,000
  - Tạo bút toán thuế:
    - Nợ: 821 - 24,000,000
    - Có: 3334 - 24,000,000
  - Kết chuyển chi phí thuế:
    - Nợ: 911 - 24,000,000
    - Có: 821 - 24,000,000
  - Kết chuyển LNST vào 421:
    - Nợ: 911 - 96,000,000
    - Có: 421 - 96,000,000
And TK 911 về số dư = 0
```

**AC2: Đóng sổ năm tài chính**
```gherkin
Given đã kết chuyển xong
When tôi click "Close Fiscal Year 2024"
Then hệ thống:
  - Lock tất cả kỳ năm 2024 (không cho ghi bút toán)
  - Ghi log: Year 2024 closed by [User] at [Time]
  - Backup dữ liệu năm 2024
```

**AC3: Chuyển số dư sang năm sau**
```gherkin
Given năm 2024 đã đóng
When hệ thống chuyển số dư
Then:
  - Tài khoản Tài sản, Nguồn vốn: Số dư cuối 2024 → Số dư đầu 2025
  - Tài khoản Doanh thu, Chi phí: Reset về 0 năm 2025
  - TK 421 (LNST 2024) → Chuyển vào TK 421 năm 2025
```

**Dependencies:** US-GL-009

---

#### US-GL-011: Mở lại Kỳ đã đóng (Reopen Period)

**Story:**
```
As a Kế toán trưởng
I want to reopen a closed accounting period in exceptional cases
So that I can make necessary adjustments when errors are discovered
```

**Story Points:** 3

**Priority:** ⭐ MEDIUM (Could Have)

**Acceptance Criteria:**

**AC1: Yêu cầu mở lại kỳ**
```gherkin
Given tháng 9/2024 đã đóng
When tôi (Kế toán trưởng) click "Reopen Period"
And chọn kỳ: 09/2024
And nhập lý do: "Phát hiện sai sót cần điều chỉnh bút toán ngày 15/09"
And click "Request Reopen"
Then hệ thống:
  - Gửi yêu cầu đến CFO/System Admin
  - Ghi log: Reopen request by [User], Reason: [Text]
```

**AC2: Phê duyệt mở lại kỳ**
```gherkin
Given có yêu cầu mở lại kỳ 09/2024
When CFO phê duyệt
Then hệ thống:
  - Unlock kỳ 09/2024
  - Cho phép ghi/sửa bút toán trong kỳ này
  - Gửi notification cho Kế toán trưởng
  - Ghi log: Period 09/2024 reopened by CFO
```

**Dependencies:** US-GL-009

---

#### US-GL-012: Audit Trail

**Story:**
```
As a Kiểm toán viên
I want to view complete audit trail of all accounting transactions
So that I can track who did what and when for compliance purposes
```

**Story Points:** 5

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Xem lịch sử thay đổi bút toán**
```gherkin
Given bút toán JE-001 đã được tạo, sửa, và phê duyệt
When tôi click "View Audit Trail" trên JE-001
Then hệ thống hiển thị:
  | Time | User | Action | Details |
  | 15/10 10:00 | KTV_Lan | Created | Status: Draft |
  | 15/10 10:30 | KTV_Lan | Modified | Changed amount: 5M → 5.5M |
  | 15/10 11:00 | KTV_Lan | Submitted | For approval |
  | 15/10 14:00 | KTT_Hoa | Approved | Status: Posted |
  | 16/10 09:00 | KTV_Lan | Reversed | Reason: Error |
```

**AC2: Audit log không thể xóa/sửa**
```gherkin
Given có audit log entry
When người dùng cố gắng xóa/sửa log
Then hệ thống từ chối
And log vẫn giữ nguyên
```

**AC3: Tìm kiếm audit log**
```gherkin
Given hệ thống có nhiều audit logs
When tôi search theo User = "KTV_Lan" và Action = "Approved" và Date range = 01/10-31/10
Then hệ thống hiển thị tất cả log khớp điều kiện
```

**Dependencies:** US-GL-002, US-GL-003

---

## 4. ACCOUNTS PAYABLE STORIES

### Epic: EP-AP - Accounts Payable

**Epic Goal:** Quản lý công nợ phải trả nhà cung cấp, từ nhận hóa đơn, đối chiếu, đến thanh toán.

---

#### US-AP-001: Nhập Hóa đơn Nhà cung cấp

**Story:**
```
As a Kế toán AP
I want to enter supplier invoices into the system
So that we can track payables and ensure timely payment
```

**Story Points:** 5

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Nhập hóa đơn mua hàng**
```gherkin
Given tôi nhận được hóa đơn từ NCC "Công ty ABC"
When tôi click "Create Supplier Invoice"
And nhập:
  - NCC: ABC (MST: 0123456789)
  - Số HĐ: 0001234
  - Ngày HĐ: 15/10/2024
  - Hàng hóa: Laptop Dell - SL: 10 - Đơn giá: 15,000,000
  - VAT: 10%
  - Hạn thanh toán: 30 ngày
And click "Save"
Then hệ thống:
  - Tính tổng tiền: (15,000,000 × 10) × 1.1 = 165,000,000
  - Due date: 14/11/2024
  - Lưu với status: "Pending Verification"
```

**AC2: 3-Way Matching với PO và GR**
```gherkin
Given hóa đơn liên quan đến PO-2024-001
When hệ thống matching
And PO: 10 cái, GR: 10 cái, Invoice: 10 cái
And Đơn giá PO = Đơn giá Invoice = 15,000,000
Then hệ thống:
  - Hiển thị "3-Way Match: ✓ Passed"
  - Cho phép approve invoice
```

**AC3: Cảnh báo chênh lệch**
```gherkin
Given Invoice số lượng: 12 cái, nhưng PO + GR chỉ 10 cái
When hệ thống matching
Then hiển thị warning:
  - "Quantity mismatch: Invoice 12 > GR 10"
  - "Requires approval from Purchasing Manager"
And không tự động approve
```

**AC4: Tạo bút toán tự động**
```gherkin
Given hóa đơn đã được approved
When hệ thống post
Then tạo bút toán:
  - Nợ: 156 (Hàng hóa) - 150,000,000
  - Nợ: 133 (VAT đầu vào) - 15,000,000
  - Có: 331 (Phải trả NCC ABC) - 165,000,000
  - Diễn giải: "Mua hàng theo HĐ 0001234 - NCC ABC"
```

**Dependencies:** None

**Technical Notes:**
- Validate MST (10 or 13 digits)
- VAT rates: 0%, 5%, 8%, 10%

---

#### US-AP-002: Import Hóa đơn Điện tử

**Story:**
```
As a Kế toán AP
I want to automatically import e-invoices from the tax authority portal
So that I can reduce manual data entry and errors
```

**Story Points:** 8

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Kết nối cổng hóa đơn điện tử**
```gherkin
Given hệ thống đã cấu hình API key của cổng e-Invoice
When tôi click "Sync e-Invoices"
And chọn khoảng thời gian: 01/10-15/10/2024
Then hệ thống:
  - Kết nối API Tổng cục thuế
  - Tải về danh sách hóa đơn mới
  - Hiển thị: "Found 25 new invoices"
```

**AC2: Tự động parse XML hóa đơn**
```gherkin
Given hệ thống đã tải về file XML hóa đơn
When hệ thống parse
Then tự động extract:
  - Thông tin NCC (Tên, MST)
  - Số hóa đơn, Ngày
  - Chi tiết hàng hóa (Tên, SL, Đơn giá)
  - Thuế VAT
  - Tổng tiền
And tạo draft invoice trong hệ thống
```

**AC3: Review trước khi chấp nhận**
```gherkin
Given có 25 hóa đơn mới từ e-Invoice
When tôi xem danh sách
Then hiển thị preview từng hóa đơn
And tôi có thể:
  - Accept: Import vào hệ thống
  - Reject: Bỏ qua (không import)
  - Edit: Sửa thông tin trước khi import
```

**Dependencies:** US-AP-001

**Technical Notes:**
- Tích hợp API Tổng cục thuế (hoặc nhà cung cấp e-Invoice: VNPT, Viettel, FPT)
- Parse XML theo chuẩn format

---

#### US-AP-003: Thanh toán Nhà cung cấp

**Story:**
```
As a Kế toán AP
I want to create payment vouchers for supplier invoices
So that we can pay suppliers on time and track payment history
```

**Story Points:** 5

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Chọn hóa đơn để thanh toán**
```gherkin
Given NCC "ABC" có 3 hóa đơn chưa thanh toán:
  - HĐ-001: 50,000,000 (Due: 15/10)
  - HĐ-002: 30,000,000 (Due: 20/10)
  - HĐ-003: 70,000,000 (Due: 25/10)
When tôi click "Create Payment"
And chọn NCC: ABC
Then hệ thống hiển thị danh sách hóa đơn unpaid
And tôi có thể chọn 1 hoặc nhiều hóa đơn
```

**AC2: Tạo lệnh thanh toán**
```gherkin
Given tôi chọn HĐ-001 và HĐ-002 để thanh toán
When tôi nhập:
  - Phương thức: Chuyển khoản
  - Ngân hàng: Vietcombank - TK 123456789
  - Ngày thanh toán: 15/10/2024
And click "Create Payment Voucher"
Then hệ thống:
  - Tạo PV-2024-001
  - Tổng tiền: 80,000,000
  - Trạng thái: Pending Payment
```

**AC3: Xác nhận thanh toán thành công**
```gherkin
Given lệnh thanh toán PV-2024-001 đã thực hiện
When tôi click "Confirm Payment"
And upload chứng từ chuyển khoản
Then hệ thống:
  - Tạo bút toán:
    - Nợ: 331 (Phải trả NCC ABC) - 80,000,000
    - Có: 112 (Tiền gửi NH) - 80,000,000
  - Cập nhật trạng thái HĐ-001, HĐ-002: Paid
  - Giảm công nợ NCC ABC: -80,000,000
```

**AC4: Kiểm tra số dư trước thanh toán**
```gherkin
Given số dư TK 112 (Tiền gửi NH): 50,000,000
When tôi tạo lệnh thanh toán 80,000,000
Then hệ thống cảnh báo:
  - "Insufficient balance: Available 50M < Required 80M"
  - "Please check with Finance Manager"
And không cho phép Confirm Payment
```

**Dependencies:** US-AP-001

---

#### US-AP-004: Thanh toán Một phần

**Story:**
```
As a Kế toán AP
I want to make partial payments for supplier invoices
So that we can manage cash flow more flexibly
```

**Story Points:** 3

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Thanh toán một phần**
```gherkin
Given hóa đơn HĐ-005: 100,000,000 (status: Unpaid)
When tôi tạo payment với số tiền: 60,000,000
And confirm payment
Then:
  - Hóa đơn status: Partially Paid
  - Remaining: 40,000,000
  - Hiển thị badge: "Paid 60M / Total 100M"
```

**AC2: Thanh toán phần còn lại**
```gherkin
Given hóa đơn HĐ-005 đã thanh toán 60M, còn lại 40M
When tôi tạo payment thêm: 40,000,000
And confirm
Then:
  - Hóa đơn status: Fully Paid
  - Remaining: 0
```

**Dependencies:** US-AP-003

---

#### US-AP-005: Đối chiếu Công nợ với NCC

**Story:**
```
As a Kế toán AP
I want to reconcile payables with suppliers
So that we can ensure both parties agree on outstanding balances
```

**Story Points:** 5

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Tạo bảng đối chiếu**
```gherkin
Given NCC "ABC" có công nợ tính đến 31/10/2024
When tôi click "Create Reconciliation"
And chọn NCC: ABC, Kỳ: 01/10-31/10/2024
Then hệ thống tạo bảng đối chiếu:
  | Số HĐ | Ngày | Số tiền | Đã thanh toán | Còn lại |
  | HĐ-001 | 05/10 | 50,000,000 | 50,000,000 | 0 |
  | HĐ-002 | 10/10 | 30,000,000 | 0 | 30,000,000 |
  | **Tổng công nợ** | | | | **30,000,000** |
```

**AC2: Xuất và gửi cho NCC**
```gherkin
Given bảng đối chiếu đã tạo
When tôi click "Export & Send"
Then hệ thống:
  - Tạo file PDF format chuẩn
  - Có chữ ký điện tử (nếu có)
  - Gửi email đến NCC với file đính kèm
  - Subject: "Bảng đối chiếu công nợ tháng 10/2024 - [Công ty]"
```

**AC3: Ghi nhận xác nhận từ NCC**
```gherkin
Given NCC đã phản hồi xác nhận số liệu khớp
When tôi upload file đối chiếu có chữ ký NCC
And click "Confirm Reconciliation"
Then hệ thống:
  - Đánh dấu: Reconciled ✓
  - Lưu file đối chiếu đã ký
  - Lock công nợ kỳ đó (không sửa được)
```

**AC4: Xử lý chênh lệch**
```gherkin
Given NCC phản hồi có chênh lệch:
  - Theo sổ mình: 30,000,000
  - Theo sổ NCC: 35,000,000
When tôi nhập chênh lệch: 5,000,000
And nhập nguyên nhân: "Thiếu HĐ-003 chưa ghi nhận"
Then hệ thống:
  - Tạo task: "Investigate difference - AP vs Supplier ABC"
  - Assign cho Kế toán trưởng
  - Không confirm reconciliation cho đến khi giải quyết
```

**Dependencies:** US-AP-001, US-AP-003

---

#### US-AP-006: Báo cáo Tuổi nợ AP (Aging Report)

**Story:**
```
As a Kế toán trưởng
I want to view AP aging report
So that I can monitor overdue payables and plan cash flow
```

**Story Points:** 5

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Xem báo cáo tuổi nợ**
```gherkin
Given hệ thống có công nợ phải trả
When tôi truy cập "AP Aging Report"
And chọn ngày báo cáo: 31/10/2024
Then hệ thống hiển thị:
  | NCC | Current (0-30d) | 31-60d | 61-90d | >90d | Total |
  | ABC | 50,000,000 | 20,000,000 | 10,000,000 | 0 | 80,000,000 |
  | XYZ | 30,000,000 | 0 | 0 | 5,000,000 | 35,000,000 |
  | **Total** | **80M** | **20M** | **10M** | **5M** | **115M** |
```

**AC2: Highlight nợ quá hạn**
```gherkin
Given có nợ quá hạn > 60 ngày
Then hệ thống:
  - Highlight màu vàng: 61-90 ngày
  - Highlight màu đỏ: > 90 ngày
  - Hiển thị icon cảnh báo ⚠️
```

**AC3: Drill-down chi tiết**
```gherkin
Given tôi đang xem Aging Report
When tôi click vào NCC "ABC" - cột "31-60d": 20,000,000
Then hệ thống hiển thị chi tiết hóa đơn:
  - HĐ-010: 12,000,000 (Due: 05/09, Overdue: 56 days)
  - HĐ-015: 8,000,000 (Due: 15/09, Overdue: 46 days)
```

**Dependencies:** US-AP-001

---

#### US-AP-007: Lịch Thanh toán Dự kiến

**Story:**
```
As a CFO
I want to view the payment schedule
So that I can plan cash flow and ensure sufficient funds
```

**Story Points:** 3

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Xem lịch thanh toán**
```gherkin
Given có nhiều hóa đơn chưa thanh toán với due date khác nhau
When tôi truy cập "Payment Schedule"
And chọn khoảng thời gian: 01/11-30/11/2024
Then hệ thống hiển thị:
  | Due Date | NCC | Số HĐ | Số tiền | Status |
  | 05/11 | ABC | HĐ-020 | 50,000,000 | Unpaid |
  | 10/11 | XYZ | HĐ-025 | 30,000,000 | Unpaid |
  | 15/11 | DEF | HĐ-030 | 70,000,000 | Unpaid |
  | **Total November** | | | **150,000,000** | |
```

**AC2: Cảnh báo hóa đơn sắp đến hạn**
```gherkin
Given hôm nay là 03/11/2024
When hệ thống check
Then hiển thị notification:
  - "5 invoices due within 7 days - Total: 120,000,000"
And gửi email nhắc nhở cho Kế toán AP và CFO
```

**Dependencies:** US-AP-001

---

#### US-AP-008: Quản lý Tạm ứng Nhà cung cấp

**Story:**
```
As a Kế toán AP
I want to manage advance payments to suppliers
So that we can track prepayments and apply them to future invoices
```

**Story Points:** 5

**Priority:** ⭐ MEDIUM (Could Have)

**Acceptance Criteria:**

**AC1: Ghi nhận tạm ứng**
```gherkin
Given cần tạm ứng 50% cho NCC "XYZ" trước khi nhận hàng
When tôi tạo "Advance Payment"
And nhập:
  - NCC: XYZ
  - Số tiền: 50,000,000
  - Lý do: "Tạm ứng 50% theo HĐ mua 100M"
Then hệ thống:
  - Tạo bút toán:
    - Nợ: 331 (Tạm ứng NCC XYZ) - 50,000,000
    - Có: 112 - 50,000,000
  - Lưu trạng thái: Advance - Not Applied
```

**AC2: Khớp tạm ứng với hóa đơn**
```gherkin
Given đã tạm ứng 50M cho NCC XYZ
And nhận hóa đơn 100M từ NCC XYZ
When tôi apply advance payment
Then hệ thống:
  - Trừ tạm ứng: -50M
  - Công nợ còn lại: 50M
  - Trạng thái advance: Applied
```

**Dependencies:** US-AP-001, US-AP-003

---

#### US-AP-009: Hủy/Điều chỉnh Thanh toán

**Story:**
```
As a Kế toán trưởng
I want to void or adjust payments
So that I can correct payment errors
```

**Story Points:** 3

**Priority:** ⭐ MEDIUM (Could Have)

**Acceptance Criteria:**

**AC1: Hủy thanh toán**
```gherkin
Given payment PV-001 đã confirmed (50M cho NCC ABC)
When tôi click "Void Payment"
And nhập lý do: "Chuyển khoản sai STK"
And confirm
Then hệ thống:
  - Tạo bút toán đảo
  - Trả công nợ về trạng thái Unpaid
  - Đánh dấu PV-001: Voided
  - Ghi log với lý do
```

**Dependencies:** US-AP-003

---

#### US-AP-010: Báo cáo Chi tiết NCC (Supplier Ledger)

**Story:**
```
As a Kế toán AP
I want to view detailed supplier ledger
So that I can track all transactions with a specific supplier
```

**Story Points:** 3

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Xem sổ chi tiết NCC**
```gherkin
Given hệ thống có giao dịch với NCC "ABC"
When tôi truy cập "Supplier Ledger"
And chọn NCC: ABC, Kỳ: 01/10-31/10/2024
Then hiển thị:
  | Ngày | Số CT | Diễn giải | Phát sinh Nợ | Phát sinh Có | Số dư |
  | 01/10 | | Số dư đầu kỳ | | | 20,000,000 |
  | 05/10 | HĐ-001 | Mua hàng | | 50,000,000 | 70,000,000 |
  | 10/10 | PV-001 | Thanh toán | 30,000,000 | | 40,000,000 |
  | 31/10 | | Số dư cuối kỳ | | | 40,000,000 |
```

**Dependencies:** US-AP-001, US-AP-003

---

## 5. ACCOUNTS RECEIVABLE STORIES

### Epic: EP-AR - Accounts Receivable

**Epic Goal:** Quản lý công nợ phải thu khách hàng, từ xuất hóa đơn, thu tiền, đến quản lý nợ quá hạn.

---

#### US-AR-001: Xuất Hóa đơn Khách hàng

**Story:**
```
As a Kế toán AR
I want to create customer invoices
So that we can bill customers and track receivables
```

**Story Points:** 5

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Tạo hóa đơn bán hàng**
```gherkin
Given có Sales Order SO-2024-001 đã được phê duyệt
When tôi click "Create Customer Invoice"
And nhập:
  - KH: Công ty XYZ (MST: 9876543210)
  - Hàng hóa: Laptop HP - SL: 5 - Đơn giá: 20,000,000
  - VAT: 10%
  - Payment term: 30 ngày
And click "Save"
Then hệ thống:
  - Tạo hóa đơn INV-2024-001
  - Tổng tiền: 110,000,000
  - Due date: [Ngày hiện tại + 30 ngày]
  - Trạng thái: Draft
```

**AC2: Kiểm tra Credit Limit**
```gherkin
Given KH "XYZ" có:
  - Credit Limit: 200,000,000
  - Công nợ hiện tại: 150,000,000
When tôi tạo hóa đơn mới: 110,000,000
Then hệ thống cảnh báo:
  - "Credit limit exceeded: Current 150M + New 110M = 260M > Limit 200M"
  - "Requires Sales Manager approval"
And không cho phép save cho đến khi approved
```

**AC3: Tạo bút toán tự động**
```gherkin
Given hóa đơn INV-2024-001 đã approved
When hệ thống post
Then tạo bút toán:
  - Nợ: 131 (Phải thu KH XYZ) - 110,000,000
  - Có: 511 (Doanh thu bán hàng) - 100,000,000
  - Có: 3331 (Thuế VAT phải nộp) - 10,000,000
  - Diễn giải: "Bán hàng theo HĐ INV-2024-001 - KH XYZ"
```

**Dependencies:** None

---

#### US-AR-002: Xuất Hóa đơn Điện tử (e-Invoice)

**Story:**
```
As a Kế toán AR
I want to issue electronic invoices
So that we comply with Vietnamese e-invoice regulations (Decree 123/2020)
```

**Story Points:** 8

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Tạo hóa đơn điện tử**
```gherkin
Given hóa đơn INV-2024-001 đã được approved
When tôi click "Issue e-Invoice"
Then hệ thống:
  - Tạo file XML theo chuẩn Tổng cục thuế
  - Ký số bằng chữ ký điện tử công ty
  - Gửi lên cổng Tổng cục thuế
```

**AC2: Nhận mã CQT**
```gherkin
Given hóa đơn điện tử đã gửi lên cổng thuế
When Tổng cục thuế chấp nhận
Then hệ thống:
  - Nhận mã CQT (ví dụ: 1/001/ABC12345)
  - Cập nhật mã vào hóa đơn
  - Trạng thái: "e-Invoice Issued"
```

**AC3: Gửi e-Invoice cho khách hàng**
```gherkin
Given hóa đơn đã có mã CQT
When hệ thống gửi email
Then:
  - Gửi file PDF e-Invoice đến email KH
  - Subject: "Hóa đơn điện tử INV-2024-001 - [Công ty]"
  - Body: Thông tin hóa đơn, link tra cứu
  - Đính kèm file XML (nếu KH yêu cầu)
```

**AC4: Xử lý hóa đơn bị từ chối**
```gherkin
Given hóa đơn điện tử gửi lên cổng thuế
When Tổng cục thuế từ chối với lý do: "Sai MST khách hàng"
Then hệ thống:
  - Hiển thị lỗi chi tiết
  - Cho phép sửa thông tin
  - Submit lại sau khi sửa
```

**Dependencies:** US-AR-001

**Technical Notes:**
- Tích hợp API nhà cung cấp e-Invoice (VNPT, Viettel, FPT, MobiFone...)
- XML format theo Thông tư 78/2021/TT-BTC

---

#### US-AR-003: Thu tiền Khách hàng

**Story:**
```
As a Kế toán AR
I want to record customer payments
So that we can track cash receipts and reduce receivables
```

**Story Points:** 5

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Tạo phiếu thu**
```gherkin
Given KH "XYZ" có hóa đơn INV-2024-001: 110,000,000 (Unpaid)
When tôi click "Create Receipt"
And nhập:
  - KH: XYZ
  - Hóa đơn: INV-2024-001
  - Số tiền: 110,000,000
  - Phương thức: Chuyển khoản
  - Ngày thu: 20/10/2024
And click "Save"
Then hệ thống:
  - Tạo Receipt RC-2024-001
  - Trạng thái: Pending Confirmation
```

**AC2: Xác nhận thu tiền**
```gherkin
Given phiếu thu RC-2024-001 đã tạo
When tôi click "Confirm Receipt"
And upload chứng từ chuyển khoản
Then hệ thống:
  - Tạo bút toán:
    - Nợ: 112 (Tiền gửi NH) - 110,000,000
    - Có: 131 (Phải thu KH XYZ) - 110,000,000
  - Cập nhật hóa đơn INV-2024-001: Paid
  - Giảm công nợ KH XYZ
```

**AC3: Khớp thanh toán tự động**
```gherkin
Given hệ thống import sao kê ngân hàng
And có giao dịch: "Chuyen tien cua XYZ - 110,000,000"
When hệ thống auto-match
Then:
  - Tìm hóa đơn INV-2024-001 của KH XYZ với số tiền 110M
  - Tự động tạo phiếu thu và khớp
  - Hiển thị để user confirm
```

**Dependencies:** US-AR-001

---

#### US-AR-004: Thanh toán Một phần (AR)

**Story:**
```
As a Kế toán AR
I want to record partial payments from customers
So that we can track payment progress accurately
```

**Story Points:** 3

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Thu một phần**
```gherkin
Given hóa đơn INV-2024-005: 100,000,000 (Unpaid)
When KH thanh toán: 60,000,000
And tôi confirm receipt
Then:
  - Hóa đơn status: Partially Paid
  - Paid: 60,000,000
  - Remaining: 40,000,000
  - Hiển thị progress bar: 60%
```

**AC2: Theo dõi lịch sử thanh toán**
```gherkin
Given hóa đơn INV-2024-005 đã có nhiều lần thanh toán
When tôi xem chi tiết hóa đơn
Then hiển thị:
  | Ngày | Phiếu thu | Số tiền | Ghi chú |
  | 10/10 | RC-001 | 60,000,000 | Chuyển khoản |
  | 25/10 | RC-015 | 40,000,000 | Tiền mặt |
  | **Total** | | **100,000,000** | **Fully Paid** |
```

**Dependencies:** US-AR-003

---

#### US-AR-005: Chiết khấu Thanh toán Sớm

**Story:**
```
As a Kế toán AR
I want to apply early payment discounts
So that we can incentivize customers to pay early and improve cash flow
```

**Story Points:** 3

**Priority:** ⭐ MEDIUM (Could Have)

**Acceptance Criteria:**

**AC1: Áp dụng chiết khấu**
```gherkin
Given hóa đơn INV-2024-010: 100,000,000, Due: 30/10, Discount: 2% nếu thanh toán trong 10 ngày
And KH thanh toán ngày 15/10 (trong 10 ngày)
When tôi tạo receipt với discount
Then:
  - Số tiền thu: 98,000,000
  - Chiết khấu: 2,000,000
  - Bút toán:
    - Nợ: 112 - 98,000,000
    - Nợ: 635 (Chi phí chiết khấu) - 2,000,000
    - Có: 131 - 100,000,000
  - Hóa đơn: Fully Paid
```

**Dependencies:** US-AR-003

---

#### US-AR-006: Quản lý Nợ Quá hạn

**Story:**
```
As a Kế toán AR Manager
I want to track and manage overdue receivables
So that we can improve collection and reduce bad debt
```

**Story Points:** 5

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Hệ thống tự động cảnh báo**
```gherkin
Given hóa đơn INV-2024-020 Due: 15/10/2024
And hôm nay là 16/10/2024 (quá hạn 1 ngày)
When hệ thống check hàng ngày
Then:
  - Đánh dấu hóa đơn: Overdue Level 1 (1-30 days)
  - Gửi email nhắc nhở tự động cho KH
  - Gửi notification cho Kế toán AR
```

**AC2: Phân loại mức độ quá hạn**
```gherkin
Given có nhiều hóa đơn quá hạn với thời gian khác nhau
When tôi xem "Overdue Invoices"
Then hệ thống phân loại:
  - Level 1 (1-30 days): Gửi email tự động
  - Level 2 (31-60 days): Cảnh báo Kế toán AR - cần gọi điện
  - Level 3 (61-90 days): Cảnh báo Kế toán trưởng - gửi thư cảnh cáo
  - Level 4 (>90 days): Cảnh báo CFO - nguy cơ nợ xấu
And mỗi level có màu khác nhau: Xanh → Vàng → Cam → Đỏ
```

**AC3: Ngừng cung cấp dịch vụ**
```gherkin
Given KH "ABC" có nợ quá hạn > 90 ngày
When hệ thống check credit status
Then:
  - Đánh dấu KH: "Credit Hold"
  - Không cho phép tạo Sales Order mới
  - Hiển thị cảnh báo: "Customer on credit hold due to overdue invoices"
```

**Dependencies:** US-AR-001

---

#### US-AR-007: Trích lập Dự phòng Nợ Khó đòi

**Story:**
```
As a Kế toán trưởng
I want to create allowance for doubtful accounts
So that we can reflect realistic receivable values in financial statements
```

**Story Points:** 5

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Tính dự phòng tự động**
```gherkin
Given cuối năm có công nợ phải thu:
  - 91-180 days: 50,000,000
  - 181-365 days: 30,000,000
  - > 365 days: 10,000,000
When tôi chạy "Calculate Allowance"
Then hệ thống tính theo tỷ lệ:
  - 91-180 days × 30% = 15,000,000
  - 181-365 days × 50% = 15,000,000
  - >365 days × 70% = 7,000,000
  - **Tổng dự phòng: 37,000,000**
```

**AC2: Ghi nhận bút toán dự phòng**
```gherkin
Given dự phòng cần lập: 37,000,000
When tôi approve
Then hệ thống tạo bút toán:
  - Nợ: 642 (Chi phí dự phòng nợ khó đòi) - 37,000,000
  - Có: 229 (Dự phòng phải thu khó đòi) - 37,000,000
```

**AC3: Xóa nợ không thu hồi được**
```gherkin
Given KH "XYZ" phá sản, hóa đơn 20M không thu hồi được
And đã có dự phòng 14M (70%)
When tôi xóa nợ
Then hệ thống tạo bút toán:
  - Nợ: 229 (Dự phòng) - 14,000,000
  - Nợ: 811 (Chi phí khác) - 6,000,000
  - Có: 131 (Phải thu KH XYZ) - 20,000,000
```

**Dependencies:** US-AR-006

---

#### US-AR-008: Báo cáo Tuổi nợ AR (Aging Report)

**Story:**
```
As a Kế toán trưởng
I want to view AR aging report
So that I can monitor collection performance
```

**Story Points:** 5

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Xem báo cáo tuổi nợ**
```gherkin
Given hệ thống có công nợ phải thu
When tôi truy cập "AR Aging Report"
And chọn ngày: 31/10/2024
Then hiển thị:
  | KH | Current | 1-30d | 31-60d | 61-90d | >90d | Total |
  | ABC | 100M | 50M | 20M | 0 | 0 | 170M |
  | XYZ | 80M | 0 | 10M | 5M | 0 | 95M |
  | DEF | 0 | 0 | 0 | 0 | 20M | 20M (⚠️) |
  | **Total** | **180M** | **50M** | **30M** | **5M** | **20M** | **285M** |
```

**Dependencies:** US-AR-001

---

#### US-AR-009: Đối chiếu Công nợ với KH

**Story:**
```
As a Kế toán AR
I want to reconcile receivables with customers
So that we can confirm balances and resolve discrepancies
```

**Story Points:** 5

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

*(Tương tự US-AP-005 nhưng cho phía Khách hàng)*

**Dependencies:** US-AR-001

---

#### US-AR-010: Báo cáo Chi tiết KH (Customer Ledger)

**Story:**
```
As a Kế toán AR
I want to view detailed customer ledger
So that I can track all transactions with a specific customer
```

**Story Points:** 3

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

*(Tương tự US-AP-010 nhưng cho phía Khách hàng)*

**Dependencies:** US-AR-001, US-AR-003

---

## 6. FIXED ASSETS STORIES

### Epic: EP-FA - Fixed Assets

**Epic Goal:** Quản lý tài sản cố định từ mua sắm, khấu hao, đến thanh lý.

---

#### US-FA-001: Đăng ký TSCĐ Mới

**Story:**
```
As a Kế toán TSCĐ
I want to register new fixed assets
So that we can track assets and calculate depreciation
```

**Story Points:** 5

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Nhập thông tin TSCĐ**
```gherkin
Given công ty mua máy tính mới
When tôi click "Register Fixed Asset"
And nhập:
  - Mã TSCĐ: FA-2024-001 (auto-generate)
  - Tên: Laptop Dell Latitude 5520
  - Loại: Thiết bị văn phòng
  - Ngày mua: 15/10/2024
  - Nguyên giá: 30,000,000
  - Thời gian SD: 4 năm (48 tháng)
  - Phương pháp KH: Đường thẳng
  - Bộ phận: Phòng IT
  - Vị trí: Tầng 3, phòng 301
And click "Save"
Then hệ thống:
  - Lưu thông tin TSCĐ
  - Tính khấu hao tháng: 30,000,000 / 48 = 625,000
  - Trạng thái: Draft
```

**AC2: Upload hình ảnh và tài liệu**
```gherkin
Given TSCĐ FA-2024-001 đã tạo
When tôi click "Upload Photo"
And chọn ảnh Laptop
Then hệ thống lưu ảnh đại diện
When tôi click "Upload Document"
And upload file PDF (hóa đơn, chứng từ)
Then hệ thống lưu tài liệu đính kèm
```

**AC3: Tạo mã QR/Barcode**
```gherkin
Given TSCĐ FA-2024-001 đã lưu
When tôi click "Generate QR Code"
Then hệ thống:
  - Tạo mã QR chứa thông tin: FA-2024-001, Tên, Vị trí
  - Cho phép in tem QR để dán lên TSCĐ
```

**AC4: Ghi nhận bút toán mua TSCĐ**
```gherkin
Given TSCĐ FA-2024-001 được approved
When hệ thống post
Then tạo bút toán:
  - Nợ: 211 (Nguyên giá TSCĐ) - 30,000,000
  - Nợ: 133 (Thuế VAT) - 3,000,000
  - Có: 331/112 (Nguồn tiền) - 33,000,000
And chuyển trạng thái TSCĐ: "Đang sử dụng"
```

**Dependencies:** None

---

#### US-FA-002: Khấu hao Tự động Hàng tháng

**Story:**
```
As a Kế toán TSCĐ
I want the system to automatically calculate monthly depreciation
So that depreciation is recorded accurately and timely
```

**Story Points:** 8

**Priority:** ⭐⭐⭐ CRITICAL (Must Have)

**Acceptance Criteria:**

**AC1: Tự động chạy khấu hao cuối tháng**
```gherkin
Given cuối tháng 10/2024
And có 100 TSCĐ đang sử dụng, chưa hết khấu hao
When hệ thống auto-run "Monthly Depreciation"
Then:
  - Tính khấu hao cho từng TSCĐ
  - Tổng hợp theo bộ phận:
    - Bộ phận SX: 50,000,000 → TK 627
    - Bộ phận Bán hàng: 20,000,000 → TK 641
    - Bộ phận QLDN: 30,000,000 → TK 642
  - Tạo preview báo cáo khấu hao
```

**AC2: Phương pháp đường thẳng**
```gherkin
Given TSCĐ FA-001:
  - Nguyên giá: 48,000,000
  - Thời gian SD: 48 tháng
  - Phương pháp: Đường thẳng
When hệ thống tính khấu hao tháng 10
Then:
  - Khấu hao tháng = 48,000,000 / 48 = 1,000,000
  - Hao mòn lũy kế += 1,000,000
  - GTCL = Nguyên giá - Hao mòn lũy kế
```

**AC3: Tạo bút toán khấu hao**
```gherkin
Given khấu hao tháng 10 đã tính
When Kế toán trưởng approve
Then hệ thống tạo bút toán:
  - Nợ: 627 (KH-SX) - 50,000,000
  - Nợ: 641 (KH-Bán hàng) - 20,000,000
  - Nợ: 642 (KH-QLDN) - 30,000,000
  - Có: 214 (Hao mòn TSCĐ) - 100,000,000
  - Diễn giải: "Khấu hao TSCĐ tháng 10/2024"
```

**AC4: Ngừng khấu hao khi hết**
```gherkin
Given TSCĐ FA-010 đã khấu hao 47/48 tháng
And tháng 11 là tháng khấu hao cuối cùng
When hệ thống tính khấu hao tháng 11
Then:
  - Khấu hao tháng 11: 1,000,000
  - Hao mòn lũy kế = Nguyên giá
  - GTCL = 0
  - Đánh dấu: "Hết khấu hao"
  - Không tính khấu hao từ tháng 12 trở đi
```

**Dependencies:** US-FA-001

**Technical Notes:**
- Scheduled job chạy cuối tháng (ngày 30 hoặc 31)
- Email notification cho Kế toán TSCĐ và Kế toán trưởng

---

#### US-FA-003: Điều chuyển TSCĐ

**Story:**
```
As a Kế toán TSCĐ
I want to transfer assets between departments
So that we can track asset location and allocate depreciation correctly
```

**Story Points:** 3

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Điều chuyển TSCĐ**
```gherkin
Given TSCĐ FA-001 hiện tại ở Phòng IT
When tôi click "Transfer Asset"
And nhập:
  - Bộ phận mới: Phòng Kế toán
  - Vị trí mới: Tầng 2, phòng 205
  - Ngày điều chuyển: 20/10/2024
  - Lý do: "Tái phân bổ thiết bị"
And click "Submit"
Then hệ thống:
  - Cập nhật Bộ phận → Phòng Kế toán
  - Cập nhật Vị trí → Tầng 2, phòng 205
  - Lưu lịch sử điều chuyển
  - Tạo biên bản bàn giao (nếu cần)
```

**AC2: Điều chỉnh khấu hao khi chuyển bộ phận**
```gherkin
Given TSCĐ FA-001 chuyển từ IT (QLDN-642) sang Bán hàng (641)
And ngày chuyển: 15/10/2024
When tính khấu hao tháng 10
Then:
  - Ngày 1-15/10: Ghi vào TK 642 (IT) = 15/30 × Khấu hao tháng
  - Ngày 16-31/10: Ghi vào TK 641 (Bán hàng) = 15/30 × Khấu hao tháng
```

**Dependencies:** US-FA-001

---

#### US-FA-004: Thanh lý TSCĐ

**Story:**
```
As a Kế toán TSCĐ
I want to dispose of fixed assets
So that we can remove assets from books and record disposal gains/losses
```

**Story Points:** 5

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Thanh lý vì hư hỏng (không thu hồi)**
```gherkin
Given TSCĐ FA-050:
  - Nguyên giá: 20,000,000
  - Hao mòn lũy kế: 15,000,000
  - GTCL: 5,000,000
When tôi click "Dispose Asset"
And chọn lý do: "Hư hỏng, không sửa được"
And không thu hồi tiền
Then hệ thống tạo bút toán:
  - Nợ: 214 (Hao mòn) - 15,000,000
  - Nợ: 811 (Chi phí khác) - 5,000,000
  - Có: 211 (Nguyên giá) - 20,000,000
And trạng thái TSCĐ: "Đã thanh lý"
```

**AC2: Bán TSCĐ - Có lãi**
```gherkin
Given TSCĐ FA-051:
  - Nguyên giá: 30,000,000
  - Hao mòn lũy kế: 25,000,000
  - GTCL: 5,000,000
When tôi bán với giá: 7,000,000
Then:
  - Lãi = 7,000,000 - 5,000,000 = 2,000,000
  - Bút toán:
    - Nợ: 112 (Tiền thu) - 7,000,000
    - Nợ: 214 (Hao mòn) - 25,000,000
    - Có: 211 (Nguyên giá) - 30,000,000
    - Có: 711 (Thu nhập khác) - 2,000,000
```

**AC3: Bán TSCĐ - Có lỗ**
```gherkin
Given TSCĐ FA-052 GTCL: 5,000,000
When tôi bán với giá: 3,000,000
Then:
  - Lỗ = 3,000,000 - 5,000,000 = -2,000,000
  - Bút toán:
    - Nợ: 112 - 3,000,000
    - Nợ: 214 - 25,000,000
    - Nợ: 811 (Chi phí khác) - 2,000,000
    - Có: 211 - 30,000,000
```

**Dependencies:** US-FA-001

---

#### US-FA-005: Đánh giá lại TSCĐ

**Story:**
```
As a Kế toán TSCĐ
I want to revalue fixed assets
So that we can reflect fair market value
```

**Story Points:** 3

**Priority:** ⭐ MEDIUM (Could Have)

**Acceptance Criteria:**

*(Chỉ áp dụng trong trường hợp đặc biệt theo VAS)*

**Dependencies:** US-FA-001

---

#### US-FA-006: Báo cáo TSCĐ

**Story:**
```
As a Kế toán trưởng
I want to view fixed assets reports
So that I can monitor asset values and depreciation
```

**Story Points:** 5

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Báo cáo Danh sách TSCĐ**
```gherkin
Given hệ thống có nhiều TSCĐ
When tôi truy cập "Fixed Assets List Report"
Then hiển thị:
  | Mã TSCĐ | Tên | Nguyên giá | Hao mòn LK | GTCL | Bộ phận | Trạng thái |
  | FA-001 | Laptop Dell | 30M | 10M | 20M | IT | Đang SD |
  | FA-002 | Máy in HP | 15M | 15M | 0 | QLDN | Hết KH |
  | **Tổng** | | **500M** | **300M** | **200M** | | |
```

**AC2: Báo cáo Khấu hao**
```gherkin
Given tôi muốn xem khấu hao năm 2024
When tôi chọn "Depreciation Report" - Năm 2024
Then hiển thị theo từng tháng:
  | Tháng | Khấu hao SX (627) | KH Bán hàng (641) | KH QLDN (642) | Tổng |
  | 01/2024 | 50M | 20M | 30M | 100M |
  | ... | | | | |
  | 12/2024 | 55M | 22M | 33M | 110M |
  | **Tổng năm** | **620M** | **250M** | **380M** | **1,250M** |
```

**Dependencies:** US-FA-001, US-FA-002

---

#### US-FA-007: Kiểm kê TSCĐ

**Story:**
```
As a Kế toán TSCĐ
I want to conduct physical inventory of fixed assets
So that we can verify existence and condition of assets
```

**Story Points:** 5

**Priority:** ⭐⭐ HIGH (Should Have)

**Acceptance Criteria:**

**AC1: Tạo phiếu kiểm kê**
```gherkin
Given cần kiểm kê TSCĐ cuối năm
When tôi click "Create Inventory Count"
And chọn:
  - Ngày kiểm kê: 31/12/2024
  - Bộ phận: Tất cả
Then hệ thống tạo danh sách TSCĐ cần kiểm
And in phiếu kiểm kê để đội ngũ đi kiểm
```

**AC2: Nhập kết quả kiểm kê**
```gherkin
Given đã kiểm kê thực tế
When tôi nhập kết quả:
  - FA-001: Có ✓, Tình trạng: Tốt
  - FA-015: Không tìm thấy ❌
  - FA-020: Có ✓, Tình trạng: Hư hỏng
Then hệ thống:
  - Đánh dấu FA-015: "Missing - Cần điều tra"
  - Đánh dấu FA-020: "Damaged - Cần xem xét thanh lý"
  - Tạo báo cáo chênh lệch
```

**AC3: Xử lý chênh lệch**
```gherkin
Given FA-015 không tìm thấy
When tôi click "Resolve Discrepancy"
And chọn: "Write-off - Mất TSCĐ"
Then:
  - Tạo bút toán giảm TSCĐ (như thanh lý)
  - Gửi báo cáo cho CFO
  - Xử lý trách nhiệm bồi thường (nếu có)
```

**Dependencies:** US-FA-001

---

#### US-FA-008: Bảo trì TSCĐ

**Story:**
```
As a Kế toán TSCĐ
I want to track maintenance history
So that we can plan preventive maintenance and control costs
```

**Story Points:** 3

**Priority:** ⭐ MEDIUM (Could Have)

**Acceptance Criteria:**

**AC1: Ghi nhận bảo trì**
```gherkin
Given TSCĐ FA-005 (Ô tô) cần bảo dưỡng định kỳ
When tôi click "Record Maintenance"
And nhập:
  - Loại: Bảo dưỡng định kỳ
  - Ngày: 15/10/2024
  - Chi phí: 5,000,000
  - Nhà cung cấp: Garage ABC
  - Ghi chú: "Thay dầu, kiểm tra phanh"
Then hệ thống lưu vào lịch sử bảo trì
```

**AC2: Cảnh báo bảo trì định kỳ**
```gherkin
Given TSCĐ FA-005 cần bảo dưỡng 3 tháng/lần
And lần cuối: 15/10/2024
When đến ngày 01/01/2025
Then hệ thống gửi notification:
  - "FA-005 due for maintenance - Last: 15/10/2024"
```

**Dependencies:** US-FA-001

---

#### US-FA-009: Lịch sử TSCĐ

**Story:**
```
As a Kiểm toán viên
I want to view complete history of a fixed asset
So that I can audit asset lifecycle
```

**Story Points:** 2

**Priority:** ⭐ MEDIUM (Could Have)

**Acceptance Criteria:**

**AC1: Xem lịch sử TSCĐ**
```gherkin
Given TSCĐ FA-001 đã có nhiều sự kiện
When tôi click "View History"
Then hiển thị timeline:
  | Ngày | Sự kiện | Chi tiết | User |
  | 15/10/2024 | Mua mới | Nguyên giá: 30M | KTV_Lan |
  | 20/10/2024 | Điều chuyển | IT → Kế toán | KTV_Lan |
  | 31/10/2024 | Khấu hao | Tháng 10: 625K | System |
  | 15/11/2024 | Bảo trì | Chi phí: 1M | KTV_Hoa |
  | ... | | | |
```

**Dependencies:** US-FA-001

---

## 7. CASH MANAGEMENT STORIES

### Epic: EP-CM - Cash Management

**Epic Goal:** Quản lý thu chi tiền mặt và tiền gửi ngân hàng, đối chiếu ngân hàng.

*(8 stories tương tự pattern trên, bao gồm: Thu/Chi tiền mặt, Quản lý ngân hàng, Đối chiếu ngân hàng, Sổ quỹ, Kiểm kê quỹ...)*

**US-CM-001:** Phiếu Thu Tiền mặt
**US-CM-002:** Phiếu Chi Tiền mặt
**US-CM-003:** Quản lý Tài khoản Ngân hàng
**US-CM-004:** Import Sao kê Ngân hàng
**US-CM-005:** Đối chiếu Ngân hàng
**US-CM-006:** Sổ Quỹ Tiền mặt
**US-CM-007:** Kiểm kê Quỹ
**US-CM-008:** Báo cáo Dòng tiền (Cash Flow)

---

## 8. TAX MANAGEMENT STORIES

### Epic: EP-TAX - Tax Management

**Epic Goal:** Khai báo và nộp thuế (VAT, CIT, PIT) tuân thủ quy định pháp luật Việt Nam.

**US-TAX-001:** Khai thuế GTGT (VAT Declaration)
**US-TAX-002:** Nộp thuế GTGT
**US-TAX-003:** Khai thuế TNDN tạm tính (CIT Quarterly)
**US-TAX-004:** Quyết toán thuế TNDN (CIT Annual)
**US-TAX-005:** Nhận dữ liệu thuế TNCN từ Payroll
**US-TAX-006:** Khai thuế TNCN (PIT Declaration)
**US-TAX-007:** Nộp thuế TNCN
**US-TAX-008:** Báo cáo Thuế tổng hợp
**US-TAX-009:** Tra cứu Lịch sử Khai thuế

---

## 9. FINANCIAL REPORTING STORIES

### Epic: EP-FR - Financial Reporting

**Epic Goal:** Tạo báo cáo tài chính theo VAS và báo cáo quản trị.

**US-FR-001:** Bảng Cân đối Kế toán (Balance Sheet)
**US-FR-002:** Báo cáo Kết quả Kinh doanh (Income Statement)
**US-FR-003:** Báo cáo Lưu chuyển Tiền tệ (Cash Flow Statement)
**US-FR-004:** Thuyết minh Báo cáo Tài chính (Notes)
**US-FR-005:** Ký số BCTC
**US-FR-006:** Financial Dashboard (KPIs)
**US-FR-007:** Báo cáo Chi phí theo Bộ phận
**US-FR-008:** Phân tích Tỷ lệ Tài chính (Ratio Analysis)
**US-FR-009:** Budget vs Actual Report
**US-FR-010:** Trend Analysis
**US-FR-011:** Export BCTC (Excel, PDF)
**US-FR-012:** Lưu trữ BCTC theo Phiên bản

---

## 10. STORY MAPPING & PRIORITIZATION

### 10.1 Release Plan

**Release 1 (Sprint 1-4): Core Accounting**
- EP-GL: General Ledger ✅
- EP-AP: Accounts Payable ✅
- EP-AR: Accounts Receivable ✅
- MVP: Ghi bút toán, công nợ, báo cáo cơ bản

**Release 2 (Sprint 5-8): Asset & Tax**
- EP-CM: Cash Management ✅
- EP-FA: Fixed Assets ✅
- EP-TAX: Tax Management ✅

**Release 3 (Sprint 9-12): Reporting & Integration**
- EP-FR: Financial Reporting ✅
- EP-SYS: System Integration ✅
- UAT & Go-live

### 10.2 MoSCoW Prioritization

**MUST HAVE (Critical - 65% stories):**
- GL: Bút toán, Sổ cái, Kết chuyển
- AP/AR: Hóa đơn, Thanh toán, Công nợ
- TAX: VAT, CIT, PIT
- FR: BCTC theo VAS

**SHOULD HAVE (High - 25% stories):**
- AP/AR: Đối chiếu, Aging reports
- FA: Khấu hao, Báo cáo
- CM: Đối chiếu NH
- FR: Báo cáo quản trị

**COULD HAVE (Medium - 10% stories):**
- Template bút toán
- Tạm ứng NCC/KH
- Bảo trì TSCĐ
- Trend analysis

**WON'T HAVE (This release):**
- Consolidation accounting
- Project accounting
- Manufacturing costing

---

## PHỤ LỤC

### Story Point Reference

| Points | Complexity | Effort | Examples |
|--------|------------|--------|----------|
| 1 | Trivial | < 4 hours | Simple CRUD, List view |
| 2 | Simple | 4-8 hours | Form with validation |
| 3 | Medium | 1-2 days | Report with filters |
| 5 | Complex | 2-4 days | Workflow, Auto-calculation |
| 8 | Very Complex | 1 week | Integration, Complex logic |
| 13 | Epic | 2 weeks | Major feature |
| 21 | Too large | - | Should be split |

---

**Tài liệu này phục vụ cho:**
- Product Owner: Quản lý backlog
- Scrum Master: Sprint planning
- Developers: Implementation reference
- QA: Test case creation
- Stakeholders: Feature understanding

**Phiên bản:** 1.0
**Ngày tạo:** 2024-10-03
**Người tạo:** BA Team
**Trạng thái:** ✅ Draft - Pending Review
