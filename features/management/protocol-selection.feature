Feature: Protocol selection and favoring page functionality
    Background:
        Given the user is on the protocol selection and favoring page

    @testing
    @TestID_361
    Scenario: Filtrer button works correctly, updating the list of protocols with the correct chosen criteria
        When the user selects Modalité and Equipement criteria and clicks Filtrer
        Then the list of protocols is updated in accordance with the criteria chosen

