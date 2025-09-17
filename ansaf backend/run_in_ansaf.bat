@echo off
REM Batch script to run commands in the ansaf conda environment
REM Usage: run_in_ansaf.bat <command>

if "%~1"=="" (
    echo Usage: run_in_ansaf.bat ^<command^>
    echo Example: run_in_ansaf.bat python manage.py runserver
    exit /b 1
)

REM Activate conda environment
call conda activate ansaf

REM Run the command
%*

REM Deactivate (optional, but good practice)
REM conda deactivate