const { setWorldConstructor, World } = require('@cucumber/cucumber');
const {setDefaultTimeout} = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const assert = require('assert');

class PlaywrightWorld extends World {
    constructor(options) {
        super(options);
        this.assert = assert;
        this.expect = expect;
    }

    async initPage() {
        if (!this.context) {
            this.context = await this.browser.newContext();
            this.page = await this.context.newPage();
        }
    }
    async closePage() {
        await this.page.close();
        await this.context.close();
    }
}
setWorldConstructor(PlaywrightWorld);
setDefaultTimeout(12*5000)
