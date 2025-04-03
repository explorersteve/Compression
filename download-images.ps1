# Download placeholder images from picsum.photos
$urls = @(
    @{url="https://picsum.photos/1920/1080"; output="public/placeholder-hero.jpg"},
    @{url="https://picsum.photos/800/600"; output="public/placeholder-1.jpg"},
    @{url="https://picsum.photos/800/600"; output="public/placeholder-2.jpg"},
    @{url="https://picsum.photos/800/600"; output="public/placeholder-3.jpg"},
    @{url="https://picsum.photos/1200/800"; output="public/placeholder-about.jpg"},
    @{url="https://picsum.photos/800/600"; output="public/placeholder-gallery-1.jpg"},
    @{url="https://picsum.photos/800/600"; output="public/placeholder-gallery-2.jpg"},
    @{url="https://picsum.photos/800/600"; output="public/placeholder-gallery-3.jpg"},
    @{url="https://picsum.photos/800/600"; output="public/placeholder-gallery-4.jpg"},
    @{url="https://picsum.photos/800/600"; output="public/placeholder-gallery-5.jpg"},
    @{url="https://picsum.photos/800/600"; output="public/placeholder-gallery-6.jpg"}
)

foreach ($item in $urls) {
    Invoke-WebRequest -Uri $item.url -OutFile $item.output
    Write-Host "Downloaded $($item.output)"
} 