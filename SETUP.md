# Deploying Speak in Urdu to Hostinger

A complete, in-order walkthrough — from the project on your computer to the
live site on Hostinger, with bookings actually being saved somewhere. Follow
it top to bottom; don't skip ahead.

**Before you start, have ready:** your Hostinger login, and your domain
(`speakinurdu.com`) already added to your Hostinger hosting plan. Budget
about 30 minutes the first time.

---

## Step 1 — Build the site

This turns your project's source code into the small set of plain files a
web server can actually serve.

1. Open a terminal in the project folder.
2. Run:
   ```
   npm run build
   ```
3. When it finishes, you'll have a new folder called `dist/`. Everything
   inside `dist/` is your entire website — that's the only folder you upload.
   You never upload `src/`, `node_modules/`, or anything else.

Leave this terminal window open — you'll rebuild again any time you make a
future change.

---

## Step 2 — Create the database (so bookings get saved)

Skip this and the site still works, but every booking/contact/newsletter
submission will only exist as an email — nothing saved, nothing to browse
later. Do this now while you're already in setup mode.

1. Log into **Hostinger hPanel**.
2. Go to **Databases → Databases**.
3. Click **Create New Database**.
4. Give it a name, e.g. `speakinurdu` (Hostinger will automatically prefix it,
   turning it into something like `u123456789_speakinurdu` — that's normal).
5. Hostinger will also have you create a **database user** and **password**
   at the same time. Write down all three: the full database name, the
   username, and the password. You'll need them in Step 3.
6. Make sure that user has **All Privileges** on the database (Hostinger
   usually ties this together automatically when you create both at once).

Now create the actual tables:

7. Still on the **Databases** page, find the database you just made and
   click **phpMyAdmin** next to it.
8. In phpMyAdmin, click the **SQL** tab near the top.
9. On your computer, open `schema.sql` (in the project's root folder), select
   all the text, and copy it.
10. Paste it into the big text box in phpMyAdmin and click **Go**.
11. Check the left sidebar — you should now see three new tables:
    `bookings`, `contacts`, `newsletter_signups`. That's the whole database
    set up.

**Already ran this before and the booking form now includes a phone
number?** `schema.sql` includes an `ALTER TABLE` near the top that adds the
`phone` column to an existing `bookings` table — paste the file in again
and run it the same way; it won't touch your existing data or duplicate
the tables.

---

## Step 3 — Connect the site to the database

`public/db.php` is where your real database password lives, so it's
gitignored (never committed) — you're expected to create it yourself from
the template.

1. If `public/db.php` doesn't exist yet, copy `public/db.php.example` and
   rename the copy to `public/db.php` (same folder).
2. Open `public/db.php` in your code editor and replace the four placeholder
   values with the real ones from Step 2:
   ```php
   const DB_HOST = "localhost";
   const DB_NAME = "u123456789_speakinurdu";   // your real database name
   const DB_USER = "u123456789_dbuser";        // your real database username
   const DB_PASS = "the-password-you-set";
   ```
   `DB_HOST` stays `"localhost"` — that's correct for Hostinger shared
   hosting, don't change it.

   **Never put your real password in `db.php.example` or in this guide** —
   both are meant to be committed to git / shared. Real credentials belong
   only in `public/db.php`, which git ignores.
3. Save the file.
4. **Re-run `npm run build`** so this change is included in `dist/`. If you
   already built in Step 1 before editing this file, you must build again —
   otherwise the old placeholder values ship instead of your real ones.

---

## Step 4 — Create the email inbox

The forms also try to email you at `info@speakinurdu.com` in addition to
saving to the database. For that email to actually arrive:

1. hPanel → **Emails → Email Accounts**.
2. Create the mailbox `info@speakinurdu.com` with a password of your choice.
3. That's it — no further configuration needed, `mail()` on Hostinger uses
   this automatically once the mailbox exists.

If you skip this step, submissions still get saved to the database in Step
2 — you just won't get an email notification.

---

## Step 5 — Set up the admin dashboard

This gives you a password-protected page at `yoursite.com/admin.php` to
browse and search every booking, contact message, and newsletter signup —
and export any of them as CSV. It reads from the same database as Step 2.

1. `public/admin-config.php` is where the dashboard's login password lives,
   so like `db.php`, it's gitignored — you're expected to create it
   yourself from the template.
2. If `public/admin-config.php` doesn't exist yet, copy
   `public/admin-config.php.example` and rename the copy to
   `public/admin-config.php` (same folder).
3. Open it and set a real password:
   ```php
   const ADMIN_PASSWORD = "change-this-password";
   ```
   Pick something you'll actually remember — this is the only thing standing
   between the public internet and your students' contact details, so don't
   leave the default in place.
4. Save the file, then **re-run `npm run build`** (same reason as Step 3 —
   whatever's in the file when you build is what ships).

Once it's deployed (Step 6), visit `yoursite.com/admin.php`, log in with
that password, and you'll see three tabs: Bookings, Contact Messages, and
Newsletter. Each has a search box and an **Export CSV** button.

---

## Step 6 — Upload the site to Hostinger

1. hPanel → **Files → File Manager**.
2. Navigate into `public_html` (this is the folder Hostinger serves your
   domain from). If there are old placeholder files in here from Hostinger's
   default setup, you can delete them.
3. Click **Upload** and select **every file and folder inside your local
   `dist/` folder** — not the `dist` folder itself, its *contents*
   (`index.html`, `favicon.png`, `book-trial.php`, `contact.php`, `db.php`,
   `newsletter.php`, `admin.php`, `admin-config.php`, and the `assets`
   folder should all end up directly inside `public_html`, not nested
   inside a `dist` subfolder).

   **Faster alternative:** on your computer, select everything inside
   `dist/` and compress it into a single `.zip`. Upload just that zip into
   `public_html`, then right-click it in File Manager and choose
   **Extract**. Delete the zip afterward.
4. Double check: in File Manager, `public_html` should now directly contain
   `index.html`, `book-trial.php`, `contact.php`, `db.php`,
   `newsletter.php`, `admin.php`, `admin-config.php`, `favicon.png`, and an
   `assets` folder — all at the same level, not buried in subfolders. The
   PHP files need to sit right next to `index.html` or they won't find
   each other.

---

## Step 7 — Test it

1. Visit your domain in a browser. The site should load.
2. Click **Book a Free Trial**, fill out the form, and submit it.
3. Go back to phpMyAdmin (hPanel → Databases → phpMyAdmin) and open the
   `bookings` table — your test submission should be sitting there as a new
   row.
4. Check the `info@speakinurdu.com` inbox for the notification email too.
5. Try the contact form and the newsletter signup in the footer the same way.
6. Visit `yoursite.com/admin.php`, log in with the password from Step 5, and
   confirm your test submissions show up in each tab.

If the booking shows up in the database but no email arrived, that's a
mailbox problem (double-check Step 4) — the important part (the data) is
still safe either way.

---

## Updating the site later

Whenever you make changes to the code:

1. `npm run build` again.
2. Upload the new contents of `dist/` to `public_html`, overwriting the old
   files.

You only need to repeat Steps 2–5 (database, `db.php` credentials, email
mailbox, admin password) if you're setting up on a *new* Hostinger account —
not on every update.

---

## If something's not working

- **Site doesn't load at all**: make sure `index.html` is directly inside
  `public_html`, not inside a `dist` or nested folder.
- **Forms show an error / bookings don't save**: check hPanel → **Advanced →
  PHP Configuration** or **Files → Error Logs**. Every database failure is
  logged there with a clear message — it's almost always a typo in one of
  the four values in `db.php`.
- **No email arrives but the database has the entry**: the
  `info@speakinurdu.com` mailbox either doesn't exist yet (Step 4) or
  Hostinger's mail delivery is having an off day — the booking itself is
  safe in the database regardless.
- **Can't log into `/admin.php`**: the password is only ever stored in
  `public/admin-config.php` — open that file (locally, or via File Manager
  on Hostinger) to check or reset it. There's no "forgot password" flow by
  design, since there's no second admin account to reset it for you.
