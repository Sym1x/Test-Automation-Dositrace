class Form {
    constructor(formWrapper) {
        this.formWrapper = formWrapper;
        this.labels = this.formWrapper.locator('label');
        this.submitButton = this.formWrapper.getByRole('button', { name: /Filtrer|Rechercher|Rechercher patient principal|Rechercher Patient doublon|Enregistrer/i });
        this.reinitializeBtn = this.formWrapper.getByRole('button', { name: 'Réinitialiser' });
    };
    
    async getLabels() {
        const labelsTxt = await this.labels.allInnerTexts();

        return labelsTxt;
    };

    async getFieldByLabel(labelText) {
        let forAttr;
        try {
            const label_locator = this.labels.filter({ hasText: labelText }).first();
            forAttr = await label_locator.getAttribute('for');
        } catch(e) { throw new Error("Field " + labelText + " does not exist"); }

        if (!forAttr) {
            throw new Error(`Label "${labelText}" has no corresponding field in this form`);
        }

        return this.formWrapper.locator(`#${forAttr}:not([class*="select2-active"]):not([disabled])`);
    };

    async getOptions(labelText) {
        const field = await this.getFieldByLabel(labelText);
        await field.waitFor('visible');

        const tag = await field.evaluate(el => el.tagName.toLowerCase());
        const id = await field.getAttribute('id');

        if (tag === 'select') {
            const options = await field.locator('option').allInnerTexts();
            return options;
        }
        // select2 is a problem child
        else if(id?.startsWith('s2id_')) {
            const page = this.formWrapper.page();
            const select2Dropdown = page.locator('#select2-drop');
            const isSelect2Visible = await select2Dropdown.isVisible();
            if(!isSelect2Visible){
                const clickable = field.locator('..');
                await clickable.hover({ position: { x: 10, y: 10 } });
                const box = await clickable.boundingBox();
                await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
            }
            
            const select2Results = select2Dropdown.locator('.select2-results li');
            const options = await select2Results.allInnerTexts();
            return options;
        }
    }

    async fillField(labelText, value) {
        const page = this.formWrapper.page();
        await page.waitForLoadState('load');
        await page.waitForTimeout(500);
        let field;
        try {
            field = await this.getFieldByLabel(labelText);
        } catch (e) { throw new Error("Field for " + labelText + " does not exist / is not visible") };
        const tag = await field.evaluate(el => el.tagName.toLowerCase());
        const type = await field.getAttribute('type');
        const id = await field.getAttribute('id');

        // select2 is a problem child always
        const select2Dropdown = page.locator('#select2-drop');
        const check_particular_case = select2Dropdown.locator('input.select2-input');
        const select2Input = select2Dropdown.locator('input.select2-input:not([class*="select2-active"])');
        if (id?.startsWith('s2id_') && tag !== 'select') {
            const clickable = field.locator('..');
            await clickable.hover({ position: { x: 10, y: 10 } });
            const box = await clickable.boundingBox();
            await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

            await select2Dropdown.getByRole('textbox').fill(value);
            if(await check_particular_case.count()) {
                await select2Input.waitFor('visible');
            }
            await select2Dropdown.getByRole('textbox').press('Enter');
        }
        //----------------------------------
        else {
            if (tag === 'select') {
                await field.selectOption(value);
            }

            if (type === 'date' || type === 'text' || tag === 'textarea' || type === 'number') {
                await field.fill(String(value));
            }
        }
    };

    async fillForm(data) {
        for (const [label, value] of Object.entries(data)) {
            await this.fillField(label, value);
        }
    };

};

module.exports = { Form };