Feature: Patient list page functionality
    Background:
        Given the user is on the Patient List page
    
    @TestID_214
    Scenario: Etat field displays correctly
        Then "Etat" search box is visible
        Then "Actifs" and "Supprimés"  options are available

    @TestingID_215
    Scenario: Etat field functions correctly
        Then the user can filter by Etat correctly

    #TestingID_216 Ergonomie

    @TestingID_217
    Scenario: Filters sidebar displays correctly
        When the user clicks "Ajouter des filtres" for patient list
        Then the user accesses a filters section containing "Date de naissance" and "Sexe"

    @TestingID_220
    Scenario: Dropdown for the Sexe field displays correctly
        When the user clicks the Sexe field to filter
        Then a search field along the options (Hommes, femmes, Non définis et Tous) become visible 

    @TestingID_221
    Scenario: The Sexe field filters correctly
        When the user filters by Sexe
        Then the patient list is updated in accordance with the chosen Sexe

    #@TestingID_222 Ergonomie
    @TestingID_223
    Scenario: Date de naissance input calendar displays correctly
        When the user clicks the Date de naissance field to filter
        Then a calender becomes visible to choose date of birth

    #@TestingID_224 Ergonomie

    @TestingID_225
    Scenario: The Date de naissance field filters correctly
        When the user filters by Date de naissance
        Then the patient list is updated in accordance with the chosen Date

    @TestingID_226
    Scenario: "Réinitialiser" button functions correctly
        When the user has filters enabled and clicks the Réinitialiser button
        Then the filters are reset

    @TestingID_228
    Scenario: Global search in patient list
        Then the user can search globally along the columns of the patient table