const { chromium } = require('playwright');
const utils = require("../utils/utils.js")
const { LoginPage } = require("../page-objects/LoginPage");
const { ExamCreationPage } = require("../page-objects/ExamCreationPage");


//------------------------------------
async function launchBrowser() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    return { browser, page };
}

async function loginToDositrace(page) {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToPage();
    await loginPage.submitForm();
    await page.waitForLoadState('domcontentloaded', { timeout: 80000 });
}
//------------------------------------



async function createPatients(page) {
    const patient_female_minor = {'Numéro patient':'0000421', 'Nom':'Dummy', 'Prénom':'FemaleMinor', 'Sexe':'Mme.', 'Date de naissance':utils.getDateAfter(-5000)}; //getDateAfter(-5000) returns the Date 5000 days ago (or 14 years ago)
    const patient_female_adult = {'Numéro patient':'0000422', 'Nom':'Dummy', 'Prénom':'FemaleAdult', 'Sexe':'Mme.', 'Date de naissance':utils.getDateAfter(-6700)};
    const patient_male_adult = {'Numéro patient':'0000423', 'Nom':'Dummy', 'Prénom':'MaleAdult', 'Sexe':'M.', 'Date de naissance':utils.getDateAfter(-6700)};

    const examCreationPage = new ExamCreationPage(page);
    await examCreationPage.navigateToPage();

    const patient_already_exists_toast = examCreationPage.page.locator("div[class*='ui-pnotify-container']");
    try {
        await examCreationPage.addPatientBtn.click();
        await examCreationPage.add_patient_form.fillForm(patient_female_minor);
        await examCreationPage.add_patient_form.submitButton.click();
        await examCreationPage.page.waitForLoadState('networkidle');
    
        if(!(await patient_already_exists_toast.count())) {
            await examCreationPage.addPatientBtn.click();
            await examCreationPage.add_patient_form.fillForm(patient_female_adult);
            await examCreationPage.add_patient_form.submitButton.click();
            await examCreationPage.page.waitForLoadState('networkidle');
        }

        if(!(await patient_already_exists_toast.count())) {
            await examCreationPage.addPatientBtn.click();
            await examCreationPage.add_patient_form.fillForm(patient_male_adult);
            await examCreationPage.add_patient_form.submitButton.click();
            await examCreationPage.page.waitForLoadState('networkidle');
        }
        console.log('Dummy patients added successfully !');
    }
    catch(e) {
        console.log('Error adding Patients: ', e);
    }
}

async function createExams(page) {
    const patient_female_minor_info = {'Patient': 'Dummy FemaleMinor', 'Poids (kg)': '39', 'Taille (cm)': '145'};
    const patient_female_adult_info = {'Patient': 'Dummy FemaleAdult', 'Poids (kg)': '57', 'Taille (cm)': '165'};
    const patient_male_adult_info = {'Patient': 'Dummy MaleAdult', 'Poids (kg)': '75', 'Taille (cm)': '178'};

    const exam_today_1 = {'Modalité': 'Scanner', 'Équipement': 'SOMATOM Definition AS', 'Protocoles DOSITRACE': 'Sinus', 'Date': utils.getDateAfter(), 'Heure': '23:59', "Numéro d'examen": '00004211', 'Médecin réalisateur': 'VERGARA Alex', 'Remarques': 'Dummy exam for testing'};
    const exam_today_2 = {'Modalité': 'Médecine nucléaire', 'Équipement': 'SPECT', 'Date': utils.getDateAfter(), 'Heure': '23:59', "Numéro d'examen": '00004212', 'Médecin réalisateur': 'BOITEAU Mathieu', 'Remarques': 'Dummy exam for testing'};
    const exam_today_3 = {'Modalité': 'Médecine nucléaire (TEP SCAN)', 'Date': utils.getDateAfter(), 'Heure': '23:59', "Numéro d'examen": '00004213', 'Médecin réalisateur': 'DAMOUR Mickael', 'Remarques': 'Dummy exam for testing'};
    const exam_today_4 = {'Modalité': 'Ostéodensitométrie', 'Date': utils.getDateAfter(), 'Heure': '23:59', "Numéro d'examen": '00004214', 'Médecin réalisateur': 'BOUSNINA Dorra', 'Remarques': 'Dummy exam for testing'};
    const exam_today_5 = {'Modalité': 'Angiographie', 'Équipement': 'Axiom Artis', 'Protocoles DOSITRACE': 'DHS', 'Date': utils.getDateAfter(), 'Heure': '23:59', "Numéro d'examen": '00004215', 'Médecin réalisateur': 'GAUCHET Pierre', 'Remarques': 'Dummy exam for testing'};

    const exam_in_a_week_1 = {'Modalité': 'Radiologie conventionnelle CR', 'Équipement': 'AXIOM LUMINOS VO', 'Protocoles DOSITRACE': 'ASP', 'Date': utils.getDateAfter(6), 'Heure': '23:59', "Numéro d'examen": '00004221', 'Médecin réalisateur': 'MIKA Kami', 'Remarques': 'Dummy exam for testing'};
    const exam_in_a_week_2 = {'Modalité': 'Scanner', 'Équipement': 'Siemens Definition AS Ch 4V', 'Protocoles DOSITRACE': 'TAP', 'Date': utils.getDateAfter(6), 'Heure': '23:59', "Numéro d'examen": '00004222', 'Médecin réalisateur': 'ANONYME Sylvain', 'Remarques': 'Dummy exam for testing'};
    const exam_in_a_week_3 = {'Modalité': 'Angiographie', 'Équipement': 'Solo FD', 'Protocoles DOSITRACE': 'CIP', 'Date': utils.getDateAfter(6), 'Heure': '23:59', "Numéro d'examen": '00004223', 'Médecin réalisateur': 'GUINAMARD Sacha', 'Remarques': 'Dummy exam for testing'};
    const exam_in_a_week_4 = {'Modalité': 'Angiographie', 'Équipement': 'Siremobil Compact', 'Protocoles DOSITRACE': 'Coro_diag', 'Date': utils.getDateAfter(6), 'Heure': '23:59', "Numéro d'examen": '00004224', 'Médecin réalisateur': 'GUINAMARD Sacha', 'Remarques': 'Dummy exam for testing'};
    const exam_in_a_week_5 = {'Modalité': 'Radiologie conventionnelle CR', 'Protocoles DOSITRACE': 'Sesamoïde', 'Date': utils.getDateAfter(6), 'Heure': '23:59', "Numéro d'examen": '00004225', 'Médecin réalisateur': 'ANONYME Johanne', 'Remarques': 'Dummy exam for testing'};

    const examCreationPage = new ExamCreationPage(page);
    await examCreationPage.navigateToPage();
    async function executeExamCreation(exam, patient) {
        await examCreationPage.exam_info_form.fillForm(exam);
        await examCreationPage.patient_info_form.fillForm(patient);
        await examCreationPage.validerBtn.click();
        await page.waitForLoadState('load');
        await examCreationPage.navigateToPage();
    }

    try {
        await executeExamCreation(exam_today_1, patient_female_adult_info);
        await executeExamCreation(exam_today_2, patient_male_adult_info);
        await executeExamCreation(exam_today_3, patient_male_adult_info);
        await executeExamCreation(exam_today_4, patient_female_minor_info);
        await executeExamCreation(exam_today_5, patient_female_adult_info);

        await executeExamCreation(exam_in_a_week_1, patient_female_adult_info);
        await executeExamCreation(exam_in_a_week_2, patient_female_minor_info);
        await executeExamCreation(exam_in_a_week_3, patient_male_adult_info);
        await executeExamCreation(exam_in_a_week_4, patient_female_adult_info);
        await executeExamCreation(exam_in_a_week_5, patient_male_adult_info);

        console.log('Dummy exams added successfully !')

    }
    catch(e) {
        console.log('Error adding Exams: ', e);
    }

}


async function main() {
    const { browser, page } = await launchBrowser();
    await loginToDositrace(page);
    await utils.redirectToDositrace(page);

    await createPatients(page);
    await createExams(page);
    
    await browser.close();
}

main();