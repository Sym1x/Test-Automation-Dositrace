const { Given, When, Then } = require('@cucumber/cucumber');
const { DataTable } = require('../../page-objects/elements/DataTable');
const { WorklistPage } = require('../../page-objects/WorklistPage');

Given("the user is on the Worklist page", async function () {
    await this.utils.redirectToDositrace();

    this.WorklistPage = new WorklistPage(this.page);
    await this.WorklistPage.navigateToPage();

    this.exam_table = new DataTable(this.page);
});


// TestID_92: Show worklist exams for today vs for the next 7 days
Then("the user can choose between displaying the exams set for today or the exams set for the next 7 days", async function () {
    await this.expect(this.WorklistPage.dueTodayBtn).toBeVisible();
    await this.expect(this.WorklistPage.dueThisWeekBtn).toBeVisible();
});


// TestID_93: Filters sidebar displays correctly
When('the user clicks "Ajouter des filtres" for worklist', async function () {
    await this.WorklistPage.addFiltersBtn.click();
});

Then('the user accesses a filters section containing "UF" and "Equipement"', async function () {
    await this.expect(this.WorklistPage.UF_filter).toBeVisible();
    await this.expect(this.WorklistPage.Equipement_filter).toBeVisible();
});


// TestID_94: Clicking the UF filter
When('the user clicks the UF filter in worklist filters', async function() {
    await this.WorklistPage.addFiltersBtn.click();
    await this.WorklistPage.UF_filter.click();
});
Then('a field listing the corresponding UF items becomes visible', async function () {
    await this.expect(this.page.locator('#select2-drop').getByRole('textbox')).toBeVisible();
});

// TestID_101: Clicking the Equipement filter
When('the user clicks the Equipement filter in worklist filters', async function () {
    await this.WorklistPage.addFiltersBtn.click();
    await this.WorklistPage.Equipement_filter.click();
});
Then('a field listing the corresponding Equipement items becomes visible', async function () {
    await this.expect(this.WorklistPage.filterDropdown).toBeVisible();
});


// TestID_95: Searching up filter items
// TestID_97: 'Toutes les UF'
When('the user is selecting a UF or Equipement filter', async function () {
    await this.WorklistPage.addFiltersBtn.click();
    await this.WorklistPage.UF_filter.click();
});

Then('the user can search by inputting its name', async function () {
    await this.expect(this.WorklistPage.filterDropdown.locator('input')).toBeVisible();
    await this.expect(this.WorklistPage.filterDropdown.getByText('Toutes les UF')).toBeVisible();
});


// @TestID_98: UF filter functionality
When('the user chooses a UF filter and clicks "rechercher"', async function () {
    await this.WorklistPage.addFiltersBtn.click();
    
    await this.WorklistPage.UF_filter.click();
    await this.WorklistPage.filterDropdown.getByText('Toutes les UF' ).click();
    
    await this.WorklistPage.rechercherBtn_filters.click();
});
// @TestID_102: Equipement filter functionality
When('the user chooses a Equipement filter and clicks "rechercher"', async function () {
    await this.WorklistPage.addFiltersBtn.click();
    
    await this.WorklistPage.Equipement_filter.click();
    await this.WorklistPage.filterDropdown.getByText('AXIOM LUMINOS VO').click();

    await this.WorklistPage.rechercherBtn_filters.click();
});
Then('the list is updated with the correct exams', async function () {
    await this.page.waitForLoadState('load');
    await this.exam_table.getRowTexts(); //revisit
});



// TestID_103: Removing the Equipement field
When('the user has selected an Equipement filter', async function () {
    await this.WorklistPage.addFiltersBtn.click();
    await this.WorklistPage.Equipement_filter.click();
    await this.WorklistPage.filterDropdown.getByText('AXIOM LUMINOS VO').click();
});

Then('the user can remove the Equipement field', async function () {
    await this.WorklistPage.removeSelectedEquipments();
});


// TestID_104
// TestID_105: Filter exams for today vs for the next 7 days
When('the user chooses to display the exams set for the next 7 days', async function () {
    this.nbExamsToday = await this.exam_table.getNumberOfRows();
    await this.WorklistPage.dueThisWeekBtn.click();
    await this.WorklistPage.rechercherBtn.click();
    await this.page.waitForLoadState('load');
});

Then('the list of exams is updated accordingly', async function () {
    this.nbExamsThisWeek = await this.exam_table.getNumberOfRows();
    await this.expect(this.nbExamsThisWeek).toBeGreaterThanOrEqual(this.nbExamsToday);
});


// TestID_106: Exam sheet redirection
When('the user clicks a listed exam', async function () {
    const exam_number_cell = await this.exam_table.getCell("Numéro d'examen", 0);
    await exam_number_cell.click();
});

Then('the user is redirected to a view of detailed information on the exam', async function () {
    const url = this.page.url();
    await this.expect(url).toContain('ViewStudy');
});


// TestID_108: Changing the number of elements to display
Then('the user is able to change the number of exams displayed in the worklist', async function () {
    await this.exam_table.changeTableLength(10);
    await this.exam_table.changeTableLength(25);
    await this.exam_table.changeTableLength(50);
    await this.exam_table.changeTableLength(100);
});


// TestID_109: Searching globally
Then('the user can search through exams globally', async function () {
    const search_word = 'Eva';
    await this.exam_table.searchGlobally(search_word);
    const result = this.exam_table.getRowTexts();
    const found = result.some(innerArr => innerArr.includes(search_word));
    await this.expect(found).toBe(true);
});


// TestID_110: Sorting worklist by column
Then('the user can sort the listed exams by clicking a column name', async function () {
    await this.exam_table.clickColumn('Patient');
    await this.expect(this.exam_table.thead.locator('th', { hasText: 'Patient' })).toHaveClass(/sorting_(asc|desc)/);

    await this.exam_table.clickColumn('Date');
    await this.expect(this.exam_table.thead.locator('th', { hasText: 'Date' })).toHaveClass(/sorting_(asc|desc)/);
});


// TestID_113: Viewing patient
When('the user clicks the name of a patient in the worklist', async function () {
    const patient_name = await this.exam_table.getCell('Patient', 0);
    await patient_name.click();
});
Then('the page is redirected to patient page', async function () {
    const url = this.page.url();
    await this.expect(url).toContain('ViewPatient');
});


// TestID_114: Viewing exam
When('the user clicks the number of a patient', async function () {
    const exam_number = await this.exam_table.getCell("Numéro d'examen", 0);
    await exam_number.click();
});
Then('the page is redirected to exam page', async function () {
    const url = this.page.url();
    await this.expect(url).toContain('ViewStudy');
});


// TestID_115: Viewing exam row details
When('the user clicks the green status icon', async function () {
    const first_row = this.exam_table.tbody.locator('tr').nth(0);
    const green_status_icon = first_row.locator('td').nth(1);
    await green_status_icon.click();
});
Then('the details of the exam row are shown', async function () {
    await this.expect(this.page.getByRole('table')).toBeVisible();
});