const { Given, When, Then } = require('@cucumber/cucumber');
const { DataTable } = require('../../page-objects/elements/DataTable');
const { ExamSearchPage } = require('../../page-objects/ExamSearchPage');

Given('the user is on the Exam Search page', async function () {
    await this.utils.redirectToDositrace(this.page);

    this.ExamSearchPage = new ExamSearchPage(this.page);
    await this.ExamSearchPage.navigateToPage();

    this.exam_table = new DataTable(this.page);
});


// TestID_117: Calendar visibility in Exam Search
When('the user clicks the date field', async function () {
    await this.ExamSearchPage.dateRangeInput.click();
});

Then('a calendar becomes visible allowing to choose the start date and end date', async function () {
    await this.expect(this.ExamSearchPage.calendarDays).toBeVisible();
    await this.expect(this.ExamSearchPage.calendarDays.locator('.flatpickr-day.startRange')).toHaveCount(1);
    await this.expect(this.ExamSearchPage.calendarDays.locator('.flatpickr-day.endRange')).toHaveCount(1);
});


// TestID_118: Date field functionality
Then('the user can enter dates manually', async function () {
    await this.expect(this.ExamSearchPage.dateRangeInput).toBeVisible();
    await this.ExamSearchPage.dateRangeInput.fill('01/01/1999 - 02/01/1999');
    await this.ExamSearchPage.dateRangeInput.press('Enter');
});
Then('the user can enter dates using the calendar', async function () {
    await this.ExamSearchPage.dateRangeInput.click();
    await this.ExamSearchPage.calendarDays.locator('span').nth(0).click();
    await this.ExamSearchPage.calendarDays.locator('span').nth(10).click();
});


// TestID_122: Date buttons functionality
Then('the date field is updated in accordance with the button clicked', async function () {
    const date_text_box = this.page.getByRole('textbox', { name: 'Date', exact: true });
    await this.page.getByText('dernier mois').click();
    await this.expect(date_text_box).toHaveValue(this.utils.getLastMonthsRange(1));
    
    await this.page.getByText('3 derniers mois').click();
    await this.expect(date_text_box).toHaveValue(this.utils.getLastMonthsRange(3));

    await this.page.getByText('6 derniers mois').click();
    await this.expect(date_text_box).toHaveValue(this.utils.getLastMonthsRange(6));

    await this.page.getByText('12 derniers mois').click();
    await this.expect(date_text_box).toHaveValue(this.utils.getLastMonthsRange(12));
});


// TestID_123: The Advanced Filtering sidebar displays correctly
When('the user clicks "Ajouter des filtres" for searching exams', async function () {
    await this.ExamSearchPage.addFiltersBtn.click();
});
Then('the user can select from the filters:', async function (dataTable) {
  const expectedFilters = dataTable.raw().flat();

  let actualFilters = await this.page.locator('#page-rightbar label').evaluateAll(nodes => nodes.map(n => n.innerText.trim()));
  actualFilters = actualFilters.slice(1);

  for (const expected of expectedFilters) {
    console.log(expected);
    console.log(actualFilters);
    this.expect(actualFilters).toContain(expected);
  }
});
