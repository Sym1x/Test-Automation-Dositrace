const env = require('../environment/env-wrapper');

class RecoverPasswordPage {
    constructor(page){
        this.page = page;
        this.inputLogin = page.getByRole('textbox', { name: 'Login' });
        this.inputEmail = page.getByRole('textbox', { name: 'Email' });
        this.buttonValider = page.getByRole('button', { name: 'Valider' });
    }
    
    async navigateToPage() {
        await this.page.goto(env.dositraceURL + "ViewMdpLost", { waitUntil: 'load', timeout: 60000});
    }

    async submitForm(login, email) {
        await this.inputLogin.fill(login);
        await this.inputEmail.fill(email);
        await this.buttonValider.click();
    }

}

module.exports = { RecoverPasswordPage }