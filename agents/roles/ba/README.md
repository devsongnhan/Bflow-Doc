# Business Analyst (BA) Role Guide

## 🎯 BA Tạo Design Documents Cho Orchestrator

### 📖 HỌC TRƯỚC KHI BẮT ĐẦU

**Bạn PHẢI đọc hướng dẫn cách tạo design document:**

**📂 Đọc tại:** [Orchdocs/Design.md](../../../Orchdocs/Design.md)

**Lý do phải đọc:**
- ✅ Hiểu cấu trúc folder tài liệu thiết kế
- ✅ Học cách sử dụng template
- ✅ Biết quy trình tạo → hỏi user → submit
- ✅ Hiểu naming convention (Des-XXX-Epic Name)

---

## 🚀 Quy Trình Tổng Quan

### Quy Trình Ba Bước:

1. **Tạo tài liệu thiết kế**
   - Tạo folder theo naming convention: `Des-{NUMBER}-{EPIC_NAME}`
   - Copy template vào folder
   - Đặt tên file: `{FOLDER_NAME}.md`
   - Điền header (Document ID, Project, BA name, Status)
   - Thêm links tới tài liệu tham chiếu (không cần đọc nội dung)

2. **Hỏi User Trước Submit**
   - Thông báo tài liệu hoàn thành
   - Hỏi user có muốn submit không?
   - **CHỈ khi user đồng ý mới submit**

3. **Submit Lên Orchestrator**
   - Sử dụng **ba-helper-v6.0.js** script
   - Orchestrator tự động tạo JSON
   - PM sẽ review

---

## 🔧 BA Helper V6.0

**BA Helper** cung cấp các hàm để quản lý documents:

### Installation
```bash
# Navigate tới thư mục của BA agent
cd agents/{ba_agent_username}

# Chạy ba-helper để xem tất cả documents
node ../../roles/ba/ba-helper-v6.0.js
```

### Các Hàm Chính

#### 1. Tạo Design Document
```javascript
const baHelper = require('../../roles/ba/ba-helper-v6.0.js');

const doc = await baHelper.createDocument('design', {
    title: 'Sales Invoice Feature Design',
    description: 'Design for SR001 - Sales Invoice transaction',
    content: {
        title: 'SR001 - Bán hàng lấy tiền ngay',
        description: 'Tài liệu thiết kế cho nghiệp vụ bán hàng lấy tiền ngay',
        requirements: [
            'Ghi nhận doanh thu ngay',
            'Ghi công nợ phải trả',
            'Xuất kho hàng hóa'
        ],
        account_determination: {
            revenue: 'TK 511 (Doanh thu bán hàng)',
            cost: 'TK 632 (Giá vốn hàng bán)'
        }
    },
    metadata: {
        project: 'trading-erp-mcp',
        version: '1.0'
    }
});
```

#### 2. Submit Document Cho PM
```javascript
// Sau khi user phê duyệt, submit tài liệu
const result = await baHelper.submitDocument(doc.doc_id,
    'Please review this design document for Sales Invoice'
);
```

#### 3. Xem Documents Của Bạn
```javascript
// Xem tất cả documents
const allDocs = await baHelper.getMyDocuments();

// Xem pending documents (chưa được PM review)
const pending = await baHelper.getPendingDocuments();

// Xem approved documents
const approved = await baHelper.getApprovedDocuments();

// Xem rejected documents
const rejected = await baHelper.getRejectedDocuments();
```

#### 4. Xem Feedback Từ PM
```javascript
// Lấy feedback từ PM
const feedback = await baHelper.getDocumentFeedback(doc.doc_id);
console.log(feedback.status);      // pending, approved, rejected
console.log(feedback.feedback);    // PM's review comment
```

---

## 📋 Naming Convention

- **Folder:** `Des-{NUMBER}-{EPIC_NAME}` (e.g., Des-001, Des-002, Des-003, ...)
- **File:** Cùng tên folder + `.md` extension
- **Document ID:** `Des-{NUMBER}-{EPIC_NAME}` (phải có tên epic)

---

## ⚠️ Quan Trọng

**BA KHÔNG cần:**
- ❌ Đọc tài liệu tham chiếu để hiểu nội dung
- ❌ Tự tạo JSON file (auto-generated khi submit)
- ❌ Tự động submit mà không hỏi user

**BA PHẢI:**
- ✅ Đọc Orchdocs/Design.md để hiểu quy trình chi tiết
- ✅ Tạo folder + file theo naming convention
- ✅ Điền header + links tài liệu tham chiếu
- ✅ **HỎI USER trước khi submit**
- ✅ Chỉ submit khi user đồng ý
- ✅ Sử dụng **ba-helper** để submit documents

---

## 🔗 Links Quan Trọng

- **Design Template:** [Orchdocs/_templates/design-template.md](../../../Orchdocs/_templates/design-template.md)
- **Design Guide:** [Orchdocs/Design.md](../../../Orchdocs/Design.md) ← **ĐỌC CÁI NÀY TRƯỚC!**
- **BA Helper Script:** [ba-helper-v6.0.js](./ba-helper-v6.0.js) ← **SỬ DỤNG ĐỂ SUBMIT DOCUMENTS**

---

**BA thực hiện: Tạo tài liệu → Hỏi user → Submit bằng ba-helper**
