# Dimension Definition - Requirements

**Feature:** Dimension Definition (Quản lý định nghĩa Dimension)
**Module:** Finance Setup
**Priority:** High
**Status:** Requirements Phase

---

## 1. Business Context

### 1.1 Overview
Dimension Definition là feature cho phép Finance Manager/System Admin quản lý danh sách các dimensions có thể sử dụng trong hệ thống kế toán. Mỗi tenant có thể tự định nghĩa dimensions theo nhu cầu quản trị của công ty.

### 1.2 Business Problems
- Các công ty khác nhau có nhu cầu phân tích chi phí/doanh thu theo các góc độ khác nhau
- Cần flexibility để add/remove dimensions mà không cần thay đổi database schema
- Phải support unlimited dimensions cho enterprise customers
- Display order phải configurable để UI hiển thị theo thứ tự logic nghiệp vụ

### 1.3 Business Value
- **Flexibility:** Mỗi tenant tự customize dimensions theo nghiệp vụ riêng
- **Scalability:** Support từ 2-3 dimensions (SME) đến 10+ dimensions (Enterprise)
- **Standardization:** Template-based onboarding giúp setup nhanh
- **Data Quality:** Centralized dimension management đảm bảo consistency

---

## 2. User Roles & Access

| Role | Permissions |
|------|-------------|
| **System Admin** | Full access (Add/Edit/Delete/Activate/Deactivate) |
| **Finance Manager** | Full access (Add/Edit/Delete/Activate/Deactivate) |
| **Finance Staff** | View only |
| **Accountant** | View only |
| **Employee** | No access |

---

## 3. Functional Requirements

### 3.1 View Dimensions List (FR-DIM-001)
**As a** Finance Manager
**I want to** xem danh sách tất cả dimensions của tenant
**So that** tôi có overview về các dimensions đang được sử dụng

**Acceptance Criteria:**
- [ ] Hiển thị table với columns: Dimension Code, Dimension Name, Display Order, Status (Active/Inactive)
- [ ] Sort theo Display Order (default)
- [ ] Support search by Code hoặc Name
- [ ] Show total count (Active/Inactive/Total)
- [ ] Highlight inactive dimensions (màu xám)

---

### 3.2 Add New Dimension (FR-DIM-002)
**As a** Finance Manager
**I want to** thêm dimension mới
**So that** tôi có thể track thêm góc độ phân tích mới (ví dụ: CAMPAIGN, BRAND)

**Acceptance Criteria:**
- [ ] Form có fields: Dimension Code, Dimension Name, Display Order
- [ ] Dimension Code: Required, unique, uppercase, max 20 chars, alphanumeric only
- [ ] Dimension Name: Required, max 100 chars
- [ ] Display Order: Required, integer, suggest next available number
- [ ] Status: Default = Active
- [ ] Validation: Code không được trùng với dimensions đã có
- [ ] Success message sau khi save
- [ ] Auto-refresh list sau khi add

**Business Rules:**
- Code phải unique trong tenant
- Code nên follow naming convention: UPPERCASE, underscore separator
- Display order nên increment từ dimension cuối cùng
- Không được phép có 2 dimensions cùng display order

---

### 3.3 Edit Dimension (FR-DIM-003)
**As a** Finance Manager
**I want to** edit dimension name và display order
**So that** tôi có thể correct typos hoặc reorder dimensions

**Acceptance Criteria:**
- [ ] Click Edit button → Open edit form với data pre-filled
- [ ] Cho phép edit: Dimension Name, Display Order
- [ ] **KHÔNG** cho phép edit: Dimension Code (immutable sau khi tạo)
- [ ] Validation giống Add form
- [ ] Success message sau khi update
- [ ] Auto-refresh list

**Business Rules:**
- Code không được edit sau khi tạo (vì đã có thể có data references)
- Nếu dimension đã được sử dụng trong journal entries → warning message nhưng vẫn cho phép edit Name/Order
- Display order có thể thay đổi freely

---

### 3.4 Deactivate Dimension (FR-DIM-004)
**As a** Finance Manager
**I want to** deactivate dimension không còn sử dụng
**So that** nó không xuất hiện trong entry forms nhưng vẫn giữ historical data

**Acceptance Criteria:**
- [ ] Click Deactivate button → Confirmation dialog
- [ ] Dialog message: "Are you sure you want to deactivate [Dimension Name]? It will no longer appear in entry forms."
- [ ] Sau khi deactivate: Status = Inactive, hiển thị màu xám trong list
- [ ] Button đổi thành "Activate" cho phép reactivate
- [ ] Success message

**Business Rules:**
- Deactivate ≠ Delete (data preservation)
- Inactive dimensions không xuất hiện trong journal entry forms
- Historical journal entries vẫn giữ nguyên dimension values
- Reports vẫn show inactive dimension data cho past periods

---

### 3.5 Delete Dimension (FR-DIM-005)
**As a** Finance Manager
**I want to** delete dimension chưa được sử dụng
**So that** tôi có thể cleanup test data hoặc dimensions tạo nhầm

**Acceptance Criteria:**
- [ ] Delete button chỉ hiển thị nếu dimension chưa được sử dụng
- [ ] Check: Không có records trong `journal_line_dimensions`
- [ ] Check: Không có records trong `account_dimension_rules`
- [ ] Confirmation dialog: "This will permanently delete [Dimension Name]. This action cannot be undone."
- [ ] Nếu đã có data → Show error: "Cannot delete. This dimension is in use. Please deactivate instead."

**Business Rules:**
- Chỉ delete được dimensions chưa có data
- Nếu có data → chỉ cho phép Deactivate
- Delete là permanent (không có soft delete)

---

### 3.6 Reorder Dimensions (FR-DIM-006)
**As a** Finance Manager
**I want to** thay đổi display order của dimensions
**So that** journal entry form hiển thị dimensions theo thứ tự logic nghiệp vụ

**Acceptance Criteria:**
- [ ] Drag-and-drop để reorder (hoặc up/down arrows)
- [ ] Auto-save sau khi reorder
- [ ] Visual feedback khi dragging
- [ ] Display order numbers tự động recalculate (1, 2, 3, ...)

---

## 4. Non-Functional Requirements

### 4.1 Performance
- List load time: < 500ms (cho 20 dimensions)
- Add/Edit save time: < 300ms

### 4.2 Usability
- Responsive design (desktop focus, minimum tablet support)
- Keyboard shortcuts: Esc = Close dialog, Enter = Save
- Auto-focus on Code field khi open Add dialog

### 4.3 Security
- Role-based access control (xem section 2)
- Audit log: Track who created/modified dimensions

---

## 5. Data Model Reference

Xem chi tiết trong [Core_Accounting_Database_Design_v2.md](../../Accounting/Core_Accounting_Database_Design_v2.md) - Section 2.4

**Table:** `dimensions`

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

---

## 6. UI/UX Requirements

### 6.1 Layout
- Header: "Dimension Management"
- Action bar: "Add Dimension" button (top-right)
- Search box (top-left)
- Table: Full width, sortable columns
- Pagination: Show 20 rows per page

### 6.2 Colors & Icons
- Active status: Green badge
- Inactive status: Gray badge
- Add button: Primary blue
- Edit: Gray icon (pencil)
- Delete: Red icon (trash) - only if unused
- Deactivate: Orange icon (ban)

---

## 7. Example Dimensions (Reference)

### Manufacturing Company (Vinamilk-style):
1. COST_CENTER - Cost Center
2. PRODUCT_LINE - Dòng sản phẩm
3. FACTORY - Nhà máy
4. SALES_CHANNEL - Kênh bán hàng
5. CUSTOMER_SEGMENT - Phân khúc khách hàng
6. REGION - Khu vực
7. BRAND - Thương hiệu
8. CAMPAIGN - Chiến dịch

### Consulting Company:
1. PROJECT - Dự án
2. DEPARTMENT - Phòng ban
3. CLIENT - Khách hàng
4. SERVICE_LINE - Dòng dịch vụ

### Retail Chain:
1. STORE - Cửa hàng
2. DEPARTMENT - Nhóm hàng
3. PRODUCT_CATEGORY - Danh mục sản phẩm
4. SALES_CHANNEL - Kênh bán

---

## 8. Dependencies

### Upstream (Must exist first):
- Tenant onboarding completed
- User roles configured

### Downstream (Depends on this feature):
- [Dimension Values Management](./2_DimensionValues_Requirements.md)
- [Account-Dimension Mapping](./3_AccountDimensionMapping_Requirements.md)
- Manual Journal Entry form
- Financial reports with dimension filters

---

## 9. Open Questions

1. ❓ Có giới hạn số lượng dimensions tối đa không? (Suggest: Unlimited, nhưng recommend < 15 cho performance)
2. ❓ Có cho phép import dimensions từ Excel không? (Phase 2?)
3. ❓ Có cần version history cho dimension changes không?

---

## 10. Acceptance Criteria Summary

Feature được coi là **DONE** khi:
- ✅ Tất cả 6 functional requirements (FR-DIM-001 đến FR-DIM-006) đã implement
- ✅ Unit tests coverage > 80%
- ✅ UI responsive trên desktop & tablet
- ✅ Role-based access đã implement
- ✅ Performance requirements đạt yêu cầu
- ✅ User manual updated

---

**Version:** 1.0
**Last Updated:** 2025-10-31
**Author:** BA Team
**Reviewed By:** Product Owner, Tech Lead
