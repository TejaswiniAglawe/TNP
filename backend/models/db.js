import pg from "pg";
const {Pool}=pg;
export const pool=new Pool({
  connectionString:process.env.DATABASE_URL,
  max:Number(process.env.DB_POOL_MAX||20),
  idleTimeoutMillis:30000,
  connectionTimeoutMillis:5000
});