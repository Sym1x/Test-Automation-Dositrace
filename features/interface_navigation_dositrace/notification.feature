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
            
    @tesing
    @TestID_18
    Scenario: Marking notifications as read
        When the user clicks mark all as read
        Then the user is shown the message "Vous avez 0 notification(s)"

    @TestID_19
    Scenario: Calendar access
        When the user clicks Date
        Then a calendar is displayed