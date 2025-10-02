# BUSINESS RULES - HỆ THỐNG QUẢN LÝ LƯƠNG
## Payroll Management System

**Version:** 1.0
**Date:** 2024-10-02
**Status:** Final

---

## 📋 1. EMPLOYEE MANAGEMENT RULES

### BR-1.1: Employee Identification
```
- Employee ID format: EMP-YYYY-XXXX (e.g., EMP-2024-0001)
- Employee ID is unique and immutable
- Cannot delete employee with payroll history
- Inactive employees retained for minimum 5 years
```

### BR-1.2: Employment Status
```
Status transitions:
- Probation → Official (after probation period)
- Official → Resigned (with 30 days notice)
- Any → Terminated (immediate)
- Cannot rehire within 6 months of termination
```

### BR-1.3: Contract Rules
```
- Maximum probation period: 2 months
- Minimum official contract: 12 months
- Contract renewal notice: 30 days before expiry
- Salary in new contract >= previous contract
- One active contract per employee at any time
```

---

## 💰 2. SALARY STRUCTURE RULES

### BR-2.1: Salary Components
```
GROSS SALARY = Base Salary + Allowances - Pre-tax Deductions

Components:
1. Base Salary (minimum = regional minimum wage)
2. Allowances:
   - Position allowance: 10-50% of base
   - Seniority: 5% per year (max 30%)
   - Transportation: Fixed or actual
   - Meal: 730,000 VND/month standard
   - Phone: Based on position
3. Deductions:
   - Social insurance (mandatory)
   - Union fee: 1% of base salary
   - Advance payment (if any)
```

### BR-2.2: Overtime Calculation
```
Regular hours: 8 hours/day, 48 hours/week

Overtime rates:
- Weekday: 150% of hourly rate
- Weekend: 200% of hourly rate
- Holiday: 300% of hourly rate
- Night shift (22:00-06:00): +30% extra

Maximum overtime: 200 hours/year
Hourly rate = Base salary / 26 / 8
```

### BR-2.3: Leave & Deductions
```
Annual leave:
- 12 days/year (standard)
- +1 day per 5 years of service
- Unused leave paid at year end

Leave without pay:
- Deduction = (Gross salary / 26) × days

Sick leave:
- With medical certificate: 75% pay
- Without certificate: Unpaid
```

---

## 📊 3. TAX CALCULATION RULES (VIETNAM 2024)

### BR-3.1: Personal Income Tax Formula
```
TAXABLE INCOME = Gross Income - Insurance - Tax Deductions

Tax Deductions:
- Personal deduction: 11,000,000 VND/month
- Dependent deduction: 4,400,000 VND/person/month
  * Dependent: Children <18, or <22 if in school
  * Maximum: 4 dependents
```

### BR-3.2: Progressive Tax Rates
```
Monthly Taxable Income         | Tax Rate
--------------------------------|----------
Up to 5,000,000 VND           | 5%
5,000,001 - 10,000,000 VND    | 10%
10,000,001 - 18,000,000 VND   | 15%
18,000,001 - 32,000,000 VND   | 20%
32,000,001 - 52,000,000 VND   | 25%
52,000,001 - 80,000,000 VND   | 30%
Over 80,000,000 VND           | 35%
```

### BR-3.3: Tax Calculation Example
```python
# Example: Gross = 30,000,000 VND, 2 dependents
Gross Income = 30,000,000
Insurance (8%) = 2,400,000
Personal Deduction = 11,000,000
Dependent Deduction = 4,400,000 × 2 = 8,800,000

Taxable Income = 30,000,000 - 2,400,000 - 11,000,000 - 8,800,000
               = 7,800,000 VND

Tax = 5,000,000 × 5% + 2,800,000 × 10%
    = 250,000 + 280,000
    = 530,000 VND
```

---

## 🛡️ 4. INSURANCE RULES

### BR-4.1: Social Insurance (BHXH)
```
Contribution rates:
- Employee: 8% of insurance salary
- Employer: 17.5% of insurance salary

Insurance salary:
- Minimum: Regional minimum wage
- Maximum: 20 × regional minimum wage
- Based on contract salary (not actual)
```

### BR-4.2: Health Insurance (BHYT)
```
Contribution rates:
- Employee: 1.5% of insurance salary
- Employer: 3% of insurance salary

Coverage:
- Employee + registered dependents
- Medical examination and treatment
```

### BR-4.3: Unemployment Insurance (BHTN)
```
Contribution rates:
- Employee: 1% of insurance salary
- Employer: 1% of insurance salary

Eligibility:
- Vietnamese citizens only
- Labor contract ≥ 3 months
```

### BR-4.4: Insurance Salary Cap
```
Region | Minimum Wage | Maximum Insurance Salary
-------|--------------|------------------------
I      | 4,680,000   | 93,600,000
II     | 4,160,000   | 83,200,000
III    | 3,640,000   | 72,800,000
IV     | 3,250,000   | 65,000,000
```

---

## ⚖️ 5. PAYROLL PROCESSING RULES

### BR-5.1: Payroll Cycle
```
Standard cycle: Monthly (25th of each month)

Timeline:
- Day 20: Attendance cutoff
- Day 21-23: Calculation & review
- Day 24: Approval
- Day 25: Payment

Special cases:
- If 25th is weekend/holiday: Previous working day
- Tet bonus: Before lunar new year
- 13th month: Before year end
```

### BR-5.2: Net Salary Formula
```
NET SALARY = Gross Salary
           - Social Insurance (8%)
           - Health Insurance (1.5%)
           - Unemployment Insurance (1%)
           - Personal Income Tax
           - Other Deductions
           + Tax-free Allowances
```

### BR-5.3: Minimum Take-Home
```
Net salary must be ≥ 85% of regional minimum wage
If net < minimum:
- Review deductions
- Defer non-mandatory deductions
- Alert HR manager
```

---

## 🔄 6. APPROVAL WORKFLOW

### BR-6.1: Approval Hierarchy
```
Level 1: Direct Manager
- Approve overtime
- Approve leave requests

Level 2: Department Head
- Approve department payroll
- Approve special allowances

Level 3: HR Manager
- Approve final payroll
- Approve contract changes

Level 4: Director/CEO
- Approve payroll > 500M VND
- Approve executive salaries
```

### BR-6.2: Approval Rules
```
- Timeout: 24 hours → escalate to next level
- Rejection: Requires written reason
- Cannot approve own salary/request
- Batch approval: Maximum 50 records
- Audit trail: All actions logged
```

---

## 💳 7. PAYMENT RULES

### BR-7.1: Payment Methods
```
1. Bank Transfer (Primary)
   - Verified bank account required
   - Same-name validation
   - Batch transfer supported

2. Cash (Exception only)
   - Requires special approval
   - Maximum: 10,000,000 VND
   - Signed receipt required
```

### BR-7.2: Payment Validation
```
Before payment:
- Total amount ≤ approved budget
- Bank account verified
- No duplicate payments
- Previous month paid

Failed payment handling:
- Retry once automatically
- Manual review if failed
- Hold until issue resolved
```

---

## 📊 8. REPORTING RULES

### BR-8.1: Mandatory Reports
```
Monthly:
- Payroll summary
- Tax declaration (02/TT)
- Insurance declaration

Quarterly:
- Labor cost analysis
- Tax payment (01/TT)

Annual:
- Tax finalization (05/QTT)
- Insurance reconciliation
- Employee income certificates
```

### BR-8.2: Data Retention
```
Retention periods:
- Payroll records: 10 years
- Tax documents: 10 years
- Insurance records: 20 years
- Contracts: 5 years after termination
- Audit logs: 3 years
```

---

## 🔒 9. SECURITY & COMPLIANCE

### BR-9.1: Data Access
```
Role-based access:
- Employee: Own data only
- Manager: Department data
- HR: All employee data
- Accountant: Payroll data
- Admin: System configuration
```

### BR-9.2: Audit Requirements
```
Must log:
- All salary changes
- All payment approvals
- Tax calculation overrides
- System configuration changes
- User access and actions

Log format:
[Timestamp] [User] [Action] [Before] [After] [IP]
```

### BR-9.3: Compliance Checkpoints
```
Before payroll:
✓ Minimum wage compliance
✓ Insurance cap validation
✓ Tax calculation accuracy
✓ Overtime limit check

After payroll:
✓ Payment reconciliation
✓ Report submission
✓ Document archival
```

---

## ⚠️ 10. EXCEPTION HANDLING

### BR-10.1: Special Cases
```
Maternity leave:
- 6 months paid by social insurance
- Maintain seniority
- Return to same position

Military service:
- Unpaid leave
- Position guaranteed
- Seniority preserved

Death benefit:
- 2 months salary
- Insurance claim assistance
- Final settlement within 7 days
```

### BR-10.2: Error Handling
```
Calculation errors:
- Adjustment in next payroll
- Notification to employee
- Approval for amount > 1,000,000

System errors:
- Manual calculation backup
- Excel template ready
- Paper trail required
```

---

## 📈 11. PERFORMANCE METRICS

### BR-11.1: SLA Requirements
```
- Payroll accuracy: 99.9%
- On-time payment: 100%
- Report submission: 100%
- System availability: 99.5%
- Response time: <2 seconds
```

### BR-11.2: KPI Monitoring
```
Monthly KPIs:
- Payroll processing time
- Error rate
- Employee complaints
- Audit findings
- System performance
```

---

## 📝 REVISION HISTORY

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2024-10-02 | Initial business rules | PM Team |

---

**Document Status:** ✅ Approved
**Next Review:** Q1 2025
**Compliance:** Vietnam Labor Law 2019, Tax Law 2024