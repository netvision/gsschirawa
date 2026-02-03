# Download all images from original GSS Chirawa website

$outputDir = "frontend\public\original-images"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

Write-Host "Downloading images from https://gsschirawa.in..." -ForegroundColor Green

# Fetch the webpage HTML
$response = Invoke-WebRequest -Uri "https://gsschirawa.in/" -UseBasicParsing

# Extract all image URLs
$imageUrls = $response.Images | ForEach-Object { $_.src }
$imageUrls += $response.Content | Select-String -Pattern '(?:src|data-src|href)="([^"]*\.(?:jpg|jpeg|png|gif|svg|webp|ico)[^"]*)"' -AllMatches | 
    ForEach-Object { $_.Matches } | ForEach-Object { $_.Groups[1].Value }

# Also check for WordPress uploads
$imageUrls += $response.Content | Select-String -Pattern 'https?://[^"]*gsschirawa\.in[^"]*\.(?:jpg|jpeg|png|gif|svg|webp)' -AllMatches |
    ForEach-Object { $_.Matches } | ForEach-Object { $_.Value }

# Remove duplicates
$imageUrls = $imageUrls | Sort-Object -Unique | Where-Object { $_ -match '\.(jpg|jpeg|png|gif|svg|webp|ico)' }

$count = 0
$total = $imageUrls.Count

Write-Host "Found $total images to download" -ForegroundColor Cyan

foreach ($url in $imageUrls) {
    $count++
    
    # Make URL absolute if relative
    if ($url -notmatch '^https?://') {
        $url = "https://gsschirawa.in/$($url.TrimStart('/'))"
    }
    
    # Extract filename
    $filename = Split-Path $url -Leaf
    $filename = $filename -replace '\?.*$', ''  # Remove query parameters
    
    if ([string]::IsNullOrEmpty($filename)) {
        $filename = "image_$count.jpg"
    }
    
    $outputPath = Join-Path $outputDir $filename
    
    Write-Host "[$count/$total] Downloading: $filename" -ForegroundColor Yellow
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing -ErrorAction Stop
        Write-Host "  Success: Saved to $outputPath" -ForegroundColor Green
    } catch {
        Write-Host "  Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Start-Sleep -Milliseconds 200
}

Write-Host ""
Write-Host "Download complete! Images saved to: $outputDir" -ForegroundColor Green
Write-Host "Total downloaded: $count images" -ForegroundColor Cyan
