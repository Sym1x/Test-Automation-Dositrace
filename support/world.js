const { setWorldConstructor, World } = require('@cucumber/cucumber');
const {setDefaultTimeout} = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const assert = require('assert');
const utils = require("../utils/utils.js")

const fs = require('fs');
const path = require('path');
const { LoginPage } = require("../page-objects/LoginPage");


class PlaywrightWorld extends World {
    constructor(options) {
        super(options);
        this.assert = assert;
        this.expect = expect;
        this.verifyPopupMessage = utils.verifyPopupMessage.bind(this);
        this.redirectToDositrace = utils.redirectToDositrace.bind(this);
    }

    async initPage_SansAuth() {
        if (!this.context) {
            this.context = await this.browser.newContext();
            this.page = await this.context.newPage();
        }
    }
    async initPage() {
        const authPath = path.join(__dirname, 'auth.json');
        if (!this.context) {
            if(!fs.existsSync(authPath)) {
                this.context = await this.browser.newContext();
                this.page = await this.context.newPage();
                let loginPage = new LoginPage(this.page);
                await loginPage.navigateToPage();
                await loginPage.submitForm();
                await this.page.waitForLoadState('domcontentloaded');
                await this.context.storageState({ path: authPath });
            }
            else {
                this.context = await this.browser.newContext({storageState: authPath});
                this.page = await this.context.newPage();
            }
        }
    }

    async closePage() {
        await this.page.close();
        await this.context.close();
    }
}
setWorldConstructor(PlaywrightWorld);
setDefaultTimeout(12*5000)
