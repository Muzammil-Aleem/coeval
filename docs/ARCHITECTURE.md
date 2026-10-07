# Architecture

```text
coeval/
  client/src/
    api/                  credentialed fetch wrapper
    components/admin/     reusable validated editing UI
    config/               per-resource form definitions
    context/              current administrator session
    hooks/                async reads with stale-result protection
    layouts/              public shell and admin navigation
    pages/admin/          complete management views
    styles/               responsive visual system
  server/src/
    config/               validated environment and structured logging
    database/             database connection and idempotent seed
    middleware/           auth, roles, validation, errors and rate limits
    modules/              domain models/routes/controllers/services
    utils/                bounded queries, slugs and errors
  server/tests/           unit and real MongoDB API integration tests
  deployment/             reverse proxy example
  docs/                   API, security, data and operations documentation
```

The browser uses `/api/v1`; Vite proxies to Express in development. In production a reverse proxy serves the React bundle and forwards `/api` to Express. Express validates origins and request bodies, checks administrator sessions/roles, and dispatches domain operations to Mongoose. Resource services provide a consistent allowlisted query interface and publication policy. Document updates load and save the complete model so normal Mongoose validation runs; relationship checks enforce taxonomy consistency. Separate routes handle singleton website data, administrators, inquiries and media.

JWTs live in HTTP-only same-site cookies, not browser storage. Authentication loads the current administrator on each request, so active status and token version changes take effect immediately. Mutating requests require the configured exact Origin; scripts must send it explicitly. Public routes do not become management routes merely because the requester is logged in. `/manage` routes explicitly authenticate and expose drafts.

The resource controller produces response envelopes and audit events. The error middleware maps invalid input, uniqueness conflicts and unexpected faults to stable HTTP errors without exposing stack traces. Request IDs link responses to structured logs. Audit writes are best effort and logged if they fail; content changes and audit rows are not transactional.

Consistency limit: reference existence checks and deletion guards are separate database operations. A concurrent create/delete can race. If hard referential integrity is required, serialize taxonomy/media lifecycle operations or add transactional coordination on a replica set. MongoDB remains the source of truth; no implicit cascade delete is performed.
