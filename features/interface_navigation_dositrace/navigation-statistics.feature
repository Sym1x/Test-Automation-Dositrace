Feature: Functional navigation interface in Statistics pages
    Background:
        Given the user is on the Statistics Portal

    @TestID_580
    @TestID_583
    Scenario: Presence of different types of statistical charts
        Then 8 distinct charts are visible
            | Dose en fonction des protocoles       |
            | Nombre d'examens par protocole        |
            | Dose en fonction des équipements      |
            | Dose en fonction des opérateurs       |
            | Alertes en fonction des protocoles    |
            | Évolution du NRD d'un protocole       |
            | Comparaison médiane / NRD IRSN        |
            | Alerte en fonction des types d'alerte |

    @TestID_581
    Scenario: Charts are selectable
        Then the user can select any of the statistical charts