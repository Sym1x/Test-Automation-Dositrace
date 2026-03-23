Feature: Access server

  Scenario: Access server without DNS
    Given I visit the server at "http://10.0.5.14:8080/SSO-war/"
    Then the page should load successfully
  
  @skip
  Scenario: Access server with DNS
    Given I visit the server at "Nom_de_domaine.xxx/SSO-war/"
    Then the page should load successfully

  @skip
  Scenario: Access server with subdomain
    Given I visit the server at "SSO-war.nom_de_domaine.xxx"
    Then the page should load successfully