@echo off
title EventSphere - React Project
cd /d "%~dp0"
echo ==========================================
echo        EventSphere React Project
echo ==========================================
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or not added to PATH.
  echo Install the LTS version from https://nodejs.org , then restart this window.
  pause
  exit /b 1
)

rem Install when node_modules is missing OR when React/Vite were not fully installed
set NEED_INSTALL=0
if not exist "node_modules\.bin\vite.cmd" set NEED_INSTALL=1
if not exist "node_modules\react\package.json" set NEED_INSTALL=1
if not exist "node_modules\react-dom\package.json" set NEED_INSTALL=1
if not exist "node_modules\react-router-dom\package.json" set NEED_INSTALL=1
if not exist "node_modules\@reduxjs\toolkit\package.json" set NEED_INSTALL=1
if not exist "node_modules\react-redux\package.json" set NEED_INSTALL=1

if "%NEED_INSTALL%"=="1" (
  echo Installing React, React Router, Redux Toolkit and Vite...
  echo This needs internet and takes 1-2 minutes the first time.
  call npm install
  if errorlevel 1 (
    echo.
    echo Installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)
echo.
echo Starting EventSphere...
echo Keep this window open while using the website.
echo Open the local URL printed below, usually http://localhost:5173
echo.
call npm run dev -- --open
pause
