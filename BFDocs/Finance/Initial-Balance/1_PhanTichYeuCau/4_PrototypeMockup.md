# Prototype & Mockup: Opening Balance Initialization Form

**Created:** 2024-10-29
**Status:** Draft - Ready for Review
**Version:** 1.0

---

## 1. Executive Summary

Tài liệu này mô tả UI/UX design cho tính năng khởi tạo số dư đầu kỳ (Opening Balance Initialization).

**Key Screens:**
1. Opening Balance List View
2. Create New Entry (Manual Entry Form)
3. Bulk Import Form
4. Entry Detail & Review View
5. Approval View (Manager)
6. Confirm & Finalize Screen

---

## 2. Screen 1: Opening Balance List View

**Purpose:** Show list of all opening balance entries (with filters)

```
═══════════════════════════════════════════════════════════════════════════
                        Accounting > Opening Balance
═══════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────┐
│ Filter & Search:                                                        │
│ ┌──────────────────┐  ┌──────────────────┐  ┌────────────────────┐   │
│ │ Company: [All ▼] │  │ Period: [All   ▼]│  │ Status: [Draft  ▼] │   │
│ └──────────────────┘  └──────────────────┘  └────────────────────┘   │
│                                                                         │
│ [🔍 Search by Company Name or Period]        [🔄 Refresh] [+ Create New] │
└─────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────┐
│ Opening Balance Entries (Total: 5 entries)                               │
├────┬──────────────────┬──────────┬──────────┬──────────────┬──────────────┤
│ #  │ Company Name     │ Period   │ Created  │ Status       │ Action       │
├────┼──────────────────┼──────────┼──────────┼──────────────┼──────────────┤
│ 1  │ ABC Company      │ 2024-01  │ 2024-10- │ ⭕ DRAFT     │ [View] [Edit]│
│    │                  │          │ 29 10:30 │              │ [Delete]     │
├────┼──────────────────┼──────────┼──────────┼──────────────┼──────────────┤
│ 2  │ ABC Company      │ 2024-02  │ 2024-10- │ 🔵 APPROVED  │ [View]       │
│    │                  │          │ 28 14:00 │              │ [Confirm]    │
├────┼──────────────────┼──────────┼──────────┼──────────────┼──────────────┤
│ 3  │ XYZ Corporation  │ 2024-01  │ 2024-10- │ ✅ CONFIRMED │ [View]       │
│    │                  │          │ 25 15:30 │              │ [Report]     │
├────┼──────────────────┼──────────┼──────────┼──────────────┼──────────────┤
│ 4  │ Tech Solutions   │ 2024-01  │ 2024-10- │ ⭕ DRAFT     │ [View] [Edit]│
│    │                  │          │ 20 09:15 │              │ [Delete]     │
├────┼──────────────────┼──────────┼──────────┼──────────────┼──────────────┤
│ 5  │ ABC Company      │ 2024-03  │ 2024-10- │ 🟡 PENDING   │ [View]       │
│    │                  │          │ 22 11:00 │ APPROVAL     │ [Cancel]     │
└────┴──────────────────┴──────────┴──────────┴──────────────┴──────────────┘

Legend:
⭕ = DRAFT (Editable)
🟡 = PENDING (Waiting for approval)
🔵 = APPROVED (Ready to confirm)
✅ = CONFIRMED (Finalized, read-only)
```

**Features:**
- Filter by Company, Period, Status
- Search functionality
- Create New button
- View, Edit, Delete actions (based on status)
- Pagination (Show 10/25/50 per page)

---

## 3. Screen 2: Create New Opening Balance Entry - Manual Entry Form

**Purpose:** Create opening balance by manual entry

```
═══════════════════════════════════════════════════════════════════════════
              Accounting > Opening Balance > Create New (Manual Entry)
═══════════════════════════════════════════════════════════════════════════

[← Back to List]

┌─────────────────────────────────────────────────────────────────────────┐
│ CREATE OPENING BALANCE ENTRY - MANUAL ENTRY                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ SECTION 1: BASIC INFORMATION                                           │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ Company *: [ABC Company                          ▼] [Select other]   │
│ Period  *: [January 2024                         ▼] [Select month]   │
│                                                                         │
│ Entry Status: ⭕ DRAFT (Editable)                                      │
│ Created Date: 2024-10-29 10:30 (Auto-filled)                          │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ SECTION 2: ADD ACCOUNT BALANCES                                        │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ Add New Line:                                                           │
│ ┌─────────────────┐ ┌─────────────┐ ┌─────────────┐ ┌──────────────┐ │
│ │ Account   [▼]   │ │ Amount      │ │ Type  [Debit│ │ [+ Add]      │ │
│ │ (Select)        │ │ 100,000,000 │ │ Credit▼]    │ │ [Description]│ │
│ └─────────────────┘ └─────────────┘ └─────────────┘ └──────────────┘ │
│                                                                         │
│ Current Entries:                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ #│ Account Code │ Account Name        │ Amount      │D/C│ Action  │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼─────────┤ │
│ │1 │ 111          │ Tiền mặt            │ 100,000,000 │ D │ [✎][✕] │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼─────────┤ │
│ │2 │ 112          │ Tiền gởi NH         │ 200,000,000 │ D │ [✎][✕] │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼─────────┤ │
│ │3 │ 131          │ Nợ phải thu         │ 100,000,000 │ D │ [✎][✕] │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼─────────┤ │
│ │4 │ 156          │ Hàng hóa            │ 150,000,000 │ D │ [✎][✕] │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼─────────┤ │
│ │5 │ 331          │ Nợ phải trả         │ 200,000,000 │ C │ [✎][✕] │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼─────────┤ │
│ │6 │ 341          │ Nợ vay NH           │ 150,000,000 │ C │ [✎][✕] │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼─────────┤ │
│ │7 │ 411          │ Vốn chủ sở hữu      │ 150,000,000 │ C │ [✎][✕] │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ SECTION 3: SUMMARY & VALIDATION                                        │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │ Balance Summary:                                               │   │
│  │                                                                │   │
│  │ Total Debit:              500,000,000 VNĐ                     │   │
│  │ Total Credit:             500,000,000 VNĐ                     │   │
│  │                           ─────────────────                    │   │
│  │ Difference:               0 VNĐ                               │   │
│  │                                                                │   │
│  │ Status: ✅ BALANCED (Ready to Save)                           │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│ Optional Notes:                                                         │
│ ┌─────────────────────────────────────────────────────────────────┐   │
│ │ Opening balance entry for ABC Company FY 2024                  │   │
│ │ Based on balance sheet as of 2024-01-01                        │   │
│ └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ SECTION 4: ACTION BUTTONS                                               │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ [Save as Draft]  [Submit for Approval]  [Clear All]  [Cancel]         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

💡 Validation Rules:
   • Account must exist in system
   • Amount must be > 0
   • Total Debit must equal Total Credit
   • Required fields are marked with *
```

**Key Features:**
- Company & Period selection (required)
- Dynamic table to add accounts
- Real-time balance calculation
- Edit/Delete row functionality
- Summary section with balance validation
- Save & Submit buttons

---

## 4. Screen 3: Bulk Import Form

**Purpose:** Import opening balance data from Excel/CSV file

```
═══════════════════════════════════════════════════════════════════════════
         Accounting > Opening Balance > Import (Bulk Import)
═══════════════════════════════════════════════════════════════════════════

[← Back to List]

┌─────────────────────────────────────────────────────────────────────────┐
│ BULK IMPORT OPENING BALANCE DATA                                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ STEP 1: SELECT COMPANY & PERIOD                                        │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ Company *: [ABC Company                          ▼]                    │
│ Period  *: [January 2024                         ▼]                    │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ STEP 2: CHOOSE FILE TO IMPORT                                           │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ File Format: Supports Excel (.xlsx) or CSV (.csv)                      │
│                                                                         │
│ ┌──────────────────────────────────────────────────────────────────┐   │
│ │ Drag & drop file here or [Browse Files]                          │   │
│ │                                                                  │   │
│ │ File: opening_balance_2024.xlsx                                 │   │
│ │       [Choose File ...]                                         │   │
│ └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│ File Format Template:                                                   │
│ ┌─────────────────────────────────────────────────────────────────┐    │
│ │ Account | Amount        | Debit/Credit                         │    │
│ │ 111     | 100,000,000   | D                                    │    │
│ │ 112     | 200,000,000   | D                                    │    │
│ │ 331     | 200,000,000   | C                                    │    │
│ │ ...                                                             │    │
│ └─────────────────────────────────────────────────────────────────┘    │
│ [Download Template]                                                     │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ STEP 3: UPLOAD & VALIDATE                                              │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ [Upload File]  [Cancel]                                                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**After Upload - Success Case:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│ IMPORT RESULT                                                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ ✅ Import Successful!                                                   │
│                                                                         │
│ Total Records Imported: 7                                              │
│ Company: ABC Company                                                    │
│ Period: January 2024                                                    │
│ Status: DRAFT                                                           │
│                                                                         │
│ Data Preview:                                                           │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ #│ Account Code │ Account Name        │ Amount      │D/C│ Status  │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼─────────┤ │
│ │1 │ 111          │ Tiền mặt            │ 100,000,000 │ D │ ✅      │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼─────────┤ │
│ │2 │ 112          │ Tiền gởi NH         │ 200,000,000 │ D │ ✅      │ │
│ │...                                                                   │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ Balance Summary:                                                        │
│ Total Debit:  500,000,000 VNĐ                                          │
│ Total Credit: 500,000,000 VNĐ                                          │
│ Status: ✅ BALANCED                                                    │
│                                                                         │
│ [Save Entry]  [Edit Data]  [Cancel]                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**After Upload - Error Case:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│ IMPORT RESULT                                                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ ❌ Import Failed - Errors Found in File                                 │
│                                                                         │
│ Error Details:                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Row 5: Account "999" does not exist in Chart of Accounts          │ │
│ │ Row 8: Amount "INVALID" is not a valid number                     │ │
│ │ Row 12: Debit/Credit value "X" is invalid (must be D or C)        │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ Please fix the errors and upload again.                                 │
│                                                                         │
│ [Download Template]  [Choose File Again]  [Cancel]                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Screen 4: Entry Detail & Review View

**Purpose:** View full details of opening balance entry

```
═══════════════════════════════════════════════════════════════════════════
            Accounting > Opening Balance > View Entry
═══════════════════════════════════════════════════════════════════════════

[← Back to List]

┌─────────────────────────────────────────────────────────────────────────┐
│ OPENING BALANCE ENTRY DETAIL                                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Entry ID: OB-2024-01-ABC-001                                            │
│ Status: ⭕ DRAFT                  [Edit]  [Delete]  [Submit]           │
│                                                                         │
│ Company:      ABC Company                                               │
│ Period:       January 2024                                              │
│ Created By:   John Doe (2024-10-29 10:30)                              │
│ Last Modified: John Doe (2024-10-29 10:45)                             │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ ACCOUNT DETAILS                                                         │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ #│ Account Code │ Account Name        │ Amount      │D/C│ Descr.│ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼────────┤ │
│ │1 │ 111          │ Tiền mặt            │ 100,000,000 │ D │ Cash  │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼────────┤ │
│ │2 │ 112          │ Tiền gởi NH         │ 200,000,000 │ D │ Bank  │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼────────┤ │
│ │3 │ 131          │ Nợ phải thu         │ 100,000,000 │ D │ A/R   │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼────────┤ │
│ │4 │ 156          │ Hàng hóa            │ 150,000,000 │ D │ Inv   │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼────────┤ │
│ │5 │ 331          │ Nợ phải trả         │ 200,000,000 │ C │ A/P   │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼────────┤ │
│ │6 │ 341          │ Nợ vay NH           │ 150,000,000 │ C │ Loan  │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼───┼────────┤ │
│ │7 │ 411          │ Vốn chủ sở hữu      │ 150,000,000 │ C │ Equity│ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ BALANCE VALIDATION                                                      │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ Total Debit:      500,000,000 VNĐ                                      │
│ Total Credit:     500,000,000 VNĐ                                      │
│ Difference:       0 VNĐ                                                │
│ Status:           ✅ BALANCED - Ready to Submit                         │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ NOTES                                                                   │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ Opening balance entry for ABC Company FY 2024                          │
│ Based on balance sheet as of 2024-01-01                                │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ AUDIT TRAIL                                                             │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Time     │ User      │ Action  │ Description                     │ │
│ ├──────────┼───────────┼─────────┼─────────────────────────────────┤ │
│ │ 10:30    │ John Doe  │ CREATE  │ Created new entry              │ │
│ ├──────────┼───────────┼─────────┼─────────────────────────────────┤ │
│ │ 10:45    │ John Doe  │ EDIT    │ Updated account 112            │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ [Show More History]                                                     │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ ACTION BUTTONS                                                          │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ [Edit Entry]  [Delete Entry]  [Submit for Approval]  [Print]  [Export]│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Screen 5: Manager Approval View

**Purpose:** Allow manager to review and approve entry

```
═══════════════════════════════════════════════════════════════════════════
         Accounting > Opening Balance > Approval > Review Entry
═══════════════════════════════════════════════════════════════════════════

[← Back to Pending List]

┌─────────────────────────────────────────────────────────────────────────┐
│ OPENING BALANCE APPROVAL REVIEW                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Entry ID: OB-2024-01-ABC-001                                            │
│ Status: 🟡 PENDING APPROVAL                                             │
│                                                                         │
│ Created By:   John Doe (2024-10-29 10:30)                              │
│ Submitted:    2024-10-29 11:00                                         │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ ENTRY INFORMATION                                                       │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ Company:      ABC Company                                               │
│ Period:       January 2024                                              │
│                                                                         │
│ Account Details: (7 accounts)                                           │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ #│ Account Code │ Account Name        │ Amount      │D/C         │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼────────────┤ │
│ │1 │ 111          │ Tiền mặt            │ 100,000,000 │ D          │ │
│ │2 │ 112          │ Tiền gởi NH         │ 200,000,000 │ D          │ │
│ │...                                                                  │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ Balance Validation: ✅ BALANCED                                         │
│ Total Debit: 500,000,000 VNĐ                                           │
│ Total Credit: 500,000,000 VNĐ                                          │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ MANAGER APPROVAL SECTION                                                │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ Please review the entry and make a decision:                            │
│                                                                         │
│ ☐ Entry looks correct, I approve this opening balance                  │
│                                                                         │
│ Additional Comments (optional):                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ [Enter your comments or approval note here...]                     │ │
│ │                                                                    │ │
│ │                                                                    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ If not approved, please select reason:                                 │
│ ☐ Data appears incorrect - please verify                              │
│ ☐ Missing documentation/evidence                                      │
│ ☐ Need clarification from accountant                                  │
│ ☐ Other (please explain in comments)                                  │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ ACTION BUTTONS                                                          │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ [✅ Approve]  [❌ Reject]  [❓ Request Changes]  [Cancel]              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Screen 6: Confirm & Finalize

**Purpose:** Final confirmation before recording in system

```
═══════════════════════════════════════════════════════════════════════════
        Accounting > Opening Balance > Confirm & Finalize
═══════════════════════════════════════════════════════════════════════════

[← Back to List]

┌─────────────────────────────────────────────────────────────────────────┐
│ CONFIRM & FINALIZE OPENING BALANCE                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Entry ID: OB-2024-01-ABC-001                                            │
│ Status: 🔵 APPROVED (Ready to Confirm)                                  │
│                                                                         │
│ Company:      ABC Company                                               │
│ Period:       January 2024                                              │
│ Approved By:  Mary Smith (2024-10-29 14:00)                            │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ ⚠️  IMPORTANT NOTICE                                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ This action will:                                                       │
│ ✓ Record opening balance permanently in the system                     │
│ ✓ Update account balances                                              │
│ ✓ Start normal transaction processing from next period                 │
│                                                                         │
│ This action CANNOT BE UNDONE!                                          │
│                                                                         │
│ After confirmation, the entry becomes READ-ONLY.                       │
│ All data will be locked and cannot be modified.                        │
│                                                                         │
│ Are you sure you want to proceed? ⚠️                                    │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ FINAL DATA SUMMARY (REVIEW BEFORE CONFIRMING)                           │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ #│ Account Code │ Account Name        │ Amount      │D/C         │ │
│ ├──┼──────────────┼─────────────────────┼─────────────┼────────────┤ │
│ │1 │ 111          │ Tiền mặt            │ 100,000,000 │ D          │ │
│ │2 │ 112          │ Tiền gởi NH         │ 200,000,000 │ D          │ │
│ │3 │ 131          │ Nợ phải thu         │ 100,000,000 │ D          │ │
│ │4 │ 156          │ Hàng hóa            │ 150,000,000 │ D          │ │
│ │5 │ 331          │ Nợ phải trả         │ 200,000,000 │ C          │ │
│ │6 │ 341          │ Nợ vay NH           │ 150,000,000 │ C          │ │
│ │7 │ 411          │ Vốn chủ sở hữu      │ 150,000,000 │ C          │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ Total Debit:      500,000,000 VNĐ                                      │
│ Total Credit:     500,000,000 VNĐ                                      │
│ Status:           ✅ BALANCED                                           │
│                                                                         │
│ ☑️  I have reviewed the data and it is correct                         │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ ACTION BUTTONS                                                          │
│ ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│ [✅ CONFIRM & FINALIZE]  [❌ CANCEL]                                    │
│                                                                         │
│ This entry will be finalized immediately after you click Confirm.      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**After Confirmation:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ✅ SUCCESS - OPENING BALANCE FINALIZED                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Entry ID: OB-2024-01-ABC-001                                            │
│ Status: ✅ CONFIRMED (Locked)                                           │
│                                                                         │
│ Company:      ABC Company                                               │
│ Period:       January 2024                                              │
│ Confirmed By: John Doe                                                  │
│ Confirmed At: 2024-10-29 15:30:25                                      │
│                                                                         │
│ Account balances have been updated:                                     │
│ ✓ TK 111 (Tiền mặt): 100,000,000 VNĐ                                  │
│ ✓ TK 112 (Tiền gởi): 200,000,000 VNĐ                                  │
│ ✓ TK 131 (Nợ phải thu): 100,000,000 VNĐ                               │
│ ✓ TK 156 (Hàng hóa): 150,000,000 VNĐ                                  │
│ ✓ TK 331 (Nợ phải trả): 200,000,000 VNĐ                               │
│ ✓ TK 341 (Nợ vay): 150,000,000 VNĐ                                    │
│ ✓ TK 411 (Vốn): 150,000,000 VNĐ                                       │
│                                                                         │
│ System is now ready for normal transaction processing.                  │
│                                                                         │
│ [Print Certificate] [Generate Report] [Return to List] [Close]         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 8. UI Components & Patterns

### 8.1 Status Badge Colors

```
⭕ DRAFT       = Gray (#6c757d)      - Editable
🟡 PENDING     = Yellow (#ffc107)    - Waiting for approval
🔵 APPROVED    = Blue (#0d6efd)      - Ready to confirm
✅ CONFIRMED   = Green (#198754)     - Finalized, locked
```

### 8.2 Action Button States

**Enabled Button (Blue):**
```
[Button Text]
```

**Disabled Button (Gray):**
```
[Button Text] (grayed out)
```

**Danger Button (Red):**
```
[Delete] or [Cancel]
```

### 8.3 Input Validation Messages

**Error (Red Border):**
```
Account: [_____] ❌
↓
Account "999" does not exist
```

**Success (Green Check):**
```
Amount: [100,000,000] ✅
```

**Warning (Yellow):**
```
Total Debit: 500,000,000
Total Credit: 300,000,000
⚠️ Not Balanced - Difference: 200,000,000
```

---

## 9. Mobile Responsive Design Notes

- **Desktop (≥1200px):** Full layout with all columns visible
- **Tablet (768-1199px):** Collapsible table, stack some fields
- **Mobile (<768px):** Single column layout, expandable rows, bottom action sheet

---

## 10. Accessibility Features

- ✅ Proper color contrast (WCAG AA standard)
- ✅ Form labels associated with inputs
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Required fields marked with `*` and red color
- ✅ Error messages clearly associated with inputs
- ✅ Confirmation dialogs for destructive actions

---

## 11. Design Specifications

### Colors
- Primary: #0d6efd (Blue)
- Success: #198754 (Green)
- Danger: #dc3545 (Red)
- Warning: #ffc107 (Yellow)
- Background: #f8f9fa (Light Gray)
- Text: #212529 (Dark Gray)

### Typography
- Headings: Bold, larger sizes
- Labels: 14px, regular weight
- Body Text: 14px, regular weight
- Small Text: 12px (captions, help text)

### Spacing
- Container padding: 20px
- Section margin: 20px
- Field margin: 15px
- Table row height: 50px

### Buttons
- Primary button: Blue background, white text
- Secondary button: Gray background, dark text
- Danger button: Red background, white text
- Padding: 8px 16px
- Border radius: 4px

---

## 12. Conclusion

**Prototype & Mockup provide:**
- ✅ 6 key screens for complete workflow
- ✅ User interactions clearly shown
- ✅ Validation & error handling
- ✅ Status transitions visualized
- ✅ Responsive design considerations
- ✅ Accessibility features included

**Ready for UI development phase.**

---

**Document Status:** Draft - Ready for Review
**Last Updated:** 2024-10-29
**Next Step:** Begin Design Phase (2_ThietKe) - Detailed UI/UX design & Database design
