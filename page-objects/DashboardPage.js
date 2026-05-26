const env = require('../environment/env-wrapper');
const { Form } = require('./elements/Form');

const { DataTable } = require('./elements/DataTable');

class DashboardPage {
    constructor(page){
        this.page = page;

        this.blocks = this.page.locator('li[id^="el"]:not([style*="opacity"])');
        this.unaddedBlocks = this.page.locator('li[id^="linkel"]:visible');
        this.addBlockBtn = this.page.locator('#btn-add'); // "Ajouter" button
        this.deleteBlockBtn = this.page.locator('#btn-delete');
        this.validateDeletionBtn = this.page.locator('#btn-confirmation');
        this.validateAddingBtn = this.page.locator('#btn-confirmation-add');
        this.savePositionBtn = this.page.locator('#btn-save');

        this.filtering_form = new Form(this.page.locator('.btn-group.col-sm-12').first());

        this.data_table_obj = new DataTable(this.page.locator('.dataTables_wrapper')); // Worklist and Alertes blocks use a data table

    }
    
    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "Dashboard", { waitUntil: 'load', timeout: 60000 });
    }

    async getBlockName(block_locator) {
        const block_id = await block_locator.getAttribute('id');
        let block_name;
        try {
            if(block_id == 'el8') {
                block_name = await block_locator.locator('.highcharts-title > tspan').textContent(); 
            }
            else {
                block_name = await block_locator.locator('.dashbord-card-title').innerText(); //typo in html?
            }
        } catch(e) { throw new Error(`Element locator failed to find the title of this block: ${block_locator}. Refer to DashboardPage.getBlockName(). Trace: ${e}`) };
        return block_name.trim();
    };

    async addBlockByName(...blockNames) { // will not throw an error if a non existent block name is passed as argument, will simply not try to add it
        await this.toggleAddingBlocks();
        const unaddedBlocks_count = await this.unaddedBlocks.count();
        if(unaddedBlocks_count === 0 || blockNames.length === 0) return;

        let step = 0
        for(let i = 0; i < unaddedBlocks_count; i++) {
            await this.toggleAddingBlocks();
            const unadded_block = this.unaddedBlocks.nth(step);
            const unadded_block_name = await unadded_block.innerText();
            if (blockNames.includes(unadded_block_name.trim())) {
                await unadded_block.click();
                await this.addBlockBtn.click();
            }
            else step++;
        }
        if(await this.validateAddingBtn.isVisible())
            await this.validateAddingBtn.click();
        
        await this.untoggleAddingBlocks();
        await this.page.waitForLoadState('load');
    }

    async deleteBlockByName(...blockNames) {
        if(await this.deleteBlockBtn.isVisible()) {
            await this.deleteBlockBtn.click();
        }
    
        const existingBlocks_count = await this.blocks.count();
        if (existingBlocks_count == 0 || blockNames.length === 0) { await this.validateDeletionBtn.click(); return; } // nothing to delete
        let step = 0;
        for (let i = 0; i < existingBlocks_count; i++) {
            const block = this.blocks.nth(step);

            const block_name = await this.getBlockName(block);
            if(blockNames.includes(block_name)) {
                await block.click();
                await this.page.waitForTimeout(200);
            }
            else {
                step++;
            }
        }
        
        if(await this.validateDeletionBtn.isVisible()) {
            await this.validateDeletionBtn.click();
        }
        await this.page.waitForLoadState('networkidle');
    }

    async getExistingBlockNames() {
        try {
            await this.blocks.first().waitFor({ state: 'visible' });
        } catch(err) { return []; }
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
        await this.toggleAddingBlocks();
        const unaddedBlock_names = await this.unaddedBlocks.allInnerTexts();
        return unaddedBlock_names.map(t => t.trim());
    }

    async resetDashboard () {
        const blocks_count = await this.blocks.count();
        if(blocks_count > 0) {
            if(await this.deleteBlockBtn.isVisible()) {
                await this.deleteBlockBtn.click();
            }
            for (let i = 0; i < blocks_count; i++) {
                await this.blocks.first().click();
            }
            await this.validateDeletionBtn.click();
            await this.page.waitForLoadState('load');
            await this.page.waitForTimeout(200); //can be removed
        }
    }

    async refillDashboard () {
        const unaddedBlock_names = await this.getUnaddedBlockNames();
        await this.addBlockByName(...unaddedBlock_names);
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(200); //can be removed
    }


    async dragBlock(existingBlock) {
        await existingBlock.waitFor({ state: 'visible' });
        await existingBlock.hover({ position: { x: 0, y: 0 } });
        await this.page.mouse.down();
        await this.page.mouse.move(700, 0);
        await this.page.mouse.up();
        await this.page.waitForTimeout(200); //can be removed
    }

    async resizeBlock(existingBlock) {
        await existingBlock.waitFor({ state: 'visible' });
        const resize_arrow = existingBlock.locator('.gs-resize-handle');
        const box = await resize_arrow.boundingBox();

        await this.page.mouse.move(box.x, box.y);
        await this.page.mouse.down();

        await this.page.mouse.move(box.x + 350, box.y + 250);
        await this.page.mouse.up();
        await this.page.waitForTimeout(200); //can be removed
    }


    async toggleAddingBlocks() { // Because addBlockBtn is flaky; addBlockBtn.click() behaves unexpectedly
        for(let i = 0; i < 10; i++) {
            if((await this.addBlockBtn.getAttribute('aria-expanded') === 'true'))
                return;
            else {
                await this.addBlockBtn.click();
                await this.page.waitForTimeout(200);
            }
        }
        throw new Error('Could not toggle list of blocks to add; flaky "Ajouter" button');
    }
    async untoggleAddingBlocks() {
        for(let i = 0; i < 10; i++) {
            if((await this.addBlockBtn.getAttribute('aria-expanded') === 'false'))
                return;
            else {
                await this.addBlockBtn.click();
                await this.page.waitForTimeout(200);
            }
        }
        throw new Error('Could not untoggle list of blocks to add; flaky "Ajouter" button');
    }
}

module.exports = { DashboardPage }