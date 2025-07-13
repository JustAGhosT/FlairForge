# Runbook - FlairForge Deployment

**Document Type:** Runbook  
**Service/Component:** FlairForge AI-Powered Flyer Generator  
**Mesh Layer:** Business  
**Version:** 1.0  
**Last Updated:** 2024-01-15  
**Owner:** FlairForge Development Team  
**Reviewers:** DevOps Team, Frontend Team, Backend Team  

## Service Overview

### Purpose
FlairForge is a React-based web application that generates professional flyers using AI enhancement capabilities. The service consists of a frontend React application deployed on Netlify and backend API functions for flyer generation and template management.

### Business Impact
**High Impact:** Complete service failure prevents users from generating flyers, affecting customer satisfaction and business operations  
**Medium Impact:** AI enhancement features down, users can still create basic flyers with reduced functionality  
**Low Impact:** Minor UI issues or non-critical features temporarily unavailable  

### Service Level Objectives (SLOs)
| Metric             | Target      | Measurement                |
| ------------------ | ----------- | -------------------------- |
| Availability       | 99.9%       | Netlify uptime monitoring  |
| Response Time      | < 2s p95    | Frontend load time         |
| API Response Time  | < 500ms p95 | Netlify Functions latency  |
| Error Rate         | < 0.1%      | Client-side error tracking |
| Build Success Rate | > 99%       | Netlify build success      |

## System Architecture

### Mesh Integration
```
Frontend Layer (Netlify)
├── React Application: Vite + TypeScript
├── State Management: Zustand
├── Routing: React Router DOM
└── UI Components: CSS Modules

Backend Layer (Netlify Functions)
├── API Gateway: Express.js serverless
├── Template Engine: EJS
├── File Processing: html2canvas
└── AI Integration: OpenAI API

External Dependencies
├── OpenAI API: AI enhancement features
├── Cloudinary: Image storage (optional)
└── Google Analytics: Usage tracking (optional)
```

### Key Dependencies
| Dependency       | Type      | Impact if Down            | Contact          |
| ---------------- | --------- | ------------------------- | ---------------- |
| Netlify Platform | Critical  | Complete service failure  | Netlify Support  |
| OpenAI API       | Important | AI features unavailable   | OpenAI Support   |
| React Ecosystem  | Critical  | Frontend fails to load    | Development Team |
| EJS Templates    | Important | Flyer generation degraded | Development Team |

## Monitoring & Alerting

### Key Metrics
| Metric               | Dashboard Link    | Normal Range | Alert Threshold |
| -------------------- | ----------------- | ------------ | --------------- |
| Build Success Rate   | Netlify Dashboard | 95-100%      | <90%            |
| Function Invocations | Netlify Analytics | 0-1000/day   | >2000/day       |
| Response Time        | Netlify Analytics | 100-500ms    | >2000ms         |
| Error Rate           | Netlify Analytics | 0-0.05%      | >0.1%           |
| Page Load Time       | Web Vitals        | 1-3s         | >5s             |

### Alert Channels
- **Critical Alerts**: Netlify Status Page → Development Team
- **Warning Alerts**: Slack #flairforge-alerts
- **Info Alerts**: Email digest to stakeholders

### Dashboards
- **Service Overview**: Netlify Dashboard
- **Performance**: Web Vitals Dashboard
- **Error Tracking**: Sentry Dashboard (if configured)
- **Business Metrics**: Google Analytics

## Common Operational Tasks

### Health Checks

#### Basic Health Check
```bash
# Check frontend health
curl -s https://[site-url].netlify.app/ | grep -q "FlairForge"

# Check API health
curl -s https://[site-url].netlify.app/.netlify/functions/api/health | jq

# Expected response:
{
  "status": "OK",
  "message": "FlairForge API is running",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Detailed Health Check
```bash
# Check build status
netlify status

# Verify function deployment
netlify functions:list

# Check environment variables
netlify env:list

# Test API endpoints
curl -X POST https://[site-url].netlify.app/.netlify/functions/api/generate-flyer \
  -H "Content-Type: application/json" \
  -d '{"template":"test","data":{"title":"Test"}}'
```

### Deployment Process

#### Pre-Deployment Checklist
- [ ] Code reviewed and approved
- [ ] Tests passing in CI/CD
- [ ] Environment variables updated
- [ ] Rollback plan prepared
- [ ] Stakeholders notified

#### Deployment Steps
```bash
# 1. Verify local build
cd frontend
npm run build

# 2. Test functions locally (optional)
netlify dev

# 3. Deploy to production
git push origin main

# 4. Monitor deployment
netlify status

# 5. Verify functionality
curl https://[site-url].netlify.app/health
```

#### Post-Deployment Verification
- [ ] Frontend loads successfully
- [ ] API endpoints responding
- [ ] No console errors
- [ ] Key user flows working
- [ ] Performance metrics normal

### Configuration Updates

#### Environment Variables
```bash
# Update environment variables
netlify env:set VITE_API_BASE_URL https://[site-url].netlify.app/.netlify/functions/api

# Set production variables
netlify env:set --context production VITE_ENABLE_AI_ENHANCEMENT true

# List current variables
netlify env:list

# Delete variable if needed
netlify env:unset VARIABLE_NAME
```

#### Function Configuration
```bash
# Update function timeout
# Edit netlify.toml in backend directory
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
  [redirects.headers]
    X-Function-Timeout = "30"

# Redeploy functions
git push origin main
```

## Incident Response Procedures

### Severity Levels

#### P0 - Critical (Site Down)
**Response Time:** Immediate (< 5 minutes)
1. **Check Netlify Status Page** for platform issues
2. **Verify deployment status**: `netlify status`
3. **Check build logs** for recent failures
4. **Rollback to previous version** if needed
5. **Communication**: Update status page and notify stakeholders

#### P1 - High (Major Features Down)
**Response Time:** < 30 minutes
1. **Check function logs**: Netlify Functions dashboard
2. **Verify API endpoints**: Test key endpoints
3. **Check environment variables**: Ensure all required vars set
4. **Review recent changes**: Check git history
5. **Apply hotfix** if possible

#### P2 - Medium (Minor Issues)
**Response Time:** < 4 hours
1. **Triage during business hours**
2. **Check user reports** and error logs
3. **Plan resolution** for next deployment
4. **Implement fix** in regular release cycle

### Escalation Matrix
| Level | Contact             | When to Escalate               |
| ----- | ------------------- | ------------------------------ |
| L1    | On-call Developer   | All alerts                     |
| L2    | Senior Developer    | 15 min for P0, 2 hrs for P1    |
| L3    | Engineering Manager | 1 hr for P0, 4 hrs for P1      |
| L4    | Product Manager     | Customer-facing impact > 2 hrs |

## Troubleshooting Guide

### Build Failures

#### Common Build Issues
| Symptom               | Likely Cause        | Solution                            |
| --------------------- | ------------------- | ----------------------------------- |
| Build timeout         | Large dependencies  | Optimize bundle size, check imports |
| TypeScript errors     | Type mismatches     | Fix type errors, update tsconfig    |
| Missing dependencies  | Package.json issues | Run `npm install`, check versions   |
| Environment variables | Missing VITE_ vars  | Set required env vars in Netlify    |

#### Build Debugging
```bash
# Test build locally
cd frontend
npm run build

# Check bundle size
npm run build -- --analyze

# Verify TypeScript
npm run type-check

# Check for circular dependencies
npx madge --circular src/
```

### Function Errors

#### Common Function Issues
| Symptom          | Likely Cause              | Solution                                |
| ---------------- | ------------------------- | --------------------------------------- |
| Function timeout | Long-running operations   | Optimize code, increase timeout         |
| Memory errors    | Large payloads            | Add payload limits, optimize processing |
| Import errors    | Missing dependencies      | Check package.json, install deps        |
| CORS issues      | Frontend-backend mismatch | Verify CORS configuration               |

#### Function Debugging
```bash
# Test function locally
netlify dev

# Check function logs
netlify functions:logs

# Test specific function
curl -X POST http://localhost:8888/.netlify/functions/api/generate-flyer \
  -H "Content-Type: application/json" \
  -d '{"template":"test","data":{}}'

# Check function configuration
cat backend/netlify/functions/api.js
```

### Performance Issues

#### Frontend Performance
```bash
# Check bundle size
npm run build
ls -la dist/assets/

# Analyze performance
npm run build -- --analyze

# Check Core Web Vitals
# Use Lighthouse or PageSpeed Insights
```

#### API Performance
```bash
# Test API response times
curl -w "@curl-format.txt" -o /dev/null -s \
  "https://[site-url].netlify.app/.netlify/functions/api/health"

# Monitor function invocations
netlify functions:logs --follow

# Check for cold starts
# Monitor function execution times in Netlify dashboard
```

### Environment Variable Issues

#### Debugging Environment Variables
```bash
# List all environment variables
netlify env:list

# Check specific variable
netlify env:get VARIABLE_NAME

# Test variable in function
# Add console.log(process.env.VARIABLE_NAME) to function code

# Verify frontend variables
# Check browser console for VITE_ variables
```

## Maintenance Procedures

### Regular Maintenance Tasks

#### Weekly
- [ ] Review build success rates
- [ ] Check function error rates
- [ ] Monitor performance metrics
- [ ] Update dependencies if needed

#### Monthly
- [ ] Review and update environment variables
- [ ] Check for security updates
- [ ] Review and optimize bundle size
- [ ] Update documentation

#### Quarterly
- [ ] Review SLOs and adjust targets
- [ ] Update runbook procedures
- [ ] Review and update monitoring
- [ ] Plan capacity improvements

### Dependency Updates

#### Frontend Dependencies
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update major versions (carefully)
npx npm-check-updates -u
npm install

# Test after updates
npm run build
npm run test
```

#### Backend Dependencies
```bash
cd backend
npm outdated
npm update
npm test
```

### Security Maintenance

#### Security Scanning
```bash
# Run security audit
npm audit

# Fix security issues
npm audit fix

# Update vulnerable packages
npm update [package-name]
```

#### Environment Variable Security
- [ ] Rotate API keys regularly
- [ ] Review access permissions
- [ ] Monitor for unauthorized access
- [ ] Use Netlify's secret management

## Disaster Recovery

### Backup Strategy
- **Code**: Git repository with multiple remotes
- **Configuration**: Environment variables in Netlify
- **Templates**: EJS files in version control
- **Data**: User-generated content (if any) in external storage

### Recovery Procedures

#### Complete Site Loss
```bash
# 1. Verify git repository integrity
git status
git log --oneline -10

# 2. Redeploy from git
git push origin main

# 3. Verify deployment
netlify status

# 4. Restore environment variables
netlify env:import .env.backup

# 5. Test functionality
curl https://[site-url].netlify.app/health
```

#### Function Failure Recovery
```bash
# 1. Check function logs
netlify functions:logs

# 2. Redeploy functions
git push origin main

# 3. Test function endpoints
curl https://[site-url].netlify.app/.netlify/functions/api/health

# 4. Verify all endpoints
# Test each API endpoint manually
```

### RTO/RPO Targets
- **Recovery Time Objective (RTO)**: 30 minutes
- **Recovery Point Objective (RPO)**: 5 minutes
- **Mean Time to Recovery (MTTR)**: 15 minutes

## Contacts & Resources

### On-Call Information
| Role        | Primary      | Backup       | Escalation            |
| ----------- | ------------ | ------------ | --------------------- |
| Development | [Name/Slack] | [Name/Slack] | [Engineering Manager] |
| DevOps      | [Name/Slack] | [Name/Slack] | [DevOps Lead]         |
| Product     | [Name/Phone] | [Name/Phone] | [Product Manager]     |

### Important Links
- **Netlify Dashboard**: https://app.netlify.com/sites/[site-name]
- **Git Repository**: [GitHub/GitLab URL]
- **Documentation**: [Documentation URL]
- **API Documentation**: [API docs URL]
- **Status Page**: [Public status page]
- **Monitoring**: [Monitoring dashboard URL]

### Emergency Contacts
- **Netlify Support**: https://www.netlify.com/support/
- **OpenAI Support**: https://help.openai.com/
- **Development Team**: [Team Slack channel]
- **Infrastructure Team**: [Infra team contact]

## Change Log

| Date       | Version | Change Description                | Author           |
| ---------- | ------- | --------------------------------- | ---------------- |
| 2024-01-15 | 1.0     | Initial runbook creation          | Development Team |
| 2024-01-15 | 1.1     | Added Netlify-specific procedures | Development Team |
| 2024-01-15 | 1.2     | Updated troubleshooting guide     | Development Team |

---

**Runbook Version:** 1.0  
**Last Reviewed:** 2024-01-15  
**Next Review Due:** 2024-07-15 