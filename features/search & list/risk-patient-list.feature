Feature: Risk patient page functionality
    Background:
        Given the user is on the Risk Patient page
    
    @TestID_476
    Scenario: Table for risk patients shows all classic components
        Then risk patient table pagination works correctly
        Then risk patient table length works correctly
        Then risk patient table global search works correctly
        Then the user can sort rows by clicking column headers in risk patient table

    @TestID_477
    Scenario: Selecting patients to make visualizations
        When the user selects a risk patient
        Then the Visualisation Examen and Visualisation Patient buttons become functional
