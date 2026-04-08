const env = require('../environment/env-wrapper');

class NotificationPage {
    constructor(page){
        this.page = page;

        this.bell = this.page.locator('a.hasnotifications.dropdown-toggle');
        this.notifications_dropdown = this.page.locator('.dropdown-menu.notifications.arrow');
    }
    
    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "ViewNotifications", { waitUntil: 'load', timeout: 60000 });
    }

}

module.exports = { NotificationPage }