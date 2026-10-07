# Data model

Category 1→N SubCategory; Category 1→N Product; SubCategory optionally 1→N Product. Product references a Media cover and gallery. TeamMember references an optional Media portrait. Service references an optional Media cover. Admin uploads Media and produces AuditLog records. Inquiry is independent public input accessible only to administrators. WebsiteInfo is a singleton with a unique fixed `main` key.

All Mongoose models have timestamps. Standard content has unique slugs, plain-text descriptions, publication state and sort order. Lists index publication/order/creation; email, slug, singleton key and media filename use unique indexes. Schema construction creates indexes automatically in this starter; plan reviewed index migrations for larger production datasets. Search uses escaped case-insensitive substring regex and does not promise large-scale full-text performance; add Atlas Search or text indexing when necessary.

Product types: design, service, consultation. Currency: USD, EUR, GBP. Fees are indicative numeric values rather than transactional billing. No bookings, purchases or payments are implied. Team email is public when included in public team model output; use professional contact details only.

Sensitive administrator hashes are excluded by default and removed during JSON serialization. Inquiries and audit logs have no public GET routes. References use ObjectIds. Existence/category checks and deletion guards are implemented at the service layer; MongoDB does not enforce foreign keys, and concurrent operations can race.
