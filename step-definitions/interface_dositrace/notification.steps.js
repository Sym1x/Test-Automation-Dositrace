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
When('the user clicks Date', async function () {
    await this.NotificationPage.calendar.click();
});

Then('a calendar is displayed', async function () {
    await this.expect(this.NotificationPage.calendar).toHaveClass(/active/);
});