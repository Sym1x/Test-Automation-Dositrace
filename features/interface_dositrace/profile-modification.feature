Feature: Functional profile modification interface
    @TestID_31
    Scenario: Presence of 10 input fields with good display and ergonomics
        Then there are 10 input fields visible on the profile edit form

    @TestID_32
    Scenario: Modifying profile information and saving
        When the user modifies information in the fields
        And the user clicks on Modifier to save
        Then a confirmation message is displayed

    @TestID_34
    Scenario: Cancel modification with Retour button
        When the user modifies information in the fields
        And the user clicks on the Retour button
        Then the modification is cancelled and the user returns to the user profile