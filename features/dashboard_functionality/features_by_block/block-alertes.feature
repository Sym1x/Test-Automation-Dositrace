Feature: Alertes block functionality
    Background:
        Given the user is on an empty Dashboard
        And the Dashboard contains the "Alertes" block

    @TestID_72
    Scenario: Alerts update after selecting period filter
        When the user clicks on a period filter
        Then the alerts table should be updated with the expected rows for that filter
    
    @TestID_73
    Scenario: Only last 5 alerts are displayed
        Then the alerts table should display at most 5 alerts
    
    @TestID_74
    Scenario: Each alert row matches table header structure
        Then each alert row should have the same number of columns as the table header

    @TestID_75
    Scenario: Access alerts menu from dashboard alerts block
        When the user clicks on the alerts block
        Then the user should be redirected to the Alerts menu
    
    #@TestID_76 ergonomie
    
    @TestID_77
    Scenario: Navigating between alert pages using arrows updates the table content
        When the user navigates to the next alerts page using the right arrow or left arrow
        Then the alerts table content should change between pages