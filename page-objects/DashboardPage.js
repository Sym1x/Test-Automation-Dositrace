const env = require('../environment/env-wrapper');

class DashboardPage {
    constructor(page){
        this.page = page;
        //navigation purpose
        this.navZone = this.page.locator('#accordionSidebar');
        this.toggleNav_trigger = this.page.locator('#leftmenu-trigger');
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
        this.deleteBlockBtn = this.page.locator('#btn-delete');
        this.validateDeletionBtn = this.page.locator('#btn-confirmation');
        this.validateAddingBtn = this.page.locator('#btn-confirmation-add');
        this.savePositionBtn = this.page.locator('#btn-save');

    }
    
    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "Dashboard", { waitUntil: 'domcontentloaded', timeout: 60000 });
    }

    async addBlockByName(...blockNames) {
        await this.toggleNav();
        await this.addBlockBtn.click();
        const unaddedBlocks_count = await this.unaddedBlocks.count();
        if(unaddedBlocks_count === 0) return; // already added
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
        await this.validateAddingBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async deleteBlockByName(...blockNames) {
        await this.toggleNav();
        await this.deleteBlockBtn.click();
        const existingBlockNames = await this.getExistingBlockNames();
        if (!existingBlockNames) return; // nothing to delete

        for (let i = 0; i < existingBlockNames.length; i++) {
            const name = existingBlockNames[i];
            if (blockNames.includes(name)) {
                await this.blocks.nth(i).locator('.deleteCoord').click();
            }
        }
        await this.validateDeletionBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getExistingBlockNames() {
        await this.toggleNav();
        const blocks_count = await this.blocks.count();
        if (blocks_count === 0) {
            return null;
        }
        let block_names = [];
        for(let i = 0; i < blocks_count; i++) {
            const test = await this.blocks.nth(i).getAttribute('class');
            let block_name;
            if(i == 7) {
                block_name = await this.blocks.nth(i).locator('.highcharts-title tspan').textContent(); 
            }
            else {
                block_name = await this.blocks.nth(i).locator('span.dashbord-card-title').innerText(); //typo in html?
            }
            block_names.push(block_name.trim());
        }
        return block_names;
    }
    async getUnaddedBlockNames() {
        await this.toggleNav();
        await this.addBlockBtn.click();
        const unaddedBlock_names = await this.unaddedBlocks.locator('a').allInnerTexts();
        return unaddedBlock_names.length === 0 ? null : unaddedBlock_names.map(t => t.trim());
    }

    async dragBlock(existingBlock) {
        await this.toggleNav();
        await existingBlock.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(400, 0);
        await this.page.mouse.up();
    }

    async toggleNav() { //to hide/minimize the sidebar
        const isToggled = await this.navZone.getAttribute('class').then(classes => !/toggled/.test(classes));
        if (isToggled) {
            await this.toggleNav_trigger.click();
        }
    }
    

}

module.exports = { DashboardPage }