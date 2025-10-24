# Trading ERP - Issue Documents

Thư mục này chứa tất cả Issue (báo lỗi) từ khách hàng cho project **Trading ERP MCP**.

## 📝 Cấu trúc

```
Issue/
├── trading-erp-mcp-issue-001-LoginCrash/
│   ├── trading-erp-mcp-issue-001-LoginCrash.md
│   └── trading-erp-mcp-issue-001.json
├── trading-erp-mcp-issue-002-PerformanceLag/
│   └── trading-erp-mcp-issue-002-PerformanceLag.md
└── (more issues...)
```

## 🚀 Hướng dẫn

1. **Tạo folder**: `trading-erp-mcp-issue-{NUMBER}-{TITLE}`
2. **Copy template**: `../../_templates/issue-template.md`
3. **Điền thông tin**: Severity, Priority, Description, Steps to reproduce
4. **Submit với qa-helper**: Chạy `node ../../roles/qa/qa-helper-v6.0.js` → [3] Submit

## 📚 Tham khảo

- [Issue Management Guide](../../Issue.md)
- [Issue Template](../../_templates/issue-template.md)
