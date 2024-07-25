const puppeteer = require('puppeteer');

async function generatePDF() {
    const browser = await puppeteer.launch({
        headless: true,
        timeout: 6000000  // Aumentar o tempo limite para 60 segundos
    });
    const page = await browser.newPage();

    // Aumentar o tempo de espera para a navegação
    await page.goto('http://localhost:4200', { waitUntil: 'networkidle0', timeout: 60000 });

    // Esperar um pouco mais para garantir que todos os recursos sejam carregados
    await page.waitForTimeout(5000000); // Espera adicional de 5 segundos

    await page.pdf({ path: 'PDF/page.pdf', format: 'A4' });

    console.log('PDF generated');
    await browser.close();
}
generatePDF();
