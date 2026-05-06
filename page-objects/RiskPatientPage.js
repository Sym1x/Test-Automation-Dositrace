const env = require('../environment/env-wrapper');

class RiskPatientPage {
    constructor(page){
        this.page = page;
    }
    
    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "RiskPatient", { waitUntil: 'load', timeout: 60000 });
    }

}

module.exports = { RiskPatientPage }