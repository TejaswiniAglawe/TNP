import React, { useMemo, useState } from "react";

import {
  LayoutDashboard,
  Users,
  Building2,
  BriefcaseBusiness,
  BarChart3,
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  GraduationCap,
  IndianRupee,
  TrendingUp,
  UserCheck,
  X,
  Menu,
  ArrowUpDown,
  CalendarDays,
  MapPin,
  Mail,
  Phone,
  Award,
  Activity,
  Target,
  FileText
} from "lucide-react";

const BRANCHES = ["CSE", "IT", "ECE", "EEE", "ME", "Civil", "AIDS"];

const STATUSES = ["Placed", "Eligible", "Not Eligible", "Higher Studies"];

const companies = [
  {
    name: "TCS",
    role: "Software Engineer",
    package: "7.2 LPA",
    openings: 120,
    color: "blue"
  },
  {
    name: "Infosys",
    role: "Systems Engineer",
    package: "6.5 LPA",
    openings: 85,
    color: "purple"
  },
  {
    name: "Accenture",
    role: "Associate Software Engineer",
    package: "7.0 LPA",
    openings: 70,
    color: "orange"
  },
  {
    name: "Deloitte",
    role: "Analyst",
    package: "8.5 LPA",
    openings: 42,
    color: "green"
  },
  {
    name: "Amazon",
    role: "SDE Intern",
    package: "12 LPA",
    openings: 18,
    color: "yellow"
  }
];

const drives = [
  {
    company: "TCS",
    role: "Graduate Engineer",
    date: "12 Sep 2026",
    venue: "Main Auditorium",
    status: "Upcoming"
  },
  {
    company: "Deloitte",
    role: "Business Analyst",
    date: "16 Sep 2026",
    venue: "Seminar Hall",
    status: "Upcoming"
  },
  {
    company: "Infosys",
    role: "Systems Engineer",
    date: "21 Sep 2026",
    venue: "CSE Block",
    status: "Registration Open"
  },
  {
    company: "Accenture",
    role: "ASE",
    date: "27 Sep 2026",
    venue: "Main Auditorium",
    status: "Upcoming"
  }
];

function generateStudents() {
  const firstNames = [
    "Aarav",
    "Aditya",
    "Ananya",
    "Arjun",
    "Ishita",
    "Kavya",
    "Rahul",
    "Riya",
    "Sneha",
    "Yash",
    "Priya",
    "Rohan"
  ];

  const lastNames = [
    "Sharma",
    "Patil",
    "Agrawal",
    "Verma",
    "Gupta",
    "Kulkarni",
    "Joshi",
    "Deshmukh",
    "Singh",
    "Mehta"
  ];

  const students = [];

  for (let i = 1; i <= 10248; i++) {
    const first = firstNames[i % firstNames.length];
    const last = lastNames[i % lastNames.length];

    const branch = BRANCHES[i % BRANCHES.length];

    let status;

    if (i % 5 === 0) {
      status = "Placed";
    } else if (i % 17 === 0) {
      status = "Higher Studies";
    } else if (i % 13 === 0) {
      status = "Not Eligible";
    } else {
      status = "Eligible";
    }

    const cgpa = (7 + ((i * 17) % 30) / 10).toFixed(2);

    const packageValue =
      status === "Placed"
        ? (4.5 + ((i * 13) % 80) / 10).toFixed(1)
        : "-";

    students.push({
      id: i,
      roll: `TNP${String(i).padStart(5, "0")}`,
      name: `${first} ${last}`,
      branch,
      year: 2027,
      cgpa,
      status,
      package: packageValue,
      email: `${first.toLowerCase()}${i}@college.edu`,
      phone: `+91 9${String(100000000 + i).slice(0, 9)}`,
      skills:
        branch === "CSE" || branch === "IT"
          ? ["Java", "Python", "SQL"]
          : ["Communication", "AutoCAD", "Excel"]
    });
  }

  return students;
}

const ALL_STUDENTS = generateStudents();

function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const pageSize = 10;

  const filteredStudents = useMemo(() => {
    let data = ALL_STUDENTS.filter((student) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(searchText) ||
        student.roll.toLowerCase().includes(searchText) ||
        student.branch.toLowerCase().includes(searchText);

      const matchesBranch =
        branch === "All" || student.branch === branch;

      const matchesStatus =
        status === "All" || student.status === status;

      return matchesSearch && matchesBranch && matchesStatus;
    });

    data.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];

      if (sortBy === "cgpa") {
        valueA = Number(valueA);
        valueB = Number(valueB);
      }

      if (sortBy === "package") {
        valueA = valueA === "-" ? 0 : Number(valueA);
        valueB = valueB === "-" ? 0 : Number(valueB);
      }

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;

      return 0;
    });

    return data;
  }, [search, branch, status, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredStudents.length / pageSize);

  const visibleStudents = filteredStudents.slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize
  );

  function handleSort(field) {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  }

  function resetFilters() {
    setSearch("");
    setBranch("All");
    setStatus("All");
    setPageNumber(1);
  }

  function exportCSV() {
    const headers = [
      "Roll No",
      "Name",
      "Branch",
      "CGPA",
      "Status",
      "Package"
    ];

    const rows = filteredStudents.map((student) => [
      student.roll,
      student.name,
      student.branch,
      student.cgpa,
      student.status,
      student.package
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "tnp-students.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      id: "students",
      label: "Students",
      icon: Users
    },
    {
      id: "companies",
      label: "Companies",
      icon: Building2
    },
    {
      id: "drives",
      label: "Placement Drives",
      icon: BriefcaseBusiness
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3
    }
  ];

  return (
    <div className="app">

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>

        <div className="brand">
          <div className="brand-icon">
            <GraduationCap size={25} />
          </div>

          <div>
            <h1>TNP</h1>
            <span>Training & Placement</span>
          </div>
        </div>

        <div className="nav-section">
          <p className="nav-title">MAIN MENU</p>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`nav-item ${
                  page === item.id ? "active" : ""
                }`}
                onClick={() => {
                  setPage(item.id);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="sidebar-bottom">

          <div className="help-card">
            <Target size={22} />

            <div>
              <strong>Placement Target</strong>
              <span>72% achieved</span>
            </div>

            <div className="mini-progress">
              <div style={{ width: "72%" }} />
            </div>
          </div>

          <div className="admin-profile">
            <div className="avatar">TA</div>

            <div>
              <strong>TNP Admin</strong>
              <span>Placement Cell</span>
            </div>

            <ChevronDown size={16} />
          </div>

        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="main">

        <header className="topbar">

          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="topbar-title">
            <span>Training & Placement Cell</span>
            <h2>
              {page === "dashboard" && "Placement Overview"}
              {page === "students" && "Student Directory"}
              {page === "companies" && "Recruiting Companies"}
              {page === "drives" && "Placement Drives"}
              {page === "analytics" && "Placement Analytics"}
            </h2>
          </div>

          <div className="topbar-actions">

            <div className="top-search">
              <Search size={17} />
              <input
                placeholder="Search students..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage("students");
                  setPageNumber(1);
                }}
              />
            </div>

            <button className="icon-button">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>

            <div className="profile">
              <div className="avatar">TA</div>

              <div>
                <strong>Administrator</strong>
                <span>TNP Cell</span>
              </div>

              <ChevronDown size={16} />
            </div>

          </div>

        </header>

        <div className="content">

          {page === "dashboard" && (
            <Dashboard
              setPage={setPage}
              setSelectedStudent={setSelectedStudent}
            />
          )}

          {page === "students" && (
            <StudentsPage
              search={search}
              setSearch={setSearch}
              branch={branch}
              setBranch={setBranch}
              status={status}
              setStatus={setStatus}
              resetFilters={resetFilters}
              filteredStudents={filteredStudents}
              visibleStudents={visibleStudents}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPages={totalPages}
              handleSort={handleSort}
              sortBy={sortBy}
              exportCSV={exportCSV}
              setSelectedStudent={setSelectedStudent}
            />
          )}

          {page === "companies" && (
            <CompaniesPage />
          )}

          {page === "drives" && (
            <DrivesPage />
          )}

          {page === "analytics" && (
            <AnalyticsPage />
          )}

        </div>

      </main>

      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          close={() => setSelectedStudent(null)}
        />
      )}

    </div>
  );
}

function Dashboard({ setPage, setSelectedStudent }) {

  const placed = ALL_STUDENTS.filter(
    (s) => s.status === "Placed"
  ).length;

  const eligible = ALL_STUDENTS.filter(
    (s) => s.status === "Eligible"
  ).length;

  const placementRate = Math.round(
    (placed / (placed + eligible)) * 100
  );

  const recentStudents = ALL_STUDENTS.slice(0, 6);

  return (
    <div className="dashboard">

      <section className="welcome">

        <div>
          <span className="eyebrow">ACADEMIC YEAR 2026–27</span>

          <h1>
            Manage your placement
            <br />
            <span>journey smarter.</span>
          </h1>

          <p>
            Track students, recruiters and placement drives
            from one powerful TNP platform.
          </p>

          <div className="welcome-actions">

            <button
              className="primary-button"
              onClick={() => setPage("students")}
            >
              <Users size={17} />
              View Students
            </button>

            <button
              className="secondary-button"
              onClick={() => setPage("drives")}
            >
              <BriefcaseBusiness size={17} />
              Placement Drives
            </button>

          </div>
        </div>

        <div className="welcome-visual">

          <div className="visual-circle">
            <GraduationCap size={75} />
          </div>

          <div className="floating-card one">
            <TrendingUp size={17} />
            <div>
              <strong>+18.4%</strong>
              <span>Placement growth</span>
            </div>
          </div>

          <div className="floating-card two">
            <UserCheck size={17} />
            <div>
              <strong>{placed.toLocaleString()}</strong>
              <span>Students placed</span>
            </div>
          </div>

        </div>

      </section>

      <section className="stats-grid">

        <StatCard
          icon={Users}
          title="Total Students"
          value="10,248"
          change="+8.2%"
          subtitle="vs last year"
        />

        <StatCard
          icon={UserCheck}
          title="Students Placed"
          value={placed.toLocaleString()}
          change="+14.6%"
          subtitle="this academic year"
        />

        <StatCard
          icon={IndianRupee}
          title="Average Package"
          value="₹7.4 LPA"
          change="+11.2%"
          subtitle="across all branches"
        />

        <StatCard
          icon={Building2}
          title="Recruiting Companies"
          value="84"
          change="+21"
          subtitle="this placement season"
        />

      </section>

      <div className="dashboard-grid">

        <section className="panel placement-chart">

          <div className="panel-header">
            <div>
              <span className="panel-label">PLACEMENT PERFORMANCE</span>
              <h3>Placement overview</h3>
            </div>

            <select>
              <option>2026–27</option>
              <option>2025–26</option>
              <option>2024–25</option>
            </select>
          </div>

          <div className="chart-area">

            <div className="chart-y">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            <div className="bars">

              {[55, 63, 68, 74, 81, 88, 94].map(
                (height, index) => (
                  <div className="bar-wrapper" key={index}>

                    <div className="bar-value">
                      {height}%
                    </div>

                    <div
                      className="bar"
                      style={{ height: `${height}%` }}
                    />

                    <span>
                      {
                        [
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                          "Jan",
                          "Feb"
                        ][index]
                      }
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

        </section>

        <section className="panel">

          <div className="panel-header">
            <div>
              <span className="panel-label">TARGET</span>
              <h3>Placement rate</h3>
            </div>

            <Activity size={20} />
          </div>

          <div className="rate-container">

            <div className="donut">
              <div>
                <strong>{placementRate}%</strong>
                <span>Placed</span>
              </div>
            </div>

            <div className="rate-info">

              <div>
                <span>
                  <i className="dot placed" />
                  Placed
                </span>
                <strong>{placed}</strong>
              </div>

              <div>
                <span>
                  <i className="dot eligible" />
                  Eligible
                </span>
                <strong>{eligible}</strong>
              </div>

            </div>

          </div>

          <div className="target-message">
            <TrendingUp size={16} />
            <span>
              You're <strong>12%</strong> ahead of last year.
            </span>
          </div>

        </section>

      </div>

      <div className="dashboard-grid bottom-grid">

        <section className="panel">

          <div className="panel-header">

            <div>
              <span className="panel-label">
                RECENT STUDENTS
              </span>
              <h3>Student activity</h3>
            </div>

            <button
              className="text-button"
              onClick={() => setPage("students")}
            >
              View all →
            </button>

          </div>

          <div className="student-list">

            {recentStudents.map((student) => (
              <div
                className="student-row"
                key={student.id}
                onClick={() => setSelectedStudent(student)}
              >

                <div className="student-avatar">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div className="student-main">
                  <strong>{student.name}</strong>
                  <span>
                    {student.roll} · {student.branch}
                  </span>
                </div>

                <div className="student-cgpa">
                  <strong>{student.cgpa}</strong>
                  <span>CGPA</span>
                </div>

                <StatusBadge status={student.status} />

              </div>
            ))}

          </div>

        </section>

        <section className="panel">

          <div className="panel-header">

            <div>
              <span className="panel-label">
                UPCOMING
              </span>
              <h3>Placement drives</h3>
            </div>

            <button
              className="text-button"
              onClick={() => setPage("drives")}
            >
              View all →
            </button>

          </div>

          <div className="drive-list">

            {drives.slice(0, 4).map((drive) => (
              <div className="drive-row" key={drive.company}>

                <div className="company-logo">
                  {drive.company.charAt(0)}
                </div>

                <div className="drive-info">
                  <strong>{drive.company}</strong>
                  <span>{drive.role}</span>
                </div>

                <div className="drive-date">
                  <CalendarDays size={14} />
                  {drive.date}
                </div>

              </div>
            ))}

          </div>

        </section>

      </div>

    </div>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
  change,
  subtitle
}) {
  return (
    <div className="stat-card">

      <div className="stat-top">

        <div className="stat-icon">
          <Icon size={20} />
        </div>

        <span className="stat-change">
          {change}
        </span>

      </div>

      <strong className="stat-value">{value}</strong>

      <div className="stat-title">{title}</div>

      <span className="stat-subtitle">{subtitle}</span>

    </div>
  );
}

function StudentsPage({
  search,
  setSearch,
  branch,
  setBranch,
  status,
  setStatus,
  resetFilters,
  filteredStudents,
  visibleStudents,
  pageNumber,
  setPageNumber,
  totalPages,
  handleSort,
  sortBy,
  exportCSV,
  setSelectedStudent
}) {
  return (
    <div>

      <div className="page-intro">

        <div>
          <span className="eyebrow">STUDENT MANAGEMENT</span>
          <h1>Student Directory</h1>
          <p>
            Search, filter and manage all 10,248 student records.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={exportCSV}
        >
          <Download size={17} />
          Export CSV
        </button>

      </div>

      <section className="panel student-panel">

        <div className="filter-bar">

          <div className="large-search">
            <Search size={18} />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPageNumber(1);
              }}
              placeholder="Search by name, roll number or branch..."
            />
          </div>

          <select
            value={branch}
            onChange={(e) => {
              setBranch(e.target.value);
              setPageNumber(1);
            }}
          >
            <option>All</option>
            {BRANCHES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPageNumber(1);
            }}
          >
            <option>All</option>
            {STATUSES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <button
            className="clear-button"
            onClick={resetFilters}
          >
            Clear
          </button>

        </div>

        <div className="table-top">

          <span>
            Showing{" "}
            <strong>
              {filteredStudents.length === 0
                ? 0
                : (pageNumber - 1) * 10 + 1}
              –
              {Math.min(
                pageNumber * 10,
                filteredStudents.length
              )}
            </strong>{" "}
            of{" "}
            <strong>
              {filteredStudents.length.toLocaleString()}
            </strong>{" "}
            students
          </span>

          <span className="performance">
            <Activity size={15} />
            Live directory
          </span>

        </div>

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>
                  <button
                    onClick={() => handleSort("name")}
                  >
                    STUDENT
                    <ArrowUpDown size={13} />
                  </button>
                </th>

                <th>BRANCH</th>

                <th>
                  <button
                    onClick={() => handleSort("cgpa")}
                  >
                    CGPA
                    <ArrowUpDown size={13} />
                  </button>
                </th>

                <th>STATUS</th>

                <th>
                  <button
                    onClick={() => handleSort("package")}
                  >
                    PACKAGE
                    <ArrowUpDown size={13} />
                  </button>
                </th>

                <th>ACTION</th>

              </tr>

            </thead>

            <tbody>

              {visibleStudents.map((student) => (

                <tr key={student.id}>

                  <td>

                    <div className="table-student">

                      <div className="student-avatar">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      <div>
                        <strong>{student.name}</strong>
                        <span>{student.roll}</span>
                      </div>

                    </div>

                  </td>

                  <td>
                    <span className="branch-pill">
                      {student.branch}
                    </span>
                  </td>

                  <td>
                    <strong>{student.cgpa}</strong>
                  </td>

                  <td>
                    <StatusBadge status={student.status} />
                  </td>

                  <td>
                    {student.package !== "-"
                      ? `₹${student.package} LPA`
                      : "—"}
                  </td>

                  <td>

                    <button
                      className="view-button"
                      onClick={() =>
                        setSelectedStudent(student)
                      }
                    >
                      <Eye size={15} />
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="pagination">

          <span>
            Page {pageNumber} of {totalPages}
          </span>

          <div>

            <button
              disabled={pageNumber === 1}
              onClick={() =>
                setPageNumber(pageNumber - 1)
              }
            >
              <ChevronLeft size={17} />
            </button>

            <button
              disabled={pageNumber === totalPages}
              onClick={() =>
                setPageNumber(pageNumber + 1)
              }
            >
              <ChevronRight size={17} />
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

function StatusBadge({ status }) {

  const className = status
    .toLowerCase()
    .replaceAll(" ", "-");

  return (
    <span className={`status ${className}`}>
      <i />
      {status}
    </span>
  );
}

function StudentModal({ student, close }) {

  return (
    <div className="modal-overlay" onClick={close}>

      <div
        className="student-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-header">

          <div>
            <span className="panel-label">
              STUDENT PROFILE
            </span>
            <h2>Student Details</h2>
          </div>

          <button
            className="close-button"
            onClick={close}
          >
            <X size={20} />
          </button>

        </div>

        <div className="profile-hero">

          <div className="profile-avatar">
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>

          <div>
            <h2>{student.name}</h2>
            <span>
              {student.roll} · {student.branch}
            </span>
          </div>

          <StatusBadge status={student.status} />

        </div>

        <div className="profile-grid">

          <ProfileItem
            icon={GraduationCap}
            label="Branch"
            value={student.branch}
          />

          <ProfileItem
            icon={Award}
            label="CGPA"
            value={student.cgpa}
          />

          <ProfileItem
            icon={CalendarDays}
            label="Graduation Year"
            value={student.year}
          />

          <ProfileItem
            icon={IndianRupee}
            label="Package"
            value={
              student.package === "-"
                ? "Not placed"
                : `₹${student.package} LPA`
            }
          />

          <ProfileItem
            icon={Mail}
            label="Email"
            value={student.email}
          />

          <ProfileItem
            icon={Phone}
            label="Phone"
            value={student.phone}
          />

        </div>

        <div className="skills-section">

          <span className="panel-label">SKILLS</span>

          <div className="skill-list">

            {student.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}

          </div>

        </div>

        <div className="modal-actions">

          <button className="secondary-button">
            <FileText size={16} />
            View Resume
          </button>

          <button className="primary-button">
            <Mail size={16} />
            Contact Student
          </button>

        </div>

      </div>

    </div>
  );
}

function ProfileItem({ icon: Icon, label, value }) {

  return (
    <div className="profile-item">

      <div className="profile-item-icon">
        <Icon size={17} />
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

    </div>
  );
}

function CompaniesPage() {

  return (
    <div>

      <div className="page-intro">

        <div>
          <span className="eyebrow">
            RECRUITMENT PARTNERS
          </span>

          <h1>Companies</h1>

          <p>
            Organizations actively recruiting from your campus.
          </p>
        </div>

        <button className="primary-button">
          <Building2 size={17} />
          Add Company
        </button>

      </div>

      <div className="company-grid">

        {companies.map((company) => (

          <div className="company-card" key={company.name}>

            <div className={`company-big-logo ${company.color}`}>
              {company.name.charAt(0)}
            </div>

            <h3>{company.name}</h3>

            <span className="company-role">
              {company.role}
            </span>

            <div className="company-details">

              <div>
                <span>Package</span>
                <strong>{company.package}</strong>
              </div>

              <div>
                <span>Openings</span>
                <strong>{company.openings}</strong>
              </div>

            </div>

            <button className="outline-button">
              View Recruitment
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

function DrivesPage() {

  return (
    <div>

      <div className="page-intro">

        <div>
          <span className="eyebrow">
            CAMPUS RECRUITMENT
          </span>

          <h1>Placement Drives</h1>

          <p>
            Manage upcoming and active recruitment drives.
          </p>
        </div>

        <button className="primary-button">
          <BriefcaseBusiness size={17} />
          Create Drive
        </button>

      </div>

      <div className="drive-cards">

        {drives.map((drive, index) => (

          <div className="drive-card" key={drive.company}>

            <div className="drive-card-top">

              <div className="company-logo large">
                {drive.company.charAt(0)}
              </div>

              <span className="drive-status">
                {drive.status}
              </span>

            </div>

            <h2>{drive.company}</h2>

            <p>{drive.role}</p>

            <div className="drive-meta">

              <span>
                <CalendarDays size={16} />
                {drive.date}
              </span>

              <span>
                <MapPin size={16} />
                {drive.venue}
              </span>

            </div>

            <button className="primary-button full">
              View Drive
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

function AnalyticsPage() {

  const branchData = [
    ["CSE", 86],
    ["IT", 82],
    ["ECE", 71],
    ["EEE", 64],
    ["ME", 58],
    ["Civil", 52],
    ["AIDS", 79]
  ];

  return (
    <div>

      <div className="page-intro">

        <div>
          <span className="eyebrow">
            DATA & INSIGHTS
          </span>

          <h1>Placement Analytics</h1>

          <p>
            Understand placement performance across branches.
          </p>
        </div>

        <button className="secondary-button">
          <Download size={17} />
          Export Report
        </button>

      </div>

      <div className="analytics-grid">

        <div className="analytics-number">
          <TrendingUp size={21} />
          <span>Placement Rate</span>
          <strong>78.4%</strong>
          <small>+12.8% from last year</small>
        </div>

        <div className="analytics-number">
          <IndianRupee size={21} />
          <span>Highest Package</span>
          <strong>₹24 LPA</strong>
          <small>Software Engineering</small>
        </div>

        <div className="analytics-number">
          <Building2 size={21} />
          <span>Recruiters</span>
          <strong>84</strong>
          <small>21 new this year</small>
        </div>

        <div className="analytics-number">
          <Users size={21} />
          <span>Applications</span>
          <strong>8,932</strong>
          <small>Across all drives</small>
        </div>

      </div>

      <section className="panel analytics-panel">

        <div className="panel-header">

          <div>
            <span className="panel-label">
              BRANCH PERFORMANCE
            </span>

            <h3>Placement rate by branch</h3>
          </div>

        </div>

        <div className="branch-chart">

          {branchData.map(([name, value]) => (

            <div className="branch-bar" key={name}>

              <div className="branch-name">
                <strong>{name}</strong>
                <span>{value}%</span>
              </div>

              <div className="track">
                <div
                  style={{
                    width: `${value}%`
                  }}
                />
              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default App;
