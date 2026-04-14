Feature: Worklist page functionality
    Background:
        Given the user is on the Worklist page

    @TestID_92
    Scenario: Show exams for today vs for the next 7 days
        Then the user can choose between displaying the exams set for today or the exams set for the next 7 days
    
    @TestID_93
    Scenario: Add filters
        When the user clicks "Ajouter des filtres"
        Then the user accesses a filters section containing "UF" and "Equipement"
    
    @TestID_94
    Scenario: Clicking UF filter
        When the user clicks the UF filter
        Then a field listing the corresponding UF items becomes visible
    
    @TestingID_101
    Scenario: Clicking the Equipement filter
        When the user clicks the Equipement filter
        Then a field listing the corresponding Equipement items becomes visible
    
    @TestID_95
    @TestID_97
    Scenario: Searching filters
        When the user is selecting a UF or Equipement filter
        Then the user can search by inputting its name
    
    #@TestID_96 Ergonomie

    @TestID_98
    Scenario: UF filter functionality
        When the user chooses a UF filter and clicks "rechercher"
        Then the list is updated with the correct exams
    #todo: add a Given that makes sure the tested exam is there
    @TestID_102
    Scenario: Equipement filter functionality
        When the user chooses a Equipement filter and clicks "rechercher"
        Then the list is updated with the correct exams

    @skip
    @TestingID_99
    Scenario: Removing the UF field
        When the user has selected a UF filter
        Then the user can remove the selected UF field

    #@TestID_100 Ergonomie

    @TestID_103
    Scenario: Removing the Equipement field
        When the user has selected an Equipement filter
        Then the user can remove the Equipement field

    #@TestID_104 Ergonomie

    @testing
    @TestID_104
    @TestID_105
    Scenario: Filter exams for today vs for the next 7 days
        When the user chooses between displaying the exams set for today or the exams set for the next 7 days
        Then the list of exams is updated accordingly

    @testing
    @TestID_106
    Scenario: Exam sheet redirection
        When the user clicks a listed exam
        Then the user is redirected to a view of detailed information on the exam

    @TestID_108
    Scenario: Changing the number of elements to display
        Then the user is able to change the number of exams displayed in the list