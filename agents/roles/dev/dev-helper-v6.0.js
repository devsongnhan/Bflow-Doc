#!/usr/bin/env node

/**
 * DEV HELPER V6.0 - Shared Helper Template
 *
 * V6.0 Changes:
 * - Load API key from .env file (agent-specific, not hard-coded)
 * - Support multi-role agents
 * - Add report creation and submission
 * - Remove test functions (QA only)
 * - Simplified: Focus on assignments and reports
 *
 * Usage:
 *
 * 1. From agent folder (recommended):
 *    cd agents/hai
 *    node ../../orchestrator/roles/dev/dev-helper-v6.0.js
 *    → Auto loads .env from agents/hai/.env
 *
 * 2. With environment variables:
 *    AGENT_USERNAME=hai API_KEY=hai-dev-key-xxx node dev-helper-v6.0.js
 *
 * 3. As module in code:
 *    const devHelper = require('./orchestrator/roles/dev/dev-helper-v6.0.js');
 *    const assignments = await devHelper.getMyAssignments();
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

// ============================================
// FIND ROOT FOLDER AND LOAD ORCHESTRATOR IP
// ============================================

function findRootFolder() {
    // Try to find agents folder (which contains orchestrator-ip.md)
    const searchPaths = [
        path.join(__dirname, '..', '..'),           // From roles/dev/ → agents/
        path.join(process.cwd(), 'agents'),         // From root → agents/
        path.join(process.cwd()),                   // Already in agents
    ];

    for (const searchPath of searchPaths) {
        if (fs.existsSync(path.join(searchPath, 'orchestrator-ip.md'))) {
            return searchPath;
        }
    }
    return null;
}

const agentsFolder = findRootFolder();
let orchestratorConfigUtil;

// Load orchestrator config utility if available (for dynamic IP support)
// Try both locations: orchestrator/shared/system/ (preferred) and orchestrator/shared/
if (agentsFolder) {
    const configPaths = [
        path.join(agentsFolder, '..', 'orchestrator', 'shared', 'system', 'orchestrator-config.js'),
        path.join(agentsFolder, '..', 'orchestrator', 'shared', 'orchestrator-config.js')
    ];

    for (const configPath of configPaths) {
        try {
            if (fs.existsSync(configPath)) {
                orchestratorConfigUtil = require(configPath);
                break;
            }
        } catch (err) {
            // Continue to next path
        }
    }
}

// ============================================
// ENV LOADER
// ============================================

function loadEnvFile() {
    /**
     * Try to find and load .env file
     * Search paths:
     * 1. Current directory
     * 2. Parent directories
     */
    const searchPaths = [
        process.cwd(),
        path.join(process.cwd(), '..'),
        path.join(process.cwd(), '../..'),
        path.join(process.cwd(), '../../..')
    ];

    for (const dir of searchPaths) {
        const envPath = path.join(dir, '.env');
        if (fs.existsSync(envPath)) {
            console.log(`📄 Loading config from: ${envPath}`);
            const envContent = fs.readFileSync(envPath, 'utf-8');
            envContent.split('\n').forEach(line => {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#')) {
                    const match = trimmed.match(/^([^=]+)=(.*)$/);
                    if (match) {
                        const key = match[1].trim();
                        const value = match[2].trim().replace(/^["']|["']$/g, '');
                        if (!process.env[key]) {
                            process.env[key] = value;
                        }
                    }
                }
            });
            return true;
        }
    }
    return false;
}

// Auto-load .env if exists
loadEnvFile();

// ============================================
// CONFIGURATION
// ============================================

const AGENT_USERNAME = process.env.AGENT_USERNAME;
const AGENT_DISPLAY_NAME = process.env.AGENT_DISPLAY_NAME || AGENT_USERNAME;
const AGENT_ROLES = (process.env.AGENT_ROLES || 'dev').split(',').map(r => r.trim()).filter(r => r);
const AGENT_PRIMARY_ROLE = process.env.AGENT_PRIMARY_ROLE || 'dev';
const API_KEY = process.env.API_KEY;

// Get ORCHESTRATOR_URL - try to read from orchestrator-ip.md first
let ORCHESTRATOR_URL = process.env.ORCHESTRATOR_URL || 'http://localhost:3000';

// Try to read orchestrator-ip.md directly from agents folder
if (agentsFolder) {
    try {
        const ipFilePath = path.join(agentsFolder, 'orchestrator-ip.md');
        const ipFileContent = fs.readFileSync(ipFilePath, 'utf-8');
        const ipMatch = ipFileContent.match(/ORCHESTRATOR_IP=(.+)/);
        const portMatch = ipFileContent.match(/ORCHESTRATOR_PORT=(.+)/);

        if (ipMatch) {
            const ip = ipMatch[1].trim();
            const port = portMatch ? portMatch[1].trim() : '3000';
            ORCHESTRATOR_URL = `http://${ip}:${port}`;
        }
    } catch (err) {
        // Fall through to next method
    }
}

// If still not found, try orchestrator-config utility
if (ORCHESTRATOR_URL === (process.env.ORCHESTRATOR_URL || 'http://localhost:3000') && orchestratorConfigUtil) {
    try {
        ORCHESTRATOR_URL = orchestratorConfigUtil.getOrchestratorUrlSync();
    } catch (err) {
        // Use default
    }
}

// Project configuration
const PROJECT_IDS = (process.env.PROJECT_IDS || 'trading-erp-mcp')
    .split(',')
    .map(p => p.trim())
    .filter(p => p);
const PRIMARY_PROJECT_ID = process.env.PRIMARY_PROJECT_ID || PROJECT_IDS[0] || 'trading-erp-mcp';

// Validation
if (!AGENT_USERNAME) {
    console.error('❌ ERROR: AGENT_USERNAME not set');
    console.error('   Please set in .env file or environment variable');
    console.error('   Example: AGENT_USERNAME=hai');
    process.exit(1);
}

if (!API_KEY) {
    console.error('❌ ERROR: API_KEY not set');
    console.error('   Please set in .env file or environment variable');
    console.error('   Example: API_KEY=hai-dev-key-abc123');
    process.exit(1);
}

// Banner
console.log(`\n${'='.repeat(70)}`);
console.log(`DEV HELPER V6.0 - Agent: ${AGENT_DISPLAY_NAME} (${AGENT_USERNAME})`);
console.log(`Roles: ${AGENT_ROLES.join(', ')} | Primary: ${AGENT_PRIMARY_ROLE}`);
console.log(`Projects: ${PROJECT_IDS.join(', ')} | Primary: ${PRIMARY_PROJECT_ID}`);
console.log(`Orchestrator: ${ORCHESTRATOR_URL}`);
console.log(`${'='.repeat(70)}\n`);

// ============================================
// COLOR UTILITIES
// ============================================

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m'
};

function success(msg) {
    console.log(`${colors.green}✅ ${msg}${colors.reset}`);
}

function error(msg) {
    console.error(`${colors.red}❌ ${msg}${colors.reset}`);
}

function warn(msg) {
    console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`);
}

function info(msg) {
    console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`);
}

// ============================================
// API UTILITIES
// ============================================

async function makeRequest(method, urlPath, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(`${ORCHESTRATOR_URL}${urlPath}`);

        const options = {
            hostname: url.hostname,
            port: url.port || 80,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY,
                'X-Agent-Username': AGENT_USERNAME,
                'X-Agent-Role': 'dev'  // Working as dev
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => { responseData += chunk; });
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
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

// ============================================
// ASSIGNMENT FUNCTIONS
// ============================================

/**
 * Get assignments assigned to this agent
 * @param {string} status - Filter by status: assigned, submitted, completed
 * @returns {Array} List of assignments
 */
async function getMyAssignments(status = null) {
    try {
        const path = status
            ? `/agent/assignments/my?status=${status}`
            : '/agent/assignments/my';
        const result = await makeRequest('GET', path);
        return result.assignments || [];
    } catch (err) {
        error(`Failed to get assignments: ${err.message}`);
        return [];
    }
}

/**
 * Get next assignment to work on
 * @returns {Object|null} Next assignment or null if none available
 */
async function getNextAssignment() {
    try {
        const result = await makeRequest('GET', '/agent/assignment/next');
        if (result.available && result.assignment) {
            return result.assignment;
        }
        return null;
    } catch (err) {
        error(`Failed to get next assignment: ${err.message}`);
        return null;
    }
}

/**
 * Get specific assignment details
 * @param {string} assignmentId
 * @returns {Object|null} Assignment object
 */
async function getAssignment(assignmentId) {
    try {
        const result = await makeRequest('GET', `/agent/assignment/${assignmentId}`);
        return result.assignment;
    } catch (err) {
        error(`Failed to get assignment: ${err.message}`);
        return null;
    }
}

/**
 * Submit assignment to QA
 * @param {string} assignmentId
 * @param {Object} result - Submission result
 * @param {boolean} result.success
 * @param {string} result.summary
 * @param {Array<string>} result.files_modified
 * @param {boolean} result.tests_passed - Local tests (if any)
 * @param {string} result.notes - Implementation notes
 */
async function submitAssignment(assignmentId, result) {
    try {
        const response = await makeRequest('POST', `/agent/assignment/${assignmentId}/submit`, {
            result
        });
        success(`Assignment ${assignmentId} submitted to QA!`);
        return response;
    } catch (err) {
        error(`Failed to submit assignment: ${err.message}`);
        throw err;
    }
}

// ============================================
// REPORT FUNCTIONS (V6.0 NEW)
// ============================================

/**
 * Create sprint report
 * @param {Object} reportData
 * @param {string} reportData.title - Report title
 * @param {string} reportData.report_type - sprint_report, weekly_report, etc.
 * @param {number} reportData.num_assignments - Number of recent assignments to include
 * @param {string} reportData.sprint_id - Optional sprint ID
 * @param {string} reportData.project - Optional project override (defaults to PRIMARY_PROJECT_ID)
 * @returns {Object} Created report
 */
async function createReport(reportData) {
    try {
        // Auto-inject project_id from PRIMARY_PROJECT_ID
        const projectId = reportData.project || PRIMARY_PROJECT_ID;

        // Validate project
        if (!PROJECT_IDS.includes(projectId)) {
            warn(`⚠️ Project "${projectId}" not in agent's PROJECT_IDS (${PROJECT_IDS.join(', ')})`);
            warn(`   Proceeding anyway, but this may be rejected by orchestrator`);
        }

        const response = await makeRequest('POST', '/agent/report/create', {
            ...reportData,
            project: projectId,
            created_by: AGENT_USERNAME
        });
        success(`Report created: ${response.report_id}`);
        info(`Project: ${projectId} | File: ${response.filepath}`);
        if (response.stats) {
            info(`Stats: ${response.stats.assignments_completed} completed, ${response.stats.success_rate} success rate`);
        }
        return response;
    } catch (err) {
        error(`Failed to create report: ${err.message}`);
        throw err;
    }
}

/**
 * Submit report to PM for review
 * @param {string} reportId
 * @param {string} message - Optional message to PM
 */
async function submitReportToPM(reportId, message = null) {
    try {
        const response = await makeRequest('POST', `/agent/report/${reportId}/submit`, {
            message: message || 'Please review this report'
        });
        success(`Report ${reportId} submitted to PM for review`);
        return response;
    } catch (err) {
        error(`Failed to submit report: ${err.message}`);
        throw err;
    }
}

/**
 * Get reports created by this agent
 * @param {string} status - Filter by status: pending, approved, rejected
 * @returns {Array} List of reports
 */
async function getMyReports(status = null) {
    try {
        const path = status
            ? `/agent/reports/my?status=${status}`
            : '/agent/reports/my';
        const result = await makeRequest('GET', path);
        return result.reports || [];
    } catch (err) {
        error(`Failed to get reports: ${err.message}`);
        return [];
    }
}

/**
 * Get specific report details
 * @param {string} reportId
 * @returns {Object|null} Report object
 */
async function getReport(reportId) {
    try {
        const result = await makeRequest('GET', `/agent/report/${reportId}`);
        return result.report;
    } catch (err) {
        error(`Failed to get report: ${err.message}`);
        return null;
    }
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
    // Assignment functions
    getMyAssignments,
    getNextAssignment,
    getAssignment,
    submitAssignment,

    // Report functions (V6.0 NEW)
    createReport,
    submitReportToPM,
    getMyReports,
    getReport,

    // Utilities
    makeRequest,

    // Agent info
    agentInfo: {
        username: AGENT_USERNAME,
        displayName: AGENT_DISPLAY_NAME,
        roles: AGENT_ROLES,
        primaryRole: AGENT_PRIMARY_ROLE
    }
};

// ============================================
// MAIN (CLI MODE)
// ============================================

if (require.main === module) {
    const readline = require('readline');

    function askUser(question) {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question(question, (answer) => {
                rl.close();
                resolve(answer.trim().toLowerCase());
            });
        });
    }

    async function implementIssue() {
        console.log('\n🔧 Implement Issue Fix\n');

        const issueId = await askUser('Issue ID: ');
        const message = await askUser('Implementation message: ');
        const filesStr = await askUser('Files modified (comma-separated): ');
        const files_modified = filesStr ? filesStr.split(',').map(f => f.trim()) : [];

        try {
            const response = await makeRequest('POST', `/dev/issue/${issueId}/implement`, {
                message,
                files_modified,
                test_results: {}
            });

            if (response.success) {
                success(`\n✅ Issue implementation submitted!`);
                success(`Issue: ${response.issue.issue_id}`);
                success(`Status: ${response.issue.status}`);
            } else {
                error(`\n❌ Failed: ${response.error}`);
            }
        } catch (err) {
            error(`\n❌ Error: ${err.message}`);
        }
    }

    async function main() {
        info('Checking for assignments and issues...\n');

        // Get assigned tasks
        const assigned = await getMyAssignments('assigned');
        if (assigned.length > 0) {
            console.log(`📋 Assigned tasks (${assigned.length}):`);
            assigned.forEach(a => {
                console.log(`  - ${a.assignment_id}: ${a.metadata?.title || a.sprint_task_id}`);
                console.log(`    Assigned: ${a.assigned_at}`);
            });
            console.log('');
        }

        // Get submitted tasks
        const submitted = await getMyAssignments('submitted');
        if (submitted.length > 0) {
            console.log(`📤 Submitted to QA (${submitted.length}):`);
            submitted.forEach(a => {
                console.log(`  - ${a.assignment_id}: ${a.metadata?.title || a.sprint_task_id}`);
                console.log(`    Submitted: ${a.submitted_at}`);
            });
            console.log('');
        }

        // Get completed tasks
        const completed = await getMyAssignments('completed');
        if (completed.length > 0) {
            console.log(`✅ Completed (${completed.length}):`);
            completed.forEach(a => {
                console.log(`  - ${a.assignment_id}: ${a.metadata?.title || a.sprint_task_id}`);
                console.log(`    Completed: ${a.completed_at}`);
            });
            console.log('');
        }

        if (assigned.length === 0 && submitted.length === 0 && completed.length === 0) {
            info('No assignments yet. Waiting for PM to assign tasks.');
        }

        // Get reports
        console.log('\n📊 Reports:\n');
        const reports = await getMyReports();
        if (reports.length > 0) {
            reports.forEach(r => {
                const statusIcon = r.status === 'approved' ? '✅' : r.status === 'rejected' ? '❌' : '⏳';
                console.log(`  ${statusIcon} ${r.report_id}: ${r.title}`);
                console.log(`     Status: ${r.status} | Created: ${r.created_at}`);
            });
        } else {
            info('No reports created yet.');
        }

        // Ask if user wants to implement issue
        console.log('');
        const implementChoice = await askUser('Do you want to implement an issue fix? (yes/no): ');
        if (implementChoice === 'yes' || implementChoice === 'y') {
            await implementIssue();
        }
    }

    main().catch(err => {
        error(`Fatal error: ${err.message}`);
        process.exit(1);
    });
}
