# Database

1. Create a PostgreSQL database.
2. Run `schema.sql`.
3. Run `seed.sql`.
4. Set `DATABASE_URL` in backend `.env`.

The indexes are designed for fast filtering/sorting/searching. For production growth beyond 10K students, keep filtering, sorting and pagination on the database server; do not send all records to the browser.