# CLAUDE AI AGENT - CONTEXT & INSTRUCTIONS

## Project Context
**Project:** Hệ thống Quản lý Lương (Payroll Management System)
**Current Phase:** Requirements Analysis → Design Phase Transition
**Status:** Requirements phase 100% complete, ready for Design phase
**Timeline:** 6 months to production
**Budget:** 500M VNĐ
**Team:** 5-7 people

## Current State Assessment
✅ **COMPLETED - Requirements Analysis Phase:**
- All 7 core documents finished (100% coverage)
- Business requirements documented
- Functional & non-functional requirements specified
- User stories with acceptance criteria
- Requirements traceability & prioritization matrices
- Prototype/mockup designs
- Data flow diagrams

🎯 **NEXT PHASE - Design Phase:**
According to `bo-tai-lieu-chuan-phat-trien-phan-mem.md`, design phase will include:
- Architecture Design Document
- Detailed Design Document
- Database Design Document
- API Design Specification
- UI/UX Design Document
- Security Design & Threat Model

## Working Principles for AI Agent

### STRICT CONSTRAINTS:
1. **DO NOT** create new documents outside the standard template
2. **DO NOT** generate content beyond existing structure
3. **DO NOT** add documents not in the official catalog
4. **ONLY** act on specific user requests
5. **FOLLOW** the software development standards strictly

### APPROVED ACTIONS:
- ✅ Review and improve existing documents
- ✅ Help prepare for design phase transition
- ✅ Support requirements sign-off process
- ✅ Maintain documentation quality
- ✅ Answer questions about current documents
- ✅ Provide analysis of existing requirements

### FORBIDDEN ACTIONS:
- ❌ Create additional .md files
- ❌ Add new sections not in templates
- ❌ Generate documentation outside scope
- ❌ Modify document structure/format
- ❌ Add features not requested

## Document Structure Reference

### NEW PHASE-BASED STRUCTURE (MANDATORY):
```
HRM/Payroll/
├── 1_PhanTichYeuCau/        ✅ COMPLETED (8 documents)
├── 2_ThietKe/               🎯 READY TO START
├── 3_PhatTrien/             ⏳ WAITING
├── 4_KiemThu/               ⏳ WAITING
├── 5_TrienKhai/             ⏳ WAITING
└── 6_VanHanh/               ⏳ WAITING
```

### IMPORTANT RULES:
1. **Documents MUST be created in phase folders** (1_PhanTichYeuCau, 2_ThietKe, etc.)
2. **Each phase has its own README.md** with checklist and status
3. **Documents are numbered within each phase** (1_ArchitectureDesign.md, 2_DetailedDesign.md, etc.)
4. **NEVER create documents outside defined structure**
5. **ONLY create documents when explicitly requested**

### Current Phase Documents:
```
1_PhanTichYeuCau/             ✅ 100% Complete
├── README.md                 # Phase overview
├── 0_README_BoTaiLieuPhanTichYeuCau.md
├── 1_SRS_HeThongQuanLyLuong.md
├── 2_BusinessProcessModel.md
├── 3_UserStories.md
├── 4_RequirementsTraceabilityMatrix.md
├── 5_RequirementsPrioritizationMatrix.md
├── 6_PrototypeMockup.md
└── 7_DataFlowDiagram.md
```

### Standards Reference:
- `bo-tai-lieu-chuan-phat-trien-phan-mem.md` - Master software development standards
- Follows IEEE, CMMI, ISO standards
- 95% coverage for all project types
- Scalable by methodology (Agile/Waterfall/DevOps)

## Key Project Information

### System Scope:
- Automated payroll calculation
- Multiple salary structure management
- Tax & social insurance calculation (Vietnam law)
- Employment contract management
- Salary history tracking

### Target Users:
- HR Staff: Employee management, payroll processing
- Accountant: Payment processing, financial reports
- Manager: Approval workflows, reports
- Employee: Personal payroll viewing

### Technical Constraints:
- Browser compatibility: Last 2 years
- Vietnam labor law compliance required
- Cloud-based deployment expected
- Integration with existing attendance system

### Stakeholders:
- Business Owner: Business process approval
- Product Owner: Requirements & priority management
- Tech Lead: Technical architecture & feasibility
- QA Lead: Test planning & acceptance criteria
- Dev Team: Implementation & estimation

## Current Tasks & Priorities

### Phase Transition Tasks:
1. Requirements review completion (1 week)
2. Stakeholder feedback incorporation (3 days)
3. Requirements sign-off (2 days)
4. Design phase kickoff preparation

### Quality Gates:
- All requirements documents reviewed ✅
- Business process validated ✅
- Technical feasibility confirmed ✅
- Priorities agreed by stakeholders ✅
- Ready for design phase ✅

## Agent Response Guidelines

### When User Asks to:
**"Create new document"** → Explain constraint, offer to help with existing docs
**"Add new section"** → Check if within existing template, otherwise decline politely
**"Modify requirements"** → Help with change control process, document updates
**"Review document"** → Provide thorough analysis and improvement suggestions
**"Prepare for design"** → Help organize transition activities within scope

### Response Format:
- Be concise and direct
- Reference specific documents and line numbers when relevant
- Focus on actionable insights
- Maintain professional technical tone
- Respect the established documentation structure

## Success Metrics
- Documentation completeness: 100% ✅
- Stakeholder alignment: In progress
- Design readiness: Target achieved
- Quality compliance: Standards followed ✅

## CRITICAL BUSINESS RULES - VIETNAM PAYROLL

### Quy định tính Thuế TNCN (MANDATORY COMPLIANCE)

**ĐÚNG - Logic tính thuế theo Luật Việt Nam:**
```
Thu nhập chịu thuế = Thu nhập GROSS - BHXH cá nhân - Giảm trừ
```

**Trong đó:**
- **Thu nhập GROSS** = Lương cơ bản + Phụ cấp chịu thuế (TRƯỚC khi trừ BHXH)
- **BHXH cá nhân** = 8% lương đóng BHXH (được trừ TRƯỚC khi tính thuế)
- **Giảm trừ cá nhân** = 11,000,000 VNĐ/tháng (2024)
- **Giảm trừ người phụ thuộc** = 4,400,000 VNĐ/người/tháng

**SAI - Lỗi phổ biến cần tránh:**
- ❌ Tính thuế từ lương NET (sau khi trừ BHXH)
- ❌ Quên trừ BHXH trước khi tính thuế
- ❌ Nhầm lẫn giữa GROSS và NET income

### Data Flow cho Process 3.5 (Calculate Tax):
```
Inputs:
- P32 → Gross salary (KHÔNG PHẢI NET)
- P33 → Tax exempt allowances
- P34 → BHXH deductions (để trừ trước khi tính thuế)
- D1 → Dependents info
- D4 → Tax rules & rates
```

### Compliance References:
- Luật Thuế TNCN số 04/2007/QH12
- Thông tư 111/2013/TT-BTC
- Cập nhật mức giảm trừ 2024

**IMPORTANT:** Tất cả tài liệu liên quan đến tính lương PHẢI tuân thủ logic này.

---
**Agent Version:** 1.1
**Context Updated:** 2024-09-24
**Scope:** Requirements → Design Transition Support Only
**Compliance:** Vietnam Tax Law Mandatory