Feature: Patient list page functionality
    Background:
        Given the user is on the Patient List page
    
    @TestID_214
    Scenario: Etat field displays correctly
        Then "Etat" search box is visible
        Then "Actifs" and "Supprimés"  options are available

    @TestID_215
    Scenario: Etat field functions correctly
        Then the user can filter by Etat correctly

    #TestID_216 Ergonomie

    @TestID_217
    Scenario: Filters sidebar displays correctly
        When the user clicks "Ajouter des filtres" for patient list
        Then the user accesses a filters section containing "Date de naissance" and "Sexe"

    @TestID_220
    Scenario: Dropdown for the Sexe field displays correctly
        When the user clicks the Sexe field to filter
        Then a search field along the options (Hommes, femmes, Non définis et Tous) become visible 

    @TestID_221
    Scenario: The Sexe field filters correctly
        When the user filters by Sexe
        Then the patient list is updated in accordance with the chosen Sexe

    #@TestID_222 Ergonomie
    
    @TestID_223
    Scenario: Date de naissance input calendar displays correctly
        When the user clicks the Date de naissance field to filter
        Then a calender becomes visible to choose date of birth

    #@TestID_224 Ergonomie

    @TestID_225
    Scenario: The Date de naissance field filters correctly
        When the user filters by Date de naissance
        Then the patient list is updated in accordance with the chosen Date

    @TestID_226
    Scenario: "Réinitialiser" button functions correctly
        When the user has filters enabled and clicks the Réinitialiser button
        Then the filters are reset

    @TestID_228
    Scenario: Global search in patient list
        Then the user can search globally along the columns of the patient table

    @TestID_229
    Scenario: Sorting patient list by column
        Then the user can sort the patient list by clicking a column name

    @TestID_230
    Scenario: Navigating the patient list
        Then the user can use the arrows to navigate the patient list
    
    #@TestID_231 Ergonomie
    
    @TestID_232
    Scenario: Choosing number of patients to list in one page
        Then the user can choose to list 10 or 25 or 50 or 100 patients 

    @TestID_233
    Scenario: Viewing patients
        When the user clicks the name of a patient in the patient list page
        Then the user is redirected to view the sheet of the patient
    
    #@TestID_234 Ergonomie

