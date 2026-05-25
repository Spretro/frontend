# Setup & Installation Guide

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: Version 16 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Check version: `node --version`
  
- **npm**: Comes with Node.js
  - Check version: `npm --version`

- **Git**: For version control
  - Download from [git-scm.com](https://git-scm.com/)

## 🚀 Initial Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd spretro/frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all packages defined in `package.json`:
- React & React DOM
- React Router
- Tailwind CSS
- Lucide React (icons)
- Build tools (Vite, Babel)
- Development tools (ESLint)

### 3. Verify Installation

```bash
npm --version
node --version
```

## 🎯 Development Workflow

### Start Development Server

```bash
npm run dev
```

**Output**:
```
Local:   http://localhost:5173/
Press q to quit
```

- Open `http://localhost:5173/` in your browser
- Hot Module Replacement (HMR) enabled - changes update instantly
- Keep the terminal running while developing

### Run ESLint

```bash
npm run lint
```

Checks code quality and style issues. Fix automatically where possible:

```bash
npm run lint -- --fix
```

### Build for Production

```bash
npm run build
```

Creates optimized production build in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing before deployment.

## 📁 Project Structure Setup

```
spretro/
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ErrorBoundary.jsx
    │   │   └── LoadingSkeletons.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   └── ProductPage/
    │   │       ├── ProductPage.jsx
    │   │       ├── mockData.json
    │   │       ├── components/
    │   │       └── hooks/
    │   ├── utils/
    │   │   ├── constants.js
    │   │   └── helpers.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── public/
    ├── package.json
    ├── vite.config.js
    ├── eslint.config.js
    ├── tailwind.config.js
    └── index.html
```

## 🔧 Configuration Files

### package.json
- Project metadata
- Dependency versions
- npm scripts
- Development dependencies

### vite.config.js
- Build tool configuration
- React plugin settings
- Asset handling
- Build output options

### tailwind.config.js
- Tailwind CSS customization
- Theme colors
- Responsive breakpoints
- Plugin extensions

### eslint.config.js
- Code quality rules
- React-specific rules
- Hook validation

## 🌐 Environment Setup

### Development Environment Variables

Create `.env.local` file in root directory (if needed in future):

```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Spretro Frontend
```

Access in code:
```javascript
import.meta.env.VITE_API_URL
```

## 📦 Dependency Management

### Check Outdated Packages

```bash
npm outdated
```

### Update Packages

```bash
# Check for updates
npm update

# Update specific package
npm install package-name@latest
```

### Add New Package

```bash
npm install package-name
npm install -D package-name  # Development dependency
```

### Remove Package

```bash
npm uninstall package-name
```

## 🔍 Troubleshooting

### Port 5173 Already in Use

```bash
# Use different port
npm run dev -- --port 3000

# Or kill process using the port
# On macOS/Linux
lsof -ti:5173 | xargs kill -9

# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Module Not Found Error

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Memory Issues During Build

```bash
# Increase Node memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Hot Module Replacement Not Working

1. Check if dev server is running
2. Clear browser cache
3. Restart dev server

```bash
npm run dev
```

### ESLint Errors

Fix automatically:
```bash
npm run lint -- --fix
```

Manual review for remaining issues.

## 🔐 Git Setup

### Initial Commit

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
git add .
git commit -m "Initial project setup"
```

### Create .gitignore

Already included in project:
- `node_modules/`
- `dist/`
- `.env.local`
- IDE files (`.vscode/`, `.idea/`)

## 🚢 Deployment Preparation

### Build Checklist

- [ ] All tests passing
- [ ] No console errors
- [ ] ESLint passes
- [ ] Production build succeeds
- [ ] Preview build works

### Production Build

```bash
npm run build
```

### Deployment Options

1. **Vercel** (Recommended)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Connect GitHub repo
   - Build: `npm run build`
   - Publish: `dist`

3. **GitHub Pages**
   - Push `dist/` to `gh-pages` branch

4. **Traditional Server**
   - Upload `dist/` contents to web server
   - Configure server for SPA routing

## 📚 Development Tips

### Hot Reload Workflow
1. Make code changes
2. Browser auto-refreshes (HMR)
3. State persists where possible

### Debugging
- Use browser DevTools
- React Developer Tools extension
- Check console for errors
- Use `console.log()` for debugging

### Code Formatting
- Editor auto-formats on save (if configured)
- Run linter: `npm run lint -- --fix`
- Follow naming conventions in [CODING_STANDARDS.md](./CODING_STANDARDS.md)

### Performance Testing
- Open DevTools Performance tab
- Record user interactions
- Analyze render times
- Check for unnecessary re-renders

## 📖 Next Steps

1. Read [README.md](./README.md) for feature overview
2. Check [ARCHITECTURE.md](./ARCHITECTURE.md) for code structure
3. Review [COMPONENTS.md](./COMPONENTS.md) for component details
4. Follow [CODING_STANDARDS.md](./CODING_STANDARDS.md) for code guidelines

## 🆘 Getting Help

- Check existing documentation
- Review component JSDoc comments
- Look at similar components for patterns
- Check browser console for errors
- Review git history for changes

---

**Version**: 1.0.0
**Last Updated**: May 2026
