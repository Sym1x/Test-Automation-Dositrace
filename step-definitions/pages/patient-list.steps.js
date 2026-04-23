const { Given, When, Then } = require('@cucumber/cucumber');

Given('the user is on the Patient List page', async function () {
    await this.utils.redirectToDositrace();
    await this.page.goto('http://10.0.5.14:8080/DositraceV2-war/ListPatient');
});

// TestID_214: Etat field displays correctly
Then('{string} search box is visible', async function () {
    await this.expect(this.page.getByText('Etat')).toBeVisible();
});
Then('Then "Actifs" and "Supprimés"  options are available', async function() {
    await this.page.locator('.select2-choice').first().click();
    await this.expect(this.page.locator('#select2-drop')).toBeVisible();
});


// TestId_215: Etat field functions correctly
Then('the user can filter by Etat correctly', async function () {
    await this.page.getByRole('link', { name: 'Actifs' }).click();
    await this.page.locator('#select2-drop').getByText('Supprimés').click();
    await this.page.getByRole('button', { name: 'Filtrer' }).first().click();
    await this.expect(this.page.locator('#patient_info')).toContainText('Affichage de l\'élément 1 à 3 sur 3 élément(s)');
});


// TestingID_217: Filters sidebar displays correctly
When('the user clicks "Ajouter des filtres" for patient list', async function () {
    await this.page.getByText('Ajouter des filtres').click();
});
Then('the user accesses a filters section containing "Date de naissance" and "Sexe"', async function () {
    await this.expect(this.page.locator('#filter_12').getByText('Date de naissance')).toBeVisible();
    await this.expect(this.page.locator('#filter_14').getByText('Sexe')).toBeVisible();
});


// TestingID_220: Dropdown field displays correctly
When('the user clicks the Sexe field to filter', async function () {
    await this.page.getByText('Ajouter des filtres').click();
    await this.page.locator('#s2id_gender > a').click();
});
Then('a search field along the options \\(Hommes, femmes, Non définis et Tous) become visible', async function () {
    await this.expect(this.page.locator('#select2-drop').getByRole('textbox')).toBeVisible();
    await this.expect(this.page.locator('#select2-drop').getByText('Tous')).toBeVisible();
    await this.expect(this.page.locator('#select2-drop').getByText('Homme')).toBeVisible();
    await this.expect(this.page.locator('#select2-drop').getByText('Femme')).toBeVisible();
    await this.expect(this.page.locator('#select2-drop').getByText('Non défini')).toBeVisible();
});


// TestingID_221: The Sexe field filters correctly
When('the user filters by Sexe', async function () {
    await this.page.getByText('Ajouter des filtres').click();
    await this.page.locator('#s2id_gender > a').click(); 
    await this.page.locator('#select2-drop').getByText('Non défini').click();
    await this.page.locator('#page-rightbar').getByRole('button', { name: 'Filtrer' }).click();
});
Then('the patient list is updated accordingly', async function () {
    await this.expect(this.page.locator('#patient_info')).toContainText('Affichage de l\'élément 1 à 10 sur 321 élément(s)');
});


// TestingID_223: Date de naissance input calendar displays correctly
When('the user clicks the Date de naissance field to filter', async function () {
    await this.page.getByText('Ajouter des filtres').click();
    await this.page.getByRole('textbox', { name: 'Date de naissance' }).click();
});

Then('a calender becomes visible to choose date of birth', async function () {
    await this.expect(this.page.locator('.flatpickr-calendar')).toBeVisible();
});


// TestingID_225: The Date de naissance field filters correctly
When('the user filters by Date de naissance', async function () {
    await this.page.getByText('Ajouter des filtres').click();
    await this.page.getByRole('textbox', { name: 'Date de naissance' }).fill('13/02/1996');
    await this.page.getByRole('textbox', { name: 'Date de naissance' }).press('Enter');
    await this.page.locator('#page-rightbar').getByRole('button', { name: 'Filtrer' }).click();
});
Then('the patient list is updated in accordance with the chosen Date', async function () {
    await this.expect(this.page.locator('#patient_info')).toContainText('Affichage de l\'élément 1 à 10 sur 21 élément(s)');
});


// TestingID_226: "Réinitialiser" button functions correctly
When('the user has filters enabled and clicks the Réinitialiser button', async function () {
    await this.page.getByRole('link', { name: 'Actifs' }).click();
    await this.page.locator('#select2-drop').getByText('Supprimés').click();
    await this.page.getByText('Ajouter des filtres').click();
    await this.page.locator('#s2id_gender > a').click();
    await this.page.locator('#select2-drop').getByText('Homme').click();
    await this.page.locator('#page-rightbar').getByRole('button', { name: 'Filtrer' }).click();
    await this.expect(this.page.locator('#patient_info')).toContainText('Affichage de l\'élément 1 à 1 sur 1 élément(s)');
    await this.page.getByRole('button', { name: 'Réinitialiser' }).first().click();
});
Then('the filters are reset', async function () {
    await this.expect(this.page.locator('#patient_info')).toContainText('Affichage de l\'élément 1 à 10 sur 20,303 élément(s)');
});


// TestingID_228: Global search in patient list
Then('the user can search globally along the columns of the patient table', async function () {
    await this.page.getByPlaceholder('Recherche globale').fill('anonyme denise cecile j');
    await this.page.getByPlaceholder('Recherche globale').press('Enter');
    await this.expect(this.page.getByRole('gridcell', { name: 'DENISE CECILE J' })).toBeVisible();

    await this.page.getByPlaceholder('Recherche globale').fill('25/05/1936');
    await this.page.getByPlaceholder('Recherche globale').press('Enter');
    await this.page.waitForLoadState('networkidle');
    await this.expect(this.page.getByRole('gridcell', { name: 'DENISE CECILE J' })).toBeVisible();
});

// REVISIT
Then('the user can sort the patient list by clicking a column name', async function () {
    const headers = this.page.locator(
    'thead th:not(.sorting_disabled):visible'
    );

    const count = await headers.count();
    for (let i = 0; i < count; i++) {
        const th = this.page.locator(
            'thead th:not(.sorting_disabled):visible'
        ).nth(i);

        await th.click();
         await th.click();
          await th.click();
        await this.page.waitForLoadState('networkidle');
        const sortValue = await th.getAttribute('aria-sort');

        if (sortValue === 'descending') {
            await th.click();
            await this.expect(th).toHaveAttribute('aria-sort', 'ascending');
        }

        else if (sortValue === 'ascending') {
            await th.click();
            await this.expect(th).toHaveAttribute('aria-sort', 'descending');
        }

        else {
            const outer = await th.evaluate(el => el.outerHTML);
console.log(outer);
            console.log('Unexpected sort value:', sortValue);
        }
    }
});


// TestingID_230: Navigating the patient list
Then('the user can use the arrows to navigate the patient list', async function () {
    await this.page.locator('#patient_next').click();
    await this.expect(this.page.locator('#patient_info')).toContainText('Affichage de l\'élément 11 à 20 sur 20,300 élément(s)');

    await page.locator('#patient_last').click();
    await expect(page.locator('#patient_info')).toContainText('Affichage de l\'élément 20,291 à 20,300 sur 20,300 élément(s)');
});



// TestingID_231: Choosing number of patients to list in one page
Then('the user can choose to list 10 or 25 or 50 or 100 patients', async function () {
    await this.expect(this.page.locator('#patient_length')).toContainText('Afficher 102550100 éléments');
});


// TestingID_233: Viewing patients
When('the user clicks the name of a patient in the patient list page', async function () {
    await this.page.getByRole('gridcell', { name: 'fetus14' }).click();
});

Then('the user is redirected to view the sheet of the patient', async function () {
    await this.expect(this.page).toHaveURL(/ViewPatient/);
});