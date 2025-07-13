# Netlify Deployment Guide for FlairForge

## Project Structure Overview

This project is structured as a monorepo with separate frontend and backend directories:

```
FlairForge/
├── frontend/                 # React + Vite frontend
│   ├── netlify.toml         # Netlify configuration
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.ts       # Vite build config
│   ├── tsconfig.json        # TypeScript config
│   ├── index.html           # Entry HTML file
│   ├── env.example          # Environment variables template
│   └── src/                 # React source code
│       ├── main.tsx         # React entry point
│       ├── App.tsx          # Main component
│       ├── components/      # React components
│       ├── pages/           # Page components
│       ├── store/           # State management
│       ├── utils/           # Utility functions
│       └── assets/          # Static assets
├── backend/                  # Express.js backend
│   ├── package.json         # Backend dependencies
│   ├── netlify/             # Netlify Functions
│   │   └── functions/
│   │       └── api.js       # Serverless API function
│   ├── src/                 # Backend source code
│   ├── templates/           # EJS templates
│   └── data/                # Data files
├── package.json             # Workspace scripts
├── workspace.code-workspace # VS Code workspace
└── README.md               # Project documentation
```

## Deployment Strategy

### Option 1: Frontend Only (Recommended for MVP)
Deploy only the frontend to Netlify with API calls to external services.

**Build Settings:**
- **Base directory:** `frontend`
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18

### Option 2: Full Stack (Frontend + Backend Functions)
Deploy both frontend and backend using Netlify Functions.

**Build Settings:**
- **Base directory:** `frontend`
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** `backend/netlify/functions`

## Required Files for Deployment

### ✅ Frontend Files
- `frontend/netlify.toml` - Netlify configuration
- `frontend/package.json` - Dependencies and scripts
- `frontend/vite.config.ts` - Build configuration
- `frontend/tsconfig.json` - TypeScript configuration
- `frontend/index.html` - Entry HTML file
- `frontend/src/main.tsx` - React entry point
- `frontend/src/App.tsx` - Main React component

### ✅ Backend Files (for Option 2)
- `backend/netlify/functions/api.js` - Serverless function
- `backend/package.json` - Backend dependencies
- `backend/templates/` - EJS template files
- `backend/data/` - Data files

### ✅ Configuration Files
- `frontend/env.example` - Environment variables template
- `.gitignore` - Git ignore rules
- `README.md` - Project documentation

## Environment Variables

Set these in the Netlify dashboard under Site Settings > Environment Variables:

### Required Variables
```
VITE_API_BASE_URL=https://your-site.netlify.app/.netlify/functions/api
```

### Optional Variables
```
VITE_ENABLE_AI_ENHANCEMENT=true
VITE_ENABLE_PREVIEW=true
VITE_GOOGLE_ANALYTICS_ID=your-ga-id
VITE_OPENAI_API_KEY=your-openai-key
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

## Deployment Steps

### 1. Connect Repository
1. Log in to Netlify
2. Click "New site from Git"
3. Connect your GitHub/GitLab/Bitbucket repository
4. Select the FlairForge repository

### 2. Configure Build Settings
- **Base directory:** `frontend`
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18

### 3. Set Environment Variables
1. Go to Site Settings > Environment Variables
2. Add the required variables listed above
3. Set deployment context (Production, Deploy Preview, Branch Deploy)

### 4. Deploy
1. Click "Deploy site"
2. Netlify will automatically build and deploy your site
3. Monitor the build logs for any issues

## Post-Deployment

### 1. Custom Domain (Optional)
1. Go to Site Settings > Domain management
2. Add your custom domain
3. Configure DNS settings

### 2. HTTPS (Automatic)
Netlify automatically provides SSL certificates for all sites.

### 3. Form Handling (If Needed)
1. Add `netlify` attribute to forms
2. Configure form notifications in Site Settings

### 4. Analytics (Optional)
1. Add Google Analytics ID to environment variables
2. Configure analytics in your React components

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check for TypeScript compilation errors

2. **API Function Errors**
   - Verify function path in netlify.toml
   - Check function logs in Netlify dashboard
   - Ensure all dependencies are installed

3. **Environment Variables**
   - Verify variable names start with `VITE_` for frontend
   - Check variable values in Netlify dashboard
   - Restart builds after adding new variables

### Useful Commands

```bash
# Local development
npm run dev                    # Start frontend dev server
cd backend && npm run dev      # Start backend dev server

# Build testing
cd frontend && npm run build   # Test frontend build
cd backend && npm run build    # Test backend build

# Netlify CLI (optional)
npm install -g netlify-cli     # Install Netlify CLI
netlify dev                    # Test locally with Netlify
```

## Performance Optimization

### Frontend
- Vite provides optimized builds by default
- CSS modules for scoped styling
- Code splitting with React Router
- Static asset optimization

### Backend Functions
- Serverless functions scale automatically
- Cold start optimization with minimal dependencies
- Caching strategies for template rendering

## Security Considerations

- Environment variables are encrypted at rest
- HTTPS is enabled by default
- Security headers configured in netlify.toml
- CORS configured for API endpoints
- Input validation in API functions

## Monitoring and Analytics

- Netlify provides built-in analytics
- Function invocation logs available
- Error tracking and performance monitoring
- Custom analytics integration possible 