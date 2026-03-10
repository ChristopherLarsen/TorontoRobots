# TriggerfishhWeb

## Dev Server

- **Port**: 3001 (`npm run dev` runs on http://localhost:3001)
- CarapaceOS occupies port 3000 — do not use it for this project.

## Routing

- **`/`** — Gateway / coming-soon page with countdown timer and access code form. On correct code, redirects to `/landing`.
- **`/landing`** — Full product landing page.
- Access codes: `shirin`, `peter`, `sochi` (case-insensitive).

## Branding

- The brand name is **Triggerfishh** (two h's). The extra **h** at the end is always rendered in the brand orange color (`var(--tf-orange)`).
- Use the `<Tf />` component for inline brand name rendering and the `brandify()` helper to process plain strings that contain "Triggerfishh".
