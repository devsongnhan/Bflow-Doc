# Systems Project

**Project ID:** `Systems`
**Version:** 1.0.0
**Status:** Active

## Overview

Systems project is a coordinated development effort with distributed team members across different roles. This project demonstrates multi-role agent assignment and collaborative workflows in Orchestrator V6.0.

## Team Members

| Member | Roles | Responsibilities |
|--------|-------|------------------|
| **osa** | PM, BA | Project Management & Business Analysis |
| **hoa** | QA | Quality Assurance & Testing |
| **hai** | Dev | Development & Implementation |

## Project Structure

```
Orchdocs/projects/Systems/
├── README.md           # This file
├── sprints/            # Sprint planning & tracking
├── requirements/       # Requirement documents
├── design/            # Design documents
└── issues/            # Issue tracking
```

## Workflow

This project follows the Orchestrator V6.0 standard workflow:

1. **BA** (osa) creates design documents and requirements
2. **PM** (osa) creates sprints and assigns tasks
3. **Dev** (hai) implements solutions
4. **QA** (hoa) tests implementation
5. Issues are resolved through iteration

## Key Features

- **Multi-role Agent (osa):** Acts as both PM and BA
- **Targeted Assignments:** Tasks assigned to specific agents, not generic roles
- **Self-Testing Prevention:** Dev (hai) cannot test own code even if QA roles are present
- **Visibility Rules:**
  - Dev sees only assigned tasks
  - QA sees all submissions
  - PM sees everything

## Project Configuration

Project is configured in:
```
/orchestrator/shared/project-configs/Systems.json
```

### Team Structure (from config)
```json
{
  "team": {
    "pm": ["osa"],
    "ba": ["osa"],
    "dev": ["hai"],
    "qa": ["hoa"]
  }
}
```

### Agent Assignment (in .env files)
- `/agents/osa/.env` → PROJECT_IDS includes Systems
- `/agents/hai/.env` → PROJECT_IDS includes Systems
- `/agents/hoa/.env` → PROJECT_IDS includes Systems

## Getting Started

1. **For PM (osa):**
   - Create sprints in Orchdocs/projects/Systems/sprints/
   - Assign tasks to dev (hai) and qa (hoa)
   - Monitor progress

2. **For Dev (hai):**
   - View assigned tasks
   - Implement solutions
   - Submit to QA for testing

3. **For QA (hoa):**
   - Review submissions from dev
   - Run tests
   - Approve or reject with feedback

## Dashboard Access

The project is visible in the Dashboard Projects Management modal:
- Shows all 3 team members
- Displays roles for each member
- Shows project statistics

---

*Created: 2025-10-24*
*Last Updated: 2025-10-24*
