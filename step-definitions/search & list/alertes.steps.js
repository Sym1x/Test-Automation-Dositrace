const { Given, When, Then } = require('@cucumber/cucumber');
const { DataTable } = require('../../page-objects/elements/DataTable');
const { AlertsPage } = require('../../page-objects/AlertsPage');
const { Form } = require('../../page-objects/elements/Form');

Given('the user is on the Alerts page', async function () {
    await this.utils.redirectToDositrace(this.page);

    this.AlertsPage = new AlertsPage(this.page);
    await this.AlertsPage.navigateToPage();

    this.alerts_table = new DataTable(this.page);
    this.filtering_form = new Form(this.page.locator('#ViewAlerts'));
});


// TestID_438: Filtering alerts by period
Then('the user can specify a period bounding the displayed alerts', async function () {
    await this.AlertsPage.addFiltersBtn.click();
    this.filtering_form = new Form(this.page.locator('#ViewAlerts'));
    const txt = await this.filtering_form.getLabels();
    console.log(txt);

    const field = await this.filtering_form.getFieldByLabel('Niveau');
    await field.click;
    await this.page.waitForTimeout(5000);

    /*
    const formWrapper = this.page.locator('#alerts-filter-form'); 
    this.form = new Form(formWrapper);

    await this.form.fillField('Période', '2023-01-01 - 2023-01-31');*/
});


// TestID_439: Searching from the "Filtre" field
Then('the user can search in the "Filtre" field', async function () {
    const filterInput = this.page.getByPlaceholder('Filtre');
    await filterInput.fill('gamma');

    const rows = await this.alerts_table.getNumberOfRows();
    if (rows === 0) throw new Error('Search filter returned no results!');
});


// TestID_440: Advanced Filtering sidebar displays correctly
When('the user clicks "Ajouter des filtres" for alerts', async function () {
    await this.page.getByText('Ajouter des filtres').click(); 
});

Then('the the filtering sidebar displays the filters:', async function (dataTable) {
    const expectedFilters = dataTable.raw().flat();

    for (const filter of expectedFilters) {
        await this.page.getByText(filter, { exact: true }).waitFor();
    }
});

// TestID_443
// TestID_444: Date field user experience
When('the user clicks the Date field for filtering alerts', async function () {
    const dateField = this.page.getByLabel('Date'); 
    await dateField.click();
});
Then('a graphical calendar is displayed', async function () {
    await this.page.locator('.daterangepicker').waitFor(); 
});
Then('the user is able to select dates manually or graphically', async function () {
    const dateField = this.page.getByLabel('Date'); 
    await dateField.fill('2023-02-01 - 2023-02-28');

    await this.page.locator('.daterangepicker .available').first().click(); 
});


// TestID_446: Niveau field displays correctly
When('the user selects "Niveau" field', async function () {
    this.niveauField = this.page.getByLabel('Niveau'); 
    await this.niveauField.click();
});
Then('the options "1" and "2" are displayed', async function () {
    await this.page.getByRole('option', { name: '1' }).waitFor();
    await this.page.getByRole('option', { name: '2' }).waitFor();
});

// TestID_447: Filtering works correctly
When('the user clicks the Filtrer button', async function () {
    await this.page.getByRole('button', { name: 'Filtrer' }).click(); 
});
Then('the alerts list is updated in accordance with the filters chosen', async function () {
    const rows = await this.alerts_table.getNumberOfRows();
    if (rows === 0) throw new Error('Filtered table returned zero results.');
});

// TestID_448: Global search in alerts list
Then('the user can search globally in the alerts list using keywords', async function () {
    await this.alerts_table.searchGlobally('test');

    const rows = await this.alerts_table.getNumberOfRows();
    if (rows === 0) throw new Error('Global search returned no results!');
});

// TestID_449: Changing number of alerts listed
Then('the user can change between listing 10, 25, 50 or 100 alerts per page', async function () {
    const sizes = [10, 25, 50, 100];

    for (const size of sizes) {
        await this.alerts_table.changeTableLength(size);
    }
});

// TestID_450: Sorting the alerts list
Then('the user can sort the alerts list by clicking a column header', async function () {
    const firstHeader = (await this.alerts_table.getColumnNames())[0];

    await this.alerts_table.clickColumn(firstHeader);
    const rowsAfter = await this.alerts_table.getRowTexts();

    if (!rowsAfter.length) throw new Error('Sorting did not update table rows.');
});

// TestID_451: Pagination works in the alerts list
Then('the user can paginate through the list by clicking the arrows', async function () {
    const infoBefore = await this.alerts_table.getPaginationInfo();

    await this.alerts_table.goToNextPage();
    const infoAfter = await this.alerts_table.getPaginationInfo();

    if (infoAfter === infoBefore)
        throw new Error('Pagination did not change table page.');
});

    
