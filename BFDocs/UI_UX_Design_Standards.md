# UI/UX Design Standards - HTML Prototype Guidelines

**Version:** 1.0
**Created:** 2024-10-29
**Last Updated:** 2024-10-29
**Purpose:** Master reference for creating HTML prototypes in BFDocs Finance modules

---

## Table of Contents

1. [Color Palette & Visual Identity](#1-color-palette--visual-identity)
2. [Typography Standards](#2-typography-standards)
3. [Layout & Spacing](#3-layout--spacing)
4. [Header & Navigation](#4-header--navigation)
5. [Sidebar Navigation](#5-sidebar-navigation)
6. [Form Containers & Sections](#6-form-containers--sections)
7. [Form Fields & Input Elements](#7-form-fields--input-elements)
8. [Buttons & Button States](#8-buttons--button-states)
9. [Tables & Data Display](#9-tables--data-display)
10. [Modals & Dialogs](#10-modals--dialogs)
11. [Alerts & Messages](#11-alerts--messages)
12. [Responsive Design](#12-responsive-design)
13. [Accessibility Standards](#13-accessibility-standards)
14. [Form Validation Patterns](#14-form-validation-patterns)
15. [Interactive Components](#15-interactive-components)
16. [Bootstrap 5.3 Utilities Reference](#16-bootstrap-53-utilities-reference)
17. [Technology Stack](#17-technology-stack)

**Related Documents:**
- [Bootstrap 5.3 Quick Reference Guide](Bootstrap_5.3_Quick_Reference.md) - Comprehensive Bootstrap class lookup

---

## 1. Color Palette & Visual Identity

### Primary Colors

| Color Name | Hex Code | RGB | Usage |
|-----------|----------|-----|-------|
| **Dark Header** | #2c3e50 | (44, 62, 80) | Navigation bars, header backgrounds |
| **Light Background** | #f8f9fa | (248, 249, 250) | Page background, sidebar background |
| **White** | #ffffff | (255, 255, 255) | Form containers, card backgrounds |
| **Dark Text** | #333333 | (51, 51, 51) | Body text, labels |
| **Light Border** | #ddd / #dee2e6 | (221, 221, 221) | Borders, dividers |

### Status & Action Colors

| Color Name | Hex Code | RGB | Usage |
|-----------|----------|-----|-------|
| **Success (Green)** | #28a745 | (40, 167, 69) | Save buttons, confirmed status |
| **Primary (Blue)** | #0d6efd / #2196f3 | (13, 110, 253) | Primary buttons, links, active states |
| **Danger (Red)** | #dc3545 | (220, 53, 69) | Delete, error states, required field markers |
| **Warning (Yellow)** | #ffc107 | (255, 193, 7) | Warning messages, pending status |
| **Info (Light Blue)** | #17a2b8 / #2196f3 | (23, 162, 184) | Information boxes, secondary actions |

### Section Background Colors (Accent Colors)

| Section | Background | Border | Border Color |
|---------|-----------|--------|--------------|
| **Section 1** | #ffffff (white) | Left: 4px | #2196f3 (blue) |
| **Section 2** | #e3f2fd | Left: 4px | #2196f3 (blue) |
| **Section 3** | #f3e5f5 | Left: 4px | #9c27b0 (purple) |
| **Section 4** | #e8f5e9 | Left: 4px | #4caf50 (green) |
| **Section 5** | #fff3e0 | Left: 4px | #ff9800 (orange) |

### Color Compliance

- **Contrast Ratio:** Minimum 4.5:1 for text (WCAG AA)
- **Text on Dark (#2c3e50):** Use white (#ffffff)
- **Text on Light (#f8f9fa):** Use dark (#333333)
- **Required Fields Marker:** Red (#dc3545)

---

## 2. Typography Standards

### Font Family Stack

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**Rationale:** System fonts for better performance and native look across devices

### Font Sizes & Weights

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **Page Title / H1** | 24px | 600 (semibold) | 1.5 | Form headings (e.g., "💰 Tạo Giao dịch Thu Tiền") |
| **Section Title / H2** | 16px | 600 (semibold) | 1.4 | Section headers within forms |
| **Field Label** | 14px | 400 (normal) | 1.5 | Form field labels |
| **Body Text** | 14px | 400 (normal) | 1.6 | Form inputs, descriptions |
| **Small Text / Helper** | 13px | 400 (normal) | 1.4 | Helper text, validation messages |
| **Header Text** | 16px | 500 (medium) | 1.5 | Header navigation text |
| **Sidebar Menu** | 14px | 400 (normal) | 1.5 | Sidebar navigation items |

### Text Color Hierarchy

| Level | Color | Hex | Usage |
|-------|-------|-----|-------|
| **Primary** | Dark Text | #333333 | Main content, labels |
| **Secondary** | Medium Gray | #666666 | Helper text, secondary info |
| **Tertiary** | Light Gray | #999999 | Disabled text, metadata |
| **Accent** | Brand Blue | #2196f3 | Links, active states |
| **Error** | Red | #dc3545 | Error messages, validation |
| **Success** | Green | #28a745 | Success messages |

---

## 3. Layout & Spacing

### Spacing Scale

All spacing follows a base 4px unit system for consistency:

```
4px   → 0.25rem (smallest)
8px   → 0.5rem
12px  → 0.75rem
16px  → 1rem
20px  → 1.25rem
24px  → 1.5rem
30px  → 1.875rem
32px  → 2rem
48px  → 3rem
```

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│  TOP HEADER (65px fixed height)                 │
├──────────────┬──────────────────────────────────┤
│              │                                  │
│   SIDEBAR    │      MAIN CONTENT                │
│  (250px)     │   (responsive width)             │
│              │                                  │
└──────────────┴──────────────────────────────────┘
```

### Main Content Area

- **Margin-left:** 250px (sidebar width)
- **Margin-top:** 65px (header height)
- **Padding:** 30px
- **Min-height:** calc(100vh - 65px)
- **Background:** #f8f9fa (light gray)

### Form Container

```css
{
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 30px;
  width: 100%;
}
```

### Section Containers

```css
{
  background-color: varies (see section colors)
  border: 1px solid #dee2e6;
  border-left: 4px solid (section color);
  border-radius: 0.375rem;
  padding: 20px;
  margin: 15px 0;
}
```

---

## 4. Header & Navigation

### Header Bar Specifications

| Property | Value |
|----------|-------|
| **Position** | Fixed (top: 0, left: 0, right: 0) |
| **Height** | 65px |
| **Background** | #2c3e50 (dark) |
| **Color** | white |
| **Z-index** | 1000 |
| **Box-shadow** | 0 2px 4px rgba(0,0,0,0.1) |
| **Padding** | 0 20px |
| **Display** | flex with justify-content: space-between |

### Header Content Layout

```
┌─ Left Side ──────────────────────── Right Side ─┐
│ Header Title / Navigation Link    [Button] [B] [B] │
└──────────────────────────────────────────────────┘
```

**Left Side:**
- Page/Form title (16px, weight: 500, color: white)
- Optional back button link

**Right Side:**
- Action buttons (left to right): Save, Close, Diagram View
- Button spacing: 10px gap

---

## 5. Sidebar Navigation

### Sidebar Specifications

| Property | Value |
|----------|-------|
| **Position** | Fixed (left: 0, top: 65px) |
| **Width** | 250px |
| **Height** | calc(100vh - 65px) |
| **Background** | #f8f9fa (light gray) |
| **Border-right** | 1px solid #ddd |
| **Overflow** | auto (scrollable) |
| **Z-index** | 900 |
| **Padding** | 20px 0 |

### Sidebar Menu Item Styles

#### Sidebar Link (Regular)

```css
{
  display: block;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}
```

#### Sidebar Link Hover State

```css
{
  background-color: #e9ecef;
  border-left-color: #2c3e50;
  color: #2c3e50;
}
```

#### Sidebar Link Active State

```css
{
  background-color: #e3f2fd;
  border-left-color: #2c3e50;
  color: #2c3e50;
  font-weight: 600;
}
```

### Sidebar Submenu (Collapsible)

#### Submenu Toggle

```css
{
  cursor: pointer;
  font-weight: 600;
  padding: 12px 20px;
  color: #333;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}
```

#### Submenu Container (Collapsed)

```css
{
  list-style: none;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
```

#### Submenu Container (Expanded)

```css
.submenu.show {
  max-height: 500px;
}
```

#### Submenu Item Indentation

```css
{
  padding-left: 40px;
  font-size: 13px;
}
```

---

## 6. Form Containers & Sections

### Form Heading

```css
{
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #2c3e50;
}
```

**Example:** 💰 Tạo Giao dịch Thu Tiền

### Section Title Pattern

```css
{
  font-weight: 600;
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
}
```

### Required Field Marker

```css
.required {
  color: #dc3545;
}
```

**Usage:** Asterisk (*) next to required field labels

### Form Sections Background Coding

```html
<!-- Section 1: White Background (default) -->
<section class="form-section" style="background-color: #ffffff;">

<!-- Section 2: Blue Background (Conditional) -->
<section id="section2Container" style="background-color: #e3f2fd; border-left: 4px solid #2196f3;">

<!-- Section 3: Purple Background (Conditional) -->
<section id="section3Container" style="background-color: #f3e5f5; border-left: 4px solid #9c27b0;">

<!-- Section 4: Green Background (Conditional) -->
<section id="section4Container" style="background-color: #e8f5e9; border-left: 4px solid #4caf50;">

<!-- Section 5: Orange Background (Summary) -->
<section id="totalPaymentSection" style="background-color: #fff3e0; border-left: 4px solid #ff9800;">
```

---

## 7. Form Fields & Input Elements

### Input Field Standard

```css
{
  height: 36px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s;
}
```

### Input Field States

#### Normal State

```css
{
  border-color: #ddd;
  background-color: #ffffff;
  color: #333;
}
```

#### Focus State

```css
{
  border-color: #2196f3;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  outline: none;
}
```

#### Disabled State

```css
{
  border-color: #ddd;
  background-color: #f8f9fa;
  color: #999;
  cursor: not-allowed;
}
```

#### Error State

```css
{
  border-color: #dc3545;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}
```

### Field Label Pattern

```html
<label for="fieldId" class="form-label">
  Field Label
  <span class="required">*</span>
</label>
<input type="text" id="fieldId" class="form-control" required>
```

### Select Dropdown

```css
{
  height: 36px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: #ffffff;
  cursor: pointer;
}
```

### Checkbox Pattern

```css
.form-check {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-check-input {
  width: 18px;
  height: 18px;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
}

.form-check-input:checked {
  background-color: #2196f3;
  border-color: #2196f3;
}
```

### Textarea

```css
{
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
}
```

### Date & Time Inputs

```html
<input type="date" class="form-control">
<input type="time" class="form-control">
```

### Helper Text

```html
<small class="form-text text-muted">Helper text or validation message</small>
```

**Style:**
```css
{
  font-size: 13px;
  color: #666;
}
```

### Validation Messages

#### Error Message

```css
.form-error {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 5px;
}
```

#### Success Message

```css
.form-success {
  color: #28a745;
  font-size: 0.85rem;
  margin-top: 5px;
}
```

---

## 8. Buttons & Button States

### Button Size Standards

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| **Small** | 28px | 6px 12px | 12px |
| **Medium** | 36px | 8px 16px | 14px |
| **Large** | 44px | 10px 20px | 15px |

### Button Variants

#### Primary Button (Blue)

```css
{
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

&:hover {
  background-color: #0b7dda;
  color: white;
}
```

**Usage:** "Gửi Duyệt" (Submit), "OK" (Confirm)

#### Success Button (Green)

```css
{
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

&:hover {
  background-color: #218838;
  color: white;
}
```

**Usage:** "Lưu Nháp" (Save Draft)

#### Danger Button (Red)

```css
{
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

&:hover {
  background-color: #c82333;
  color: white;
}
```

**Usage:** "Close", "Delete", "Cancel"

#### Secondary/Outline Button (Gray)

```css
{
  background-color: transparent;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

&:hover {
  background-color: #f8f9fa;
  border-color: #999;
  color: #333;
}
```

**Usage:** "Budget Plan", "Close", secondary actions

#### Info Button (Cyan)

```css
{
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

&:hover {
  background-color: #138496;
  color: white;
}
```

**Usage:** "Diagram View", informational actions

### Button States

#### Normal

- Standard background color
- 100% opacity
- Pointer cursor

#### Hover

- Darkened background color
- Slight shadow elevation
- Transition: 0.2s

#### Active/Pressed

- Darkened further
- Slight inset shadow effect

#### Disabled

```css
{
  background-color: #ddd;
  color: #999;
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Button Layout Patterns

#### Header Button Group (Right-aligned)

```html
<div class="header-buttons">
  <button class="btn-save">Lưu Nháp</button>
  <button class="btn-primary">Gửi Duyệt</button>
  <button class="btn-diagram">Diagram View</button>
</div>
```

**CSS:**
```css
.header-buttons {
  display: flex;
  gap: 10px;
}
```

#### Form Footer Button Group (Right-aligned)

```html
<div class="form-footer">
  <button class="btn-secondary">Close</button>
  <button class="btn-primary">OK</button>
</div>
```

**CSS:**
```css
.form-footer {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
```

---

## 9. Tables & Data Display

### Table Structure

```html
<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th><input type="checkbox" class="select-all"></th>
      <th>Column 1</th>
      <th>Column 2</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input type="checkbox" class="row-select"></td>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>1,000,000 VNĐ</td>
    </tr>
  </tbody>
</table>
```

### Table Styling

```css
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
}

thead {
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
}

th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

td {
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
  color: #333;
}

tbody tr:hover {
  background-color: #f8f9fa;
}
```

### Table Total Row

**Last row styling:**

```css
tbody tr:last-child {
  background-color: #fff3e0;
  font-weight: 600;
  border-top: 2px solid #ff9800;
}
```

**Display Format:**
```
TOTAL | | | 28,000,000 VNĐ
```

### Number Formatting

- **Currency:** Comma separators every 3 digits + " VNĐ"
  - Example: `28,000,000 VNĐ`
- **Percentage:** Decimal with % symbol
  - Example: `3.5%`
- **Date:** DD/MM/YYYY
  - Example: `15/10/2024`

### Table Checkbox Column

- **Width:** 40px
- **Alignment:** Center
- **Behavior:** Row selection control
- **Select All:** Header checkbox selects/deselects all rows

### Payment Input Column

- **Type:** Text input field
- **Format:** Currency with thousand separators
- **State:** Enabled/Disabled based on row checkbox
- **Validation:** Real-time error checking
- **Width:** 120px

### Detail Button Column (...)

```html
<button class="btn-detail" data-invoice-id="AR0001">...</button>
```

**Style:**
```css
{
  padding: 4px 8px;
  font-size: 12px;
  border: 1px solid #ddd;
  background-color: #ffffff;
  cursor: pointer;
  border-radius: 3px;
}

&:disabled {
  background-color: #f8f9fa;
  color: #999;
  cursor: not-allowed;
}
```

---

## 10. Modals & Dialogs

### Modal Structure

```html
<div class="modal fade" id="modalId" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <!-- Modal Content -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">OK</button>
      </div>
    </div>
  </div>
</div>
```

### Modal Sizes

| Size | Max-width |
|------|-----------|
| **modal-sm** | 300px |
| **modal-md** (default) | 500px |
| **modal-lg** | 800px |
| **modal-xl** | 1200px |

### Modal Header

```css
.modal-header {
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
}

.modal-title {
  font-size: 16px;
  font-weight: 600;
}
```

### Modal Body

```css
.modal-body {
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;
}
```

### Modal Footer

```css
.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #dee2e6;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
```

### Common Modal Types

#### Customer/Employee Selection Modal

- **Size:** modal-lg (800px)
- **Content:** Searchable list with columns
- **Actions:** Select row → Close modal → Populate field

#### Reconciliation Modal

- **Size:** modal-lg
- **Sections:** 2 main sections with subtotals
- **Content:** Advance vouchers + Contract advances
- **Actions:** Select items, enter reconcile amounts, confirm

#### Payment Method Modal

- **Size:** modal-lg
- **Content:** Cash + Bank split form
- **Validation:** Cash + Bank = Total Payment
- **Actions:** OK/Close

#### Installment Detail Modal

- **Size:** modal-lg
- **Content:** Table of installment breakdown
- **Features:** Select enabled installments, calculate total
- **Actions:** OK/Close

---

## 11. Alerts & Messages

### Alert Box Pattern

```html
<div class="alert alert-info">
  <h6>💡 Quy tắc kiểm tra:</h6>
  <ul>
    <li>Các trường có dấu * là bắt buộc</li>
    <li>Số tiền phải > 0</li>
    <li>...</li>
  </ul>
</div>
```

### Alert Styles

#### Info Alert (Light Blue)

```css
.alert-info {
  background-color: #e7f3ff;
  border: 1px solid #b3d9ff;
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
}

.alert-info h6 {
  margin-bottom: 10px;
  color: #004085;
}

.alert-info ul {
  margin-bottom: 0;
  padding-left: 20px;
}

.alert-info li {
  color: #004085;
}
```

#### Success Alert (Light Green)

```css
.alert-success {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  border-radius: 4px;
  padding: 12px 15px;
}
```

#### Error Alert (Light Red)

```css
.alert-danger {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  border-radius: 4px;
  padding: 12px 15px;
}
```

#### Warning Alert (Light Yellow)

```css
.alert-warning {
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
  border-radius: 4px;
  padding: 12px 15px;
}
```

### Validation Error Message

```css
.payment-warning {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 5px;
}
```

**Display Pattern:**
```
[Input field with red border]
⚠️ Vượt quá Balance - Reconcile (7,000,000 VNĐ)
```

### Error Message in Modal

```html
<div class="alert alert-danger" id="errorAlert" style="display: none;">
  ⚠️ <span id="errorMessage"></span>
</div>
```

---

## 12. Responsive Design

### Breakpoints (Bootstrap 5)

| Breakpoint | Size Range | CSS |
|-----------|-----------|-----|
| **xs (mobile)** | < 576px | default (no prefix) |
| **sm** | ≥ 576px | `-sm` |
| **md** | ≥ 768px | `-md` |
| **lg** | ≥ 992px | `-lg` |
| **xl** | ≥ 1200px | `-xl` |
| **xxl** | ≥ 1400px | `-xxl` |

### Layout Rules

#### Desktop (≥ 1200px)

- **Sidebar:** 250px fixed width visible
- **Form fields:** 2-column layout (col-md-6)
- **Main content:** margin-left: 250px
- **Form width:** full container width (max 1200px)

#### Tablet (768px - 1199px)

- **Sidebar:** 250px fixed (may toggle hidden)
- **Form fields:** 2-column layout (col-md-6)
- **Main content:** margin-left: 250px
- **Padding:** Reduced to 20px

#### Mobile (< 768px)

- **Sidebar:** Hidden or toggle menu (hamburger)
- **Form fields:** Full width (col-12)
- **Main content:** margin-left: 0
- **Header height:** 60px
- **Padding:** 15px
- **Buttons:** Stack vertically

### Column Classes

```html
<!-- Desktop 2-column layout -->
<div class="row">
  <div class="col-md-6">Field 1</div>
  <div class="col-md-6">Field 2</div>
</div>

<!-- Mobile full-width -->
<div class="row">
  <div class="col-12">Field 1</div>
  <div class="col-12">Field 2</div>
</div>
```

### Responsive Form Layout

```html
<!-- 2-column on desktop, 1-column on mobile -->
<div class="row">
  <div class="col-md-6">
    <label>Name <span class="required">*</span></label>
    <input type="text" class="form-control">
  </div>
  <div class="col-md-6">
    <label>Date <span class="required">*</span></label>
    <input type="date" class="form-control">
  </div>
</div>
```

### Table Responsiveness

For tables on mobile:
- Use horizontal scroll wrapper: `<div class="table-responsive">`
- Or collapse non-essential columns
- Font size: 12px on mobile

---

## 13. Accessibility Standards

### WCAG 2.1 Compliance Level: AA

### Semantic HTML

- Use proper heading hierarchy: h1 → h2 → h3
- Use `<label>` for all form inputs with `for` attribute
- Use `<button>` for buttons, `<a>` for links
- Use `<table>` with `<thead>`, `<tbody>`, `<th>`, `<td>`

### Form Labels

```html
<label for="fieldId">Label Text <span class="required">*</span></label>
<input type="text" id="fieldId" required>
```

### ARIA Attributes

```html
<!-- For hidden error messages -->
<div class="form-error" role="alert" aria-live="polite">
  Error message here
</div>

<!-- For complex modals -->
<div role="dialog" aria-labelledby="modalTitle" aria-modal="true">
  <h2 id="modalTitle">Modal Title</h2>
</div>
```

### Color Contrast

- **Text on background:** Minimum 4.5:1 contrast ratio
- **Large text (18pt+):** Minimum 3:1 ratio
- **Don't rely on color alone:** Use patterns, icons, or text labels

### Keyboard Navigation

- All interactive elements focusable with Tab key
- Focus visible indicator on all buttons/inputs
- Focus order logical and intuitive
- Escape key closes modals

### Focus Indicator

```css
:focus {
  outline: 2px solid #2196f3;
  outline-offset: 2px;
}
```

### Alternative Text

- All images have `alt` text
- Icons use ARIA labels or title attributes
- Icons in buttons: wrap in `<span class="sr-only">` for screen readers

### Form Validation

- Error messages have `role="alert"`
- Associated with form field using `aria-describedby`
- Accessible error styling (not just color)

### Language Declaration

```html
<html lang="vi">
  <!-- Vietnamese language -->
</html>
```

---

## 14. Form Validation Patterns

### Client-side Validation

#### HTML5 Validation

```html
<!-- Required field -->
<input type="text" required>

<!-- Email validation -->
<input type="email" required>

<!-- Number with min/max -->
<input type="number" min="0" max="999999999">

<!-- Date input -->
<input type="date" required>

<!-- Pattern matching -->
<input type="text" pattern="[0-9]{10}" title="Phone must be 10 digits">
```

#### Custom Validation Rules

1. **Required Fields:** Must not be empty
2. **Currency Amounts:** Must be > 0
3. **Dates:** Cannot be more than 30 days in the past
4. **Email:** Valid format (xxx@xxx.xxx)
5. **Phone:** 10-11 digits
6. **Reconcile Amount:** Cannot exceed available balance
7. **Payment Amount:** Cannot exceed (Balance - Reconcile Amount)

### Real-time Validation

```javascript
// Trigger on input event
input.addEventListener('oninput', function() {
  validateField(this);
});

// Example: Payment field validation
function validateInvoicePayment(input) {
  const paymentValue = parseInt(input.value.replace(/,/g, '')) || 0;
  const balanceCell = input.closest('tr').querySelector('[data-balance]');
  const balance = parseInt(balanceCell.textContent.replace(/,/g, '')) || 0;
  const reconcileAmount = parseInt(input.dataset.reconcile) || 0;
  const maxPayment = balance - reconcileAmount;

  if (paymentValue > maxPayment) {
    input.classList.add('is-invalid');
    showErrorMessage(input, `Vượt quá Balance - Reconcile (${maxPayment.toLocaleString('vi-VN')} VNĐ)`);
  } else {
    input.classList.remove('is-invalid');
    clearErrorMessage(input);
  }
}
```

### Validation Error Display

**Location:** Below input field
**Color:** Red (#dc3545)
**Font size:** 0.85rem
**Icon:** Warning icon or ⚠️ emoji
**Format:** "Error message text"

### Form-level Validation

Before submission, validate:
- All required fields are filled
- All amounts are > 0
- Dates are within acceptable range
- Payment total matches (for payment method modal)
- No conflicting selections

### Conditional Validation

```javascript
// Example: Show Section 2 only if Type = "Customer payment"
const typeSelect = document.getElementById('type');
const section2 = document.getElementById('section2Container');

typeSelect.addEventListener('change', function() {
  if (this.value === 'customer_payment') {
    section2.style.display = 'block';
    validateDependentFields();
  } else {
    section2.style.display = 'none';
    clearSectionValues(section2);
  }
});
```

---

## 15. Interactive Components

### Conditional Visibility

Use this pattern for sections that show/hide based on form values:

```javascript
// Toggle section based on checkbox
checkbox.addEventListener('change', function() {
  const table = this.closest('section').querySelector('table');
  if (this.checked) {
    table.style.display = 'block';
  } else {
    table.style.display = 'none';
    clearTableData(table);
  }
});
```

### Auto-calculate Totals

```javascript
// Update total payment in real-time
function updateTotalPayment() {
  let total = 0;

  // Sum Section 2 selected amounts
  document.querySelectorAll('#section2 input[type="checkbox"]:checked').forEach(checkbox => {
    const amount = parseInt(checkbox.closest('tr').querySelector('[data-amount]').textContent.replace(/,/g, '')) || 0;
    total += amount;
  });

  // Sum Section 4 payment inputs
  document.querySelectorAll('.invoice-payment-input').forEach(input => {
    const amount = parseInt(input.value.replace(/,/g, '')) || 0;
    total += amount;
  });

  // Format and display
  const totalField = document.getElementById('totalPayment');
  totalField.value = total.toLocaleString('vi-VN') + ' VNĐ';
}

// Trigger on any change
document.addEventListener('change', updateTotalPayment);
document.addEventListener('input', updateTotalPayment);
```

### Select All Checkbox

```javascript
const selectAllCheckbox = table.querySelector('thead input[type="checkbox"]');
const rowCheckboxes = table.querySelectorAll('tbody input[type="checkbox"]');

selectAllCheckbox.addEventListener('change', function() {
  rowCheckboxes.forEach(checkbox => {
    checkbox.checked = this.checked;
    checkbox.dispatchEvent(new Event('change'));
  });
});
```

### Modal Trigger Pattern

```html
<!-- Button that opens modal -->
<button type="button" data-bs-toggle="modal" data-bs-target="#customerModal">
  Select Customer
</button>

<!-- Modal -->
<div class="modal fade" id="customerModal">
  <!-- Modal content -->
</div>
```

```javascript
// Close modal and populate field
document.querySelectorAll('[data-customer-id]').forEach(row => {
  row.addEventListener('click', function() {
    const customerId = this.dataset.customerId;
    const customerName = this.dataset.customerName;

    document.getElementById('customerField').value = customerName;
    bootstrap.Modal.getInstance(document.getElementById('customerModal')).hide();
  });
});
```

### Disable/Enable Based on Checkbox

```javascript
// Payment input enabled only if row checkbox is checked
row.querySelector('input[type="checkbox"]').addEventListener('change', function() {
  const paymentInput = row.querySelector('.invoice-payment-input');
  const detailButton = row.querySelector('.btn-detail');

  paymentInput.disabled = !this.checked;
  detailButton.disabled = !this.checked;

  if (!this.checked) {
    paymentInput.value = '';
  }
});
```

---

## 16. Bootstrap 5.3 Utilities Reference

### Display & Visibility

```html
<!-- Display utilities -->
<div class="d-none"></div>                    <!-- display: none -->
<div class="d-block"></div>                   <!-- display: block -->
<div class="d-inline"></div>                  <!-- display: inline -->
<div class="d-inline-block"></div>            <!-- display: inline-block -->
<div class="d-flex"></div>                    <!-- display: flex -->
<div class="d-grid"></div>                    <!-- display: grid -->

<!-- Responsive display -->
<div class="d-none d-md-block"></div>         <!-- Hidden on mobile, visible on desktop -->
<div class="d-block d-md-none"></div>         <!-- Visible on mobile, hidden on desktop -->
<div class="d-md-flex"></div>                 <!-- Flex layout on medium+ screens -->
```

### Flexbox Utilities

```html
<!-- Container setup -->
<div class="d-flex"></div>                    <!-- Create flex container -->
<div class="d-inline-flex"></div>             <!-- Inline flex container -->

<!-- Direction -->
<div class="d-flex flex-row"></div>           <!-- Left to right (default) -->
<div class="d-flex flex-column"></div>        <!-- Top to bottom -->
<div class="d-flex flex-row-reverse"></div>   <!-- Right to left -->
<div class="d-flex flex-column-reverse"></div> <!-- Bottom to top -->

<!-- Alignment - Main axis (justify-content) -->
<div class="d-flex justify-content-start"></div>     <!-- flex-start (default) -->
<div class="d-flex justify-content-end"></div>       <!-- flex-end -->
<div class="d-flex justify-content-center"></div>    <!-- center -->
<div class="d-flex justify-content-between"></div>   <!-- space-between -->
<div class="d-flex justify-content-around"></div>    <!-- space-around -->
<div class="d-flex justify-content-evenly"></div>    <!-- space-evenly -->

<!-- Alignment - Cross axis (align-items) -->
<div class="d-flex align-items-start"></div>        <!-- flex-start -->
<div class="d-flex align-items-end"></div>          <!-- flex-end -->
<div class="d-flex align-items-center"></div>       <!-- center -->
<div class="d-flex align-items-baseline"></div>     <!-- baseline -->
<div class="d-flex align-items-stretch"></div>      <!-- stretch (default) -->

<!-- Gap between flex items -->
<div class="d-flex gap-1"></div>              <!-- gap: 0.25rem (4px) -->
<div class="d-flex gap-2"></div>              <!-- gap: 0.5rem (8px) -->
<div class="d-flex gap-3"></div>              <!-- gap: 1rem (16px) -->
<div class="d-flex gap-4"></div>              <!-- gap: 1.5rem (24px) -->
<div class="d-flex gap-5"></div>              <!-- gap: 3rem (48px) -->

<!-- Flex item properties -->
<div class="flex-grow-1"></div>               <!-- flex-grow: 1 (expand to fill) -->
<div class="flex-shrink-1"></div>             <!-- flex-shrink: 1 -->
<div class="flex-fill"></div>                 <!-- flex: 1 1 auto -->
<div class="flex-wrap"></div>                 <!-- flex-wrap: wrap -->
<div class="flex-nowrap"></div>               <!-- flex-wrap: nowrap (default) -->
```

### Spacing (Margin & Padding)

```html
<!-- Padding: p-{size} -->
<div class="p-0"></div>   <!-- 0px -->
<div class="p-1"></div>   <!-- 4px (0.25rem) -->
<div class="p-2"></div>   <!-- 8px (0.5rem) -->
<div class="p-3"></div>   <!-- 16px (1rem) -->
<div class="p-4"></div>   <!-- 24px (1.5rem) -->
<div class="p-5"></div>   <!-- 48px (3rem) -->

<!-- Padding sides: ps (start), pe (end), pt (top), pb (bottom), px (horizontal), py (vertical) -->
<div class="ps-3"></div>  <!-- padding-left: 16px -->
<div class="pe-3"></div>  <!-- padding-right: 16px -->
<div class="pt-3"></div>  <!-- padding-top: 16px -->
<div class="pb-3"></div>  <!-- padding-bottom: 16px -->
<div class="px-3"></div>  <!-- padding-left & padding-right: 16px -->
<div class="py-3"></div>  <!-- padding-top & padding-bottom: 16px -->

<!-- Margin: m-{size} -->
<div class="m-0"></div>   <!-- 0px -->
<div class="m-1"></div>   <!-- 4px -->
<div class="m-2"></div>   <!-- 8px -->
<div class="m-3"></div>   <!-- 16px -->
<div class="m-4"></div>   <!-- 24px -->
<div class="m-5"></div>   <!-- 48px -->

<!-- Margin sides: ms (start), me (end), mt (top), mb (bottom), mx (horizontal), my (vertical) -->
<div class="ms-auto"></div>  <!-- margin-left: auto (push right) -->
<div class="me-auto"></div>  <!-- margin-right: auto (push left) -->
<div class="mx-auto"></div>  <!-- margin-left & margin-right: auto (center) -->
<div class="mt-0"></div>  <!-- margin-top: 0 -->
<div class="mb-3"></div>  <!-- margin-bottom: 16px -->

<!-- Responsive spacing -->
<div class="p-3 p-md-5"></div>      <!-- 16px on mobile, 48px on desktop -->
<div class="m-2 m-lg-4"></div>      <!-- 8px on mobile, 24px on large screens -->
```

### Text & Typography Utilities

```html
<!-- Text alignment -->
<div class="text-start"></div>      <!-- text-align: left -->
<div class="text-center"></div>     <!-- text-align: center -->
<div class="text-end"></div>        <!-- text-align: right -->

<!-- Responsive text alignment -->
<div class="text-center text-md-start"></div>  <!-- Center on mobile, left on desktop -->

<!-- Font weight -->
<div class="fw-light"></div>        <!-- font-weight: 300 -->
<div class="fw-normal"></div>       <!-- font-weight: 400 -->
<div class="fw-semibold"></div>     <!-- font-weight: 600 -->
<div class="fw-bold"></div>         <!-- font-weight: 700 -->

<!-- Font style -->
<div class="fst-italic"></div>      <!-- font-style: italic -->
<div class="fst-normal"></div>      <!-- font-style: normal -->

<!-- Text decoration -->
<div class="text-decoration-none"></div>   <!-- text-decoration: none -->
<div class="text-decoration-underline"></div>

<!-- Text color -->
<div class="text-primary"></div>    <!-- Bootstrap primary color -->
<div class="text-success"></div>    <!-- Green -->
<div class="text-danger"></div>     <!-- Red -->
<div class="text-warning"></div>    <!-- Yellow -->
<div class="text-info"></div>       <!-- Cyan -->
<div class="text-muted"></div>      <!-- Gray -->
<div class="text-dark"></div>       <!-- Dark gray -->
<div class="text-light"></div>      <!-- Light gray -->
<div class="text-white"></div>      <!-- White -->

<!-- Text truncation -->
<div class="text-truncate"></div>   <!-- Single line ellipsis -->
```

### Background Colors

```html
<!-- Background utilities -->
<div class="bg-primary"></div>      <!-- Bootstrap primary blue -->
<div class="bg-success"></div>      <!-- Green (#198754) -->
<div class="bg-danger"></div>       <!-- Red (#dc3545) -->
<div class="bg-warning"></div>      <!-- Yellow (#ffc107) -->
<div class="bg-info"></div>         <!-- Cyan (#0dcaf0) -->
<div class="bg-light"></div>        <!-- Light gray (#f8f9fa) -->
<div class="bg-dark"></div>         <!-- Dark gray (#212529) -->
<div class="bg-white"></div>        <!-- White -->
<div class="bg-body"></div>         <!-- Body background -->

<!-- Background opacity (requires CSS variables) -->
<div class="bg-primary bg-opacity-50"></div>  <!-- 50% opacity -->
```

### Border Utilities

```html
<!-- Add border -->
<div class="border"></div>          <!-- All sides -->
<div class="border-top"></div>      <!-- Top only -->
<div class="border-end"></div>      <!-- Right only -->
<div class="border-bottom"></div>   <!-- Bottom only -->
<div class="border-start"></div>    <!-- Left only -->

<!-- Remove border -->
<div class="border-0"></div>        <!-- Remove all borders -->
<div class="border-top-0"></div>    <!-- Remove top border -->

<!-- Border color -->
<div class="border border-primary"></div>     <!-- Blue border -->
<div class="border border-success"></div>     <!-- Green border -->
<div class="border border-danger"></div>      <!-- Red border -->

<!-- Border width -->
<div class="border border-1"></div>  <!-- 1px -->
<div class="border border-2"></div>  <!-- 2px -->
<div class="border border-3"></div>  <!-- 3px -->
<div class="border border-4"></div>  <!-- 4px -->
<div class="border border-5"></div>  <!-- 5px -->

<!-- Border radius -->
<div class="rounded"></div>         <!-- border-radius: 0.375rem -->
<div class="rounded-0"></div>       <!-- border-radius: 0 (no rounding) -->
<div class="rounded-1"></div>       <!-- border-radius: 0.25rem -->
<div class="rounded-2"></div>       <!-- border-radius: 0.375rem -->
<div class="rounded-3"></div>       <!-- border-radius: 0.5rem -->
<div class="rounded-4"></div>       <!-- border-radius: 0.75rem -->
<div class="rounded-5"></div>       <!-- border-radius: 1rem -->
<div class="rounded-circle"></div>  <!-- border-radius: 50% -->

<!-- Rounded corners (individual sides) -->
<div class="rounded-top"></div>     <!-- Top corners only -->
<div class="rounded-end"></div>     <!-- Right corners only -->
<div class="rounded-bottom"></div>  <!-- Bottom corners only -->
<div class="rounded-start"></div>   <!-- Left corners only -->
```

### Size Utilities

```html
<!-- Width -->
<div class="w-25"></div>    <!-- width: 25% -->
<div class="w-50"></div>    <!-- width: 50% -->
<div class="w-75"></div>    <!-- width: 75% -->
<div class="w-100"></div>   <!-- width: 100% -->
<div class="w-auto"></div>  <!-- width: auto -->

<!-- Height -->
<div class="h-25"></div>    <!-- height: 25% -->
<div class="h-50"></div>    <!-- height: 50% -->
<div class="h-75"></div>    <!-- height: 75% -->
<div class="h-100"></div>   <!-- height: 100% -->
<div class="h-auto"></div>  <!-- height: auto -->

<!-- Minimum width/height -->
<div class="min-vw-100"></div>  <!-- min-width: 100vw (full viewport width) -->
<div class="min-vh-100"></div>  <!-- min-height: 100vh (full viewport height) -->

<!-- Max width -->
<div class="mw-100"></div>  <!-- max-width: 100% -->
```

### Position & Overflow

```html
<!-- Position utilities -->
<div class="position-static"></div>     <!-- position: static -->
<div class="position-relative"></div>   <!-- position: relative -->
<div class="position-absolute"></div>   <!-- position: absolute -->
<div class="position-fixed"></div>      <!-- position: fixed -->
<div class="position-sticky"></div>     <!-- position: sticky -->

<!-- Position properties -->
<div class="top-0"></div>      <!-- top: 0 -->
<div class="bottom-0"></div>    <!-- bottom: 0 -->
<div class="start-0"></div>     <!-- left: 0 -->
<div class="end-0"></div>       <!-- right: 0 -->

<!-- Z-index -->
<div class="z-0"></div>         <!-- z-index: 0 -->
<div class="z-1"></div>         <!-- z-index: 1 -->
<div class="z-2"></div>         <!-- z-index: 2 -->
<div class="z-3"></div>         <!-- z-index: 3 -->

<!-- Overflow -->
<div class="overflow-auto"></div>   <!-- overflow: auto (scrollable) -->
<div class="overflow-hidden"></div> <!-- overflow: hidden -->
<div class="overflow-visible"></div> <!-- overflow: visible -->
<div class="overflow-scroll"></div> <!-- overflow: scroll -->

<!-- Overflow X/Y axis -->
<div class="overflow-x-auto"></div>   <!-- overflow-x: auto -->
<div class="overflow-y-auto"></div>   <!-- overflow-y: auto -->
```

### Shadow & Effects

```html
<!-- Box shadow -->
<div class="shadow"></div>          <!-- Small shadow -->
<div class="shadow-sm"></div>       <!-- Extra small shadow -->
<div class="shadow-lg"></div>       <!-- Large shadow -->
<div class="shadow-none"></div>     <!-- No shadow -->
```

### Opacity

```html
<div class="opacity-0"></div>   <!-- opacity: 0 (invisible) -->
<div class="opacity-25"></div>  <!-- opacity: 0.25 -->
<div class="opacity-50"></div>  <!-- opacity: 0.5 -->
<div class="opacity-75"></div>  <!-- opacity: 0.75 -->
<div class="opacity-100"></div> <!-- opacity: 1 (fully visible) -->
```

### Cursor

```html
<div class="cursor-pointer"></div>    <!-- cursor: pointer -->
<div class="cursor-auto"></div>       <!-- cursor: auto -->
```

### Common Pattern Examples

**Centered container with padding:**
```html
<div class="d-flex justify-content-center align-items-center p-3">
  Content
</div>
```

**Button group with gap:**
```html
<div class="d-flex gap-2">
  <button class="btn btn-primary">Button 1</button>
  <button class="btn btn-success">Button 2</button>
</div>
```

**Form section with background:**
```html
<div class="bg-light p-4 rounded">
  <h5 class="mb-3">Section Title</h5>
  <div class="row">
    <div class="col-md-6 mb-3">
      <label class="form-label">Field 1</label>
      <input type="text" class="form-control">
    </div>
    <div class="col-md-6 mb-3">
      <label class="form-label">Field 2</label>
      <input type="text" class="form-control">
    </div>
  </div>
</div>
```

**Responsive header:**
```html
<header class="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
  <h1 class="h5 m-0">Title</h1>
  <div class="d-flex gap-2">
    <button class="btn btn-sm btn-light">Button</button>
  </div>
</header>
```

**Sidebar layout:**
```html
<div class="d-flex" style="height: 100vh;">
  <nav class="bg-light p-3" style="width: 250px; overflow-y: auto;">
    <!-- Sidebar content -->
  </nav>
  <main class="flex-grow-1 p-4" style="overflow-y: auto;">
    <!-- Main content -->
  </main>
</div>
```

---

## 17. Technology Stack

### HTML Framework

- **Bootstrap 5.3** via CDN
  ```html
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  ```

### CSS

- **Bootstrap 5.3 CSS** for base styles
- **Custom inline styles** in `<style>` tag for project-specific styling
- **No external CSS files** required
- **CSS Variables** for theming (optional future enhancement)

### JavaScript

- **Vanilla JavaScript** (no jQuery)
- **Bootstrap JS** for modals, dropdowns, tooltips
- **Minimal JavaScript** for interactivity
- **No frontend frameworks** (React, Vue, Angular) for prototypes

### Icons & Emojis

- **Unicode Emojis** for icons (💰, 💡, ⚠️)
- **Bootstrap Icons** (optional) via CDN
- **No Font Awesome** or other icon libraries needed

### Document Type

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- ... -->
</head>
<body>
  <!-- ... -->
</body>
</html>
```

### Performance Considerations

- **Minimal HTTP requests** (avoid external libraries)
- **Inline styles** where possible (no external CSS)
- **Optimize images** if used (avoid large file sizes)
- **Compress JavaScript** before production
- **Use CDN** for Bootstrap

---

## Quick Reference Checklist

### Before Creating HTML Prototype

- [ ] Review relevant form description document (Form_CreateCashIn_Description.md, etc.)
- [ ] Define all form sections and their conditional visibility
- [ ] List all fields with types (text, select, checkbox, date, etc.)
- [ ] Plan section background colors (use section color map from Section 6)
- [ ] Identify required fields (marked with *)
- [ ] Define validation rules for each field
- [ ] Plan responsive layout (2-column on desktop, 1-column on mobile)

### During HTML Development

- [ ] Use Bootstrap 5.3 classes for consistency
- [ ] Apply correct color scheme from palette
- [ ] Use proper spacing (4px, 8px, 12px, 16px, etc.)
- [ ] Implement form sections with proper styling
- [ ] Add form validation (HTML5 + custom JS)
- [ ] Test sidebar and header layout
- [ ] Implement all interactive patterns (modals, toggles, etc.)
- [ ] Add real-time total calculations
- [ ] Ensure accessibility (labels, ARIA, semantic HTML)
- [ ] Test responsive design on mobile/tablet/desktop

### After HTML Development

- [ ] Validate HTML markup
- [ ] Test form submission flow
- [ ] Verify all modals open/close correctly
- [ ] Test conditional field visibility
- [ ] Verify real-time calculations
- [ ] Check responsive design
- [ ] Test accessibility (keyboard navigation, screen reader)
- [ ] Update related markdown documentation
- [ ] Get design review before proceeding to development

---

## Document Maintenance

**Last Updated:** 2024-10-29
**Version:** 1.0
**Maintainer:** Design & Documentation Team

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-10-29 | Initial creation based on Cashin-out prototype |

---

*Reference this document when creating HTML prototypes in BFDocs/Finance modules.*

*For questions about specific design patterns, refer to BFDocs/Finance/Cashin-out/2_ThietKe/html-prototypes/ for working examples.*
