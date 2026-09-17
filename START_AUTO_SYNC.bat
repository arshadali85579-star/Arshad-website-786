@echo off
title GitHub Auto Sync [ACTIVE] - arshadali85579-star
cd /d "%~dp0"
echo ============================================================
echo Starting GitHub Auto Sync Watcher
echo ============================================================
echo Repository : https://github.com/arshadali85579-star/Arshad-website-786.git
echo Account    : arshadali85579-star
echo Branch     : main
echo.
echo Whenever you save changes to your code, this watcher will:
echo   1. Detect changes and wait 6 seconds (debounce)
echo   2. Run safety and build checks
echo   3. Automatically commit
echo   4. Automatically push to GitHub main
echo.
echo Keep this window open in the background while coding.
echo ============================================================
echo.
node scripts/auto-sync.cjs
pause
