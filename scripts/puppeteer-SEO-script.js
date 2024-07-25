const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('axe-puppeteer');

async function auditAccessibility() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:4200', { waitUntil: 'networkidle2' });

    const results = await new AxePuppeteer(page).analyze();
    console.log(results);

    await browser.close();
}
auditAccessibility();
//analisa acessebilidade para pessoas com deficiencia e layout para ranquear paginas no google.
