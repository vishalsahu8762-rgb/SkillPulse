# SkillPulse – Labour Market Intelligence & Skill-Curriculum Alignment Platform

SkillPulse is a full-stack prototype for connecting labour-market demand with learner skills, courses, curricula, district planning, and employer feedback. It provides role-based workspaces and local analysis services that help learners identify gaps and help institutions and employers review skill and curriculum alignment.

> **Project status:** Working college/SIH prototype. The application uses sample and process-local data for several features. It is not presented as a production labour-market data platform.

## Problem Being Solved

Learners, training providers, districts, and employers often lack a shared view of which skills are in demand and how existing learning content maps to those skills. This can make it difficult to choose learning priorities, evaluate course coverage, plan local programmes, or provide structured industry feedback.

## Proposed Solution

SkillPulse brings these workflows together in one web application. Users can review demand insights, compare skills with target roles, receive rule-based learning recommendations, analyze courses and curricula, inspect district-level requirements, and record employer validation feedback. The current prototype demonstrates these workflows with sample datasets and local services.

## Key Features

- Authenticated trainee, employer, and admin workspaces
- Dashboard with learner and platform information
- Industry demand statistics, filters, roles, locations, industries, and trending skills
- Skill assessment, current-skill management, role-based skill-gap analysis, and readiness tracking
- Rule-based learning-path and course recommendations
- Job matching, career exploration, industry trends, and progress views
- Course creation, course analysis, and curriculum recommendation review
- District-wise skill, industry, and recommendation views
- Employer validation and feedback submission
- Profile management
- Responsive React interface with charts and reusable UI components

## Technology Stack

### Frontend

- React 18 and React DOM
- Vite 5
- React Router DOM 6
- Axios for API requests
- Recharts for data visualizations
- Lucide React for icons
- Tailwind CSS, PostCSS, and Autoprefixer
- ESLint with React, Hooks, and Refresh plugins

### Backend

- Node.js
- Express 4
- CORS
- dotenv
- Nodemon for development
- Mongoose 8 for optional MongoDB model access

The project is not described as a MERN application because MongoDB is optional and several prototype features use static or in-memory data. No external AI/ML service is implemented; skill matching and recommendations are local rule-based services.

## Project Structure

```text
SkillPulse/
├── README.md
├── .gitignore
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── curriculumController.js
│   │   ├── demandController.js
│   │   ├── districtController.js
│   │   ├── employerController.js
│   │   ├── skillController.js
│   │   └── studentController.js
│   ├── data/
│   │   └── sampleDemandData.js
│   ├── models/
│   │   ├── Course.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── curriculumRoutes.js
│   │   ├── demandRoutes.js
│   │   ├── districtRoutes.js
│   │   ├── employerRoutes.js
│   │   ├── skillRoutes.js
│   │   └── studentRoutes.js
│   └── services/
│       ├── authService.js
│       ├── courseAnalysisService.js
│       ├── curriculumAnalysisService.js
│       ├── demandAnalysisService.js
│       ├── districtService.js
│       ├── employerService.js
│       ├── recommendationService.js
│       ├── skillMatchingService.js
│       └── studentService.js
└── frontend/
	├── index.html
	├── package.json
	├── package-lock.json
	├── postcss.config.js
	├── tailwind.config.js
	├── vite.config.js
	└── src/
		├── App.jsx
		├── index.css
		├── main.jsx
		├── components/
		│   ├── DemandChart.jsx
		│   ├── LearningPath.jsx
		│   ├── LoadingSpinner.jsx
		│   ├── Navbar.jsx
		│   ├── ProtectedRoute.jsx
		│   ├── ReadinessProgress.jsx
		│   ├── RecommendationCard.jsx
		│   ├── Sidebar.jsx
		│   ├── SkillBar.jsx
		│   ├── SkillGapCard.jsx
		│   ├── SkillSelector.jsx
		│   └── StatCard.jsx
		├── context/AuthContext.jsx
		├── pages/
		│   ├── Careers.jsx
		│   ├── CourseAnalysis.jsx
		│   ├── CurriculumAnalyzer.jsx
		│   ├── Dashboard.jsx
		│   ├── DistrictPlanner.jsx
		│   ├── EmployerValidation.jsx
		│   ├── IndustryDemand.jsx
		│   ├── IndustryTrends.jsx
		│   ├── JobMatch.jsx
		│   ├── LearningPath.jsx
		│   ├── Login.jsx
		│   ├── MySkills.jsx
		│   ├── Profile.jsx
		│   ├── Signup.jsx
		│   ├── SkillAssessment.jsx
		│   ├── SkillGap.jsx
		│   └── StudentProgress.jsx
		└── services/api.js
```

## Local Setup

### Prerequisites

- Node.js and npm
- MongoDB is optional. Without a reachable MongoDB instance, the backend starts with its in-memory prototype fallback.

### Clone and install

```bash
git clone https://github.com/vishalsahu8762-rgb/SkillPulse.git
cd SkillPulse

cd backend
npm install

cd ../frontend
npm install
```

### Environment variables

Create `backend/.env` from the provided example:

```bash
cd backend
copy .env.example .env
```

On macOS/Linux, use `cp .env.example .env` instead. The supported backend variables are:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/skillpulse
```

The frontend optionally supports `VITE_API_URL`. If it is not set, requests use `/api`, which Vite proxies to `http://localhost:5001` during development.

### Start the backend

In one terminal:

```bash
cd backend
npm run dev
```

The API listens on `http://localhost:5001` by default. `npm start` runs the server without Nodemon.

### Start the frontend

In a second terminal:

```bash
cd frontend
npm run dev
```

The Vite development server is available at `http://localhost:5173`.

## Major Modules

### Industry Demand

Displays demand statistics, skills, roles, locations, industries, filters, and trending skills from the bundled sample demand dataset.

### Skill Gap Analysis

Compares a learner's current skills with the skills associated with a selected role and reports missing skills and readiness information.

### Learning Path

Uses the local recommendation service to suggest learning modules based on a selected role, missing skills, and current readiness.

### Course Analysis

Lists courses, supports adding course data, and analyzes course payloads using the backend course-analysis service. MongoDB-backed course storage is used when available, with an in-memory fallback.

### Curriculum Analysis

Analyzes a course curriculum and allows a recommendation to be accepted or rejected. Acceptance updates the available course state; rejection does not change it.

### District Planner

Provides district-level skill, industry, and recommendation views using prototype data for Bhopal, Indore, Jabalpur, Gwalior, Ujjain, and Sagar.

### Employer Validation

Shows employer and validation data, available skills and courses, and accepts employer feedback. Submitted feedback is process-local in the current prototype.

### Student Workspace

Includes the dashboard, My Skills, skill assessment, job matching, career exploration, industry trends, progress, and readiness views. Student jobs, careers, questions, and readiness calculations are static or rule-based.

### Authentication/Profile

Login, signup, logout, profile retrieval, and profile updates are implemented. Protected frontend routes require an authenticated session. The backend uses salted PBKDF2 password hashes and process-local random tokens; tokens are not JWTs and have no expiry mechanism in the current implementation.

## Application Workflow

1. Start the backend and frontend development servers.
2. Create an account or sign in.
3. A trainee can add skills, complete an assessment, choose a target role, inspect demand, review skill gaps, and follow recommendations.
4. The trainee can then review job matches, careers, industry trends, and progress.
5. Employers and administrators can inspect demand, courses, curricula, districts, and employer validation workflows.
6. Profile changes and prototype feedback are sent through the backend API.

The backend also exposes `GET /api/health` for a basic health check. Functional route groups are available under `/api/auth`, `/api/demand`, `/api/skills`, `/api/courses`, `/api/curriculum`, `/api/districts`, `/api/employer-validation`, `/api/employers`, and `/api/student`.

## Security Notes

- Do not commit `backend/.env` or any file containing database credentials, API keys, or secrets. Environment files are ignored by Git; use `.env.example` as the template.
- Replace the sample MongoDB URI with a protected local or hosted connection string when using MongoDB.
- The current prototype authentication uses process-local tokens stored in memory and local storage on the frontend. Tokens are lost when the backend restarts and do not expire, so this implementation needs additional hardening before production use.
- Passwords are hashed with PBKDF2 and random salts, and sensitive password fields are removed from returned user payloads.
- CORS is enabled broadly by the current backend configuration; production deployments should restrict allowed origins and use HTTPS.
- Sample credentials and prototype datasets must not be used for real user or employer data.

## Future Scope

Future work may include verified live labour-market data integrations, production-grade persistent storage for all modules, expiring JWT or session management, role-based backend authorization, stronger validation and rate limiting, richer curriculum workflows, deployment automation, and real employer/institution data governance. These items are not claimed as currently implemented.

## Developer

**Vishal Sahu**
B.Tech – Artificial Intelligence & Machine Learning

## Repository

https://github.com/vishalsahu8762-rgb/SkillPulse
