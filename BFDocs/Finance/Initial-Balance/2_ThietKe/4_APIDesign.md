# API Design: RESTful API Specifications

**Created:** 2024-10-29
**Status:** Draft - Ready for Review
**Version:** 1.0

---

## 1. API Overview

### 1.1 API Base Information

```
Base URL: https://api.company.com/api/v1
Protocol: HTTPS/TLS 1.3
Format: JSON
Version: v1
Authentication: JWT Bearer Token
Content-Type: application/json; charset=utf-8
```

### 1.2 API Versioning

```
URL Path Version: /api/v1/ vs /api/v2/
- Changes to major structure → new version
- Add optional fields → same version
- Remove required fields → new version
Deprecation: 6 months notice before removal
```

---

## 2. Authentication & Authorization

### 2.1 JWT Token

```
Header: Authorization: Bearer <token>

JWT Structure:
{
  "sub": "user-id",
  "name": "John Doe",
  "email": "john@company.com",
  "role": "ACCOUNTANT",
  "company_ids": [1, 2],
  "exp": 1635000000,
  "iat": 1634913600
}

Token Duration: 1 hour
Refresh Token: 24 hours
```

### 2.2 Permission Levels

```
Permissions:
- openingbalance:create → Create entry
- openingbalance:read → View entry
- openingbalance:edit → Edit entry
- openingbalance:delete → Delete entry
- openingbalance:import → Import bulk data
- openingbalance:approve → Approve entry
- openingbalance:confirm → Confirm & finalize
- openingbalance:audit → View audit logs
```

---

## 3. API Endpoints

### 3.1 Create Opening Balance Entry

```http
POST /api/v1/opening-balance
Content-Type: application/json
Authorization: Bearer <token>

Request Body:
{
  "companyId": 1,
  "periodId": "202401",
  "lines": [
    {
      "accountId": 111,
      "amount": 100000000,
      "debitCredit": "D",
      "description": "Tiền mặt ban đầu"
    },
    {
      "accountId": 112,
      "amount": 200000000,
      "debitCredit": "D",
      "description": "Tiền gởi NH"
    }
  ],
  "remarks": "Opening balance for FY 2024"
}

Response (201 Created):
{
  "data": {
    "obEntryId": "550e8400-e29b-41d4-a716-446655440000",
    "status": "DRAFT",
    "totalDebit": 300000000,
    "totalCredit": 0,
    "isBalanced": false,
    "createdDateTime": "2024-10-29T10:30:00Z"
  },
  "message": "Opening balance entry created successfully"
}

Error Response (400 Bad Request):
{
  "error": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": [
    {
      "field": "lines[0].accountId",
      "message": "Account 999 does not exist"
    },
    {
      "field": "periodId",
      "message": "Period 202401 is closed"
    }
  ]
}
```

### 3.2 Get Opening Balance Entry

```http
GET /api/v1/opening-balance/{id}
Authorization: Bearer <token>

Response (200 OK):
{
  "data": {
    "obEntryId": "550e8400-e29b-41d4-a716-446655440000",
    "companyId": 1,
    "companyName": "ABC Company",
    "periodId": "202401",
    "status": "DRAFT",
    "totalDebit": 500000000,
    "totalCredit": 500000000,
    "isBalanced": true,
    "createdBy": {
      "userId": 101,
      "name": "John Doe",
      "email": "john@company.com"
    },
    "createdDateTime": "2024-10-29T10:30:00Z",
    "lines": [
      {
        "obLineId": "660e8400-e29b-41d4-a716-446655440001",
        "accountId": 111,
        "accountCode": "111",
        "accountName": "Tiền mặt",
        "amount": 100000000,
        "debitCredit": "D"
      },
      ... (more lines)
    ],
    "auditLog": [
      {
        "timestamp": "2024-10-29T10:30:00Z",
        "action": "CREATE",
        "user": "John Doe",
        "description": "Created opening balance entry"
      }
    ]
  }
}

Error Response (404 Not Found):
{
  "error": "NOT_FOUND",
  "message": "Opening balance entry not found"
}
```

### 3.3 List Opening Balance Entries

```http
GET /api/v1/opening-balance?
  companyId=1
  &status=DRAFT
  &pageNumber=1
  &pageSize=10
  &sortBy=createdDateTime
  &sortOrder=DESC

Authorization: Bearer <token>

Response (200 OK):
{
  "data": [
    {
      "obEntryId": "550e8400-e29b-41d4-a716-446655440000",
      "companyId": 1,
      "companyName": "ABC Company",
      "periodId": "202401",
      "status": "DRAFT",
      "totalDebit": 500000000,
      "totalCredit": 500000000,
      "isBalanced": true,
      "createdBy": "John Doe",
      "createdDateTime": "2024-10-29T10:30:00Z"
    }
  ],
  "pagination": {
    "pageNumber": 1,
    "pageSize": 10,
    "totalRecords": 5,
    "totalPages": 1
  }
}
```

### 3.4 Update Opening Balance Entry

```http
PATCH /api/v1/opening-balance/{id}
Authorization: Bearer <token>

Request Body:
{
  "lines": [
    {
      "obLineId": "660e8400-e29b-41d4-a716-446655440001",
      "amount": 120000000  // Updated amount
    }
  ],
  "remarks": "Updated opening balance"
}

Response (200 OK):
{
  "data": {
    "obEntryId": "550e8400-e29b-41d4-a716-446655440000",
    "status": "DRAFT",
    "totalDebit": 520000000,
    "totalCredit": 500000000,
    "isBalanced": false,
    "message": "Opening balance entry updated successfully"
  }
}

Error Response (409 Conflict):
{
  "error": "STATUS_CONFLICT",
  "message": "Cannot edit entry in CONFIRMED status"
}
```

### 3.5 Delete Opening Balance Entry

```http
DELETE /api/v1/opening-balance/{id}
Authorization: Bearer <token>

Response (200 OK):
{
  "message": "Opening balance entry deleted successfully"
}

Error (405 Method Not Allowed):
{
  "error": "METHOD_NOT_ALLOWED",
  "message": "Cannot delete entry in APPROVED status"
}
```

### 3.6 Submit for Approval

```http
POST /api/v1/opening-balance/{id}/submit
Authorization: Bearer <token>

Response (200 OK):
{
  "data": {
    "obEntryId": "550e8400-e29b-41d4-a716-446655440000",
    "status": "PENDING",
    "message": "Opening balance entry submitted for approval"
  }
}
```

### 3.7 Approve Entry (Manager)

```http
POST /api/v1/opening-balance/{id}/approve
Authorization: Bearer <token>

Request Body:
{
  "comment": "Approved - data looks correct"
}

Response (200 OK):
{
  "data": {
    "obEntryId": "550e8400-e29b-41d4-a716-446655440000",
    "status": "APPROVED",
    "approvedBy": "Mary Smith",
    "approvedDateTime": "2024-10-29T14:00:00Z"
  }
}
```

### 3.8 Reject Entry (Manager)

```http
POST /api/v1/opening-balance/{id}/reject
Authorization: Bearer <token>

Request Body:
{
  "reason": "Please verify TK 111 amount"
}

Response (200 OK):
{
  "data": {
    "obEntryId": "550e8400-e29b-41d4-a716-446655440000",
    "status": "DRAFT",
    "message": "Opening balance entry rejected"
  }
}
```

### 3.9 Confirm & Finalize

```http
POST /api/v1/opening-balance/{id}/confirm
Authorization: Bearer <token>

Request Body:
{
  "confirmationText": "CONFIRM"  // Double-check
}

Response (200 OK):
{
  "data": {
    "obEntryId": "550e8400-e29b-41d4-a716-446655440000",
    "status": "CONFIRMED",
    "confirmedBy": "John Doe",
    "confirmedDateTime": "2024-10-29T15:30:00Z",
    "message": "Opening balance entry confirmed and finalized"
  }
}

Error (422 Unprocessable Entity):
{
  "error": "VALIDATION_ERROR",
  "message": "Cannot confirm - entry not balanced"
}
```

### 3.10 Bulk Import

```http
POST /api/v1/opening-balance/import
Content-Type: multipart/form-data
Authorization: Bearer <token>

Form Data:
- file: <Excel/CSV file>
- companyId: 1
- periodId: 202401

Response (202 Accepted):
{
  "data": {
    "importId": "770e8400-e29b-41d4-a716-446655440000",
    "status": "PROCESSING",
    "message": "File import started"
  }
}

Callback (via webhook):
{
  "importId": "770e8400-e29b-41d4-a716-446655440000",
  "status": "COMPLETED",
  "totalRows": 7,
  "successCount": 7,
  "errorCount": 0,
  "obEntryId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 3.11 Get Audit Log

```http
GET /api/v1/opening-balance/{id}/audit-log
Authorization: Bearer <token>

Response (200 OK):
{
  "data": [
    {
      "timestamp": "2024-10-29T10:30:00Z",
      "action": "CREATE",
      "user": "John Doe",
      "description": "Created opening balance entry",
      "changes": null
    },
    {
      "timestamp": "2024-10-29T10:45:00Z",
      "action": "EDIT",
      "user": "John Doe",
      "description": "Updated TK 111 amount",
      "changes": {
        "amount": { "old": 100000000, "new": 120000000 }
      }
    }
  ]
}
```

---

## 4. Error Handling

### 4.1 HTTP Status Codes

```
200 OK             - Successful GET/PATCH/POST
201 Created        - Successful POST (created new resource)
202 Accepted       - Request accepted, processing async
204 No Content     - Successful DELETE
400 Bad Request    - Invalid request format
401 Unauthorized   - Missing/invalid token
403 Forbidden      - No permission
404 Not Found      - Resource not found
409 Conflict       - Status conflict, invalid operation
422 Unprocessable  - Validation error
429 Too Many Req   - Rate limit exceeded
500 Server Error   - Internal server error
503 Unavailable    - Service unavailable
```

### 4.2 Error Response Format

```json
{
  "error": "ERROR_CODE",
  "message": "Human readable message",
  "details": [
    {
      "field": "lines[0].amount",
      "code": "INVALID_VALUE",
      "message": "Amount must be > 0"
    }
  ],
  "traceId": "0HN1GKPD77QA7:00000001",  // For support
  "timestamp": "2024-10-29T10:30:00Z"
}
```

---

## 5. Request/Response Validation

### 5.1 Input Validation Rules

```
- companyId: Required, must exist
- periodId: Required, format YYYYMM, must exist
- lines: Required, min 1 item
  - accountId: Required, must exist & ACTIVE
  - amount: Required, > 0, decimal(18,2)
  - debitCredit: Required, 'D' or 'C'
  - description: Optional, max 500 chars

Total Debit must = Total Credit
```

### 5.2 Response Headers

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
X-Request-Id: 0HN1GKPD77QA7:00000001
X-Response-Time: 245ms
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1635000000
ETag: "W/\"123abc\""
Cache-Control: max-age=300
```

---

## 6. Rate Limiting

### 6.1 Rate Limit Policy

```
Limit: 1000 requests per hour per user/IP
Burst: 100 requests per minute

Calculation:
- Reset: Hourly at top of hour
- Status Code: 429 Too Many Requests
- Retry-After: 3600 seconds (1 hour)

Endpoints with Different Limits:
- POST import: 10 per hour (heavier operation)
- GET list: 10000 per hour (read-heavy)
- POST confirm: 100 per hour (critical operation)
```

---

## 7. Pagination

### 7.1 Pagination Parameters

```
pageNumber: 1-based (default: 1)
pageSize: 10, 25, 50, 100 (default: 10, max: 100)

Response:
{
  "data": [...],
  "pagination": {
    "pageNumber": 1,
    "pageSize": 10,
    "totalRecords": 150,
    "totalPages": 15,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

## 8. Filtering & Sorting

### 8.1 Filtering

```
GET /api/v1/opening-balance?
  companyId=1
  &status=DRAFT,PENDING
  &createdAfter=2024-10-01
  &createdBefore=2024-10-31
  &search=ABC

Operators:
- Equal: status=DRAFT
- In: status=DRAFT,PENDING
- Greater: amount>100000
- Less: amount<1000000
- Range: createdAfter=2024-10-01&createdBefore=2024-10-31
```

### 8.2 Sorting

```
GET /api/v1/opening-balance?sortBy=createdDateTime&sortOrder=DESC

Allowed Fields:
- createdDateTime
- status
- totalDebit
- totalCredit
- companyId
- periodId

Sort Order: ASC | DESC (default: DESC)
```

---

## 9. Webhooks (Optional - For Notifications)

### 9.1 Webhook Events

```
Events:
- opening_balance.created
- opening_balance.submitted
- opening_balance.approved
- opening_balance.rejected
- opening_balance.confirmed
- opening_balance.import_completed

Registration:
POST /api/v1/webhooks
{
  "event": "opening_balance.confirmed",
  "url": "https://yourapp.com/webhooks/ob",
  "secret": "webhook-secret-key"
}

Delivery:
POST https://yourapp.com/webhooks/ob
X-Webhook-Signature: sha256=...
{
  "event": "opening_balance.confirmed",
  "data": { ... },
  "timestamp": "2024-10-29T15:30:00Z"
}

Retry Policy:
- Retry 5 times
- Exponential backoff: 1s, 2s, 4s, 8s, 16s
- 24 hour retention
```

---

## 10. API Documentation

### 10.1 Swagger/OpenAPI

```
Documentation URL: https://api.company.com/api/v1/swagger
Format: OpenAPI 3.0.0
Interactive: Yes (try-it-out)
Authentication: Included in UI

Export:
- OpenAPI JSON: /api/v1/swagger.json
- OpenAPI YAML: /api/v1/swagger.yaml
- Postman Collection: /api/v1/postman.json
```

---

## 11. Performance & Optimization

### 11.1 Caching

```
Cache-Control Headers:
- List endpoints: max-age=300 (5 minutes)
- Detail endpoints: max-age=60 (1 minute)
- Data may stale during approval flow
- Use ETag for conditional requests
```

### 11.2 Response Compression

```
Accept-Encoding: gzip, deflate
Content-Encoding: gzip (for responses > 1KB)
Compression: ~70% reduction for JSON
```

---

## 12. API Versioning Strategy

### 12.1 Versioning Approach

```
URL Path Version: /api/v1/, /api/v2/

Deprecation Timeline:
v1:
- Current version
- Full support
- No breaking changes

v0.9 (Legacy):
- Deprecated (6 months)
- Sunset date: 2024-12-31
- No new features
- Redirect to v1
```

---

## 13. Security Best Practices

### 13.1 Security Headers

```
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: no-referrer
```

### 13.2 CORS Policy

```
Access-Control-Allow-Origin: https://trusted-domain.com
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 3600
Access-Control-Allow-Credentials: true
```

---

## 14. Conclusion

**API Design provides:**
- ✅ RESTful endpoint specification
- ✅ Clear request/response formats
- ✅ Error handling strategy
- ✅ Authentication & authorization
- ✅ Rate limiting & pagination
- ✅ Performance optimization
- ✅ Security best practices
- ✅ API documentation

**Ready for Frontend Development.**

---

**Document Status:** Draft - Ready for Review
**Last Updated:** 2024-10-29
**Next Step:** Create 5_UIUXDesign.md (UI/UX Detailed Design)
