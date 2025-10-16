#!/bin/bash

# MathVibe Olimpiade Indonesia Deployment Script
# This script helps deploy the application to Vercel

echo "🚀 MathVibe Olimpiade Indonesia Deployment Script"
echo "=============================================="

# Check if required tools are installed
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }
command -v git >/dev/null 2>&1 || { echo "❌ Git is required but not installed. Aborting." >&2; exit 1; }

echo "✅ All required tools are installed"

# Navigate to frontend directory
echo "📂 Setting up frontend..."
cd frontend/mathvibe-frontend

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build the application
echo "🔨 Building frontend..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

# Navigate back to root
cd ../..

# Setup backend
echo "📂 Setting up backend..."
cd backend

# Install dependencies
echo "📦 Installing backend dependencies..."
npm install

# Navigate back to root
cd ..

# Check if .env.local exists
if [ ! -f "frontend/mathvibe-frontend/.env.local" ]; then
    echo "⚠️  .env.local file not found. Copying from .env.example..."
    cp frontend/mathvibe-frontend/.env.example frontend/mathvibe-frontend/.env.local
    echo "📝 Please edit .env.local file with your actual environment variables"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Edit frontend/mathvibe-frontend/.env.local with your environment variables"
echo "2. Run 'npm run dev' to start development server"
echo "3. Or deploy to Vercel using 'vercel' command"
echo ""
echo "🌐 Website will be available at: http://localhost:3000"
echo "🔐 Admin panel: http://localhost:3000/admin"
echo ""
echo "For production deployment to Vercel:"
echo "1. Install Vercel CLI: npm i -g vercel"
echo "2. Run: vercel --prod"
echo "3. Set environment variables in Vercel dashboard"