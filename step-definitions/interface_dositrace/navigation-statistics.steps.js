const { Given, When, Then  } = require('@cucumber/cucumber');
const { StatisticsPage } = require("../../page-objects/StatisticsPage");

Given("the user is on the Statistics Portal", async function (){
    this.StatisticsPage = new StatisticsPage(this.page);
    await this.StatisticsPage.navigateToPortal();
});


// @TestID_580: Presence of different types of statistical charts
Then('{int} distinct charts are visible', async function (expectedCount, dataTable) {
    const expectedTitles = dataTable.raw().flat().map(t => t.trim());
    chart_cards_count = await this.StatisticsPage.chart_cards.count();
    await this.expect(chart_cards_count).toBe(expectedCount);
    
    actualTitles = [];
    for (let i = 0; i < chart_cards_count; i++) {
        const card = this.StatisticsPage.chart_cards.nth(i);
        const title = (await card.locator('.card-header').innerText()).trim();
        actualTitles.push(title);
        await this.expect(card.locator('.card-body .panel-image img')).toBeVisible();
    }
    await this.expect(actualTitles).toEqual(expectedTitles);
});


// @TestID_581: Charts are selectable
Then('the user can select any of the statistical charts', async function () {
    const chart_cards_count = await this.StatisticsPage.chart_cards.count();

    for (let i = 0; i < chart_cards_count; i++) {
        const card = this.StatisticsPage.chart_cards.nth(i);
        const clickableDiv = card.locator('div[onclick^="window.location = \'Chart"]');
        await this.expect(clickableDiv).toHaveCount(1);
        await this.expect(clickableDiv).toBeVisible();
    }
});

