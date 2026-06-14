# City of Waller Vendor Portal

A full-stack civic-tech MVP built for the City of Waller, Texas. This project demonstrates a lightweight vendor portal where local businesses can register, browse open city opportunities, and submit proposals digitally, while city staff can post opportunities, manage the vendor registry, and review submissions.

**Live demo:** https://waller-portal-frontend.onrender.com

> Note: this app runs on Render's free tier. If it's been idle, the first load can take 30 to 60 seconds while the server spins back up. Subsequent loads are fast.

---

## Why I built this

The City of Waller does not appear to have a public-facing vendor portal that allows businesses to register, browse opportunities, and submit proposals online. Cities of comparable size have used vendor portals to expand their local vendor pool, reduce procurement admin time, and create a documented record of competitive sourcing.

This project is a pilot-layer demo, not a claim to replace the city's existing procurement process. The goal was to build a believable, working MVP that could be shown to city staff as a starting point for a conversation about a 90-day pilot.

---

## What this app does

### Vendor side
- Register as a vendor with business info, EIN, and service categories
- Log in and view a personal dashboard
- Browse all open city opportunities, filterable by category and type
- View full opportunity details including scope of work, requirements, and deadlines
- Submit a proposal with notes, an optional bid amount, and document uploads
- Receive a unique reference number on submission

### Staff side
- Separate staff login
- Dashboard with portal-wide metrics and recent activity
- Post a new opportunity, which appears live on the vendor side immediately
- View the full vendor registry
- Review submissions per opportunity and update their status (New, Under Review, Accepted, Rejected)

---

## Tech stack

- **Frontend:** React + Vite, Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **ORM:** Prisma (v5)
- **Auth:** JWT-based, with simplified demo credentials
- **Hosting:** Render (frontend static site, backend web service, and PostgreSQL database all deployed from one `render.yaml` blueprint)

---

## Demo credentials

### Staff login
```
URL: /staff/login

Email: lspencer@wallertexas.gov
Password: WallerAdmin2026

Email: mwebb@wallertexas.gov
Password: WallerStaff2026
```

### Vendor login
Vendors log in with their registered email and their EIN as the password.

```
URL: /login

Email: ray@lonestargrounds.com
Password: 74-2391045

Email: priya@gulfcoasttech.io
Password: 76-1048293

Email: dale@wallercountybuild.com
Password: 74-8820134
```

---

## How to run the demo

The fastest way to see the core feature is the "staff posts, vendor sees it instantly" loop:

1. Open the live site in two browser tabs.
2. In Tab 1, go to **Staff Login** and sign in as Lynn Spencer.
3. From the staff dashboard, click **Post New Opportunity** and fill out a quick test listing (title, type, category, description, requirements, deadline, and at least one required document).
4. Click **Publish Opportunity**.
5. In Tab 2, go to **Opportunities** (no login needed) and confirm the new listing appears immediately.

To see the full vendor flow end to end:

1. From the homepage, click **Vendor Login** and sign in with one of the vendor accounts above (or register a new business from scratch).
2. Click into any open opportunity and select **Submit a Proposal**.
3. Fill in proposal notes, upload any file for each required document, and submit.
4. Note the reference number shown on the confirmation screen.
5. Switch to the staff tab, go to **Submissions**, and find that submission. Update its status (for example, to Under Review or Accepted) and confirm the change persists.

---

## What was hard (and what I learned)

This project went from a planning document to a fully deployed, working app in one sitting, which meant running into and solving real problems along the way rather than working from a tutorial. A few specific things stood out:

**Prisma version mismatches.** Midway through setup, Prisma released a major version (7) that changed how database connection URLs are configured, removing the `url` property from `schema.prisma` entirely. Both the local environment and the Render deploy independently picked up Prisma 7 while the schema was written for Prisma 5, causing repeated schema validation errors. The fix was pinning both `prisma` and `@prisma/client` to version 5 explicitly in every `package.json` that referenced them.

**Folder structure mix-ups during scaffolding.** Early on, a `routes` folder was accidentally created as a file instead of a folder, and a `staff` pages folder ended up nested inside the `vendor` folder instead of next to it. Both were simple to fix once spotted, but they were a good reminder that file structure errors can produce confusing import errors that look unrelated to the actual cause.

**Connecting the frontend to a live backend.** Locally, the app called `http://localhost:5000` directly. Getting this to work in production required centralizing all API calls behind a single `API_URL` config value, setting that value as an environment variable in the Render blueprint, and discovering that Render's `fromService` env var resolution only returns a hostname, not a full URL with the `https://` scheme. This had to be set as an explicit value instead.

**Single-page app routing on a static host.** Once deployed, navigating directly to a route like `/staff/login` returned a "Not Found" page, because the static host was looking for a file at that path instead of serving `index.html` and letting React Router handle it. This was fixed by adding a `_redirects` file (`/* /index.html 200`) to the `public` folder so all routes fall back to the single-page app.

**Seeding the production database.** The local database and the Render-hosted production database are two separate instances, so seed data created locally does not automatically appear in production. The fix was temporarily pointing the local environment's `DATABASE_URL` at the production database, running `npx prisma migrate deploy` and `npx prisma db seed` against it directly, then switching the local `.env` back. This also surfaced a missing `prisma.seed` config in the root `package.json`, which had been accidentally overwritten with the server's `package.json` content at some point during setup.

Each of these was a real blocker that returned a genuinely confusing error message at first glance, and each one taught something about how the pieces of a deployed full-stack app actually fit together: schema versions, environment variables, static hosting behavior, and the separation between local and production databases.

---

## Project structure

```
waller-vendor-portal/
├── client/          React + Vite frontend
├── server/          Express backend (routes, middleware)
├── prisma/          Database schema and seed data
├── render.yaml       Deployment blueprint for Render
└── docs/             Planning documents and project brief
```

---

## Status

MVP complete and deployed. All 13 planned screens (8 vendor-facing, 5 staff-facing) are functional, both end-to-end flows work, and the database is seeded with realistic demo data for the City of Waller.

Next steps would be outreach to the City of Waller EDC to propose a 90-day pilot, along with polish items like phone/EIN input formatting, a real vendor account creation flow with passwords, and live file storage.