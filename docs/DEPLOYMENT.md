# Deployment

1. Run `npm install`, `npm test`, real database integration tests, and `npm run build` in CI.
2. Provision MongoDB with authentication, private networking and backups. Use a production connection string and a dedicated least-privilege DB user.
3. Provision a persistent writable upload volume at the server working directory's `storage/uploads`. The included server Dockerfile builds from the **server directory**, runs as node, and uses npm install because it is independently deployable. For reproducible Docker builds, generate a server-local lockfile or adapt the root workspace lockfile into a workspace build context.
4. Configure `NODE_ENV=production`, `PORT`, `MONGODB_URI`, a high-entropy `JWT_SECRET`, and `CLIENT_ORIGIN=https://your-domain.example`. Keep ALLOW_SEED false. Never run demonstration seed in production. Bootstrap the production superadmin using a controlled one-time script with the Admin model and bcrypt; do not expose registration publicly.
5. Serve `client/dist` using Nginx/CDN and proxy `/api/` to the API. Set VITE_API_URL=/api/v1 at build time for the same-origin arrangement. `deployment/nginx.conf` demonstrates routing only; add HTTPS and static response security headers. The API does not serve the React build.
6. Run the API under your process manager or container platform and use `/health` for readiness. Graceful shutdown closes HTTP and MongoDB with a ten-second ceiling.
7. Monitor errors, rate limits, database/storage capacity and audit persistence. Back up both MongoDB and media, and test restoration together.

Example local server-container build: `docker build -t coeval-api ./server`. Pass environment securely and mount persistent storage. MongoDB's localhost development URI does not work from inside a container; use a resolvable database host on a private network.

Scale-out requires replacing local image storage with object storage and rate-limit memory with a shared adapter. If the proxy forwards client IPs, configure only trusted proxy hops; otherwise the default sees the proxy IP and shared rate limits. Do not expose the database or API directly if the reverse proxy is your security boundary. The provided compose file is development-only and starts an unauthenticated database bound to localhost.

Fonts currently load optionally from Google Fonts. Remove the import or self-host fonts for environments that restrict external requests. All concept illustrations are local seed-generated media.
