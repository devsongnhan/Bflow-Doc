# 📊 Report Generation Guide for Dev Agent

## 🎯 Mục Đích

Guide này hướng dẫn **Dev Agent** cách tạo báo cáo sprint một cách **đơn giản và hiệu quả**.

---

## ✅ Công Cụ Có Sẵn

### Helper Tool: `generate-report-helper.js`

**Location**: `agents/dev/generate-report-helper.js`

**Chức năng:**
- ✅ Đọc tự động queue.json
- ✅ Lấy N tasks gần nhất từ history
- ✅ Phân tích stats (passed, completed, failed)
- ✅ Tính success rate
- ✅ Generate markdown report
- ✅ Lưu vào `orchestrator/reports/`

**Usage:**

```bash
# Tạo báo cáo cho 10 tasks gần nhất
node agents/dev/generate-report-helper.js 10

# Tạo báo cáo cho 20 tasks
node agents/dev/generate-report-helper.js 20

# Mặc định: 10 tasks
node agents/dev/generate-report-helper.js
```

**Output:**

```
📊 Generating sprint report...
📋 Including 10 most recent tasks

✅ Report generated successfully!

📄 File: C:\trading-erp-mcp\orchestrator\reports\sprint-report-1760864728498.md
📊 Tasks: 10
✓ Success Rate: 100%
```

---

## 📋 Workflow Đơn Giản

### Bước 1: Generate Report

```javascript
const { generateSprintReport } = require('./orchestrator/dev/generate-report-helper.js');

const result = generateSprintReport(10);

console.log('✅ Report generated:', result.filepath);
console.log('📊 Stats:', result.stats);
```

### Bước 2: Create Report Task (Optional)

Nếu cần gửi cho PM review:

```javascript
const DevHelper = require('./orchestrator/dev/dev-helper-v4.1.js');
const dev = new DevHelper();

await dev.createTask('report', {
  title: `Sprint Report - ${result.taskCount} Tasks`,
  summary: `Completed ${result.taskCount} tasks with ${result.successRate}% success rate`,
  filepath: result.filepath,
  tasksIncluded: result.taskCount,
  stats: result.stats
});

console.log('📤 Report sent to PM for review');
```

---

## ❌ KHÔNG LÀM

### 🚫 Anti-Pattern 1: Tạo Nhiều Temp Files

```javascript
// ❌ SAI - tạo nhiều files rác
fs.writeFileSync('/tmp/get-passed-tasks.js', ...);
fs.writeFileSync('create-report-temp.js', ...);
fs.writeFileSync('generate-report-simple.js', ...);

// ✅ ĐÚNG - dùng helper
const result = generateSprintReport(10);
```

### 🚫 Anti-Pattern 2: Bash Escaping Hell

```bash
# ❌ SAI - escaping phức tạp, dễ lỗi syntax
node -e "const task = \${data}; console.log(\`\${task.id}\`);"

# ✅ ĐÚNG - chạy tool trực tiếp
node agents/dev/generate-report-helper.js 10
```

### 🚫 Anti-Pattern 3: Reinvent The Wheel

```javascript
// ❌ SAI - tự viết lại toàn bộ (50+ dòng)
const queue = JSON.parse(fs.readFileSync(...));
// ... phức tạp ...
let markdown = '# Report\n\n';
// ... 50+ dòng code ...

// ✅ ĐÚNG - dùng helper (1 dòng)
const result = generateSprintReport(10);
```

---

## 📝 Example Use Cases

### Use Case 1: End of Sprint Report

**User:** "Hãy lập báo cáo cho 10 task đã pass gần nhất"

**Dev Agent:**

```javascript
// Simple 1-liner
const { generateSprintReport } = require('./orchestrator/dev/generate-report-helper.js');
const result = generateSprintReport(10);

console.log('✅ Report:', result.filepath);
```

### Use Case 2: Weekly Review Report

**User:** "Tạo báo cáo tuần này - 15 tasks"

**Dev Agent:**

```javascript
const { generateSprintReport } = require('./orchestrator/dev/generate-report-helper.js');
const result = generateSprintReport(15);

console.log('📊 Weekly Report:');
console.log('   File:', result.filepath);
console.log('   Tasks:', result.taskCount);
console.log('   Success:', result.successRate + '%');
```

### Use Case 3: Report + Send to PM

**User:** "Báo cáo 20 tasks và gửi PM review"

**Dev Agent:**

```javascript
// 1. Generate
const { generateSprintReport } = require('./orchestrator/dev/generate-report-helper.js');
const result = generateSprintReport(20);

// 2. Send to PM
const DevHelper = require('./orchestrator/dev/dev-helper-v4.1.js');
const dev = new DevHelper();

await dev.createTask('report', {
  title: `Sprint Report - 20 Tasks`,
  summary: `${result.successRate}% success rate`,
  filepath: result.filepath,
  stats: result.stats
});

console.log('✅ Report generated and sent to PM');
```

---

## 🔧 Helper Tool API

### Function: `generateSprintReport(taskCount)`

**Parameters:**
- `taskCount` (number): Số lượng tasks gần nhất (default: 10)

**Returns:**
```javascript
{
  filepath: 'C:\\trading-erp-mcp\\orchestrator\\reports\\sprint-report-1760864728498.md',
  filename: 'sprint-report-1760864728498.md',
  content: '# Sprint Report - 10 Recent Tasks\n\n...',
  stats: {
    total: 10,
    passed: 6,
    completed: 4,
    failed: 0
  },
  successRate: 100,
  taskCount: 10
}
```

**Usage:**

```javascript
const { generateSprintReport } = require('./orchestrator/dev/generate-report-helper.js');

try {
  const result = generateSprintReport(10);

  console.log('Report file:', result.filepath);
  console.log('Stats:', result.stats);
  console.log('Success rate:', result.successRate + '%');

} catch (error) {
  console.error('Error:', error.message);
}
```

---

## 📊 Report Format

Helper tool tạo report theo format sau:

```markdown
# Sprint Report - 10 Recent Tasks

**Generated:** 2025-10-19T09:05:28.497Z
**Total Tasks in History:** 16

## Summary

- ✅ Passed: 6
- ✓ Completed: 4
- **Success Rate:** 100%

## Tasks Detail

### 1. OB006 - ✓ COMPLETED

**Name:** Initialize Opening Balance - Fixed Assets
**Vietnamese:** Khởi tạo số dư đầu kỳ cho tài sản cố định
**Completed:** 2025-10-19T08:48:34.384Z
**Created by:** dev
**Reviewed by:** qa

**Tests:** 6/6 passed (100%)

---

### 2. TEST001 - ✓ COMPLETED
...

## Conclusion

Successfully completed 10 tasks with 100% success rate.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

---

## 💡 Pro Tips

1. **Always use the helper tool**
   - Đã test kỹ
   - Đơn giản, nhanh
   - Không tạo temp files

2. **Check result before sending to PM**
   ```javascript
   const result = generateSprintReport(10);
   console.log('Preview:', result.content);  // Review trước
   // Nếu OK → tạo report task
   ```

3. **Include stats in report task**
   ```javascript
   await dev.createTask('report', {
     title: 'Sprint Report',
     filepath: result.filepath,
     stats: result.stats,  // PM dễ review
     successRate: result.successRate
   });
   ```

---

## 🎯 Tóm Tắt

**TL;DR - Dev Agent chỉ cần:**

```javascript
// 1 dòng để generate report
const result = require('./orchestrator/dev/generate-report-helper.js').generateSprintReport(10);
```

**Không cần:**
- ❌ Tạo temp files
- ❌ Bash escaping phức tạp
- ❌ Tự viết logic
- ❌ 50+ dòng code

**Chỉ cần:**
- ✅ 1 dòng gọi helper
- ✅ Done!

---

**Version:** 1.0
**Last Updated:** 2025-10-19
**Maintained by:** Orchestrator Team
