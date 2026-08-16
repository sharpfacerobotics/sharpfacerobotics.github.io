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
NAMES = ['intake', 'transfer', 'launcher', 'drivetrain', 'electronics', 'whole']

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

    size = None
    for out_dir, tint in ((OUT_WHITE, (255, 255, 255)), (OUT_INK, (18, 20, 26))):
        out = Image.new('RGBA', (w, h))
        op = out.load()
        for y in range(h):
            for x in range(w):
                r, g, b = px[x, y]
                lum = (r * 299 + g * 587 + b * 114) // 1000
                op[x, y] = (0, 0, 0, 0) if lum < 8 else (*tint, min(255, int(lum * 1.12)))
        mask = out.split()[3].point(lambda v: 255 if v > 48 else 0)
        bbox = mask.getbbox()
        if bbox:
            x0, y0, x1, y1 = bbox
            out = out.crop((max(0, x0 - PAD), max(0, y0 - PAD),
                            min(w, x1 + PAD), min(h, y1 + PAD)))
        out.save(f'{out_dir}/{name}.png', optimize=True)
        size = out.size
    print(f'  {name:12s} {os.path.basename(src):22s} -> {size[0]}x{size[1]}')
    found += 1

if not found:
    print('Nothing found. Expected files in incoming/: ' + ', '.join(n + '.png' for n in NAMES))
    sys.exit(1)
print(f'\n{found} render(s) ingested. Now run: npm run build')
