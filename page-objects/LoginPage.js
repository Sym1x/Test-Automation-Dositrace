const env = require('../environment/env-wrapper');

class LoginPage {
    constructor(page){
        this.page = page;
        this.inputLogin = page.getByRole('textbox', { name: 'Login' });
        this.inputPassword = page.getByRole('textbox', { name: 'Mot de passe' });
        this.buttonConnexion = page.getByRole('button', { name: 'Connexion' });
        this.linkMotPasseOublie = page.getByRole("link", {name: "Mot de passe oublié ?"});
    }
    
    async navigateToPage() {
        await this.page.goto(env.baseURL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    }

    async submitForm(login, password) {
        if(arguments.length === 0) {
            await this.inputLogin.fill(env.dositraceLogin);
            await this.inputPassword.fill(env.dositracePassword);
        } else {
            await this.inputLogin.fill(login);
            await this.inputPassword.fill(password);
        }
        await this.buttonConnexion.click();
    }
}

module.exports = { LoginPage }