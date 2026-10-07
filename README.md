# Coeval — Architecture & Design

A full MERN application for an architectural studio: modular Express/Mongoose API, cookie-based JWT administrator authentication, a React portfolio website, and a working content management dashboard. Products represent design projects, service offers or consultations. All portfolio, team, contact details and testimonials in the seed are fictional demonstration content; replace them before publishing.

## Requirements

- Node.js 22.12+ (or a supported newer LTS), npm 10+, MongoDB 8 locally or MongoDB Atlas.
- Docker is optional; `docker compose up -d` starts only the development database.

## Quick start

1. Extract the ZIP and open a terminal inside `coeval`.
2. Run `npm install`.
3. Copy `server/.env.example` to `server/.env` and `client/.env.example` to `client/.env`.
4. Set `MONGODB_URI`, a randomly generated `JWT_SECRET` of at least 32 characters, and an administrator email/password. Seed passwords require 12+ characters, uppercase, lowercase and a number. Generate a secret with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.
5. Start MongoDB. For Docker: `docker compose up -d`.
6. Set `ALLOW_SEED=true` in `server/.env`, run `npm run seed`, then set it back to `false`. Seeding is idempotent and preserves existing records and administrator passwords. It never drops the database.
7. Run `npm run dev`. Open http://localhost:5173. The API runs on http://localhost:5000/api/v1.
8. Open `/login` and use the seeded administrator credentials. There is no public administrator registration.

Run commands from the repository root so workspace scripts use the right working directory. The server loads its environment from `server/.env`; the upload folder is `server/storage/uploads`.

A pnpm workspace lockfile is also included. For exact dependency versions, use pnpm 11+ with `pnpm install --frozen-lockfile`; npm users can use the documented install commands.

## What is included

- Products/Projects: category and sub-category relationships, design/service/consultation type, fees, location, area, year, featured flag, draft/published status, cover, gallery and deliverables.
- Categories and Sub-categories: reusable taxonomy with guarded deletion and category/sub-category consistency checks.
- Admin: superadmin-created users, role protection, account activation, password changes, token version revocation and protected dashboard statistics.
- WebsiteInfo: singleton company profile, hero text, contact details, social links and SEO metadata.
- TeamMembers: biographies, job titles, credentials and portraits.
- Services and Testimonials: additional studio content managed through the dashboard.
- Inquiries: public project briefs, private status and internal notes; rate limited submissions.
- Media: authenticated image upload, byte-content decoding, 5 MB limit, 40 million pixel decoding cap, image resizing, metadata removal and WebP re-encoding, public file serving and guarded deletion.
- Audit: administrator content actions; superadmin-only log viewing.
- Public website: homepage, portfolio search and discipline filters, project details, expertise, studio/team, contact form and responsive layout.
- Admin frontend: CRUD forms, search/pagination, draft publication, media library, inquiries, website settings, administrator creation, account password change and audit log.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | API watcher and React dev server |
| `npm run seed` | Non-destructive development content/bootstrap admin |
| `npm test` | Unit tests without MongoDB |
| `npm run test:integration` | Real API tests against disposable `coeval_test` MongoDB |
| `npm run build` | Production React bundle in `client/dist` |
| `npm start` | Production API process (does not serve the React bundle) |

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [API reference](docs/API.md) and [OpenAPI specification](docs/openapi.json)
- [Security model](docs/SECURITY.md)
- [Deployment guide](docs/DEPLOYMENT.md)
- [Testing](docs/TESTING.md)
- [Content operations](docs/CONTENT.md)
- [Data model](docs/DATA_MODEL.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)

## Deployment boundaries

This is a production-oriented starting point, not a claim of a completed security audit. Configure HTTPS, secrets, an authenticated database, backups, storage persistence and monitoring before public deployment. The bundled upload adapter uses a local disk, and rate limits use process memory. Multi-instance deployments need shared storage and a shared rate-limit store. No checkout/payment, email sending, password recovery, MFA or object-storage credentials are assumed. Inquiries are stored for staff review; no email is sent. See deployment and security documentation for the operational details.

## License

MIT. Seed illustrations are original geometric concept images generated locally. No external project photos are bundled. Optional Google Fonts requests can be removed from the stylesheet for offline/self-hosted use.
