Feature: NRD Protocoles block functionality
    Background:
        Given the user is on an empty Dashboard
        And the Dashboard contains the "NRD/NRI local" block

    @TestID_78
    Scenario: NRD/NRI protocol block displays top 6 most frequent protocols
        Then the NRD/NRI local block should display NRD data for the 6 most frequent protocols of the selected month
    
    @TestID_79
    Scenario: Clicking a protocol redirects to filtered exams list
        When the user clicks on a protocol inside the NRD/NRI local block
        Then the user should be redirected to the Examens page
        #And the exams should be filtered by the selected protocol
    #@TestID_80
    #@TestID_81 not doable