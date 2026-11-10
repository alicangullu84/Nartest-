@echo off
chcp 65001 >nul
title Nartes+ LGS Matematik ^& Yerel Yapay Zeka Sunucusu
cd /d "%~dp0"

echo =============================================================
echo   Nartes+ Yerel Web ve Sokratik Yapay Zeka Sunucusu Baslatiliyor
echo =============================================================

if exist "%LOCALAPPDATA%\Programs\Ollama\ollama.exe" (
  "%LOCALAPPDATA%\Programs\Ollama\ollama.exe" list | findstr /i "nartes-sokratik" >nul
  if errorlevel 1 (
    echo [NarTES AI] Yerel Sokratik model olusturuluyor...
    "%LOCALAPPDATA%\Programs\Ollama\ollama.exe" create nartes-sokratik -f "ai\Modelfile.nartes"
  )
)

start "" "https://nartestplus.problemcoz.com"
node server.js
pause
