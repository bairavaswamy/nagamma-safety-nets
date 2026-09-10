# Nagamma Safety Nets brand

The identity pairs a layered brass shield with a blue inset, fine net lattice, architectural balcony details, and a pearl serif N monogram. A double metallic rim and restrained navy shading give the mark depth. The refined Georgia capitals and tracked subtitle are outlined SVG and do not require an installed font. The crest's strong silhouette and contrasting N remain clear at mobile header sizes.

## Palette

| Role | Color | Use |
| --- | --- | --- |
| Sapphire blue | `#174D8B` | Primary buttons, wordmark, strong headings |
| Navy | `#10335D` | Footer and dark feature surfaces |
| Pearl | `#F7FAFE` | Page background and reversed text |
| Pale blue | `#E8F0FA` | Secondary surfaces and quiet highlights |
| Brass | `#C5A46D` | Small accents, rules, labels on dark surfaces |
| Muted blue | `#5C6F86` | Secondary text on pale surfaces |
| Slate blue | `#233B56` | Body text |

Use blue, navy, and pearl for the core interface. Brass is an accent, not body text on white. Keep text and controls high contrast; avoid putting pale text on a brass background.

## Assets

- `/brand/logo.svg` — primary horizontal lockup, 438 × 104 viewBox, for light surfaces.
- `/brand/logo-light.svg` — reversed horizontal lockup, 438 × 104 viewBox, for navy surfaces.
- `/brand/mark.svg` — square symbol, 104 × 104 viewBox, for small digital placements.
- `/brand/mark-512.png` — 512 × 512 raster symbol for sharing or app icons.
- `/brand/favicon.ico` — 16, 32, and 48 px icon sizes; `/brand/favicon.png` is the 32 px PNG version.
- `/brand/apple-touch-icon.png` — 180 × 180 pearl-backed symbol for Apple home screen shortcuts.
- `/brand/og-image.png` and `/brand/og-image.webp` — 1200 × 630 social share card with the new identity and a crop of the new premium balcony illustration.

The social share card combines the vector artwork in `public/brand/social-share.svg`, the outlined logo, and `public/images/balcony-premium.webp`. Regenerate it from the project root with `node scripts/generate-social.mjs` after changing the composition. The identity itself can be regenerated with `node scripts/generate-brand.mjs`; `wordmark.svg` and `monogram.svg` preserve its outlined source lettering.

Display the full lockup at least 200 px wide. Use the mark when less space is available. Preserve its aspect ratio and leave clear space equivalent to half the shield's width. Use the supplied metallic shading as designed; do not add external drop shadows, extra bevels, or other colors to the logo.

## Photography

Prefer clear daylight photographs of residential balconies, professionally fitted nets, terrace sports enclosures, and installation details. Select images with a visible product and believable architecture. Keep skin tones and plants natural; use a gentle navy overlay only when text needs contrast. Generated showcase imagery should not be described as photographs of completed customer installations.
