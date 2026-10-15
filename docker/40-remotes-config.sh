#!/bin/sh
set -eu

cat > /usr/share/nginx/html/config.json <<JSON
{
  "authority": "${AUTHORITY:-http://localhost:8180/realms/eventbank}",
  "clientId": "${CLIENT_ID:-eventbank-web}",
  "remotes": {
    "accounts": "${ACCOUNTS_REMOTE_URL:-http://localhost:3001/remoteEntry.js}",
    "transfers": "${TRANSFERS_REMOTE_URL:-http://localhost:3002/remoteEntry.js}",
    "operations": "${OPERATIONS_REMOTE_URL:-http://localhost:3003/remoteEntry.js}",
    "onboarding": "${ONBOARDING_REMOTE_URL:-http://localhost:3004/remoteEntry.js}",
    "cards": "${CARDS_REMOTE_URL:-http://localhost:3005/remoteEntry.js}",
    "backoffice": "${BACKOFFICE_REMOTE_URL:-http://localhost:3006/remoteEntry.js}"
  }
}
JSON
