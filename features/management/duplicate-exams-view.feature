Feature: Duplicate exams view page functionality
    Background:
        Given the user is on the View Duplicate Exams page
    
    @TestID_232
    Scenario: Fill principal exam fields
        Then the user can fill the required principal exam fields

    @TestID_233
    Scenario: Displaying patients after submitting information
        When the user fills patient fields for Examen Principal
        And the user clicks "Rechercher patient"
        Then a list of patients is displayed in accordance with the informations given
