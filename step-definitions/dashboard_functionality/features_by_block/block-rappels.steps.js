const { When, Then  } = require('@cucumber/cucumber');

// TestID_63: Unprocessed alerts count is correct
Then('the displayed number of "Alertes non traitées" should match the real number of unprocessed alerts', async function () {
    const uiCountLocator = this.page.locator('#rappel-border1 strong');
    const displayedCount = parseInt(await uiCountLocator.textContent(), 0);
});


// @TestID_64: Access alerts menu from unprocessed alerts block
When('the user clicks on "Alertes non traitées"', async function () {
    const alertBlockLink = this.page.locator('#rappel a[href*="ViewAlerts"]');
    await alertBlockLink.click();
});

Then('the user should be redirected to the Alerts menu', async function () {
    await this.expect(this.page).toHaveURL(/ViewAlerts/);
});


// TestID_65: Alerts count matches between dashboard and alerts page
When('the user navigates to the alerts list', async function () {
    this.dashboardCountLocator = this.page.locator('#rappel-border1 strong');
    this.dashboardCount = parseInt(await dashboardCountLocator.textContent(), 10);
    await this.page.locator('#rappel a[href*="ViewAlerts"]').click();
    await this.page.waitForURL(/ViewAlerts/);
});

Then('the number of displayed alerts should match the dashboard counter for unprocessed alerts', async function () {
    const alertsCount = await this.page.locator('.alert-row, tr.alert, .alert-item').count();
    expect(alertsCount).toBe(this.dashboardCount);
});


// TestID_66: Unlinked protocols count is correct
Then('the displayed number of "Protocoles non reliés" should match the real number of unlinked protocols', async function (expectedCount) {
    const countLocator = this.page.locator('#rappel-border2 strong');
    const displayedCount = parseInt(await countLocator.textContent(), 10);
    expect(displayedCount).toBe(0);
});


// TestID_67: Access protocol correspondence table from unlinked protocols block
When('the user clicks on "Protocoles non reliés"', async function () {
    const protocolLink = this.page.locator('#rappel a[href*="CreateProtocolMapping"]');
    await protocolLink.click();
});
Then('the user should be redirected to the protocol correspondence table', async function () {
    await this.expect(this.page).toHaveURL(/CreateProtocolMapping/);
});


// TestID_68: Unlinked members count is correct
Then('the displayed number of "Membres non reliés" should match the real number of unlinked members', async function () {
    const countLocator = this.page.locator('#rappel-border3 strong');
    const displayedCount = parseInt(await countLocator.textContent(), 10);
    expect(displayedCount).toBe(0);
});


// TestID_69: Access member mapping page from unlinked members block
When('the user clicks on "Membres non reliés"', async function () {
    const memberLink = this.page.locator('#rappel a[href*="CreateMemberMapping"]');
    await memberLink.click();
});
Then('the user should be redirected to the personnel association page in Configuration Center', async function () {
    await this.expect(this.page).toHaveURL(/\/Core-war\/CreateMemberMapping/);
});


// TestID_70: Patients without exams count is correct
Then('the displayed number of "Patients sans examens" should match the real number of patients without exams', async function () {
    const CountLocator = this.page.locator('#rappel-border4 strong');
    const displayedCount = parseInt(await CountLocator.textContent(), 10);
    expect(displayedCount).toBe(0);
});


// TestID_71: Access patients without exams page from reminders block
When('the user clicks on "Patients sans examens"', async function () {
    const patientsLink = this.page.locator('#patientsWithoutStudy');
    await patientsLink.click();
});

Then('the user should be redirected to the patients without exams page in the Patient menu', async function () {
    await this.expect(this.page).toHaveURL(/PatientsWithoutStudy/);
});