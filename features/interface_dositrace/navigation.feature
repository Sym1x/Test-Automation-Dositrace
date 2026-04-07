Feature: Functional navigation interface
    Background:
        Given the user is on Dositrace site

    @TestID_9
    Scenario: Navigation panel untoggled view
        Then 11 elements for navigation are visible
        And the user can navigate through them

    @TestID_10
    Scenario: Navigation panel toggled view
        When the user clicks toggle button
        Then the navigation panel switches between toggled and untoggled view
    
    @TestID_11
    Scenario: Accessing Dositrace dashboard
        When the user clicks DOSITRACE
        Then the user accesses the Dashboard

    @TestID_12
    Scenario: Accessing user manual
        When the user clicks ?
        Then the user accesses Dositrace's User Manual
        And the manual contains 9 cards
        And each manual card takes to a page successfully

    @TestID_13
    Scenario: Domain header bar visibility
        When the user clicks the downwards arrow
        Then a header bar for navigating between domains is toggled
        And it contains "SSO-Dositrace-Configuration Center"
    
    @testing
    @TestID_15
    Scenario: User info dropdown visibility
        When the user clicks on their name or icon
        Then a user info menu is toggled
        And it contains a link to profile
        And it contains a link to disconnect
    