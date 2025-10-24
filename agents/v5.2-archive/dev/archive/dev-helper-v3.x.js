/**
 * DEV HELPER
 *
 * Helper functions cho Agent 1 để communicate với orchestrator
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class DevHelper {
  constructor() {
    this.orchestratorUrl = 'http://localhost:3000';
  }

  /**
   * Notify orchestrator bắt đầu task
   */
  async notifyStart(taskDescription) {
    try {
      await axios.post(`${this.orchestratorUrl}/dev/start`, {
        task: {
          description: taskDescription,
          timestamp: new Date().toISOString()
        }
      });
      console.log('✅ Đã thông báo Orchestrator - Agent 1 started');
    } catch (error) {
      console.error('❌ Lỗi khi notify start:', error.message);
      throw error;
    }
  }

  /**
   * Notify orchestrator hoàn thành task - V2 (Queue-based)
   * QUAN TRỌNG: Thêm task vào queue cho Agent 2!
   */
  async notifyDone(result) {
    try {
      const response = await axios.post(`${this.orchestratorUrl}/dev/task/add`, {
        result: result
      });

      console.log('\n✅ ================================');
      console.log('✅ DEV - TASK COMPLETED');
      console.log('✅ ================================');
      console.log('📤 Kết quả đã lưu vào queue');
      console.log(`📋 Task ID: ${response.data.taskId}`);
      console.log('⏳ Agent 2 sẽ lấy task này khi chạy workflow!\n');
    } catch (error) {
      console.error('❌ Lỗi khi lưu task:', error.message);
      throw error;
    }
  }

  /**
   * Thêm transaction vào trading_business_transactions.json
   */
  async addTransaction(category, txCode, txData) {
    try {
      const filePath = path.join(__dirname, '../../trading_business_transactions.json');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      // Đảm bảo category tồn tại
      if (!data.transaction_definitions[category]) {
        data.transaction_definitions[category] = {};
      }

      // Thêm transaction
      data.transaction_definitions[category][txCode] = txData;

      // Save
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`✅ Đã thêm ${txCode} vào trading_business_transactions.json`);
    } catch (error) {
      console.error('❌ Lỗi khi thêm transaction:', error.message);
      throw error;
    }
  }

  /**
   * Thêm account determination rule
   */
  async addAccountDetermination(accountKey, accountData) {
    try {
      const filePath = path.join(__dirname, '../../trading_account_determination.json');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      // Thêm vào mappings
      data.account_determination_profiles.TRADING_STANDARD.mappings[accountKey] = accountData;

      // Save
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`✅ Đã thêm account determination cho ${accountKey}`);
    } catch (error) {
      console.error('❌ Lỗi khi thêm account determination:', error.message);
      throw error;
    }
  }

  /**
   * Lấy danh sách failed tasks từ orchestrator
   */
  async getFailedTasks() {
    try {
      const response = await axios.get(`${this.orchestratorUrl}/dev/failed-tasks`);
      return response.data;
    } catch (error) {
      console.error('❌ Lỗi khi lấy failed tasks:', error.message);
      throw error;
    }
  }

  /**
   * Lấy danh sách passed tasks từ history
   */
  async getPassedTasks() {
    try {
      const response = await axios.get(`${this.orchestratorUrl}/dev/passed-tasks`);
      return response.data;
    } catch (error) {
      console.error('❌ Lỗi khi lấy passed tasks:', error.message);
      throw error;
    }
  }

  /**
   * Rework một task đã passed (lấy từ history về queue)
   */
  async reworkPassedTask(taskId, reason, updatedData = null) {
    try {
      const response = await axios.post(`${this.orchestratorUrl}/dev/task/rework-passed`, {
        taskId,
        reason,
        updatedData
      });

      console.log('\n✅ ================================');
      console.log('✅ TASK MOVED TO QUEUE FOR REWORK');
      console.log('✅ ================================');
      console.log(`📋 Task ID: ${response.data.taskId}`);
      console.log(`📝 Reason: ${reason}`);
      console.log(`🔄 Rework Count: ${response.data.task.reworkCount || 1}`);
      console.log('⏳ Agent 2 sẽ test lại task này!\n');

      return response.data;
    } catch (error) {
      console.error('❌ Lỗi khi rework passed task:', error.response?.data?.error || error.message);
      throw error;
    }
  }

  /**
   * Hiển thị chi tiết failed task
   */
  displayFailedTask(task) {
    console.log('\n' + '='.repeat(70));
    console.log('❌❌❌ FAILED TASK DETAILS - CHỈ FIX CÁC LỖI DƯỚI ĐÂY ❌❌❌');
    console.log('='.repeat(70));
    console.log(`Task ID: ${task.taskId}`);
    console.log(`Transaction: ${task.transaction_code} - ${task.transaction_name}`);
    console.log(`Tested at: ${task.testedAt}`);

    console.log('\n📊 Test Results Summary:');
    console.log(`   Total: ${task.testResults.total}`);
    console.log(`   ✅ Passed: ${task.testResults.passed}`);
    console.log(`   ❌ Failed: ${task.testResults.failed} ← CHỈ FIX CÁI NÀY`);
    console.log(`   ⏭️  Skipped: ${task.testResults.skipped || 0} ← KHÔNG CẦN FIX`);

    console.log('\n' + '='.repeat(70));
    console.log(`🚨 FAILED TESTS - ĐÚNG ${task.failedTests.length} LỖI CẦN FIX:`);
    console.log('='.repeat(70));

    if (task.failedTests.length === 0) {
      console.log('\n   ✅✅✅ KHÔNG CÓ LỖI NÀO!');
      console.log('   ✅ TẤT CẢ TESTS ĐÃ PASSED HOẶC SKIPPED');
      console.log('   ✅ KHÔNG CẦN FIX GÌ CẢ!\n');
      console.log('='.repeat(70) + '\n');
      return;
    }

    task.failedTests.forEach((test, idx) => {
      console.log(`\n   ❌ LỖI ${idx + 1}/${task.failedTests.length}: ${test.name}`);
      console.log(`      ├─ Type: ${test.type}`);
      console.log(`      └─ Status: ${test.status}`);
    });

    console.log('\n' + '='.repeat(70));
    console.log('💡 SUGGESTED ACTIONS - FIX THEO THỨ TỰ:');
    console.log('='.repeat(70));

    task.failedTests.forEach((test, idx) => {
      console.log(`\n   ${idx + 1}. Fix "${test.type}":`);
      switch (test.type) {
        case 'existence_check':
          console.log(`      → Add ${task.transaction_code} to trading_business_transactions.json`);
          break;
        case 'account_mapping':
          console.log(`      → Add account determination mapping for ${task.transaction_code}`);
          console.log(`      → File: trading_account_determination.json`);
          console.log(`      → Example key: "opening_balance_${task.transaction_code.toLowerCase()}"`);
          break;
        case 'balance_check':
          console.log(`      → Ensure journal entries are balanced (Debit = Credit)`);
          break;
        case 'compliance_check':
          console.log(`      → Check VAS compliance for ${task.transaction_name}`);
          break;
      }
    });

    console.log('\n' + '='.repeat(70));
    console.log('⚠️  LƯU Ý:');
    console.log('   - CHỈ fix các tests có status "failed"');
    console.log('   - KHÔNG fix tests có status "skipped" hoặc "passed"');
    console.log('   - Sau khi fix xong: POST /dev/task/fix');
    console.log('='.repeat(70) + '\n');
  }

  /**
   * Hiển thị thông tin passed task
   */
  displayPassedTask(task) {
    console.log('\n' + '='.repeat(70));
    console.log('✅ PASSED TASK DETAILS');
    console.log('='.repeat(70));
    console.log(`Task ID: ${task.taskId}`);
    console.log(`Transaction: ${task.transaction_code} - ${task.transaction_name}`);
    console.log(`Created: ${task.createdAt}`);
    console.log(`Passed: ${task.passedAt}`);
    console.log(`Rework Count: ${task.reworkCount || 0}`);

    console.log('\n📊 Test Results:');
    console.log(`   Total: ${task.testResults.total}`);
    console.log(`   ✅ Passed: ${task.testResults.passed}`);
    console.log(`   ❌ Failed: ${task.testResults.failed}`);
    console.log(`   ⏭️  Skipped: ${task.testResults.skipped || 0}`);

    console.log('\n' + '='.repeat(70));
    console.log('💡 TO REWORK THIS TASK:');
    console.log('='.repeat(70));
    console.log('   Call: helper.reworkPassedTask(taskId, reason, updatedData)');
    console.log(`   Example: helper.reworkPassedTask('${task.taskId}', 'Update logic', {...})`);
    console.log('='.repeat(70) + '\n');
  }

  /**
   * Hiển thị danh sách passed tasks
   */
  displayPassedTasks(data) {
    console.log('\n' + '='.repeat(70));
    console.log(`📋 PASSED TASKS (${data.count} total)`);
    console.log('='.repeat(70));

    if (data.count === 0) {
      console.log('\n   ℹ️  No passed tasks in history yet.\n');
      console.log('='.repeat(70) + '\n');
      return;
    }

    data.tasks.forEach((task, idx) => {
      console.log(`\n   ${idx + 1}. ${task.transaction_code} - ${task.transaction_name}`);
      console.log(`      ├─ Task ID: ${task.taskId}`);
      console.log(`      ├─ Passed: ${task.passedAt}`);
      console.log(`      ├─ Rework Count: ${task.reworkCount || 0}`);
      console.log(`      └─ Tests: ${task.testResults.passed}/${task.testResults.total} passed`);
    });

    console.log('\n' + '='.repeat(70) + '\n');
  }

  /**
   * Kiểm tra tài khoản tồn tại trong Chart of Accounts
   */
  async validateAccount(accountCode) {
    try {
      const filePath = path.join(__dirname, '../../trading_chart_of_accounts.json');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      // Search trong chart of accounts
      const chart = data.chart_of_accounts;
      for (const category in chart) {
        for (const subcategory in chart[category]) {
          const accounts = chart[category][subcategory];
          if (accounts[accountCode]) {
            return true;
          }
        }
      }

      console.warn(`⚠️ Tài khoản ${accountCode} không tồn tại trong Chart of Accounts`);
      return false;
    } catch (error) {
      console.error('❌ Lỗi khi validate account:', error.message);
      throw error;
    }
  }
}

module.exports = DevHelper;

// Example usage
if (require.main === module) {
  const helper = new DevHelper();

  async function example() {
    // 1. Notify start
    await helper.notifyStart('Thêm nghiệp vụ mua TSCĐ');

    // 2. Validate accounts
    await helper.validateAccount('211');
    await helper.validateAccount('111');

    // 3. Add transaction
    await helper.addTransaction('fixed_assets_transactions', 'FA001', {
      code: 'FA001',
      name: 'Purchase Fixed Assets',
      vietnamese_name: 'Mua tài sản cố định',
      aliases: ['Mua TSCĐ', 'Purchase assets'],
      description: 'Mua tài sản cố định',
      parameters: {
        asset_cost: 'Nguyên giá',
        payment_method: 'cash/bank'
      }
    });

    // 4. Notify done
    await helper.notifyDone({
      transactionCode: 'FA001',
      summary: 'Đã thêm FA001',
      filesUpdated: ['trading_business_transactions.json']
    });
  }

  example().catch(err => console.error(err));
}
