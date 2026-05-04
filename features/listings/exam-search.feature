Feature: Exam search page functionality
    Background:
        Given the user is on the Exam Search page
    
    @TestID_117
    Scenario: Calendar visibility in Exam Search
        When the user clicks the date field
        Then a calendar becomes visible allowing to choose the start date and end date

    @TestID_118
    Scenario: Date field functionality
        Then the user can enter dates manually
        Then the user can enter dates using the calendar
    
    #@TestID_121 Ergonomie

    @TestID_122
    Scenario: Date buttons functionality
        Then the date field is updated in accordance with the button clicked
   
    @TestID_123
    Scenario: Filters sidebar displays correctly
        When the user clicks "Ajouter des filtres" for searching exams
        Then the user can select from the filters:
            |   UF                  |
            |   Equipement          |
            |   Heure               |
            |   Numéro d'examen     |
            |   Modalité            |
            |   Patient             |
            |   Protocole           |
            |   Alertes             |
            |   Opérateur           |
            |   Date de naissance   |
            |   Etat                |
            |   Patient à risques   |
            |   Alertes traitées    |

    @TestID_125
    Scenario: Selecting and refining filters
        When the user clicks a filter
        Then a field listing the corresponding filter options becomes visible

    #@TestID_127 Ergonomie
