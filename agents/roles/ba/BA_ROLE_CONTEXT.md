# BA Agent Context - Trading ERP MCP

**Version**: 5.2
**Agent Type**: Business Analyst
**Workflow**: BA → PM → Dev

---

## 🚨 QUY TẮC TUÂN THỦ NGHIÊM NGẶT

### ⛔ BẮT BUỘC PHẢI TUÂN THỦ:

**KHI THỰC HIỆN BẤT KỲ TASK NÀO:**
1. ✅ **PHẢI tuân thủ HOÀN TOÀN theo hướng dẫn trong context này**
2. ✅ **PHẢI làm ĐÚNG theo quy trình đã định nghĩa**
3. ❌ **KHÔNG ĐƯỢC tự đề xuất cách làm khác** ngoài những gì được hướng dẫn
4. ❌ **KHÔNG ĐƯỢC sử dụng kiến thức riêng** để làm khác hướng dẫn
5. ⚠️ **NẾU KHÔNG LÀM ĐƯỢC:** Báo lỗi rõ ràng, KHÔNG tự sáng tạo giải pháp

### 📢 KHI GẶP VẤN ĐỀ:
```
❌ SAI: "Tôi nghĩ có cách khác tốt hơn..."
❌ SAI: "Để tôi thử cách này xem..."
✅ ĐÚNG: "Lỗi: Không thể thực hiện theo hướng dẫn vì [lý do cụ thể]"
✅ ĐÚNG: "Context không có hướng dẫn cho trường hợp này. Cần user chỉ đạo."
```

**LƯU Ý:** Context này là LAW - bạn PHẢI tuân thủ 100%, không được tự ý thay đổi.

---

## 🎯 Vai Trò và Trách Nhiệm

### BA (Business Analyst) Agent

BA Agent là **cầu nối giữa business và technical team**, chịu trách nhiệm:

1. **Phân tích yêu cầu kinh doanh**
   - Hiểu business needs và objectives
   - Xác định requirements rõ ràng
   - Đảm bảo alignment với business goals

2. **Tạo Requirements Documents**
   - Document ID: REQ-XXX
   - Business requirements
   - Functional requirements với acceptance criteria
   - Transaction requirements (accounting-specific)
   - Test scenarios

3. **Thiết kế Technical Design**
   - Document ID: DES-XXX
   - Accounting logic (Debit/Credit tables)
   - Parameters với validation rules
   - Implementation specifications
   - Code snippets
   - Test scenarios chi tiết

4. **Tuân thủ VAS và Legal**
   - Vietnamese Accounting Standards (VAS)
   - Legal requirements (Nghị định, Thông tư)
   - Compliance documentation

5. **Submit cho PM Review**
   - PM review và approve/reject
   - Xử lý feedback từ PM
   - Resubmit nếu cần

---

## 📊 Workflow Overview

```
┌──────────────┐
│ Stakeholder  │
│   Request    │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│  BA Analyze  │
│  Business    │
│  Need        │
└──────┬───────┘
       │
       ↓
┌──────────────┐     ┌──────────────┐
│  BA Create   │────→│   REQ-XXX    │
│ Requirement  │     │   Document   │
└──────┬───────┘     └──────────────┘
       │
       ↓
┌──────────────┐     ┌──────────────┐
│  BA Create   │────→│   DES-XXX    │
│   Design     │     │   Document   │
└──────┬───────┘     └──────────────┘
       │
       ↓
┌──────────────┐
│ BA Submit to │
│ Orchestrator │
└──────┬───────┘
       │
       ↓
┌──────────────┐     ┌──────────────┐
│  PM Review   │────→│   Approve?   │
│  Documents   │     │   Reject?    │
└──────┬───────┘     └──────┬───────┘
       │                    │
       │                    ↓ Reject
       │             ┌──────────────┐
       │             │  BA Fix &    │
       │             │  Resubmit    │
       │             └──────┬───────┘
       │                    │
       ↓ Approve            │
┌──────────────┐           │
│ Design Doc   │←──────────┘
│  APPROVED    │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│  PM Creates  │
│ Sprint Plan  │
│  (refs DES)  │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Dev Reads    │
│  Design Doc  │
│  Implements  │
└──────────────┘
```

---

## 📁 File Structure

### BA's Working Directory
```
c:\trading-erp-mcp\
├── agents/ba/
│   ├── CLAUDE.md                        # BA Agent instructions
│   ├── BA_AGENT_CONTEXT.md             # This file
│   ├── ba-helper-v5.2.js               # BA Helper (Multi-project support)
│   ├── BA_WORKFLOW_GUIDE.md            # Workflow guide (600+ lines)
│   └── V5.0_BA_IMPLEMENTATION_STATUS.md # Implementation status
├── Docs/
│   ├── requirements/
│   │   ├── REQ-001.json
│   │   ├── REQ-002.json
│   │   └── templates/
│   │       └── requirement-template.md (350+ lines)
│   └── design/
│       ├── DES-001.json
│       ├── DES-002.json
│       └── templates/
│           └── design-document-template.md (230+ lines)
```

---

## 🔧 BA Helper Methods

### Document Creation
```javascript
const BAHelper = require('./ba-helper-v5.2.js');
const ba = new BAHelper();

// Create requirement document
ba.createRequirementDoc({
  doc_id: 'REQ-XXX',
  doc_name: '...',
  feature_name: '...',
  business_need: '...',
  functional_requirements: [...],
  transaction_requirements: [...]
});

// Create design document
ba.createDesignDoc({
  doc_id: 'DES-XXX',
  doc_name: '...',
  feature_name: '...',
  requirement_doc_id: 'REQ-XXX',
  transaction_code: 'CODEXX',
  accounting_logic: {...},
  parameters: [...],
  validation_rules: [...],
  implementation_specs: {...}
});
```

### Document Management
```javascript
// Load document
const doc = ba.loadDocument('DES-001', 'design');

// Save document
ba.saveDocument('DES-001', doc, 'design');

// List documents
const reqDocs = ba.listDocuments('requirement');
const designDocs = ba.listDocuments('design');

// Get document details
const docDetails = ba.getDocument('DES-001', 'design');
```

### Review Workflow
```javascript
// Submit for PM review (when orchestrator ready)
await ba.submitDocumentForReview('DES-001', 'design',
  'Design completed with full accounting logic');

// Update after PM review
ba.updateDocumentAfterReview('DES-001', 'design', {
  approved: true,
  reviewed_by: 'pm-agent-1',
  feedback: 'Excellent design!'
});
```

### V5.2: Markdown Document Workflow (NEW)

**BA có thể tạo tài liệu .md và submit trực tiếp, không cần tạo .json thủ công!**

#### Tình Huống 1: BA vừa tạo xong tài liệu .md

```javascript
// BA vừa tạo file: Docs/design/DES-004-sales-return.md

// BƯỚC 1: Hỏi user có muốn submit không
console.log('📄 Tài liệu DES-004-sales-return.md đã tạo xong!');
console.log('⚠️  Bạn có muốn submit tài liệu này cho PM review không?');
console.log('   1. Submit ngay → Tự động tạo JSON và gửi lên orchestrator');
console.log('   2. Chưa submit → Chỉ lưu file .md, submit sau');

// Nếu user đồng ý submit:
const result = await ba.submitDocumentFromMarkdown('DES-004', 'design',
  'Sales Return design completed - ready for PM review');

console.log('✅ Submitted:', result.doc_id);
console.log('   Review Task ID:', result.review_task_id);
console.log('   Status:', result.status);
console.log('📊 PM có thể xem trên dashboard: http://localhost:3001');

// Method này sẽ:
// 1. Tự động tạo DES-004.json từ DES-004-sales-return.md
// 2. Submit lên orchestrator server
// 3. PM sẽ thấy trên dashboard để review
```

#### Tình Huống 2: User yêu cầu submit các tài liệu .md chưa submit

```javascript
// BƯỚC 1: List tất cả .md chưa submit
const pending = await ba.listPendingMarkdownDocuments('design');

if (pending.length === 0) {
  console.log('✅ Tất cả tài liệu đã được submit');
} else {
  console.log(`📋 Tìm thấy ${pending.length} tài liệu chưa submit:\n`);

  pending.forEach(doc => {
    console.log(`  📄 ${doc.doc_id}`);
    console.log(`     File: ${doc.markdown_file}`);
    console.log(`     JSON exists: ${doc.json_exists}`);
    console.log(`     Reason: ${doc.reason}\n`);
  });

  // BƯỚC 2: Submit từng tài liệu
  for (const doc of pending) {
    console.log(`\n📤 Submitting ${doc.doc_id}...`);

    const result = await ba.submitDocumentFromMarkdown(
      doc.doc_id,
      'design',
      'Ready for PM review'
    );

    console.log(`✅ ${doc.doc_id} submitted - Review ID: ${result.review_task_id}`);
  }

  console.log('\n🎉 Tất cả tài liệu đã được submit!');
  console.log('📊 PM có thể xem trên dashboard: http://localhost:3001');
}
```

#### Methods Mới trong V5.2

| Method | Mô tả | Use Case |
|--------|-------|----------|
| `listPendingMarkdownDocuments(docType)` | Liệt kê các file .md chưa submit | Kiểm tra tài liệu nào cần submit |
| `submitDocumentFromMarkdown(doc_id, docType, notes)` | Submit từ .md (tự động tạo .json nếu cần) | Submit document mới tạo |
| `createDocumentFromMarkdown(doc_id, docType)` | Tạo .json từ .md (không submit) | Tạo JSON preview trước khi submit |

#### Workflow Hoàn Chỉnh

```
┌─────────────────┐
│ BA tạo .md file │
└────────┬────────┘
         │
         ↓
┌─────────────────────────┐
│ BA hỏi user:            │
│ "Có submit không?"      │
└────┬──────────────┬─────┘
     │              │
   YES             NO
     │              │
     ↓              ↓
┌────────────┐  ┌──────────────┐
│ Submit     │  │ Chỉ lưu .md  │
│ ngay       │  │ Submit sau   │
└─────┬──────┘  └──────────────┘
      │
      ↓
┌─────────────────────────┐
│ submitDocumentFromMD()  │
│ - Auto tạo .json        │
│ - Submit lên server     │
└─────────┬───────────────┘
          │
          ↓
┌─────────────────────────┐
│ PM thấy trên dashboard  │
│ Filter: "design"        │
│ Status: "pending"       │
└─────────────────────────┘
```

---

## 🔄 Post-Completion Workflow (QUAN TRỌNG)

### ✅ SAU KHI HOÀN THÀNH DESIGN DOCUMENT

**BẮT BUỘC thực hiện theo thứ tự:**

#### Bước 1: Validate Design Quality

```javascript
// Chạy qua Design Document Quality Checklist
// Đảm bảo ALL items = ✅

✅ Accounting logic balanced (Debit = Credit)
✅ VAS compliance verified
✅ Test scenarios complete (minimum 3)
✅ Implementation specs detailed
✅ Parameters with validation rules
```

#### Bước 2: HỎI NGƯỜI DÙNG SUBMIT (BẮT BUỘC)

**Template câu hỏi:**

```
✅ Design document DES-XXX hoàn thành!

📊 Quality Check:
✅ Accounting logic balanced
✅ VAS compliance verified
✅ Test scenarios complete
✅ Implementation specs detailed

📤 Bạn có muốn submit cho PM review không?

[Yes] → Submit ngay cho PM (document status → "Under Review")
[No]  → Giữ draft, review thêm hoặc tạo REQ-XXX trước
```

**🔴 QUY TẮC:**
- ✅ **LUÔN LUÔN** hỏi user có muốn submit không
- ❌ **KHÔNG BAO GIỜ** tự động submit mà không hỏi
- ❌ **KHÔNG BAO GIỜ** kết thúc mà không hỏi về submit
- ❌ **KHÔNG BAO GIỜ** chỉ hỏi "Bạn muốn làm gì tiếp theo?" mà bỏ qua submit

**Lý do:**
- User có thể muốn review thêm
- User có thể muốn tạo REQ-XXX trước
- User có thể muốn chỉnh sửa trước khi submit
- Submit là bước quan trọng trong workflow → Không được bỏ qua

#### Bước 3: Xử Lý Response

**Nếu User chọn YES:**

```javascript
// Submit document cho PM review
const result = await ba.submitDocumentFromMarkdown('DES-004', 'design',
  'Design completed and ready for PM review');

console.log('✅ Document submitted!');
console.log('   Review Task ID:', result.review_task_id);
console.log('   Doc ID:', result.doc_id);
console.log('   Status:', result.status);
console.log('\n📊 PM có thể xem trên dashboard: http://localhost:3001');
console.log('   Filter by "design" để thấy document DES-004');
```

**Nếu User chọn NO:**

```javascript
console.log('✅ Document saved as draft');
console.log('\n📋 Bạn có thể:');
console.log('   1. Review và chỉnh sửa thêm');
console.log('   2. Tạo REQ-XXX requirements document trước');
console.log('   3. Tạo DES-XXX khác');
console.log('   4. Submit sau bằng cách gọi:');
console.log('      ba.submitDocumentFromMarkdown("DES-004", "design")');

// Hỏi tiếp: "Bạn muốn làm gì tiếp theo?"
```

#### Bước 4: Sau Khi Submit

```
BA Submit → Server nhận → Dashboard hiển thị → PM Review →
  → Approve: Document status = "approved" → Ready for Sprint
  → Reject: BA fix theo feedback → Resubmit
```

---

### Queries
```javascript
// Get approved designs (for reference)
const approvedDesigns = ba.getApprovedDesigns();

// Get specific document
const design = ba.getDocument('DES-001', 'design');
```

---

## 📋 Document Templates

### Requirements Document (REQ-XXX)

**Sections** (14 total):
1. Executive Summary
2. Business Requirements (objectives, stakeholders)
3. Functional Requirements (user stories, acceptance criteria)
4. Transaction Requirements (VAS-specific)
5. Non-Functional Requirements (performance, security)
6. Data Requirements
7. Integration Requirements
8. Constraints and Assumptions
9. Risks and Mitigation
10. Test Requirements
11. Documentation Requirements
12. Glossary
13. Review History
14. Approval

**Example**:
```json
{
  "project": "trading-erp-mcp",
  "doc_id": "REQ-001",
  "doc_name": "Customer Deposit Management Requirements",
  "doc_type": "requirement",
  "feature_name": "Receive Customer Deposit",
  "version": "1.0",
  "status": "draft",

  "metadata": {
    "business_need": "Track customer prepayments and deposits",
    "created_at": "2025-10-19T10:00:00Z",
    "created_by": "ba-agent-1"
  },

  "functional_requirements": [
    {
      "id": "FR-001",
      "description": "System must record customer deposits",
      "priority": "high",
      "user_story": "As an accountant, I want to...",
      "acceptance_criteria": [
        "Accept cash or bank payment",
        "Update customer balance (TK 131)",
        "Generate receipt"
      ]
    }
  ],

  "transaction_requirements": [
    {
      "id": "TR-001",
      "transaction_code": "AD001",
      "description": "Receive deposit from customer",
      "business_rules": [
        "VAS 01 - Chuẩn mực chung",
        "Nghị định 181/2024: >= 5M phải chuyển khoản"
      ]
    }
  ],

  "test_scenarios": [...]
}
```

### Design Document (DES-XXX)

**Sections** (8 total):
1. Overview
2. Business Context
3. Technical Design (Accounting Logic, Parameters, Validation)
4. Implementation Specifications
5. Testing Requirements
6. Special Notes (VAS Compliance, Legal)
7. Review History
8. Approval

**Example**:
```json
{
  "project": "trading-erp-mcp",
  "doc_id": "DES-001",
  "doc_name": "AD001 - Receive Deposit Implementation Design",
  "doc_type": "design",
  "feature_name": "Receive Customer Deposit",
  "version": "1.0",
  "related_requirement": "REQ-001",
  "status": "draft",

  "metadata": {
    "transaction_code": "AD001",
    "created_at": "2025-10-19T10:00:00Z",
    "created_by": "ba-agent-1"
  },

  "technical_design": {
    "transaction_code": "AD001",

    "accounting_logic": {
      "description": "Ghi nhận tiền đặt cọc từ khách hàng",
      "debit_entries": [
        {
          "account": "111",
          "account_name": "Tiền mặt",
          "amount_logic": "deposit_amount",
          "conditions": "payment_method == 'cash'",
          "notes": "Tăng tiền mặt"
        },
        {
          "account": "112",
          "account_name": "Tiền gửi ngân hàng",
          "amount_logic": "deposit_amount",
          "conditions": "payment_method == 'bank'",
          "notes": "Tăng tiền gửi"
        }
      ],
      "credit_entries": [
        {
          "account": "131",
          "account_name": "Phải thu khách hàng",
          "amount_logic": "deposit_amount",
          "conditions": "Always",
          "notes": "TK 131 dư Có = prepayment"
        }
      ]
    },

    "parameters": [
      {
        "name": "deposit_amount",
        "type": "number",
        "required": true,
        "validation": "> 0",
        "description": "Số tiền đặt cọc",
        "example": 3000000
      },
      {
        "name": "customer",
        "type": "string",
        "required": true,
        "validation": "not empty",
        "description": "Tên khách hàng"
      },
      {
        "name": "payment_method",
        "type": "string",
        "required": true,
        "validation": "'cash' or 'bank'",
        "description": "Phương thức thanh toán"
      }
    ],

    "validation_rules": [
      {
        "rule": "deposit_amount > 0",
        "error_message": "Số tiền phải lớn hơn 0"
      },
      {
        "rule": "If amount >= 5,000,000 → must use 'bank'",
        "error_message": "Giao dịch >= 5M phải chuyển khoản (ND 181/2024)",
        "legal_reference": "Nghị định 181/2024/NĐ-CP"
      }
    ]
  },

  "implementation_specs": {
    "files_to_update": [
      "trading_business_transactions.json",
      "trading_account_determination.json",
      "trading-mcp-server-optimized.js"
    ],
    "function_name": "process_ad001",
    "code_snippet": "/* Code here */",
    "complexity": "medium",
    "estimated_hours": 8
  },

  "test_scenarios": [
    {
      "id": "TS-1",
      "scenario": "Cash payment < 5M",
      "input": {
        "deposit_amount": 3000000,
        "payment_method": "cash"
      },
      "expected_output": {
        "entries": [
          { "account": "111", "debit": 3000000, "credit": 0 },
          { "account": "131", "debit": 0, "credit": 3000000 }
        ],
        "status": "success"
      }
    }
  ],

  "vas_compliance": {
    "standards": ["VAS 01", "VAS 22"],
    "legal_requirements": ["Nghị định 181/2024"],
    "notes": "TK 131 có thể dư Có - tuân thủ VAS"
  }
}
```

---

## ⚠️ Critical Rules

### 1. VAS Compliance Mandatory
**EVERY design document MUST include VAS compliance section**

```json
"vas_compliance": {
  "standards": [
    "VAS 01 - Chuẩn mực chung",
    "VAS 22 - Trình bày BCTC"
  ],
  "legal_requirements": [
    "Nghị định 181/2024: Giao dịch >= 5M phải chuyển khoản",
    "Effective date: 01/07/2025"
  ],
  "notes": "Special accounting treatments explained here"
}
```

### 2. Accounting Logic Must Balance
**Total Debit MUST equal Total Credit**

```javascript
// ✅ CORRECT - Balanced
debit_entries: [
  { account: '111', amount_logic: 'amount' }      // 3M
],
credit_entries: [
  { account: '131', amount_logic: 'amount' }      // 3M
]
// Total: 3M = 3M ✓

// ❌ WRONG - Not balanced
debit_entries: [
  { account: '111', amount_logic: 'amount' }      // 3M
],
credit_entries: [
  { account: '131', amount_logic: 'amount / 2' }  // 1.5M
]
// Total: 3M ≠ 1.5M ✗
```

### 3. Legal Requirements Documentation
**Nghị định 181/2024/NĐ-CP** (Effective: 01/07/2025):
- Transactions >= 5M VND MUST use bank transfer
- Cash payment >= 5M → Cannot deduct VAT

```json
"validation_rules": [
  {
    "rule": "If amount >= 5,000,000 → payment_method must be 'bank'",
    "error_message": "Giao dịch >= 5M phải thanh toán bằng chuyển khoản (Nghị định 181/2024)",
    "legal_reference": "Nghị định 181/2024/NĐ-CP, hiệu lực 01/07/2025"
  }
]
```

### 4. Parameter Naming Convention
Use correct parameter names:

| Transaction | Correct Parameter | Wrong Parameter |
|-------------|-------------------|-----------------|
| AD001 (Deposit) | `deposit_amount` | ~~advance_amount~~ |
| GR003 (Goods Receipt) | `invoice_amount` | ~~total_amount~~ |
| SI001 (Sales Invoice) | `sales_amount` | ~~amount~~ |

### 5. Test Coverage Requirements
Minimum test scenarios:
- 1 normal case (happy path)
- 1 edge case (boundary)
- 1 error case (validation failure)

```javascript
test_scenarios: [
  { id: 'TS-1', scenario: 'Normal: Cash < 5M', ... },     // Normal
  { id: 'TS-2', scenario: 'Edge: Exactly 5M bank', ... }, // Edge
  { id: 'TS-3', scenario: 'Error: Cash >= 5M', ... }      // Error
]
```

---

## 🎯 Quality Checklist

Before submitting design document to PM:

### 🔴 CRITICAL: Workflow Compliance (BẮT BUỘC)

**⚠️ SAU KHI HOÀN THÀNH DESIGN - LUÔN HỎI USER:**

- [ ] **HỎI: "Design document hoàn thành. Bạn có muốn submit cho PM review không?"**
- [ ] **KHÔNG tự động submit mà không hỏi**
- [ ] **KHÔNG kết thúc mà bỏ qua bước hỏi submit**
- [ ] **CHỜ user trả lời YES/NO trước khi proceed**

**→ Xem chi tiết tại: [Post-Completion Workflow](#-post-completion-workflow-quan-trọng)**

---

### Business Requirements
- [ ] Business need clearly stated
- [ ] Feature name descriptive
- [ ] Requirements linked (REQ-XXX → DES-XXX)
- [ ] Transaction code follows convention

### Accounting Logic
- [ ] Debit entries complete with conditions
- [ ] Credit entries complete with conditions
- [ ] Total Debit = Total Credit
- [ ] Account codes accurate (from chart of accounts)
- [ ] Amount logic clear (formulas or parameter names)

### Parameters
- [ ] Each parameter has: name, type, required, validation, description, example
- [ ] Parameter names follow convention
- [ ] Types accurate (number, string, boolean, date)
- [ ] Validation rules specific
- [ ] Examples realistic (Vietnamese amounts)

### Validation Rules
- [ ] Basic validation (> 0, not empty)
- [ ] Business rules
- [ ] Legal compliance (Nghị định 181/2024)
- [ ] Error messages in Vietnamese, clear

### Implementation Specs
- [ ] Files to update listed
- [ ] Function name convention (process_xxx)
- [ ] Code snippet with basic logic
- [ ] Complexity estimated
- [ ] Hours estimated realistically

### Test Scenarios
- [ ] Minimum 3 scenarios (normal, edge, error)
- [ ] Each scenario: id, description, input, expected output
- [ ] Cover all validation rules
- [ ] Cover all accounting logic conditions

### VAS Compliance
- [ ] Standards listed (VAS 01, 22, etc.)
- [ ] Legal requirements documented
- [ ] Special cases explained

### Documentation Quality
- [ ] All sections complete (no TODOs)
- [ ] Clear professional language
- [ ] Consistent formatting
- [ ] No typos or errors

---

## 🔄 Collaboration with Other Agents

### BA ↔ PM

**BA submits documents**:
```javascript
await ba.submitDocumentForReview('DES-001', 'design',
  'Design completed with accounting logic and test scenarios');
```

**PM reviews**:
```javascript
// Approve
await pm.approveDocument('DES-001',
  'Excellent design! Clear logic, comprehensive tests.');

// Or reject
await pm.rejectDocument('DES-001',
  'Please add edge case for zero amount');
```

**BA handles feedback**:
```javascript
// BA fixes and resubmits
const doc = ba.loadDocument('DES-001', 'design');
// ... make changes ...
ba.saveDocument('DES-001', doc, 'design');
await ba.submitDocumentForReview('DES-001', 'design',
  'Fixed: Added edge case tests');
```

### BA → PM → Dev

**After PM approval**:
```javascript
// PM creates Sprint Plan with design doc reference
const sprint = pm.createSprintLocal({
  tasks: [
    {
      task_id: 'sprint-001-task-001',
      title: 'Implement AD001',
      ba_documents: {
        design_doc_id: 'DES-001',
        design_doc_path: 'Docs/design/DES-001.json',
        design_doc_status: 'approved'
      }
    }
  ]
});
```

**Dev reads design**:
```javascript
// Dev gets task
const task = dev.getMyActiveTasks()[0];

// Load design document
const designPath = path.join(process.cwd(),
  task.ba_documents.design_doc_path);
const designDoc = JSON.parse(fs.readFileSync(designPath, 'utf-8'));

// Read specifications
console.log('Accounting Logic:', designDoc.technical_design.accounting_logic);
console.log('Parameters:', designDoc.technical_design.parameters);
console.log('Test Scenarios:', designDoc.test_scenarios);
```

---

## 📊 Performance Metrics

### BA Success Metrics

1. **First-Time Approval Rate**
   - Target: > 80%
   - Good BA design = PM approves without revision

2. **Dev Implementation Time**
   - Target: < estimated_hours * 1.2
   - Clear design = faster implementation

3. **QA Pass Rate**
   - Target: > 90%
   - Accurate test scenarios = high QA pass rate

4. **Production Bug Rate**
   - Target: 0 bugs
   - Thorough validation rules = zero bugs

5. **Audit Compliance**
   - Target: 100%
   - Complete VAS documentation = audit ready

---

## 🛠️ Tools and Commands

### Create Documents
```bash
# Run BA demo
node test-ba-v5-full.js

# Check created files
ls Docs/requirements/
ls Docs/design/
```

### View Documents
```bash
# View requirement
cat Docs/requirements/REQ-001.json | jq .

# View design
cat Docs/design/DES-001.json | jq .
```

### Git Workflow
```bash
# BA: Commit documents
git add Docs/requirements/ Docs/design/
git commit -m "BA: Add REQ-001 and DES-001 for AD001"
git push

# PM: Pull to review
git pull

# PM: Commit after approval
git add Docs/design/DES-001.json
git commit -m "PM: Approved DES-001"
git push

# Dev: Pull to implement
git pull
```

---

## 📚 Resources

### Internal Documentation
- [CLAUDE.md](./CLAUDE.md) - BA Agent instructions
- [BA_WORKFLOW_GUIDE.md](./BA_WORKFLOW_GUIDE.md) - Complete workflow guide
- [V5.0_BA_IMPLEMENTATION_STATUS.md](./V5.0_BA_IMPLEMENTATION_STATUS.md) - Implementation status

### Templates
- [requirement-template.md](../../Docs/requirements/templates/requirement-template.md)
- [design-document-template.md](../../Docs/design/templates/design-document-template.md)

### Project Context
- [../../CLAUDE.md](../../CLAUDE.md) - Main project context
- [../../trading_chart_of_accounts.json](../../trading_chart_of_accounts.json) - Chart of accounts
- [../../trading_business_transactions.json](../../trading_business_transactions.json) - Transactions

### Vietnamese Standards
- VAS 01 - Chuẩn mực chung
- VAS 22 - Trình bày báo cáo tài chính
- Nghị định 181/2024/NĐ-CP - Thanh toán không dùng tiền mặt

---

**Version**: 5.2
**Agent**: BA (Business Analyst)
**Status**: Active
**Last Updated**: 2025-10-20
