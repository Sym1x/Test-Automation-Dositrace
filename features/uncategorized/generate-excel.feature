Feature: Excel generation interface
    The user can configure filters to generate an Excel file.

    Background:
        Given the user is on the excel generation page

    @TestID_539
    Scenario: Specifying period
        When the period field is visible
        Then the user can choose one of the 4 predefined periods
        And the user can specify a period manually with the calendar widget
    @TestID_540
    Scenario: Selecting a UF from the dropdown
        When the user clicks on the UF field
        Then a dropdown list of UFs appears
        And the user can search or select a UF
    @TestID_541
    Scenario: Checking presence of all UFs from configuration
        When the user opens the UF dropdown
        Then all UFs registered in Configuration Center are present
    @TestID_542
    Scenario: Selecting an equipment
        When the user clicks on the equipment field
        Then a dropdown list of equipments appears
        And the user can select an equipment
    @TestID_543
    Scenario: Selecting a doctor
        When the user clicks on the doctor field
        Then a dropdown list of doctors appears
        And the user can select a doctor
    @TestID_544
    Scenario: Selecting a modality
        When the user clicks on the modality field
        Then a dropdown list of modalities appears
        And the user can select a modality








    @skip
    Scenario: datatable in different pages
        Then the datatable object works on all pages