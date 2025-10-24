# V5.2 Agents Archive

**Status**: ⚠️ DEPRECATED - For reference only

## Purpose

This directory contains the V5.2 agent structure for reference purposes.

## What Changed in V6.0

### V5.2 Structure (Deprecated):
```
agents/
├── dev/                # Shared by all devs
│   ├── DEV_AGENT_CONTEXT.md
│   └── dev-helper-v5.2.js (hard-coded key)
├── pm/                 # Shared by all PMs
├── qa/                 # Shared by all QA
└── ba/                 # Shared by all BAs
```

**Problems with V5.2:**
- Shared API keys per role
- Cannot assign task to specific person
- No individual accountability

### V6.0 Structure (Current):
```
agents/
├── hai/               # Individual dev agent
│   ├── .env           # Personal API key
│   └── AGENT_PROFILE.md
├── phuc/              # Individual dev agent
├── osa/               # PM + BA (multi-role)
└── minh/              # QA agent
```

**Improvements in V6.0:**
- ✅ Unique API key per agent
- ✅ Assign tasks to specific person
- ✅ Individual tracking
- ✅ Multi-role support
- ✅ Better security

## Migration Notes

If you need to reference old V5.2 code:
- Context files moved to: `orchestrator/roles/{role}/{ROLE}_ROLE_CONTEXT.md`
- Helpers upgraded to: `orchestrator/roles/{role}/{role}-helper-v6.0.js`

## Do Not Use

These folders are kept for reference only. Do NOT use them in production.

For V6.0 system, use:
- Role templates: `orchestrator/roles/`
- Agent instances: `agents/{username}/`

---

*Archived: 2025-10-21*
*V5.2 → V6.0 Migration*
