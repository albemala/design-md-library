import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';

const targetDir = path.resolve('./design-md');

async function findPreviewHtmlFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of list) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await findPreviewHtmlFiles(res));
    } else if (entry.name === 'preview.html') {
      results.push(res);
    }
  }
  return results;
}

async function main() {
  const files = await findPreviewHtmlFiles(targetDir);
  if (files.length === 0) {
    console.log('No preview.html files found.');
    return;
  }

  console.log(`Found ${files.length} preview.html files.`);
  
  // Launch puppeteer
  const browser = await puppeteer.launch({
    headless: true, // Use new headless mode implicitly in latest puppeteer
  });
  
  for (const file of files) {
    console.log(`Generating preview for ${file}`);
    const page = await browser.newPage();
    // Set viewport
    await page.setViewport({ width: 1440, height: 900 });
    
    // Navigate to the local file
    await page.goto(`file://${file}`, { waitUntil: 'networkidle0' });
    
    // Save as webp
    const outputWebp = path.join(path.dirname(file), 'preview.webp');
    await page.screenshot({ path: outputWebp, type: 'webp', fullPage: false });
    console.log(`Saved ${outputWebp}`);
    
    await page.close();
  }
  
  await browser.close();
  console.log('Done!');
}

main().catch(console.error);
