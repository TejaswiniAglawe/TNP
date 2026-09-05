import React, { useMemo, useState } from "react";
import {
  Activity, BarChart3, Bell, Building2, ChevronLeft, ChevronRight,
  Download, Filter, GraduationCap, LayoutDashboard, LogOut, Menu,
  Search, Settings, ShieldCheck, SlidersHorizontal, Sparkles, Users,
  X, BriefcaseBusiness
} from "lucide-react";
import { exportStudentsCSV, fetchStudents } from "./services/api";

const branches = ["CSE","IT","ECE","ME","CIVIL","EEE"];
const statuses = ["Placed","Eligible","In Process","Not Eligible"];
const skills = ["Java","Python","SQL","React","AWS","Figma","Node.js","Excel","Power BI","C++"];
const first = ["Aarav","Aditi","Ananya","Arjun","Diya","Ishaan","Kabir","Meera","Nisha","Riya","Rahul","Sakshi","Tanvi","Vivek","Yash","Zoya","Aditya","Neha","Karan","Priya"];
const last = ["Sharma","Patil","Agrawal","Kulkarni","Joshi","Verma","Gupta","Deshmukh","Singh","Mehta","Rao","Mishra"];

function makeStudents(count=10248){
  return Array.from({length:count},(_,i)=>{
    const name=`${first[i%first.length]} ${last[(i*7)%last.length]}`;
    const cgpa=+(6.2+((i*37)%39)/10).toFixed(2);
    const status=i%13<8?"Placed":i%13<10?"Eligible":i%13===10?"In Process":"Not Eligible";
    return {
      id:i+1,name,roll:`TNP${String(i+1).padStart(5,"0")}`,
      email:name.toLowerCase().replaceAll(" ",".")+`${i+1}@college.edu`,
      branch:branches[(i*3)%branches.length],cgpa,status,
      year:2026+(i%2),
      package:status==="Placed"?[4.5,6,8,10,12,18,24,42][i%8]:0,
      skills:[skills[i%skills.length],skills[(i+3)%skills.length]]
    };
  });
}

function Avatar({name}){ return <div className="avatar-sm">{name.split(" ").map(x=>x[0]).join("")}</div> }

function App(){
  const [students] = useState(makeStudents());
  const [active,setActive]=useState("Dashboard");
  const [query,setQuery]=useState("");
  const [branch,setBranch]=useState("");
  const [status,setStatus]=useState("");
  const [sort,setSort]=useState("name");
  const [page,setPage]=useState(1);
  const [selected,setSelected]=useState(null);
  const [mobile,setMobile]=useState(false);
  const pageSize=12;

  const filtered=useMemo(()=>{
    let arr=students.filter(s=>{
      const q=query.toLowerCase();
      return (!q || `${s.name} ${s.roll} ${s.email} ${s.branch}`.toLowerCase().includes(q))
        &&(!branch||s.branch===branch)&&(!status||s.status===status);
    });
    arr.sort((a,b)=>sort==="name"?a.name.localeCompare(b.name):sort==="cgpa"?b.cgpa-a.cgpa:sort==="package"?b.package-a.package:b.year-a.year);
    return arr;
  },[students,query,branch,status,sort]);

  const pages=Math.max(1,Math.ceil(filtered.length/pageSize));
  const rows=filtered.slice((page-1)*pageSize,page*pageSize);
  const placed=students.filter(s=>s.status==="Placed").length;
  const rate=(placed/students.length*100).toFixed(1);

  function reset(){setQuery("");setBranch("");setStatus("");setSort("name");setPage(1)}
  function csv(){exportStudentsCSV(filtered)}
  function go(n){setPage(Math.max(1,Math.min(pages,n)))}

  const nav=[
    ["Dashboard",LayoutDashboard],["Students",Users],["Companies",Building2],
    ["Placement Drives",BriefcaseBusiness],["Analytics",BarChart3],["Settings",Settings]
  ];

  return <div className="app">
    <aside className={`sidebar ${mobile?"mobile-open":""}`}>
      <div className="brand"><div className="brand-logo">T</div><div><b>TNP</b><small>NEXUS</small></div></div>
      <div className="nav-label">WORKSPACE</div>
      <nav>{nav.map(([label,Icon])=><button key={label} className={active===label?"active":""} onClick={()=>{setActive(label);setMobile(false)}}><Icon size={17}/><span>{label}</span></button>)}</nav>
      <div className="system"><span className="online"></span><div><small>System status</small><b>Operational</b></div></div>
      <button className="logout"><LogOut size={16}/> Sign out</button>
    </aside>

    <main className="main">
      <header className="topbar">
        <div><p className="eyebrow">TRAINING & PLACEMENT CELL</p><h1>{active==="Dashboard"?"Good afternoon, TNP Team":active}</h1></div>
        <div className="top-actions"><button className="icon-btn"><Search size={18}/></button><button className="icon-btn"><Bell size={17}/><i/></button><div className="profile"><div className="profile-avatar">TA</div><div><b>TNP Admin</b><small>Placement Officer</small></div></div><button className="menu-btn" onClick={()=>setMobile(!mobile)}><Menu/></button></div>
      </header>

      <section className="stats">
        <Stat icon={<Users/>} label="Total Students" value="10,248" note="+4.8% this semester"/>
        <Stat icon={<ShieldCheck/>} label="Placed Students" value={placed.toLocaleString()} note={`${rate}% placement rate`} green/>
        <Stat icon={<Building2/>} label="Active Companies" value="186" note="24 drives this month" violet/>
        <Stat icon={<Sparkles/>} label="Highest Package" value="₹42 LPA" note="+18% vs last year" orange/>
      </section>

      <section className="hero">
        <div className="hero-copy"><span className="live-pill">● LIVE PLACEMENT SEASON</span><h2>One portal.<br/><em>Every opportunity.</em></h2><p>Manage 10K+ student profiles, placement eligibility, drives and outcomes from one intelligent workspace.</p><button className="primary" onClick={()=>document.getElementById("students").scrollIntoView({behavior:"smooth"})}>Explore Student Database →</button></div>
        <div className="hero-visual"><div className="ring ring-a"/><div className="ring ring-b"/><div className="center-orb">TNP</div><div className="float-card one"><b>10K+</b><small>student records</small></div><div className="float-card two"><b>186</b><small>hiring partners</small></div></div>
      </section>

      <section id="students" className="panel-section">
        <div className="section-head"><div><p className="eyebrow">STUDENT DIRECTORY</p><h2>Student Intelligence</h2></div><button className="secondary" onClick={csv}><Download size={15}/> Export CSV</button></div>
        <div className="toolbar">
          <div className="search-box"><Search size={17}/><input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Search name, roll number, email, branch..."/></div>
          <select value={branch} onChange={e=>{setBranch(e.target.value);setPage(1)}}><option value="">All Branches</option>{branches.map(x=><option key={x}>{x}</option>)}</select>
          <select value={status} onChange={e=>{setStatus(e.target.value);setPage(1)}}><option value="">All Status</option>{statuses.map(x=><option key={x}>{x}</option>)}</select>
          <select value={sort} onChange={e=>setSort(e.target.value)}><option value="name">Sort: Name</option><option value="cgpa">Sort: CGPA</option><option value="package">Sort: Package</option><option value="year">Sort: Year</option></select>
          <button className="reset" onClick={reset}><Filter size={14}/> Reset</button>
        </div>
        <div className="table-meta"><span>Showing {filtered.length?((page-1)*pageSize+1):0}–{Math.min(page*pageSize,filtered.length)} of {filtered.length.toLocaleString()}</span><span>⚡ Optimized for 10K+ records</span></div>
        <div className="table-wrap"><table><thead><tr><th><input type="checkbox"/></th><th>Student</th><th>Roll No.</th><th>Branch</th><th>CGPA</th><th>Skills</th><th>Status</th><th>Package</th><th/></tr></thead><tbody>
          {rows.map(s=><tr key={s.id}><td><input type="checkbox"/></td><td><div className="student"><Avatar name={s.name}/><div><b>{s.name}</b><small>{s.email}</small></div></div></td><td>{s.roll}</td><td>{s.branch}</td><td><b>{s.cgpa}</b></td><td><div className="skills">{s.skills.map(k=><span key={k}>{k}</span>)}</div></td><td><Status value={s.status}/></td><td>{s.package?`₹${s.package} LPA`:"—"}</td><td><button className="view" onClick={()=>setSelected(s)}>View</button></td></tr>)}
        </tbody></table></div>
        <div className="pagination"><button onClick={()=>go(page-1)} disabled={page===1}><ChevronLeft size={14}/></button>{Array.from({length:Math.min(5,pages)},(_,i)=><button key={i} className={page===i+1?"current":""} onClick={()=>go(i+1)}>{i+1}</button>)}{pages>5&&<><span>…</span><button onClick={()=>go(pages)}>{pages}</button></>}<button onClick={()=>go(page+1)} disabled={page===pages}><ChevronRight size={14}/></button></div>
      </section>

      <section className="panel-section"><div className="section-head"><div><p className="eyebrow">LIVE OVERVIEW</p><h2>Placement Analytics</h2></div><span className="updated">● Updated just now</span></div>
        <div className="analytics-grid">
          <ChartCard title="Placement Progress" sub="2026 Batch"><div className="progress"><div><b>{rate}%</b><small>PLACED</small></div></div><div className="legend"><span>● Placed {placed.toLocaleString()}</span><span>● Remaining {(students.length-placed).toLocaleString()}</span></div></ChartCard>
          <ChartCard title="Students by Branch" sub="Total 10,248"><div className="bars">{branches.slice(0,5).map((b,i)=><div key={b}><label>{b}<b>{[32,24,18,13,13][i]}%</b></label><div className="bar"><i style={{width:`${[82,64,48,35,35][i]}%`}}/></div></div>)}</div></ChartCard>
          <ChartCard title="Top Hiring Partners" sub="Offers"><div className="company-list">{[["TechNova","824"],["CloudSphere","642"],["FinEdge","518"],["DataGrid","403"]].map(x=><div key={x[0]}><b>{x[0]}</b><span>{x[1]} offers</span></div>)}</div></ChartCard>
        </div>
      </section>
      <footer>© 2026 TNP Nexus · Training & Placement Cell · Built for scale</footer>
    </main>

    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}><X/></button><Avatar name={selected.name}/><h2>{selected.name}</h2><p>{selected.roll} · {selected.branch} · Class of {selected.year}</p><div className="detail-grid">{[["CGPA",selected.cgpa],["STATUS",selected.status],["PACKAGE",selected.package?`₹${selected.package} LPA`:"Not placed"],["EMAIL",selected.email],["SKILLS",selected.skills.join(" · ")],["ELIGIBILITY","Verified"]].map(x=><div key={x[0]}><small>{x[0]}</small><b>{x[1]}</b></div>)}</div></div></div>}
  </div>
}

function Stat({icon,label,value,note,green,violet,orange}){return <div className={`stat ${green?"green":violet?"violet":orange?"orange":""}`}><div className="stat-icon">{icon}</div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>}
function Status({value}){return <span className={`badge ${value.toLowerCase().replaceAll(" ","-")}`}>{value}</span>}
function ChartCard({title,sub,children}){return <div className="chart-card"><div className="chart-head"><b>{title}</b><span>{sub}</span></div>{children}</div>}

export default App;