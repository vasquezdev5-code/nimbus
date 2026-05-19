# 🌤️ Nimbus Weather

A premium, production-ready weather application built with React, TypeScript, Vite, Tailwind CSS, TanStack Query, and Framer Motion.

---

## ✨ Features

- **Search by city** — Instant city search powered by Open-Meteo Geocoding API
- **Geolocation** — One-click "Use my location"
- **Current weather** — Temperature, feels like, humidity, wind, visibility, pressure
- **7-day forecast** — Daily highs/lows with animated temperature range bars
- **24-hour hourly forecast** — Horizontally scrollable with precipitation probability
- **Weather details** — Sunrise/sunset, UV index, precipitation, wind gusts, visibility
- **Dark/light/system theme** — Persistent theme toggle
- **°C / °F toggle** — Persistent unit preference
- **Loading skeletons** — Shimmer skeleton while data fetches
- **Error state** — Graceful error UI with retry
- **Empty state** — Animated landing for first visit
- **Fully responsive** — Mobile-first, works on all screen sizes
- **Smooth animations** — Framer Motion throughout, staggered reveals

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

No API keys required — Open-Meteo is completely free and open.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Header.tsx             # Top nav: theme + unit toggles
│   └── ui/
│       ├── Card.tsx               # Reusable card with glass variant
│       ├── Badge.tsx              # Status badge
│       └── Skeleton.tsx           # Shimmer skeleton
├── features/
│   ├── search/
│   │   └── components/
│   │       └── SearchBar.tsx      # City search with autocomplete
│   └── weather/
│       ├── components/
│       │   ├── CurrentWeatherCard.tsx   # Hero weather display
│       │   ├── HourlyForecast.tsx       # 24-hr scroll strip
│       │   ├── DailyForecast.tsx        # 7-day list with temp bars
│       │   ├── WeatherDetails.tsx       # Stat cards grid
│       │   ├── WeatherDashboard.tsx     # Orchestrator with loading/error
│       │   ├── WeatherSkeleton.tsx      # Full-page skeleton
│       │   ├── EmptyState.tsx           # First-visit CTA
│       │   └── ErrorState.tsx           # Error with retry
│       └── hooks/
│           └── useWeather.ts            # TanStack Query hooks
├── hooks/
│   ├── useTheme.ts                # System/light/dark theme
│   ├── useGeolocation.ts          # Browser geolocation
│   └── useDebounce.ts             # Input debouncing
├── lib/
│   ├── utils.ts                   # cn() helper
│   └── weatherUtils.ts            # WMO codes, formatters
├── services/
│   └── weatherApi.ts              # API abstraction layer
├── types/
│   └── index.ts                   # TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css                      # Design tokens + global styles
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript 5 | Type safety |
| Vite 5 | Build tool |
| Tailwind CSS 3 | Utility-first styling |
| TanStack Query 5 | Data fetching + caching |
| Framer Motion 11 | Animations |
| Open-Meteo | Free weather API (no key needed) |
| Lucide React | Icon system |

---

## 🎨 Design System

- **Font**: Syne (display) + DM Sans (body)
- **Theme**: CSS custom properties — full dark/light support
- **Colors**: Semantic tokens (background, surface, muted, primary, destructive)
- **Radius**: 0.75rem base, 2xl for cards, 3xl for hero
- **Motion**: Spring-based, staggered entry animations
- **Glass**: `glass-card` utility for frosted-glass accents

---

## 📦 Build

```bash
npm run build   # TypeScript + Vite production build
npm run preview # Preview production build locally
```
