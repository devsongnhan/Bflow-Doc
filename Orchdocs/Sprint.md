# Sprint Planning Documents Guide

PM Sprint planning documents (Sprint-XXX) go here.

## 📁 Structure

Mỗi sprint là một folder theo sprint ID pattern:

```
projects/{PROJECT_ID}/Sprint/
├── Sprint-{NUMBER}-{NAME}/
│   ├── Sprint-{NUMBER}-{NAME}.md   (SOURCE OF TRUTH - edit this!)
│   └── Sprint-{NUMBER}.json        (auto-generated on register)
│
└── (sprints organized by sprint ID)
```

**Ví dụ:**
- `projects/trading-erp-mcp/Sprint/Sprint-001-Sales Module Phase 1/`
- `projects/bflow/Sprint/Sprint-001-Core Features/`
- `projects/hqg/Sprint/Sprint-001-HR Module/`

---

## 🚀 Quick Start - PM Tạo Sprint Planning

### Bước 1: Chọn Project

Xác định sprint này thuộc project nào. Ví dụ: `trading-erp-mcp`, `bflow`, `hqg`, `minhviet`, `habour`, hoặc `orchestrator-center`.

### Bước 2: Tạo Folder

Tạo folder trong `projects/{PROJECT_ID}/Sprint/` theo naming convention: `Sprint-{NUMBER}-{NAME}`

```bash
# Ví dụ:
mkdir "projects/trading-erp-mcp/Sprint/Sprint-001-Sales Module Phase 1"
```

### Bước 3: Copy Template Vào Folder

Copy file template từ `_templates/sprint-template.md` vào folder vừa tạo.
Đặt tên file giống tên folder + `.md` extension.

```bash
cp _templates/sprint-template.md "projects/trading-erp-mcp/Sprint/Sprint-001-Sales Module Phase 1/Sprint-001-Sales Module Phase 1.md"
```

### Bước 4: Điền Thông Tin

Mở file template và điền:
- **Header:** Sprint ID, Project, PM name, Timeline (Start/End dates), Status
- **Timeline:** Start date, End date, Duration
- **Tài liệu Design Liên Quan:** Thêm links tới design documents từ `projects/{PROJECT_ID}/Design/`
  - List các designs mà sprint này sẽ implement
  - Links tới từng `Des-XXX` folder
- **Tasks section:** Mô tả từng task chi tiết
  - ID & Title
  - Transaction Code (nếu có)
  - Priority (high, medium, low)
  - Estimated Hours
  - Complexity
  - Description
  - Status (planned, assigned, in_progress, submitted, completed, blocked)

### Bước 5: Hỏi User Trước Register

**BẮT BUỘC:** Luôn hỏi user trước khi register:
- Thông báo: "Em đã tạo sprint planning. Anh/chị có muốn em đăng ký không?"
- **CHỈ register nếu user đồng ý**

### Bước 6: Register & Assign

Sử dụng register-sprint script để register lên Orchestrator, rồi assign tasks cho developers.

```bash
cd agents/[pm-agent-name]
node ../roles/pm/pm-helper-v6.0.js
```

---

## 📋 Workflow

1. ✅ PM chọn project
2. ✅ PM tạo folder theo naming convention
3. ✅ PM copy template và đặt tên file
4. ✅ PM điền timeline, design links, tasks chi tiết
5. 🔴 **PM PHẢI HỎI USER** - "Anh/chị có muốn em register không?"
6. ✅ PM registers (nếu user đồng ý)
7. 🔄 Orchestrator tự động tạo JSON (Sprint-{NUMBER}.json)
8. 👤 PM assign tasks cho developers

---

## 📌 Naming Convention

- **Folder Path:** `projects/{PROJECT_ID}/Sprint/Sprint-{NUMBER}-{NAME}/`
- **File:** `Sprint-{NUMBER}-{NAME}.md`
- **Number:** Sequential sprint number (001, 002, 003, ...) trong mỗi project
- **Name:** Sprint name (CamelCase hoặc Space-separated)
- **Design Links:** Tham chiếu tới `projects/{PROJECT_ID}/Design/Des-XXX` folders

**Projects:** `trading-erp-mcp`, `orchestrator-center`, `bflow`, `hqg`, `minhviet`, `habour`

---

## 📚 Template

Mở file `_templates/sprint-template.md` để xem mẫu cấu trúc. PM chỉ cần:
- Copy template
- Thay tên Sprint ID & Name (đặc biệt là project ID)
- Điền timeline (start/end dates)
- Thêm design document links từ `projects/{PROJECT_ID}/Design/`
- Thêm tasks chi tiết (ID, priority, hours, description)
- Register!

---

## 📖 Related Documents

- [PM Role Guide](../agents/roles/pm/README.md)
- [Sprint Template](_templates/sprint-template.md)
- [Design Documents](./Design.md)
- [Development Reports](./Report.md)

---

**Guide Version:** 1.0 | **Last Updated:** 2025-10-23
