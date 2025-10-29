# Orchestrator Server IP Configuration

## Primary Connection (Local Network)
```
ORCHESTRATOR_IP=192.168.0.225
ORCHESTRATOR_PORT=3000
ORCHESTRATOR_URL=http://192.168.0.225:3000
```

## Remote Access (Ngrok Tunnel)
```
NGROK_URL=https://gale-subesophageal-jayne.ngrok-free.dev
NGROK_ENABLED=true
```

## Connection Priority
1. **In Office**: Use `ORCHESTRATOR_URL` (faster, local network)
2. **Remote Work**: Use `NGROK_URL` (internet access)

## Agent Configuration
Agents can choose connection method:
- Set `USE_NGROK=true` in agent `.env` file for remote work
- Set `USE_NGROK=false` or leave empty for local network

## Instructions
- Update `ORCHESTRATOR_IP` when local IP changes
- Update `NGROK_URL` when restarting ngrok tunnel
- Set `NGROK_ENABLED=false` to disable remote access
- No need to restart agents - they query this dynamically

## Examples
```
# Local machine (development)
ORCHESTRATOR_IP=127.0.0.1
ORCHESTRATOR_PORT=3000
ORCHESTRATOR_URL=http://127.0.0.1:3000
NGROK_ENABLED=false

# Office network
ORCHESTRATOR_IP=192.168.0.225
ORCHESTRATOR_PORT=3000
ORCHESTRATOR_URL=http://192.168.0.225:3000
NGROK_URL=https://your-ngrok-url.ngrok-free.dev
NGROK_ENABLED=true

# Public domain (if available)
ORCHESTRATOR_IP=orchestrator.company.com
ORCHESTRATOR_PORT=443
ORCHESTRATOR_URL=https://orchestrator.company.com
NGROK_ENABLED=false
```

---

**Last Updated:** 2025-10-24
**Version:** 2.0 (Multi-connection support)
