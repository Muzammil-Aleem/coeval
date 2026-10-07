# Troubleshooting

- Environment validation fails: copy server/.env.example to server/.env, set a MongoDB URI and a 32+ character secret. Start through the root workspace scripts so the server working directory is correct.
- API unavailable: confirm MongoDB is running and /health returns 200. Atlas needs valid credentials/network access. Inspect structured API logs.
- Seed refuses to run: set ALLOW_SEED=true in non-production mode and choose a password that meets policy. Restore ALLOW_SEED=false afterwards. Existing admin passwords are intentionally preserved.
- 403 on write: the Origin header must exactly match CLIENT_ORIGIN. A frontend at 127.0.0.1 is a different origin from localhost. Production expects HTTPS and same-origin routing.
- Login works but requests are unauthenticated: use credentials:include and the same browser origin. Secure cookies require HTTPS in production. Do not switch hostnames while logged in.
- 409 deleting taxonomy/media: a project/sub-category/team/service still references it. Remove references first.
- Upload fails: use a valid JPEG/PNG/WebP under 5 MB and under 40 million pixels. Confirm the server storage directory is writable and persistent.
- Public site appears empty: seed development content or publish records through admin. Drafts are deliberately hidden from public reads.
- Integration tests refuse connection: set TEST_MONGODB_URI to a disposable local database name ending in _test. The tests drop that database.
- Production frontend deep links 404: configure try_files fallback to index.html as in deployment/nginx.conf.
