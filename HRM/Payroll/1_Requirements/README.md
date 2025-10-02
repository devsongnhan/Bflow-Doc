# REQUIREMENTS PHASE - PAYROLL MANAGEMENT SYSTEM
## Phase 1: Requirements Analysis

**Version:** 2.0
**Date:** 2024-10-02
**Status:** ✅ Complete
**Compliance:** bo-tai-lieu-chuan-phat-trien-phan-mem.md v2.0

---

## 📋 DOCUMENT STRUCTURE

### Core Documents (3 files only):

| # | Document | File | Purpose | Status |
|---|----------|------|---------|--------|
| 1 | **User Stories** | [1_UserStories.md](1_UserStories.md) | What to build - 18 stories, 107 points | ✅ Complete |
| 2 | **Business Rules** | [2_BusinessRules.md](2_BusinessRules.md) | How it works - Vietnam compliance | ✅ Complete |
| 3 | **Wireframes** | [3_Wireframes.md](3_Wireframes.md) | How it looks - 10 key screens | ✅ Complete |

---

## 🎯 QUICK SUMMARY

### What We're Building
**Payroll Management System** for Vietnamese companies with:
- 325+ employees capacity
- Monthly payroll cycle
- Vietnam tax & insurance compliance
- Bank integration for payments
- Employee self-service portal

### Key Numbers
- **18** User Stories
- **107** Story Points
- **6** Months timeline
- **500M VNĐ** Budget
- **3** Core documents (vs old 8+ documents)

---

## ✅ REQUIREMENTS CHECKLIST

### User Stories ✅
- [x] 7 Epics defined
- [x] 18 User stories with acceptance criteria
- [x] Story points estimated
- [x] Release plan created
- [x] Prioritization (Must/Should/Nice to have)

### Business Rules ✅
- [x] Employee management rules
- [x] Salary calculation formulas
- [x] Tax rules (Vietnam 2024)
- [x] Insurance rules (BHXH, BHYT, BHTN)
- [x] Payment processing rules
- [x] Compliance requirements

### UI/UX Design ✅
- [x] 10 main screen wireframes
- [x] Navigation structure
- [x] Responsive design specs
- [x] Design system defined
- [x] User flows documented

---

## 🚀 KEY FEATURES

### Must Have (80 points)
1. **Employee Management** - CRUD operations
2. **Payroll Calculation** - Automated monthly
3. **Tax Calculation** - Vietnam compliance
4. **Insurance** - Social insurance integration
5. **Payment Processing** - Bank file export
6. **Basic Reports** - Payroll, tax, insurance
7. **User Management** - Roles & permissions

### Should Have (21 points)
1. **Payslip Distribution** - Email/Portal
2. **Analytics Dashboard** - KPIs & trends
3. **Accounting Integration** - GL posting

### Nice to Have (6 points)
1. **Employee Self-Service** - View payslips
2. **Mobile App** - Basic functions

---

## 💡 CRITICAL BUSINESS LOGIC

### Tax Calculation (Vietnam 2024)
```
Taxable Income = Gross - Insurance - Personal Deduction
Personal Deduction = 11,000,000 VND/month
Dependent Deduction = 4,400,000 VND/person
```

### Insurance Rates
```
BHXH: 8% (employee) + 17.5% (employer)
BHYT: 1.5% (employee) + 3% (employer)
BHTN: 1% (employee) + 1% (employer)
Cap: 20 × minimum wage
```

### Net Salary Formula
```
NET = Gross - BHXH - BHYT - BHTN - Tax - Deductions
```

---

## 📊 PROJECT METRICS

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Requirements Coverage | 100% | 100% | ✅ |
| Story Points Total | - | 107 | ✅ |
| Document Completeness | 100% | 100% | ✅ |
| Stakeholder Review | Required | Pending | ⏳ |

---

## 👥 STAKEHOLDERS

| Role | Responsibility | Status |
|------|---------------|--------|
| Product Owner | Requirements approval | ⏳ Review |
| HR Manager | Business rules validation | ✅ Confirmed |
| Finance Manager | Compliance verification | ✅ Confirmed |
| Tech Lead | Technical feasibility | ✅ Confirmed |
| End Users | UAT participation | Planned |

---

## 🔄 NEXT STEPS

### Immediate Actions
1. [ ] Stakeholder review session
2. [ ] Requirements sign-off
3. [ ] Transition to Design phase

### Design Phase Preparation
Ready to create:
1. Tech Stack decision
2. ERD Conceptual
3. Data Model (Logical)
4. Database Schema (Physical)
5. API Specification
6. System Architecture

---

## 📁 OLD vs NEW APPROACH

### Old Structure (8+ files) ❌
```
1_SRS.md (30+ pages)
2_BusinessProcessModel.md
3_UserStories.md
4_RequirementsTraceabilityMatrix.md
5_RequirementsPrioritizationMatrix.md
6_PrototypeMockup.md
7_DataFlowDiagram.md
8_ERDConceptual.md
```

### New Structure (3 files) ✅
```
1_UserStories.md (What to build)
2_BusinessRules.md (How it works)
3_Wireframes.md (How it looks)
```

**Reduction: 62.5%** fewer documents
**Focus: 100%** on what developers need

---

## ⚠️ IMPORTANT NOTES

1. **No SRS** - User stories are better than long specifications
2. **No DFD** - Modern teams don't use Data Flow Diagrams
3. **No Traceability Matrix** - Use Jira/Azure DevOps instead
4. **No Separate ERD** - Moved to Design phase where it belongs
5. **Combined Prototype/Mockup** - Into single Wireframes document

---

## 🏆 BENEFITS OF NEW APPROACH

| Aspect | Old Way | New Way | Improvement |
|--------|---------|---------|-------------|
| Documents | 8+ files | 3 files | 62% less |
| Pages | ~150 pages | ~50 pages | 67% less |
| Time to Read | 3-4 hours | 30-45 mins | 85% faster |
| Maintenance | Difficult | Easy | Much better |
| Team Adoption | Low | High | Practical |

---

## 📝 DOCUMENT CONTROL

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2024-09-24 | Old structure (8 files) | BA Team |
| 2.0 | 2024-10-02 | New structure (3 files) | PM Team |

---

**Phase Status:** ✅ COMPLETE
**Ready for:** Design Phase
**Standard:** Aligned with bo-tai-lieu-chuan v2.0
**Philosophy:** "Just Enough Documentation"

---

*Note: Old documents preserved in `1_PhanTichYeuCau` folder for reference*