const { BeforeAll, AfterAll, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
})

Before(async function () {
  this.browser = browser;
  if (this.initPage) {
    await this.initPage();
  }
});

After(async function () {
  if(this.closePage) {
    await this.closePage();
  }
});

AfterAll(async function() {
  await browser.close();
})