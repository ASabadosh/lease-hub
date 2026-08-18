# lease-hub
A lease parsing and storage app. Built to solve a real-world commercial lease management problem for a family business.

Most lease management is still surprisingly manual. Someone reads through a long commercial lease, pulls out the dates, parties, financial terms, renewal requirements, and important clauses, then tracks all of it somewhere else. Lease Hub does that work for you. Upload a lease and it uses AI to extract the information that actually matters, organizes it into a structured dashboard, and keeps the original clauses alongside each value so you can see where the information came from. Extracted data can be reviewed, edited, and confirmed.

The AI handles the tedious first pass. The rest of the application is built around making that extracted information useful, verifiable, editable, and easy to track over the lifetime of a lease.

### Current Scope:
The application was initially designed for a single user with a portfolio of commercial leases. The database architecture was designed with future multi-user support in mind, with authentication and user-level data isolation planned as future improvements.

## What it does:
- Upload and store commercial lease PDFs
- Use AI to extract key lease information automatically
- Organize extracted information into categories such as:
Term
Rent
Premises
Security Deposit
Maintenance and Repairs
- Store the relevant source clause alongside extracted information
- Allow users to confirm automatically extracted data
- Allow users to manually add-to and edit lease data
- Track multiple leases from a single dashboard
- Gracefully handle information the AI is unable to extract

## Screenshots:

## Stack:
Frontend: Next.js
Backend: Node.js
Database: Supabase
AI: Anthropic Claude API
Deployment: Vercel
Other: Tailwind
