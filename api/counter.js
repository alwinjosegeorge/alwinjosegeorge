// api/counter.js
export default async function handler(req, res) {
  try {
    const r = await fetch('https://api.countapi.xyz/hit/alwinjosegeorge/profile_views');
    const data = await r.json();
    const raw = Number(data.value || 0);

    const count = String(raw).padStart(6, '0');
    const digits = count.split('');

    const digitWidth = 44;
    const gap = 6;
    const height = 72;
    const leftPadding = 12;
    const width = leftPadding * 2 + digits.length * (digitWidth + gap) - gap;

    const boxes = digits.map((d, i) => {
      const x = i * (digitWidth + gap);
      return `
      <g transform="translate(${x},0)">
        <rect x="0" y="0" rx="8" width="${digitWidth}" height="${height}" fill="#6a0dad"/>
        <rect x="${digitWidth-1}" y="6" width="2" height="${height-12}" fill="#3c005c"/>
        <text x="${digitWidth/2}" y="${height*0.64}" font-size="44" font-family="monospace" fill="#e0d4f7" text-anchor="middle">${d}</text>
      </g>`;
    }).join('');

    const svg = `<?xml version="1.0" encoding="utf-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" rx="12" fill="#d4c1ff" />
      <g transform="translate(${leftPadding},6)">
        ${boxes}
      </g>
    </svg>`;

    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
    res.status(200).send(svg);

  } catch (err) {
    console.error(err);
    res.status(500).send(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="48">
      <rect width="100%" height="100%" fill="#f00"/>
      <text x="10" y="30" fill="#fff">Counter error</text>
    </svg>`);
  }
}
