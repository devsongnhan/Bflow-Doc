# Roles Directory - V6.0

## 📋 Purpose

This directory contains **Role Definitions** for the Orchestrator V6.0 multi-agent system.

## 🎭 What is a Role?

A **Role** defines:
- Responsibilities and capabilities
- Permissions (what can/cannot do)
- Context and guidelines for agents with this role
- Helper tools/templates

## 📁 Structure

```
roles/
├── ba/
│   ├── BA_ROLE_CONTEXT.md          # Role definition and guidelines
│   └── ba-helper-v6.0.js           # Shared helper template (no hard-coded keys)
├── dev/
│   ├── DEV_ROLE_CONTEXT.md
│   └── dev-helper-v6.0.js
├── pm/
│   ├── PM_ROLE_CONTEXT.md
│   └── pm-helper-v6.0.js
├── qa/
│   ├── QA_ROLE_CONTEXT.md
│   └── qa-helper-v6.0.js
└── orchestrator/
    └── ORCHESTRATOR_ROLE_CONTEXT.md
```

## 🔄 Roles vs Agents

**V6.0 Separation:**

| Concept | Location | Purpose |
|---------|----------|---------|
| **Role** | `orchestrator/roles/` | Template: What agents with this role can do |
| **Agent** | `agents/{username}/` | Instance: Specific person with their roles and API key |

**Example:**

```
Role: Developer (roles/dev/)
  ├─ Defines: "Developers implement code and submit to QA"
  ├─ Permissions: canCreate, canSubmit, cannotTest
  └─ Helper: dev-helper-v6.0.js (shared template)

Agents with Dev role:
  ├─ Hải (agents/hai/) - roles: ["dev"]
  ├─ Phúc (agents/phuc/) - roles: ["dev"]
  └─ Long (agents/long/) - roles: ["dev", "qa"]  # Multi-role
```

## 🔑 Key Principles

1. **Roles are Templates** - Define what can be done
2. **Agents are Instances** - Specific people with API keys
3. **Helpers are Shared** - No hard-coded keys, load from .env
4. **One Agent, Multiple Roles** - Agent can have multiple roles (e.g., PM + BA)

## 📖 Available Roles

### BA (Business Analyst)
- Create design documents and requirements
- Submit documents to PM for review
- View own documents and approved documents

### Dev (Developer)
- Implement business logic
- Submit code to QA for testing
- Create reports for PM
- **CANNOT test own code** - QA only

### QA (Quality Assurance)
- Test all dev submissions
- Run unit tests and integration tests
- Approve or reject code
- View all dev work (from any developer)

### PM (Project Manager)
- Review BA documents
- Create sprints and assign tasks
- Review dev reports
- Monitor all project activity
- **Visibility: Everything**

## 🚀 Usage

### For Claude Agents

When you are assigned a role, read the corresponding `{ROLE}_ROLE_CONTEXT.md` file to understand:
- What you can do
- What you cannot do
- Available tools and commands
- Workflows and best practices

### For Developers Setting Up New Agents

1. Read the role context to understand capabilities
2. Use the helper template from `roles/{role}/{role}-helper-v6.0.js`
3. Create agent instance in `agents/{username}/`
4. Agent loads helper with their own API key via .env file

## 📝 Version History

- **V6.0** - Initial multi-agent system with role-based architecture
- Migrated from V5.2 agent-specific structure to role templates

---

*For agent setup instructions, see `../../agents/README.md`*
