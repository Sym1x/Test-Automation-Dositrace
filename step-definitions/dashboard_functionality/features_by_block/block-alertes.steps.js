const { When, Then, Given } = require('@cucumber/cucumber');
const { DashboardPage } = require("../../../page-objects/DashboardPage");

// TestID_72: Alerts update when filtering by month
When('the user clicks on a button to change month', async function () {
    this.before = await this.block.innerText();
    await this.page.locator('#btnPreviousMonth').click();
    try {
        await this.expect(this.DashboardPage.data_table_obj.dataTable_pagination_inputs).toBeVisible( {timeout: 20000} );
    }
    catch(err) { throw new Error('Not enough alerts data (for Previous Month)'); }
});
Then('the alerts table should be updated correctly', async function () {
    try {
        this.after = await this.block.innerText();
        await this.expect(this.after).not.toBe(this.before);
    } catch(err) {
        throw new Error('Month filter did not work; the displayed alerts stayed the same');
    }
});


// TestID_73: Only last 5 alerts are displayed
Then('the alerts table should display at most 5 alerts', async function () {
    await this.page.locator('#btnPreviousYear').click();
    const alerts_table = this.DashboardPage.data_table_obj;
    try {
        await this.expect(alerts_table.dataTable_pagination_inputs).toBeVisible( {timeout: 20000} );
    }
    catch(err) { throw new Error('Not enough alerts data (for Previous Year)'); }

    const rowCount = await alerts_table.getNumberOfRows();
    try {
        this.expect(rowCount).toBeLessThanOrEqual(5);
    } catch(err) {
        throw new Error(`Number of alerts displayed: ${rowCount}`);
    }
});


// TestID_74: Each alert row matches table header structure
Then('each alert row should have the same number of columns as the table header', async function () {
    await this.page.locator('#btnPreviousYear').click();
    const alerts_table = this.DashboardPage.data_table_obj;
    try {
        await this.expect(alerts_table.dataTable_pagination_inputs).toBeVisible( {timeout: 20000} );
    }
    catch(err) { throw new Error('Not enough alerts data (for Previous Year)'); }

    const columnNames = await alerts_table.getColumnNames();
    const headerCount = columnNames.length;
    const rows = alerts_table.table_rows;
    const rowCount = await alerts_table.getNumberOfRows();

    for (let i = 0; i < rowCount; i++) {
        const cellCount = await rows.nth(i).locator('td').count();
        try {
            await this.expect(cellCount).toBe(headerCount);
        } catch(err) {
            throw new Error(`Number of columns mismatch for row ${i}; found ${cellCount} columns`);
        }
    }
});


// TestID_75: Access alerts menu from dashboard alerts block
When('the user clicks on the alerts block', async function () {
    await this.page.locator('#btnPreviousYear').click();
    const alerts_table = this.DashboardPage.data_table_obj;
    try {
        await this.expect(alerts_table.dataTable_pagination_inputs).toBeVisible( {timeout: 20000} );
    }
    catch(err) { throw new Error('Not enough alerts data (for Previous Year)'); }

    const clickableAlertsCell = await alerts_table.getCell("Date d'examen", 0);
    await clickableAlertsCell.click();
    await this.page.waitForLoadState("load");
});

Then('the user should be redirected to the Alerts menu', async function () {
    try {
        await this.expect(this.page).toHaveURL(/Alert/);
    } catch(err) {
        throw new Error(`Last URL: ${await this.page.url()}`);
    }
});


// TestID_77: Navigating between alert pages using arrows updates the table content
When('the user navigates to the next alerts page using the right arrow or left arrow', async function () {
    await this.page.locator('#btnPreviousYear').click();
    this.alerts_table = this.DashboardPage.data_table_obj;
    try {
        await this.expect(this.alerts_table.dataTable_pagination_inputs).toBeVisible( {timeout: 20000} );
    }
    catch(err) { throw new Error('Not enough alerts data (for Previous Year)'); }

    this.before = await this.alerts_table.getRowTexts(); //save initial rows to compare later

    await this.alerts_table.goToNextPage(); //navigate
});
Then('the alerts table content should change between pages', async function () {
    this.after = await this.alerts_table.getRowTexts();
    try {
        this.expect(this.after).not.toEqual(this.before);
    }
    catch(err) { throw new Error('Navigation was not successful; Alerts displayed did not change after clicking navigation arrow'); }
});