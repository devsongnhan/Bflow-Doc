#!/usr/bin/env node

/**
 * BA HELPER V5.0 - DOCUMENT-BASED WORKFLOW
 *
 * Features:
 * - V5.0: Create Requirements Documents
 * - V5.0: Create Design Documents
 * - V5.0: Submit documents for PM review
 * - V5.0: Track document status
 * - V4.1: Dual-mode authentication (LAN + Internet)
 *
 * Document locations:
 * - Requirements: <project-root>/Docs/requirements/
 * - Designs: <project-root>/Docs/design/
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class BAHelper {
  constructor(config = {}) {
    // Configuration
    this.orchestratorUrl = config.url || process.env.ORCHESTRATOR_URL || 'http://localhost:3000';
    this.username = config.username || process.env.BA_USERNAME || 'ba-agent-1';
    this.password = config.password || process.env.BA_PASSWORD || 'demo456';
    this.apiKey = config.apiKey || process.env.BA_API_KEY || 'ba-simple-key-67890';

    // Project settings
    this.projectRoot = config.projectRoot || process.env.PROJECT_ROOT || path.join(__dirname, '../..');
    this.projectName = config.projectName || process.env.PROJECT_NAME || 'trading-erp-mcp';
    this.requirementsDir = path.join(this.projectRoot, 'Docs', 'requirements');
    this.designDir = path.join(this.projectRoot, 'Docs', 'design');

    this.role = 'ba';
    this.tokenFile = path.join(__dirname, '.ba-token-v5.json');
    this.mode = null;
    this.accessToken = null;

    console.log(`📁 Project Root: ${this.projectRoot}`);
    console.log(`📁 Requirements Directory: ${this.requirementsDir}`);
    console.log(`📁 Design Directory: ${this.designDir}`);

    // Ensure directories exist
    this.ensureDirectories();
  }

  ensureDirectories() {
    const dirs = [
      this.requirementsDir,
      this.designDir,
      path.join(this.requirementsDir, 'templates'),
      path.join(this.designDir, 'templates')
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
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
  // V5.0: DOCUMENT MANAGEMENT (Local Files)
  // ============================================

  /**
   * Create a Requirements Document locally
   */
  createRequirementDoc(docData) {
    const {
      doc_id,
      doc_name,
      feature_name,
      business_need,
      functional_requirements = [],
      transaction_requirements = [],
      test_scenarios = []
    } = docData;

    if (!doc_id || !doc_name || !feature_name) {
      throw new Error('Missing required fields: doc_id, doc_name, feature_name');
    }

    // Create requirement document metadata
    const requirementDoc = {
      project: this.projectName,
      doc_id,
      doc_name,
      doc_type: 'requirement',
      feature_name,
      version: '1.0',

      status: 'draft',

      metadata: {
        business_need,
        created_at: new Date().toISOString(),
        created_by: this.username,
        updated_at: new Date().toISOString(),
        submitted_for_review_at: null,
        reviewed_at: null,
        reviewed_by: null,
        approved_at: null
      },

      functional_requirements,
      transaction_requirements,
      test_scenarios,

      review_history: []
    };

    // Save to file
    const docFile = path.join(this.requirementsDir, `${doc_id}.json`);
    fs.writeFileSync(docFile, JSON.stringify(requirementDoc, null, 2));

    console.log(`✅ Requirements document created: ${docFile}`);
    return { doc_id, docFile, requirementDoc };
  }

  /**
   * Create a Design Document locally
   */
  createDesignDoc(docData) {
    const {
      doc_id,
      doc_name,
      feature_name,
      requirement_doc_id,
      transaction_code,
      accounting_logic = {},
      parameters = [],
      validation_rules = [],
      implementation_specs = {},
      test_scenarios = []
    } = docData;

    if (!doc_id || !doc_name || !feature_name) {
      throw new Error('Missing required fields: doc_id, doc_name, feature_name');
    }

    // Create design document metadata
    const designDoc = {
      project: this.projectName,
      doc_id,
      doc_name,
      doc_type: 'design',
      feature_name,
      version: '1.0',

      related_requirement: requirement_doc_id || null,

      status: 'draft',

      metadata: {
        transaction_code: transaction_code || null,
        created_at: new Date().toISOString(),
        created_by: this.username,
        updated_at: new Date().toISOString(),
        submitted_for_review_at: null,
        reviewed_at: null,
        reviewed_by: null,
        approved_at: null
      },

      technical_design: {
        transaction_code: transaction_code || null,
        accounting_logic,
        parameters,
        validation_rules
      },

      implementation_specs,
      test_scenarios,

      vas_compliance: {
        standards: [],
        legal_requirements: [],
        notes: ''
      },

      review_history: []
    };

    // Save to file
    const docFile = path.join(this.designDir, `${doc_id}.json`);
    fs.writeFileSync(docFile, JSON.stringify(designDoc, null, 2));

    console.log(`✅ Design document created: ${docFile}`);
    return { doc_id, docFile, designDoc };
  }

  /**
   * Load a document from local file
   */
  loadDocument(doc_id, docType = 'design') {
    const docDir = docType === 'requirement' ? this.requirementsDir : this.designDir;
    const docFile = path.join(docDir, `${doc_id}.json`);

    if (!fs.existsSync(docFile)) {
      throw new Error(`Document file not found: ${docFile}`);
    }

    const document = JSON.parse(fs.readFileSync(docFile, 'utf-8'));
    return document;
  }

  /**
   * Save document to local file
   */
  saveDocument(doc_id, document, docType = 'design') {
    document.metadata.updated_at = new Date().toISOString();
    const docDir = docType === 'requirement' ? this.requirementsDir : this.designDir;
    const docFile = path.join(docDir, `${doc_id}.json`);
    fs.writeFileSync(docFile, JSON.stringify(document, null, 2));
    console.log(`✅ Document saved: ${docFile}`);
  }

  /**
   * Submit document for PM review
   */
  async submitDocumentForReview(doc_id, docType = 'design', notes = '') {
    console.log(`\n📤 Submitting ${docType} document ${doc_id} for PM review...\n`);

    // 1. Load document
    const document = this.loadDocument(doc_id, docType);

    // 2. Update local status
    document.status = 'under_review';
    document.metadata.submitted_for_review_at = new Date().toISOString();
    this.saveDocument(doc_id, document, docType);

    // 3. Call Orchestrator API to create document review task
    const result = await this.request('POST', '/agent/ba/document/submit', {
      doc_id,
      doc_type: docType,
      doc_name: document.doc_name,
      feature_name: document.feature_name,
      project: this.projectName,
      notes
    });

    // 4. Update document with orchestrator task ID
    document.orchestrator_review_task_id = result.review_task_id;
    this.saveDocument(doc_id, document, docType);

    console.log(`✅ Document submitted for review: ${result.review_task_id}`);
    return result;
  }

  /**
   * Update document status after PM review
   */
  updateDocumentAfterReview(doc_id, docType, reviewResult) {
    const document = this.loadDocument(doc_id, docType);

    document.status = reviewResult.approved ? 'approved' : 'rejected';
    document.metadata.reviewed_at = new Date().toISOString();
    document.metadata.reviewed_by = reviewResult.reviewed_by;

    if (reviewResult.approved) {
      document.metadata.approved_at = new Date().toISOString();
    }

    document.review_history.push({
      date: new Date().toISOString(),
      reviewer: reviewResult.reviewed_by,
      status: reviewResult.approved ? 'approved' : 'rejected',
      comments: reviewResult.feedback || ''
    });

    this.saveDocument(doc_id, document, docType);

    console.log(`✅ Document ${doc_id} updated: ${document.status}`);
    return document;
  }

  /**
   * List all documents
   */
  listDocuments(docType = 'design') {
    const docDir = docType === 'requirement' ? this.requirementsDir : this.designDir;

    const files = fs.readdirSync(docDir)
      .filter(f => f.startsWith('REQ-') || f.startsWith('DES-'))
      .filter(f => f.endsWith('.json'));

    const documents = files.map(f => {
      const doc = JSON.parse(fs.readFileSync(path.join(docDir, f), 'utf-8'));
      return {
        doc_id: doc.doc_id,
        doc_name: doc.doc_name,
        doc_type: doc.doc_type,
        feature_name: doc.feature_name,
        status: doc.status,
        created_at: doc.metadata.created_at,
        updated_at: doc.metadata.updated_at
      };
    });

    return { documents, total: documents.length };
  }

  /**
   * Get document by ID (for viewing)
   */
  getDocument(doc_id, docType = 'design') {
    const document = this.loadDocument(doc_id, docType);
    return {
      doc_id: document.doc_id,
      doc_name: document.doc_name,
      doc_type: document.doc_type,
      feature_name: document.feature_name,
      status: document.status,
      metadata: document.metadata,
      content: document
    };
  }

  /**
   * Get approved design documents (for Sprint Plan reference)
   */
  getApprovedDesigns() {
    const files = fs.readdirSync(this.designDir)
      .filter(f => f.startsWith('DES-') && f.endsWith('.json'));

    const approvedDocs = files
      .map(f => {
        const doc = JSON.parse(fs.readFileSync(path.join(this.designDir, f), 'utf-8'));
        return doc;
      })
      .filter(doc => doc.status === 'approved')
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
}

module.exports = BAHelper;

// CLI Demo
if (require.main === module) {
  const ba = new BAHelper();

  (async () => {
    try {
      console.log('🚀 BA Helper V5.0 - Document Management Demo\n');

      console.log('📝 Example: Create Requirement Document\n');
      console.log('const reqDoc = ba.createRequirementDoc({');
      console.log('  doc_id: "REQ-001",');
      console.log('  doc_name: "Customer Deposit Management",');
      console.log('  feature_name: "Receive Customer Deposit",');
      console.log('  business_need: "Track customer prepayments",');
      console.log('  functional_requirements: [...]');
      console.log('});\n');

      console.log('📝 Example: Create Design Document\n');
      console.log('const designDoc = ba.createDesignDoc({');
      console.log('  doc_id: "DES-001",');
      console.log('  doc_name: "AD001 Implementation Design",');
      console.log('  feature_name: "Receive Customer Deposit",');
      console.log('  requirement_doc_id: "REQ-001",');
      console.log('  transaction_code: "AD001",');
      console.log('  accounting_logic: { debit: [...], credit: [...] }');
      console.log('});\n');

      console.log('📝 Example: Submit for Review\n');
      console.log('await ba.submitDocumentForReview("DES-001", "design",');
      console.log('  "Ready for PM review");');
      console.log('\n');

      console.log('✅ BA Helper V5.0 ready!\n');
      console.log('See Docs/requirements/README.md for full usage guide.');

    } catch (error) {
      console.error('\n❌ Error:', error.message);
      process.exit(1);
    }
  })();
}
