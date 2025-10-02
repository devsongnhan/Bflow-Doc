# USER STORIES - HỆ THỐNG QUẢN LÝ LƯƠNG
## Payroll Management System

**Version:** 1.0
**Date:** 2024-10-02
**Status:** Final

---

## 📋 EPIC 1: EMPLOYEE MANAGEMENT

### US-1.1: Quản lý thông tin nhân viên
**As a** HR Staff
**I want to** manage employee information
**So that** I can maintain accurate employee records for payroll processing

**Acceptance Criteria:**
- ✅ Can create new employee with all required fields
- ✅ Can update employee information (personal, contact, bank)
- ✅ Can view employee history (salary changes, position changes)
- ✅ Can activate/deactivate employee status
- ✅ Validate email and phone format
- ✅ Prevent duplicate employee ID

**Priority:** 🔴 Must Have
**Story Points:** 5

---

### US-1.2: Quản lý hợp đồng lao động
**As a** HR Manager
**I want to** manage employment contracts
**So that** salary and benefits are calculated correctly

**Acceptance Criteria:**
- ✅ Create contract with start date, salary, position
- ✅ Support multiple contract types (Probation, Official, Part-time)
- ✅ Track contract history for each employee
- ✅ Alert when contract is near expiration (30 days)
- ✅ Cannot have overlapping active contracts

**Priority:** 🔴 Must Have
**Story Points:** 8

---

## 📊 EPIC 2: PAYROLL CALCULATION

### US-2.1: Tính lương hàng tháng
**As a** Payroll Accountant
**I want to** calculate monthly salary automatically
**So that** payroll is accurate and on time

**Acceptance Criteria:**
- ✅ Calculate gross salary = base salary + allowances
- ✅ Apply attendance data (working days, overtime, leave)
- ✅ Calculate deductions (tax, insurance, other)
- ✅ Generate net salary = gross - deductions
- ✅ Support batch calculation for all employees
- ✅ Show detailed calculation breakdown

**Priority:** 🔴 Must Have
**Story Points:** 13

---

### US-2.2: Tính thuế TNCN
**As a** Payroll Accountant
**I want to** calculate personal income tax automatically
**So that** tax compliance is ensured

**Acceptance Criteria:**
- ✅ Apply Vietnam tax regulations 2024
- ✅ Calculate taxable income = gross - insurance - deductions
- ✅ Apply personal deduction (11M VND/month)
- ✅ Apply dependent deduction (4.4M VND/person/month)
- ✅ Use progressive tax rates (5%, 10%, 15%, 20%, 25%, 30%, 35%)
- ✅ Generate monthly and annual tax reports

**Priority:** 🔴 Must Have
**Story Points:** 8

---

### US-2.3: Tính bảo hiểm
**As a** Payroll Accountant
**I want to** calculate social insurance automatically
**So that** insurance contributions are correct

**Acceptance Criteria:**
- ✅ Calculate BHXH: 8% (employee) + 17.5% (employer)
- ✅ Calculate BHYT: 1.5% (employee) + 3% (employer)
- ✅ Calculate BHTN: 1% (employee) + 1% (employer)
- ✅ Apply salary cap for insurance (20x minimum wage)
- ✅ Generate insurance declaration files (XML format)

**Priority:** 🔴 Must Have
**Story Points:** 5

---

## 💰 EPIC 3: PAYMENT PROCESSING

### US-3.1: Phê duyệt bảng lương
**As a** HR Manager
**I want to** review and approve payroll
**So that** payments are authorized before processing

**Acceptance Criteria:**
- ✅ View payroll summary by department
- ✅ Review individual salary details
- ✅ Add comments for clarification
- ✅ Approve/Reject with reasons
- ✅ Multi-level approval workflow (Accountant → Manager → Director)
- ✅ Email notification on status change

**Priority:** 🔴 Must Have
**Story Points:** 8

---

### US-3.2: Xuất file thanh toán
**As a** Payroll Accountant
**I want to** export payment files for banks
**So that** salaries are transferred to employees

**Acceptance Criteria:**
- ✅ Export to bank format (Excel/CSV/XML)
- ✅ Support multiple banks (VCB, BIDV, TCB, etc.)
- ✅ Include: account number, name, amount, description
- ✅ Generate payment vouchers
- ✅ Mark payroll as "Paid" after confirmation

**Priority:** 🔴 Must Have
**Story Points:** 5

---

### US-3.3: Gửi payslip cho nhân viên
**As an** Employee
**I want to** receive my payslip
**So that** I understand my salary calculation

**Acceptance Criteria:**
- ✅ Send payslip via email (PDF attachment)
- ✅ View payslip in employee portal
- ✅ Show detailed breakdown (earnings, deductions, net pay)
- ✅ Compare with previous months
- ✅ Download/Print payslip
- ✅ Secure access (password protected)

**Priority:** 🟡 Should Have
**Story Points:** 5

---

## 📈 EPIC 4: REPORTING & ANALYTICS

### US-4.1: Báo cáo tổng hợp lương
**As a** Finance Manager
**I want to** generate payroll reports
**So that** I can analyze labor costs

**Acceptance Criteria:**
- ✅ Monthly payroll summary report
- ✅ Department-wise salary report
- ✅ Year-to-date (YTD) reports
- ✅ Cost center analysis
- ✅ Export to Excel/PDF
- ✅ Customizable date ranges

**Priority:** 🔴 Must Have
**Story Points:** 5

---

### US-4.2: Báo cáo thuế
**As a** Tax Accountant
**I want to** generate tax reports
**So that** I can file tax declarations

**Acceptance Criteria:**
- ✅ Monthly tax declaration (Form 02/TT)
- ✅ Annual tax finalization (Form 05/QTT)
- ✅ Employee tax certificates
- ✅ Export to XML for online submission
- ✅ Tax reconciliation reports

**Priority:** 🔴 Must Have
**Story Points:** 5

---

### US-4.3: Dashboard phân tích
**As a** CEO/Director
**I want to** view payroll dashboards
**So that** I can monitor HR costs and trends

**Acceptance Criteria:**
- ✅ Total payroll cost by month/quarter/year
- ✅ Headcount and turnover trends
- ✅ Average salary by department/position
- ✅ Overtime cost analysis
- ✅ Budget vs actual comparison
- ✅ Real-time data updates

**Priority:** 🟡 Should Have
**Story Points:** 8

---

## 🔗 EPIC 5: INTEGRATIONS

### US-5.1: Tích hợp hệ thống chấm công
**As a** Payroll Accountant
**I want to** import attendance data automatically
**So that** salary calculation is based on actual working time

**Acceptance Criteria:**
- ✅ Import from attendance system (CSV/API)
- ✅ Map attendance codes to payroll
- ✅ Handle multiple shifts
- ✅ Calculate overtime (1.5x, 2x, 3x rates)
- ✅ Validate and flag anomalies

**Priority:** 🔴 Must Have
**Story Points:** 8

---

### US-5.2: Tích hợp hệ thống kế toán
**As a** Chief Accountant
**I want to** sync payroll data with accounting system
**So that** financial records are accurate

**Acceptance Criteria:**
- ✅ Post payroll journals automatically
- ✅ Map salary components to GL accounts
- ✅ Generate accounting vouchers
- ✅ Support multiple cost centers
- ✅ Reconciliation reports

**Priority:** 🟡 Should Have
**Story Points:** 8

---

## 👤 EPIC 6: EMPLOYEE SELF-SERVICE

### US-6.1: Xem thông tin cá nhân
**As an** Employee
**I want to** view and update my personal information
**So that** my records are accurate

**Acceptance Criteria:**
- ✅ View personal profile
- ✅ Update contact information
- ✅ Upload documents (ID, certificates)
- ✅ View contract details
- ✅ Change request requires approval

**Priority:** 🟢 Nice to Have
**Story Points:** 3

---

### US-6.2: Xem lịch sử lương
**As an** Employee
**I want to** view my salary history
**So that** I can track my income over time

**Acceptance Criteria:**
- ✅ View payslips for last 12 months
- ✅ Download payslips as PDF
- ✅ View annual income summary
- ✅ Compare salary trends
- ✅ Secure authentication required

**Priority:** 🟢 Nice to Have
**Story Points:** 3

---

## 🔧 EPIC 7: SYSTEM ADMINISTRATION

### US-7.1: Cấu hình thành phần lương
**As a** System Admin
**I want to** configure salary components
**So that** different salary structures are supported

**Acceptance Criteria:**
- ✅ Create salary components (basic, allowance, deduction)
- ✅ Set calculation formulas
- ✅ Configure tax exemption rules
- ✅ Assign components to employee groups
- ✅ Effective date management

**Priority:** 🔴 Must Have
**Story Points:** 5

---

### US-7.2: Quản lý phân quyền
**As a** System Admin
**I want to** manage user roles and permissions
**So that** data security is maintained

**Acceptance Criteria:**
- ✅ Create/edit user accounts
- ✅ Assign roles (HR, Accountant, Manager, Employee)
- ✅ Configure permissions per role
- ✅ Audit trail of user actions
- ✅ Password policy enforcement

**Priority:** 🔴 Must Have
**Story Points:** 5

---

## 📊 STORY POINTS SUMMARY

| Epic | Must Have | Should Have | Nice to Have | Total |
|------|-----------|-------------|--------------|-------|
| Employee Management | 13 | 0 | 0 | 13 |
| Payroll Calculation | 26 | 0 | 0 | 26 |
| Payment Processing | 13 | 5 | 0 | 18 |
| Reporting & Analytics | 10 | 8 | 0 | 18 |
| Integrations | 8 | 8 | 0 | 16 |
| Employee Self-Service | 0 | 0 | 6 | 6 |
| System Administration | 10 | 0 | 0 | 10 |
| **TOTAL** | **80** | **21** | **6** | **107** |

---

## 🎯 RELEASE PLANNING

### Release 1.0 (MVP) - Month 1-2
- Employee Management (US-1.1, US-1.2)
- Basic Payroll Calculation (US-2.1, US-2.2, US-2.3)
- System Administration (US-7.1, US-7.2)
- **Total: 39 story points**

### Release 1.1 - Month 3
- Payment Processing (US-3.1, US-3.2)
- Basic Reporting (US-4.1, US-4.2)
- **Total: 23 story points**

### Release 1.2 - Month 4
- Attendance Integration (US-5.1)
- Payslip Distribution (US-3.3)
- Dashboard (US-4.3)
- **Total: 21 story points**

### Release 2.0 - Month 5-6
- Accounting Integration (US-5.2)
- Employee Self-Service (US-6.1, US-6.2)
- Enhancements & Optimization
- **Total: 14 story points**

---

## ⚠️ ASSUMPTIONS & DEPENDENCIES

### Assumptions:
1. Vietnam labor law and tax regulations for 2024
2. Monthly salary payment cycle
3. Maximum 1000 employees initially
4. Vietnamese and English language support
5. Cloud-based deployment

### Dependencies:
1. Attendance system API available
2. Bank file formats provided
3. Accounting system integration points defined
4. Email service for notifications
5. Document storage service

---

## ✅ DEFINITION OF DONE

1. Code complete and reviewed
2. Unit tests passed (>80% coverage)
3. Integration tests passed
4. User acceptance criteria met
5. Documentation updated
6. Security scan passed
7. Performance criteria met (<2s response)
8. Deployed to staging environment

---

**Document Status:** ✅ Complete
**Total Stories:** 18
**Total Points:** 107
**Estimated Duration:** 6 months