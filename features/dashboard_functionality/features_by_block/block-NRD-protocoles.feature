Feature: NRD Protocoles block functionality
    Background:
        Given the user is on the Dashboard containing the "NRD/NRI local" block

    @TestID_78
    Scenario: NRD/NRI protocol block displays top 6 most frequent protocols
        Then the NRD/NRI local block should display NRD data for the 6 most frequent protocols of the selected month
    
    @TestID_79
    Scenario: Clicking a protocol redirects to filtered exams list
        When the user clicks on a protocol inside the NRD/NRI local block
        Then the user should be redirected to the Examens page
        #And the exams should be filtered by the selected protocol
    
    @TestID_80
    Scenario: Le nombre d’examens affichés après redirection correspond à la valeur NRD du tableau de bord
        When the user reads the exam count for the first protocol in the NRD block and clicks that protocol
        Then the user should see exactly that number of exams in the resulting page
        
    #@TestID_81 not doable