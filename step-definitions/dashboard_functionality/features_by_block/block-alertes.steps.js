const { When, Then } = require('@cucumber/cucumber');

// TestID_72: Alerts update when filtering by month
When('the user clicks on a button to change month', async function () {
    this.before = await this.block.innerText();
    await this.page.locator('#btnPreviousMonth').click();
});
Then('the alerts table should be updated correctly', async function () {

     await this.expect(this.block).not.toHaveText(this.before);
});


// TestID_73: Only last 5 alerts are displayed
Then('the alerts table should display at most 5 alerts', async function () {
    const rows = this.page.locator('#example tbody tr');
    const count = await rows.count();
    expect(count).toBeLessThanOrEqual(5);
});


// TestID_74: Each alert row matches table header structure
Then('each alert row should have the same number of columns as the table header', async function () {
    const headerCount = await this.page.locator('#example thead th').count();
    const rows = this.page.locator('#example tbody tr');
    const rowCount = await rows.count();
    for (let i = 0; i < rowCount; i++) {
        const cellCount = await row.nth(i).locator('td').count();
        expect(cellCount).toBe(headerCount);
    }
});


// TestID_75: Access alerts menu from dashboard alerts block
When('the user clicks on the alerts block', async function () {
    const alertsBlock = this.page.locator('#alert');
    await alertsBlock.click();
    await this.page.waitForLoadState("domcontentloaded");
});

Then('the user should be redirected to the Alerts menu', async function () {
    await this.expect(this.page).toHaveURL(/ViewAlerts/);
});


// TestID_77: Navigating between alert pages using arrows updates the table content
When('the user navigates to the next alerts page using the right arrow or left arrow', async function () {
    this.rows = this.page.locator('#example tbody tr');
    this.initialRows = await rows.allTextContents(); //save initial rows to compare later

    await this.page.locator('#example_next').click(); //navigate
    await this.page.waitForTimeout(1000);
});
Then('the alerts table content should change between pages', async function () {
    const currentRows = await this.rows.allTextContents();
    
    this.expect(currentRows).not.toEqual(this.initialRows);
});