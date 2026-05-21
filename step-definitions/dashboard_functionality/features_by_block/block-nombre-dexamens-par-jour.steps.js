const { When, Then  } = require('@cucumber/cucumber');

 // TestID_85: Monthly exam count matches real data
let chartValue = 0;
let realValue = 0;
When('the user checks the number of exams for the year 2025 from the block', async function () {
    await this.page.locator('#btnPreviousYear').click();
    await this.page.waitForTimeout(5000);
    chartValue = extractChartValue(); // to implement! !!! 
});
Then('the number of exams should match the one on the Exams page for that year', async function () {
    // to do!!:!
    this.page.goto(SearchStudy);
    const info = this.page.locator('#exam_info');
    const text = await info.textContent();
    realValue = extractTotalFromText(text);
    expect(realValue).toBe(chartValue);
});


// TestID_87: User navigates to the Examens menu by clicking a chart bar
// TestID_88 :INCLUDE NEXT
When('the user clicks the sixth bar of the chart', async function () {
    const bar = this.page.locator("#statnbparuf rect").nth(5);
    await bar.click();
});
Then('the user should be redirected to the Examens search page', async function () {
    await this.page.waitForLoadState("domcontentloaded");
    await this.expect(this.page).toHaveURL(/SearchStudy\?month=&year=2025&uf=/);
});


// TestID_90: User opens the chart export menu
When('the user clicks the chart export button', async function () {
    const exportBtn = this.page.locator("#statnbparuf .highcharts-button > path");
    await exportBtn.click();
});
Then('the user should see {int} chart export options', async function (expectedCount) {
    const exportMenu = this.page.locator("div[style*='box-shadow'][style*='padding: 5px']");
    await this.expect(exportMenu).toBeVisible();

    await this.expect(menu).toBeVisible();
    const items = menu.locator("div");
    await this.expect(items).toBeGreaterThanOrEqual(expectedCount);
});
