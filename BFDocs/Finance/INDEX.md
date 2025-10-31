# Finance Module - Document Index

**Module:** Finance Management System
**Created:** 2025-10-31
**Last Updated:** 2025-10-31
**Maintainer:** BA & Design Team

---

## 📋 Purpose

This index provides a comprehensive overview of all documentation in the Finance module, including:
- Document versions and effective dates
- Document purposes and scope
- Current status and maintenance tracking
- File paths for quick navigation
- Dependencies between documents

---

## 📊 Module Statistics

| Metric | Count |
|--------|-------|
| **Total Sub-modules** | 5 |
| **Total Documents** | 52 |
| **Active Documents** | 52 |
| **Completed Features** | 2 |
| **In Progress Features** | 3 |

---

## 🗂️ Sub-Module Overview

### 1. Core Accounting
**Path:** `Finance/Accounting/`
**Status:** ✅ Requirements Complete, 🔄 Design In Progress
**Lead:** [TBD]

### 2. Dimension Management
**Path:** `Finance/Dimension/`
**Status:** ✅ Design Complete (HTML prototypes ready)
**Lead:** [TBD]

### 3. Cash In/Out (Cashin-out)
**Path:** `Finance/Cashin-out/`
**Status:** ✅ Design Complete (HTML prototypes ready)
**Lead:** [TBD]

### 4. Initial Balance
**Path:** `Finance/Initial-Balance/`
**Status:** 🔄 Requirements In Progress
**Lead:** [TBD]

### 5. Reports
**Path:** `Finance/Report/`
**Status:** 📋 Planning
**Lead:** [TBD]

---

## 📚 Core Accounting Module

### Overview
**Purpose:** Core accounting system - double-entry bookkeeping, chart of accounts, journal entries, flexible dimensions, cost splitting
**Current Version:** 2.2 (Database Design)
**Status:** Requirements Complete (100%), Design Phase (40%)

### Key Documents

#### Database Design Documents

| Document | Version | Date | Status | File Path |
|----------|---------|------|--------|-----------|
| **Core Accounting DB Design v2** | 2.2 | 2025-10-31 | ✅ Active | [Core_Accounting_Database_Design_v2.md](Accounting/Core_Accounting_Database_Design_v2.md) |
| Core Accounting DB Design v1 (Deprecated) | 1.0 | 2024-10-02 | ⚠️ Deprecated | [Core_Accounting_Database_Design.md](Accounting/Core_Accounting_Database_Design.md) |

**v2.2 Features:**
- Pure Flexible Dimension Model
- Account-Specific Dimension Rules (whitelist approach)
- **Dimension Split Templates (NEW):** Manual split dimension values when posting journal entries
- Materialized Views for performance
- 14 tables total (6 core + 3 dimensions + 2 account-dimension rules + 2 dimension split + 1 view)

**Key Changes in v2.2:**
- Added 2 new tables for Dimension Split Templates feature
- Terminology: "Split" (unique to Bflow)
- Split is dimension-based, not account-based
- Templates are global (tenant-wide), created by Finance Manager/System Admin
- Supports multi-dimensional split with Cartesian product

#### Requirements Documents (Phase 1)

| Document | Version | Date | Status | File Path |
|----------|---------|------|--------|-----------|
| Software Requirements Specification | 1.0 | [TBD] | ✅ Complete | [1_SRS_Accounting.md](Accounting/1_PhanTichYeuCau/1_SRS_Accounting.md) |
| Business Process Model | 1.0 | [TBD] | ✅ Complete | [2_BusinessProcessModel.md](Accounting/1_PhanTichYeuCau/2_BusinessProcessModel.md) |
| User Stories | 1.0 | [TBD] | ✅ Complete | [3_UserStories.md](Accounting/1_PhanTichYeuCau/3_UserStories.md) |
| Requirements Traceability Matrix | 1.0 | [TBD] | ✅ Complete | [4_RequirementsTraceabilityMatrix.md](Accounting/1_PhanTichYeuCau/4_RequirementsTraceabilityMatrix.md) |
| Requirements Prioritization Matrix | 1.0 | [TBD] | ✅ Complete | [5_RequirementsPrioritizationMatrix.md](Accounting/1_PhanTichYeuCau/5_RequirementsPrioritizationMatrix.md) |
| Prototype & Mockup | 1.0 | [TBD] | ✅ Complete | [6_PrototypeMockup.md](Accounting/1_PhanTichYeuCau/6_PrototypeMockup.md) |
| Data Flow Diagram | 1.0 | [TBD] | ✅ Complete | [7_DataFlowDiagram.md](Accounting/1_PhanTichYeuCau/7_DataFlowDiagram.md) |

#### Design Documents (Phase 2)

| Document | Version | Date | Status | File Path |
|----------|---------|------|--------|-----------|
| Architecture Design | [TBD] | [TBD] | ⏳ Planned | [1_ArchitectureDesign.md](Accounting/2_ThietKe/1_ArchitectureDesign.md) |
| Detailed Design | [TBD] | [TBD] | ⏳ Planned | [2_DetailedDesign.md](Accounting/2_ThietKe/2_DetailedDesign.md) |
| Database Design | [TBD] | [TBD] | ⏳ Planned | [3_DatabaseDesign.md](Accounting/2_ThietKe/3_DatabaseDesign.md) |
| API Design | [TBD] | [TBD] | ⏳ Planned | [4_APIDesign.md](Accounting/2_ThietKe/4_APIDesign.md) |
| UI/UX Design | [TBD] | [TBD] | ⏳ Planned | [5_UIUXDesign.md](Accounting/2_ThietKe/5_UIUXDesign.md) |
| Security Design | [TBD] | [TBD] | ⏳ Planned | [6_SecurityDesign.md](Accounting/2_ThietKe/6_SecurityDesign.md) |
| Integration Design | [TBD] | [TBD] | ⏳ Planned | [7_IntegrationDesign.md](Accounting/2_ThietKe/7_IntegrationDesign.md) |
| Privacy Assessment | [TBD] | [TBD] | ⏳ Planned | [8_PrivacyAssessment.md](Accounting/2_ThietKe/8_PrivacyAssessment.md) |

---

## 📐 Dimension Management Module

### Overview
**Purpose:** Flexible dimension configuration for multi-dimensional financial analysis
**Current Version:** 1.2 (with Posting Control)
**Status:** ✅ Design Complete + HTML Prototypes Ready

### Key Documents

#### Requirements Documents (Phase 1)

| Document | Version | Date | Status | File Path |
|----------|---------|------|--------|-----------|
| Dimension Definition Requirements | 1.1 | 2025-10-31 | ✅ Complete | [1_DimensionDefinition_Requirements.md](Dimension/1_PhanTichYeuCau/1_DimensionDefinition_Requirements.md) |
| Dimension Values Requirements | 1.1 | 2025-10-31 | ✅ Complete | [2_DimensionValues_Requirements.md](Dimension/1_PhanTichYeuCau/2_DimensionValues_Requirements.md) |

#### Design Documents (Phase 2)

| Document | Version | Date | Status | File Path |
|----------|---------|------|--------|-----------|
| Dimension Definition Design | 1.0 | 2025-10-31 | ✅ Complete | [1_DimensionDefinition_Design.md](Dimension/2_ThietKe/1_DimensionDefinition_Design.md) |
| Dimension Values Design | 1.1 | 2025-10-31 | ✅ Complete | [2_DimensionValues_Design.md](Dimension/2_ThietKe/2_DimensionValues_Design.md) |
| Account-Dimension Mapping Design | 1.0 | 2025-10-31 | ✅ Complete | [3_AccountDimensionMapping_Design.md](Dimension/2_ThietKe/3_AccountDimensionMapping_Design.md) |

**v1.1 Key Feature:** Posting Control (FR-DIMVAL-008)
- Leaf nodes: Always postable (✅)
- Parent nodes: Default not postable (❌), Finance Manager can override (⚠️)
- Prevents users from posting to high-level summary values

#### HTML Prototypes

| Prototype | Version | Date | Status | File Path |
|-----------|---------|------|--------|-----------|
| Dimension Definition | 1.0 | 2025-10-31 | ✅ Ready | [1_dimension-definition.html](Dimension/2_ThietKe/html-prototypes/1_dimension-definition.html) |
| Dimension Values | 1.1 | 2025-10-31 | ✅ Ready | [2_dimension-values.html](Dimension/2_ThietKe/html-prototypes/2_dimension-values.html) |
| Account-Dimension Mapping | 1.0 | 2025-10-31 | ✅ Ready | [3_account-dimension-mapping.html](Dimension/2_ThietKe/html-prototypes/3_account-dimension-mapping.html) |

**Features Implemented:**
- CRUD operations with mock data
- Tree view with hierarchy (3-4 levels)
- Search and filter
- Active/Inactive status management
- Posting control indicators (✅ ⚠️ ❌)
- Shared sidebar navigation (using sidebar.js)
- Responsive design
- Form validation

---

## 💰 Cash In/Out Module (Cashin-out)

### Overview
**Purpose:** Cash flow management - receipts and payments
**Current Version:** 1.0
**Status:** ✅ Design Complete + HTML Prototypes Ready

### Key Documents

#### Design Documents (Phase 2)

| Document | Version | Date | Status | File Path |
|----------|---------|------|--------|-----------|
| UI/UX Design | 1.0 | [TBD] | ✅ Complete | [5_UIUXDesign.md](Cashin-out/2_ThietKe/5_UIUXDesign.md) |
| Create Cash In Form Description | 1.0 | [TBD] | ✅ Complete | [Form_CreateCashIn_Description.md](Cashin-out/2_ThietKe/Form_CreateCashIn_Description.md) |
| Create Cash Out Form Description | 1.0 | [TBD] | ✅ Complete | [Form_CreateCashOut_Description.md](Cashin-out/2_ThietKe/Form_CreateCashOut_Description.md) |
| Prototypes Verification Report | 1.0 | [TBD] | ✅ Complete | [PROTOTYPES_VERIFICATION_REPORT.md](Cashin-out/2_ThietKe/PROTOTYPES_VERIFICATION_REPORT.md) |

#### HTML Prototypes

| Prototype | Version | Date | Status | File Path |
|-----------|---------|------|--------|-----------|
| Transaction List | 1.0 | [TBD] | ✅ Ready | [1_transaction-list.html](Cashin-out/2_ThietKe/html-prototypes/1_transaction-list.html) |
| Create Cash In | 1.0 | [TBD] | ✅ Ready | [2_create-cashin.html](Cashin-out/2_ThietKe/html-prototypes/2_create-cashin.html) |
| Create Cash Out | 1.0 | [TBD] | ✅ Ready | [3_create-cashout.html](Cashin-out/2_ThietKe/html-prototypes/3_create-cashout.html) |

**Features Implemented:**
- Form sections with conditional visibility
- Payment reconciliation (Bank/Cash/Installment)
- Number format handling (Vietnamese locale)
- Modal patterns for selections
- Form validation
- Shared sidebar navigation (using sidebar.js)

---

## 💼 Initial Balance Module

### Overview
**Purpose:** Opening balance initialization for accounts
**Current Version:** 0.1
**Status:** 🔄 Requirements In Progress

### Key Documents

#### Requirements Documents (Phase 1)

| Document | Version | Date | Status | File Path |
|----------|---------|------|--------|-----------|
| Business Process Model | 1.0 | [TBD] | 🔄 In Progress | [1_BusinessProcessModel.md](Initial-Balance/1_PhanTichYeuCau/1_BusinessProcessModel.md) |
| Use Cases & User Stories | 1.0 | [TBD] | 🔄 In Progress | [2_UseCasesUserStories.md](Initial-Balance/1_PhanTichYeuCau/2_UseCasesUserStories.md) |
| ERD Conceptual | 1.0 | [TBD] | 🔄 In Progress | [3_ERDConceptual.md](Initial-Balance/1_PhanTichYeuCau/3_ERDConceptual.md) |
| Prototype & Mockup | 1.0 | [TBD] | 🔄 In Progress | [4_PrototypeMockup.md](Initial-Balance/1_PhanTichYeuCau/4_PrototypeMockup.md) |

#### Design Documents (Phase 2)

| Document | Version | Date | Status | File Path |
|----------|---------|------|--------|-----------|
| Architecture Design | [TBD] | [TBD] | ⏳ Planned | [1_ArchitectureDesign.md](Initial-Balance/2_ThietKe/1_ArchitectureDesign.md) |
| Detailed Design | [TBD] | [TBD] | ⏳ Planned | [2_DetailedDesign.md](Initial-Balance/2_ThietKe/2_DetailedDesign.md) |
| Database Design | [TBD] | [TBD] | ⏳ Planned | [3_DatabaseDesign.md](Initial-Balance/2_ThietKe/3_DatabaseDesign.md) |
| API Design | [TBD] | [TBD] | ⏳ Planned | [4_APIDesign.md](Initial-Balance/2_ThietKe/4_APIDesign.md) |
| UI/UX Design | [TBD] | [TBD] | ⏳ Planned | [5_UIUXDesign.md](Initial-Balance/2_ThietKe/5_UIUXDesign.md) |

---

## 📊 Reports Module

### Overview
**Purpose:** Financial reports and analytics
**Current Version:** N/A
**Status:** 📋 Planning

### Key Documents

| Document | Version | Date | Status | File Path |
|----------|---------|------|--------|-----------|
| Accounting Progress Report | [TBD] | [TBD] | 📋 Planning | [ACCOUNTING_PROGRESS_REPORT.md](Report/ACCOUNTING_PROGRESS_REPORT.md) |

---

## 🎨 Shared UI/UX Components

### Overview
**Purpose:** Shared design standards and reusable components across Finance module

### Key Documents

| Document | Version | Date | Status | File Path |
|----------|---------|------|--------|-----------|
| UI/UX Design Standards | 1.3 | 2025-10-31 | ✅ Active | [../UI_UX_Design_Standards.md](../UI_UX_Design_Standards.md) |
| Bootstrap 5.3 Quick Reference | 1.0 | 2024-10-29 | ✅ Active | [../Bootstrap_5.3_Quick_Reference.md](../Bootstrap_5.3_Quick_Reference.md) |

**UI/UX Standards v1.3 Includes:**
- Color palette & visual identity
- Typography standards
- Layout patterns (top header, sidebar, main content)
- **Shared sidebar component (sidebar.js)** - Fixed CORS issue, works with file:// protocol
- Form components & validation
- Action buttons for data tables
- Status badges & indicators (Active/Inactive, Posting Control)
- Tree view component with hierarchy support
- Modal & dialog patterns
- Responsive design guidelines

### Shared Components

| Component | Version | Date | Purpose | File Path |
|-----------|---------|------|---------|-----------|
| Shared Sidebar (JS) | 1.1 | 2025-10-31 | Navigation sidebar for all Finance prototypes | [sidebar.js](sidebar.js) |
| Shared Sidebar (HTML - Deprecated) | 1.0 | 2025-10-31 | ⚠️ Deprecated - Use sidebar.js instead | [sidebar.html](sidebar.html) |

**Migration Note:** All new prototypes should use `sidebar.js` instead of `sidebar.html` to avoid CORS issues when opening files directly.

---

## 📊 Document Dependencies

### Core Accounting
**Dependencies:**
- Dimension Management (for multi-dimensional journal entries)
- Initial Balance (for opening balances)
- Cash In/Out (for cash transactions)

**Dependent Modules:**
- Reports (uses accounting data)
- All transaction modules

### Dimension Management
**Dependencies:**
- Core Accounting (dimensions stored in accounting DB)

**Dependent Modules:**
- Core Accounting (journal entries use dimensions)
- All transaction modules (can use dimensions)
- Reports (dimension-based analysis)

### Cash In/Out
**Dependencies:**
- Core Accounting (posts to GL)
- Dimension Management (optional dimension selection)

### Initial Balance
**Dependencies:**
- Core Accounting (posts opening balances to GL)
- Dimension Management (optional dimension allocation)

---

## 📈 Progress Tracking

### Requirements Phase (Phase 1)

| Module | Progress | Status | Target Date |
|--------|----------|--------|-------------|
| Core Accounting | 100% | ✅ Complete | Completed |
| Dimension Management | 100% | ✅ Complete | Completed |
| Cash In/Out | N/A | ⏭️ Skipped | N/A |
| Initial Balance | 60% | 🔄 In Progress | [TBD] |
| Reports | 0% | 📋 Planning | [TBD] |

### Design Phase (Phase 2)

| Module | Progress | Status | Target Date |
|--------|----------|--------|-------------|
| Core Accounting | 10% | 🔄 In Progress | [TBD] |
| Dimension Management | 100% | ✅ Complete | Completed |
| Cash In/Out | 100% | ✅ Complete | Completed |
| Initial Balance | 40% | 🔄 In Progress | [TBD] |
| Reports | 0% | ⏳ Waiting | [TBD] |

---

## 🔄 Recent Updates

### 2025-10-31
- ✅ **Core Accounting v2.2 Released:** Added Dimension Split Templates feature (2 new tables)
- ✅ **Dimension Management v1.2:** Added Posting Control feature (FR-DIMVAL-008)
- ✅ **UI/UX Standards v1.3:** Migrated to sidebar.js (fixed CORS issue)
- ✅ **Document Index Created:** This file - comprehensive tracking for Finance module

### 2025-10-31 (Earlier)
- ✅ Dimension Management: Complete design phase + HTML prototypes
- ✅ Cash In/Out: HTML prototypes verified and ready
- ✅ Shared sidebar component created (sidebar.html)

### 2024-10-29
- ✅ UI/UX Design Standards v1.0 created
- ✅ Initial Balance: Planning started

---

## 📞 Maintenance & Support

### Document Ownership

| Category | Owner | Contact |
|----------|-------|---------|
| Core Accounting | BA Team | [TBD] |
| Dimension Management | BA Team | [TBD] |
| Cash In/Out | BA Team | [TBD] |
| Initial Balance | BA Team | [TBD] |
| Reports | BA Team | [TBD] |
| UI/UX Standards | Design Team | [TBD] |
| Document Index | Documentation Team | [TBD] |

### Update Policy
- **Critical Updates:** Immediately (security, compliance, data integrity)
- **Feature Updates:** Within 1 week of feature completion
- **Index Maintenance:** Monthly review and update
- **Deprecation Notice:** 30 days before deprecating documents

### Review Schedule
- **Quarterly Review:** All documents reviewed for accuracy
- **Annual Audit:** Complete document structure audit
- **Version Control:** All changes tracked in git history

---

## 📋 Document Standards Compliance

All documents in Finance module follow:
- ✅ [Bộ Tài Liệu Chuẩn Phát Triển Phần Mềm](../bo-tai-lieu-chuan-phat-trien-phan-mem.md)
- ✅ Phase-based folder structure (1_PhanTichYeuCau, 2_ThietKe, etc.)
- ✅ Version control with date tracking
- ✅ Status indicators (✅ ✓ 🔄 ⏳ 📋 ⚠️)
- ✅ README.md in each module folder
- ✅ Consistent naming conventions

---

## 🔗 Quick Links

### Most Accessed Documents
1. [Core Accounting DB Design v2.2](Accounting/Core_Accounting_Database_Design_v2.md) - Database schema
2. [UI/UX Design Standards](../UI_UX_Design_Standards.md) - Design reference
3. [Dimension Management README](Dimension/README.md) - Feature overview
4. [Cash In/Out Prototypes](Cashin-out/2_ThietKe/html-prototypes/) - Working demos

### Getting Started
- **New BA:** Start with [Core Accounting README](Accounting/README.md)
- **New Designer:** Read [UI/UX Design Standards](../UI_UX_Design_Standards.md)
- **New Developer:** Review [Core Accounting DB Design v2.2](Accounting/Core_Accounting_Database_Design_v2.md)
- **Stakeholder:** Check [HTML Prototypes](Dimension/2_ThietKe/html-prototypes/)

---

**Document Version:** 1.0
**Index Covers:** 52 documents across 5 sub-modules
**Last Audit:** 2025-10-31
**Next Review:** 2025-11-30

---

*For questions or updates to this index, contact Documentation Team.*
