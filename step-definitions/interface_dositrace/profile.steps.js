const { Given, When, Then } = require('@cucumber/cucumber');
// TestID_26 : Page shows details on user and expected elements
Then('the user can consult profile details', async function () {
    await expect(this.page.locator('#profile-details')).toBeVisible(); 
});

Then('the user can start modifying profile details by clicking the pen icon', async function () {
    await this.page.click('#pen-icon'); 
});

Then('the user can see language and theme in parameters section', async function () {
    await expect(this.page.locator('#parameters-section >> text=language|langue|theme|thème')).toBeVisible(); 
});

Then('the user can see a change password button', async function () {
    await expect(this.page.locator('#change-password-button')).toBeVisible(); 
});

// TestID_27 : Change language
When('the user chooses a different language', async function () {
    await this.page.click('#language-selector'); 
    await this.page.selectOption('#language-selector', { value: 'en' });
});

Then('the language changes', async function () {
    await expect(this.page.locator('html')).toHaveAttribute('lang', /en|fr|de|es/i);
});

// TestID_29 : Edit profile page
When('the user clicks Edit icon', async function () {
    await this.page.click('#edit-icon'); 
});

Then('the user is redirected to profile modification page', async function () {
    await expect(this.page).toHaveURL(/.*edit|modification|profile.*edit.*/i);
});

// TestID_30 : The password change form displays all required fields
When('the user opens the Change Password page', async function () {
    await this.page.click('#change-password-button'); 
});

Then('the form should contain a field for the old password', async function () {
    await expect(this.page.locator('#old-password')).toBeVisible(); 
});

Then('the form should contain a field for the new password', async function () {
    await expect(this.page.locator('#new-password')).toBeVisible(); 
});

Then('the form should contain a field for confirming the new password', async function () {
    await expect(this.page.locator('#confirm-password')).toBeVisible(); 
});