#!/usr/bin/env node

/**
 * BA HELPER V6.0 - Business Analyst Helper
 *
 * V6.0 Changes:
 * - Load API key from .env file (agent-specific, not hard-coded)
 * - Support multi-role agents
 * - Create and submit design/requirement documents
 * - Track document review status
 *
 * Usage:
 *
 * 1. From agent folder (recommended):
 *    cd agents/han
 *    node ../../roles/ba/ba-helper-v6.0.js
 *    → Auto loads .env from agents/han/.env
 *
 * 2. With environment variables:
 *    AGENT_USERNAME=han API_KEY=han-ba-key-xxx node ba-helper-v6.0.js
 *
 * 3. As module in code:
 *    const baHelper = require('./roles/ba/ba-helper-v6.0.js');
 *    const doc = await baHelper.createDocument('design', {...});
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
        path.join(__dirname, '..', '..'),           // From roles/ba/ → agents/
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
const AGENT_ROLES = (process.env.AGENT_ROLES || 'ba').split(',').map(r => r.trim()).filter(r => r);
const AGENT_PRIMARY_ROLE = process.env.AGENT_PRIMARY_ROLE || 'ba';
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
    console.error('   Example: AGENT_USERNAME=han');
    process.exit(1);
}

if (!API_KEY) {
    console.error('❌ ERROR: API_KEY not set');
    console.error('   Please set in .env file or environment variable');
    console.error('   Example: API_KEY=han-ba-key-xyz789');
    process.exit(1);
}

// Banner
console.log(`\n${'='.repeat(70)}`);
console.log(`BA HELPER V6.0 - Agent: ${AGENT_DISPLAY_NAME} (${AGENT_USERNAME})`);
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
// PROJECT SMART AUTO-SELECTION
// ============================================

/**
 * Smart project ID selection logic
 * - If agent has 1 project: auto-select it (no project param needed)
 * - If agent has multiple projects + project param provided: use specified project
 * - If agent has multiple projects + no project param: throw error asking user to specify
 *
 * @param {string|null} specifiedProject - Project ID from data.project (optional)
 * @returns {string} Selected project ID
 * @throws {Error} If ambiguous (multiple projects, no specification)
 */
function getSmartProjectId(specifiedProject) {
    // Case 1: Project explicitly specified
    if (specifiedProject) {
        // Validate that specified project is in agent's PROJECT_IDS
        if (!PROJECT_IDS.includes(specifiedProject)) {
            throw new Error(
                `Project "${specifiedProject}" not found in your project list: ${PROJECT_IDS.join(', ')}\n` +
                `Available projects: ${PROJECT_IDS.join(', ')}`
            );
        }
        return specifiedProject;
    }

    // Case 2: Single project (auto-select)
    if (PROJECT_IDS.length === 1) {
        return PROJECT_IDS[0];
    }

    // Case 3: Multiple projects, no specification (ask user)
    throw new Error(
        `You are assigned to multiple projects: ${PROJECT_IDS.join(', ')}\n` +
        `Please specify which project:\n` +
        `  - Add "project: 'project-name'" parameter\n` +
        `  - Or tell user to specify the project\n\n` +
        `Available projects:\n` +
        PROJECT_IDS.map((p, i) => `  ${i + 1}. ${p}`).join('\n')
    );
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
                'X-Agent-Role': 'ba'
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(parsed);
                    } else {
                        reject(new Error(parsed.error || `HTTP ${res.statusCode}`));
                    }
                } catch (e) {
                    reject(new Error(`Failed to parse response: ${responseData}`));
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
// DOCUMENT FUNCTIONS
// ============================================

/**
 * Create a design or requirement document with smart project auto-selection
 *
 * Project selection logic:
 * - If agent manages 1 project: Auto-select it (no project param needed)
 * - If agent manages N projects + project param provided: Use specified project
 * - If agent manages N projects + no project param: Throw error asking to specify
 *
 * @param {string} doc_type - 'design' or 'requirement'
 * @param {Object} data - Document data
 * @param {string} data.title - Document title (required)
 * @param {string} data.description - Document description (optional)
 * @param {Object} data.content - Document content structure (optional)
 * @param {string} data.project - Project ID (optional, required if agent manages multiple projects)
 * @param {Object} data.metadata - Optional metadata (version, etc.)
 * @returns {Object} Created document with doc_id, doc_name, status, etc.
 * @throws {Error} If project is ambiguous or invalid
 */
async function createDocument(doc_type, data) {
    try {
        if (!doc_type || !['design', 'requirement'].includes(doc_type)) {
            throw new Error('doc_type must be "design" or "requirement"');
        }

        if (!data || !data.title) {
            throw new Error('Document must have title');
        }

        // Smart project selection:
        // - 1 project: auto-select (no param needed)
        // - N projects + specified: use specified
        // - N projects + not specified: error asking user
        const projectId = getSmartProjectId(data.project);

        const response = await makeRequest('POST', '/api/ba/document/create', {
            doc_type,
            doc_name: data.title,
            content: data.content || {
                title: data.title,
                description: data.description || '',
                requirements: data.requirements || []
            },
            metadata: {
                ...(data.metadata || {}),
                project: projectId,
                version: data.metadata?.version || '1.0',
                created_by: AGENT_USERNAME
            }
        });

        success(`Document created: ${response.doc_id || response.doc_name}`);
        info(`Project: ${projectId} | Status: ${response.status}`);
        return response;
    } catch (err) {
        error(`Failed to create document: ${err.message}`);
        throw err;
    }
}

/**
 * Submit document to PM for review
 * @param {string} docId - Document ID
 * @param {string} message - Optional message to PM
 */
async function submitDocument(docId, message = null) {
    try {
        const response = await makeRequest('POST', `/api/ba/document/${docId}/submit`, {
            message: message || 'Please review this design document'
        });

        success(`Document ${docId} submitted to PM for review`);
        info(`Status: ${response.status}`);
        return response;
    } catch (err) {
        error(`Failed to submit document: ${err.message}`);
        throw err;
    }
}

/**
 * Get all documents created by this BA
 * @param {string} status - Filter by status: pending, approved, rejected
 * @returns {Array} List of documents
 */
async function getMyDocuments(status = null) {
    try {
        const path = status
            ? `/api/ba/documents/my?status=${status}`
            : '/api/ba/documents/my';
        const result = await makeRequest('GET', path);
        return result.documents || [];
    } catch (err) {
        error(`Failed to get documents: ${err.message}`);
        return [];
    }
}

/**
 * Get specific document details
 * @param {string} docId - Document ID
 * @returns {Object|null} Document object
 */
async function getDocument(docId) {
    try {
        const result = await makeRequest('GET', `/api/ba/document/${docId}`);
        return result.document || result;
    } catch (err) {
        error(`Failed to get document: ${err.message}`);
        return null;
    }
}

/**
 * Get feedback from PM on submitted documents
 * @param {string} docId - Document ID
 * @returns {Object|null} Feedback object
 */
async function getDocumentFeedback(docId) {
    try {
        const doc = await getDocument(docId);
        if (!doc) return null;

        return {
            doc_id: doc.doc_id,
            status: doc.status,
            feedback: doc.review_feedback || doc.feedback || 'No feedback yet',
            reviewed_by: doc.reviewed_by || 'Pending review',
            reviewed_at: doc.reviewed_at || null
        };
    } catch (err) {
        error(`Failed to get feedback: ${err.message}`);
        return null;
    }
}

/**
 * Get all pending documents (awaiting PM review)
 * @returns {Array} List of pending documents
 */
async function getPendingDocuments() {
    return await getMyDocuments('pending');
}

/**
 * Get all approved documents
 * @returns {Array} List of approved documents
 */
async function getApprovedDocuments() {
    return await getMyDocuments('approved');
}

/**
 * Get all rejected documents
 * @returns {Array} List of rejected documents
 */
async function getRejectedDocuments() {
    return await getMyDocuments('rejected');
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
    // Document functions
    createDocument,
    submitDocument,
    getMyDocuments,
    getDocument,
    getDocumentFeedback,
    getPendingDocuments,
    getApprovedDocuments,
    getRejectedDocuments,

    // Utilities
    makeRequest,

    // Agent info
    agentInfo: {
        username: AGENT_USERNAME,
        displayName: AGENT_DISPLAY_NAME,
        roles: AGENT_ROLES,
        primaryRole: AGENT_PRIMARY_ROLE,
        projectIds: PROJECT_IDS,
        primaryProjectId: PRIMARY_PROJECT_ID
    }
};

// ============================================
// MAIN (CLI MODE)
// ============================================

if (require.main === module) {
    async function main() {
        info('Checking for documents...\n');

        // Get all documents
        const allDocs = await getMyDocuments();
        if (allDocs.length > 0) {
            console.log(`📄 All documents (${allDocs.length}):`);
            allDocs.forEach(d => {
                const statusIcon = d.status === 'approved' ? '✅' : d.status === 'rejected' ? '❌' : '⏳';
                console.log(`  ${statusIcon} ${d.doc_id}: ${d.doc_name}`);
                console.log(`     Type: ${d.doc_type} | Status: ${d.status}`);
                if (d.review_feedback) {
                    console.log(`     Feedback: ${d.review_feedback}`);
                }
            });
            console.log('');
        } else {
            info('No documents created yet.');
        }

        // Get pending documents
        const pending = await getPendingDocuments();
        if (pending.length > 0) {
            console.log(`\n⏳ Pending review (${pending.length}):`);
            pending.forEach(d => {
                console.log(`  - ${d.doc_id}: ${d.doc_name}`);
                console.log(`    Submitted: ${d.submitted_at}`);
            });
            console.log('');
        }

        // Get approved documents
        const approved = await getApprovedDocuments();
        if (approved.length > 0) {
            console.log(`\n✅ Approved (${approved.length}):`);
            approved.forEach(d => {
                console.log(`  - ${d.doc_id}: ${d.doc_name}`);
                console.log(`    Approved: ${d.reviewed_at}`);
            });
            console.log('');
        }

        // Get rejected documents
        const rejected = await getRejectedDocuments();
        if (rejected.length > 0) {
            console.log(`\n❌ Rejected (${rejected.length}):`);
            rejected.forEach(d => {
                console.log(`  - ${d.doc_id}: ${d.doc_name}`);
                console.log(`    Feedback: ${d.review_feedback || 'No feedback'}`);
            });
            console.log('');
        }
    }

    main().catch(err => {
        error(`Fatal error: ${err.message}`);
        process.exit(1);
    });
}
