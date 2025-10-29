# Conceptual Entity Relationship Diagram (ERD): Opening Balance Initialization

**Created:** 2024-10-29
**Status:** Draft - Ready for Review
**Version:** 1.0

---

## 1. Executive Summary

Tài liệu này mô tả mô hình dữ liệu khái niệm (Conceptual ERD) cho tính năng khởi tạo số dư đầu kỳ (Opening Balance Initialization).

**Key Entities:**
- Opening Balance (Entry chính)
- Opening Balance Line (Chi tiết từng dòng)
- Chart of Accounts (Tài khoản kế toán)
- Company (Công ty)
- Period (Kỳ)
- User (Người dùng)
- Audit Log (Lịch sử ghi nhận)

---

## 2. Conceptual Entity Relationship Diagram

```
                    ┌──────────────────┐
                    │   Company        │
                    ├──────────────────┤
                    │ CompanyID (PK)   │
                    │ CompanyName      │
                    │ Status           │
                    └────────┬─────────┘
                             │
                    1        │        N
                    ◄────────┼────────►
                             │
                    ┌────────▼─────────┐
                    │ OpeningBalance   │
                    ├──────────────────┤
                    │ OBEntryID (PK)   │
                    │ CompanyID (FK)   │
                    │ PeriodID (FK)    │
                    │ CreatedByID (FK) │
                    │ ApprovedByID(FK) │
                    │ ConfirmedByID(FK)│
                    │ EntryDate        │
                    │ Status           │
                    │ TotalDebit       │
                    │ TotalCredit      │
                    │ IsBalanced       │
                    │ Remarks          │
                    └────────┬─────────┘
                             │
                    1        │        N
                    ◄────────┼────────►
                             │
                    ┌────────▼─────────────┐
                    │ OBLine (Detail)      │
                    ├──────────────────────┤
                    │ OBLineID (PK)        │
                    │ OBEntryID (FK)       │
                    │ AccountID (FK)       │
                    │ Amount               │
                    │ DebitCredit (D/C)    │
                    │ Description          │
                    │ LineNumber           │
                    └──────────┬───────────┘
                               │
                       1       │       N
                       ◄───────┼───────►
                               │
                    ┌──────────▼──────────┐
                    │ ChartOfAccounts     │
                    ├─────────────────────┤
                    │ AccountID (PK)      │
                    │ AccountCode         │
                    │ AccountName         │
                    │ AccountType         │
                    │ Status              │
                    │ CompanyID (FK)      │
                    └─────────────────────┘


        ┌──────────────┐              ┌─────────────┐
        │    Period    │              │    User     │
        ├──────────────┤              ├─────────────┤
        │ PeriodID(PK) │◄─1────N──┐   │ UserID (PK) │
        │ PeriodCode   │          │   │ UserName    │
        │ FromDate     │          │   │ Email       │
        │ ToDate       │          │   │ Role        │
        │ Status       │          │   │ Department  │
        └──────────────┘          │   └─────────────┘
                                  │
                        ┌─────────┴──────────┐
                        │                    │
                  ┌─────▼──────┐      ┌─────▼──────┐
                  │ OpeningBal. │      │ AuditLog   │
                  │   Created   │      │ (FK User)  │
                  │     By      │      │            │
                  └─────┬──────┘      └────────────┘
                        │
              (relationships to User)
```

---

## 3. Core Entities Definition

### 3.1 OPENING BALANCE (Số Dư Đầu Kỳ - Chính)

**Purpose:** Store opening balance entries (one entry per company per period)

**Entity Name:** OpeningBalance

**Attributes:**

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| OBEntryID | PK (UUID/GUID) | ✅ | Unique identifier for each opening balance entry |
| CompanyID | FK | ✅ | Reference to Company |
| PeriodID | FK | ✅ | Reference to Period (usually Jan for first year) |
| CreatedByID | FK | ✅ | User who created (FK to User) |
| CreatedDateTime | DateTime | ✅ | When entry was created |
| ApprovedByID | FK | ❌ | User who approved (FK to User, nullable until approved) |
| ApprovedDateTime | DateTime | ❌ | When entry was approved (nullable) |
| ConfirmedByID | FK | ❌ | User who confirmed (FK to User, nullable) |
| ConfirmedDateTime | DateTime | ❌ | When entry was confirmed (nullable) |
| Status | Enum | ✅ | DRAFT / PENDING / APPROVED / CONFIRMED |
| TotalDebit | Decimal(18,2) | ✅ | Sum of all debit amounts |
| TotalCredit | Decimal(18,2) | ✅ | Sum of all credit amounts |
| IsBalanced | Boolean | ✅ | TotalDebit = TotalCredit (calculated field) |
| Remarks | NVarChar(2000) | ❌ | Optional notes/description |
| LastModifiedByID | FK | ✅ | Last user who modified |
| LastModifiedDateTime | DateTime | ✅ | Last modification time |

**Primary Key:** OBEntryID

**Unique Constraint:** (CompanyID, PeriodID) - Only one OB entry per company per period

**Example Data:**
```
OBEntryID: 550e8400-e29b-41d4-a716-446655440000
CompanyID: 1 (ABC Company)
PeriodID: 202401 (Jan 2024)
CreatedByID: 101 (John Doe)
CreatedDateTime: 2024-10-29 10:30:00
Status: DRAFT
TotalDebit: 500,000,000
TotalCredit: 500,000,000
IsBalanced: true
```

---

### 3.2 OPENING BALANCE LINE DETAIL (Chi Tiết Từng Tài Khoản)

**Purpose:** Store individual account entries (one row per account)

**Entity Name:** OpeningBalanceLine

**Attributes:**

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| OBLineID | PK (UUID/GUID) | ✅ | Unique identifier for each line |
| OBEntryID | FK | ✅ | Reference to OpeningBalance parent |
| AccountID | FK | ✅ | Reference to ChartOfAccounts |
| Amount | Decimal(18,2) | ✅ | Amount for this account (always positive) |
| DebitCredit | Enum (D/C) | ✅ | D = Debit, C = Credit |
| Description | NVarChar(500) | ❌ | Line-specific description/note |
| LineNumber | Int | ✅ | Order of line in the entry (1, 2, 3...) |
| CreatedDateTime | DateTime | ✅ | When line was created |
| LastModifiedDateTime | DateTime | ✅ | Last modification time |

**Primary Key:** OBLineID

**Foreign Keys:**
- OBEntryID → OpeningBalance
- AccountID → ChartOfAccounts

**Example Data:**
```
OBLineID: 660e8400-e29b-41d4-a716-446655440001
OBEntryID: 550e8400-e29b-41d4-a716-446655440000 (link to entry above)
AccountID: 111 (Tiền mặt)
Amount: 100,000,000
DebitCredit: D (Debit)
Description: Tiền mặt ban đầu theo sổ cũ
LineNumber: 1

---

OBLineID: 660e8400-e29b-41d4-a716-446655440002
OBEntryID: 550e8400-e29b-41d4-a716-446655440000
AccountID: 112 (Tiền gởi NH)
Amount: 200,000,000
DebitCredit: D
Description: Tiền gởi tại ACB
LineNumber: 2

---

OBLineID: 660e8400-e29b-41d4-a716-446655440007
OBEntryID: 550e8400-e29b-41d4-a716-446655440000
AccountID: 331 (Nợ phải trả)
Amount: 200,000,000
DebitCredit: C (Credit)
Description: Nợ nhà cung cấp
LineNumber: 7
```

---

### 3.3 CHART OF ACCOUNTS (Danh Sách Tài Khoản)

**Purpose:** Store the chart of accounts (master data)

**Entity Name:** ChartOfAccounts

**Attributes:**

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| AccountID | PK | ✅ | Account unique ID (can be numeric or string) |
| CompanyID | FK | ✅ | Reference to Company (accounts per company) |
| AccountCode | VarChar(20) | ✅ | Account code (e.g., "111", "331", "411") |
| AccountName | NVarChar(255) | ✅ | Account name (e.g., "Tiền mặt", "Nợ phải trả") |
| AccountType | Enum | ✅ | ASSET / LIABILITY / EQUITY / REVENUE / EXPENSE / etc. |
| Status | Enum | ✅ | ACTIVE / INACTIVE / ARCHIVED |
| Level | Int | ❌ | Account hierarchy level (1=main, 2=sub, 3=detail) |
| ParentAccountID | FK | ❌ | Reference to parent account (for hierarchy) |
| CreatedDateTime | DateTime | ✅ | Creation date |

**Primary Key:** AccountID

**Unique Constraint:** (CompanyID, AccountCode)

**Example Data:**
```
AccountID: 111
CompanyID: 1 (ABC Company)
AccountCode: 111
AccountName: Tiền mặt
AccountType: ASSET
Status: ACTIVE

---

AccountID: 331
CompanyID: 1
AccountCode: 331
AccountName: Nợ phải trả cho nhà cung cấp
AccountType: LIABILITY
Status: ACTIVE

---

AccountID: 411
CompanyID: 1
AccountCode: 411
AccountName: Vốn chủ sở hữu
AccountType: EQUITY
Status: ACTIVE
```

---

### 3.4 COMPANY (Công Ty)

**Purpose:** Store company/organization information

**Entity Name:** Company

**Attributes:**

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| CompanyID | PK | ✅ | Company unique ID |
| CompanyName | NVarChar(255) | ✅ | Company name |
| TaxID | VarChar(20) | ❌ | Tax identification number |
| Status | Enum | ✅ | ACTIVE / INACTIVE |
| CurrencyCode | VarChar(3) | ✅ | Default currency (e.g., "VND") |
| CreatedDateTime | DateTime | ✅ | Creation date |

**Primary Key:** CompanyID

**Unique Constraint:** (TaxID) if exists

**Example Data:**
```
CompanyID: 1
CompanyName: ABC Company Limited
TaxID: 0123456789
Status: ACTIVE
CurrencyCode: VND
```

---

### 3.5 PERIOD (Kỳ Kế Toán)

**Purpose:** Store accounting periods

**Entity Name:** Period

**Attributes:**

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| PeriodID | PK | ✅ | Period unique ID (e.g., 202401 for Jan 2024) |
| PeriodCode | VarChar(20) | ✅ | Period code (e.g., "2024-01", "Q1-2024") |
| FromDate | Date | ✅ | Start date of period |
| ToDate | Date | ✅ | End date of period |
| Status | Enum | ✅ | OPEN / CLOSED / LOCKED |
| IsOpeningPeriod | Boolean | ✅ | Is this opening period (usually first month) |
| CreatedDateTime | DateTime | ✅ | Creation date |

**Primary Key:** PeriodID

**Example Data:**
```
PeriodID: 202401
PeriodCode: 2024-01
FromDate: 2024-01-01
ToDate: 2024-01-31
Status: OPEN
IsOpeningPeriod: true (opening balance usually for this period)
```

---

### 3.6 USER (Người Dùng)

**Purpose:** Store user information (for tracking who did what)

**Entity Name:** User

**Attributes:**

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| UserID | PK | ✅ | User unique ID |
| UserName | VarChar(100) | ✅ | Username/login name |
| FullName | NVarChar(255) | ✅ | Full name |
| Email | VarChar(255) | ✅ | Email address |
| Role | Enum | ✅ | ACCOUNTANT / MANAGER / ADMIN |
| Department | NVarChar(100) | ❌ | Department (e.g., "Finance", "Accounting") |
| Status | Enum | ✅ | ACTIVE / INACTIVE |
| CreatedDateTime | DateTime | ✅ | Creation date |

**Primary Key:** UserID

**Unique Constraint:** (UserName), (Email)

**Example Data:**
```
UserID: 101
UserName: john.doe
FullName: John Doe
Email: john.doe@abc.com
Role: ACCOUNTANT
Department: Finance
Status: ACTIVE

---

UserID: 102
UserName: mary.smith
FullName: Mary Smith
Email: mary.smith@abc.com
Role: MANAGER
Department: Finance
Status: ACTIVE
```

---

### 3.7 AUDIT LOG (Lịch Sử Ghi Nhận)

**Purpose:** Track all changes to opening balance entries

**Entity Name:** AuditLog

**Attributes:**

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| AuditLogID | PK (UUID/GUID) | ✅ | Unique identifier |
| OBEntryID | FK | ✅ | Reference to OpeningBalance entry being tracked |
| UserID | FK | ✅ | Reference to User who made the change |
| Action | Enum | ✅ | CREATE / EDIT / DELETE / APPROVE / REJECT / CONFIRM |
| Timestamp | DateTime | ✅ | When action was performed |
| OldValue | NVarChar(MAX) | ❌ | Previous value (if edit, JSON format) |
| NewValue | NVarChar(MAX) | ❌ | New value (if edit, JSON format) |
| Description | NVarChar(500) | ❌ | Description of change |
| IPAddress | VarChar(50) | ❌ | IP address of user |

**Primary Key:** AuditLogID

**Foreign Keys:**
- OBEntryID → OpeningBalance
- UserID → User

**Example Data:**
```
AuditLogID: 770e8400-e29b-41d4-a716-446655440000
OBEntryID: 550e8400-e29b-41d4-a716-446655440000
UserID: 101 (John Doe)
Action: CREATE
Timestamp: 2024-10-29 10:30:00
Description: Created new opening balance entry for ABC Company, Period 202401

---

AuditLogID: 770e8400-e29b-41d4-a716-446655440001
OBEntryID: 550e8400-e29b-41d4-a716-446655440000
UserID: 101
Action: EDIT
Timestamp: 2024-10-29 10:45:00
OldValue: {"Amount": 100000000}
NewValue: {"Amount": 100500000}
Description: Updated TK 111 amount from 100M to 100.5M

---

AuditLogID: 770e8400-e29b-41d4-a716-446655440002
OBEntryID: 550e8400-e29b-41d4-a716-446655440000
UserID: 102 (Mary Smith)
Action: APPROVE
Timestamp: 2024-10-29 14:00:00
Description: Manager approved opening balance entry

---

AuditLogID: 770e8400-e29b-41d4-a716-446655440003
OBEntryID: 550e8400-e29b-41d4-a716-446655440000
UserID: 101
Action: CONFIRM
Timestamp: 2024-10-29 15:30:00
Description: Confirmed and finalized opening balance - accounts updated
```

---

## 4. Entity Relationships

### 4.1 One-to-Many (1:N) Relationships

**Company → OpeningBalance**
- One company can have many opening balance entries (one per period)
- Cardinality: 1:N
- Constraint: (CompanyID, PeriodID) unique

**OpeningBalance → OpeningBalanceLine**
- One OB entry can have many lines (one per account)
- Cardinality: 1:N
- Constraint: When delete OB entry, delete all lines (cascade)

**ChartOfAccounts → OpeningBalanceLine**
- One account can be referenced in many OB entries (across different periods/companies)
- Cardinality: 1:N

**User → OpeningBalance (CreatedBy)**
- One user can create many OB entries
- Cardinality: 1:N

**User → OpeningBalance (ApprovedBy)**
- One user can approve many OB entries
- Cardinality: 1:N

**User → AuditLog**
- One user can generate many audit logs
- Cardinality: 1:N

**OpeningBalance → AuditLog**
- One OB entry can have many audit logs (track history)
- Cardinality: 1:N

**Period → OpeningBalance**
- One period can have many OB entries (one per company)
- Cardinality: 1:N

---

### 4.2 Foreign Key Constraints

```
OpeningBalance:
  - CompanyID → Company.CompanyID (NOT NULL)
  - PeriodID → Period.PeriodID (NOT NULL)
  - CreatedByID → User.UserID (NOT NULL)
  - ApprovedByID → User.UserID (NULL until approved)
  - ConfirmedByID → User.UserID (NULL until confirmed)
  - LastModifiedByID → User.UserID (NOT NULL)

OpeningBalanceLine:
  - OBEntryID → OpeningBalance.OBEntryID (NOT NULL) [CASCADE DELETE]
  - AccountID → ChartOfAccounts.AccountID (NOT NULL)

ChartOfAccounts:
  - CompanyID → Company.CompanyID (NOT NULL)
  - ParentAccountID → ChartOfAccounts.AccountID (NULL for main accounts)

AuditLog:
  - OBEntryID → OpeningBalance.OBEntryID (NOT NULL)
  - UserID → User.UserID (NOT NULL)
```

---

## 5. Data Constraints & Rules

### 5.1 Entity Constraints

**OpeningBalance:**
- Unique: (CompanyID, PeriodID)
- Status must be: DRAFT | PENDING | APPROVED | CONFIRMED
- TotalDebit calculated as: SUM(OBLine.Amount WHERE DebitCredit='D')
- TotalCredit calculated as: SUM(OBLine.Amount WHERE DebitCredit='C')
- IsBalanced = (TotalDebit = TotalCredit)

**OpeningBalanceLine:**
- Amount > 0
- DebitCredit ∈ {D, C}
- AccountID must exist in ChartOfAccounts
- LineNumber unique within OBEntryID (1, 2, 3...)
- Cannot have account appear twice in same entry

**ChartOfAccounts:**
- AccountCode unique within Company
- Status: ACTIVE / INACTIVE / ARCHIVED
- Only ACTIVE accounts can be used in OB entry

---

### 5.2 Business Rules

**BR-1: Balance Requirement**
- TotalDebit MUST equal TotalCredit before confirmation
- System prevents confirmation of unbalanced entries

**BR-2: Single Entry Per Period**
- Only ONE OpeningBalance entry per Company per Period
- Cannot create duplicate

**BR-3: Status Transition**
- DRAFT → PENDING (when submitted for approval)
- PENDING → APPROVED (when approved by manager)
- PENDING → DRAFT (when rejected)
- APPROVED → CONFIRMED (when confirmed)
- CONFIRMED → (read-only, no changes)

**BR-4: Approval Required**
- Must be approved by Manager before confirmation
- Cannot bypass approval

**BR-5: One-Sided Entry**
- Opening Balance uses ONE-SIDED entry (not double-entry)
- Accounts are updated directly WITHOUT offset account
- Example: Debit TK 111 = 100M (no credit to offset)

**BR-6: Non-Editable After Confirm**
- Confirmed entries cannot be edited or deleted
- Audit trail is preserved forever

**BR-7: Audit Trail**
- All actions must be logged (create, edit, approve, confirm)
- User, Timestamp, Action must be recorded
- Audit log cannot be deleted

---

## 6. Relationships Diagram (Text Format)

```
┌─────────────────────────────────────────────────────────┐
│                      Company                            │
│                   (1 Company)                           │
└──────────────┬──────────────────────────────────────────┘
               │
               │ 1:N CompanyID
               │
    ┌──────────┴──────────────┐
    │                         │
    ▼                         ▼
┌─────────────────────┐  ┌──────────────────────┐
│  ChartOfAccounts    │  │  OpeningBalance      │
│  (Accounts Master)  │  │  (Main Entry)        │
└──────────┬──────────┘  └──────────┬───────────┘
           │                        │
           │ 1:N AccountID          │ 1:N OBEntryID
           │                        │
           └────────────┬───────────┘
                        │
                        ▼
           ┌────────────────────────────┐
           │  OpeningBalanceLine        │
           │  (Detail per Account)      │
           └────────────┬───────────────┘
                        │
                        │ 1:N OBEntryID
                        │
                        ▼
           ┌────────────────────────────┐
           │  AuditLog                  │
           │  (Change History)          │
           └────────────────────────────┘
```

---

## 7. Data Examples (Complete Scenario)

**Company: ABC Company (CompanyID = 1)**
**Period: January 2024 (PeriodID = 202401)**

### Opening Balance Entry (Parent):
```
OBEntryID: OB-001-2024-01
CompanyID: 1
PeriodID: 202401
CreatedByID: 101 (John Doe)
CreatedDateTime: 2024-10-29 10:30:00
ApprovedByID: 102 (Mary Smith)
ApprovedDateTime: 2024-10-29 14:00:00
ConfirmedByID: 101
ConfirmedDateTime: 2024-10-29 15:30:00
Status: CONFIRMED
TotalDebit: 500,000,000
TotalCredit: 500,000,000
IsBalanced: true
```

### Opening Balance Lines (Details):
```
┌─────────────────────────────────────────────────────────┐
│ Line Details for OB-001-2024-01                         │
├────┬───────┬────────────────────┬─────────┬──────┬──────┤
│ # │ Acct │ Description        │ Amount  │D/C │ Type │
├────┼───────┼────────────────────┼─────────┼──────┼──────┤
│ 1 │ 111  │ Tiền mặt           │ 100M    │ D   │Cash  │
│ 2 │ 112  │ Tiền gởi NH ACB    │ 200M    │ D   │Bank  │
│ 3 │ 131  │ Nợ phải thu        │ 100M    │ D   │A/R   │
│ 4 │ 156  │ Hàng hóa           │ 150M    │ D   │Inv   │
│ 5 │ 331  │ Nợ phải trả        │ 200M    │ C   │A/P   │
│ 6 │ 341  │ Nợ vay NH          │ 150M    │ C   │Loan  │
│ 7 │ 411  │ Vốn chủ sở hữu     │ 150M    │ C   │Equity│
├────┼───────┼────────────────────┼─────────┼──────┼──────┤
│    │ TOTAL DEBIT           │ 500M    │      │      │
│    │ TOTAL CREDIT          │ 500M    │      │      │
│    │ BALANCED              │ YES ✅   │      │      │
└─────────────────────────────────────────────────────────┘
```

### Audit Trail:
```
┌──────────────────────────────────────────────────────────┐
│ Action History for OB-001-2024-01                        │
├─────┬────────────┬──────────────┬─────────────────────────┤
│Time │ User      │ Action       │ Description             │
├─────┼────────────┼──────────────┼─────────────────────────┤
│10:30│ John Doe  │ CREATE       │ Created new entry       │
│10:45│ John Doe  │ EDIT         │ Modified account 112    │
│14:00│ Mary Smith│ APPROVE      │ Manager approved        │
│15:30│ John Doe  │ CONFIRM      │ Finalized, accounts     │
│     │           │              │ updated                 │
└──────────────────────────────────────────────────────────┘
```

---

## 8. Key Design Decisions

1. **Surrogate Keys (UUID/GUID):**
   - Use UUID for primary keys instead of sequential numbers
   - Advantages: Distributed systems, no coordination needed, security

2. **Soft vs Hard Deletes:**
   - Use Status field (ACTIVE/INACTIVE) instead of physical delete
   - Preserves audit trail and data integrity
   - Exception: Test data can be hard deleted

3. **Decimal Precision:**
   - Use Decimal(18,2) for all financial amounts
   - Ensures accuracy for Vietnam currency (VNĐ)
   - 18 digits total, 2 decimal places

4. **Audit Log Immutability:**
   - AuditLog table should be INSERT-ONLY
   - No UPDATE or DELETE permissions
   - Ensures true audit trail

5. **Separation of Concerns:**
   - OpeningBalance = Entry header/summary
   - OpeningBalanceLine = Detail rows
   - Easier to manage, query, and maintain

6. **Multi-Company Support:**
   - CompanyID in both Company and ChartOfAccounts
   - Ensures complete data segregation
   - Each company has own chart of accounts

---

## 9. Normalization Level

**This ERD is in 3NF (Third Normal Form):**

✅ 1NF (First Normal Form):
- All attributes are atomic
- No repeating groups
- Each column contains single value

✅ 2NF (Second Normal Form):
- 1NF + Non-key attributes depend on entire primary key
- No partial dependencies

✅ 3NF (Third Normal Form):
- 2NF + No transitive dependencies
- Non-key attributes depend only on primary key
- No relationships between non-key attributes

---

## 10. Conclusion

**Conceptual ERD provides:**
- ✅ Clear entity definitions
- ✅ Relationship mappings
- ✅ Data constraints & rules
- ✅ Audit trail capability
- ✅ Multi-company support
- ✅ Complete data requirements

**Ready for Logical & Physical Design phases.**

---

**Document Status:** Draft - Ready for Review
**Last Updated:** 2024-10-29
**Next Step:** Create 4_PrototypeMockup.md (UI/UX design)
