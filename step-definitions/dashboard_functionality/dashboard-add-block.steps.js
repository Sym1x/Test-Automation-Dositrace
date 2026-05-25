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
    await this.DashboardPage.toggleAddingBlocks();
});

Then('the user can select from the list:', async function (expectedList) {
    const unaddedBlocks_expected = expectedList.raw().flat();
    const unaddedBlocks_displayed = await this.DashboardPage.getUnaddedBlockNames();

    for (const expected of unaddedBlocks_expected) {
        try {
            await this.expect(unaddedBlocks_displayed).toContain(expected);
        } catch(err) {
            throw new Error(`Missing block(s): ${expected}`);
        }
    };
    for (const displayed of unaddedBlocks_displayed) {
        try {
            await this.expect(unaddedBlocks_expected).toContain(displayed);
        } catch(err) {
            throw new Error(`Unexpected block(s): ${displayed}`);
        }
    };
});


// TestID_40: Validate adding blocks
When('the user adds a block and clicks Valider', async function () {
    await this.DashboardPage.addBlockByName('Rappels');
});
Then('the block is saved to the Dashboard', async function () {
    await this.page.reload();
    const block = this.DashboardPage.blocks.nth(0);
    try {
        await this.expect(block).toBeVisible();
    } catch(err) {
        throw new Error(`Block '${block}' was not saved to the Dashboard after reload`);
    }
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
    const coordinatesAfterDragging = await block.boundingBox();
    

    await this.expect(coordinatesBeforeDragging.x, `Block coordinates did not change after dragging it to the right. Refer to DashboardPage.dragBlock(<blockLocator>) to modify dragging condition`).not.toBe(coordinatesAfterDragging.x);
});

Then('the user can validate the new position by clicking Sauvegarder', async function () {
    await this.expect(this.DashboardPage.savePositionBtn).toBeVisible();
    await this.DashboardPage.savePositionBtn.click();
});


// TestID_44
Then('the user can hold left click on the resize arrow at the bottom left of the block and resize the block', async function () {
    await this.DashboardPage.addBlockByName('Rappels');
    const block = await this.DashboardPage.blocks.first();

    const resize_arrow = block.locator('.gs-resize-handle');

    const blockBox = await block.boundingBox();
    const arrowBox = await resize_arrow.boundingBox();

    if (!blockBox || !arrowBox) throw new Error("Element not visible");

    const relativeX = arrowBox.x - blockBox.x;
    const relativeY = arrowBox.y - blockBox.y;

    const isLeft = relativeX < blockBox.width / 2;
    const isBottom = relativeY > blockBox.height / 2;

    if (!(isLeft || !isBottom)) {
        throw new Error("The block's resize arrow icon is not on the bottom left of the block");
    }


    await this.DashboardPage.resizeBlock(block);
});

Then('the user can validate the new size by clicking Sauvegarder', async function () {
    await this.expect(this.DashboardPage.savePositionBtn).toBeVisible();
    await this.DashboardPage.savePositionBtn.click();
});