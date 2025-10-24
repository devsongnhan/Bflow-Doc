#!/usr/bin/env node

/**
 * PM HELPER V5.2 - WITH PROJECT-LOADER SUPPORT
 *
 * Changes in V5.2:
 * - Dynamic path resolution via orchestrator's project-loader
 * - Multi-project support
 * - No hard-coded paths
 * - Backward compatible with V5.1
 *
 * Changes in V5.1:
 * - Support for folder-based Sprint structure
 * - README.md as primary source (user-friendly)
 * - Auto-generate JSON from MD
 * - Backward compatibility with old JSON structure
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class PMHelper {
  constructor(config = {}) {
    // Basic configuration
    this.orchestratorUrl = config.url || process.env.ORCHESTRATOR_URL || 'http://localhost:3000';
    this.username = config.username || process.env.PM_USERNAME || 'pm-agent-1';
    this.password = config.password || process.env.PM_PASSWORD || 'demo789';
    this.apiKey = config.apiKey || process.env.PM_API_KEY || 'pm-simple-key-99999';

    // V5.2: Project configuration (dynamically loaded from orchestrator)
    this.projectId = config.projectId || process.env.PROJECT_ID || 'trading-erp-mcp';
    this.projectConfig = null;  // Will be loaded from orchestrator
    this.projectRoot = config.projectRoot || process.env.PROJECT_ROOT || path.join(__dirname, '../..');

    // Authentication
    this.role = 'pm';
    this.tokenFile = path.join(__dirname, '.pm-token-v5.json');
    this.mode = null;
    this.accessToken = null;

    // Sprint MD to JSON converter path (will be resolved dynamically)
    this.converter = null;

    console.log(`🆔 Project ID: ${this.projectId}`);
    console.log(`📁 Project Root: ${this.projectRoot}`);
    console.log(`🔧 V5.2: Using dynamic path resolution from orchestrator`);
  }

  // AUTHENTICATION (Same as V5.0)
  detectMode() {
    try {
      const url = new URL(this.orchestratorUrl);
      const hostname = url.hostname;

      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
      const isPrivateIP = hostname.startsWith('192.168.') ||
                         hostname.startsWith('10.') ||
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

    console.log('⚠️  Internet mode not fully implemented in V5.1 yet');
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

  // V5.2: Load project configuration from orchestrator
  async loadProjectConfig() {
    if (this.projectConfig) {
      return this.projectConfig;  // Already loaded
    }

    try {
      const response = await axios.get(`${this.orchestratorUrl}/projects/${this.projectId}/config`);
      this.projectConfig = response.data;

      console.log(`✅ Project config loaded for: ${this.projectConfig.project.name}`);
      console.log(`   Sprints base: ${this.projectConfig.paths.sprints.base}`);

      // Set up converter if available
      if (this.projectConfig.tooling && this.projectConfig.tooling.md_converter) {
        const converterPath = path.join(this.projectRoot, this.projectConfig.tooling.md_converter);
        if (fs.existsSync(converterPath)) {
          const SprintMDtoJSON = require(converterPath);
          this.converter = new SprintMDtoJSON();
          console.log(`   MD converter: loaded`);
        }
      }

      return this.projectConfig;
    } catch (error) {
      console.error(`⚠️  Failed to load project config: ${error.message}`);
      console.error(`   Falling back to default paths`);

      // Fallback configuration
      this.projectConfig = {
        project: { id: this.projectId, name: this.projectId },
        paths: {
          sprints: { base: 'Docs/sprints', pattern: 'sprint-{id}', readme: 'README.md', json: 'sprint.json' },
          documents: { requirements: 'Docs/requirements', design: 'Docs/design', reports: 'orchestrator/reports' }
        },
        conventions: { sprint_id_format: 'sprint-{number:3}', task_id_format: '{sprint_id}-task-{number:3}' }
      };

      return this.projectConfig;
    }
  }

  // V5.2: Get sprints directory (dynamic)
  async getSprintsDir() {
    await this.loadProjectConfig();
    return path.join(this.projectRoot, this.projectConfig.paths.sprints.base);
  }

  // V5.2: Sprint folder structure support (updated for project-loader)
  async getSprintPath(sprint_id) {
    // Support both old and new structure
    // New: sprint-001-core-accounting/
    // Old: sprint-001.json

    // Get dynamic sprints directory
    const sprintsDir = await this.getSprintsDir();

    // Check if folder exists
    const folderPath = path.join(sprintsDir, sprint_id);
    if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
      await this.loadProjectConfig();
      return {
        type: 'folder',
        path: folderPath,
        mdFile: path.join(folderPath, this.projectConfig.paths.sprints.readme),
        jsonFile: path.join(folderPath, this.projectConfig.paths.sprints.json)
      };
    }

    // Check old JSON file
    const jsonFile = path.join(sprintsDir, `${sprint_id}.json`);
    if (fs.existsSync(jsonFile)) {
      return {
        type: 'json',
        path: jsonFile
      };
    }

    return null;
  }

  // NEW: Load Sprint with MD support
  async loadSprintLocal(sprint_id) {
    const sprintInfo = await this.getSprintPath(sprint_id);

    if (!sprintInfo) {
      throw new Error(`Sprint not found: ${sprint_id}`);
    }

    if (sprintInfo.type === 'folder') {
      // New structure: prefer JSON if exists and up-to-date
      if (fs.existsSync(sprintInfo.jsonFile)) {
        const jsonStat = fs.statSync(sprintInfo.jsonFile);
        const mdStat = fs.existsSync(sprintInfo.mdFile) ? fs.statSync(sprintInfo.mdFile) : null;

        // If MD is newer, regenerate JSON
        if (mdStat && mdStat.mtime > jsonStat.mtime) {
          console.log(`📝 MD file is newer, regenerating JSON...`);
          return await this.regenerateSprintJSON(sprint_id);
        }

        // Load from JSON
        return JSON.parse(fs.readFileSync(sprintInfo.jsonFile, 'utf-8'));
      } else if (fs.existsSync(sprintInfo.mdFile)) {
        // Generate JSON from MD
        console.log(`📝 Generating JSON from README.md...`);
        return await this.regenerateSprintJSON(sprint_id);
      } else {
        throw new Error(`No README.md or sprint.json found in ${sprintInfo.path}`);
      }
    } else {
      // Old structure: load JSON directly
      return JSON.parse(fs.readFileSync(sprintInfo.path, 'utf-8'));
    }
  }

  // NEW: Regenerate JSON from MD
  async regenerateSprintJSON(sprint_id) {
    const sprintInfo = await this.getSprintPath(sprint_id);

    if (!sprintInfo || sprintInfo.type !== 'folder') {
      throw new Error(`Sprint folder not found: ${sprint_id}`);
    }

    if (!fs.existsSync(sprintInfo.mdFile)) {
      throw new Error(`README.md not found: ${sprintInfo.mdFile}`);
    }

    const mdContent = fs.readFileSync(sprintInfo.mdFile, 'utf-8');
    const jsonData = this.converter.parseMarkdown(mdContent);

    // Save JSON
    fs.writeFileSync(sprintInfo.jsonFile, JSON.stringify(jsonData, null, 2));
    console.log(`✅ Generated ${sprintInfo.jsonFile}`);

    return jsonData;
  }

  // UPDATED: Save Sprint with MD support
  async saveSprintLocal(sprint_id, sprintPlan) {
    sprintPlan.updated_at = new Date().toISOString();

    const sprintInfo = await this.getSprintPath(sprint_id);

    if (!sprintInfo) {
      // Create new folder structure
      const sprintsDir = await this.getSprintsDir();
      const folderPath = path.join(sprintsDir, sprint_id);
      fs.mkdirSync(folderPath, { recursive: true });

      const jsonFile = path.join(folderPath, 'sprint.json');
      fs.writeFileSync(jsonFile, JSON.stringify(sprintPlan, null, 2));
      console.log(`✅ Saved: ${jsonFile}`);

      // TODO: Generate MD from JSON (reverse converter)
      console.log(`⚠️  Note: Please update README.md manually in ${folderPath}`);
    } else if (sprintInfo.type === 'folder') {
      // Save to folder structure
      fs.writeFileSync(sprintInfo.jsonFile, JSON.stringify(sprintPlan, null, 2));
      console.log(`✅ Updated: ${sprintInfo.jsonFile}`);
      console.log(`⚠️  Note: Remember to update README.md to reflect changes`);
    } else {
      // Save to old structure
      fs.writeFileSync(sprintInfo.path, JSON.stringify(sprintPlan, null, 2));
      console.log(`✅ Saved: ${sprintInfo.path}`);
    }
  }

  // NEW: Create Sprint with folder structure
  async createSprintFolder(sprint_id, sprint_name) {
    const sprintsDir = await this.getSprintsDir();
    const folderPath = path.join(sprintsDir, sprint_id);

    if (fs.existsSync(folderPath)) {
      console.log(`⚠️  Sprint folder already exists: ${folderPath}`);
      return false;
    }

    // Create folder structure
    fs.mkdirSync(folderPath, { recursive: true });
    fs.mkdirSync(path.join(folderPath, 'tasks'), { recursive: true });
    fs.mkdirSync(path.join(folderPath, 'reports'), { recursive: true });

    // Copy template
    const templatePath = path.join(sprintsDir, 'templates', 'sprint-template.md');
    if (fs.existsSync(templatePath)) {
      let template = fs.readFileSync(templatePath, 'utf-8');

      // Replace placeholders
      template = template.replace(/sprint-XXX/g, sprint_id);
      template = template.replace(/\[Sprint Name\]/g, sprint_name);
      template = template.replace(/YYYY-MM-DD/g, new Date().toISOString().split('T')[0]);

      fs.writeFileSync(path.join(folderPath, 'README.md'), template);
      console.log(`✅ Created Sprint folder: ${folderPath}`);
      console.log(`📝 Edit README.md to define Sprint plan`);
    } else {
      console.log(`⚠️  Template not found, creating blank README.md`);
      fs.writeFileSync(path.join(folderPath, 'README.md'), `# Sprint ${sprint_id} - ${sprint_name}\n\n`);
    }

    return true;
  }

  // UPDATED: Create Sprint with MD support
  async createSprintLocal(sprintData) {
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

    // Create folder structure
    await this.createSprintFolder(sprint_id, sprint_name);

    // Create Sprint JSON
    const sprintPlan = {
      project: this.projectName,
      sprint_id,
      sprint_name,
      version: '5.1',

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
      tasks: tasks.map((task, index) => this.createTaskObject(task, index + 1, sprint_id)),

      progress: this.calculateProgress(tasks),

      risks: [],

      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Save Sprint
    await this.saveSprintLocal(sprint_id, sprintPlan);

    const sprintsDir = await this.getSprintsDir();
    console.log(`\n✅ Sprint created: ${sprint_id}`);
    console.log(`📁 Location: ${sprintsDir}/${sprint_id}/`);
    console.log(`📝 Edit README.md for user-friendly Sprint planning`);

    return sprintPlan;
  }

  // V5.1: Get active Sprint
  async getActiveSprint() {
    const sprintsDir = await this.getSprintsDir();
    const activeFile = path.join(sprintsDir, 'active-sprint.txt');

    if (fs.existsSync(activeFile)) {
      const sprint_id = fs.readFileSync(activeFile, 'utf-8').trim();
      if (sprint_id) {
        try {
          return await this.loadSprintLocal(sprint_id);
        } catch (error) {
          console.error(`❌ Could not load active sprint: ${sprint_id}`);
        }
      }
    }

    // Fallback to old current.json
    const currentFile = path.join(sprintsDir, 'current.json');
    if (fs.existsSync(currentFile)) {
      const current = JSON.parse(fs.readFileSync(currentFile, 'utf-8'));
      if (current.active_sprint_id) {
        return await this.loadSprintLocal(current.active_sprint_id);
      }
    }

    return null;
  }

  // V5.1: Set active Sprint
  async setActiveSprint(sprint_id) {
    const sprintsDir = await this.getSprintsDir();
    const activeFile = path.join(sprintsDir, 'active-sprint.txt');
    fs.writeFileSync(activeFile, sprint_id);
    console.log(`✅ Set active sprint: ${sprint_id}`);

    // Also update old current.json for compatibility
    const currentFile = path.join(sprintsDir, 'current.json');
    const currentData = {
      active_sprint_id: sprint_id,
      updated_at: new Date().toISOString()
    };
    fs.writeFileSync(currentFile, JSON.stringify(currentData, null, 2));
  }

  // V5.2: Register Sprint with Orchestrator Server
  async registerSprint(sprint_id) {
    // Load sprint data from local file
    const sprint = await this.loadSprintLocal(sprint_id);
    if (!sprint) {
      throw new Error(`Sprint ${sprint_id} not found locally. Create sprint first.`);
    }

    // Register with orchestrator
    return await this.request('POST', '/agent/pm/sprint/register', {
      sprint_id: sprint.sprint_id,
      project: sprint.project,
      name: sprint.sprint_name || sprint.name,
      start_date: sprint.timeline?.start_date,
      end_date: sprint.timeline?.end_date,
      status: sprint.status || 'planning',
      tasks_count: sprint.tasks?.length || 0,
      metadata: {
        duration_weeks: sprint.timeline?.duration_weeks,
        team: sprint.team
      }
    });
  }

  // Helper methods (unchanged from V5.0)
  calculateEndDate(startDate, weeks) {
    const start = new Date(startDate);
    const end = new Date(start.getTime() + (weeks * 7 * 24 * 60 * 60 * 1000));
    return end.toISOString().split('T')[0];
  }

  createTaskObject(taskData, taskNumber, sprint_id) {
    return {
      task_id: taskData.task_id || `${sprint_id}-task-${String(taskNumber).padStart(3, '0')}`,
      task_number: taskNumber,
      title: taskData.title || '',
      description: taskData.description || '',
      transaction_code: taskData.transaction_code || '',
      category: taskData.category || 'accounting_transaction',
      priority: taskData.priority || 'medium',
      estimated_hours: taskData.estimated_hours || 8,
      complexity: taskData.complexity || 'medium',
      status: 'planned',
      assignment: {
        assigned_to: null,
        assigned_by: null,
        assigned_at: null,
        accepted_at: null,
        started_at: null,
        submitted_at: null,
        completed_at: null
      },
      orchestrator_assignment_id: null,
      orchestrator_task_id: null,
      ba_documents: taskData.ba_documents || {},
      dependencies: taskData.dependencies || [],
      acceptance_criteria: taskData.acceptance_criteria || [],
      files_to_modify: taskData.files_to_modify || [
        'trading_business_transactions.json',
        'trading_account_determination.json',
        'trading-mcp-server-optimized.js'
      ],
      notes: ''
    };
  }

  calculateProgress(tasks) {
    const statusCounts = {
      planned: 0,
      assigned: 0,
      in_progress: 0,
      completed: 0,
      blocked: 0
    };

    tasks.forEach(task => {
      const status = task.status || 'planned';
      if (statusCounts[status] !== undefined) {
        statusCounts[status]++;
      }
    });

    return {
      total_tasks: tasks.length,
      by_status: statusCounts,
      completion_percentage: tasks.length > 0
        ? Math.round((statusCounts.completed / tasks.length) * 100)
        : 0,
      estimated_total_hours: tasks.reduce((sum, task) => sum + (task.estimated_hours || 0), 0),
      actual_hours_spent: 0
    };
  }

  // ============================================
  // V5.2: DOCUMENT REVIEW METHODS
  // ============================================

  /**
   * Get next pending document for review (FIFO)
   */
  async getNextDocumentForReview() {
    const result = await this.request('GET', '/agent/pm/document/next');
    return result.document || null;
  }

  /**
   * List all documents (with optional status filter)
   */
  async listDocuments(status = null) {
    const endpoint = status
      ? `/agent/pm/documents/list?status=${status}`
      : '/agent/pm/documents/list';
    return await this.request('GET', endpoint);
  }

  /**
   * Approve a document
   */
  async approveDocument(docId, feedback = '') {
    return await this.request('POST', `/agent/pm/document/${docId}/approve`, {
      feedback
    });
  }

  /**
   * Reject a document
   */
  async rejectDocument(docId, feedback = '') {
    return await this.request('POST', `/agent/pm/document/${docId}/reject`, {
      feedback
    });
  }

  /**
   * Get document status
   */
  async getDocumentStatus(docId) {
    return await this.request('GET', `/documents/${docId}/status`);
  }

  // ============================================
  // V5.2: SPRINT TASK ASSIGNMENT METHODS
  // ============================================

  /**
   * Assign a sprint task to a developer
   * @param {string} sprintId - Sprint ID (e.g., "sprint-002")
   * @param {string} taskId - Task ID (e.g., "sprint-002-task-001")
   * @param {string} assignedTo - Agent username (e.g., "dev-agent-1")
   * @param {object} metadata - Optional task metadata (title, description, etc.)
   * @param {string} notes - Optional assignment notes
   */
  async assignTask(sprintId, taskId, assignedTo, metadata = {}, notes = '') {
    return await this.request('POST', `/agent/pm/sprint/${sprintId}/task/${taskId}/assign`, {
      assigned_to: assignedTo,
      metadata,
      notes
    });
  }

  /**
   * List all assignments (optionally filter by status)
   * @param {string} status - Optional status filter ("assigned", "accepted", "in_progress", "completed")
   */
  async listAssignments(status = null) {
    const endpoint = status
      ? `/agent/pm/assignments/list?status=${status}`
      : '/agent/pm/assignments/list';
    return await this.request('GET', endpoint);
  }

  /**
   * Get specific assignment details
   * @param {string} assignmentId - Assignment ID
   */
  async getAssignment(assignmentId) {
    return await this.request('GET', `/agent/pm/assignment/${assignmentId}`);
  }

  // ============================================
  // DEMO
  // ============================================

  // CLI demo
  async demo() {
    console.log('🚀 PM Helper V5.1 - Sprint Management Demo\n');

    try {
      // Test authentication
      await this.ensureAuthenticated();

      // Show examples
      console.log('📝 Example: Create Sprint with new folder structure\n');
      console.log('const sprint = pm.createSprintLocal({');
      console.log('  sprint_id: "sprint-002-sales",');
      console.log('  sprint_name: "Sales Module Implementation",');
      console.log('  start_date: "2025-11-04",');
      console.log('  duration_weeks: 2,');
      console.log('  objectives: ["Implement sales order", "Invoice generation"],');
      console.log('  tasks: [...]');
      console.log('});');
      console.log('');
      console.log('// This will create:');
      console.log('// Docs/sprints/sprint-002-sales/');
      console.log('//   ├── README.md (for editing)');
      console.log('//   └── sprint.json (auto-generated)');

    } catch (error) {
      console.error('❌ Demo error:', error.message);
    }
  }
}

// Export class
module.exports = PMHelper;

// CLI execution
if (require.main === module) {
  const pm = new PMHelper();
  pm.demo();
}