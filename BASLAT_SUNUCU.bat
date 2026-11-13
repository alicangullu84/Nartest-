@echo off
chcp 65001 >nul
title Nartes+ LGS Matematik ^& Gemma 4 Hizli Sokratik Yapay Zeka Sunucusu
cd /d "%~dp0"

echo =============================================================
echo   Nartes+ Yerel Web ve Gemma 4 Hizli Sokratik AI Baslatiliyor
echo =============================================================

if exist "%LOCALAPPDATA%\Programs\Ollama\ollama.exe" (
  "%LOCALAPPDATA%\Programs\Ollama\ollama.exe" list | findstr /i "nartes-sokratik" >nul
  if errorlevel 1 (
    echo [NarTES AI] Gemma 4 tabanli yerel Sokratik model olusturuluyor...
    "%LOCALAPPDATA%\Programs\Ollama\ollama.exe" create nartes-sokratik -f "ai\Modelfile.nartes"
  )
)

start "" "http://localhost:8080"
node server.js
pause
