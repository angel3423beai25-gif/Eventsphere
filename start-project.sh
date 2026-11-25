#!/usr/bin/env bash
# macOS / Linux launcher: installs React + dependencies if needed, then starts the site.
cd "$(dirname "$0")"
command -v node >/dev/null || { echo "Install Node.js LTS from https://nodejs.org first."; exit 1; }
if [ ! -x node_modules/.bin/vite ] || [ ! -d node_modules/react ] || [ ! -d node_modules/react-router-dom ] \
   || [ ! -d node_modules/@reduxjs/toolkit ] || [ ! -d node_modules/react-redux ]; then
  echo "Installing React and dependencies (needs internet)..."
  npm install || { echo "npm install failed"; exit 1; }
fi
npm run dev -- --open
