# Data Flow Diagram (DFD)
# Hệ thống Kế toán - Accounting Module

## Lịch sử Phiên bản

| Phiên bản | Ngày       | Tác giả | Mô tả Thay đổi |
|-----------|------------|---------|----------------|
| 1.0       | 2024-10-03 | BA Team | Phiên bản khởi tạo |

---

## MỤC LỤC

1. [Giới thiệu](#1-giới-thiệu)
2. [Context Diagram (Level 0)](#2-context-diagram-level-0)
3. [Level 1 DFD - Main Processes](#3-level-1-dfd---main-processes)
4. [Level 2 DFD - Detailed Processes](#4-level-2-dfd---detailed-processes)
5. [Data Dictionary](#5-data-dictionary)
6. [Data Stores](#6-data-stores)
7. [Integration Data Flows](#7-integration-data-flows)

---

## 1. GIỚI THIỆU

### 1.1 Mục đích

Data Flow Diagram (DFD) mô tả luồng dữ liệu trong hệ thống Accounting, bao gồm:
- ✅ Nguồn dữ liệu (External Entities)
- ✅ Quy trình xử lý (Processes)
- ✅ Lưu trữ dữ liệu (Data Stores)
- ✅ Luồng dữ liệu (Data Flows)

### 1.2 Ký hiệu DFD

```
[External Entity]  = Nguồn/Đích dữ liệu bên ngoài (hình chữ nhật)
(Process)          = Quy trình xử lý (hình tròn/oval)
==Data Store==     = Kho dữ liệu (2 đường song song)
──────>            = Luồng dữ liệu (mũi tên)
```

### 1.3 Phân cấp DFD

- **Level 0 (Context):** Tổng quan toàn hệ thống
- **Level 1:** Các quy trình chính (Epics)
- **Level 2:** Chi tiết từng quy trình
- **Level 3:** (Nếu cần) Chi tiết hơn nữa

---

## 2. CONTEXT DIAGRAM (LEVEL 0)

### 2.1 System Context

```
                    ┌─────────────────┐
                    │   Kế toán viên  │
                    └────────┬────────┘
                             │
                  Journal    │   Reports
                  Entries    │   Ledgers
                             │
    ┌─────────────┐          ▼          ┌──────────────┐
    │  Suppliers  │    ┌─────────────┐  │  Customers   │
    │   (NCC)     │───>│             │<─┤    (KH)      │
    └─────────────┘    │             │  └──────────────┘
         Invoices      │  ACCOUNTING │       Invoices
                       │    SYSTEM   │       Payments
    ┌─────────────┐    │             │  ┌──────────────┐
    │ Tax Authority│<──┤             │──>│ Bank System  │
    │  (Cơ quan   │    │   (0.0)     │  │              │
    │   Thuế)     │    └─────────────┘  └──────────────┘
    └─────────────┘          │                 │
         Tax                 │                 │
         Declarations        │                 │
                             │          Bank   │
                        ┌────▼────┐     Statements
                        │  Payroll│
                        │  System │
                        └─────────┘
                          Salary
                          Data
```

**External Entities:**
1. **Kế toán viên**: Nhập liệu, xem báo cáo
2. **Suppliers (NCC)**: Gửi hóa đơn mua hàng
3. **Customers (KH)**: Nhận hóa đơn bán hàng, thanh toán
4. **Tax Authority**: Nhận tờ khai thuế
5. **Bank System**: Cung cấp sao kê ngân hàng
6. **Payroll System**: Gửi dữ liệu lương, thuế TNCN

---

## 3. LEVEL 1 DFD - MAIN PROCESSES

### 3.1 High-Level Processes

```
[Kế toán viên]
      │
      │ Bút toán, Chứng từ
      ▼
   ┌──────────────────────┐
   │  1.0                 │
   │  General Ledger      │───────> ==D1: Chart of Accounts==
   │                      │
   └──────┬───────────────┘
          │ Journal Entries
          ▼
   ==D2: Journal Entries==
          │
          ├─────────────────────────────────┐
          │                                 │
          ▼                                 ▼
   ┌──────────────┐                 ┌──────────────┐
   │  2.0         │                 │  3.0         │
   │  AP          │<───Invoices────[Suppliers]     │  AR          │
   │              │                 │              │
   └──────────────┘                 └──────────────┘
          │                                 │
          │                                 │
          ▼                                 ▼
   ==D3: AP Data==                   ==D4: AR Data==
          │                                 │
          └─────────────┬───────────────────┘
                        │
                        ▼
                 ┌──────────────┐
                 │  4.0         │
                 │  Cash Mgmt   │<───Statements───[Bank]
                 └──────┬───────┘
                        │
                        ▼
                 ==D5: Cash Data==
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
   ┌──────────┐  ┌──────────┐  ┌──────────┐
   │  5.0     │  │  6.0     │  │  7.0     │
   │  Fixed   │  │  Tax     │  │ Financial│
   │  Assets  │  │  Mgmt    │  │ Reporting│
   └──────────┘  └────┬─────┘  └────┬─────┘
        │              │              │
        ▼              ▼              ▼
   ==D6: FA==    ==D7: Tax==    ==D8: Reports==
                      │              │
                      │              │
                      ▼              ▼
                  [Tax Auth]    [Kế toán trưởng]
```

**Main Processes:**
1. **1.0 General Ledger**: Quản lý bút toán, sổ cái
2. **2.0 Accounts Payable**: Quản lý công nợ phải trả
3. **3.0 Accounts Receivable**: Quản lý công nợ phải thu
4. **4.0 Cash Management**: Quản lý ngân quỹ
5. **5.0 Fixed Assets**: Quản lý TSCĐ
6. **6.0 Tax Management**: Quản lý thuế
7. **7.0 Financial Reporting**: Báo cáo tài chính

---

## 4. LEVEL 2 DFD - DETAILED PROCESSES

### 4.1 Process 1.0 - General Ledger (Chi tiết)

```
[Kế toán viên]
      │
      │ (1) Thông tin bút toán
      ▼
   ┌─────────────────────┐
   │  1.1                │
   │  Nhập bút toán      │
   └──────┬──────────────┘
          │
          │ (2) Bút toán Draft
          ▼
   ==D2.1: Draft Entries==
          │
          │ (3) Bút toán chờ duyệt
          ▼
   ┌─────────────────────┐
   │  1.2                │
   │  Phê duyệt          │<───(4) Quyết định───[Kế toán trưởng]
   └──────┬──────────────┘
          │
          │ (5) Bút toán approved
          ▼
   ┌─────────────────────┐
   │  1.3                │
   │  Post Entry         │
   └──────┬──────────────┘
          │
          │ (6) Posted entries
          ▼
   ==D2.2: Posted Entries==
          │
          ├─────────────────┬────────────────┐
          │                 │                │
          ▼                 ▼                ▼
   ┌──────────┐      ┌──────────┐    ┌──────────┐
   │  1.4     │      │  1.5     │    │  1.6     │
   │  Cập nhật│      │  Tạo sổ  │    │ Kết chuyển│
   │  Sổ cái  │      │  chi tiết│    │  cuối kỳ │
   └────┬─────┘      └────┬─────┘    └────┬─────┘
        │                 │                │
        ▼                 ▼                ▼
   ==D3: Ledgers==  ==D4: Sub-Ledgers== ==D5: Closing==
        │
        │ (7) Ledger data
        ▼
   [Kế toán viên]
   (View reports)
```

**Data Flows (1.0):**
1. Kế toán viên → 1.1: Thông tin bút toán (Ngày, Số CT, TK Nợ/Có, Số tiền)
2. 1.1 → D2.1: Lưu bút toán Draft
3. D2.1 → 1.2: Bút toán chờ phê duyệt
4. Kế toán trưởng → 1.2: Quyết định (Approve/Reject)
5. 1.2 → 1.3: Bút toán đã approved
6. 1.3 → D2.2: Posted entries
7. D2.2 → 1.4/1.5/1.6: Dữ liệu để xử lý
8. 1.4 → D3: Cập nhật Sổ cái
9. D3 → Kế toán viên: Xem báo cáo

---

### 4.2 Process 2.0 - Accounts Payable (Chi tiết)

```
[Suppliers]
      │
      │ (1) Hóa đơn (Paper/e-Invoice)
      ▼
   ┌─────────────────────┐
   │  2.1                │
   │  Nhận & Validate    │
   │  Hóa đơn NCC        │
   └──────┬──────────────┘
          │
          │ (2) Hóa đơn validated
          ▼
   ==D6: AP Invoices==
          │
          │ (3) Hóa đơn cần matching
          ▼
   ┌─────────────────────┐
   │  2.2                │
   │  3-Way Matching     │<───(4) PO data───==D7: Purchase Orders==
   │                     │<───(5) GR data───==D8: Goods Receipts==
   └──────┬──────────────┘
          │
          │ (6) Matched invoice
          ▼
   ┌─────────────────────┐
   │  2.3                │
   │  Tạo bút toán AP    │────>(7) Journal entry────> (1.0 GL)
   └──────┬──────────────┘
          │
          │ (8) AP liability
          ▼
   ==D9: AP Balances==
          │
          │ (9) Hóa đơn đến hạn TT
          ▼
   ┌─────────────────────┐
   │  2.4                │
   │  Thanh toán NCC     │<───(10) Approval───[Kế toán trưởng]
   └──────┬──────────────┘
          │
          │ (11) Payment instruction
          ▼
   (4.0 Cash Management)
          │
          │ (12) Payment confirmation
          ▼
   ==D6: AP Invoices==
   (Update status: Paid)
```

**Data Flows (2.0):**
1. Suppliers → 2.1: Hóa đơn (Số HĐ, Ngày, Chi tiết hàng, Số tiền, VAT)
2. 2.1 → D6: Lưu hóa đơn đã validate
3. D6 → 2.2: Hóa đơn cần matching
4. D7 → 2.2: PO data (để so sánh)
5. D8 → 2.2: GR data (để so sánh)
6. 2.2 → 2.3: Hóa đơn đã match (hoặc approved exception)
7. 2.3 → 1.0 GL: Bút toán ghi tăng công nợ
8. 2.3 → D9: Cập nhật số dư công nợ AP
9. D9 → 2.4: Hóa đơn đến hạn thanh toán
10. Kế toán trưởng → 2.4: Phê duyệt thanh toán
11. 2.4 → 4.0: Lệnh thanh toán (NCC, Số tiền, STK)
12. 4.0 → D6: Xác nhận đã thanh toán

---

### 4.3 Process 3.0 - Accounts Receivable (Chi tiết)

```
   ┌─────────────────────┐
   │  3.1                │
   │  Tạo hóa đơn KH     │<───(1) Sales Order───==D10: Sales Orders==
   └──────┬──────────────┘
          │
          │ (2) Invoice data
          ▼
   ┌─────────────────────┐
   │  3.2                │
   │  Xuất e-Invoice     │────>(3) XML───────> [Tax Authority]
   │                     │<───(4) Mã CQT──────[Tax Authority]
   └──────┬──────────────┘
          │
          │ (5) Invoice + Mã CQT
          ▼
   ==D11: AR Invoices==
          │
          ├────────────────────────────┐
          │                            │
          │ (6) Invoice PDF            │ (7) AR liability
          ▼                            ▼
   [Customers]                  ┌─────────────┐
   (Email invoice)              │  3.3        │
                                │  Tạo BT AR  │──>(8) JE──>(1.0 GL)
                                └─────┬───────┘
                                      │
                                      ▼
                               ==D12: AR Balances==
                                      │
          ┌───────────────────────────┤
          │                           │
          ▼                           ▼
   ┌─────────────┐             ┌─────────────┐
   │  3.4        │             │  3.5        │
   │  Thu tiền   │<──(9)───────│ Quản lý nợ  │
   │  KH         │   Payment   │  quá hạn    │
   └──────┬──────┘             └─────────────┘
          │
          │ (10) Receipt
          ▼
   (4.0 Cash Management)
          │
          │ (11) Confirmation
          ▼
   ==D11: AR Invoices==
   (Update: Paid)
```

---

### 4.4 Process 4.0 - Cash Management (Chi tiết)

```
[Kế toán viên]
      │
      │ (1) Phiếu thu/chi
      ▼
   ┌─────────────────────┐
   │  4.1                │
   │  Quản lý tiền mặt   │
   └──────┬──────────────┘
          │
          │ (2) Cash transactions
          ▼
   ==D13: Cash Ledger==
          │
          │
   ┌──────▼──────────────┐
   │  4.2                │
   │  Quản lý ngân hàng  │<───(3) Sao kê───[Bank System]
   └──────┬──────────────┘
          │
          │ (4) Bank transactions
          ▼
   ==D14: Bank Ledger==
          │
          │ (5) Bank data
          ▼
   ┌─────────────────────┐
   │  4.3                │
   │  Đối chiếu NH       │
   └──────┬──────────────┘
          │
          │ (6) Reconciled data
          ▼
   ==D15: Bank Reconciliation==
          │
          │ (7) Cash/Bank JE
          ▼
   (1.0 General Ledger)
```

**Data Flows (4.0):**
1. Kế toán viên → 4.1: Phiếu thu/chi tiền mặt
2. 4.1 → D13: Ghi nhận giao dịch tiền mặt
3. Bank → 4.2: Sao kê ngân hàng (Excel/API)
4. 4.2 → D14: Ghi nhận giao dịch ngân hàng
5. D14 → 4.3: Dữ liệu ngân hàng để đối chiếu
6. 4.3 → D15: Kết quả đối chiếu
7. 4.1/4.2 → 1.0 GL: Bút toán thu/chi tiền

---

### 4.5 Process 5.0 - Fixed Assets (Chi tiết)

```
   ┌─────────────────────┐
   │  5.1                │
   │  Đăng ký TSCĐ       │<───(1) FA info───[Kế toán TSCĐ]
   └──────┬──────────────┘
          │
          │ (2) New FA
          ▼
   ==D16: FA Register==
          │
          │ (3) Active FA
          ▼
   ┌─────────────────────┐
   │  5.2                │
   │  Khấu hao tự động   │
   │  (Cuối tháng)       │
   └──────┬──────────────┘
          │
          ├─────────────────┬─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
   ==D16: FA==       ┌──────────┐      (1.0 GL)
   (Update          │  5.3     │      Depreciation
    accumulated)    │  Thanh lý│       JE
                    └────┬─────┘
                         │
                         │ (4) Disposal info
                         ▼
                  ==D17: FA History==
```

---

### 4.6 Process 6.0 - Tax Management (Chi tiết)

```
   ┌─────────────────────┐
   │  6.1                │
   │  Thu thập dữ liệu   │<───(1) VAT đầu vào──(2.0 AP)
   │  thuế               │<───(2) VAT đầu ra───(3.0 AR)
   │                     │<───(3) Thuế TNCN────[Payroll]
   └──────┬──────────────┘
          │
          │ (4) Tax data
          ▼
   ==D18: Tax Data==
          │
          ├─────────────────┬─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
   ┌──────────┐      ┌──────────┐      ┌──────────┐
   │  6.2     │      │  6.3     │      │  6.4     │
   │  Khai VAT│      │ Khai CIT │      │ Khai PIT │
   └────┬─────┘      └────┬─────┘      └────┬─────┘
        │                 │                 │
        │ (5) Tờ khai     │ (6) Tờ khai     │ (7) Tờ khai
        ▼                 ▼                 ▼
   ┌─────────────────────────────────────────────┐
   │  6.5                                        │
   │  Xuất XML & Nộp qua eTax                    │
   └──────┬──────────────────────────────────────┘
          │
          │ (8) Tax declaration XML
          ▼
   [Tax Authority]
          │
          │ (9) Mã hồ sơ
          ▼
   ==D19: Tax History==
```

---

### 4.7 Process 7.0 - Financial Reporting (Chi tiết)

```
   ==D3: Ledgers==
   ==D12: AR==
   ==D9: AP==
   ==D13/14: Cash==
   ==D16: FA==
          │
          │ (1) Financial data
          ▼
   ┌─────────────────────┐
   │  7.1                │
   │  Tổng hợp dữ liệu   │
   └──────┬──────────────┘
          │
          ├─────────────────┬─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
   ┌──────────┐      ┌──────────┐      ┌──────────┐
   │  7.2     │      │  7.3     │      │  7.4     │
   │  Bảng CĐ │      │ Báo cáo  │      │ Báo cáo  │
   │  KT      │      │  KQKD    │      │  LCTTT   │
   └────┬─────┘      └────┬─────┘      └────┬─────┘
        │                 │                 │
        │                 │                 │
        └────────┬────────┴─────────────────┘
                 │
                 │ (2) Financial statements
                 ▼
          ┌──────────────┐
          │  7.5         │
          │  Ký & Lưu trữ│<───(3) Signature───[Kế toán trưởng]
          └──────┬───────┘
                 │
                 │ (4) Final BCTC
                 ▼
          ==D20: Reports Archive==
                 │
                 │ (5) BCTC PDF
                 ▼
          [CFO, Stakeholders]
```

---

## 5. DATA DICTIONARY

### 5.1 Data Elements

| Data Element | Type | Length | Description | Example |
|--------------|------|--------|-------------|---------|
| **Journal Entry ID** | String | 20 | Mã bút toán (unique) | JE-2024-001 |
| **Document Date** | Date | - | Ngày chứng từ | 15/10/2024 |
| **Document Number** | String | 50 | Số chứng từ | PC001 |
| **Account Code** | String | 10 | Mã tài khoản | 111, 131, 511 |
| **Account Name** | String | 255 | Tên tài khoản | Tiền mặt |
| **Debit Amount** | Decimal | 18,2 | Số tiền Nợ | 5000000.00 |
| **Credit Amount** | Decimal | 18,2 | Số tiền Có | 5000000.00 |
| **Description** | Text | 500 | Diễn giải | Thu tiền khách hàng A |
| **Status** | Enum | - | Trạng thái | Draft/Pending/Posted |
| **Created By** | String | 50 | Người tạo (User ID) | KTV_Lan |
| **Created Date** | DateTime | - | Ngày tạo | 2024-10-15 10:30:00 |
| **Approved By** | String | 50 | Người duyệt | KTT_Hoa |
| **Approved Date** | DateTime | - | Ngày duyệt | 2024-10-15 14:00:00 |
| **Entity Type** | Enum | - | Loại đối tượng | Customer/Supplier/Employee |
| **Entity ID** | String | 20 | Mã đối tượng | KH-001, NCC-005 |
| **Entity Name** | String | 255 | Tên đối tượng | Công ty ABC |
| **Tax Code** | String | 13 | Mã số thuế | 0123456789012 |
| **Tax Rate** | Decimal | 5,2 | Thuế suất VAT (%) | 10.00 |
| **Invoice Number** | String | 50 | Số hóa đơn | 0001234 |
| **Invoice Date** | Date | - | Ngày hóa đơn | 15/10/2024 |
| **Due Date** | Date | - | Hạn thanh toán | 14/11/2024 |
| **Payment Method** | Enum | - | Phương thức TT | Cash/Bank Transfer |
| **Asset Code** | String | 20 | Mã TSCĐ | FA-2024-001 |
| **Asset Cost** | Decimal | 18,2 | Nguyên giá TSCĐ | 30000000.00 |
| **Useful Life** | Integer | - | Thời gian SD (tháng) | 48 |
| **Depreciation Method** | Enum | - | Phương pháp KH | Straight Line/Declining |

### 5.2 Data Structures

#### Journal Entry (Composite)

```
JournalEntry {
  JournalEntryID: String
  DocumentDate: Date
  DocumentNumber: String
  Description: Text
  Status: Enum
  CreatedBy: String
  CreatedDate: DateTime
  ApprovedBy: String
  ApprovedDate: DateTime

  Lines: [
    {
      LineNumber: Integer
      AccountCode: String
      DebitAmount: Decimal
      CreditAmount: Decimal
      EntityType: Enum
      EntityID: String
      Memo: String
    }
  ]

  Attachments: [
    {
      FileName: String
      FileURL: String
      UploadDate: DateTime
    }
  ]
}
```

#### Invoice (AP/AR)

```
Invoice {
  InvoiceID: String
  InvoiceType: Enum (AP/AR)
  EntityID: String (Supplier/Customer)
  EntityName: String
  TaxCode: String
  InvoiceNumber: String
  InvoiceDate: Date
  DueDate: Date

  Lines: [
    {
      LineNumber: Integer
      Description: String
      Quantity: Decimal
      UnitPrice: Decimal
      Amount: Decimal
      TaxRate: Decimal
      TaxAmount: Decimal
    }
  ]

  TotalAmount: Decimal
  TotalTax: Decimal
  GrandTotal: Decimal

  Status: Enum (Unpaid/PartiallyPaid/Paid)
  PaidAmount: Decimal
  RemainingAmount: Decimal

  eInvoiceCode: String (Mã CQT)
  eInvoiceXML: Text
}
```

---

## 6. DATA STORES

### 6.1 Logical Data Stores

| ID | Data Store Name | Description | Contains | Updated By |
|----|-----------------|-------------|----------|------------|
| **D1** | Chart of Accounts | Hệ thống tài khoản kế toán | Account Code, Name, Type, Parent | 1.0 GL |
| **D2** | Journal Entries | Bút toán kế toán | JE header + lines | 1.0 GL |
| **D3** | General Ledger | Sổ cái tổng hợp | Account balances, transactions | 1.0 GL |
| **D4** | Sub-Ledgers | Sổ chi tiết | Detailed transactions by object | 1.0 GL |
| **D5** | Closing Entries | Bút toán kết chuyển | Period-end closings | 1.0 GL |
| **D6** | AP Invoices | Hóa đơn nhà cung cấp | Supplier invoices | 2.0 AP |
| **D7** | Purchase Orders | Đơn đặt hàng | PO data (for matching) | Purchasing |
| **D8** | Goods Receipts | Phiếu nhập kho | GR data (for matching) | Inventory |
| **D9** | AP Balances | Số dư công nợ AP | Payable balances by supplier | 2.0 AP |
| **D10** | Sales Orders | Đơn bán hàng | Sales order data | Sales |
| **D11** | AR Invoices | Hóa đơn khách hàng | Customer invoices | 3.0 AR |
| **D12** | AR Balances | Số dư công nợ AR | Receivable balances by customer | 3.0 AR |
| **D13** | Cash Ledger | Sổ quỹ tiền mặt | Cash transactions | 4.0 CM |
| **D14** | Bank Ledger | Sổ tiền gửi NH | Bank transactions | 4.0 CM |
| **D15** | Bank Reconciliation | Đối chiếu ngân hàng | Reconciliation records | 4.0 CM |
| **D16** | FA Register | Sổ TSCĐ | Fixed asset register | 5.0 FA |
| **D17** | FA History | Lịch sử TSCĐ | FA transactions (buy/transfer/dispose) | 5.0 FA |
| **D18** | Tax Data | Dữ liệu thuế | Tax calculations | 6.0 TAX |
| **D19** | Tax History | Lịch sử khai thuế | Tax declarations, filings | 6.0 TAX |
| **D20** | Reports Archive | Lưu trữ báo cáo | Financial statements by period | 7.0 FR |

### 6.2 Physical Data Stores (Database Tables)

**Core Tables:**
- `accounts` - Chart of Accounts
- `journal_entries` - Journal entry headers
- `journal_entry_lines` - Journal entry details
- `ledger_balances` - Account balances by period
- `suppliers` - Supplier master
- `customers` - Customer master
- `ap_invoices` - AP invoice headers
- `ap_invoice_lines` - AP invoice details
- `ar_invoices` - AR invoice headers
- `ar_invoice_lines` - AR invoice details
- `payments` - Payment transactions
- `receipts` - Receipt transactions
- `fixed_assets` - FA master
- `fa_depreciation` - Depreciation schedule
- `tax_declarations` - Tax filing records
- `financial_reports` - Report metadata

---

## 7. INTEGRATION DATA FLOWS

### 7.1 Integration with Payroll Module

```
[Payroll System]
      │
      │ (1) Salary data (cuối tháng)
      │     - Employee salaries
      │     - BHXH (employee + employer)
      │     - Thuế TNCN khấu trừ
      ▼
┌──────────────────┐
│ Integration API  │
└────────┬─────────┘
         │
         │ (2) Validated data
         ▼
  ┌──────────────┐
  │  Transform   │
  │  to GL Entry │
  └──────┬───────┘
         │
         │ (3) Journal entries:
         │     - Nợ: 641/642 (Lương)
         │     - Nợ: 623 (BHXH DN)
         │     - Có: 334 (Phải trả NV)
         │     - Có: 338 (Phải trả BHXH)
         │     - Có: 3335 (Thuế TNCN)
         ▼
  (1.0 General Ledger)
         │
         │ (4) Posted entries
         ▼
  ==Ledger updated==
         │
         │ (5) Thuế TNCN data
         ▼
  (6.0 Tax Management)
         │
         │ (6) PIT declaration
         ▼
  [Tax Authority]
```

**Integration Frequency:** Monthly (cuối tháng sau khi đóng kỳ lương)

---

### 7.2 Integration with Bank System

```
[Bank System]
      │
      │ (1) Bank statement
      │     - Date, Description
      │     - Debit/Credit
      │     - Balance
      ▼
┌──────────────────┐
│ Import Statement │
│ (Excel/CSV/API)  │
└────────┬─────────┘
         │
         │ (2) Parsed transactions
         ▼
  ┌──────────────┐
  │ Auto-match   │
  │ with system  │<───(3) Existing entries───==D14: Bank Ledger==
  │ records      │
  └──────┬───────┘
         │
         ├─────────────────┬──────────────────┐
         │                 │                  │
         ▼                 ▼                  ▼
   [Matched]         [Unmatched:        [Unmatched:
   (Do nothing)       on bank,           on system,
                      not in system]     not in bank]
                           │                  │
                           │ (4) Create       │ (5) Mark as
                           │     new entry    │     outstanding
                           ▼                  ▼
                    (4.0 Cash Mgmt)     ==D15: Reconciliation==
```

**Integration Frequency:** Daily or Weekly

---

### 7.3 Integration with e-Invoice System

```
[Tax Authority
 e-Invoice Portal]
      │
      │ (1) Invoice data (when creating AR invoice)
      ▼
┌──────────────────┐
│ e-Invoice API    │
│ (Create invoice) │
└────────┬─────────┘
         │
         │ (2) Validation response
         ▼
  ┌──────────────┐
  │ If approved: │
  │ Get Mã CQT   │
  └──────┬───────┘
         │
         │ (3) Mã CQT + Signed XML
         ▼
  ==D11: AR Invoices==
  (Update invoice with Mã CQT)
         │
         │ (4) Send PDF to customer
         ▼
  [Customer]
  (Email with e-Invoice PDF)
```

---

### 7.4 Integration with Sales/Purchasing Modules

```
[Sales Module]
      │
      │ (1) Sales Order approved
      ▼
  (3.0 AR)
  Create AR Invoice
      │
      │ (2) Invoice created
      ▼
  (1.0 GL)
  Revenue JE posted


[Purchasing Module]
      │
      │ (1) Purchase Order created
      │ (2) Goods Receipt confirmed
      ▼
  (2.0 AP)
  3-Way Matching
      │
      │ (3) Invoice approved
      ▼
  (1.0 GL)
  Expense/Asset JE posted
```

---

## 8. DATA FLOW TIMING

### 8.1 Real-Time Flows

- Journal Entry creation → Ledger update
- Payment creation → Invoice status update
- Receipt creation → AR balance update

### 8.2 Batch Flows (Scheduled)

| Flow | Frequency | Timing |
|------|-----------|--------|
| Depreciation calculation | Monthly | Last day of month, 11:00 PM |
| Month-end closing | Monthly | Accountant-triggered |
| Tax calculation | Monthly/Quarterly | Before tax deadline |
| Bank reconciliation | Daily/Weekly | Configurable |
| Payroll integration | Monthly | After payroll closes |
| e-Invoice sync | Real-time | On invoice creation |

### 8.3 On-Demand Flows

- Report generation (ad-hoc)
- Reconciliation (user-triggered)
- Data export (user-triggered)

---

## 9. DATA SECURITY & CONTROLS

### 9.1 Data Access Controls

```
Data Flow Security:

User → System:
  - Authentication (username/password + MFA)
  - Session management (30 min timeout)

System → Data Stores:
  - Role-based access (RBAC)
  - Row-level security (user can only see their department)
  - Encryption at rest

System → External:
  - HTTPS/TLS 1.2+
  - API authentication (OAuth 2.0)
  - IP whitelisting
```

### 9.2 Data Validation

**Input Validation:**
- Journal Entry: Debit = Credit check
- Invoice: Tax calculation validation
- Date: Cannot be future date (except scheduled)
- Amount: > 0, max 18 digits

**Business Rule Validation:**
- AP Payment: Amount ≤ Remaining balance
- AR Invoice: Total = Sum(Lines) + Tax
- Bank Reconciliation: System balance = Bank balance

---

## PHỤ LỤC: DFD NOTATION REFERENCE

### Standard Symbols

```
External Entity (Nguồn/Đích bên ngoài):
┌─────────────────┐
│  Entity Name    │
└─────────────────┘

Process (Quy trình xử lý):
   ┌─────────────────┐
   │  Process ID     │
   │  Process Name   │
   └─────────────────┘

Data Store (Kho dữ liệu):
   ==D1: Data Store Name==

Data Flow (Luồng dữ liệu):
   ────────>  (with label)
```

---

**Phiên bản:** 1.0
**Ngày tạo:** 2024-10-03
**Người tạo:** BA Team
**Trạng thái:** ✅ Draft - Pending Review
**Tools:** Lucidchart, Draw.io
