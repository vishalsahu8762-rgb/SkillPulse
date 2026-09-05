# SkillSync — Labour Market Intelligence & Skill-Curriculum Alignment Platform

A MERN Stack web application for aligning skill-development programmes with industry requirements and emerging job-market demand.

## Technology Stack

### Frontend
- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

## Project Structure

```
SkillSync/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   └── LoadingSpinner.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── SkillGap.jsx
│       │   ├── LearningPath.jsx
│       │   ├── CourseAnalysis.jsx
│       │   ├── CurriculumAnalyzer.jsx
│       │   ├── DistrictPlanner.jsx
│       │   └── EmployerValidation.jsx
│       ├── services/
│       │   └── api.js
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── data/
│   ├── server.js
│   └── .env
├── README.md
└── .gitignore
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed and running locally or MongoDB Atlas connection string)

### Frontend Setup

```bash
cd frontend
npm install
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillsync
# Or use MongoDB Atlas connection string
```

## Running the Application

### Start Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

### Start Backend
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Update `MONGODB_URI` in backend/.env to: `mongodb://localhost:27017/skillsync`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string from Atlas dashboard
4. Update `MONGODB_URI` in backend/.env with your connection string

## File Explanations

### Frontend Files

- **`src/components/Navbar.jsx`** - Controls the top navigation bar with the SkillSync logo and navigation links
- **`src/components/Sidebar.jsx`** - Controls the side navigation menu with all major page links
- **`src/components/LoadingSpinner.jsx`** - Reusable loading spinner component for async operations
- **`src/pages/Dashboard.jsx`** - Main dashboard page showing overview and statistics
- **`src/pages/SkillGap.jsx`** - Skill gap analyzer page
- **`src/pages/LearningPath.jsx`** - Learning path recommendation page
- **`src/pages/CourseAnalysis.jsx`** - Course analysis page
- **`src/pages/CurriculumAnalyzer.jsx`** - Curriculum analyzer page
- **`src/pages/DistrictPlanner.jsx`** - District planner page
- **`src/pages/EmployerValidation.jsx`** - Employer validation page
- **`src/services/api.js`** - Centralized API service for making HTTP requests to backend
- **`src/App.jsx`** - Controls the main application structure and routing setup
- **`src/main.jsx`** - Entry point that mounts React app to DOM
- **`src/index.css`** - Controls global styling and Tailwind CSS directives
- **`vite.config.js`** - Vite configuration file
- **`package.json`** - Frontend dependencies and scripts

### Backend Files

- **`server.js`** - Controls the Express server setup, middleware, and server initialization
- **`config/db.js`** - Controls MongoDB database connection
- **`routes/`** - API route definitions
- **`controllers/`** - Business logic for API endpoints
- **`models/`** - Mongoose schemas and database models
- **`services/`** - External service integrations
- **`data/`** - Static data files
- **`.env`** - Environment variables (PORT, MONGODB_URI)
- **`package.json`** - Backend dependencies and scripts

## API Endpoints

### Health Check
```
GET /api/health
Response: { "success": true, "message": "SkillSync API is running" }
```

## Navigation

The application includes the following navigation items:
- Dashboard
- Industry Demand
- Skill Gap Analyzer
- Learning Path
- Course Analysis
- Curriculum Analyzer
- District Planner
- Employer Validation

## Development

### Adding New Pages
1. Create page component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`
3. Add navigation link in `frontend/src/components/Sidebar.jsx` and/or `Navbar.jsx`

### Adding New API Endpoints
1. Create route in `backend/routes/`
2. Create controller in `backend/controllers/`
3. Create model if needed in `backend/models/`
4. Register route in `backend/server.js`
