const { Given, When, Then } = require('@cucumber/cucumber');
const { ExamCreationPage } = require('../../page-objects/ExamCreationPage');

// Background
Given('the user is on the Exam Creation page', async function () {
    await this.utils.redirectToDositrace(this.page);

    this.ExamCreationPage = new ExamCreationPage(this.page);
    await this.ExamCreationPage.navigateToPage();
});

Then('the user is testing his stuff', async function () {
    await this.ExamCreationPage.exam_info_form.fillForm({'Modalité': 'Scanner', 'Équipement': 'SOMATOM Definition AS', 'Protocoles DOSITRACE': 'Sinus', 'Date': '16/05/2026', 'Heure': '06:09', "Numéro d'examen": '16/05/2026', 'Médecin réalisateur': 'VERGARA Alex', 'Remarques': 'Dummy exam for testing'});
    await this.ExamCreationPage.patient_info_form.fillForm({'Patient': 'Dummy FemaleMinor', 'Poids (kg)': '80', 'Taille (cm)': '179'});
    await this.page.waitForTimeout(5000);
    await this.ExamCreationPage.validerBtn.click();
    await this.page.waitForTimeout(25000);
});




// TestID_294
When('the user clicks the "Modalité" field', async function () {

});

Then('the user can choose one of many listed Modalités', async function () {
});

// TestID_295
When('the user clicks the "Equipement" field', async function () {
});

Then('the user can choose one of many listed Equipements', async function () {
});

// TestID_296
When('the user clicks the "Protocoles DOSITRACE" field', async function () {
});

Then('the user can choose one of many listed Protocoles', async function () {
});

// TestID_297
When('the user clicks the "Date" field', async function () {
});

Then('the user can manually enter an exam creation date', async function () {
});

Then('a calendar is displayed allowing the user to choose an exam creation date graphically', async function () {
});

// TestID_298
When('the user clicks the "Heure" field', async function () {
});

Then('an input bar allowing to choose Exam Creation time becomes visibile', async function () {
});