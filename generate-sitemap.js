import { createWriteStream } from 'fs';
import SitemapGenerator from 'sitemap-generator';

// Initialize generator
const generator = SitemapGenerator('https://ansafcont.com', {
  stripQuerystring: false,
  filepath: './public/sitemap.xml' // Save inside "public" folder
});

// When done
generator.on('done', () => {
  console.log('✅ Sitemap created at public/sitemap.xml');
});

// Start
generator.start();
