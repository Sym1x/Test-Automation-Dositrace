const { Given, When, Then } = require('@cucumber/cucumber');
const { DashboardPage } = require("../../page-objects/DashboardPage");

Given("the user is on a non empty Dashboard", async function () {
    await this.redirectToDositrace();
    this.DashboardPage = new DashboardPage(this.page);
    await this.DashboardPage.navigateToPage();
    const blocks_count = await this.page.locator('li[id^="el"]').count();
    if (blocks_count === 0) {
        const unaddedBlock_names = this.DashboardPage.getUnaddedBlockNames();
        this.DashboardPage.addBlockByName(...unaddedBlock_names);
    }
});

// REVISIT
// TestID_45: Caching block deletion
When('the user clicks Supprimer and then the user clicks on a block', async function () {
    const blocks_count = await this.page.locator('li[id^="el"]').count();
    console.log(blocks_count);
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