# AWS Setup Guide — Mini-Jira (Phases 1–5)

Region: **eu-north-1**

---

## Phase 1 — Already in code (no AWS changes)

- Manager-only routes for create/delete tasks and projects
- JWT-based RBAC on tasks and comments
- Input validation on tasks/projects/comments

**Cognito:** Every user needs `custom:role` (`manager` | `employee`) and employees need `custom:teamId` (`frontend` | `backend`).

---

## DynamoDB tables

Create all with **On-demand** billing.

| Table | Partition key | GSIs |
|-------|---------------|------|
| Tasks | id (S) | teamId-index → teamId |
| Projects | id (S) | — |
| Comments | id (S) | taskId-index → taskId |
| Users | id (S) | teamId-index → teamId |
| ActivityLog | id (S) | — |

---

## Phase 2 — SNS + SQS + Lambda + EventBridge

### 1. SNS topic

1. SNS → Topics → Create topic  
2. Name: `mini-jira-task-assigned`  
3. Type: Standard  
4. Create **email subscription** (manager email) — confirm inbox  
5. Copy **Topic ARN** → `backend/.env`:

```env
SNS_TASK_ASSIGNMENT_TOPIC_ARN=arn:aws:sns:eu-north-1:ACCOUNT_ID:mini-jira-task-assigned
ACTIVITY_LOG_TABLE=ActivityLog
```

### 2. SQS queue

1. SQS → Create queue  
2. Name: `mini-jira-assignment-queue`  
3. Standard queue  
4. After create: **Subscribe queue to SNS topic**  
   - SNS topic → Create subscription → Protocol SQS → select queue  
   - Enable raw message delivery: **off** (Lambda expects SNS wrapper JSON)

### 3. Assignment worker Lambda

1. `cd lambdas/assignmentWorker && npm install`
2. Zip `index.js` + `node_modules` (or use Lambda console inline for demo)
3. Create function: `mini-jira-assignment-worker`  
   - Runtime: Node.js 20.x  
   - Handler: `index.handler`  
4. Environment variables:

```env
AWS_REGION=eu-north-1
ACTIVITY_LOG_TABLE=ActivityLog
```

5. IAM role needs: `dynamodb:PutItem` on ActivityLog, `cloudwatch:PutMetricData`
6. **Trigger:** SQS `mini-jira-assignment-queue`

### 4. Daily digest Lambda + EventBridge

1. `cd lambdas/dailyDigest && npm install`
2. Create function: `mini-jira-daily-digest`  
3. Environment:

```env
AWS_REGION=eu-north-1
TASKS_TABLE=Tasks
SNS_TASK_ASSIGNMENT_TOPIC_ARN=<same as backend>
```

4. IAM: `dynamodb:Scan` on Tasks, `sns:Publish`
5. EventBridge → Rules → Create rule  
   - Schedule: `cron(0 9 * * ? *)` (09:00 UTC daily)  
   - Target: `mini-jira-daily-digest` Lambda

### 5. Test event flow

1. Restart backend with `SNS_TASK_ASSIGNMENT_TOPIC_ARN` set  
2. Manager creates a task  
3. Check: email, SQS messages, Lambda logs, `ActivityLog` table row

---

## Phase 4 — Image resize Lambda + S3

### 1. S3 buckets (if not exists)

- `mini-jira-task-images-hussain` (originals) — already in your `.env`
- `mini-jira-task-images-resized-hussain` (resized)

### 2. Resize Lambda

1. `cd lambdas/imageResize && npm install`
2. Create function: `mini-jira-image-resize`  
3. Environment:

```env
AWS_REGION=eu-north-1
S3_RESIZED_BUCKET=mini-jira-task-images-resized-hussain
TASKS_TABLE=Tasks
```

4. IAM: S3 read originals, S3 write resized, DynamoDB UpdateItem/Scan on Tasks  
5. **Trigger:** S3 originals bucket → Event notifications  
   - Event: `s3:ObjectCreated:*`  
   - Prefix: `tasks/`  
   - Destination: Lambda

### 3. Backend

Already returns `resizedImageUrl` when Lambda sets `resizedImageKey` on the task.

Task delete now removes both original and resized S3 objects.

---

## Phase 5 — Deployment (EC2 + ALB + ASG + CloudFront)

### Architecture

```
User → CloudFront → S3 (React static)
User → CloudFront /api/* → ALB → EC2 (Node Express) → DynamoDB / S3 / SNS
```

### A. Frontend (S3 + CloudFront)

1. `cd frontend && npm run build` → `dist/`  
2. S3 bucket for static site (e.g. `mini-jira-frontend`)  
3. Enable static website hosting or use CloudFront OAC  
4. CloudFront distribution:  
   - Origin 1: S3 (frontend)  
   - Origin 2: ALB (API) — path pattern `/api/*`  
5. Update `frontend/.env` for production:

```env
VITE_API_BASE_URL=https://YOUR_CLOUDFRONT_DOMAIN
VITE_COGNITO_REDIRECT_URI=https://YOUR_CLOUDFRONT_DOMAIN
```

6. Cognito app client → add CloudFront URL to callback/logout URLs

### B. Backend (EC2)

1. Launch **Amazon Linux 2023** EC2 (t3.small) in public subnet  
2. Security group: allow 22 (your IP), 5000 from ALB SG only  
3. Install Node 20, clone repo, `cd backend && npm install`  
4. Copy `.env` to server (never commit)  
5. Run with **PM2**: `pm2 start src/server.js --name mini-jira-api`  
6. Or use **systemd** user service

### C. Application Load Balancer

1. Create ALB (internet-facing)  
2. Target group: HTTP port 5000, health check `GET /`  
3. Register EC2 instance  
4. Listener: HTTP 80 → forward to target group (HTTPS optional with ACM cert)

### D. Auto Scaling (optional for course)

1. AMI from configured EC2  
2. Launch template with user-data installing Node + app  
3. ASG min=1 max=2, attach to ALB target group  
4. Scale on CPU if required

### E. IAM for EC2 instance role (recommended)

Instead of access keys in `.env`, attach role with:

- DynamoDB tables access  
- S3 buckets access  
- SNS Publish  
- CloudWatch PutMetricData  

Remove `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` from production `.env` when using instance profile.

### F. Multi-AZ

- ALB: enable subnets in **2+ AZs**  
- ASG: spread across AZs  
- DynamoDB: on-demand is multi-AZ by default  
- S3: regional durability

---

## Local `.env` checklist

**backend/.env**

```env
PORT=5000
AWS_REGION=eu-north-1
TASKS_TABLE=Tasks
PROJECTS_TABLE=Projects
COMMENTS_TABLE=Comments
USERS_TABLE=Users
ACTIVITY_LOG_TABLE=ActivityLog
COGNITO_USER_POOL_ID=...
COGNITO_CLIENT_ID=...
S3_ORIGINALS_BUCKET=...
S3_RESIZED_BUCKET=...
SNS_TASK_ASSIGNMENT_TOPIC_ARN=arn:aws:sns:...
```

**frontend/.env**

```env
VITE_COGNITO_AUTHORITY=https://cognito-idp.eu-north-1.amazonaws.com/POOL_ID
VITE_COGNITO_CLIENT_ID=...
VITE_COGNITO_REDIRECT_URI=http://localhost:5173
VITE_API_BASE_URL=http://localhost:5000
```

---

## Quick test after setup

1. Seed users: `POST /api/users/seed` (manager token)  
2. Manager creates task with image → check S3, SNS, ActivityLog  
3. Employee logs in → sees team tasks only  
4. Drag task between columns on Dashboard  
5. Delete task → S3 objects removed
