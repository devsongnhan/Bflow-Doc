# DATABASE SCHEMA (PHYSICAL) - PAYROLL MANAGEMENT SYSTEM
## PostgreSQL Implementation Scripts

**Version:** 1.0
**Date:** 2024-10-02
**Database:** PostgreSQL 15
**Status:** Final

---

## 🎯 DATABASE CONFIGURATION

```sql
-- Create database
CREATE DATABASE payroll_db
    WITH
    OWNER = payroll_admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = 100;

-- Create schema
CREATE SCHEMA IF NOT EXISTS payroll;
SET search_path TO payroll, public;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "btree_gist";
```

---

## 📊 CREATE TABLES

### 1. DEPARTMENTS TABLE
```sql
CREATE TABLE departments (
    department_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_code VARCHAR(10) UNIQUE NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    parent_dept_id UUID REFERENCES departments(department_id),
    manager_id UUID,
    cost_center VARCHAR(20) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    location VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,

    CONSTRAINT chk_dept_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_dept_parent ON departments(parent_dept_id);
CREATE INDEX idx_dept_active ON departments(is_active);
CREATE INDEX idx_dept_manager ON departments(manager_id);
```

### 2. POSITIONS TABLE
```sql
CREATE TABLE positions (
    position_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    position_code VARCHAR(10) UNIQUE NOT NULL,
    position_title VARCHAR(100) NOT NULL,
    position_level VARCHAR(20) NOT NULL,
    min_salary DECIMAL(15,2) NOT NULL CHECK (min_salary > 0),
    max_salary DECIMAL(15,2) NOT NULL,
    position_allowance DECIMAL(15,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_salary_range CHECK (max_salary >= min_salary),
    CONSTRAINT chk_position_level CHECK (
        position_level IN ('Junior','Middle','Senior','Lead','Manager','Director')
    )
);

CREATE INDEX idx_position_active ON positions(is_active);
CREATE INDEX idx_position_level ON positions(position_level);
```

### 3. EMPLOYEES TABLE
```sql
CREATE TABLE employees (
    employee_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_code VARCHAR(10) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    full_name VARCHAR(150) GENERATED ALWAYS AS
        (last_name || ' ' || COALESCE(middle_name || ' ', '') || first_name) STORED,

    -- Personal info
    date_of_birth DATE NOT NULL,
    gender CHAR(1) NOT NULL CHECK (gender IN ('M','F','O')),
    marital_status VARCHAR(20) DEFAULT 'Single',
    id_number VARCHAR(20) UNIQUE NOT NULL,

    -- Contact
    phone_primary VARCHAR(15) NOT NULL,
    email_personal VARCHAR(100) UNIQUE NOT NULL,
    email_work VARCHAR(100) UNIQUE NOT NULL,

    -- Address (JSON for flexibility)
    permanent_address JSONB NOT NULL,
    current_address JSONB NOT NULL,

    -- Employment
    department_id UUID NOT NULL REFERENCES departments(department_id),
    position_id UUID NOT NULL REFERENCES positions(position_id),
    manager_id UUID REFERENCES employees(employee_id),
    hire_date DATE NOT NULL,

    -- Status
    employment_status VARCHAR(20) NOT NULL DEFAULT 'Active',

    -- Audit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,

    CONSTRAINT chk_age CHECK (date_of_birth <= CURRENT_DATE - INTERVAL '18 years'),
    CONSTRAINT chk_employment_status CHECK (
        employment_status IN ('Active','Inactive','Resigned','Terminated')
    )
);

-- Indexes for performance
CREATE INDEX idx_emp_department ON employees(department_id);
CREATE INDEX idx_emp_position ON employees(position_id);
CREATE INDEX idx_emp_manager ON employees(manager_id);
CREATE INDEX idx_emp_status ON employees(employment_status);
CREATE INDEX idx_emp_hire_date ON employees(hire_date);
CREATE INDEX idx_emp_fullname ON employees(full_name);
CREATE INDEX idx_emp_email ON employees(email_work);
CREATE INDEX idx_emp_deleted ON employees(is_deleted) WHERE is_deleted = FALSE;

-- Full text search
CREATE INDEX idx_emp_search ON employees
    USING gin(to_tsvector('english', full_name || ' ' || employee_code));
```

### 4. SALARY_STRUCTURES TABLE
```sql
CREATE TABLE salary_structures (
    structure_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    structure_name VARCHAR(100) NOT NULL,
    structure_code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE salary_components (
    component_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    structure_id UUID NOT NULL REFERENCES salary_structures(structure_id),
    component_code VARCHAR(20) NOT NULL,
    component_name VARCHAR(100) NOT NULL,
    component_type VARCHAR(20) NOT NULL,
    calculation_type VARCHAR(20) NOT NULL,
    default_value DECIMAL(15,2) DEFAULT 0,
    formula TEXT,
    is_taxable BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,

    CONSTRAINT chk_component_type CHECK (
        component_type IN ('Earning','Deduction','Contribution')
    ),
    CONSTRAINT chk_calc_type CHECK (
        calculation_type IN ('Fixed','Percentage','Formula')
    )
);

CREATE INDEX idx_salary_comp_structure ON salary_components(structure_id);
CREATE INDEX idx_salary_comp_active ON salary_components(is_active);
```

### 5. CONTRACTS TABLE
```sql
CREATE TABLE contracts (
    contract_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_number VARCHAR(50) UNIQUE NOT NULL,
    employee_id UUID NOT NULL REFERENCES employees(employee_id),
    contract_type VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    base_salary DECIMAL(15,2) NOT NULL CHECK (base_salary >= 3250000),
    insurance_salary DECIMAL(15,2) NOT NULL CHECK (insurance_salary > 0),
    salary_structure_id UUID NOT NULL REFERENCES salary_structures(structure_id),
    working_hours INTEGER DEFAULT 8,
    working_days INTEGER DEFAULT 22,
    annual_leave_days INTEGER DEFAULT 12,
    contract_status VARCHAR(20) NOT NULL DEFAULT 'Active',
    approved_by UUID REFERENCES employees(employee_id),
    approved_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,

    CONSTRAINT chk_contract_type CHECK (
        contract_type IN ('Probation','Official','PartTime','Consultant')
    ),
    CONSTRAINT chk_contract_dates CHECK (end_date IS NULL OR end_date > start_date),
    CONSTRAINT chk_contract_status CHECK (
        contract_status IN ('Draft','Active','Expired','Terminated','Renewed')
    ),

    -- Ensure only one active contract per employee
    EXCLUDE USING gist (
        employee_id WITH =,
        daterange(start_date, COALESCE(end_date, 'infinity')) WITH &&
    ) WHERE (contract_status = 'Active' AND is_deleted = FALSE)
);

CREATE INDEX idx_contract_employee ON contracts(employee_id);
CREATE INDEX idx_contract_status ON contracts(contract_status);
CREATE INDEX idx_contract_dates ON contracts(start_date, end_date);
```

### 6. PAYMENT_PERIODS TABLE
```sql
CREATE TABLE payment_periods (
    period_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    period_year INTEGER NOT NULL,
    period_month INTEGER NOT NULL CHECK (period_month BETWEEN 1 AND 12),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    payment_date DATE NOT NULL,
    period_status VARCHAR(20) NOT NULL DEFAULT 'Open',
    closed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_period UNIQUE (period_year, period_month),
    CONSTRAINT chk_period_status CHECK (
        period_status IN ('Open','Processing','Closed','Archived')
    )
);

CREATE INDEX idx_period_status ON payment_periods(period_status);
CREATE INDEX idx_period_dates ON payment_periods(period_year, period_month);
```

### 7. PAYROLLS TABLE
```sql
CREATE TABLE payrolls (
    payroll_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(employee_id),
    contract_id UUID NOT NULL REFERENCES contracts(contract_id),
    period_id UUID NOT NULL REFERENCES payment_periods(period_id),

    -- Working days
    standard_days DECIMAL(5,2) DEFAULT 22,
    actual_days DECIMAL(5,2) NOT NULL,
    paid_leave_days DECIMAL(5,2) DEFAULT 0,
    unpaid_leave_days DECIMAL(5,2) DEFAULT 0,

    -- Earnings (stored as JSONB for flexibility)
    earnings JSONB NOT NULL DEFAULT '{}',
    gross_salary DECIMAL(15,2) NOT NULL,

    -- Deductions (stored as JSONB)
    deductions JSONB NOT NULL DEFAULT '{}',
    total_deductions DECIMAL(15,2) NOT NULL,

    -- Insurance
    social_insurance DECIMAL(15,2) NOT NULL,
    health_insurance DECIMAL(15,2) NOT NULL,
    unemployment_insurance DECIMAL(15,2) NOT NULL,

    -- Tax
    taxable_income DECIMAL(15,2) NOT NULL,
    personal_deduction DECIMAL(15,2) DEFAULT 11000000,
    dependent_deduction DECIMAL(15,2) DEFAULT 0,
    income_tax DECIMAL(15,2) NOT NULL,

    -- Net
    net_salary DECIMAL(15,2) NOT NULL,

    -- Status
    payroll_status VARCHAR(20) NOT NULL DEFAULT 'Draft',

    -- Audit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    calculated_at TIMESTAMP,
    approved_at TIMESTAMP,
    approved_by UUID REFERENCES employees(employee_id),
    paid_at TIMESTAMP,

    CONSTRAINT uk_payroll_period UNIQUE (employee_id, period_id),
    CONSTRAINT chk_payroll_status CHECK (
        payroll_status IN ('Draft','Calculated','Reviewed','Approved','Paid','Cancelled')
    ),
    CONSTRAINT chk_net_positive CHECK (net_salary >= 0)
);

-- Performance indexes
CREATE INDEX idx_payroll_employee ON payrolls(employee_id);
CREATE INDEX idx_payroll_period ON payrolls(period_id);
CREATE INDEX idx_payroll_status ON payrolls(payroll_status);
CREATE INDEX idx_payroll_approved ON payrolls(approved_at) WHERE approved_at IS NOT NULL;

-- Partial indexes for common queries
CREATE INDEX idx_payroll_unpaid ON payrolls(period_id)
    WHERE payroll_status IN ('Approved') AND paid_at IS NULL;
```

### 8. ATTENDANCE TABLE
```sql
CREATE TABLE attendance (
    attendance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(employee_id),
    attendance_date DATE NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    actual_hours DECIMAL(4,2) DEFAULT 0,
    overtime_hours DECIMAL(4,2) DEFAULT 0,
    attendance_type VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'Normal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_attendance UNIQUE (employee_id, attendance_date),
    CONSTRAINT chk_attendance_type CHECK (
        attendance_type IN ('Present','Absent','Leave','Holiday','Weekend')
    ),
    CONSTRAINT chk_times CHECK (
        check_out_time IS NULL OR check_out_time > check_in_time
    )
);

-- Partitioning by month for large datasets
CREATE INDEX idx_attendance_employee_date ON attendance(employee_id, attendance_date);
CREATE INDEX idx_attendance_date ON attendance(attendance_date);
CREATE INDEX idx_attendance_type ON attendance(attendance_type);
```

### 9. BANK_ACCOUNTS TABLE
```sql
CREATE TABLE bank_accounts (
    account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID UNIQUE NOT NULL REFERENCES employees(employee_id),
    bank_name VARCHAR(100) NOT NULL,
    bank_code VARCHAR(20) NOT NULL,
    branch_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(30) NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE INDEX idx_bank_employee ON bank_accounts(employee_id);
```

### 10. DEPENDENTS TABLE
```sql
CREATE TABLE dependents (
    dependent_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(employee_id),
    full_name VARCHAR(150) NOT NULL,
    relationship VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    is_tax_dependent BOOLEAN DEFAULT TRUE,
    effective_from DATE NOT NULL,
    effective_to DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_relationship CHECK (
        relationship IN ('Spouse','Child','Parent','Sibling','Other')
    )
);

CREATE INDEX idx_dependent_employee ON dependents(employee_id);
CREATE INDEX idx_dependent_tax ON dependents(employee_id)
    WHERE is_tax_dependent = TRUE AND effective_to IS NULL;
```

---

## 🔄 STORED PROCEDURES

### Calculate Gross Salary
```sql
CREATE OR REPLACE FUNCTION calculate_gross_salary(
    p_employee_id UUID,
    p_period_id UUID
) RETURNS DECIMAL AS $$
DECLARE
    v_gross DECIMAL(15,2);
BEGIN
    SELECT
        base_salary +
        COALESCE((earnings->>'position_allowance')::DECIMAL, 0) +
        COALESCE((earnings->>'meal_allowance')::DECIMAL, 730000) +
        COALESCE((earnings->>'transport_allowance')::DECIMAL, 0) +
        COALESCE((earnings->>'overtime')::DECIMAL, 0) +
        COALESCE((earnings->>'bonus')::DECIMAL, 0)
    INTO v_gross
    FROM payrolls
    WHERE employee_id = p_employee_id AND period_id = p_period_id;

    RETURN v_gross;
END;
$$ LANGUAGE plpgsql;
```

### Calculate Tax
```sql
CREATE OR REPLACE FUNCTION calculate_income_tax(
    p_taxable_income DECIMAL
) RETURNS DECIMAL AS $$
DECLARE
    v_tax DECIMAL(15,2) := 0;
BEGIN
    IF p_taxable_income <= 0 THEN
        RETURN 0;
    ELSIF p_taxable_income <= 5000000 THEN
        v_tax := p_taxable_income * 0.05;
    ELSIF p_taxable_income <= 10000000 THEN
        v_tax := 250000 + (p_taxable_income - 5000000) * 0.10;
    ELSIF p_taxable_income <= 18000000 THEN
        v_tax := 750000 + (p_taxable_income - 10000000) * 0.15;
    ELSIF p_taxable_income <= 32000000 THEN
        v_tax := 1950000 + (p_taxable_income - 18000000) * 0.20;
    ELSIF p_taxable_income <= 52000000 THEN
        v_tax := 4750000 + (p_taxable_income - 32000000) * 0.25;
    ELSIF p_taxable_income <= 80000000 THEN
        v_tax := 9750000 + (p_taxable_income - 52000000) * 0.30;
    ELSE
        v_tax := 18150000 + (p_taxable_income - 80000000) * 0.35;
    END IF;

    RETURN v_tax;
END;
$$ LANGUAGE plpgsql;
```

---

## 🎯 TRIGGERS

### Update Timestamp Trigger
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON employees
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON contracts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_payrolls_updated_at BEFORE UPDATE ON payrolls
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### Audit Trail Trigger
```sql
CREATE TABLE audit_log (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(50) NOT NULL,
    operation VARCHAR(10) NOT NULL,
    user_id VARCHAR(50),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    old_data JSONB,
    new_data JSONB
);

CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_log(table_name, operation, user_id, old_data, new_data)
    VALUES (
        TG_TABLE_NAME,
        TG_OP,
        current_user,
        to_jsonb(OLD),
        to_jsonb(NEW)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to sensitive tables
CREATE TRIGGER audit_payrolls AFTER INSERT OR UPDATE OR DELETE ON payrolls
    FOR EACH ROW EXECUTE FUNCTION audit_trigger();
```

---

## 📊 VIEWS

### Employee Summary View
```sql
CREATE VIEW v_employee_summary AS
SELECT
    e.employee_id,
    e.employee_code,
    e.full_name,
    d.department_name,
    p.position_title,
    c.base_salary,
    c.contract_type,
    c.start_date as contract_start,
    e.employment_status
FROM employees e
JOIN departments d ON e.department_id = d.department_id
JOIN positions p ON e.position_id = p.position_id
LEFT JOIN contracts c ON e.employee_id = c.employee_id
    AND c.contract_status = 'Active';
```

### Payroll Summary View
```sql
CREATE VIEW v_payroll_summary AS
SELECT
    p.period_year,
    p.period_month,
    COUNT(DISTINCT pr.employee_id) as employee_count,
    SUM(pr.gross_salary) as total_gross,
    SUM(pr.income_tax) as total_tax,
    SUM(pr.net_salary) as total_net,
    p.period_status
FROM payment_periods p
LEFT JOIN payrolls pr ON p.period_id = pr.period_id
GROUP BY p.period_id, p.period_year, p.period_month, p.period_status;
```

---

## 🔒 SECURITY

### Row Level Security
```sql
-- Enable RLS
ALTER TABLE payrolls ENABLE ROW LEVEL SECURITY;

-- Policy for employees to see own payroll
CREATE POLICY employee_own_payroll ON payrolls
    FOR SELECT
    USING (employee_id = current_setting('app.current_employee_id')::UUID);

-- Policy for HR to see all
CREATE POLICY hr_all_payroll ON payrolls
    FOR ALL
    USING (current_setting('app.user_role') = 'HR');
```

---

## 🎯 PERFORMANCE OPTIMIZATION

### Table Partitioning (for large datasets)
```sql
-- Partition attendance by month
CREATE TABLE attendance_2024_10 PARTITION OF attendance
    FOR VALUES FROM ('2024-10-01') TO ('2024-11-01');

CREATE TABLE attendance_2024_11 PARTITION OF attendance
    FOR VALUES FROM ('2024-11-01') TO ('2024-12-01');
```

### Materialized Views for Reports
```sql
CREATE MATERIALIZED VIEW mv_monthly_payroll_stats AS
SELECT
    period_year,
    period_month,
    department_id,
    COUNT(*) as emp_count,
    AVG(gross_salary) as avg_gross,
    SUM(net_salary) as total_net
FROM payrolls p
JOIN employees e ON p.employee_id = e.employee_id
GROUP BY period_year, period_month, department_id;

-- Refresh monthly
CREATE INDEX idx_mv_payroll_period ON mv_monthly_payroll_stats(period_year, period_month);
```

---

## 📦 BACKUP & MAINTENANCE

```sql
-- Backup script
pg_dump -h localhost -U payroll_admin -d payroll_db -f backup_$(date +%Y%m%d).sql

-- Vacuum and analyze
VACUUM ANALYZE employees;
VACUUM ANALYZE payrolls;
VACUUM ANALYZE attendance;

-- Reindex
REINDEX TABLE employees;
REINDEX TABLE payrolls;
```

---

**Document Status:** ✅ Complete
**Database:** PostgreSQL 15
**Next Document:** 5_APISpec.md