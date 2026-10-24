// Builds the localized copy for service × town pages so each page reads naturally
// and differs meaningfully (town notes, villages, nearby towns, service local angle).
const biz = require('./business');

const PHRASES = {
  'tree-service': {
    h1: (t) => `Tree removal & stump grinding in ${t.name}, MA`,
    title: (t) => `Tree Removal & Tree Service ${t.name} MA | Stump Grinding | Travers Group`,
    meta: (t) => `Tree removal, tree trimming, stump grinding and emergency tree service in ${t.name}, MA${t.alias ? ` (incl. ${t.alias})` : ''}. Family-owned for ${biz.years} years. Free estimates: ${biz.phone}.`,
    lead: (t) => `Need a tree taken down, trimmed back from the roof, or a stump ground out in ${t.name}? Travers Group provides full-service tree work across ${t.name}${t.villages.length ? ` — including ${list(t.villages.slice(0, 4))}` : ''} — with emergency tree removal after storms.`,
  },
  'patios-walkways': {
    h1: (t) => `Patio & walkway installation in ${t.name}, MA`,
    title: (t) => `Patio Installation ${t.name} MA | Paver & Stone Patios, Walkways | Travers Group`,
    meta: (t) => `Custom paver, stone and brick patios and walkways in ${t.name}, MA. Proper base prep, expert installation and designs built around your yard. Free estimates: ${biz.phone}.`,
    lead: (t) => `Ready for a patio you’ll actually use, or a front walkway that makes an entrance? We design and build custom paver, stone and brick hardscapes for homes throughout ${t.name}${t.villages.length ? `, from ${t.villages[0]} to ${t.villages[t.villages.length - 1]}` : ''}.`,
  },
  'retaining-walls': {
    h1: (t) => `Retaining wall contractor in ${t.name}, MA`,
    title: (t) => `Retaining Walls ${t.name} MA | Stone & Block Wall Contractor | Travers Group`,
    meta: (t) => `Engineered stone, block and concrete retaining walls in ${t.name}, MA that stop erosion and level sloped yards. Family-owned contractor, ${biz.years} years. Call ${biz.phone}.`,
    lead: (t) => `Fighting erosion, a washed-out bank or a backyard that’s more hill than lawn? Travers Group builds engineered retaining walls for ${t.name} homeowners that hold the grade and look great doing it.`,
  },
  demolition: {
    h1: (t) => `Demolition services in ${t.name}, MA`,
    title: (t) => `Demolition Contractor ${t.name} MA | House, Interior, Shed & Garage Demo | Travers Group`,
    meta: (t) => `House demolition, interior demolition, and shed, garage and deck removal in ${t.name}, MA — with debris removal and site prep. Free estimates: ${biz.phone}.`,
    lead: (t) => `Tearing down an old house, gutting an interior, or removing a shed, garage or deck in ${t.name}? Our crew handles demolition from start to finish — teardown, debris hauling and site cleanup — so your next project can start on a clean slate.`,
  },
  'firewood-delivery': {
    h1: (t) => `Firewood delivery in ${t.name}, MA`,
    title: (t) => `Firewood Delivery ${t.name} MA | Seasoned Firewood for Sale | Travers Group`,
    meta: (t) => `Seasoned firewood delivered to your door in ${t.name}, MA. Hot, long-burning wood for fireplaces, wood stoves and fire pits. Call ${biz.phone} to order.`,
    lead: (t) => `Looking for seasoned firewood in ${t.name}? We deliver premium, ready-to-burn firewood to homes across ${t.name}${t.villages.length ? ` — ${list(t.villages.slice(0, 3))} and beyond` : ''} — so you stay warm all season.`,
  },
};

function list(arr) {
  if (arr.length <= 1) return arr.join('');
  return arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1];
}

function serviceTown(service, town, towns) {
  const p = PHRASES[service.slug];
  const nearby = town.nearby.map((s) => towns.find((t) => t.slug === s)).filter(Boolean);
  return {
    h1: p.h1(town),
    title: p.title(town),
    meta: p.meta(town),
    lead: p.lead(town),
    local: `${town.note} ${service.localAngle} That’s why ${town.name} homeowners trust a local, family-owned crew with ${biz.years} years of experience in ${town.region === 'South Shore' ? 'Plymouth County and the South Shore' : 'Cape Cod'}.`,
    nearby,
    faqs: [
      {
        q: `Do you provide ${service.name.toLowerCase()} in ${town.name}, MA?`,
        a: `Yes. ${town.name} is part of our regular service area, which runs from Eastham to Duxbury. Call ${biz.phone} or request a free estimate online.`,
      },
      ...service.faqs.slice(0, 3),
    ],
  };
}

function townHub(town) {
  return {
    h1: `Landscape construction & tree service in ${town.name}, MA`,
    title: `${town.name} MA Tree Service, Patios, Retaining Walls & Demolition | Travers Group`,
    meta: `Tree removal, patios and walkways, retaining walls, demolition and firewood delivery in ${town.name}, MA${town.alias ? ` and ${town.alias}` : ''}. Family-owned, ${biz.years} years. Free estimates: ${biz.phone}.`,
  };
}

module.exports = { serviceTown, townHub, list };
