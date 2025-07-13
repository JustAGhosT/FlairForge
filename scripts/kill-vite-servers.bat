@echo off
REM Kill all Node.js processes (Vite servers)
taskkill /F /IM node.exe
REM Remove Vite cache directory
rmdir /S /Q node_modules\.vite

echo All Vite/Node.js servers killed and Vite cache cleaned.
pause 