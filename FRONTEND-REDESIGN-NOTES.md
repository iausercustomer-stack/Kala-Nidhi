# Kala Nidhi — Frontend redesign notes

## What changed
- Added `heritage-redesign.css` as an override layer, keeping the existing `style.css` and the app's current CSS classes.
- Rebuilt the English homepage hero into a premium heritage editorial layout and added visual craft-category shortcuts.
- Applied the same hero direction to `indexhindi.html` while preserving its Hindi content and existing links.
- Restyled the marketplace, artisan catalogue form, authentication dialogs/pages, about/contact sections, and artisan dashboard using forest green, warm ivory, terracotta, and sandstone.
- Added `heritage-ui.js` for category shortcut filtering, local image previews, and password visibility controls.
- Updated artisan profile rendering to show a portrait when a supported profile image URL field is available, with a fallback portrait when not.
- Added accessible focus states, responsive layouts, reduced-motion handling, improved image alt text, and page metadata.

## Supabase status
Supabase has intentionally **not** been reconfigured in this frontend phase. The existing `script.js` still contains the old project URL/key and will need to be updated after the new Supabase project is created. Marketplace and artisan records will not load correctly until the backend setup, schema, storage buckets, and Row Level Security policies are configured.

Use only the new project's publishable/anon key in browser code. Never put a Supabase service-role key or other server secret in frontend files or commit it to GitHub.

## Image note
The hero and fallback artisan portrait currently use remote Unsplash image URLs, so an internet connection is needed to display them. Replace these with approved local/licensed project assets if required for deployment.

## How to preview
Open `index.html` through VS Code Live Server or another local static server. The visual layer can be previewed without a working Supabase connection; live products, profiles, sign-in, and publishing require the later backend setup.

## Scope
This is a frontend-focused pass. It does not create a Supabase project, modify database schema/policies, or claim that authentication/product publishing has been verified against a live backend.
