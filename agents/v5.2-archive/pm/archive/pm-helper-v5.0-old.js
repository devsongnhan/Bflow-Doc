#!/usr/bin/env node

/**
 * PM HELPER V5.0 - SPRINT-BASED WORKFLOW
 *
 * Features:
 * - V5.0: Create and manage Sprint Plans
 * - V5.0: Assign tasks to Dev
 * - V5.0: Track sprint progress
 * - V4.1: Dual-mode authentication (LAN + Internet)
 *
 * Sprint data location: <project-root>/Docs/sprints/
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class PMHelper {
  constructor(config = {}) {
    // Configuration
    this.orchestratorUrl = config.url || process.env.ORCHESTRATOR_URL || 'http://localhost:3000';
    this.username = config.username || process.env.PM_USERNAME || 'pm-agent-1';
    this.password = config.password || process.env.PM_PASSWORD || 'demo789';
    this.apiKey = config.apiKey || process.env.PM_API_KEY || 'pm-simple-key-99999';

    // Project settings
    this.projectRoot = config.projectRoot || process.env.PROJECT_ROOT || path.join(__dirname, '../..');
    this.projectName = config.projectName || process.env.PROJECT_NAME || 'trading-erp-mcp';
    this.sprintsDir = path.join(this.projectRoot, 'Docs', 'sprints');

    this.role = 'pm';
    this.tokenFile = path.join(__dirname, '.pm-token-v5.json');
    this.mode = null;
    this.accessToken = null;

    console.log(`📁 Project Root: ${this.projectRoot}`);
    console.log(`📁 Sprints Directory: ${this.sprintsDir}`);
  }

  // ============================================
  // AUTHENTICATION (Same as V4.1)
  // ============================================

  detectMode() {
    try {
      const url = new URL(this.orchestratorUrl);
      const hostname = url.hostname;

      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
      const isPrivateIP = hostname.startsWith('192.168.') || hostname.startsWith('10.') ||
                         hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./);

      return (isLocalhost || isPrivateIP) ? 'lan' : 'internet';
    } catch (error) {
      console.error('❌ Invalid orchestrator URL:', error.message);
      throw error;
    }
  }

  async ensureAuthenticated() {
    if (!this.mode) {
      this.mode = this.detectMode();
      console.log(`🔍 Detected mode: ${this.mode.toUpperCase()}`);
    }

    if (this.mode === 'lan') {
      console.log('✅ LAN mode - using API key');
      return;
    }

    // Internet mode - implement JWT if needed
    console.log('⚠️  Internet mode not fully implemented in V5.0 yet');
  }

  async request(method, endpoint, data = null) {
    await this.ensureAuthenticated();

    const headers = {};
    if (this.mode === 'lan') {
      headers['X-API-Key'] = this.apiKey;
    }

    const config = {
      method,
      url: `${this.orchestratorUrl}${endpoint}`,
      headers
    };

    if (data) {
      config.data = data;
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(`❌ Request failed [${error.response.status}]:`, error.response.data);
      } else {
        console.error('❌ Request failed:', error.message);
      }
      throw error;
    }
  }

  // ============================================
  // V5.0: SPRINT MANAGEMENT (Local Files)
  // ============================================

  /**
   * Create a new Sprint Plan locally
   */
  createSprintLocal(sprintData) {
    const {
      sprint_id,
      sprint_name,
      start_date,
      end_date,
      duration_weeks = 2,
      objectives = [],
      tasks = []
    } = sprintData;

    if (!sprint_id || !sprint_name || !start_date) {
      throw new Error('Missing required fields: sprint_id, sprint_name, start_date');
    }

    // Create sprint plan structure
    const sprintPlan = {
      project: this.projectName,
      sprint_id,
      sprint_name,
      version: '5.0',

      timeline: {
        start_date,
        end_date: end_date || this.calculateEndDate(start_date, duration_weeks),
        duration_weeks,
        planning_date: new Date().toISOString().split('T')[0]
      },

      status: 'planning',

      team: {
        pm: this.username,
        dev_assigned: [],
        qa_assigned: ['qa-agent-1']
      },

      objectives,
      tasks,

      progress: {
        total_tasks: tasks.length,
        by_status: {
          planned: tasks.length,
          assigned: 0,
          accepted: 0,
          in_progress: 0,
          submitted: 0,
          in_qa: 0,
          completed: 0,
          blocked: 0
        },
        completion_percentage: 0,
        estimated_total_hours: tasks.reduce((sum, t) => sum + (t.estimated_hours || 0), 0),
        actual_hours_spent: 0
      },

      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      completed_at: null
    };

    // Save to file
    const sprintFile = path.join(this.sprintsDir, `${sprint_id}.json`);
    fs.writeFileSync(sprintFile, JSON.stringify(sprintPlan, null, 2));

    console.log(`✅ Sprint created locally: ${sprintFile}`);
    return { sprint_id, sprintFile, sprintPlan };
  }

  /**
   * Load Sprint Plan from local file
   */
  loadSprintLocal(sprint_id) {
    const sprintFile = path.join(this.sprintsDir, `${sprint_id}.json`);

    if (!fs.existsSync(sprintFile)) {
      throw new Error(`Sprint file not found: ${sprintFile}`);
    }

    const sprintPlan = JSON.parse(fs.readFileSync(sprintFile, 'utf-8'));
    return sprintPlan;
  }

  /**
   * Save Sprint Plan to local file
   */
  saveSprintLocal(sprint_id, sprintPlan) {
    sprintPlan.updated_at = new Date().toISOString();
    const sprintFile = path.join(this.sprintsDir, `${sprint_id}.json`);
    fs.writeFileSync(sprintFile, JSON.stringify(sprintPlan, null, 2));
    console.log(`✅ Sprint saved: ${sprintFile}`);
  }

  /**
   * Activate a Sprint (update current.json)
   */
  activateSprint(sprint_id) {
    const sprint = this.loadSprintLocal(sprint_id);

    // Update sprint status
    sprint.status = 'active';
    this.saveSprintLocal(sprint_id, sprint);

    // Update current.json
    const currentFile = path.join(this.sprintsDir, 'current.json');
    const currentData = {
      active_sprint_id: sprint_id,
      active_sprint_name: sprint.sprint_name,
      active_sprint_path: `Docs/sprints/${sprint_id}.json`,
      activated_at: new Date().toISOString(),
      activated_by: this.username,
      previous_sprint_id: null
    };

    // Check if there was a previous active sprint
    if (fs.existsSync(currentFile)) {
      const prevCurrent = JSON.parse(fs.readFileSync(currentFile, 'utf-8'));
      if (prevCurrent.active_sprint_id) {
        currentData.previous_sprint_id = prevCurrent.active_sprint_id;
      }
    }

    fs.writeFileSync(currentFile, JSON.stringify(currentData, null, 2));

    console.log(`✅ Sprint activated: ${sprint_id}`);
    return { sprint_id, status: 'active' };
  }

  /**
   * Register Sprint with Orchestrator (metadata only)
   */
  async registerSprintWithOrchestrator(sprint_id) {
    const sprint = this.loadSprintLocal(sprint_id);

    console.log(`\n📝 Registering Sprint with Orchestrator...\n`);

    const result = await this.request('POST', '/agent/pm/sprint/register', {
      sprint_id: sprint.sprint_id,
      sprint_name: sprint.sprint_name,
      project: sprint.project,
      start_date: sprint.timeline.start_date,
      end_date: sprint.timeline.end_date,
      status: sprint.status
    });

    console.log(`✅ Sprint registered with Orchestrator`);
    return result;
  }

  /**
   * Assign a task to Dev
   */
  async assignTask(sprint_id, task_id, assigned_to, notes = '') {
    console.log(`\n📋 Assigning task ${task_id} to ${assigned_to}...\n`);

    // 1. Load sprint from local file
    const sprint = this.loadSprintLocal(sprint_id);

    // 2. Find task
    const task = sprint.tasks.find(t => t.task_id === task_id);
    if (!task) {
      throw new Error(`Task ${task_id} not found in sprint ${sprint_id}`);
    }

    // 3. Update local task status
    task.status = 'assigned';
    task.assignment.assigned_to = assigned_to;
    task.assignment.assigned_by = this.username;
    task.assignment.assigned_at = new Date().toISOString();

    // 4. Update progress
    sprint.progress.by_status.planned--;
    sprint.progress.by_status.assigned++;

    // 5. Save sprint locally
    this.saveSprintLocal(sprint_id, sprint);

    // 6. Call Orchestrator API to create assignment
    const result = await this.request('POST', `/agent/pm/sprint/${sprint_id}/task/${task_id}/assign`, {
      assigned_to,
      metadata: {
        title: task.title,
        priority: task.priority,
        estimated_hours: task.estimated_hours,
        complexity: task.complexity,
        transaction_code: task.transaction_code
      },
      notes
    });

    // 7. Update local task with orchestrator assignment ID
    task.orchestrator_assignment_id = result.assignment_id;
    this.saveSprintLocal(sprint_id, sprint);

    console.log(`✅ Task assigned: ${result.assignment_id}`);
    return result;
  }

  /**
   * Get Sprint progress
   */
  getSprintProgress(sprint_id) {
    const sprint = this.loadSprintLocal(sprint_id);
    return {
      sprint_id: sprint.sprint_id,
      sprint_name: sprint.sprint_name,
      status: sprint.status,
      progress: sprint.progress,
      timeline: sprint.timeline
    };
  }

  /**
   * List all Sprints
   */
  listSprints() {
    const files = fs.readdirSync(this.sprintsDir)
      .filter(f => f.startsWith('sprint-') && f.endsWith('.json'));

    const sprints = files.map(f => {
      const sprint = JSON.parse(fs.readFileSync(path.join(this.sprintsDir, f), 'utf-8'));
      return {
        sprint_id: sprint.sprint_id,
        sprint_name: sprint.sprint_name,
        status: sprint.status,
        start_date: sprint.timeline.start_date,
        end_date: sprint.timeline.end_date,
        progress: sprint.progress.completion_percentage
      };
    });

    return { sprints, total: sprints.length };
  }

  // ============================================
  // V5.0: DOCUMENT REVIEW MANAGEMENT
  // ============================================

  /**
   * Get next document to review
   */
  async getNextDocument() {
    console.log('\n📋 Getting next document to review...\n');
    return await this.request('GET', '/agent/pm/document/next');
  }

  /**
   * Review and approve a document
   */
  async approveDocument(doc_id, feedback = '') {
    console.log(`\n✅ Approving document ${doc_id}...\n`);
    return await this.request('POST', `/agent/pm/document/${doc_id}/approve`, {
      feedback,
      approved_at: new Date().toISOString()
    });
  }

  /**
   * Review and reject a document
   */
  async rejectDocument(doc_id, feedback) {
    console.log(`\n❌ Rejecting document ${doc_id}...\n`);

    if (!feedback) {
      throw new Error('Feedback is required when rejecting a document');
    }

    return await this.request('POST', `/agent/pm/document/${doc_id}/reject`, {
      feedback,
      rejected_at: new Date().toISOString()
    });
  }

  /**
   * List all documents pending review
   */
  async listDocuments(status = null) {
    console.log('\n📊 Listing documents...\n');
    const query = status ? `?status=${status}` : '';
    return await this.request('GET', `/agent/pm/documents/list${query}`);
  }

  /**
   * Get approved design documents (for Sprint planning)
   */
  getApprovedDesignsLocal() {
    const designDir = path.join(this.projectRoot, 'Docs', 'design');

    if (!fs.existsSync(designDir)) {
      console.log('⚠️  Design directory not found');
      return { designs: [], total: 0 };
    }

    const files = fs.readdirSync(designDir)
      .filter(f => f.startsWith('DES-') && f.endsWith('.json'));

    const approvedDocs = files
      .map(f => {
        try {
          const doc = JSON.parse(fs.readFileSync(path.join(designDir, f), 'utf-8'));
          return doc;
        } catch (error) {
          console.warn(`⚠️  Could not read ${f}`);
          return null;
        }
      })
      .filter(doc => doc && doc.status === 'approved')
      .map(doc => ({
        doc_id: doc.doc_id,
        doc_name: doc.doc_name,
        feature_name: doc.feature_name,
        transaction_code: doc.metadata.transaction_code,
        approved_at: doc.metadata.approved_at,
        file_path: `Docs/design/${doc.doc_id}.json`
      }));

    return { designs: approvedDocs, total: approvedDocs.length };
  }

  /**
   * Validate Sprint Plan has design document references
   */
  validateSprintDesignReferences(sprint_id) {
    const sprint = this.loadSprintLocal(sprint_id);

    const issues = [];

    sprint.tasks.forEach(task => {
      if (!task.ba_documents || !task.ba_documents.design_doc_id) {
        issues.push({
          task_id: task.task_id,
          issue: 'Missing design document reference',
          severity: 'error'
        });
      } else {
        // Check if design doc exists and is approved
        const designPath = path.join(this.projectRoot, task.ba_documents.design_doc_path);
        if (!fs.existsSync(designPath)) {
          issues.push({
            task_id: task.task_id,
            issue: `Design document not found: ${task.ba_documents.design_doc_path}`,
            severity: 'error'
          });
        } else {
          const designDoc = JSON.parse(fs.readFileSync(designPath, 'utf-8'));
          if (designDoc.status !== 'approved') {
            issues.push({
              task_id: task.task_id,
              issue: `Design document not approved: ${task.ba_documents.design_doc_id} (status: ${designDoc.status})`,
              severity: 'warning'
            });
          }
        }
      }
    });

    return {
      valid: issues.filter(i => i.severity === 'error').length === 0,
      issues
    };
  }

  // ============================================
  // V4.1: REPORT MANAGEMENT (Unchanged)
  // ============================================

  async getNextReport() {
    console.log('\n📋 Getting next report to review...\n');
    return await this.request('GET', '/agent/pm/task/next');
  }

  async reviewReport(taskId, approved, feedback = null) {
    console.log(`\n${approved ? '✅' : '❌'} ${approved ? 'Approving' : 'Rejecting'} report ${taskId}...\n`);
    return await this.request('POST', '/agent/pm/task/complete', {
      taskId,
      approved,
      result: feedback
    });
  }

  async listReports() {
    console.log('\n📊 Listing reports...\n');
    return await this.request('GET', '/agent/pm/tasks/list');
  }

  // ============================================
  // UTILITIES
  // ============================================

  calculateEndDate(startDate, weeks) {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + (weeks * 7));
    return end.toISOString().split('T')[0];
  }
}

module.exports = PMHelper;

// CLI Demo
if (require.main === module) {
  const pm = new PMHelper();

  (async () => {
    try {
      console.log('🚀 PM Helper V5.0 - Sprint Management Demo\n');

      // Example: Create a sprint
      console.log('📝 Example: Create Sprint Plan\n');
      console.log('const sprint = pm.createSprintLocal({');
      console.log('  sprint_id: "sprint-001",');
      console.log('  sprint_name: "Core Accounting Phase 1",');
      console.log('  start_date: "2025-10-20",');
      console.log('  duration_weeks: 2,');
      console.log('  objectives: ["Implement 5 core transactions"],');
      console.log('  tasks: [{ task_id: "sprint-001-task-001", ... }]');
      console.log('});\n');

      console.log('✅ PM Helper V5.0 ready!\n');
      console.log('See Docs/sprints/README.md for full usage guide.');

    } catch (error) {
      console.error('\n❌ Error:', error.message);
      process.exit(1);
    }
  })();
}
