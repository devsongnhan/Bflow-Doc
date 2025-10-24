---
project_id: bflow
issue_id: bflow-issue-001
doc_type: issue
version: 1.0
created_date: 2025-10-23
updated_date: 2025-10-23
status: draft
severity: high
priority: high
location: "Orchdocs/projects/bflow/Issue/bflow-issue-001-OrderCOGSError.md"
---

# bflow-issue-001 - OrderCOGSError

**Issue ID:** bflow-issue-001
**Issue Title:** OrderCOGSError
**Project:** bflow
**Version:** 1.0
**Created:** 2025-10-23
**Updated:** 2025-10-23
**QA:** Hòa
**Status:** draft
**Severity:** high
**Priority:** high

---

## 📋 Issue Information

**Bug/Error Title:** Giá vốn hàng bán trong đơn hàng không đúng

**Description:** Khách hàng phàn nàn rằng giá vốn hàng bán (Cost of Goods Sold - COGS) trong các đơn hàng không được tính toán chính xác. Điều này ảnh hưởng trực tiếp đến báo cáo tài chính và lợi nhuận ròng.

**Severity:** high
- **critical:** Hệ thống không chạy, mất dữ liệu
- **high:** Chức năng chính bị ảnh hưởng ← **ĐÂY (Order Management)**
- **medium:** Chức năng phụ bị ảnh hưởng
- **low:** UI/UX nhỏ hoặc documentation

**Priority:** high - based on business impact (Financial accuracy is critical)

---

## 🔍 Details

### Expected Behavior
- Khi tạo đơn hàng bán, hệ thống phải tự động tính toán giá vốn hàng bán (COGS) dựa trên:
  - Giá vốn của sản phẩm tại thời điểm bán
  - Số lượng sản phẩm bán
  - Phương pháp định giá kho (FIFO, LIFO, hoặc bình quân)
- Giá vốn phải khớp với giá vốn trong kho hàng
- Báo cáo lợi nhuận phải chính xác dựa trên COGS đúng

### Actual Behavior
- Giá vốn hàng bán hiển thị giá trị sai so với dữ liệu thực tế
- Có thể sử dụng giá cũ, giá sai, hoặc không tính toán chính xác
- Báo cáo lợi nhuận không khớp với thực tế
- Khác biệt có thể lên tới X% (cần verify cụ thể từ khách hàng)

### Steps to Reproduce
1. Tạo một đơn hàng bán với sản phẩm
2. Kiểm tra giá vốn hàng bán (COGS) được tính
3. So sánh với giá vốn thực tế trong hệ thống kho
4. Xác nhận rằng giá vốn không khớp

### Environment
- **Module:** Order Management / Sales / Inventory Valuation
- **Affected Users:** Finance team, Sales team, Management (anyone using reports)
- **Business Impact:**
  - Báo cáo tài chính sai lệch
  - Lợi nhuận ròng không chính xác
  - Không thể đưa ra quyết định kinh doanh đúng
  - Khách hàng mất tin tưởng vào hệ thống

---

## 📊 Status Tracking

| Status | Assigned | Implemented | Tested | Resolved |
|--------|----------|-------------|--------|----------|
| draft | - | - | - | - |

---

*Issue created by Hòa on 2025-10-23*
