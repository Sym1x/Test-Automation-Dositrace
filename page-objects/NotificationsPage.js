const env = require('../environment/env-wrapper');

class NotificationsPage {
    constructor(page){
        this.page = page;
    }
    
    async navigateToPage() {
        await this.page.goto(env.baseURL + "ViewNotifications", { waitUntil: 'load', timeout: 60000 });
    }

}

module.exports = { NotificationsPage }