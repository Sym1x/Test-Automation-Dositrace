Feature: Password recovery functionality
    Background:
        Given the user is on the password recovery page

    Scenario: Page shows all password recovery elements
        Then the page should contain a login field
        Then the page should contain an email field

    Scenario: Unsuccessful password recovery
        When the user enters invalid login or email
        Then the users get an error message "login ou email incorrect"