# Raga.AI Frontend Assignment - Healthcare SaaS UI

A production-style frontend application that simulates a B2B healthcare operations platform with authentication, analytics, patient management, and notification workflows.

## Live Demo

- Add your deployed link here: `https://your-app-url.vercel.app`

## Tech Stack

- React + TypeScript + Vite
- Zustand (state management)
- Firebase Authentication (Email/Password)
- Service Worker notifications (local/push-style use case)
- React Router

## Implemented Features

### 1) Authentication

- Firebase Email/Password login
- Form validation and user-friendly error handling
- Protected routes and redirect handling
- Session restore flow via auth state bootstrap

### 2) Application Pages

- Login Page
- Dashboard Page
- Analytics Page
- Patient Details Page

### 3) Patient Details Module

- Grid view and List view for patient records
- Toggle-based switch between views
- Responsive design with compact mobile behavior

### 4) Notifications (Service Worker)

- Service worker registration in app bootstrap
- Working notification use case from Dashboard action
- Notification click handler redirects to dashboard

### 5) State Management

- Zustand store for auth/session flow
- Zustand store for patient module state and view mode
- Shared state access across modules/pages

## Bonus-Focused Decisions

- Reusable component structure (`Card`, layout shell, shared loaders)
- Lazy-loaded page modules for improved initial load performance
- Clean, scalable folder organization by feature concern
- Accessibility improvements (`aria-pressed`, skip-link, focus-visible styles)
- Reduced-motion support for better UX on accessibility settings

## Evaluation Criteria Mapping

- **Code quality and structure:** modular directories, typed stores, reusable components
- **UI/UX and responsiveness:** responsive shell layout, polished cards, subtle animations
- **State management approach:** centralized Zustand stores for predictable data flow
- **Feature completeness:** all required modules and flows implemented
- **Performance and best practices:** route-level code splitting, memoized derived values
- **Scalability and thinking:** service + store layering and clear separation of concerns

## Project Structure

```text
src/
  components/
    common/
    layout/
    patients/
  data/
  hooks/
  pages/
  services/
  stores/
  types/
```

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create `.env` in project root using `.env.example`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### 3. Run app

```bash
npm run dev
```

## Firebase Configuration Checklist

1. Create Firebase project
2. Register Web App
3. Enable Authentication -> Email/Password
4. Add at least one test user in Firebase Console
5. Paste config values into `.env`

## Build and Quality Checks

```bash
npm run lint
npm run build
```

## Deployment (Vercel Recommended)

1. Push repository to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add the same Firebase env vars in Vercel Project Settings -> Environment Variables
6. Deploy and verify login + navigation + notifications

## Submission Checklist

- [ ] GitHub repository link
- [ ] Live deployed URL (Vercel/Netlify)
- [ ] Functional authentication and protected pages
- [ ] Working patient grid/list module
- [ ] Working notification use case
- [ ] Clean README and setup instructions
