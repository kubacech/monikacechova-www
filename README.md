# monikacechova.cz

A minimalist full-screen photo slideshow website for [monikacechova.cz](https://monikacechova.cz).

## How it works

The site is a static website built with plain HTML, CSS, and JavaScript — no frameworks or build tools.

- **Automated slideshow** cycles through 11 full-screen images with smooth crossfade transitions every 6 seconds.
- **Responsive images** are served in three sizes (640w, 1024w, 1920w) based on screen width and device pixel ratio.
- **WebP with JPEG fallback** — the site detects browser support and serves the optimal format.
- **Mobile-friendly** — uses CSS `clamp()` for fluid scaling and `safe-area-inset` for devices with notches.

## Project structure

```
index.html   — Main page (two background layers + caption)
styles.css   — Styling (full-screen layout, crossfade transitions)
script.js    — Slideshow logic (image selection, preloading, rotation)
img/         — Image assets (11 images × 2 formats × 3 sizes)
CNAME        — Custom domain configuration
```

## Deployment

The site is deployed with **GitHub Pages** from the `main` branch. Pushing to `main` triggers a deployment to [monikacechova.cz](https://monikacechova.cz).
