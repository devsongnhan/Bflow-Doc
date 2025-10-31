# Dimension Values Management - Requirements

**Feature:** Dimension Values Management (Quản lý giá trị Dimension)
**Module:** Finance Setup
**Priority:** High
**Status:** Requirements Phase

---

## 1. Business Context

### 1.1 Overview
Dimension Values Management là feature cho phép Finance Staff/Finance Manager quản lý các giá trị cụ thể (values) cho từng dimension đã được định nghĩa. Mỗi dimension có thể có hàng trăm values với cấu trúc phân cấp (hierarchy).

### 1.2 Business Problems
- Sau khi định nghĩa dimensions (COST_CENTER, PRODUCT_LINE, etc.), cần populate values cụ thể (Sales Dept, Marketing Dept, Product A, Product B)
- Các values thường có cấu trúc phân cấp (Cost Center: Company → Region → Department → Team)
- Số lượng values lớn (100-1000+ values per dimension) cần UI hiệu quả
- Values thay đổi thường xuyên (thêm department mới, sản phẩm mới, etc.)
- Cần support bulk import cho onboarding nhanh

### 1.3 Business Value
- **Operational Efficiency:** Finance Staff tự quản lý values mà không cần IT support
- **Hierarchy Support:** Phản ánh đúng cấu trúc tổ chức thực tế (Cost Center: HQ → Sales → North Region → Hanoi Branch)
- **Scalability:** Support enterprise với hàng nghìn values
- **Data Quality:** Centralized management đảm bảo consistency
- **Reporting:** Hierarchy cho phép drill-down trong reports

---

## 2. User Roles & Access

| Role | Permissions |
|------|-------------|
| **System Admin** | Full access (Add/Edit/Delete/Activate/Deactivate/Bulk Import) |
| **Finance Manager** | Full access (Add/Edit/Delete/Activate/Deactivate/Bulk Import) |
| **Finance Staff** | Add/Edit own department values, View all |
| **Accountant** | View only |
| **Employee** | No access |

---

## 3. Functional Requirements

### 3.1 Select Dimension (FR-DIMVAL-001)
**As a** Finance Staff
**I want to** chọn dimension để xem và quản lý values
**So that** tôi có thể làm việc với từng dimension riêng biệt

**Acceptance Criteria:**
- [ ] Dropdown hiển thị tất cả active dimensions (COST_CENTER, PRODUCT_LINE, FACTORY, etc.)
- [ ] Chỉ hiển thị active dimensions (inactive không xuất hiện)
- [ ] Sau khi chọn → Load values của dimension đó
- [ ] Default: Chọn dimension đầu tiên theo display_order
- [ ] Show count: "Cost Center - 45 values (42 active)"

---

### 3.2 View Dimension Values Tree (FR-DIMVAL-002)
**As a** Finance Staff
**I want to** xem danh sách values theo cấu trúc phân cấp (tree view)
**So that** tôi hiểu được mối quan hệ cha-con giữa các values

**Acceptance Criteria:**
- [ ] Hiển thị tree view với hierarchy (expandable/collapsible)
- [ ] Columns: Code, Name, Parent, Status (Active/Inactive), Actions
- [ ] Root nodes (parent_id = NULL) xuất hiện top-level
- [ ] Child nodes indent theo level (visual hierarchy)
- [ ] Icon: ▶ (collapsed), ▼ (expanded), − (no children)
- [ ] Inactive values: gray text + gray background
- [ ] Search box: Filter by code or name (show matching + ancestors)
- [ ] Show stats: Total values, Active, Inactive

**Business Rules:**
- Maximum hierarchy depth: 5 levels (recommend 3-4 levels)
- Root-level values allowed (not all values need parent)
- Circular references not allowed

---

### 3.3 Add Dimension Value (FR-DIMVAL-003)
**As a** Finance Staff
**I want to** thêm value mới cho dimension
**So that** tôi có thể track chi tiết hơn (ví dụ: thêm department mới, sản phẩm mới)

**Acceptance Criteria:**
- [ ] Form có fields: Value Code, Value Name, Parent Value (optional), Display Order
- [ ] Value Code: Required, unique within dimension, uppercase, max 30 chars
- [ ] Value Name: Required, max 200 chars
- [ ] Parent Value: Dropdown showing all values của dimension này (optional, for hierarchy)
- [ ] Display Order: Auto-suggest next number, integer
- [ ] Status: Default = Active
- [ ] Validation: Code không được trùng trong cùng dimension
- [ ] Validation: Parent không được là chính nó (prevent self-reference)
- [ ] Validation: Parent không được là descendants (prevent circular)
- [ ] Success message sau khi save
- [ ] Tree tự động expand để show value mới thêm

**Business Rules:**
- Code unique trong dimension (có thể trùng across dimensions)
- Recommend naming convention: PREFIX_NAME (CC_SALES, CC_MARKETING)
- Display order trong cùng level (siblings)

**Example:**
```
Dimension: COST_CENTER
Add Value:
- Code: CC_SALES
- Name: Sales Department
- Parent: CC_COMMERCIAL (Commercial Division)
- Display Order: 1
```

---

### 3.4 Edit Dimension Value (FR-DIMVAL-004)
**As a** Finance Staff
**I want to** edit value name, parent, và display order
**So that** tôi có thể correct typos hoặc restructure hierarchy

**Acceptance Criteria:**
- [ ] Click Edit → Open form với data pre-filled
- [ ] Cho phép edit: Value Name, Parent, Display Order
- [ ] **KHÔNG** cho phép edit: Value Code (immutable)
- [ ] Parent dropdown: Exclude chính nó và descendants (prevent circular)
- [ ] Warning nếu change parent: "This will move [Value] and all children to new parent"
- [ ] Validation giống Add form
- [ ] Success message
- [ ] Tree auto-update để reflect hierarchy change

**Business Rules:**
- Code immutable sau khi tạo (vì có thể có data references)
- Change parent = move subtree (all children follow)
- Nếu value đã dùng trong journal entries → warning nhưng vẫn cho edit Name/Parent

---

### 3.5 Deactivate Dimension Value (FR-DIMVAL-005)
**As a** Finance Manager
**I want to** deactivate value không còn sử dụng
**So that** nó không xuất hiện trong entry forms nhưng giữ historical data

**Acceptance Criteria:**
- [ ] Click Deactivate → Confirmation dialog
- [ ] Dialog message: "Deactivate [Value Name]? It will no longer appear in entry forms."
- [ ] Deactivate parent → Option: "Also deactivate all children?" (Yes/No)
- [ ] Sau deactivate: Status = Inactive, gray trong tree
- [ ] Button đổi thành "Activate"
- [ ] Success message

**Business Rules:**
- Deactivate ≠ Delete (data preservation)
- Inactive values không xuất hiện trong journal entry dropdowns
- Historical journal entries giữ nguyên
- Reports vẫn show inactive value data cho past periods

---

### 3.6 Delete Dimension Value (FR-DIMVAL-006)
**As a** Finance Manager
**I want to** delete value chưa được sử dụng
**So that** tôi có thể cleanup test data hoặc values tạo nhầm

**Acceptance Criteria:**
- [ ] Delete button chỉ hiển thị nếu: (1) Value chưa dùng, (2) Không có children
- [ ] Check: Không có records trong `journal_line_dimensions`
- [ ] Check: Không có child values (must delete children first)
- [ ] Confirmation dialog: "Permanently delete [Value Name]? Cannot be undone."
- [ ] Nếu có data/children → Error: "Cannot delete. In use or has children. Deactivate instead."

**Business Rules:**
- Chỉ delete được values: (1) chưa có data, (2) không có children
- Nếu có data/children → chỉ cho Deactivate
- Delete là permanent

---

### 3.7 Reorder Values (FR-DIMVAL-007)
**As a** Finance Staff
**I want to** thay đổi display order trong cùng level
**So that** dropdown lists hiển thị theo thứ tự logic

**Acceptance Criteria:**
- [ ] Drag-and-drop để reorder siblings (cùng parent)
- [ ] Chỉ reorder trong cùng level (không move across parents)
- [ ] Auto-save sau khi drop
- [ ] Visual feedback khi dragging

---

### 3.8 Manage Posting Control (FR-DIMVAL-008)
**As a** Finance Manager
**I want to** control which dimension values can be used in journal entries (posting control)
**So that** tôi có thể force users nhập đúng level chi tiết và tránh mix data ở nhiều levels

**Acceptance Criteria:**
- [ ] Add/Edit form có checkbox: "Allow Posting" (default = TRUE cho leaf nodes)
- [ ] Checkbox disabled cho leaf nodes (always TRUE, cannot uncheck)
- [ ] Checkbox enabled cho parent nodes (Finance Manager có thể check/uncheck)
- [ ] Visual indicator trong tree: Icon hiển thị posting status
  - ✅ Postable (green checkmark)
  - ⚠️ Parent allowed (yellow warning - special case)
  - ❌ Not postable (red cross - parent default)
- [ ] Warning message khi enable parent posting: "Warning: Enabling posting for parent nodes may mix detailed and aggregated data. Only enable for special cases (e.g., data migration)."
- [ ] Filter option: "Show only postable values"

**Business Rules:**
- **Leaf nodes** (không có children): `allow_posting = TRUE` (immutable, always allowed)
- **Parent nodes** (có children): `allow_posting = FALSE` (default)
  - Finance Manager có thể override thành TRUE nếu cần
  - Use cases: Migration data từ legacy system, aggregate transactions
- **Validation in journal entry**: System reject nếu user chọn value với `allow_posting = FALSE`
- **Auto-update**: Khi add child vào leaf node → parent's `allow_posting` set to FALSE (unless Finance Manager explicitly enabled)

**Example Scenarios:**

**Scenario 1: Normal Operations (Leaf-Only)**
```
CC_COMPANY (allow_posting=FALSE) ❌ Parent - không được dùng
├── CC_SALES (allow_posting=FALSE) ❌ Parent - không được dùng
│   ├── CC_NORTH (allow_posting=TRUE) ✅ Leaf - được dùng
│   └── CC_SOUTH (allow_posting=TRUE) ✅ Leaf - được dùng
└── CC_MARKETING (allow_posting=TRUE) ✅ Leaf - được dùng
```

**Scenario 2: Special Case (Parent Enabled)**
```
CC_COMPANY (allow_posting=FALSE) ❌
├── CC_SALES (allow_posting=TRUE) ⚠️ Parent BUT enabled by Finance Manager
│   ├── CC_NORTH (allow_posting=TRUE) ✅ Leaf
│   └── CC_SOUTH (allow_posting=TRUE) ✅ Leaf
```
Use case: Import aggregate sales data từ legacy system chưa có breakdown North/South

---

### 3.9 Bulk Import Values (FR-DIMVAL-009)
**As a** Finance Manager
**I want to** import values từ Excel file
**So that** tôi có thể setup nhanh hàng trăm values khi onboarding

**Acceptance Criteria:**
- [ ] Upload button: "Import from Excel"
- [ ] Template download: "Download Template" (Excel with columns: Code, Name, Parent Code, Display Order)
- [ ] Validation: Check duplicate codes, invalid parent references
- [ ] Preview before commit: Show success/error rows
- [ ] Option: "Skip errors and import valid rows" or "Abort all"
- [ ] Success message: "Imported 150 values (5 errors)"
- [ ] Error log downloadable

**Business Rules:**
- Template format: CSV or XLSX
- Parent Code must exist or be blank (root level)
- Duplicate codes → skip or overwrite (user choice)

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Tree load time: < 1 second (cho 500 values)
- Search response: < 300ms
- Add/Edit save time: < 300ms
- Bulk import: 1000 values trong < 10 seconds

### 4.2 Usability
- Tree view: Smooth expand/collapse animation
- Keyboard shortcuts: Arrow keys navigate, Enter expand/collapse
- Auto-save display order khi drag-drop
- Breadcrumb khi edit: Show "COST_CENTER > Commercial > Sales"

### 4.3 Security
- Role-based access control
- Audit log: Track who added/modified values
- Prevent circular references in hierarchy

---

## 5. Data Model Reference

Xem chi tiết trong [Core_Accounting_Database_Design_v2.md](../../Accounting/Core_Accounting_Database_Design_v2.md) - Section 2.4

**Table:** `dimension_values`

```sql
CREATE TABLE dimension_values (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           UUID NOT NULL,
    dimension_id        UUID NOT NULL REFERENCES dimensions(id) ON DELETE CASCADE,
    value_code          VARCHAR(30) NOT NULL,
    value_name          VARCHAR(200) NOT NULL,
    parent_value_id     UUID REFERENCES dimension_values(id) ON DELETE CASCADE,
    display_order       INTEGER NOT NULL DEFAULT 0,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,

    -- Posting Control (SAP-inspired) - NEW in v2.2
    allow_posting       BOOLEAN NOT NULL DEFAULT TRUE,
    -- TRUE: Value có thể sử dụng trong journal entries
    -- FALSE: Chỉ dùng làm parent (grouping), không được post
    -- Default: TRUE cho leaf nodes, FALSE cho parent nodes (can be overridden)

    created_at          TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by          UUID,

    CONSTRAINT uq_dimension_value UNIQUE (dimension_id, value_code)
);
```

**Business Rule - Posting Control:**
- **Leaf nodes** (không có children): `allow_posting = TRUE` (always)
- **Parent nodes** (có children): `allow_posting = FALSE` (default, Finance Manager can override)
- **Use case**: Force users nhập đúng level chi tiết, tránh mix data ở nhiều levels

---

## 6. UI/UX Requirements

### 6.1 Layout
- Header: "[Dimension Name] Values" (e.g., "Cost Center Values")
- Dimension selector: Dropdown (top-left)
- Action bar: "Add Value", "Import from Excel" buttons (top-right)
- Search box: Filter tree (top-left)
- Tree view: Full width, expandable/collapsible
- Stats bar: "Total: 45 | Active: 42 | Inactive: 3"

### 6.2 Tree View Features
- Indent: 30px per level
- Icons: ▶ (collapsed), ▼ (expanded), − (leaf node)
- Hover effect: Highlight row
- Context menu: Right-click → Add Child, Edit, Deactivate, Delete

### 6.3 Colors & Icons
- Active: Normal text (black)
- Inactive: Gray text + gray background
- Add button: Primary blue
- Edit: Gray icon (pencil)
- Delete: Red icon (trash)
- Deactivate: Orange icon (ban)

---

## 7. Example Dimension Values (Reference)

### 7.1 COST_CENTER - Hierarchy Example (Manufacturing):
```
COMPANY (CC_COMPANY)
├── COMMERCIAL (CC_COMMERCIAL)
│   ├── SALES (CC_SALES)
│   │   ├── NORTH_REGION (CC_NORTH)
│   │   │   ├── HANOI_BRANCH (CC_HN)
│   │   │   └── HAIPHONG_BRANCH (CC_HP)
│   │   └── SOUTH_REGION (CC_SOUTH)
│   │       ├── HCMC_BRANCH (CC_HCM)
│   │       └── CANTHO_BRANCH (CC_CT)
│   └── MARKETING (CC_MARKETING)
├── PRODUCTION (CC_PRODUCTION)
│   ├── FACTORY_1 (CC_FAC1)
│   └── FACTORY_2 (CC_FAC2)
└── SUPPORT (CC_SUPPORT)
    ├── HR (CC_HR)
    ├── IT (CC_IT)
    └── FINANCE (CC_FIN)
```

### 7.2 PRODUCT_LINE - Flat Structure Example:
```
MILK_PRODUCTS (PL_MILK)
YOGURT_PRODUCTS (PL_YOGURT)
CHEESE_PRODUCTS (PL_CHEESE)
JUICE_PRODUCTS (PL_JUICE)
```

### 7.3 SALES_CHANNEL - 2-Level Hierarchy:
```
RETAIL (CH_RETAIL)
├── SUPERMARKET (CH_SUPER)
├── CONVENIENCE_STORE (CH_CONVEN)
└── TRADITIONAL_TRADE (CH_TRAD)
WHOLESALE (CH_WHOLESALE)
E_COMMERCE (CH_ECOM)
├── SHOPEE (CH_SHOPEE)
├── LAZADA (CH_LAZADA)
└── TIKI (CH_TIKI)
```

---

## 8. Dependencies

### Upstream (Must exist first):
- ✅ Dimension Definition completed
- ✅ Dimensions created and active

### Downstream (Depends on this feature):
- ⏳ Account-Dimension Mapping (use dimension values)
- ⏳ Manual Journal Entry form (select from dimension values)
- ⏳ Financial reports with dimension filters

---

## 9. Open Questions

1. ❓ Maximum hierarchy depth? (Recommend: 5 levels, enforce or warn only?)
2. ❓ Bulk import: CSV only or Excel? (Excel preferred for user-friendly)
3. ❓ Version history cho value changes? (Phase 2?)
4. ❓ Copy values from another dimension? (e.g., COST_CENTER → PROFIT_CENTER)
5. ❓ Mass deactivate: Select multiple values và deactivate once?

---

## 10. Acceptance Criteria Summary

Feature được coi là **DONE** khi:
- ✅ Tất cả 9 functional requirements (FR-DIMVAL-001 đến FR-DIMVAL-009) đã implement
- ✅ Tree view với hierarchy support
- ✅ Add/Edit/Delete/Deactivate operations
- ✅ Circular reference prevention
- ✅ **Posting control** (allow_posting flag) với visual indicators
- ✅ Bulk import từ Excel
- ✅ Unit tests coverage > 80%
- ✅ UI responsive trên desktop & tablet
- ✅ Performance requirements đạt yêu cầu
- ✅ Validation: Reject parent values với allow_posting=FALSE trong journal entries

---

**Version:** 1.0
**Last Updated:** 2025-10-31
**Author:** BA Team
**Reviewed By:** Product Owner, Tech Lead
