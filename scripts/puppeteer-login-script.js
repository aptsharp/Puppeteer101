const puppeteer = require('puppeteer');

async function autoLogin() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:4200');

    await page.type('#username', 'your-username');
    await page.type('#password', 'your-password');
    await page.click('#login-button');

    await page.waitForNavigation();
    console.log('Login successful');
    await browser.close();
}
autoLogin();
//TODO: não usado nesse contexto - codigo achado no StackOverflow.
