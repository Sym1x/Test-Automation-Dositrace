const { Given, When, Then } = require('@cucumber/cucumber');
const { DashboardPage } = require("../../page-objects/DashboardPage");

Given("the user is on an empty Dashboard", async function () {
    await this.utils.redirectToDositrace(this.page);
    
    this.DashboardPage = new DashboardPage(this.page);
    await this.DashboardPage.navigateToPage();

    await this.DashboardPage.resetDashboard();
});


// TestID_39: Listing of blocks to add to Dashboard
When('the user clicks Ajouter', async function () {
    await this.DashboardPage.addBlockBtn.click();
});

Then('the user can select from the list:', async function (dataTable) {
    const toAddBlock_names = dataTable.raw().flat();
    const list_items = this.page.locator('li[id^="linkel"]')
    const count = await list_items.count();

    for (let i = 0; i < count; i++) {
        const text = await list_items.nth(i).locator('a').innerText();
        if (!toAddBlock_names.includes(text.trim())) {
            throw new Error(`Unexpected block found: ${text}`);
        }
    }
});


// TestID_40: Validate adding blocks
When('the user adds a block and clicks Valider', async function () {
    await this.DashboardPage.addBlockByName('Rappels');
});
Then('the block is saved to the Dashboard', async function () {
    await this.page.reload();
    const block = this.DashboardPage.blocks.nth(0);
    await this.expect(block).toBeVisible();
});


// TestID_41: Success message after adding a block
When('the user validates adding a block', async function () {
    await this.DashboardPage.addBlockByName('Examens par jour');
});
Then('the message {string} is displayed after successful addition', async function(expectedMsg) {
    await this.utils.verifyPopupMessage(expectedMsg);
});


// TestID_42: Ordered blocks
When('the user adds blocks', async function () {
    await this.DashboardPage.addBlockByName('NRD/NRI local');
    await this.DashboardPage.addBlockByName('Worklist');
});
Then('the added blocks are displayed in the respected order they were added in', async function () {
    let block_added_first_position;
    let block_added_second_position;
    for(let i = 0; i < 2; i++) {
        const block = this.DashboardPage.blocks.nth(i);
        const block_name = await this.DashboardPage.getBlockName(block);
        if(block_name === 'NRD/NRI local')
            block_added_first_position = await block.boundingBox();
        if(block_name === 'Worklist')
            block_added_second_position = await block.boundingBox();
    }
    // second block is adjacent to first block to the right
    this.expect(block_added_first_position.x).toBeLessThan(block_added_second_position.x);
});


// TestID_43: Arranging dashboard blocks 
When('the user drags an existing block by holding left click to a new position', async function () {
    await this.DashboardPage.addBlockByName('Worklist');
    const block = await this.DashboardPage.blocks.first();

    const coordinatesBeforeDragging = await block.boundingBox();
    await this.DashboardPage.dragBlock(block);
    await this.page.waitForLoadState("networkidle");
    const coordinatesAfterDragging = await block.boundingBox();
    

    await this.expect(coordinatesBeforeDragging.x).not.toBe(coordinatesAfterDragging.x);
});

Then('the user can validate the new position by clicking Sauvegarder', async function () {
    await this.expect(this.DashboardPage.savePositionBtn).toBeVisible();
    await this.DashboardPage.savePositionBtn.click();
});


// TestID_44
Then('the user can hold left click on the resize arrow at the bottom left of the block and resize the block', async function () {
    await this.DashboardPage.addBlockByName('Worklist');
    const block = await this.DashboardPage.blocks.first();

    const resize_arrow = block.locator('.gs-resize-handle');
    const resize_arrow_position = await resize_arrow.boundingBox();
    
    const x_position_threshold = 500 //for the arrow to be on the left, its x must be less than this value
    const y_position_threshold = 300 //for the arrow to be on the bottom, its y must be greater than this value
    
    if (!(resize_arrow_position.x < x_position_threshold && resize_arrow_position.y > y_position_threshold))
        throw new Error("The block's resize arrow icon is not on the bottom left of the block");


    await this.DashboardPage.resizeBlock(block);
});

Then('the user can validate the new size by clicking Sauvegarder', async function () {
    await this.expect(this.DashboardPage.savePositionBtn).toBeVisible();
    await this.DashboardPage.savePositionBtn.click();
});