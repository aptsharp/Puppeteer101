const puppeteer = require('puppeteer');

async function captureEvents() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('request', request => console.log('Request:', request.url()));

    await page.goto('http://localhost:4200');
    await browser.close();
}

captureEvents();
//script de captura de eventos e logs de uma pagina web.
