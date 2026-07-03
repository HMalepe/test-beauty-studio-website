# Client modules

Each subdirectory is a **portable, isolated** client site. Do not import across client folders.

When a client site is ready to go live, wire `src/app/(sites)/{slug}/page.tsx` to import from that client's module here — not from `src/platform/` or another client.
