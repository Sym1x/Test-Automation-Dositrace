const env = require('../environment/env-wrapper');
const { DataTable } = require('./elements/DataTable');
const { Form } = require('./elements/Form');

class ExamSearchPage {
    constructor(page){
        this.page = page;
        this.data_table = new DataTable(this.page.locator('#exam_wrapper'));

        this.dateRangeInput = this.page.locator('#daterangepicker1');
        this.calendarDays = this.page.locator('.flatpickr-calendar.open .dayContainer');

        this.filterBtn = this.page.getByRole('button', { name: 'Filtrer' }).first();
        this.reinitializeBtn = this.page.getByRole('button', { name: 'Réinitialiser' }).first();

        this.addFiltersBtn = this.page.getByText('Ajouter des filtres');
        this.filtering_form = new Form(this.page.locator('#page-rightbar'));
        this.heure_handle_left = this.page.locator('#slider .ui-slider-handle').nth(0);
        this.heure_handle_right = this.page.locator('#slider .ui-slider-handle').nth(1);
        this.closeFiltersBtn = this.page.locator('#rightbar-overlay');

        this.visualizeExamBtn = this.page.getByText('Visualisation Examen');
        this.visualizePatientBtn = this.page.getByText('Visualisation Patient');
    }
    
    async dragHeureHandles() {
        await this.page.waitForTimeout(1500);
        // LEFT handle → move right
        const leftBox = await this.heure_handle_left.boundingBox();
        await this.page.mouse.move(leftBox.x + leftBox.width / 2, leftBox.y + leftBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(leftBox.x + leftBox.width / 2 + 5, leftBox.y + leftBox.height / 2);
        await this.page.mouse.up();

        // RIGHT handle → move left
        const rightBox = await this.heure_handle_right.boundingBox();
        await this.page.mouse.move(rightBox.x + rightBox.width / 2, rightBox.y + rightBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(rightBox.x + rightBox.width / 2 - 20, rightBox.y + rightBox.height / 2);
        await this.page.mouse.up();
    }

    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "SearchStudy", { waitUntil: 'load', timeout: 60000 });
    }


}

module.exports = { ExamSearchPage }