## Setup

1. Create `.env` in `portfolio-frontend`:

```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

2. Install deps and run:

```
npm i
npm run dev
```

## Admin

- Login: `/admin/login`
- Protected admin pages:
  - Projects: `/projects`
  - Skills: `/skills`
  - Experience: `/experience`
  - Contact: `/contacts`

## Backend env (reference)

- CORS_ORIGIN should include `http://localhost:5173`
- ACCESS_TOKEN_SECRET and ACCESS_TOKEN_EXPIRY must be set
- Cloudinary credentials if using image upload

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
