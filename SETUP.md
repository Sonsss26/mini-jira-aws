# Mini-Jira AWS — Teammate Setup

## Quick start

```powershell
# Terminal 1 — backend
cd backend
npm install
npm run dev

# Terminal 2 — frontend
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173  
- Backend: import.meta.env.VITE_API_BASE_URL 

Copy env templates and fill in your values:

- `backend/.env.example` → `backend/.env`
- `frontend/.env.example` → `frontend/.env` **(required for login — not in git)**

Restart both dev servers after creating or changing `.env` files.

---

## AWS prerequisites

### DynamoDB tables

| Table | Partition key | GSI |
|-------|---------------|-----|
| `Tasks` | `id` | `teamId-index` on `teamId` |
| `Projects` | `id` | — |
| `Comments` | `id` | `taskId-index` on `taskId` |
| `Users` | `id` | `teamId-index` on `teamId` |

All tables: **On-demand** billing.

### Cognito custom attributes

Add for every user:

| Attribute | Manager example | Employee example |
|-----------|-----------------|------------------|
| `custom:role` | `manager` | `employee` |
| `custom:teamId` | (empty or any) | `frontend` or `backend` |

### S3 buckets

Set in `backend/.env`:

- `S3_ORIGINALS_BUCKET`
- `S3_RESIZED_BUCKET`

---

## Employee assignment (how it works)

1. **Cognito** — who can log in  
2. **DynamoDB `Users` table** — who appears in the assignee dropdown  

Managers create tasks by selecting a **team**, then an **assignee** loaded from `GET /api/users/team/:teamId`.

### Add employees to DynamoDB

Insert rows into the `Users` table (Console or API):

```json
{
  "id": "<cognito-sub-or-uuid>",
  "email": "sara@example.com",
  "name": "Sara Frontend",
  "role": "employee",
  "teamId": "frontend",
  "createdAt": "2026-05-17T00:00:00.000Z"
}
```

**Dev-only seed API** (manager token required):

```http
POST import.meta.env.VITE_API_BASE_URL
Authorization: Bearer <id_token>
Content-Type: application/json

{
  "users": [
    { "email": "sara@test.com", "name": "Sara Frontend", "role": "employee", "teamId": "frontend" },
    { "email": "omar@test.com", "name": "Omar Backend", "role": "employee", "teamId": "backend" }
  ]
}
```

`id` is auto-generated if omitted. Seed does **not** create Cognito users.

---

## API routes

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/tasks` | Manager: all; Employee: own team |
| POST | `/api/tasks` | Multipart (optional image) |
| PATCH | `/api/tasks/:id/status` | Kanban status |
| DELETE | `/api/tasks/:id` | Manager |
| GET | `/api/users/team/:teamId` | Manager — employees for dropdown |
| POST | `/api/users/seed` | Manager — dev seed only |
| GET/POST | `/api/comments/:taskId` | Comments |
| GET/POST | `/api/projects` | Projects |

Auth: `Authorization: Bearer <cognito_id_token>`

---

## Roles

| Role | Can do |
|------|--------|
| **manager** | Create/delete tasks, assign employees, see all tasks |
| **employee** | View team tasks, update status, comment |

Authorization uses JWT claims only (`req.user.role`, `req.user.teamId`) — never trust client-sent role/team in request body for access control.

## SNS + SQS + Lambda Integration

The project includes an event-driven notification flow for task assignment.

### Flow

Manager creates a task from the frontend.

Backend publishes a message to Amazon SNS.

SNS sends the notification to:
- Manager email subscription
- SQS queue

SQS triggers a Lambda worker.

Lambda processes the message and writes logs to CloudWatch.

### AWS Resources

SNS Topic:
mini-jira-task-assigned

SQS Queue:
mini-jira-assignment-queue

Lambda Function:
mini-jira-assignment-worker

CloudWatch Log Group:
/aws/lambda/mini-jira-assignment-worker

### Test Evidence

The integration was tested successfully:

- SNS email notification reached the manager email.
- SNS message was delivered to SQS.
- SQS triggered Lambda.
- CloudWatch Logs showed:
  - SQS event received
  - SNS Topic ARN
  - SNS Subject
  - SNS Message
