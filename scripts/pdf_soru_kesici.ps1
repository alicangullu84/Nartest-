<#
  NarTES+ PDF Sayfa Ayristirma ve Soru Kesme Araci
  Kullanim:
    1) Sadece PDF sayfalarini ve metnini cikarmak icin:
       .\scripts\pdf_soru_kesici.ps1 -PdfPath ".\kaynak_pdf\sorular.pdf"
    2) Belirli sayfa ve koordinat oranindan soru kesmek icin:
       .\scripts\pdf_soru_kesici.ps1 -CropPage 1 -CropRect "0.04,0.12,0.46,0.42" -OutFile ".\assets\sorular\pdf_kesitler\k1_kolay\s1.png"
#>
param(
  [string]$PdfPath = "",
  [string]$PagesOutDir = ".\kaynak_pdf\_sayfalar",
  [int]$Dpi = 220,
  [int]$CropPage = 0,
  [string]$CropRect = "",
  [string]$OutFile = ""
)

$ErrorActionPreference = "Stop"

if ($CropPage -gt 0 -and $CropRect -and $OutFile) {
  Add-Type -AssemblyName System.Drawing
  $pageFile = Join-Path $PagesOutDir ("sayfa-{0:D2}.png" -f $CropPage)
  if (-not (Test-Path $pageFile)) {
    $alt = Get-ChildItem -Path $PagesOutDir -Filter ("sayfa*{0}.png" -f $CropPage) | Select-Object -First 1
    if ($alt) { $pageFile = $alt.FullName }
  }
  if (-not (Test-Path $pageFile)) {
    throw "Sayfa PNG bulunamadi: $pageFile (Once -PdfPath ile sayfalari cikarin)."
  }
  $parts = $CropRect.Split(",") | ForEach-Object { [double]$_.Trim() }
  if ($parts.Count -ne 4) { throw "CropRect 'x,y,w,h' (0..1 oran) olmalidir." }

  $bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path $pageFile))
  try {
    $x = [Math]::Max(0, [int][Math]::Round($parts[0] * $bmp.Width))
    $y = [Math]::Max(0, [int][Math]::Round($parts[1] * $bmp.Height))
    $w = [Math]::Min($bmp.Width - $x, [int][Math]::Round($parts[2] * $bmp.Width))
    $h = [Math]::Min($bmp.Height - $y, [int][Math]::Round($parts[3] * $bmp.Height))
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $crop = $bmp.Clone($rect, $bmp.PixelFormat)
    $outDir = Split-Path -Parent $OutFile
    if ($outDir -and -not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }
    $crop.Save($OutFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $crop.Dispose()
    Write-Output "KESILDI: $OutFile (${w}x${h})"
  } finally {
    $bmp.Dispose()
  }
  exit 0
}

if (-not $PdfPath) {
  $found = Get-ChildItem -Path ".\kaynak_pdf" -Filter "*.pdf" -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($found) { $PdfPath = $found.FullName }
}
if (-not $PdfPath -or -not (Test-Path $PdfPath)) {
  Write-Warning "kaynak_pdf icinde PDF bulunamadi. Tek PDF dosyanizi kaynak_pdf\ klasorune koyun."
  exit 1
}

if (-not (Test-Path $PagesOutDir)) { New-Item -ItemType Directory -Path $PagesOutDir -Force | Out-Null }

Write-Output "PDF bilgisi aliniyor: $PdfPath"
& pdfinfo $PdfPath
& pdftotext -layout $PdfPath (Join-Path $PagesOutDir "tum_metin_ve_cevaplar.txt")
& pdftoppm -png -r $Dpi $PdfPath (Join-Path $PagesOutDir "sayfa")

Get-ChildItem -Path $PagesOutDir -Filter "sayfa*.png" | ForEach-Object {
  Write-Output ("HAZIR_SAYFA: " + $_.Name)
}
