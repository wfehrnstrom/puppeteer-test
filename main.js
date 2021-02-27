const puppeteer = require("puppeteer");

let page_load = (async (pageName) => {
    const browser = await puppeteer.launch({ headless: false}); // actually open browser
    const page = await browser.newPage();
    await page.setViewport({ width: 1720, height: 900});
    await page.goto(pageName);
    console.log(Date.now().toTimeString());
  });


let now = new Date();

let target = Date.parse("2021-03-01T07:00:00");
let pageUrl = 'https://www.publix.com/covid-vaccine/florida';
if (target > now){
    // schedule a callback to execute
    let msRemaining = target - now;
    setTimeout(page_load, msRemaining, pageUrl);
} else {
    // execute
    page_load(pageUrl);
}
