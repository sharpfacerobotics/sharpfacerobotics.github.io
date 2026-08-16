#!/usr/bin/env python3
"""
Ingest hand-supplied CAD renders for the robot walkthrough.

Drop files in ./incoming/ named exactly:
    intake.png  transfer.png  launcher.png  drivetrain.png  electronics.png
(optionally whole.png), then run:

    python3 scripts/ingest-cad.py && npm run build

For each render this:
  - keys the solid black field out to real transparency (alpha = ink coverage,
    so anti-aliased strokes keep a clean falloff rather than a grey halo)
  - trims to a confident bounding box (alpha > 48) plus a small pad, so each
    assembly fills its frame instead of floating in dead space
  - writes a white set for the dark site and an ink set for light surfaces
No upscaling, no generation: these renders are already high resolution.
"""
from PIL import Image
import os, sys, glob

SRC = 'incoming'
OUT_WHITE, OUT_INK = 'public/assets/robot', 'public/assets/robot-ink'
PAD = 26
NAMES = ['intake', 'transfer', 'launcher', 'drivetrain', 'electronics', 'whole',
         # generated in the same line-art style for the two behaviours that
         # have no single physical assembly
         'autonomous', 'driver']

os.makedirs(OUT_WHITE, exist_ok=True)
os.makedirs(OUT_INK, exist_ok=True)

found = 0
for name in NAMES:
    hits = [f for f in glob.glob(f'{SRC}/{name}.*') if not f.endswith('.md')]
    if not hits:
        continue
    src = hits[0]
    im = Image.open(src).convert('RGB')
    w, h = im.size
    px = im.load()

    # These are JPEGs, so the "black" field is not actually 0 — the electronics
    # render sits at luminance ~10, which sailed over a fixed cutoff and left the
    # whole background as a grey wash. Measure the real floor per image and key
    # above it instead of assuming pure black.
    # Sample the whole border ring and take the MEDIAN. Six corner probes are
    # fragile: one landing on a stroke or a vignette skewed the estimate to 89
    # and 170 on two renders, which keyed most of the drawing away.
    ring = []
    step = max(1, min(w, h) // 120)
    for x in range(0, w, step):
        ring.append(px[x, 0]); ring.append(px[x, h - 1])
    for y in range(0, h, step):
        ring.append(px[0, y]); ring.append(px[w - 1, y])
    ring_lum = sorted((r * 299 + g * 587 + b * 114) // 1000 for r, g, b in ring)
    bg_lum = ring_lum[len(ring_lum) // 2]
    floor = bg_lum + 6
    span = max(1, 255 - floor)

    size = None
    for out_dir, tint in ((OUT_WHITE, (255, 255, 255)), (OUT_INK, (18, 20, 26))):
        out = Image.new('RGBA', (w, h))
        op = out.load()
        for y in range(h):
            for x in range(w):
                r, g, b = px[x, y]
                lum = (r * 299 + g * 587 + b * 114) // 1000
                if lum <= floor:
                    op[x, y] = (0, 0, 0, 0)
                else:
                    # rescale so the key point maps to fully transparent and the
                    # brightest ink stays fully opaque
                    a = min(255, int(((lum - floor) / span) * 255 * 1.35))
                    op[x, y] = (*tint, a)
        mask = out.split()[3].point(lambda v: 255 if v > 48 else 0)
        bbox = mask.getbbox()
        if bbox:
            x0, y0, x1, y1 = bbox
            out = out.crop((max(0, x0 - PAD), max(0, y0 - PAD),
                            min(w, x1 + PAD), min(h, y1 + PAD)))
        out.save(f'{out_dir}/{name}.png', optimize=True)
        size = out.size
    print(f'  {name:12s} {os.path.basename(src):22s} bg~{bg_lum:<3} -> {size[0]}x{size[1]}')
    found += 1

if not found:
    print('Nothing found. Expected files in incoming/: ' + ', '.join(n + '.png' for n in NAMES))
    sys.exit(1)
print(f'\n{found} render(s) ingested. Now run: npm run build')
