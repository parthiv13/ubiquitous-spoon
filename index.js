const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.setRequestInterception(true);

        page.on('request', (req) => {
            if (req.resourceType() === 'image' || req.resourceType() == 'font') {
                req.abort();
            } else {
                req.continue();
            }
        })
        await page.goto('https://www.linkedin.com/sales/login', { waitUntil : ['load', 'domcontentloaded']});
        await page.type('input[type=text]', 'sai.kumar@datamintelligence.com', { delay: 1 });
        await page.type('input.password', 'kumar1517', { delay: 1 });
        await page.click('input[type=submit]');
    } catch (err) {
        console.log(err)
    }
})();