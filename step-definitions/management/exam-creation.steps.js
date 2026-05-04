const { Given, When, Then } = require('@cucumber/cucumber');

Given('the user is on the Exam Creation page', async function () {
    await this.utils.redirectToDositrace();
    await this.page.goto('http://10.0.5.14:8080/DositraceV2-war/CreateStudy');
});


