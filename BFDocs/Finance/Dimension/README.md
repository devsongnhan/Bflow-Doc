# Dimension Management - Documentation

**Module:** Finance Setup
**Status:** Design Phase
**Last Updated:** 2025-10-31

---

## 📁 Folder Structure

```
Dimension/
├── README.md                           # This file
├── 1_PhanTichYeuCau/                  # Requirements Phase
│   ├── 1_DimensionDefinition_Requirements.md
│   └── 2_DimensionValues_Requirements.md
├── 2_ThietKe/                         # Design Phase
│   ├── 1_DimensionDefinition_Design.md
│   ├── 2_DimensionValues_Design.md
│   └── html-prototypes/
│       ├── 1_dimension-definition.html
│       └── 2_dimension-values.html
└── (Future phases: 3_PhatTrien, 4_KiemThu, etc.)
```

---

## 📋 Feature Overview

Dimension Management là tính năng cho phép Finance Manager/System Admin quản lý các chiều phân tích (dimensions) trong hệ thống kế toán. Mỗi tenant có thể tự định nghĩa dimensions theo nhu cầu quản trị riêng.

### Key Features:
- ✅ **Dimension Definition**: Add/Edit/Deactivate dimensions
- ✅ **Dimension Values Management**: Manage values với hierarchy cho từng dimension
- ⏳ **Account-Dimension Mapping**: Link dimensions to specific accounts (Coming soon)

---

## 🎯 Current Phase: Design (2_ThietKe)

### Completed Documents:

#### 1. Requirements Document
**File:** [1_DimensionDefinition_Requirements.md](1_PhanTichYeuCau/1_DimensionDefinition_Requirements.md)

**Contents:**
- Business context & problems
- User roles & access control
- 6 Functional requirements (FR-DIM-001 to FR-DIM-006)
- Non-functional requirements
- Data model reference
- UI/UX requirements
- Acceptance criteria

#### 2. Design Document
**File:** [1_DimensionDefinition_Design.md](2_ThietKe/1_DimensionDefinition_Design.md)

**Contents:**
- Screen layout & component breakdown
- UI components detail (Table, Modals, Dialogs)
- Business logic flows (Add/Edit/Delete)
- API endpoints specification (for dev reference)
- Mock data structure
- UI states (Loading, Empty, Error)
- Responsive design guidelines
- Accessibility requirements
- Technical notes for developers

#### 3. HTML Prototype
**File:** [1_dimension-definition.html](2_ThietKe/html-prototypes/1_dimension-definition.html)

**Purpose:**
- Interactive demo with mock data
- Visual reference cho dev team
- UI/UX validation với stakeholders
- Không có backend, chỉ frontend prototype

**Features Implemented:**
- ✅ View dimensions list với search & stats
- ✅ Add new dimension
- ✅ Edit dimension (name & display order)
- ✅ Deactivate/Activate dimension
- ✅ Delete dimension (với validation)
- ✅ Form validation
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Mock data (8 sample dimensions)

**How to Use:**
1. Mở file HTML trực tiếp trong browser (không cần server)
2. Test các chức năng CRUD
3. Data chỉ lưu trong memory, refresh page = reset

#### 4. Dimension Values Requirements
**File:** [2_DimensionValues_Requirements.md](1_PhanTichYeuCau/2_DimensionValues_Requirements.md)

**Contents:**
- Business context for dimension values management
- User roles & access control (Finance Staff can edit)
- 8 Functional requirements (FR-DIMVAL-001 to FR-DIMVAL-008)
- Tree view & hierarchy requirements
- Bulk import from Excel
- Non-functional requirements
- Data model reference
- Example hierarchies (Cost Center with 4 levels)

#### 5. Dimension Values Design
**File:** [2_DimensionValues_Design.md](2_ThietKe/2_DimensionValues_Design.md)

**Contents:**
- Screen layout with dimension selector
- Tree view component specification
- Parent selector with circular reference prevention
- Business logic flows with Mermaid diagrams
- API endpoints for values CRUD
- Mock data with parent-child relationships
- Tree building algorithms
- Bulk import modal design
- Responsive design for tree view

#### 6. HTML Prototype - Dimension Values
**File:** [2_dimension-values.html](2_ThietKe/html-prototypes/2_dimension-values.html)

**Purpose:**
- Interactive tree view demo with hierarchy
- Visual reference for dev team
- UI/UX validation with stakeholders

**Features Implemented:**
- ✅ Dimension selector dropdown (switch between dimensions)
- ✅ Tree view with expand/collapse (3-4 level hierarchy)
- ✅ Add value with parent selector
- ✅ Edit value with parent change (move subtree)
- ✅ Deactivate/Activate values
- ✅ Circular reference prevention in UI
- ✅ Search and filter tree
- ✅ **Posting control with visual indicators (✅ ⚠️ ❌)**
- ✅ **"Allow Posting" checkbox in Add/Edit modal**
- ✅ **Auto-disable checkbox for leaf nodes**
- ✅ **Warning message for parent posting**
- ✅ Mock data for 3 dimensions (Cost Center, Product Line, Sales Channel)
- ✅ Responsive tree design
- ✅ Same left sidebar as Dimension Definition

**Mock Data Highlights:**
- Cost Center: 13 values with 4-level hierarchy (Company → Division → Department → Region)
  - **Posting control examples:** CC_SALES (parent with posting enabled ⚠️)
- Product Line: 4 flat values (no hierarchy, all postable ✅)
- Sales Channel: 7 values with 2-level hierarchy
  - **Posting control examples:** CH_RETAIL parent (not postable ❌)

**How to Use:**
1. Mở file HTML trực tiếp trong browser
2. Select dimension từ dropdown
3. Expand/collapse tree nodes
4. Test Add/Edit với parent selection
5. **Test posting control:** Edit parent nodes to toggle posting, observe icons change
6. Data chỉ lưu trong memory, refresh = reset

---

## 🗂️ Related Database Design

Xem chi tiết trong [Core_Accounting_Database_Design_v2.md](../Accounting/Core_Accounting_Database_Design_v2.md)

### Table: `dimensions`

```sql
CREATE TABLE dimensions (
    id              UUID PRIMARY KEY,
    tenant_id       UUID NOT NULL,
    dimension_code  VARCHAR(20) NOT NULL,
    dimension_name  VARCHAR(100) NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_tenant_dimension UNIQUE (tenant_id, dimension_code)
);
```

### Sample Dimensions (Manufacturing):
1. COST_CENTER - Cost Center
2. PRODUCT_LINE - Dòng sản phẩm
3. FACTORY - Nhà máy
4. SALES_CHANNEL - Kênh bán hàng
5. CUSTOMER_SEGMENT - Phân khúc khách hàng
6. REGION - Khu vực
7. BRAND - Thương hiệu
8. CAMPAIGN - Chiến dịch

---

## 🔗 Dependencies

### Upstream (Must exist first):
- ✅ Tenant onboarding completed
- ✅ User roles configured
- ✅ Core accounting database design

### Downstream (Depends on this feature):
- ⏳ Dimension Values Management
- ⏳ Account-Dimension Mapping
- ⏳ Manual Journal Entry form
- ⏳ Financial reports with dimension filters

---

## 👥 Stakeholders

| Role | Name | Responsibility |
|------|------|----------------|
| Product Owner | [TBD] | Requirements approval, priority |
| Business Analyst | [TBD] | Requirements gathering, documentation |
| UX Designer | [TBD] | UI/UX design, prototype validation |
| Tech Lead | [TBD] | Architecture review, technical feasibility |
| Dev Team Lead | [TBD] | Implementation planning, estimation |
| QA Lead | [TBD] | Test planning, acceptance criteria |

---

## 📝 Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-10-31 | 1.2 | Added Posting Control feature: Updated Requirements (FR-DIMVAL-008), Design specs, HTML prototype with ✅⚠️❌ icons, Core Accounting DB v2.2 | BA Team |
| 2025-10-31 | 1.1 | Added Dimension Values: Requirements, Design, HTML prototype with tree view | BA Team |
| 2025-10-31 | 1.0 | Initial Dimension Definition: Requirements, design, and HTML prototype | BA Team |

---

## ✅ Checklist - Requirements Phase

- [x] Business requirements documented
- [x] Functional requirements defined (6 FRs)
- [x] Non-functional requirements specified
- [x] User roles & access control defined
- [x] UI/UX requirements documented
- [x] Acceptance criteria listed
- [x] Dependencies identified
- [x] Open questions noted

---

## ✅ Checklist - Design Phase

- [x] Screen layout designed
- [x] UI components detailed
- [x] Business logic flows documented
- [x] API endpoints specified
- [x] Mock data prepared
- [x] HTML prototype created
- [x] Responsive design planned
- [x] Accessibility requirements defined
- [ ] Design review with stakeholders
- [ ] Sign-off from Product Owner

---

## 🎯 Next Steps

### Design Phase Completion:
1. [ ] Review HTML prototype với Product Owner
2. [ ] Review design document với Tech Lead
3. [ ] Validate UI/UX với Finance Manager (end user)
4. [ ] Update design based on feedback
5. [ ] Design sign-off

### Development Phase Preparation:
1. [ ] Create user stories in Jira/Azure DevOps
2. [ ] Dev team estimation (story points)
3. [ ] Sprint planning
4. [ ] Technical design deep dive
5. [ ] API contract finalization

---

## 📚 References

- [Core Accounting Database Design v2.1](../Accounting/Core_Accounting_Database_Design_v2.md)
- [Bộ Tài Liệu Chuẩn Phát Triển Phần Mềm](../../../bo-tai-lieu-chuan-phat-trien-phan-mem.md)
- [Project CLAUDE.md Context](../../../CLAUDE.md)

---

## 📞 Support

**Questions or Issues?**
- Contact BA Team: [TBD]
- Project Slack: [TBD]
- Email: [TBD]

---

**Document Version:** 1.2
**Template Compliance:** ✅ Follows standard software development document structure
**Last Updated:** 2025-10-31 (Added Posting Control feature)
