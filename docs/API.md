# API reference — /api/v1

Success: `{ "success": true, "data": ... }`; lists add `pagination: {page,limit,total,pages}`. Deletes return 204. Errors return `{success:false,error:{message,details?,requestId}}`.

## Authentication

| Method | Path | Access / body |
| --- | --- | --- |
| POST | /auth/login | Public; email, password; sets 2-hour cookie |
| GET | /auth/me | Session required |
| POST | /auth/logout | Session required; revokes all sessions for this admin |
| POST | /auth/change-password | Session required; currentPassword, newPassword; revokes all sessions |

All writes require `Origin: http://localhost:5173` in development. Use your configured `CLIENT_ORIGIN` in production. Browser fetch requests include cookies. CLI examples use a cookie jar:

```sh
curl -c cookies.txt -H 'Origin: http://localhost:5173' -H 'Content-Type: application/json' -d '{"email":"YOUR_EMAIL","password":"YOUR_PASSWORD"}' http://localhost:5000/api/v1/auth/login
curl -b cookies.txt http://localhost:5000/api/v1/products/manage
```

## Standard resources

Applies to `/products`, `/categories`, `/subcategories`, `/team-members`, `/services`, `/testimonials`.

| Method | Suffix | Access |
| --- | --- | --- |
| GET | / | Public; published only |
| GET | /:id | Public; published only |
| GET | /manage | Admin or superadmin; drafts included |
| GET | /manage/:id | Admin or superadmin; drafts included |
| POST | / | Admin or superadmin; create |
| PATCH | /:id | Admin or superadmin; partial update |
| DELETE | /:id | Admin or superadmin; delete unless referenced |

Queries: `page=1`, `limit=12` (1–100), `search=house` (literal substring, max 100 characters), `sort=newest|oldest|name|order|price|-price`. Admin lists support `published=true|false`. Products support `category`, `subCategory`, `type`, and `featured=true|false`; sub-categories support `category`. Use ObjectIds, not slugs, for path IDs and relationships. Public product category filters do not filter unpublished taxonomy automatically; staff should maintain publication consistency when publishing projects.

Common create fields: `name`, `description` required; optional `slug` (generated on create), `published` (default false), `sortOrder` (default 0). Name changes preserve the existing slug unless explicitly edited. Unknown body fields are rejected. Product required fields also include `category` and `type`; team members require `jobTitle`, sub-categories require `category`. See OpenAPI for exact fields and types.

## Other endpoints

| Endpoint | Access / behavior |
| --- | --- |
| GET /website-info | Public singleton (null before seeding) |
| PUT /website-info | Admin; validated company profile, upsert |
| GET /admin | Superadmin; administrator list |
| POST /admin | Superadmin; name, email, password, role |
| PATCH /admin/:id | Superadmin; name, role, active; existing superadmins cannot be demoted/deactivated |
| GET /media | Admin; pagination |
| POST /media | Admin; multipart file + alt |
| GET /media/:id/file | Public WebP file; image content is public even if used by draft content |
| PATCH /media/:id | Admin; alt text |
| DELETE /media/:id | Admin; refuses referenced media |
| POST /inquiries | Public; name, email, phone?, service?, message (20–5000 chars) |
| GET /inquiries | Admin; pagination and optional status |
| PATCH /inquiries/:id | Admin; status and internalNotes |
| DELETE /inquiries/:id | Admin; explicit retention deletion |
| GET /dashboard | Admin; counts and five recent inquiries |
| GET /audit | Superadmin; pagination |
| GET /health | Outside /api/v1; 200 ready / 503 DB unavailable |

Error statuses: 400 invalid query/ID/upload, 401 missing/expired/revoked session, 403 untrusted origin/role, 404 missing or unpublished record, 409 uniqueness/reference/account conflicts, 415 unsupported media, 422 validation/image content, 429 rate limit, 500 unexpected failure. Framework rate-limit responses may use their default text body.
