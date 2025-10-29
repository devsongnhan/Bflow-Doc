# Bootstrap 5.3 Quick Reference Guide

**Version:** 5.3.0
**Purpose:** Quick lookup guide for Bootstrap classes commonly used in BFDocs Finance modules
**Last Updated:** 2024-10-29

---

## Table of Contents

1. [Grid System](#1-grid-system)
2. [Flexbox & Layout](#2-flexbox--layout)
3. [Spacing (Margin & Padding)](#3-spacing-margin--padding)
4. [Typography](#4-typography)
5. [Colors](#5-colors)
6. [Buttons](#6-buttons)
7. [Forms](#7-forms)
8. [Tables](#8-tables)
9. [Cards](#9-cards)
10. [Modals](#10-modals)
11. [Alerts](#11-alerts)
12. [Borders & Corners](#12-borders--corners)
13. [Sizing](#13-sizing)
14. [Position & Display](#14-position--display)
15. [Utility Classes Cheat Sheet](#15-utility-classes-cheat-sheet)

---

## 1. Grid System

### Container

```html
<!-- Responsive container (100% width up to breakpoint) -->
<div class="container">
  <!-- Content -->
</div>

<!-- Full width container -->
<div class="container-fluid">
  <!-- Content -->
</div>

<!-- Container with max-width at breakpoint -->
<div class="container-lg">  <!-- max-width: 1200px on lg+ screens -->
  <!-- Content -->
</div>
```

### Row & Column

```html
<!-- Basic grid -->
<div class="row">
  <div class="col">Auto width column</div>
  <div class="col">Auto width column</div>
</div>

<!-- Fixed column widths -->
<div class="row">
  <div class="col-6">50% width (6 of 12 columns)</div>
  <div class="col-6">50% width (6 of 12 columns)</div>
</div>

<!-- Responsive columns (2 on desktop, 1 on mobile) -->
<div class="row">
  <div class="col-12 col-md-6">Mobile: 100%, Desktop: 50%</div>
  <div class="col-12 col-md-6">Mobile: 100%, Desktop: 50%</div>
</div>

<!-- Different widths per breakpoint -->
<div class="col-12 col-sm-6 col-md-4 col-lg-3">
  <!-- 100% on xs, 50% on sm, 33% on md, 25% on lg+ -->
</div>
```

### Breakpoints

```
xs (extra small): < 576px     (no suffix)
sm (small):      ≥ 576px     (-sm)
md (medium):     ≥ 768px     (-md)
lg (large):      ≥ 992px     (-lg)
xl (extra large):≥ 1200px    (-xl)
xxl:             ≥ 1400px    (-xxl)
```

### Column Width Classes

```html
<!-- Fractional widths (all out of 12 columns) -->
<div class="col-1"></div>   <!-- 8.333% -->
<div class="col-2"></div>   <!-- 16.666% -->
<div class="col-3"></div>   <!-- 25% -->
<div class="col-4"></div>   <!-- 33.333% -->
<div class="col-5"></div>   <!-- 41.666% -->
<div class="col-6"></div>   <!-- 50% -->
<div class="col-7"></div>   <!-- 58.333% -->
<div class="col-8"></div>   <!-- 66.666% -->
<div class="col-9"></div>   <!-- 75% -->
<div class="col-10"></div>  <!-- 83.333% -->
<div class="col-11"></div>  <!-- 91.666% -->
<div class="col-12"></div>  <!-- 100% -->

<!-- Auto width -->
<div class="col"></div>     <!-- auto -->
<div class="col-auto"></div> <!-- width: auto -->
```

### Column Offset

```html
<!-- Offset column from left -->
<div class="col-6 offset-3"></div>     <!-- 50% width, 25% left margin -->
<div class="col-4 offset-2"></div>     <!-- 33% width, 16% left margin -->
<div class="col-md-6 offset-md-3"></div> <!-- Responsive offset -->
```

### Gap (Gutter)

```html
<!-- Gap between columns (gutter width) -->
<div class="row g-0">  <!-- No gap (0px) -->
  <div class="col-md-6"></div>
  <div class="col-md-6"></div>
</div>

<div class="row g-1">  <!-- gap: 4px -->
<div class="row g-2">  <!-- gap: 8px -->
<div class="row g-3">  <!-- gap: 16px -->
<div class="row g-4">  <!-- gap: 24px -->
<div class="row g-5">  <!-- gap: 48px -->

<!-- Responsive gap -->
<div class="row g-2 g-md-4">  <!-- 8px on mobile, 24px on desktop -->
```

---

## 2. Flexbox & Layout

### Display Property

```html
<div class="d-none"></div>           <!-- display: none -->
<div class="d-block"></div>          <!-- display: block -->
<div class="d-inline"></div>         <!-- display: inline -->
<div class="d-inline-block"></div>   <!-- display: inline-block -->
<div class="d-flex"></div>           <!-- display: flex -->
<div class="d-inline-flex"></div>    <!-- display: inline-flex -->
<div class="d-grid"></div>           <!-- display: grid -->

<!-- Responsive display -->
<div class="d-none d-md-block"></div>     <!-- Hidden on mobile, visible on desktop -->
<div class="d-block d-md-none"></div>     <!-- Visible on mobile, hidden on desktop -->
<div class="d-flex d-md-block"></div>     <!-- Flex on mobile, block on desktop -->
```

### Flex Direction

```html
<div class="d-flex flex-row"></div>          <!-- Left to right (default) -->
<div class="d-flex flex-column"></div>       <!-- Top to bottom -->
<div class="d-flex flex-row-reverse"></div>  <!-- Right to left -->
<div class="d-flex flex-column-reverse"></div> <!-- Bottom to top -->

<!-- Responsive direction -->
<div class="d-flex flex-column flex-md-row"></div> <!-- Column on mobile, row on desktop -->
```

### Justify Content (Horizontal Alignment)

```html
<div class="d-flex justify-content-start"></div>     <!-- flex-start (left) - default -->
<div class="d-flex justify-content-end"></div>       <!-- flex-end (right) -->
<div class="d-flex justify-content-center"></div>    <!-- center -->
<div class="d-flex justify-content-between"></div>   <!-- space-between (ends touch edges) -->
<div class="d-flex justify-content-around"></div>    <!-- space-around (equal space) -->
<div class="d-flex justify-content-evenly"></div>    <!-- space-evenly (equal space including edges) -->
```

### Align Items (Vertical Alignment)

```html
<div class="d-flex align-items-start"></div>        <!-- flex-start (top) -->
<div class="d-flex align-items-end"></div>          <!-- flex-end (bottom) -->
<div class="d-flex align-items-center"></div>       <!-- center (vertically) -->
<div class="d-flex align-items-baseline"></div>     <!-- baseline -->
<div class="d-flex align-items-stretch"></div>      <!-- stretch (default) -->
```

### Flex Wrap

```html
<div class="d-flex flex-wrap"></div>       <!-- Items wrap to next line -->
<div class="d-flex flex-nowrap"></div>     <!-- Items stay on one line (default) -->
<div class="d-flex flex-wrap-reverse"></div> <!-- Wrap in reverse -->
```

### Gap Between Items

```html
<div class="d-flex gap-0"></div>  <!-- gap: 0 -->
<div class="d-flex gap-1"></div>  <!-- gap: 4px (0.25rem) -->
<div class="d-flex gap-2"></div>  <!-- gap: 8px (0.5rem) -->
<div class="d-flex gap-3"></div>  <!-- gap: 16px (1rem) -->
<div class="d-flex gap-4"></div>  <!-- gap: 24px (1.5rem) -->
<div class="d-flex gap-5"></div>  <!-- gap: 48px (3rem) -->
```

### Flex Item Properties

```html
<div class="flex-grow-0"></div>    <!-- flex-grow: 0 (don't grow) -->
<div class="flex-grow-1"></div>    <!-- flex-grow: 1 (expand to fill) -->
<div class="flex-shrink-0"></div>  <!-- flex-shrink: 0 (don't shrink) -->
<div class="flex-shrink-1"></div>  <!-- flex-shrink: 1 (shrink if needed) -->

<div class="flex-fill"></div>      <!-- flex: 1 1 auto (take equal space) -->
<div class="flex-equal"></div>     <!-- Make all flex children equal width -->
```

### Common Flex Patterns

```html
<!-- Centered container -->
<div class="d-flex justify-content-center align-items-center" style="height: 300px;">
  Centered content
</div>

<!-- Space between layout (header: logo on left, buttons on right) -->
<div class="d-flex justify-content-between align-items-center p-3">
  <h1>Logo</h1>
  <div class="d-flex gap-2">
    <button class="btn btn-primary">Button 1</button>
    <button class="btn btn-success">Button 2</button>
  </div>
</div>

<!-- Sidebar + Main content -->
<div class="d-flex">
  <nav class="bg-light p-3" style="width: 250px;">Sidebar</nav>
  <main class="flex-grow-1">Main content</main>
</div>

<!-- Column of items with spacing -->
<div class="d-flex flex-column gap-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## 3. Spacing (Margin & Padding)

### Padding Classes

```html
<!-- All sides: p-{size} -->
<div class="p-0"></div>   <!-- 0px -->
<div class="p-1"></div>   <!-- 4px (0.25rem) -->
<div class="p-2"></div>   <!-- 8px (0.5rem) -->
<div class="p-3"></div>   <!-- 16px (1rem) -->
<div class="p-4"></div>   <!-- 24px (1.5rem) -->
<div class="p-5"></div>   <!-- 48px (3rem) -->

<!-- Individual sides -->
<div class="ps-3"></div>  <!-- padding-start (left): 16px -->
<div class="pe-3"></div>  <!-- padding-end (right): 16px -->
<div class="pt-3"></div>  <!-- padding-top: 16px -->
<div class="pb-3"></div>  <!-- padding-bottom: 16px -->
<div class="px-3"></div>  <!-- padding-left & padding-right: 16px -->
<div class="py-3"></div>  <!-- padding-top & padding-bottom: 16px -->

<!-- Responsive padding -->
<div class="p-2 p-md-4 p-lg-5"></div> <!-- 8px mobile, 24px tablet, 48px desktop -->
```

### Margin Classes

```html
<!-- All sides: m-{size} -->
<div class="m-0"></div>   <!-- 0px -->
<div class="m-1"></div>   <!-- 4px -->
<div class="m-2"></div>   <!-- 8px -->
<div class="m-3"></div>   <!-- 16px -->
<div class="m-4"></div>   <!-- 24px -->
<div class="m-5"></div>   <!-- 48px -->

<!-- Individual sides -->
<div class="ms-3"></div>  <!-- margin-start (left): 16px -->
<div class="me-3"></div>  <!-- margin-end (right): 16px -->
<div class="mt-3"></div>  <!-- margin-top: 16px -->
<div class="mb-3"></div>  <!-- margin-bottom: 16px -->
<div class="mx-3"></div>  <!-- margin-left & margin-right: 16px -->
<div class="my-3"></div>  <!-- margin-top & margin-bottom: 16px -->

<!-- Special margin values -->
<div class="m-auto"></div>   <!-- margin: auto (center) -->
<div class="mx-auto"></div>  <!-- margin-left & margin-right: auto (horizontal center) -->
<div class="ms-auto"></div>  <!-- margin-left: auto (push right) -->
<div class="me-auto"></div>  <!-- margin-right: auto (push left) -->

<!-- Responsive margin -->
<div class="mt-2 mt-md-4"></div> <!-- 8px margin-top on mobile, 24px on desktop -->
```

### Spacing Scale Reference

```
Size  Value     Pixels
0     0         0px
1     0.25rem   4px
2     0.5rem    8px
3     1rem      16px
4     1.5rem    24px
5     3rem      48px
```

---

## 4. Typography

### Heading Sizes (H1-H6)

```html
<h1 class="h1">Heading 1 (2rem, 32px)</h1>
<h2 class="h2">Heading 2 (1.5rem, 24px)</h2>
<h3 class="h3">Heading 3 (1.3rem, 20px)</h3>
<h4 class="h4">Heading 4 (1.1rem, 17px)</h4>
<h5 class="h5">Heading 5 (1rem, 16px)</h5>
<h6 class="h6">Heading 6 (0.875rem, 14px)</h6>

<!-- Use h-class on non-heading element -->
<p class="h3">Paragraph styled like h3</p>
<div class="h5">Div styled like h5</div>
```

### Display Headings (Larger)

```html
<h1 class="display-1">Display 1 (5.5rem)</h1>
<h1 class="display-2">Display 2 (4.5rem)</h1>
<h1 class="display-3">Display 3 (3.5rem)</h1>
<h1 class="display-4">Display 4 (2.5rem)</h1>
<h1 class="display-5">Display 5 (2rem)</h1>
<h1 class="display-6">Display 6 (1.5rem)</h1>
```

### Font Weight

```html
<div class="fw-light">Light (300)</div>
<div class="fw-normal">Normal (400)</div>
<div class="fw-semibold">Semibold (600)</div>
<div class="fw-bold">Bold (700)</div>
<div class="font-monospace">Monospace font</div>
```

### Text Alignment

```html
<div class="text-start">Left aligned</div>
<div class="text-center">Center aligned</div>
<div class="text-end">Right aligned</div>

<!-- Responsive alignment -->
<div class="text-center text-md-start">Center on mobile, left on desktop</div>
```

### Text Decoration

```html
<div class="text-decoration-none">No underline</div>
<div class="text-decoration-underline">Underlined</div>
<div class="text-decoration-line-through">Strikethrough</div>
```

### Text Transform

```html
<div class="text-lowercase">lowercase text</div>
<div class="text-uppercase">UPPERCASE TEXT</div>
<div class="text-capitalize">Capitalize Each Word</div>
```

### Text Colors

```html
<div class="text-primary">Primary color</div>
<div class="text-secondary">Secondary</div>
<div class="text-success">Success (green)</div>
<div class="text-danger">Danger (red)</div>
<div class="text-warning">Warning (yellow)</div>
<div class="text-info">Info (cyan)</div>
<div class="text-light">Light</div>
<div class="text-dark">Dark</div>
<div class="text-white">White text (needs bg)</div>
<div class="text-muted">Muted (gray)</div>
<div class="text-body">Body color (default)</div>
<div class="text-black-50">Black with 50% opacity</div>
<div class="text-white-50">White with 50% opacity</div>
```

### Text Truncation

```html
<!-- Single line ellipsis -->
<div class="text-truncate">This long text will be truncated with ellipsis...</div>

<!-- Multi-line with custom line clamp -->
<div style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
  This text will be limited to 3 lines with ellipsis at the end...
</div>
```

---

## 5. Colors

### Background Colors

```html
<div class="bg-primary">Primary background</div>
<div class="bg-secondary">Secondary</div>
<div class="bg-success">Success (green)</div>
<div class="bg-danger">Danger (red)</div>
<div class="bg-warning">Warning (yellow)</div>
<div class="bg-info">Info (cyan)</div>
<div class="bg-light">Light gray</div>
<div class="bg-dark">Dark gray</div>
<div class="bg-white">White background</div>
<div class="bg-body">Body background</div>
<div class="bg-transparent">Transparent</div>

<!-- With opacity -->
<div class="bg-primary bg-opacity-10">10% opacity</div>
<div class="bg-primary bg-opacity-25">25% opacity</div>
<div class="bg-primary bg-opacity-50">50% opacity</div>
<div class="bg-primary bg-opacity-75">75% opacity</div>
```

### Text Colors

```html
<div class="text-primary">Primary text</div>
<div class="text-success">Success text (green)</div>
<div class="text-danger">Error text (red)</div>
<div class="text-muted">Muted text (gray)</div>
<div class="text-dark">Dark text</div>
```

### Bootstrap Color Codes

| Color | Hex Code | CSS Class |
|-------|----------|-----------|
| Primary | #0d6efd | `.text-primary`, `.bg-primary` |
| Secondary | #6c757d | `.text-secondary`, `.bg-secondary` |
| Success | #198754 | `.text-success`, `.bg-success` |
| Danger | #dc3545 | `.text-danger`, `.bg-danger` |
| Warning | #ffc107 | `.text-warning`, `.bg-warning` |
| Info | #0dcaf0 | `.text-info`, `.bg-info` |
| Light | #f8f9fa | `.text-light`, `.bg-light` |
| Dark | #212529 | `.text-dark`, `.bg-dark` |

---

## 6. Buttons

### Button Styles

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-light">Light</button>
<button class="btn btn-dark">Dark</button>
```

### Outline Button (Border only)

```html
<button class="btn btn-outline-primary">Primary</button>
<button class="btn btn-outline-secondary">Secondary</button>
<button class="btn btn-outline-success">Success</button>
<button class="btn btn-outline-danger">Danger</button>
```

### Button Sizes

```html
<!-- Extra small -->
<button class="btn btn-primary btn-sm">Small Button</button>

<!-- Normal (default) -->
<button class="btn btn-primary">Normal Button</button>

<!-- Large -->
<button class="btn btn-primary btn-lg">Large Button</button>

<!-- Block (full width) -->
<button class="btn btn-primary w-100">Full Width</button>
```

### Button States

```html
<!-- Disabled -->
<button class="btn btn-primary" disabled>Disabled</button>

<!-- Loading state (add spinner) -->
<button class="btn btn-primary" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>

<!-- Toggle button (pressed) -->
<button type="button" class="btn btn-primary active" aria-pressed="true">
  Toggle button
</button>
```

### Button Groups

```html
<div class="btn-group" role="group">
  <button type="button" class="btn btn-outline-primary">Left</button>
  <button type="button" class="btn btn-outline-primary">Middle</button>
  <button type="button" class="btn btn-outline-primary">Right</button>
</div>
```

---

## 7. Forms

### Form Groups

```html
<div class="mb-3">
  <label for="fieldId" class="form-label">Field Label</label>
  <input type="text" class="form-control" id="fieldId" placeholder="Placeholder">
</div>
```

### Form Control Styles

```html
<!-- Text input -->
<input type="text" class="form-control" placeholder="Text input">

<!-- Email input -->
<input type="email" class="form-control" placeholder="Email input">

<!-- Number input -->
<input type="number" class="form-control" placeholder="Number input">

<!-- Date input -->
<input type="date" class="form-control">

<!-- Textarea -->
<textarea class="form-control" rows="3"></textarea>

<!-- Select dropdown -->
<select class="form-select">
  <option>Choose...</option>
  <option>Option 1</option>
  <option>Option 2</option>
</select>

<!-- Disabled input -->
<input type="text" class="form-control" disabled>

<!-- Read-only input -->
<input type="text" class="form-control" readonly>
```

### Form Control States

```html
<!-- Valid state -->
<input type="text" class="form-control is-valid">
<div class="valid-feedback">Looks good!</div>

<!-- Invalid state -->
<input type="text" class="form-control is-invalid">
<div class="invalid-feedback">Please provide a valid value</div>
```

### Form Labels

```html
<label for="inputId" class="form-label">Label Text</label>
<input type="text" class="form-control" id="inputId">

<!-- Required indicator -->
<label class="form-label">
  Label Text
  <span class="text-danger">*</span>
</label>
```

### Checkbox & Radio

```html
<!-- Checkbox -->
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="check1">
  <label class="form-check-label" for="check1">
    Checkbox label
  </label>
</div>

<!-- Radio button -->
<div class="form-check">
  <input class="form-check-input" type="radio" name="options" id="radio1">
  <label class="form-check-label" for="radio1">
    Option 1
  </label>
</div>

<!-- Disabled checkbox -->
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="check2" disabled>
  <label class="form-check-label" for="check2">
    Disabled checkbox
  </label>
</div>
```

### Input Groups (Prefix/Suffix)

```html
<!-- With prefix icon/text -->
<div class="input-group">
  <span class="input-group-text">$</span>
  <input type="text" class="form-control" placeholder="Amount">
</div>

<!-- With suffix -->
<div class="input-group">
  <input type="text" class="form-control" placeholder="Username">
  <span class="input-group-text">@example.com</span>
</div>

<!-- With button -->
<div class="input-group">
  <input type="text" class="form-control" placeholder="Search">
  <button class="btn btn-primary" type="button">Search</button>
</div>
```

### Form Helper Text

```html
<label for="email" class="form-label">Email address</label>
<input type="email" class="form-control" id="email">
<small id="emailHelp" class="form-text text-muted">
  We'll never share your email with anyone else.
</small>
```

---

## 8. Tables

### Basic Table

```html
<table class="table">
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>Data 3</td>
    </tr>
  </tbody>
</table>
```

### Table Variants

```html
<!-- Striped rows -->
<table class="table table-striped"></table>

<!-- Hover effect on rows -->
<table class="table table-hover"></table>

<!-- Bordered -->
<table class="table table-bordered"></table>

<!-- Borderless -->
<table class="table table-borderless"></table>

<!-- Combine variants -->
<table class="table table-striped table-hover table-bordered"></table>

<!-- Dark table -->
<table class="table table-dark"></table>
<table class="table table-dark table-striped"></table>
```

### Table Sizing

```html
<!-- Small (condensed) -->
<table class="table table-sm"></table>

<!-- Responsive table (horizontal scroll on mobile) -->
<div class="table-responsive">
  <table class="table">
    <!-- Large table content -->
  </table>
</div>

<!-- Responsive at specific breakpoint -->
<div class="table-responsive-md">
  <!-- Table becomes scrollable below md breakpoint -->
  <table class="table"></table>
</div>
```

### Table Row/Cell Colors

```html
<table class="table">
  <tr class="table-primary">Primary row</tr>
  <tr class="table-success">Success row (green)</tr>
  <tr class="table-danger">Danger row (red)</tr>
  <tr class="table-warning">Warning row (yellow)</tr>
  <tr class="table-info">Info row (cyan)</tr>
  <tr class="table-light">Light row</tr>
  <tr class="table-dark">Dark row</tr>

  <!-- Individual cell -->
  <td class="table-success">Green cell</td>
</table>
```

---

## 9. Cards

### Basic Card

```html
<div class="card">
  <div class="card-header">
    Card Header
  </div>
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Card content goes here.</p>
    <a href="#" class="btn btn-primary">Link</a>
  </div>
  <div class="card-footer text-muted">
    Card Footer
  </div>
</div>
```

### Card Variants

```html
<!-- Primary card -->
<div class="card border-primary">
  <div class="card-header bg-primary text-white">Header</div>
  <div class="card-body">Content</div>
</div>

<!-- Success card -->
<div class="card border-success">
  <div class="card-header bg-success text-white">Header</div>
  <div class="card-body">Content</div>
</div>

<!-- Danger card -->
<div class="card border-danger">
  <div class="card-header bg-danger text-white">Header</div>
  <div class="card-body">Content</div>
</div>
```

---

## 10. Modals

### Basic Modal

```html
<!-- Modal Trigger Button -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Open Modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        Modal content here
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
```

### Modal Sizes

```html
<!-- Small modal -->
<div class="modal-dialog modal-sm"></div>

<!-- Standard modal (default) -->
<div class="modal-dialog"></div>

<!-- Large modal -->
<div class="modal-dialog modal-lg"></div>

<!-- Extra large modal -->
<div class="modal-dialog modal-xl"></div>

<!-- Fullscreen modal -->
<div class="modal-dialog modal-fullscreen"></div>

<!-- Fullscreen at breakpoint -->
<div class="modal-dialog modal-fullscreen-md-down"></div>
```

### Modal Positioning

```html
<!-- Centered modal -->
<div class="modal-dialog modal-dialog-centered"></div>

<!-- Scrollable modal (content scrolls if too long) -->
<div class="modal-dialog modal-dialog-scrollable"></div>

<!-- Both centered and scrollable -->
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"></div>
```

---

## 11. Alerts

### Alert Types

```html
<!-- Primary alert -->
<div class="alert alert-primary">Primary alert message</div>

<!-- Success alert -->
<div class="alert alert-success">Success! Operation completed.</div>

<!-- Warning alert -->
<div class="alert alert-warning">Warning: Please review the information.</div>

<!-- Danger alert -->
<div class="alert alert-danger">Error: Something went wrong.</div>

<!-- Info alert -->
<div class="alert alert-info">Info: This is informational.</div>

<!-- Light alert -->
<div class="alert alert-light">Light alert</div>

<!-- Dark alert -->
<div class="alert alert-dark">Dark alert</div>
```

### Dismissible Alert

```html
<div class="alert alert-warning alert-dismissible fade show">
  <strong>Warning!</strong> Something needs your attention.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

### Alert with Content

```html
<div class="alert alert-success">
  <h4 class="alert-heading">Success!</h4>
  <p>Your changes have been saved successfully.</p>
  <hr>
  <p class="mb-0">You can now <a href="#">view your changes</a>.</p>
</div>
```

---

## 12. Borders & Corners

### Border Classes

```html
<!-- Add borders -->
<div class="border">All borders</div>
<div class="border-top">Top border only</div>
<div class="border-end">Right border only</div>
<div class="border-bottom">Bottom border only</div>
<div class="border-start">Left border only</div>

<!-- Remove borders -->
<div class="border border-0">Remove all borders</div>
<div class="border border-top-0">Remove top border</div>

<!-- Border colors -->
<div class="border border-primary">Primary border</div>
<div class="border border-success">Success border (green)</div>
<div class="border border-danger">Danger border (red)</div>
<div class="border border-warning">Warning border</div>
<div class="border border-info">Info border</div>

<!-- Border width -->
<div class="border border-1">1px border</div>
<div class="border border-2">2px border</div>
<div class="border border-3">3px border</div>
<div class="border border-4">4px border</div>
<div class="border border-5">5px border</div>
```

### Border Radius

```html
<!-- Rounded corners -->
<div class="rounded">Standard rounded (0.375rem)</div>
<div class="rounded-0">No rounding</div>
<div class="rounded-1">Small rounding (0.25rem)</div>
<div class="rounded-2">Medium rounding (0.375rem)</div>
<div class="rounded-3">Large rounding (0.5rem)</div>
<div class="rounded-4">Extra large (0.75rem)</div>
<div class="rounded-5">Maximum (1rem)</div>

<!-- Individual corners -->
<div class="rounded-top">Rounded top corners</div>
<div class="rounded-end">Rounded right corners</div>
<div class="rounded-bottom">Rounded bottom corners</div>
<div class="rounded-start">Rounded left corners</div>

<!-- Circle -->
<div class="rounded-circle">Circular (50%)</div>
```

---

## 13. Sizing

### Width

```html
<div class="w-25">25% width</div>
<div class="w-50">50% width</div>
<div class="w-75">75% width</div>
<div class="w-100">100% width</div>
<div class="w-auto">Auto width</div>

<!-- Responsive width -->
<div class="w-100 w-md-50">100% on mobile, 50% on desktop</div>
```

### Height

```html
<div class="h-25">25% height</div>
<div class="h-50">50% height</div>
<div class="h-75">75% height</div>
<div class="h-100">100% height</div>
<div class="h-auto">Auto height</div>
```

### Viewport Units

```html
<!-- Full screen -->
<div class="min-vw-100 min-vh-100">Full viewport width and height</div>

<!-- Min width/height -->
<div class="min-vw-100">Minimum 100% viewport width</div>
<div class="min-vh-100">Minimum 100% viewport height</div>
```

### Max Width

```html
<div class="mw-100">Max width 100%</div>
```

---

## 14. Position & Display

### Position

```html
<!-- Static (default) -->
<div class="position-static"></div>

<!-- Relative -->
<div class="position-relative">
  <span class="position-absolute">Absolutely positioned inside</span>
</div>

<!-- Absolute -->
<div class="position-absolute top-0 start-0">Top-left corner</div>

<!-- Fixed -->
<div class="position-fixed top-0 start-0">Fixed header</div>

<!-- Sticky -->
<div class="position-sticky top-0">Sticky header</div>
```

### Position Placement

```html
<div class="position-absolute top-0">top: 0</div>
<div class="position-absolute bottom-0">bottom: 0</div>
<div class="position-absolute start-0">left: 0 (start)</div>
<div class="position-absolute end-0">right: 0 (end)</div>

<!-- Combinations -->
<div class="position-absolute top-0 start-0">Top-left</div>
<div class="position-absolute bottom-0 end-0">Bottom-right</div>
```

### Z-Index

```html
<div class="z-0"></div>   <!-- z-index: 0 -->
<div class="z-1"></div>   <!-- z-index: 1 -->
<div class="z-2"></div>   <!-- z-index: 2 -->
<div class="z-3"></div>   <!-- z-index: 3 -->
```

### Overflow

```html
<div class="overflow-auto"></div>      <!-- overflow: auto -->
<div class="overflow-hidden"></div>    <!-- overflow: hidden -->
<div class="overflow-visible"></div>   <!-- overflow: visible -->
<div class="overflow-scroll"></div>    <!-- overflow: scroll -->

<!-- Per axis -->
<div class="overflow-x-auto"></div>    <!-- overflow-x: auto -->
<div class="overflow-y-auto"></div>    <!-- overflow-y: auto -->
<div class="overflow-y-hidden"></div>  <!-- overflow-y: hidden -->
```

### Visibility

```html
<div class="visible"></div>            <!-- visibility: visible -->
<div class="invisible"></div>          <!-- visibility: hidden (takes space) -->
<div class="d-none"></div>             <!-- display: none (no space) -->
```

---

## 15. Utility Classes Cheat Sheet

### Quick Copy-Paste Reference

```html
<!-- Centering content -->
<div class="d-flex justify-content-center align-items-center">Content</div>

<!-- Space between header/footer -->
<div class="d-flex justify-content-between align-items-center p-3">
  <h1>Title</h1>
  <div class="d-flex gap-2">
    <button class="btn btn-primary">Button</button>
  </div>
</div>

<!-- Form section with styling -->
<div class="bg-light p-4 rounded border">
  <h5 class="mb-3">Section Title</h5>
  <div class="row g-3">
    <div class="col-md-6">
      <label class="form-label">Field 1</label>
      <input type="text" class="form-control">
    </div>
    <div class="col-md-6">
      <label class="form-label">Field 2</label>
      <input type="text" class="form-control">
    </div>
  </div>
</div>

<!-- Responsive grid -->
<div class="row g-3">
  <div class="col-12 col-md-6 col-lg-3">Item 1</div>
  <div class="col-12 col-md-6 col-lg-3">Item 2</div>
  <div class="col-12 col-md-6 col-lg-3">Item 3</div>
  <div class="col-12 col-md-6 col-lg-3">Item 4</div>
</div>

<!-- Alert with close button -->
<div class="alert alert-warning alert-dismissible fade show">
  ⚠️ Warning message here
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>

<!-- Loading button -->
<button class="btn btn-primary" disabled>
  <span class="spinner-border spinner-border-sm me-2"></span>
  Loading...
</button>

<!-- Responsive text -->
<h3 class="text-center text-md-start">Center on mobile, left on desktop</h3>

<!-- Stack items with gap -->
<div class="d-flex flex-column gap-3">
  <div class="p-3 bg-light rounded">Item 1</div>
  <div class="p-3 bg-light rounded">Item 2</div>
  <div class="p-3 bg-light rounded">Item 3</div>
</div>

<!-- Sidebar + Content Layout -->
<div class="d-flex" style="min-height: 100vh;">
  <nav class="bg-light p-3" style="width: 250px;">
    <ul class="list-unstyled">
      <li><a href="#" class="text-decoration-none">Link 1</a></li>
      <li><a href="#" class="text-decoration-none">Link 2</a></li>
    </ul>
  </nav>
  <main class="flex-grow-1 p-4">
    <h1>Main Content</h1>
  </main>
</div>

<!-- Modal trigger -->
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
  Open Modal
</button>

<!-- Card grid -->
<div class="row g-3">
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Card 1</h5>
        <p class="card-text">Content</p>
      </div>
    </div>
  </div>
</div>
```

---

## Common Mistakes to Avoid

❌ **Wrong:**
```html
<div class="d-flex">
  <button>Button 1</button>
  <button>Button 2</button><!-- Too close, no gap! -->
</div>
```

✅ **Correct:**
```html
<div class="d-flex gap-2">
  <button class="btn btn-primary">Button 1</button>
  <button class="btn btn-primary">Button 2</button>
</div>
```

---

❌ **Wrong:**
```html
<div class="row">
  <div class="col">50% width column</div>
  <div class="col">50% width column</div>
</div>
```

✅ **Correct:**
```html
<div class="row">
  <div class="col-md-6">50% width on desktop</div>
  <div class="col-md-6">50% width on desktop</div>
</div>
```

---

❌ **Wrong:**
```html
<input class="form-control" placeholder="Search"><!-- Missing label! -->
```

✅ **Correct:**
```html
<label for="search" class="form-label">Search</label>
<input type="text" class="form-control" id="search" placeholder="Search">
```

---

## Additional Resources

- **Official Bootstrap Docs:** https://getbootstrap.com/docs/5.3
- **Bootstrap Utilities API:** https://getbootstrap.com/docs/5.3/utilities
- **Bootstrap Components:** https://getbootstrap.com/docs/5.3/components

---

**Document Version:** 1.0
**Last Updated:** 2024-10-29
**Maintainer:** Frontend Development Team

*Reference this guide when building HTML prototypes. Bookmark this page for quick lookups!*
