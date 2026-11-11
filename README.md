# Travers Group — traversgroupma.com

Node/Express + EJS site. 126 pages: home, about, contact, 5 service pages, 8 demolition service pages, 18 town hubs, 90 service×town pages.

## Deploy (Railway)
1. Railway → New Project → Deploy from GitHub repo → `ZacLamb/traversgroupma`. `npm start` is detected automatically.
2. Variables: `SITE_URL=https://www.traversgroupma.com` (used for canonicals, sitemap, schema).
3. Settings → Networking → add custom domains `traversgroupma.com` and `www.traversgroupma.com` and point the `www` CNAME at Railway; use GoDaddy forwarding for the apex domain (apex 301s to www).
4. Submit `https://www.traversgroupma.com/sitemap.xml` in Google Search Console.

## Editing
- `data/business.js` — phone, email, address, GHL form ID
- `data/services.js` — all service copy, FAQs, image IDs (add a service → pages, nav, footer and sitemap update)
- `data/demolition.js` — the 8 demolition service pages (house, interior, shed, garage, deck, light commercial, debris, site prep)
- `data/towns.js` — towns, villages, local notes, nearby links (add a town → 6 new pages)
- `data/compose.js` — the localized templates for service×town pages
- `views/` — EJS templates; `public/css/site.css` — design system

## Leads
`/contact` has a native estimate form that posts to `POST /api/lead` (lib/ghl.js), which upserts the contact into the GHL sub-account.

**Railway variables:** `GHL_API` (Private Integration token — scopes contacts.write, contacts.readonly, locations/customFields.readonly + .write) and `LOCATION_ID` (sub-account ID).

Each lead gets tags `website lead`, `web service: <slug>`, `web town: <name>` (+ `urgent` if ticked), source `Website - traversgroupma.com`, standard fields (name, phone, email, address, town, ZIP, MA), contact custom fields **Website Service Requested, Website Message, Website Emergency, Website Service Area, Website Project Address, Website Contact Preference, Website Lead Page** (auto-created if missing), and a note with the full submission. `/contact?service=<slug>&town=<slug>` preselects the dropdowns.

## Images
Photos are the client's existing GHL media, served via the LeadConnector image resizer. To self-host:
`node scripts/fetch-images.js` then set `LOCAL_IMAGES=1`.

## Old URLs
`/home /about-us /Tree /patio /retaining /demo /firewood /our-blog` 301 to their new equivalents.

## Test
`npm start` then `npm test` — crawls every internal link and checks redirects.
