const { Given, When, Then } = require('@cucumber/cucumber');
const { DashboardPage } = require("../../page-objects/DashboardPage");

Given("the user is on a non empty Dashboard", async function () {
    await this.utils.redirectToDositrace(this.page);
    
    this.DashboardPage = new DashboardPage(this.page);
    await this.DashboardPage.navigateToPage();
    
    await this.DashboardPage.refillDashboard();
});


// TestID_45: Caching block deletion
When('the user clicks Supprimer and then the user clicks on the trash can icon on a block', async function () {
    await this.DashboardPage.deleteBlockBtn.click();
    first_block = this.DashboardPage.blocks.first();
    this.first_block_name = await this.DashboardPage.getBlockName(first_block);

    trash_can = first_block.locator('.fa-trash-can');
    await this.expect(trash_can).toBeVisible();
    await trash_can.click();
});

Then('the block disappears from view', async function () {
    const existingBlocks = await this.DashboardPage.getExistingBlockNames();
    await this.expect(existingBlocks).not.toContain(this.first_block_name);
});


// TestID_46: Validating block deletion
When('the user deletes a block and clicks Valider', async function () {
    await this.DashboardPage.deleteBlockByName('Worklist');
});
Then('the block is deleted from the Dashboard', async function () {
    const existingBlocks = await this.DashboardPage.getExistingBlockNames();
    await this.expect(existingBlocks).not.toContain('Worklist');
});


// TestID_47: Success message after adding a block
Then('the message {string} is displayed after successful deletion', async function(expectedMsg) {
    await this.utils.verifyPopupMessage(expectedMsg);
});


// TestID_48: Absence of deleted blocks in Dashboard
When('the user has deleted blocks from the Dashboard', async function() {
   this.blocks_to_delete = ['Worklist', 'Informations', 'Documents'];
   await this.DashboardPage.deleteBlockByName(...this.blocks_to_delete); 
});
Then('the blocks stay absent on reload', async function() {
    await this.page.reload();
    const set_deleted_blocks = new Set(this.blocks_to_delete);
    const existing_blocks = await this.DashboardPage.getExistingBlockNames();

    const conflicts = existing_blocks.filter(block => set_deleted_blocks.has(block));
    if(conflicts.length > 0)
        throw new Error("Block deletion in the dashboard did not work correctly");
});