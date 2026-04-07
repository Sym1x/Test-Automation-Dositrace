Feature: Blocks can be added to the Dashboard correctly
    Background:
        Given the user is on an empty Dashboard
    
    @TestID_39
    Scenario: Listing of blocks to add to Dashboard
        When the user clicks Ajouter
        Then the user can select from the list:
            | Worklist               |
            | Liens utiles           |
            | Historique statistique |
            | Rappels                |
            | Alertes                |
            | NRD/NRI local          |
            | Informations           |
            | Examens par jour       |
            | Documents              |

    @TestID_40
    @TestID_41
    @TestID_42
    Scenario: Validate adding blocks
        When the user adds a block and clicks Valider
        Then the a block is added to the Dashboard
        And the message "Données mises à jour avec succès" is shown

    @TestID_43
    Scenario: Arranging dashboard blocks
        When the user holds left click on a block
        Then the user can drag it to a new position
        And the user can validate the new position by clicking Valider