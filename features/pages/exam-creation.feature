Feature: Exam creation page functionality
    Background:
        Given the user is on the Exam Creation page
    
    @TestID_294
    Scenario: Modalité field in Exam Creation displays correctly
        When the user clicks the "Modalité" field
        Then the user can choose one of many listed Modalités
    
    @TestID_295
    Scenario: Equipement field in Exam Creation displays correctly
        When the user clicks the "Equipement" field
        Then the user can choose one of many listed Equipements

    @TestID_296
    Scenario: Protocoles field in Exam Creation displays correctly
        When the user clicks the "Protocoles DOSITRACE" field
        Then the user can choose one of many listed Protocoles

    @TestID_297
    Scenario: Date field in Exam Creation displays correctly
        When the user clicks the "Date" field
        Then the user can manually enter an exam creation date
        Then a calendar is displayed allowing the user to choose an exam creation date graphically

    @TestID_298
    Scenario: Heure field in Exam Creation displays correctly
        When the user clicks the "Heure" field
        Then an input bar allowing to choose Exam Creation time becomes visibile

    @TestID_299
    Scenario: 