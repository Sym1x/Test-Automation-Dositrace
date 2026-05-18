const { Given, When, Then  } = require('@cucumber/cucumber');
const { DashboardPage } = require("../../../page-objects/DashboardPage");

Given("the user is on the Dashboard containing the {string} block", async function (blockName) {
    await this.utils.redirectToDositrace(this.page);

    this.DashboardPage = new DashboardPage(this.page);
    await this.DashboardPage.navigateToPage();

    await this.DashboardPage.resetDashboard();
    await this.DashboardPage.addBlockByName(blockName);
});


// TestID_52
When('the user changes period', async function () {
    this.before = await this.block.innerText();
    const inactivePeriodButtons = this.page.locator(`
        #btnPreviousMonth:not(.active),
        #btnCurrentMonth:not(.active),
        #btnPreviousYear:not(.active),
        #btnCurrentYear:not(.active)`
    );
    await inactivePeriodButtons.first().click();
});

Then("the period filter does not affect the worklist block", async function () {
    await this.expect(this.block).toHaveText(this.before);

});


// TestID_53
Then("the worklist contains at most 5 exams", async function () {
    const exams = this.page.locator('#workList tbody');
    const count = await exams.count();
    this.expect(count).toBeLessThanOrEqual(5);
});


// TestID_55
Then("the worklist has the correct headers: heure, patient, equipement", async function () {
    const headers = this.page.locator('#workList thead td strong');

    await this.expect(headers.nth(0)).toHaveText('Heure');
    await this.expect(headers.nth(1)).toHaveText('Patient(s)');
    await this.expect(headers.nth(2)).toHaveText('Équipement');
});


// TestID_56
When('The user clicks on the "Liste complète des examens planifiés" link', async function () {
    const link = this.page.getByRole('link', { name: 'Liste complète des examens' });
    await link.click();
});
Then('the Worklist window is displayed', async function () {
    await this.expect(this.page).toHaveURL(/Worklist/);
});