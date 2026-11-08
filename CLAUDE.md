# CLAUDE.md

## Project Overview

Bhu-Sathi UP is a web-based Indian land intelligence platform for verifying land position, checking zoning, identifying bank liens, tracking legal disputes, and managing cadastral dimensions for properties in Uttar Pradesh. Single-page React application with AI-powered legal assistant (Bhu-Guru).

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS (CDN-based, inline classes)
- **Mapping:** Leaflet + React-Leaflet
- **AI:** Google Gemini API (`@google/genai`)
- **Icons:** Lucide React

## Commands

```bash
npm run dev      # Start dev server on port 3000
npm run build    # Production build
npm run preview  # Preview production build
```

## Environment Variables

Set in `.env.local`:
- `GEMINI_API_KEY` — Required for Bhu-Guru AI chatbot

## Architecture

- **Single-file SPA:** All components live in `index.tsx` (~850 lines)
- **Components:** App, Header, VerificationPanel, MapSection, ResourceHub, AIAssistant
- **State management:** React hooks (useState, useRef, useMemo) — no external state library
- **Data:** Static hierarchical UP_DATA (District → Tehsil → Village) with mock property results
- **Map modes:** Cadastral View, Measure Dimensions, Mutual Batwara

## Code Conventions

- 2-space indentation
- camelCase for variables/functions, PascalCase for components
- Functional components with arrow functions
- Tailwind utility classes inline (no CSS modules)
- ES6 imports with named exports preferred
- No linter or formatter configured — follow existing style

## Key Patterns

- Hierarchical dropdown selection: district → tehsil → village → khata
- Conditional rendering for panels (verification results, AI assistant)
- Haversine formula for map distance calculations (`calculateDistance()`)
- Gemini API with system prompt specialized in UP Revenue Code 2006
- Glassmorphism UI with emerald/slate/rose/amber color scheme

## No Test Suite

No testing framework is configured. No tests to run.
