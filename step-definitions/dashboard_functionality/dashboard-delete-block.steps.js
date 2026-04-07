const { Given, When, Then } = require('@cucumber/cucumber');
const { DashboardPage } = require("../../page-objects/DashboardPage");

Given("the user is on a non empty Dashboard", async function () {
    this.DashboardPage = new DashboardPage(this.page);
    await this.DashboardPage.navigateToPage();

    const blocks_count = await this.DashboardPage.blocks.count();
    if (blocks_count == 0) {
        throw new Error(`Expected dashboard to have blocks, but found ${blocks_count} block(s)`);
    }
});

// TestID_45: Caching block deletion
When('the user clicks Supprimer', async function () {

});
When('the user clicks on a block', async function () {

});

Then('the block disappears from view', async function () {

});



// TestID_46: Validating block deletion
When('the user deletes a block', async function () {

});
When('the user clicks Valider', async function() {

});
Then('the block is deleted from the Dashboard', async function () {

});