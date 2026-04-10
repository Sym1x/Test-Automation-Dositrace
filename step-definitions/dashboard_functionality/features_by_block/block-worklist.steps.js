const { Given, When, Then  } = require('@cucumber/cucumber');

Given("the Dashboard contains the {string} block", async function (blockName) {
    await this.DashboardPage.addBlockByName(blockName);
    const existingBlocks = await this.DashboardPage.getExistingBlockNames(); 
    await this.expect(existingBlocks).toContain(blockName);
});


// TestID_52
When('the user changes period', async function () {
    this.worklist_block = this.page.locator('#el1');
    this.before = await this.worklist_block.innerText();
    const inactivePeriodButtons = this.page.locator(`
        #btnPreviousMonth:not(.active),
        #btnCurrentMonth:not(.active),
        #btnPreviousYear:not(.active),
        #btnCurrentYear:not(.active)`
    );
    await inactivePeriodButtons.first().click();
});

Then("the period filter does not affect the worklist block", async function () {
    await this.expect(this.worklist_block).toHaveText(this.before);

});


// TestID_53
Then("the worklist contains at most 5 exams", async function () {
    const exams = this.page.locator('#workList tbody');
    const count = await exams.count();
    expect(count).toBeLessThanOrEqual(5);
});


// TestID_55
Then("the worklist has the correct headers", async function () {
    const headers = this.page.locator('#workList thead td strong');

    await this.expect(headers.nth(0)).toHaveText('Heure');
    await this.expect(headers.nth(1)).toHaveText('Patient(s)');
    await this.expect(headers.nth(2)).toHaveText('Équipement');
});


// TestID_56
When('The user clicks on the "Liste complète des examens planifiés" link', async function () {
    const link = this.page.locator('#list-worklist a');
    await link.click();
});
Then('the Worklist window is displayed', async function () {
    await this.expect(this.page).toHaveURL(/Worklist/);
});