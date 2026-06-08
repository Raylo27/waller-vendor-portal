# Build Handoff

## Project
City of Waller Vendor Portal

## Purpose
A lightweight pilot and demonstration portal showing what a modern vendor portal could look like for the City of Waller.

## Positioning
This is a pilot-layer MVP, not a replacement for the city’s full procurement process.

## Users
- Vendors
- City staff

## Vendor flow
- Homepage
- Registration
- Registration confirmation
- Dashboard
- Opportunities list
- Opportunity detail
- Submission form
- Submission confirmation

## Staff flow
- Staff login
- Staff dashboard
- Post opportunity
- Vendor registry
- Submissions review

## Core demo moment
A staff user posts an opportunity and it appears immediately on the vendor-facing opportunities list.

## Must be real
- Staff can post opportunity
- Vendor can see opportunity
- Vendor can submit proposal
- Staff can review submissions
- Submission status updates persist

## Can be simplified
- File uploads only store filenames
- Dashboard metrics can be hardcoded
- Vendor registry can be seeded/static
- Demo authentication can be simplified
- Vendor demo tab can be pre-authenticated

## Source-of-truth reminders
- Use Lynn Spencer, not Linda Spencer
- Use 2026 dates
- Use city-branded header language unless permission is granted for official branding

## Planned stack
- Frontend: React + Vite
- Backend: Express
- Database: PostgreSQL
- ORM: Prisma

## First build milestone
Staff posts an opportunity and it appears live on the vendor opportunities list.
