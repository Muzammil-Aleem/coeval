# Content operations

Create categories before sub-categories, then products/projects. Products require a category and a type. An optional sub-category must belong to that category. Records start as drafts; set Published in the admin editor when ready. Home shows featured published projects and published services. Public products/categories/sub-categories/teams/services/testimonials never expose drafts via their content endpoints.

Upload images through Media library, choose a cover/portrait in the editor and optionally paste gallery media IDs one per line. All uploads are re-encoded WebP and public by media ID. Media must not contain confidential content. Unlink covers, galleries and portraits before deleting media. Empty selection clears optional media references. Category and sub-category deletion is blocked while referenced; reassign/delete child records first.

The editor's selectors show up to 100 categories, sub-categories or media files. Larger libraries remain accessible through the paginated API, but selector browsing beyond 100 records requires extending the UI. Galleries use explicit media IDs. No rich text HTML is rendered, so descriptions are plain text.

Website information drives hero copy, contact details and studio description. Social links and SEO fields are persisted; SEO metadata is not server-rendered. The SPA currently ships a fixed HTML title/description; implement SSR or per-page head management for search-engine-focused publishing.

Inquiries are stored in MongoDB; staff review them in the console and track new/contacted/qualified/closed status. Internal notes are private. No email integration is included. Use DELETE /inquiries/:id for retention cleanup through an authenticated administrative client. The dashboard does not offer inquiry deletion.
