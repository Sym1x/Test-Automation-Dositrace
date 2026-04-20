class DataTable {
    constructor(page) {
        this.page = page;
        this.table_length = this.page.locator('.dataTables_length');
        this.search_bar = this.page.locator('.dataTables_filter');
        this.table = this.page.locator('.table');
        this.thead = this.table.locator('thead > tr');
    }
}

module.exports = { DataTable };