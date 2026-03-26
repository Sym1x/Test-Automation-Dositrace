const { BeforeAll, AfterAll, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

const path = require('path');
const fs = require('fs');

const output = [];

let browser;
BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
})

Before(async function () {
  this.browser = browser;
  if (this.initPage) {
    await this.initPage();
  }
});

After(async function (scenario) {
  //-----------------
  const testIdTag = scenario.pickle.tags.find(t => t.name.startsWith('@TestID_'));
  const testId = testIdTag ? testIdTag.name.replace('@TestID_', '') : null;
  output.push({
    id: testId,
    name: scenario.pickle.name,
    status: scenario.result.status,
    error: scenario.result.message || null
  });
  //-----------------

  if(this.closePage) {
    await this.closePage();
  }
});

AfterAll(async function() {
  //-----------------
  const resultsFile = path.join(__dirname, "..", "reports", "test-results.json");
  await fs.promises.writeFile(resultsFile, JSON.stringify(output, null, 2));
  //-----------------
  
  await browser.close();
})