# SSES CMMS — Runnable Sample (Windows)

A self-contained demo build of a Computerised Maintenance Management System (CMMS) for an industrial plant. It runs on one Windows PC with made-up demo data. No install, no database server and no internet connection are needed.

> This repo holds the **compiled sample build** only. It is not the source code.

## What the system does

- **Maintenance requests:** plant operators raise requests. The manager reviews them and turns them into work orders. Duplicate requests can be marked and linked.
- **Work orders:** the manager assigns jobs. Technicians start the job, tick the checklist, log hours and close it. Closing a job needs its own permission. Each job records repair time and total cost, with a printable view.
- **Preventive maintenance (PM):** PM jobs are generated from time and meter-based schedules in the background, with a forecast view and tracking of missed PMs.
- **Assets, locations and meters:** an equipment register with meter readings (and corrections) and downtime tracking.
- **Spare parts and purchase requests:** stock levels, transactions, issue slips, storekeeper and procurement roles.
- **Reliability KPIs:** dashboard tiles and charts, including MTBF (mean time between failures) and MTTR (mean time to repair), and a monthly reliability report.
- **Excel import:** bulk upload of assets, parts and other set-up data from templates, with a preview before saving.
- **Email notifications:** alerts and a daily digest by SMTP or Microsoft Graph.
- **Roles and permissions:** the administrator sets what each role can do. New users must change their password at first sign-in.

Stack: ASP.NET Core MVC (.NET 10, Razor views), Entity Framework Core with migrations, SQLite (sample) or SQL Server, ClosedXML, MailKit, Bootstrap.

## How to run

1. Download this repo (**Code → Download ZIP**) and unzip it, for example to your Desktop.
2. Double-click `Start SSES CMMS sample.cmd`.
   If Windows shows "Windows protected your PC", click **More info**, then **Run anyway**.
3. Your browser opens `http://localhost:5090`. If it does not, open that address yourself.
4. Keep the black window open while you test. Close it to stop.

To start again with fresh data: close the window, delete `app\App_Data`, then start again.

## Demo sign-in

The demo users, roles and passwords are in [`READ ME FIRST.txt`](READ%20ME%20FIRST.txt). They are local demo accounts only.

| Try as | What to do |
| --- | --- |
| Requester (`ED-4001`) | Raise a new maintenance request |
| Manager (`ED-1001`) | Assign it to a technician; view the dashboard and reports |
| Technician (`ED-2001`) | Open "My work", start the job, tick the checklist, log hours, complete it |
| `admin` | Administration → Roles & permissions |

## How it was built

Built by Abdullah Ismail with AI coding agents (Claude Code), working from a written spec of business rules and acceptance criteria.
