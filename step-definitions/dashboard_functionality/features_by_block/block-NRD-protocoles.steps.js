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
When('the user clicks on a protocol inside the NRD/NRI local block', async function () {
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


// @TestID_80: Le nombre d’examens affichés après redirection correspond à la valeur NRD du tableau de bord
When('the user reads the exam count for the first protocol in the NRD block and clicks that protocol', async function () {
    const examCell = this.page.locator('#protprinc table tr').first().locator('td').nth(1);
    const text = await examCell.textContent();
    this.expectedExamCount = 0;
    this.expectedExamCount = parseInt(text);

    const link = this.page.locator('#protprinc table tr').first().locator('td a');
    await link.click();
    await this.page.waitForLoadState('networkidle');
});

Then('the user should see exactly that number of exams in the resulting page', async function () {

    const info = await this.page.locator('#exam_info').textContent();
    // info = "Affichage de l'élément 1 à 10 sur 213 élément(s)"
    // Extract number after "sur "
    const match = info.match(/sur\s+(\d+)\s+élément/);

    if (!match) {
        throw new Error("Could not extract exam count from: " + info);
    }

    const actualCount = parseInt(match[1]);
    expect(actualCount).toBe(expectedExamCount);
});