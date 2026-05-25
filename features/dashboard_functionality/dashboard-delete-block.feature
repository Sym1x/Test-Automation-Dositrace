Feature: Blocks can be deleted from the Dashboard
    Background:
        Given the user is on a non empty Dashboard

    @TestID_45
    Scenario: Caching block deletion 
        When the user clicks Supprimer and then the user clicks on the trash can icon on a block
        Then the block disappears from view

    @TestID_46
    Scenario: Validating block deletion
        When the user deletes a block and clicks Valider
        Then the block is deleted from the Dashboard

    @TestID_47
    Scenario: Success message after deleting a block
        When the user deletes a block and clicks Valider
        Then the message "Données mises à jour avec Succès" is displayed after successful deletion
    
    @TestID_48
    Scenario: Absence of deleted blocks in Dashboard
        When the user has deleted blocks from the Dashboard
        Then the blocks stay absent on reload
    