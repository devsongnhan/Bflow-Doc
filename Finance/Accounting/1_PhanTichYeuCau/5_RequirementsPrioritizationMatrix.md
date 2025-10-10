# Requirements Prioritization Matrix
# Hệ thống Kế toán - Accounting Module

## Lịch sử Phiên bản

| Phiên bản | Ngày       | Tác giả | Mô tả Thay đổi |
|-----------|------------|---------|----------------|
| 1.0       | 2024-10-03 | BA Team | Phiên bản khởi tạo |

---

## MỤC LỤC

1. [Giới thiệu](#1-giới-thiệu)
2. [Phương pháp Ưu tiên](#2-phương-pháp-ưu-tiên)
3. [MoSCoW Prioritization](#3-moscow-prioritization)
4. [Value vs Complexity Matrix](#4-value-vs-complexity-matrix)
5. [Risk-Based Prioritization](#5-risk-based-prioritization)
6. [Release Planning](#6-release-planning)
7. [Stakeholder Priority](#7-stakeholder-priority)

---

## 1. GIỚI THIỆU

### 1.1 Mục đích

Tài liệu này xác định độ ưu tiên cho các yêu cầu của module Accounting dựa trên:
- ✅ **Business Value**: Giá trị kinh doanh
- ✅ **Technical Complexity**: Độ phức tạp kỹ thuật
- ✅ **Risk Level**: Mức độ rủi ro
- ✅ **Dependencies**: Phụ thuộc kỹ thuật
- ✅ **Compliance**: Tuân thủ pháp luật

### 1.2 Stakeholder Input

Prioritization dựa trên ý kiến của:
- **CFO/Kế toán trưởng**: Business value, Compliance
- **Product Owner**: Business priority
- **Technical Lead**: Technical complexity, Risk
- **QA Lead**: Testing complexity
- **Users**: Usability, Daily usage frequency

### 1.3 Prioritization Framework

Sử dụng 3 phương pháp kết hợp:
1. **MoSCoW Method**: Must/Should/Could/Won't Have
2. **Value vs Complexity Matrix**: 2x2 matrix
3. **RICE Score**: Reach × Impact × Confidence / Effort

---

## 2. PHƯƠNG PHÁP ƯU TIÊN

### 2.1 MoSCoW Method

| Category | Definition | % of Total | Implementation |
|----------|------------|------------|----------------|
| **Must Have** | Critical for go-live; Legal compliance; Core functionality | 60% | Release 1 (MVP) |
| **Should Have** | Important but not critical; High business value | 25% | Release 2 |
| **Could Have** | Nice to have; Enhance user experience | 10% | Release 3 |
| **Won't Have** | Out of scope for this release | 5% | Future consideration |

### 2.2 RICE Scoring

```
RICE Score = (Reach × Impact × Confidence) / Effort

Reach: How many users affected? (0-100%)
Impact: How much value? (Minimal=0.25, Low=0.5, Medium=1, High=2, Massive=3)
Confidence: How sure are we? (50%, 80%, 100%)
Effort: How much work? (Person-weeks)

Higher RICE = Higher Priority
```

### 2.3 Risk Assessment

| Risk Level | Criteria | Prioritization Impact |
|------------|----------|----------------------|
| **CRITICAL** | Legal compliance, Data loss, Security | Must address early |
| **HIGH** | Business impact, Integration complexity | High priority |
| **MEDIUM** | User experience, Performance | Medium priority |
| **LOW** | Nice to have, Minor bugs | Low priority |

---

## 3. MOSCOW PRIORITIZATION

### 3.1 MUST HAVE (60% - Release 1 MVP)

#### 3.1.1 General Ledger (GL)

| ID | Requirement | Reason | RICE Score |
|----|-------------|--------|------------|
| **US-GL-001** | Quản lý Chart of Accounts | Foundation cho toàn bộ hệ thống | 90 |
| **US-GL-002** | Nhập bút toán thủ công | Core accounting function | 95 |
| **US-GL-003** | Quy trình phê duyệt | Internal control requirement | 85 |
| **US-GL-004** | Đảo bút toán | Error correction compliance | 75 |
| **US-GL-005** | Xem sổ cái | Legal requirement (VAS) | 88 |
| **US-GL-007** | Bảng cân đối số phát sinh | Financial verification | 82 |
| **US-GL-009** | Kết chuyển cuối tháng | Period-end closing | 90 |
| **US-GL-010** | Kết chuyển cuối năm | Year-end closing | 92 |
| **US-GL-012** | Audit trail | Compliance & security | 80 |

**Sub-total GL Must Have:** 9 stories

---

#### 3.1.2 Accounts Payable (AP)

| ID | Requirement | Reason | RICE Score |
|----|-------------|--------|------------|
| **US-AP-001** | Nhập hóa đơn NCC | Core AP function | 88 |
| **US-AP-003** | Thanh toán NCC | Cash management critical | 90 |
| **US-AP-006** | AP Aging Report | Cash flow planning | 75 |

**Sub-total AP Must Have:** 3 stories

---

#### 3.1.3 Accounts Receivable (AR)

| ID | Requirement | Reason | RICE Score |
|----|-------------|--------|------------|
| **US-AR-001** | Xuất hóa đơn KH | Core AR function | 90 |
| **US-AR-002** | Xuất e-Invoice | Legal requirement (Decree 123/2020) | 95 |
| **US-AR-003** | Thu tiền KH | Cash collection critical | 92 |
| **US-AR-008** | AR Aging Report | Collection management | 78 |

**Sub-total AR Must Have:** 4 stories

---

#### 3.1.4 Fixed Assets (FA)

| ID | Requirement | Reason | RICE Score |
|----|-------------|--------|------------|
| **US-FA-001** | Đăng ký TSCĐ mới | Asset tracking | 82 |
| **US-FA-002** | Khấu hao tự động | Legal compliance, Automation | 88 |

**Sub-total FA Must Have:** 2 stories

---

#### 3.1.5 Cash Management (CM)

| ID | Requirement | Reason | RICE Score |
|----|-------------|--------|------------|
| **US-CM-001** | Phiếu thu tiền mặt | Daily operations | 85 |
| **US-CM-002** | Phiếu chi tiền mặt | Daily operations | 85 |
| **US-CM-005** | Đối chiếu ngân hàng | Cash control | 80 |

**Sub-total CM Must Have:** 3 stories

---

#### 3.1.6 Tax Management (TAX)

| ID | Requirement | Reason | RICE Score |
|----|-------------|--------|------------|
| **US-TAX-001** | Khai thuế GTGT | Legal requirement | 95 |
| **US-TAX-002** | Nộp thuế GTGT | Legal requirement | 92 |
| **US-TAX-003** | Tạm tính thuế TNDN | Legal requirement | 88 |
| **US-TAX-004** | Quyết toán thuế TNDN | Legal requirement | 90 |
| **US-TAX-006** | Khai thuế TNCN | Legal requirement | 90 |

**Sub-total TAX Must Have:** 5 stories

---

#### 3.1.7 Financial Reporting (FR)

| ID | Requirement | Reason | RICE Score |
|----|-------------|--------|------------|
| **US-FR-001** | Bảng cân đối kế toán | Legal requirement (VAS) | 95 |
| **US-FR-002** | Báo cáo KQKD | Legal requirement (VAS) | 95 |
| **US-FR-003** | Báo cáo LCTTT | Legal requirement (VAS) | 90 |

**Sub-total FR Must Have:** 3 stories

---

**TOTAL MUST HAVE: 29 stories (41% of 70 total)**

**Rationale for Must Have:**
- ✅ Legal compliance (VAS, Tax laws, Decree 123/2020)
- ✅ Core accounting operations cannot function without these
- ✅ High business value, high daily usage
- ✅ Foundation for other features

---

### 3.2 SHOULD HAVE (25% - Release 2)

#### High Business Value, Not Critical for MVP

| Epic | ID | Requirement | Business Value | Complexity | Priority Reason |
|------|-----|-------------|----------------|------------|-----------------|
| **GL** | US-GL-006 | Nhật ký chung | HIGH | LOW | User convenience, reporting |
| **GL** | US-GL-011 | Reopen period | MEDIUM | MEDIUM | Exception handling |
| **AP** | US-AP-002 | Import e-Invoice | HIGH | HIGH | Automation, efficiency |
| **AP** | US-AP-004 | Thanh toán 1 phần | MEDIUM | LOW | Flexibility |
| **AP** | US-AP-005 | Đối chiếu với NCC | HIGH | MEDIUM | Control, audit |
| **AP** | US-AP-007 | Lịch thanh toán | MEDIUM | LOW | Cash flow planning |
| **AP** | US-AP-010 | Supplier Ledger | MEDIUM | LOW | Reporting |
| **AR** | US-AR-004 | Thu 1 phần | MEDIUM | LOW | Flexibility |
| **AR** | US-AR-006 | Quản lý nợ quá hạn | HIGH | MEDIUM | Risk management |
| **AR** | US-AR-007 | Dự phòng nợ khó đòi | HIGH | MEDIUM | Financial accuracy |
| **AR** | US-AR-009 | Đối chiếu với KH | HIGH | MEDIUM | Control, audit |
| **AR** | US-AR-010 | Customer Ledger | MEDIUM | LOW | Reporting |
| **FA** | US-FA-003 | Điều chuyển TSCĐ | MEDIUM | LOW | Asset tracking |
| **FA** | US-FA-004 | Thanh lý TSCĐ | MEDIUM | MEDIUM | Asset lifecycle |
| **FA** | US-FA-006 | Báo cáo TSCĐ | MEDIUM | LOW | Management reporting |
| **FA** | US-FA-007 | Kiểm kê TSCĐ | HIGH | MEDIUM | Compliance, control |
| **CM** | US-CM-003 | Quản lý TK NH | MEDIUM | LOW | Multi-bank support |
| **CM** | US-CM-004 | Import sao kê | HIGH | HIGH | Automation |
| **CM** | US-CM-006 | Sổ quỹ | MEDIUM | LOW | Reporting |
| **CM** | US-CM-007 | Kiểm kê quỹ | HIGH | MEDIUM | Control |
| **TAX** | US-TAX-005 | Sync từ Payroll | MEDIUM | MEDIUM | Integration |
| **TAX** | US-TAX-007 | Nộp thuế TNCN | HIGH | LOW | Legal compliance |
| **TAX** | US-TAX-008 | Báo cáo thuế | MEDIUM | LOW | Reporting |
| **FR** | US-FR-004 | Thuyết minh BCTC | MEDIUM | MEDIUM | Full compliance |
| **FR** | US-FR-006 | Financial Dashboard | HIGH | MEDIUM | Management visibility |
| **FR** | US-FR-007 | Chi phí theo BP | MEDIUM | MEDIUM | Cost control |
| **FR** | US-FR-008 | Ratio Analysis | MEDIUM | MEDIUM | Financial analysis |
| **FR** | US-FR-011 | Export BCTC | HIGH | LOW | Usability |

**TOTAL SHOULD HAVE: 28 stories (40% of 70 total)**

**Rationale for Should Have:**
- ✅ Important for full functionality
- ✅ High ROI but can be deferred to Release 2
- ✅ Enhance user experience significantly
- ✅ Improve efficiency and automation

---

### 3.3 COULD HAVE (10% - Release 3)

#### Nice to Have, Lower Priority

| Epic | ID | Requirement | Business Value | Complexity | Priority Reason |
|------|-----|-------------|----------------|------------|-----------------|
| **GL** | US-GL-008 | Template bút toán | LOW | LOW | Convenience |
| **AP** | US-AP-008 | Tạm ứng NCC | LOW | MEDIUM | Edge case |
| **AP** | US-AP-009 | Hủy thanh toán | LOW | LOW | Exception handling |
| **AR** | US-AR-005 | Chiết khấu TT sớm | LOW | LOW | Incentive program |
| **FA** | US-FA-005 | Đánh giá lại TSCĐ | LOW | MEDIUM | Rare use case |
| **FA** | US-FA-008 | Bảo trì TSCĐ | LOW | MEDIUM | Optional tracking |
| **FA** | US-FA-009 | Lịch sử TSCĐ | LOW | LOW | Audit trail |
| **CM** | US-CM-008 | Cash Flow Report | MEDIUM | MEDIUM | Advanced reporting |
| **TAX** | US-TAX-009 | Lịch sử khai thuế | LOW | LOW | Reference |
| **FR** | US-FR-005 | Ký số BCTC | LOW | HIGH | Optional feature |
| **FR** | US-FR-009 | Budget vs Actual | MEDIUM | MEDIUM | Advanced planning |
| **FR** | US-FR-010 | Trend Analysis | LOW | MEDIUM | Advanced analytics |
| **FR** | US-FR-012 | Lưu trữ BCTC | MEDIUM | MEDIUM | Version control |

**TOTAL COULD HAVE: 13 stories (19% of 70 total)**

**Rationale for Could Have:**
- ✅ Enhance system but not critical
- ✅ Can be added incrementally
- ✅ Lower business impact
- ✅ Budget/time permitting

---

### 3.4 WON'T HAVE (This Release)

#### Out of Scope

| ID | Requirement | Reason for Deferral |
|----|-------------|---------------------|
| - | Kế toán chi phí sản xuất | Different module, complex |
| - | Kế toán dự án | Different module |
| - | Consolidation tập đoàn | Advanced feature |
| - | Multi-currency (full) | Phase 2 requirement |
| - | AI-powered analytics | Future innovation |
| - | Mobile app | Different platform |
| - | Blockchain audit trail | Emerging tech |

---

## 4. VALUE VS COMPLEXITY MATRIX

### 4.1 2×2 Matrix Visualization

```
                        High Value
                            |
            Quick Wins      |      Major Projects
         (Do First)         |     (Plan Carefully)
                            |
         US-AR-002 ⭐       |      US-AP-002
         US-TAX-001 ⭐      |      US-CM-004
         US-FR-001 ⭐       |      US-FA-002
         US-GL-002 ⭐       |      US-GL-010
         US-AR-003          |
         US-AP-001          |
─────────────────────────────────────────────── Low → High Complexity
         US-GL-008          |      US-FA-005
         US-AR-005          |      US-FR-005
         US-TAX-009         |
                            |
          Fill-ins          |      Time Sinks
         (Nice to Have)     |    (Avoid/Defer)
                            |
                        Low Value
```

### 4.2 Quadrant Analysis

#### Q1: Quick Wins (High Value, Low Complexity) - DO FIRST ⭐

| ID | Requirement | Value Score | Complexity Score | Action |
|----|-------------|-------------|------------------|--------|
| US-AR-002 | Xuất e-Invoice | 95 | LOW | Sprint 1-2 |
| US-TAX-001 | Khai thuế GTGT | 95 | LOW | Sprint 1-2 |
| US-FR-001 | Bảng cân đối KT | 95 | LOW | Sprint 2-3 |
| US-GL-002 | Nhập bút toán | 95 | LOW | Sprint 1 |
| US-AR-003 | Thu tiền KH | 92 | LOW | Sprint 2 |
| US-AP-001 | Nhập HĐ NCC | 88 | LOW | Sprint 2 |
| US-GL-005 | Xem sổ cái | 88 | LOW | Sprint 1 |

**Strategy:** Implement immediately for maximum ROI

---

#### Q2: Major Projects (High Value, High Complexity) - PLAN CAREFULLY

| ID | Requirement | Value Score | Complexity Score | Action |
|----|-------------|-------------|------------------|--------|
| US-AP-002 | Import e-Invoice | 85 | HIGH | Sprint 4-5 (After core AP) |
| US-CM-004 | Import sao kê NH | 82 | HIGH | Sprint 5-6 |
| US-FA-002 | Khấu hao tự động | 88 | MEDIUM-HIGH | Sprint 6-7 |
| US-GL-010 | Kết chuyển cuối năm | 92 | MEDIUM-HIGH | Sprint 8-9 |
| US-AR-006 | Quản lý nợ quá hạn | 80 | MEDIUM | Sprint 5-6 |

**Strategy:**
- Invest time in design & architecture
- Break into smaller increments
- High risk → Need careful planning

---

#### Q3: Fill-ins (Low Value, Low Complexity) - NICE TO HAVE

| ID | Requirement | Value Score | Complexity Score | Action |
|----|-------------|-------------|------------------|--------|
| US-GL-008 | Template bút toán | 45 | LOW | Release 3 |
| US-AR-005 | Chiết khấu TT sớm | 40 | LOW | Release 3 |
| US-TAX-009 | Lịch sử khai thuế | 35 | LOW | Release 3 |
| US-FA-009 | Lịch sử TSCĐ | 38 | LOW | Release 3 |

**Strategy:** Implement when time permits, low priority

---

#### Q4: Time Sinks (Low Value, High Complexity) - AVOID/DEFER

| ID | Requirement | Value Score | Complexity Score | Action |
|----|-------------|-------------|------------------|--------|
| US-FA-005 | Đánh giá lại TSCĐ | 30 | MEDIUM-HIGH | Won't Have |
| US-FR-005 | Ký số BCTC | 35 | HIGH | Won't Have (This release) |

**Strategy:** Defer or remove from scope

---

## 5. RISK-BASED PRIORITIZATION

### 5.1 Risk Assessment Matrix

| Risk Category | High Risk Items | Mitigation Priority |
|---------------|-----------------|---------------------|
| **Legal/Compliance** | US-TAX-001, US-TAX-002, US-AR-002, US-FR-001/002/003 | ⭐⭐⭐ CRITICAL - Must complete |
| **Data Integrity** | US-GL-002, US-GL-003, US-GL-004, US-GL-012 | ⭐⭐⭐ CRITICAL - Core controls |
| **Integration** | US-AP-002, US-CM-004, US-TAX-005 | ⭐⭐ HIGH - Technical complexity |
| **Security** | US-GL-012, Audit trail, User permissions | ⭐⭐ HIGH - Security audit |
| **Performance** | US-FA-002, US-GL-005, Reports | ⭐ MEDIUM - Load testing |

### 5.2 Risk Scoring

```
Risk Score = Probability × Impact

Probability: 1 (Rare) - 5 (Almost Certain)
Impact: 1 (Negligible) - 5 (Catastrophic)

Risk Score > 15: Critical - Address immediately
Risk Score 10-15: High - Address in early sprints
Risk Score 5-9: Medium - Monitor
Risk Score < 5: Low - Accept
```

### 5.3 High-Risk Requirements (Priority)

| ID | Requirement | Risk | Probability | Impact | Score | Mitigation |
|----|-------------|------|-------------|--------|-------|------------|
| US-TAX-001 | Khai thuế GTGT | Sai format XML → Bị từ chối | 4 | 5 | 20 | POC early, Expert review |
| US-AR-002 | e-Invoice | Không kết nối được API | 3 | 5 | 15 | POC early, Vendor support |
| US-GL-010 | Kết chuyển năm | Sai logic → Sai BCTC | 3 | 5 | 15 | Peer review, QA intensive |
| US-FA-002 | Khấu hao | Tính sai → Audit fail | 2 | 5 | 10 | Accountant validation |
| US-AP-002 | Import e-Invoice | XML parse errors | 3 | 3 | 9 | Robust error handling |
| US-CM-004 | Import sao kê | Format khác nhau mỗi NH | 4 | 2 | 8 | Support top 3 banks first |

**Action Plan:**
- **Critical (Score > 15):** POC/Spike in Sprint 1, Technical design review
- **High (10-15):** Early implementation, Extra QA attention
- **Medium (5-9):** Standard process

---

## 6. RELEASE PLANNING

### 6.1 Release Roadmap

#### **Release 1 - MVP (Sprint 1-6, Month 1-3)**

**Goal:** Core accounting functionality + Legal compliance

**Scope:**
- ✅ **GL:** Chart of Accounts, Journal Entry, Ledgers, Trial Balance, Closing (Month)
- ✅ **AP:** Invoice entry, Payment, Aging
- ✅ **AR:** Invoice, e-Invoice, Receipt, Aging
- ✅ **FA:** Registration, Depreciation (basic)
- ✅ **CM:** Cash receipts/payments, Bank reconciliation
- ✅ **TAX:** VAT, CIT, PIT declaration
- ✅ **FR:** Balance Sheet, Income Statement, Cash Flow

**Exit Criteria:**
- 29 Must Have stories completed
- UAT passed by CFO/Kế toán trưởng
- Legal compliance validated
- Go-live ready for basic operations

---

#### **Release 2 - Enhanced (Sprint 7-10, Month 4-5)**

**Goal:** Automation + Advanced features

**Scope:**
- ✅ **Integration:** e-Invoice import, Bank statement import
- ✅ **AP/AR:** Reconciliation, Partial payments, Advance payments
- ✅ **FA:** Transfer, Disposal, Inventory, Reports
- ✅ **TAX:** Automation, Historical tracking
- ✅ **FR:** Dashboard, Department reports, Ratio analysis

**Exit Criteria:**
- 28 Should Have stories completed
- Automation features working
- User satisfaction > 80%

---

#### **Release 3 - Optimization (Sprint 11-12, Month 6)**

**Goal:** User experience + Nice-to-have features

**Scope:**
- ✅ **UX:** Templates, Shortcuts, Better navigation
- ✅ **Analytics:** Trend analysis, Budget vs Actual
- ✅ **Maintenance:** Asset maintenance tracking
- ✅ **Reporting:** Custom reports, Advanced exports

**Exit Criteria:**
- 13 Could Have stories completed
- System optimized
- Documentation complete

---

### 6.2 Sprint-Level Breakdown (Example: Release 1)

#### Sprint 1-2 (GL Foundation + Critical Compliance)

| Priority | ID | Story | Points | Sprint |
|----------|-----|-------|--------|--------|
| 1 | US-GL-001 | Chart of Accounts | 8 | 1 |
| 2 | US-GL-002 | Nhập bút toán | 5 | 1 |
| 3 | US-GL-003 | Quy trình phê duyệt | 5 | 1 |
| 4 | US-GL-005 | Sổ cái | 3 | 2 |
| 5 | US-GL-007 | Bảng cân đối | 5 | 2 |
| 6 | US-TAX-001 | Khai VAT (POC) | 5 | 2 |
| **Total** | | | **31** | **2 sprints** |

#### Sprint 3-4 (AP/AR Core)

| Priority | ID | Story | Points | Sprint |
|----------|-----|-------|--------|--------|
| 7 | US-AP-001 | Nhập HĐ NCC | 5 | 3 |
| 8 | US-AR-001 | Xuất HĐ KH | 5 | 3 |
| 9 | US-AR-002 | e-Invoice | 8 | 3 |
| 10 | US-AP-003 | Thanh toán NCC | 5 | 4 |
| 11 | US-AR-003 | Thu tiền KH | 5 | 4 |
| 12 | US-GL-004 | Đảo bút toán | 3 | 4 |
| **Total** | | | **31** | **2 sprints** |

*(Continue for Sprint 5-6...)*

---

### 6.3 Dependency-Based Sequencing

```
Critical Path:

Sprint 1: GL Foundation (US-GL-001, 002, 003)
    ↓
Sprint 2: GL Reports + Tax POC (US-GL-005, 007, TAX-001)
    ↓
Sprint 3: AP/AR Core (US-AP-001, AR-001, AR-002)
    ↓
Sprint 4: Payment/Receipt (US-AP-003, AR-003)
    ↓
Sprint 5: Cash & FA (US-CM-001/002/005, FA-001/002)
    ↓
Sprint 6: Tax & Closing (US-TAX-002/003/004, GL-009/010)
    ↓
UAT & Go-live
```

---

## 7. STAKEHOLDER PRIORITY

### 7.1 Stakeholder Weighting

| Stakeholder | Weight | Top Priorities |
|-------------|--------|----------------|
| **CFO** | 30% | Legal compliance, Financial reports, Cash flow |
| **Kế toán trưởng** | 25% | Accuracy, Audit trail, Closing process |
| **Kế toán viên** | 20% | Ease of use, Efficiency, Templates |
| **Tax department** | 15% | Tax compliance, Automation |
| **IT/Tech Lead** | 10% | Technical feasibility, Security |

### 7.2 Weighted Priority Scores

| ID | CFO (30%) | KTT (25%) | KTV (20%) | Tax (15%) | IT (10%) | **Weighted Score** | Final Priority |
|----|-----------|-----------|-----------|-----------|----------|-------------------|----------------|
| US-TAX-001 | 95 | 90 | 70 | 100 | 80 | **89.5** | 1 |
| US-FR-001 | 100 | 95 | 60 | 70 | 75 | **85.5** | 2 |
| US-AR-002 | 85 | 90 | 70 | 95 | 90 | **85.0** | 3 |
| US-GL-002 | 75 | 95 | 90 | 60 | 85 | **82.0** | 4 |
| US-GL-010 | 90 | 100 | 60 | 80 | 70 | **82.0** | 5 |
| US-AR-003 | 80 | 75 | 85 | 60 | 75 | **76.0** | 6 |
| US-AP-003 | 85 | 70 | 75 | 60 | 70 | **73.5** | 7 |
| ... | | | | | | | |

---

## 8. FINAL PRIORITIZED BACKLOG

### 8.1 Top 30 Priority Ranking

| Rank | ID | Story | MoSCoW | RICE | Value/Complexity | Risk | Sprint Target |
|------|-----|-------|--------|------|------------------|------|---------------|
| 1 | US-TAX-001 | Khai thuế GTGT | Must | 95 | Quick Win | Critical | 2 |
| 2 | US-FR-001 | Bảng cân đối KT | Must | 95 | Quick Win | High | 6 |
| 3 | US-AR-002 | e-Invoice | Must | 95 | Quick Win | High | 3 |
| 4 | US-GL-002 | Nhập bút toán | Must | 95 | Quick Win | Critical | 1 |
| 5 | US-GL-001 | Chart of Accounts | Must | 90 | Foundation | Medium | 1 |
| 6 | US-GL-010 | Kết chuyển năm | Must | 92 | Major Project | High | 6 |
| 7 | US-AR-003 | Thu tiền KH | Must | 92 | Quick Win | Medium | 4 |
| 8 | US-TAX-002 | Nộp thuế GTGT | Must | 92 | Quick Win | Critical | 2 |
| 9 | US-FR-002 | Báo cáo KQKD | Must | 95 | Quick Win | High | 6 |
| 10 | US-GL-009 | Kết chuyển tháng | Must | 90 | Major Project | High | 5 |
| 11 | US-AP-001 | Nhập HĐ NCC | Must | 88 | Quick Win | Medium | 3 |
| 12 | US-AP-003 | Thanh toán NCC | Must | 90 | Quick Win | Medium | 4 |
| 13 | US-FR-003 | Báo cáo LCTTT | Must | 90 | Quick Win | High | 6 |
| 14 | US-TAX-004 | Quyết toán TNDN | Must | 90 | Quick Win | High | 6 |
| 15 | US-TAX-006 | Khai TNCN | Must | 90 | Quick Win | Critical | 5 |
| 16 | US-GL-005 | Sổ cái | Must | 88 | Quick Win | Medium | 2 |
| 17 | US-FA-002 | Khấu hao tự động | Must | 88 | Major Project | High | 5 |
| 18 | US-TAX-003 | Tạm tính TNDN | Must | 88 | Quick Win | Medium | 5 |
| 19 | US-CM-001 | Phiếu thu TM | Must | 85 | Quick Win | Medium | 4 |
| 20 | US-CM-002 | Phiếu chi TM | Must | 85 | Quick Win | Medium | 4 |
| 21 | US-GL-003 | Phê duyệt BT | Must | 85 | Quick Win | High | 1 |
| 22 | US-FA-001 | Đăng ký TSCĐ | Must | 82 | Quick Win | Medium | 5 |
| 23 | US-GL-007 | Bảng cân đối SPH | Must | 82 | Quick Win | Medium | 2 |
| 24 | US-CM-005 | Đối chiếu NH | Must | 80 | Quick Win | Medium | 5 |
| 25 | US-GL-012 | Audit trail | Must | 80 | Quick Win | Critical | 2 |
| 26 | US-AR-008 | AR Aging | Must | 78 | Quick Win | Low | 4 |
| 27 | US-GL-004 | Đảo bút toán | Must | 75 | Quick Win | Medium | 4 |
| 28 | US-AP-006 | AP Aging | Must | 75 | Quick Win | Low | 4 |
| 29 | US-GL-006 | Nhật ký chung | Should | 72 | Fill-in | Low | 7 |
| 30 | US-AR-006 | Nợ quá hạn | Should | 80 | Major Project | Medium | 8 |

---

## 9. PRIORITIZATION DECISIONS LOG

### 9.1 Key Decisions

| Decision | Rationale | Date | Approver |
|----------|-----------|------|----------|
| e-Invoice (US-AR-002) promoted to Top 3 | Legal mandate Decree 123/2020, High penalty risk | 2024-10-03 | CFO |
| Template (US-GL-008) demoted to Could Have | Low business impact, Nice-to-have only | 2024-10-03 | Product Owner |
| Bank reconciliation (US-CM-005) in Must Have | Cash control critical, Audit requirement | 2024-10-03 | Kế toán trưởng |
| Digital signature (US-FR-005) moved to Won't Have | Too complex, Low ROI for Release 1 | 2024-10-03 | Tech Lead |

### 9.2 Trade-offs

**Scope vs Time:**
- **Decision:** Focus on Must Have (29 stories) for MVP in 3 months
- **Trade-off:** Defer automation features (Should Have) to Release 2
- **Impact:** Users will have more manual work initially, but system is compliant and usable

**Quality vs Features:**
- **Decision:** Prioritize audit trail, data integrity over convenience features
- **Trade-off:** Template, shortcuts deferred
- **Impact:** Slightly lower user satisfaction initially, but higher trust and compliance

---

## 10. MONITORING & RE-PRIORITIZATION

### 10.1 Re-prioritization Triggers

Monitor and adjust priorities when:
- ✅ **Legal changes:** New tax law → Immediate priority shift
- ✅ **Business changes:** New partnership → Integration needs
- ✅ **Technical blockers:** API issues → Defer dependent features
- ✅ **User feedback:** Low adoption → UX improvements up
- ✅ **Performance issues:** Slow reports → Optimization up

### 10.2 Review Cadence

| Review Type | Frequency | Participants | Output |
|-------------|-----------|--------------|--------|
| **Sprint Planning** | Every 2 weeks | Scrum team | Next sprint backlog |
| **Backlog Refinement** | Weekly | BA, PO, Tech Lead | Updated priorities |
| **Stakeholder Review** | Monthly | All stakeholders | Strategic alignment |
| **Release Planning** | Quarterly | Executive team | Roadmap adjustment |

---

## PHỤ LỤC A: SCORING TEMPLATES

### A.1 RICE Scoring Worksheet

```
Story: _______________________

Reach: How many users per period?
  □ All users (100%)
  □ Most users (80%)
  □ Some users (50%)
  □ Few users (20%)
  Score: _____

Impact: How much value?
  □ Massive (3.0)
  □ High (2.0)
  □ Medium (1.0)
  □ Low (0.5)
  □ Minimal (0.25)
  Score: _____

Confidence: How sure are we?
  □ High confidence (100%)
  □ Medium confidence (80%)
  □ Low confidence (50%)
  Score: _____

Effort: How many person-weeks?
  Input: _____

RICE Score = (Reach × Impact × Confidence) / Effort = _____
```

---

## PHỤ LỤC B: STAKEHOLDER SIGN-OFF

### Priority Approval

| Stakeholder | Role | Signature | Date |
|-------------|------|-----------|------|
| CFO | Business sponsor | | |
| Kế toán trưởng | Domain expert | | |
| Product Owner | Requirements owner | | |
| Technical Lead | Technical feasibility | | |
| QA Lead | Testability | | |

**Notes:**
- Priorities reviewed and approved
- Understand trade-offs and rationale
- Commit to supporting Release 1 scope

---

**Phiên bản:** 1.0
**Ngày tạo:** 2024-10-03
**Người tạo:** BA Team
**Trạng thái:** ✅ Draft - Pending Review
**Next Review:** Sprint Planning Week 1
