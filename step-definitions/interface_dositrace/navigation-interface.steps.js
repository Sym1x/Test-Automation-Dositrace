const { Given, When, Then  } = require('@cucumber/cucumber');
const env = require('../../environment/env-wrapper');

Given("the user is on Dositrace site", async function (){
    await this.page.goto(env.dositraceURL, { waitUntil: 'load', timeout: 60000 });
});

//Scenario: Navigation panel untoggled view
Then("{int} elements for navigation are visible", async function(expectedCount) {
    const sidebar = this.page.locator('#page-container #page-leftbar #accordionSidebar');
    const items = sidebar.locator('.nav-item');
    const count = await items.count();
    this.expect(count).toBeGreaterThanOrEqual(expectedCount);
})