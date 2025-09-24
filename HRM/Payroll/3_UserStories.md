# USER STORIES
# HỆ THỐNG QUẢN LÝ LƯƠNG

**Phiên bản:** 1.0  
**Ngày:** 2024  
**Methodology:** Agile/Scrum

---

## MỤC LỤC
1. [Tổng quan](#1-tổng-quan)
2. [Epic Stories](#2-epic-stories)
3. [User Stories chi tiết](#3-user-stories-chi-tiết)
4. [Story Map](#4-story-map)
5. [Acceptance Criteria Template](#5-acceptance-criteria-template)
6. [Definition of Done](#6-definition-of-done)

---

## 1. TỔNG QUAN

### 1.1 User Personas

#### Persona 1: HR Manager - Nguyễn Thị Mai
- **Vai trò**: Trưởng phòng Nhân sự
- **Kinh nghiệm**: 10 năm trong HR
- **Mục tiêu**: Tự động hóa quy trình, giảm sai sót
- **Pain points**: Mất nhiều thời gian tính toán, khó quản lý nhiều loại lương

#### Persona 2: HR Staff - Trần Văn Nam
- **Vai trò**: Nhân viên Nhân sự
- **Kinh nghiệm**: 3 năm
- **Mục tiêu**: Xử lý nhanh, chính xác
- **Pain points**: Công thức phức tạp, dễ nhầm lẫn

#### Persona 3: Employee - Lê Thị Hoa
- **Vai trò**: Nhân viên kinh doanh
- **Kinh nghiệm**: 5 năm
- **Mục tiêu**: Xem lương minh bạch, kịp thời
- **Pain points**: Không hiểu cách tính lương

#### Persona 4: Accountant - Phạm Văn Đức
- **Vai trò**: Kế toán trưởng
- **Kinh nghiệm**: 15 năm
- **Mục tiêu**: Báo cáo chính xác, đúng deadline
- **Pain points**: Phải làm lại nhiều lần do sai sót

### 1.2 Story Format

```
As a [type of user]
I want [goal/desire]
So that [benefit/value]
```

### 1.3 Priority Levels

- **P0**: Critical - MVP requirement
- **P1**: High - Core features
- **P2**: Medium - Important enhancements
- **P3**: Low - Nice to have

---

## 2. EPIC STORIES

### EPIC-01: Quản lý cấu trúc lương
**As a** HR Manager  
**I want** to configure flexible salary structures  
**So that** I can adapt to different departments and positions

### EPIC-02: Tính toán lương tự động
**As a** HR Staff  
**I want** the system to automatically calculate salaries  
**So that** I can reduce errors and save time

### EPIC-03: Quản lý nhân viên và hợp đồng
**As a** HR Manager  
**I want** to manage employee information and contracts  
**So that** I have centralized and updated data

### EPIC-04: Báo cáo và phân tích
**As a** Management  
**I want** comprehensive reports and analytics  
**So that** I can make informed decisions

### EPIC-05: Self-service cho nhân viên
**As an** Employee  
**I want** to access my salary information  
**So that** I can understand my compensation transparently

---

## 3. USER STORIES CHI TIẾT

### 3.1 EPIC-01: Quản lý cấu trúc lương

#### US-001: Tạo loại bảng lương [P0]
**As a** HR Manager  
**I want** to create different salary templates  
**So that** I can apply appropriate structures for each department

**Acceptance Criteria:**
- Can create new salary template with custom name
- Can define applicable department
- Can add/remove salary components
- Can set formulas for calculations
- System validates formula syntax
- Can save as draft or active

**Story Points:** 8  
**Sprint:** 1

---

#### US-002: Định nghĩa thuộc tính động [P0]
**As a** HR Manager  
**I want** to add dynamic attributes to salary templates  
**So that** I can customize based on specific needs

**Acceptance Criteria:**
- Can add new columns with:
  - Name and code
  - Data type (number, text, date, formula)
  - Data source (system, manual, calculated)
- Can set default values
- Can mark as required/optional
- Can reorder attributes
- Changes don't affect existing payrolls

**Story Points:** 5  
**Sprint:** 1

---

#### US-003: Cấu hình công thức tính toán [P0]
**As a** HR Manager  
**I want** to configure calculation formulas  
**So that** complex salary rules can be automated

**Acceptance Criteria:**
- Formula editor with syntax highlighting
- Can reference other attributes
- Support basic operations (+, -, *, /)
- Support conditions (IF, THEN, ELSE)
- Real-time validation
- Test calculation with sample data
- Show error messages clearly

**Story Points:** 13  
**Sprint:** 2

---

#### US-004: Clone và modify template [P2]
**As a** HR Manager  
**I want** to clone existing templates  
**So that** I can quickly create variations

**Acceptance Criteria:**
- Can select template to clone
- Can modify cloned template
- Original template unchanged
- Auto-generate new code
- Maintain formula references

**Story Points:** 3  
**Sprint:** 3

---

### 3.2 EPIC-02: Tính toán lương tự động

#### US-005: Tự động tạo bảng lương tháng [P0]
**As a** HR Staff  
**I want** system to auto-generate monthly payroll  
**So that** I don't have to create manually

**Acceptance Criteria:**
- Auto-run on scheduled date (configurable)
- Create payroll for all active employees
- Use correct template per employee
- Pull data from integrated systems
- Show generation progress
- Log all activities
- Handle errors gracefully

**Story Points:** 8  
**Sprint:** 2

---

#### US-006: Import dữ liệu chấm công [P0]
**As a** HR Staff  
**I want** to import attendance data  
**So that** working days are calculated accurately

**Acceptance Criteria:**
- Support CSV/Excel import
- Validate data format
- Show preview before import
- Highlight errors/warnings
- Map fields flexibly
- Support bulk import
- Rollback on failure

**Story Points:** 5  
**Sprint:** 2

---

#### US-007: Nhập dữ liệu thủ công [P0]
**As a** HR Staff  
**I want** to manually input additional data  
**So that** I can add bonuses, deductions, etc.

**Acceptance Criteria:**
- Grid view for data entry
- Inline editing
- Copy/paste support
- Validation in real-time
- Auto-save draft
- Bulk update capability
- History of changes

**Story Points:** 5  
**Sprint:** 3

---

#### US-008: Tính bảo hiểm tự động [P0]
**As a** System  
**I want** to calculate insurance automatically  
**So that** compliance is ensured

**Acceptance Criteria:**
- Calculate BHXH, BHYT, BHTN
- Apply correct rates from configuration
- Respect ceiling/floor limits
- Split employee/employer portions
- Round to nearest 1000 VND
- Update when rates change

**Story Points:** 8  
**Sprint:** 3

---

#### US-009: Tính thuế TNCN tự động [P0]
**As a** System  
**I want** to calculate personal income tax  
**So that** tax compliance is maintained

**Acceptance Criteria:**
- Apply progressive tax brackets
- Calculate deductions (personal, dependents)
- Handle tax-exempt incomes
- Support both regular and irregular income
- Generate tax reports
- Update when tax law changes

**Story Points:** 8  
**Sprint:** 3

---

#### US-010: Validate và kiểm tra lỗi [P1]
**As a** HR Staff  
**I want** system to validate calculations  
**So that** errors are caught early

**Acceptance Criteria:**
- Check for:
  - Negative salaries
  - Exceeded limits
  - Missing required data
  - Formula errors
- Show clear error messages
- Suggest fixes
- Prevent approval if errors exist

**Story Points:** 5  
**Sprint:** 4

---

### 3.3 EPIC-03: Quản lý nhân viên và hợp đồng

#### US-011: CRUD thông tin nhân viên [P0]
**As a** HR Staff  
**I want** to manage employee information  
**So that** data is centralized and updated

**Acceptance Criteria:**
- Create new employee with:
  - Personal info
  - Contact details
  - Department/position
  - Bank account
- Update information
- Deactivate (not delete)
- Search and filter
- Export to Excel
- Audit trail

**Story Points:** 5  
**Sprint:** 1

---

#### US-012: Quản lý hợp đồng lao động [P0]
**As a** HR Staff  
**I want** to manage labor contracts  
**So that** legal compliance is maintained

**Acceptance Criteria:**
- Create contracts with:
  - Contract type
  - Duration
  - Salary information
  - Insurance settings
- Create appendix
- Track contract history
- Alert before expiry
- Generate contract from template
- Digital signature support

**Story Points:** 8  
**Sprint:** 4

---

#### US-013: Quản lý người phụ thuộc [P1]
**As a** HR Staff  
**I want** to manage employee dependents  
**So that** tax deductions are calculated correctly

**Acceptance Criteria:**
- Add dependent with:
  - Name, DOB
  - Relationship
  - Tax ID
  - Valid period
- Validate tax ID
- Check duplicate
- Calculate total deduction
- Report for tax authority

**Story Points:** 3  
**Sprint:** 5

---

#### US-014: Upload tài liệu [P2]
**As a** HR Staff  
**I want** to upload employee documents  
**So that** all documents are centralized

**Acceptance Criteria:**
- Support PDF, image formats
- Max 10MB per file
- Categorize documents
- Version control
- Access control
- Search by content
- Retention policy

**Story Points:** 5  
**Sprint:** 6

---

### 3.4 EPIC-04: Báo cáo và phân tích

#### US-015: Xuất bảng lương [P0]
**As a** HR Staff  
**I want** to export payroll reports  
**So that** I can share and archive

**Acceptance Criteria:**
- Export formats:
  - PDF per employee
  - Excel summary
  - CSV for banking
- Customizable templates
- Bulk export
- Password protect PDFs
- Email directly to employees

**Story Points:** 5  
**Sprint:** 4

---

#### US-016: Báo cáo bảo hiểm [P0]
**As an** Accountant  
**I want** insurance reports  
**So that** I can submit to authorities

**Acceptance Criteria:**
- Generate standard forms:
  - D02-TS
  - C12-TS
- Correct format per regulations
- Include all required data
- Period selection
- Export to XML/Excel
- Validation before export

**Story Points:** 8  
**Sprint:** 5

---

#### US-017: Báo cáo thuế TNCN [P0]
**As an** Accountant  
**I want** tax reports  
**So that** tax filing is accurate

**Acceptance Criteria:**
- Monthly tax report
- Annual tax finalization
- Employee tax certificates
- Format per tax authority
- Export to XML
- Include all income types

**Story Points:** 8  
**Sprint:** 5

---

#### US-018: Dashboard tổng quan [P1]
**As a** Management  
**I want** executive dashboard  
**So that** I can monitor KPIs

**Acceptance Criteria:**
- Show metrics:
  - Total payroll
  - Department breakdown
  - Trend analysis
  - Cost projections
- Interactive charts
- Drill-down capability
- Real-time updates
- Export to PDF

**Story Points:** 13  
**Sprint:** 6

---

#### US-019: Phân tích chi phí nhân sự [P2]
**As a** CFO  
**I want** labor cost analysis  
**So that** I can optimize expenses

**Acceptance Criteria:**
- Cost by department/position
- Overtime analysis
- Bonus distribution
- Year-over-year comparison
- Forecast next period
- What-if scenarios
- Export detailed reports

**Story Points:** 8  
**Sprint:** 7

---

### 3.5 EPIC-05: Self-service cho nhân viên

#### US-020: Xem bảng lương cá nhân [P0]
**As an** Employee  
**I want** to view my payslip  
**So that** I understand my compensation

**Acceptance Criteria:**
- View current month payslip
- View history (12 months)
- See detailed breakdown
- Download PDF
- Mobile responsive
- Secure authentication

**Story Points:** 5  
**Sprint:** 4

---

#### US-021: Xem thông tin cá nhân [P1]
**As an** Employee  
**I want** to view my profile  
**So that** I can verify my information

**Acceptance Criteria:**
- View personal info
- View contract details
- View benefits
- Request updates
- View tax information
- See dependent info

**Story Points:** 3  
**Sprint:** 5

---

#### US-022: Gửi thắc mắc về lương [P2]
**As an** Employee  
**I want** to raise salary queries  
**So that** issues are resolved quickly

**Acceptance Criteria:**
- Submit query with category
- Attach supporting docs
- Track status
- Receive notifications
- View response
- Rate resolution

**Story Points:** 5  
**Sprint:** 7

---

## 4. STORY MAP

### 4.1 User Journey Map

```
User Activities:
├── Setup & Configuration
│   ├── Configure Organization
│   ├── Setup Salary Templates  
│   └── Define Rules
├── Monthly Operations
│   ├── Generate Payroll
│   ├── Input Data
│   ├── Calculate
│   └── Approve
├── Distribution
│   ├── Generate Payslips
│   ├── Send to Employees
│   └── Process Payment
└── Reporting
    ├── Financial Reports
    ├── Compliance Reports
    └── Analytics

Release 1 (MVP):
- Basic setup
- Manual payroll
- Simple reports

Release 2:
- Auto calculation
- Employee portal
- Advanced reports

Release 3:
- Full automation
- Analytics
- Mobile app
```

### 4.2 Sprint Planning

| Sprint | Focus Area | Stories | Points |
|--------|------------|---------|--------|
| 1 | Basic Setup | US-001, US-002, US-011 | 18 |
| 2 | Calculation Engine | US-003, US-005, US-006 | 26 |
| 3 | Data Management | US-007, US-008, US-009 | 21 |
| 4 | Payroll Process | US-010, US-012, US-015, US-020 | 23 |
| 5 | Compliance | US-013, US-016, US-017, US-021 | 22 |
| 6 | Enhancements | US-014, US-018 | 18 |
| 7 | Advanced Features | US-019, US-022 | 13 |

---

## 5. ACCEPTANCE CRITERIA TEMPLATE

### 5.1 Given-When-Then Format

```gherkin
Feature: [Feature name]
  As a [user role]
  I want [goal]
  So that [benefit]

  Scenario: [Scenario name]
    Given [initial context]
    And [additional context]
    When [action/trigger]
    And [additional action]
    Then [expected outcome]
    And [additional outcome]
```

### 5.2 Example

```gherkin
Feature: Automatic salary calculation
  As a HR Staff
  I want automatic calculation
  So that errors are minimized

  Scenario: Calculate monthly salary
    Given employee has active contract
    And attendance data is imported
    When I trigger calculation
    Then salary is calculated based on formula
    And insurance is deducted correctly
    And tax is calculated per brackets
    And net salary is shown

  Scenario: Handle missing data
    Given employee has active contract
    And attendance data is missing
    When I trigger calculation
    Then error message is shown
    And calculation is blocked
    And admin is notified
```

---

## 6. DEFINITION OF DONE

### 6.1 Story Level

- [ ] Code complete and committed
- [ ] Unit tests written and passing (>80% coverage)
- [ ] Integration tests passing
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Acceptance criteria met
- [ ] No critical bugs
- [ ] Performance requirements met
- [ ] Security scan passed
- [ ] Deployed to staging
- [ ] PO acceptance

### 6.2 Sprint Level

- [ ] All stories completed per DoD
- [ ] Sprint goal achieved
- [ ] System integration tested
- [ ] Performance tested
- [ ] Security tested
- [ ] Documentation complete
- [ ] Demo prepared
- [ ] Retrospective conducted
- [ ] Technical debt addressed
- [ ] Ready for production

### 6.3 Release Level

- [ ] All features complete
- [ ] User acceptance testing passed
- [ ] Performance benchmarks met
- [ ] Security audit passed
- [ ] Documentation finalized
- [ ] Training materials ready
- [ ] Deployment plan approved
- [ ] Rollback plan tested
- [ ] Go-live checklist complete
- [ ] Stakeholder sign-off

---

## 7. NON-FUNCTIONAL REQUIREMENTS AS STORIES

### NFR-001: Performance [P0]
**As a** User  
**I want** fast response times  
**So that** I can work efficiently

**Acceptance Criteria:**
- Page load < 2 seconds
- Calculation < 3 seconds per employee
- Report generation < 10 seconds
- Support 100 concurrent users

### NFR-002: Security [P0]
**As a** System Administrator  
**I want** robust security  
**So that** data is protected

**Acceptance Criteria:**
- Multi-factor authentication
- Role-based access control
- Data encryption at rest and in transit
- Audit logging
- Session management
- OWASP top 10 compliance

### NFR-003: Usability [P1]
**As a** User  
**I want** intuitive interface  
**So that** I can use without extensive training

**Acceptance Criteria:**
- Mobile responsive
- Accessible (WCAG 2.1 AA)
- Multi-language support
- Contextual help
- Keyboard navigation
- Error prevention

---

## 8. TECHNICAL STORIES

### TS-001: Setup CI/CD Pipeline [P0]
**As a** Developer  
**I want** automated deployment  
**So that** releases are consistent

### TS-002: Implement Logging Framework [P0]
**As a** DevOps  
**I want** centralized logging  
**So that** troubleshooting is easier

### TS-003: Setup Monitoring [P1]
**As a** System Admin  
**I want** system monitoring  
**So that** issues are detected early

### TS-004: Database Optimization [P2]
**As a** DBA  
**I want** optimized queries  
**So that** performance is maintained

---

## 9. RISK AND DEPENDENCIES

### 9.1 Dependencies

| Story | Depends On | Type | Status |
|-------|------------|------|--------|
| US-005 | US-001, US-002 | Internal | OK |
| US-006 | Time system API | External | Pending |
| US-015 | US-008, US-009 | Internal | OK |
| US-016 | Tax authority format | External | Available |

### 9.2 Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| Tax law changes | High | Configurable rules |
| Integration delays | Medium | Mock services |
| Performance issues | High | Early testing |
| User adoption | Medium | Training plan |

---

## 10. METRICS AND TRACKING

### 10.1 Velocity Tracking

| Sprint | Committed | Completed | Velocity |
|--------|-----------|-----------|----------|
| 1 | 18 | 18 | 18 |
| 2 | 26 | 24 | 24 |
| 3 | 21 | 21 | 21 |
| Average | - | - | 21 |

### 10.2 Quality Metrics

- Bug discovery rate
- Defect escape rate
- Test coverage
- Technical debt ratio
- Customer satisfaction score

### 10.3 Business Metrics

- Time to process payroll
- Error rate reduction
- User adoption rate
- Cost savings achieved
- Compliance rate

---

**Document Sign-off:**

| Role | Name | Date |
|------|------|------|
| Product Owner | | |
| Scrum Master | | |
| Tech Lead | | |
| QA Lead | | |
