# Form Mô Tả: Khởi Tạo Số Dư Đầu Kỳ (Opening Balance)

**Created:** 2024-10-29
**Status:** Tab-Based Structure
**File Output:** `1_create-initial-balance.html`

---

## 1. Tổng Quan Form - 7 Tab Nhóm Tài Khoản

### TAB 1: 💰 Tiền (Cash/Money)
- Accounts: 111, 112, 113
- Color: Blue #e3f2fd / #2196f3

### TAB 2: 📦 Hàng Hóa Vật Tư (Goods & Materials)
- Accounts: 121, 122, 123
- Color: Green #e8f5e9 / #4caf50

### TAB 3: 👥 Phải Thu Khách Hàng (Customer Receivables)
- Accounts: 131, 132, 133
- Color: Orange #fff3e0 / #ff9800

### TAB 4: 🏭 Phải Trả Nhà Cung Cấp (Supplier Payables)
- Accounts: 211, 212, 213
- Color: Red #ffebee / #f44336

### TAB 5: 👔 Phải Thu Nhân Viên (Employee Receivables)
- Accounts: 141, 142, 143
- Color: Purple #f3e5f5 / #9c27b0

### TAB 6: 🏢 Tài Sản Công Cụ (Fixed Assets)
- Accounts: 151, 152, 153, 154, 155
- Color: Teal #e0f2f1 / #009688

### TAB 7: 🔧 Chi Phí Dở Dang (Work in Progress)
- Accounts: 161, 162, 163
- Color: Yellow #fffde7 / #fbc02d

---

## 2. TAB 1: Tiền (Cash/Money) - Chi Tiết

### SUBSECTION 1.1: Lựa Chọn Loại Tiền (Money Type Selection)

**Radio Buttons / Toggle:**
1. **💵 Tiền Mặt (Cash)**
   - Accounts: 111
   - Use for: Physical cash

2. **🏦 Tiền Ngân Hàng (Bank)**
   - Accounts: 112, 113
   - Use for: Bank deposits, fixed deposits

**On Selection Change:**
- Filter the "Account" dropdown below to show relevant accounts
- Reset all input fields
- Reset table data for this type

---

### SUBSECTION 1.2: Chọn Loại Tiền Tệ (Currency Selection)

**Currency Dropdown:**
- Default: VND (Vietnamese Dong)
- Options: VND, USD, EUR, JPY, etc.

**Label:** Loại Tiền Tệ (Currency)
**Required:** YES (*)
**Format:** Display currency symbol (₫, $, €, ¥)
**Affects:** Number formatting in input fields and table

---

### SUBSECTION 1.3: Nhập Số Dư Tài Khoản (Input Form)

**Based on selected Money Type:**

**If Cash Selected:**
- Account: 111 - Tiền Mặt (Cash) [Auto-filled, read-only]
- Opening Balance Amount
- Description (optional)

**If Bank Selected:**
- Account: [Dropdown with 112, 113]
  - 112 - Tiền Gửi Ngân Hàng (Bank Deposits)
  - 113 - Tiền Gửi Có Kỳ Hạn (Fixed Deposits)
- Opening Balance Amount
- Description (optional)

**Button:** + Add Account

---

### SUBSECTION 1.4: Bảng Tổng Hợp Tài Khoản (Account Summary Table)

**Columns:**
| # | Account Code | Account Name | Amount (Debit/Credit) | Currency | Description | Actions |

**Sample Data:**
```
1  | 111 | Tiền Mặt | 50,000,000 (Nợ) | VND | Opening cash | Edit Delete
2  | 112 | Tiền Ngân Hàng | 500,000,000 (Nợ) | VND | Bank deposit | Edit Delete
3  | 113 | Tiền Có Kỳ Hạn | 200,000,000 (Nợ) | VND | Fixed deposit | Edit Delete
─────────────────────────────────────────────────────────────────
   |     | TỔNG CỘNG | 750,000,000 | VND | |
```

**Table Features:**
- Header background: #f8f9fa (light gray)
- Total row: Bold, background #f0f0f0, border-top 2px solid #2196f3
- Hover effect on rows
- Edit/Delete actions per row
- Real-time total update

**Actions:**
- **Edit (✏️):** Load row to input form, remove from table
- **Delete (🗑️):** Confirm then remove with total update

---

### SUBSECTION 1.5: Summary & Status (TAB 1 Bottom)

- **Total Opening Balance (TAB 1 only):** Auto-calculate from table
- **Currency:** Display based on selected currency
- **Status:** All accounts entered and balanced

---

## 3. Form Structure - Tabs 2-7 (Tương tự cấu trúc cơ bản)

### Tabs 2-7 Layout (Tương tự TAB 1 nhưng đơn giản hơn):

**SECTION 1: Nhập Số Dư Tài Khoản**
- Account (Select, lọc theo tab) - Required *
- Debit Amount (Currency) - Conditional
- Credit Amount (Currency) - Conditional
- Description (Text, optional)
- Add Row Button

**SECTION 2: Danh Sách Số Dư**
- Table: # | Code | Account Name | Debit | Credit | Description | Actions
- Edit/Delete buttons per row
- Total row at bottom

**SECTION 3: Tóm Tắt**
- Total Debit (Read-only)
- Total Credit (Read-only)
- Balance Status (BALANCED/UNBALANCED)
- Difference (Read-only)

---

## 4. Validation Rules

- Account required
- Debit OR Credit must be filled (one, not both)
- Amount > 0
- No duplicate accounts in same table
- Total Debit = Total Credit for submission
- **TAB 1 Specific:** If Cash selected, only 1 account (111) allowed

---

## 5. Color Reference

| Tab | Background | Border |
|-----|-----------|--------|
| 1: Tiền | #e3f2fd | #2196f3 |
| 2: Hàng Hóa | #e8f5e9 | #4caf50 |
| 3: Phải Thu KH | #fff3e0 | #ff9800 |
| 4: Phải Trả NCC | #ffebee | #f44336 |
| 5: Phải Thu NV | #f3e5f5 | #9c27b0 |
| 6: Tài Sản | #e0f2f1 | #009688 |
| 7: Chi Phí | #fffde7 | #fbc02d |

---

**End of Form Description**
