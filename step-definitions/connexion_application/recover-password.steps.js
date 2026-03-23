const { Given, When, Then  } = require('@cucumber/cucumber');
const { RecoverPasswordPage } = require("../../page-objects/RecoverPasswordPage");

Given("the user is on the password recovery page", async function (){
    this.recoverPage = new RecoverPasswordPage(this.page);
    await this.recoverPage.navigateToPage();
});

// Scenario: Page shows all password recovery elements
Then("the page should contain a login field", async function() {
    await this.expect(this.recoverPage.inputLogin).toBeVisible({ timeout: 60000 });
});
Then("the page should contain an email field", async function() {
    await this.expect(this.recoverPage.inputEmail).toBeVisible({ timeout: 60000 });
});


// Scenario: Unsuccessful password recovery
When("the user enters invalid login or email", async function() {
    await this.recoverPage.submitForm("failtest", "failtest@fail.fr");
});
Then("the users get an error message {string}", async function(msg) {
    err_notif = await this.page.locator("div[class*='ui-pnotify-container']");
    await this.expect(err_notif).toBeVisible();
    const err_txt = await this.page.locator('.ui-pnotify-text').innerText();
    await this.expect(err_txt).toBe(msg);
});