# Detailed Design: Class Diagrams & Component Details

**Created:** 2024-10-29
**Status:** Draft - Ready for Review
**Version:** 1.0

---

## 1. Introduction

Tài liệu này mô tả thiết kế chi tiết (Detailed Design) bao gồm Class Diagrams, Sequence Diagrams, State Diagrams, và design patterns cho tính năng khởi tạo số dư đầu kỳ.

**Purpose:**
- Define class structures & relationships
- Specify method signatures
- Document sequence of operations
- Show state transitions
- Clarify design patterns

---

## 2. Class Diagram - Core Domain Model

```
┌─────────────────────────────────────────┐
│          OpeningBalance                 │
├─────────────────────────────────────────┤
│ - obEntryId: Guid (PK)                  │
│ - companyId: int (FK)                   │
│ - periodId: string (FK)                 │
│ - createdById: int (FK)                 │
│ - approvedById: int? (FK)               │
│ - confirmedById: int? (FK)              │
│ - status: OBStatus enum                 │
│ - totalDebit: decimal                   │
│ - totalCredit: decimal                  │
│ - isBalanced: bool (calculated)         │
│ - remarks: string                       │
│ - createdDate: DateTime                 │
│ - approvedDate: DateTime?               │
│ - confirmedDate: DateTime?              │
│ - lastModifiedDate: DateTime            │
├─────────────────────────────────────────┤
│ + Create(): OB                          │
│ + Update(): bool                        │
│ + Delete(): bool                        │
│ + CalculateTotals(): void               │
│ + CheckBalance(): bool                  │
│ + Submit(): bool                        │
│ + Approve(approver): bool               │
│ + Reject(reason): bool                  │
│ + Confirm(confirmer): bool              │
│ + GetAuditLog(): List<AuditLog>        │
└─────────────────────────────────────────┘
                  │
                  │ 1:N
                  ▼
┌─────────────────────────────────────────┐
│     OpeningBalanceLine                  │
├─────────────────────────────────────────┤
│ - obLineId: Guid (PK)                   │
│ - obEntryId: Guid (FK)                  │
│ - accountId: int (FK)                   │
│ - amount: decimal                       │
│ - debitCredit: char (D/C)               │
│ - description: string                   │
│ - lineNumber: int                       │
├─────────────────────────────────────────┤
│ + Create(): OBLine                      │
│ + Update(amount, dc): bool              │
│ + Delete(): bool                        │
│ + Validate(): ValidationResult          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│        ChartOfAccounts                  │
├─────────────────────────────────────────┤
│ - accountId: int (PK)                   │
│ - companyId: int (FK)                   │
│ - accountCode: string                   │
│ - accountName: string                   │
│ - accountType: AccountType enum         │
│ - status: AccountStatus enum            │
│ - parentAccountId: int? (FK)            │
│ - level: int                            │
│ - createdDate: DateTime                 │
├─────────────────────────────────────────┤
│ + GetByCode(): Account                  │
│ + IsActive(): bool                      │
│ + GetBalance(): decimal                 │
│ + UpdateBalance(amount): void           │
└─────────────────────────────────────────┘
```

---

## 3. Service Layer Class Diagram

```
┌────────────────────────────────────────────────────────┐
│        IOpeningBalanceService (Interface)              │
├────────────────────────────────────────────────────────┤
│ + CreateAsync(command): Task<OBResult>                 │
│ + EditAsync(id, command): Task<OBResult>               │
│ + DeleteAsync(id): Task<bool>                          │
│ + GetAsync(id): Task<OpeningBalance>                   │
│ + ListAsync(filter): Task<List<OB>>                    │
│ + SubmitForApprovalAsync(id): Task<bool>              │
│ + ConfirmAsync(id): Task<OBResult>                     │
└────────────────────────────────────────────────────────┘
                        △
                        │ implements
                        │
┌────────────────────────────────────────────────────────┐
│   OpeningBalanceService                                │
├────────────────────────────────────────────────────────┤
│ - _repository: IOpeningBalanceRepository               │
│ - _lineRepository: IOBLineRepository                   │
│ - _validationService: IValidationService              │
│ - _auditService: IAuditService                        │
│ - _glService: IGLService                              │
│ - _mapper: IMapper                                     │
├────────────────────────────────────────────────────────┤
│ + CreateAsync(command)                                 │
│   1. Validate command                                  │
│   2. Create OB entity                                  │
│   3. Create OB lines                                   │
│   4. Calculate totals                                  │
│   5. Verify balance                                    │
│   6. Save to repository                                │
│   7. Log audit event                                   │
│   8. Return result                                     │
│                                                        │
│ + ConfirmAsync(id)                                     │
│   1. Get entry with lines                             │
│   2. Validate entry is APPROVED                       │
│   3. Final validation                                  │
│   4. Update GL balances (for each line)              │
│   5. Update entry status                              │
│   6. Commit transaction                               │
│   7. Send notification                                │
│   8. Log audit event                                  │
│                                                        │
│ [Other methods...]                                     │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│   IValidationService (Interface)                       │
├────────────────────────────────────────────────────────┤
│ + ValidateAccountAsync(accountId): Task<bool>         │
│ + ValidateAmountAsync(amount): bool                    │
│ + ValidateBalanceAsync(debit, credit): bool           │
│ + ValidateFileFormat(file): ValidationResult          │
│ + RunBusinessRules(entry): ValidationResult           │
└────────────────────────────────────────────────────────┘
                        △
                        │ implements
                        │
┌────────────────────────────────────────────────────────┐
│   ValidationService                                    │
├────────────────────────────────────────────────────────┤
│ - _accountService: IChartOfAccountsService            │
│ - _rules: IBusinessRuleEngine                         │
├────────────────────────────────────────────────────────┤
│ + ValidateAccountAsync(accountId)                      │
│   → Check account exists & is ACTIVE                   │
│                                                        │
│ + ValidateAmountAsync(amount)                          │
│   → Check amount > 0 & valid decimal format           │
│                                                        │
│ + ValidateBalanceAsync(debit, credit)                  │
│   → Check debit == credit (within rounding)           │
│                                                        │
│ + ValidateFileFormat(file)                             │
│   → Check headers match expected format                │
│   → Check data types                                   │
│   → Return list of errors (if any)                    │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│   IImportService (Interface)                           │
├────────────────────────────────────────────────────────┤
│ + ParseFileAsync(file): Task<ImportData>              │
│ + ValidateBulkDataAsync(data): Task<ValidationResult> │
│ + CreateFromImportAsync(data): Task<OBResult>         │
└────────────────────────────────────────────────────────┘
                        △
                        │
┌────────────────────────────────────────────────────────┐
│   ImportService                                        │
├────────────────────────────────────────────────────────┤
│ - _fileParser: IFileParser (Excel/CSV)                │
│ - _validationService: IValidationService              │
│ - _obService: IOpeningBalanceService                  │
├────────────────────────────────────────────────────────┤
│ + ParseFileAsync(file)                                 │
│   1. Read file stream                                  │
│   2. Parse rows (Excel/CSV)                           │
│   3. Map to ImportData objects                        │
│   4. Return ImportData                                │
│                                                        │
│ + ValidateBulkDataAsync(data)                          │
│   1. Validate each row                                │
│   2. Validate account exists                          │
│   3. Check amount format                              │
│   4. Collect all errors                               │
│   5. Return ValidationResult with errors              │
│                                                        │
│ + CreateFromImportAsync(data)                          │
│   1. Create OB entry                                  │
│   2. Create OB lines from data                        │
│   3. Calculate totals                                 │
│   4. Check balance                                    │
│   5. Save & return entry                              │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│   IAuditService (Interface)                            │
├────────────────────────────────────────────────────────┤
│ + LogAsync(action, entity, oldVal, newVal)            │
│ + GetHistoryAsync(entryId): Task<List<AuditLog>>      │
│ + GenerateAuditReportAsync(): Task<Report>            │
└────────────────────────────────────────────────────────┘
                        △
                        │
┌────────────────────────────────────────────────────────┐
│   AuditService                                         │
├────────────────────────────────────────────────────────┤
│ - _auditRepository: IAuditLogRepository               │
│ - _currentUser: ICurrentUserContext                   │
├────────────────────────────────────────────────────────┤
│ + LogAsync(action, entity, oldVal, newVal)            │
│   1. Get current user                                 │
│   2. Serialize old & new values                       │
│   3. Create AuditLog entity                           │
│   4. Save to repository                               │
│   5. Return audit log ID                              │
│                                                        │
│ + GetHistoryAsync(entryId)                             │
│   1. Query by entryId                                 │
│   2. Order by timestamp                               │
│   3. Return all audit logs                            │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│   IApprovalService (Interface)                         │
├────────────────────────────────────────────────────────┤
│ + ApproveAsync(id, approver): Task<bool>              │
│ + RejectAsync(id, reason): Task<bool>                 │
│ + RequestChangesAsync(id, comment): Task<bool>        │
│ + GetPendingAsync(): Task<List<OB>>                    │
└────────────────────────────────────────────────────────┘
                        △
                        │
┌────────────────────────────────────────────────────────┐
│   ApprovalService                                      │
├────────────────────────────────────────────────────────┤
│ - _repository: IOpeningBalanceRepository              │
│ - _auditService: IAuditService                        │
│ - _notificationService: INotificationService          │
├────────────────────────────────────────────────────────┤
│ + ApproveAsync(id, approver)                           │
│   1. Get entry                                        │
│   2. Check status is PENDING                          │
│   3. Update status to APPROVED                        │
│   4. Record approver & date                           │
│   5. Save changes                                     │
│   6. Log audit event                                  │
│   7. Notify creator                                   │
│   8. Return true                                      │
│                                                        │
│ + RejectAsync(id, reason)                              │
│   1. Get entry                                        │
│   2. Update status to DRAFT                           │
│   3. Save rejection reason                            │
│   4. Log audit event                                  │
│   5. Notify creator with reason                       │
│   6. Return true                                      │
└────────────────────────────────────────────────────────┘
```

---

## 4. Repository Pattern - Data Access Layer

```
┌─────────────────────────────────────────────────┐
│  IOpeningBalanceRepository (Interface)          │
├─────────────────────────────────────────────────┤
│ + CreateAsync(entity): Task<OpeningBalance>    │
│ + GetByIdAsync(id): Task<OpeningBalance>       │
│ + GetByCompanyPeriodAsync(cId, pId)            │
│ + ListAsync(filter, page, size)                │
│ + UpdateAsync(entity): Task<bool>              │
│ + DeleteAsync(id): Task<bool>                  │
│ + GetPendingApprovalAsync()                    │
│ + GetApprovedAsync()                           │
│ + GetConfirmedAsync()                          │
└─────────────────────────────────────────────────┘
                      △
                      │ implements
                      │
┌─────────────────────────────────────────────────┐
│  OpeningBalanceRepository                       │
├─────────────────────────────────────────────────┤
│ - _context: ApplicationDbContext (EF)          │
├─────────────────────────────────────────────────┤
│ + CreateAsync(entity)                           │
│   1. _context.OpeningBalances.AddAsync(entity) │
│   2. _context.SaveChangesAsync()               │
│   3. Return entity with ID                     │
│                                                 │
│ + GetByIdAsync(id)                              │
│   1. .Include(o => o.Lines)                    │
│   2. .Include(o => o.CreatedBy)                │
│   3. FirstOrDefaultAsync(x => x.Id == id)      │
│   4. Return entity or null                     │
│                                                 │
│ + ListAsync(filter, page, size)                 │
│   1. Build query with filters                  │
│   2. Order by date DESC                        │
│   3. Skip & Take for pagination                │
│   4. ToListAsync()                             │
│   5. Return list                               │
│                                                 │
│ [Other methods...]                              │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  IOpeningBalanceLineRepository (Interface)      │
├─────────────────────────────────────────────────┤
│ + CreateAsync(entity): Task<OBLine>            │
│ + GetByEntryIdAsync(obId): Task<List<OBLine>> │
│ + InsertBulkAsync(entities): Task<bool>        │
│ + UpdateAsync(entity): Task<bool>              │
│ + DeleteAsync(id): Task<bool>                  │
│ + DeleteByEntryIdAsync(obId): Task<bool>       │
└─────────────────────────────────────────────────┘
                      △
                      │
┌─────────────────────────────────────────────────┐
│  OpeningBalanceLineRepository                   │
├─────────────────────────────────────────────────┤
│ - _context: ApplicationDbContext               │
├─────────────────────────────────────────────────┤
│ + InsertBulkAsync(entities)                     │
│   1. _context.OBLines.AddRangeAsync(entities)  │
│   2. Batch insert for performance              │
│   3. _context.SaveChangesAsync()               │
│   4. Return true or false                      │
│                                                 │
│ [Other methods...]                              │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  IAuditLogRepository (Interface)                │
├─────────────────────────────────────────────────┤
│ + CreateAsync(log): Task<AuditLog>             │
│ + GetByEntryIdAsync(id): Task<List<AuditLog>> │
│ + QueryAsync(filter): Task<List<AuditLog>>    │
└─────────────────────────────────────────────────┘
                      △
                      │
┌─────────────────────────────────────────────────┐
│  AuditLogRepository                             │
├─────────────────────────────────────────────────┤
│ - _context: ApplicationDbContext               │
│ - Read-only to ensure audit trail integrity   │
├─────────────────────────────────────────────────┤
│ + CreateAsync(log)                              │
│   1. INSERT ONLY (no update/delete)            │
│   2. Add timestamp if not set                  │
│   3. Save to DB                                │
└─────────────────────────────────────────────────┘
```

---

## 5. Sequence Diagrams

### 5.1 Create Manual Entry Sequence

```
User          UI              API          Service       Repository      Database
 │            │                │              │              │              │
 ├──Form──────>│                │              │              │              │
 │            │──Validate──────>│              │              │              │
 │            │<──OK────────────│              │              │              │
 │            │                │              │              │              │
 │            │──POST───────────>│             │              │              │
 │            │                │──Authorize──>│              │              │
 │            │                │<──OK─────────│              │              │
 │            │                │              │              │              │
 │            │                │──Create──────>│             │              │
 │            │                │              │──Validate────>│              │
 │            │                │              │<──OK──────────│              │
 │            │                │              │              │              │
 │            │                │              │──Save────────────────────────>│
 │            │                │              │              │<──INSERT OK──│
 │            │                │              │<──ID──────────│              │
 │            │                │              │              │              │
 │            │                │              │──AuditLog────────────────────>│
 │            │                │              │              │<──INSERT OK──│
 │            │                │              │              │              │
 │            │                │<──201────────│              │              │
 │            │<──201 + ID─────│              │              │              │
 │<──Success──│                │              │              │              │
 │            │                │              │              │              │
```

### 5.2 Confirm & Finalize Sequence

```
User          UI              API          OBService    GLService      Repository      Database
 │            │                │              │              │              │              │
 ├──Click─────>│                │              │              │              │              │
 │  Confirm   │──Confirmation──>│              │              │              │              │
 │            │<──Warn────────────│             │              │              │              │
 │            │                │              │              │              │              │
 │ ✓ Confirm │──POST───────────>│             │              │              │              │
 │            │                │──Authorize──>│              │              │              │
 │            │                │<──OK──────────│              │              │              │
 │            │                │              │              │              │              │
 │            │                │──Confirm─────>│             │              │              │
 │            │                │              │──GetLines────>│              │              │
 │            │                │              │<──Lines───────│              │              │
 │            │                │              │              │              │              │
 │            │                │              │──Validate────>│              │              │
 │            │                │              │<──OK──────────│              │              │
 │            │                │              │              │              │              │
 │            │                │              │──UpdateBalance────────────────────────────>│
 │            │                │              │              │              │<──UPDATE OK─│
 │            │                │              │<──OK──────────│              │              │
 │            │                │              │              │              │              │
 │            │                │              │──UpdateStatus────────────────────────────>│
 │            │                │              │              │              │<──UPDATE OK─│
 │            │                │              │<──OK──────────│              │              │
 │            │                │              │              │              │              │
 │            │                │              │──AuditLog────────────────────────────────>│
 │            │                │              │              │              │<──INSERT OK─│
 │            │                │              │              │              │              │
 │            │                │              │─ COMMIT ─────────────────────────────────>│
 │            │                │              │              │              │<──OK──────────│
 │            │                │<──200────────│              │              │              │
 │            │<──Success──────│              │              │              │              │
 │<──Result───│                │              │              │              │              │
 │            │                │              │              │              │              │
```

### 5.3 Bulk Import Sequence

```
User          UI            API        ImportService    Parser        ValidationService    Repository    Database
 │            │              │              │              │                 │              │              │
 ├─Upload─────>│              │              │              │                 │              │              │
 │   File    │──POST─────────>│              │              │                 │              │              │
 │            │              │──Parse────────>│              │                 │              │              │
 │            │              │              │──ReadFile────>│                 │              │              │
 │            │              │              │<──Rows────────│                 │              │              │
 │            │              │              │              │                 │              │              │
 │            │              │──Validate─────────────────────────────────────>│              │              │
 │            │              │<──ValidationResult─────────────────────────────│              │              │
 │            │              │              │              │                 │              │              │
 │            │              │ If errors:   │              │                 │              │              │
 │            │<──400 + Errors──┤              │              │                 │              │              │
 │<──Errors──│              │              │              │                 │              │              │
 │            │              │              │              │                 │              │              │
 │ If OK:     │              │              │              │                 │              │              │
 │            │              │──Create───────────────────────────────────────>│              │              │
 │            │              │              │              │                 │              │              │
 │            │              │              │──InsertBulk──────────────────────────────────>│              │
 │            │              │              │              │                 │<──INSERT OK─│              │
 │            │              │              │<──OK──────────────────────────────────────────│              │
 │            │              │              │              │                 │              │              │
 │            │              │──AuditLog─────────────────────────────────────>│              │              │
 │            │              │              │              │                 │<──INSERT OK─│              │
 │            │              │              │              │                 │              │              │
 │            │<──201 + Result──┤              │              │                 │              │              │
 │<──Success──│              │              │              │                 │              │              │
 │            │              │              │              │                 │              │              │
```

---

## 6. State Diagram - Entry Lifecycle

```
                    ┌─────────────────┐
                    │   NEW/DRAFT     │
                    │ (Editable)      │
                    └────────┬────────┘
                             │
                    Create Entry (User)
                             │
                             ▼
                    ┌──────────────────┐
                    │     DRAFT        │
                    │ (Can edit/delete)│
                    └────────┬─────────┘
                             │
              Submit for Approval (User)
                             │
                             ▼
                    ┌──────────────────┐
                    │   PENDING        │
                    │  (Readonly)      │◄──────────┐
                    └────────┬─────────┘           │
                             │                    │
                    ┌────────┴────────┐            │
                    │                 │            │
                    │                 │            │
        Approve() │                 │ Reject()
                    │                 │            │
                    ▼                 └────────────┘
            ┌──────────────┐
            │   APPROVED   │
            │  (Readonly)  │
            └────────┬─────┘
                     │
          Confirm() (User)
                     │
                     ▼
            ┌──────────────┐
            │  CONFIRMED   │
            │  (Locked)    │
            └──────────────┘
            (No further changes)

Legend:
────────────> = Valid transition
────X────> = Invalid transition
┌──────────┐ = Status state
```

---

## 7. Design Patterns Implementation

### 7.1 Repository Pattern
```csharp
public interface IOpeningBalanceRepository
{
    Task<OpeningBalance> GetByIdAsync(Guid id);
    Task<OpeningBalance> CreateAsync(OpeningBalance entity);
    Task UpdateAsync(OpeningBalance entity);
    // Hide database implementation details
}

public class OpeningBalanceRepository : IOpeningBalanceRepository
{
    private readonly ApplicationDbContext _context;

    public async Task<OpeningBalance> GetByIdAsync(Guid id)
    {
        return await _context.OpeningBalances
            .Include(x => x.Lines)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    // Implementation hides EF Core details
}
```

### 7.2 Service Locator / Dependency Injection
```csharp
// Startup.cs / Program.cs
services.AddScoped<IOpeningBalanceService, OpeningBalanceService>();
services.AddScoped<IValidationService, ValidationService>();
services.AddScoped<IImportService, ImportService>();
services.AddScoped<IAuditService, AuditService>();
services.AddScoped<IApprovalService, ApprovalService>();

// Usage in controller
public class OpeningBalanceController
{
    public OpeningBalanceController(
        IOpeningBalanceService obService,
        IApprovalService approvalService)
    {
        _obService = obService;
        _approvalService = approvalService;
    }
}
```

### 7.3 State Pattern
```csharp
public enum OBStatus
{
    Draft,      // Editable
    Pending,    // Awaiting approval
    Approved,   // Ready to confirm
    Confirmed   // Locked, no changes
}

public class OpeningBalance
{
    public OBStatus Status { get; set; }

    public bool CanEdit() => Status == OBStatus.Draft;
    public bool CanApprove() => Status == OBStatus.Pending;
    public bool CanConfirm() => Status == OBStatus.Approved;

    public void SubmitForApproval()
    {
        if (Status != OBStatus.Draft)
            throw new InvalidOperationException();
        Status = OBStatus.Pending;
    }

    public void Approve()
    {
        if (Status != OBStatus.Pending)
            throw new InvalidOperationException();
        Status = OBStatus.Approved;
    }
}
```

### 7.4 Factory Pattern
```csharp
public interface IOpeningBalanceFactory
{
    OpeningBalance CreateNew(int companyId, string periodId);
}

public class OpeningBalanceFactory : IOpeningBalanceFactory
{
    public OpeningBalance CreateNew(int companyId, string periodId)
    {
        return new OpeningBalance
        {
            Id = Guid.NewGuid(),
            CompanyId = companyId,
            PeriodId = periodId,
            Status = OBStatus.Draft,
            CreatedDate = DateTime.UtcNow
        };
    }
}
```

### 7.5 Observer Pattern (Event-Driven)
```csharp
public class OpeningBalance
{
    public event EventHandler<OBStatusChangedEventArgs> StatusChanged;

    public void Approve()
    {
        var oldStatus = Status;
        Status = OBStatus.Approved;

        // Raise event - observers will be notified
        StatusChanged?.Invoke(this,
            new OBStatusChangedEventArgs(oldStatus, Status));
    }
}

// Observer/Subscriber
public class ApprovalNotificationHandler
{
    public void OnStatusChanged(OBStatusChangedEventArgs args)
    {
        if (args.NewStatus == OBStatus.Approved)
        {
            // Send notification to user
        }
    }
}
```

---

## 8. Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Layered Architecture | Clear separation of concerns, easy testing |
| Repository Pattern | Abstract data access, easy to mock |
| Service Layer | Reusable business logic, DRY principle |
| Dependency Injection | Loose coupling, testability, flexibility |
| State Pattern | Clear state transitions, prevent invalid operations |
| Event-Driven Audit | Decoupled logging, performance, scalability |
| Guid for IDs | Better for distributed systems, security |
| Decimal for Money | Accuracy, no floating point errors |

---

## 9. Design Validation

### Checklist
- ✅ Single Responsibility Principle: Each class has one reason to change
- ✅ Open/Closed Principle: Open for extension, closed for modification
- ✅ Liskov Substitution: Implementations can substitute interfaces
- ✅ Interface Segregation: Specific interfaces, not fat interfaces
- ✅ Dependency Inversion: Depend on abstractions, not concretions

---

## 10. Conclusion

**Detailed Design provides:**
- ✅ Clear class structure & relationships
- ✅ Service layer design
- ✅ Repository pattern implementation
- ✅ Sequence diagrams for key flows
- ✅ State diagram for lifecycle
- ✅ Design patterns applied
- ✅ SOLID principles followed

**Ready for Database Design & API Design.**

---

**Document Status:** Draft - Ready for Review
**Last Updated:** 2024-10-29
**Next Step:** Create 3_DatabaseDesign.md (Physical Database Schema)
