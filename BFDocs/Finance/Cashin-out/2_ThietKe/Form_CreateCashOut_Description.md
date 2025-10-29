# Form Mô Tả: Tạo Giao dịch Chi Tiền (Cash-Out)

**Created:** 2024-10-28
**Status:** Ready for HTML Refinement
**File Output:** `3_create-cashout.html`

---

## 1. Tổng Quan Form

| Thuộc tính | Giá trị |
|-----------|--------|
| **Form Name** | Tạo Giao dịch Chi Tiền (Cash-Out) |
| **File Name** | 3_create-cashout.html |
| **Form Heading** (in content) | 💸 Tạo Giao dịch Chi Tiền |
| **Purpose** | Tạo giao dịch chi tiền từ tài khoản công ty để thanh toán cho nhà cung cấp, nhân viên, hoặc các khoản chi phí khác |
| **Form Type** | Multi-section form with multi-level approval |
| **Page Title in Header** | Tạo Giao dịch Chi Tiền (Cash-Out) |

---

## 2. Overall Layout Structure

```
┌────────────────────────────────────────────────────┐
│  TOP HEADER BAR (Dark Background)                  │
│  Form Name: "Cash outflow\CIO001"                  │
│                       [Save] [Close] [Diagram View]│
└────────────────────────────────────────────────────┘
┌──────────────┬──────────────────────────────────────┐
│              │                                      │
│   SIDEBAR    │        MAIN CONTENT AREA            │
│   (Menu)     │        (Form Fields)                 │
│              │                                      │
│ - Home       │  💸 Tạo Giao dịch Chi Tiền        │
│ - Cashflow   │                                      │
│   - Cashin   │  ⚠️ [Approval Warning Box]         │
│   - Cashout  │                                      │
│ - Reports    │  ═════════════════════             │
│ - Settings   │  Thông tin giao dịch                │
│              │  ═════════════════════             │
│              │  [Fields...]                        │
│              │                                      │
└──────────────┴──────────────────────────────────────┘
```

---

## 3. Form Sections & Fields

### **SECTION 1: Thông tin giao dịch (Transaction Information)**

**Section Title:** Thông tin giao dịch

#### Field 1.1: Ngày giao dịch
- **Label:** Ngày giao dịch
- **Type:** Date Input
- **Required:** YES (*)
- **Layout:** col-md-6 (2 columns, left)
- **Placeholder:** -
- **Default Value:** Today's date
- **Helper Text:** -
- **Validation:**
  - Không được để trống
  - Không được lớn hơn ngày hôm nay

#### Field 1.2: Loại chi phí
- **Label:** Loại chi phí
- **Type:** Select Dropdown
- **Required:** YES (*)
- **Layout:** col-md-6 (2 columns, right)
- **Default Option:** -- Chọn loại chi phí --
- **Options:**
  1. -- Chọn loại chi phí --
  2. Lương & Phúc lợi
  3. Chi phí vận hành
  4. Chi phí quản lý
  5. Chi phí tiếp thị
  6. Mua vật tư / Hàng hóa
  7. Thanh toán hợp đồng / Dịch vụ
  8. Chi khác
- **Validation:** Phải chọn loại chi phí hợp lệ

#### Field 1.3: Số tiền
- **Label:** Số tiền
- **Type:** Number Input
- **Required:** YES (*)
- **Layout:** col-md-6 (2 columns, left)
- **Placeholder:** 0
- **Helper Text:** Đơn vị: VNĐ
- **Validation:**
  - Không được để trống
  - Phải > 0
  - Không được vượt quá số dư tài khoản

#### Field 1.4: Phương thức thanh toán
- **Label:** Phương thức thanh toán
- **Type:** Select Dropdown
- **Required:** YES (*)
- **Layout:** col-md-6 (2 columns, right)
- **Default Option:** -- Chọn phương thức --
- **Options:**
  1. -- Chọn phương thức --
  2. Chuyển khoản ngân hàng
  3. Tiền mặt
  4. Séc
  5. Khác
- **Validation:** Phải chọn phương thức hợp lệ

---

### **SECTION 2: Thông tin người/Đơn vị nhận tiền (Recipient Information)**

**Section Title:** Thông tin người/Đơn vị nhận tiền

#### Field 2.1: Tên người/Công ty nhận tiền
- **Label:** Tên người/Công ty nhận tiền
- **Type:** Text Input
- **Required:** YES (*)
- **Layout:** col-md-6 (2 columns, left)
- **Placeholder:** VD: Công ty Cung Cấp ABC
- **Validation:** Không được để trống

#### Field 2.2: Số điện thoại
- **Label:** Số điện thoại
- **Type:** Telephone Input
- **Required:** NO
- **Layout:** col-md-6 (2 columns, right)
- **Placeholder:** 0987654321
- **Validation:** -

#### Field 2.3: Email
- **Label:** Email
- **Type:** Email Input
- **Required:** NO
- **Layout:** col-md-6 (2 columns, left)
- **Placeholder:** email@example.com
- **Validation:** Phải đúng format email nếu nhập

#### Field 2.4: Mã số thuế / Số định danh
- **Label:** Mã số thuế / Số định danh
- **Type:** Text Input
- **Required:** NO
- **Layout:** col-md-6 (2 columns, right)
- **Placeholder:** 0123456789
- **Validation:** -

---

### **SECTION 3: Thông tin tài khoản thanh toán (Payment Account Information)**

**Section Title:** Thông tin tài khoản thanh toán

#### Field 3.1: Tài khoản thanh toán
- **Label:** Tài khoản thanh toán
- **Type:** Select Dropdown
- **Required:** YES (*)
- **Layout:** col-md-6 (2 columns, left)
- **Default Option:** -- Chọn tài khoản --
- **Options:** [Dynamic from system]
  - Format: `BANK_CODE - ACCOUNT_NUMBER (BANK_NAME) - Số dư: BALANCE ₫`
  - Examples:
    - VCB - 0123456789 (Vietcombank) - Số dư: 2,500,000,000 ₫
    - ACB - 0987654321 (Á Châu Bank) - Số dư: 500,000,000 ₫
    - VIB - 1234567890 (VIB) - Số dư: 1,200,000,000 ₫
- **Validation:**
  - Phải chọn tài khoản hợp lệ
  - Số dư phải >= Số tiền cần chi
- **JavaScript Logic:**
  - When account selected → Automatically populate Field 3.2 (Bank Balance)
  - Validate: Available balance >= Payment amount

#### Field 3.2: Số dư tài khoản
- **Label:** Số dư tài khoản
- **Type:** Text Input (Read-only)
- **Required:** NO
- **Layout:** col-md-6 (2 columns, right)
- **Placeholder:** Tự động điền
- **Default:** Disabled (auto-populated from Field 3.1 selection)
- **Behavior:**
  - Auto-filled when Field 3.1 (Bank Account) is selected
  - Read-only (disabled for manual input)
  - Format: Number with thousand separator (1,000,000)
- **Validation:** -

---

### **SECTION 4: Thông tin chi tiết (Detail Information)**

**Section Title:** Thông tin chi tiết

#### Field 4.1: Mô tả chi tiêu / Nội dung thanh toán
- **Label:** Mô tả chi tiêu / Nội dung thanh toán
- **Type:** Textarea
- **Required:** YES (*)
- **Layout:** Full width (col-12)
- **Rows:** 3
- **Placeholder:** VD: Chi trả tiền lương nhân viên tháng 10 năm 2024...
- **Validation:**
  - Không được để trống
  - Max length: 1000 characters
- **Character Counter:** Show remaining characters

#### Field 4.2: Số hóa đơn / Số chứng từ
- **Label:** Số hóa đơn / Số chứng từ
- **Type:** Text Input
- **Required:** NO
- **Layout:** col-md-6 (2 columns, left)
- **Placeholder:** VD: HĐ-2024-001
- **Validation:** -

#### Field 4.3: Liên quan đến tài liệu
- **Label:** Liên quan đến tài liệu
- **Type:** Text Input
- **Required:** NO
- **Layout:** col-md-6 (2 columns, right)
- **Placeholder:** VD: HĐ-2024-001
- **Validation:** -

#### Field 4.4: Bộ phận chịu trách nhiệm
- **Label:** Bộ phận chịu trách nhiệm
- **Type:** Select Dropdown
- **Required:** NO
- **Layout:** col-md-6 (2 columns, left)
- **Default Option:** -- Chọn bộ phận --
- **Options:**
  1. -- Chọn bộ phận --
  2. Nhân sự
  3. Kinh doanh
  4. Vận hành
  5. Quản lý
- **Validation:** -

#### Field 4.5: Dự án / Chi phí
- **Label:** Dự án / Chi phí
- **Type:** Text Input
- **Required:** NO
- **Layout:** col-md-6 (2 columns, right)
- **Placeholder:** VD: PRJ-2024-001
- **Validation:** -

---

### **SECTION 5: Phê duyệt (Approval)**

**Section Title:** Phê duyệt

#### Field 5.1: Người yêu cầu
- **Label:** Người yêu cầu
- **Type:** Text Input (Read-only)
- **Required:** NO
- **Layout:** col-md-6 (2 columns, left)
- **Placeholder:** Tự động điền
- **Default:** Disabled (auto-populated from current user)
- **Behavior:**
  - Auto-filled with current logged-in user
  - Read-only (disabled for manual input)
- **Validation:** -

#### Field 5.2: Trưởng phòng Kế toán
- **Label:** Trưởng phòng Kế toán
- **Type:** Select Dropdown
- **Required:** YES (*)
- **Layout:** col-md-6 (2 columns, right)
- **Default Option:** -- Chọn người duyệt --
- **Options:** [Dynamic list of approval roles]
  - Nguyễn Văn A
  - Trần Thị B
  - Lê Văn C
- **Validation:** Phải chọn người duyệt hợp lệ
- **Business Rule:** First level approver (Accounting Manager approval required)

#### Field 5.3: Giám đốc
- **Label:** Giám đốc
- **Type:** Select Dropdown
- **Required:** YES (*)
- **Layout:** col-md-6 (2 columns, left) [Note: Full width would be better for clarity]
- **Default Option:** -- Chọn người duyệt --
- **Options:** [Dynamic list of approval roles]
  - Đinh Văn D
  - Phạm Thị E
- **Validation:** Phải chọn người duyệt hợp lệ
- **Business Rule:** Second level approver (Director approval required)

**Approval Flow:**
```
Submitter → Accounting Manager (Approve/Reject) → Director (Approve/Reject) → Execute Payment
```

---

### **SECTION 6: Tài liệu hỗ trợ (Supporting Documents)**

**Section Title:** Tài liệu hỗ trợ

#### Field 6.1: Tải lên tài liệu
- **Label:** Tải lên tài liệu (Hóa đơn, Chứng từ, Đơn, v.v...)
- **Type:** File Input (Multiple)
- **Required:** NO
- **Layout:** Full width (col-12)
- **Accept Types:** .pdf, .xlsx, .xls, .jpg, .jpeg, .png, .gif
- **Helper Text:** Cho phép: PDF, Excel, Image (Max 5MB/file)
- **Validation:**
  - Max file size: 5MB per file
  - Allowed types: PDF, Excel, Image only
  - Max 10 files per upload

#### Field 6.2: Ghi chú thêm
- **Label:** Ghi chú thêm
- **Type:** Textarea
- **Required:** NO
- **Layout:** Full width (col-12)
- **Rows:** 2
- **Placeholder:** Ghi chú nội bộ
- **Validation:**
  - Max length: 500 characters
- **Character Counter:** Show remaining characters

---

## 4. Form Action Buttons

**Location:** Bottom of form (before validation note)
**Layout:** Horizontal, flex layout with gap
**Alignment:** Right-aligned

| Button Order | Button Label | Type | Style | Action | Note |
|--------------|-------------|------|-------|--------|------|
| 1 | Hủy | Link Button | btn-outline-secondary | Navigate back to transaction list | Redirects to 1_transaction-list.html |
| 2 | Xóa | Reset Button | btn-outline-secondary | Clear all form fields | Type: reset |
| 3 | Lưu Nháp | Submit Button | btn-warning | Save as Draft (not submitted) | Type: submit, Store in DRAFT status |
| 4 | Tạo & Gửi Duyệt | Submit Button | btn-danger | Submit for approval | Type: submit, Trigger approval workflow |

---

## 5. Top Warning Alert Box

**Type:** Alert Box (warning style)
**Title:** ⚠️ Lưu ý:
**Content:** Giao dịch chi cần phê duyệt từ Trưởng phòng Kế toán và Giám đốc trước khi thực hiện thanh toán.

**Background Color:** Light yellow (#fff3cd) - Bootstrap alert-warning style
**Border Color:** #ffc107
**Text Color:** #856404

**Position:** Top of form, immediately after heading and before first section

---

## 6. Bottom Info Alert Box

**Type:** Alert Box (info style)
**Title:** 💡 Quy tắc kiểm tra:

**Content (bullet list):**
1. Các trường có dấu `*` là bắt buộc
2. Số tiền phải > 0 và <= Số dư tài khoản
3. Cần phê duyệt từ ít nhất 2 người (Trưởng phòng Kế toán & Giám đốc)
4. Khi nhấn "Tạo & Gửi Duyệt", giao dịch sẽ được gửi đến người duyệt được chỉ định

**Background Color:** Light blue (#e7f3ff) - Bootstrap alert-info style

**Position:** Bottom of form, after form buttons

---

## 7. JavaScript / Behavioral Logic

### Auto-fill Behaviors:

#### 7.1 Bank Balance Auto-fill
- **Trigger:** When Field 3.1 (Bank Account) selection changes
- **Logic:**
  ```
  const selectedOption = document.querySelector('#bankAccount option:checked');
  const balanceText = selectedOption.textContent; // Extract balance from option text
  const balanceValue = extractBalance(balanceText);
  document.getElementById('bankBalance').value = formatCurrency(balanceValue);
  ```
- **Outcome:** Field 3.2 populated with selected account balance

#### 7.2 Requester Name Auto-fill
- **Trigger:** Page load (DOMContentLoaded)
- **Logic:** Get current logged-in user from session/context
- **Outcome:** Field 5.1 populated with current user name

### Validation Logic:

#### 7.3 Amount vs Balance Validation
- **Trigger:** When Field 1.3 (Amount) or Field 3.1 (Account) changes
- **Logic:**
  ```
  const amount = parseInt(document.getElementById('transactionAmount').value);
  const balance = parseInt(document.getElementById('bankBalance').value);

  if (amount > balance) {
    showError('Số tiền không được vượt quá số dư tài khoản');
  }
  ```
- **Outcome:** Show warning if amount exceeds available balance

### Form Submission Logic:

#### 7.4 Save as Draft
- **Trigger:** Click "Lưu Nháp" button
- **Action:**
  - Validate only required fields
  - Submit form data with status = 'DRAFT'
  - Show success message
  - Redirect to transaction list after 2 seconds

#### 7.5 Submit for Approval
- **Trigger:** Click "Tạo & Gửi Duyệt" button
- **Action:**
  - Validate ALL fields (including optional)
  - Verify approval chain (both approvers selected and not empty)
  - Submit form data with status = 'PENDING_APPROVAL'
  - Trigger notification to selected approvers
  - Show success message: "Giao dịch đã được gửi phê duyệt"
  - Redirect to transaction list after 2 seconds

---

## 8. Overall Form Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────┐
│  NAVIGATION BAR (Dark Background)                    │
│  ← Danh sách Giao dịch                               │
│                    Tạo Giao dịch Chi Tiền (Cash-Out)│
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  FORM CONTAINER (Full width with sidebar)│
│                                          │
│  💸 Tạo Giao dịch Chi Tiền              │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ ⚠️ WARNING BOX                   │  │
│  │ Giao dịch chi cần phê duyệt...   │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ═══════════════════════════════════    │
│  Thông tin giao dịch                    │
│  ═══════════════════════════════════    │
│  [Ngày giao dịch] | [Loại chi phí]     │
│  [Số tiền]        | [Phương thức TT]   │
│                                          │
│  ═══════════════════════════════════    │
│  Thông tin người/Đơn vị nhận tiền      │
│  ═══════════════════════════════════    │
│  [Tên người/Công ty] | [Số điện thoại]│
│  [Email]             | [Mã số thuế]    │
│                                          │
│  ═══════════════════════════════════    │
│  Thông tin tài khoản thanh toán         │
│  ═══════════════════════════════════    │
│  [Tài khoản TT] | [Số dư TK]           │
│                                          │
│  ═══════════════════════════════════    │
│  Thông tin chi tiết                    │
│  ═══════════════════════════════════    │
│  [Mô tả chi tiêu - Full width]         │
│  [Số HĐ] | [Tài liệu liên quan]       │
│  [Bộ phận] | [Dự án]                  │
│                                          │
│  ═══════════════════════════════════    │
│  Phê duyệt                              │
│  ═══════════════════════════════════    │
│  [Người yêu cầu (auto)]                │
│  [Trưởng phòng KT] | [Giám đốc]       │
│                                          │
│  ═══════════════════════════════════    │
│  Tài liệu hỗ trợ                       │
│  ═══════════════════════════════════    │
│  [File upload - Full width]            │
│  [Ghi chú - Full width]                │
│                                          │
│  [Hủy] [Xóa] [Lưu Nháp] [Gửi Duyệt]  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ 💡 Quy tắc kiểm tra:             │  │
│  │ - Các trường có dấu * là bắt buộc│  │
│  │ - Số tiền phải > 0 & <= Số dư TK │  │
│  │ - Cần 2 người phê duyệt          │  │
│  │ - ...                            │  │
│  └──────────────────────────────────┘  │
│                                          │
└──────────────────────────────────────────┘
```

---

## 9. Key Differences from Cash-In Form

| Aspect | Cash-In | Cash-Out |
|--------|---------|----------|
| **Purpose** | Receive money from customers | Spend money from company accounts |
| **Primary Flow** | Customer → Company Bank Account | Company Bank Account → Recipient |
| **Conditional Sections** | Yes (Section 2 & 3 based on Type) | No - All sections always visible |
| **Approval Chain** | Single level (not required) | Two-level (Mandatory: Accounting Manager + Director) |
| **Payment Account** | Destination (Receive) | Source (Send) |
| **Recipient** | Conditional Modal (Customer/Employee) | Text input (Free form) |
| **Key Validation** | Customer/Type dependent | Amount vs Available Balance |
| **Unique Fields** | Type dropdown, Contract table | Approval chain, Bank balance check |
| **Approval Status** | Optional | Mandatory (2 approvers) |

---

## 10. Special Notes

1. **Form Status Tracking:**
   - DRAFT: Saved but not submitted
   - PENDING_APPROVAL: Waiting for Accounting Manager approval
   - APPROVED_LEVEL1: Approved by Accounting Manager, waiting for Director
   - APPROVED_LEVEL2: Fully approved, ready for execution
   - REJECTED: Rejected by either approver with reason

2. **Bank Balance Synchronization:**
   - Real-time check against available balance
   - Should not allow submission if amount > balance
   - Show warning with color change if amount approaches balance

3. **Approval Notifications:**
   - When submitted: Auto-notify both Accounting Manager and Director
   - When approved/rejected: Notify requester via email/system notification

4. **Audit Trail:**
   - All changes should be logged
   - Approval decisions with timestamp and approver name
   - Document attachment records

5. **Business Rules for Expense Categories:**
   - "Lương & Phúc lợi" → May require additional approval from HR
   - "Mua vật tư / Hàng hóa" → May require procurement review
   - "Chi khác" → May require additional documentation

---

**Version:** 1.0
**Last Updated:** 2024-10-28
**Status:** Ready for HTML Implementation
