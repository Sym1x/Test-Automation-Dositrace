const { Given, When, Then } = require('@cucumber/cucumber');
const { NotificationPage } = require("../../page-objects/NotificationPage");

Given('the user is on the Notification page', async function() {
    await this.redirectToDositrace();
    this.NotificationPage = new NotificationPage(this.page);
    await this.NotificationPage.navigateToPage();
})

// TestID_14 : Notifications dropdown
When('the user clicks the bell icon', async function () {
    await this.NotificationPage.bell.click();
});

Then('a notifications dropdown is toggled', async function () {
    this.notifications_dropdown = this.NotificationPage.notifications_dropdown;
    await this.expect(this.notifications_dropdown).toHaveClass(/show/);
});

Then('it contains a link to mark all as read', async function () {
    await this.expect(this.notifications_dropdown.locator('span.header-notification a')).toBeVisible();
});

Then('it contains a link to see all notifications', async function () {
    await this.expect(this.notifications_dropdown.locator('a.dd-viewall')).toBeVisible();
});

// TestID_16 + TestID_17 : Accessing the notifications interface
When('the user clicks either link from the dropdown', async function () {
    await this.NotificationPage.bell.click();
    await this.NotificationPage.notifications_dropdown.locator('span.header-notification a').click();
    await this.page.waitForLoadState('domcontentloaded')
    await this.NotificationPage.bell.click();
    await this.NotificationPage.notifications_dropdown.locator('a.dd-viewall').click();
});

Then('the user is redirected to the notifications interface', async function () {
    await this.expect(this.page).toHaveURL(/.*ViewNotifications.*/i);
});

// REVISIT
Then('the user can filter notifications according to different criteria', async function (dataTable) {
    const filtering_bar = this.NotificationPage.filter_div;
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
When('the user clicks Date', async function () {
    await this.NotificationPage.calendar.click();
});

Then('a calendar opens', async function () {
    await this.expect(this.NotificationPage.calendar).toHaveClass(/active/);
});