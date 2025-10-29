# Database Design: Physical Schema & Implementation

**Created:** 2024-10-29
**Status:** Draft - Ready for Review
**Version:** 1.0

---

## 1. Introduction

Tài liệu này mô tả thiết kế cơ sở dữ liệu (Database Design) cho tính năng khởi tạo số dư đầu kỳ, bao gồm:
- Physical database schema
- Table definitions with data types
- Indexes & constraints
- Partitioning strategy
- Backup & recovery strategy

---

## 2. Database Tables & Schemas

### 2.1 Table: OpeningBalance

**Purpose:** Store opening balance entries (header/summary)

```sql
CREATE TABLE [dbo].[OpeningBalance] (
    [OBEntryId] [uniqueidentifier] NOT NULL PRIMARY KEY,
    [CompanyId] [int] NOT NULL,
    [PeriodId] [nvarchar](10) NOT NULL,
    [CreatedById] [int] NOT NULL,
    [ApprovedById] [int] NULL,
    [ConfirmedById] [int] NULL,
    [LastModifiedById] [int] NOT NULL,

    [Status] [nvarchar](20) NOT NULL, -- DRAFT, PENDING, APPROVED, CONFIRMED
    [TotalDebit] [decimal](18, 2) NOT NULL DEFAULT 0,
    [TotalCredit] [decimal](18, 2) NOT NULL DEFAULT 0,
    [IsBalanced] [bit] NOT NULL DEFAULT 0,

    [Remarks] [nvarchar](2000) NULL,

    [CreatedDateTime] [datetime2](7) NOT NULL DEFAULT GETUTCDATE(),
    [ApprovedDateTime] [datetime2](7) NULL,
    [ConfirmedDateTime] [datetime2](7) NULL,
    [LastModifiedDateTime] [datetime2](7) NOT NULL DEFAULT GETUTCDATE(),

    -- Foreign Keys
    CONSTRAINT [FK_OB_Company] FOREIGN KEY ([CompanyId])
        REFERENCES [dbo].[Company]([CompanyId]) ON DELETE RESTRICT,
    CONSTRAINT [FK_OB_Period] FOREIGN KEY ([PeriodId])
        REFERENCES [dbo].[Period]([PeriodId]) ON DELETE RESTRICT,
    CONSTRAINT [FK_OB_CreatedBy] FOREIGN KEY ([CreatedById])
        REFERENCES [dbo].[User]([UserId]) ON DELETE RESTRICT,
    CONSTRAINT [FK_OB_ApprovedBy] FOREIGN KEY ([ApprovedById])
        REFERENCES [dbo].[User]([UserId]) ON DELETE SET NULL,
    CONSTRAINT [FK_OB_ConfirmedBy] FOREIGN KEY ([ConfirmedById])
        REFERENCES [dbo].[User]([UserId]) ON DELETE SET NULL,
    CONSTRAINT [FK_OB_LastModBy] FOREIGN KEY ([LastModifiedById])
        REFERENCES [dbo].[User]([UserId]) ON DELETE RESTRICT,

    -- Unique constraint - only one OB per company per period
    CONSTRAINT [UQ_OB_CompanyPeriod] UNIQUE ([CompanyId], [PeriodId]),

    -- Check constraints
    CONSTRAINT [CK_OB_TotalDebit] CHECK ([TotalDebit] >= 0),
    CONSTRAINT [CK_OB_TotalCredit] CHECK ([TotalCredit] >= 0),
    CONSTRAINT [CK_OB_Status] CHECK ([Status] IN ('DRAFT', 'PENDING', 'APPROVED', 'CONFIRMED'))
);

-- Indexes
CREATE NONCLUSTERED INDEX [IX_OB_CompanyId] ON [dbo].[OpeningBalance] ([CompanyId]);
CREATE NONCLUSTERED INDEX [IX_OB_PeriodId] ON [dbo].[OpeningBalance] ([PeriodId]);
CREATE NONCLUSTERED INDEX [IX_OB_Status] ON [dbo].[OpeningBalance] ([Status], [CreatedDateTime] DESC);
CREATE NONCLUSTERED INDEX [IX_OB_CreatedDate] ON [dbo].[OpeningBalance] ([CreatedDateTime] DESC);
CREATE NONCLUSTERED INDEX [IX_OB_Company_Status] ON [dbo].[OpeningBalance] ([CompanyId], [Status]);
```

**Data Type Rationale:**
- `[uniqueidentifier]`: Better for distributed systems, security, non-sequential
- `[decimal](18,2)`: Financial amounts, prevents floating-point errors
- `[nvarchar]`: Unicode support (Vietnamese characters)
- `[datetime2](7)`: Millisecond precision for audit trail
- `[bit]`: Boolean for IsBalanced (space efficient)

---

### 2.2 Table: OpeningBalanceLine

**Purpose:** Store individual account entries (detail rows)

```sql
CREATE TABLE [dbo].[OpeningBalanceLine] (
    [OBLineId] [uniqueidentifier] NOT NULL PRIMARY KEY,
    [OBEntryId] [uniqueidentifier] NOT NULL,
    [AccountId] [int] NOT NULL,

    [Amount] [decimal](18, 2) NOT NULL,
    [DebitCredit] [char](1) NOT NULL, -- 'D' or 'C'
    [Description] [nvarchar](500) NULL,
    [LineNumber] [int] NOT NULL,

    [CreatedDateTime] [datetime2](7) NOT NULL DEFAULT GETUTCDATE(),
    [LastModifiedDateTime] [datetime2](7) NOT NULL DEFAULT GETUTCDATE(),

    -- Foreign Keys
    CONSTRAINT [FK_OBLine_OBEntry] FOREIGN KEY ([OBEntryId])
        REFERENCES [dbo].[OpeningBalance]([OBEntryId]) ON DELETE CASCADE,
    CONSTRAINT [FK_OBLine_Account] FOREIGN KEY ([AccountId])
        REFERENCES [dbo].[ChartOfAccounts]([AccountId]) ON DELETE RESTRICT,

    -- Unique constraint - no duplicate account per entry
    CONSTRAINT [UQ_OBLine_EntryAccount] UNIQUE ([OBEntryId], [AccountId]),

    -- Check constraints
    CONSTRAINT [CK_OBLine_Amount] CHECK ([Amount] > 0),
    CONSTRAINT [CK_OBLine_DebitCredit] CHECK ([DebitCredit] IN ('D', 'C'))
);

-- Indexes
CREATE NONCLUSTERED INDEX [IX_OBLine_OBEntryId] ON [dbo].[OpeningBalanceLine] ([OBEntryId]);
CREATE NONCLUSTERED INDEX [IX_OBLine_AccountId] ON [dbo].[OpeningBalanceLine] ([AccountId]);
CREATE NONCLUSTERED INDEX [IX_OBLine_EntryLineNum] ON [dbo].[OpeningBalanceLine] ([OBEntryId], [LineNumber]);
```

---

### 2.3 Table: AuditLog

**Purpose:** Immutable audit trail of all changes

```sql
CREATE TABLE [dbo].[AuditLog] (
    [AuditLogId] [uniqueidentifier] NOT NULL PRIMARY KEY,
    [OBEntryId] [uniqueidentifier] NOT NULL,
    [UserId] [int] NOT NULL,

    [Action] [nvarchar](20) NOT NULL, -- CREATE, EDIT, DELETE, APPROVE, REJECT, CONFIRM
    [Timestamp] [datetime2](7) NOT NULL DEFAULT GETUTCDATE(),

    [OldValue] [nvarchar](max) NULL, -- JSON serialized
    [NewValue] [nvarchar](max) NULL, -- JSON serialized
    [Description] [nvarchar](500) NULL,
    [IPAddress] [nvarchar](45) NULL,

    -- Foreign Keys
    CONSTRAINT [FK_Audit_OBEntry] FOREIGN KEY ([OBEntryId])
        REFERENCES [dbo].[OpeningBalance]([OBEntryId]) ON DELETE CASCADE,
    CONSTRAINT [FK_Audit_User] FOREIGN KEY ([UserId])
        REFERENCES [dbo].[User]([UserId]) ON DELETE RESTRICT,

    -- Audit log is READ-ONLY, enforce via permissions
    -- Check constraint
    CONSTRAINT [CK_Audit_Action] CHECK ([Action] IN
        ('CREATE', 'EDIT', 'DELETE', 'APPROVE', 'REJECT', 'CONFIRM', 'REQUEST_CHANGE'))
);

-- Indexes for audit trail queries
CREATE NONCLUSTERED INDEX [IX_Audit_OBEntryId] ON [dbo].[AuditLog] ([OBEntryId]);
CREATE NONCLUSTERED INDEX [IX_Audit_Timestamp] ON [dbo].[AuditLog] ([Timestamp] DESC);
CREATE NONCLUSTERED INDEX [IX_Audit_UserId] ON [dbo].[AuditLog] ([UserId]);
CREATE NONCLUSTERED INDEX [IX_Audit_Action] ON [dbo].[AuditLog] ([Action]);
```

---

### 2.4 Table: ChartOfAccounts (Reference - Existing)

**Purpose:** Master data for accounting accounts

```sql
CREATE TABLE [dbo].[ChartOfAccounts] (
    [AccountId] [int] NOT NULL PRIMARY KEY IDENTITY(1,1),
    [CompanyId] [int] NOT NULL,

    [AccountCode] [nvarchar](20) NOT NULL,
    [AccountName] [nvarchar](255) NOT NULL,
    [AccountType] [nvarchar](20) NOT NULL, -- ASSET, LIABILITY, EQUITY, etc.
    [Status] [nvarchar](20) NOT NULL DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, ARCHIVED

    [Level] [int] NULL, -- Hierarchy level
    [ParentAccountId] [int] NULL,

    [CurrentBalance] [decimal](18, 2) NOT NULL DEFAULT 0,
    [OpeningBalance] [decimal](18, 2) NOT NULL DEFAULT 0,

    [CreatedDateTime] [datetime2](7) NOT NULL DEFAULT GETUTCDATE(),
    [LastModifiedDateTime] [datetime2](7) NOT NULL DEFAULT GETUTCDATE(),

    -- Foreign Keys
    CONSTRAINT [FK_COA_Company] FOREIGN KEY ([CompanyId])
        REFERENCES [dbo].[Company]([CompanyId]),
    CONSTRAINT [FK_COA_Parent] FOREIGN KEY ([ParentAccountId])
        REFERENCES [dbo].[ChartOfAccounts]([AccountId]),

    -- Unique constraint per company
    CONSTRAINT [UQ_COA_Code] UNIQUE ([CompanyId], [AccountCode])
);

-- Indexes
CREATE NONCLUSTERED INDEX [IX_COA_CompanyId] ON [dbo].[ChartOfAccounts] ([CompanyId]);
CREATE NONCLUSTERED INDEX [IX_COA_Status] ON [dbo].[ChartOfAccounts] ([Status]);
```

---

## 3. Stored Procedures

### 3.1 SP: CalculateOpeningBalanceTotals

**Purpose:** Calculate & validate debit/credit totals

```sql
CREATE PROCEDURE [dbo].[sp_CalculateOpeningBalanceTotals]
    @OBEntryId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalDebit DECIMAL(18,2) = 0;
    DECLARE @TotalCredit DECIMAL(18,2) = 0;
    DECLARE @IsBalanced BIT = 0;

    -- Calculate totals
    SELECT
        @TotalDebit = SUM(CASE WHEN DebitCredit = 'D' THEN Amount ELSE 0 END),
        @TotalCredit = SUM(CASE WHEN DebitCredit = 'C' THEN Amount ELSE 0 END)
    FROM [dbo].[OpeningBalanceLine]
    WHERE [OBEntryId] = @OBEntryId;

    -- Check if balanced
    SET @IsBalanced = CASE WHEN @TotalDebit = @TotalCredit THEN 1 ELSE 0 END;

    -- Update entry
    UPDATE [dbo].[OpeningBalance]
    SET
        [TotalDebit] = @TotalDebit,
        [TotalCredit] = @TotalCredit,
        [IsBalanced] = @IsBalanced,
        [LastModifiedDateTime] = GETUTCDATE()
    WHERE [OBEntryId] = @OBEntryId;

    -- Return result
    SELECT @TotalDebit AS TotalDebit, @TotalCredit AS TotalCredit, @IsBalanced AS IsBalanced;
END;
```

### 3.2 SP: UpdateAccountBalance

**Purpose:** Update account balance when OB is confirmed

```sql
CREATE PROCEDURE [dbo].[sp_UpdateAccountBalance]
    @OBEntryId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Update account balances for each line
        UPDATE [dbo].[ChartOfAccounts]
        SET [OpeningBalance] = [OpeningBalance] +
            CASE
                WHEN [DebitCredit] = 'D' THEN [obl].[Amount]
                WHEN [DebitCredit] = 'C' THEN -[obl].[Amount]
            END,
            [CurrentBalance] = [CurrentBalance] +
            CASE
                WHEN [obl].[DebitCredit] = 'D' THEN [obl].[Amount]
                WHEN [obl].[DebitCredit] = 'C' THEN -[obl].[Amount]
            END,
            [LastModifiedDateTime] = GETUTCDATE()
        FROM [dbo].[ChartOfAccounts] AS [coa]
        INNER JOIN [dbo].[OpeningBalanceLine] AS [obl]
            ON [coa].[AccountId] = [obl].[AccountId]
        WHERE [obl].[OBEntryId] = @OBEntryId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
```

---

## 4. Indexes Strategy

### 4.1 Index Summary

```
Table: OpeningBalance
├── Clustered (Primary Key)
│   └── [OBEntryId]
├── Non-Clustered
│   ├── [IX_OB_CompanyId] → Query by company
│   ├── [IX_OB_Status] → Filter by status
│   ├── [IX_OB_CreatedDate] → Order by date
│   ├── [IX_OB_Company_Status] → List by company & status
│   └── [IX_OB_PeriodId] → Unique constraint check

Table: OpeningBalanceLine
├── Clustered (Primary Key)
│   └── [OBLineId]
├── Non-Clustered
│   ├── [IX_OBLine_OBEntryId] → Get lines for entry
│   ├── [IX_OBLine_AccountId] → Check account usage
│   └── [IX_OBLine_EntryLineNum] → Get specific line

Table: AuditLog
├── Clustered (Primary Key)
│   └── [AuditLogId]
├── Non-Clustered
│   ├── [IX_Audit_OBEntryId] → Get history for entry
│   ├── [IX_Audit_Timestamp] → Recent audits
│   ├── [IX_Audit_UserId] → User activity
│   └── [IX_Audit_Action] → Filter by action
```

### 4.2 Index Performance Consideration

```
Query Pattern: List all OB entries for a company
Index Used: [IX_OB_Company_Status]
WHERE CompanyId = @CompanyId AND Status = 'DRAFT'
→ Covers 80% of queries efficiently

Query Pattern: Get OB detail
Index Used: Clustered [OBEntryId]
→ Single lookup + JOIN to get lines
→ < 1ms response time

Query Pattern: Audit trail for entry
Index Used: [IX_Audit_OBEntryId]
→ Efficient retrieval of audit logs
```

---

## 5. Data Partitioning Strategy (Optional - For Large Deployments)

### 5.1 Partition by Year & Company

```sql
-- For very large databases (millions of rows)
-- Partition OpeningBalance by Year and Company

CREATE PARTITION FUNCTION [pf_OBYear] (DATETIME2)
AS RANGE LEFT FOR VALUES
    ('2024-01-01', '2025-01-01', '2026-01-01');

CREATE PARTITION SCHEME [ps_OBYear]
AS PARTITION [pf_OBYear]
TO ([PRIMARY], [PRIMARY], [PRIMARY], [PRIMARY]);

-- Apply partitioning
CREATE TABLE [dbo].[OpeningBalance_Partitioned] (
    [OBEntryId] UNIQUEIDENTIFIER,
    [CreatedDateTime] DATETIME2,
    -- ... other columns ...
) ON [ps_OBYear]([CreatedDateTime]);
```

---

## 6. Backup & Recovery Strategy

### 6.1 Backup Schedule

```
Daily Backups:
- Full backup: 2:00 AM UTC (weekend only)
- Differential: Daily 2:00 AM (weekdays)
- Transaction log: Every 15 minutes

Retention:
- Last 7 days of transaction logs
- Last 4 weekly full backups
- Last 12 monthly backups
- Archive oldest backups to cold storage

Recovery Targets:
- RPO (Recovery Point Objective): 15 minutes
- RTO (Recovery Time Objective): 1 hour
```

### 6.2 Recovery Procedures

```sql
-- Point-in-time recovery
-- Restore full backup
RESTORE DATABASE [OpeningBalanceDB]
FROM DISK = 'D:\Backups\OB_Full_2024-10-29.bak'
WITH NORECOVERY;

-- Restore differential
RESTORE DATABASE [OpeningBalanceDB]
FROM DISK = 'D:\Backups\OB_Diff_2024-10-29.bak'
WITH NORECOVERY;

-- Restore transaction logs up to specific time
RESTORE LOG [OpeningBalanceDB]
FROM DISK = 'D:\Backups\OB_Log_20241029_1430.trn'
WITH RECOVERY, STOPAT = '2024-10-29 14:30:00';
```

---

## 7. Security & Permissions

### 7.1 Database Roles

```sql
-- Read-Only Role (Finance Viewers)
CREATE ROLE [FinanceViewer];
GRANT SELECT ON [dbo].[OpeningBalance] TO [FinanceViewer];
GRANT SELECT ON [dbo].[OpeningBalanceLine] TO [FinanceViewer];
GRANT SELECT ON [dbo].[AuditLog] TO [FinanceViewer];

-- Accountant Role (Create/Edit Draft)
CREATE ROLE [Accountant];
GRANT INSERT, UPDATE, DELETE ON [dbo].[OpeningBalance] TO [Accountant];
GRANT INSERT, UPDATE, DELETE ON [dbo].[OpeningBalanceLine] TO [Accountant];
GRANT SELECT ON [dbo].[AuditLog] TO [Accountant];

-- Manager Role (Approve/Confirm)
CREATE ROLE [FinanceManager];
GRANT SELECT, UPDATE ON [dbo].[OpeningBalance] TO [FinanceManager];
GRANT SELECT ON [dbo].[AuditLog] TO [FinanceManager];
GRANT EXECUTE ON [dbo].[sp_UpdateAccountBalance] TO [FinanceManager];

-- Admin Role
CREATE ROLE [FinanceAdmin];
GRANT ALL ON SCHEMA::[dbo] TO [FinanceAdmin];
GRANT EXECUTE ON [dbo].[sp_CalculateOpeningBalanceTotals] TO [FinanceAdmin];

-- AuditLog is READ-ONLY for everyone
DENY INSERT, UPDATE, DELETE ON [dbo].[AuditLog] TO [Accountant];
DENY INSERT, UPDATE, DELETE ON [dbo].[AuditLog] TO [FinanceManager];
DENY DELETE ON [dbo].[AuditLog] TO [FinanceAdmin]; -- Can't delete
```

### 7.2 Row-Level Security (Optional - For Multi-Tenant)

```sql
-- Filter data by company (if needed)
CREATE SECURITY POLICY [rls_Company]
ADD FILTER PREDICATE [fn_CompanyFilter](CompanyId)
ON [dbo].[OpeningBalance];

-- Function to filter by user's company
CREATE FUNCTION [fn_CompanyFilter](@CompanyId INT)
RETURNS TABLE
WITH SCHEMABINDING
AS
RETURN SELECT 1 AS result WHERE
    (@CompanyId IN (SELECT AllowedCompanyId FROM [dbo].[UserCompanyAccess]
        WHERE UserId = CURRENT_USER_ID()));
```

---

## 8. Maintenance Tasks

### 8.1 Regular Maintenance

```sql
-- Update statistics (weekly)
EXEC sp_updatestats;

-- Rebuild fragmented indexes (weekly)
ALTER INDEX ALL ON [dbo].[OpeningBalance] REBUILD;
ALTER INDEX ALL ON [dbo].[OpeningBalanceLine] REBUILD;
ALTER INDEX ALL ON [dbo].[AuditLog] REBUILD;

-- Check database integrity (daily)
DBCC CHECKDB ([OpeningBalanceDB]) WITH NO_INFOMSGS;

-- Shrink log file (if necessary, after backup)
DBCC SHRINKFILE (LogicalLogName, 100);
```

### 8.2 Data Retention Policy

```
Retention Rules:
- DRAFT entries: Keep indefinitely (might be edited)
- CONFIRMED entries: Keep for 7 years (regulatory requirement)
- AuditLog: Keep permanently (immutable)
- Deleted entries: Archive after 1 year

Archive Strategy:
- Move old confirmed entries to archive database
- Keep link/reference in main database
```

---

## 9. Performance Optimization Tips

### 9.1 Query Optimization

```sql
-- GOOD: Use covering index
SELECT [OBEntryId], [CompanyId], [Status]
FROM [dbo].[OpeningBalance]
WHERE [CompanyId] = 1 AND [Status] = 'PENDING'
ORDER BY [CreatedDateTime] DESC;
-- Uses: [IX_OB_Company_Status] + covers SELECT columns

-- BAD: Missing index, full table scan
SELECT *
FROM [dbo].[OpeningBalance]
WHERE [ApprovedById] IS NOT NULL;
-- Should add index: CREATE INDEX IX_ApprovedById ON OpeningBalance([ApprovedById])

-- GOOD: Batch insert for import
INSERT INTO [dbo].[OpeningBalanceLine] ([OBLineId], [OBEntryId], [AccountId], [Amount], [DebitCredit])
VALUES
    (NEWID(), @OBId, 111, 1000000, 'D'),
    (NEWID(), @OBId, 112, 2000000, 'D'),
    (NEWID(), @OBId, 331, 3000000, 'C');
-- Uses batch insert, faster than row-by-row
```

### 9.2 Caching Strategy

```
Cache in Application:
- Chart of Accounts (TTL: 1 hour)
- Company list (TTL: 4 hours)
- Period list (TTL: 24 hours)
- User permissions (TTL: 30 minutes)

Database Query Cache (Redis):
- Recent OB list (TTL: 5 minutes)
- Pending approval count (TTL: 1 minute)
```

---

## 10. Monitoring & Alerting

### 10.1 Key Metrics to Monitor

```
Query Performance:
- Average query response time < 500ms
- 95th percentile < 2 seconds
- No queries taking > 10 seconds

Table Health:
- Index fragmentation < 10%
- Unused indexes (identify & remove)
- Missing statistics

Database Health:
- Free space > 10%
- Log file growth rate
- Lock escalations
- Page splits

Backup Health:
- Last successful backup < 24 hours ago
- Backup size trend (growth rate)
- Restore test success rate
```

### 10.2 Alerts to Set Up

```
Critical:
- Database down/unavailable
- Transaction log full
- Backup failed
- Disk space < 5%
- Page corruption detected

Warning:
- Slow queries (> 5 seconds)
- Index fragmentation > 30%
- Lock waits > 1 second
- CPU usage > 80%
- Memory pressure detected
```

---

## 11. Disaster Recovery Plan

### 11.1 Failover Setup

```
Production Database:
├── Primary Replica (SQL Server 2019 Enterprise)
├── Secondary Replica (Synchronous commit)
└── Tertiary Replica (Async - Archive)

Failover:
- Automatic failover to Secondary if Primary fails
- Manual failover to Tertiary if both down
- RPO: 15 minutes (max data loss)
- RTO: 5 minutes (max downtime)
```

---

## 12. Conclusion

**Database Design provides:**
- ✅ Normalized table structure (3NF)
- ✅ Appropriate data types for financial data
- ✅ Comprehensive indexing strategy
- ✅ Audit trail immutability
- ✅ Security & access control
- ✅ Backup & recovery plan
- ✅ Performance optimization
- ✅ Monitoring & alerting

**Ready for API & UI Development.**

---

**Document Status:** Draft - Ready for Review
**Last Updated:** 2024-10-29
**Next Step:** Create 4_APIDesign.md (RESTful API Specifications)
