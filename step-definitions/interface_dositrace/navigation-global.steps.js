const { Given, When, Then  } = require('@cucumber/cucumber');
const { DashboardPage } = require("../../page-objects/DashboardPage");

Given("the user is on Dositrace site", async function (){
    await this.utils.redirectToDositrace();
    this.DashboardPage = new DashboardPage(this.page);
});


// TestID_9: Navigation panel untoggled view
Then('{int} elements for navigation are visible', async function (expectedCount) {
    const navItems_count = await this.DashboardPage.navItems.count();
    await this.expect.soft(navItems_count).toBeGreaterThanOrEqual(expectedCount);
});

Then('the user can navigate through them', async function () {
    const navItems = this.DashboardPage.navItems;
    const navItems_count = await navItems.count();
    for (let i = 0; i < navItems_count; i++) {
        await navItems.nth(i).click();
        await this.page.waitForLoadState('networkidle');
    }
});


// TestID_10: Navigation panel toggled view
When('the user clicks toggle button', async function () {
    await this.DashboardPage.toggleNav_trigger.click(); // toggled
});

Then('the navigation panel switches between toggled and untoggled view', async function () {
    await this.expect(this.DashboardPage.navZone).toHaveClass(/toggled/);
    
    await this.DashboardPage.toggleNav_trigger.click(); // untoggled
    await this.expect(this.DashboardPage.navZone).not.toHaveClass(/toggled/);
});


// TestID_11: Accessing Dositrace dashboard
When('the user clicks DOSITRACE', async function () {
    await this.page.getByRole('link', { name: 'DOSITRACE', exact: true }).click();
});

Then('the user accesses the Dashboard', async function () {
    await this.expect(this.page).toHaveURL(/.*Dositrace.*Dashboard.*/);
});


// TestID_12: Accessing user manual
When('the user clicks ?', async function () {
    await this.DashboardPage.helpButton.click();
});

Then('the user accesses Dositrace\'s User Manual', async function () {
    await this.expect(this.page).toHaveURL(/.*Dositrace.*UserManualDositrace|manual|user-guide|documentation.*/);
});

Then('the manual contains {int} cards', async function (expectedCount) {
    this.manual_cards = this.page.locator('div .col-lg-4 > .card');
    this.manual_cards_count = await this.manual_cards.count();
    await this.expect.soft(this.manual_cards_count).toBe(expectedCount);
});

Then('each manual card takes to a page successfully', async function () {
    const manual_URL = await this.page.url();

    for (let i = 0; i < this.manual_cards_count; i++) {
        const firstLink = this.manual_cards.nth(i).locator('.card-body a').first();

        await this.expect(firstLink).toBeVisible({ timeout: 10000 });

        await Promise.all([
            this.page.waitForLoadState('networkidle'),
            firstLink.click(),
        ]);

        await this.expect(this.page).not.toHaveURL(manual_URL);

        await this.page.goBack();
        await this.page.waitForLoadState('networkidle');
    }
})


// TestID_13: Domain header bar visibility
When('the user clicks the downwards arrow', async function () {
    await this.DashboardPage.headerbarArrow.click();
});

Then('a header bar for navigating between domains is toggled', async function () {
    await this.expect(this.DashboardPage.headerbar).toBeVisible();
});

Then('it contains "SSO-Dositrace-Configuration Center"', async function () {
    await this.expect(this.page.getByRole('link', { name: 'Configuration Center' })).toBeVisible();
});


// TestID_15: User info dropdown visibility
When('the user clicks on their name or icon', async function () {
    await this.DashboardPage.profileBar.click();
});

Then('a user info menu is toggled', async function () {
    await this.expect(this.DashboardPage.profileMenu).toBeVisible();
});

Then('it contains a link to profile', async function () {
    await this.expect(this.page.locator('ul.dropdown-menu.userinfo.arrow.show > li.username > a')).toBeVisible();
});

Then('it contains a link to disconnect', async function () {
    await this.expect(this.page.locator('#userlinks')).toBeVisible();
});


// TestID_38: BIOMEDIQA redirection
When('the user clicks the BIOMEDIQA logo', async function () {
    await this.DashboardPage.biomediqa_logo.click();
});

Then('the site BIOMEDIQA is opened in a new tab', async function () {
    const newPage = await this.page.context().waitForEvent('page');
    await this.expect(newPage).toHaveURL(/biomediqa/i);
});