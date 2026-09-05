# TNP Nexus Architecture

```text
Browser
  |
  v
React/Vite Frontend
  |
  | REST/JSON
  v
Node.js + Express API
  |       |        |
  v       v        v
Students Companies Drives
  |
  v
PostgreSQL
  |
  +--> indexes for branch/status/cgpa/name/roll
  +--> pg_trgm search index
  |
Redis (recommended)
  |
Analytics / dashboard cache
```

## Key design decision

10K+ does not mean the browser should hold 10K rows at once. The API returns only the requested page (for example 50 rows). Filtering and sorting happen in PostgreSQL, keeping memory and network usage low.

## Roles

- Admin: full control
- Placement Officer: student, company and drive management
- Faculty: view/filter assigned students
- Recruiter: view eligible candidates for approved drives
- Student: own profile, applications and placement status

## Suggested next production modules

1. Authentication + SSO
2. Student bulk import/export
3. Resume upload and parsing
4. Eligibility-rule engine
5. Placement drive registration
6. Offer letter management
7. Attendance/training tracking
8. Notifications/email
9. Analytics and reports
10. Audit trail
