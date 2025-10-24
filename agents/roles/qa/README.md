# Quality Assurance (QA) Role Guide

## 🎯 QA Test & Approve Development Work

QA role chịu trách nhiệm **test code từ Dev** và **approve/reject** những submissions.

---

## 📖 HỌC TRƯỚC KHI BẮT ĐẦU

**Bạn PHẢI đọc hướng dẫn QA workflow:**

**📂 Đọc tại:** [QA_ROLE_CONTEXT.md](./QA_ROLE_CONTEXT.md)

**Lý do phải đọc:**
- ✅ Hiểu quy trình testing và approval
- ✅ Biết cách sử dụng qa-helper tools
- ✅ Hiểu criteria để approve/reject
- ✅ Biết cách ghi nhận test results

---

## 🚀 Quy Trình Nhanh

### Quy Trình Ba Bước:

1. **Get Dev Submissions**
   - Sử dụng qa-helper script để lấy danh sách submissions
   - Chọn submission cần test

2. **Test Development Work**
   - Run unit tests
   - Run integration tests
   - Verify business logic
   - Check code quality
   - Ghi nhận kết quả test

3. **Approve or Reject**
   - Nếu tất cả tests pass → Approve
   - Nếu có test failed → Reject với feedback cụ thể
   - Dev sẽ fix và resubmit nếu reject

---

## 📋 QA Workflow

```
1. Get submissions → await qa.getAllSubmissions()
   ↓
2. Run unit tests → await qa.runUnitTests(assignmentId)
   ↓
3. Run integration tests → await qa.runIntegrationTests(assignmentId)
   ↓
4. Verify results → Check all tests pass
   ↓
5. Decision point:
   ├─ All pass? → Approve: await qa.approveSubmission(assignmentId)
   └─ Failed? → Reject: await qa.rejectSubmission(assignmentId, feedback)
```

---

## ⚠️ Quan Trọng

**QA KHÔNG cần:**
- ❌ Tạo tài liệu (BA/PM/Dev làm)
- ❌ Chỉnh sửa code (Dev làm)
- ❌ Test own code (nếu QA có dev role)

**QA PHẢI:**
- ✅ Đọc QA_ROLE_CONTEXT.md để hiểu quy trình chi tiết
- ✅ Run đầy đủ test suites
- ✅ Ghi nhận test results rõ ràng
- ✅ Approve nếu tất cả tests pass
- ✅ Reject nếu có test failed, kèm feedback cụ thể
- ✅ **KHÔNG approve code sai** chỉ vì "gần xong rồi"

---

## 🔗 Links Quan Trọng

- **QA Context:** [QA_ROLE_CONTEXT.md](./QA_ROLE_CONTEXT.md) ← **ĐỌC CÁI NÀY TRƯỚC!**
- **QA Helper:** [qa-helper-v6.0.js](./qa-helper-v6.0.js)

---

**QA thực hiện: Get submissions → Test → Approve/Reject**
