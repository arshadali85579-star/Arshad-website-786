@echo off
title GitHub Auto Sync Status
cd /d "%~dp0"
echo ============================================================
echo GitHub Auto Sync Status
echo ============================================================
echo Repository:
git config --get remote.origin.url
echo.
echo Account:
git config --get credential.https://github.com.username
echo.
echo Branch:
git branch --show-current
echo.
echo Git Status:
git status --short
if %ERRORLEVEL% equ 0 (
    git status -s | findstr /R "." >nul || echo Working tree clean (no uncommitted changes)
)
echo.
echo Last Commit:
git log -1 --pretty=format:"%%h - %%s (%%cr)"
echo.
echo.
echo Remote:
git remote -v
echo.
echo Sync Status:
git status -uno
echo ============================================================
pause
