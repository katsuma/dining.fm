# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

dining.fm is a modern podcast website built with React Router v7, TypeScript, and Tailwind CSS. It combines a React frontend with Ruby-based content management scripts for podcast processing and AI-powered content enhancement.

## Development Commands

### Core Development
- `npm run dev` - Start development server at http://localhost:5173
- `npm run build` - Create production build
- `npm run start` - Serve production build
- `npm run typecheck` - Run TypeScript type checking and generate React Router types

### Database
- `npx prisma generate` - Generate Prisma client (runs automatically after npm install)
- `npx prisma studio` - Open Prisma Studio for database management
- `npx prisma migrate dev` - Run database migrations in development

### Content Management (Ruby Scripts)
- `./scripts/import-feed` - Import episodes from RSS feed
- `./scripts/transcribe` - Generate episode transcriptions using AI
- `./scripts/summarize-episode` - Create AI-powered episode summaries
- `./scripts/assign-episode-service-id` - Sync episode IDs across platforms (Spotify, Apple Podcasts, YouTube)

## Architecture

### Frontend (React Router v7 + SSR)
- **File-based routing**: Routes defined in `app/routes/`
- **Server-side rendering**: Enabled by default for SEO and performance
- **MDX support**: Content authoring with JSX in Markdown (used in podcasting guide)
- **Components**: Reusable UI components in `app/components/`
- **Hooks**: Custom React hooks in `app/hooks/`

### Backend Services
- **Database**: PostgreSQL with Prisma ORM
- **Content Pipeline**: Ruby scripts for podcast data processing
- **AI Integration**: AWS Bedrock, OpenAI, and Pinecone for transcription and semantic search

### Key Models
- **Episode**: Main content model with multi-platform IDs (Spotify, Apple Podcasts, YouTube)
- Rich metadata including transcriptions, summaries, and vector embeddings

### Technology Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, React Router v7
- **Build**: Vite with MDX, TypeScript path resolution
- **Database**: PostgreSQL + Prisma ORM
- **Content**: Ruby-based tooling for podcast management
- **AI/ML**: Multiple AI services for content enhancement

## Important Patterns

### Multi-Platform Podcast Distribution
Episodes are synchronized across multiple platforms using service-specific IDs (`spotifyId`, `applePodcastId`, `youtubeId`). Use Ruby scripts to manage cross-platform publishing.

### Content Security
Content is sanitized using DOMPurify and sanitize-html. Always sanitize user-generated content and episode descriptions.

### TypeScript Integration
- Prisma generates type-safe database client
- React Router generates route types automatically
- Custom types defined in `app/types/`

### SEO and Performance
- Server-side rendering enabled for better SEO
- Sitemap generation in `app/routes/sitemap.tsx`
- Google Analytics integration with react-ga4