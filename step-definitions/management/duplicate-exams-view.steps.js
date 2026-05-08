const { Given, When, Then } = require('@cucumber/cucumber');
const { DuplicateExams } = require('../../page-objects/DuplicateExams');

Given('the user is on the View Duplicate Exams page', async function () {
    await this.utils.redirectToDositrace();

    this.DuplicateExams = new DuplicateExams(this.page);
    await this.DuplicateExams.navigateToPage();
});

// TestID_232: Fill principal exam fields
Then('the user can fill the required principal exam fields', async function () {
    this.DuplicateExams.formExamPrincipal.fillField('Identifiant', '117');
    this.DuplicateExams.formExamPrincipal.fillField('Prénom', 'Eva');
    this.DuplicateExams.formExamPrincipal.fillField('Nom', 'Stratt');
});

// TestID_233: Displaying patients after submitting information
When('the user fills patient fields for Examen Principal', async function () {

});
When('the user clicks "Rechercher patient"', async function() {

});

Then(`a list of patients is displayed in accordance with the informations given`, () => {
 
});