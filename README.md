# heimdall

A SSO server built on express

## Getting Started

.env example

```bash
MONGODB_USERNAME="<username>"
MONGODB_PASSWORD="<password>"
MONGODB_URL="<url>"
MONGODB_DB="<default-db>"
SESSION_SECRET="<some-secret>"
SESSION_NAME="<session-cookie-name>"
DOMAIN="localhost"
JWT_SECRET="<some-secret>"
SESSION_TYPE="redis"
REDIS_HOST="127.0.0.1"
REDIS_PORT=6379
```

```bash
npm install
npm run dev
```

## Authentication Methods

At present only sign in with email is supported
