param(
    [Parameter(Mandatory=$true)]
    [string]$Command
)

# PowerShell script to run commands in the ansaf conda environment
# Usage: .\run_in_ansaf.ps1 -Command "python manage.py runserver"

Write-Host "Activating ansaf conda environment..." -ForegroundColor Green

# Activate conda environment
& conda activate ansaf

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to activate conda environment 'ansaf'"
    exit 1
}

Write-Host "Running command: $Command" -ForegroundColor Cyan

# Run the command
Invoke-Expression $Command

$exitCode = $LASTEXITCODE

# Optional: deactivate
# conda deactivate

exit $exitCode