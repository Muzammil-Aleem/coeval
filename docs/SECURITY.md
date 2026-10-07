# Security model

JWTs use HS256 with issuer/audience checks and a 2-hour expiry. Each token includes an administrator tokenVersion; logout, password changes and administrator updates increment it. Cookie settings: HTTP-only, SameSite=Strict, Path=/api; Secure in production. There is no refresh-token endpoint. Login uses generic credential errors and a timing equalizer hash for missing accounts. Passwords are bcrypt-hashed with cost 12; validation requires 12–128 characters with uppercase, lowercase and number. Admin creation is superadmin-only.

All mutations enforce the exact configured Origin before domain routes. This provides a CSRF boundary alongside same-site cookies. Hosting the browser and API on the same origin is the supported production topology; a different origin configuration needs matching cookie policies and a deliberate CSRF review. Do not add wildcard origins.

Only validated fields are passed to models. Public lists and details constrain published records; admin draft reads are distinct authenticated routes. Query filters/sorts are allowlisted, numeric pagination is bounded, search input is escaped before creating regex expressions, and image decoding validates actual format rather than trusting the file extension. Media IDs serve public images; never upload confidential documents. Request bodies are capped at 256 KB. Upload memory usage can still grow under concurrent requests; enforce proxy concurrency and request limits as appropriate.

Helmet adds security headers to the API. Configure the static frontend's headers separately at the proxy/CDN. Rate limits use process memory and the default network address. If behind a trusted proxy, configure Express trust proxy to the exact trusted hop count/networks and use a shared rate-limit store for multiple API replicas. Do not blindly set trust proxy=true on a publicly reachable server.

Operational work before deployment: rotate secrets; use HTTPS and authenticated MongoDB; restrict database networking; back up/restore-test the database and media; define inquiry retention/access policy; monitor failed logins/errors/audit failures; audit dependency updates; add MFA and password recovery if required. Superadmins are immutable through role/activation updates to preserve bootstrap access. Removing a superadmin requires controlled database operations by the operator.

Reference lifecycle checks and audit writes are not transactional. Do not promise strict relational integrity or an immutable compliance audit trail. Review docs/ARCHITECTURE.md for race conditions. No production credentials are shipped.

References: https://expressjs.com/en/advanced/best-practice-security/ and https://mongoosejs.com/docs/validation.html .
