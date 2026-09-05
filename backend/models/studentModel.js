import { pool } from "./db.js";

export async function listStudents({page=1,limit=50,search="",branch="",status="",sort="name",order="asc"}){
  const allowedSort={name:"name",cgpa:"cgpa",package:"package_lpa",year:"graduation_year"};
  const column=allowedSort[sort]||"name";
  const direction=order.toLowerCase()==="desc"?"DESC":"ASC";
  const values=[]; const where=[];
  if(search){values.push(`%${search}%`);where.push(`(name ILIKE $${values.length} OR roll_no ILIKE $${values.length} OR email ILIKE $${values.length})`)}
  if(branch){values.push(branch);where.push(`branch=$${values.length}`)}
  if(status){values.push(status);where.push(`placement_status=$${values.length}`)}
  const filter=where.length?`WHERE ${where.join(" AND ")}`:"";
  const offset=(Number(page)-1)*Number(limit);
  values.push(Number(limit),offset);
  const sql=`SELECT id,roll_no,name,email,branch,cgpa,skills,placement_status,package_lpa,graduation_year,company FROM students ${filter} ORDER BY ${column} ${direction} NULLS LAST LIMIT $${values.length-1} OFFSET $${values.length}`;
  const countSql=`SELECT COUNT(*)::int AS total FROM students ${filter}`;
  const [data,count]=await Promise.all([pool.query(sql,values),pool.query(countSql,values.slice(0,-2))]);
  return {rows:data.rows,total:count.rows[0].total,page:Number(page),limit:Number(limit)};
}