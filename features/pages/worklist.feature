Feature: Worklist page functionality
    Background:
        Given the user is on the Worklist page

    @testing
    @TestID_92
    Scenario: Show worklist exams for today vs for the next 7 days
        Then the user can choose between displaying the exams set for today or the exams set for the next 7 days
    
    @TestID_93
    Scenario: Filters sidebar displays correctly
        When the user clicks "Ajouter des filtres" for worklist
        Then the user accesses a filters section containing "UF" and "Equipement"
    
    @TestID_94
    Scenario: Clicking UF filter
        When the user clicks the UF filter
        Then a field listing the corresponding UF items becomes visible
    
    @TestID_101
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
    @TestID_99
    Scenario: Removing the UF field
        When the user has selected a UF filter
        Then the user can remove the selected UF field

    #@TestID_100 Ergonomie

    @TestID_103
    Scenario: Removing the Equipement field
        When the user has selected an Equipement filter
        Then the user can remove the Equipement field

    #@TestID_104 Ergonomie

    @TestID_104
    @TestID_105
    Scenario: Filter exams for today vs for the next 7 days
        When the user chooses between displaying the exams set for today or the exams set for the next 7 days
        Then the list of exams is updated accordingly

    @TestID_106
    Scenario: Exam sheet redirection
        When the user clicks a listed exam
        Then the user is redirected to a view of detailed information on the exam

    @TestID_108
    Scenario: Changing the number of elements to display
        Then the user is able to change the number of exams displayed in the list

    #todo
    @TestID_109
    Scenario: Searching globally
        Then the user can search through exams globally

    @TestID_110
    Scenario: Sorting worklist by column
        Then the user can sort the listed exams by clicking a column name
    
    #todo
    @TestID_111
    Scenario: Urgent exams
        Then the table must correctly list urgent exams

    @TestID_113
    Scenario: Viewing patient
        When the user clicks the name of a patient in the worklist
        Then the user is redirected to view the sheet of the patient

    @TestID_114
    Scenario: Viewing exam
        When the user clicks the number of a patient
        Then the page is redirected to exam page

    @TestID_115
    Scenario: Viewing exam row details
        When the user clicks the green tingy
        Then the details of the exam row are shown

    #@TestID_116 Ergonomie