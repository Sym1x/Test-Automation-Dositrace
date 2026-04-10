Feature: Filters on the Dositrace Dashboard
    Background:
        Given the user is on the Dashboard

    @TestID_49
    Scenario: Presence of 2 filters
        Then 2 possible filters are visible

    @TestID_50
    Scenario: Presence of 4 different periods to filter from
        Then 4 different periods are visible

    @TestID_51
    Scenario: UF filter options
        When the user clicks the UF filter
        Then the user can select to filter by all UF or choose a specific UF