#!/usr/bin/env node

/**
 * QA AGENT DEMO - Manual Testing Workflow V5.2
 *
 * QA agent sẽ:
 * 1. Lấy task tiếp theo từ orchestrator
 * 2. Hiển thị thông tin task
 * 3. Hỏi QA có muốn approve không
 * 4. Submit kết quả
 *
 * Usage:
 *   node qa-agent-demo.js [--project PROJECT_ID]
 */

const QAHelper = require('./qa-helper-v5.2.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  // Parse command line arguments for V5.2
  const args = process.argv.slice(2);
  const projectIndex = args.indexOf('--project');
  const projectId = projectIndex !== -1 ? args[projectIndex + 1] : 'trading-erp-mcp';

  const qa = new QAHelper({ projectId });

  console.log('═══════════════════════════════════════════════════════════');
  console.log('🧪 QA AGENT V5.2 - MANUAL TESTING WORKFLOW');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('Project:', projectId);
  console.log('');

  try {
    // Ensure authenticated
    await qa.ensureAuthenticated();
    console.log('');

    while (true) {
      console.log('───────────────────────────────────────────────────────────');
      console.log('📋 Checking for next task to review...');
      console.log('');

      // Get next task
      const response = await qa.getNextTask();

      if (!response.available) {
        console.log('⏸️  No tasks available for QA at the moment.');
        console.log('');
        const retry = await question('Do you want to check again? (y/n): ');

        if (retry.toLowerCase() !== 'y') {
          console.log('');
          console.log('👋 QA Agent signing off. Goodbye!');
          break;
        }
        console.log('');
        continue;
      }

      // Display task
      const task = response.task;
      console.log('✅ Task received!');
      console.log('');
      console.log('📄 TASK DETAILS:');
      console.log('   Task ID:', task.id);
      console.log('   Type:', task.type);
      console.log('   Created by:', task.createdBy);
      console.log('   Created at:', task.createdAt);
      console.log('');
      console.log('📊 TASK DATA:');
      console.log(JSON.stringify(task.data, null, 2));
      console.log('');

      // Ask QA for decision
      console.log('🤔 YOUR DECISION:');
      const decision = await question('   Approve this task? (y/n/s=skip): ');
      console.log('');

      if (decision.toLowerCase() === 's') {
        console.log('⏭️  Skipping this task (will be available for next QA)');
        console.log('');
        continue;
      }

      const approved = decision.toLowerCase() === 'y';

      // Ask for test results (if approved)
      let testResults = null;
      if (approved) {
        console.log('📝 Enter test results:');
        const total = await question('   Total tests: ');
        const passed = await question('   Passed: ');
        const failed = parseInt(total) - parseInt(passed);

        testResults = {
          total: parseInt(total),
          passed: parseInt(passed),
          failed: failed,
          testedBy: 'qa-agent-1',
          testedAt: new Date().toISOString()
        };
      } else {
        console.log('📝 Enter failure reason:');
        const reason = await question('   Reason: ');
        testResults = {
          failed: true,
          reason: reason
        };
      }

      console.log('');

      // Complete task
      const result = await qa.completeTask(task.id, approved, testResults);

      console.log('');
      if (approved) {
        console.log('✅ Task APPROVED and completed!');
      } else {
        console.log('❌ Task REJECTED!');
      }
      console.log('   Status:', result.status);
      console.log('');

      // Ask if continue
      const continueWork = await question('Continue to next task? (y/n): ');
      console.log('');

      if (continueWork.toLowerCase() !== 'y') {
        console.log('👋 QA Agent signing off. Good job today!');
        break;
      }
    }

  } catch (error) {
    console.error('');
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  } finally {
    rl.close();
  }
}

// Run
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
