# INTEGRATION DESIGN DOCUMENT
## Hệ thống Quản lý Lương - Payroll Management System

**Version:** 1.0
**Date:** 2024-10-02
**Status:** Draft
**Author:** Integration Architecture Team

---

## MỤC LỤC
1. [Giới thiệu](#1-giới-thiệu)
2. [Integration Architecture](#2-integration-architecture)
3. [External System Integrations](#3-external-system-integrations)
4. [API Integration Patterns](#4-api-integration-patterns)
5. [Message Queue & Event Streaming](#5-message-queue--event-streaming)
6. [Data Synchronization](#6-data-synchronization)
7. [Error Handling & Resilience](#7-error-handling--resilience)
8. [Security & Authentication](#8-security--authentication)
9. [Monitoring & Observability](#9-monitoring--observability)
10. [Testing & Validation](#10-testing--validation)

---

## 1. GIỚI THIỆU

### 1.1 Mục đích
Tài liệu này định nghĩa chiến lược tích hợp toàn diện cho Hệ thống Quản lý Lương với các hệ thống bên ngoài, đảm bảo luồng dữ liệu chính xác, an toàn và hiệu quả.

### 1.2 Phạm vi
- Integration với hệ thống chấm công (Attendance System)
- Kết nối với ngân hàng cho thanh toán lương
- Tích hợp với hệ thống kế toán/ERP
- Đồng bộ với Active Directory/LDAP
- Báo cáo cho cơ quan thuế và bảo hiểm
- Integration với Government APIs

### 1.3 Integration Goals
```
Business Goals:
- Automated data flow between systems
- Real-time synchronization where critical
- Reduced manual data entry and errors
- Streamlined business processes
- Compliance with Vietnamese regulations

Technical Goals:
- Loosely coupled architecture
- Fault-tolerant integrations
- Scalable integration patterns
- Comprehensive monitoring
- Security-first approach
```

### 1.4 Integration Principles
- **Loose Coupling**: Minimize dependencies between systems
- **Idempotency**: Safe to retry operations
- **Event-Driven**: Use events for real-time updates
- **Circuit Breaker**: Fail gracefully when external systems are down
- **Compensation**: Ability to rollback transactions
- **Monitoring**: Full observability of integration flows

---

## 2. INTEGRATION ARCHITECTURE

### 2.1 Integration Landscape

```
┌─────────────────────────────────────────────────┐
│                External Systems                 │
├─────────────────┬───────────────┬───────────────┤
│ Attendance      │ Banking       │ Tax Authority │
│ System          │ APIs          │ Portal        │
├─────────────────┼───────────────┼───────────────┤
│ Active          │ Accounting    │ Social        │
│ Directory       │ System        │ Insurance     │
└─────────────────┴───────────────┴───────────────┘
         │               │               │
         ▼               ▼               ▼
┌─────────────────────────────────────────────────┐
│              API Gateway Layer                  │
│  • Authentication    • Rate Limiting           │
│  • Authorization     • Request Routing         │
│  • Load Balancing    • Protocol Translation    │
└─────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│           Integration Service Layer             │
│  • Message Transformation                      │
│  • Protocol Adaptation                         │
│  • Error Handling                              │
│  • Retry Logic                                 │
└─────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│              Message Broker                     │
│  • Event Streaming (Kafka)                     │
│  • Message Queues (RabbitMQ)                   │
│  • Dead Letter Queues                          │
│  • Message Persistence                         │
└─────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│           Payroll Core Services                 │
│  • Employee Management                         │
│  • Payroll Processing                          │
│  • Calculation Engine                          │
│  • Reporting Services                          │
└─────────────────────────────────────────────────┘
```

### 2.2 Integration Patterns

#### Synchronous Integration
```yaml
use_cases:
  - real_time_authentication: "LDAP/AD lookup"
  - immediate_validation: "Bank account verification"
  - critical_calculations: "Tax rate lookup"
  - user_interactions: "Employee profile updates"

characteristics:
  - request_response_pattern: true
  - real_time_processing: true
  - immediate_feedback: true
  - timeout_handling: required

patterns:
  - restful_apis: "HTTP/HTTPS"
  - soap_services: "Legacy system support"
  - graphql: "Flexible data queries"
  - rpc_calls: "Internal service communication"
```

#### Asynchronous Integration
```yaml
use_cases:
  - bulk_data_processing: "Monthly payroll calculation"
  - audit_logging: "Transaction records"
  - notification_delivery: "Email/SMS alerts"
  - data_synchronization: "Master data updates"

characteristics:
  - fire_and_forget: true
  - eventual_consistency: acceptable
  - high_throughput: required
  - resilience: critical

patterns:
  - event_driven_architecture: "Domain events"
  - message_queues: "Reliable delivery"
  - publish_subscribe: "Multiple consumers"
  - event_sourcing: "Audit trail"
```

#### Batch Integration
```yaml
use_cases:
  - data_warehouse_updates: "Daily ETL processes"
  - government_reporting: "Monthly tax reports"
  - backup_operations: "Nightly data backup"
  - compliance_reports: "Quarterly submissions"

characteristics:
  - scheduled_execution: true
  - large_data_volumes: expected
  - error_recovery: robust
  - monitoring: comprehensive

patterns:
  - etl_pipelines: "Extract, Transform, Load"
  - file_transfers: "SFTP/FTP"
  - database_replication: "Data sync"
  - batch_apis: "Bulk operations"
```

---

## 3. EXTERNAL SYSTEM INTEGRATIONS

### 3.1 Attendance System Integration

#### Integration Overview
```yaml
purpose: "Import employee attendance data for payroll calculation"
frequency: "Daily synchronization"
data_volume: "~50,000 records/day"
criticality: "High - Required for payroll processing"

integration_method:
  primary: "REST API"
  fallback: "File-based transfer (CSV/Excel)"
  real_time: "Webhook notifications"
```

#### Data Flow
```yaml
attendance_data_flow:
  inbound:
    endpoint: "POST /api/v1/attendance/sync"
    schedule: "Daily at 23:30"
    format: "JSON"

    data_structure:
      employee_id: "string"
      date: "date"
      clock_in: "timestamp"
      clock_out: "timestamp"
      break_duration: "number (minutes)"
      overtime_hours: "number"
      status: "enum[PRESENT, ABSENT, LATE, EARLY_LEAVE]"
      approved_by: "string"
      notes: "string"

  processing:
    validation:
      - employee_exists: "Check against HR database"
      - date_range: "Current payroll period"
      - time_logic: "Clock-out after clock-in"
      - overtime_rules: "Company policy compliance"

    transformation:
      - time_calculations: "Work hours, overtime"
      - policy_application: "Attendance rules"
      - exception_handling: "Missing data"

  outbound:
    payroll_update: "Update employee work hours"
    notification: "Alert for anomalies"
    audit_log: "Record all changes"
```

#### API Specification
```yaml
endpoints:
  get_attendance:
    method: "GET"
    path: "/api/v1/attendance"
    parameters:
      employee_id: "optional"
      date_from: "required"
      date_to: "required"
      department: "optional"

    response:
      format: "JSON"
      structure:
        data: "array of attendance records"
        pagination: "page info"
        summary: "totals and statistics"

  post_attendance_bulk:
    method: "POST"
    path: "/api/v1/attendance/bulk"
    request:
      format: "JSON or CSV upload"
      validation: "Real-time validation"
      batch_size: "max 1000 records"

    response:
      processed: "number of successful records"
      errors: "array of validation errors"
      warnings: "array of warnings"

authentication:
  method: "API Key + JWT"
  rotation: "Monthly"
  ip_restrictions: "Office network only"
```

### 3.2 Banking System Integration

#### Banking Integration Overview
```yaml
purpose: "Process salary payments to employee bank accounts"
banks_supported:
  - vietcombank: "API integration"
  - techcombank: "File-based"
  - bidv: "API integration"
  - acb: "API integration"
  - others: "Generic file format"

security_requirements:
  - encryption: "End-to-end encryption"
  - authentication: "Mutual TLS"
  - authorization: "Digital signatures"
  - compliance: "SBV regulations"
```

#### Payment Processing Flow
```yaml
payment_initiation:
  trigger: "Payroll approval completion"
  validation:
    - employee_bank_details: "Active accounts"
    - payment_amounts: "Positive values"
    - available_balance: "Sufficient funds"
    - regulatory_limits: "Daily/monthly limits"

  batch_creation:
    format: "Bank-specific format"
    digital_signature: "PKI-based signing"
    encryption: "AES-256-GCM"
    transmission: "Secure channels only"

payment_execution:
  real_time_apis:
    vietcombank:
      endpoint: "https://api.vietcombank.com.vn/v1/payments"
      method: "POST"
      authentication: "mTLS + JWT"
      format: "JSON"

    techcombank:
      endpoint: "https://api.techcombank.com.vn/v2/bulk-transfer"
      method: "POST"
      authentication: "OAuth 2.0"
      format: "JSON"

  file_based:
    bidv:
      format: "SWIFT MT101"
      delivery: "SFTP"
      confirmation: "MT940 statement"

    acb:
      format: "Custom XML"
      delivery: "Web service"
      confirmation: "Real-time response"

payment_status_tracking:
  status_updates:
    - initiated: "Payment submitted to bank"
    - processing: "Bank processing payment"
    - completed: "Funds transferred"
    - failed: "Payment rejected"
    - returned: "Payment returned"

  notification_channels:
    - webhook: "Real-time status updates"
    - polling: "Periodic status checks"
    - file_reports: "Daily reconciliation files"
```

#### Banking API Examples
```json
// Vietcombank Payment Request
{
  "batch_id": "PAY_202409_001",
  "total_amount": 5434000000,
  "currency": "VND",
  "payments": [
    {
      "payment_id": "PAY_EMP001_202409",
      "beneficiary": {
        "account_number": "1234567890",
        "account_name": "NGUYEN VAN AN",
        "bank_code": "VCB"
      },
      "amount": 19268000,
      "currency": "VND",
      "purpose": "Salary payment for Sep 2024",
      "reference": "EMP001-SEP2024"
    }
  ]
}

// Bank Response
{
  "batch_id": "PAY_202409_001",
  "status": "ACCEPTED",
  "bank_reference": "VCB_TXN_123456789",
  "processing_time": "2024-10-01T14:30:00Z",
  "payments": [
    {
      "payment_id": "PAY_EMP001_202409",
      "status": "PROCESSING",
      "bank_reference": "VCB_PAY_987654321",
      "estimated_completion": "2024-10-01T16:00:00Z"
    }
  ]
}
```

### 3.3 Government System Integration

#### Tax Authority Integration
```yaml
purpose: "Submit personal income tax reports"
system: "eTax Portal - General Department of Taxation"
frequency: "Monthly submissions"
deadline: "15th of following month"

integration_method:
  primary: "Government API"
  fallback: "Portal upload"
  format: "XML (GDT standard)"

data_requirements:
  employee_tax_data:
    - employee_tax_id: "10-digit tax code"
    - gross_income: "Monthly gross salary"
    - deductions: "BHXH, union fees, etc."
    - taxable_income: "After deductions"
    - tax_amount: "Calculated tax"
    - tax_paid: "Previously paid tax"

  company_information:
    - company_tax_id: "13-digit enterprise code"
    - company_name: "Legal entity name"
    - address: "Legal address"
    - contact_person: "Authorized representative"

submission_process:
  validation:
    - data_completeness: "All required fields"
    - calculation_accuracy: "Tax calculation verification"
    - regulatory_compliance: "Current tax rates"

  submission:
    - xml_generation: "GDT XML schema"
    - digital_signature: "PKI certificate"
    - transmission: "Secure government portal"

  confirmation:
    - receipt_number: "Government acknowledgment"
    - processing_status: "Acceptance/rejection"
    - error_details: "Validation errors if any"
```

#### Social Insurance Integration
```yaml
purpose: "Submit social insurance declarations"
system: "VSS Portal - Vietnam Social Security"
frequency: "Monthly declarations"
deadline: "15th of following month"

data_flow:
  employee_contributions:
    - employee_id: "Social insurance number"
    - salary_base: "Contribution calculation base"
    - contribution_rate: "Current rates (8%/17.5%/1%)"
    - contribution_amount: "Employee + Employer"
    - payment_period: "Contribution month"

  declaration_process:
    format: "VSS XML format"
    validation: "Real-time validation"
    submission: "Portal API"
    confirmation: "Digital receipt"

  payment_process:
    amount_calculation: "Total contributions"
    payment_method: "Bank transfer"
    payment_deadline: "25th of month"
    reconciliation: "Monthly statements"
```

### 3.4 ERP/Accounting System Integration

#### Integration Overview
```yaml
purpose: "Synchronize payroll data with financial system"
erp_systems:
  - sap: "SAP Business One"
  - oracle: "Oracle NetSuite"
  - local_erp: "Vietnamese ERP solutions"

integration_patterns:
  real_time: "Chart of accounts synchronization"
  batch: "Monthly journal entries"
  event_driven: "Payroll completion events"
```

#### Data Synchronization
```yaml
master_data_sync:
  chart_of_accounts:
    direction: "ERP → Payroll"
    frequency: "Real-time"
    method: "REST API"

  cost_centers:
    direction: "ERP → Payroll"
    frequency: "Daily"
    method: "Scheduled sync"

  employee_data:
    direction: "Bidirectional"
    frequency: "Real-time"
    method: "Event-driven"

transactional_data:
  payroll_journal_entries:
    direction: "Payroll → ERP"
    frequency: "Monthly"
    format: "Standard journal entry format"

    entry_structure:
      debit_accounts:
        - "Salary Expense": "Total gross salaries"
        - "Payroll Tax Expense": "Employer taxes"
        - "Benefits Expense": "Employee benefits"

      credit_accounts:
        - "Cash/Bank": "Net pay amount"
        - "Tax Payable": "Withheld taxes"
        - "BHXH Payable": "Social insurance"

  budget_vs_actual:
    direction: "Payroll → ERP"
    frequency: "Real-time"
    purpose: "Budget tracking and variance analysis"
```

---

## 4. API INTEGRATION PATTERNS

### 4.1 RESTful API Integration

#### API Design Standards
```yaml
rest_principles:
  resource_based_urls: true
  http_methods_semantic: true
  stateless_communication: true
  json_data_format: true
  hateoas_support: true

url_conventions:
  base_url: "https://api.payroll.company.com/v1"
  resource_naming: "plural_nouns"
  nesting: "max_2_levels"

  examples:
    - "/employees"
    - "/employees/{id}/payroll"
    - "/payroll/{period}/calculations"

http_methods:
  GET: "Retrieve resources"
  POST: "Create new resources"
  PUT: "Update entire resource"
  PATCH: "Partial resource update"
  DELETE: "Remove resource"

status_codes:
  success: [200, 201, 202, 204]
  client_error: [400, 401, 403, 404, 409, 422]
  server_error: [500, 502, 503, 504]
```

#### API Client Implementation
```javascript
// API Client with Retry Logic
class PayrollAPIClient {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.retryAttempts = 3;
    this.retryDelay = 1000; // 1 second
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'X-API-Version': '1.0',
        ...options.headers
      },
      ...options
    };

    return this.retryWrapper(() => fetch(url, config));
  }

  async retryWrapper(requestFn) {
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await requestFn();

        if (response.ok) {
          return response.json();
        }

        if (response.status >= 500 && attempt < this.retryAttempts) {
          await this.delay(this.retryDelay * attempt);
          continue;
        }

        throw new APIError(response.status, await response.text());
      } catch (error) {
        if (attempt === this.retryAttempts) {
          throw error;
        }
        await this.delay(this.retryDelay * attempt);
      }
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage Example
const apiClient = new PayrollAPIClient(
  'https://api.attendance.company.com/v1',
  process.env.ATTENDANCE_API_KEY
);

// Get attendance data
const attendanceData = await apiClient.makeRequest('/attendance', {
  method: 'GET',
  headers: {
    'X-Date-Range': '2024-09-01,2024-09-30'
  }
});
```

### 4.2 Event-Driven Integration

#### Event Architecture
```yaml
event_patterns:
  domain_events:
    - employee_hired
    - employee_terminated
    - salary_calculated
    - payment_processed
    - tax_submitted

  system_events:
    - data_sync_completed
    - integration_failed
    - service_health_changed
    - security_incident_detected

event_schema:
  structure:
    event_id: "unique identifier"
    event_type: "domain.action format"
    timestamp: "ISO 8601 timestamp"
    source: "publishing service"
    data: "event payload"
    metadata: "additional context"

  example:
    event_id: "evt_pay_calc_123456"
    event_type: "payroll.calculation.completed"
    timestamp: "2024-10-01T14:30:00Z"
    source: "payroll-calculation-service"
    data:
      payroll_period: "2024-09"
      employee_count: 247
      total_amount: 5434000000
      calculation_time: "45 minutes"
    metadata:
      correlation_id: "calc_202409_001"
      user_id: "usr_hr_manager_01"
```

#### Message Broker Configuration
```yaml
apache_kafka:
  cluster_config:
    brokers: 3
    replication_factor: 3
    min_in_sync_replicas: 2
    retention_period: "7 days"

  topics:
    employee_events:
      partitions: 12
      retention: "30 days"
      compression: "snappy"

    payroll_events:
      partitions: 6
      retention: "90 days"
      compression: "gzip"

    integration_events:
      partitions: 3
      retention: "7 days"
      compression: "snappy"

  producers:
    configuration:
      acks: "all"
      retries: 3
      batch_size: 16384
      linger_ms: 5
      compression_type: "snappy"

  consumers:
    configuration:
      group_id: "payroll-integration-group"
      auto_offset_reset: "earliest"
      enable_auto_commit: false
      max_poll_records: 500
```

### 4.3 Circuit Breaker Pattern

#### Circuit Breaker Implementation
```javascript
class CircuitBreaker {
  constructor(service, options = {}) {
    this.service = service;
    this.failureThreshold = options.failureThreshold || 5;
    this.timeout = options.timeout || 60000; // 1 minute
    this.monitoringPeriod = options.monitoringPeriod || 10000; // 10 seconds

    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.nextAttempt = Date.now();
    this.successCount = 0;
  }

  async call(request) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      } else {
        this.state = 'HALF_OPEN';
        this.successCount = 0;
      }
    }

    try {
      const result = await this.service.call(request);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;

    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= 3) {
        this.state = 'CLOSED';
      }
    }
  }

  onFailure() {
    this.failureCount++;

    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }

  getState() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      nextAttempt: this.nextAttempt
    };
  }
}

// Usage Example
const attendanceServiceBreaker = new CircuitBreaker(
  attendanceService,
  {
    failureThreshold: 5,
    timeout: 60000,
    monitoringPeriod: 10000
  }
);

try {
  const attendanceData = await attendanceServiceBreaker.call({
    endpoint: '/attendance/daily',
    date: '2024-10-01'
  });
} catch (error) {
  // Fallback to cached data or alternative service
  const fallbackData = await getCachedAttendanceData('2024-10-01');
}
```

---

## 5. MESSAGE QUEUE & EVENT STREAMING

### 5.1 Message Queue Architecture

#### RabbitMQ Configuration
```yaml
rabbitmq_setup:
  cluster:
    nodes: 3
    ha_policy: "all"
    disk_space_limit: "2GB"
    memory_limit: "1GB"

  exchanges:
    payroll_exchange:
      type: "topic"
      durability: true
      routing_patterns:
        - "payroll.calculation.*"
        - "payroll.payment.*"
        - "payroll.report.*"

    integration_exchange:
      type: "direct"
      durability: true
      routing_keys:
        - "attendance.sync"
        - "banking.payment"
        - "tax.submission"

  queues:
    payroll_calculation_queue:
      durability: true
      auto_delete: false
      max_length: 10000
      message_ttl: 86400000 # 24 hours

    payment_processing_queue:
      durability: true
      auto_delete: false
      max_length: 5000
      message_ttl: 43200000 # 12 hours

    dead_letter_queue:
      durability: true
      auto_delete: false
      arguments:
        x-message-ttl: 604800000 # 7 days
```

#### Message Processing Patterns
```javascript
// Message Publisher
class MessagePublisher {
  constructor(connection) {
    this.connection = connection;
    this.channel = null;
  }

  async initialize() {
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange('payroll_exchange', 'topic', {
      durable: true
    });
  }

  async publishEvent(routingKey, message, options = {}) {
    const messageBuffer = Buffer.from(JSON.stringify({
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      data: message,
      ...options.metadata
    }));

    await this.channel.publish(
      'payroll_exchange',
      routingKey,
      messageBuffer,
      {
        persistent: true,
        timestamp: Date.now(),
        messageId: uuidv4(),
        ...options.properties
      }
    );
  }
}

// Message Consumer
class MessageConsumer {
  constructor(connection, queueName) {
    this.connection = connection;
    this.queueName = queueName;
    this.channel = null;
    this.retryAttempts = 3;
  }

  async initialize() {
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queueName, {
      durable: true
    });

    // Setup dead letter exchange
    await this.channel.assertExchange('dlx', 'direct');
    await this.channel.assertQueue(`${this.queueName}.dlq`, {
      durable: true
    });
  }

  async consume(processor) {
    await this.channel.consume(this.queueName, async (msg) => {
      if (!msg) return;

      try {
        const content = JSON.parse(msg.content.toString());
        await processor(content);
        this.channel.ack(msg);
      } catch (error) {
        await this.handleError(msg, error);
      }
    });
  }

  async handleError(msg, error) {
    const retryCount = (msg.properties.headers['x-retry-count'] || 0) + 1;

    if (retryCount <= this.retryAttempts) {
      // Retry with exponential backoff
      const delay = Math.pow(2, retryCount) * 1000; // 2s, 4s, 8s

      setTimeout(() => {
        this.channel.publish(
          'payroll_exchange',
          msg.fields.routingKey,
          msg.content,
          {
            ...msg.properties,
            headers: {
              ...msg.properties.headers,
              'x-retry-count': retryCount
            }
          }
        );
      }, delay);

      this.channel.ack(msg);
    } else {
      // Send to dead letter queue
      this.channel.publish('dlx', `${this.queueName}.dlq`, msg.content, {
        ...msg.properties,
        headers: {
          ...msg.properties.headers,
          'x-original-error': error.message,
          'x-failed-at': new Date().toISOString()
        }
      });

      this.channel.ack(msg);
    }
  }
}
```

### 5.2 Event Streaming with Kafka

#### Kafka Topics Design
```yaml
topic_strategy:
  naming_convention: "domain.entity.action"

  topics:
    employee_domain:
      - "hr.employee.created"
      - "hr.employee.updated"
      - "hr.employee.terminated"
      - "hr.employee.salary_changed"

    payroll_domain:
      - "payroll.calculation.started"
      - "payroll.calculation.completed"
      - "payroll.calculation.failed"
      - "payroll.payment.initiated"
      - "payroll.payment.completed"

    integration_domain:
      - "integration.attendance.synced"
      - "integration.banking.payment_sent"
      - "integration.tax.submitted"
      - "integration.error.occurred"

partitioning_strategy:
  employee_events: "partition by employee_id"
  payroll_events: "partition by payroll_period"
  integration_events: "partition by system_id"
```

#### Event Sourcing Implementation
```javascript
// Event Store
class EventStore {
  constructor(kafkaProducer) {
    this.producer = kafkaProducer;
  }

  async appendEvent(streamId, eventType, eventData, expectedVersion) {
    const event = {
      streamId,
      eventType,
      eventData,
      eventId: uuidv4(),
      timestamp: new Date().toISOString(),
      version: expectedVersion + 1
    };

    await this.producer.send({
      topic: 'event_store',
      key: streamId,
      value: JSON.stringify(event),
      partition: this.getPartition(streamId)
    });

    return event;
  }

  async getEvents(streamId, fromVersion = 0) {
    // Implementation to read events from Kafka
    // This would typically involve a consumer that reads
    // all events for a specific stream
  }

  getPartition(streamId) {
    // Consistent hashing to ensure events for same stream
    // go to same partition for ordering guarantees
    return Math.abs(streamId.hashCode()) % 12;
  }
}

// Aggregate Root
class EmployeeAggregate {
  constructor() {
    this.id = null;
    this.version = 0;
    this.uncommittedEvents = [];
  }

  static fromHistory(events) {
    const aggregate = new EmployeeAggregate();
    events.forEach(event => aggregate.apply(event));
    return aggregate;
  }

  createEmployee(employeeData) {
    const event = {
      type: 'EmployeeCreated',
      data: employeeData
    };

    this.apply(event);
    this.uncommittedEvents.push(event);
  }

  updateSalary(newSalary, effectiveDate) {
    if (newSalary <= 0) {
      throw new Error('Salary must be positive');
    }

    const event = {
      type: 'SalaryUpdated',
      data: {
        employeeId: this.id,
        previousSalary: this.salary,
        newSalary,
        effectiveDate
      }
    };

    this.apply(event);
    this.uncommittedEvents.push(event);
  }

  apply(event) {
    switch (event.type) {
      case 'EmployeeCreated':
        this.id = event.data.id;
        this.name = event.data.name;
        this.salary = event.data.salary;
        break;

      case 'SalaryUpdated':
        this.salary = event.data.newSalary;
        break;
    }

    this.version++;
  }

  getUncommittedEvents() {
    return [...this.uncommittedEvents];
  }

  markEventsAsCommitted() {
    this.uncommittedEvents = [];
  }
}
```

---

## 6. DATA SYNCHRONIZATION

### 6.1 Master Data Management

#### Data Synchronization Strategy
```yaml
master_data_sources:
  employees:
    master_system: "HR System"
    sync_frequency: "Real-time"
    sync_method: "Event-driven"
    conflict_resolution: "HR system wins"

  departments:
    master_system: "ERP System"
    sync_frequency: "Daily"
    sync_method: "Batch"
    conflict_resolution: "Latest timestamp wins"

  bank_accounts:
    master_system: "Payroll System"
    sync_frequency: "Real-time"
    sync_method: "API calls"
    conflict_resolution: "Manual review"

synchronization_patterns:
  real_time_sync:
    - Change Data Capture (CDC)
    - Database triggers
    - Event streaming
    - API webhooks

  batch_sync:
    - Scheduled ETL jobs
    - File-based transfers
    - Database replication
    - API bulk operations

  hybrid_sync:
    - Critical data: Real-time
    - Reference data: Batch
    - Audit data: Near real-time
```

#### Change Data Capture Implementation
```javascript
// Database Change Listener
class ChangeDataCapture {
  constructor(database, eventPublisher) {
    this.database = database;
    this.eventPublisher = eventPublisher;
    this.triggers = new Map();
  }

  async setupTriggers() {
    // Employee table trigger
    await this.database.query(`
      CREATE OR REPLACE FUNCTION notify_employee_changes()
      RETURNS trigger AS $$
      BEGIN
        PERFORM pg_notify('employee_changes',
          json_build_object(
            'operation', TG_OP,
            'table', TG_TABLE_NAME,
            'old', row_to_json(OLD),
            'new', row_to_json(NEW),
            'timestamp', extract(epoch from now())
          )::text
        );
        RETURN COALESCE(NEW, OLD);
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER employee_change_trigger
      AFTER INSERT OR UPDATE OR DELETE ON employees
      FOR EACH ROW EXECUTE FUNCTION notify_employee_changes();
    `);

    // Listen for notifications
    this.database.on('notification', async (msg) => {
      if (msg.channel === 'employee_changes') {
        await this.handleEmployeeChange(JSON.parse(msg.payload));
      }
    });
  }

  async handleEmployeeChange(change) {
    const eventType = `employee.${change.operation.toLowerCase()}`;

    await this.eventPublisher.publish(eventType, {
      employeeId: change.new?.id || change.old?.id,
      before: change.old,
      after: change.new,
      timestamp: change.timestamp
    });
  }
}

// Data Synchronization Service
class DataSyncService {
  constructor(eventConsumer, targetSystems) {
    this.eventConsumer = eventConsumer;
    this.targetSystems = targetSystems;
  }

  async start() {
    await this.eventConsumer.subscribe('employee.*', async (event) => {
      await this.syncToTargetSystems(event);
    });
  }

  async syncToTargetSystems(event) {
    const syncTasks = this.targetSystems.map(async (system) => {
      try {
        await system.sync(event);
        await this.recordSyncSuccess(system.name, event);
      } catch (error) {
        await this.recordSyncFailure(system.name, event, error);
        await this.scheduleRetry(system.name, event);
      }
    });

    await Promise.allSettled(syncTasks);
  }

  async recordSyncSuccess(systemName, event) {
    await this.database.query(`
      INSERT INTO sync_log (system_name, event_id, status, timestamp)
      VALUES ($1, $2, 'SUCCESS', NOW())
    `, [systemName, event.id]);
  }

  async recordSyncFailure(systemName, event, error) {
    await this.database.query(`
      INSERT INTO sync_log (system_name, event_id, status, error_message, timestamp)
      VALUES ($1, $2, 'FAILED', $3, NOW())
    `, [systemName, event.id, error.message]);
  }
}
```

### 6.2 Conflict Resolution

#### Conflict Resolution Strategies
```yaml
conflict_types:
  concurrent_updates:
    description: "Same record updated simultaneously"
    resolution: "Last writer wins with audit"

  data_type_conflicts:
    description: "Different data types for same field"
    resolution: "Transform to common format"

  business_rule_conflicts:
    description: "Updates violate business rules"
    resolution: "Reject and alert"

  referential_integrity:
    description: "Foreign key constraints violated"
    resolution: "Cascade or reject based on policy"

resolution_mechanisms:
  timestamp_based:
    strategy: "Latest timestamp wins"
    use_cases: ["Reference data", "Non-critical updates"]

  version_based:
    strategy: "Higher version number wins"
    use_cases: ["Structured data", "API updates"]

  source_priority:
    strategy: "Master system always wins"
    use_cases: ["Master data", "Authoritative sources"]

  manual_resolution:
    strategy: "Human intervention required"
    use_cases: ["Critical conflicts", "Complex business rules"]
```

#### Conflict Resolution Implementation
```javascript
class ConflictResolver {
  constructor(conflictStore, notificationService) {
    this.conflictStore = conflictStore;
    this.notificationService = notificationService;
  }

  async resolveConflict(conflict) {
    const strategy = this.getResolutionStrategy(conflict);

    switch (strategy) {
      case 'timestamp_based':
        return this.resolveByTimestamp(conflict);

      case 'source_priority':
        return this.resolveBySourcePriority(conflict);

      case 'manual_resolution':
        return this.flagForManualResolution(conflict);

      default:
        throw new Error(`Unknown resolution strategy: ${strategy}`);
    }
  }

  getResolutionStrategy(conflict) {
    const rules = {
      'employee.salary': 'source_priority', // HR system wins
      'employee.personal_info': 'timestamp_based',
      'employee.bank_account': 'manual_resolution'
    };

    return rules[conflict.field] || 'timestamp_based';
  }

  async resolveByTimestamp(conflict) {
    const winner = conflict.changes.reduce((latest, current) => {
      return new Date(current.timestamp) > new Date(latest.timestamp)
        ? current : latest;
    });

    await this.applyResolution(conflict, winner);
    return winner;
  }

  async resolveBySourcePriority(conflict) {
    const priorities = {
      'hr_system': 1,
      'payroll_system': 2,
      'attendance_system': 3
    };

    const winner = conflict.changes.reduce((highest, current) => {
      const currentPriority = priorities[current.source] || 999;
      const highestPriority = priorities[highest.source] || 999;

      return currentPriority < highestPriority ? current : highest;
    });

    await this.applyResolution(conflict, winner);
    return winner;
  }

  async flagForManualResolution(conflict) {
    await this.conflictStore.save({
      ...conflict,
      status: 'PENDING_MANUAL_RESOLUTION',
      flaggedAt: new Date()
    });

    await this.notificationService.notify({
      type: 'CONFLICT_REQUIRES_ATTENTION',
      conflict: conflict,
      recipients: ['hr-admin@company.com', 'it-admin@company.com']
    });

    return null; // No automatic resolution
  }

  async applyResolution(conflict, winningChange) {
    // Apply the winning change to all target systems
    await this.syncService.applyChange(winningChange);

    // Record the resolution
    await this.conflictStore.save({
      ...conflict,
      status: 'RESOLVED',
      resolution: winningChange,
      resolvedAt: new Date()
    });
  }
}
```

---

## 7. ERROR HANDLING & RESILIENCE

### 7.1 Error Handling Strategy

#### Error Classification
```yaml
error_categories:
  transient_errors:
    description: "Temporary issues that may resolve"
    examples:
      - network_timeouts
      - service_temporarily_unavailable
      - rate_limit_exceeded
    handling: "Retry with exponential backoff"

  permanent_errors:
    description: "Errors that won't resolve with retry"
    examples:
      - authentication_failed
      - invalid_data_format
      - business_rule_violation
    handling: "Log, alert, and stop processing"

  integration_errors:
    description: "External system integration failures"
    examples:
      - api_endpoint_not_found
      - service_unavailable
      - data_transformation_failed
    handling: "Circuit breaker + fallback"

  data_errors:
    description: "Data quality or consistency issues"
    examples:
      - missing_required_fields
      - invalid_data_types
      - constraint_violations
    handling: "Validation + compensation"
```

#### Retry Mechanisms
```javascript
class RetryHandler {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.baseDelay = options.baseDelay || 1000;
    this.maxDelay = options.maxDelay || 30000;
    this.backoffMultiplier = options.backoffMultiplier || 2;
  }

  async executeWithRetry(operation, context = {}) {
    let lastError;

    for (let attempt = 1; attempt <= this.maxRetries + 1; attempt++) {
      try {
        const result = await operation();

        if (attempt > 1) {
          // Log successful retry
          logger.info(`Operation succeeded on attempt ${attempt}`, {
            context,
            attempts: attempt
          });
        }

        return result;
      } catch (error) {
        lastError = error;

        if (attempt > this.maxRetries) {
          break;
        }

        if (!this.isRetryableError(error)) {
          throw error;
        }

        const delay = this.calculateDelay(attempt);

        logger.warn(`Operation failed, retrying in ${delay}ms`, {
          error: error.message,
          attempt,
          context
        });

        await this.delay(delay);
      }
    }

    throw new Error(`Operation failed after ${this.maxRetries + 1} attempts: ${lastError.message}`);
  }

  isRetryableError(error) {
    const retryableErrors = [
      'ECONNRESET',
      'ECONNREFUSED',
      'ETIMEDOUT',
      'ENOTFOUND'
    ];

    const retryableHttpCodes = [408, 429, 500, 502, 503, 504];

    return retryableErrors.includes(error.code) ||
           retryableHttpCodes.includes(error.status);
  }

  calculateDelay(attempt) {
    const exponentialDelay = this.baseDelay * Math.pow(this.backoffMultiplier, attempt - 1);
    const jitter = Math.random() * 0.1 * exponentialDelay; // Add 10% jitter

    return Math.min(exponentialDelay + jitter, this.maxDelay);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage Example
const retryHandler = new RetryHandler({
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000
});

await retryHandler.executeWithRetry(async () => {
  return await bankingAPI.transferSalary(paymentData);
}, {
  operation: 'salary_transfer',
  paymentId: paymentData.id
});
```

### 7.2 Fallback Mechanisms

#### Fallback Strategies
```yaml
fallback_patterns:
  cached_data:
    use_case: "Employee master data lookup"
    implementation: "Redis cache with TTL"
    freshness: "6 hours"

  alternative_service:
    use_case: "Payment processing"
    implementation: "Secondary bank API"
    selection: "Automatic failover"

  degraded_functionality:
    use_case: "Real-time reporting"
    implementation: "Simplified calculations"
    user_notification: "Limited data warning"

  manual_process:
    use_case: "Critical payment failures"
    implementation: "Email notification + manual file"
    escalation: "Immediate alert"
```

#### Fallback Implementation
```javascript
class FallbackManager {
  constructor() {
    this.fallbackStrategies = new Map();
    this.circuitBreakers = new Map();
  }

  registerFallback(serviceName, fallbackFn) {
    this.fallbackStrategies.set(serviceName, fallbackFn);
  }

  async executeWithFallback(serviceName, primaryFn, context = {}) {
    const circuitBreaker = this.getCircuitBreaker(serviceName);

    try {
      return await circuitBreaker.execute(primaryFn);
    } catch (error) {
      logger.warn(`Primary service failed, attempting fallback`, {
        service: serviceName,
        error: error.message,
        context
      });

      const fallbackFn = this.fallbackStrategies.get(serviceName);

      if (!fallbackFn) {
        throw new Error(`No fallback strategy for service: ${serviceName}`);
      }

      try {
        const result = await fallbackFn(context);

        // Mark result as coming from fallback
        return {
          ...result,
          _meta: {
            source: 'fallback',
            primaryError: error.message,
            timestamp: new Date().toISOString()
          }
        };
      } catch (fallbackError) {
        logger.error(`Both primary and fallback failed`, {
          service: serviceName,
          primaryError: error.message,
          fallbackError: fallbackError.message,
          context
        });

        throw new Error(`Service ${serviceName} unavailable: ${fallbackError.message}`);
      }
    }
  }

  getCircuitBreaker(serviceName) {
    if (!this.circuitBreakers.has(serviceName)) {
      this.circuitBreakers.set(serviceName, new CircuitBreaker(serviceName));
    }
    return this.circuitBreakers.get(serviceName);
  }
}

// Fallback Strategies
class PayrollFallbacks {
  constructor(cacheService, notificationService) {
    this.cache = cacheService;
    this.notifications = notificationService;
  }

  async attendanceDataFallback(context) {
    // Try to get cached attendance data
    const cachedData = await this.cache.get(`attendance:${context.date}`);

    if (cachedData) {
      logger.info('Using cached attendance data', { date: context.date });
      return cachedData;
    }

    // Fall back to previous day's pattern
    const previousDayData = await this.cache.get(`attendance:${context.previousDate}`);

    if (previousDayData) {
      logger.warn('Using previous day attendance pattern', {
        date: context.date,
        fallbackDate: context.previousDate
      });

      return this.adaptPreviousDayData(previousDayData, context.date);
    }

    // Last resort: standard work hours
    return this.generateStandardAttendance(context);
  }

  async bankingServiceFallback(context) {
    // Try alternative banking API
    if (context.paymentData.bank === 'vietcombank') {
      try {
        return await this.processViaTechcombank(context.paymentData);
      } catch (error) {
        // Fall back to manual file generation
        return await this.generateManualPaymentFile(context.paymentData);
      }
    }

    throw new Error('No fallback available for banking service');
  }

  async generateManualPaymentFile(paymentData) {
    const fileName = `manual_payment_${Date.now()}.csv`;
    const filePath = await this.generateCSVFile(paymentData, fileName);

    await this.notifications.send({
      to: ['finance@company.com', 'hr@company.com'],
      subject: 'Manual Payment Processing Required',
      message: `Banking API failed. Manual payment file generated: ${fileName}`,
      attachments: [filePath]
    });

    return {
      status: 'MANUAL_PROCESSING_REQUIRED',
      fileName,
      totalAmount: paymentData.totalAmount,
      employeeCount: paymentData.payments.length
    };
  }
}
```

---

## 8. SECURITY & AUTHENTICATION

### 8.1 API Security

#### Authentication Methods
```yaml
authentication_patterns:
  oauth2_client_credentials:
    use_case: "System-to-system integration"
    flow: "Client credentials grant"
    token_lifetime: "1 hour"
    refresh_strategy: "Automatic"

  api_key_authentication:
    use_case: "Simple system integration"
    key_format: "sk_live_32_character_string"
    rotation_frequency: "Monthly"
    ip_restrictions: "Office networks only"

  mutual_tls:
    use_case: "Banking and government systems"
    certificate_authority: "Company CA"
    certificate_lifetime: "1 year"
    revocation_check: "OCSP"

  jwt_tokens:
    use_case: "User session tokens"
    signing_algorithm: "RS256"
    token_lifetime: "15 minutes"
    refresh_token_lifetime: "7 days"
```

#### OAuth 2.0 Implementation
```javascript
class OAuth2Client {
  constructor(config) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.tokenEndpoint = config.tokenEndpoint;
    this.scopes = config.scopes || [];
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry > Date.now()) {
      return this.accessToken;
    }

    const tokenResponse = await this.requestAccessToken();
    this.accessToken = tokenResponse.access_token;
    this.tokenExpiry = Date.now() + (tokenResponse.expires_in * 1000) - 30000; // 30s buffer

    return this.accessToken;
  }

  async requestAccessToken() {
    const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

    const response = await fetch(this.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: this.scopes.join(' ')
      })
    });

    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status}`);
    }

    return response.json();
  }

  async makeAuthenticatedRequest(url, options = {}) {
    const token = await this.getAccessToken();

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

// Usage Example
const bankingClient = new OAuth2Client({
  clientId: process.env.BANKING_CLIENT_ID,
  clientSecret: process.env.BANKING_CLIENT_SECRET,
  tokenEndpoint: 'https://api.bank.com/oauth/token',
  scopes: ['payments:write', 'accounts:read']
});

const paymentResponse = await bankingClient.makeAuthenticatedRequest(
  'https://api.bank.com/v1/payments',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData)
  }
);
```

### 8.2 Data Security in Transit

#### TLS Configuration
```yaml
tls_settings:
  minimum_version: "TLS 1.2"
  preferred_version: "TLS 1.3"

  cipher_suites:
    - "TLS_AES_256_GCM_SHA384"
    - "TLS_CHACHA20_POLY1305_SHA256"
    - "TLS_AES_128_GCM_SHA256"
    - "ECDHE-RSA-AES256-GCM-SHA384"
    - "ECDHE-RSA-AES128-GCM-SHA256"

  certificate_validation:
    verify_certificate_chain: true
    check_certificate_revocation: true
    validate_hostname: true
    pin_certificates: true # For critical services

  hsts_configuration:
    max_age: "31536000" # 1 year
    include_subdomains: true
    preload: true
```

#### Message Encryption
```javascript
class MessageEncryption {
  constructor(encryptionKey) {
    this.algorithm = 'aes-256-gcm';
    this.key = Buffer.from(encryptionKey, 'hex');
  }

  encrypt(plaintext) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.key, iv);

    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }

  decrypt(encryptedData) {
    const decipher = crypto.createDecipher(
      this.algorithm,
      this.key,
      Buffer.from(encryptedData.iv, 'hex')
    );

    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));

    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}

// Usage for sensitive salary data
const encryption = new MessageEncryption(process.env.ENCRYPTION_KEY);

const salaryData = {
  employeeId: 'EMP001',
  salary: 20000000,
  bankAccount: '1234567890'
};

const encrypted = encryption.encrypt(JSON.stringify(salaryData));
// Send encrypted data to external system

// On receiving end
const decrypted = encryption.decrypt(encrypted);
const originalData = JSON.parse(decrypted);
```

---

## 9. MONITORING & OBSERVABILITY

### 9.1 Integration Monitoring

#### Monitoring Strategy
```yaml
monitoring_levels:
  infrastructure:
    metrics:
      - cpu_usage
      - memory_usage
      - disk_space
      - network_latency
    alerts:
      - high_cpu: "> 80% for 5 minutes"
      - low_memory: "< 20% available"
      - disk_full: "> 90% usage"

  application:
    metrics:
      - request_rate
      - response_time
      - error_rate
      - throughput
    alerts:
      - high_error_rate: "> 5% for 2 minutes"
      - slow_response: "> 2 seconds average"
      - integration_failure: "Circuit breaker open"

  business:
    metrics:
      - payroll_processing_time
      - payment_success_rate
      - data_sync_accuracy
      - compliance_status
    alerts:
      - payroll_delay: "Processing > 4 hours"
      - payment_failure: "Failed payment > 1%"
      - sync_failure: "Data sync failed"
```

#### Distributed Tracing
```javascript
const opentelemetry = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

class IntegrationTracer {
  constructor() {
    this.provider = new NodeTracerProvider();
    this.tracer = this.provider.getTracer('payroll-integration');

    // Configure Jaeger exporter
    const exporter = new JaegerExporter({
      endpoint: process.env.JAEGER_ENDPOINT,
      serviceName: 'payroll-integration-service'
    });

    this.provider.addSpanProcessor(
      new BatchSpanProcessor(exporter)
    );
  }

  async traceIntegrationFlow(operationName, operation, context = {}) {
    const span = this.tracer.startSpan(operationName, {
      attributes: {
        'integration.type': context.integrationType,
        'integration.target': context.targetSystem,
        'employee.count': context.employeeCount
      }
    });

    try {
      const result = await opentelemetry.context.with(
        opentelemetry.trace.setSpan(opentelemetry.context.active(), span),
        operation
      );

      span.setStatus({ code: opentelemetry.SpanStatusCode.OK });
      span.setAttributes({
        'operation.success': true,
        'result.recordCount': result.recordCount || 0
      });

      return result;
    } catch (error) {
      span.setStatus({
        code: opentelemetry.SpanStatusCode.ERROR,
        message: error.message
      });

      span.setAttributes({
        'operation.success': false,
        'error.message': error.message,
        'error.stack': error.stack
      });

      throw error;
    } finally {
      span.end();
    }
  }

  createChildSpan(name, attributes = {}) {
    return this.tracer.startSpan(name, { attributes });
  }
}

// Usage Example
const tracer = new IntegrationTracer();

await tracer.traceIntegrationFlow(
  'payroll.banking.payment',
  async () => {
    const childSpan = tracer.createChildSpan('validate.payment.data');

    try {
      await validatePaymentData(paymentBatch);
      childSpan.setStatus({ code: opentelemetry.SpanStatusCode.OK });
    } catch (error) {
      childSpan.setStatus({
        code: opentelemetry.SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      childSpan.end();
    }

    return await processPaymentBatch(paymentBatch);
  },
  {
    integrationType: 'banking',
    targetSystem: 'vietcombank',
    employeeCount: paymentBatch.length
  }
);
```

### 9.2 Health Checks

#### Health Check Implementation
```javascript
class HealthChecker {
  constructor() {
    this.checks = new Map();
    this.timeout = 5000; // 5 seconds
  }

  register(name, checkFunction) {
    this.checks.set(name, checkFunction);
  }

  async runHealthChecks() {
    const results = new Map();
    const startTime = Date.now();

    for (const [name, checkFn] of this.checks) {
      try {
        const checkStart = Date.now();
        const result = await Promise.race([
          checkFn(),
          this.timeoutPromise()
        ]);

        results.set(name, {
          status: 'healthy',
          responseTime: Date.now() - checkStart,
          details: result
        });
      } catch (error) {
        results.set(name, {
          status: 'unhealthy',
          error: error.message,
          responseTime: Date.now() - checkStart
        });
      }
    }

    const overall = this.calculateOverallHealth(results);

    return {
      status: overall,
      timestamp: new Date().toISOString(),
      totalResponseTime: Date.now() - startTime,
      checks: Object.fromEntries(results)
    };
  }

  timeoutPromise() {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Health check timeout')), this.timeout);
    });
  }

  calculateOverallHealth(results) {
    for (const result of results.values()) {
      if (result.status === 'unhealthy') {
        return 'unhealthy';
      }
    }
    return 'healthy';
  }
}

// Register health checks
const healthChecker = new HealthChecker();

healthChecker.register('database', async () => {
  const result = await db.query('SELECT 1');
  return { connectionPool: db.pool.totalCount };
});

healthChecker.register('attendance_api', async () => {
  const response = await fetch(`${attendanceApiUrl}/health`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return { endpoint: attendanceApiUrl };
});

healthChecker.register('banking_api', async () => {
  const token = await bankingClient.getAccessToken();
  return { tokenValid: !!token };
});

healthChecker.register('message_queue', async () => {
  const stats = await messageQueue.getStats();
  return {
    queueDepth: stats.messageCount,
    consumers: stats.consumerCount
  };
});

// Health check endpoint
app.get('/health', async (req, res) => {
  const health = await healthChecker.runHealthChecks();
  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});
```

---

## 10. TESTING & VALIDATION

### 10.1 Integration Testing Strategy

#### Testing Pyramid
```yaml
testing_levels:
  unit_tests:
    coverage: "> 90%"
    focus: "Individual functions and classes"
    tools: ["Jest", "Mocha"]

  integration_tests:
    coverage: "> 80%"
    focus: "API integrations and data flow"
    tools: ["Supertest", "Newman"]

  contract_tests:
    coverage: "All external APIs"
    focus: "API contract compliance"
    tools: ["Pact", "Spring Cloud Contract"]

  end_to_end_tests:
    coverage: "Critical business flows"
    focus: "Complete integration scenarios"
    tools: ["Cypress", "Playwright"]
```

#### Contract Testing
```javascript
// Pact Consumer Test
const { Pact } = require('@pact-foundation/pact');
const { AttendanceAPI } = require('../src/attendance-api');

describe('Attendance API Contract', () => {
  const provider = new Pact({
    consumer: 'PayrollService',
    provider: 'AttendanceService',
    port: 1234,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'INFO'
  });

  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  describe('Get Daily Attendance', () => {
    beforeEach(() => {
      const interaction = {
        state: 'employee exists with attendance data',
        uponReceiving: 'a request for daily attendance',
        withRequest: {
          method: 'GET',
          path: '/api/v1/attendance/daily',
          query: {
            date: '2024-10-01',
            employeeId: 'EMP001'
          },
          headers: {
            Authorization: Pact.like('Bearer token123')
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            employeeId: 'EMP001',
            date: '2024-10-01',
            clockIn: '08:00:00',
            clockOut: '17:00:00',
            breakDuration: 60,
            workHours: 8,
            overtimeHours: 0,
            status: 'PRESENT'
          }
        }
      };

      return provider.addInteraction(interaction);
    });

    it('should get attendance data for employee', async () => {
      const api = new AttendanceAPI('http://localhost:1234');
      const result = await api.getDailyAttendance('EMP001', '2024-10-01');

      expect(result.employeeId).toBe('EMP001');
      expect(result.workHours).toBe(8);
      expect(result.status).toBe('PRESENT');
    });
  });
});

// Pact Provider Verification
const { Verifier } = require('@pact-foundation/pact');

describe('Attendance Service Provider', () => {
  it('should validate the expectations of PayrollService', () => {
    const opts = {
      provider: 'AttendanceService',
      providerBaseUrl: 'http://localhost:3000',
      pactUrls: [
        path.resolve(process.cwd(), 'pacts/payrollservice-attendanceservice.json')
      ],
      providerStatesSetupUrl: 'http://localhost:3000/setup',
      publishVerificationResult: true,
      providerVersion: process.env.GIT_COMMIT
    };

    return new Verifier(opts).verifyProvider();
  });
});
```

### 10.2 Load Testing

#### Performance Test Scenarios
```yaml
load_test_scenarios:
  normal_load:
    concurrent_users: 50
    duration: "30 minutes"
    ramp_up: "5 minutes"
    acceptance_criteria:
      response_time_95th: "< 2 seconds"
      error_rate: "< 1%"
      throughput: "> 100 requests/second"

  peak_load:
    concurrent_users: 200
    duration: "15 minutes"
    ramp_up: "2 minutes"
    acceptance_criteria:
      response_time_95th: "< 5 seconds"
      error_rate: "< 3%"
      throughput: "> 300 requests/second"

  stress_test:
    concurrent_users: 500
    duration: "10 minutes"
    ramp_up: "1 minute"
    acceptance_criteria:
      system_stability: "No crashes"
      graceful_degradation: "Maintained core functionality"
      recovery_time: "< 5 minutes"
```

#### K6 Load Test Scripts
```javascript
// k6 Load Test Script
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '5m', target: 50 },   // Ramp up
    { duration: '30m', target: 50 },  // Stay at 50 users
    { duration: '5m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests under 2s
    http_req_failed: ['rate<0.01'],    // Error rate under 1%
    errors: ['rate<0.01'],
  },
};

export default function () {
  // Test attendance data sync
  const attendanceResponse = http.get('http://api.payroll.local/v1/attendance', {
    headers: {
      Authorization: `Bearer ${__ENV.API_TOKEN}`,
    },
  });

  check(attendanceResponse, {
    'attendance status is 200': (r) => r.status === 200,
    'attendance response time < 2s': (r) => r.timings.duration < 2000,
  }) || errorRate.add(1);

  // Test payroll calculation
  const payrollData = {
    period: '2024-09',
    employeeIds: ['EMP001', 'EMP002', 'EMP003'],
  };

  const payrollResponse = http.post(
    'http://api.payroll.local/v1/payroll/calculate',
    JSON.stringify(payrollData),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${__ENV.API_TOKEN}`,
      },
    }
  );

  check(payrollResponse, {
    'payroll calculation status is 200': (r) => r.status === 200,
    'payroll response time < 5s': (r) => r.timings.duration < 5000,
    'payroll has results': (r) => {
      const data = JSON.parse(r.body);
      return data.results && data.results.length > 0;
    },
  }) || errorRate.add(1);

  sleep(1);
}

export function handleSummary(data) {
  return {
    'load-test-results.json': JSON.stringify(data, null, 2),
    'load-test-summary.html': htmlReport(data),
  };
}
```

---

## PHỤ LỤC

### A. Integration Checklist
```yaml
pre_integration:
  □ API documentation reviewed
  □ Security requirements validated
  □ Network connectivity confirmed
  □ Authentication credentials obtained
  □ Test environment setup
  □ Data mapping completed

during_integration:
  □ Connection established
  □ Authentication working
  □ Data transformation verified
  □ Error handling tested
  □ Performance benchmarked
  □ Security scan completed

post_integration:
  □ End-to-end testing passed
  □ Monitoring configured
  □ Alerts setup
  □ Documentation updated
  □ Team training completed
  □ Rollback plan ready
```

### B. Performance Benchmarks
```yaml
target_metrics:
  attendance_sync:
    batch_size: "10,000 records"
    processing_time: "< 5 minutes"
    success_rate: "> 99.5%"

  payroll_calculation:
    employee_count: "1,000 employees"
    calculation_time: "< 30 minutes"
    accuracy: "100%"

  payment_processing:
    batch_size: "500 payments"
    processing_time: "< 10 minutes"
    success_rate: "> 99.9%"

  reporting:
    data_range: "1 year"
    generation_time: "< 2 minutes"
    file_size: "< 50MB"
```

### C. Troubleshooting Guide
```yaml
common_issues:
  authentication_failures:
    symptoms: ["401 errors", "Invalid token"]
    solutions: ["Check credentials", "Refresh tokens", "Verify scopes"]

  connection_timeouts:
    symptoms: ["ETIMEDOUT", "Connection refused"]
    solutions: ["Check network", "Verify endpoints", "Increase timeouts"]

  data_validation_errors:
    symptoms: ["400 errors", "Validation failed"]
    solutions: ["Check data format", "Verify required fields", "Review constraints"]

  rate_limiting:
    symptoms: ["429 errors", "Too many requests"]
    solutions: ["Implement backoff", "Reduce request rate", "Use batching"]
```

---

**Document Status:** Draft
**Next Review:** 2024-10-09
**Approved By:** [Pending]
**Related Documents:**
- 1_ArchitectureDesign.md
- 4_APIDesign.md
- 6_SecurityDesign.md