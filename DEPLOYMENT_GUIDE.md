
# MoviePulse Deployment Guide

This guide explains how to deploy the MoviePulse application to Vercel and set up data collection for user opinions and statistics.

## Prerequisites

- Node.js (v14 or later)
- MongoDB account (Atlas is recommended for cloud deployment)
- Vercel account (create one at vercel.com if you don't have one)
- GitHub account (for easier deployment via Vercel)

## Step 1: Prepare Your Project

Before deploying, make sure your project is properly configured:

1. Ensure all environment variables are set in `.env.production`:
   ```
   VITE_API_URL=/api
   ```

2. Verify that your backend API endpoints are properly configured in your `src/api/opinionsApi.ts` file.

3. Make sure all dependencies are installed:
   ```
   npm install
   ```

4. Test the build locally:
   ```
   npm run build
   ```

## Step 2: Deploy to Vercel

### Option 1: Deploy via GitHub Integration (Recommended)

1. Push your code to a GitHub repository
2. Log in to Vercel (vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Select "Vite"
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. Add environment variables in Vercel's project settings:
   - `VITE_API_URL=/api` (for production)

7. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Navigate to your project directory and run:
   ```
   vercel
   ```

4. Follow the prompts to configure your project
5. To deploy the production version:
   ```
   vercel --prod
   ```

## Step 3: Deploy the Backend API

### Deploy the MoviePulse Backend to Render.com (Alternative to Heroku)

1. Create a Render account at render.com
2. Go to Dashboard and click "New" > "Web Service" 
3. Connect your GitHub repository
4. Configure the service:
   - Name: `moviepulse-api`
   - Start Command: `node server.js`
   - Environment: Node
   - Add environment variables:
     - `MONGODB_URI=your_mongodb_connection_string`
     - `NODE_ENV=production`
     - `CORS_ORIGIN=https://your-vercel-app-url.vercel.app` (your frontend URL)

5. Click "Create Web Service"

### Configure MongoDB Atlas Database

1. Sign up for MongoDB Atlas (cloud.mongodb.com)
2. Create a new cluster (the free tier is sufficient to start)
3. Under "Database Access", create a database user with read/write permissions
4. Under "Network Access", add a new IP address (choose "Allow Access from Anywhere" for simplicity)
5. Under "Clusters", click "Connect" and get your connection string
6. Use this connection string in your backend deployment environment variables

## Step 4: Connect Frontend to Backend

1. In Vercel, go to your project settings
2. Under "Settings" > "Integrations", add the Vercel Rewrites and Redirects integration
3. Add a rewrite rule to proxy API requests to your backend:
   - Source: `/api/:path*`
   - Destination: `https://your-backend-url.onrender.com/api/:path*`

4. Save your changes

## Step 5: Set Up Data Collection

MoviePulse collects the following data:

1. **User Opinions**: Stored in MongoDB with the structure:
   - Category (film, television, youtube, streaming)
   - Question responses
   - Anonymous user ID
   - Optional demographics
   - Sentiment analysis results
   - Timestamps

2. **Analytics Data**: Generated from aggregated user opinions, including:
   - Category breakdowns
   - Sentiment analysis
   - Time-based trends

### Data Access

The following API endpoints are available for data access:

- `GET /api/opinions` - Get all opinions with pagination
- `GET /api/opinions/category/:category` - Get opinions by category
- `GET /api/opinions/analytics` - Get comprehensive analytics data
- `GET /api/opinions/trending` - Get trending topics
- `POST /api/opinions` - Submit a new opinion

### Backend Monitoring

1. Set up MongoDB Atlas monitoring to track database performance
2. Use Render's built-in logs to monitor backend health
3. Consider adding Sentry (sentry.io) for error tracking:
   ```
   npm install @sentry/node @sentry/tracing
   ```

## Maintenance Tips

1. Regularly backup your MongoDB database
2. Monitor API performance and set up alerts for issues
3. Implement rate limiting to prevent abuse
4. Keep dependencies updated:
   ```
   npm audit fix
   ```

## Scaling Your Application

As your user base grows:

1. Upgrade MongoDB Atlas to a paid tier for better performance
2. Implement Redis caching for frequently accessed data
3. Consider moving to a paid Render plan for more resources
4. Implement a CDN like Cloudflare for improved load times

## User Data Privacy and Compliance

1. Ensure your privacy policy discloses data collection practices
2. Implement data retention policies
3. Provide options for users to delete their data if needed
4. Consider GDPR and CCPA compliance if applicable

This deployment guide covers the essential steps to get MoviePulse up and running on Vercel with a proper backend for data collection. Adjust the steps based on your specific requirements and hosting preferences.
