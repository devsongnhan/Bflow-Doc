# REQUIREMENTS TRACEABILITY MATRIX
# HỆ THỐNG QUẢN LÝ LƯƠNG

**Phiên bản:** 1.0  
**Ngày:** 2024  
**Mục đích:** Theo dõi và quản lý mối quan hệ giữa các yêu cầu, thiết kế, phát triển và kiểm thử

---

## MỤC LỤC
1. [Giới thiệu](#1-giới-thiệu)
2. [Ma trận truy xuất tổng thể](#2-ma-trận-truy-xuất-tổng-thể)
3. [Ma trận chi tiết theo module](#3-ma-trận-chi-tiết-theo-module)
4. [Trạng thái triển khai](#4-trạng-thái-triển-khai)
5. [Coverage Analysis](#5-coverage-analysis)
6. [Change Impact Analysis](#6-change-impact-analysis)

---

## 1. GIỚI THIỆU

### 1.1 Mục đích
Ma trận truy xuất yêu cầu (RTM) đảm bảo:
- Tất cả yêu cầu được triển khai
- Không có chức năng thừa không cần thiết
- Dễ dàng đánh giá tác động khi thay đổi
- Theo dõi tiến độ và chất lượng

### 1.2 Quy ước

#### Requirement ID Format:
- **BR-XXX**: Business Requirements
- **FR-XXX**: Functional Requirements  
- **NFR-XXX**: Non-functional Requirements
- **US-XXX**: User Stories
- **TC-XXX**: Test Cases
- **UC-XXX**: Use Cases
- **DES-XXX**: Design Specifications
- **CODE-XXX**: Code Modules

#### Status Codes:
- **✅**: Completed
- **🔄**: In Progress
- **❌**: Not Started
- **⚠️**: Blocked
- **🔍**: Under Review

### 1.3 Traceability Levels
```
Business Requirement → Functional Requirement → User Story → Design → Code → Test Case
```

---

## 2. MA TRẬN TRUY XUẤT TỔNG THỂ

### 2.1 Business to Functional Requirements

| BR ID | Business Requirement | FR IDs | Priority | Status |
|-------|---------------------|---------|----------|---------|
| BR-001 | Quản lý cơ cấu lương linh hoạt | FR-001, FR-002 | P0 | ✅ |
| BR-002 | Tuân thủ quy định pháp luật | FR-006, FR-007, FR-008, FR-009 | P0 | 🔄 |
| BR-003 | Tối ưu hóa quy trình làm việc | FR-005, FR-011 | P0 | 🔄 |
| BR-004 | Đảm bảo tính bảo mật | FR-014, NFR-004, NFR-005 | P0 | ❌ |

### 2.2 Functional Requirements to User Stories

| FR ID | Functional Requirement | US IDs | Design Doc | Code Module | Test Cases | Status |
|-------|----------------------|---------|------------|-------------|------------|---------|
| FR-001 | Tạo loại bảng lương | US-001 | DES-001 | CODE-001 | TC-001 to TC-005 | ✅ |
| FR-002 | Cấu hình thuộc tính động | US-002 | DES-002 | CODE-002 | TC-006 to TC-010 | ✅ |
| FR-003 | Quản lý thông tin nhân viên | US-011 | DES-003 | CODE-003 | TC-011 to TC-015 | ✅ |
| FR-004 | Quản lý hợp đồng lao động | US-012 | DES-004 | CODE-004 | TC-016 to TC-020 | 🔄 |
| FR-005 | Tạo bảng lương tháng | US-005 | DES-005 | CODE-005 | TC-021 to TC-025 | 🔄 |
| FR-006 | Tính bảo hiểm | US-008 | DES-006 | CODE-006 | TC-026 to TC-030 | 🔄 |
| FR-007 | Tính thuế TNCN | US-009 | DES-007 | CODE-007 | TC-031 to TC-035 | ❌ |
| FR-008 | Quản lý quy định bảo hiểm | US-008 | DES-008 | CODE-008 | TC-036 to TC-040 | ❌ |
| FR-009 | Quản lý biểu thuế | US-009 | DES-009 | CODE-009 | TC-041 to TC-045 | ❌ |
| FR-010 | Quản lý loại thu nhập | US-002 | DES-010 | CODE-010 | TC-046 to TC-050 | 🔄 |
| FR-011 | Báo cáo bảng lương | US-015 | DES-011 | CODE-011 | TC-051 to TC-055 | ❌ |
| FR-012 | Báo cáo bảo hiểm | US-016 | DES-012 | CODE-012 | TC-056 to TC-060 | ❌ |
| FR-013 | Báo cáo thuế TNCN | US-017 | DES-013 | CODE-013 | TC-061 to TC-065 | ❌ |
| FR-014 | Quản lý người dùng và phân quyền | US-014 | DES-014 | CODE-014 | TC-066 to TC-070 | ❌ |

---

## 3. MA TRẬN CHI TIẾT THEO MODULE

### 3.1 Module: Quản lý Loại bảng lương

| Requirement Level | ID | Description | Related Items | Test Coverage | Status |
|------------------|-----|-------------|---------------|---------------|---------|
| Business | BR-001 | Cơ cấu lương linh hoạt | - | 100% | ✅ |
| Functional | FR-001 | Tạo loại bảng lương | BR-001 | 100% | ✅ |
| User Story | US-001 | Create salary template | FR-001 | 100% | ✅ |
| Design | DES-001 | Template data model | US-001 | - | ✅ |
| Code | CODE-001 | SalaryTemplateService | DES-001 | 85% | ✅ |
| Test Case | TC-001 | Create valid template | CODE-001 | Pass | ✅ |
| Test Case | TC-002 | Create duplicate template | CODE-001 | Pass | ✅ |
| Test Case | TC-003 | Create with invalid data | CODE-001 | Pass | ✅ |
| Test Case | TC-004 | Update template | CODE-001 | Pass | ✅ |
| Test Case | TC-005 | Delete template in use | CODE-001 | Pass | ✅ |

### 3.2 Module: Tính toán Lương

| Requirement Level | ID | Description | Related Items | Test Coverage | Status |
|------------------|-----|-------------|---------------|---------------|---------|
| Business | BR-003 | Tối ưu hóa quy trình | - | 60% | 🔄 |
| Functional | FR-005 | Tạo bảng lương tháng | BR-003 | 60% | 🔄 |
| User Story | US-005 | Auto-generate payroll | FR-005 | 60% | 🔄 |
| Design | DES-005 | Payroll generation flow | US-005 | - | ✅ |
| Code | CODE-005 | PayrollGenerationJob | DES-005 | 70% | 🔄 |
| Test Case | TC-021 | Generate for all employees | CODE-005 | Pass | ✅ |
| Test Case | TC-022 | Handle missing data | CODE-005 | Pass | ✅ |
| Test Case | TC-023 | Calculate formulas | CODE-005 | In Progress | 🔄 |
| Test Case | TC-024 | Performance test (1000 emp) | CODE-005 | Not Started | ❌ |
| Test Case | TC-025 | Concurrent generation | CODE-005 | Not Started | ❌ |

### 3.3 Module: Báo cáo

| Requirement Level | ID | Description | Related Items | Test Coverage | Status |
|------------------|-----|-------------|---------------|---------------|---------|
| Business | BR-002 | Tuân thủ quy định | - | 0% | ❌ |
| Functional | FR-011 | Báo cáo bảng lương | BR-002 | 0% | ❌ |
| Functional | FR-012 | Báo cáo bảo hiểm | BR-002 | 0% | ❌ |
| Functional | FR-013 | Báo cáo thuế | BR-002 | 0% | ❌ |
| User Story | US-015 | Export payroll reports | FR-011 | 0% | ❌ |
| User Story | US-016 | Generate insurance reports | FR-012 | 0% | ❌ |
| User Story | US-017 | Generate tax reports | FR-013 | 0% | ❌ |
| Design | DES-011 | Report templates | US-015, US-016, US-017 | - | 🔄 |
| Code | CODE-011 | ReportGenerationService | DES-011 | 0% | ❌ |

---

## 4. TRẠNG THÁI TRIỂN KHAI

### 4.1 Overall Progress

| Category | Total | Completed | In Progress | Not Started | Completion % |
|----------|-------|-----------|-------------|-------------|--------------|
| Business Requirements | 4 | 1 | 2 | 1 | 25% |
| Functional Requirements | 14 | 3 | 4 | 7 | 21% |
| User Stories | 22 | 3 | 5 | 14 | 14% |
| Design Documents | 14 | 4 | 3 | 7 | 29% |
| Code Modules | 14 | 3 | 4 | 7 | 21% |
| Test Cases | 70 | 15 | 10 | 45 | 21% |

### 4.2 Sprint Progress Tracking

| Sprint | Planned Requirements | Completed | In Progress | Blocked | Success Rate |
|--------|---------------------|-----------|-------------|---------|--------------|
| Sprint 1 | FR-001, FR-002, FR-003 | 3 | 0 | 0 | 100% |
| Sprint 2 | FR-004, FR-005, FR-006 | 0 | 3 | 0 | 0% |
| Sprint 3 | FR-007, FR-008, FR-009 | 0 | 0 | 0 | - |
| Sprint 4 | FR-010, FR-011, FR-012 | 0 | 1 | 0 | - |

### 4.3 Module Completion Status

```
Module Completion:
├── Configuration Module: ████████░░ 80%
├── Employee Management: ██████░░░░ 60%
├── Payroll Calculation: ████░░░░░░ 40%
├── Reporting Module: ██░░░░░░░░ 20%
├── Security Module: ░░░░░░░░░░ 0%
└── Overall System: ████░░░░░░ 40%
```

---

## 5. COVERAGE ANALYSIS

### 5.1 Requirements Coverage

| Type | Coverage Formula | Current Value | Target | Gap |
|------|-----------------|---------------|--------|-----|
| Business Coverage | BR with FR / Total BR × 100 | 75% | 100% | 25% |
| Functional Coverage | FR with US / Total FR × 100 | 71% | 100% | 29% |
| Design Coverage | US with Design / Total US × 100 | 64% | 100% | 36% |
| Code Coverage | Design with Code / Total Design × 100 | 71% | 100% | 29% |
| Test Coverage | Code with TC / Total Code × 100 | 71% | 100% | 29% |

### 5.2 Test Coverage Matrix

| Module | Unit Tests | Integration | System | UAT | E2E | Total Coverage |
|--------|------------|-------------|--------|-----|-----|----------------|
| Configuration | 85% | 70% | 60% | 0% | 0% | 43% |
| Employee Mgmt | 80% | 60% | 40% | 0% | 0% | 36% |
| Payroll Calc | 70% | 40% | 20% | 0% | 0% | 26% |
| Reporting | 0% | 0% | 0% | 0% | 0% | 0% |
| Security | 0% | 0% | 0% | 0% | 0% | 0% |
| **Total** | **47%** | **34%** | **24%** | **0%** | **0%** | **21%** |

### 5.3 Risk Assessment by Coverage

| Coverage Level | Risk Level | Modules | Action Required |
|----------------|------------|---------|-----------------|
| 0-25% | Critical | Reporting, Security | Immediate attention |
| 26-50% | High | Payroll Calculation | Priority in next sprint |
| 51-75% | Medium | Employee Management | Continue as planned |
| 76-100% | Low | Configuration | Maintain quality |

---

## 6. CHANGE IMPACT ANALYSIS

### 6.1 Change Scenarios

#### Scenario 1: Change in Tax Calculation Formula

| Affected Items | Impact Level | Effort | Risk |
|----------------|--------------|--------|------|
| FR-007 (Tính thuế TNCN) | High | 8h | Medium |
| US-009 (Calculate tax) | High | 4h | Low |
| CODE-007 (TaxCalculationService) | High | 16h | Medium |
| TC-031 to TC-035 | Medium | 8h | Low |
| **Total Effort** | - | **36h** | **Medium** |

#### Scenario 2: Add New Salary Component Type

| Affected Items | Impact Level | Effort | Risk |
|----------------|--------------|--------|------|
| FR-002 (Thuộc tính động) | Medium | 4h | Low |
| FR-010 (Loại thu nhập) | High | 8h | Medium |
| US-002 (Dynamic attributes) | Medium | 4h | Low |
| CODE-002, CODE-010 | High | 24h | Medium |
| TC-006 to TC-010, TC-046 to TC-050 | Medium | 16h | Low |
| **Total Effort** | - | **56h** | **Medium** |

### 6.2 Dependency Impact Matrix

| Component | Direct Dependencies | Indirect Dependencies | Risk if Changed |
|-----------|-------------------|----------------------|-----------------|
| SalaryTemplate | 5 | 12 | High |
| Employee | 8 | 15 | Very High |
| PayrollCalculation | 10 | 20 | Critical |
| TaxCalculation | 3 | 8 | Medium |
| ReportGeneration | 4 | 10 | Medium |

### 6.3 Backward Compatibility Matrix

| Version | Components | Backward Compatible | Migration Required |
|---------|------------|-------------------|-------------------|
| v1.0 | All | N/A | N/A |
| v1.1 | Tax Calculation | Yes | No |
| v2.0 | Salary Template | No | Yes - Data migration |
| v2.1 | Reporting | Yes | No |

---

## 7. VALIDATION AND VERIFICATION

### 7.1 V&V Matrix

| Requirement | Verification Method | Validation Method | Responsible | Status |
|-------------|-------------------|------------------|-------------|---------|
| FR-001 | Code Review + Unit Test | User Demo | Dev + QA | ✅ |
| FR-005 | Integration Test | UAT | QA + User | 🔄 |
| FR-006 | Calculation Audit | Expert Review | QA + Domain Expert | ❌ |
| NFR-001 | Performance Test | Load Test | QA + DevOps | ❌ |
| NFR-004 | Security Scan | Penetration Test | Security Team | ❌ |

### 7.2 Acceptance Criteria Mapping

| User Story | Acceptance Criteria | Test Cases | Coverage | Passed |
|------------|-------------------|------------|----------|---------|
| US-001 | 6 criteria | TC-001 to TC-005 | 5/6 (83%) | 5/5 |
| US-005 | 7 criteria | TC-021 to TC-025 | 3/7 (43%) | 2/3 |
| US-008 | 6 criteria | TC-026 to TC-030 | 0/6 (0%) | 0/0 |

---

## 8. COMPLIANCE TRACKING

### 8.1 Regulatory Compliance

| Regulation | Requirements | Implementation | Testing | Compliant |
|------------|-------------|----------------|---------|-----------|
| Labor Law | FR-006, FR-007 | 🔄 | ❌ | ❌ |
| Tax Law | FR-007, FR-009 | ❌ | ❌ | ❌ |
| GDPR | NFR-004, NFR-005 | ❌ | ❌ | ❌ |
| ISO 27001 | NFR-004, NFR-006 | ❌ | ❌ | ❌ |

### 8.2 Standards Compliance

| Standard | Area | Requirements | Status | Notes |
|----------|------|--------------|--------|-------|
| WCAG 2.1 | Accessibility | NFR-007 | ❌ | Planned for v2.0 |
| OWASP Top 10 | Security | NFR-004 | ❌ | Security sprint needed |
| REST API | Integration | FR-011 | 🔄 | In design phase |

---

## 9. METRICS AND REPORTING

### 9.1 Key Metrics

| Metric | Formula | Current | Target | Trend |
|--------|---------|---------|--------|-------|
| Requirement Stability | Changes / Total Req × 100 | 15% | <10% | ↗️ |
| Test Effectiveness | Defects found in test / Total defects × 100 | 78% | >90% | ↗️ |
| Requirement Coverage | Implemented / Total × 100 | 21% | 100% | ↗️ |
| Test Automation | Automated tests / Total tests × 100 | 30% | >70% | ↗️ |

### 9.2 Traceability Health Score

```
Overall Health Score: 45/100

Breakdown:
├── Completeness: 40/100
├── Consistency: 60/100
├── Coverage: 35/100
├── Quality: 50/100
└── Compliance: 40/100

Recommendation: Focus on increasing test coverage and completing design documents
```

---

## 10. ACTION ITEMS

### 10.1 Critical Path Items

| Priority | Item | Owner | Due Date | Status |
|----------|------|-------|----------|---------|
| P0 | Complete FR-005 implementation | Dev Team | Week 2 | 🔄 |
| P0 | Design security module | Architect | Week 3 | ❌ |
| P0 | Start tax calculation module | Dev Team | Week 4 | ❌ |
| P1 | Increase test coverage to 60% | QA Team | Week 5 | 🔄 |
| P1 | Complete reporting design | BA Team | Week 6 | ❌ |

### 10.2 Risk Mitigation

| Risk | Mitigation Action | Owner | Status |
|------|------------------|-------|--------|
| Low test coverage | Dedicate sprint for testing | QA Lead | Planning |
| Missing compliance | Hire compliance expert | PM | In Progress |
| Performance unknown | Early performance testing | DevOps | Not Started |
| Security vulnerabilities | Security audit | Security Team | Scheduled |

---

## APPENDIX

### A. Requirement ID Registry

| ID Range | Category | Description |
|----------|----------|-------------|
| BR-001 to BR-100 | Business | Business Requirements |
| FR-001 to FR-200 | Functional | Functional Requirements |
| NFR-001 to NFR-100 | Non-functional | Quality Attributes |
| US-001 to US-999 | User Story | Agile User Stories |
| TC-001 to TC-999 | Test | Test Cases |

### B. Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2024-01-01 | 1.0 | Initial RTM | BA Team |
| 2024-01-15 | 1.1 | Added Sprint 2 items | Scrum Master |

### C. Review and Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Manager | | | |
| Technical Lead | | | |
| QA Lead | | | |
| Product Owner | | | |

---

**Note:** This RTM is a living document and should be updated regularly as the project progresses.