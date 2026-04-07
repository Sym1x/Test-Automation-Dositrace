const { Given, When, Then } = require('@cucumber/cucumber');
const { DashboardPage } = require("../../page-objects/DashboardPage");
const { expect } = require('@playwright/test');
//refactor
Given('the user is on Dositrace site :"/DositraceV2-war/"', async function () {
    await this.page.goto('/DositraceV2-war/');
});

// TestID_14 : Notifications dropdown
When('the user clicks the bell icon', async function () {
    await this.page.click('#bell-icon');
});

Then('a notifications dropdown is toggled', async function () {
    const dropdown = this.page.locator('#notifications-dropdown');
    await expect(dropdown).toBeVisible();
});

Then('it contains a link to mark all as read', async function () {
    await expect(this.page.locator('#notifications-dropdown >> text=Mark all as read|Tout marquer comme lu')).toBeVisible();
});

Then('it contains a link to see all notifications', async function () {
    await expect(this.page.locator('#notifications-dropdown >> text=See all notifications|Voir toutes les notifications')).toBeVisible();
});

// TestID_16 + TestID_17 : Accessing the notifications interface
When('the user clicks either link from the dropdown', async function () {
    await this.page.click('#notifications-dropdown >> text=See all|Voir toutes|Mark all as read|Tout marquer');
});

Then('the user is redirected to the notifications interface', async function () {
    await expect(this.page).toHaveURL(/.*notification|notifications.*/i);
});

Then('the user can filter notifications according to different criteria', async function () {
    const filterButtons = this.page.locator('#notification-filters >> button, select');
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(3, count); i++) {
        await filterButtons.nth(i).click();
        await this.page.waitForTimeout(300);
    }
});

// TestID_18 : Marking notifications as read
When('the user clicks mark all as read', async function () {
    await this.page.click('#mark-all-as-read');
});

Then('the user is shown the message "Vous avez 0 notification(s)"', async function () {
    await expect(this.page.locator('text=Vous avez 0 notification(s)')).toBeVisible();
});

// TestID_19 : Calendar access
When('the user clicks Date', async function () {
    await this.page.click('#date-picker');
});

Then('a calendar opens', async function () {
    const calendar = this.page.locator('#calendar-popup');
    await expect(calendar).toBeVisible();
});