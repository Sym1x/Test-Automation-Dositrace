Feature: Worklist block functionality
    Background:
        Given the user is on an empty Dashboard
        And the Dashboard contains the "Worklist" block

    @TestID_52
    Scenario: Period filter effect on Worklist
        When the user changes period
        Then the period filter does not affect the worklist block

    @TestID_53
    Scenario: Worklist shows only the next 5 exams
        Then the worklist contains at most 5 exams

    #@TestID_54 ergonomie

    @TestID_55
    Scenario: Each worklist item displays required fields
        Then each worklist item shows heure, patient, and equipement
    
    @TestID_56
    Scenario: Worklist window redirection from the exams list
        When The user clicks on the "Liste complète des examens planifiés" link
        Then the Worklist window is displayed