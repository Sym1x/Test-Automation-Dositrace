Feature: Password recovery functionality
    Background:
        Given the user is on the password recovery page

    @TestID_8
    Scenario: Page shows all password recovery elements
        Then the page should contain a login field
        Then the page should contain an email field

    @TestID_9
    Scenario: Unsuccessful password recovery
        When the user enters invalid login or email
        Then the users get an error message "login ou email incorrect"