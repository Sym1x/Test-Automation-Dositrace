const { When, Then  } = require('@cucumber/cucumber');

// TestID_78: NRD/NRI protocol block displays top 6 most frequent protocols
Then('the NRD/NRI local block should display NRD data for the 6 most frequent protocols of the selected month', async function () {
    const block = this.page.locator('#protprinc');
    const emptyState = block.locator('.nostudy');

    const isEmpty = await emptyState.isVisible().catch(() => false);
    if (isEmpty) {
        this.expect(await emptyState.textContent()).toContain('Aucun examen ce mois-ci');
        return;
    }

    const protocols = block.locator('.protocol, .nrd-row, div');
    const count = await protocols.count();
    this.expect(count).toBeLessThanOrEqual(6);
});


// TestID_79: Clicking a protocol redirects to filtered exams list
When('I click on a protocol inside the NRD/NRI local block', async function () {
    buttonToChangePeriod = this.page.locator('#btnPreviousYear'); //to a period that has protocols saved
    await buttonToChangePeriod.click();

    const firstProtocol = this.page.locator('#protprinc table tr td a').first();
    await firstProtocol.click();
});
Then('the user should be redirected to the Examens page', async function () {
    await this.page.waitForLoadState('networkidle');
    const url = this.page.url();
    expect(url).toContain('SearchStudy');
});