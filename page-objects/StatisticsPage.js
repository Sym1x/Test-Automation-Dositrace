const env = require('../environment/env-wrapper');

class StatisticsPage {
    constructor(page){
        this.page = page;

        this.chart_cards = this.page.locator('.col-md-4');
    }
    
    async navigateToPortal() {
        await this.page.goto(env.dositraceURL + "ChartDashboard", { waitUntil: 'load', timeout: 60000 });
    }

    async navigateToMultiChart() {
        await this.page.goto(env.dositraceURL + "MultiChart", { waitUntil: 'domcontentloaded', timeout: 60000 });
    }
}

module.exports = { StatisticsPage }