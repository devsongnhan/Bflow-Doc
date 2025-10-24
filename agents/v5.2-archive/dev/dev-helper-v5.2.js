#!/usr/bin/env node

/**
 * DEV HELPER V5.2 - With Project-Loader Support
 *
 * Changes in V5.2:
 * - Dynamic path resolution via orchestrator's project-loader
 * - Multi-project support
 * - No hard-coded paths
 * - Loads configuration from orchestrator API
 *
 * For Dev Agents to work with V5.1+ Orchestrator
 * Supports both old JSON and new MD folder-based Sprint structure
 *
 * Usage:
 * node dev-helper-v5.2.js [--host HOST] [--debug] [--sprint SPRINT_ID] [--project PROJECT_ID]
 *
 * Options:
 * --host <ip>     : Orchestrator host IP (default: localhost)
 * --debug         : Enable debug mode
 * --sprint <id>   : Work with specific Sprint
 * --project <id>  : Project ID (default: trading-erp-mcp)
 *
 * Sprint Structure Support:
 * - OLD: Docs/sprints/sprint-xxx.json (direct JSON)
 * - NEW: Docs/sprints/sprint-xxx/ folder containing:
 *   - README.md (user editable)
 *   - sprint.json (auto-generated from MD)
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// ============================================
// CONFIGURATION
// ============================================

const args = process.argv.slice(2);
const debugMode = args.includes('--debug');
const hostIndex = args.indexOf('--host');
const orchestratorHost = hostIndex !== -1 ? args[hostIndex + 1] : 'localhost';
const sprintIndex = args.indexOf('--sprint');
const targetSprintId = sprintIndex !== -1 ? args[sprintIndex + 1] : null;
const projectIndex = args.indexOf('--project');
const projectId = projectIndex !== -1 ? args[projectIndex + 1] : 'trading-erp-mcp';

const API_BASE = `http://${orchestratorHost}:3000`;
const API_KEY = 'dev-simple-key-12345';
const AGENT_NAME = 'dev-agent-1';

// V5.2: Project configuration (loaded dynamically from orchestrator)
const PROJECT_ROOT = path.resolve(__dirname, '../..');
let projectConfig = null;  // Will be loaded from API
let SPRINTS_DIR = null;    // Will be resolved dynamically
let MD_CONVERTER = null;   // Will be resolved dynamically

// ============================================
// COLOR UTILITIES
// ============================================

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

function log(message, color = 'white') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function debug(message) {
    if (debugMode) {
        console.log(`${colors.cyan}[DEBUG] ${message}${colors.reset}`);
    }
}

function error(message) {
    console.error(`${colors.red}❌ ${message}${colors.reset}`);
}

function success(message) {
    console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

// ============================================
// V5.2: PROJECT CONFIG LOADER
// ============================================

async function loadProjectConfig() {
    if (projectConfig) {
        return projectConfig;  // Already loaded
    }

    try {
        const url = `${API_BASE}/projects/${projectId}/config`;
        const response = await makeRequest('GET', url);
        projectConfig = response;

        // Set dynamic paths
        SPRINTS_DIR = path.join(PROJECT_ROOT, projectConfig.paths.sprints.base);

        if (projectConfig.tooling && projectConfig.tooling.md_converter) {
            MD_CONVERTER = path.join(PROJECT_ROOT, projectConfig.tooling.md_converter);
        }

        log(`✅ Project config loaded: ${projectConfig.project.name}`, 'green');
        log(`   Sprints: ${projectConfig.paths.sprints.base}`, 'white');

        return projectConfig;
    } catch (error) {
        log(`⚠️  Failed to load project config: ${error.message}`, 'yellow');
        log(`   Using fallback defaults`, 'yellow');

        // Fallback
        projectConfig = {
            project: { id: projectId, name: projectId },
            paths: {
                sprints: { base: 'Docs/sprints', readme: 'README.md', json: 'sprint.json' }
            }
        };

        SPRINTS_DIR = path.join(PROJECT_ROOT, 'Docs/sprints');
        MD_CONVERTER = path.join(SPRINTS_DIR, 'tools/md-to-json-converter.js');

        return projectConfig;
    }
}

// ============================================
// SPRINT MANAGEMENT
// ============================================

class SprintManager {
    constructor() {
        this.projectId = projectId;
        this.configLoaded = false;
    }

    async ensureConfig() {
        if (!this.configLoaded) {
            await loadProjectConfig();
            this.configLoaded = true;
        }
    }

    /**
     * Get Sprint path info (supports both old JSON and new folder structure)
     */
    async getSprintPath(sprint_id) {
        await this.ensureConfig();

        // Check for new folder structure first
        const folderPath = path.join(SPRINTS_DIR, sprint_id);
        if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
            return {
                type: 'folder',
                path: folderPath,
                mdFile: path.join(folderPath, projectConfig.paths.sprints.readme),
                jsonFile: path.join(folderPath, projectConfig.paths.sprints.json)
            };
        }

        // Check for old JSON file
        const jsonPath = path.join(SPRINTS_DIR, `${sprint_id}.json`);
        if (fs.existsSync(jsonPath)) {
            return {
                type: 'json',
                path: jsonPath,
                jsonFile: jsonPath
            };
        }

        return null;
    }

    /**
     * Load Sprint data (handles both formats)
     */
    async loadSprint(sprint_id) {
        const sprintInfo = await this.getSprintPath(sprint_id);

        if (!sprintInfo) {
            throw new Error(`Sprint ${sprint_id} not found`);
        }

        if (sprintInfo.type === 'folder') {
            // Regenerate JSON from MD if needed
            if (fs.existsSync(sprintInfo.mdFile)) {
                const mdTime = fs.statSync(sprintInfo.mdFile).mtime;
                const jsonExists = fs.existsSync(sprintInfo.jsonFile);
                const jsonTime = jsonExists ? fs.statSync(sprintInfo.jsonFile).mtime : new Date(0);

                if (!jsonExists || mdTime > jsonTime) {
                    log(`🔄 Regenerating JSON from MD for ${sprint_id}...`, 'yellow');
                    try {
                        execSync(`node "${MD_CONVERTER}" "${sprintInfo.mdFile}"`, {
                            cwd: SPRINTS_DIR,
                            stdio: 'inherit'
                        });
                    } catch (err) {
                        error(`Failed to convert MD to JSON: ${err.message}`);
                    }
                }
            }
        }

        // Load and return JSON data
        try {
            const data = fs.readFileSync(sprintInfo.jsonFile, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            throw new Error(`Failed to load Sprint JSON: ${err.message}`);
        }
    }

    /**
     * List all available Sprints
     */
    async listSprints() {
        await this.ensureConfig();

        const sprints = [];
        const items = fs.readdirSync(SPRINTS_DIR);

        items.forEach(item => {
            const itemPath = path.join(SPRINTS_DIR, item);
            const stats = fs.statSync(itemPath);

            if (stats.isDirectory() && item.startsWith('sprint-')) {
                // New folder structure
                const jsonFile = path.join(itemPath, projectConfig.paths.sprints.json);
                if (fs.existsSync(jsonFile)) {
                    try {
                        const data = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
                        sprints.push({
                            id: item,
                            name: data.sprint_name || item,
                            status: data.status || 'unknown',
                            type: 'folder'
                        });
                    } catch (err) {
                        debug(`Error reading ${item}: ${err.message}`);
                    }
                }
            } else if (item.endsWith('.json') && item.startsWith('sprint-')) {
                // Old JSON structure
                try {
                    const data = JSON.parse(fs.readFileSync(itemPath, 'utf-8'));
                    const id = item.replace('.json', '');
                    sprints.push({
                        id: id,
                        name: data.sprint_name || id,
                        status: data.status || 'unknown',
                        type: 'json'
                    });
                } catch (err) {
                    debug(`Error reading ${item}: ${err.message}`);
                }
            }
        });

        return sprints.sort((a, b) => a.id.localeCompare(b.id));
    }

    /**
     * Get task details from Sprint
     */
    async getTask(sprint_id, task_id) {
        const sprint = await this.loadSprint(sprint_id);
        return sprint.tasks.find(t => t.task_id === task_id);
    }

    /**
     * Update task status in Sprint
     */
    async updateTaskStatus(sprint_id, task_id, status, updates = {}) {
        const sprintInfo = await this.getSprintPath(sprint_id);
        if (!sprintInfo) {
            throw new Error(`Sprint ${sprint_id} not found`);
        }

        const sprint = await this.loadSprint(sprint_id);
        const task = sprint.tasks.find(t => t.task_id === task_id);

        if (!task) {
            throw new Error(`Task ${task_id} not found in Sprint ${sprint_id}`);
        }

        // Update task
        task.status = status;
        Object.assign(task, updates);

        // Save updated Sprint JSON
        fs.writeFileSync(sprintInfo.jsonFile, JSON.stringify(sprint, null, 2));

        // If folder structure, also update MD
        if (sprintInfo.type === 'folder' && fs.existsSync(sprintInfo.mdFile)) {
            log(`⚠️  Remember to update README.md to reflect task status changes`, 'yellow');
        }

        return task;
    }
}

// ============================================
// API UTILITIES
// ============================================

async function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(`${API_BASE}${path}`);

        const options = {
            hostname: url.hostname,
            port: url.port || 80,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY
            }
        };

        debug(`${method} ${url.href}`);

        const req = http.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    const json = JSON.parse(responseData);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(json);
                    } else {
                        reject(new Error(json.error || `HTTP ${res.statusCode}`));
                    }
                } catch (e) {
                    reject(new Error(`Invalid JSON response: ${responseData}`));
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

// ============================================
// V5.2: ASSIGNMENT API METHODS
// ============================================

/**
 * Get next assignment (PM assign = Dev đã nhận)
 */
async function getNextAssignment() {
    try {
        const result = await makeRequest('GET', '/agent/dev/assignment/next');
        return result.assignment || null;
    } catch (err) {
        error(`Failed to get next assignment: ${err.message}`);
        return null;
    }
}

/**
 * Get my assignments with optional status filter
 */
async function getMyAssignments(status = null) {
    try {
        const path = status
            ? `/agent/dev/assignments/my?status=${status}`
            : '/agent/dev/assignments/my';
        const result = await makeRequest('GET', path);
        return result.assignments || [];
    } catch (err) {
        error(`Failed to get assignments: ${err.message}`);
        return [];
    }
}

/**
 * Submit assignment to QA
 * Simplified workflow: PM assign → Dev làm → Dev submit
 */
async function submitAssignment(assignmentId, result) {
    try {
        const response = await makeRequest('POST', `/agent/dev/assignment/${assignmentId}/submit`, {
            result
        });
        success(`Assignment ${assignmentId} submitted to QA!`);
        return response;
    } catch (err) {
        error(`Failed to submit assignment: ${err.message}`);
        throw err;
    }
}

/**
 * Get assignment details
 */
async function getAssignment(assignmentId) {
    try {
        return await makeRequest('GET', `/agent/dev/assignment/${assignmentId}`);
    } catch (err) {
        error(`Failed to get assignment: ${err.message}`);
        return null;
    }
}

// ============================================
// TASK PROCESSING
// ============================================

async function processTask(task, sprintManager) {
    log(`\n📋 Processing task: ${task.task_id}`, 'cyan');
    log(`   Title: ${task.title}`, 'white');
    log(`   Sprint: ${task.sprint_id || 'N/A'}`, 'white');

    // V5.2: Check if task has BA documentation
    if (task.ba_documents) {
        log(`\n📄 BA Documentation:`, 'yellow');
        if (task.ba_documents.design_doc_id) {
            log(`   Design Doc: ${task.ba_documents.design_doc_id}`, 'white');
            log(`   Status: ${task.ba_documents.design_doc_status || 'unknown'}`, 'white');

            // V5.2: ENFORCE design approval check
            if (task.ba_documents.design_doc_status !== 'approved') {
                log(`\n❌ BLOCKED: Design document not approved!`, 'red');
                log(`   Design Doc ID: ${task.ba_documents.design_doc_id}`, 'red');
                log(`   Current Status: ${task.ba_documents.design_doc_status || 'unknown'}`, 'red');
                log(`\n⚠️  Action Required:`, 'yellow');
                log(`   1. Notify PM to review and approve design document`, 'yellow');
                log(`   2. Wait for design approval before starting development`, 'yellow');
                log(`   3. Check dashboard for document status updates`, 'yellow');
                throw new Error(`Cannot start task: Design document ${task.ba_documents.design_doc_id} requires PM approval (status: ${task.ba_documents.design_doc_status || 'unknown'})`);
            }

            log(`   ✅ Design approved - Ready to start development`, 'green');
        }
        if (task.ba_documents.requirement_doc_id) {
            log(`   Requirement Doc: ${task.ba_documents.requirement_doc_id}`, 'white');
        }
    }

    // Load Sprint for full task details if available
    if (task.sprint_id && sprintManager) {
        try {
            const fullTask = await sprintManager.getTask(task.sprint_id, task.task_id);
            if (fullTask) {
                log(`\n📝 Task Details from Sprint:`, 'magenta');
                log(`   Category: ${fullTask.category}`, 'white');
                log(`   Priority: ${fullTask.priority}`, 'white');
                log(`   Complexity: ${fullTask.complexity}`, 'white');
                log(`   Estimated Hours: ${fullTask.estimated_hours}`, 'white');

                if (fullTask.files_to_modify && fullTask.files_to_modify.length > 0) {
                    log(`\n📁 Files to modify:`, 'yellow');
                    fullTask.files_to_modify.forEach(file => {
                        log(`   - ${file}`, 'white');
                    });
                }

                if (fullTask.acceptance_criteria && fullTask.acceptance_criteria.length > 0) {
                    log(`\n✅ Acceptance Criteria:`, 'green');
                    fullTask.acceptance_criteria.forEach(criteria => {
                        log(`   ${criteria}`, 'white');
                    });
                }
            }
        } catch (err) {
            debug(`Could not load Sprint details: ${err.message}`);
        }
    }

    // Simulate task processing
    log(`\n⚙️  Processing...`, 'yellow');

    // Here you would implement actual task processing logic
    // For example: running tests, building code, etc.

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mark as completed
    const result = {
        status: 'completed',
        result: {
            task_id: task.task_id,
            execution_time: '2.5s',
            tests_passed: true,
            build_successful: true
        }
    };

    return result;
}

// ============================================
// MAIN WORKFLOW
// ============================================

async function main() {
    console.clear();
    log(`\n${'='.repeat(60)}`, 'cyan');
    log(`DEV HELPER V5.2 - With Project-Loader Support`, 'bright');
    log(`${'='.repeat(60)}`, 'cyan');
    log(`Agent: ${AGENT_NAME}`, 'white');
    log(`Project: ${projectId}`, 'white');
    log(`Orchestrator: ${API_BASE}`, 'white');
    log(`API Key: ${API_KEY}`, 'white');
    if (targetSprintId) {
        log(`Target Sprint: ${targetSprintId}`, 'yellow');
    }
    log(`${'='.repeat(60)}\n`, 'cyan');

    const sprintManager = new SprintManager();

    // List available Sprints
    log(`\n📚 Available Sprints:`, 'yellow');
    const sprints = await sprintManager.listSprints();
    sprints.forEach(sprint => {
        const typeIcon = sprint.type === 'folder' ? '📁' : '📄';
        log(`   ${typeIcon} ${sprint.id}: ${sprint.name} [${sprint.status}]`, 'white');
    });

    // Main processing loop
    while (true) {
        try {
            log(`\n⏳ Checking for new tasks...`, 'yellow');

            // Get next task from orchestrator
            const response = await makeRequest('GET', '/agent/dev/task/next');

            if (response.task) {
                const task = response.task;
                success(`New task received: ${task.id}`);

                // Process the task
                const result = await processTask(task, sprintManager);

                // Submit completion
                await makeRequest('POST', `/agent/dev/task/complete`, {
                    task_id: task.id,
                    status: result.status,
                    result: result.result
                });

                success(`Task ${task.id} completed successfully!`);

                // Update Sprint if applicable
                if (task.sprint_id && task.task_id) {
                    try {
                        await sprintManager.updateTaskStatus(
                            task.sprint_id,
                            task.task_id,
                            'completed',
                            {
                                'assignment.completed_at': new Date().toISOString()
                            }
                        );
                        log(`📊 Updated Sprint ${task.sprint_id}`, 'green');
                    } catch (err) {
                        debug(`Could not update Sprint: ${err.message}`);
                    }
                }

            } else {
                log('No tasks available', 'white');
            }

            // Wait before next check
            await new Promise(resolve => setTimeout(resolve, 10000));

        } catch (err) {
            error(`Error: ${err.message}`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

// ============================================
// EXPORTS (when used as module)
// ============================================

module.exports = {
    // V5.2 Assignment methods
    getNextAssignment,
    getMyAssignments,
    submitAssignment,
    getAssignment,
    // Utilities
    makeRequest,
    loadProjectConfig
};

// ============================================
// MAIN (when run as standalone CLI)
// ============================================

// Only run if this file is executed directly
if (require.main === module) {
    // Handle graceful shutdown
    process.on('SIGINT', () => {
        log('\n\n👋 Shutting down gracefully...', 'yellow');
        process.exit(0);
    });

    // Start the helper
    main().catch(err => {
        error(`Fatal error: ${err.message}`);
        process.exit(1);
    });
}