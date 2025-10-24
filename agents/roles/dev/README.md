# Developer (Dev) Role Guide

## 🎯 Dev Tạo Development Reports Cho Orchestrator

### 📖 HỌC TRƯỚC KHI BẮT ĐẦU

**Bạn PHẢI đọc hướng dẫn cách tạo development report:**

**📂 Đọc tại:** [Orchdocs/Report.md](../../../Orchdocs/Report.md)

**Lý do phải đọc:**
- ✅ Hiểu cấu trúc folder development report
- ✅ Học cách sử dụng template
- ✅ Biết quy trình tạo → hỏi user → submit
- ✅ Hiểu cách mô tả thực hiện từng task

---

## 🚀 Quy Trình Tổng Quan

### Quy Trình Ba Bước:

1. **Tạo development report**
   - Tạo folder theo naming convention: `Report-Sprint-{NUMBER}`
   - Copy template vào folder
   - Đặt tên file: `{FOLDER_NAME}.md`
   - Điền header (Report ID, Sprint, Developer name, Status)
   - Thêm link tới sprint document từ Orchdocs/Sprint/
   - Mô tả chi tiết thực hiện từng task

2. **Hỏi User Trước Submit**
   - Thông báo report hoàn thành
   - Hỏi user có muốn submit không?
   - **CHỈ khi user đồng ý mới submit**

3. **Submit Lên Orchestrator**
   - Sử dụng dev-helper script
   - Orchestrator tự động tạo JSON
   - PM sẽ review

---

## 📋 Naming Convention

- **Folder:** `Report-Sprint-{NUMBER}` (e.g., Report-Sprint-001, Report-Sprint-002, ...)
- **File:** Cùng tên folder + `.md` extension
- **Report ID:** `Report-Sprint-{NUMBER}`

---

## ⚠️ Quan Trọng

**Dev KHÔNG cần:**
- ❌ Tạo JSON file (auto-generated khi submit)
- ❌ Tự động submit mà không hỏi user

**Dev PHẢI:**
- ✅ Đọc Orchdocs/Report.md để hiểu quy trình chi tiết
- ✅ Tạo folder + file theo naming convention
- ✅ Mô tả chi tiết thực hiện từng task
- ✅ **HỎI USER trước khi submit**
- ✅ Chỉ submit khi user đồng ý
- ✅ Link tới sprint document từ Orchdocs/Sprint/

---

## 🔗 Links Quan Trọng

- **Report Template:** [Orchdocs/_templates/report-template.md](../../../Orchdocs/_templates/report-template.md)
- **Report Guide:** [Orchdocs/Report.md](../../../Orchdocs/Report.md) ← **ĐỌC CÁI NÀY TRƯỚC!**

---

**Dev thực hiện: Tạo report → Hỏi user → Submit**
