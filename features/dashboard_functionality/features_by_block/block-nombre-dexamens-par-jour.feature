Feature: Nombre dexamens par jour block functionality
    Background:
        Given the user is on the Dashboard containing the "Nombre d'examens par jour" block


    @TestID_85
    Scenario: Monthly exam count matches real data
        When the user checks the number of exams for the year 2025 from the block
        Then the number of exams should match the one on the Exams page for that year
    
    #@TestID_86 nocando
    
    @TestID_88
    @TestID_87
    Scenario: User navigates to the Examens menu by clicking a chart bar
        When the user clicks the sixth bar of the chart
        Then the user should be redirected to the Examens search page

    @TestID_89
    Scenario: Affichage/Ergonomie
        Then ergonomie test

    @TestID_90
    Scenario: User opens the chart export menu
        When the user clicks the chart export button
        Then the user should see 3 chart export options

    #@TestID_91 not doable, we'll see