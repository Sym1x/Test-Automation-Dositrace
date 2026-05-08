const env = require('../environment/env-wrapper');
const { Form } = require('./elements/Form');

class DuplicateExams {
    constructor(page){
        this.page = page;

        //const wrapperPrincipal = await this.page.locator('.card-body > fieldset').nth(0);
        //const wrapperDuplicate = await this.page.locator('.card-body > fieldset').nth(1);

        this.formExamPrincipal = new Form(this.page.locator('.card-body > fieldset').nth(0));
        this.formExamDuplicate = new Form(this.page.locator('.card-body > fieldset').nth(1));
    }
    
    
    async navigateToPage() {
        await this.page.goto(env.baseURL + "ViewDuplicateManagementStudies", { waitUntil: 'load', timeout: 60000 });
    }

}

module.exports = { DuplicateExams }