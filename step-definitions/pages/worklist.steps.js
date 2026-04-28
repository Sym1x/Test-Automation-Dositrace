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
    await this.expect(this.page.getByText('Examens du jour')).toBeVisible();
    await this.expect(this.page.getByText('Examens à 7 jours')).toBeVisible();
});


// TestID_93: Filters sidebar displays correctly
When('the user clicks "Ajouter des filtres" for worklist', async function () {
    await this.page.getByText('Ajouter des filtres').click();
});

Then('the user accesses a filters section containing "UF" and "Equipement"', async function () {
    await this.expect(this.page.locator('#s2id_uf')).toBeVisible();
    await this.expect(this.page.locator('#s2id_equi').getByRole('list')).toBeVisible();
});


// TestID_94: Clicking the UF filter
When('the user clicks the UF filter', async function() {
    await this.page.getByText('Ajouter des filtres').click();
    await this.page.locator('#s2id_uf a').click();
});
Then('a field listing the corresponding UF items becomes visible', async function () {
    await this.expect(this.page.locator('#select2-drop').getByRole('textbox')).toBeVisible();
});

// TestID_101: Clicking the Equipement filter
When('the user clicks the Equipement filter', async function () {
    await this.page.getByText('Ajouter des filtres').click();
    await this.page.locator('#s2id_equi').getByRole('list').click();
});
Then('a field listing the corresponding Equipement items becomes visible', async function () {
    await this.expect(this.page.locator('#select2-drop')).toBeVisible();
});

// TestID_95: Searching filters
// TestID_97: 'Toutes les UF'
When('the user is selecting a UF or Equipement filter', async function () {
    await this.page.getByText('Ajouter des filtres').click();
    await this.page.locator('#s2id_uf a').click();
});

Then('the user can search by inputting its name', async function () {
    await this.expect(this.page.locator('#select2-drop input')).toBeVisible();
    await this.expect(this.page.locator('#select2-drop').getByText('Toutes les UF')).toBeVisible();
});


// @TestID_98: UF filter functionality
When('the user chooses a UF filter and clicks "rechercher"', async function () {
    await this.page.getByText('Ajouter des filtres').click();
    await this.page.getByRole('link', { name: 'Toutes les UF' }).click();
    await this.page.locator('#select2-drop').getByText('Unité fonctionnelle de dé').click();
});
// @TestID_102: Equipement filter functionality
When('the user chooses a Equipement filter and clicks "rechercher"', async function () {
    await this.page.getByText('Ajouter des filtres').click();
    await this.page.locator('#s2id_equi').getByRole('list').click();
    await this.page.locator('#select2-drop').getByText('SPECT').click();
});
Then('the list is updated with the correct exams', async function () {
    await this.page.locator('#rightbar-overlay').click();
    await this.page.getByText('Examens à 7 jours').click();
    await this.page.locator('#filter_buttons input').first().click();
    await this.expect(this.page.getByRole('gridcell', { name: '5000' })).toBeVisible();
});



// TestID_103: Removing the Equipement field
When('the user has selected an Equipement filter', async function () {
    await this.page.getByText('Ajouter des filtres').click();
    await this.page.locator('#s2id_equi').getByRole('list').click();
    await this.page.locator('#select2-drop').getByText('SPECT').click();
});
Then('the user can remove the Equipement field', async function () {
    await page.locator('#s2id_equi').getByRole('link').filter({ hasText: /^$/ }).click();
});


// TestID_104
// TestID_105: Filter exams for today vs for the next 7 days
When('the user chooses between displaying the exams set for today or the exams set for the next 7 days', async function () {
    await this.expect(this.page.getByRole('gridcell', { name: 'Aucune donnée disponible dans' })).toBeVisible();
    await this.page.getByText('Examens à 7 jours').click();
});

Then('the list of exams is updated accordingly', async function () {
    await this.page.getByRole('button', { name: 'Rechercher' }).first().click();
    await this.expect(this.page.locator('#exam_wrapper > div:nth-child(2)')).toBeVisible();
});

// TestID_106: Exam sheet redirection
When('the user clicks a listed exam', async function () {
    await this.page.getByText('Examens à 7 jours').click();
    await this.page.getByRole('button', { name: 'Rechercher' }).first().click();
    await this.page.getByText('5000').click();
});

Then('the user is redirected to a view of detailed information on the exam', async function () {
    const url = this.page.url();
    await this.expect(url).toContain('ViewStudy');
});

// TestID_108: Changing the number of elements to display
Then('the user is able to change the number of exams displayed in the list', async function () {
    await this.page.getByLabel('Afficher 102550100 éléments').selectOption('25');
    await this.page.getByLabel('Afficher 102550100 éléments').selectOption('50');
    await this.page.getByLabel('Afficher 102550100 éléments').selectOption('100');
    await this.page.getByLabel('Afficher 102550100 éléments').selectOption('10');
});


// TestID_109: Searching globally
Then('the user can search through exams globally', async function () {
    //todo
});


// TestID_110: Sorting worklist by column
Then('the user can sort the listed exams by clicking a column name', async function () {
    const headers = this.page.locator(
    'thead th:not(.sorting_disabled):visible'
    );

    const count = await headers.count();
    for (let i = 0; i < count; i++) {
        const th = this.page.locator(
            'thead th:not(.sorting_disabled):visible'
        ).nth(i);

        await th.click();
        await this.expect(th).toHaveAttribute('aria-sort', 'ascending');

        await th.click();
        await this.expect(th).toHaveAttribute('aria-sort', 'descending');
    }
})

// TestID_113: Viewing patient
When('the user clicks the name of a patient in the worklist', async function () {
    await this.page.locator('#trstudy0 a').filter({ hasText: 'Anonyme PIERRE' }).click();
});
/*Then('the page is redirected to patient page', async function () {
    const url = this.page.url();
    await this.expect(url).toContain('ViewPatient');
});*/


// TestID_114: Viewing exam
When('the user clicks the number of a patient', async function () {
    await this.page.getByText('12', { exact: true }).click();
});
Then('the page is redirected to exam page', async function () {
    const url = this.page.url();
    await this.expect(url).toContain('ViewStudy');
});


// TestID_115: Viewing exam row details
When('the user clicks the green tingy', async function () {
    await this.page.locator('.icon-alert-success').first().click();
});
Then('the details of the exam row are shown', async function () {
    await this.expect(page.getByRole('gridcell', { name: 'Patient : Anonyme PIERRE Date' })).toBeVisible();
});