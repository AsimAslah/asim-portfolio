from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


PORTRAITS = {
    "asim-hero": ("vibe photo2.jpeg", (4, 5), (0.49, 0.54), (720, 1080, 1440)),
    "asim-about": ("vibe photo.jpeg", (3, 4), (0.5, 0.54), (640, 960, 1280)),
    "asim-lifestyle": ("vibe photo1.jpeg", (3, 4), (0.54, 0.58), (480, 720, 960)),
}


def render_variants(source_dir: Path, output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)

    for stem, (filename, ratio, centering, widths) in PORTRAITS.items():
        with Image.open(source_dir / filename) as image:
            image = ImageOps.exif_transpose(image).convert("RGB")
            for width in widths:
                height = round(width * ratio[1] / ratio[0])
                cropped = ImageOps.fit(
                    image,
                    (width, height),
                    method=Image.Resampling.LANCZOS,
                    centering=centering,
                )
                cropped.save(
                    output_dir / f"{stem}-{width}.webp",
                    "WEBP",
                    quality=84,
                    method=6,
                )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Build responsive WebP portrait assets.")
    parser.add_argument("source_dir", type=Path)
    parser.add_argument("output_dir", type=Path)
    args = parser.parse_args()
    render_variants(args.source_dir, args.output_dir)
