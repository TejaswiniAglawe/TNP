-- Demo seed: 10,248 student rows.
INSERT INTO students
(roll_no,name,email,branch,cgpa,skills,placement_status,package_lpa,graduation_year,company)
SELECT
  'TNP'||LPAD(g::text,5,'0'),
  (ARRAY['Aarav','Aditi','Ananya','Arjun','Diya','Ishaan','Kabir','Meera','Nisha','Riya','Rahul','Sakshi','Tanvi','Vivek','Yash','Zoya'])[((g-1)%16)+1]
    ||' '||(ARRAY['Sharma','Patil','Agrawal','Kulkarni','Joshi','Verma','Gupta','Deshmukh','Singh','Mehta','Rao','Mishra'])[((g*7-1)%12)+1],
  'student'||g||'@college.edu',
  (ARRAY['CSE','IT','ECE','ME','CIVIL','EEE'])[((g*3-1)%6)+1],
  ROUND((6.2+((g*37)%39)/10.0)::numeric,2),
  ARRAY['Java','SQL'],
  CASE WHEN g%13<8 THEN 'Placed' WHEN g%13<10 THEN 'Eligible' WHEN g%13=10 THEN 'In Process' ELSE 'Not Eligible' END,
  CASE WHEN g%13<8 THEN (ARRAY[4.5,6,8,10,12,18,24,42])[(g%8)+1] ELSE NULL END,
  2026+(g%2),
  CASE WHEN g%13<8 THEN (ARRAY['TechNova','CloudSphere','FinEdge','DataGrid'])[(g%4)+1] ELSE NULL END
FROM generate_series(1,10248) g
ON CONFLICT (roll_no) DO NOTHING;