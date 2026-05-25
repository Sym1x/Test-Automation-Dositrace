const env = require('../environment/env-wrapper');
const { DataTable } = require('./elements/DataTable');
const { Form } = require('./elements/Form');

class NotificationPage {
    constructor(page){
        this.page = page;

        this.bell = this.page.locator('a.hasnotifications.dropdown-toggle');
        this.notifications_dropdown = this.page.locator('.dropdown-menu.notifications.arrow');
        this.filtering_form = new Form(this.page.locator('div.form-group.row.col-md-12'));
        this.data_table = new DataTable(this.page.locator('#tablenotification_wrapper'));
        this.calendar = this.page.locator('#daterangepicker1');
        this.calendarDays = this.page.locator('.flatpickr-calendar .dayContainer');
    }
    
    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "ViewNotifications", { waitUntil: 'load', timeout: 60000 });
    }

    async getNotificationHeaderMessage() {
        await this.bell.click();
        return this.notifications_dropdown.locator('span.header-notification span').nth(0);
    }
}

module.exports = { NotificationPage }