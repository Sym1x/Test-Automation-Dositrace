const { BeforeAll, AfterAll, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

const path = require('path');
const fs = require('fs');

const output = [];

let browser;
BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

Before(async function (scenario) {
  this.browser = browser;
  // cookie authentication emitted for "noauth" scenarios
  this.tags = scenario.pickle.tags.map(t => t.name);
  if(this.tags.includes("@noauth")) {
    await this.initPage_SansAuth();
  }
  else {
    await this.initPage();
  }
});

After(async function (scenario) {

  //----------------- test ouput(s)
  const testIdTags = scenario.pickle.tags.filter(t => t.name.startsWith('@TestID_'));
  const testIds = testIdTags.map(tag => tag.name.replace('@TestID_', ''));
  for (const id of testIds) {
    output.push({
      id,
      "Nom du testeur": "Système",
      "Date de tests": this.utils.getDateAfter(),
      "Fait": scenario.result?.status !== "UNDEFINED" ? "VRAI" : "FAUX",
      "Opérationnel": scenario.result?.status === "PASSED" ? "VRAI" : "FAUX",
      "Navigateur": scenario?.result?.parameters?.browser || "chromium",
      "Commentaire": scenario.result?.message
        ? scenario.result.message.replace(/\u001b\[[0-9;]*m/g, '').split("\n")[0]
        : ""
    });
  }
  //-----------------

  if(this.closePage) {
    await this.closePage();
  }
});

AfterAll(async function() {

  //----------------- test output save
  const resultsFile = path.join(__dirname, "..", "reports", "test-results.json");
  await fs.promises.writeFile(resultsFile, JSON.stringify(output, null, 2));
  //-----------------

  const authPath = path.join(__dirname, 'auth.json');
  if (fs.existsSync(authPath)) {
    fs.unlinkSync(authPath);
  }
  
  await browser.close();
});