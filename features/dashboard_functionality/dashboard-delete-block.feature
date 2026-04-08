Feature: Blocks can be deleted from the Dashboard
    Background
        Given the user is on a non empty Dashboard

    @TestID_45
    Scenario: Caching block deletion 
        When the user clicks Supprimer and then the user clicks on a block
        Then the block disappears from view

    @TestID_46
    @TestID_47
    @TestID_48
    Scenario: Validating block deletion
        When the user deletes a block and clicks Valider
        Then the block is deleted from the Dashboard
        Then the message "Données mises à jour avec succès" is shown


    

    
