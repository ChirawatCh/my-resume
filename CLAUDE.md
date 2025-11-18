# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-powered interactive resume website with a serverless architecture. The project showcases a personal portfolio with an integrated AI chatbot that can answer questions about professional experience using Groq's LLM API. The application is deployed on AWS with a Next.js frontend and Lambda backend.

**Live Site:** https://chirawat.info

## Architecture

### Frontend (Next.js 15 + React 19)
- **Location:** `frontend/`
- **Framework:** Next.js 15 with App Router and React 19
- **Styling:** Tailwind CSS 4 with custom CSS variables
- **Key Features:**
  - Static site generation (`output: 'export'` in next.config.ts)
  - AI chatbot component using Groq API via backend proxy
  - Markdown rendering for dynamic content using marked.js
  - Responsive design with Font Awesome icons

### Backend (AWS Lambda)
- **Location:** `backend/`
- **Runtime:** Node.js ES modules (`.mjs`)
- **Key Files:**
  - `index.mjs` - Lambda handler that proxies requests to Groq API
  - `resumeContent.txt` - Resume content fed to the LLM as context
- **Architecture:** Serverless function behind API Gateway that securely handles LLM requests

### Legacy HTML Version
- **Location:** `html_frontend/`
- **Status:** Legacy static HTML version, not actively developed
- **Note:** The Next.js frontend in `frontend/` is the current production version

## Common Commands

### Frontend Development
```bash
cd frontend
npm install              # Install dependencies
npm run dev             # Start dev server at http://localhost:3000
npm run build           # Build for production (generates static export in out/)
npm run lint            # Run ESLint
```

### Backend Development
```bash
cd backend
npm install             # Install dependencies
./deploy-lambda.sh      # Deploy Lambda function to AWS
./set-env-vars.sh       # Set environment variables (GROQ_API_KEY)
```

### Backend Deployment
The `deploy-lambda.sh` script handles:
- Creating/updating Lambda function named `groqApiProxy`
- Setting up IAM roles with basic execution policy
- Configuring function URL with CORS for direct HTTP access
- Packaging code with dependencies into ZIP file

**Important:** After deployment, set the `GROQ_API_KEY` environment variable:
```bash
aws lambda update-function-configuration \
  --function-name groqApiProxy \
  --environment Variables='{GROQ_API_KEY=your_key}' \
  --region ap-southeast-1
```

## Key Technical Details

### Frontend Architecture
- **Routing:** Next.js App Router with route pages in `src/app/`
  - `/` - Home page (src/app/page.tsx)
  - `/skills` - Skills page
  - `/education` - Education page
  - `/projects` - Projects page
  - `/articles` - Articles page
  - `/achievements` - Achievements page
- **Components:**
  - `Header.tsx` - Navigation header
  - `Chatbot.tsx` - AI chatbot interface (calls backend API)
  - `HomeContent.tsx` - Home page content
- **Configuration:** Static export enabled in `next.config.ts` with unoptimized images for S3 deployment

### Backend Architecture
- **Lambda Handler:** `index.handler` in `index.mjs`
- **LLM Configuration:**
  - Model: `qwen/qwen3-32b` via Groq SDK
  - Temperature: 0.7, Max tokens: 1024
  - System prompt instructs LLM to respond as Chirawat, in same language as user
  - Resume content from `resumeContent.txt` injected as assistant context
- **CORS:** Configured for `*` origin (should be restricted in production)
- **Endpoint:** Currently `https://puf76fk3fk.execute-api.ap-southeast-1.amazonaws.com/prod/chat` (hardcoded in Chatbot.tsx:68)

### Content Management
- Resume content stored in `backend/resumeContent.txt` - this is the source of truth for chatbot responses
- When updating resume information, update this file and redeploy Lambda
- Frontend content in components is hardcoded - update `HomeContent.tsx` and page components directly

### Styling
- Tailwind CSS 4 with PostCSS
- Custom CSS in `src/app/globals.css` with CSS variables for theming
- Font Awesome 6.5.1 CDN for icons

## Deployment

### Frontend Deployment to AWS S3
1. Build: `npm run build` (creates `out/` directory)
2. Upload `out/` contents to S3 bucket
3. Enable static website hosting
4. Set bucket policy for public read access

### Alternative Frontend Deployments
- **Vercel:** Recommended for Next.js (auto-detects framework)
- **Netlify:** Static site + serverless functions
- **AWS Amplify:** Full-stack with CI/CD

### Backend Deployment
Use `backend/deploy-lambda.sh` which handles:
- IAM role creation (`lambda-groq-execution-role`)
- Lambda function creation/update
- Function URL configuration
- CORS setup

## Important Notes

- **API Key Security:** The Groq API key must be set as Lambda environment variable `GROQ_API_KEY` - never commit it
- **Endpoint Configuration:** Update `Chatbot.tsx` line 68 if API Gateway endpoint changes
- **Static Export:** Frontend is configured for static export (`output: 'export'`) - dynamic Next.js features are not available
- **Image Optimization:** Disabled (`unoptimized: true`) for static hosting compatibility
- **Node Version:** Backend uses Node.js 20.x runtime, frontend requires Node.js 18+
- **Chatbot Integration:** Chatbot opens via custom event `window.dispatchEvent(new Event('openChat'))` from Header component

## Testing

### Frontend
- No test suite currently configured
- Manual testing via `npm run dev`

### Backend
- `backend/API-test.html` - HTML test interface for API endpoint
- Test locally by importing handler and invoking with mock event

## Environment Variables

### Frontend
- None required (API endpoint is hardcoded)

### Backend
- `GROQ_API_KEY` - Required for Groq API access (set via AWS Lambda console or CLI)
