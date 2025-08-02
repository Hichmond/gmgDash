#!/bin/bash

# GMG Dashboard Deployment Script
# This script automates the deployment process from Cursor to GitHub

echo "🚀 Starting GMG Dashboard Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not found. Please initialize git first."
    exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes."
    echo "📝 Changes:"
    git status --short
    echo ""
    read -p "Do you want to commit these changes? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📝 Committing changes..."
        git add .
        read -p "Enter commit message: " commit_message
        git commit -m "$commit_message"
    else
        echo "❌ Deployment cancelled. Please commit or stash your changes."
        exit 1
    fi
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin $CURRENT_BRANCH

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🌐 Your app will be deployed to: https://hichmond.github.io/gmgDash"
    echo "⏱️  Deployment usually takes 2-5 minutes."
    echo ""
    echo "📊 You can monitor the deployment at:"
    echo "   https://github.com/Hichmond/gmgDash/actions"
    echo ""
    echo "🎉 Deployment initiated successfully!"
else
    echo "❌ Failed to push to GitHub. Please check your git configuration."
    exit 1
fi 