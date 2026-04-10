const { Then } = require('@cucumber/cucumber');


// TestID_83: Functional Documents block
Then('the Documents block should contain both user guides', async function () {
    const dositraceDoc = this.page.locator('#documentationDositrace');
    const coreDoc = this.page.locator('#documentationCore');

    await this.expect(dositraceDoc).toBeVisible();
    await this.expect(coreDoc).toBeVisible();
});