const { Given, When, Then } = require('@cucumber/cucumber');
const { DataTable } = require('../../page-objects/elements/DataTable');
const { RiskPatientPage } = require('../../page-objects/RiskPatientPage');

Given('the user is on the Risk Patient page', async function () {
    await this.utils.redirectToDositrace(this.page);

    this.RiskPatientPage = new RiskPatientPage(this.page);
    await this.RiskPatientPage.navigateToPage();

    this.risk_patient_table = new DataTable(this.page);
    await this.page.getByText('12 derniers mois').click();
    await this.page.getByRole('button', { name: 'Filtrer' }).first().click();
});

// TestID_476: Table for risk patients shows all classic components
Then('risk patient table pagination works correctly', async function () {
    await this.risk_patient_table.getPaginationInfo();

    await this.risk_patient_table.goToNextPage();

    await this.risk_patient_table.goToLastPage();

    await this.risk_patient_table.goToPreviousPage();

    await this.risk_patient_table.goToFirstPage();
});

Then('risk patient table length works correctly', async function () {
    await this.risk_patient_table.changeTableLength(10);
    await this.risk_patient_table.changeTableLength(25);
    await this.risk_patient_table.changeTableLength(50);
    await this.risk_patient_table.changeTableLength(100);

});

Then('risk patient table global search works correctly', async function () {
    const keyword = 'e';
    await this.risk_patient_table.searchGlobally(keyword);
    const rows = await this.risk_patient_table.getRowTexts();
    const found = rows.some(row =>row.some(cell => cell.includes(keyword)));
    await this.expect(found).toBe(true);
});

Then('the user can sort rows by clicking column headers in risk patient table', async function () {
    await this.risk_patient_table.clickColumnToSort('Patient');
});


// TestID_477: Selecting patients to make visualizations
