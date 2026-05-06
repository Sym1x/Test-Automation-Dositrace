const env = require('../environment/env-wrapper');

class AlertsPage {
    constructor(page){
        this.page = page;
        this.addFiltersBtn = this.page.getByText('Ajouter des filtres');
        this.closeFilters = this.page.locator('#closeButton');

    }
    
    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "ViewAlerts", { waitUntil: 'load', timeout: 60000 });
    }

}

module.exports = { AlertsPage }