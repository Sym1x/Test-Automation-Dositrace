const env = require('../environment/env-wrapper');

class WorklistPage {
    constructor(page){
        this.page = page;

        this.dueTodayBtn = this.page.getByText('Examens du jour');
        this.dueThisWeekBtn = this.page.getByText('Examens à 7 jours');
        this.rechercherBtn = this.page.getByRole('button', { name: 'Rechercher' }).first()  
        
        this.addFiltersBtn = this.page.getByText('Ajouter des filtres');
        this.UF_filter = this.page.locator('#filter_1');
        this.Equipement_filter = this.page.locator('#filter_2');
        this.filterDropdown = this.page.locator('#select2-drop');
        this.rechercherBtn_filters = this.page.locator('#page-rightbar').getByRole('button', { name: 'Rechercher' });

        this.selectedEquipmentsContainer = this.page.locator('#s2id_equi');


    }
    


    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "Worklist", { waitUntil: 'load', timeout: 60000 });
    }

    async removeSelectedEquipments () {
        const anchors = await this.selectedEquipmentsContainer.locator('li.select2-search-choice > a').all();

        for (const a of anchors) {
            await a.click();
        }
    }

}

module.exports = { WorklistPage }