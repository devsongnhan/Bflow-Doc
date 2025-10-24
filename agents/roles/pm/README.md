# Project Manager (PM) Role Guide

## 🎯 PM Tạo Sprint Planning Cho Orchestrator

### 📖 HỌC TRƯỚC KHI BẮT ĐẦU

**Bạn PHẢI đọc hướng dẫn cách tạo sprint:**

**📂 Đọc tại:** [Orchdocs/Sprint.md](../../../Orchdocs/Sprint.md)

**Lý do phải đọc:**
- ✅ Hiểu cấu trúc folder sprint planning
- ✅ Học cách sử dụng template
- ✅ Biết quy trình tạo → hỏi user → register
- ✅ Hiểu cách link tới design documents

---

## 🚀 Quy Trình Tổng Quan

### Quy Trình Ba Bước:

1. **Tạo sprint planning document**
   - Tạo folder theo naming convention: `Sprint-{NUMBER}-{NAME}`
   - Copy template vào folder
   - Đặt tên file: `{FOLDER_NAME}.md`
   - Điền header (Sprint ID, Project, PM name, Timeline)
   - Thêm links tới design documents từ Orchdocs/Design/
   - Thêm tasks với timeline chi tiết

2. **Hỏi User Trước Register**
   - Thông báo sprint hoàn thành
   - Hỏi user có muốn register không?
   - **CHỈ khi user đồng ý mới register**

3. **Register Lên Orchestrator**
   - Sử dụng register-sprint script
   - Orchestrator tự động tạo JSON
   - PM sẽ assign tasks cho developers

---

## 📋 Naming Convention

- **Folder:** `Sprint-{NUMBER}-{NAME}` (e.g., Sprint-001, Sprint-002, Sprint-003, ...)
- **File:** Cùng tên folder + `.md` extension
- **Sprint ID:** `Sprint-{NUMBER}-{NAME}` (phải có tên feature/epic)

---

## ⚠️ Quan Trọng

**PM KHÔNG cần:**
- ❌ Tạo JSON file (auto-generated khi register)
- ❌ Tự động register mà không hỏi user

**PM PHẢI:**
- ✅ Đọc Orchdocs/Sprint.md để hiểu quy trình chi tiết
- ✅ Tạo folder + file theo naming convention
- ✅ Điền timeline + design links + tasks
- ✅ **HỎI USER trước khi register**
- ✅ Chỉ register khi user đồng ý
- ✅ Link tới design documents từ Orchdocs/Design/

---

## 🔗 Links Quan Trọng

- **Sprint Template:** [Orchdocs/_templates/sprint-template.md](../../../Orchdocs/_templates/sprint-template.md)
- **Sprint Guide:** [Orchdocs/Sprint.md](../../../Orchdocs/Sprint.md) ← **ĐỌC CÁI NÀY TRƯỚC!**

---

**PM thực hiện: Tạo sprint → Hỏi user → Register**
