/**
 * PM AGENT HELPER - V3.8
 *
 * Helper functions for Project Manager Agent
 * - Get reports list from orchestrator
 * - View report content (.md files)
 * - Mark reports as reviewed with feedback
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const ORCHESTRATOR_URL = process.env.ORCHESTRATOR_URL || 'http://localhost:3000';

class PMHelper {
  constructor() {
    this.orchestratorUrl = ORCHESTRATOR_URL;
  }

  /**
   * Get list of pending reports from orchestrator
   */
  async getReportsList() {
    try {
      const response = await axios.get(`${this.orchestratorUrl}/pm/reports/list`);
      return response.data;
    } catch (error) {
      console.error('❌ Error getting reports list:', error.message);
      throw error;
    }
  }

  /**
   * View specific report content
   * @param {string} reportId - Report ID
   */
  async viewReport(reportId) {
    try {
      const response = await axios.get(`${this.orchestratorUrl}/pm/report/${reportId}/view`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error viewing report ${reportId}:`, error.message);
      throw error;
    }
  }

  /**
   * Mark report as reviewed with feedback
   * @param {string} reportId - Report ID
   * @param {boolean} approved - Whether report is approved
   * @param {string} feedback - PM feedback
   */
  async markAsReviewed(reportId, approved, feedback = '') {
    try {
      const response = await axios.post(
        `${this.orchestratorUrl}/pm/report/${reportId}/review`,
        {
          approved: approved,
          feedback: feedback
        }
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Error reviewing report ${reportId}:`, error.message);
      throw error;
    }
  }

  /**
   * Display report summary in console
   * @param {object} report - Report object
   */
  displayReportSummary(report) {
    console.log('\n' + '='.repeat(60));
    console.log(`📋 Report: ${report.title}`);
    console.log('='.repeat(60));
    console.log(`ID: ${report.id}`);
    console.log(`Created: ${new Date(report.createdAt).toLocaleString()}`);
    console.log(`Tasks Included: ${report.tasksCount || report.tasksIncluded?.length || 0}`);
    console.log(`Status: ${report.status}`);

    if (report.summary) {
      console.log(`\nSummary:\n${report.summary}`);
    }

    console.log('='.repeat(60) + '\n');
  }

  /**
   * Display full report content
   * @param {object} reportData - Report data with content
   */
  displayReportContent(reportData) {
    console.log('\n' + '='.repeat(60));
    console.log(`📄 Report Content: ${reportData.report.title}`);
    console.log('='.repeat(60));
    console.log(reportData.report.content);
    console.log('='.repeat(60) + '\n');
  }

  /**
   * Wait for new reports
   * Polls orchestrator for new pending reports
   * @param {number} intervalMs - Poll interval in milliseconds
   */
  async waitForNewReport(intervalMs = 5000) {
    console.log('⏳ Waiting for new reports from Dev...');

    while (true) {
      try {
        const data = await this.getReportsList();

        if (data.pending > 0 && data.reports.length > 0) {
          console.log(`\n✅ New report available!`);
          return data.reports[0]; // Return first pending report
        }

        // Wait before polling again
        await new Promise(resolve => setTimeout(resolve, intervalMs));
        process.stdout.write('.');

      } catch (error) {
        console.error('\n❌ Error while waiting for reports:', error.message);
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      }
    }
  }

  /**
   * Interactive report review workflow
   * @param {string} reportId - Report ID to review
   */
  async interactiveReview(reportId) {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Fetch report
    const reportData = await this.viewReport(reportId);
    this.displayReportContent(reportData);

    return new Promise((resolve) => {
      rl.question('\nApprove this report? (y/n): ', (answer) => {
        const approved = answer.toLowerCase() === 'y';

        rl.question('Feedback (optional): ', async (feedback) => {
          rl.close();

          const result = await this.markAsReviewed(reportId, approved, feedback);
          console.log(`\n✅ Report ${approved ? 'approved' : 'needs revision'}`);

          resolve(result);
        });
      });
    });
  }
}

module.exports = PMHelper;
