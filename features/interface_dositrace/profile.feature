Feature: Functional profile interface
    Background:
        Given the user is on the profile page
    
    @TestID_26
    Scenario: Page shows details on user and expected elements
        Then the user can consult profile details
        Then the user can start modifying  profile details by clicking the pen icon
        Then the user can see language and theme in parameters section
        Then the user can see a change password button

    @TestID_27
    Scenario: Change language
        When the user chooses a different language
        Then the language changes

    @skip
    @TestID_28
    Scenario: Affichage/Ergonomie

    @TestID_29
    Scenario: Edit profile page
        When the user clicks Edit icon
        Then the user is redirected to profile modification page
    
    @TestID_30
    Scenario: The password change form displays all required fields
        When the user opens the Change Password page
        Then the form should contain a field for the old password
        And the form should contain a field for the new password
        And the form should contain a field for confirming the new password