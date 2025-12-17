# PowerShell script to start MongoDB service
# Run this script as Administrator

Write-Host "🔍 Checking MongoDB service status..." -ForegroundColor Cyan

$service = Get-Service -Name MongoDB -ErrorAction SilentlyContinue

if ($null -eq $service) {
    Write-Host "❌ MongoDB service not found!" -ForegroundColor Red
    Write-Host "💡 Make sure MongoDB is installed." -ForegroundColor Yellow
    exit 1
}

if ($service.Status -eq 'Running') {
    Write-Host "✅ MongoDB is already running!" -ForegroundColor Green
    exit 0
}

Write-Host "🚀 Starting MongoDB service..." -ForegroundColor Yellow

try {
    Start-Service -Name MongoDB
    Start-Sleep -Seconds 2
    
    $service = Get-Service -Name MongoDB
    if ($service.Status -eq 'Running') {
        Write-Host "✅ MongoDB started successfully!" -ForegroundColor Green
        Write-Host "📊 Status: $($service.Status)" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "🧪 Testing connection..." -ForegroundColor Cyan
        npm run test:db
    } else {
        Write-Host "❌ Failed to start MongoDB service" -ForegroundColor Red
        Write-Host "💡 Try running PowerShell as Administrator" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error starting MongoDB: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Solutions:" -ForegroundColor Yellow
    Write-Host "   1. Run PowerShell as Administrator" -ForegroundColor White
    Write-Host "   2. Or start MongoDB manually using Services (services.msc)" -ForegroundColor White
    Write-Host "   3. Or use MongoDB Atlas (cloud) - see MONGODB_SETUP.md" -ForegroundColor White
}

