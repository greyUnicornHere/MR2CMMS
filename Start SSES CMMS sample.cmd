@echo off
rem SSES CMMS - sample for testing. Keep this window open while testing; close it to stop.
title SSES CMMS sample (close this window to stop)
cd /d "%~dp0app"
set ASPNETCORE_ENVIRONMENT=Production
set ASPNETCORE_URLS=http://localhost:5090
echo Starting SSES CMMS sample... your browser will open at http://localhost:5090 shortly.
echo The first start takes a little longer while the demo data is created.
echo Keep this window open while testing. Close it to stop.
echo.
start "" /b cmd /c "timeout /t 15 /nobreak >nul & start http://localhost:5090"
SsesCmms.Web.exe
echo.
echo The sample has stopped. If an error above mentions port 5090 being in use, it is already running: open http://localhost:5090
pause