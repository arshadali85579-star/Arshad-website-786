@echo off
title GitHub Manual Sync - arshadali85579-star
cd /d "%~dp0"
echo ============================================================
echo Manual GitHub Sync Triggered
echo ============================================================
node scripts/auto-sync.cjs --now
echo.
echo ============================================================
pause
