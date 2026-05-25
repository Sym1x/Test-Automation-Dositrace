class DataTable {
    constructor(dataTableWrapper) {
        this.dataTableWrapper = dataTableWrapper;
        
        this.dataTable_length = this.dataTableWrapper.locator('.dataTables_length select');
        this.search_bar = this.dataTableWrapper.locator('.dataTables_filter .form-control');
        
        this.table = this.dataTableWrapper.locator('table.dataTable');
        this.thead = this.table.locator('thead > tr');
        this.tbody = this.table.locator('tbody');

        this.table_rows = this.tbody.locator('tr');

        this.dataTable_pagination_info = this.dataTableWrapper.locator('.dataTables_info');
        this.dataTable_pagination_inputs = this.dataTableWrapper.locator('.dataTables_paginate.paging_input');
    };

    async changeTableLength(new_length) {
        await this.dataTable_length.selectOption(String(new_length));
        await this.waitForRefreshing();
    };

    async searchGlobally(keyword) {
        try {
            await this.search_bar.type(String(keyword));
        }
        catch(e) { throw new Error('Could not type into the search bar') };
        await this.waitForRefreshing();
    };


    async getColumnNames() {
        await this.waitForRefreshing();

        const headers = await this.thead.locator('th').allInnerTexts();
        return headers;
    };
    async clickColumnToSort(columnName) {
        const column = this.thead.locator('th', { hasText: columnName });
        if(!(await column.isVisible()))
            throw new Error(`Column "${columnName}" not found`);
        
        const columnClass = await column.getAttribute('class');
        if (columnClass?.includes('sorting_disabled'))
            throw new Error(`Column "${columnName}" does not allow sorting`);
        
        await column.click();
        return (await column.getAttribute('aria-sort'));
    };


    async getNumberOfRows() {
        await this.waitForRefreshing();
        const numberOfRows = await this.tbody.locator('tr').count();
        const text = await this.tbody.locator('tr').first().innerText();
        if(numberOfRows === 1 && (text.includes('Aucune donnée') || text.includes('Aucun élément')))
            return 0;
        return numberOfRows;
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
        if(!(await this.dataTable_pagination_info.isVisible()))
            throw new Error('Table empty; no data displayed');

        const pagination_info = await this.dataTable_pagination_info.innerText();
         if(!pagination_info)
            throw new Error('Table empty; no data displayed');
        return pagination_info;
    };

    async inputPaginationNumber(num) {
        await this.waitForRefreshing();
        if(!(await this.dataTable_pagination_inputs.isVisible()))
            throw new Error('No multiple pages are listed in the table; Table empty or lacks enough data');

        const paginate_input = this.dataTable_pagination_inputs.locator('input');
        if(!(await paginate_input.isVisible()))
            throw new Error('No multiple pages are listed in the table; Table empty or lacks enough data');
        await paginate_input.fill(num);
    }
    async goToFirstPage() {
        await this.waitForRefreshing();
        if(!(await this.dataTable_pagination_inputs.isVisible()))
            throw new Error('No multiple pages are listed in the table; Table empty or lacks enough data');

        const arrow_first = this.dataTable_pagination_inputs.locator('span.first');
        if(!(await arrow_first.isVisible()))
            throw new Error('No multiple pages are listed in the table; Table empty or lacks enough data');
        await arrow_first.click();
    };
    async goToPreviousPage() {
        await this.waitForRefreshing();
        if(!(await this.dataTable_pagination_inputs.isVisible()))
            throw new Error('No multiple pages are listed in the table; Table empty or lacks enough data');

        const arrow_previous = this.dataTable_pagination_inputs.locator('span.previous');
        if(!(await arrow_previous.isVisible()))
            throw new Error('No multiple pages are listed in the table; Table empty or lacks enough data');
        await arrow_previous.click();
    };
    async goToNextPage() {
        await this.waitForRefreshing();
        if(!(await this.dataTable_pagination_inputs.isVisible()))
            throw new Error('No multiple pages are listed in the table; Table empty or lacks enough data');

        const arrow_next = this.dataTable_pagination_inputs.locator('span.next');
        if(!(await arrow_next.isVisible()))
            throw new Error('No multiple pages are listed in the table; Table empty or lacks enough data');
        await arrow_next.click();
    };
    async goToLastPage() {
        await this.waitForRefreshing();
        if(!(await this.dataTable_pagination_inputs.isVisible()))
            throw new Error('No multiple pages are listed in the table; Table empty or lacks enough data');
        
        const arrow_last = this.dataTable_pagination_inputs.locator('span.last');
        if(!(await arrow_last.isVisible()))
            throw new Error('No multiple pages are listed in the table; Table empty or lacks enough data');
        await arrow_last.click();
    };


    // the data table uses asynchronous frontend rendering
    // this must be awaited to give us the okay before we try to retrieve any information
    async waitForRefreshing() {
        await this.dataTableWrapper.locator('.dataTables_processing').waitFor({ state: 'hidden',});
    }
    
}

module.exports = { DataTable };