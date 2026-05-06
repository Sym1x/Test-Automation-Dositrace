const env = require('../environment/env-wrapper');

class ExamSearchPage {
    constructor(page){
        this.page = page;

        this.dateRangeInput = this.page.locator('#daterangepicker1');
        this.calendarDays = this.page.locator('.flatpickr-calendar.rangeMode .dayContainer');

        this.filterBtn = this.page.getByRole('button', { name: 'Filtrer' }).first();
        this.reinitializeBtn = this.page.getByRole('button', { name: 'Réinitialiser' }).first();

        this.addFiltersBtn = this.page.getByText('Ajouter des filtres');
        /*
        this.closeFilters = this.page.locator('#closeButton');
        this.timeSlider = this.page.locator('#filter_4');
        this.UF_filter = this.page.locator('#filter_1');
        this.Modalite_filter = this.page.locator('#filter_6');
        this.Equipement_filter = this.page.locator('#filter_2');
        this.Protocole_filter = this.page.locator('#filter_9');
        this.Operateur_filter = this.page.locator('#filter_11');
        this.NumExamen_filter = this.page.locator('#filter_5');
        this.Alertes_filter = this.page.locator('#filter_10');
        this.PatientID_filter = this.page.locator('#filter_8');
        this.DateNaissance_filter = this.page.locator('#filter_12');
        this.Etat_filter = this.page.locator('#filter_13');
        this.Patient_a_risque_filter = this.page.locator('#filter_23');
        this.Alertes_traitees_filter = this.page.locator('#filter_24'); */

    }
    


    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "SearchStudy", { waitUntil: 'load', timeout: 60000 });
    }


}

module.exports = { ExamSearchPage }