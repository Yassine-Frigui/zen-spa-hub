# Brandless Spa Admin Dashboard

## Goal
Build a polished, responsive spa administration workspace in a light beige and cream visual system, without visible branding.

## Pages and navigation
- Add a persistent desktop sidebar and compact mobile navigation for Dashboard, Clients, Reservations, Services, Store, Statistics, and Settings.
- Give every page its own URL, page title, search/filter controls where relevant, and unique metadata.
- Keep the interface dense enough for daily operations while retaining a calm spa aesthetic.

## Dashboard
- Show today’s appointments, revenue, active clients, and occupancy summaries.
- Add a schedule timeline, recent activity, popular services, and a small weekly performance chart.
- Provide clear shortcuts into new reservations and client records.

## CRUD workflows
- Build reusable table, toolbar, status, empty-state, form-dialog, and delete-confirmation patterns.
- Clients: create, inspect, edit, search, and delete client profiles.
- Reservations: create, reschedule/edit, filter by status/date, and cancel/delete appointments.
- Services: create, edit, enable/disable, categorize, price, duration, and delete offerings.
- Store: create, edit, filter, track inventory state, and delete products.
- Settings: editable business details, hours, notifications, and staff access rows.
- Use realistic in-memory demo records so all controls and dialogs are usable immediately; data will reset on refresh because no persistent storage was requested.

## Statistics
- Add period controls, revenue and booking trend charts, service mix, retention, and staff performance summaries.

## Visual system
- Define semantic cream, beige, ink, muted green, and restrained terracotta tokens in the global design system.
- Use refined editorial typography, compact controls, fine borders, modest corner radii, and minimal motion.
- Ensure forms, tables, dialogs, menus, charts, and mobile layouts remain readable and usable.

## Technical details
- Keep TanStack Start routing and create all seven route files alongside a shared application shell.
- Reuse the existing accessible UI primitives and Lucide icon set.
- Store demo CRUD state in a shared React provider for navigation continuity within the session.
- Verify the preview on desktop and mobile, test key create/edit/delete flows, and resolve build or runtime errors.
