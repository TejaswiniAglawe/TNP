const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function fetchStudents(params={}) {
  const qs = new URLSearchParams(params).toString();
  const response = await fetch(`${API}/students?${qs}`);
  if (!response.ok) throw new Error("Unable to load students");
  return response.json();
}

export function exportStudentsCSV(rows) {
  const header=["Roll No","Name","Email","Branch","CGPA","Status","Package","Year"];
  const data=[header,...rows.map(x=>[x.roll,x.name,x.email,x.branch,x.cgpa,x.status,x.package?`${x.package} LPA`:"",x.year])];
  const csv=data.map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
  const blob=new Blob([csv],{type:"text/csv"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a"); a.href=url; a.download="tnp-students.csv"; a.click();
  URL.revokeObjectURL(url);
}