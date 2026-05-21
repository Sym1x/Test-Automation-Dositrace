Feature: Historique Statistique block functionality
    Background:
        Given the user is on the Dashboard containing the "Historique statistique" block

    @TestID_60
    Scenario: Dashboard shows only the last 2 statistics
        Then the 2 most recent statistics are shown

    @TestID_61
    Scenario: Access predefined statistics from dashboard
        When the user clicks on "Voir l'ensemble des statistiques"
        Then the user should be redirected to the statistics menu
    
    
    @TestID_62
    Scenario: Affichage/Ergonomie
        Then ergonomie test