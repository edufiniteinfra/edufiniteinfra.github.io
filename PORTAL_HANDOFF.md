# Edufinite Portal Handoff

## Project split

- Public marketing site: `edufinite.net`
- Portal app: `portal.edufinite.net`
- Recommendation: keep the portal in a separate repo from the public GitHub Pages website

Reasoning:

- The public site is a static GH Pages deployment.
- The portal will need auth, protected routes, environment variables, and likely a database/storage layer.
- Deploy cadence, risk profile, and infra concerns are different enough that a clean repo split is the better choice.

## Current public-site context

The public site already exists and is live/deployable as a static multi-page website. It is intended to explain Edufinite publicly and route users into contact, forms, and eventually payments.

Current public site characteristics:

- Purple-forward visual identity
- Responsive multi-page marketing site
- Hosted via GitHub Pages
- `Portal` button in header links to `https://portal.edufinite.net`
- Student and institution form flows are split into separate pages
- Forms currently submit through FormSubmit as a temporary launch solution

Current important public pages:

- `index.html`
- `about.html`
- `admissions.html`
- `undergraduate.html`
- `graduate.html`
- `special-courses.html`
- `institutions.html`
- `process.html`
- `faq.html`
- `contact.html`
- `student-form.html`
- `institution-form.html`
- `thanks.html`

## Current temporary contact/form setup

Temporary live inbox:

- `edufinite.consultant@gmail.com`

Current form behavior:

- Student and institution forms submit through FormSubmit
- This is temporary until custom backend/domain email flow is introduced

Important note for future refactor:

- The temporary Gmail inbox is intentional for launch
- The owner plans to move this later to a custom domain email / custom backend flow

## Brand and UX direction

Important design expectations established during public-site work:

- Preserve the purple theme and premium academic/advisory feel
- Avoid generic template aesthetics
- Layout should feel polished, spacious, and intentional
- Responsive behavior matters on desktop, tablet, and mobile
- Portal UI should feel cleaner and more application-like than the public site, but still clearly part of the same brand family

## Business context

Edufinite is a legitimate education advisory / international education services business, not a spammy funnel or lead-gen scam site.

Public-facing service areas include:

- Student guidance
- Undergraduate support
- Graduate support
- Special courses / upskilling
- Institution partnerships
- Consultation / enrolment guidance

The portal is expected to become the operational layer where users can track progress and understand what needs to be done next.

## Expected portal roles

At minimum, plan around:

- `student`
- `institution`
- `admin`

Likely future expectations:

- Students should see their own profile, checklist, uploads, statuses, and action items
- Institutions should see institution-level information and possibly linked students/cases
- Admins should manage users, cases, statuses, notes, tasks, and documents

## Auth expectations

Owner preference:

- Email-based login

Strong recommendation:

- Passwordless email login via magic link or OTP

Earlier recommendation for fastest/cheapest portal path:

- Frontend: Next.js
- Hosting: Vercel
- Backend/Auth/DB: Supabase

Why this was recommended:

- Cheap to start
- Easy email-based auth
- Good relational data model for students, institutions, tasks, statuses, and documents
- Much lighter setup than AWS-first

## Suggested MVP scope

Build the smallest useful portal first.

Recommended MVP modules:

1. Authentication
- Email magic link / OTP login
- Role-aware access

2. User profile
- Basic user details
- Role type
- Contact info

3. Cases / records
- Student case or institution case
- Assigned status
- Assigned consultant/admin

4. Task checklist
- Required actions
- Due dates
- Completion state
- Visibility by role

5. Documents
- Uploads
- Required document list
- Admin review state

6. Updates / notes
- Admin adds updates
- Student/institution sees status changes and next steps

7. Payments placeholder
- Do not overbuild payments into the portal initially
- It is acceptable for early portal versions to show payment status / external payment links only

## Suggested initial data model

This is a reasonable starting shape, not a final schema:

- `profiles`
  - `id`
  - `email`
  - `full_name`
  - `role`
  - `phone`

- `institutions`
  - `id`
  - `name`
  - `contact_email`
  - `contact_phone`

- `institution_members`
  - `id`
  - `institution_id`
  - `profile_id`
  - `member_role`

- `students`
  - `id`
  - `profile_id`
  - `assigned_consultant`
  - `intake`
  - `program_interest`
  - `status`

- `cases`
  - `id`
  - `owner_type`
  - `student_id` or `institution_id`
  - `status`
  - `assigned_admin`
  - `assigned_consultant`

- `tasks`
  - `id`
  - `case_id`
  - `title`
  - `description`
  - `due_date`
  - `status`
  - `visible_to_student`
  - `visible_to_institution`

- `documents`
  - `id`
  - `case_id`
  - `label`
  - `file_path`
  - `status`
  - `uploaded_by`

- `notes`
  - `id`
  - `case_id`
  - `author_id`
  - `body`
  - `visibility`

## Known consultant names currently used in forms

These names already appear in the public-site forms:

- Priyanka
- Deepak
- Vandana
- Richa
- Sanjeev
- Other
- No consultant

The portal may eventually want a real consultant table instead of hardcoded values.

## Payments context

Public-site decision:

- Payments should be offloaded to a hosted payment provider rather than handled directly on GitHub Pages

Important guidance already discussed:

- GitHub Pages can safely host marketing pages that redirect to a hosted payment flow
- GitHub Pages should not itself hold payment secrets or backend payment logic

Portal implication:

- If payments are added later, use hosted checkout/payment links first
- Track payment status or payment references in the portal rather than building full custom billing immediately

## Deployment guidance for portal repo

Recommended:

- New repo for portal
- Separate deployment pipeline from the public website
- Custom domain: `portal.edufinite.net`

Example stack:

- App: Next.js
- Deploy: Vercel
- Backend/Auth/DB: Supabase

Alternative if AWS is eventually required:

- Next.js frontend
- Auth provider or Cognito
- DB/storage on AWS

But AWS is not recommended as the first move unless there is a compliance or infra reason.

## Product guidance for the next agent

The next agent should:

1. Start by clarifying the wireframe and user journeys
2. Define the MVP around student, institution, and admin roles
3. Prefer rapid launch architecture over enterprise complexity
4. Keep auth simple with email-based login
5. Build for cheap hosting and easy iteration
6. Avoid prematurely overbuilding payments, messaging, or CRM features

## Suggested first milestone

You arew a senior full stack dev. 

If starting the portal fresh, the first milestone should probably be:

- Auth
- Dashboard shell
- Role-based routing
- Student checklist page
- Admin case management page
- Basic document upload/status flow

That would produce a real usable MVP quickly without requiring the full long-term backoffice system on day one.

We are attaching a Portal Wireframe from the client in PDF format in this project as well. Make sure tro include everything in that wireframe. You are free to use any toolchains that make sense. We want ease of hosting and usage. 

There are 3 portals: Admin that manages stuff and used by edufinite employees, student that give students notifs and stuff, and institution.

For the design language: scrape https://edufinite.net and https://suobset.github.io/edufinite-brand-guide 