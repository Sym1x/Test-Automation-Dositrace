const { Given, When, Then } = require('@cucumber/cucumber');
const { DashboardPage } = require("../../page-objects/DashboardPage");

Given("the user is on the Dashboard", async function () {
    await this.redirectToDositrace();
    this.DashboardPage = new DashboardPage(this.page);
    await this.DashboardPage.navigateToPage();
    await this.DashboardPage.toggleNav();
});

// TestID_49: Presence of 2 filters
Then("2 possible filters are visible", async function () {
    await this.expect(this.DashboardPage.filterUF).toBeVisible();
    await this.expect(this.page.locator('.btn-group.col-sm-12')).toBeVisible(); //locates period filter (a button group )
});


// TestID_50: Presence of 4 different periods to filter from
Then("{int} different periods are visible", async function (expectedCount) {
    const periods = this.DashboardPage.filterPeriod;
    await this.expect(periods).toHaveCount(expectedCount);
    for (let i = 0; i < expectedCount; i++) {
        await this.expect(periods.nth(i)).toBeVisible();
    }
});

// TestID_51: UF filter options
When("the user clicks the UF filter", async function () {
    await this.DashboardPage.filterUF_field.locator("a").click();
});
Then("the user can select to filter by all UF or choose a specific UF", async function () {
    await this.expect(this.page.locator("ul.select2-results")).toBeVisible();
});