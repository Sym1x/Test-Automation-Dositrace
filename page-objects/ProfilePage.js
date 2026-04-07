const env = require('../environment/env-wrapper');

class ProfilePage {
    constructor(page){
        this.page = page;
    }
    
    async navigateToPage() {
        await this.page.goto(env.baseURL + "ViewProfile", { waitUntil: 'load', timeout: 60000 });
    }

}

module.exports = { ProfilePage }