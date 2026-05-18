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
    Scenario: Validate adding blocks
        When the user adds a block and clicks Valider
        Then the block is saved to the Dashboard

    @TestID_41
    Scenario: Success message after adding a block
        When the user validates adding a block
        Then the message "Données mises à jour avec succès" is displayed after successful addition

    @TestID_42
    Scenario: Ordered blocks
        When the user adds blocks
        Then the added blocks are displayed in the respected order they were added in

    @TestID_43
    Scenario: Arranging dashboard blocks
        When the user drags an existing block by holding left click to a new position
        Then the user can validate the new position by clicking Sauvegarder

    @TestID_44
    Scenario: Resizing dashboard blocks
        Then the user can hold left click on the resize arrow at the bottom left of the block and resize the block
        Then the user can validate the new size by clicking Sauvegarder