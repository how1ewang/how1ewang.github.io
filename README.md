# how1ewang.github.io

Personal site of Howie Wang — live at **https://how1ewang.github.io/**

Hand-written HTML, CSS and about 4 KB of JavaScript. No framework, no build step, no dependencies beyond a web font. Every push to `main` is published automatically by GitHub Pages.

## Design notes

- Typography-led layout in the spirit of Apple's marketing pages: system font stack (SF Pro on Apple devices, Inter elsewhere), tight negative tracking on display sizes, `#1d1d1f` / `#6e6e73` / `#f5f5f7` palette, blue used only for actions.
- Frosted-glass navigation, alternating light and black sections, 28px-radius cards, hairline dividers.
- Scroll-triggered reveals and counting stats via `IntersectionObserver`; everything degrades gracefully with JavaScript disabled and respects `prefers-reduced-motion`.
- Real product shots (staff console page builder, registration form, owner dashboard) in CSS device frames, captured from local instances seeded with demo data — no customer information. WebP with JPEG fallback, separate crops for phones.
- Text kept short on purpose: capability tiles are icon + headline + one line; each decision is a Before → After pair with the full story behind a native `<details>` expander.
- Checked at 320 / 375 / 390 / 900 / 1440 px with no horizontal overflow.

## Files

| File | Purpose |
|---|---|
| `index.html` | Content and structure |
| `styles.css` | All styling, design tokens at the top |
| `main.js` | Nav state, mobile menu, reveal and counter animations |
| `Howie_Wang_Resume.pdf` | Downloadable résumé linked from the site |

## Local preview

```bash
python3 -m http.server 8000   # then open http://localhost:8000/
```
