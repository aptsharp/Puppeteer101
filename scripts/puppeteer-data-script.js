const puppeteer = require('puppeteer');// importação
const { InferencePriority } = require('typescript');

async function scrapeAngularPage() {
    const browser = await puppeteer.launch();//inicia o contexto puppeteer
    const page = await browser.newPage();//abre o navegador/ pagina
    await page.goto('http://localhost:4200');// vai ate o link

    // Extração de dados
    // o contexto de extração de dados é somente para a pagina inicial do angular
    // o script deve ter o contexto que se quer analisar.
    const data = await page.evaluate(() => {
        const data = {};

        // Capturar o título principal
        const titleElement = document.querySelector('.content h1');
        data.title = titleElement ? titleElement.innerText : null;

        // Capturar a mensagem de congratulação
        const messageElement = document.querySelector('.content p');
        data.message = messageElement ? messageElement.innerText : null;
        // Capturar os links da direita

        const links = [];
        document.querySelectorAll('.pill-group .pill').forEach(link => {
            links.push({
                text: link.querySelector('span').innerText,
                href: link.href
            });
        });
        data.links = links;

        // Capturar links sociais
        const socialLinks = [];
        document.querySelectorAll('.social-links a').forEach(socialLink => {
            socialLinks.push({
                href: socialLink.href,
                label: socialLink.getAttribute('aria-label')
            });
        });
        data.socialLinks = socialLinks;

        return data;
    });

    console.log(data);
    await browser.close();
}
scrapeAngularPage();
