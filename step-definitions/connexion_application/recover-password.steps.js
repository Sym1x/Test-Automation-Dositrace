const { Given, When, Then  } = require('@cucumber/cucumber');
const { RecoverPasswordPage } = require("../../page-objects/RecoverPasswordPage");

Given("the user is on the password recovery page", async function (){
    this.recoverPage = new RecoverPasswordPage(this.page);
    await this.recoverPage.navigateToPage();
});

// TestID_7: Page shows all password recovery elements
Then("the page should contain a login field", async function() {
    await this.expect(this.recoverPage.inputLogin).toBeVisible({ timeout: 60000 });
});
Then("the page should contain an email field", async function() {
    await this.expect(this.recoverPage.inputEmail).toBeVisible({ timeout: 60000 });
});


// TestID_8: Unsuccessful password recovery
When("the user enters invalid login or email", async function() {
    await this.recoverPage.submitForm("failtest", "failtest@fail.fr");
});
Then("the user get an error message {string}", async function(expectedMsg) {
    await this.verifyPopupMessage(expectedMsg);
});