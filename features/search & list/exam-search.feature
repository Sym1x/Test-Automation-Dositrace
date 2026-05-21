Feature: Exam search page functionality
    Background:
        Given the user is on the Exam Search page
    
    @TestID_117
    Scenario: Calendar visibility in Exam Search
        When the user clicks the date field
        Then a calendar becomes visible allowing to choose the start date and end date

    @TestID_118
    Scenario: Date field user experience
        Then the user can enter dates manually
        Then the user can enter dates using the calendar
    
    @TestID_121
    Scenario: Affichage/Ergonomie
        Then ergonomie test

    @TestID_122
    Scenario: Date buttons functionality
        Then the date field is updated in accordance with the button clicked
   
    @TestID_123
    Scenario: Advanced Filtering sidebar displays correctly
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
    Scenario: Selecting and refining filters for Exam Search
        When the user selects a filter for the exam search
        Then a field listing the corresponding filter options becomes visible

    @TestID_127
    Scenario: Affichage/Ergonomie
        Then ergonomie test

    @TestID_128
    Scenario: Heure filter works as intended for Exam Search
        Then the user can select the hour interactively by sliding the two handles of the Heure field to the right and to the left

    @TestID_129
    Scenario: Heure filter in Exam Search filtering functions correctly
        When the user selects the hour for exam search and clicks Filtrer
        Then the list of exams is updated correctly, displaying an hour within the range chosen

    @TestID_130
    Scenario: Affichage/Ergonomie
        Then ergonomie test

    @TestID_131
    Scenario: Global search along columns in Exam Search
        Then the user can search globally in the exam search list using keywords

    @TestID_132
    Scenario: Affichage/Ergonomie
        Then ergonomie test

    @TestID_133
    Scenario: UF field in Exam Search filtering displays as expected
        Then the UF field displays UF options for exam search when clicked

    @TestID_134
    Scenario: UF filter in Exam Search filtering functions correctly
        When the user selects an UF filter for exam search and clicks Filtrer
        Then the list of exams is updated correctly in accorandance with the chosen UF filter

    @TestID_135
    Scenario: Modalité field in Exam Search filtering displays as expected
        Then the Modalité field displays 11 different options when clicked
    
    @TestID_136
    Scenario: Modalité field in Exam Search filtering functions correctly
        When the user selects a Modalité filter for exam search and clicks Filtrer
        Then the list of exams is updated correctly in accordance with the chosen Modalité filter

    @TestID_137
    Scenario: Equipement field in Exam Search filtering displays as expected
        Then the Equipement field displays a list of equipment options when clicked
    
    @TestID_138
    Scenario: Equipement field in Exam Search filtering functions correctly
        When the user selects a Equipement filter for exam search and clicks Filtrer
        Then the list of exams is updated correctly in accordance with the chosen Equipement filter

    @TestID_139
    Scenario: Protocole field in Exam Search filtering displays as expected
        Then the Protocole field displays a list of protocole options when clicked
    
    @TestID_140
    Scenario: Protocole field in Exam Search filtering functions correctly
        When the user selects a Protocole filter for exam search and clicks Filtrer
        Then the list of exams is updated correctly in accordance with the chosen Protocole filter

    @TestID_141
    Scenario: Manipulateur field in Exam Search filtering displays as expected
        Then the Manipulateur field displays a list of manipulateur options when clicked
    
    @TestID_142
    Scenario: Manipulateur field in Exam Search filtering functions correctly
        When the user selects a Manipulateur filter for exam search and clicks Filtrer
        Then the list of exams is updated correctly in accordance with the chosen Manipulateur filter

    @TestID_143
    Scenario: Numero d'Examen field in Exam Search filtering displays as expected
        Then the Numéro d'Examen field allows the user to enter exam number
    
    @TestID_144
    Scenario: Numero d'Examen field in Exam Search filtering functions correctly
        When the user inputs an exam number for exam search and clicks Filtrer
        Then the list of exams is updated correctly in accordance with the chosen exam number

    @TestID_145
    Scenario: Alertes field in Exam Search filtering displays as expected
        Then the Alertes field displays 3 choices when clicked
            | Alerte niveau 1      |
            | Alerte niveau 2      |
            | Alerte niveau 1 et 2 |
    
    @TestID_146
    Scenario: Alertes field in Exam Search filtering functions correctly
        When the user chooses an alert level for exam search and clicks Filtrer
        Then the list of exams is updated correctly in accordance with the alert level chosen

    @TestID_147
    Scenario: Patient field in Exam Search filtering displays as expeceted
        Then the Patient field displays "Veuillez saisir 2 caractères minimum" when clicked

    @TestID_148
    Scenario: Patient field lookup options
        Then the Patient field displays dynamic lookup options as the user types

    @TestID_149
    Scenario: Date de naissance field calendar visibility
        When the user clicks the Date de naissance field for exam search filtering
        Then Date de naissance calendar becomes visibile