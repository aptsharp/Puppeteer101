const puppeteer = require('puppeteer');

async function testUI() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:4200');

    // Verificar o título principal
    const titleElement = await page.$('.content h1');
    const titleText = await page.evaluate(element => element ? element.textContent : null, titleElement);
    console.log('Title:', titleText);

    // Verificar a mensagem de congratulação
    const messageElement = await page.$('.content p');
    const messageText = await page.evaluate(element => element ? element.textContent : null, messageElement);
    console.log('Message:', messageText);

    // Verificar os links na seção 'pill-group'
    const links = await page.$$eval('.pill-group .pill', links =>
        links.map(link => ({
            text: link.querySelector('span').innerText,
            href: link.href
        }))
    );
    console.log('Links:', links);

    await browser.close();
}
testUI();

//identifica os elementos: título principal, mensagem de congratulação e os links na seção.
