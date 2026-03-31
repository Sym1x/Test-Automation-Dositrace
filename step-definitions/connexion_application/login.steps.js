const { Given, When, Then  } = require('@cucumber/cucumber');
const { LoginPage } = require("../../page-objects/LoginPage");
const env = require('../../environment/env-wrapper');

Given("the user is on the login page", async function (){
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.navigateToPage();
});

// Scenario: Page shows all login elements
Then("the page should have a login field", async function() {
    await this.expect(this.loginPage.inputLogin).toBeVisible({ timeout: 60000 });
});
Then("the page should have a password field", async function() {
    await this.expect(this.loginPage.inputPassword).toBeVisible({ timeout: 60000 });
});
Then("the page should have a connexion button", async function() {
    await this.expect(this.loginPage.buttonConnexion).toBeVisible({ timeout: 60000 });
});
Then("the page should have a password recovery link", async function() {
    await this.expect(this.loginPage.linkMotPasseOublie).toBeVisible({ timeout: 60000 });
});


// Scenario: Successful login
When('the user enters valid credentials', async function () {
    await this.loginPage.submitForm();
});
Then('the user should be logged in successfully', async function() {
    this.expect(this.page.url()).toBe(env.baseURL + "DoConnexion");
});


// Scenario: Unsuccessful login
When('the user enters invalid credentials', async function() {
    await this.loginPage.submitForm("failtest_username", "failtest_password");
})
Then('the user gets an error message {string}', async function(msg) {
    const err_notif = await this.page.locator("div[class*='ui-pnotify-container']");
    await this.expect(err_notif).toBeVisible();
    const err_txt = await this.page.locator('.ui-pnotify-text').innerText();
    await this.expect(err_txt).toBe(msg);
});


// Scenario: Forgot password
When('the user clicks password recovery link', async function() {
    await this.loginPage.linkMotPasseOublie.click();
});
Then('the password recovery page should load successfully', async function() {
    await this.expect(this.page.url()).toBe(env.baseURL + "ViewMdpLost");
});