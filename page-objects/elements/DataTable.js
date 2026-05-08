class DataTable {
    constructor(dataTableWrapper) {
        this.dataTableWrapper = dataTableWrapper;
        
        this.dataTable_length = this.dataTableWrapper.locator('.dataTables_length');
        this.search_bar = this.dataTableWrapper.locator('.dataTables_filter .form-control');
        
        this.table = this.dataTableWrapper.locator('table.dataTable');
        this.thead = this.table.locator('thead > tr');
        this.tbody = this.table.locator('tbody');

        this.dataTable_pagination_info = this.dataTableWrapper.locator('.dataTables_info');
        this.dataTable_pagination_inputs = this.dataTableWrapper.locator('.dataTables_paginate.paging_input');
    };

    async changeTableLength(new_length) {
        const lengthSelect = this.dataTable_length.locator('select');
        await lengthSelect.selectOption(String(new_length));
    };

    async searchGlobally(keyword) {
        await this.search_bar.type(String(keyword));
    };


    async getColumnNames() {
        await this.waitForRefreshing();

        const headers = await this.thead.locator('th').allInnerTexts();
        return headers;
    };
    async clickColumn(columnName) {
        await this.thead.locator('th', { hasText: columnName }).click();
    };


    async getNumberOfRows() {
        await this.waitForRefreshing();

        return await this.tbody.locator('tr').count();
    };
    async getRowTexts() {
        await this.waitForRefreshing();

        const rows = (await this.tbody.locator('tr').all()).slice(0, 2);
        const result = [];

        for (const row of rows) {
            const cells = await row.locator('td').allInnerTexts();
            result.push(cells);
        }
        return result;
    };

    async getCell(columnName, rowNumber) {
        await this.waitForRefreshing();

        const headers = this.thead.locator('th');
        const count = await headers.count();

        let columnIndex = -1;

        for (let i = 0; i < count; i++) {
            const text = await headers.nth(i).innerText();
            if (text.trim() === columnName) {
                columnIndex = i;
                break;
            }
        }

        if (columnIndex === -1) {
            throw new Error(`Column "${columnName}" not found`);
        }

        const row = this.tbody.locator('tr').nth(rowNumber);

        return row.locator('td').nth(columnIndex);
    }

    async getPaginationInfo() {
        await this.waitForRefreshing();
        return await this.dataTable_pagination_info.innerText();
    };
    async goToFirstPage() {
        await this.waitForRefreshing();
        await this.dataTable_pagination_inputs.locator('span.first').click();
    };
    async goToPreviousPage() {
        await this.waitForRefreshing();
        await this.dataTable_pagination_inputs.locator('span.previous').click();
    };
    async goToNextPage() {
        await this.waitForRefreshing();
        await this.dataTable_pagination_inputs.locator('span.next').click();
    };
    async goToLastPage() {
        await this.waitForRefreshing();
        await this.dataTable_pagination_inputs.locator('span.last').click();
    };


    // the data table uses asynchronous frontend rendering
    // this must be awaited to give us the okay before we try to retrieve any information
    async waitForRefreshing() {
        await this.dataTableWrapper.locator('#list_praw_processing').waitFor({ state: 'hidden',});
    }
    
}

module.exports = { DataTable };