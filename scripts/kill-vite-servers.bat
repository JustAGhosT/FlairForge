@echo off
REM Kill Node.js processes on specific ports (Vite and backend servers)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000\|:3001"') do (
    taskkill /F /PID %%a || ver > nul
)
REM Also kill any remaining Vite processes
taskkill /F /IM "vite.exe" || ver > nul
REM Remove Vite cache directory
rmdir /S /Q frontend\node_modules\.vite || ver > nul

echo All Vite/Node.js servers killed and Vite cache cleaned.
exit /b 0 