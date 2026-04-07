const env = require('../environment/env-wrapper');

class DashboardPage {
    constructor(page){
        this.page = page;
        this.navZone = this.page.locator('#accordionSidebar');
        this.toggleNav = this.page.locator('#leftmenu-trigger');
        this.navItems = this.page.locator('.nav-item > .nav-link');
        this.helpButton = this.page.getByRole('banner').getByRole('link', { name: '?' });
        this.headerbarArrow = this.page.locator('#headerbardropdown');
        this.headerbar = this.page.locator('#headerbar');
    }
    
    async navigateToPage() {
        const link = this.page.getByRole('link', { name: 'Dositrace' });
        await this.page.goto(env.dositraceURL, { waitUntil: 'load', timeout: 60000 });
        if(await link.isVisible()){
            await link.click();
            await this.page.waitForLoadState('networkidle');
        }
        
    }

}

module.exports = { DashboardPage }