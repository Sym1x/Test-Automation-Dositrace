Feature: Alertes block functionality
    Background:
        Given the user is on the Dashboard containing the "Alertes" block

    @TestID_72
    Scenario: Alerts update when filtering by month
        When the user clicks on a button to change month
        Then the alerts table should be updated correctly
    
    @TestID_73
    Scenario: Only last 5 alerts are displayed
        Then the alerts table should display at most 5 alerts
    
    @TestID_74
    Scenario: Each alert row matches table header structure
        Then each alert row should strictly follow the corresponding headers
            | Date d'examen |
            | Niveau        |
            | Dépassement   |
            | Patient(s)    |

    @TestID_75
    Scenario: Access alerts menu from dashboard alerts block
        When the user clicks on the alerts block
        Then the user should be redirected to the Alerts menu
    
    @TestID_76
    Scenario: Affichage/Ergonomie
        Then ergonomie test
    
    @TestID_77
    Scenario: Navigating between alert pages using arrows updates the table content
        When the user navigates to the next alerts page using the right arrow or left arrow
        Then the alerts table content should change between pages