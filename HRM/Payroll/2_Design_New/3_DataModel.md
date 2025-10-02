# DATA MODEL (LOGICAL) - PAYROLL MANAGEMENT SYSTEM
## Detailed Logical Data Model

**Version:** 1.0
**Date:** 2024-10-02
**Status:** Final

---

## 🎯 OVERVIEW

This document presents the complete logical data model with all attributes, data types, constraints, and business logic. It bridges the conceptual ERD and physical database schema.

---

## 📊 ENTITY DETAILS

### 1. EMPLOYEE
```sql
EMPLOYEE {
    employee_id         VARCHAR(20)     PK  -- Format: EMP-YYYY-XXXX
    employee_code       VARCHAR(10)     UQ  NOT NULL
    first_name          VARCHAR(50)     NOT NULL
    last_name           VARCHAR(50)     NOT NULL
    middle_name         VARCHAR(50)     NULL
    full_name           VARCHAR(150)    NOT NULL -- Computed: last + middle + first
    date_of_birth       DATE            NOT NULL CHECK (age >= 18)
    gender              CHAR(1)         NOT NULL CHECK IN ('M','F','O')
    marital_status      VARCHAR(20)     DEFAULT 'Single'
    nationality         VARCHAR(50)     DEFAULT 'Vietnamese'

    -- Identification
    id_number           VARCHAR(20)     UQ  NOT NULL -- CCCD/CMND
    id_issue_date       DATE            NOT NULL
    id_issue_place      VARCHAR(100)    NOT NULL
    passport_number     VARCHAR(20)     NULL

    -- Contact
    phone_primary       VARCHAR(15)     NOT NULL
    phone_secondary     VARCHAR(15)     NULL
    email_personal      VARCHAR(100)    UQ  NOT NULL
    email_work          VARCHAR(100)    UQ  NOT NULL

    -- Address
    permanent_address   VARCHAR(255)    NOT NULL
    permanent_ward      VARCHAR(100)    NOT NULL
    permanent_district  VARCHAR(100)    NOT NULL
    permanent_city      VARCHAR(100)    NOT NULL
    current_address     VARCHAR(255)    NOT NULL
    current_ward        VARCHAR(100)    NOT NULL
    current_district    VARCHAR(100)    NOT NULL
    current_city        VARCHAR(100)    NOT NULL

    -- Employment
    department_id       VARCHAR(20)     FK  NOT NULL
    position_id         VARCHAR(20)     FK  NOT NULL
    manager_id          VARCHAR(20)     FK  NULL -- Self reference
    hire_date           DATE            NOT NULL
    probation_end_date  DATE            NULL

    -- Status
    employment_status   VARCHAR(20)     NOT NULL DEFAULT 'Active'
                                       CHECK IN ('Active','Inactive','Resigned','Terminated')
    work_status         VARCHAR(20)     DEFAULT 'Working'
                                       CHECK IN ('Working','Leave','Suspended')

    -- System
    user_account_id     VARCHAR(20)     FK  UNIQUE
    created_by          VARCHAR(50)     NOT NULL
    created_at          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
    updated_by          VARCHAR(50)     NULL
    updated_at          TIMESTAMP       NULL
    is_deleted          BOOLEAN         DEFAULT FALSE
    deleted_at          TIMESTAMP       NULL

    -- Computed fields
    age                 INTEGER         -- Computed: CURRENT_DATE - date_of_birth
    years_of_service    DECIMAL(3,1)    -- Computed: CURRENT_DATE - hire_date

    -- Business rules
    CONSTRAINT chk_age CHECK (date_of_birth <= CURRENT_DATE - INTERVAL '18 years')
    CONSTRAINT chk_email CHECK (email_personal != email_work)
}
```

---

### 2. CONTRACT
```sql
CONTRACT {
    contract_id         VARCHAR(20)     PK  -- Format: CTR-YYYY-XXXX
    contract_number     VARCHAR(50)     UQ  NOT NULL
    employee_id         VARCHAR(20)     FK  NOT NULL

    -- Contract details
    contract_type       VARCHAR(20)     NOT NULL
                                       CHECK IN ('Probation','Official','PartTime','Consultant')
    start_date          DATE            NOT NULL
    end_date            DATE            NULL -- NULL = Indefinite
    signed_date         DATE            NOT NULL

    -- Salary information
    salary_structure_id VARCHAR(20)     FK  NOT NULL
    base_salary         DECIMAL(15,2)   NOT NULL CHECK > 0
    salary_currency     CHAR(3)         DEFAULT 'VND'
    payment_frequency   VARCHAR(20)     DEFAULT 'Monthly'

    -- Insurance salary (for BHXH calculation)
    insurance_salary    DECIMAL(15,2)   NOT NULL CHECK > 0

    -- Working conditions
    working_hours       INTEGER         DEFAULT 8
    working_days        INTEGER         DEFAULT 22
    annual_leave_days   INTEGER         DEFAULT 12

    -- Probation
    probation_period    INTEGER         NULL -- In months
    probation_salary    DECIMAL(15,2)   NULL -- Usually 85% of base

    -- Status
    contract_status     VARCHAR(20)     NOT NULL DEFAULT 'Active'
                                       CHECK IN ('Draft','Active','Expired','Terminated','Renewed')
    termination_date    DATE            NULL
    termination_reason  VARCHAR(255)    NULL

    -- Approval
    prepared_by         VARCHAR(50)     NOT NULL
    reviewed_by         VARCHAR(50)     NULL
    approved_by         VARCHAR(50)     NULL
    approved_date       DATE            NULL

    -- System
    created_at          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
    updated_at          TIMESTAMP       NULL
    is_deleted          BOOLEAN         DEFAULT FALSE

    -- Business rules
    CONSTRAINT chk_dates CHECK (end_date IS NULL OR end_date > start_date)
    CONSTRAINT chk_probation CHECK (
        (contract_type = 'Probation' AND probation_period <= 2) OR
        (contract_type != 'Probation')
    )
    CONSTRAINT chk_salary CHECK (
        base_salary >= 3250000 -- Minimum wage Region IV
    )
}
```

---

### 3. DEPARTMENT
```sql
DEPARTMENT {
    department_id       VARCHAR(20)     PK  -- Format: DEPT-XXX
    department_code     VARCHAR(10)     UQ  NOT NULL
    department_name     VARCHAR(100)    NOT NULL

    -- Hierarchy
    parent_dept_id      VARCHAR(20)     FK  NULL -- Self reference
    dept_level          INTEGER         NOT NULL DEFAULT 1
    dept_path           VARCHAR(255)    NOT NULL -- e.g., /COMPANY/DEPT1/DEPT2

    -- Management
    manager_id          VARCHAR(20)     FK  NULL -- References EMPLOYEE
    cost_center         VARCHAR(20)     NOT NULL
    budget_amount       DECIMAL(15,2)   NULL

    -- Contact
    phone               VARCHAR(20)     NULL
    email               VARCHAR(100)    NULL
    location            VARCHAR(100)    NULL

    -- Status
    is_active           BOOLEAN         DEFAULT TRUE
    established_date    DATE            NOT NULL
    dissolved_date      DATE            NULL

    -- System
    created_at          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
    updated_at          TIMESTAMP       NULL

    -- Statistics (computed)
    employee_count      INTEGER         DEFAULT 0
    total_salary_cost   DECIMAL(15,2)   DEFAULT 0
}
```

---

### 4. POSITION
```sql
POSITION {
    position_id         VARCHAR(20)     PK  -- Format: POS-XXX
    position_code       VARCHAR(10)     UQ  NOT NULL
    position_title      VARCHAR(100)    NOT NULL
    position_level      VARCHAR(20)     NOT NULL
                                       CHECK IN ('Junior','Middle','Senior','Lead','Manager','Director')

    -- Salary range
    min_salary          DECIMAL(15,2)   NOT NULL CHECK > 0
    max_salary          DECIMAL(15,2)   NOT NULL

    -- Requirements
    min_experience      INTEGER         DEFAULT 0 -- In years
    required_education  VARCHAR(50)     DEFAULT 'Bachelor'
    required_skills     TEXT            NULL

    -- Job details
    job_description     TEXT            NULL
    responsibilities    TEXT            NULL

    -- Allowances
    position_allowance  DECIMAL(15,2)   DEFAULT 0

    -- Status
    is_active           BOOLEAN         DEFAULT TRUE
    created_at          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP

    CONSTRAINT chk_salary_range CHECK (max_salary >= min_salary)
}
```

---

### 5. PAYROLL
```sql
PAYROLL {
    payroll_id          VARCHAR(20)     PK  -- Format: PAY-YYYYMM-XXXXX
    employee_id         VARCHAR(20)     FK  NOT NULL
    contract_id         VARCHAR(20)     FK  NOT NULL
    payment_period_id   VARCHAR(20)     FK  NOT NULL

    -- Working days
    standard_days       DECIMAL(5,2)    DEFAULT 22
    actual_days         DECIMAL(5,2)    NOT NULL
    paid_leave_days     DECIMAL(5,2)    DEFAULT 0
    unpaid_leave_days   DECIMAL(5,2)    DEFAULT 0

    -- Overtime
    overtime_hours      DECIMAL(5,2)    DEFAULT 0
    overtime_amount     DECIMAL(15,2)   DEFAULT 0

    -- Earnings
    base_salary         DECIMAL(15,2)   NOT NULL
    position_allowance  DECIMAL(15,2)   DEFAULT 0
    meal_allowance      DECIMAL(15,2)   DEFAULT 730000
    transport_allowance DECIMAL(15,2)   DEFAULT 0
    phone_allowance     DECIMAL(15,2)   DEFAULT 0
    housing_allowance   DECIMAL(15,2)   DEFAULT 0
    other_allowances    DECIMAL(15,2)   DEFAULT 0
    bonus               DECIMAL(15,2)   DEFAULT 0
    gross_salary        DECIMAL(15,2)   NOT NULL -- Computed

    -- Deductions
    social_insurance    DECIMAL(15,2)   NOT NULL -- 8%
    health_insurance    DECIMAL(15,2)   NOT NULL -- 1.5%
    unemployment_ins    DECIMAL(15,2)   NOT NULL -- 1%
    personal_income_tax DECIMAL(15,2)   NOT NULL
    union_fee           DECIMAL(15,2)   DEFAULT 0
    advance_payment     DECIMAL(15,2)   DEFAULT 0
    other_deductions    DECIMAL(15,2)   DEFAULT 0
    total_deductions    DECIMAL(15,2)   NOT NULL -- Computed

    -- Net salary
    net_salary          DECIMAL(15,2)   NOT NULL -- Computed

    -- Employer contributions
    employer_social_ins DECIMAL(15,2)   NOT NULL -- 17.5%
    employer_health_ins DECIMAL(15,2)   NOT NULL -- 3%
    employer_unemploy   DECIMAL(15,2)   NOT NULL -- 1%
    employer_total      DECIMAL(15,2)   NOT NULL -- Computed

    -- Tax details
    taxable_income      DECIMAL(15,2)   NOT NULL
    personal_deduction  DECIMAL(15,2)   DEFAULT 11000000
    dependent_deduction DECIMAL(15,2)   DEFAULT 0
    tax_rate            DECIMAL(5,2)    NOT NULL -- Progressive rate

    -- Status
    payroll_status      VARCHAR(20)     NOT NULL DEFAULT 'Draft'
                                       CHECK IN ('Draft','Calculated','Reviewed','Approved','Paid','Cancelled')

    -- Approval workflow
    calculated_by       VARCHAR(50)     NULL
    calculated_at       TIMESTAMP       NULL
    reviewed_by         VARCHAR(50)     NULL
    reviewed_at         TIMESTAMP       NULL
    approved_by         VARCHAR(50)     NULL
    approved_at         TIMESTAMP       NULL
    paid_at             TIMESTAMP       NULL

    -- Notes
    notes               TEXT            NULL
    calculation_notes   TEXT            NULL

    -- System
    created_at          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
    updated_at          TIMESTAMP       NULL

    -- Computed formulas
    gross_salary = base_salary + position_allowance + meal_allowance + transport_allowance
                   + phone_allowance + housing_allowance + other_allowances + bonus

    total_deductions = social_insurance + health_insurance + unemployment_ins
                       + personal_income_tax + union_fee + advance_payment + other_deductions

    net_salary = gross_salary - total_deductions

    -- Business rules
    CONSTRAINT chk_working_days CHECK (actual_days <= standard_days + 5)
    CONSTRAINT chk_net_positive CHECK (net_salary >= 0)
    CONSTRAINT chk_tax_positive CHECK (personal_income_tax >= 0)
}
```

---

### 6. ATTENDANCE
```sql
ATTENDANCE {
    attendance_id       VARCHAR(20)     PK  -- Format: ATT-YYYYMMDD-XXXXX
    employee_id         VARCHAR(20)     FK  NOT NULL
    attendance_date     DATE            NOT NULL

    -- Time tracking
    check_in_time       TIME            NULL
    check_out_time      TIME            NULL
    work_shift_id       VARCHAR(20)     FK  NOT NULL
    actual_hours        DECIMAL(4,2)    DEFAULT 0

    -- Attendance type
    attendance_type     VARCHAR(20)     NOT NULL
                                       CHECK IN ('Present','Absent','Leave','Holiday','Weekend')
    leave_type_id       VARCHAR(20)     FK  NULL

    -- Overtime
    overtime_hours      DECIMAL(4,2)    DEFAULT 0
    overtime_type       VARCHAR(20)     NULL
                                       CHECK IN ('Regular','Weekend','Holiday','Night')
    overtime_approved   BOOLEAN         DEFAULT FALSE

    -- Location (if GPS tracking)
    check_in_location   VARCHAR(100)    NULL
    check_out_location  VARCHAR(100)    NULL

    -- Status
    status              VARCHAR(20)     DEFAULT 'Normal'
                                       CHECK IN ('Normal','Late','EarlyLeave','MissPunch')

    -- Notes
    notes               TEXT            NULL

    -- System
    created_at          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
    updated_at          TIMESTAMP       NULL

    -- Unique constraint
    CONSTRAINT uk_attendance UNIQUE (employee_id, attendance_date)

    -- Business rules
    CONSTRAINT chk_times CHECK (check_out_time IS NULL OR check_out_time > check_in_time)
    CONSTRAINT chk_hours CHECK (actual_hours >= 0 AND actual_hours <= 24)
}
```

---

### 7. LEAVE_REQUEST
```sql
LEAVE_REQUEST {
    leave_id            VARCHAR(20)     PK  -- Format: LV-YYYY-XXXXX
    employee_id         VARCHAR(20)     FK  NOT NULL
    leave_type_id       VARCHAR(20)     FK  NOT NULL

    -- Leave period
    start_date          DATE            NOT NULL
    end_date            DATE            NOT NULL
    total_days          DECIMAL(5,2)    NOT NULL -- Can be 0.5 for half day

    -- Request details
    reason              TEXT            NOT NULL
    contact_during_leave VARCHAR(100)   NULL

    -- Approval workflow
    status              VARCHAR(20)     NOT NULL DEFAULT 'Draft'
                                       CHECK IN ('Draft','Submitted','Approved','Rejected','Cancelled')
    submitted_at        TIMESTAMP       NULL
    approved_by         VARCHAR(20)     FK  NULL -- References EMPLOYEE
    approved_at         TIMESTAMP       NULL
    rejection_reason    TEXT            NULL

    -- Attachment
    attachment_url      VARCHAR(255)    NULL -- Medical certificate, etc.

    -- System
    created_at          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
    updated_at          TIMESTAMP       NULL

    -- Business rules
    CONSTRAINT chk_leave_dates CHECK (end_date >= start_date)
    CONSTRAINT chk_days CHECK (total_days > 0 AND total_days <= 30)
}
```

---

### 8. BANK_ACCOUNT
```sql
BANK_ACCOUNT {
    account_id          VARCHAR(20)     PK  -- Format: BNK-XXXXX
    employee_id         VARCHAR(20)     FK  UNIQUE NOT NULL

    -- Bank details
    bank_name           VARCHAR(100)    NOT NULL
    bank_code           VARCHAR(20)     NOT NULL
    branch_name         VARCHAR(100)    NOT NULL
    branch_code         VARCHAR(20)     NULL

    -- Account details
    account_number      VARCHAR(30)     NOT NULL
    account_name        VARCHAR(100)    NOT NULL -- Must match employee name
    account_type        VARCHAR(20)     DEFAULT 'Checking'
    swift_code          VARCHAR(20)     NULL

    -- Status
    is_primary          BOOLEAN         DEFAULT TRUE
    is_verified         BOOLEAN         DEFAULT FALSE
    verified_date       DATE            NULL

    -- System
    created_at          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
    updated_at          TIMESTAMP       NULL
}
```

---

### 9. DEPENDENT
```sql
DEPENDENT {
    dependent_id        VARCHAR(20)     PK  -- Format: DEP-XXXXX
    employee_id         VARCHAR(20)     FK  NOT NULL

    -- Personal information
    full_name           VARCHAR(150)    NOT NULL
    relationship        VARCHAR(20)     NOT NULL
                                       CHECK IN ('Spouse','Child','Parent','Sibling','Other')
    date_of_birth       DATE            NOT NULL
    gender              CHAR(1)         CHECK IN ('M','F')

    -- Identification
    id_number           VARCHAR(20)     NULL

    -- Tax deduction eligibility
    is_tax_dependent    BOOLEAN         DEFAULT TRUE
    tax_code            VARCHAR(20)     NULL
    effective_from      DATE            NOT NULL
    effective_to        DATE            NULL

    -- System
    created_at          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP

    -- Business rules
    CONSTRAINT chk_child_age CHECK (
        (relationship != 'Child') OR
        (date_of_birth > CURRENT_DATE - INTERVAL '22 years')
    )
}
```

---

### 10. PAYMENT_PERIOD
```sql
PAYMENT_PERIOD {
    period_id           VARCHAR(20)     PK  -- Format: PER-YYYYMM
    period_year         INTEGER         NOT NULL
    period_month        INTEGER         NOT NULL CHECK BETWEEN 1 AND 12

    -- Period dates
    start_date          DATE            NOT NULL
    end_date            DATE            NOT NULL
    payment_date        DATE            NOT NULL -- Usually 25th

    -- Status
    period_status       VARCHAR(20)     NOT NULL DEFAULT 'Open'
                                       CHECK IN ('Open','Processing','Closed','Archived')

    -- Statistics
    total_employees     INTEGER         DEFAULT 0
    total_gross         DECIMAL(15,2)   DEFAULT 0
    total_net           DECIMAL(15,2)   DEFAULT 0
    total_tax           DECIMAL(15,2)   DEFAULT 0

    -- Closing
    closed_by           VARCHAR(50)     NULL
    closed_at           TIMESTAMP       NULL

    -- System
    created_at          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP

    -- Unique constraint
    CONSTRAINT uk_period UNIQUE (period_year, period_month)
}
```

---

## 🔗 JUNCTION TABLES

### EMPLOYEE_POSITION (Many-to-Many)
```sql
EMPLOYEE_POSITION {
    employee_id         VARCHAR(20)     FK  NOT NULL
    position_id         VARCHAR(20)     FK  NOT NULL
    start_date          DATE            NOT NULL
    end_date            DATE            NULL
    is_primary          BOOLEAN         DEFAULT TRUE

    PRIMARY KEY (employee_id, position_id, start_date)
}
```

---

## 📋 LOOKUP TABLES

### SALARY_COMPONENT
```sql
SALARY_COMPONENT {
    component_id        VARCHAR(20)     PK
    component_code      VARCHAR(10)     UQ  NOT NULL
    component_name      VARCHAR(100)    NOT NULL
    component_type      VARCHAR(20)     NOT NULL
                                       CHECK IN ('Earning','Deduction','Contribution')
    calculation_type    VARCHAR(20)     NOT NULL
                                       CHECK IN ('Fixed','Percentage','Formula')
    default_value       DECIMAL(15,2)   DEFAULT 0
    is_taxable          BOOLEAN         DEFAULT TRUE
    is_active           BOOLEAN         DEFAULT TRUE
}
```

### TAX_RATE
```sql
TAX_RATE {
    rate_id             INTEGER         PK
    min_income          DECIMAL(15,2)   NOT NULL
    max_income          DECIMAL(15,2)   NULL -- NULL = No limit
    tax_rate            DECIMAL(5,2)    NOT NULL
    quick_deduction     DECIMAL(15,2)   DEFAULT 0 -- For quick calculation
    effective_date      DATE            NOT NULL
}
```

---

## 📊 CALCULATED FIELDS & FORMULAS

### Gross Salary Calculation
```
gross_salary = base_salary + SUM(allowances) + overtime + bonus
```

### Tax Calculation
```
insurance_base = MIN(gross_salary, 20 * minimum_wage)
taxable_income = gross_salary - (insurance_base * 0.105) - personal_deduction - dependent_deduction
tax = PROGRESSIVE_RATE(taxable_income)
```

### Net Salary Calculation
```
net_salary = gross_salary - social_insurance - health_insurance - unemployment_insurance - tax - other_deductions
```

---

## 🔒 CONSTRAINTS & BUSINESS RULES

### Data Integrity
1. **Referential Integrity**: All foreign keys enforced
2. **Check Constraints**: Business rules embedded
3. **Unique Constraints**: No duplicate records
4. **NOT NULL**: Required fields enforced

### Business Rules
1. **One Active Contract**: Only one active contract per employee
2. **Salary Minimum**: Base salary ≥ regional minimum wage
3. **Tax Dependent Limit**: Maximum 4 dependents for tax
4. **Overtime Limit**: Maximum 200 hours/year
5. **Leave Balance**: Cannot exceed allocated days

---

## 🗄️ AUDIT COLUMNS (Standard for all tables)

```sql
created_by          VARCHAR(50)     NOT NULL
created_at          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
updated_by          VARCHAR(50)     NULL
updated_at          TIMESTAMP       NULL
is_deleted          BOOLEAN         DEFAULT FALSE
deleted_at          TIMESTAMP       NULL
deleted_by          VARCHAR(50)     NULL
```

---

**Document Status:** ✅ Approved
**Next Document:** 4_DatabaseSchema.md (Physical Implementation)