# BA Agent Workflow Guide - V5.0

## 📋 Tổng Quan

BA (Business Analyst) Agent có vai trò tạo tài liệu phân tích yêu cầu và thiết kế chi tiết, sau đó submit cho PM xem xét và phê duyệt.

---

## 🎯 Vai Trò và Trách Nhiệm

### BA Agent
- Phân tích yêu cầu kinh doanh
- Tạo tài liệu Requirements (REQ-XXX)
- Tạo tài liệu Design (DES-XXX)
- Submit tài liệu cho PM review
- Cập nhật tài liệu theo feedback của PM

### PM Agent
- Review tài liệu của BA
- Approve hoặc Reject với feedback
- Sử dụng approved design docs để tạo Sprint Plan
- Đảm bảo mỗi Sprint task có tham chiếu đến design doc

---

## 📁 Cấu Trúc Thư Mục

```
c:\trading-erp-mcp\
├── Docs/
│   ├── requirements/           # ← BA Requirements Documents
│   │   ├── REQ-001.json
│   │   ├── REQ-002.json
│   │   └── templates/
│   │       └── requirement-template.md
│   └── design/                 # ← BA Design Documents
│       ├── DES-001.json
│       ├── DES-002.json
│       └── templates/
│           └── design-document-template.md
├── agents/
│   └── ba/
│       ├── ba-helper-v5.0.js  # ← BA Helper
│       └── BA_WORKFLOW_GUIDE.md (this file)
```

---

## 🚀 Workflow: BA → PM → Sprint Plan

### Bước 1: BA Tạo Requirements Document

```javascript
const BAHelper = require('./agents/ba/ba-helper-v5.0.js');
const ba = new BAHelper();

// Create requirements document
const reqDoc = ba.createRequirementDoc({
  doc_id: 'REQ-001',
  doc_name: 'Customer Deposit Management Requirements',
  feature_name: 'Receive Customer Deposit',
  business_need: 'Track customer prepayments and deposits',

  functional_requirements: [
    {
      id: 'FR-001',
      description: 'System must record customer deposits',
      priority: 'high',
      acceptance_criteria: [
        'Accept cash or bank payment',
        'Update customer balance (TK 131)',
        'Generate receipt'
      ]
    }
  ],

  transaction_requirements: [
    {
      id: 'TR-001',
      transaction_code: 'AD001',
      description: 'Receive deposit from customer',
      vas_compliance: [
        'VAS 01 - Chuẩn mực chung',
        'TK 131 có thể dư Có (customer prepayment)'
      ]
    }
  ],

  test_scenarios: [
    {
      id: 'TS-1',
      scenario: 'Receive 3M VND cash deposit',
      expected: 'Nợ 111: 3M, Có 131: 3M'
    }
  ]
});

console.log('✅ Requirements document created:', reqDoc.doc_id);
```

**Kết quả:**
- ✅ File: `Docs/requirements/REQ-001.json`
- Status: `draft`

---

### Bước 2: BA Tạo Design Document

```javascript
// Create design document (references requirement)
const designDoc = ba.createDesignDoc({
  doc_id: 'DES-001',
  doc_name: 'AD001 - Receive Deposit Implementation Design',
  feature_name: 'Receive Customer Deposit',
  requirement_doc_id: 'REQ-001',  // Link to requirement
  transaction_code: 'AD001',

  accounting_logic: {
    debit_entries: [
      {
        account: '111',
        account_name: 'Tiền mặt',
        amount_logic: 'deposit_amount',
        conditions: "payment_method == 'cash'"
      },
      {
        account: '112',
        account_name: 'Tiền gửi ngân hàng',
        amount_logic: 'deposit_amount',
        conditions: "payment_method == 'bank'"
      }
    ],
    credit_entries: [
      {
        account: '131',
        account_name: 'Phải thu khách hàng',
        amount_logic: 'deposit_amount',
        conditions: 'Always (credit balance = prepayment)'
      }
    ]
  },

  parameters: [
    {
      name: 'deposit_amount',
      type: 'number',
      required: true,
      validation: '> 0',
      description: 'Số tiền đặt cọc'
    },
    {
      name: 'customer',
      type: 'string',
      required: true,
      validation: 'not empty',
      description: 'Tên khách hàng'
    },
    {
      name: 'payment_method',
      type: 'string',
      required: true,
      validation: "'cash' or 'bank'",
      description: 'Phương thức thanh toán'
    }
  ],

  validation_rules: [
    'deposit_amount > 0',
    "payment_method in ['cash', 'bank']",
    'customer not empty',
    'If amount >= 5,000,000 VND → must use bank (Nghị định 181/2024)'
  ],

  implementation_specs: {
    files_to_update: [
      'trading_business_transactions.json',
      'trading_account_determination.json',
      'trading-mcp-server-optimized.js'
    ],
    function_name: 'process_ad001',
    complexity: 'medium',
    estimated_hours: 8
  },

  test_scenarios: [
    {
      id: 'TS-1',
      scenario: 'Cash payment < 5M',
      input: { deposit_amount: 3000000, payment_method: 'cash' },
      expected: 'Nợ 111: 3M, Có 131: 3M'
    },
    {
      id: 'TS-2',
      scenario: 'Bank payment < 5M',
      input: { deposit_amount: 3000000, payment_method: 'bank' },
      expected: 'Nợ 112: 3M, Có 131: 3M'
    },
    {
      id: 'TS-3',
      scenario: 'Cash payment >= 5M (error)',
      input: { deposit_amount: 5000000, payment_method: 'cash' },
      expected: 'Error: Must use bank'
    }
  ]
});

console.log('✅ Design document created:', designDoc.doc_id);
```

**Kết quả:**
- ✅ File: `Docs/design/DES-001.json`
- Status: `draft`
- Linked to: `REQ-001`

---

### Bước 3: BA Submit Documents for PM Review

```javascript
// Submit requirement document
await ba.submitDocumentForReview('REQ-001', 'requirement',
  'Requirements completed, ready for PM review');

// Submit design document
await ba.submitDocumentForReview('DES-001', 'design',
  'Design completed with accounting logic and test scenarios');
```

**Kết quả:**
- ✅ Documents status: `draft` → `under_review`
- ✅ Orchestrator creates review tasks
- ✅ PM được notified

---

### Bước 4: PM Review and Approve

```javascript
const PMHelper = require('./agents/pm/pm-helper-v5.0.js');
const pm = new PMHelper();

// Get next document to review
const nextDoc = await pm.getNextDocument();
console.log('📋 Next document:', nextDoc.doc_id, nextDoc.doc_name);

// Review and approve
await pm.approveDocument('DES-001',
  'Excellent design! Accounting logic is clear, parameters are well-defined, test scenarios cover all cases.');

// Or reject if needed
// await pm.rejectDocument('DES-001',
//   'Please add more test scenarios for edge cases');
```

**Kết quả:**
- ✅ Document status: `under_review` → `approved`
- ✅ BA receives notification
- ✅ Design doc now available for Sprint planning

---

### Bước 5: PM Tạo Sprint Plan với Design Doc References

```javascript
// PM gets approved design documents
const approvedDesigns = pm.getApprovedDesignsLocal();

console.log('📋 Approved Designs:');
approvedDesigns.designs.forEach(d => {
  console.log(`  - ${d.doc_id}: ${d.doc_name}`);
  console.log(`    Transaction: ${d.transaction_code}`);
  console.log(`    File: ${d.file_path}`);
});

// Create Sprint Plan with design doc references
const sprint = pm.createSprintLocal({
  sprint_id: 'sprint-001',
  sprint_name: 'Core Accounting Phase 1',
  start_date: '2025-10-20',
  duration_weeks: 2,

  objectives: [
    'Implement 5 core accounting transactions',
    'Achieve 95%+ QA pass rate'
  ],

  tasks: [
    {
      task_id: 'sprint-001-task-001',
      task_number: 1,
      title: 'Implement AD001 - Receive Deposit from Customer',
      description: 'Implement according to approved design document',

      transaction_code: 'AD001',
      category: 'accounting_transaction',

      priority: 'high',
      estimated_hours: 8,
      complexity: 'medium',

      status: 'planned',

      // 🔴 CRITICAL: Reference to approved BA design document
      ba_documents: {
        requirement_doc_id: 'REQ-001',
        requirement_doc_path: 'Docs/requirements/REQ-001.json',
        design_doc_id: 'DES-001',
        design_doc_path: 'Docs/design/DES-001.json',
        design_doc_status: 'approved'
      },

      acceptance_criteria: [
        'Update trading_business_transactions.json with AD001',
        'Update trading_account_determination.json',
        'Update trading-mcp-server-optimized.js with process_ad001()',
        'All QA tests pass (minimum 3/3)',
        'VAS compliance verified'
      ],

      files_to_modify: [
        'trading_business_transactions.json',
        'trading_account_determination.json',
        'trading-mcp-server-optimized.js'
      ]
    }
  ]
});

// Validate that all tasks have design doc references
const validation = pm.validateSprintDesignReferences('sprint-001');

if (!validation.valid) {
  console.error('❌ Sprint validation failed:');
  validation.issues.forEach(issue => {
    console.error(`  - ${issue.task_id}: ${issue.issue}`);
  });
} else {
  console.log('✅ Sprint validation passed - all tasks have design doc references');
  pm.activateSprint('sprint-001');
}
```

---

### Bước 6: Dev Nhận Task và Đọc Design Doc

```javascript
const DevHelper = require('./agents/dev/dev-helper-v5.0.js');
const dev = new DevHelper();

// Get active sprint tasks
const myTasks = dev.getMyActiveTasks();

myTasks.forEach(task => {
  console.log(`📋 Task: ${task.title}`);

  // Load design document
  const designDocPath = path.join(process.cwd(), task.ba_documents.design_doc_path);
  const designDoc = JSON.parse(fs.readFileSync(designDocPath, 'utf-8'));

  console.log('📖 Design Document:');
  console.log('  - Transaction Code:', designDoc.metadata.transaction_code);
  console.log('  - Parameters:', designDoc.technical_design.parameters.map(p => p.name));
  console.log('  - Accounting Logic:');
  console.log('    Debit:', designDoc.technical_design.accounting_logic.debit_entries);
  console.log('    Credit:', designDoc.technical_design.accounting_logic.credit_entries);
  console.log('  - Test Scenarios:', designDoc.test_scenarios.length);

  // Dev now has all information needed to implement
});
```

---

## 📊 Document Lifecycle

```
BA: Create Draft
      ↓
BA: Submit for Review → Orchestrator
      ↓
PM: Review Document
      ↓
   ┌──┴──┐
   ↓     ↓
 Approve  Reject
   ↓     ↓
   ↓   BA: Fix & Resubmit
   ↓     ↓
   └─────┘
      ↓
Design Doc Status: APPROVED
      ↓
PM: Create Sprint Plan (must reference design docs)
      ↓
Dev: Read Design Doc & Implement
```

---

## 🔍 BA Helper Methods

### Document Creation
- `createRequirementDoc(docData)` - Create requirement document
- `createDesignDoc(docData)` - Create design document

### Document Management
- `loadDocument(doc_id, docType)` - Load document from file
- `saveDocument(doc_id, document, docType)` - Save document to file
- `getDocument(doc_id, docType)` - Get document details

### Review Workflow
- `submitDocumentForReview(doc_id, docType, notes)` - Submit to PM
- `updateDocumentAfterReview(doc_id, docType, reviewResult)` - Update after PM review

### Queries
- `listDocuments(docType)` - List all documents
- `getApprovedDesigns()` - Get approved design docs (for reference)

---

## 🔍 PM Helper Methods (Document Review)

### Review Workflow
- `getNextDocument()` - Get next document to review
- `approveDocument(doc_id, feedback)` - Approve document
- `rejectDocument(doc_id, feedback)` - Reject document with feedback
- `listDocuments(status)` - List documents by status

### Sprint Planning
- `getApprovedDesignsLocal()` - Get approved designs for Sprint planning
- `validateSprintDesignReferences(sprint_id)` - Validate Sprint has design doc refs

---

## ⚠️ Important Rules

### 1. Design Document References
**🔴 CRITICAL:** Mỗi Sprint task **BẮT BUỘC** phải có tham chiếu đến approved design document

```javascript
// ❌ SAI - Không có design doc reference
{
  task_id: 'sprint-001-task-001',
  title: 'Implement AD001',
  // Missing ba_documents!
}

// ✅ ĐÚNG - Có design doc reference
{
  task_id: 'sprint-001-task-001',
  title: 'Implement AD001',
  ba_documents: {
    design_doc_id: 'DES-001',
    design_doc_path: 'Docs/design/DES-001.json',
    design_doc_status: 'approved'
  }
}
```

### 2. Document Status Flow
- `draft` → `under_review` → `approved` or `rejected`
- Chỉ `approved` design docs mới được dùng trong Sprint Plan
- PM phải review và approve trước khi BA's work được sử dụng

### 3. VAS Compliance
- Tất cả design docs phải tuân thủ VAS (Vietnamese Accounting Standards)
- Accounting logic phải chính xác (Debit = Credit)
- Legal requirements phải được note rõ (e.g., Nghị định 181/2024)

---

## 📝 Document Templates

### Requirements Template
Location: `Docs/requirements/templates/requirement-template.md`

Sections:
1. Executive Summary
2. Business Requirements
3. Functional Requirements
4. Transaction Requirements (Accounting-specific)
5. Non-Functional Requirements
6. Data Requirements
7. Test Requirements

### Design Template
Location: `Docs/design/templates/design-document-template.md`

Sections:
1. Overview
2. Business Context
3. Technical Design (Accounting Logic, Parameters, Validation)
4. Implementation Specifications
5. Testing Requirements
6. Special Notes (VAS Compliance, Legal)
7. Review History
8. Approval

---

## 🔄 Git Sync

BA documents cần được sync giữa BA, PM, và Dev:

```bash
# BA: Sau khi tạo documents
git add Docs/requirements/ Docs/design/
git commit -m "BA: Add REQ-001 and DES-001 for AD001 feature"
git push

# PM: Pull để review
git pull

# PM: Sau khi approve (status updated in JSON)
git add Docs/design/DES-001.json
git commit -m "PM: Approved DES-001"
git push

# Dev: Pull để đọc approved design
git pull
```

---

## 🆘 Troubleshooting

### Issue: Sprint validation failed - Missing design doc reference
```
Error: Task sprint-001-task-001: Missing design document reference
```
**Fix:** Add `ba_documents` section to Sprint task with design doc reference

### Issue: Design document not found
```
Error: Design document not found: Docs/design/DES-001.json
```
**Fix:**
1. Check file path is correct
2. Run `git pull` to sync latest documents
3. Verify BA has created the document

### Issue: Design document not approved
```
Warning: Design document not approved: DES-001 (status: draft)
```
**Fix:**
1. BA must submit document for review
2. PM must review and approve
3. Status must be 'approved' before use in Sprint

---

## 📚 Next Steps

1. **BA creates documents:** `node test-ba-v5-full.js`
2. **PM reviews:** Use PM Helper's document review methods
3. **PM creates Sprint:** Reference approved design docs
4. **Dev implements:** Read design docs during implementation

---

**Version:** 5.0
**Last Updated:** 2025-10-19
**Status:** Core BA workflow ready
