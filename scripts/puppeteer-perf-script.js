const puppeteer = require('puppeteer');

async function measurePerformance() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:4200');

    const metrics = await page.metrics();
    console.log(metrics);

    await browser.close();
}
measurePerformance();
//script que analisa a performace da pagina web para melhor ranquear no google.
