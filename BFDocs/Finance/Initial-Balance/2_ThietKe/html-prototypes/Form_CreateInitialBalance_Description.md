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

## 2. Form Sections (áp dụng cho tất cả tabs)

### SECTION 1: Nhập Số Dư Tài Khoản
- Account (Select, lọc theo tab)
- Debit Amount (Currency)
- Credit Amount (Currency)
- Description (Text, optional)
- Add Row Button

### SECTION 2: Danh Sách Số Dư
- Table: # | Code | Account Name | Debit | Credit | Description | Actions
- Edit/Delete buttons
- Total row at bottom

### SECTION 3: Tóm Tắt
- Total Debit (Read-only)
- Total Credit (Read-only)
- Balance Status (BALANCED/UNBALANCED)
- Difference (Read-only)

---

## 3. Validation Rules

- Account required
- Debit OR Credit must be filled (one, not both)
- Amount > 0
- No duplicate accounts in same table
- Total Debit = Total Credit for submission

---

## 4. Color Reference

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
