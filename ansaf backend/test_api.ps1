# PowerShell script to test Django API endpoints
# Usage: .\test_api.ps1

param(
    [string]$BaseUrl = "http://localhost:8000",
    [int]$Timeout = 10
)

Write-Host "Testing Django API endpoints..." -ForegroundColor Green
Write-Host "Base URL: $BaseUrl" -ForegroundColor Cyan
Write-Host ""

# Function to make HTTP requests
function Invoke-ApiRequest {
    param(
        [string]$Method,
        [string]$Uri,
        [hashtable]$Headers = @{}
    )

    try {
        $response = Invoke-WebRequest -Method $Method -Uri $Uri -Headers $Headers -TimeoutSec $Timeout
        return @{
            StatusCode = $response.StatusCode
            Content = $response.Content
            Success = $true
        }
    }
    catch {
        return @{
            StatusCode = $_.Exception.Response.StatusCode.value__
            Content = $_.Exception.Message
            Success = $false
        }
    }
}

# Test GET /api/v1/posts/
Write-Host "Testing GET /api/v1/posts/..." -ForegroundColor Yellow
$result = Invoke-ApiRequest -Method GET -Uri "$BaseUrl/api/v1/posts/"

if ($result.Success) {
    Write-Host "✅ Success! Status: $($result.StatusCode)" -ForegroundColor Green
    # Show first 20 lines of response
    $contentLines = $result.Content -split "`n"
    $linesToShow = [math]::Min(20, $contentLines.Count)
    Write-Host "Response preview:" -ForegroundColor Cyan
    $contentLines[0..($linesToShow-1)] | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host "❌ Failed! Status: $($result.StatusCode)" -ForegroundColor Red
    Write-Host "Error: $($result.Content)" -ForegroundColor Red
}

Write-Host ""
Write-Host "API test completed!" -ForegroundColor Green