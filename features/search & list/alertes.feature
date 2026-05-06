Feature: Alerts page functionality
    Background:
        Given the user is on the Alerts page
    
    @TestID_438
    Scenario: Filtering alerts by period
        Then the user can specify a period bounding the displayed alerts

    @TestID_439
    Scenario: Searching from the "Filtre" field
        Then the user can search in the "Filtre" field

    @TestID_440
    Scenario: Advanced Filtering sidebar displays correctly
        When the user clicks "Ajouter des filtres" for alerts
        Then the the filtering sidebar displays the filters:
            |   Niveau         |
            |   Traité         |
            |   Type alerte    |
            |   Modalité       |
            |   Equipement     |
            |   Validateur     |

    @TestID_443
    @TestID_444
    Scenario: Date field user experience
        When the user clicks the Date field for filtering alerts
        Then a graphical calendar is displayed
        Then the user is able to select dates manually or graphically

    #@TestID_445 Ergonomie

    @TestID_446
    Scenario: Niveau field displays correctly
        When the user selects "Niveau" field
        Then the options "1" and "2" are displayed
    
    @TestID_447
    Scenario: Filtering works correctly
        When the user clicks the Filtrer button
        Then the alerts list is updated in accordance with the filters chosen

    @TestID_448
    Scenario: Global search in alerts list
        Then the user can search globally in the alerts list using keywords
    
    @TestID_449
    Scenario: Changing number of alerts listed
        Then the user can change between listing 10, 25, 50 or 100 alerts per page
    
    @TestID_450
    Scenario: Sorting the alerts list
        Then the user can sort the alerts list by clicking a column header

    @TestID_451
    Scenario: Pagination works in the alerts list
        Then the user can paginate through the list by clicking the arrows

