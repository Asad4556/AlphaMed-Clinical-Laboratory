# AlphaMed Clinical Laboratory - Local Version

## What is this
This is a local, PHP + SQLite lab management system skeleton for AlphaMed.
It provides role-based login (admin/reception/technician), patient registration, test assignment, result entry, and print-ready report layout with watermark and QR preview.

## Requirements
- PHP 7.4+ with PDO SQLite enabled
- A browser
- Optional: XAMPP, WAMP, Laragon, or php built-in server

## Setup
1. Place project folder `alpha-med-lab` in your web root (e.g., `htdocs`).
2. Put your `logo.png` into `assets/images/logo.png`.
3. Run `init_db.php` once via browser: `http://localhost/alpha-med-lab/init_db.php`
4. After success, delete or secure `init_db.php`.
5. Open `login.php` to login.
   - Admin username: `34501-8971113-7`
   - Admin password: `Asad@2723`

## Notes
- The DB uses placeholder test names (40 per department). Edit tests in the DB or add a management page to replace with real tests and ranges.
- Report generation is simple HTML print. For server-side PDF, integrate TCPDF/DOMPDF in `generate_report.php`.
- For QR integration, replace the external QR API with your own QR generation if desired.

## Security
- This is a local development skeleton. Before using in production, secure sessions, sanitize all inputs, use HTTPS, and strengthen authorization checks.
