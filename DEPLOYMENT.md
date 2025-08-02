# 🚀 GMG Dashboard Deployment Guide

This guide explains how to deploy the GMG EHS Dashboard from Cursor to GitHub Pages.

## 📋 Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to `https://github.com/Hichmond/gmgDash.git`
2. **GitHub Pages**: Enable GitHub Pages in your repository settings
3. **GitHub Actions**: Ensure GitHub Actions are enabled

## 🎯 Quick Deployment

### Option 1: Using the Deployment Script (Recommended)

```bash
# From the project root directory
./deploy.sh
```

This script will:
- ✅ Check for uncommitted changes
- ✅ Build the project
- ✅ Push to GitHub
- ✅ Trigger automatic deployment

### Option 2: Manual Deployment

```bash
# 1. Build the project
npm run build

# 2. Commit changes
git add .
git commit -m "Your commit message"

# 3. Push to GitHub
git push origin main
```

## ⚙️ GitHub Repository Setup

### 1. Enable GitHub Pages

1. Go to your repository: `https://github.com/Hichmond/gmgDash`
2. Click **Settings** → **Pages**
3. Set **Source** to "GitHub Actions"
4. Click **Save**

### 2. Configure GitHub Actions

The workflow file `.github/workflows/deploy.yml` is already configured to:
- Build on push to `main` or `master` branch
- Deploy to GitHub Pages automatically
- Use Node.js 18
- Cache dependencies for faster builds

## 🔧 Cursor Integration

### Setting up Git in Cursor

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git remote add origin https://github.com/Hichmond/gmgDash.git
   ```

2. **Configure Git**:
   ```bash
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   ```

### Cursor Deployment Workflow

1. **Make changes** in Cursor
2. **Test locally**: `npm start`
3. **Build**: `npm run build`
4. **Deploy**: Run `./deploy.sh` or push to GitHub

## 📊 Monitoring Deployment

- **GitHub Actions**: https://github.com/Hichmond/gmgDash/actions
- **Live Site**: https://hichmond.github.io/gmgDash
- **Build Status**: Check the Actions tab for deployment status

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check for TypeScript errors: `npm run build`
   - Fix linting issues: `npm run lint`

2. **Deployment Not Triggered**
   - Ensure you're on `main` or `master` branch
   - Check GitHub Actions are enabled
   - Verify the workflow file exists

3. **Site Not Updating**
   - Wait 2-5 minutes for deployment
   - Check GitHub Actions for errors
   - Clear browser cache

### Useful Commands

```bash
# Check build status
npm run build

# Check git status
git status

# View deployment logs
# Go to: https://github.com/Hichmond/gmgDash/actions

# Force rebuild
rm -rf build/
npm run build
```

## 🔄 Continuous Deployment

Once set up, every push to the `main` branch will automatically:
1. Build the project
2. Deploy to GitHub Pages
3. Update the live site

## 📞 Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify all prerequisites are met
3. Ensure the repository is properly configured

---

**�� Happy Deploying!** 