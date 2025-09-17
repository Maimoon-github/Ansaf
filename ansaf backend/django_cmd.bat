@echo off
REM Django management commands script
REM Usage: django_cmd.bat <command> [args]

if "%~1"=="" (
    echo Usage: django_cmd.bat ^<command^> [args]
    echo Examples:
    echo   django_cmd.bat makemigrations
    echo   django_cmd.bat migrate
    echo   django_cmd.bat createsuperuser
    echo   django_cmd.bat shell
    exit /b 1
)

REM Activate conda environment
call conda activate ansaf

REM Change to backend directory
cd /d "%~dp0"

REM Run Django management command
python manage.py %*

REM Keep window open on error
if %ERRORLEVEL% neq 0 (
    echo.
    echo Command failed with error code %ERRORLEVEL%
    pause
)