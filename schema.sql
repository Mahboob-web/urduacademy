-- Speak in Urdu — database schema
--
-- How to use:
--   1. In Hostinger hPanel, go to Databases > Management and open phpMyAdmin
--      for the database you created (see SETUP.md for the full steps).
--   2. Click the "SQL" tab.
--   3. Paste this whole file in and click "Go".
--
-- This creates three tables — one per form on the site. Every submission
-- is saved here permanently, in addition to the email notification you
-- already get, so nothing is lost if an email fails to send.

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(40) NOT NULL,
  country VARCHAR(80) NOT NULL,
  timezone VARCHAR(80) NOT NULL,
  class_time VARCHAR(200) NULL,
  course VARCHAR(120) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Already ran this file before phone numbers were added? `CREATE TABLE IF
-- NOT EXISTS` above won't touch your existing table, so run this once to
-- add the column to it. Safe to skip entirely on a brand-new database —
-- the CREATE TABLE above already includes `phone`.
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS phone VARCHAR(40) NOT NULL DEFAULT '' AFTER email;

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(40) NULL,
  timezone VARCHAR(80) NULL,
  message TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Already ran this file before phone numbers were added to the contact
-- form? Run this once to add the column to your existing `contacts` table.
-- Safe to skip on a brand-new database — the CREATE TABLE above already
-- includes `phone`. (Nullable here since the contact form's phone field
-- is optional, unlike the booking form's.)
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS phone VARCHAR(40) NULL AFTER email;

CREATE TABLE IF NOT EXISTS newsletter_signups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(200) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
