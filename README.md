# lease-hub
A lease parsing and storage app. Built to solve a real-world commercial lease management problem for a family business.

Most lease management is still surprisingly manual. Someone reads through a long commercial lease, pulls out the dates, parties, financial terms, renewal requirements, and important clauses, then tracks all of it somewhere else. Lease Hub does that work for you. Upload a lease and it uses AI to extract the information that actually matters, organizes it into a structured dashboard, and keeps the original clauses alongside each value so you can see where the information came from. Extracted data can be reviewed, edited, and confirmed.

The AI handles the tedious first pass. The rest of the application is built around making that extracted information useful, verifiable, editable, and easy to track over the lifetime of a lease.

**Current Scope:** The application was initially designed for a single user with a portfolio of commercial leases. The database architecture was designed with future multi-user support in mind, with authentication and user-level data isolation planned as future improvements.

## What it does:
- Upload and store commercial lease PDFs
- Use AI to extract key lease information automatically
- Organize extracted information into categories such as:<br>
Term<br>
Rent<br>
Premises<br>
Security Deposit<br>
Maintenance and Repairs<br>
- Store the relevant source clause alongside extracted information
- Allow users to confirm automatically extracted data
- Allow users to manually add-to and edit lease data
- All extracted data including user edits is stored in Supabase database
- Track multiple leases from a single dashboard
## Screenshots:
### AI-Extracted Lease Data:
View of extracted lease information with corresponding clauses and user confirmation. All cells are editable and changes are reflected in database. App gracefully handles information AI is unable to extract.

<img width="1435" height="686" alt="Screenshot 2026-08-18 at 1 19 23 PM" src="https://github.com/user-attachments/assets/c4d752a6-d915-44bb-a90c-0b52fe096445" />

### Lease Upload with Loading Notification:

<img width="1440" height="688" alt="Screenshot 2026-08-18 at 1 20 38 PM" src="https://github.com/user-attachments/assets/e7dd3321-66c5-40be-9527-791427c2490b" />


## Stack:
- Frontend: Next.js
- Backend: Node.js
- Database: Supabase
- AI: Anthropic Claude API
- Deployment: Vercel
- Other: Tailwind
