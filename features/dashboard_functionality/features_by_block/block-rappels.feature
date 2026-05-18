Feature: Rappel block functionality
    Background:
        Given the user is on the Dashboard containing the "Rappels" block

    @TestID_63
    Scenario: Unprocessed alerts count is correct
        Then the displayed number of "Alertes non traitées" should match the real number of unprocessed alerts
    
    @TestID_64
    Scenario: Access alerts menu from unprocessed alerts block
        When the user click on "Alertes non traitées"
        Then the user should be redirected to the Alerts menu
        
    @TestID_65
    Scenario: Alerts count matches between dashboard and alerts page
        When the user navigates to the alerts list
        Then the number of displayed alerts should match the dashboard counter for unprocessed alerts
    
    @TestID_66
    Scenario: Unlinked protocols count is correct
        Then the displayed number of "Protocoles non reliés" should match the real number of unlinked protocols
    
    @TestID_67
    Scenario: Access protocol correspondence table from unlinked protocols block
        When the user clicks on "Protocoles non reliés"
        Then the user should be redirected to the protocol correspondence table
    
    @TestID_68
    Scenario: Unlinked members count is correct
        Then the displayed number of "Membres non reliés" should match the real number of unlinked members
    
    @TestID_69
    Scenario: Access member mapping page from unlinked members block
        When the user clicks on "Membres non reliés"
        Then the user should be redirected to the personnel association page in Configuration Center
    
    @TestID_70
    Scenario: Patients without exams count is correct
        Then the displayed number of "Patients sans examens" should match the real number of patients without exams
    
    @TestID_71
    Scenario: Access patients without exams page from reminders block
        When the user clicks on "Patients sans examens"
        Then the user should be redirected to the patients without exams page in the Patient menu