#!/usr/bin/env node

/**
 * BA HELPER V5.2 - With Project-Loader Support
 *
 * Changes in V5.2:
 * - Dynamic path resolution via orchestrator's project-loader
 * - Multi-project support via --project parameter
 * - No hard-coded document paths
 * - Loads configuration from orchestrator API
 *
 * Usage:
 * const ba = new BAHelper({ projectId: 'trading-erp-mcp' });
 * node ba-helper-v5.2.js [--project PROJECT_ID]
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class BAHelper {
  constructor(config = {}) {
    this.orchestratorUrl = config.url || process.env.ORCHESTRATOR_URL || 'http://localhost:3000';
    this.username = config.username || process.env.BA_USERNAME || 'ba-agent-1';
    this.password = config.password || process.env.BA_PASSWORD || 'demo456';
    this.apiKey = config.apiKey || process.env.BA_API_KEY || 'ba-simple-key-67890';
    this.projectRoot = config.projectRoot || process.env.PROJECT_ROOT || path.join(__dirname, '../..');
    this.projectId = config.projectId || process.env.PROJECT_ID || 'trading-erp-mcp';
    this.projectName = config.projectName || process.env.PROJECT_NAME || 'trading-erp-mcp';

    // V5.2: Dynamic paths (loaded from orchestrator)
    this.projectConfig = null;  // Will be loaded from API
    this.requirementsDir = null;  // Will be resolved dynamically
    this.designDir = null;        // Will be resolved dynamically

    this.role = 'ba';
    this.tokenFile = path.join(__dirname, '.ba-token-v5.json');
    this.mode = null;
    this.accessToken = null;
    this.configLoaded = false;
  }

  /**
   * V5.2: Load project configuration from orchestrator API
   */
  async loadProjectConfig() {
    if (this.projectConfig) {
      return this.projectConfig;  // Already loaded
    }

    try {
      const url = `${this.orchestratorUrl}/projects/${this.projectId}/config`;
      const response = await axios.get(url);
      this.projectConfig = response.data;

      // Set dynamic paths
      if (this.projectConfig.paths.documents) {
        this.requirementsDir = path.join(
          this.projectRoot,
          this.projectConfig.paths.documents.requirements || 'Docs/requirements'
        );
        this.designDir = path.join(
          this.projectRoot,
          this.projectConfig.paths.documents.design || 'Docs/design'
        );
      } else {
        // Fallback
        this.requirementsDir = path.join(this.projectRoot, 'Docs/requirements');
        this.designDir = path.join(this.projectRoot, 'Docs/design');
      }

      console.log(`✅ Project config loaded: ${this.projectConfig.project.name}`);
      console.log(`   Requirements: ${this.projectConfig.paths.documents.requirements}`);
      console.log(`   Design: ${this.projectConfig.paths.documents.design}`);

      this.configLoaded = true;
      await this.ensureDirectories();

      return this.projectConfig;
    } catch (error) {
      console.warn(`⚠️  Failed to load project config: ${error.message}`);
      console.warn(`   Using fallback defaults`);

      // Fallback
      this.projectConfig = {
        project: { id: this.projectId, name: this.projectName },
        paths: {
          documents: {
            requirements: 'Docs/requirements',
            design: 'Docs/design'
          }
        }
      };

      this.requirementsDir = path.join(this.projectRoot, 'Docs/requirements');
      this.designDir = path.join(this.projectRoot, 'Docs/design');

      this.configLoaded = true;
      await this.ensureDirectories();

      return this.projectConfig;
    }
  }

  /**
   * Ensure config is loaded before operations
   */
  async ensureConfig() {
    if (!this.configLoaded) {
      await this.loadProjectConfig();
    }
  }

  async ensureDirectories() {
    await this.ensureConfig();

    [this.requirementsDir, this.designDir,
     path.join(this.requirementsDir, 'templates'),
     path.join(this.designDir, 'templates')
    ].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  detectMode() {
    try {
      const url = new URL(this.orchestratorUrl);
      const h = url.hostname;
      const isLocal = h === 'localhost' || h === '127.0.0.1' || h === '::1';
      const isPrivate = h.startsWith('192.168.') || h.startsWith('10.') || h.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./);
      return (isLocal || isPrivate) ? 'lan' : 'internet';
    } catch (error) {
      throw new Error('Invalid orchestrator URL');
    }
  }

  async ensureAuthenticated() {
    if (!this.mode) this.mode = this.detectMode();
    if (this.mode === 'internet') console.log('⚠️ Internet mode not implemented');
  }

  async request(method, endpoint, data = null) {
    await this.ensureAuthenticated();
    const headers = {};
    if (this.mode === 'lan') headers['X-API-Key'] = this.apiKey;
    const config = { method, url: `${this.orchestratorUrl}${endpoint}`, headers };
    if (data) {
      config.data = data;
      headers['Content-Type'] = 'application/json';
    }
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(`❌ ${method} ${endpoint} failed:`, error.response?.data || error.message);
      throw error;
    }
  }

  async createRequirementDoc(docData) {
    await this.ensureConfig();

    const { doc_id, doc_name, feature_name, business_need, functional_requirements = [],
            transaction_requirements = [], test_scenarios = [] } = docData;
    if (!doc_id || !doc_name || !feature_name) throw new Error('Missing required fields');

    const requirementDoc = {
      project: this.projectName, doc_id, doc_name, doc_type: 'requirement',
      feature_name, version: '1.0', status: 'draft',
      metadata: {
        business_need, created_at: new Date().toISOString(),
        created_by: this.username, updated_at: new Date().toISOString(),
        submitted_for_review_at: null, reviewed_at: null, reviewed_by: null, approved_at: null
      },
      functional_requirements, transaction_requirements, test_scenarios, review_history: []
    };

    const docFile = path.join(this.requirementsDir, `${doc_id}.json`);
    fs.writeFileSync(docFile, JSON.stringify(requirementDoc, null, 2));
    return { doc_id, docFile, requirementDoc };
  }

  async createDesignDoc(docData) {
    await this.ensureConfig();

    const { doc_id, doc_name, feature_name, requirement_doc_id, transaction_code,
            accounting_logic = {}, parameters = [], validation_rules = [],
            implementation_specs = {}, test_scenarios = [] } = docData;
    if (!doc_id || !doc_name || !feature_name) throw new Error('Missing required fields');

    const designDoc = {
      project: this.projectName, doc_id, doc_name, doc_type: 'design',
      feature_name, version: '1.0', related_requirement: requirement_doc_id || null,
      status: 'draft',
      metadata: {
        transaction_code: transaction_code || null, created_at: new Date().toISOString(),
        created_by: this.username, updated_at: new Date().toISOString(),
        submitted_for_review_at: null, reviewed_at: null, reviewed_by: null, approved_at: null
      },
      technical_design: { transaction_code: transaction_code || null, accounting_logic, parameters, validation_rules },
      implementation_specs, test_scenarios,
      vas_compliance: { standards: [], legal_requirements: [], notes: '' },
      review_history: []
    };

    const docFile = path.join(this.designDir, `${doc_id}.json`);
    fs.writeFileSync(docFile, JSON.stringify(designDoc, null, 2));
    return { doc_id, docFile, designDoc };
  }

  async loadDocument(doc_id, docType = 'design') {
    await this.ensureConfig();

    const docDir = docType === 'requirement' ? this.requirementsDir : this.designDir;
    const docFile = path.join(docDir, `${doc_id}.json`);
    if (!fs.existsSync(docFile)) throw new Error(`Document not found: ${docFile}`);
    return JSON.parse(fs.readFileSync(docFile, 'utf-8'));
  }

  async saveDocument(doc_id, document, docType = 'design') {
    await this.ensureConfig();

    document.metadata.updated_at = new Date().toISOString();
    const docDir = docType === 'requirement' ? this.requirementsDir : this.designDir;
    const docFile = path.join(docDir, `${doc_id}.json`);
    fs.writeFileSync(docFile, JSON.stringify(document, null, 2));
  }

  // V5.2: Parse markdown file and extract metadata
  parseMarkdownDocument(mdContent) {
    const lines = mdContent.split('\n');
    const metadata = {};
    let inMetadata = false;

    // Extract metadata from top of file
    for (let i = 0; i < Math.min(20, lines.length); i++) {
      const line = lines[i].trim();

      // Extract key-value pairs like "**Document ID**: DES-004"
      const match = line.match(/\*\*(.+?)\*\*:\s*(.+)/);
      if (match) {
        const key = match[1].toLowerCase().replace(/\s+/g, '_');
        const value = match[2].trim();
        metadata[key] = value;
      }
    }

    return metadata;
  }

  // V5.2: Create JSON document from Markdown file
  async createDocumentFromMarkdown(doc_id, docType = 'design') {
    await this.ensureConfig();

    const docDir = docType === 'requirement' ? this.requirementsDir : this.designDir;
    const mdPath = path.join(docDir, `${doc_id}.md`);
    const files = fs.readdirSync(docDir);

    // Find .md file (could have suffix like DES-004-sales-return.md)
    let mdFile = files.find(f => f.startsWith(doc_id) && f.endsWith('.md'));
    if (!mdFile) {
      throw new Error(`Markdown file not found for ${doc_id} in ${docDir}`);
    }

    const fullMdPath = path.join(docDir, mdFile);
    const mdContent = fs.readFileSync(fullMdPath, 'utf-8');
    const metadata = this.parseMarkdownDocument(mdContent);

    // Extract transaction code from first heading or filename
    const txMatch = mdContent.match(/([A-Z]{2,4}\d{3})/);
    const transactionCode = txMatch ? txMatch[1] : doc_id;

    // Create JSON document structure
    const document = {
      project: this.projectName,
      doc_id: doc_id,
      doc_name: metadata.document_id ? `${transactionCode} - ${mdFile.replace('.md', '')}` : mdFile.replace('.md', ''),
      doc_type: docType,
      feature_name: metadata.purpose || metadata.feature_name || 'Feature from markdown',
      version: metadata.version || '1.0',
      related_requirement: metadata.related_requirements || null,
      status: 'draft',
      metadata: {
        transaction_code: transactionCode,
        created_at: metadata.created || new Date().toISOString(),
        created_by: metadata.author || 'ba-agent-1',
        updated_at: new Date().toISOString(),
        submitted_for_review_at: null,
        reviewed_at: null,
        reviewed_by: null,
        approved_at: null,
        markdown_source: mdFile
      },
      technical_design: {
        transaction_code: transactionCode,
        notes: 'Auto-generated from markdown. Please review and update details.',
        markdown_content_summary: mdContent.substring(0, 500) + '...'
      },
      review_history: []
    };

    // Save JSON document
    await this.saveDocument(doc_id, document, docType);
    console.log(`✅ Created JSON document from ${mdFile}`);

    return document;
  }

  // V5.2: List pending markdown documents (not yet submitted)
  async listPendingMarkdownDocuments(docType = 'design') {
    await this.ensureConfig();

    const docDir = docType === 'requirement' ? this.requirementsDir : this.designDir;
    const files = fs.readdirSync(docDir);

    const mdFiles = files.filter(f => f.endsWith('.md') && (f.startsWith('DES-') || f.startsWith('REQ-')));
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    const pending = [];

    for (const mdFile of mdFiles) {
      const docIdMatch = mdFile.match(/(DES-\d+|REQ-\d+)/);
      if (!docIdMatch) continue;

      const doc_id = docIdMatch[1];
      const jsonFile = `${doc_id}.json`;

      // Check if JSON exists and is submitted
      let needsSubmit = false;
      let reason = '';

      if (!jsonFiles.includes(jsonFile)) {
        needsSubmit = true;
        reason = 'No JSON file created';
      } else {
        // Check if already submitted
        const jsonPath = path.join(docDir, jsonFile);
        const doc = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        if (!doc.metadata.submitted_for_review_at && !doc.orchestrator_review_task_id) {
          needsSubmit = true;
          reason = 'Not submitted to orchestrator';
        }
      }

      if (needsSubmit) {
        pending.push({
          doc_id,
          markdown_file: mdFile,
          json_exists: jsonFiles.includes(jsonFile),
          reason
        });
      }
    }

    return pending;
  }

  // V5.2: Submit document from markdown (create JSON if needed, then submit)
  async submitDocumentFromMarkdown(doc_id, docType = 'design', notes = '') {
    await this.ensureConfig();

    const docDir = docType === 'requirement' ? this.requirementsDir : this.designDir;
    const jsonPath = path.join(docDir, `${doc_id}.json`);

    // Check if JSON exists, if not create from markdown
    if (!fs.existsSync(jsonPath)) {
      console.log(`📝 Creating JSON from markdown for ${doc_id}...`);
      await this.createDocumentFromMarkdown(doc_id, docType);
    }

    // Now submit using existing method
    return await this.submitDocumentForReview(doc_id, docType, notes);
  }

  async submitDocumentForReview(doc_id, docType = 'design', notes = '') {
    const document = await this.loadDocument(doc_id, docType);
    document.status = 'pending';
    document.metadata.submitted_for_review_at = new Date().toISOString();
    await this.saveDocument(doc_id, document, docType);

    const result = await this.request('POST', '/agent/ba/document/submit', {
      doc_id, doc_type: docType, doc_name: document.doc_name,
      feature_name: document.feature_name, project: this.projectName, notes
    });

    document.orchestrator_review_task_id = result.review_task_id;
    await this.saveDocument(doc_id, document, docType);
    return result;
  }

  async updateDocumentAfterReview(doc_id, docType, reviewResult) {
    const document = await this.loadDocument(doc_id, docType);
    document.status = reviewResult.approved ? 'approved' : 'rejected';
    document.metadata.reviewed_at = new Date().toISOString();
    document.metadata.reviewed_by = reviewResult.reviewed_by;
    if (reviewResult.approved) document.metadata.approved_at = new Date().toISOString();
    document.review_history.push({
      date: new Date().toISOString(), reviewer: reviewResult.reviewed_by,
      status: reviewResult.approved ? 'approved' : 'rejected',
      comments: reviewResult.feedback || ''
    });
    await this.saveDocument(doc_id, document, docType);
    return document;
  }

  async listDocuments(docType = 'design') {
    await this.ensureConfig();

    const docDir = docType === 'requirement' ? this.requirementsDir : this.designDir;
    const files = fs.readdirSync(docDir)
      .filter(f => (f.startsWith('REQ-') || f.startsWith('DES-')) && f.endsWith('.json'));
    const documents = files.map(f => {
      const doc = JSON.parse(fs.readFileSync(path.join(docDir, f), 'utf-8'));
      return {
        doc_id: doc.doc_id, doc_name: doc.doc_name, doc_type: doc.doc_type,
        feature_name: doc.feature_name, status: doc.status,
        created_at: doc.metadata.created_at, updated_at: doc.metadata.updated_at
      };
    });
    return { documents, total: documents.length };
  }

  async getDocument(doc_id, docType = 'design') {
    const document = await this.loadDocument(doc_id, docType);
    return {
      doc_id: document.doc_id, doc_name: document.doc_name, doc_type: document.doc_type,
      feature_name: document.feature_name, status: document.status,
      metadata: document.metadata, content: document
    };
  }

  async getApprovedDesigns() {
    await this.ensureConfig();

    const files = fs.readdirSync(this.designDir)
      .filter(f => f.startsWith('DES-') && f.endsWith('.json'));
    const approvedDocs = files
      .map(f => JSON.parse(fs.readFileSync(path.join(this.designDir, f), 'utf-8')))
      .filter(doc => doc.status === 'approved')
      .map(doc => ({
        doc_id: doc.doc_id, doc_name: doc.doc_name, feature_name: doc.feature_name,
        transaction_code: doc.metadata.transaction_code, approved_at: doc.metadata.approved_at,
        file_path: `${this.projectConfig.paths.documents.design}/${doc.doc_id}.json`
      }));
    return { designs: approvedDocs, total: approvedDocs.length };
  }
}

module.exports = BAHelper;

if (require.main === module) {
  const args = process.argv.slice(2);
  const projectIndex = args.indexOf('--project');
  const projectId = projectIndex !== -1 ? args[projectIndex + 1] : 'trading-erp-mcp';

  const ba = new BAHelper({ projectId });

  ba.loadProjectConfig().then(() => {
    console.log('✅ BA Helper V5.2 ready with project-loader support!');
    console.log(`📂 Project: ${ba.projectId}`);
    console.log(`📖 See Docs/requirements/README.md for usage guide.`);
  }).catch(err => {
    console.error('❌ Failed to initialize BA Helper:', err.message);
    process.exit(1);
  });
}
