const env = require('../environment/env-wrapper');
const { Form } = require('./elements/Form');

class ExamCreationPage {
    constructor(page){
        this.page = page;
        this.exam_info_form = new Form(this.page.locator('#form-createstudy .card').nth(0));
        this.patient_info_form = new Form(this.page.locator('#form-createstudy .card').nth(1));
        this.validerBtn = this.page.locator('#btnvalider');

        this.addPatientBtn = this.page.getByRole('link', { name: 'Nouveau patient' });
        this.add_patient_form = new Form(this.page.locator('#form-new-patient')); //used in AddTestDummies.js
    }
    
    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "CreateStudy", { waitUntil: 'load', timeout: 60000 });
        await this.page.locator('#leftmenu-trigger').click();
        await this.page.locator('#leftmenu-trigger').click();
    }
    
}

module.exports = { ExamCreationPage }