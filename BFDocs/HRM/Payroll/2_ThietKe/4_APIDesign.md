# API DESIGN SPECIFICATION
## Hệ thống Quản lý Lương - Payroll Management System

**Version:** 1.0
**Date:** 2024-10-02
**Status:** Draft
**Author:** API Design Team

---

## MỤC LỤC
1. [Giới thiệu](#1-giới-thiệu)
2. [API Architecture](#2-api-architecture)
3. [Authentication & Authorization](#3-authentication--authorization)
4. [RESTful API Endpoints](#4-restful-api-endpoints)
5. [Data Models](#5-data-models)
6. [Error Handling](#6-error-handling)
7. [Rate Limiting & Throttling](#7-rate-limiting--throttling)
8. [API Versioning](#8-api-versioning)
9. [Integration Patterns](#9-integration-patterns)
10. [Testing & Validation](#10-testing--validation)

---

## 1. GIỚI THIỆU

### 1.1 Mục đích
Tài liệu này định nghĩa các RESTful API cho Hệ thống Quản lý Lương, bao gồm endpoints, schemas, authentication và integration patterns.

### 1.2 Phạm vi
- RESTful API endpoints cho tất cả business functions
- Request/Response schemas
- Authentication và authorization mechanisms
- Error handling và status codes
- API versioning strategy
- Integration với external systems

### 1.3 Stakeholders
- Frontend Developers
- Mobile App Developers
- Integration Partners
- Third-party System Integrators
- QA Engineers

---

## 2. API ARCHITECTURE

### 2.1 Architecture Style
**RESTful API with Django REST Framework** với các nguyên tắc:
- Stateless communication
- Resource-based URLs
- HTTP methods semantic (GET, POST, PUT, PATCH, DELETE)
- JSON data format
- ViewSets and Routers for automatic URL routing
- Serializers for data validation and transformation

### 2.2 Base URL Structure
```
Production: https://api.payroll.company.com/v1
Staging: https://api-staging.payroll.company.com/v1
Development: https://api-dev.payroll.company.com/v1
```

### 2.3 Django API Pattern
```
Client → nginx/Gunicorn → Django Application
                        ↓
                   Django Middleware
                   - Authentication
                   - Rate Limiting
                   - CORS
                   - Logging
                        ↓
                   Django REST Framework
                   - ViewSets
                   - Serializers
                   - Permissions
                        ↓
                   Django ORM → MySQL Database
```

---

## 3. AUTHENTICATION & AUTHORIZATION

### 3.1 Authentication Methods

#### JWT Token Authentication (Django REST Framework SimpleJWT)
```http
POST /api/auth/token/
Content-Type: application/json

{
  "username": "user@company.com",
  "password": "securePassword123"
}

Response 200:
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "access_token_expiry": "2024-10-02T11:30:00Z",
  "refresh_token_expiry": "2024-10-09T10:30:00Z"
}
```

#### Refresh Token
```http
POST /api/auth/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response 200:
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "access_token_expiry": "2024-10-02T12:30:00Z"
}
```

#### Session Authentication (for web interface)
```http
POST /api/auth/login/
Content-Type: application/json

{
  "username": "user@company.com",
  "password": "securePassword123"
}

Response 200:
{
  "user": {
    "id": 1,
    "username": "user@company.com",
    "groups": ["HR_MANAGER"]
  },
  "session_id": "abc123def456"
}

Set-Cookie: sessionid=abc123def456; HttpOnly; Secure; SameSite=Strict
```

### 3.2 Authorization Levels
```json
{
  "roles": {
    "ADMIN": ["*"],
    "HR_MANAGER": [
      "employees:read", "employees:write",
      "payroll:read", "payroll:write",
      "reports:read"
    ],
    "ACCOUNTANT": [
      "payroll:read", "payroll:write",
      "payments:read", "payments:write",
      "reports:read"
    ],
    "MANAGER": [
      "employees:read:department",
      "payroll:read:department",
      "reports:read:department"
    ],
    "EMPLOYEE": [
      "profile:read:own", "payroll:read:own"
    ]
  }
}
```

---

## 4. RESTFUL API ENDPOINTS

### 4.1 Employee Management APIs

#### Get All Employees
```http
GET /api/v1/employees
Authorization: Bearer {token}
Query Parameters:
  - page: int (default: 1)
  - limit: int (default: 20, max: 100)
  - department: string
  - status: string (ACTIVE, INACTIVE, TERMINATED)
  - search: string

Response 200:
{
  "data": [
    {
      "id": "emp_001",
      "employee_code": "EMP001",
      "full_name": "Nguyễn Văn An",
      "email": "an.nguyen@company.com",
      "department": {
        "id": "dept_001",
        "name": "Engineering"
      },
      "position": "Senior Developer",
      "hire_date": "2023-01-15",
      "status": "ACTIVE",
      "salary_info": {
        "basic_salary": 20000000,
        "currency": "VND"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "pages": 8
  }
}
```

#### Create Employee
```http
POST /api/v1/employees
Authorization: Bearer {token}
Content-Type: application/json

{
  "employee_code": "EMP002",
  "full_name": "Trần Thị Bình",
  "email": "binh.tran@company.com",
  "phone": "+84901234567",
  "id_number": "123456789012",
  "department_id": "dept_001",
  "position": "Developer",
  "hire_date": "2024-01-01",
  "contract_type": "FULL_TIME",
  "salary_info": {
    "basic_salary": 18000000,
    "currency": "VND",
    "payment_method": "BANK_TRANSFER"
  },
  "tax_info": {
    "tax_code": "1234567890",
    "dependents": 2
  }
}

Response 201:
{
  "id": "emp_002",
  "employee_code": "EMP002",
  "message": "Employee created successfully"
}
```

### 4.2 Payroll Management APIs

#### Calculate Payroll
```http
POST /api/v1/payroll/calculate
Authorization: Bearer {token}
Content-Type: application/json

{
  "period": "2024-09",
  "employee_ids": ["emp_001", "emp_002"],
  "include_overtime": true,
  "include_bonus": true,
  "calculation_date": "2024-09-30"
}

Response 200:
{
  "calculation_id": "calc_202409_001",
  "status": "COMPLETED",
  "results": [
    {
      "employee_id": "emp_001",
      "period": "2024-09",
      "gross_salary": 22000000,
      "allowances": {
        "transportation": 500000,
        "meal": 800000,
        "overtime": 1200000
      },
      "deductions": {
        "social_insurance": 1760000,
        "health_insurance": 440000,
        "unemployment_insurance": 220000,
        "personal_income_tax": 1890000,
        "union_fee": 22000
      },
      "net_salary": 19268000,
      "currency": "VND"
    }
  ]
}
```

#### Get Payroll History
```http
GET /api/v1/payroll/history/{employee_id}
Authorization: Bearer {token}
Query Parameters:
  - from_date: date
  - to_date: date
  - page: int
  - limit: int

Response 200:
{
  "employee_id": "emp_001",
  "data": [
    {
      "id": "payroll_202409_001",
      "period": "2024-09",
      "gross_salary": 22000000,
      "net_salary": 19268000,
      "payment_date": "2024-10-01",
      "status": "PAID",
      "payment_method": "BANK_TRANSFER"
    }
  ]
}
```

### 4.3 Tax Calculation APIs

#### Calculate Personal Income Tax
```http
POST /api/v1/tax/calculate/personal-income
Authorization: Bearer {token}
Content-Type: application/json

{
  "employee_id": "emp_001",
  "period": "2024-09",
  "gross_income": 22000000,
  "insurance_deductions": 2420000,
  "dependents": 2,
  "other_deductions": 0
}

Response 200:
{
  "employee_id": "emp_001",
  "period": "2024-09",
  "calculation": {
    "gross_income": 22000000,
    "insurance_deductions": 2420000,
    "personal_deduction": 11000000,
    "dependent_deductions": 8800000,
    "taxable_income": 0,
    "tax_amount": 0,
    "tax_brackets": []
  }
}
```

### 4.4 Report APIs

#### Generate Payroll Report
```http
POST /api/v1/reports/payroll
Authorization: Bearer {token}
Content-Type: application/json

{
  "report_type": "MONTHLY_SUMMARY",
  "period": "2024-09",
  "department_ids": ["dept_001", "dept_002"],
  "format": "PDF",
  "email_recipients": ["hr@company.com"]
}

Response 202:
{
  "report_id": "rpt_202409_001",
  "status": "PROCESSING",
  "estimated_completion": "2024-10-02T10:30:00Z"
}
```

---

## 5. DATA MODELS

### 5.1 Core Data Transfer Objects

#### Employee DTO
```json
{
  "id": "string",
  "employee_code": "string",
  "full_name": "string",
  "email": "string",
  "phone": "string",
  "id_number": "string",
  "department": {
    "id": "string",
    "name": "string",
    "code": "string"
  },
  "position": "string",
  "hire_date": "date",
  "contract_type": "enum[FULL_TIME, PART_TIME, CONTRACT]",
  "status": "enum[ACTIVE, INACTIVE, TERMINATED]",
  "salary_info": {
    "basic_salary": "number",
    "currency": "string",
    "payment_method": "enum[BANK_TRANSFER, CASH, CHECK]"
  },
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

#### Payroll DTO
```json
{
  "id": "string",
  "employee_id": "string",
  "period": "string",
  "calculation_date": "date",
  "gross_salary": "number",
  "allowances": {
    "transportation": "number",
    "meal": "number",
    "housing": "number",
    "phone": "number",
    "overtime": "number",
    "bonus": "number"
  },
  "deductions": {
    "social_insurance": "number",
    "health_insurance": "number",
    "unemployment_insurance": "number",
    "personal_income_tax": "number",
    "union_fee": "number",
    "advance_payment": "number"
  },
  "net_salary": "number",
  "currency": "string",
  "status": "enum[DRAFT, CALCULATED, APPROVED, PAID]",
  "payment_date": "date",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### 5.2 Request/Response Schemas

#### Standard API Response
```json
{
  "success": "boolean",
  "data": "object|array",
  "message": "string",
  "errors": "array",
  "metadata": {
    "timestamp": "datetime",
    "request_id": "string",
    "api_version": "string"
  }
}
```

#### Pagination Schema
```json
{
  "page": "number",
  "limit": "number",
  "total": "number",
  "pages": "number",
  "has_next": "boolean",
  "has_prev": "boolean"
}
```

---

## 6. ERROR HANDLING

### 6.1 HTTP Status Codes
```
200 OK - Successful request
201 Created - Resource created successfully
204 No Content - Successful request with no content
400 Bad Request - Invalid request parameters
401 Unauthorized - Authentication required
403 Forbidden - Insufficient permissions
404 Not Found - Resource not found
409 Conflict - Resource conflict
422 Unprocessable Entity - Validation errors
429 Too Many Requests - Rate limit exceeded
500 Internal Server Error - Server error
502 Bad Gateway - Upstream server error
503 Service Unavailable - Service temporarily unavailable
```

### 6.2 Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed for the request",
    "details": [
      {
        "field": "email",
        "message": "Email format is invalid",
        "code": "INVALID_FORMAT"
      }
    ],
    "request_id": "req_abc123def456",
    "timestamp": "2024-10-02T10:30:00Z"
  }
}
```

### 6.3 Common Error Codes
```
AUTH_INVALID_TOKEN - Invalid or expired token
AUTH_INSUFFICIENT_PERMISSIONS - Insufficient permissions
VALIDATION_ERROR - Request validation failed
RESOURCE_NOT_FOUND - Requested resource not found
RESOURCE_CONFLICT - Resource already exists
BUSINESS_RULE_VIOLATION - Business rule violation
RATE_LIMIT_EXCEEDED - API rate limit exceeded
EXTERNAL_SERVICE_ERROR - External service error
```

---

## 7. RATE LIMITING & THROTTLING

### 7.1 Rate Limiting with Django (django-ratelimit)

**Installation:**
```python
# settings.py
INSTALLED_APPS = [
    ...
    'django_ratelimit',
]

# Rate limit configuration
RATELIMIT_ENABLE = True
RATELIMIT_USE_CACHE = 'default'
```

**Implementation:**
```python
from django_ratelimit.decorators import ratelimit
from rest_framework.decorators import api_view

# View-level rate limiting
@ratelimit(key='user', rate='500/h', method='ALL')
@api_view(['GET'])
def employee_list(request):
    # Implementation
    pass

# Login endpoint with stricter limits
@ratelimit(key='ip', rate='10/m', method='POST')
@api_view(['POST'])
def login(request):
    # Implementation
    pass

# Class-based view rate limiting
from rest_framework import viewsets
from django.utils.decorators import method_decorator

@method_decorator(ratelimit(key='user', rate='100/h'), name='list')
@method_decorator(ratelimit(key='user', rate='50/h'), name='create')
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
```

### 7.2 Rate Limit Response
```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 3600

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "retry_after": 3600
  }
}
```

---

## 8. API VERSIONING

### 8.1 Versioning Strategy with Django

**URI Versioning (Recommended):**
```python
# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Version 1
router_v1 = DefaultRouter()
router_v1.register(r'employees', EmployeeViewSetV1)
router_v1.register(r'payroll', PayrollViewSetV1)

# Version 2
router_v2 = DefaultRouter()
router_v2.register(r'employees', EmployeeViewSetV2)
router_v2.register(r'payroll', PayrollViewSetV2)

urlpatterns = [
    path('api/v1/', include(router_v1.urls)),
    path('api/v2/', include(router_v2.urls)),
]
```

**Header Versioning (Alternative):**
```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.AcceptHeaderVersioning',
    'DEFAULT_VERSION': 'v1',
    'ALLOWED_VERSIONS': ['v1', 'v2'],
}

# Usage in views
class EmployeeViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.request.version == 'v2':
            return EmployeeSerializerV2
        return EmployeeSerializerV1
```

### 8.2 Version Lifecycle
```
v1 (Current) - Full support, active development
v2 (Beta) - Testing phase, limited production use
```

---

## 9. INTEGRATION PATTERNS

### 9.1 Webhook Integration
```http
POST /api/v1/webhooks
Content-Type: application/json

{
  "url": "https://partner.com/payroll-webhook",
  "events": ["payroll.calculated", "employee.created"],
  "secret": "webhook_secret_key",
  "active": true
}
```

### 9.2 Bulk Operations
```http
POST /api/v1/employees/bulk
Content-Type: application/json

{
  "operation": "CREATE",
  "data": [
    {
      "employee_code": "EMP003",
      "full_name": "Lê Văn Cường",
      ...
    }
  ]
}

Response 202:
{
  "batch_id": "batch_001",
  "status": "PROCESSING",
  "total_records": 100,
  "processed": 0,
  "failed": 0
}
```

### 9.3 File Upload APIs
```http
POST /api/v1/employees/import
Content-Type: multipart/form-data
Authorization: Bearer {token}

file: employees.xlsx
format: EXCEL
mapping: {
  "A": "employee_code",
  "B": "full_name",
  "C": "email"
}

Response 202:
{
  "import_id": "import_001",
  "status": "PROCESSING",
  "file_size": 1024000,
  "estimated_records": 500
}
```

---

## 10. TESTING & VALIDATION

### 10.1 API Testing Strategy
- **Unit Tests**: Individual endpoint testing
- **Integration Tests**: End-to-end API flows
- **Contract Tests**: API contract validation
- **Performance Tests**: Load and stress testing
- **Security Tests**: Authentication and authorization

### 10.2 Validation Rules

#### Request Validation
```json
{
  "employee": {
    "employee_code": {
      "required": true,
      "pattern": "^EMP[0-9]{3,6}$",
      "unique": true
    },
    "email": {
      "required": true,
      "format": "email",
      "unique": true
    },
    "basic_salary": {
      "required": true,
      "type": "number",
      "minimum": 0,
      "maximum": 1000000000
    }
  }
}
```

### 10.3 API Documentation
- **OpenAPI 3.0 Specification**
- **Interactive API Explorer** (Swagger UI)
- **Postman Collections**
- **SDK Documentation** (multiple languages)

### 10.4 Monitoring & Analytics
```yaml
monitoring:
  metrics:
    - api_requests_total
    - api_request_duration
    - api_errors_total
    - api_rate_limit_hits

  alerts:
    - error_rate > 5%
    - response_time > 2s
    - rate_limit_exceeded

  dashboards:
    - API Performance
    - Error Rates
    - Usage Analytics
```

---

## PHỤ LỤC

### A. API Security Checklist
- [ ] HTTPS only communication
- [ ] JWT token expiration
- [ ] Input validation and sanitization
- [ ] SQL injection prevention
- [ ] CORS configuration
- [ ] Rate limiting implementation
- [ ] Audit logging enabled

### B. Performance Benchmarks
```
Target Metrics:
- Response Time: < 200ms (95th percentile)
- Throughput: > 1000 requests/second
- Availability: 99.9% uptime
- Error Rate: < 0.1%
```

### C. Integration Examples
Detailed code examples for common integration scenarios với banking systems, attendance systems, và government reporting APIs.

---

**Document Status:** Draft
**Next Review:** 2024-10-09
**Approved By:** [Pending]
**Related Documents:**
- 1_ArchitectureDesign.md
- 3_DatabaseDesign.md
- 6_SecurityDesign.md