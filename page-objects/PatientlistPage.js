const env = require('../environment/env-wrapper');

class PatientlistPage {
    constructor(page){
        this.page = page;

        this.etatFilter = this.page.locator('#s2id_disabled');
        this.filterBtn = this.page.getByRole('button', { name: 'Filtrer' }).first();
        this.reinitializeBtn = this.page.getByRole('button', { name: 'Réinitialiser' }).first();

        this.addFiltersBtn = this.page.getByText('Ajouter des filtres');
        this.dateFilter = this.page.locator('.col-sm-8.filter').first();
        this.genderFilter = this.page.locator('#s2id_gender');
        this.filterBtn_filters = this.page.locator('#page-rightbar').getByRole('button', { name: 'Filtrer' });
        this.reinitializeBtn_filters = this.page.locator('#page-rightbar').getByRole('button', { name: 'Réinitialiser' });
        

        this.filterDropdown = this.page.locator('#select2-drop');
    }
    


    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "ListPatient", { waitUntil: 'load', timeout: 60000 });
        await this.page.waitForLoadState('load');
    }

}

module.exports = { PatientlistPage }