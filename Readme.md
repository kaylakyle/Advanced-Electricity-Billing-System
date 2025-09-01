ElectroFlow — Advanced Electricity Billing System

ElectroFlow is a web-based electricity billing dashboard designed to help small utility companies or internal staff manage customers, generate bills, track payments, and generate detailed reports. The system emphasizes usability, automation, and analytics for efficient electricity management.

Features
1. User Authentication

Login with username, password, and role selection (Administrator, Staff, Customer).

OTP verification ensures added security.

On success, login info is stored in localStorage.

Redirects to index.html (dashboard).

Persistent login data stored in browser localStorage.

Logout functionality redirects users back to the login page.

2. Dashboard

index.html

Displays KPIs: Total Customers, Units Consumed, Pending Bills, Total Revenue.

Quick Actions: Navigate to add customers, generate bills, record payments, view reports.

Activities section logs system actions (new bill, payment, reset).

Logout button clears login info and redirects to login.html.

2. Customer Management
customers.html

Add, view, and manage customer details.

Stores all customer information in localStorage.

Updates KPIs in the dashboard automatically.

Each customer has a name, meter number, and billing history.

3. Billing
billing.html

Generate monthly, weekly, or daily bills automatically for each customer.

Automatic calculation of units consumed, previous and current readings, and bill amount.

Bills are linked to specific customers and meter numbers.

Calculates bill amount using units and unit price.

Stores billing data in localStorage.

4. Payments
payment.html

Record payments for individual bills.

Supports partial or full payments.

Automatic calculation of paid, pending amounts, and collection rate.

Updates the dashboard KPIs and collection rate.

5. Reports & Analytics

KPIs: Total Customers, Total Units, Total Revenue, Average Consumption.

Collection Status: Paid vs. Pending bills and collection rate percentage.

Top Consumers: Identify highest electricity consumers.

Customer Summary: Overview of each customer’s billing and payment history.

Detailed Monthly Report: Complete breakdown of all bills, readings, units, and payment status.

Detailed Monthly Report: Shows Previous Reading, Current Reading, Units Consumed, Bill Amount, Payment Status.

Displays Paid Bills, Pending Bills, and Collection Rate (calculated from payments).

6. System Activities

Track recent actions and logs (e.g., new bills, payments, system reset).

Reset system functionality deletes all customer, bill, payment, and activity data for a fresh start.

Technology Stack

Frontend: HTML, CSS, JavaScript

Icons & Styling: Remix Icon, Google Fonts (Inter)

Data Storage: Browser localStorage

Export Reports: PDF & CSV support (via jsPDF and FileSaver.js)

How It Works

Login & OTP Verification
Users log in with their credentials, then verify via a 6-digit OTP.

Customer Management
Admin or staff adds customer details (name, meter number).

Billing Generation
Staff generates bills with readings, units, and amounts. Previous readings are automatically carried over.

Payments Recording
Payments are linked to bills and automatically update paid/pending status.

Reporting & Analytics
The system calculates KPIs, top consumers, and detailed reports based on all recorded bills and payments.

Activity Tracking & Reset
All system actions are logged for transparency. Reset option allows starting fresh when needed.

How to Run the System

Clone the repository:

git clone https://github.com/your-username/ElectroFlow.git


Open the login.html in a browser.

Log in using any role, verify OTP, and navigate through the dashboard.

Use the sidebar to access Customers, Billing, Payments, and Reports pages.

All data is stored locally in the browser; clearing localStorage resets the system.

Future Improvements with Java Integration

Integrating Java (backend) can significantly enhance the system by:

Persistent Database Storage

Use MySQL or PostgreSQL to store customers, bills, and payments permanently.

Eliminates dependency on browser localStorage.

Server-Side Authentication

Implement secure login and OTP verification with hashed passwords.

Role-based access control (Admin, Staff, Customer).

Automated Billing & Scheduling

Use Java to generate recurring monthly bills automatically.

Integrate scheduled jobs (e.g., via Spring Boot or Java Timer) for alerts and reminders.

REST API

Expose endpoints for frontend to fetch/update data.

Makes the system scalable for mobile apps or multiple frontend interfaces.

Enhanced Reporting

Use Java libraries (e.g., JasperReports) for PDF reports.

Generate charts dynamically using backend data.

Security & Logging

Implement audit logs and error handling on the server-side.

Ensure all sensitive data is encrypted in transit and at rest.

Folder Structure
ElectroFlow/
├─ index.html
├─ login.html
├─ customers.html
├─ billing.html
├─ payment.html
├─ report.html
├─ style.css
├─ report.css
├─ js/
│  └─ scripts.js
└─ README.md

Notes

The current version uses localStorage, so data is browser-specific.

Future Java backend will allow multi-user access, database persistence, and secure authentication.

All exported reports (PDF/CSV) are generated client-side with jsPDF & FileSaver.js.