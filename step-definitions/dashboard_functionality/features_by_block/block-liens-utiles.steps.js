const { When, Then } = require('@cucumber/cucumber');

// TestID_57: Access exam search from Lien utiles
When('the user clicks on "Accéder aux examens" in the useful links section', async function () {
    const examLink = this.page.locator('#examens a.card');

    await examLink.click();
});

Then('the user should be redirected to the exam search page for the selected month', async function () {
    await this.expect(this.page).toHaveURL(/SearchStudy/);
});


// @TestID_58: Access patient search from Lien utiles
When('the user clicks on "Accéder aux patients" in the useful links section', async function () {
    const patientLink = this.page.locator('#patients a.card');

    await patientLink.click();
});

Then('the user should be redirected to the patient search page for the selected month', async function () {
    await this.expect(this.page).toHaveURL(/ListPatient/);
});
