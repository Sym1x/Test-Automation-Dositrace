const { When, Then  } = require('@cucumber/cucumber');

// TestID_72: Alerts update after selecting period filter
When('the user clicks on a period filter', async function () {
    await this.page.locator('#btnPreviousYear').click();
});
Then('the alerts table should be updated with the expected rows for that filter', async function () {
    const rowLocator = this.page.locator(
        '#example tbody tr:has-text("09/12/2025 00:00:00"):has-text("18800%"):has-text("Anonyme.")'
    );
    await expect(rowLocator).toBeVisible();
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
        const row = rows.nth(i);
        const cellCount = await row.locator('td').count();
        expect(cellCount).toBe(headerCount);
    }
});


// TestID_75: Access alerts menu from dashboard alerts block
When('the user clicks on the alerts block', async function () {
    const alertsBlock = this.page.locator('#alert');
    await alertsBlock.click();
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