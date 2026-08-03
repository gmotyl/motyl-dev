# Subscribers are stored in Resend, not in motyl-dev's database

`/api/subscribe` writes new emails directly into a Resend Audience (`RESEND_AUDIENCE_ID`); there is no local `Subscriber` table. Resend then owns the canonical list, including unsubscribe handling. This collapses delivery + identity into one provider, avoids syncing two stores, and keeps the data path simple — but it ties subscriber portability to Resend's export and means we cannot today join a Subscriber to a NextAuth **User** or to **Article View** history.

## Considered Options

- **Local `Subscriber` Postgres table, Resend used only as a delivery channel** — rejected for now to keep the moving parts low, but kept as a backlog item: mirroring writes via a Resend webhook would unlock per-Subscriber analytics without losing the simplicity at the write path.

## Consequences

- Unsubscribes are Resend's responsibility; `app/unsubscribe/` only forwards to it.
- There is no foreign-key link between **Subscriber** and **User**; the same person opening the site authenticated and receiving a Newsletter Issue is two disjoint records.
