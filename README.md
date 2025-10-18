# Amazon Clone (React + Node.js)

A simple Amazon-like front-end built with React. This repository contains the React app and basic client-side state management (Context API). It's intended for learning and demo purposes.

## What this project includes

- React (Create React App)
- Material UI icons
- React Router for navigation
- React Context API for shopping cart state
- Simple components: Header, Home, Product, Checkout
- GitHub Pages deployment configuration (via `gh-pages`)

## Quick setup (development)

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm start
```

Open http://localhost:3000 in your browser.

## Build for production

```powershell
npm run build
```

The production-ready files will be in the `build/` folder.

## Deploy to GitHub Pages

This project uses the `gh-pages` package to publish the `build` output to the `gh-pages` branch.

1. In `package.json` set the `homepage` field to your site URL, for example:

```json
"homepage": "https://<your-github-username>.github.io/<your-repo-name>"
```

2. Commit and push your repository to GitHub. Make sure the repository name in the URL matches the repo you pushed.

3. Run the deploy script (PowerShell / Windows):

```powershell
npm run deploy
```

This runs `npm run build` then publishes the `build` directory to the `gh-pages` branch.

Notes:
- If you use client-side routing (BrowserRouter) refreshing nested routes on GitHub Pages can 404. To avoid this, either:
	- Use `HashRouter` from `react-router-dom` (recommended for GitHub Pages), or
	- Configure a server to redirect requests to `index.html` (not supported by raw GitHub Pages).

## Changing the router to HashRouter (recommended for GitHub Pages)

If you want the app to work with routing without extra server config, replace BrowserRouter with HashRouter.

In `src/App.js`:

```diff
-import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
+import { HashRouter as Router, Routes, Route } from 'react-router-dom';
```

Then rebuild and redeploy.

## Troubleshooting

- If `npm run deploy` fails, ensure `gh-pages` is installed (devDependency). You can install it with:

```powershell
npm install --save-dev gh-pages
```

- If you see vulnerabilities after installing packages, run:

```powershell
npm audit
npm audit fix
# or if you accept breaking changes
npm audit fix --force
```

## Next steps / Improvements

- Add user authentication (Firebase) for sign-in flows
- Connect to a backend (Node/Express + MongoDB) to persist orders
- Add payment integration (Stripe)
- Improve styling and responsive layout

---

If you want, I can:
- switch the app to `HashRouter` automatically and update files,
- run `npm run deploy` after you confirm the correct `homepage` URL,
- or create a GitHub Actions workflow to auto-deploy on push.

Tell me which of these you'd like next.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
