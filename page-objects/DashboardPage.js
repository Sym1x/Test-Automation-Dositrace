const env = require('../environment/env-wrapper');

class DashboardPage {
    constructor(page){
        this.page = page;
        //navigation purpose
        this.navZone = this.page.locator('#accordionSidebar');
        this.toggleNav = this.page.locator('#leftmenu-trigger');
        this.navItems = this.page.locator('.nav-item > .nav-link');
        this.biomediqa_logo = this.page.locator('.sidebar-brand');
        this.helpButton = this.page.getByRole('banner').getByRole('link', { name: '?' });
        this.headerbarArrow = this.page.locator('#headerbardropdown');
        this.headerbar = this.page.locator('#headerbar');
        this.profileBar = this.page.locator('.dropdown-toggle.username');
        this.profileMenu = this.page.locator('.dropdown-menu.userinfo');

        //dashboard purpose
        this.blocks = this.page.locator('li[id^="el"]');
        this.unaddedBlocks = this.page.locator('li[id^="linkel"]'); // works only after addBlockBtn is clicked
        this.addBlockBtn = this.page.locator('#btn-add'); // lists names of blocks that can be added
        this.deleteBlockBton = this.page.locator('#btn-delete');

    }
    
    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "Dashboard", { waitUntil: 'domcontentloaded', timeout: 60000 });
    }

    async addBlockByName(...blockNames) {
        await this.addBlockBtn.click();
        const unaddedBlocks_count = await this.unaddedBlocks.count();
        for(const blockName of blockNames) {
            for(let i = 0; i < unaddedBlocks_count; i++) {
                const unaddedBlock = this.unaddedBlocks.nth(i).locator('a');
                const unaddedBlock_name = await unaddedBlock.innerText();
                if (unaddedBlock_name.trim() == blockName) {
                    await unaddedBlock.click();
                    break;
                }
            }
        }
    }

    async deleteBlockByName(...blockNames) {
        await this.deleteBlockBtn.click();
        const blocks_count = await this.blocks.count();
        for(let i = 0; i < blocks_count; i++) {
            for(const blockName of blockNames) {
                const existingBlock = this.blocks.nth(i);
                const existingBlock_name = existingBlock.innerText();
                if(existingBlock_name.trim() == blockName) {
                    await this.blocks.locator('.deleteCoord').click();
                }
            }
        }
    }

    async dragBlock() {
        // todo
    }

}

module.exports = { DashboardPage }