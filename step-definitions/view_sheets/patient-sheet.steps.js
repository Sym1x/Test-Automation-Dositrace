const { Given, When, Then } = require('@cucumber/cucumber');

Given('the user is viewing a patient sheet page', async function () {
    await this.utils.redirectToDositrace(this.page);
    if(this.tags.includes('@adolescent')) {
        await this.page.goto('http://10.0.5.14:8080/DositraceV2-war/ViewPatient?id=111384');
    }
    else {
        await this.page.goto('http://10.0.5.14:8080/DositraceV2-war/ViewPatient?id=8706');
    }
});



// TestID_236: Patient header displays correctly
Then('the patient header contains the informations', async function (dataTable) {
    const expectedTexts = dataTable.raw().flat();
    console.log(expectedTexts);
    const wrap = this.page.locator('#wrap > .card > .row > .col-md-12').nth(1);
    console.log(await wrap.innerText());
    //await this.expect(wrap).toContainText(expectedTexts);
});


// TestID_237: Additional information for young patients 
Then('"Statut pédiatrique" is visible for patients under 18', async function () {
    await this.expect(this.page.locator('#wrap')).toContainText('Statut pédiatrique');
});