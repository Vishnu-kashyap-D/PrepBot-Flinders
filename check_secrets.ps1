$username = "Vishnu-kashyap-D"
$headers = @{"User-Agent" = "Antigravity-Scanner"}

Write-Host "Fetching repositories for $username..."
$repos = Invoke-RestMethod -Uri "https://api.github.com/users/$username/repos?per_page=100" -Headers $headers

$suspiciousFiles = @(".env", "secrets.js", "keys.json", ".env.local", "config.json", "credentials.json")
$scanTargets = @("app.py", "script.js", "main.py", "index.js", "config.js", "config.py", "constants.js")

$results = @()

foreach ($repo in $repos) {
    $repoName = $repo.name
    $branch = $repo.default_branch
    Write-Host "Scanning $repoName ($branch)..."
    
    try {
        $treeUrl = "https://api.github.com/repos/$username/$repoName/git/trees/$branch`?recursive=1"
        $tree = Invoke-RestMethod -Uri $treeUrl -Headers $headers -ErrorAction Stop
        
        foreach ($item in $tree.tree) {
            $path = $item.path
            $fileName = Split-Path $path -Leaf
            
            # 1. Check for suspicious file names
            if ($suspiciousFiles -contains $fileName) {
                Write-Host "[!] Found suspicious file: $path in $repoName" -ForegroundColor Red
                $results += "SUSPICIOUS FILE | Repo: $repoName | File: $path"
            }
            
            # 2. Check content of likely targets for hardcoded keys
            if ($scanTargets -contains $fileName) {
                try {
                    $rawUrl = "https://raw.githubusercontent.com/$username/$repoName/$branch/$path"
                    $content = Invoke-RestMethod -Uri $rawUrl -Headers $headers -ErrorAction Stop
                    
                    # Regex for OpenAI, Groq, Gemini keys
                    if ($content -match "sk-[a-zA-Z0-9_-]{32,}" -or $content -match "gsk_[a-zA-Z0-9_-]{32,}" -or $content -match "AIza[a-zA-Z0-9_-]{35,}") {
                        Write-Host "[!] Found exposed API KEY in: $path inside $repoName" -ForegroundColor Red
                        $results += "EXPOSED KEY | Repo: $repoName | File: $path"
                    }
                } catch {
                    # Ignore fetch errors for content
                }
            }
        }
    } catch {
        Write-Host "Failed to scan tree for $repoName" -ForegroundColor Yellow
    }
}

Write-Host "`n--- SCAN COMPLETE ---"
if ($results.Count -eq 0) {
    Write-Host "No exposed .env files or hardcoded keys found in standard targets!" -ForegroundColor Green
} else {
    $results | ForEach-Object { Write-Host $_ }
}
