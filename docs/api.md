# API contract

## Students
GET `/api/students`

Query:
- `page`
- `limit` (recommend 25–100)
- `search`
- `branch`
- `status`
- `sort=name|cgpa|package|year`
- `order=asc|desc`

Response:
```json
{
  "rows": [],
  "total": 10248,
  "page": 1,
  "limit": 50
}
```

## Health
GET `/api/health`

## Companies
GET `/api/companies`

## Drives
GET `/api/drives`
