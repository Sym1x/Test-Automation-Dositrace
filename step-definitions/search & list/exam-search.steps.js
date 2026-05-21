const { Given, When, Then } = require('@cucumber/cucumber');
const { DataTable } = require('../../page-objects/elements/DataTable');
const { ExamSearchPage } = require('../../page-objects/ExamSearchPage');
const { expect } = require('playwright/test');

Given('the user is on the Exam Search page', async function () {
    await this.utils.redirectToDositrace(this.page);

    this.ExamSearchPage = new ExamSearchPage(this.page);
    await this.ExamSearchPage.navigateToPage();

    this.exam_table = new DataTable(this.page);
});


// TestID_117: Calendar visibility in Exam Search
When('the user clicks the date field', async function () {
    if(!(await this.ExamSearchPage.dateRangeInput.isVisible()))
        throw new Error("Date field is not visible");
    await this.ExamSearchPage.dateRangeInput.click();
});

Then('a calendar becomes visible allowing to choose the start date and end date', async function () {
    try {
        await this.expect(this.ExamSearchPage.calendarDays).toBeVisible();
    } catch (e) { throw new Error("Calendar is not displayed graphically as expected") };
    try {
    await this.expect(this.ExamSearchPage.calendarDays.locator('.flatpickr-day.startRange')).toHaveCount(1);
    } catch (e) { throw new Error("Calendar is not selecting a start date"); };
    try {
    await this.expect(this.ExamSearchPage.calendarDays.locator('.flatpickr-day.endRange')).toHaveCount(1);
    } catch (e) { throw new Error("Calendar is not selecting an end date"); };
});


// TestID_118: Date field functionality
Then('the user can enter dates manually', async function () {
    if(!(await this.ExamSearchPage.dateRangeInput.isVisible()))
        throw new Error("Date field is not visible");
    await this.ExamSearchPage.dateRangeInput.fill('01/01/1999 - 02/01/1999');
    await this.ExamSearchPage.dateRangeInput.press('Enter');
});
Then('the user can enter dates using the calendar', async function () {
    await this.ExamSearchPage.dateRangeInput.click();
    await this.ExamSearchPage.calendarDays.locator('span').nth(0).click();
    await this.ExamSearchPage.calendarDays.locator('span').nth(10).click();
});


// TestID_122: Date buttons functionality
Then('the date field is updated in accordance with the button clicked', async function () {
    const date_text_box = this.page.getByRole('textbox', { name: 'Date', exact: true });
    await this.page.getByText('dernier mois').click();
    await this.expect(date_text_box).toHaveValue(this.utils.getLastMonthsRange(1));
    
    await this.page.getByText('3 derniers mois').click();
    await this.expect(date_text_box).toHaveValue(this.utils.getLastMonthsRange(3));

    await this.page.getByText('6 derniers mois').click();
    await this.expect(date_text_box).toHaveValue(this.utils.getLastMonthsRange(6));

    await this.page.getByText('12 derniers mois').click();
    await this.expect(date_text_box).toHaveValue(this.utils.getLastMonthsRange(12));
});


// TestID_123: The Advanced Filtering sidebar displays correctly
When('the user clicks "Ajouter des filtres" for searching exams', async function () {
    await this.ExamSearchPage.addFiltersBtn.click();
});
Then('the user can select from the filters:', async function (expectedData) {
  const expectedFilters = expectedData.raw().flat();

  let actualFilters = await this.page.locator('#page-rightbar label').evaluateAll(nodes => nodes.map(n => n.innerText.trim()));
  actualFilters = actualFilters.slice(1);

  for (const expected of expectedFilters) {
    this.expect(actualFilters).toContain(expected);
  }
});


// TestID_125: Selecting and refining filters for exam search
When('the user selects a filter for the exam search', async function () {
    await this.ExamSearchPage.addFiltersBtn.click();
    await this.ExamSearchPage.filtering_form.fillField('Equipement', 'AXIOM LUMINOS VO');
    await this.ExamSearchPage.closeFiltersBtn.click();
    await this.ExamSearchPage.filterBtn.click();
});
Then('a field listing the corresponding filter options becomes visible', async function () {
    const table_result = await this.ExamSearchPage.data_table.getRowTexts();
    if(await this.ExamSearchPage.data_table.getNumberOfRows() === 0) {
        throw new Error('Not enough testing data (Exam search table yielded no results for the tested filter)');
    }
    const result = table_result.every(rowText => rowText.includes("AXIOM LUMINOS VO"));
    if(!result)
        throw new Error('Exam search filter does not work as intended');
});


// TestID_128: Heure filter works as intended for Exam Search
Then('the user can select the hour interactively by sliding the two handles of the Heure field to the right and to the left', async function () {
    await this.ExamSearchPage.addFiltersBtn.click();
    try{
        await this.ExamSearchPage.dragHeureHandles();
    }
    catch(e) {
        throw new Error("'Heure' filter is not responding to interactive use (slider)");
    }
});


// TestID_129: Heure filter functions correctly
When('the user selects the hour for exam search and clicks Filtrer', async function () {
    await this.ExamSearchPage.addFiltersBtn.click();
    await this.ExamSearchPage.dragHeureHandles();

    await this.ExamSearchPage.closeFiltersBtn.click();
    await this.ExamSearchPage.filterBtn.click();
});
Then('the list of exams is updated correctly, displaying an hour within the range chosen', async function () {
    const table_result = await this.ExamSearchPage.data_table.getRowTexts();
    if(await this.ExamSearchPage.data_table.getNumberOfRows() === 0)
        throw new Error('Not enough testing data (Exam search table yielded no results for the tested filter)');
    const tested_hour_range = '08:45 - 14:00';
    const [start, end] = tested_hour_range.split(" - ");

    function toMinutes(t) {
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
    }

    const startMin = toMinutes(start);
    const endMin = toMinutes(end);

    const isWithinRange = (time) => {
        const timeMin = toMinutes(time);
        return timeMin >= startMin && timeMin <= endMin;
    };

    const result = table_result.every(row => {
        const dateTime = row[1]; 
        const time = dateTime.split(" ")[1];
        return isWithinRange(time); 
    });
    if(!result)
        throw new Error("'Heure' filter in Exam Search is not functional, it did not update the list correctly");
});

// TestID_131: Global search along columns in Exam Search
Then('the user can search globally in the exam search list using keywords', async function () {
    await this.ExamSearchPage.data_table.searchGlobally('Bassin');
    const table_result = await this.ExamSearchPage.data_table.getRowTexts();
    const result = table_result.every(row => row.includes("Bassin"));

    if(!result)
        throw new Error("Global search in exam search list is not working as intended");
});


// TestID_133: UF field in Exam Search filtering displays as expected
Then('the UF field displays UF options for exam search when clicked', async function () {
    await this.ExamSearchPage.addFiltersBtn.click();
    const UF_options = await this.ExamSearchPage.filtering_form.getOptions('UF');
    if(UF_options.length < 2)
        throw new Error("UF field in Exam Search page is not showing options");
        
});


// TestID_134: UF filter in Exam Search functions correctly
When('the user selects an UF filter for exam search and clicks Filtrer', async function () {
    this.option_to_test = 'Radiologie 1';
    this.expected_result = 'Radiologie 1';
    await this.ExamSearchPage.addFiltersBtn.click();
    await this.ExamSearchPage.filtering_form.fillField('UF', this.option_to_test);
    await this.ExamSearchPage.closeFiltersBtn.click();
    await this.ExamSearchPage.filterBtn.click();
});
Then('the list of exams is updated correctly in accorandance with the chosen UF filter', async function () {
    if(await this.ExamSearchPage.data_table.getNumberOfRows() === 0)
        throw Error("Not enough testing data (Exam search table yielded no results for the tested filter)");

    const exam_checkbox = await this.ExamSearchPage.data_table.getCell("", 0);
    try {
        await exam_checkbox.locator('input[type="radio"]').check();
        await this.ExamSearchPage.visualizeExamBtn.click();
        await this.page.waitForLoadState('load');
    }
    catch(e) {
        throw Error("Error trying to visualize exam information from exam search page: ", e);
    }
    try {
        await this.expect(this.page.locator('#wrap')).toContainText(this.expected_result);
    } catch(e) {
        throw new Error("Found incorrect UF in resulted list");
    }
});
    


// TestID_135: Modalité field in Exam Search filtering displays as expected
Then('the Modalité field displays {int} different options when clicked', async function (expectedCount) {
    await this.ExamSearchPage.addFiltersBtn.click();
    const modalite_options = await this.ExamSearchPage.filtering_form.getOptions('Modalité');
    const numberOfDifferentOptions = new Set(modalite_options.map(t => t.trim()).filter(t => t !== "")).size;
    
    if(numberOfDifferentOptions != expectedCount) {
        throw new Error(`Number of Modalité options found: ${numberOfDifferentOptions}`);
    }
});

// TestID_136: Modalité field in Exam Search functions correctly
When('the user selects a Modalité filter for exam search and clicks Filtrer', async function () {
    this.option_to_test = 'Radiologie conventionnelle CR (CR)';
    this.expected_result = 'CR';
    await this.ExamSearchPage.addFiltersBtn.click();
    await this.ExamSearchPage.filtering_form.fillField('Modalité', this.option_to_test);
    await this.ExamSearchPage.closeFiltersBtn.click();
    await this.ExamSearchPage.filterBtn.click();
});
Then('the list of exams is updated correctly in accordance with the chosen Modalité filter', async function () {
    if(await this.ExamSearchPage.data_table.getNumberOfRows() === 0)
        throw new Error("Not enough testing data (Exam search table yielded no results for the tested filter)");
    const modalite_row1 = await this.ExamSearchPage.data_table.getCell("Modalité", 0);
    try {
        await this.expect(modalite_row1).toContainText(this.expected_result);
    } catch(e) {
        throw new Error("Found incorrect Modalité in resulted list. Expected: " + this.expected_result + " ; Found: " + modalite_row1);
    }
});


// TestID_137: Equipement field in Exam Search filtering displays as expected
Then('the Equipement field displays a list of equipment options when clicked', async function () {
    await this.ExamSearchPage.addFiltersBtn.click();
    const equipement_options = await this.ExamSearchPage.filtering_form.getOptions('Equipement');
    if(equipement_options < 2)
        throw new Error("Equipement field in Exam Search page is not showing options");
});
    

// TestID_138: Equipement field in Exam Search functions correctly
When('the user selects a Equipement filter for exam search and clicks Filtrer', async function () {
    this.option_to_test = 'AXIOM LUMINOS VO';
    this.expected_result = 'AXIOM LUMINOS VO';
    await this.ExamSearchPage.addFiltersBtn.click();
    await this.ExamSearchPage.filtering_form.fillField('Equipement', this.option_to_test);
    await this.ExamSearchPage.closeFiltersBtn.click();
    await this.ExamSearchPage.filterBtn.click();
});
Then('the list of exams is updated correctly in accordance with the chosen Equipement filter', async function () {
    if(await this.ExamSearchPage.data_table.getNumberOfRows() === 0)
        throw new Error("Not enough testing data (Exam search table yielded no results for the tested filter)");
    const equipement_row1 = await this.ExamSearchPage.data_table.getCell("Équipement", 0);
    
    try {
        await this.expect(equipement_row1).toContainText(this.expected_result);
    } catch(e) {
        throw new Error("Found incorrect Equipement in resulted list. Expected: " + this.expected_result + " ; Found: " + equipement_row1);
    }
});


// TestID_139: Protocole field in Exam Search filtering displays as expected
Then('the Protocole field displays a list of protocole options when clicked', async function () {
    await this.ExamSearchPage.addFiltersBtn.click();
    const protocole_options = await this.ExamSearchPage.filtering_form.getOptions('Protocole');
    if(protocole_options < 2)
        throw new Error("Protocole field in Exam Search page is not showing options");
});
    

// TestID_140: Protocole field in Exam Search functions correctly
When('the user selects a Protocole filter for exam search and clicks Filtrer', async function () {
    this.option_to_test = 'AXIOM LUMINOS VO'; // the way select2 indexes the options makes this "select Bassin (AXIOM LUMINOS VO)"
    this.expected_result = 'Bassin';
    await this.ExamSearchPage.addFiltersBtn.click();
    await this.ExamSearchPage.filtering_form.fillField('Protocole', this.option_to_test);
    await this.ExamSearchPage.closeFiltersBtn.click();
    await this.ExamSearchPage.filterBtn.click();
});
Then('the list of exams is updated correctly in accordance with the chosen Protocole filter', async function () {
    if(await this.ExamSearchPage.data_table.getNumberOfRows() === 0)
        throw new Error("Not enough testing data (Exam search table yielded no results for the tested filter)");
    const protocole_row1 = await this.ExamSearchPage.data_table.getCell("Protocole", 0);
    
    try {
        await this.expect(protocole_row1).toContainText(this.expected_result);
    } catch(e) {
        throw new Error("Found incorrect Protocole in resulted list. Expected: " + this.expected_result + " ; Found: " + protocole_row1);
    }
});


// TestID_141: Manipulateur field in Exam Search filtering displays as expected
Then('the Manipulateur field displays a list of manipulateur options when clicked', async function () {
    await this.ExamSearchPage.addFiltersBtn.click();
    const protocole_options = await this.ExamSearchPage.filtering_form.getOptions('Manipulateur');
    if(protocole_options < 2)
        throw new Error("Manipulateur field in Exam Search page is not showing options");
});
    

// TestID_142: Manipulateur field in Exam Search functions correctly
When('the user selects a Manipulateur filter for exam search and clicks Filtrer', async function () {
    this.option_to_test = 'Manipulateur'; // the way select2 indexes the options makes this "select Bassin (AXIOM LUMINOS VO)"
    this.expected_result = 'Patient1';
    await this.ExamSearchPage.addFiltersBtn.click();
    try {
    await this.ExamSearchPage.filtering_form.fillField('Manipulateur', this.option_to_test);
    } catch(e) { throw new Error("Manipulateur field does not display the option being chosen for the test") };
    await this.ExamSearchPage.closeFiltersBtn.click();
    await this.ExamSearchPage.filterBtn.click();
});
Then('the list of exams is updated correctly in accordance with the chosen Manipulateur filter', async function () {
    if(await this.ExamSearchPage.data_table.getNumberOfRows() === 0)
        throw new Error("Not enough testing data (Exam search table yielded no results for the tested filter)");
    const manipulateur_row1 = await this.ExamSearchPage.data_table.getCell("Patient", 0);
    
    try {
        await this.expect(manipulateur_row1).toContainText(this.expected_result);
    } catch(e) {
        throw new Error("Manipulateur filter has filtered incorrectly");
    }
});


// TestID_143: Numero d'Examen field in Exam Search filtering displays as expected
Then("the Numéro d'Examen field allows the user to enter exam number", async function () {
    await this.ExamSearchPage.addFiltersBtn.click();
    const examNumberField = await this.ExamSearchPage.filtering_form.getFieldByLabel("Numéro d'Examen");
    if(!(await examNumberField.isVisible()))
        throw new Error("Numéro d'Examen field in Exam Search page is not displaying correctly (cannot see it or does not exist)");
});
    

// TestID_144: Numero d'Examen field in Exam Search functions correctly
When('the user inputs an exam number for exam search and clicks Filtrer', async function () {
    this.exam_number_to_test = 2000908
    await this.ExamSearchPage.addFiltersBtn.click();
    await this.page.getByText('12 derniers mois').click();
    await this.ExamSearchPage.filtering_form.fillField("Numéro d'Examen", this.exam_number_to_test);
    await this.ExamSearchPage.closeFiltersBtn.click();
    await this.ExamSearchPage.filterBtn.click();
});
Then('the list of exams is updated correctly in accordance with the chosen exam number', async function () {
    if(await this.ExamSearchPage.data_table.getNumberOfRows() === 0)
        throw new Error("Not enough testing data (Exam search table yielded no results for the tested filter)");
    
    const exam_number_row1 = await (await this.ExamSearchPage.data_table.getCell("Numéro d'examen", 0)).innerText();
    if(exam_number_row1 != this.exam_number_to_test) {
        throw new Error("Filtering by exam number did not work as intended. Tested input: " + this.exam_number_to_test + " ; Result found: " + exam_number_row1);
    }
});


// TestID_145: Alertes field in Exam Search filtering displays as expected
Then('the Alertes field displays 3 choices when clicked', async function (expectedData) {
    await this.ExamSearchPage.addFiltersBtn.click();
    
    const alertes_options = await this.ExamSearchPage.filtering_form.getOptions('Alertes');
    const expected = expectedData.raw().map(r => r[0]);

    const missing = expected.filter(item =>!alertes_options.includes(item));
    if(missing.length > 0)
        throw Error('Missing choices: ' + missing);
});


// TestID_146: Alertes field in Exam Search functions correctly
When('the user chooses an alert level for exam search and clicks Filtrer', async function () {
    const alert_to_test = 'Alerte niveau 1';
    this.expected_icon = 'icon-alert-warning';
    await this.ExamSearchPage.addFiltersBtn.click();
    await this.page.getByText('12 derniers mois').click();
    await this.ExamSearchPage.filtering_form.fillField("Alertes", alert_to_test);
    await this.ExamSearchPage.closeFiltersBtn.click();
    await this.ExamSearchPage.filterBtn.click();
});
Then('the list of exams is updated correctly in accordance with the alert level chosen', async function () {
    if(await this.ExamSearchPage.data_table.getNumberOfRows() === 0)
        throw new Error("Not enough testing data (Exam search table yielded no results for the tested filter)");

    const first_row = this.ExamSearchPage.data_table.table_rows.first();
    try {
        await this.expect(first_row.locator(`.${this.expected_icon}`)).toBeVisible();
    } catch (e) { throw new Error("The filtered list is missing the expected alert level icon"); };
});


// TestID_147: Patient field in Exam Search filtering displays as expeceted
Then('the Patient field displays {string} when clicked', async function (expectedMsg) {
    await this.ExamSearchPage.addFiltersBtn.click();
    const patientField = await this.ExamSearchPage.filtering_form.getFieldByLabel('Patient');
    if(!(await patientField.isVisible()))
        throw new Error("Numéro d'Examen field in Exam Search page is not displaying correctly (cannot see it or does not exist)");

    const displayedMsg = (await this.ExamSearchPage.filtering_form.getOptions('Patient'))[0];
    if(displayedMsg != expectedMsg)
        throw new Error("Expected message: " + expectedMsg + " ; Displayed message: " + displayedMsg);
});


// TestID_148: Patient field lookup options
Then('the Patient field displays dynamic lookup options as the user types', async function () {
    const test_input = 'Eva';

    await this.ExamSearchPage.addFiltersBtn.click();
    const patientField = await this.ExamSearchPage.filtering_form.getFieldByLabel('Patient');

    const select2Dropdown = this.page.locator('#select2-drop');
    try {
        await patientField.locator('..').click();
        await (select2Dropdown).getByRole('textbox').fill(test_input);
        await (select2Dropdown).locator('input.select2-input:not([class*="select2-active"])').waitFor('visible');
    } catch(e) { throw new Error("Problem with select2 field, Patient field in Exam Search filtering"); }
    
    let result = await select2Dropdown.locator('.select2-results li').allInnerTexts();
    result = result.filter(option => option && option.trim() !== "" && option.trim().toLowerCase() !== "undefined (undefined)");

    const isRelevant = result.every(s => s.toLowerCase().includes(test_input.toLowerCase()));
    if(!isRelevant)
        throw new Error("The lookup results are not relevant / dynamic lookup failed");
});


// TestID_149: Date de naissance field calendar visibility
When('the user clicks the Date de naissance field for exam search filtering', async function () {
    await this.ExamSearchPage.addFiltersBtn.click();
    const date_field = await this.ExamSearchPage.filtering_form.getFieldByLabel('Date de naissance');
    if(!(await date_field.isVisible()))
        throw new Error('Date de naissance field is not visible');
    await date_field.click();
});
Then('Date de naissance calendar becomes visibile', async function () {
    try {
        await this.expect(this.ExamSearchPage.calendarDays).toBeVisible();
    } catch (e) { throw new Error("Calendar is not displayed graphically as expected") };
});

