# Testing

`npm test` runs isolated tests for query bounds, publication filtering, regex escaping, injection rejection, sort allowlists, product validation, mass assignment, password policy, safe social links and slug generation. No MongoDB is required.

`npm run test:integration` requires TEST_MONGODB_URI to a **disposable database ending in `_test`**. The suite drops that database before and after running, and tests actual HTTP routes, cookies, publication, protected writes, relations, content validation, upload decoding/file serving/deletion, logout and inquiry privacy. Never use production data. CI starts a MongoDB service.

`npm run build` verifies the React dependency graph, JSX and production compilation. A successful build does not validate browser interactions. Manual acceptance: seed; browse each public page; search/filter/paginate projects; submit a brief; log in; create category/subcategory/project drafts; publish; upload a cover; confirm the public page; edit website info; manage inquiry status; create an admin as superadmin; change password and log in again. Repeat at mobile width.

See VERIFICATION.md for checks actually performed while preparing this archive, including any unavailable runtime dependencies.
