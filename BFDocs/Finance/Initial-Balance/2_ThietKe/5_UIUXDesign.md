# UI/UX Design: Detailed Design & Component Specifications

**Created:** 2024-10-29
**Status:** Draft - Ready for Review
**Version:** 1.0

---

## 1. Introduction

Tài liệu này mô tả thiết kế chi tiết UI/UX (User Interface / User Experience) cho tính năng khởi tạo số dư đầu kỳ.

**Covers:**
- Design system & color palette
- Typography & spacing
- Component library specifications
- Page/screen layouts
- Interaction patterns
- Accessibility guidelines
- Responsive design
- Design tokens

---

## 2. Design System & Brand Guidelines

### 2.1 Color Palette

```
Primary Colors:
- Primary Blue: #0d6efd (Buttons, Links)
- Primary Blue Hover: #0b5ed7
- Primary Blue Active: #0a58ca

Semantic Colors:
- Success Green: #198754 (Confirmed, Approved)
- Success Hover: #146c43
- Warning Yellow: #ffc107 (Pending, Draft)
- Warning Hover: #ffb800
- Danger Red: #dc3545 (Error, Delete)
- Danger Hover: #bb2d3b
- Info Cyan: #0dcaf0 (Information)

Neutral Colors:
- Light Gray: #f8f9fa (Background)
- Medium Gray: #e9ecef (Borders)
- Dark Gray: #6c757d (Secondary text)
- Text Black: #212529 (Primary text)
- White: #ffffff

Status Colors:
- Draft: #6c757d (Gray - Editable)
- Pending: #ffc107 (Yellow - Waiting)
- Approved: #0d6efd (Blue - Ready)
- Confirmed: #198754 (Green - Locked)
```

### 2.2 Typography

```
Font Family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif

Font Sizes:
- H1: 32px, bold (Page titles)
- H2: 24px, bold (Section titles)
- H3: 20px, semi-bold (Subsections)
- Body: 14px, regular (Main text)
- Small: 12px, regular (Captions, help text)
- Label: 13px, semi-bold (Form labels)

Line Heights:
- H1/H2: 1.2
- H3: 1.3
- Body/Small: 1.5
- Label: 1.4
```

### 2.3 Spacing Scale (8px base)

```
Spacing Units:
- xs: 4px (0.5 unit)
- sm: 8px (1 unit)
- md: 16px (2 units)
- lg: 24px (3 units)
- xl: 32px (4 units)
- 2xl: 48px (6 units)

Usage:
- Padding: sm, md, lg
- Margin: sm, md, lg, xl
- Gap: sm, md, lg
- Borders: 1px, 2px
```

### 2.4 Border Radius

```
Small: 4px (Buttons, small components)
Medium: 6px (Input fields, cards)
Large: 8px (Modals, large cards)
Full: 50% (Badges, avatars)
```

---

## 3. Component Library Specifications

### 3.1 Button Component

```
Variants: Primary | Secondary | Success | Danger | Outline
Sizes: Small (28px) | Medium (36px) | Large (44px)
States: Normal | Hover | Active | Disabled | Loading

Primary Button:
- Background: #0d6efd
- Color: white
- Border: none
- Padding: 8px 16px (medium)
- Font: 14px, semi-bold
- Border-radius: 4px
- Disabled: opacity 0.5, cursor not-allowed
- Hover: background #0b5ed7

Icon Button:
- 24x24 icon
- Transparent background
- Hover: background #f8f9fa
- No padding around icon
```

### 3.2 Input Field Component

```
States: Default | Focus | Filled | Error | Disabled | Loading

Styles:
- Height: 36px
- Padding: 8px 12px
- Border: 1px solid #e9ecef
- Border-radius: 4px
- Font: 14px, regular
- Focus: border #0d6efd, shadow 0 0 0 3px rgba(13,110,253,0.25)
- Error: border #dc3545, error text below
- Disabled: background #f8f9fa, opacity 0.6

Label:
- Above input
- Font: 13px, semi-bold
- Color: #212529
- Required mark: color red

Helper Text:
- Below input
- Font: 12px, regular
- Color: #6c757d
```

### 3.3 Form Components

**Select Dropdown:**
```
- Similar styling to input
- Dropdown arrow icon on right
- Highlight on hover
- Keyboard navigation support (arrow keys)
```

**Checkbox:**
```
- Size: 16x16px
- Border: 1px solid #ccc
- Checked: background #0d6efd, color white
- Indeterminate: background #6c757d
- Accessible: label linked to checkbox
```

**Radio Button:**
```
- Size: 16x16px
- Border: 2px solid #ccc
- Checked: inner dot, border #0d6efd
- Group: vertical stack, gap md
```

**Textarea:**
```
- Similar to input
- Resize: vertical only (min-height 80px)
- Max-width: 100%
- Line-height: 1.5
```

### 3.4 Table Component

```
Header:
- Background: #f8f9fa
- Font: 13px, semi-bold
- Padding: 12px 16px
- Border-bottom: 1px solid #e9ecef
- Sortable: chevron icon on hover

Row:
- Height: 48px
- Padding: 12px 16px
- Border-bottom: 1px solid #e9ecef
- Hover: background #f8f9fa

Cell:
- Text alignment: left (default)
- Numbers: right align
- Actions: center align

Status Badge:
- Inline with text
- Padding: 4px 8px
- Font: 12px, semi-bold
- Border-radius: 4px
- Background color by status
```

### 3.5 Modal Component

```
Overlay:
- Background: rgba(0, 0, 0, 0.5)
- Closes on escape key
- Closes on overlay click (optional)

Modal Box:
- Max-width: 500px (small), 800px (medium), 1200px (large)
- Background: white
- Border-radius: 8px
- Box-shadow: 0 10px 40px rgba(0,0,0,0.2)
- Animation: fade-in 200ms

Header:
- Padding: 20px
- Border-bottom: 1px solid #e9ecef
- Title: H3 size
- Close button: X icon

Body:
- Padding: 20px
- Scrollable if content > viewport height

Footer:
- Padding: 16px 20px
- Border-top: 1px solid #e9ecef
- Buttons: right aligned, gap md
```

### 3.6 Alert Component

```
Types: Info | Success | Warning | Error

Common Style:
- Padding: 12px 16px
- Border-radius: 4px
- Border-left: 4px solid (color by type)
- Icon: left side
- Close button: right side

Info:
- Background: #e7f3ff
- Border: #b6e3ff
- Text: #004085
- Icon: info-circle

Success:
- Background: #d1e7dd
- Border: #badbcc
- Text: #0f5132
- Icon: check-circle

Warning:
- Background: #fff3cd
- Border: #ffecb5
- Text: #664d03
- Icon: exclamation-triangle

Error:
- Background: #f8d7da
- Border: #f5c2c7
- Text: #842029
- Icon: exclamation-circle
```

---

## 4. Page/Screen Layouts

### 4.1 List View Page Layout

```
┌─────────────────────────────────────────────┐
│ Header (Navigation, Page Title)             │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Filter Section (Collapsible)             │ │
│ │ Company: [▼] Status: [▼] [Search]       │ │
│ │                  [Create New] [Refresh] │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Results Toolbar                         │ │
│ │ Total: 5 entries | Export | ...        │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Table with Data                         │ │
│ │ [Pagination below]                      │ │
│ └─────────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

### 4.2 Create Entry Page Layout

**Layout Style: Full Width** ✨

```
┌────────────────────────────────────────────────────────────────────┐
│ FIXED HEADER (Full Width)                                          │
│ [Header Title]                              [Save] [Submit]       │
├────────────────────────────────────────────────────────────────────┤
│ [Sidebar] │                                                         │
│ (250px)   │  FORM CONTAINER (Full Width - 100% of remaining space) │
│           │                                                         │
│           │  📊 Create Entry Title                                 │
│           │                                                         │
│           │  ┌──────────────────────────────────────────────────┐ │
│           │  │ 1. Basic Information                             │ │
│           │  │    Company: [▼]   Period: [▼]                   │ │
│           │  └──────────────────────────────────────────────────┘ │
│           │                                                         │
│           │  ┌──────────────────────────────────────────────────┐ │
│           │  │ 2. Add Items                                     │ │
│           │  │    Account: [▼] Amount: [___] Type: [▼]         │ │
│           │  │    [+ Add] [Save Draft]                         │ │
│           │  └──────────────────────────────────────────────────┘ │
│           │                                                         │
│           │  ┌──────────────────────────────────────────────────┐ │
│           │  │ 3. Current List                                  │ │
│           │  │    [Table spanning full width with entries]     │ │
│           │  └──────────────────────────────────────────────────┘ │
│           │                                                         │
│           │  ┌──────────────────────────────────────────────────┐ │
│           │  │ 4. Summary & Validation                          │ │
│           │  │    Total Debit: 500M | Total Credit: 500M       │ │
│           │  │    Status: ✅ BALANCED                           │ │
│           │  └──────────────────────────────────────────────────┘ │
│           │                                                         │
│           │  ┌──────────────────────────────────────────────────┐ │
│           │  │ Notes (Optional)                                 │ │
│           │  │ [Textarea - Full Width]                         │ │
│           │  └──────────────────────────────────────────────────┘ │
│           │                                                         │
│           │  [Alert Box - Full Width]                             │
│           │                                                         │
└────────────────────────────────────────────────────────────────────┘
```

**Key Layout Specifications:**
- **Header:** Fixed at top, full width, dark background (#2c3e50)
- **Sidebar:** Fixed 250px width on left, content scrollable
- **Form Container:**
  - **Width:** 100% of remaining viewport (full width, no max-width)
  - **Background:** White (#ffffff)
  - **Border-radius:** 0 (no rounded corners)
  - **Box-shadow:** None (no shadow)
  - **Padding:** 30px
  - **Min-height:** Extends to fill viewport
  - **Margin:** No margin or centering
- **Sections:** Expand full width within container
- **Tables:** Expand full width of form container (may have horizontal scroll on mobile)
- **Form Fields:** Use grid system (col-md-6, col-12) for responsive layout
- **Responsive:**
  - **Desktop (≥1200px):** Full layout with sidebar + full-width form
  - **Tablet (768-1199px):** Sidebar + full-width form with narrower padding
  - **Mobile (<768px):** Sidebar hidden, full-width form, table horizontal scroll

---

## 5. Interaction Patterns

### 5.1 Form Submission Flow

```
User Input
    │
    ▼
Client-side Validation
    ├─ Success → Submit button enabled
    ├─ Error → Show inline errors, Submit disabled
    │
    ▼ (Submit clicked)
Loading State
    ├─ Button: [Loading...] spinner
    ├─ Disable other buttons
    │
    ▼ (Server response)
Success → Toast notification, Redirect
Error → Modal with error details, Allow retry
```

### 5.2 Confirmation Pattern

```
Destructive Action (Delete, Confirm)
    │
    ▼
Confirmation Dialog
    │
    ├─ [Cancel] [Confirm]
    │
    ├─ Cancel → Close, no action
    ├─ Confirm → Proceed with action
    │
    ▼
Show toast/message
```

### 5.3 Loading Pattern

```
Network Request
    │
    ├─ Button: Show spinner
    ├─ Table: Show skeleton loaders
    ├─ Form: Disable inputs
    │
    ▼ (Data received)
Render content, hide loaders
```

---

## 6. Responsive Design Breakpoints

```
Mobile:       < 768px   (col-12, single column)
Tablet:     768px-1199px (col-md-6, 2 columns)
Desktop:   >= 1200px    (col-lg-3/4, multi-column)

Mobile Adjustments:
- Stack forms vertically
- Full-width buttons
- Collapsible sections
- Bottom action sheet for modals
- Touch-friendly: 44px min button height
```

---

## 7. Accessibility Guidelines

```
✅ WCAG 2.1 Level AA Compliance

Color Contrast:
- Text: 4.5:1 ratio minimum
- Large text: 3:1 ratio
- Test with: WebAIM, Contrast Checker

Keyboard Navigation:
- Tab order: logical progression
- Focus visible: 2px outline
- Enter/Space: activate buttons
- Escape: close modals

Labels & Descriptions:
- form <label> linked to <input>
- aria-label for icon buttons
- aria-describedby for help text
- Required fields marked visually & semantically

Images & Icons:
- alt text for images
- aria-label for icons
- Meaningful icon descriptions

Form Validation:
- Error messages associated with fields
- aria-invalid="true" on error fields
- aria-live="polite" for dynamic errors

Screen Reader Testing:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)
```

---

## 8. Dark Mode Support (Optional)

```
Color Adjustments:
- Background: #1a1a1a (dark)
- Text: #ffffff
- Borders: #333333
- Hover: #2d2d2d

CSS Variables:
--color-bg: #ffffff (light) / #1a1a1a (dark)
--color-text: #212529 / #ffffff
--color-border: #e9ecef / #333333

Implementation:
- CSS media: prefers-color-scheme
- Local storage for user preference
- Toggle button in header
```

---

## 9. Animation & Transitions

```
Fade In/Out:
- Duration: 200ms
- Easing: ease-in-out
- Used for: modals, alerts, tooltips

Slide In:
- Duration: 300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Used for: sidebars, drawers

Bounce:
- Duration: 400ms
- Easing: cubic-bezier(0.68, -0.55, 0.265, 1.55)
- Used for: entrance animations

Hover Effects:
- Duration: 150ms
- Scale: 1.02 on buttons
- Shadow increase on cards
```

---

## 10. Design Tokens

```json
{
  "colors": {
    "primary": "#0d6efd",
    "success": "#198754",
    "warning": "#ffc107",
    "danger": "#dc3545",
    "dark": "#212529",
    "light": "#f8f9fa"
  },
  "typography": {
    "fontFamily": "'Segoe UI', Roboto, sans-serif",
    "fontSize": {
      "xs": "12px",
      "sm": "13px",
      "md": "14px",
      "lg": "16px"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "borderRadius": {
    "small": "4px",
    "medium": "6px",
    "large": "8px"
  },
  "shadows": {
    "sm": "0 1px 2px rgba(0,0,0,0.05)",
    "md": "0 4px 6px rgba(0,0,0,0.1)",
    "lg": "0 10px 15px rgba(0,0,0,0.1)"
  }
}
```

---

## 11. Design Quality Checklist

Before handoff to development:
- [ ] All components spec'd (sizes, colors, states)
- [ ] Responsive breakpoints tested
- [ ] Accessibility checklist reviewed
- [ ] Color contrast verified (WCAG AA)
- [ ] Keyboard navigation documented
- [ ] Error states designed
- [ ] Loading states designed
- [ ] Empty states designed
- [ ] Motion & animation spec'd
- [ ] Design system documented
- [ ] Figma file organized & shared
- [ ] Fonts imported & available

---

## 12. Conclusion

**UI/UX Design provides:**
- ✅ Design system & component library
- ✅ Page layouts & wireframes
- ✅ Interaction patterns
- ✅ Accessibility compliance
- ✅ Responsive design strategy
- ✅ Design tokens & variables
- ✅ Animation specifications

**Ready for Frontend Development.**

---

**Document Status:** Draft - Ready for Review
**Last Updated:** 2024-10-29
**Next Step:** Begin Development Phase (3_PhatTrien)
