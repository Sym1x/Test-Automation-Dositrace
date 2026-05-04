class DataTable {
    constructor(page) {
        this.page = page;

        this.option_buttons = this.page.locator('.col-md-12.btn-group').first();

        this.dataTableWrapper = this.page.locator('.dataTables_wrapper').first();
        
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
        const headers = await this.thead.locator('th').allInnerTexts();
        return headers;
    };
    async clickColumn(columnName) {
        await this.thead.locator('th', { hasText: columnName }).click();
    };


    async getNumberOfRows() {
        return await this.tbody.locator('tr').count();
    };
    async getRowTexts() {
        const rows = (await this.tbody.locator('tr').all()).slice(0, 2);
        const result = [];

        for (const row of rows) {
            const cells = await row.locator('td').allInnerTexts();
            result.push(cells);
        }
        return result;
    };

    async getCell(columnName, rowNumber) {
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
        return await this.dataTable_pagination_info.innerText();
    };
    async goToFirstPage() {
        await this.dataTable_pagination_inputs.locator('span.first:not(.disabled)').click();
    };
    async goToPreviousPage() {
        await this.dataTable_pagination_inputs.locator('span.previous:not(.disabled)').click();
    };
    async goToNextPage() {
        await this.dataTable_pagination_inputs.locator('span.next:not(.disabled)').click();
    };
    async goToLastPage() {
        await this.dataTable_pagination_inputs.locator('span.last:not(.disabled)').click();
    };
    
}

module.exports = { DataTable };