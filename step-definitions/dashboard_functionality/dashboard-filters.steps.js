const { Given, When, Then } = require('@cucumber/cucumber');
const { DashboardPage } = require("../../page-objects/DashboardPage");

Given("the user is on the Dashboard", async function () {
    await this.redirectToDositrace();
    this.DashboardPage = new DashboardPage(this.page);
    await this.DashboardPage.navigateToPage();
});