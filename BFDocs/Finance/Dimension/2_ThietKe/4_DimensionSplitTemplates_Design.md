# Dimension Split Templates - Design Document

**Module:** Finance - Dimension Management
**Feature:** Dimension Split Templates
**Version:** 1.0
**Date:** 2025-10-31
**Status:** ✅ Design Complete
**Prototype:** [4_dimension-split-templates.html](html-prototypes/4_dimension-split-templates.html)

---

## 1. Feature Overview

### 1.1 Purpose

**Dimension Split Templates** allow Finance Managers to create reusable split patterns for dimensions, enabling users to quickly split posting amounts across multiple dimension values during journal entry posting.

### 1.2 Business Use Cases

| Use Case | Description | Example |
|----------|-------------|---------|
| **Cost Allocation** | Split marketing costs between departments | Sales 60%, Marketing 40% |
| **Project Tracking** | Distribute expenses across multiple projects | Project X 70%, Project Y 30% |
| **Department Budgeting** | Allocate shared costs to departments | HR 50%, Finance 30%, IT 20% |
| **Product Analysis** | Split revenue/costs by product lines | Fresh Milk 50%, Yogurt 30%, Cheese 20% |

### 1.3 Key Benefits

- ✅ **Reusability:** Create once, use many times
- ✅ **Consistency:** Ensure standardized split ratios across the organization
- ✅ **Efficiency:** Avoid manual percentage calculation for every journal entry
- ✅ **Audit Trail:** Track who created templates and when
- ✅ **Flexibility:** Support 2-N dimension values per template

---

## 2. User Interface Design

### 2.1 Page Layout

**Screen:** Dimension Split Templates Management
**Access:** Finance Manager, System Admin
**URL:** `/finance/dimensions/split-templates`

**Layout Structure:**
```
┌─────────────────────────────────────────────────────────┐
│ Top Header (Fixed)                                      │
│ - Bflow ERP Logo                                        │
│ - User info, Logout                                     │
├─────────────────────────────────────────────────────────┤
│ Side │ Main Content Area                                │
│ bar  │ ┌─────────────────────────────────────────────┐ │
│      │ │ Page Header                                 │ │
│      │ │ - Title: Dimension Split Templates          │ │
│ Nav  │ │ - Breadcrumb                                │ │
│      │ └─────────────────────────────────────────────┘ │
│      │                                                  │
│ Menu │ ┌─────────────────────────────────────────────┐ │
│      │ │ Content Card                                │ │
│      │ │ ┌─────────────────────────────────────────┐ │ │
│      │ │ │ Header Actions                          │ │ │
│      │ │ │ - Search box                            │ │ │
│      │ │ │ - [+ Create Template] button            │ │ │
│      │ │ └─────────────────────────────────────────┘ │ │
│      │ │                                             │ │
│      │ │ ┌─────────────────────────────────────────┐ │ │
│      │ │ │ Data Table                              │ │ │
│      │ │ │ - List of all split templates           │ │ │
│      │ │ │ - Actions: Edit, Deactivate/Activate    │ │ │
│      │ │ └─────────────────────────────────────────┘ │ │
│      │ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Data Table

**Columns:**
1. **#** - Row number
2. **Template Code** - Unique identifier (e.g., CC_EQUAL)
3. **Template Name** - Descriptive name (e.g., "Equal Split (50%-50%)")
4. **Dimension** - Dimension this template applies to
5. **Lines** - Number of split lines (e.g., "2 lines", "3 lines")
6. **Status** - Active/Inactive badge
7. **Created By** - Username who created the template
8. **Actions** - Edit, Deactivate/Activate buttons

**Features:**
- ✅ Real-time search/filter
- ✅ Sortable columns
- ✅ Responsive table (mobile-friendly)
- ✅ Hover highlight on rows

**Sample Data:**

| # | Template Code | Template Name | Dimension | Lines | Status | Created By | Actions |
|---|---------------|---------------|-----------|-------|--------|------------|---------|
| 1 | CC_EQUAL | Equal Split (50%-50%) | Cost Center | 2 lines | ✅ Active | admin | [Edit] [Deactivate] |
| 2 | CC_REVENUE | Revenue-based Split (60%-40%) | Cost Center | 2 lines | ✅ Active | finance.mgr | [Edit] [Deactivate] |
| 3 | PRJ_MAJOR_MINOR | Major-Minor Project Split (70%-30%) | Project | 2 lines | ✅ Active | admin | [Edit] [Deactivate] |
| 4 | CC_THREE_WAY | Three-way Split (50%-30%-20%) | Cost Center | 3 lines | ⚫ Inactive | finance.mgr | [Edit] [Activate] |

---

## 3. Create/Edit Modal

### 3.1 Modal Structure

**Title:**
- Create mode: "Create Split Template"
- Edit mode: "Edit Split Template"

**Form Fields:**

#### 3.1.1 Basic Information

**1. Template Code** (Required)
- Type: Text input
- Format: Uppercase, no spaces (auto-format)
- Example: `CC_EQUAL`, `PRJ_MAJOR_MINOR`
- Validation: Unique, alphanumeric + underscore only
- Behavior: Disabled in edit mode (cannot change code)

**2. Template Name** (Required)
- Type: Text input
- Format: Free text, max 255 characters
- Example: "Equal Split (50%-50%)"
- Guidance: Descriptive name including percentage info

**3. Dimension** (Required)
- Type: Dropdown select
- Options: All active dimensions
  - Cost Center
  - Project
  - Department
  - Product Line
  - (dynamically loaded from system)
- Behavior: When selected, loads dimension values for split lines

#### 3.1.2 Split Lines Section

**Dynamic Split Lines:**

```
┌─────────────────────────────────────────────────────────┐
│ Split Lines * (Minimum 2 lines, total must equal 100%) │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [1] [Dimension Value ▼]     [50.00]% [×]            │ │
│ │ [2] [Dimension Value ▼]     [50.00]% [×]            │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [+ Add Line]                                            │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │              Total: 100.00% ✅                      │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Each Split Line Contains:**
- **Line Number:** Auto-generated (1, 2, 3, ...)
- **Dimension Value:** Dropdown (**only LEAF NODES shown** - parent nodes excluded)
  - Icon: 🍃 indicates leaf node
  - Example: "🍃 Sales - North", "🍃 Marketing - Online"
- **Percentage:** Number input (0.01 - 100.00, 2 decimal places)
- **Remove Button (×):** Delete this line (disabled for first 2 lines)

**Features:**
- ✅ Minimum 2 lines required
- ✅ Add unlimited lines (up to reasonable limit)
- ✅ Real-time total percentage calculation
- ✅ Visual feedback (green ✅ if total = 100%, red ❌ if not)
- ✅ Cannot save if total ≠ 100%
- ✅ Cannot remove if only 2 lines remain

**Total Percentage Display:**
- **Valid (100%):** Green border, green text with ✅
- **Invalid (≠100%):** Red border, red text with ❌
- **Empty (0%):** Gray border, gray text

#### 3.1.3 Status

**Active Status Checkbox:**
- ☑ Active (checked by default for new templates)
- ☐ Inactive

### 3.2 Modal Actions

**Buttons:**
1. **Cancel** - Close modal without saving
2. **Save Template** - Validate and save

**Validation Rules:**
1. ✅ Template code is required and unique
2. ✅ Template name is required
3. ✅ Dimension is selected
4. ✅ Minimum 2 split lines
5. ✅ All dimension values are selected
6. ✅ All percentages are filled
7. ✅ Total percentage = 100.00%
8. ✅ No duplicate dimension values in same template

**Error Messages:**
- "Template code is required"
- "Template code must be unique"
- "Total percentage must equal 100%"
- "Please fill in all split lines"
- "Minimum 2 lines required"
- "Cannot use same dimension value twice"

---

## 4. User Interactions

### 4.1 Create New Template

**Steps:**
1. User clicks **[+ Create Template]** button
2. Modal opens with empty form
3. User enters template code (auto-uppercase)
4. User enters template name
5. User selects dimension from dropdown
6. Dimension values load automatically in split line dropdowns
7. User selects dimension value for each line
8. User enters percentage for each line
9. Total calculates automatically (visual feedback)
10. User clicks **[+ Add Line]** if need more than 2 lines
11. User checks/unchecks "Active" checkbox
12. User clicks **[Save Template]**
13. Validation runs:
    - If valid → Save success, modal closes, table refreshes, toast notification
    - If invalid → Show error messages, keep modal open

### 4.2 Edit Existing Template

**Steps:**
1. User clicks **[Edit]** button on table row
2. Modal opens with pre-filled data
3. Template code field is **disabled** (cannot change)
4. User modifies template name, dimension values, or percentages
5. User clicks **[Save Template]**
6. Validation runs
7. If valid → Update success, modal closes, table refreshes, toast notification

### 4.3 Deactivate/Activate Template

**Deactivate:**
1. User clicks **[Deactivate]** button
2. Confirmation dialog: "Are you sure you want to deactivate this template?"
3. User confirms
4. Template status changes to "Inactive"
5. Button changes to **[Activate]**
6. Toast notification: "Template deactivated successfully"

**Activate:**
1. User clicks **[Activate]** button
2. Template status changes to "Active"
3. Button changes to **[Deactivate]**
4. Toast notification: "Template activated successfully"

### 4.4 Search Templates

**Behavior:**
- Real-time search as user types
- Search across all visible columns
- Case-insensitive
- Filters table rows (no pagination needed for prototypes)

---

## 5. Business Rules

### 5.1 Template Creation Rules

| Rule ID | Rule Description | Enforcement |
|---------|------------------|-------------|
| BR-ST-001 | Template code must be unique per tenant | Database constraint |
| BR-ST-002 | Minimum 2 split lines required | UI validation |
| BR-ST-003 | Total percentage must equal 100.00% | UI + Backend validation |
| BR-ST-004 | Dimension values must belong to selected dimension | Backend validation |
| BR-ST-005 | **Only LEAF NODES (cấp lá) allowed in split templates** | Backend validation + UI filter |
| BR-ST-006 | No duplicate dimension values in same template | UI + Backend validation |
| BR-ST-007 | Only Finance Manager and System Admin can create/edit templates | Role-based access control |
| BR-ST-008 | Inactive templates cannot be used when posting journal entries | UI restriction |

**⚠️ IMPORTANT - Rule BR-ST-005 Explanation:**

**Why only leaf nodes?**
- ❌ **If parent nodes allowed:** System cannot determine split % for each child leaf node
- ✅ **If only leaf nodes:** System can aggregate leaf data up to parent nodes for reporting

**Example:**
```
Cost Center Hierarchy:
├── Sales (parent - NOT allowed in split template)
│   ├── Sales North (leaf - ✅ Can use)
│   └── Sales South (leaf - ✅ Can use)
└── Marketing (parent - NOT allowed)
    ├── Marketing Online (leaf - ✅ Can use)
    └── Marketing Offline (leaf - ✅ Can use)
```

**Split Template Example:**
```
Template: "Cost Center Split"
- Sales North: 30%
- Sales South: 30%
- Marketing Online: 25%
- Marketing Offline: 15%
Total: 100% ✅
```

**Reporting Aggregation:**
When user views report by parent node "Sales":
- System aggregates: Sales North (30%) + Sales South (30%) = Sales (60%) ✅
- When user views by "Marketing":
- System aggregates: Marketing Online (25%) + Marketing Offline (15%) = Marketing (40%) ✅

### 5.2 Percentage Validation

**Rules:**
- Each percentage: 0.01 - 100.00
- Decimal places: 2
- Sum of all lines: Must equal 100.00 exactly
- Example valid combinations:
  - 50.00 + 50.00 = 100.00 ✅
  - 60.00 + 40.00 = 100.00 ✅
  - 33.33 + 33.33 + 33.34 = 100.00 ✅

**Error Cases:**
- 50.00 + 40.00 = 90.00 ❌ (Total < 100%)
- 60.00 + 50.00 = 110.00 ❌ (Total > 100%)
- 50.00 + 50.01 = 100.01 ❌ (Precision error)

---

## 6. Integration with Journal Entry Posting

### 6.1 Usage Flow

When user posts a journal entry and encounters a dimension field:

```
┌─────────────────────────────────────────────┐
│ Cost Center: [Select Dimension Value ▼]    │
│              ├ Sales                        │
│              ├ Marketing                    │
│              ├ Production                   │
│              ├─────────────────────         │
│              └ Split... (Open split modal)  │
└─────────────────────────────────────────────┘
```

**Split Modal:**

```
┌──────────────────────────────────────────────────┐
│  Split Cost Center                         [X]   │
├──────────────────────────────────────────────────┤
│  Total Amount: 180,000,000 VNĐ                   │
│                                                   │
│  Choose method:                                  │
│  ● Use Template   ○ Manual Input                 │
│                                                   │
│  Template: [North-South Split (50%-50%) ▼]       │
│                                                   │
│  ┌────────────────────────────────────────────┐ │
│  │ Cost Center (Leaf)  │  %   │  Amount       │ │
│  ├────────────────────────────────────────────┤ │
│  │ 🍃 Sales North      │ 50%  │  90,000,000  │ │
│  │ 🍃 Sales South      │ 50%  │  90,000,000  │ │
│  ├────────────────────────────────────────────┤ │
│  │ Total               │ 100% │ 180,000,000  │ │
│  └────────────────────────────────────────────┘ │
│                                                   │
│  [Cancel]                           [Apply Split] │
└──────────────────────────────────────────────────┘
```

**Result:**
- System creates 2 journal_lines (using LEAF nodes)
- Line 1: 90,000,000 VNĐ | Cost Center = Sales North (leaf)
- Line 2: 90,000,000 VNĐ | Cost Center = Sales South (leaf)

**Reporting Aggregation:**
When user views P&L by parent "Sales":
- System automatically aggregates: Sales North + Sales South = Sales ✅

---

## 7. Technical Implementation Notes

### 7.1 Frontend (HTML Prototype)

**Technologies:**
- Bootstrap 5.3 for UI components
- Vanilla JavaScript for interactions
- Shared sidebar component (`sidebar.js`)

**Key JavaScript Functions:**
- `loadDimensionValues()` - Load values when dimension selected
- `addLine()` - Add new split line
- `removeLine(button)` - Remove split line
- `updateLineNumbers()` - Renumber lines after add/remove
- `calculateTotal()` - Real-time percentage total calculation
- `saveTemplate()` - Form validation and save
- `editTemplate(id)` - Load template data for editing
- `deactivateTemplate(id)` - Change status to inactive
- `activateTemplate(id)` - Change status to active
- `showToast(message, type)` - Toast notifications

### 7.2 Backend API Endpoints (Reference)

**CRUD Operations:**

```
GET    /api/finance/dimensions/split-templates          # List all templates
GET    /api/finance/dimensions/split-templates/:id      # Get single template
POST   /api/finance/dimensions/split-templates          # Create new template
PUT    /api/finance/dimensions/split-templates/:id      # Update template
DELETE /api/finance/dimensions/split-templates/:id      # Delete template (soft)
PATCH  /api/finance/dimensions/split-templates/:id/status  # Activate/Deactivate
```

**Usage:**

```
GET    /api/finance/dimensions/:dimensionId/split-templates  # Get templates for dimension
POST   /api/finance/journal-entries/split-calculate          # Calculate split amounts
```

### 7.3 Database Schema Reference

**Tables:**
- `dimension_split_templates` - Template header
- `dimension_split_template_lines` - Template lines with percentages

See: [Core_Accounting_Database_Design_v2.md](../../Accounting/Core_Accounting_Database_Design_v2.md) Section 2.6

---

## 8. Responsive Design

### 8.1 Desktop View (> 768px)

- Full sidebar visible
- Table shows all columns
- Modal: Large (modal-lg)
- Split lines: Horizontal layout

### 8.2 Mobile View (≤ 768px)

- Sidebar hidden by default
- Hamburger menu to toggle sidebar
- Table: Horizontal scroll or card layout
- Modal: Full width
- Split lines: Vertical stacking for better mobile UX

---

## 9. Accessibility

### 9.1 ARIA Labels

- Form labels properly associated with inputs
- Modal has `aria-hidden` when closed
- Buttons have descriptive text or `aria-label`

### 9.2 Keyboard Navigation

- Tab order follows logical flow
- Modal can be closed with Escape key
- Enter key submits form
- Focus management when modal opens/closes

### 9.3 Color Contrast

- Text meets WCAG AA standards
- Status badges have sufficient contrast
- Error messages clearly visible

---

## 10. Testing Scenarios

### 10.1 Functional Tests

| Test Case | Expected Result |
|-----------|----------------|
| Create template with 2 lines (50%, 50%) | ✅ Success |
| Create template with total ≠ 100% | ❌ Validation error |
| Create template with duplicate code | ❌ Validation error |
| Edit template and change percentages | ✅ Success |
| Add 5 split lines | ✅ Success |
| Remove line (when 3+ exist) | ✅ Success |
| Remove line (when only 2 exist) | ❌ Button disabled |
| Deactivate active template | ✅ Status changes to Inactive |
| Activate inactive template | ✅ Status changes to Active |
| Search for template by code | ✅ Filters table correctly |

### 10.2 Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| Enter 33.33 + 33.33 + 33.33 | ❌ Total = 99.99% (validation error) |
| Enter 33.33 + 33.33 + 33.34 | ✅ Total = 100.00% (valid) |
| Select same dimension value twice | ❌ Validation error |
| Create template without selecting dimension | ❌ Validation error |
| Template code with spaces | Auto-convert to underscores |
| Template code lowercase | Auto-convert to uppercase |

---

## 11. Future Enhancements

### 11.1 Phase 2 Features (Not in Current Prototype)

1. **Copy Template:** Duplicate existing template with new code
2. **Export/Import:** Export templates to JSON, import from file
3. **Template History:** Track changes to templates (audit log)
4. **Template Usage Stats:** Show how often each template is used
5. **Template Suggestions:** AI-powered suggestions based on usage patterns
6. **Bulk Operations:** Activate/deactivate multiple templates at once
7. **Template Categories:** Group templates by category (Cost, Revenue, Mixed)
8. **Formula-based Split:** Support formulas like "Revenue-based allocation"

### 11.2 Advanced Validations

1. **Posting Control Check:** Only allow postable dimension values
2. **Conflict Detection:** Warn if creating similar templates
3. **Usage Warning:** Warn before deactivating actively-used template

---

## 12. Related Documents

### 12.1 Database Design
- [Core Accounting Database Design v2.2](../../Accounting/Core_Accounting_Database_Design_v2.md) - Section 2.6

### 12.2 Requirements
- [Dimension Definition Requirements](../1_PhanTichYeuCau/1_DimensionDefinition_Requirements.md)
- [Dimension Values Requirements](../1_PhanTichYeuCau/2_DimensionValues_Requirements.md)

### 12.3 Other Prototypes
- [Dimension Definition](html-prototypes/1_dimension-definition.html)
- [Dimension Values](html-prototypes/2_dimension-values.html)
- [Account-Dimension Mapping](html-prototypes/3_account-dimension-mapping.html)

### 12.4 UI/UX Standards
- [UI/UX Design Standards](../../../UI_UX_Design_Standards.md)
- [Bootstrap 5.3 Quick Reference](../../../Bootstrap_5.3_Quick_Reference.md)

---

## 13. Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-10-31 | Initial design document created | Claude AI Agent |

---

**Status:** ✅ Ready for Development
**Prototype:** [View HTML Prototype](html-prototypes/4_dimension-split-templates.html)
**Next Step:** Update sidebar.js to add navigation link

---

**End of Document**
