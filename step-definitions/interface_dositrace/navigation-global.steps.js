const { Given, When, Then  } = require('@cucumber/cucumber');
const { Navbar } = require("../../page-objects/elements/Navbar");

Given("the user is on Dositrace site", async function (){
    await this.utils.redirectToDositrace(this.page);
    this.Navbar = new Navbar(this.page);
});


// TestID_9: Navigation panel untoggled view
Then('{int} elements for navigation are visible', async function (expectedCount) {
    const navItems_count = await this.Navbar.navItems.count();
    if(expectedCount != navItems_count) {
        throw new Error(`Expected ${expectedCount} navigation items, found: ${navItems_count}`);
    }
});

Then('the user can navigate through them', async function () {
    const navItems_count = await this.Navbar.navItems.count();
    for (let i = 0; i < navItems_count; i++) {
        try {
            await navItems.nth(i).click();
            await this.page.waitForLoadState('load');
        } catch (err) {
            throw new Error(`Failed to click nav item #${i}:`, err);
        }
    }
});


// TestID_10: Navigation panel toggled view
When('the user clicks toggle button', async function () {
    try {
        await this.Navbar.toggleNav_trigger.click(); // toggled
    } catch (err) {
        throw new Error('Could not click toggle button to toggle the navigation panel into detailed view');
    }
});

Then('the navigation panel switches between toggled and untoggled view', async function () {
    await this.expect(this.Navbar.navZone).not.toHaveClass(/toggled/);
    
    await this.Navbar.toggleNav_trigger.click(); // untoggled
    
    await this.expect(this.Navbar.navZone).toHaveClass(/toggled/);
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
    try {
        await this.Navbar.helpButton.click();
    } catch(err) {
        throw new Error('Failed to click the ? help mark');
    }
    await this.page.waitForLoadState('load');
});

Then('the user accesses Dositrace\'s User Manual', async function () {
    try {
        await this.expect(this.page).toHaveURL(/.*Dositrace.*UserManualDositrace|manual|user-guide|documentation.*/);
    } catch(err) {
        throw new Error('Failed to access User Manual. Page landed on (after clicking ?): ' + this.page.url());
    }
});

Then('the manual contains {int} cards', async function (expectedCount) {
    const manual_cards = this.page.locator('div .col-lg-4 > .card');
    const manual_cards_count = await manual_cards.count();
    if(manual_cards_count != expectedCount)
        throw new Error(`Expected ${expectedCount} cards in the help manual, found: ${manual_cards_count}`);
});

Then('each manual card takes to a page successfully', async function () {
    const manual_URL = await this.page.url();

    for (let i = 0; i < this.manual_cards_count; i++) {
        const card_link = this.manual_cards.nth(i).locator('.card-body a').first();

        await this.expect(card_link).toBeVisible({ timeout: 10000 });

        card_link.click()
        this.page.waitForLoadState('load'),

        await this.expect(this.page).not.toHaveURL(manual_URL);

        await this.page.goBack();
        await this.page.waitForLoadState('load');
    }
})


// TestID_13: Domain header bar visibility
When('the user clicks the downwards arrow', async function () {
    await this.Navbar.headerbarArrow.click();
});

Then('a header bar for navigating between domains is toggled', async function () {
    await this.expect(this.Navbar.headerbar).toBeVisible();
});

Then('it contains "SSO-Dositrace-Configuration Center"', async function () {
    await this.expect(this.page.getByRole('link', { name: 'Configuration Center' })).toBeVisible();
});


// TestID_15: User info dropdown visibility
When('the user clicks on their name or icon', async function () {
    await this.Navbar.profileBar.click();
});

Then('a user info menu is toggled', async function () {
    await this.expect(this.Navbar.profileMenu).toBeVisible();
});

Then('it contains a link to profile', async function () {
    await this.expect(this.page.locator('ul.dropdown-menu.userinfo.arrow.show > li.username > a')).toBeVisible();
});

Then('it contains a link to disconnect', async function () {
    await this.expect(this.page.locator('#userlinks')).toBeVisible();
});


// TestID_38: BIOMEDIQA redirection
When('the user clicks the BIOMEDIQA logo', async function () {
    await this.Navbar.biomediqa_logo.click();
});

Then('the site BIOMEDIQA is opened in a new tab', async function () {
    const newPage = await this.page.context().waitForEvent('page');
    await this.expect(newPage).toHaveURL(/biomediqa/i);
});