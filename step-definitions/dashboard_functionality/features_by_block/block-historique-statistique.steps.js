const { When, Then } = require('@cucumber/cucumber');

// TestID_60: Dashboard shows only the last 2 statistics
Then("only the 2 most recent statistics are shown", async function () {
    const stats = this.page.locator('#history-stat a.card');

    const count = await stats.count();

    this.expect(count).toBeLessThanOrEqual(2);
});


// @TestID_61: Access predefined statistics from dashboard
When('the user clicks on "Voir l\'ensemble des statistiques"', async function () {
    const statsLink = this.page.locator('#link-stats a');

    await statsLink.click();
});

Then('the user should be redirected to the predefined statistics window', async function () {
    await this.expect(this.page).toHaveURL(/ChartDashboard/);
});