Feature: Patient sheet displaying patient informations
    Background:
        Given the user is viewing a patient sheet page

    @TestID_236
    Scenario: Patient header displays correctly
        Then the patient header contains the informations
            |   Date de naissance   |
            |   Identifiant         |
            |   E                   |
            |   Sexe                |

    #@TestID_237 Ergonomie

    @adolescent
    @TestID_238
    Scenario: Additional information for young patients
        Then "Statut pédiatrique" is visible for patients under 18