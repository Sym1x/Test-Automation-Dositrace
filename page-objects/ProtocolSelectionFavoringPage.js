const env = require('../environment/env-wrapper');
const { Form } = require('./elements/Form');
const { DataTable } = require('./elements/DataTable');

class ProtocolSelectionFavoringPage {
    constructor(page){
        this.page = page;
        this.Form = new Form(this.page.locator('.form-group.row').first());
        this.DataTable = new DataTable(this.page.locator('.dataTables_wrapper').first());
    }
    
    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "ChooseFavorite", { waitUntil: 'load', timeout: 60000 });
    }

}

module.exports = { ProtocolSelectionFavoringPage }
