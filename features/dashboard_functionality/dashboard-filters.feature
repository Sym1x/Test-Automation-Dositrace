Feature: Filters on the Dositrace Dashboard
    Background:
        Given the user is on the Dashboard

    @TestID_49
    Scenario: Presence of 2 filters
        Then 2 possible filters are visible

    @TestID_50
    Scenario: Presence of 4 different periods to filter from
        Then 4 different periods are visible and CurrentMonth is selected by default
            | CurrentMonth  |
            | PreviousMonth |
            | CurrentYear   |
            | PreviousYear  |

    @TestID_51
    Scenario: UF filter options
        Then the user can select to filter by all UF or choose a specific UF