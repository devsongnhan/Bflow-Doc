# Use Cases & User Stories: Khởi Tạo Số Dư Đầu Kỳ

**Created:** 2024-10-29
**Status:** Draft - Ready for Review
**Version:** 1.0

---

## 1. Executive Summary

Tài liệu này mô tả chi tiết các use case và user stories cho tính năng khởi tạo số dư đầu kỳ (Opening Balance Initialization), bao gồm:
- 5 use case chính
- 12 user stories chi tiết
- Acceptance criteria cho từng story
- Kịch bản xử lý (happy path & exception cases)

---

## 2. Use Case Diagram

```
                    ┌─────────────────────────┐
                    │  Opening Balance System  │
                    └─────────────────────────┘
                              △
                    ┌─────────┴──────────┐
                    │                    │
              ┌─────▼────┐         ┌────▼──────┐
              │ Accountant│         │  Manager  │
              └─────┬────┘         └────┬──────┘
                    │                    │
        ┌───────────┼────────────────────┼──────────────┐
        │           │                    │              │
    ┌───▼───┐  ┌───▼─────┐         ┌────▼────┐    ┌───▼──┐
    │UC-001 │  │  UC-002 │         │ UC-003  │    │UC-004│
    │Create │  │ Import  │         │ Review  │    │Modify│
    │Manual │  │ Bulk    │         │ & Approve   │Delete│
    │Entry  │  │Data     │         │             │Entry │
    └───────┘  └─────────┘         └─────────┘    └──────┘
                                         │
                                    ┌────▼────┐
                                    │ UC-005  │
                                    │Confirm &│
                                    │Finalize │
                                    └─────────┘
```

---

## 3. Use Cases Chi Tiết

### **USE CASE 1: UC-001 - Create Manual Opening Balance Entry**

**Actors:**
- Primary: Accountant (Nhân viên kế toán)
- Secondary: System (Hệ thống)

**Preconditions:**
- Accountant đã đăng nhập hệ thống
- Accountant có quyền "Create Opening Balance"
- Chart of Accounts đã được cấu hình
- Company/Branch chưa có Opening Balance cho kỳ này

**Main Flow (Happy Path):**

1. Accountant chọn: Accounting > Opening Balance > Create New
2. Hệ thống hiển thị form nhập số dư:
   - Company/Branch selector
   - Period selector (kỳ khởi tạo)
   - Account selector
   - Amount input
   - Debit/Credit radio button
   - Description (optional)
3. Accountant chọn Company: "ABC Company"
4. Accountant chọn Period: "01/2024"
5. Accountant chọn Account: "111 - Tiền mặt"
6. Accountant nhập Amount: 100,000,000
7. Accountant chọn Debit (Nợ)
8. Accountant nhập Description: "Tiền mặt ban đầu theo sổ cũ"
9. Accountant nhấn "Add" → Dòng được thêm vào danh sách
10. Lặp lại bước 5-9 cho các tài khoản khác
11. Hệ thống hiển thị tóm tắt:
    - Total Debit: 500,000,000
    - Total Credit: 500,000,000
    - Status: Cân bằng ✅
12. Accountant kiểm tra lại dữ liệu
13. Accountant nhấn "Save" → Dữ liệu lưu dạng Draft
14. Hệ thống hiển thị: "Opening Balance created successfully (Draft)"
15. Use case kết thúc

**Alternative Flow 1: Sai Số Dư**

1. Accountant nhập sai số dư cho tài khoản 111
2. Accountant nhấn "Add"
3. Hệ thống hiển thị tóm tắt:
   - Total Debit: 600,000,000
   - Total Credit: 500,000,000
   - Status: Không cân bằng ❌ (Chênh lệch: 100,000,000)
4. Accountant xem lại danh sách, tìm ra lỗi
5. Accountant nhấn "Edit" trên dòng sai
6. Hệ thống hiển thị form chỉnh sửa
7. Accountant sửa Amount thành đúng
8. Accountant nhấn "Update"
9. Hệ thống cập nhật tóm tắt → Cân bằng lại ✅
10. Accountant nhấn "Save"

**Alternative Flow 2: Xóa Dòng Sai Lệch**

1. Accountant phát hiện dòng sai
2. Accountant nhấn "Delete" trên dòng đó
3. Hệ thống hỏi xác nhận: "Bạn chắc chắn xóa dòng này?"
4. Accountant xác nhận
5. Dòng được xóa, tóm tắt cập nhật

**Exception Flow 1: Account Không Tồn Tại**

1. Accountant chọn Account: "999 - Tài khoản không tồn tại"
2. Hệ thống hiển thị error: "Account 999 không tồn tại. Vui lòng chọn account khác."
3. Accountant chọn account khác
4. Flow tiếp tục bình thường

**Exception Flow 2: Không Có Quyền**

1. Accountant (không có quyền) cố gắng tạo Opening Balance
2. Hệ thống hiển thị: "Bạn không có quyền thực hiện hành động này"
3. Accountant phải liên hệ Manager để cấp quyền

**Postconditions:**
- Opening Balance record được tạo dạng Draft
- Dữ liệu được lưu tạm thời (có thể chỉnh sửa)
- Hệ thống lưu audit log: "Accountant Name - tạo mới Opening Balance entry lúc HH:MM"

**Notes:**
- Validation: Account phải tồn tại trong Chart of Accounts
- Validation: Amount phải là số dương > 0
- Validation: Tổng Debit phải = Tổng Credit
- Không ghi nhận vào tài khoản kế toán cho đến khi Confirm

---

### **USE CASE 2: UC-002 - Import Bulk Opening Balance Data**

**Actors:**
- Primary: Accountant (Nhân viên kế toán)
- Secondary: System (Hệ thống)

**Preconditions:**
- Accountant đã đăng nhập
- Accountant có quyền "Import Opening Balance"
- File Excel/CSV đã chuẩn bị theo định dạng chuẩn
- Chart of Accounts đã được cấu hình

**Main Flow (Happy Path):**

1. Accountant chọn: Accounting > Opening Balance > Import
2. Hệ thống hiển thị upload form
3. Accountant chọn Company: "ABC Company"
4. Accountant chọn Period: "01/2024"
5. Accountant nhấn "Choose File"
6. Accountant chọn file: "opening_balance_2024.xlsx"
7. Accountant nhấn "Upload"
8. Hệ thống xử lý file:
   - Parse Excel/CSV
   - Validate từng dòng:
     * Account tồn tại?
     * Amount format valid?
     * Debit/Credit có giá trị?
9. Nếu all valid:
   - Hệ thống tạo Opening Balance record (Draft)
   - Hiển thị danh sách data: 50 dòng imported
   - Tổng Debit: 500,000,000
   - Tổng Credit: 500,000,000
   - Status: Cân bằng ✅
10. Accountant xem lại danh sách
11. Accountant nhấn "Save"
12. Hệ thống lưu data, chuyển sang Draft status
13. Message: "Import successful - 50 records imported"

**Alternative Flow 1: Có Lỗi Trong File**

1. File có 1 dòng với Account không tồn tại
2. Hệ thống parse file, phát hiện lỗi
3. Hệ thống hiển thị error:
   ```
   Import Failed - Có lỗi trong file:
   - Row 5: Account "999" không tồn tại

   Vui lòng sửa và upload lại
   ```
4. Accountant tải lại file mẫu để kiểm tra format
5. Accountant sửa file
6. Upload lại → Thành công

**Alternative Flow 2: File Format Sai**

1. Accountant upload file không đúng format
2. Hệ thống phát hiện: "File format không đúng. Hỗ trợ: .xlsx, .csv"
3. Accountant chọn file đúng format

**Exception Flow 1: Không Cân Bằng**

1. File có:
   - Total Debit: 600,000,000
   - Total Credit: 500,000,000
2. Hệ thống hiển thị:
   ```
   Import successful nhưng có cảnh báo:
   - Total Debit: 600,000,000
   - Total Credit: 500,000,000
   - Không cân bằng: Chênh lệch 100,000,000

   Vui lòng kiểm tra lại dữ liệu
   ```
3. Accountant phải sửa dữ liệu trong file hoặc chỉnh sửa thủ công
4. Nếu chỉnh sửa thủ công → Chuyển sang UC-001 (Edit)

**Postconditions:**
- Opening Balance record được tạo dạng Draft
- Dữ liệu từ file được import vào hệ thống
- Audit log: "Accountant Name - import 50 records từ file opening_balance_2024.xlsx lúc HH:MM"

**Notes:**
- File format chuẩn: Account Code | Amount | Debit/Credit
- Hệ thống hỗ trợ: .xlsx (Excel), .csv
- Validation tự động cho tất cả dòng
- Nếu có 1 lỗi → Ngừng import, không tạo record

---

### **USE CASE 3: UC-003 - Review & Approve Opening Balance**

**Actors:**
- Primary: Manager/Approver (Quản lý / Người phê duyệt)
- Secondary: System (Hệ thống)

**Preconditions:**
- Opening Balance entry đã được tạo (Draft status)
- Approver đã đăng nhập
- Approver có quyền "Approve Opening Balance"
- Data đã cân bằng (Debit = Credit)

**Main Flow (Happy Path):**

1. Approver chọn: Accounting > Opening Balance > Pending Approval
2. Hệ thống hiển thị danh sách:
   ```
   | Company | Period | Created By | Amount | Status |
   | ABC Co  | 01/2024| John Doe  | 500M   | Draft  |
   ```
3. Approver nhấn vào entry để xem chi tiết
4. Hệ thống hiển thị:
   - Company: ABC Company
   - Period: 01/2024
   - Created By: John Doe (Accountant)
   - Created Date: 2024-10-29 10:30
   - Danh sách chi tiết tất cả tài khoản:
     ```
     | Account | Debit | Credit |
     | 111 | 100,000,000 | |
     | 112 | 200,000,000 | |
     | 131 | 100,000,000 | |
     | 156 | 150,000,000 | |
     | 331 | | 200,000,000 |
     | 341 | | 150,000,000 |
     | 411 | | 150,000,000 |
     ```
   - Total Debit: 500,000,000
   - Total Credit: 500,000,000
   - Status: Cân bằng ✅
5. Approver kiểm tra lại số liệu
6. Approver nhấn "Approve"
7. Hệ thống hỏi xác nhận:
   ```
   Bạn chắc chắn phê duyệt entry này?
   (Sau khi phê duyệt, chỉ có thể xem hoặc xác nhận, không thể chỉnh sửa)
   ```
8. Approver xác nhận
9. Hệ thống cập nhật status → APPROVED
10. Message: "Opening Balance approved"
11. Audit log: "Manager Name - phê duyệt Opening Balance entry lúc HH:MM"

**Alternative Flow 1: Phát Hiện Lỗi → Từ Chối**

1. Approver xem entry, phát hiện số dư của TK 111 không đúng
2. Approver nhấn "Reject"
3. Hệ thống hiển thị comment box:
   ```
   Reason for rejection:
   [Số dư TK 111 sai, vui lòng kiểm tra lại]
   ```
4. Approver nhập comment, nhấn "Reject"
5. Hệ thống cập nhật status → DRAFT (quay lại trạng thái draft)
6. Notification gửi cho Accountant: "Your opening balance entry was rejected. Reason: ..."
7. Accountant sửa lại

**Alternative Flow 2: Yêu Cầu Thêm Thông Tin**

1. Approver có câu hỏi về 1 dòng
2. Approver nhấn "Request Changes"
3. Hệ thống hiển thị comment section
4. Approver nhập: "Vui lòng kiểm tra lại tài khoản 131, có thay đổi so với sổ cũ?"
5. Hệ thống gửi notification cho Accountant
6. Accountant trả lời comment
7. Approver xem lại, phê duyệt hoặc từ chối

**Postconditions:**
- Opening Balance entry được phê duyệt
- Status: APPROVED
- Chỉ có thể xem hoặc xác nhận, không thể chỉnh sửa
- Audit log được ghi lại

**Notes:**
- Approval là bước quan trọng, đảm bảo dữ liệu chính xác
- Comment/Notes được lưu trong audit trail
- Nếu rejected, quay lại Draft và có thể chỉnh sửa

---

### **USE CASE 4: UC-004 - Modify or Delete Opening Balance Entry**

**Actors:**
- Primary: Accountant (Nhân viên kế toán)
- Secondary: System (Hệ thống)

**Preconditions:**
- Opening Balance entry ở trạng thái Draft
- Accountant là người tạo entry (hoặc có quyền Admin)
- Entry chưa được Confirm

**Main Flow - Modify (Happy Path):**

1. Accountant chọn: Accounting > Opening Balance > My Drafts
2. Hệ thống hiển thị danh sách Draft entries
3. Accountant chọn entry cần sửa
4. Hệ thống hiển thị chi tiết entry
5. Accountant tìm dòng sai (TK 112 amount sai)
6. Accountant nhấn "Edit" trên dòng
7. Hệ thống hiển thị form chỉnh sửa
8. Accountant sửa Amount: từ 200M → 220M
9. Accountant nhấn "Update"
10. Hệ thống cập nhật:
    - Tóm tắt mới: Total Debit 520M, Total Credit 500M
    - Status: Không cân bằng ❌
11. Accountant thêm dòng mới để cân bằng:
    - Account: 112 (Tiền gởi NH)
    - Amount: 20M
    - Debit
12. Hệ thống cập nhật tóm tắt → Cân bằng ✅
13. Accountant nhấn "Save"
14. Message: "Entry updated successfully"

**Alternative Flow - Delete Entry:**

1. Accountant muốn xóa toàn bộ entry
2. Accountant nhấn "Delete" (button ở đầu form)
3. Hệ thống hỏi xác nhận:
   ```
   Bạn chắc chắn xóa entry này?
   Hành động này không thể hoàn tác.
   ```
4. Accountant xác nhận
5. Hệ thống xóa entry
6. Message: "Entry deleted successfully"
7. Audit log: "Accountant Name - xóa Opening Balance entry lúc HH:MM"

**Exception Flow 1: Đã Approve - Không Thể Sửa**

1. Accountant cố gắng sửa entry đã Approved
2. Hệ thống hiển thị: "Entry đã được phê duyệt. Không thể chỉnh sửa. Vui lòng liên hệ Manager để xóa."

**Postconditions:**
- Entry được cập nhật hoặc xóa
- Audit log ghi lại sửa đổi
- Status vẫn là Draft

**Notes:**
- Chỉ có thể sửa khi status = Draft
- Mỗi sửa đổi được lưu trong audit trail
- Validation kiểm tra cân bằng sau mỗi sửa

---

### **USE CASE 5: UC-005 - Confirm & Finalize Opening Balance**

**Actors:**
- Primary: Accountant/Manager (Nhân viên kế toán hoặc Quản lý)
- Secondary: System (Hệ thống)

**Preconditions:**
- Opening Balance entry ở trạng thái APPROVED
- Data đã được review và approve
- Data cân bằng (Debit = Credit)

**Main Flow (Happy Path):**

1. Accountant chọn: Accounting > Opening Balance > Approved
2. Hệ thống hiển thị danh sách Approved entries
3. Accountant chọn entry để xác nhận
4. Hệ thống hiển thị chi tiết (read-only)
5. Accountant nhấn "Confirm & Finalize"
6. Hệ thống hỏi xác nhận:
   ```
   Xác nhận ghi nhận Opening Balance vào hệ thống?

   - Tài khoản sẽ được cập nhật số dư
   - Hành động này không thể hoàn tác
   - Báo cáo tài chính sẽ dùng số dư này
   ```
7. Accountant xác nhận
8. Hệ thống xử lý:
   - Tạo Opening Balance Entry record (final)
   - Ghi tăng/giảm tài khoản kế toán (MỘT PHÍA):
     ```
     TK 111 (Tiền mặt): +100,000,000 (Nợ)
     TK 112 (Tiền NH): +200,000,000 (Nợ)
     TK 131 (Nợ phải thu): +100,000,000 (Nợ)
     TK 156 (Hàng hóa): +150,000,000 (Nợ)
     TK 331 (Nợ phải trả): +200,000,000 (Có)
     TK 341 (Nợ vay): +150,000,000 (Có)
     TK 411 (Vốn): +150,000,000 (Có)
     ```
   - Cập nhật account balances
   - Tạo audit log entry
9. Message: "Opening Balance confirmed and finalized"
10. Status: CONFIRMED
11. Hệ thống cho phép xem report nhưng không cho phép chỉnh sửa

**Alternative Flow 1: Dữ Liệu Không Cân Bằng**

1. Hệ thống phát hiện data không cân bằng (không nên xảy ra)
2. Hệ thống hiển thị error: "Data không cân bằng. Vui lòng sửa lại."
3. Accountant phải quay lại chỉnh sửa

**Exception Flow 1: Đã Confirm - Không Thể Sửa**

1. Nếu user cố gắng sửa entry đã Confirmed
2. Hệ thống hiển thị: "Entry đã được xác nhận. Không thể chỉnh sửa hoặc xóa."
3. Nếu cần thay đổi, phải liên hệ Admin

**Postconditions:**
- Opening Balance được ghi nhận vào hệ thống
- Account balances được cập nhật
- Status: CONFIRMED
- Không thể chỉnh sửa hoặc xóa
- Audit trail được ghi lại chi tiết
- Báo cáo tài chính sử dụng số dư này

**Notes:**
- Đây là bước cuối cùng, rất quan trọng
- Confirm = Chính thức ghi nhận vào hệ thống
- Không thể undo sau khi Confirm

---

## 4. User Stories Chi Tiết

### **USER STORY 1: Create Opening Balance Entry - Manual Entry**

```
As a Accountant
I want to create opening balance entry by manually entering
      account and amount
So that I can initialize system with initial balances
      from previous records
```

**Acceptance Criteria:**

1. ✅ Accountant có thể truy cập Opening Balance > Create New
2. ✅ Form hiển thị các fields:
   - Company (dropdown)
   - Period (date picker)
   - Account (dropdown - only active accounts)
   - Amount (number input, > 0)
   - Debit/Credit (radio button)
   - Description (textarea, optional)
3. ✅ Accountant có thể thêm nhiều dòng
4. ✅ System hiển thị tóm tắt:
   - Total Debit
   - Total Credit
   - Status (Balanced/Not Balanced)
5. ✅ Nếu data cân bằng (Debit = Credit) → Button "Save" enabled
6. ✅ Nếu data không cân bằng → Button "Save" disabled + warning message
7. ✅ Accountant có thể Edit/Delete từng dòng trước khi Save
8. ✅ Khi Save → Entry lưu dạng Draft, có thể chỉnh sửa sau

**Definition of Done:**
- [ ] Form hiển thị đúng
- [ ] Validation chạy đúng
- [ ] Tóm tắt tính toán đúng
- [ ] Data lưu dạng Draft
- [ ] Audit log được ghi

---

### **USER STORY 2: Bulk Import Opening Balance Data**

```
As a Accountant
I want to import opening balance data from Excel/CSV file
So that I can quickly load large amount of data without
      manual entry
```

**Acceptance Criteria:**

1. ✅ Accountant có thể upload file Excel/CSV
2. ✅ System validate file format (support .xlsx, .csv)
3. ✅ System parse file và validate từng row:
   - Account exists
   - Amount valid format (number, > 0)
   - Debit/Credit is valid
4. ✅ Nếu có error → Show error list, không import
5. ✅ Nếu all valid → Create Opening Balance entry (Draft)
6. ✅ Hiển thị import summary:
   - Total rows imported
   - Total Debit
   - Total Credit
   - Balance status
7. ✅ Accountant có thể Review trước khi Save
8. ✅ Khi Save → Data lưu dạng Draft

**Definition of Done:**
- [ ] File upload working
- [ ] Validation complete
- [ ] Error handling proper
- [ ] Summary displayed
- [ ] Data saved correctly
- [ ] Audit log recorded

---

### **USER STORY 3: Review Opening Balance as Manager**

```
As a Manager
I want to review opening balance entries created by accountants
So that I can ensure data accuracy before finalizing
```

**Acceptance Criteria:**

1. ✅ Manager có thể view danh sách Draft/Pending entries
2. ✅ Manager có thể xem chi tiết từng entry:
   - Company, Period, Created By, Created Date
   - Danh sách chi tiết tất cả accounts
   - Total Debit, Total Credit
   - Balance status
3. ✅ Manager có thể:
   - Approve entry (status → APPROVED)
   - Reject entry (status → DRAFT, gửi notification)
   - Request changes (add comment)
4. ✅ Khi Approve → Entry locked (cannot edit)
5. ✅ Khi Reject → Entry quay lại Draft, Accountant nhận notification
6. ✅ Comment/Note được lưu trong audit trail

**Definition of Done:**
- [ ] Manager view list
- [ ] Manager view detail
- [ ] Approve/Reject logic
- [ ] Notification sent
- [ ] Audit trail recorded

---

### **USER STORY 4: Edit Opening Balance Entry**

```
As a Accountant
I want to edit opening balance entries in Draft status
So that I can fix errors before approval
```

**Acceptance Criteria:**

1. ✅ Accountant có thể edit entry ở Draft status
2. ✅ Accountant có thể:
   - Edit amount của từng dòng
   - Delete dòng sai
   - Add dòng mới
3. ✅ Validation chạy lại sau mỗi edit
4. ✅ Tóm tắt cập nhật real-time
5. ✅ Nếu entry đã Approved → Cannot edit (show message)
6. ✅ Save changes → Cập nhật entry, audit log ghi lại

**Definition of Done:**
- [ ] Edit functionality working
- [ ] Validation after edit
- [ ] Summary updated
- [ ] Cannot edit if Approved
- [ ] Audit logged

---

### **USER STORY 5: Delete Opening Balance Entry**

```
As a Accountant
I want to delete opening balance entries in Draft status
So that I can remove incorrect entries
```

**Acceptance Criteria:**

1. ✅ Accountant có thể delete entry ở Draft status
2. ✅ Khi click Delete → Ask confirmation
3. ✅ Nếu confirmed → Entry deleted
4. ✅ Nếu entry đã Approved → Cannot delete (show message)
5. ✅ Audit log ghi lại deletion
6. ✅ Message: "Entry deleted successfully"

**Definition of Done:**
- [ ] Delete button visible
- [ ] Confirmation dialog
- [ ] Entry deleted
- [ ] Cannot delete if Approved
- [ ] Audit logged

---

### **USER STORY 6: Confirm & Finalize Opening Balance**

```
As a Accountant
I want to confirm opening balance after manager approval
So that system records the initial balances permanently
```

**Acceptance Criteria:**

1. ✅ Accountant có thể confirm entry ở APPROVED status
2. ✅ Khi click Confirm → Ask confirmation dialog
3. ✅ Confirmation dialog show warning:
   - "This action cannot be undone"
   - "Accounts will be updated with these balances"
4. ✅ Nếu confirmed → System processes:
   - Cập nhật account balances (MỘT PHÍA)
   - Tạo Opening Balance Entry (final)
   - Create audit log
5. ✅ Status → CONFIRMED
6. ✅ Entry become read-only (cannot edit/delete)
7. ✅ Message: "Opening Balance confirmed and finalized"

**Definition of Done:**
- [ ] Confirm button visible
- [ ] Confirmation dialog shows
- [ ] Account balances updated
- [ ] Entry status = CONFIRMED
- [ ] Read-only mode active
- [ ] Audit log recorded

---

### **USER STORY 7: View Opening Balance Report**

```
As a Manager/Accountant
I want to view opening balance entry as report/print
So that I can verify data or share with others
```

**Acceptance Criteria:**

1. ✅ User có thể view Opening Balance entry ở tất cả status
2. ✅ Display options:
   - View on screen (detail view)
   - Export to Excel
   - Export to PDF
   - Print
3. ✅ Report include:
   - Company, Period, Created/Modified dates
   - Danh sách chi tiết: Account, Amount, Debit/Credit
   - Summary: Total Debit, Total Credit
   - Status, Created By, Approved By, Confirmed By
4. ✅ Report formatted đẹp, dễ đọc

**Definition of Done:**
- [ ] View option working
- [ ] Export to Excel
- [ ] Export to PDF
- [ ] Print formatting
- [ ] All info included

---

### **USER STORY 8: Validation - Account Existence**

```
As a System
I want to validate that entered account exists in Chart of Accounts
So that user cannot enter non-existent accounts
```

**Acceptance Criteria:**

1. ✅ Account dropdown chỉ show active accounts
2. ✅ Manual entry validation:
   - If user somehow enters invalid account
   - System show error: "Account XXX không tồn tại"
3. ✅ Import validation:
   - Check all accounts in file
   - If any account not exist → Show in error list
   - Block import nếu có account invalid

**Definition of Done:**
- [ ] Dropdown filtered
- [ ] Manual validation
- [ ] Import validation
- [ ] Error message clear

---

### **USER STORY 9: Validation - Balance Must Equal**

```
As a System
I want to ensure Total Debit equals Total Credit
So that opening balance is valid accounting-wise
```

**Acceptance Criteria:**

1. ✅ System calculate Total Debit & Total Credit
2. ✅ Show balance status:
   - If Equal → "✅ Balanced"
   - If Not Equal → "❌ Not Balanced (Difference: XXX)"
3. ✅ Save button disabled nếu unbalanced
4. ✅ Show warning message khi unbalanced
5. ✅ Confirm button disabled nếu unbalanced

**Definition of Done:**
- [ ] Calculation correct
- [ ] Status display
- [ ] Button state correct
- [ ] Warning message shown

---

### **USER STORY 10: Audit Trail - Track All Changes**

```
As a System
I want to track all changes to opening balance entries
So that we have complete audit trail
```

**Acceptance Criteria:**

1. ✅ Log all actions:
   - Create entry
   - Import data
   - Edit entry
   - Delete entry
   - Approve entry
   - Reject entry
   - Confirm entry
2. ✅ Log include:
   - User name
   - Action (create/edit/approve/etc.)
   - Timestamp
   - What changed (old value → new value)
3. ✅ Audit log não visible to user in "Audit Trail" tab
4. ✅ Cannot be deleted or modified

**Definition of Done:**
- [ ] All actions logged
- [ ] Complete information
- [ ] User can view trail
- [ ] Trail is immutable

---

### **USER STORY 11: Permission Control - Create Opening Balance**

```
As a System
I want to ensure only authorized users can create opening balance
So that data integrity is protected
```

**Acceptance Criteria:**

1. ✅ Only users with permission "Create Opening Balance" can:
   - Create new entry
   - Import data
   - Edit/Delete Draft entries
2. ✅ Users without permission:
   - Cannot see Create button
   - Get error if try to access directly
3. ✅ Manager/Approver permission:
   - Can approve/reject entries
   - Can confirm entries
   - Can view audit trail

**Definition of Done:**
- [ ] Permission check on backend
- [ ] UI hide buttons if no permission
- [ ] Error message clear
- [ ] Role-based access control

---

### **USER STORY 12: Multi-Company Support - Segregate Data**

```
As a System (Multi-Company)
I want to ensure opening balance entries are segregated by company
So that data from different companies don't mix
```

**Acceptance Criteria:**

1. ✅ User select Company when creating entry
2. ✅ Opening balance for Company A isolated from Company B
3. ✅ User can only create/view entries for their company(s)
4. ✅ Account list filtered by selected company
5. ✅ Report show company name clearly
6. ✅ Cannot modify entries from other companies

**Definition of Done:**
- [ ] Company selection working
- [ ] Data isolation
- [ ] Account filtering
- [ ] Permission check

---

## 5. Acceptance Criteria Template (For Development)

```
User Story: [Story Title]

Given [Initial Condition]
When [User Action]
Then [Expected Result]

Example:
Given Accountant is on Opening Balance create page
When Accountant enters Account=111, Amount=100,000,000, Debit
Then System should add row to list and update Total Debit to 100,000,000
```

---

## 6. Risk & Considerations

### High Risk Items:
- ⚠️ Data Loss: Confirm action không thể undo → Cần confirmation dialog rất clear
- ⚠️ Account Balance: Một phía ghi nhận khác từ quy tắc thông thường → Cần document rõ ràng
- ⚠️ Multi-Company: Phải đảm bảo data không bị cross-company

### Medium Risk Items:
- ⚠️ Import File Format: User có thể upload sai format → Need validation robust
- ⚠️ Permission: Khác nhân viên kế toán, quản lý → Phải check permission kỹ

### Low Risk Items:
- ⚠️ UI/UX: Form phải trực quan để user không nhập sai

---

## 7. Conclusion

User stories & use cases định nghĩa rõ:
- ✅ 5 use cases chính
- ✅ 12 user stories chi tiết
- ✅ Acceptance criteria cụ thể
- ✅ Exception cases được xử lý
- ✅ Permission & security được xem xét

---

**Document Status:** Draft - Ready for Review
**Last Updated:** 2024-10-29
**Next Step:** Create 3_ERDConceptual.md (Database design)
