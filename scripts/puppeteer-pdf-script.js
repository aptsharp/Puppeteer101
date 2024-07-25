const puppeteer = require('puppeteer');
const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

async function generatePDF() {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({
            headless: true,
            timeout: 60000  // Tempo limite de 60 segundos
        });

        console.log('Opening new page...');
        const page = await browser.newPage();

        console.log('Navigating to http://localhost:4200...');
        await page.goto('http://localhost:4200', { waitUntil: 'networkidle2', timeout: 60000 });

        console.log('Waiting for selectors to load...');
        await page.waitForSelector('.content h1', { timeout: 60000 });
        await page.waitForSelector('.content p', { timeout: 60000 });
        await page.waitForSelector('.pill-group .pill', { timeout: 60000 });
        await page.waitForSelector('.social-links a', { timeout: 60000 });

        console.log('Selectors loaded. Extracting data...');
        const titleElement = await page.$('.content h1');
        const titleText = await page.evaluate(element => element ? element.textContent : null, titleElement);
        console.log('Title:', titleText);

        const messageElement = await page.$('.content p');
        const messageText = await page.evaluate(element => element ? element.textContent : null, messageElement);
        console.log('Message:', messageText);

        const links = await page.$$eval('.pill-group .pill', links =>
            links.map(link => ({
                text: link.querySelector('span').innerText,
                href: link.href
            }))
        );
        console.log('Links:', links);

        const socialLinks = await page.$$eval('.social-links a', socialLinks =>
            socialLinks.map(socialLink => ({
                href: socialLink.href,
                label: socialLink.getAttribute('aria-label')
            }))
        );
        console.log('Social Links:', socialLinks);

        console.log('Waiting additional 5 seconds to ensure all resources are loaded...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Capturing screenshot...');
        const screenshotBuffer = await page.screenshot({ fullPage: true });

        const pdfPath = 'PDF/page.pdf';
        const pdfDir = pdfPath.substring(0, pdfPath.lastIndexOf('/'));

        // Garantir que o diretório existe
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }

        console.log('Generating PDF with pdf-lib...');
        const pdfDoc = await PDFDocument.create();
        const page1 = pdfDoc.addPage();

        const pngImage = await pdfDoc.embedPng(screenshotBuffer);
        const { width, height } = pngImage.scale(1);

        page1.drawImage(pngImage, {
            x: 0,
            y: page1.getHeight() - height,
            width,
            height
        });

        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync(pdfPath, pdfBytes);

        console.log('PDF generated successfully.');
        await browser.close();
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}
generatePDF();
//BUG: a biblioteca do puppeteer esta com erro ao gerar o pdf, foi usado uma biblioteca paralela (pdf-lib);
