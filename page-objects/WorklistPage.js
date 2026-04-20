const env = require('../environment/env-wrapper');

class WorklistPage {
    constructor(page){
        this.page = page;
    }
    


    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "Worklist", { waitUntil: 'load', timeout: 60000 });
    }

}

module.exports = { WorklistPage }