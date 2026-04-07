const { Given, When, Then } = require('@cucumber/cucumber');
const { DashboardPage } = require("../../page-objects/DashboardPage");

Given("the user is on an empty Dashboard", async function () {
    this.DashboardPage = new DashboardPage(this.page);
    await this.DashboardPage.navigateToPage();

    const blocks_count = await this.DashboardPage.blocks.count();
    if (blocks_count !== 0) {
        throw new Error(`Expected dashboard to be empty, but found ${blocks_count} block(s)`);
    }
});


// refactor

// TestID_39: Listing of blocks to add to Dashboard
When('the user clicks Ajouter', async function () {
    await this.DashboardPage.addBlockBtn.click();
});

Then('the user can select from the list:', async function (dataTable) {
    const block_names = dataTable.raw().flat();
    const list_items = this.page.locator('li[id^="linkel"]')
    const count = await list_items.count();

    for (let i = 0; i < count; i++) {
        const text = await list_items.nth(i).locator('a').innerText();
        if (!block_names.includes(text.trim())) {
            throw new Error(`Unexpected block found: ${text}`);
        }
    }
});

// TestID_40: Validate adding blocks
When('the user adds a block and clicks Valider', async function () {
    await this.DashboardPage.addBlockBtn.click();
    await this.page.locator('li[id="linkel1"] > a').click();
    await this.page.click('#btn-confirmation-add');
    await this.page.waitForLoadState('networkidle');
})
Then('the block is added to the Dashboard', async function () {
    const block = this.page.locator('li[id="el1"]');
    await this.expect(block).toBeVisible();
})
Then('the message {string} is shown', async function(expectedMsg) {
    const succ_notif = this.page.locator("div[class*='ui-pnotify-container']");
    await this.expect(succ_notif).toBeVisible();
    const succ_text = await this.page.locator('.ui-pnotify-text').innerText();
    console.log(succ_text);
    await this.expect(succ_text).toBe(expectedMsg);
})