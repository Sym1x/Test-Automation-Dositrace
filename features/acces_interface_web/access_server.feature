Feature: Access server
  @TestID_1
  Scenario: Access server without DNS
    Given I visit the server at "http://10.0.5.14:8080/SSO-war/"
    Then the page should load successfully
  
  @TestID_2
  @skip
  Scenario: Access server with DNS
    Given I visit the server at "Nom_de_domaine.xxx/SSO-war/"
    Then the page should load successfully

  @TestID_3
  @skip
  Scenario: Access server with subdomain
    Given I visit the server at "SSO-war.nom_de_domaine.xxx"
    Then the page should load successfully