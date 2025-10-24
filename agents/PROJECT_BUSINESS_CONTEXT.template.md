# Project Business Context Template

## 📌 Mục đích
File này chứa **nghiệp vụ đặc thù** của dự án mà agents cần hiểu để làm việc hiệu quả.

## 🔧 Cách sử dụng

1. **Copy template này** sang file mới: `PROJECT_BUSINESS_CONTEXT.md`
2. **Điền thông tin** nghiệp vụ của dự án vào các section bên dưới
3. **Tham chiếu** từ agent README: Thêm link đến file này ở cuối mỗi agent README

## 📝 Template

```markdown
# Project Business Context: [TÊN DỰ ÁN]

## 📋 Thông tin dự án

- **Tên dự án**: [Tên đầy đủ]
- **Ngành nghề**: [Ví dụ: Kế toán tài chính, ERP, E-commerce, v.v.]
- **Phạm vi**: [Mô tả ngắn gọn phạm vi dự án]
- **Công nghệ chính**: [Các công nghệ được sử dụng]

## 🎯 Domain Knowledge (Kiến thức nghiệp vụ)

### Business Analyst (BA) cần biết:
- [Mô tả kiến thức nghiệp vụ mà BA cần có]
- [Ví dụ: Hiểu sâu về quy trình kế toán VAS, biết các loại chứng từ...]
- [Standards, regulations cần tuân thủ]

### Developer (Dev) cần biết:
- [Mô tả kiến thức nghiệp vụ mà Dev cần có]
- [Ví dụ: Hiểu cách tính toán bút toán kế toán, các rule nghiệp vụ...]
- [Business rules đặc thù của dự án]

### Quality Assurance (QA) cần biết:
- [Mô tả kiến thức nghiệp vụ mà QA cần có]
- [Ví dụ: Biết cách validate số dư tài khoản, kiểm tra logic nghiệp vụ...]
- [Test scenarios nghiệp vụ quan trọng]

### Project Manager (PM) cần biết:
- [Mô tả kiến thức nghiệp vụ mà PM cần có]
- [Ví dụ: Hiểu workflow nghiệp vụ để ưu tiên tasks...]
- [Stakeholders và requirements đặc thù]

## 📚 Tài liệu tham khảo

### Standards & Regulations
- [Link hoặc mô tả các chuẩn cần tuân thủ]
- [Ví dụ: VAS - Vietnam Accounting Standards]
- [Luật, quy định liên quan]

### Business Rules
- [Các quy tắc nghiệp vụ quan trọng]
- [Ví dụ: Quy tắc đánh số chứng từ, quy tắc bút toán...]

### Domain Glossary (Thuật ngữ)
- **[Thuật ngữ 1]**: [Định nghĩa]
- **[Thuật ngữ 2]**: [Định nghĩa]
- **[Thuật ngữ 3]**: [Định nghĩa]

## 🔗 Files nghiệp vụ quan trọng

### Config/Data Files
- `[path/to/file1]` - [Mô tả công dụng]
- `[path/to/file2]` - [Mô tả công dụng]

### Documentation
- `[path/to/doc1.md]` - [Mô tả tài liệu]
- `[path/to/doc2.md]` - [Mô tả tài liệu]

## ⚠️ Lưu ý đặc biệt

### DO (Nên làm):
- ✅ [Quy tắc 1]
- ✅ [Quy tắc 2]
- ✅ [Quy tắc 3]

### DON'T (Không nên):
- ❌ [Điều cấm 1]
- ❌ [Điều cấm 2]
- ❌ [Điều cấm 3]

## 🎯 Workflows nghiệp vụ

### Workflow 1: [Tên workflow]
```
[Mô tả step-by-step workflow nghiệp vụ]
1. [Step 1]
2. [Step 2]
3. [Step 3]
```

### Workflow 2: [Tên workflow]
```
[Mô tả step-by-step workflow nghiệp vụ]
```

## 📊 Data Models nghiệp vụ

### Entity 1: [Tên entity]
- **Mục đích**: [Mô tả]
- **Key fields**: [Liệt kê các trường quan trọng]
- **Business rules**: [Quy tắc liên quan]

### Entity 2: [Tên entity]
- **Mục đích**: [Mô tả]
- **Key fields**: [Liệt kê các trường quan trọng]
- **Business rules**: [Quy tắc liên quan]

---

**Updated**: [Ngày tháng năm]
**Maintainer**: [Tên người maintain]
```

## 💡 Example Usage

Sau khi điền thông tin, thêm vào cuối mỗi agent README:

```markdown
## 🔗 Related Documentation

- [Developer Role Context](../roles/dev/DEV_ROLE_CONTEXT.md)
- [Agents README](../README.md)
- [Roles README](../roles/README.md)
- [System Config](../../orchestrator/shared/config-v6.0.json)
- **[Project Business Context](../../PROJECT_BUSINESS_CONTEXT.md)** ← Nghiệp vụ dự án

---
```

## 📁 Cấu trúc đề xuất

```
Orchestrator-Center/
├── agents/
│   ├── PROJECT_BUSINESS_CONTEXT.md  ← File nghiệp vụ thực tế
│   ├── PROJECT_BUSINESS_CONTEXT.template.md  ← Template
│   ├── hai/
│   │   └── README.md  ← Tham chiếu đến PROJECT_BUSINESS_CONTEXT.md
│   ├── phuc/
│   │   └── README.md  ← Tham chiếu đến PROJECT_BUSINESS_CONTEXT.md
│   └── ...
```
