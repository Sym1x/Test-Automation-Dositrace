const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given("the user is on the excel generation page", async function () {
    await this.page.goto("/excel-generation");
});


// TestID_539: Specifying period
When("the period field is visible", async function () {
    this.periodField = this.page.locator("#period-input");
    await expect(this.periodField).toBeVisible();
});

Then("the user can choose one of the 4 predefined periods", async function () {
    const buttons = this.page.locator(".period-buttons button");
    await expect(buttons).toHaveCount(4);
});

Then("the user can specify a period manually with the calendar widget", async function () {
    await this.periodField.click();
    const calendar = this.page.locator(".flatpickr-calendar");
    await expect(calendar).toBeVisible();
});


// TestID_540: Selecting a UF from the dropdown
When("the user clicks on the UF field", async function () {
    this.ufField = this.page.locator("#uf-select");
    await this.ufField.click();
});

Then("a dropdown list of UFs appears", async function () {
    this.ufList = this.page.locator(".uf-dropdown .dropdown-item");
    await expect(this.ufList.first()).toBeVisible();
});

Then("the user can search or select a UF", async function () {
    const searchInput = this.page.locator(".uf-dropdown input[type='search']");
    await expect(searchInput).toBeVisible();
});


// TestID_541: Checking presence of all UFs from configuration
When("the user opens the UF dropdown", async function () {
    this.ufField = this.page.locator("#uf-select");
    await this.ufField.click();
});

Then("all UFs registered in Configuration Center are present", async function () {
    const ufsFromConfig = await this.getUFListFromConfig(); // custom helper
    const ufOptions = await this.page.locator(".uf-dropdown .dropdown-item").allInnerTexts();

    for (const uf of ufsFromConfig) {
        expect(ufOptions).toContain(uf);
    }
});


// TestID_542: Selecting an equipment
When("the user clicks on the equipment field", async function () {
    this.equipmentField = this.page.locator("#equipment-select");
    await this.equipmentField.click();
});

Then("a dropdown list of equipments appears", async function () {
    this.equipmentList = this.page.locator(".equipment-dropdown .dropdown-item");
    await expect(this.equipmentList.first()).toBeVisible();
});

Then("the user can select an equipment", async function () {
    await this.equipmentList.first().click();
});


// TestID_543: Selecting a doctor
When("the user clicks on the doctor field", async function () {
    this.doctorField = this.page.locator("#doctor-select");
    await this.doctorField.click();
});

Then("a dropdown list of doctors appears", async function () {
    this.doctorList = this.page.locator(".doctor-dropdown .dropdown-item");
    await expect(this.doctorList.first()).toBeVisible();
});

Then("the user can select a doctor", async function () {
    await this.doctorList.first().click();
});


// TestID_544: Selecting a modality
When("the user clicks on the modality field", async function () {
    this.modalityField = this.page.locator("#modality-select");
    await this.modalityField.click();
});

Then("a dropdown list of modalities appears", async function () {
    this.modalityList = this.page.locator(".modality-dropdown .dropdown-item");
    await expect(this.modalityList.first()).toBeVisible();
});

Then("the user can select a modality", async function () {
    await this.modalityList.first().click();
});