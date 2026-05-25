const { Given, When, Then } = require('@cucumber/cucumber');
const { DashboardPage } = require("../../page-objects/DashboardPage");

Given("the user is on the Dashboard", async function () {
    await this.utils.redirectToDositrace(this.page);

    this.DashboardPage = new DashboardPage(this.page);
    await this.DashboardPage.navigateToPage();
});

// TestID_49: Presence of 2 filters
Then("2 possible filters are visible", async function () {
    const UF_filter = await this.DashboardPage.filtering_form.getFieldByLabel('UF');
    const Period_filter = this.DashboardPage.filtering_form.formWrapper.locator('#btnPreviousMonth, #btnCurrentMonth, #btnPreviousYear, #btnCurrentYear'); //locates period filter buttons

    await this.expect(UF_filter).toBeVisible();
    await this.expect(Period_filter.nth(0)).toBeVisible(); //locates period filter (a button group )
});


// TestID_50: Presence of 4 different periods to filter from
Then("4 different periods are visible and CurrentMonth is selected by default", async function (periodList) {
    const periods = periodList.raw().flat();
    for(const period of periods) {
        const Period_button = this.DashboardPage.filtering_form.formWrapper.locator('[id^="btn' + period + '"]');
        await this.expect(Period_button).toBeVisible();
        if(period === 'CurrentMonth')
            await this.expect(Period_button).toHaveClass(/(^|\s)active(\s|$)/);
    }
});

// TestID_51: UF filter options
Then("the user can select to filter by all UF or choose a specific UF", async function () {
    const options = await this.DashboardPage.filtering_form.getOptions('UF');
    if(options.length < 2)
        throw new Error("No UF options are being displayed in the filter");
    if (!options.includes("..."))
        throw new Error("UF filter does not have an option to select all UF");
});