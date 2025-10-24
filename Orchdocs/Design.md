# Design Documents Guide

BA Design documents (Des-XXX) go here.

## 📁 Structure

Mỗi design document là một folder theo naming convention:

```
projects/{PROJECT_ID}/Design/
├── Des-{NUMBER}-{EPIC_NAME}/
│   ├── Des-{NUMBER}-{EPIC_NAME}.md       (SOURCE OF TRUTH - edit this!)
│   └── Des-{NUMBER}.json                 (auto-generated on submit)
│
└── (documents organized by design ID)
```

**Ví dụ:**
- `projects/trading-erp-mcp/Design/Des-001-Sales Invoice/`
- `projects/bflow/Design/Des-001-Workflow Engine/`
- `projects/hqg/Design/Des-001-Employee Management/`

---

## 🚀 Quick Start - BA Tạo Design Document

### Bước 1: Chọn Project

Xác định design này thuộc project nào. Ví dụ: `trading-erp-mcp`, `bflow`, `hqg`, `minhviet`, `habour`, hoặc `orchestrator-center`.

### Bước 2: Tạo Folder

Tạo folder trong `projects/{PROJECT_ID}/Design/` theo naming convention: `Des-{NUMBER}-{EPIC_NAME}`

```bash
# Ví dụ:
mkdir "projects/trading-erp-mcp/Design/Des-001-Sales Invoice"
```

### Bước 3: Copy Template Vào Folder

Copy file template từ `_templates/design-template.md` vào folder vừa tạo.
Đặt tên file giống tên folder + `.md` extension.

```bash
cp _templates/design-template.md "projects/trading-erp-mcp/Design/Des-001-Sales Invoice/Des-001-Sales Invoice.md"
```

### Bước 4: Điền Thông Tin

Mở file template và điền:
- **Header:** Document ID, Project, BA name, Status
- **REQUIRED READING section:** Thêm links tới tài liệu tham chiếu
- **Mô tả nhanh:** Ngắn gọn mô tả từng tài liệu tham chiếu
- **Thông tin cơ bản:** Mô tả chi tiết về feature/epic
- **Requirements:** Danh sách requirements chi tiết
- **Technical specs:** Thiết kế kỹ thuật

### Bước 5: Hỏi User Trước Submit

**BẮT BUỘC:** Luôn hỏi user trước khi submit:
- Thông báo: "Em đã tạo tài liệu thiết kế. Anh/chị có muốn em submit không?"
- **CHỈ submit nếu user đồng ý**

### Bước 6: Submit

Sử dụng ba-helper script để submit lên Orchestrator.

```bash
cd agents/[ba-agent-name]
node ../roles/ba/ba-helper-v6.0.js
```

---

## 📋 Workflow

1. ✅ BA chọn project
2. ✅ BA tạo folder theo naming convention
3. ✅ BA copy template và đặt tên file
4. ✅ BA điền thông tin (header, links, requirements, specs)
5. 🔴 **BA PHẢI HỎI USER** - "Anh/chị có muốn em submit không?"
6. ✅ BA submits (nếu user đồng ý)
7. 🔄 Orchestrator tự động tạo JSON (Des-{NUMBER}.json)
8. 👤 PM review và approve/reject

---

## 📌 Naming Convention

- **Folder Path:** `projects/{PROJECT_ID}/Design/Des-{NUMBER}-{EPIC_NAME}/`
- **File:** `Des-{NUMBER}-{EPIC_NAME}.md`
- **Number:** Bắt đầu từ 001 trong mỗi project, increment (+1)
- **Name:** Tên chi tiết của epic/feature (CamelCase hoặc Space-separated)

**Projects:** `trading-erp-mcp`, `orchestrator-center`, `bflow`, `hqg`, `minhviet`, `habour`

---

## 📚 Template

Mở file `_templates/design-template.md` để xem mẫu cấu trúc. BA chỉ cần:
- Copy template
- Thay tên
- Điền header info (đặc biệt là project ID)
- Thêm links tham chiếu
- Điền requirements & technical specs
- Submit!

---

## 📖 Related Documents

- [BA Role Guide](../agents/roles/ba/README.md)
- [Design Template](_templates/design-template.md)
- [Related Sprints](./Sprint.md)
- [Development Reports](./Report.md)

---

**Guide Version:** 1.0 | **Last Updated:** 2025-10-23
