# date-a-job — Frontend Source

React + Vite app. Deploy to Vercel in one step.

## Project structure

```
src/
  main.jsx              ← React entry
  App.jsx               ← Screen router (navigation state)
  index.css             ← Design tokens + all CSS (hex only, no oklch)
  icons.jsx             ← All SVG icons as named exports
  data/jobs.js          ← All job data, skill gaps, user profile
  components/
    Logo.jsx            ← Bug (logo img) + Wordmark
    Avatar.jsx          ← Company avatars (hex colors)
    Match.jsx           ← Typographic match score
    BottomNav.jsx       ← 5-tab bottom nav with FAB
  screens/
    SplashScreen.jsx
    OnboardingScreen.jsx  (3 steps, internal state)
    SwipeScreen.jsx       (drag physics)
    SavedScreen.jsx
    JobDetailScreen.jsx
    ApplyScreen.jsx       (4 steps: Fit Check → Résumé → Cover Letter → Apply)
    SkillsScreen.jsx
    ProfileScreen.jsx
    DashboardScreen.jsx
```

## Before deploying

1. Add your logo: copy `logo.png` into the `public/` folder at the project root.
   Vercel will serve it at `/logo.png` automatically.

2. Remove the screen-switcher dev nav from `App.jsx` before production
   (the row of buttons below the phone at the bottom of `App.jsx`).

## Deploy to Vercel

```bash
npm install
npm run dev       # local dev at localhost:5173
npm run build     # production build → dist/
```

Push to GitHub, import the repo on vercel.com — Vercel auto-detects Vite.
Build command: `vite build` · Output dir: `dist` · Root: `/`

## Handing off to backend

The backend team needs to replace the mock data in `src/data/jobs.js` with
real API calls. Every screen imports from that file, so it's a clean seam.

Navigate function signature:
```js
navigate(screenKey, jobObject?)
// screenKey: 'splash' | 'onboarding' | 'swipe' | 'saved' |
//            'jobdetail' | 'apply' | 'skills' | 'profile' | 'dashboard'
```

## Design tokens (all hex)

| Token         | Hex       | Usage                      |
|---------------|-----------|----------------------------|
| --teal        | #1BB89E   | Primary brand              |
| --teal-deep   | #0d7268   | CTAs, active states        |
| --coral       | #c04030   | Warnings, destructive      |
| --coral-deep  | #9e3326   | Apply button, alerts       |
| --gold        | #b08900   | Mid-fit, attention         |
| --ink         | #16213e   | Body text                  |
| --ink-2       | #4a5568   | Secondary text             |
| --ink-3       | #8896a6   | Captions, labels           |
| --paper       | #faf9f7   | Light surface              |
| --cream       | #f5f0e8   | Background                 |

Fonts: Instrument Serif (display) + Geist (body) + Geist Mono (labels)
