#!/usr/bin/env node
const axios = require('axios');
const fs = require('fs');
const path = require('path');
class QAHelper {
  constructor(config = {}) {
    this.orchestratorUrl = config.url ||
                          process.env.ORCHESTRATOR_URL ||
                          'http://localhost:3000';
    this.username = config.username || process.env.QA_USERNAME || 'qa-agent-1';
    this.password = config.password || process.env.QA_PASSWORD || 'demo456';
    this.apiKey = config.apiKey || process.env.QA_API_KEY || 'qa-simple-key-67890';
    this.role = 'qa';
    this.tokenFile = path.join(__dirname, '.qa-token.json');
    this.mode = null;  // Will be auto-detected
    this.accessToken = null;
  }
  detectMode() {
    try {
      const url = new URL(this.orchestratorUrl);
      const hostname = url.hostname;
      const isLocalhost = hostname === 'localhost' ||
                         hostname === '127.0.0.1' ||
                         hostname === '::1';
      const isPrivateIP = hostname.startsWith('192.168.') ||
                         hostname.startsWith('10.') ||
                         hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./);
      const isHttps = url.protocol === 'https:';
      if (isLocalhost || isPrivateIP) {
        return 'lan';
      } else if (isHttps) {
        return 'internet';
      } else {
        throw new Error('Internet mode requires HTTPS URL');
      }
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
    await this.ensureJWTToken();
  }
  async ensureJWTToken() {
    if (fs.existsSync(this.tokenFile)) {
      try {
        const tokenData = JSON.parse(fs.readFileSync(this.tokenFile, 'utf-8'));
        const expiresAt = tokenData.expiresAt || 0;
        if (Date.now() < expiresAt - 60000) {
          this.accessToken = tokenData.accessToken;
          console.log('✅ Using cached JWT token');
          return;
        }
        if (tokenData.refreshToken) {
          try {
            await this.refreshToken(tokenData.refreshToken);
            return;
          } catch (error) {
            console.log('⚠️  Refresh token expired, re-authenticating...');
          }
        }
      } catch (error) {
        console.log('⚠️  Invalid token file, re-authenticating...');
      }
    }
    await this.login();
  }
  async login() {
    console.log('🔐 Logging in as', this.username, '...');
    try {
      const response = await axios.post(
        `${this.orchestratorUrl}/auth/login`,
        {
          username: this.username,
          password: this.password
        }
      );
      const { accessToken, refreshToken, expiresIn, role, mode } = response.data;
      if (!accessToken) {
        throw new Error('No access token received');
      }
      this.accessToken = accessToken;
      this.mode = mode || 'internet';
      const expiresAt = Date.now() + (expiresIn * 1000);
      const tokenData = {
        accessToken,
        refreshToken,
        expiresAt,
        expiresIn,
        role,
        savedAt: new Date().toISOString()
      };
      fs.writeFileSync(this.tokenFile, JSON.stringify(tokenData, null, 2));
      console.log(`✅ Authenticated successfully (${mode} mode)`);
      console.log(`   Token expires in: ${Math.floor(expiresIn / 3600)}h ${Math.floor((expiresIn % 3600) / 60)}m`);
    } catch (error) {
      if (error.response) {
        console.error('❌ Login failed:', error.response.data.error || error.message);
      } else {
        console.error('❌ Login failed:', error.message);
      }
      throw error;
    }
  }
  async refreshToken(refreshToken) {
    console.log('🔄 Refreshing JWT token...');
    try {
      const response = await axios.post(
        `${this.orchestratorUrl}/auth/refresh`,
        { refreshToken }
      );
      const { accessToken, expiresIn } = response.data;
      this.accessToken = accessToken;
      const tokenData = JSON.parse(fs.readFileSync(this.tokenFile, 'utf-8'));
      tokenData.accessToken = accessToken;
      tokenData.expiresAt = Date.now() + (expiresIn * 1000);
      tokenData.expiresIn = expiresIn;
      tokenData.refreshedAt = new Date().toISOString();
      fs.writeFileSync(this.tokenFile, JSON.stringify(tokenData, null, 2));
      console.log('✅ Token refreshed successfully');
    } catch (error) {
      console.error('❌ Token refresh failed:', error.response?.data || error.message);
      throw error;
    }
  }
  async request(method, endpoint, data = null) {
    await this.ensureAuthenticated();
    const headers = {};
    if (this.mode === 'lan') {
      headers['X-API-Key'] = this.apiKey;
    } else {
      if (!this.accessToken) {
        throw new Error('No access token available');
      }
      headers['Authorization'] = `Bearer ${this.accessToken}`;
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
  async testAuth() {
    console.log('\n🧪 Testing authentication...\n');
    const result = await this.request('GET', '/auth/test');
    console.log('✅ Authentication test result:', result);
    return result;
  }
  async getNextTask() {
    console.log('\n📋 Getting next task to review...\n');
    return await this.request('GET', '/agent/qa/task/next');
  }
  async completeTask(taskId, approved, result = null) {
    console.log(`\n${approved ? '✅' : '❌'} ${approved ? 'Approving' : 'Rejecting'} task ${taskId}...\n`);
    return await this.request('POST', '/agent/qa/task/complete', {
      taskId,
      approved,
      result
    });
  }
  async viewTask(taskId) {
    console.log(`\n📄 Viewing task ${taskId}...\n`);
    return await this.request('GET', `/agent/qa/task/${taskId}/view`);
  }
  async listTasks() {
    console.log('\n📊 Listing tasks...\n');
    return await this.request('GET', '/agent/qa/tasks/list');
  }
  getMode() {
    return this.mode || this.detectMode();
  }
  clearTokenCache() {
    if (fs.existsSync(this.tokenFile)) {
      fs.unlinkSync(this.tokenFile);
      console.log('✅ Token cache cleared');
    }
    this.accessToken = null;
  }
  getTokenInfo() {
    if (!fs.existsSync(this.tokenFile)) {
      return null;
    }
    try {
      const tokenData = JSON.parse(fs.readFileSync(this.tokenFile, 'utf-8'));
      const expiresIn = Math.floor((tokenData.expiresAt - Date.now()) / 1000);
      return {
        ...tokenData,
        expiresIn: expiresIn,
        expired: expiresIn <= 0,
        expiresInMinutes: Math.floor(expiresIn / 60)
      };
    } catch (error) {
      return null;
    }
  }
}
module.exports = QAHelper;
if (require.main === module) {
  const qa = new QAHelper();
  (async () => {
    try {
      console.log('🚀 QA Helper V4.1 - Authentication Demo\n');
      console.log('Orchestrator URL:', qa.orchestratorUrl);
      console.log('');
      await qa.testAuth();
      console.log('\n✅ Authentication working!\n');
      if (qa.mode === 'internet') {
        const tokenInfo = qa.getTokenInfo();
        if (tokenInfo) {
          console.log('📄 Token Info:');
          console.log('   Expires in:', tokenInfo.expiresInMinutes, 'minutes');
          console.log('   Saved at:', tokenInfo.savedAt);
          if (tokenInfo.refreshedAt) {
            console.log('   Last refreshed:', tokenInfo.refreshedAt);
          }
        }
      }
    } catch (error) {
      console.error('\n❌ Error:', error.message);
      process.exit(1);
    }
  })();
}