# ARCHITECTURE DESIGN DOCUMENT
## Hệ thống Kế toán - Accounting System

**Version:** 1.0
**Date:** 2024-10-09
**Status:** Draft
**Author:** Architecture Team

---

## MỤC LỤC
1. [Giới thiệu](#1-giới-thiệu)
2. [Kiến trúc Tổng quan](#2-kiến-trúc-tổng-quan)
3. [Architecture Views](#3-architecture-views)
4. [Technology Stack](#4-technology-stack)
5. [System Components](#5-system-components)
6. [Deployment Architecture](#6-deployment-architecture)
7. [Security Architecture](#7-security-architecture)
8. [Performance & Scalability](#8-performance--scalability)
9. [Integration Architecture](#9-integration-architecture)
10. [Architecture Decisions](#10-architecture-decisions)

---

## 1. GIỚI THIỆU

### 1.1 Mục đích
Tài liệu này mô tả kiến trúc tổng thể của Hệ thống Kế toán, tuân thủ Chuẩn mực Kế toán Việt Nam (VAS) và Thông tư 200/2014/TT-BTC.

### 1.2 Phạm vi
- Kiến trúc hệ thống kế toán cấp cao
- Các microservices và tương tác
- Công nghệ và frameworks
- Mô hình triển khai
- Chiến lược tích hợp với Payroll và hệ thống bên ngoài

### 1.3 Stakeholders
- Chief Financial Officer (CFO)
- Chief Accountant (Kế toán trưởng)
- Development Team
- Technical Architects
- DevOps Team
- Compliance & Audit Team

---

## 2. KIẾN TRÚC TỔNG QUAN

### 2.1 Architecture Style
**Microservices Architecture** với các đặc điểm:
- Domain-driven design cho accounting modules
- Service-oriented cho từng chức năng kế toán
- Event-driven architecture cho real-time updates
- CQRS pattern cho complex queries
- Eventual consistency với strong consistency cho financial transactions

### 2.2 Architecture Principles

| Principle | Description | Rationale |
|-----------|-------------|-----------|
| **Separation of Concerns** | Mỗi service quản lý một domain riêng (GL, AR, AP, FA) | Dễ maintain và audit |
| **Double-Entry Validation** | Mọi transaction đều cân đối Nợ-Có | Tuân thủ kế toán bút toán kép |
| **Audit Trail** | Log đầy đủ mọi thao tác | Compliance và truy xuất nguồn gốc |
| **Data Integrity** | ACID transactions cho financial data | Đảm bảo tính chính xác |
| **VAS Compliance** | Tuân thủ VAS và Thông tư 200 | Tuân thủ pháp luật VN |
| **Security by Design** | Encryption và access control từ đầu | Bảo vệ dữ liệu tài chính nhạy cảm |

### 2.3 High-Level Architecture Diagram

```mermaid
graph TB
    %% Presentation Layer
    subgraph "Presentation Layer"
        WEB[Accounting Web App<br/>Django Templates]
        MOBILE[Mobile App<br/>Accountant Portal]
        EXCEL[Excel Add-in<br/>Import/Export]
    end

    %% API Gateway
    GW[API Gateway<br/>Kong/nginx]

    %% Accounting Microservices
    subgraph "Accounting Microservices"
        GL[General Ledger Service<br/>Chart of Accounts, Journals]
        AR[Accounts Receivable<br/>Customer Invoices]
        AP[Accounts Payable<br/>Vendor Bills]
        FA[Fixed Assets<br/>Depreciation]
        CASH[Cash Management<br/>Bank Reconciliation]
        TAX[Tax Service<br/>VAT, CIT, PIT]
        REPORT[Financial Reporting<br/>VAS Reports]
    end

    %% Integration Services
    subgraph "Integration Layer"
        PAYROLL[Payroll Integration<br/>Salary Posting]
        EINVOICE[E-Invoice Gateway<br/>Nghị định 123/2020]
        BANKING[Banking API<br/>Transaction Sync]
        GOV[Government Portal<br/>Tax Declaration]
    end

    %% Data Layer
    subgraph "Data Stores"
        DB1[(Accounting DB<br/>MySQL)]
        DB2[(Transaction Archive<br/>MySQL)]
        CACHE[(Redis Cache)]
        DOC[(Document Store<br/>MinIO)]
        SEARCH[(Elasticsearch<br/>Reports)]
    end

    %% Message Queue
    MQ[Message Queue<br/>RabbitMQ]

    %% Connections
    WEB --> GW
    MOBILE --> GW
    EXCEL --> GW

    GW --> GL
    GW --> AR
    GW --> AP
    GW --> FA
    GW --> CASH
    GW --> TAX
    GW --> REPORT

    GL --> DB1
    AR --> DB1
    AP --> DB1
    FA --> DB1
    CASH --> DB1
    TAX --> DB1
    REPORT --> DB1

    GL --> MQ
    AR --> MQ
    AP --> MQ
    FA --> MQ

    MQ --> REPORT
    MQ --> CACHE

    REPORT --> SEARCH
    REPORT --> DOC

    GL --> PAYROLL
    TAX --> EINVOICE
    CASH --> BANKING
    TAX --> GOV

    GL --> CACHE
    REPORT --> CACHE
```

---

## 3. ARCHITECTURE VIEWS

### 3.1 Logical View

#### 3.1.1 Layered Architecture

| Layer | Responsibility | Components |
|-------|---------------|------------|
| **Presentation** | User Interface | Web App, Mobile, Excel Add-in |
| **API Gateway** | Routing, Auth, Rate limiting | Kong/nginx |
| **Business Logic** | Accounting business rules | Microservices (GL, AR, AP, FA, Tax) |
| **Data Access** | Data persistence | Django ORM, Repository pattern |
| **Integration** | External systems | Payroll, E-Invoice, Banking, Tax Portal |

#### 3.1.2 Accounting Domain Model

```mermaid
classDiagram
    class ChartOfAccounts {
        +String accountCode
        +String accountName
        +AccountType accountType
        +AccountClass accountClass
        +Boolean isActive
        +getAccountHierarchy()
        +validateVASCompliance()
    }

    class JournalEntry {
        +String entryId
        +Date transactionDate
        +String description
        +JournalStatus status
        +List~JournalLine~ lines
        +Decimal totalDebit
        +Decimal totalCredit
        +validateBalance()
        +post()
        +reverse()
    }

    class JournalLine {
        +String lineId
        +String accountCode
        +DebitCredit type
        +Decimal amount
        +String description
        +String objectRef
        +validateAccount()
    }

    class Account {
        +String accountCode
        +String accountName
        +Decimal debitBalance
        +Decimal creditBalance
        +Decimal netBalance
        +calculateBalance()
        +getTransactionHistory()
    }

    class Invoice {
        +String invoiceId
        +InvoiceType type
        +String customerId/vendorId
        +Date invoiceDate
        +Date dueDate
        +Decimal totalAmount
        +Decimal vatAmount
        +InvoiceStatus status
        +generateJournalEntry()
    }

    class FixedAsset {
        +String assetId
        +String assetCode
        +String assetName
        +Decimal originalCost
        +Date acquisitionDate
        +Integer usefulLife
        +DepreciationMethod method
        +Decimal accumulatedDepreciation
        +calculateMonthlyDepreciation()
    }

    class TaxDeclaration {
        +String declarationId
        +TaxType taxType
        +Period period
        +Decimal taxableAmount
        +Decimal taxAmount
        +DeclarationStatus status
        +submitToTaxPortal()
    }

    class BankReconciliation {
        +String reconciliationId
        +String bankAccount
        +Date reconciliationDate
        +Decimal bookBalance
        +Decimal bankBalance
        +Decimal difference
        +reconcile()
    }

    ChartOfAccounts "1" --> "*" Account
    JournalEntry "1" *-- "*" JournalLine
    JournalLine "*" --> "1" Account
    Invoice "1" --> "1" JournalEntry
    FixedAsset "1" --> "*" JournalEntry
    TaxDeclaration "1" --> "*" JournalEntry
```

### 3.2 Process View

#### 3.2.1 Journal Entry Posting Sequence

```mermaid
sequenceDiagram
    participant User as Accountant
    participant UI as Web UI
    participant GW as API Gateway
    participant GL as GL Service
    participant Valid as Validation Service
    participant DB as Database
    participant MQ as Message Queue
    participant Audit as Audit Service

    User->>UI: Create Journal Entry
    UI->>GW: POST /api/gl/journal-entries
    GW->>GL: Forward Request

    GL->>Valid: Validate Entry
    Valid->>Valid: Check Debit = Credit
    Valid->>Valid: Validate Account Codes
    Valid->>Valid: Check Period Open
    Valid-->>GL: Validation Result

    alt Validation Failed
        GL-->>UI: Return Error
    else Validation Success
        GL->>DB: Save Entry (Status: Draft)
        DB-->>GL: Entry Saved

        GL->>GL: Submit for Approval
        GL->>DB: Update Status: Pending

        User->>UI: Approve Entry
        UI->>GL: POST /api/gl/journal-entries/{id}/approve

        GL->>GL: Post to Ledger
        GL->>DB: Update Accounts
        GL->>DB: Update Status: Posted

        GL->>MQ: Publish Event: EntryPosted
        MQ->>Audit: Log Entry

        GL-->>UI: Success Response
    end
```

#### 3.2.2 Invoice to Payment Flow

```mermaid
sequenceDiagram
    participant AP as AP Service
    participant GL as GL Service
    participant Cash as Cash Service
    participant Bank as Banking API
    participant DB as Database

    AP->>AP: Create Vendor Invoice
    AP->>GL: Generate AP Journal Entry
    Note over GL: Nợ 156/611<br/>Có 331<br/>Nợ 133 (VAT)
    GL->>DB: Post Entry

    Cash->>AP: Create Payment Voucher
    AP->>AP: Select Invoices to Pay
    AP->>Cash: Process Payment
    Cash->>Bank: Initiate Transfer
    Bank-->>Cash: Transfer Confirmed

    Cash->>GL: Generate Payment Entry
    Note over GL: Nợ 331<br/>Có 112
    GL->>DB: Post Entry

    AP->>DB: Update Invoice Status: Paid
```

### 3.3 Development View

#### 3.3.1 Package Structure

```
accounting-system/
├── services/
│   ├── general-ledger-service/
│   │   ├── src/
│   │   │   ├── accounts/
│   │   │   ├── journals/
│   │   │   ├── period_close/
│   │   │   └── reports/
│   │   ├── tests/
│   │   └── Dockerfile
│   ├── ar-service/
│   │   ├── src/
│   │   │   ├── invoices/
│   │   │   ├── payments/
│   │   │   ├── customers/
│   │   │   └── aging/
│   ├── ap-service/
│   ├── fixed-assets-service/
│   ├── cash-management-service/
│   ├── tax-service/
│   └── reporting-service/
├── frontend/
│   ├── accounting-web/
│   └── excel-addin/
├── integration/
│   ├── payroll-connector/
│   ├── einvoice-gateway/
│   └── banking-connector/
├── infrastructure/
│   ├── docker-compose.yml
│   ├── kubernetes/
│   └── terraform/
└── shared/
    ├── accounting-standards/
    │   └── vas-rules/
    ├── common-libs/
    └── api-contracts/
```

---

## 4. TECHNOLOGY STACK

### 4.1 Backend Technologies

| Component | Technology | Version | Justification |
|-----------|-----------|---------|---------------|
| **Language** | Python | 3.11+ | Django ecosystem, extensive libraries |
| **Framework** | Django | 4.x | Full-stack, ORM, admin panel |
| **API** | Django REST Framework | 3.x | Powerful REST API toolkit |
| **Database** | MySQL | 8.0 | ACID compliance, JSON support for dynamic fields |
| **Cache** | Redis | 7.x | High performance caching |
| **Message Queue** | Celery + RabbitMQ | - | Async processing for reports |
| **Search** | Elasticsearch | 8.x | Full-text search for transactions |
| **File Storage** | MinIO | - | Document management (invoices, attachments) |

### 4.2 Frontend Technologies

| Component | Technology | Version | Justification |
|-----------|-----------|---------|---------------|
| **Template Engine** | Django Templates (DTL) | Built-in | Server-side rendering, SEO-friendly |
| **HTML/CSS/JS** | HTML5, CSS3, JavaScript | - | Lightweight, standard |
| **UI Framework** | Bootstrap 5 | 5.x | Responsive design |
| **DataTables** | DataTables.js | 1.x | Advanced table features for accounting grids |
| **Charts** | Chart.js | 4.x | Financial charts and dashboards |
| **Excel Integration** | SheetJS / ExcelJS | - | Import/Export accounting data |

### 4.3 Integration Technologies

| Component | Technology | Justification |
|-----------|-----------|---------------|
| **E-Invoice** | XML/SOAP | Nghị định 123/2020 compliance |
| **Banking API** | REST/Open Banking | Real-time transaction sync |
| **Tax Portal** | XML/REST | Electronic tax declaration |
| **Payroll** | REST API | Salary posting to GL |

---

## 5. SYSTEM COMPONENTS

### 5.1 Core Accounting Services

#### 5.1.1 General Ledger Service
- **Purpose:** Core accounting engine
- **Technology:** Django + Django REST Framework
- **Database:** MySQL (Chart of Accounts, Journals, Ledgers)
- **Features:**
  - Chart of Accounts management (Thông tư 200)
  - Journal entry CRUD with validation
  - Posting and reversal logic
  - Period closing and carry forward
  - Double-entry validation
  - Multi-currency support
- **API Endpoints:**
  - GET/POST/PUT/DELETE /api/gl/accounts/
  - GET/POST /api/gl/journal-entries/
  - POST /api/gl/journal-entries/{id}/post
  - POST /api/gl/period-close
  - GET /api/gl/ledger/{accountCode}

#### 5.1.2 Accounts Receivable Service
- **Purpose:** Customer invoicing and collections
- **Features:**
  - Customer invoice management
  - E-Invoice integration (Nghị định 123/2020)
  - Payment receipts
  - AR aging analysis
  - Credit limit checking
  - Customer statements
- **Key Algorithms:**
  - Aging buckets (0-30, 31-60, 61-90, 90+ days)
  - Payment allocation (FIFO, LIFO, manual)
  - Bad debt provisioning

#### 5.1.3 Accounts Payable Service
- **Purpose:** Vendor bill management and payments
- **Features:**
  - Vendor invoice processing
  - 3-way matching (PO-GR-Invoice)
  - Payment processing
  - AP aging analysis
  - Vendor statements
- **Integration:**
  - E-Invoice validation
  - Banking API for payments

#### 5.1.4 Fixed Assets Service
- **Purpose:** Asset lifecycle management
- **Features:**
  - Asset registration
  - Automatic depreciation calculation
  - Asset transfer between departments
  - Asset revaluation
  - Asset disposal
  - QR code/Barcode management
- **Depreciation Methods:**
  - Straight-line (Đường thẳng)
  - Declining balance (Số dư giảm dần)
- **Compliance:** VAS 03 - Tài sản cố định

#### 5.1.5 Cash Management Service
- **Purpose:** Cash and bank account management
- **Features:**
  - Cash book (Sổ quỹ)
  - Bank accounts management
  - Bank reconciliation
  - Cash flow forecasting
  - Payment vouchers
  - Receipt vouchers
- **Integration:**
  - Banking API for statement sync
  - Real-time balance updates

#### 5.1.6 Tax Service
- **Purpose:** Tax calculation and declaration
- **Features:**
  - VAT calculation (0%, 5%, 8%, 10%)
  - VAT declaration (Form 01/GTGT)
  - CIT calculation and declaration
  - PIT integration from Payroll
  - Tax payment tracking
  - Tax refund management
- **Compliance:**
  - Luật Thuế GTGT
  - Luật Thuế TNDN
  - Thông tư 219/2013/TT-BTC

#### 5.1.7 Financial Reporting Service
- **Purpose:** Generate financial reports per VAS
- **Features:**
  - Balance Sheet (Bảng cân đối kế toán - VAS)
  - Income Statement (Báo cáo kết quả kinh doanh)
  - Cash Flow Statement (Báo cáo lưu chuyển tiền tệ)
  - Notes to Financial Statements
  - Management reports
  - Custom report builder
  - Export to Excel, PDF
- **Report Templates:** Thông tư 133/2016/TT-BTC

### 5.2 Supporting Components

#### 5.2.1 Audit Service
- Comprehensive audit trails
- User activity logging
- Financial data change tracking
- Compliance reporting
- 7-year data retention

#### 5.2.2 Workflow Engine
- Approval workflows
- Multi-level approvals
- Configurable rules
- Email notifications

#### 5.2.3 Document Management
- Invoice attachments
- Contract storage
- Scanned receipts
- Version control

---

## 6. DEPLOYMENT ARCHITECTURE

### 6.1 Production Environment

```mermaid
graph TB
    subgraph "Internet"
        USER[Accountants]
        EINV[E-Invoice Portal]
        BANK[Banking System]
    end

    subgraph "DMZ"
        LB[Load Balancer<br/>nginx]
        WAF[Web Application<br/>Firewall]
    end

    subgraph "Application Tier"
        subgraph "Kubernetes Cluster"
            subgraph "Node 1"
                GL1[GL Service]
                AR1[AR Service]
            end
            subgraph "Node 2"
                AP1[AP Service]
                FA1[FA Service]
            end
            subgraph "Node 3"
                CASH1[Cash Service]
                TAX1[Tax Service]
                RPT1[Report Service]
            end
        end
    end

    subgraph "Data Tier"
        DB_MASTER[(MySQL<br/>Master)]
        DB_SLAVE[(MySQL<br/>Read Replica)]
        REDIS[(Redis Cluster)]
        MINIO[MinIO<br/>Object Storage]
    end

    subgraph "Monitoring"
        PROM[Prometheus]
        GRAF[Grafana]
        ELK[ELK Stack]
    end

    USER --> WAF
    EINV --> WAF
    BANK --> WAF

    WAF --> LB
    LB --> GL1
    LB --> AR1
    LB --> AP1
    LB --> FA1
    LB --> CASH1
    LB --> TAX1
    LB --> RPT1

    GL1 --> DB_MASTER
    AR1 --> DB_MASTER
    AP1 --> DB_MASTER
    FA1 --> DB_MASTER
    CASH1 --> DB_MASTER
    TAX1 --> DB_MASTER
    RPT1 --> DB_SLAVE

    GL1 --> REDIS
    AR1 --> REDIS
    AP1 --> REDIS

    AR1 --> MINIO
    AP1 --> MINIO
    FA1 --> MINIO

    GL1 --> PROM
    AR1 --> PROM
    AP1 --> PROM
    PROM --> GRAF
```

### 6.2 Environment Specifications

| Environment | Purpose | Configuration |
|-------------|---------|---------------|
| **Development** | Local development | Docker Compose, single instance |
| **Testing** | QA testing | Kubernetes, 1 replica per service |
| **Staging** | Pre-production | Same as production, smaller scale |
| **Production** | Live system | HA setup, 3+ replicas |

### 6.3 Scaling Strategy

#### Horizontal Scaling
- Microservices: 3-5 replicas based on load
- Database: Read replicas for reporting
- Redis: Cluster mode with 6 nodes
- Report generation: Separate worker pool

#### Vertical Scaling
- Initial: 4 vCPU, 8GB RAM per service
- Peak: 8 vCPU, 16GB RAM

---

## 7. SECURITY ARCHITECTURE

### 7.1 Security Layers

| Layer | Security Measures |
|-------|------------------|
| **Network** | Firewall, VPN, DMZ segmentation |
| **Application** | Django authentication, JWT for API, RBAC |
| **Data** | AES-256 encryption at rest, TLS 1.3 in transit |
| **Audit** | Comprehensive logging, immutable audit trails |
| **Compliance** | VAS compliance checks, data retention policies |

### 7.2 Authentication & Authorization

```mermaid
graph LR
    USER[User] --> LOGIN[Login Django]
    LOGIN --> AUTH[Django Auth + JWT]
    AUTH --> PERM[Permission Check]
    PERM --> RBAC{RBAC}
    RBAC -->|Accountant| VIEW[View/Edit Entries]
    RBAC -->|Chief Accountant| APPROVE[Approve & Close Period]
    RBAC -->|Auditor| READONLY[Read-only Access]
```

### 7.3 Data Security
- **Encryption at Rest:** MySQL TDE (Transparent Data Encryption)
- **Encryption in Transit:** TLS 1.3
- **Sensitive Data:** Masking in logs and UI
- **Financial Data Protection:** Role-based column-level security
- **Backup:** Daily encrypted backups with 7-year retention

---

## 8. PERFORMANCE & SCALABILITY

### 8.1 Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Journal Entry Save** | <1 second | 95th percentile |
| **Report Generation** | <5 seconds | Standard reports |
| **Period Close** | <30 minutes | 10,000 transactions |
| **Concurrent Users** | 200+ | Active sessions |
| **Availability** | 99.9% | Monthly uptime |
| **RTO** | <4 hours | Recovery time |
| **RPO** | <1 hour | Data loss tolerance |

### 8.2 Performance Optimization

#### Caching Strategy
- **Redis:** Chart of Accounts, user sessions
- **Application Cache:** Tax rates, exchange rates
- **Database:** Materialized views for reports

#### Database Optimization
- Partitioning by fiscal year
- Indexes on account_code, transaction_date
- Read replicas for reporting
- Connection pooling

#### Async Processing
- Celery for report generation
- Background jobs for depreciation calculation
- Event-driven updates via RabbitMQ

---

## 9. INTEGRATION ARCHITECTURE

### 9.1 Integration Points

| System | Type | Protocol | Purpose |
|--------|------|----------|---------|
| **Payroll System** | Internal | REST API | Salary posting to GL |
| **E-Invoice Portal** | External | XML/SOAP | Invoice issuance (Nghị định 123) |
| **Banking System** | External | REST/Open Banking | Transaction sync |
| **Tax Portal** | External | XML | Tax declaration |
| **ERP Inventory** | Internal | REST API | COGS posting |

### 9.2 Integration Patterns

#### 9.2.1 Payroll to GL Integration
```
Payroll System → POST /api/gl/journal-entries
Body: {
  "source": "PAYROLL",
  "period": "2024-09",
  "entries": [
    {
      "account": "622",  // Salary expense
      "debit": 245000000,
      "description": "Salary Sep 2024"
    },
    {
      "account": "334",  // Salary payable
      "credit": 245000000
    }
  ]
}
```

#### 9.2.2 E-Invoice Integration
```
AR Service → E-Invoice Gateway → Tax Portal
- Generate invoice XML (CII format)
- Sign with HSM/USB token
- Submit to tax portal
- Receive invoice code
- Update AR with invoice status
```

#### 9.2.3 Banking Integration
```
Banking API → Cash Service
- Daily statement sync
- Transaction matching with vouchers
- Auto-reconciliation
- Variance reporting
```

---

## 10. ARCHITECTURE DECISIONS

### 10.1 Architecture Decision Records (ADRs)

| ADR# | Decision | Rationale | Consequences |
|------|----------|-----------|--------------|
| ADR-001 | Django Monolith over Microservices (initially) | Faster development, easier audit trail | May need to break into microservices later |
| ADR-002 | MySQL over PostgreSQL | Widespread use in VN, good JSON support | Vendor lock-in |
| ADR-003 | Django Templates over React SPA | Server-side rendering, better for compliance | Less interactive UI |
| ADR-004 | Event Sourcing for GL | Immutable audit trail, replay capability | Complexity in queries |
| ADR-005 | Elasticsearch for reporting | Fast full-text search on transactions | Additional infrastructure |
| ADR-006 | MinIO for documents | S3-compatible, self-hosted | Storage management |

### 10.2 VAS Compliance Decisions

| Decision | VAS Standard | Implementation |
|----------|-------------|----------------|
| Double-entry bookkeeping | VAS 01 | Validation in GL service |
| Chart of Accounts | Thông tư 200 | Configurable account structure |
| Financial statement format | Thông tư 133 | Report templates |
| Fixed asset depreciation | VAS 03 | Automatic calculation engine |
| Revenue recognition | VAS 14 | AR service logic |

### 10.3 Technical Debt

| Item | Priority | Mitigation |
|------|----------|------------|
| Monolith to microservices | Medium | Plan for gradual decomposition |
| Test coverage | High | Increase to 80%+ for financial logic |
| Real-time reporting | Low | Implement CQRS pattern |

---

## 11. DISASTER RECOVERY

### 11.1 Backup Strategy

| Data Type | Frequency | Retention | Location |
|-----------|-----------|-----------|----------|
| Transaction Data | Hourly | 7 years | Offsite backup |
| Financial Statements | Daily | 10 years | Encrypted archive |
| System Configs | On change | Versioned | Git repository |

### 11.2 Recovery Procedures

1. **Database Recovery**
   - Point-in-time recovery using binlogs
   - Automated failover to replica
   - Data integrity verification

2. **Service Recovery**
   - Kubernetes auto-restart
   - Health check monitoring
   - Load balancer failover

---

## 12. MONITORING & OBSERVABILITY

### 12.1 Key Metrics

| Category | Metrics |
|----------|---------|
| **Business** | Journal entries posted, Period close time, Report generation count |
| **Application** | API response time, Error rate, Queue depth |
| **Database** | Query performance, Lock wait time, Replication lag |
| **Integration** | E-Invoice success rate, Banking sync status |

### 12.2 Alerting Rules

| Alert | Condition | Action |
|-------|-----------|--------|
| Journal Imbalance | Debit != Credit | Block and alert accountant |
| Period Close Failure | Close process fails | Email CFO and accounting team |
| E-Invoice Error | >5% submission failures | Alert tax accountant |
| Database Lag | >10 seconds | Auto-failover |

---

## 13. COMPLIANCE & GOVERNANCE

### 13.1 Regulatory Compliance

- **Luật Kế toán 88/2015/QH13**
- **Chuẩn mực Kế toán Việt Nam (VAS 01-26)**
- **Thông tư 200/2014/TT-BTC** - Hệ thống tài khoản
- **Thông tư 133/2016/TT-BTC** - Báo cáo tài chính
- **Nghị định 123/2020/NĐ-CP** - Hóa đơn điện tử
- **Nghị định 13/2023/NĐ-CP** - Bảo vệ dữ liệu cá nhân

### 13.2 Architecture Governance

- Architecture review board (CFO, CTO, Chief Accountant)
- Quarterly architecture reviews
- Annual compliance audits
- External audit readiness

---

## 14. APPENDICES

### A. Glossary
| Term | Definition |
|------|------------|
| VAS | Vietnamese Accounting Standards |
| GL | General Ledger |
| AR | Accounts Receivable |
| AP | Accounts Payable |
| FA | Fixed Assets |
| COGS | Cost of Goods Sold |
| TDE | Transparent Data Encryption |

### B. References
- [VAS Standards](http://www.mof.gov.vn)
- [Thông tư 200/2014/TT-BTC](https://thuvienphapluat.vn)
- [Django Documentation](https://www.djangoproject.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

### C. Version History
| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2024-10-09 | Initial version | Architecture Team |

---

**Document Status:** DRAFT
**Review Status:** Pending
**Approval:** Required from CFO and Chief Accountant
