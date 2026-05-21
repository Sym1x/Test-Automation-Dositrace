const env = require('../environment/env-wrapper');
const { Form } = require('./elements/Form');

const { DataTable } = require('./elements/DataTable');

class DashboardPage {
    constructor(page){
        this.page = page;

        this.blocks = this.page.locator('li[id^="el"]:not([style*="opacity"])');
        this.unaddedBlocks = this.page.locator('li[id^="linkel"]:visible'); // works only after addBlockBtn is clicked
        this.addBlockBtn = this.page.locator('#btn-add'); // lists names of blocks that can be added
        this.deleteBlockBtn = this.page.locator('#btn-delete');
        this.validateDeletionBtn = this.page.locator('#btn-confirmation');
        this.validateAddingBtn = this.page.locator('#btn-confirmation-add');
        this.savePositionBtn = this.page.locator('#btn-save');

        this.filterForm = new Form(this.page.locator('.btn-group.col-sm-12').first());

        this.data_table_obj = new DataTable(this.page.locator('.dataTables_wrapper')); // needed in particular block tests

    }
    
    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "Dashboard", { waitUntil: 'domcontentloaded', timeout: 60000 });
    }

    async getBlockName(block_locator) {
        const block_id = await block_locator.getAttribute('id');
        let block_name;
        if(block_id == 'el8') {
            block_name = await block_locator.locator('.highcharts-title > tspan').textContent(); 
        }
        else {
            block_name = await block_locator.locator('.dashbord-card-title').innerText(); //typo in html?
        }

        return block_name.trim();
    };

    async addBlockByName(...blockNames) {
        await this.addBlockBtn.click();
        await this.unaddedBlocks.first().waitFor({ state: 'visible' });

        const unaddedBlocks_count = await this.unaddedBlocks.count();
        if(unaddedBlocks_count === 0 || blockNames.length === 0) return;
        let step = 0
        for(let i = 0; i < unaddedBlocks_count; i++) {
            const unadded_block = this.unaddedBlocks.nth(step);

            const unadded_block_name = await unadded_block.innerText();
            if (blockNames.includes(unadded_block_name.trim())) {
                await unadded_block.click();
                await this.addBlockBtn.click();
            }
            else step++;
        }

        await this.validateAddingBtn.click();
        await this.page.waitForLoadState('load');
    }

    async deleteBlockByName(...blockNames) {
        await this.deleteBlockBtn.click();
        const existingBlocks_count = await this.blocks.count();
        if (existingBlocks_count == 0 || blockNames.length === 0) return; // nothing to delete
        let step = 0;
        for (let i = 0; i < existingBlocks_count; i++) {
            const block = this.blocks.nth(step);

            const block_name = await this.getBlockName(block);
            if(blockNames.includes(block_name)) {
                await block.click();
            }
            else step++;
        }
    
        await this.validateDeletionBtn.click();
    }

    async getExistingBlockNames() {
        const blocks_count = await this.blocks.count();
        if (blocks_count === 0) {
            return null;
        }
        let block_names = [];
        for(let i = 0; i < blocks_count; i++) {
            const block_name = await this.getBlockName(this.blocks.nth(i));
            block_names.push(block_name.trim());
        }
        return block_names;
    }

    async getUnaddedBlockNames() {
        await this.addBlockBtn.click();
        await this.unaddedBlocks.first().waitFor({ state: 'visible' });
        
        const unaddedBlock_names = await this.unaddedBlocks.locator('a').allInnerTexts();
        return unaddedBlock_names.length === 0 ? [] : unaddedBlock_names.map(t => t.trim());
    }

    async resetDashboard () {
        const blocks_count = await this.blocks.count();
        if(blocks_count > 0) {
            await this.deleteBlockBtn.click();
            for (let i = 0; i < blocks_count; i++) {
                await this.blocks.first().click();
            }
            await this.validateDeletionBtn.click();
            await this.page.waitForLoadState('load');
        }
        
    }

    async refillDashboard () {
        const unaddedBlock_names = await this.getUnaddedBlockNames();
        await this.addBlockByName(...unaddedBlock_names);
    }


    async dragBlock(existingBlock) {
        await existingBlock.hover({ position: { x: 0, y: 0 } });
        await this.page.mouse.down();
        await this.page.mouse.move(700, 0);
        await this.page.mouse.up();
    }

    async resizeBlock(existingBlock) {
        const resize_arrow = existingBlock.locator('.gs-resize-handle');
        const box = await resize_arrow.boundingBox();

        await this.page.mouse.move(box.x, box.y);
        await this.page.mouse.down();

        await this.page.mouse.move(box.x + 350, box.y + 250);
        await this.page.mouse.up();
    }
}

module.exports = { DashboardPage }