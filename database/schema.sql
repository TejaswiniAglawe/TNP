CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS students (
  id BIGSERIAL PRIMARY KEY,
  roll_no VARCHAR(30) UNIQUE NOT NULL,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  phone VARCHAR(25),
  branch VARCHAR(30) NOT NULL,
  cgpa NUMERIC(4,2) CHECK (cgpa BETWEEN 0 AND 10),
  skills TEXT[] DEFAULT '{}',
  placement_status VARCHAR(30) NOT NULL DEFAULT 'Eligible',
  package_lpa NUMERIC(8,2),
  graduation_year INT NOT NULL,
  company VARCHAR(160),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS companies (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  industry VARCHAR(100),
  website VARCHAR(255),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS placement_drives (
  id BIGSERIAL PRIMARY KEY,
  company_id BIGINT REFERENCES companies(id),
  role VARCHAR(160) NOT NULL,
  drive_date DATE NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'Upcoming',
  min_cgpa NUMERIC(4,2),
  eligible_branches TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  drive_id BIGINT NOT NULL REFERENCES placement_drives(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL DEFAULT 'Applied',
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id,drive_id)
);

CREATE INDEX IF NOT EXISTS idx_students_branch ON students(branch);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(placement_status);
CREATE INDEX IF NOT EXISTS idx_students_cgpa ON students(cgpa DESC);
CREATE INDEX IF NOT EXISTS idx_students_year ON students(graduation_year);
CREATE INDEX IF NOT EXISTS idx_students_name ON students(name);
CREATE INDEX IF NOT EXISTS idx_students_roll ON students(roll_no);
CREATE INDEX IF NOT EXISTS idx_students_search ON students USING GIN ((name || ' ' || roll_no || ' ' || email) gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_applications_student ON applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_drive ON applications(drive_id);