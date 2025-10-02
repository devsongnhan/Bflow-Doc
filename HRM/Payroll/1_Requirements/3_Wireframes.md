# WIREFRAMES & UI/UX DESIGN
## Payroll Management System

**Version:** 1.0
**Date:** 2024-10-02
**Status:** Final

---

## 🎨 DESIGN SYSTEM

### Color Palette
```
Primary:   #2563EB (Blue) - Actions, Links
Secondary: #10B981 (Green) - Success, Approved
Warning:   #F59E0B (Amber) - Alerts, Pending
Danger:    #EF4444 (Red) - Errors, Rejected
Neutral:   #6B7280 (Gray) - Text, Borders
```

### Typography
```
Font Family: Inter, system-ui, sans-serif
Headings:    Bold, 1.5rem - 2.5rem
Body:        Regular, 1rem
Small text:  Regular, 0.875rem
Monospace:   'Courier New' for numbers
```

### Grid System
```
Desktop:  1280px container, 12 columns
Tablet:   768px, 8 columns
Mobile:   375px, 4 columns
Spacing:  8px base unit (8, 16, 24, 32, 48)
```

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile:   320px - 768px
Tablet:   769px - 1024px
Desktop:  1025px - 1440px
Large:    1441px+
```

---

## 🗺️ NAVIGATION STRUCTURE

```
Main Navigation
├── 🏠 Dashboard
├── 👥 Employees
│   ├── List
│   ├── Add New
│   └── Import
├── 💼 Contracts
│   ├── Active
│   ├── Expiring
│   └── History
├── 💰 Payroll
│   ├── Calculate
│   ├── Review
│   ├── Approve
│   └── History
├── 📊 Reports
│   ├── Payroll Summary
│   ├── Tax Report
│   ├── Insurance
│   └── Analytics
└── ⚙️ Settings
    ├── Salary Components
    ├── Tax Rules
    ├── Users
    └── System
```

---

## 📐 WIREFRAMES

### 1. LOGIN SCREEN
```
┌─────────────────────────────────────┐
│          PAYROLL SYSTEM             │
│                                     │
│     ┌───────────────────────┐      │
│     │    Company Logo       │      │
│     └───────────────────────┘      │
│                                     │
│     ╔═══════════════════════╗      │
│     ║ Email                 ║      │
│     ╚═══════════════════════╝      │
│                                     │
│     ╔═══════════════════════╗      │
│     ║ Password              ║      │
│     ╚═══════════════════════╝      │
│                                     │
│     □ Remember me                  │
│                                     │
│     ┌─────────────────────┐        │
│     │     ĐĂNG NHẬP       │        │
│     └─────────────────────┘        │
│                                     │
│     Forgot password?               │
└─────────────────────────────────────┘
```

---

### 2. DASHBOARD
```
┌──────────────────────────────────────────────────────┐
│ ≡ PAYROLL  [Search...]              👤 Admin  [Logout]│
├──────────────────────────────────────────────────────┤
│                                                      │
│ DASHBOARD                    Month: October 2024    │
│                                                      │
│ ┌─────────────┬─────────────┬─────────────────────┐│
│ │ EMPLOYEES   │ PAYROLL     │ PENDING APPROVAL    ││
│ │    325      │ 2.5B VNĐ    │      12            ││
│ │    +5%      │   +8%       │                    ││
│ └─────────────┴─────────────┴─────────────────────┘│
│                                                      │
│ ┌───────────────────────────────────────────────┐  │
│ │          PAYROLL TREND (6 MONTHS)            │  │
│ │     ┌─┐     ┌─┐     ┌─┐                    │  │
│ │   ┌─┤ ├─┐ ┌─┤ ├─┐ ┌─┤ ├─┐                 │  │
│ │ ──┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴──               │  │
│ │  May  Jun  Jul  Aug  Sep  Oct               │  │
│ └───────────────────────────────────────────────┘  │
│                                                      │
│ QUICK ACTIONS                                       │
│ ┌──────────┬──────────┬──────────┬──────────┐     │
│ │Calculate │ Approve  │ Export   │ Reports  │     │
│ │ Payroll  │ Payroll  │ Payment  │          │     │
│ └──────────┴──────────┴──────────┴──────────┘     │
│                                                      │
│ RECENT ACTIVITIES                                   │
│ ┌───────────────────────────────────────────────┐  │
│ │ • Payroll approved for IT Dept - 2 hours ago │  │
│ │ • New employee added: Nguyen Van A - Today   │  │
│ │ • Contract renewed: EMP-2024-0045 - Today    │  │
│ └───────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

### 3. EMPLOYEE LIST
```
┌──────────────────────────────────────────────────────┐
│ ≡ PAYROLL > Employees                               │
├──────────────────────────────────────────────────────┤
│                                                      │
│ EMPLOYEES (325)         [+ Add New] [↓ Import]      │
│                                                      │
│ [Search...]  [Department ▼] [Status ▼] [Filter]     │
│                                                      │
│ ┌────────────────────────────────────────────────┐  │
│ │ □ │ ID      │ Name        │ Dept   │ Salary   │  │
│ ├────────────────────────────────────────────────┤  │
│ │ □ │EMP-0001│Nguyen Van A │ IT     │ 25.0M    │  │
│ │ □ │EMP-0002│Tran Thi B   │ HR     │ 22.0M    │  │
│ │ □ │EMP-0003│Le Van C     │ Sales  │ 18.0M    │  │
│ │ □ │EMP-0004│Pham Thi D   │ Admin  │ 15.0M    │  │
│ │ □ │EMP-0005│Hoang Van E  │ IT     │ 30.0M    │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ [1] 2 3 4 ... 33  Showing 1-10 of 325              │
│                                                      │
│ Bulk Actions: [Edit] [Export] [Deactivate]         │
└──────────────────────────────────────────────────────┘
```

---

### 4. EMPLOYEE DETAIL/EDIT
```
┌──────────────────────────────────────────────────────┐
│ ≡ PAYROLL > Employees > EMP-2024-0001              │
├──────────────────────────────────────────────────────┤
│                                                      │
│ EMPLOYEE INFORMATION            [Edit] [Print]      │
│                                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ 👤  │ Nguyen Van A                              ││
│ │     │ Senior Developer                          ││
│ │     │ IT Department                             ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
│ [Personal] [Contract] [Salary] [Documents]         │
│                                                      │
│ PERSONAL INFORMATION                                │
│ ┌─────────────────────────────────────────────────┐│
│ │ Employee ID:    EMP-2024-0001                   ││
│ │ Full Name:      Nguyen Van A                    ││
│ │ Date of Birth:  15/05/1990                      ││
│ │ Gender:         Male                            ││
│ │ ID Number:      024090123456                    ││
│ │ Phone:          0901234567                      ││
│ │ Email:          nguyen.a@company.com            ││
│ │ Address:        123 Le Loi, Q1, HCMC            ││
│ │                                                 ││
│ │ BANK INFORMATION                                ││
│ │ Bank:           Vietcombank                     ││
│ │ Account:        0001234567890                   ││
│ │ Branch:         HCM Main Branch                 ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
│ [Cancel] [Save Changes]                            │
└──────────────────────────────────────────────────────┘
```

---

### 5. PAYROLL CALCULATION
```
┌──────────────────────────────────────────────────────┐
│ ≡ PAYROLL > Calculate                               │
├──────────────────────────────────────────────────────┤
│                                                      │
│ PAYROLL CALCULATION - OCTOBER 2024                  │
│                                                      │
│ Period: 01/10/2024 - 31/10/2024                    │
│                                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ STEP 1: SELECT EMPLOYEES                        ││
│ │ ○ All Employees (325)                          ││
│ │ ○ By Department  [Select ▼]                    ││
│ │ ○ Custom Selection                              ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ STEP 2: IMPORT ATTENDANCE                       ││
│ │ [Upload File] or [Sync from System]             ││
│ │                                                 ││
│ │ ✓ Attendance data imported (325 records)        ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ STEP 3: CALCULATION OPTIONS                     ││
│ │ ☑ Include Overtime                              ││
│ │ ☑ Apply Tax Calculation                         ││
│ │ ☑ Apply Insurance Deduction                     ││
│ │ ☑ Include Allowances                            ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ CALCULATION SUMMARY                             ││
│ │ Total Employees:     325                        ││
│ │ Total Gross:         2,850,000,000 VNĐ         ││
│ │ Total Deductions:    385,000,000 VNĐ           ││
│ │ Total Net:           2,465,000,000 VNĐ         ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
│ [Back] [Calculate] [Review Details →]              │
└──────────────────────────────────────────────────────┘
```

---

### 6. PAYROLL REVIEW
```
┌──────────────────────────────────────────────────────┐
│ ≡ PAYROLL > Review                                  │
├──────────────────────────────────────────────────────┤
│                                                      │
│ PAYROLL REVIEW - OCTOBER 2024     Status: PENDING   │
│                                                      │
│ Filter: [Department ▼] [Errors Only] [Search...]    │
│                                                      │
│ ┌────────────────────────────────────────────────┐  │
│ │Name      │Gross   │Deduct  │Tax    │Net      │  │
│ ├────────────────────────────────────────────────┤  │
│ │Nguyen A  │25.0M   │3.5M    │2.8M   │18.7M  ⚠│  │
│ │Tran B    │22.0M   │3.1M    │2.2M   │16.7M  ✓│  │
│ │Le C      │18.0M   │2.5M    │1.5M   │14.0M  ✓│  │
│ │Pham D    │15.0M   │2.1M    │0.8M   │12.1M  ✓│  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ ⚠ 5 warnings found [View Details]                  │
│                                                      │
│ SELECTED EMPLOYEE DETAILS                           │
│ ┌────────────────────────────────────────────────┐  │
│ │ Nguyen Van A - EMP-0001                        │  │
│ ├────────────────────────────────────────────────┤  │
│ │ Basic Salary:          20,000,000              │  │
│ │ Position Allowance:     3,000,000              │  │
│ │ Meal Allowance:           730,000              │  │
│ │ Overtime (15h):         1,270,000              │  │
│ │ ─────────────────────────────────              │  │
│ │ Gross Salary:          25,000,000              │  │
│ │                                                 │  │
│ │ Social Insurance 8%:    2,000,000              │  │
│ │ Health Insurance 1.5%:    375,000              │  │
│ │ Unemployment 1%:          250,000              │  │
│ │ Income Tax:            2,800,000              │  │
│ │ ─────────────────────────────────              │  │
│ │ Net Salary:           18,700,000              │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ [← Back] [Save Draft] [Submit for Approval →]      │
└──────────────────────────────────────────────────────┘
```

---

### 7. APPROVAL WORKFLOW
```
┌──────────────────────────────────────────────────────┐
│ ≡ PAYROLL > Approval                                │
├──────────────────────────────────────────────────────┤
│                                                      │
│ PENDING APPROVALS (3)                               │
│                                                      │
│ ┌────────────────────────────────────────────────┐  │
│ │Period    │Dept     │Amount      │Status       │  │
│ ├────────────────────────────────────────────────┤  │
│ │Oct 2024  │IT       │450M VNĐ    │⏳ Pending   │  │
│ │Oct 2024  │HR       │280M VNĐ    │⏳ Pending   │  │
│ │Oct 2024  │Sales    │520M VNĐ    │⏳ Pending   │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ APPROVAL DETAILS - IT DEPARTMENT                    │
│ ┌────────────────────────────────────────────────┐  │
│ │ Submitted by:   Accountant01                   │  │
│ │ Submit time:    23/10/2024 14:30              │  │
│ │ Employees:      45                             │  │
│ │ Total Amount:   450,000,000 VNĐ               │  │
│ │                                                 │  │
│ │ Summary Statistics:                             │  │
│ │ • Average Salary:    10,000,000 VNĐ           │  │
│ │ • Total Overtime:     25,000,000 VNĐ          │  │
│ │ • Total Tax:          65,000,000 VNĐ          │  │
│ │                                                 │  │
│ │ [View Details] [Download PDF]                   │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ Comments: ┌──────────────────────┐                │
│          │                        │                │
│          └──────────────────────┘                │
│                                                      │
│ [Reject] [Request Changes] [Approve]               │
└──────────────────────────────────────────────────────┘
```

---

### 8. REPORTS DASHBOARD
```
┌──────────────────────────────────────────────────────┐
│ ≡ PAYROLL > Reports                                 │
├──────────────────────────────────────────────────────┤
│                                                      │
│ REPORTS CENTER                                       │
│                                                      │
│ Quick Reports:                                      │
│ ┌─────────────┬─────────────┬─────────────────────┐│
│ │   PAYROLL   │    TAX      │    INSURANCE        ││
│ │   SUMMARY   │   REPORT    │    DECLARATION      ││
│ │      📊      │     📋       │        📄           ││
│ └─────────────┴─────────────┴─────────────────────┘│
│                                                      │
│ Custom Report:                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ Report Type:  [Payroll Summary ▼]               ││
│ │ Period:       [October 2024 ▼]                  ││
│ │ Department:   [All ▼]                           ││
│ │ Format:       ○ PDF  ○ Excel  ○ View           ││
│ │                                                 ││
│ │ [Generate Report]                               ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
│ Recent Reports:                                     │
│ ┌────────────────────────────────────────────────┐  │
│ │📄 Payroll_Oct_2024.pdf    23/10 14:30  [↓]    │  │
│ │📄 Tax_Report_Sep_2024.xlsx 25/09 10:15  [↓]   │  │
│ │📄 Insurance_Q3_2024.pdf    01/10 09:00  [↓]   │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ Scheduled Reports:                                  │
│ ┌────────────────────────────────────────────────┐  │
│ │ • Monthly Payroll - Every 25th - Email         │  │
│ │ • Tax Declaration - Every 20th - System        │  │
│ │ • YTD Summary - Quarterly - Dashboard          │  │
│ └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

### 9. EMPLOYEE SELF-SERVICE PORTAL
```
┌──────────────────────────────────────────────────────┐
│ EMPLOYEE PORTAL            Hello, Nguyen Van A  [↓] │
├──────────────────────────────────────────────────────┤
│                                                      │
│ MY DASHBOARD                                        │
│                                                      │
│ ┌──────────────────────────────────────────────┐   │
│ │ October 2024 Payslip                         │   │
│ │ Net Salary: 18,700,000 VNĐ                  │   │
│ │ Status: Paid ✓                               │   │
│ │ [View Details] [Download PDF]                │   │
│ └──────────────────────────────────────────────┘   │
│                                                      │
│ Quick Links:                                        │
│ ┌──────────┬──────────┬──────────┬──────────┐     │
│ │ Payslips │  Leave   │ Personal │ Documents│     │
│ │          │ Request  │   Info   │          │     │
│ └──────────┴──────────┴──────────┴──────────┘     │
│                                                      │
│ SALARY HISTORY                                      │
│ ┌────────────────────────────────────────────┐     │
│ │ Month/Year  │ Gross    │ Net      │ Action│     │
│ ├────────────────────────────────────────────┤     │
│ │ Oct 2024    │ 25.0M    │ 18.7M    │ [PDF] │     │
│ │ Sep 2024    │ 25.0M    │ 18.7M    │ [PDF] │     │
│ │ Aug 2024    │ 24.5M    │ 18.3M    │ [PDF] │     │
│ └────────────────────────────────────────────┘     │
│                                                      │
│ ANNUAL SUMMARY 2024                                │
│ ┌────────────────────────────────────────────┐     │
│ │ Total Gross:     250,000,000 VNĐ           │     │
│ │ Total Tax Paid:   28,000,000 VNĐ           │     │
│ │ Total Net:       187,000,000 VNĐ           │     │
│ └────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────┘
```

---

### 10. MOBILE RESPONSIVE VIEW
```
┌─────────────────┐
│ ≡  PAYROLL  👤  │
├─────────────────┤
│ Hello, Admin    │
│                 │
│ ┌─────────────┐ │
│ │ EMPLOYEES   │ │
│ │    325      │ │
│ └─────────────┘ │
│                 │
│ ┌─────────────┐ │
│ │ PAYROLL     │ │
│ │  2.5B VNĐ   │ │
│ └─────────────┘ │
│                 │
│ QUICK ACTIONS   │
│ ┌─────────────┐ │
│ │  Calculate  │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │   Approve   │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │   Reports   │ │
│ └─────────────┘ │
│                 │
│ [Home][Pay][👤] │
└─────────────┘
```

---

## 🎯 USER FLOWS

### Flow 1: Monthly Payroll Process
```
START
  ↓
Login → Dashboard
  ↓
Navigate to Payroll
  ↓
Import Attendance Data
  ↓
Calculate Payroll
  ↓
Review Calculations
  ↓
Fix Errors (if any)
  ↓
Submit for Approval
  ↓
Manager Reviews
  ↓
Approve/Reject
  ↓
If Approved:
  - Generate Payment File
  - Send to Bank
  - Send Payslips
  ↓
END
```

### Flow 2: New Employee Onboarding
```
START
  ↓
HR Login
  ↓
Employees → Add New
  ↓
Enter Personal Info
  ↓
Enter Bank Details
  ↓
Create Contract
  ↓
Assign Salary Structure
  ↓
Set Department/Position
  ↓
Save & Activate
  ↓
END
```

---

## 🔄 INTERACTION PATTERNS

### Form Validation
- Real-time validation on blur
- Clear error messages below fields
- Success indicators (green checkmarks)
- Required fields marked with *

### Loading States
- Skeleton screens for tables
- Spinner for buttons
- Progress bar for batch operations
- "Loading..." text for dropdowns

### Notifications
- Toast messages (top-right, 3 seconds)
- Success: Green background
- Error: Red background
- Warning: Yellow background
- Info: Blue background

### Confirmations
- Modal dialog for destructive actions
- "Are you sure?" with Yes/No buttons
- Show impact (e.g., "This will affect 325 employees")

---

## ♿ ACCESSIBILITY

### WCAG 2.1 Level AA Compliance
- Color contrast ratio ≥ 4.5:1
- Keyboard navigation support
- Screen reader compatible
- Alt text for all images
- ARIA labels for icons
- Focus indicators visible

### Keyboard Shortcuts
```
Ctrl + S    : Save
Ctrl + N    : New record
Ctrl + /    : Search
Esc         : Close modal
Tab         : Next field
Shift + Tab : Previous field
```

---

## 📏 COMPONENT SPECIFICATIONS

### Buttons
```
Primary:   bg-blue-600, text-white, h-10, px-4
Secondary: bg-gray-200, text-gray-800, h-10, px-4
Danger:    bg-red-600, text-white, h-10, px-4
Disabled:  bg-gray-100, text-gray-400, cursor-not-allowed
```

### Input Fields
```
Default:   border-gray-300, h-10, px-3
Focus:     border-blue-500, outline-blue-500
Error:     border-red-500, text-red-600
Success:   border-green-500, text-green-600
```

### Tables
```
Header:    bg-gray-50, font-semibold
Row:       hover:bg-gray-50, border-b
Selected:  bg-blue-50
Sortable:  cursor-pointer, arrow indicator
```

---

## 🚀 PERFORMANCE TARGETS

- Page Load: < 2 seconds
- API Response: < 1 second
- Search: < 500ms
- Export: < 5 seconds for 1000 records
- Smooth scrolling: 60 FPS

---

**Document Status:** ✅ Complete
**Design Tool:** Figma (for high-fidelity)
**Next Step:** Development Phase