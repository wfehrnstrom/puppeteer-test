const puppeteer = require("puppeteer");

puppeteer.launch({headless: false}).then((browser) => {

    let page_load = (async (pageName) => {
        let start = new Date();
        const page = await browser.newPage();
        let end0 = new Date();
        await page.setViewport({ width: 1720, height: 900});
        let end1 = new Date();
        await page.goto(pageName);
        let end = new Date();
        console.log(end0-start);
        console.log(end1-end0);
        console.log(end-end1);
        if(intervalfire){
            clearInterval(intervalfire);
        }
      });
    
    pageload_trigger = null;
    let pageUrl = 'https://www.publix.com/covid-vaccine/florida';

    let time_adjust_event = ((pageUrl) => {
        let now = (new Date()).getTime();
        let target = Date.parse("2021-03-02T17:47:00");
        if (target > now){
            if(pageload_trigger){
                clearTimeout(pageload_trigger);
            }
            let msRemaining = target - now;
            pageload_trigger = setTimeout(page_load, msRemaining, pageUrl);
        } else {
            page_load(pageUrl);
        }
    });
    
    time_adjust_event(pageUrl);
    intervalfire = setInterval(time_adjust_event, 10000, pageUrl);
});
