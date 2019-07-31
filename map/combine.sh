#!/bin/sh
if [ ! -f "combined.png" ]; then
  convert Carte* -append combined.png
fi
convert combinedcut.png -type Grayscale -rotate 1.5 -resize 50% -contrast-stretch 4%x35% ../dist/french1927.png #  -negate -alpha copy -negate
