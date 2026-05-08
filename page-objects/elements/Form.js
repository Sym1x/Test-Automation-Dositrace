class Form {
    constructor(formWrapper) {
        this.formWrapper = formWrapper;
        this.labels = this.formWrapper.locator('label');
        this.filterBtn = this.formWrapper.getByRole('button', { name: 'Filtrer' });
        this.reinitializeBtn = this.formWrapper.getByRole('button', { name: 'Réinitialiser' });
    };
    




    async getLabels() {
        const labelsTxt = await this.labels.allInnerTexts();

        return labelsTxt;
    }

    async getFieldByLabel(label) {
        const label_locator = this.labels.filter({ hasText: label }).first();
        const forAttr = await label_locator.getAttribute('for');

        if (!forAttr) {
            throw new Error(`Label "${label}" has no corresponding field`);
        }

        return this.formWrapper.locator(`#${forAttr}`);
    }

    async fillField(labelText, value) {
        let field = await this.getFieldByLabel(labelText);
        const id = await field.getAttribute('id');
        // select2 is a problem child
        if (id?.startsWith('s2id_')) {
            field = this.labels.filter({ hasText: labelText }).locator('..').locator('select');
        }

        const tag = await field.evaluate(el => el.tagName.toLowerCase());
        const type = await field.getAttribute('type');
        if (tag === 'select') {
            return field.selectOption(value);
        }

        if (type === 'date' || type === 'text' || tag === 'textarea' || type === 'number') {
            return field.fill(value);
        }
        
    }

    async fillForm(data) {
        for (const [label, value] of Object.entries(data)) {
            await this.fillField(label, value);
        }
    }

}

module.exports = { Form };