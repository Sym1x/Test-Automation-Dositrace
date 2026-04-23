const { Given, When, Then } = require('@cucumber/cucumber');

Given('the user is on the Exam Search page', async function () {
    await this.utils.redirectToDositrace();
    await this.page.goto('http://10.0.5.14:8080/DositraceV2-war/SearchStudy'); // refactor
});


// TestID_117: Calendar visibility in Exam Search
When('the user clicks the date field', async function () {
    await this.page.click('#daterangepicker1');
});

Then('a calendar becomes visible allowing to choose the start date and end date', async function () {
    await this.expect(this.page.locator('#daterangepicker1')).toHaveClass(/active/);
});


// TestID_118: Date field functionality
Then('the user can enter dates manually', async function () {
    await this.expect(this.page.getByRole('textbox', { name: 'Date', exact: true })).toBeVisible();
});
Then('the user can enter dates using the calendar', async function () {
    await this.page.click('#daterangepicker1');
    await this.expect(this.page.locator('.flatpickr-calendar.rangeMode')).toBeVisible();
});


// TestID_122: Date buttons functionality
Then('the date field is updated according to the button clicked', async function () {
    const date_text_box = this.page.getByRole('textbox', { name: 'Date', exact: true });
    await this.page.getByText('dernier mois').click();
    await this.expect(date_text_box).toHaveValue(this.utils.getLastMonthsRange(1));
    
    await this.page.getByText('3 derniers mois').click();
    await this.expect(date_text_box).toHaveValue(this.utils.getLastMonthsRange(3));

    await this.page.getByText('6 derniers mois').click();
    await this.expect(date_text_box).toHaveValue(this.utils.getLastMonthsRange(6));
});


// TestID_123: The filters sidebar displays correctly
When('the user clicks "Ajouter des filtres" for searching exams', async function () {
    await this.page.getByText('Ajouter des filtres').click();
});
Then('the user can select from the filters:', async function (dataTable) {
    await this.expect(this.page.getByText('Filtres Avancés')).toBeVisible();
    await this.expect(this.page.getByText('UF', { exact: true })).toBeVisible();
    await this.expect(this.page.locator('#filter_6').getByText('Modalité')).toBeVisible();
    await this.expect(this.page.getByText('Equipement')).toBeVisible();
    await this.expect(this.page.locator('#filter_9').getByText('Protocole', { exact: true })).toBeVisible();
    await this.expect(this.page.getByText('Opérateur', { exact: true })).toBeVisible();
    await this.expect(this.page.locator('#filter_5').getByText('Numéro d\'examen')).toBeVisible();
    await this.expect(this.page.getByText('Type alerte')).toBeVisible();
    await this.expect(this.page.locator('#filter_8').getByText('Patient', { exact: true })).toBeVisible();
    await this.expect(this.page.getByText('Date de naissance')).toBeVisible();
    await this.expect(this.page.getByText('Etat')).toBeVisible();
    await this.expect(this.page.getByText('Patient à risques')).toBeVisible();
    await this.expect(this.page.getByText('Alertes traitées')).toBeVisible();
});
