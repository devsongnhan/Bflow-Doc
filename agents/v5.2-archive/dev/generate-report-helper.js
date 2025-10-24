#!/usr/bin/env node

/**
 * REPORT GENERATION HELPER FOR DEV AGENT
 *
 * Tạo báo cáo và tự động gửi task cho PM (1 lệnh duy nhất!)
 * Usage: node agents/dev/generate-report-helper.js [count]
 */

const fs = require('fs');
const path = require('path');

/**
 * Generate sprint report AND create task for PM
 * @param {number} taskCount - Number of recent tasks to include (default: 10)
 * @param {boolean} autoCreateTask - Automatically create task for PM (default: true)
 * @returns {object} Report data, filepath, and task info
 */
async function generateSprintReport(taskCount = 10, autoCreateTask = true) {
    // Read queue.json
    const queuePath = path.join(__dirname, '../shared/queue.json');
    const queue = JSON.parse(fs.readFileSync(queuePath, 'utf-8'));

    const history = queue.history.transaction || [];
    const recentTasks = history.slice(-taskCount).reverse();

    if (recentTasks.length === 0) {
        throw new Error('No completed tasks found to generate report');
    }

    // Analyze tasks
    const stats = {
        total: recentTasks.length,
        passed: 0,
        completed: 0,
        failed: 0
    };

    recentTasks.forEach(task => {
        if (task.status === 'passed') stats.passed++;
        else if (task.status === 'completed') stats.completed++;
        else stats.failed++;
    });

    const successRate = Math.round((stats.passed + stats.completed) / stats.total * 100);

    // Detect duplicate tasks
    const taskCodes = {};
    const duplicates = [];
    recentTasks.forEach(task => {
        const code = task.data?.transaction_code || task.id;
        if (taskCodes[code]) {
            taskCodes[code]++;
            if (taskCodes[code] === 2) {
                duplicates.push(code);
            }
        } else {
            taskCodes[code] = 1;
        }
    });

    // Generate markdown content
    const lines = [];
    lines.push(`# Sprint Report - ${stats.total} Recent Tasks`);
    lines.push('');
    lines.push(`**Generated:** ${new Date().toISOString()}`);
    lines.push(`**Total Tasks in History:** ${history.length}`);
    lines.push('');

    // Sprint Context section
    lines.push('## 🎯 Sprint Objectives');
    lines.push('');
    lines.push('> **TODO:** Bổ sung mục tiêu sprint (sprint objectives/context)');
    lines.push('> - Ví dụ: "Testing V4.1 authentication system"');
    lines.push('> - Ví dụ: "Implementing opening balance features"');
    lines.push('');

    lines.push('## Summary');
    lines.push('');
    lines.push(`- ✅ Passed: ${stats.passed}`);
    lines.push(`- ✓ Completed: ${stats.completed}`);
    if (stats.failed > 0) lines.push(`- ❌ Failed: ${stats.failed}`);
    lines.push(`- **Success Rate:** ${successRate}%`);

    // Add duplicate warning if any
    if (duplicates.length > 0) {
        lines.push('');
        lines.push('⚠️ **Note:** Phát hiện tasks trùng lặp:');
        duplicates.forEach(code => {
            lines.push(`   - \`${code}\` xuất hiện ${taskCodes[code]} lần`);
        });
        lines.push('   → Xem phần "Tasks Detail" để biết lý do');
    }

    lines.push('');
    lines.push('## Tasks Detail');
    lines.push('');

    // List each task
    recentTasks.forEach((task, index) => {
        const code = task.data?.transaction_code || task.id;
        const name = task.data?.transaction_name || task.data?.title || 'N/A';
        const vnName = task.data?.vietnamese_name;
        const statusIcon = task.status === 'passed' ? '✅' :
                          task.status === 'completed' ? '✓' : '❌';
        const statusText = task.status.toUpperCase();

        lines.push(`### ${index + 1}. ${code} - ${statusIcon} ${statusText}`);
        lines.push('');
        lines.push(`**Name:** ${name}`);
        if (vnName) lines.push(`**Vietnamese:** ${vnName}`);
        lines.push(`**Completed:** ${task.completedAt || task.reviewedAt || task.createdAt}`);
        lines.push(`**Created by:** ${task.createdBy || 'dev'}`);
        lines.push(`**Reviewed by:** ${task.reviewedBy || task.testedBy || 'qa'}`);

        // Test results
        const results = task.testResults || task.result;
        if (results) {
            const passed = results.passed || 0;
            const total = results.total || 0;
            const testRate = total > 0 ? Math.round(passed / total * 100) : 0;
            lines.push('');
            lines.push(`**Tests:** ${passed}/${total} passed (${testRate}%)`);
        }

        // Add note if this is a duplicate task
        if (duplicates.includes(code)) {
            lines.push('');
            lines.push(`> ⚠️ **Lưu ý:** Task \`${code}\` xuất hiện nhiều lần trong báo cáo này.`);
            lines.push(`> **TODO:** Giải thích lý do (ví dụ: retry sau khi fix bug, testing nhiều lần, etc.)`);
        }

        lines.push('');
        lines.push('---');
        lines.push('');
    });

    // Conclusion
    lines.push('## Conclusion');
    lines.push('');
    lines.push(`Successfully completed ${stats.total} tasks with ${successRate}% success rate.`);
    lines.push('');

    // Next Steps section
    lines.push('## 🚀 Next Steps');
    lines.push('');
    lines.push('> **TODO:** Bổ sung kế hoạch công việc tiếp theo (next steps/plan)');
    lines.push('> - Ví dụ: "Implement PM review workflow"');
    lines.push('> - Ví dụ: "Add email notifications"');
    lines.push('> - Ví dụ: "Deploy to production"');
    lines.push('');

    lines.push('---');
    lines.push('');
    lines.push('🤖 Generated with [Claude Code](https://claude.com/claude-code)');

    const content = lines.join('\n');

    // Save to reports directory
    const timestamp = Date.now();
    const filename = `sprint-report-${timestamp}.md`;
    const reportDir = path.join(__dirname, '../reports');
    const filepath = path.join(reportDir, filename);

    // Create directory if not exists
    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
    }

    fs.writeFileSync(filepath, content, 'utf-8');

    const result = {
        filepath,
        filename,
        content,
        stats,
        successRate,
        taskCount: stats.total,
        taskCreated: false,
        taskId: null
    };

    // Automatically create task for PM if enabled
    if (autoCreateTask) {
        try {
            const DevHelper = require('./dev-helper-v4.1.js');
            const dev = new DevHelper();

            await dev.ensureAuthenticated();

            const taskResponse = await dev.createTask('report', {
                title: `Sprint Report - ${stats.total} Tasks`,
                summary: `Completed ${stats.total} tasks with ${successRate}% success rate`,
                filepath: filepath,
                tasksIncluded: stats.total,
                stats: stats,
                successRate: successRate
            });

            result.taskCreated = true;
            result.taskId = taskResponse?.taskId || taskResponse?.id;
            result.taskResponse = taskResponse;

        } catch (error) {
            console.error('⚠️  Warning: Could not create task automatically:', error.message);
            console.error('   Report file was generated successfully but task creation failed.');
            console.error('   You may need to create the task manually.');
        }
    }

    return result;
}

// CLI usage
if (require.main === module) {
    (async () => {
        try {
            const count = parseInt(process.argv[2]) || 10;

            console.log('📊 Generating sprint report...');
            console.log(`📋 Including ${count} most recent tasks\n`);

            const result = await generateSprintReport(count);

            console.log('✅ Report generated successfully!');
            console.log('');
            console.log('📄 File:', result.filepath);
            console.log('📊 Tasks:', result.taskCount);
            console.log('✓ Success Rate:', result.successRate + '%');

            if (result.taskCreated) {
                console.log('');
                console.log('📤 Task created for PM:');
                console.log('   Task ID:', result.taskId);
                console.log('   Status: Sent to PM for review');
            }

            console.log('');
            console.log('📝 Report preview:');
            console.log('─'.repeat(70));
            console.log(result.content);
            console.log('─'.repeat(70));

        } catch (error) {
            console.error('❌ Error generating report:', error.message);
            process.exit(1);
        }
    })();
}

module.exports = { generateSprintReport };
