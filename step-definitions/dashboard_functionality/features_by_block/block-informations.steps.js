const { Then } = require('@cucumber/cucumber');


// TestID_82: Functional Informations block
Then('the Informations block should be functional', async function () {
    const infoBlock = this.page.locator('#info');

    // Condition 1
    await this.expect(infoBlock).toContainText('DOSITRACE a accès à Internet.');

    // Condition 2
    const updateLinks = infoBlock.locator('a');
    const linkCount = await updateLinks.count();
    if (linkCount > 0) {
        for (let i = 0; i < linkCount; i++) {
            const linkText = await updateLinks.nth(i).textContent();
            this.expect(/mise à jour|seuil|version/i.test(linkText)).toBeTruthy();
        }
    }
});