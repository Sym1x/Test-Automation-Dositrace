const env = require('../environment/env-wrapper');

class DashboardPage {
    constructor(page){
        this.page = page;
        //navigation purpose
        this.navZone = this.page.locator('#accordionSidebar');
        this.toggleNav = this.page.locator('#leftmenu-trigger');
        this.navItems = this.page.locator('.nav-item > .nav-link');
        this.helpButton = this.page.getByRole('banner').getByRole('link', { name: '?' });
        this.headerbarArrow = this.page.locator('#headerbardropdown');
        this.headerbar = this.page.locator('#headerbar');
        this.profileBar = this.page.locator('.dropdown-toggle.username');
        this.profileMenu = this.page.locator('.dropdown-menu.userinfo')

        //dashboard purpose
        this.blocks = this.page.locator('li[id^="el"]');
        this.addBlockBtn = this.page.locator('#btn-add');
    }
    
    async navigateToPage() {
        const link = this.page.getByRole('link', { name: 'Dositrace' });
        await this.page.goto(env.dositraceURL, { waitUntil: 'domcontentloaded', timeout: 60000 });
        if(await link.isVisible()){
            await link.click();
            await this.page.waitForLoadState('networkidle');
        }
        
    }

}

module.exports = { DashboardPage }