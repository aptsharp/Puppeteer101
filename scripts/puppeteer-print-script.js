const puppeteer = require('puppeteer'); //importação

async function run() {
    const browser = await puppeteer.launch();//espera resposta do navegador
    const page = await browser.newPage();//nova aba do navegador assim que é aberto
    await page.goto('http://localhost:4200');//para ir ate a url inserida.
    await page.screenshot({ path: 'prints/screenshot1.png'});// fazer um print da tela
    await page.screenshot({ path: 'prints/screenshot2.jpg'});// fazer um print da tela
    await page.screenshot({ path: 'prints/screenshot2.svg'});// fazer um print da tela - salvar em formado svg para icones**
    await browser.close();// fecha o navegador
}
run();

// esse codigo é uma automação do puppeteer
// trecho de codigo usado para bater um print de um usuário de uma determinada pagina
