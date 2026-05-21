const { When, Then  } = require('@cucumber/cucumber');

// TestID_63: Unprocessed alerts field is functional
Then('the field "Alertes non traitées" should correspond to a real functional link', async function () {
    const block_info = this.page.locator('#rappel.blockinfo');
    const alertes_non_traitees_rappel = await block_info.locator('a[href*="ViewAlerts"]');
    await this.expect(alertes_non_traitees_rappel).toHaveCount(1);
});


// @TestID_64: Access alerts menu from unprocessed alerts block
When('the user clicks on "Alertes non traitées"', async function () {
    await this.page.getByRole('link', { name: 'Alertes non traitées' }).click();
});

Then('the user should be redirected to the Alerts menu from Rappels block', async function () {
    await this.expect(this.page).toHaveURL(/ViewAlerts/);
});


// TestID_65: Alerts count matches between dashboard and alerts page
When('the user navigates to the alerts list', async function () {
    const alertes_non_traitees_rappel = this.page.locator('#rappel.blockinfo').locator('a[href*="ViewAlerts"]');
    this.alerts_count_on_dashboard = parseInt(await alertes_non_traitees_rappel.locator('.float-left').innerText(), 10);
    await this.page.getByRole('link', { name: 'Alertes non traitées' }).click()
    await this.page.waitForLoadState("load");
});

Then('the number of displayed alerts should match the dashboard counter for unprocessed alerts', async function () {
    const real_alerts_count = await this.DashboardPage.data_table_obj.getNumberOfRows();
    await this.expect(real_alerts_count).toBe(this.alerts_count_on_dashboard);
});


// TestID_66: Unlinked protocols field is functional
Then('the field "Protocoles non reliés" should correspond to a real functional link', async function () {
    const block_info = this.page.locator('#rappel.blockinfo');
    const protocoles_non_relies_rappel = await block_info.locator('a[href*="CreateProtocolMapping"]');
    await this.expect(protocoles_non_relies_rappel).toHaveCount(1);
});


// TestID_67: Access protocol correspondence table from unlinked protocols block
When('the user clicks on "Protocoles non reliés"', async function () {
    await this.page.getByRole('link', { name: 'Protocole non relié' }).click();
});
Then('the user should be redirected to the protocol correspondence table', async function () {
    await this.expect(this.page).toHaveURL(/CreateProtocolMapping/);
});


// TestID_68: Unlinked members field is functional
Then('the field "Membres non reliés" should correspond to a real functional link', async function () {
    const block_info = this.page.locator('#rappel.blockinfo');
    const membres_non_relies_rappel = await block_info.locator('a[href*="CreateMemberMapping"]');
    await this.expect(membres_non_relies_rappel).toHaveCount(1);
});


// TestID_69: Access member mapping page from unlinked members block
When('the user clicks on "Membres non reliés"', async function () {
    await this.page.getByRole('link', { name: 'Membre non relié' }).click();
});
Then('the user should be redirected to the personnel association page in Configuration Center', async function () {
    await this.expect(this.page).toHaveURL(/\/Core-war\/CreateMemberMapping/);
});


// TestID_70: Patients without exams count is correct
Then('the field "Patients sans examens" should correspond to a real functional link', async function () {
    const block_info = this.page.locator('#rappel.blockinfo');
    const patients_sans_examens_rappel = await block_info.locator('a[href*="PatientsWithoutStudy"]');
    await this.expect(patients_sans_examens_rappel).toHaveCount(1);
});


// TestID_71: Access patients without exams page from reminders block
When('the user clicks on "Patients sans examens"', async function () {
    await this.page.getByRole('link', { name: 'Patients sans examen' }).click();
});

Then('the user should be redirected to the patients without exams page in the Patient menu', async function () {
    await this.expect(this.page).toHaveURL(/PatientsWithoutStudy/);
});