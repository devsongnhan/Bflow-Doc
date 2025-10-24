# Orchestrator Server IP Configuration

## Current IP Address
```
ORCHESTRATOR_IP=192.168.0.225
ORCHESTRATOR_PORT=3000
```

## Instructions
- Update `ORCHESTRATOR_IP` when server IP changes
- Agents will automatically connect to this IP
- No need to restart agents - they query this dynamically
- Format: Must be a valid IPv4 address or hostname

## Examples
```
# Local machine
ORCHESTRATOR_IP=127.0.0.1

# Network IP
ORCHESTRATOR_IP=192.168.1.100

# Hostname (if DNS available)
ORCHESTRATOR_IP=orchestrator-server.local
```

---

**Last Updated:** 2025-10-23
