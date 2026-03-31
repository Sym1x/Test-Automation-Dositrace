@noauth
Feature: Password recovery functionality
    Background:
        Given the user is on the password recovery page

    @TestID_7
    Scenario: Page shows all password recovery elements
        Then the page should contain a login field
        Then the page should contain an email field

    @TestID_8
    Scenario: Unsuccessful password recovery
        When the user enters invalid login or email
        Then the user get an error message "login ou email incorrect"