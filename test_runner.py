import sys
from pathlib import Path

root = Path('.')
html_files = ['index.html','about.html','portfolio.html','contact.html']
errors = []

def read(name):
    p = root / name
    if not p.exists():
        return None
    return p.read_text(encoding='utf-8')

def expect(text, pattern):
    return pattern in text

# run checks per file
for name in html_files:
    text = read(name)
    if text is None:
        errors.append(f"Missing: {name}")
        continue

    if not expect(text, 'href="styles.css"'):
        errors.append(f"{name}: missing link to styles.css")
    if not expect(text, 'script.js'):
        errors.append(f"{name}: missing include of script.js")
    if not expect(text, '<nav'):
        errors.append(f"{name}: missing <nav>")
    if not expect(text, 'id="scroll-progress"'):
        errors.append(f"{name}: missing #scroll-progress element")
    if not expect(text, 'id="back-to-top"'):
        errors.append(f"{name}: missing #back-to-top button")

    # Header checks
    if not expect(text, 'data-parallax'):
        errors.append(f"{name}: header missing data-parallax attribute")
    if not expect(text, 'hero-content'):
        errors.append(f"{name}: missing .hero-content")

    # Image checks: alt attributes and lazy loading (best-effort)
    imgs = [m.group(0) for m in __import__('re').finditer(r'<img[^>]+>', text)]
    for i, tag in enumerate(imgs, start=1):
        if 'alt=' not in tag:
            errors.append(f"{name}: img #{i} missing alt attribute")
        # lazy attr optional for server; js adds loading attr

    # Forms
    if '<form' in text and 'action=' not in text:
        errors.append(f"{name}: form present but missing action")

    # Skill bars
    if 'data-skill-level' in text and 'class="level"' not in text:
        errors.append(f"{name}: has data-skill-level but missing .level child")

    # Avoid obvious inline styles left behind
    if 'style="' in text:
        # allow style on hero background; flag if many
        count = len(__import__('re').findall(r'style="', text))
        if count > 3:
            errors.append(f"{name}: contains {count} inline style attributes — consider removing")

# Check assets
if not (root / 'styles.css').exists():
    errors.append('Missing: styles.css')
if not (root / 'script.js').exists():
    errors.append('Missing: script.js')

# Quick sanity on script.js (non-empty)
if (root / 'script.js').exists() and (root / 'script.js').stat().st_size < 200:
    errors.append('script.js looks unusually small')

# Integration-like checks (site-wide)
all_text = ''.join([read(n) or '' for n in html_files])
if 'formspree.io' not in all_text:
    errors.append('No form action points to formspree (contact form)')
if 'download' not in all_text:
    errors.append('No downloadable resume/portfolio links detected')

# Final report
if errors:
    print('FAIL: validation detected issues:')
    for e in errors:
        print(' -', e)
    sys.exit(1)
else:
    print('PASS: all extended checks passed')
    sys.exit(0)
