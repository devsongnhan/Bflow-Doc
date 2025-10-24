# Issue Management Guide

QA Issue documents ({{PROJECT_ID}}-issue-XXX) go here.

## 📁 Structure

**Lưu trữ Issue Documents theo dự án:**

```
Orchdocs/
├── projects/
│   ├── trading-erp-mcp/
│   │   ├── Design/
│   │   ├── Report/
│   │   ├── Sprint/
│   │   └── Issue/                          ← Issue folder cho project này (CẤU TRÚC PHẲNG)
│   │       ├── trading-erp-mcp-issue-001-LoginCrash.md
│   │       ├── trading-erp-mcp-issue-002-PerformanceLag.md
│   │       ├── trading-erp-mcp-issue-001.json
│   │       ├── trading-erp-mcp-issue-002.json
│   │       └── ...
│   │
│   ├── bflow/
│   │   ├── Design/
│   │   ├── Report/
│   │   ├── Sprint/
│   │   └── Issue/
│   │       ├── bflow-issue-001-WorkflowTimeout.md
│   │       ├── bflow-issue-001.json
│   │       └── ...
│   │
│   └── (other projects with same structure)
```

**⚠️ QUAN TRỌNG: CẤU TRÚC PHẲNG (FLAT STRUCTURE)**
- ✅ Files lưu **TRỰC TIẾP** trong `Issue/` folder
- ❌ **KHÔNG TẠO** subdirectories con

**Ví dụ Issue IDs:**
- `trading-erp-mcp-issue-001` (trading-erp-mcp project, issue #1)
- `bflow-issue-001` (bflow project, issue #1)
- `habour-issue-002` (habour project, issue #2)
- `hqg-issue-001` (hqg project, issue #1)

---

## 🚀 Quick Start - QA Tạo Issue Document

### ⚡ NEW WORKFLOW (V6.0): QA Helper Tạo File Ngay Lập Tức

**QA không cần tạo folder hoặc copy template thủ công. QA Helper sẽ làm TẤT CẢ!**

### Bước 1: Chạy QA Helper

```bash
cd agents/[qa-agent-name]
node ../roles/qa/qa-helper-v6.0.js
```

Chọn tùy chọn: **[2] Create issue**

### Bước 2: QA Helper Hỏi Chi Tiết Issue

QA Helper sẽ hỏi:
```
Issue ID (e.g. minhviet-issue-001): minhviet-issue-001
Issue Title (e.g. TourOrderPnL): TourOrderPnL
Description: Tour order P&L not updating...
Severity (critical/high/medium/low) [medium]: high
Priority (high/normal/low) [normal]: high
Environment/Module: Tour Management
Steps to reproduce (comma-separated): ...
Expected behavior: ...
Actual behavior: ...
Affected users/scope: ...
Business impact: ...
```

### Bước 3: QA Helper Tạo File Ngay Lập Tức ✅

**QUAN TRỌNG:** QA Helper sẽ:
1. ✅ **TẠO FILE NGAY LẬP TỨC** trong `Orchdocs/projects/{PROJECT_ID}/Issue/`
2. ✅ **CẤU TRÚC PHẲNG**: `{PROJECT_ID}-issue-{NUMBER}-{TITLE}.md` (KHÔNG tạo thư mục con)
3. ✅ **Điền tự động** tất cả thông tin vào markdown
4. ✅ **Hiển thị đường dẫn** file đã tạo:
   ```
   ✅ Issue file created successfully!
   📁 Location: d:\QA-Project\Orchdocs\projects\minhviet\Issue\minhviet-issue-001-TourOrderPnL.md
   📄 Flat structure: minhviet-issue-001-TourOrderPnL.md
   ```

### Bước 4: User Xác Nhận & Submit

QA Helper hỏi:
```
👤 Do you want to SUBMIT this issue to Orchestrator? (yes/no):
```

- **Trả lời YES:** Issue được submit lên server
- **Trả lời NO:** File lưu dưới dạng draft (có thể submit sau bằng [3] Submit issue)

### Cấu Trúc File (PHẲNG - KHÔNG CÓ THƯMỤC CON):

```
✅ ĐÚNG:
Orchdocs/projects/minhviet/Issue/minhviet-issue-001-TourOrderPnL.md

❌ SAI (KHÔNG tạo thư mục con):
Orchdocs/projects/minhviet/Issue/minhviet-issue-001-TourOrderPnL/minhviet-issue-001-TourOrderPnL.md
```

---

## 📋 QA Issue Workflow

### **Phase 1: Create & Submit Issue**
1. ✅ QA chạy qa-helper:
   ```bash
   cd agents/[qa-agent-name]
   node ../roles/qa/qa-helper-v6.0.js
   # Chọn [2] Create issue
   ```

2. ✅ QA Helper hỏi chi tiết issue (ID, Title, Description, Severity, Priority, etc.)

3. ✅ **QA Helper TỰ ĐỘNG TẠO FILE** trong `Orchdocs/projects/{PROJECT_ID}/Issue/{PROJECT_ID}-issue-{NUMBER}-{TITLE}.md`
   - ✅ Cấu trúc PHẲNG (flat structure - không có subdirectories)
   - ✅ Tự động điền tất cả thông tin vào markdown
   - ✅ Hiển thị đường dẫn file đã tạo

4. ✅ QA Helper hỏi: "Bạn có muốn SUBMIT issue này không?"
   - **YES:** Submit lên server (tạo JSON tự động)
   - **NO:** File lưu dưới dạng draft (có thể submit sau)

5. 🔄 Orchestrator tự động tạo JSON: `{PROJECT_ID}-issue-{NUMBER}.json`

### **Phase 2: Assign Issue to Dev**
6. ✅ QA chạy qa-helper và chọn [5] Assign issue to dev
7. ✅ QA nhập Issue ID và Dev username
8. ✅ Dev nhận issue assignment tự động
9. ✅ Dev start implementing fix

### **Phase 3: Dev Implements & Submits**
10. ✅ Dev implement fix theo issue requirements
11. ✅ Dev test fix locally
12. ✅ Dev chạy dev-helper
13. ✅ Dev chọn: "Do you want to implement an issue fix?"
14. ✅ Dev nhập Issue ID, implementation message, files modified
15. ✅ Dev submit issue implementation cho QA

### **Phase 4: QA Reviews & Tests**
16. ✅ QA chạy qa-helper và chọn [6] Verify issue implementation
17. ✅ QA nhập Issue ID
18. ✅ QA run tests (unit + integration từ qa-helper)
19. ✅ QA test thực tế (verify lỗi fixed)
20. ✅ QA choose: Passed hay Failed
    - **Passed:** Issue resolved ✅, closed
    - **Failed:** Gửi feedback cho Dev, Dev reimplement

---

## 📌 Naming Convention

### Folder & File Structure (FLAT - CẤU TRÚC PHẲNG)

- **Folder Path:** `Orchdocs/projects/{PROJECT_ID}/Issue/` (chỉ 1 thư mục Issue cho tất cả issues)
- **File Name:** `{PROJECT_ID}-issue-{NUMBER}-{TITLE}.md` (file lưu trực tiếp trong Issue folder)
- **JSON Auto:** `{PROJECT_ID}-issue-{NUMBER}.json` (tự động tạo khi submit)

**⚠️ KHÔNG TẠO SUBDIRECTORIES CON!**

### Naming Rules

- **Project ID:** `trading-erp-mcp`, `bflow`, `hqg`, `minhviet`, `habour`, `orchestrator-center`
- **Number:** Bắt đầu từ 001 trong mỗi project, tăng dần (+1)
  - Mỗi project có số thứ tự riêng
  - trading-erp-mcp-issue-001, 002, 003...
  - bflow-issue-001, 002, 003...
- **Title:** Tên chi tiết của issue (CamelCase hoặc Space-separated)
  - LoginPageCrash
  - PerformanceLag
  - DataLossOnSync

### Ví dụ Đầy Đủ

**Habour Project (PHẲNG):**
```
Orchdocs/projects/habour/Issue/
├── habour-issue-001-LoginPageCrash.md      ✅ Direct files
├── habour-issue-002-DataSync.md            ✅ No subfolders
├── habour-issue-001.json                   ✅ Auto-generated
├── habour-issue-002.json
└── ...
```

**Trading ERP Project (PHẲNG):**
```
Orchdocs/projects/trading-erp-mcp/Issue/
├── trading-erp-mcp-issue-001-LoginCrash.md   ✅ Direct files
├── trading-erp-mcp-issue-002-PerformanceLag.md ✅ No subfolders
├── trading-erp-mcp-issue-003-DataLoss.md      ✅
├── trading-erp-mcp-issue-001.json             ✅ Auto-generated
├── trading-erp-mcp-issue-002.json
├── trading-erp-mcp-issue-003.json
└── ...
```

**Mình Việt Project (PHẲNG):**
```
Orchdocs/projects/minhviet/Issue/
├── minhviet-issue-001-TourOrderPnL.md      ✅ Correct flat structure
├── minhviet-issue-001.json
└── ...
```

---

## 🎯 Severity & Priority Levels

### Severity (Technical Impact)
- **critical:** Hệ thống không chạy, crash, mất dữ liệu
- **high:** Chức năng chính bị ảnh hưởng, không thể làm việc
- **medium:** Chức năng phụ bị ảnh hưởng, workaround có
- **low:** UI/UX nhỏ, performance slow, documentation missing

### Priority (Business Impact)
- **high:** Khách hàng lớn, tác động doanh thu, deadline gấp
- **normal:** Khách hàng bình thường, tác động vừa phải
- **low:** Feature request, nice-to-have, không deadline gấp

---

## 📋 Issue Status

| Status | Description | Who | Action |
|--------|-------------|-----|--------|
| draft | Đang soạn thảo | QA | Hỏi user trước submit |
| submitted | Đã gửi lên Orchestrator | QA | Chờ assign |
| assigned | Được gán cho Dev | QA | Dev bắt đầu implement |
| in_progress | Dev đang fix | Dev | Implement + test locally |
| resolved | Dev submit fix | QA | Test + verify |
| closed | Issue đã fix xong | QA | Archive |

---

## 📚 Template

**QA Helper sẽ TỰ ĐỘNG tạo file từ template!**

File `_templates/issue-template.md` được sử dụng bởi QA Helper để tự động tạo markdown content với tất cả thông tin đã điền.

**QA không cần:**
- ❌ Copy template thủ công
- ❌ Thay tên file
- ❌ Điền header info
- ❌ Tạo folder

**QA chỉ cần:**
- ✅ Chạy qa-helper
- ✅ Trả lời câu hỏi
- ✅ Xác nhận submit (yes/no)

---

## 🔗 Issue vs Design vs Task

| Loại | Ai tạo | Mục đích | Workflow |
|------|--------|---------|----------|
| **Design (Des-XXX)** | BA | Thiết kế feature mới | BA → submit → PM approve → Dev implement |
| **Task (TASK-XXX)** | PM | Gán task implementation | PM assign → Dev implement → QA test |
| **Issue (issue-XXX)** | QA | Báo lỗi từ khách hàng | QA create → assign Dev → Dev fix → QA verify |

---

## 📖 Related Documents

- [QA Role Guide](../agents/roles/qa/README.md)
- [Issue Template](_templates/issue-template.md)
- [Design Guide](./Design.md)
- [Development Reports](./Report.md)
- [Sprint Planning](./Sprint.md)

---

**Guide Version:** 1.0 | **Last Updated:** 2025-10-23
