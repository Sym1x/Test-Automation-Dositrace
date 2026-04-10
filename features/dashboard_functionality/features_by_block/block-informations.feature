Feature: Informations block functionality
    Background:
        Given the user is on an empty Dashboard
        And the Dashboard contains the "Informations" block


    @TestID_82
    Scenario: Functional Informations block
        Then the Informations block should be functional
        