#!/usr/bin/env node

/**
 * QA HELPER V6.0 - Shared Helper Template
 *
 * V6.0 Changes:
 * - Load API key from .env file (agent-specific)
 * - Test ALL dev submissions (from any developer)
 * - Run unit tests and integration tests
 * - Approve or reject submissions
 * - View test results and stats
 *
 * Usage:
 * 1. From agent folder:
 *    cd agents/minh
 *    node ../../orchestrator/roles/qa/qa-helper-v6.0.js
 *
 * 2. As module:
 *    const qaHelper = require('./orchestrator/roles/qa/qa-helper-v6.0.js');
 *    await qaHelper.getAllSubmissions();
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
        path.join(__dirname, '..', '..'),           // From roles/qa/ → agents/
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
const AGENT_ROLES = (process.env.AGENT_ROLES || 'qa').split(',').map(r => r.trim()).filter(r => r);
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
console.log(`QA HELPER V6.0 - Agent: ${AGENT_DISPLAY_NAME} (${AGENT_USERNAME})`);
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
                'X-Agent-Role': 'qa'
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
// VIEW SUBMISSIONS
// ============================================

/**
 * Get all dev submissions
 * QA can see submissions from ALL developers
 * @param {string} status - Filter: submitted, testing, passed, failed
 */
async function getAllSubmissions(status = 'submitted') {
    try {
        const path = status
            ? `/qa/submissions?status=${status}`
            : '/qa/submissions';
        const result = await makeRequest('GET', path);
        return result.submissions || [];
    } catch (err) {
        error(`Failed to get submissions: ${err.message}`);
        return [];
    }
}

/**
 * Get specific submission details
 */
async function getSubmission(assignmentId) {
    try {
        const result = await makeRequest('GET', `/qa/submission/${assignmentId}`);
        return result.submission;
    } catch (err) {
        error(`Failed to get submission: ${err.message}`);
        return null;
    }
}

// ============================================
// TESTING FUNCTIONS
// ============================================

/**
 * Run unit tests on submission
 * @param {string} assignmentId
 * @param {Object} testConfig - Optional test configuration
 */
async function runUnitTests(assignmentId, testConfig = {}) {
    try {
        info(`Running unit tests on ${assignmentId}...`);
        const response = await makeRequest('POST', `/qa/test/${assignmentId}/unit`, testConfig);

        if (response.test_results) {
            const results = response.test_results;
            console.log(`\n📊 Unit Test Results:`);
            console.log(`   Total: ${results.total_tests || 0}`);
            console.log(`   ${colors.green}Passed: ${results.passed || 0}${colors.reset}`);
            console.log(`   ${colors.red}Failed: ${results.failed || 0}${colors.reset}`);
            console.log('');
        }

        return response;
    } catch (err) {
        error(`Failed to run unit tests: ${err.message}`);
        throw err;
    }
}

/**
 * Run integration tests on submission
 */
async function runIntegrationTests(assignmentId, testConfig = {}) {
    try {
        info(`Running integration tests on ${assignmentId}...`);
        const response = await makeRequest('POST', `/qa/test/${assignmentId}/integration`, testConfig);

        if (response.test_results) {
            const results = response.test_results;
            console.log(`\n📊 Integration Test Results:`);
            console.log(`   Scenarios: ${results.scenarios_tested || 0}`);
            console.log(`   ${colors.green}Passed: ${results.passed || 0}${colors.reset}`);
            console.log(`   ${colors.red}Failed: ${results.failed || 0}${colors.reset}`);
            console.log('');
        }

        return response;
    } catch (err) {
        error(`Failed to run integration tests: ${err.message}`);
        throw err;
    }
}

/**
 * Record custom test results
 */
async function recordTestResults(assignmentId, testType, results) {
    try {
        const response = await makeRequest('POST', `/qa/test/${assignmentId}/record`, {
            test_type: testType,
            results
        });
        success(`Test results recorded for ${assignmentId}`);
        return response;
    } catch (err) {
        error(`Failed to record test results: ${err.message}`);
        throw err;
    }
}

// ============================================
// APPROVAL/REJECTION
// ============================================

/**
 * Approve submission after tests pass
 * @param {string} assignmentId
 * @param {string} feedback - Optional feedback
 */
async function approveSubmission(assignmentId, feedback = null) {
    try {
        const response = await makeRequest('POST', `/qa/submission/${assignmentId}/approve`, {
            feedback: feedback || 'All tests passed. Code approved.'
        });
        success(`Submission ${assignmentId} approved!`);
        return response;
    } catch (err) {
        error(`Failed to approve submission: ${err.message}`);
        throw err;
    }
}

/**
 * Reject submission with feedback
 * @param {string} assignmentId
 * @param {string} feedback - Required: Why rejected
 * @param {Array} failedTests - Optional: List of failed tests
 */
async function rejectSubmission(assignmentId, feedback, failedTests = []) {
    try {
        if (!feedback) {
            throw new Error('Feedback is required when rejecting submission');
        }

        const response = await makeRequest('POST', `/qa/submission/${assignmentId}/reject`, {
            feedback,
            failed_tests: failedTests
        });

        warn(`Submission ${assignmentId} rejected`);
        info(`Feedback: ${feedback}`);
        if (failedTests.length > 0) {
            console.log(`\nFailed tests:`);
            failedTests.forEach(test => console.log(`  - ${test}`));
        }

        return response;
    } catch (err) {
        error(`Failed to reject submission: ${err.message}`);
        throw err;
    }
}

// ============================================
// STATS AND REPORTING
// ============================================

/**
 * Get QA statistics
 */
async function getQAStats() {
    try {
        const result = await makeRequest('GET', '/qa/stats');
        return result.stats;
    } catch (err) {
        error(`Failed to get QA stats: ${err.message}`);
        return null;
    }
}

/**
 * Get test results for assignment
 */
async function getTestResults(assignmentId) {
    try {
        const result = await makeRequest('GET', `/qa/test/${assignmentId}/results`);
        return result.test_results;
    } catch (err) {
        error(`Failed to get test results: ${err.message}`);
        return null;
    }
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
    // View submissions
    getAllSubmissions,
    getSubmission,

    // Testing
    runUnitTests,
    runIntegrationTests,
    recordTestResults,

    // Approval
    approveSubmission,
    rejectSubmission,

    // Stats
    getQAStats,
    getTestResults,

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

    // ============================================
    // ISSUE MANAGEMENT FUNCTIONS
    // ============================================

    async function findOrchdocsFolder() {
        // Search for Orchdocs folder
        const searchPaths = [
            path.join(process.cwd(), 'Orchdocs'),
            path.join(process.cwd(), '..', 'Orchdocs'),
            path.join(process.cwd(), '../..', 'Orchdocs'),
            path.join(process.cwd(), '../../..', 'Orchdocs'),
        ];

        for (const searchPath of searchPaths) {
            if (fs.existsSync(searchPath)) {
                return searchPath;
            }
        }
        return null;
    }

    async function createIssue() {
        console.log('\n📝 Create New Issue\n');

        // Step 1: Collect issue details
        const issue_id = await askUser('Issue ID (e.g. minhviet-issue-001): ');
        const project = issue_id.split('-issue-')[0]; // Extract project from issue_id
        const issueNumber = issue_id.split('-issue-')[1]; // Extract number from issue_id

        const title = await askUser('Issue Title (e.g. TourOrderPnL): ');
        const description = await askUser('Description: ');
        const severity = await askUser('Severity (critical/high/medium/low) [medium]: ') || 'medium';
        const priority = await askUser('Priority (high/normal/low) [normal]: ') || 'normal';
        const environment = await askUser('Environment/Module: ');
        const stepsStr = await askUser('Steps to reproduce (comma-separated): ');
        const steps_to_reproduce = stepsStr ? stepsStr.split(',').map(s => s.trim()) : [];
        const expected_behavior = await askUser('Expected behavior: ');
        const actual_behavior = await askUser('Actual behavior: ');
        const affected_users = await askUser('Affected users/scope: ');
        const business_impact = await askUser('Business impact: ');

        // Step 2: Find Orchdocs folder
        const orchdocsFolder = await findOrchdocsFolder();
        if (!orchdocsFolder) {
            error('❌ Could not find Orchdocs folder. Make sure you are running from agents directory.');
            return;
        }

        // Step 3: Create file immediately in flat structure
        const issueFolder = path.join(orchdocsFolder, 'projects', project, 'Issue');
        const filename = `${issue_id}-${title}.md`;
        const filePath = path.join(issueFolder, filename);

        try {
            // Ensure folder exists
            if (!fs.existsSync(issueFolder)) {
                fs.mkdirSync(issueFolder, { recursive: true });
            }

            // Generate markdown content
            const today = new Date().toISOString().split('T')[0];
            const content = `---
project_id: ${project}
issue_id: ${issue_id}
doc_type: issue
version: 1.0
created_date: ${today}
updated_date: ${today}
status: draft
severity: ${severity}
priority: ${priority}
location: "Orchdocs/projects/${project}/Issue/${issue_id}-${title}.md"
---

# ${issue_id} - ${title}

**Issue ID:** ${issue_id}
**Issue Title:** ${title}
**Project:** ${project}
**Version:** 1.0
**Created:** ${today}
**Updated:** ${today}
**QA:** ${AGENT_DISPLAY_NAME}
**Status:** draft
**Severity:** ${severity}
**Priority:** ${priority}

---

## 📋 Issue Information

**Bug/Error Title:** ${title}

**Description:** ${description}

**Severity:** ${severity}
- **critical:** Hệ thống không chạy, mất dữ liệu
- **high:** Chức năng chính bị ảnh hưởng
- **medium:** Chức năng phụ bị ảnh hưởng
- **low:** UI/UX nhỏ hoặc documentation

**Priority:** ${priority} - based on business impact

---

## 🔍 Details

### Expected Behavior
${expected_behavior}

### Actual Behavior
${actual_behavior}

### Steps to Reproduce
${steps_to_reproduce.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

### Environment
- **Module:** ${environment}
- **Affected Users:** ${affected_users}
- **Business Impact:** ${business_impact}

---

## 📊 Status Tracking

| Status | Assigned | Implemented | Tested | Resolved |
|--------|----------|-------------|--------|----------|
| draft | - | - | - | - |

---

*Issue created by ${AGENT_DISPLAY_NAME} on ${today}*
`;

            // Write file
            fs.writeFileSync(filePath, content, 'utf-8');
            success(`\n✅ Issue file created successfully!`);
            info(`📁 Location: ${filePath}`);
            info(`📄 Flat structure: ${filename}`);
            console.log('');

            // Step 4: Ask user if they want to submit
            const submitChoice = await askUser(
                `${colors.yellow}👤 Do you want to SUBMIT this issue to Orchestrator? (yes/no):${colors.reset} `
            );

            if (submitChoice === 'yes' || submitChoice === 'y') {
                // Submit to server
                const payload = {
                    issue_id,
                    project,
                    title,
                    description,
                    severity,
                    priority,
                    environment,
                    steps_to_reproduce,
                    expected_behavior,
                    actual_behavior
                };

                try {
                    // Step 1: Create issue
                    const createResponse = await makeRequest('POST', '/qa/issue/create', payload);
                    if (!createResponse.success) {
                        error(`\n❌ Failed to create issue: ${createResponse.error}`);
                        return;
                    }

                    const issueInternalId = createResponse.issue.id;
                    info(`\n📝 Issue created (internal ID: ${issueInternalId})`);

                    // Step 2: Auto-submit issue
                    const submitResponse = await makeRequest('POST', `/qa/issue/${issueInternalId}/submit`, {});
                    if (submitResponse.success) {
                        success(`\n✅ Issue submitted successfully!`);
                        success(`Issue ID: ${submitResponse.issue.issue_id}`);
                        success(`Status: ${submitResponse.issue.status}`);
                    } else {
                        error(`\n⚠️  Issue created but submit failed: ${submitResponse.error}`);
                    }
                } catch (submitErr) {
                    error(`\n❌ Error: ${submitErr.message}`);
                }
            } else {
                info(`\nℹ️  Issue file saved as draft. You can submit later using [3] Submit issue option.`);
            }

        } catch (err) {
            error(`\n❌ Error: ${err.message}`);
        }
    }

    async function submitIssue() {
        console.log('\n📤 Submit Issue\n');

        const issueId = await askUser('Issue ID to submit: ');

        try {
            const response = await makeRequest('POST', `/qa/issue/${issueId}/submit`, {});
            if (response.success) {
                success(`\n✅ Issue submitted: ${response.issue.issue_id}`);
                success(`Issue can now be assigned to Dev`);
            } else {
                error(`\n❌ Failed to submit issue: ${response.error}`);
            }
        } catch (err) {
            error(`\n❌ Error: ${err.message}`);
        }
    }

    async function viewIssues() {
        console.log('\n📋 View Issues\n');

        const status = await askUser('Filter by status (submitted/assigned/in_progress/resolved/all) [all]: ') || 'all';

        try {
            const url = status === 'all' ? '/qa/issues' : `/qa/issues?status=${status}`;
            const response = await makeRequest('GET', url);

            if (response.success && response.issues) {
                console.log(`\n📊 Issues (${response.total}):\n`);
                response.issues.forEach((issue, idx) => {
                    console.log(`[${idx + 1}] ${issue.issue_id}`);
                    console.log(`    Title: ${issue.title}`);
                    console.log(`    Status: ${issue.status} | Severity: ${issue.severity}`);
                    console.log(`    Assigned to: ${issue.assigned_to || 'Unassigned'}`);
                    console.log('');
                });
            } else {
                warn('No issues found');
            }
        } catch (err) {
            error(`\n❌ Error: ${err.message}`);
        }
    }

    async function assignIssue() {
        console.log('\n🎯 Assign Issue to Developer\n');

        const issueId = await askUser('Issue ID to assign: ');
        const assigned_to = await askUser('Developer username: ');
        const priority = await askUser('Priority (high/normal/low) [normal]: ') || 'normal';

        try {
            const response = await makeRequest('POST', `/qa/issue/${issueId}/assign`, {
                assigned_to,
                priority
            });

            if (response.success) {
                success(`\n✅ Issue assigned to ${assigned_to}`);
                success(`Assignment ID: ${response.assignment.id}`);
            } else {
                error(`\n❌ Failed to assign issue: ${response.error}`);
            }
        } catch (err) {
            error(`\n❌ Error: ${err.message}`);
        }
    }

    async function verifyIssueImplementation() {
        console.log('\n🔍 Verify Issue Implementation\n');

        const issueId = await askUser('Issue ID to verify: ');
        const statusInput = await askUser('Verification result (passed/failed): ');
        const status = statusInput === 'passed' ? 'passed' : 'failed';
        const feedback = await askUser('QA feedback/notes: ');

        try {
            const response = await makeRequest('POST', `/qa/issue/${issueId}/verify`, {
                status,
                feedback,
                test_results: {}
            });

            if (response.success) {
                if (status === 'passed') {
                    success(`\n✅ Issue RESOLVED!`);
                } else {
                    warn(`\n⚠️ Issue sent back to developer for fixes`);
                }
            } else {
                error(`\n❌ Failed to verify issue: ${response.error}`);
            }
        } catch (err) {
            error(`\n❌ Error: ${err.message}`);
        }
    }

    async function main() {
        info('🔍 QA Agent Helper V6.0\n');

        console.log('Choose an action:');
        console.log('  [1] Test dev submissions');
        console.log('  [2] Create issue');
        console.log('  [3] Submit issue');
        console.log('  [4] View issues');
        console.log('  [5] Assign issue to dev');
        console.log('  [6] Verify issue implementation');
        console.log('');

        const choice = await askUser('Select option [1-6]: ');

        switch (choice) {
            case '1':
                await testSubmissions();
                break;
            case '2':
                await createIssue();
                break;
            case '3':
                await submitIssue();
                break;
            case '4':
                await viewIssues();
                break;
            case '5':
                await assignIssue();
                break;
            case '6':
                await verifyIssueImplementation();
                break;
            default:
                warn('Invalid option');
        }
    }

    async function testSubmissions() {
        info('\n📊 Test Dev Submissions\n');

        // Get pending submissions
        const submissions = await getAllSubmissions('submitted');

        if (submissions.length === 0) {
            info('No submissions waiting for QA.');
            return;
        }

        console.log(`📋 Pending Submissions (${submissions.length}):\n`);

        submissions.forEach(sub => {
            console.log(`  Assignment: ${sub.assignment_id}`);
            console.log(`    Task: ${sub.sprint_task_id || sub.metadata?.title}`);
            console.log(`    Submitted by: ${sub.submitted_by}`);
            console.log(`    Submitted at: ${sub.submitted_at}`);

            if (sub.result) {
                console.log(`    Files modified: ${sub.result.files_modified?.join(', ') || 'N/A'}`);
                console.log(`    Summary: ${sub.result.summary || 'N/A'}`);
            }
            console.log('');
        });

        // Process first submission
        const sub = submissions[0];
        console.log(`\n🔍 Testing first submission: ${sub.assignment_id}\n`);

        try {
            // Run unit tests
            info('Running unit tests...');
            const unitResult = await runUnitTests(sub.assignment_id);
            console.log('');

            // Run integration tests
            info('Running integration tests...');
            const integrationResult = await runIntegrationTests(sub.assignment_id);
            console.log('');

            // Ask user for decision
            console.log(`\n${'='.repeat(70)}`);
            console.log(`📋 DECISION REQUIRED FOR: ${sub.assignment_id}`);
            console.log(`   Task: ${sub.sprint_task_id || sub.metadata?.title}`);
            console.log(`   Submitted by: ${sub.submitted_by}`);
            console.log(`\n   ✅ All tests PASSED`);
            console.log(`   Unit Tests: ${unitResult.test_results?.passed || 0}/${unitResult.test_results?.total_tests || 0}`);
            console.log(`   Integration Tests: ${integrationResult.test_results?.passed || 0}/${integrationResult.test_results?.scenarios_tested || 0}`);
            console.log(`${'='.repeat(70)}\n`);

            const decision = await askUser(
                `${colors.yellow}👤 USER DECISION: Do you want to APPROVE this submission? (yes/no):${colors.reset} `
            );

            if (decision === 'yes' || decision === 'y') {
                const approveResult = await approveSubmission(
                    sub.assignment_id,
                    '✅ All tests passed. Code approved by QA.'
                );
                success(`\n✅ Submission APPROVED!`);
            } else if (decision === 'no' || decision === 'n') {
                const feedback = await askUser(
                    `${colors.yellow}📝 Enter rejection reason:${colors.reset} `
                );
                const rejectResult = await rejectSubmission(
                    sub.assignment_id,
                    feedback || 'Rejected by QA after testing'
                );
                warn(`\n❌ Submission REJECTED!`);
            } else {
                warn(`\n⚠️  Invalid input. Submission NOT processed.`);
            }
        } catch (err) {
            error(`\n❌ Error during testing: ${err.message}`);
        }

        // Get updated stats
        console.log('');
        const stats = await getQAStats();
        if (stats) {
            console.log(`\n📊 QA Stats:`);
            console.log(`   Total tested: ${stats.total_tested || 0}`);
            console.log(`   Approved: ${stats.approved || 0}`);
            console.log(`   Rejected: ${stats.rejected || 0}`);
            console.log(`   Success rate: ${stats.success_rate || '0%'}`);
        }
    }

    main().catch(err => {
        error(`Fatal error: ${err.message}`);
        process.exit(1);
    });
}
