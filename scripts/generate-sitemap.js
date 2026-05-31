const fs = require('fs');
const axios = require('axios');

const BASE_URL = 'https://confessyoursins.online';

async function generateSitemap() {
  // 1. Fetch all confessions from your API
  const response = await axios.get('https://cys-api.fly.dev/slugs');
  const slugs = response.data.data;

  const urls = slugs.map(slug => `
  <url>
    <loc>${BASE_URL}/confessions/${slug}</loc>
    <changefreq>weekly</changefreq>
  </url>
  `).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  fs.writeFileSync('./dist/cys/browser/sitemap.xml', sitemap);
  console.log('Sitemap generated!');
}

generateSitemap();