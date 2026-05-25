Feature: Notification functionality
    Background:
        Given the user is on the Notification page

    @TestID_14
    Scenario: Notifications dropdown
        When the user clicks the bell icon
        Then a notifications dropdown is toggled
        And it contains a link to mark all as read
        And it contains a link to see all notifications

    @TestID_16
    Scenario: Filtering notifications
        When the user clicks either link from the dropdown
        Then the user can filter notifications on the notifications interface according to different criteria
            | vus                          |
            | type                         |
            | application                  |
            | date                         |
            | rechercher                   |
            | nombre d'élements à afficher |

    @TestID_17
    Scenario: Accessing the notifications interface
        When the user clicks link to see all notifications from the dropdown
        Then the user is redirected to the notifications interface
            
    @TestID_18
    Scenario: Marking notifications as read
        When the user clicks mark all as read
        Then the user is shown the message "Vous avez 0 notification(s)"

    @TestID_19
    Scenario: Calendar access in Notifications filtering
        When the user clicks Date field in notifications filtering
        Then a calendar is displayed graphically

    @TestID_20
    Scenario: Viewing options after clicking filters
        Then the fields vus, type, afficher ... éléments for notifications filtering display options when clicked

    @TestID_21
    Scenario: Global search in notifications list
        Then the user can input key words to refine the results in notifications list

    @TestID_22
    Scenario: Filrer button functions correctly
        When the user chooses filtering criteria for notifications filtering and clicks Filtrer
        Then the notifications list is updated in accordance with the criteria chosen

    @TestID_23
    Scenario: Affichage/Ergonomie
        Then ergonomie test

    @TestID_24
    Scenario: Navigating pages in displayed list of notifications
        Then the user can navigate notifications by clicking table navigation arrows
        Then the user can navigate notifications by entering a page number

    @TestID_25
    Scenario: Sorting by column in notifications list
        Then the user can sort the notifications list by clicking any of the following column headers
            | Type             |
            | Date de création |
            | Application      |
            | Contenu          |
