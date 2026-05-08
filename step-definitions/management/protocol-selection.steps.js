const { Given, When, Then } = require('@cucumber/cucumber');
const { ProtocolSelectionFavoringPage } = require('../../page-objects/ProtocolSelectionFavoringPage');

Given('the user is on the protocol selection and favoring page', async function () {
    await this.utils.redirectToDositrace(); // to access Dositrace

    this.ProtocolSelectionFavoringPage = new ProtocolSelectionFavoringPage(this.page);
    await this.ProtocolSelectionFavoringPage.navigateToPage();
});

When('the user selects Modalité and Equipement criteria and clicks Filtrer', async function () {
        const criteria = {'Modalité': 'Ostéodensitométrie', 'Equipement': 'OSTEO'};
        await this.ProtocolSelectionFavoringPage.Form.fillForm(criteria);
        await this.ProtocolSelectionFavoringPage.Form.filterBtn.click();
});
Then('the list of protocols is updated in accordance with the criteria chosen', async function () {
        const rows = await this.ProtocolSelectionFavoringPage.DataTable.getRowTexts();
        const firstRow = rows[0];
        const expectedResult = ['Ostéodensitométrie', 'OSTEO'];

        await this.expect(firstRow.slice(1, 3)).toEqual(expectedResult);
});

