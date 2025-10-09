# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 wedding invitation website built with TypeScript and React 19. The application displays wedding information including date, location (with Naver Maps integration), photo gallery, and family information.

## Development Commands

- **Start dev server**: `npm run dev` (uses Turbopack)
- **Build**: `npm run build`
- **Start production**: `npm start`
- **Lint**: `npm run lint`

## Architecture

### Component Structure

The app follows Next.js 15 App Router conventions with components organized by feature:

- **Layout Components**: `Container.tsx` provides the main wrapper
- **Content Sections**: Components are composed in `src/app/page.tsx` in this order:
  - `TopContent` - Hero section with couple names/date
  - `MainMessage` - Wedding invitation message
  - `PingpongVideo` - Looping video player
  - `ViewPortDate` - Date display on viewport
  - `Calendar` - Wedding date calendar
  - `Dday` - D-day counter
  - `FamilyInfos` - Family information
  - `Gallery` - Photo carousel
  - `Location` - Venue info with map

### Key Features

**Naver Maps Integration**:
- Naver Maps script loaded via `next/script` in `src/app/layout.tsx` with `strategy="beforeInteractive"`
- `NaverMap` component (`src/app/components/map/NaverMap.tsx`) is a client component that uses the global `window.naver` object
- Map configuration and venue data are centralized in `src/app/constants/wedding.ts`
- Custom marker with styled tooltip using inline styles

**Gallery**:
- Uses `react-slick` carousel library
- Client component with custom dot indicators
- Images stored in `/public/gallery/` directory

**Styling**:
- CSS Modules for component styling (`.module.css` files)
- Path alias `@/*` maps to `./src/*` (configured in `tsconfig.json`)

### Constants & Configuration

Wedding-specific data is centralized in `src/app/constants/`:
- `wedding.ts` - Venue location, address, map config, convention name
- `date.ts` - Wedding date information
- `name.ts` - Couple and family names

### Utilities

- `src/app/utils/dateUtils.ts` - Date manipulation utilities using dayjs
- `src/app/components/common/` - Reusable components (spacers, video players)

## TypeScript Configuration

- Path alias: `@/*` → `./src/*`
- Target: ES2017
- Strict mode enabled
- Naver Maps types via `@types/navermaps`
