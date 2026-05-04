const { Given, When, Then } = require('@cucumber/cucumber');
const { DataTable } = require('../../page-objects/elements/DataTable');
const { PatientlistPage } = require('../../page-objects/PatientlistPage');

Given('the user is on the Patient List page', async function () {
    await this.utils.redirectToDositrace();

    this.PatientlistPage = new PatientlistPage(this.page);
    await this.PatientlistPage.navigateToPage();

    this.patient_table = new DataTable(this.page);
});


// TestID_214: Etat field displays correctly
When('the user clicks "Etat" field', async function () {
    await this.PatientlistPage.etatFilter.click();
});
Then('a search box and "Actifs" and "Supprimés" options are displayed', async function() {
    await this.expect(this.PatientlistPage.filterDropdown.getByRole('textbox')).toBeVisible();
    await this.expect(this.PatientlistPage.filterDropdown.getByText('Actifs')).toBeVisible();
    await this.expect(this.PatientlistPage.filterDropdown.getByText('Supprimés')).toBeVisible();
});


// TestId_215: Etat field functions correctly
Then('the user can filter patient list by Etat', async function () {
    await this.PatientlistPage.etatFilter.click();
    await this.PatientlistPage.filterDropdown.getByText('Actifs').click();
    await this.PatientlistPage.filterBtn.click();
});


// TestID_217: Filters sidebar displays correctly
When('the user clicks "Ajouter des filtres" for patient list', async function () {
    await this.PatientlistPage.addFiltersBtn.click();
});
Then('the user accesses a filters section containing "Date de naissance" and "Sexe"', async function () {
    await this.expect(this.PatientlistPage.dateFilter).toBeVisible();
    await this.expect(this.PatientlistPage.genderFilter).toBeVisible();
});


// TestID_220: Dropdown field displays correctly
When('the user clicks the Sexe field to filter', async function () {
    await this.PatientlistPage.addFiltersBtn.click();
    await this.PatientlistPage.genderFilter.click();
});
Then('a search field along the options \\(Hommes, femmes, Non définis et Tous) become visible', async function () {
    await this.expect(this.PatientlistPage.filterDropdown.getByRole('textbox')).toBeVisible();
    await this.expect(this.PatientlistPage.filterDropdown.getByText('Tous')).toBeVisible();
    await this.expect(this.PatientlistPage.filterDropdown.getByText('Homme')).toBeVisible();
    await this.expect(this.PatientlistPage.filterDropdown.getByText('Femme')).toBeVisible();
    await this.expect(this.PatientlistPage.filterDropdown.getByText('Non défini')).toBeVisible();
});


// TestID_221: The Sexe field filters correctly
When('the user filters by Sexe', async function () {
    await this.PatientlistPage.addFiltersBtn.click();
    await this.PatientlistPage.genderFilter.click();
    await this.PatientlistPage.filterDropdown.getByText('Non défini').click();
    await this.PatientlistPage.filterBtn_filters.click();
    await this.page.waitForLoadState('load');
});
Then('the patient list is updated in accordance with the chosen Sexe', async function () {
    const patient_gender = await this.patient_table.getCell('Sexe', 0);
    await this.expect(patient_gender.locator('i')).toHaveClass('icon-gender-undefined');
});


// TestID_223: Date de naissance input calendar displays correctly
When('the user clicks the Date de naissance field to filter', async function () {
    await this.PatientlistPage.addFiltersBtn.click();
    await this.PatientlistPage.dateFilter.locator('input').click();
});

Then('a calender becomes visible to choose date of birth', async function () {
    await this.expect(this.page.locator('.flatpickr-calendar')).toBeVisible();
});


// TestID_225: The Date de naissance field filters correctly
When('the user filters by Date de naissance', async function () {
    await this.PatientlistPage.addFiltersBtn.click();
    await this.PatientlistPage.dateFilter.locator('input').fill('13/02/1996');
    await this.PatientlistPage.filterBtn_filters.click();
    await this.page.waitForLoadState('load');
});
Then('the patient list is updated in accordance with the chosen Date', async function () {
    const patient_birth = await this.patient_table.getCell('Date de naissance', 0);
    await this.expect(patient_birth).toContainText('13/02/1996');
});


// TestID_226: "Réinitialiser" button functions correctly
When('the user has filters enabled and clicks the Réinitialiser button', async function () {
    this.initial_list_state = await this.patient_table.getPaginationInfo();

    // set filters
    await this.PatientlistPage.addFiltersBtn.click();
    await this.PatientlistPage.genderFilter.click();
    await this.PatientlistPage.filterDropdown.getByText('Femme').click();
    await this.PatientlistPage.dateFilter.locator('input').fill('13/02/1996');
    await this.PatientlistPage.dateFilter.locator('input').press('Enter');
    await this.PatientlistPage.filterBtn_filters.click();
    await this.page.waitForLoadState('load');

    await this.expect(this.patient_table.getPaginationInfo()).not.toBe(this.initial_list_state);

    // click reinitialize
    await this.PatientlistPage.addFiltersBtn.click();
    await this.PatientlistPage.reinitializeBtn_filters.click();
    await this.page.waitForLoadState('load');
});
Then('the filters are reset', async function () {
    const result_list_state = await this.patient_table.getPaginationInfo();
    await this.expect(result_list_state).toBe(this.initial_list_state);
});


// TestID_228: Global search in patient list
Then('the user can search globally along the columns of the patient table', async function () {
    await this.patient_table.searchGlobally('test');
});

// TestID_229: Sorting patient list by column
Then('the user can sort the patient list by clicking a column name', async function () {
    await this.patient_table.clickColumn('Nom de famille');
    await this.expect(this.patient_table.thead.locator('th', { hasText: 'Nom de famille' })).toHaveClass(/sorting_(asc|desc)/);

    await this.patient_table.clickColumn('Date de naissance');
    await this.expect(this.patient_table.thead.locator('th', { hasText: 'Date de naissance' })).toHaveClass(/sorting_(asc|desc)/);
});


// TestID_230: Navigating the patient list
Then('the user can use the arrows to navigate the patient list', async function () {
    await this.page.locator('#patient_next').click();
    await this.expect(this.page.locator('#patient_info')).toContainText('Affichage de l\'élément 11 à 20 sur 20,300 élément(s)');

    await this.page.locator('#patient_last').click();
    await this.expect(this.page.locator('#patient_info')).toContainText('Affichage de l\'élément 20,291 à 20,300 sur 20,300 élément(s)');
});



// TestID_231: Choosing number of patients to list in one page
Then('the user is able to change the number of patients displayed in the patient list', async function () {
    await this.patient_table.changeTableLength(10);
    await this.patient_table.changeTableLength(25);
    await this.patient_table.changeTableLength(50);
    await this.patient_table.changeTableLength(100);
});


// TestID_233: Viewing patients
When('the user clicks the name of a patient in the patient list page', async function () {
    const patient_name = await this.patient_table.getCell('Prénom', 0);
    await patient_name.click();
});

Then('the user is redirected to view the sheet of the patient', async function () {
    await this.expect(this.page).toHaveURL(/ViewPatient/);
});