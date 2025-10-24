# Agents Directory - V6.0

## 📋 Purpose

This directory contains **Agent Instances** - specific people/team members with their credentials and role assignments.

## 🧑‍💻 What is an Agent?

An **Agent** is a team member who:
- Has a unique username and API key
- Is assigned one or more roles (Dev, QA, PM, BA)
- Works on specific tasks assigned to them
- Authenticates using their personal API key

## 📁 Structure

```
agents/                          # ← Copy entire folder to client machines
├── README.md                    # This file
├── roles/                       # ← Role templates (shared helpers & contexts)
│   ├── README.md
│   ├── dev/
│   │   ├── DEV_ROLE_CONTEXT.md
│   │   └── dev-helper-v6.0.js
│   ├── pm/
│   │   ├── PM_ROLE_CONTEXT.md
│   │   └── pm-helper-v6.0.js
│   ├── qa/
│   │   ├── QA_ROLE_CONTEXT.md
│   │   └── qa-helper-v6.0.js
│   └── ba/
│       ├── BA_ROLE_CONTEXT.md
│       └── ba-helper-v6.0.js
├── hai/                         # Dev agent instance
│   ├── .env                     # API key (not committed)
│   ├── AGENT_PROFILE.md
│   └── README.md
├── phuc/                        # Dev agent instance
│   ├── .env
│   ├── AGENT_PROFILE.md
│   └── README.md
├── osa/                         # PM + BA agent (multi-role)
│   ├── .env
│   ├── AGENT_PROFILE.md
│   └── README.md
├── can/                         # Dev agent instance
│   ├── .env
│   ├── AGENT_PROFILE.md
│   └── README.md
├── quan/                        # Dev agent instance
│   ├── .env
│   ├── AGENT_PROFILE.md
│   └── README.md
├── viet/                        # Dev agent instance
│   ├── .env
│   ├── AGENT_PROFILE.md
│   └── README.md
├── hoa/                         # QA agent instance
│   ├── .env
│   ├── AGENT_PROFILE.md
│   └── README.md
├── han/                         # BA agent instance
│   ├── .env
│   ├── AGENT_PROFILE.md
│   └── README.md
└── v5.2-archive/                # V5.2 deprecated (for reference only)
    └── ba/, dev/, pm/, qa/, orchestrator/
```

## 🆚 V6.0 vs V5.2

### V5.2 (Old Structure):
```
agents/
├── dev/                # Shared by all devs
│   ├── DEV_AGENT_CONTEXT.md
│   ├── dev-helper-v5.2.js (hard-coded key)
│   └── config.json
```

**Problems:**
- All devs shared same API key
- Cannot assign task to specific person
- No individual tracking

### V6.0 (New Structure):
```
agents/                          # ← Copy entire folder to client
├── roles/dev/                   # Role template (shared)
│   ├── DEV_ROLE_CONTEXT.md
│   └── dev-helper-v6.0.js (no hard-coded key)
└── hai/                         # Individual agent
    ├── .env (personal API key)
    └── AGENT_PROFILE.md (roles: ["dev"])
```

**Benefits:**
- Each agent has unique API key
- PM can assign task to specific person
- Individual tracking and accountability

## 🔑 Agent Configuration

Each agent folder contains:

### 1. `.env` file (PRIVATE - not committed)
```bash
# Agent Identity
AGENT_USERNAME=hai
AGENT_DISPLAY_NAME=Hải
AGENT_ROLES=dev
AGENT_PRIMARY_ROLE=dev

# Authentication
API_KEY=hai-dev-key-abc123

# Orchestrator
ORCHESTRATOR_URL=http://localhost:3000
```

### 2. `AGENT_PROFILE.md` (Public - documention)
- Agent basic info
- Assigned roles
- Permissions (aggregated from roles)
- Usage instructions

### 3. `README.md` (Quick start guide)
- How to use helpers
- Common commands
- Examples

## 👥 Current Agents

| Username | Display Name | Roles | Primary Role |
|----------|--------------|-------|--------------|
| `hai` | Hải | `dev` | Dev |
| `phuc` | Phúc | `dev` | Dev |
| `can` | Cần | `dev` | Dev |
| `quan` | Quân | `dev` | Dev |
| `viet` | Việt | `dev` | Dev |
| `osa` | Osa | `pm`, `ba`, `dev`, `qa` | PM |
| `hoa` | Hòa | `qa` | QA |
| `han` | Hân | `ba` | BA |

## 🚀 Usage

### For Team Members (Using as CLI):

```bash
# 1. Navigate to your agent folder
cd agents/hai

# 2. Run helper for your role
node ../roles/dev/dev-helper-v6.0.js

# → Helper auto-loads .env from current directory
# → Shows your assignments
```

### For Claude Agents (Using as module):

```javascript
// In your agent code, set environment first
process.chdir('agents/hai');  // Change to agent directory
// or manually load .env

const devHelper = require('./agents/roles/dev/dev-helper-v6.0.js');

// Get your assignments
const assignments = await devHelper.getMyAssignments();
console.log(`Hải has ${assignments.length} assignments`);
```

### For Multi-Role Agents:

```bash
# Osa has roles: ["pm", "ba"]

# Work as PM
cd agents/osa
export AGENT_ROLE=pm
node ../roles/pm/pm-helper-v6.0.js

# Work as BA
export AGENT_ROLE=ba
node ../roles/ba/ba-helper-v6.0.js
```

## 🔐 Security

### API Keys:
- **Format**: `{username}-{roles}-key-{random}`
- **Example**: `hai-dev-key-abc123`
- **Storage**: `.env` file (added to `.gitignore`)
- **Validation**: Server checks against `config-v6.0.json`

### .gitignore:
```
agents/*/.env
!agents/README.md
!agents/*/AGENT_PROFILE.md
!agents/*/README.md
```

## 📝 Adding New Agent

### Manual Method:

1. Create agent folder:
```bash
mkdir agents/{username}
```

2. Create `.env` file:
```bash
cd agents/{username}
cat > .env << 'EOF'
AGENT_USERNAME={username}
AGENT_DISPLAY_NAME={Display Name}
AGENT_ROLES={role1},{role2}
AGENT_PRIMARY_ROLE={role1}
API_KEY={username}-{roles}-key-{random}
ORCHESTRATOR_URL=http://localhost:3000
EOF
```

3. Create `AGENT_PROFILE.md` and `README.md`

4. Add agent to `orchestrator/shared/config-v6.0.json`

### Using Setup Tool (Coming Soon):

```bash
node orchestrator/tools/create-agent.js --username=hai --roles=dev --display-name="Hải"
# Auto generates API key, creates folder, updates config
```

## 🔄 Migration from V5.2

Old agent folders (`agents/dev/`, `agents/pm/`, etc.) are deprecated but kept for reference.

To migrate:
1. Create new agent folder (e.g., `agents/hai/`)
2. Copy `.env` settings
3. Update code to use new helpers
4. Test with new API key

## 📚 Related Documentation

- **Roles**: See `agents/roles/README.md`
- **Config**: See `orchestrator/shared/config-v6.0.json`
- **Server**: See `orchestrator/shared/orchestrator-server-v6.0.js`

---

**V6.0 Multi-Agent System** - Individual agents with role-based capabilities
