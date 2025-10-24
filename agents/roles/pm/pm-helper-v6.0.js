#!/usr/bin/env node

/**
 * PM HELPER V6.0 - Shared Helper Template
 *
 * V6.0 Changes:
 * - Load API key from .env file (agent-specific)
 * - Support multi-role agents (PM + BA)
 * - Assign tasks to specific agents (not just roles)
 * - Review BA documents
 * - Review dev reports
 * - View all project activity
 *
 * Usage:
 * 1. From agent folder:
 *    cd agents/osa
 *    node ../../orchestrator/roles/pm/pm-helper-v6.0.js
 *
 * 2. As module:
 *    const pmHelper = require('./orchestrator/roles/pm/pm-helper-v6.0.js');
 *    await pmHelper.assignTask('SR001', { assigned_to: 'hai' });
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
        path.join(__dirname, '..', '..'),           // From roles/pm/ → agents/
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

loadEnvFile();

// ============================================
// CONFIGURATION
// ============================================

const AGENT_USERNAME = process.env.AGENT_USERNAME;
const AGENT_DISPLAY_NAME = process.env.AGENT_DISPLAY_NAME || AGENT_USERNAME;
const AGENT_ROLES = (process.env.AGENT_ROLES || 'pm').split(',').map(r => r.trim()).filter(r => r);
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

if (!AGENT_USERNAME || !API_KEY) {
    console.error('❌ ERROR: AGENT_USERNAME and API_KEY must be set');
    process.exit(1);
}

console.log(`\n${'='.repeat(70)}`);
console.log(`PM HELPER V6.0 - Agent: ${AGENT_DISPLAY_NAME} (${AGENT_USERNAME})`);
console.log(`Roles: ${AGENT_ROLES.join(', ')}`);
console.log(`Projects: ${PROJECT_IDS.join(', ')} | Primary: ${PRIMARY_PROJECT_ID}`);
console.log(`Orchestrator: ${ORCHESTRATOR_URL}`);
console.log(`${'='.repeat(70)}\n`);

// ============================================
// UTILITIES
// ============================================

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m'
};

function success(msg) { console.log(`${colors.green}✅ ${msg}${colors.reset}`); }
function error(msg) { console.error(`${colors.red}❌ ${msg}${colors.reset}`); }
function warn(msg) { console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`); }
function info(msg) { console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`); }

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
                'X-Agent-Role': 'pm'
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
// SPRINT MANAGEMENT
// ============================================

async function createSprint(sprintData) {
    try {
        // Auto-inject project_id from PRIMARY_PROJECT_ID
        const projectId = sprintData.project || PRIMARY_PROJECT_ID;

        // Validate project
        if (!PROJECT_IDS.includes(projectId)) {
            warn(`⚠️ Project "${projectId}" not in agent's PROJECT_IDS (${PROJECT_IDS.join(', ')})`);
            warn(`   Proceeding anyway, but this may be rejected by orchestrator`);
        }

        const response = await makeRequest('POST', '/pm/sprint/create', {
            ...sprintData,
            project: projectId,
            created_by: AGENT_USERNAME
        });
        success(`Sprint created: ${response.sprint_id}`);
        info(`Project: ${projectId}`);
        return response;
    } catch (err) {
        error(`Failed to create sprint: ${err.message}`);
        throw err;
    }
}

async function getAllSprints() {
    try {
        const result = await makeRequest('GET', '/pm/sprints');
        return result.sprints || [];
    } catch (err) {
        error(`Failed to get sprints: ${err.message}`);
        return [];
    }
}

// ============================================
// TASK ASSIGNMENT (V6.0 - Agent-specific)
// ============================================

/**
 * Assign sprint task to specific agent
 * @param {string} taskId - Sprint task ID (e.g., 'SR001')
 * @param {Object} options
 * @param {string} options.assigned_to - Agent username (e.g., 'hai')
 * @param {string} options.assigned_as_role - Role to assign as (e.g., 'dev')
 * @param {string} options.priority - Optional priority
 */
async function assignTask(taskId, options) {
    try {
        const { assigned_to, assigned_as_role = 'dev', priority } = options;

        if (!assigned_to) {
            throw new Error('assigned_to (agent username) is required');
        }

        const response = await makeRequest('POST', `/pm/sprint/task/${taskId}/assign`, {
            assigned_to,
            assigned_as_role,
            priority
        });

        success(`Task ${taskId} assigned to ${assigned_to} (as ${assigned_as_role})`);
        info(`Assignment ID: ${response.assignment.assignment_id}`);
        return response.assignment;
    } catch (err) {
        error(`Failed to assign task: ${err.message}`);
        throw err;
    }
}

/**
 * Get all assignments (from all devs)
 * PM can see all assignments
 */
async function getAllAssignments(status = null) {
    try {
        const path = status
            ? `/pm/assignments?status=${status}`
            : '/pm/assignments';
        const result = await makeRequest('GET', path);
        return result.assignments || [];
    } catch (err) {
        error(`Failed to get assignments: ${err.message}`);
        return [];
    }
}

// ============================================
// DOCUMENT REVIEW (BA Documents)
// ============================================

/**
 * Get all BA documents
 * @param {string} status - Filter: pending, approved, rejected
 */
async function getBaDocuments(status = null) {
    try {
        const path = status
            ? `/pm/documents?status=${status}`
            : '/pm/documents';
        const result = await makeRequest('GET', path);
        return result.documents || [];
    } catch (err) {
        error(`Failed to get BA documents: ${err.message}`);
        return [];
    }
}

/**
 * Approve BA document
 */
async function approveDocument(documentId, feedback = null) {
    try {
        const response = await makeRequest('POST', `/pm/document/${documentId}/approve`, {
            feedback: feedback || 'Document approved'
        });
        success(`Document ${documentId} approved`);
        return response;
    } catch (err) {
        error(`Failed to approve document: ${err.message}`);
        throw err;
    }
}

/**
 * Reject BA document
 */
async function rejectDocument(documentId, feedback) {
    try {
        if (!feedback) {
            throw new Error('Feedback is required when rejecting document');
        }
        const response = await makeRequest('POST', `/pm/document/${documentId}/reject`, {
            feedback
        });
        warn(`Document ${documentId} rejected`);
        info(`Feedback: ${feedback}`);
        return response;
    } catch (err) {
        error(`Failed to reject document: ${err.message}`);
        throw err;
    }
}

// ============================================
// REPORT REVIEW (Dev Reports) - V6.0 NEW
// ============================================

/**
 * Get all dev reports
 * PM can see reports from ALL developers
 */
async function getAllReports(status = null) {
    try {
        const path = status
            ? `/pm/reports?status=${status}`
            : '/pm/reports';
        const result = await makeRequest('GET', path);
        return result.reports || [];
    } catch (err) {
        error(`Failed to get reports: ${err.message}`);
        return [];
    }
}

/**
 * Get specific report details
 */
async function getReport(reportId) {
    try {
        const result = await makeRequest('GET', `/pm/report/${reportId}`);
        return result.report;
    } catch (err) {
        error(`Failed to get report: ${err.message}`);
        return null;
    }
}

/**
 * Approve dev report
 */
async function approveReport(reportId, feedback = null) {
    try {
        const response = await makeRequest('POST', `/pm/report/${reportId}/approve`, {
            feedback: feedback || 'Report approved'
        });
        success(`Report ${reportId} approved`);
        return response;
    } catch (err) {
        error(`Failed to approve report: ${err.message}`);
        throw err;
    }
}

/**
 * Reject dev report with feedback
 */
async function rejectReport(reportId, feedback) {
    try {
        if (!feedback) {
            throw new Error('Feedback is required when rejecting report');
        }
        const response = await makeRequest('POST', `/pm/report/${reportId}/reject`, {
            feedback
        });
        warn(`Report ${reportId} rejected`);
        info(`Feedback: ${feedback}`);
        return response;
    } catch (err) {
        error(`Failed to reject report: ${err.message}`);
        throw err;
    }
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
    // Sprint management
    createSprint,
    getAllSprints,

    // Task assignment (V6.0 - agent-specific)
    assignTask,
    getAllAssignments,

    // Document review (BA)
    getBaDocuments,
    approveDocument,
    rejectDocument,

    // Report review (Dev) - V6.0 NEW
    getAllReports,
    getReport,
    approveReport,
    rejectReport,

    // Utilities
    makeRequest,

    // Agent info
    agentInfo: {
        username: AGENT_USERNAME,
        displayName: AGENT_DISPLAY_NAME,
        roles: AGENT_ROLES
    }
};

// ============================================
// MAIN (CLI MODE)
// ============================================

if (require.main === module) {
    async function main() {
        info('PM Dashboard\n');

        // Get pending BA documents
        const pendingDocs = await getBaDocuments('pending');
        if (pendingDocs.length > 0) {
            console.log(`📄 Pending BA Documents (${pendingDocs.length}):`);
            pendingDocs.forEach(d => {
                console.log(`  - ${d.doc_id}: ${d.doc_name}`);
                console.log(`    Submitted by: ${d.submitted_by}`);
            });
            console.log('');
        }

        // Get pending dev reports
        const pendingReports = await getAllReports('pending');
        if (pendingReports.length > 0) {
            console.log(`📊 Pending Dev Reports (${pendingReports.length}):`);
            pendingReports.forEach(r => {
                console.log(`  - ${r.report_id}: ${r.title}`);
                console.log(`    By: ${r.created_by} | Created: ${r.created_at}`);
            });
            console.log('');
        }

        // Get all assignments
        const assignments = await getAllAssignments();
        if (assignments.length > 0) {
            console.log(`📋 All Assignments (${assignments.length}):`);
            const byStatus = {};
            assignments.forEach(a => {
                if (!byStatus[a.status]) byStatus[a.status] = [];
                byStatus[a.status].push(a);
            });

            Object.keys(byStatus).forEach(status => {
                console.log(`\n  ${status.toUpperCase()} (${byStatus[status].length}):`);
                byStatus[status].forEach(a => {
                    console.log(`    - ${a.assignment_id}: ${a.sprint_task_id}`);
                    console.log(`      Assigned to: ${a.assigned_to}`);
                });
            });
            console.log('');
        }
    }

    main().catch(err => {
        error(`Fatal error: ${err.message}`);
        process.exit(1);
    });
}
