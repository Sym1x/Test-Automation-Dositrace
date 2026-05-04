class Navbar {
    constructor(page){
        this.page = page;

        this.navZone = this.page.locator('#accordionSidebar');
        this.toggleNav_trigger = this.page.locator('#leftmenu-trigger');
        this.navItems = this.page.locator('.nav-item > .nav-link');
        this.biomediqa_logo = this.page.locator('a.sidebar-brand');
        this.helpButton = this.page.getByRole('banner').getByRole('link', { name: '?' });
        this.headerbarArrow = this.page.locator('#headerbardropdown');
        this.headerbar = this.page.locator('#headerbar');
        this.profileBar = this.page.locator('.dropdown-toggle.username');
        this.profileMenu = this.page.locator('.dropdown-menu.userinfo');
    }

    async toggleNav() { //to hide/minimize the sidebar
        const isToggled = await this.navZone.getAttribute('class').then(classes => !/toggled/.test(classes));
        if (isToggled) {
            await this.toggleNav_trigger.click();
        }
    }
}

module.exports = { Navbar }