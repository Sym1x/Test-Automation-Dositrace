@noauth
Feature: Login functionality
    Background:
        Given the user is on the login page

    @TestID_4
    Scenario: Page shows all login elements
        Then the page should have a login field
        And the page should have a password field
        And the page should have a connexion button
        And the page should have a password recovery link

    @TestID_5
    Scenario: Successful login
        When the user enters valid credentials
        Then the user should be logged in successfully

    @TestID_6
    Scenario: Unsuccessful login
        When the user enters invalid credentials
        Then the user gets an error message "Login ou mot de passe incorrect"

    @skip
    Scenario: Forgot password
        When the user clicks password recovery link
        Then the password recovery page should load successfully