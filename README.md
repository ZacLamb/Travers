# Travers Group — traversgroupma.com

Node/Express + EJS site. 124 pages: home, about, contact, 5 service pages, 6 demolition service pages, 18 town hubs, 90 service×town pages.

## Deploy (Railway)
1. Railway → New Project → Deploy from GitHub repo → `ZacLamb/traversgroupma`. `npm start` is detected automatically.
2. Variables: `SITE_URL=https://traversgroupma.com` (used for canonicals, sitemap, schema).
3. Settings → Networking → add custom domains `traversgroupma.com` and `www.traversgroupma.com` and point DNS at Railway (www 301s to apex).
4. Submit `https://traversgroupma.com/sitemap.xml` in Google Search Console.

## Editing
- `data/business.js` — phone, email, address, GHL form ID
- `data/services.js` — all service copy, FAQs, image IDs (add a service → pages, nav, footer and sitemap update)
- `data/demolition.js` — the 6 demolition service pages (shed, garage, deck, light commercial, debris, site prep)
- `data/towns.js` — towns, villages, local notes, nearby links (add a town → 6 new pages)
- `data/compose.js` — the localized templates for service×town pages
- `views/` — EJS templates; `public/css/site.css` — design system

## Leads
`/contact` embeds the existing GHL form (`aHiDsyeAAUXRwP5esR6Q`), so submissions keep landing in the same sub-account.

## Images
Photos are the client's existing GHL media, served via the LeadConnector image resizer. To self-host:
`node scripts/fetch-images.js` then set `LOCAL_IMAGES=1`.

## Old URLs
`/home /about-us /Tree /patio /retaining /demo /firewood /our-blog` 301 to their new equivalents.

## Test
`npm start` then `npm test` — crawls every internal link and checks redirects.
