Feature: Rappel block functionality
    Background:
        Given the user is on the Dashboard containing the "Rappels" block

    @TestID_63
    Scenario: Unprocessed alerts field is functional
        Then the field "Alertes non traitées" should correspond to a real functional link
    
    @TestID_64
    Scenario: Access alerts menu from unprocessed alerts block
        When the user clicks on "Alertes non traitées"
        Then the user should be redirected to the Alerts menu from Rappels block

    @TestID_65
    Scenario: Alerts count matches between dashboard and alerts page
        When the user navigates to the alerts list
        Then the number of displayed alerts should match the dashboard counter for unprocessed alerts
    
    @TestID_66
    Scenario: Unlinked protocols field is functional
        Then the field "Protocoles non reliés" should correspond to a real functional link
    
    @TestID_67
    Scenario: Access protocol correspondence table from unlinked protocols block
        When the user clicks on "Protocoles non reliés"
        Then the user should be redirected to the protocol correspondence table
    
    @TestID_68
    Scenario: Unlinked members field is functional
        Then the field "Membres non reliés" should correspond to a real functional link
    
    @TestID_69
    Scenario: Access member mapping page from unlinked members block
        When the user clicks on "Membres non reliés"
        Then the user should be redirected to the personnel association page in Configuration Center
    
    @TestID_70
    Scenario: Patients without exams field is functional
        Then the field "Patients sans examens" should correspond to a real functional link
    
    @TestID_71
    Scenario: Access patients without exams page from reminders block
        When the user clicks on "Patients sans examens"
        Then the user should be redirected to the patients without exams page in the Patient menu