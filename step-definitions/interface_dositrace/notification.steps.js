const { Given, When, Then } = require('@cucumber/cucumber');
const { NotificationPage } = require("../../page-objects/NotificationPage");

Given('the user is on the Notification page', async function() {
    await this.utils.redirectToDositrace(this.page);
    this.NotificationPage = new NotificationPage(this.page);
    await this.NotificationPage.navigateToPage();
})


// TestID_14 : Notifications dropdown
When('the user clicks the bell icon', async function () {
    try {
        await this.NotificationPage.bell.click();
    } catch (e) {
        throw new Error('Bell click failed');
    }
});

Then('a notifications dropdown is toggled', async function () {
    this.notifications_dropdown = this.NotificationPage.notifications_dropdown;
    await this.expect(this.notifications_dropdown).toHaveClass(/show/);
});

Then('it contains a link to mark all as read', async function () {
    const mark_read = this.notifications_dropdown.locator('span.header-notification a');
    try {
        await this.expect(mark_read).toBeVisible();
    } catch (e) {
        throw new Error('Link ' + (await mark_read.innerText()) + 'is not visible');
    }
});

Then('it contains a link to see all notifications', async function () {
    const see_notifs = this.notifications_dropdown.locator('a.dd-viewall');
    try {
        await this.expect(see_notifs).toBeVisible();
    } catch (e) {
        throw new Error('Link '+ (await see_notifs.innerText()) + ' is not visible');
    }
});


// TestID_16: Filtering notifications
When('the user clicks either link from the dropdown', async function () {
    await this.NotificationPage.bell.click();
    await this.NotificationPage.notifications_dropdown.locator('span.header-notification a').click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.NotificationPage.bell.click();
    await this.NotificationPage.notifications_dropdown.locator('a.dd-viewall').click();
});

Then('the user can filter notifications on the notifications interface according to different criteria', async function (expectedCriteria) {
    const expected = expectedCriteria.raw().flat();

    const criteria = await this.NotificationPage.filtering_form.getLabels();
    const missing = expected.filter(item =>
        !criteria.includes(item)
    );
    if(missing.length)
        throw new Error('These criteria are missing from the notifications filter: ' + missing);
});

// TestID_17: Accessing the notifications interface
When('the user clicks link to see all notifications from the dropdown', async function () {
    await this.NotificationPage.bell.click();
    await this.NotificationPage.notifications_dropdown.locator('a.dd-viewall').click();
});
Then('the user is redirected to the notifications interface', async function() {
    await this.expect(this.page).toHaveURL(/.*ViewNotifications.*/i);
});


// TestID_18 : Marking notifications as read
When('the user clicks mark all as read', async function () {
    await this.NotificationPage.bell.click();
    await this.NotificationPage.notifications_dropdown.locator('span.header-notification a').click();
    await this.page.waitForLoadState('domcontentloaded');
});

Then('the user is shown the message {string}', async function (expectedText) {
    const notification_message = await this.NotificationPage.getNotificationHeaderMessage();
    await this.expect(notification_message).toHaveText(expectedText);
});

// TestID_19 : Calendar access
When('the user clicks Date field in notifications filtering', async function () {
    await this.NotificationPage.calendar.click();
});

Then('a calendar is displayed graphically', async function () {
    await this.expect(this.NotificationPage.calendarDays).toBeVisible();
});


// Test_20 : Viewing options after clicking filters
Then('the fields vus, type, afficher ... éléments for notifications filtering display options when clicked', async function () {
    const options_vus = await this.NotificationPage.filtering_form.getOptions('???viewnotifications.nonvus???');
    if(!options_vus.length)
        throw new Error("Vus field listed no options when clicked");
    const options_type = await this.NotificationPage.filtering_form.getOptions('Type');
    if(!options_type.length)
        throw new Error("Type field listed no options when clicked");
    const options_table_length = await this.NotificationPage.data_table.dataTable_length.allInnerTexts();
    if(!options_table_length.length)
        throw new Error("Afficher ... éléments field listed no options when clicked");
});

// TestID_21: Global search in notifications list
Then('the user can input key words to refine the results in notifications list', async function () {
    await this.NotificationPage.data_table.searchGlobally('Test keyword');
});


// TestID_22: Filrer button functions correctly
When('the user chooses filtering criteria for notifications filtering and clicks Filtrer', async function() {
    const example_criteria = { 'Type' : 'Tous', 'Date' : '01/01/2026 - 06/09/2026' };
    await this.NotificationPage.filtering_form.fillForm(example_criteria);
    await this.NotificationPage.filtering_form.submitButton.click();
});
Then('the notifications list is updated in accordance with the criteria chosen', async function () {
    if((await this.NotificationPage.data_table.getNumberOfRows()) === 0)
        throw new Error('Not enough testing data (Notifications table yielded no results for the criteria tested)');

    const notification_row1 = (await this.NotificationPage.getRowTexts())[0];
    const expectedValues = [ example_criteria['Type'], example_criteria['Date'] ];
    for (const expected of expectedValues) {
        if (!notification_row1.some(cell => cell.includes(expected))) {
            throw new Error(`Result notification is missing expected criterion: "${expected}"`);
        }
    }
});


// TestID_24: Navigating pages in displayed list of notifications
Then('the user can navigate notifications by clicking table navigation arrows', async function () {
    await this.NotificationPage.data_table.goToNextPage();
    await this.NotificationPage.data_table.goToPreviousPage();
    await this.NotificationPage.data_table.goToLastPage();
    await this.NotificationPage.data_table.goToFirstPage();
});
Then('the user can navigate notifications by entering a page number', async function () {
    await this.NotificationPage.data_table.inputPaginationNumber(2);
});



// TestID_25: Sorting by column in notifications list
Then('the user can sort the notifications list by clicking any of the following column headers', async function (concernedColumns) {
    const sortable_columns = concernedColumns.raw().flat();

    for (const columnName of sortable_columns) {
        await this.NotificationPage.data_table.clickColumnToSort(columnName);
    }
});