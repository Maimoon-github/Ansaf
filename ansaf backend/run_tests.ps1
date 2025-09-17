# PowerShell script for running Django tests
# Usage: .\run_tests.ps1 [app_name] [test_name]

param(
    [string]$AppName = "",
    [string]$TestName = "",
    [switch]$Verbose,
    [switch]$KeepDB
)

# Activate conda environment
& conda activate ansaf

# Change to backend directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# Build test command
$testCommand = "python manage.py test"

if ($AppName) {
    $testCommand += " $AppName"
    if ($TestName) {
        $testCommand += ".$TestName"
    }
}

if ($Verbose) {
    $testCommand += " --verbosity=2"
}

if ($KeepDB) {
    $testCommand += " --keepdb"
}

Write-Host "Running: $testCommand" -ForegroundColor Cyan

# Run tests
Invoke-Expression $testCommand

$exitCode = $LASTEXITCODE

if ($exitCode -eq 0) {
    Write-Host "All tests passed!" -ForegroundColor Green
} else {
    Write-Host "Some tests failed!" -ForegroundColor Red
}

exit $exitCode