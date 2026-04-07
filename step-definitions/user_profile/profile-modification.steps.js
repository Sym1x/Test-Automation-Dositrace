const { Given, When, Then } = require('@cucumber/cucumber');
//refactor
/*
Given('the user is in profile modification page', async function(){});
*/
// TestID_31 : Presence of {int} input fields for profile modification
Then('there {int} input fields for profile modification', async function (expectedCount) {
    const inputFields = this.page.locator('#profile-edit-form input, #profile-edit-form textarea, #profile-edit-form select'); 
    const count = await inputFields.count();
    this.expect(count).toBe(10);
});

// TestID_32 : Modifying profile information and saving
When('the user modifies information in the fields', async function () {
    await this.page.fill('#first-name-field', 'UpdatedName');
    await this.page.fill('#last-name-field', 'UpdatedLast');   
    await this.page.fill('#email-field', 'updated@example.com'); 
});

When('the user clicks on Modifier to save', async function () {
    await this.page.click('#modifier-button'); 
});

Then('a confirmation message is displayed', async function () {
    await this.expect(this.page.locator('text=modification réussie|enregistrée|confirmée|success')).toBeVisible();
});

// TestID_33 : Cancel modification with Retour button
When('the user clicks on the Retour button', async function () {
    await this.page.click('#retour-button'); 
});

Then('the modification is cancelled and the user returns to the user profile', async function () {
    await this.expect(this.page).toHaveURL(/.*profile|profil.*/i);
    await this.expect(this.page.locator('#profile-details')).toBeVisible(); 
});