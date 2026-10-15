#!/bin/sh
set -eu

cat > /usr/share/nginx/html/config.json <<JSON
{
  "remotes": {
    "accounts": "${ACCOUNTS_REMOTE_URL:-http://localhost:3001/remoteEntry.js}",
    "transfers": "${TRANSFERS_REMOTE_URL:-http://localhost:3002/remoteEntry.js}",
    "operations": "${OPERATIONS_REMOTE_URL:-http://localhost:3003/remoteEntry.js}"
  }
}
JSON
