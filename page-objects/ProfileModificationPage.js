const env = require('../environment/env-wrapper');

class ProfileModificationPage {
    constructor(page){
        this.page = page;
    }
    
    async navigateToPage() {
        await this.page.goto(env.baseURL + "ModifyCurrentUser", { waitUntil: 'load', timeout: 60000 });
    }

}

module.exports = { ProfileModificationPage }