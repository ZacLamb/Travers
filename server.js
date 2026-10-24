const express = require('express');
const path = require('path');
const compression = require('compression');

const biz = require('./data/business');
const services = require('./data/services');
const towns = require('./data/towns');
const demoPages = require('./data/demolition');
const images = require('./data/images');
const { serviceTown, townHub, list } = require('./data/compose');

const app = express();
const PORT = process.env.PORT || 3000;
const SITE_URL = (process.env.SITE_URL || 'https://traversgroupma.com').replace(/\/$/, '');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.disable('x-powered-by');
app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '7d' }));

// Canonical host: strip www
app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host.startsWith('www.')) return res.redirect(301, `${req.protocol}://${host.slice(4)}${req.originalUrl}`);
  next();
});

const svcUrl = (s) => `/services/${s.slug}`;
const townUrl = (t) => `/service-areas/${t.slug}`;
const stUrl = (s, t) => `/services/${s.slug}/${t.slug}`;
const demoUrl = (d) => `/services/demolition/${d.slug}`;

app.locals = Object.assign(app.locals, {
  biz, services, towns, img: images.src, srcset: images.srcset, siteImg: images.site,
  svcUrl, townUrl, stUrl, demoUrl, demoPages, list, SITE_URL, year: new Date().getFullYear(),
});

function render(res, view, data) {
  res.render(view, { canonical: SITE_URL + res.req.path.replace(/\/$/, ''), breadcrumbs: [], ...data });
}

// ---------- Pages ----------
app.get('/', (req, res) => render(res, 'home', {
  title: 'Travers Group | Tree Service, Patios, Retaining Walls & Demolition | Cape Cod & South Shore',
  description: `Family-owned landscape construction in Bourne, MA for ${biz.years} years. Tree removal, stump grinding, patios & walkways, retaining walls, demolition and firewood delivery from Eastham to Duxbury.`,
}));

app.get('/services', (req, res) => render(res, 'services', {
  title: 'Services | Tree Work, Hardscaping, Demolition & Firewood | Travers Group',
  description: 'Tree removal and stump grinding, patio and walkway installation, retaining walls, demolition and seasoned firewood delivery across Cape Cod and the South Shore.',
  breadcrumbs: [{ name: 'Services', url: '/services' }],
}));

app.get('/services/:slug', (req, res, next) => {
  const service = services.find((s) => s.slug === req.params.slug);
  if (!service) return next();
  render(res, 'service', {
    service, title: service.title, description: service.metaDescription, ogImage: service.hero,
    breadcrumbs: [{ name: 'Services', url: '/services' }, { name: service.name, url: svcUrl(service) }],
  });
});

app.get('/services/:slug/:town', (req, res, next) => {
  const service = services.find((s) => s.slug === req.params.slug);
  const town = towns.find((t) => t.slug === req.params.town);
  if (service && service.slug === 'demolition' && !town) {
    const page = demoPages.find((d) => d.slug === req.params.town);
    if (!page) return next();
    return render(res, 'demo-sub', {
      service, page, title: page.title, description: page.meta, ogImage: page.img,
      breadcrumbs: [
        { name: 'Services', url: '/services' },
        { name: service.name, url: svcUrl(service) },
        { name: page.name, url: demoUrl(page) },
      ],
    });
  }
  if (!service || !town) return next();
  const c = serviceTown(service, town, towns);
  render(res, 'service-town', {
    service, town, c, title: c.title, description: c.meta, ogImage: service.hero,
    breadcrumbs: [
      { name: 'Services', url: '/services' },
      { name: service.name, url: svcUrl(service) },
      { name: `${town.name}, MA`, url: stUrl(service, town) },
    ],
  });
});

app.get('/service-areas', (req, res) => render(res, 'areas', {
  title: 'Service Areas | Cape Cod & South Shore, Eastham to Duxbury | Travers Group',
  description: 'Travers Group serves 18 towns across Cape Cod and the South Shore — from Eastham to Duxbury — with tree service, patios, retaining walls, demolition and firewood delivery.',
  breadcrumbs: [{ name: 'Service Areas', url: '/service-areas' }],
}));

app.get('/service-areas/:town', (req, res, next) => {
  const town = towns.find((t) => t.slug === req.params.town);
  if (!town) return next();
  const c = townHub(town);
  render(res, 'town', {
    town, c, title: c.title, description: c.meta,
    nearby: town.nearby.map((s) => towns.find((t) => t.slug === s)).filter(Boolean),
    breadcrumbs: [{ name: 'Service Areas', url: '/service-areas' }, { name: `${town.name}, MA`, url: townUrl(town) }],
  });
});

app.get('/about', (req, res) => render(res, 'about', {
  title: `About Travers Group | Family-Owned for ${biz.years} Years | Bourne, MA`,
  description: `For ${biz.years} years, Mike and the Travers family have built patios, retaining walls and outdoor spaces across Cape Cod and the South Shore. Meet the family-owned team in Bourne, MA.`,
  breadcrumbs: [{ name: 'About', url: '/about' }],
}));

app.get('/contact', (req, res) => render(res, 'contact', {
  title: 'Contact Travers Group | Free Estimates | (508) 888-9432',
  description: 'Request a free estimate for tree work, patios, retaining walls, demolition or firewood delivery. Call (508) 888-9432 or visit 152 Cranberry Highway, Bourne, MA.',
  breadcrumbs: [{ name: 'Contact', url: '/contact' }],
}));

// ---------- Legacy GHL URL redirects (preserve rankings) ----------
const legacy = {
  '/home': '/', '/about-us': '/about', '/our-blog': '/', '/blog': '/',
  '/Tree': '/services/tree-service', '/tree': '/services/tree-service',
  '/patio': '/services/patios-walkways', '/retaining': '/services/retaining-walls',
  '/demo': '/services/demolition', '/firewood': '/services/firewood-delivery',
};
Object.entries(legacy).forEach(([from, to]) => app.get(from, (req, res) => res.redirect(301, to)));

// ---------- SEO ----------
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const urls = ['/', '/services', '/service-areas', '/about', '/contact'];
  services.forEach((s) => urls.push(svcUrl(s)));
  demoPages.forEach((d) => urls.push(demoUrl(d)));
  towns.forEach((t) => urls.push(townUrl(t)));
  services.forEach((s) => towns.forEach((t) => urls.push(stUrl(s, t))));
  const today = new Date().toISOString().slice(0, 10);
  res.type('application/xml').send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${SITE_URL}${u === '/' ? '' : u}</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : u.split('/').length > 3 ? '0.6' : '0.8'}</priority></url>`).join('\n') +
    `\n</urlset>\n`
  );
});

// Trailing-slash normalization
app.use((req, res, next) => {
  if (req.path.length > 1 && req.path.endsWith('/')) return res.redirect(301, req.path.slice(0, -1));
  next();
});

app.use((req, res) => res.status(404).render('404', {
  title: 'Page not found | Travers Group', description: '', canonical: SITE_URL, breadcrumbs: [], noindex: true,
}));

app.listen(PORT, () => console.log(`Travers Group site on :${PORT}`));
