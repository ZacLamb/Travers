# Keyword & Content Map — Travers Group

## What the market looks like
Local SERPs for these services (e.g. "stump grinding Barnstable MA", "retaining wall install Plymouth MA") are dominated by
directory pages (HomeAdvisor, Yellow Pages) built as **service × town** pages. The old site had zero town targeting, a
"Comersilo" placeholder as its meta description/keywords on every page, and generic titles ("Tree Work", "Demolition Services").
The rebuild fixes all of that and competes with the directories on their own structure.

## Primary keyword per page
| Page | URL | Primary | Secondary |
|---|---|---|---|
| Tree Service | /services/tree-service | tree removal Cape Cod | tree trimming, tree service, stump grinding, emergency tree removal, tree pruning |
| Patios & Walkways | /services/patios-walkways | patio installation Cape Cod | paver patio, stone patio, walkway installation, hardscape contractor, bluestone, fire pit patio |
| Retaining Walls | /services/retaining-walls | retaining wall contractor | stone retaining wall, block retaining wall, erosion control, retaining wall installation |
| Demolition | /services/demolition | demolition contractor Cape Cod | shed removal, garage demolition, deck removal, debris removal, site preparation |
| Firewood | /services/firewood-delivery | firewood delivery Cape Cod | seasoned firewood for sale, firewood near me, firewood for wood stove |
| Demolition sub-pages (6) | /services/demolition/{slug} | shed removal, garage demolition, deck removal, light commercial demolition, debris removal, site preparation | + Cape Cod / South Shore |
| Town hubs (18) | /service-areas/{town}-ma | {town} MA tree service / landscaping contractor | all 5 services + town |
| Service × town (90) | /services/{service}/{town}-ma | {service keyword} {town} MA | villages (e.g. Hyannis, Osterville, Manomet) |

## Towns (Eastham → Duxbury)
Upper Cape: Bourne (HQ), Sandwich, Falmouth, Mashpee · Mid Cape: Barnstable (incl. Hyannis), Yarmouth, Dennis ·
Lower/Outer Cape: Brewster, Harwich, Chatham, Orleans, Eastham · South Shore: Wareham, Plymouth, Carver, Plympton, Kingston, Duxbury

## Internal linking
- Nav mega-menus → every service + top towns; footer → every service + all 18 towns (site-wide)
- Service page → all 18 service×town pages + 3 related services
- Service×town page → other 4 services in same town, same service in 5 nearby towns, parent service, town hub
- Town hub → all 5 service×town pages + 5 nearby town hubs
- Breadcrumbs (with BreadcrumbList schema) on every inner page

## Schema
HomeAndConstructionBusiness (sitewide, with areaServed + offers), Service (service and service×town pages),
FAQPage (service and service×town pages), BreadcrumbList.
