Feature: Liens Utiles block functionality
    Background:
        Given the user is on an empty Dashboard
        And the Dashboard contains the "Lien utiles" block

    @TestID_57
    Scenario: Access exam search from Lien utiles
        When the user clicks on "Accéder aux examens" in the useful links section
        Then the user should be redirected to the exam search page for the selected month
    
    @TestID_58
    Scenario: Access patient search from Lien utiles
        When the user clicks on "Accéder aux patients" in the useful links section
        Then the user should be redirected to the patient search page for the selected month
    
    #@TestID_59 ergonomie
