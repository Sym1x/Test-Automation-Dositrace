const { Given, When, Then } = require('@cucumber/cucumber');
const { DashboardPage } = require("../../page-objects/DashboardPage");

Given("the user is on an empty Dashboard", async function () {
    await this.utils.redirectToDositrace();
    this.DashboardPage = new DashboardPage(this.page);
    await this.DashboardPage.navigateToPage();


    const blocks_count = await this.DashboardPage.blocks.count();
    if (blocks_count !== 0) {
        const titles = await this.DashboardPage.getExistingBlockNames();
        await this.DashboardPage.deleteBlockByName(...titles);
    }
});


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


// TestID_42
// TestID_41
// TestID_40: Validate adding blocks
When('the user adds a block and clicks Valider', async function () {
    await this.DashboardPage.addBlockByName('Worklist');
});
Then('the block is added to the Dashboard', async function () {
    const block = await this.DashboardPage.blocks.nth(0);
    await this.expect(block).toBeVisible();
});
Then('the message {string} is shown', async function(expectedMsg) {
    await this.utils.verifyPopupMessage(expectedMsg);
});

// TestID_44
// TestID_43: Arranging dashboard blocks 
When('the user drags an existing block by holding left click to a new position', async function () {
    await this.DashboardPage.addBlockByName('Worklist');
    const block = await this.DashboardPage.blocks.nth(0);
    await this.DashboardPage.dragBlock(block);
});

Then('the user can validate the new position by clicking Sauvegarder', async function () {
    await this.expect(this.DashboardPage.savePositionBtn).toBeVisible();
    await this.DashboardPage.savePositionBtn.click();
});

/*
    const initialCol = await block.getAttribute('data-col');
    const newCol = await block.getAttribute('data-col');
    this.expect(newCol).not.toBe(initialCol);
*/