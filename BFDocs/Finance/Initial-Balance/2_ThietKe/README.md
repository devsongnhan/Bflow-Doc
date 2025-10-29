# Phase 2: Thiết Kế (Design Phase)

**Status:** In Progress
**Target Completion:** TBD

---

## 📋 Phase Checklist

Các tài liệu cần chuẩn bị cho phase Thiết Kế (theo chuẩn bo-tai-lieu-chuan-phat-trien-phan-mem.md):

### Required Documents

- [ ] **1_ArchitectureDesign.md** - Kiến trúc tổng thể hệ thống
  - System architecture overview
  - Technology stack selection
  - Deployment architecture
  - Integration points
  - Scalability & performance considerations

- [ ] **2_DetailedDesign.md** - Thiết kế chi tiết (Class Diagram & Data structures)
  - Class diagrams & object models
  - Sequence diagrams for main flows
  - State diagrams
  - Component interactions
  - Design patterns used

- [ ] **3_DatabaseDesign.md** - Thiết kế cơ sở dữ liệu (Logical & Physical)
  - Logical Data Model (from Conceptual ERD)
  - Physical schema with data types
  - Indexing strategy
  - Constraints & triggers
  - Performance optimization

- [ ] **4_APIDesign.md** - Thiết kế API specifications
  - RESTful API endpoints
  - Request/Response schemas
  - Error handling
  - Authentication & authorization
  - Rate limiting & versioning

- [ ] **5_UIUXDesign.md** - Thiết kế UI/UX chi tiết
  - High-fidelity mockups
  - Component specifications
  - Style guide & design system
  - Interaction patterns
  - Responsive behavior

- [x] **HTML Prototypes** - Interactive HTML/CSS/JS prototypes
  - Functional mockups for stakeholder review
  - User flow demonstrations
  - Form validation examples
  - Responsive design testing (Mobile/Tablet/Desktop)
  - Located in: `html-prototypes/` folder
  - **Files:**
    - `Form_CreateInitialBalance_Description.md` - Form specification & requirements
    - `1_create-initial-balance.html` - Create Opening Balance form prototype

- [ ] **6_SecurityDesign.md** - Thiết kế bảo mật (Optional - if required)
  - Threat modeling
  - Security architecture
  - Authentication mechanisms
  - Authorization policies
  - Data encryption strategy

---

## 🎯 Design Phase Overview

### Input (From Requirements Phase):
- Business Process Model
- Use Cases & User Stories
- Conceptual ERD
- UI/UX Prototype & Mockups

### Output (This Phase):
- Architecture Design
- Database Schema (Physical)
- API Specifications
- Detailed UI/UX Design
- Security Design
- Ready for Development

### Design Principles:
- ✅ Follow architecture patterns & best practices
- ✅ Ensure scalability & performance
- ✅ Implement security best practices
- ✅ Design for maintainability & extensibility
- ✅ Consider technical constraints
- ✅ Document all design decisions

---

## 📊 Progress Tracking

| Document | Status | Owner | Target Date |
|----------|--------|-------|-------------|
| Architecture Design | ✅ Draft | TBD | TBD |
| Detailed Design | ✅ Draft | TBD | TBD |
| Database Design | ✅ Draft | TBD | TBD |
| API Design | ✅ Draft | TBD | TBD |
| UI/UX Design | ✅ Draft | TBD | TBD |
| **HTML Prototypes** | **✅ Complete** | AI Agent | 2024-10-29 |
| Form Description (Initial-Balance) | ✅ Complete | AI Agent | 2024-10-29 |
| Security Design | ⏳ Waiting | TBD | TBD |

---

## 🎨 HTML Prototypes

**Location:** `html-prototypes/` folder

### Purpose:
Interactive HTML/CSS/JavaScript prototypes that bridge between Design and Development phases. These prototypes demonstrate:
- User interface interactions
- Form validation logic
- Data table management
- Responsive design behavior
- Client-side calculations
- Complete user workflows

### Files in html-prototypes/ folder:

#### 📄 Form Description Document
- **Form_CreateInitialBalance_Description.md**
  - Detailed form specifications
  - Field definitions with validation rules
  - Section-by-section layout breakdown
  - User interaction flows
  - Responsive design rules
  - Reference for HTML prototype development

#### 🌐 HTML Prototype
- **1_create-initial-balance.html**
  - Fully functional Opening Balance creation form
  - Bootstrap 5.3 responsive design
  - Form validation (client-side)
  - Dynamic table management (add/edit/delete rows)
  - Real-time calculation of totals
  - Balance status indicator
  - Sidebar navigation (demo)
  - Fixed header with action buttons
  - Responsive: Mobile, Tablet, Desktop

### How to Use:

1. **Open in Browser:**
   - Double-click the .html file to open in default browser
   - Or right-click → "Open with" → Select your browser

2. **Test the Form:**
   - Select Company and Period
   - Add accounts with Debit/Credit amounts
   - Watch totals update in real-time
   - Verify balance status (✅ BALANCED or ❌ UNBALANCED)
   - Test Edit and Delete functionality
   - Try responsive view on mobile devices

3. **Review for Stakeholders:**
   - Share .html files with business users
   - Get feedback on form layout and workflow
   - Validate business requirements are met
   - Test data entry scenarios

4. **Reference for Development:**
   - Developers use HTML as reference for coding
   - CSS classes and layout patterns documented
   - JavaScript validation logic can be adapted
   - Component structure follows Bootstrap 5.3 standards

### Design Standards Applied:

- ✅ Bootstrap 5.3 framework
- ✅ Color palette: Dark header (#2c3e50), Light background (#f8f9fa), Section colors
- ✅ Typography: Segoe UI/Roboto font family, proper sizes and weights
- ✅ Spacing: 4px unit system (p-0 to p-5)
- ✅ Form validation: Real-time error messages
- ✅ Accessibility: Semantic HTML, labels, ARIA attributes
- ✅ Responsive design: Mobile-first approach (xs < 768px, md ≥ 768px, lg ≥ 992px)

### Reference Documents:

For design guidelines used in these prototypes, see:
- [UI_UX_Design_Standards.md](../../UI_UX_Design_Standards.md) - Complete design system
- [Bootstrap_5.3_Quick_Reference.md](../../Bootstrap_5.3_Quick_Reference.md) - Bootstrap utility classes

---

## 🔗 Related Documents

- **Requirements Phase:** [1_PhanTichYeuCau/](../1_PhanTichYeuCau/)
  - Business Process Model
  - Use Cases & User Stories
  - Conceptual ERD
  - Prototype & Mockups

- **Parent Module:** [Initial-Balance](../README.md)

---

## 🏗️ Design Architecture Levels

### Level 1: System Architecture
```
┌──────────────────────────────────────────────────────┐
│                  Presentation Layer                  │
│  (Web UI, Mobile App, REST API Clients)              │
└─────────────────────┬──────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────┐
│               Application Layer                     │
│  (Business Logic, Services, Use Case Implementation)│
└─────────────────────┬──────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────┐
│             Data Access Layer (DAL)                 │
│  (Repository Pattern, ORM, Data Mappers)           │
└─────────────────────┬──────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────┐
│            Data Layer (Database)                    │
│  (SQL Server, PostgreSQL, MySQL)                   │
└──────────────────────────────────────────────────┘
```

### Level 2: Component Architecture
```
┌─────────────────────────────────────┐
│      Opening Balance Module         │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │  OpeningBalanceService       │  │
│  │  (Business Logic)            │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  OpeningBalanceRepository    │  │
│  │  (Data Access)               │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  ValidationService           │  │
│  │  (Validation & Rules)        │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  AuditService                │  │
│  │  (Audit Trail)               │  │
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

---

## 📚 Design Document Structure

Mỗi design document cần tuân theo cấu trúc tiêu chuẩn:

```markdown
# [Design Document Title]

**Created:** YYYY-MM-DD
**Status:** Draft / Ready for Review
**Version:** 1.0

---

## 1. Introduction
[Brief overview, purpose, scope]

## 2. Design Overview / Architecture Diagram
[Visual representation of the design]

## 3. Detailed Design
[Technical details, implementation specifics]

## 4. Key Components / Modules
[Component breakdown with responsibilities]

## 5. Design Patterns & Principles
[Patterns used, why chosen]

## 6. Performance & Scalability
[Performance considerations, optimization]

## 7. Security Considerations
[Security aspects, encryption, authentication]

## 8. Testing Strategy
[How to test this design]

## 9. Assumptions & Constraints
[Technical constraints, assumptions made]

## 10. Conclusion
[Summary of design decisions]

---

**Document Status:** Draft
**Last Updated:** YYYY-MM-DD
**Next Step:** [Next design document]
```

---

## 🛠️ Technology Stack (Reference)

### Backend (Suggested)
- **Language:** C# / Java / Python / Node.js
- **Framework:** .NET Core / Spring Boot / FastAPI / Express.js
- **Database:** SQL Server / PostgreSQL / MySQL
- **ORM:** Entity Framework / Hibernate / SQLAlchemy
- **API:** RESTful / GraphQL
- **Testing:** XUnit / JUnit / Pytest / Jest

### Frontend (Web)
- **Framework:** React / Angular / Vue.js
- **UI Components:** Bootstrap / Material-UI / Ant Design
- **State Management:** Redux / Vuex / Context API
- **HTTP Client:** Axios / Fetch API
- **Testing:** Jest / Jasmine / Mocha

### DevOps & Deployment
- **Version Control:** Git
- **CI/CD:** Jenkins / GitHub Actions / GitLab CI
- **Containerization:** Docker
- **Orchestration:** Kubernetes / Docker Compose
- **Monitoring:** ELK Stack / Prometheus / Grafana

---

## 🎯 Key Design Goals

1. **Scalability**
   - Handle growing number of companies & transactions
   - Database indexing strategy
   - Caching mechanisms

2. **Performance**
   - Sub-second response times for bulk imports
   - Efficient balance calculations
   - Optimized queries

3. **Reliability**
   - High availability setup
   - Backup & disaster recovery
   - Transaction consistency (ACID)

4. **Security**
   - Role-based access control (RBAC)
   - Data encryption (at rest & in transit)
   - Audit logging
   - Input validation & sanitization

5. **Maintainability**
   - Clean code architecture
   - Proper separation of concerns
   - Comprehensive documentation
   - Unit & integration tests

6. **Usability**
   - Intuitive UI/UX
   - Fast feedback
   - Clear error messages
   - Responsive design

---

## 📝 Design Review Checklist

Before marking document as complete:

- [ ] All sections are filled out
- [ ] Diagrams are clear and accurate
- [ ] Design decisions are justified
- [ ] Technical feasibility confirmed
- [ ] Performance implications considered
- [ ] Security requirements addressed
- [ ] Backward compatibility checked
- [ ] Dependencies & integrations documented
- [ ] Testing strategy defined
- [ ] Code generation artifacts identified (if applicable)

---

## 🚀 Transition to Development

Once all design documents are APPROVED:
1. Code generation (if using code generators)
2. Development environment setup
3. Coding standards & guidelines finalized
4. Development phase begins (Phase 3: 3_PhatTrien)

---

## 📞 Design Team Roles

- **Architect:** Overall system design, technology decisions
- **Backend Designer:** Business logic, API design, database schema
- **Frontend Designer:** UI/UX design, component architecture
- **Database Designer:** Physical schema, optimization, indexing
- **Security Designer:** Security architecture, threat modeling

---

## 📅 Estimated Timeline

| Document | Estimated Days | Notes |
|----------|----------------|-------|
| Architecture Design | 2-3 days | Parallel with others |
| Detailed Design | 2-3 days | Depends on complexity |
| Database Design | 1-2 days | Based on ERD |
| API Design | 1-2 days | Based on use cases |
| UI/UX Design | 2-3 days | Refine prototypes |
| **Total** | **8-13 days** | Overlapping work |

---

**Phase Status:** 🎯 Ready to Begin
**Last Updated:** 2024-10-29
