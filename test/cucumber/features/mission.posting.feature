Feature: CRUD MISSION

  @MissionPosting
  Scenario Outline: Employers wants to created a mission
    Given Writing a mission with 
      | id | title                   | address    | description          | salary      | contract_type | author     | message   |
      | 9  | "Developpeur web"       | "paris"    | "dev web javascript" | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
    When The mission has been created
    Then The mission is created and a message <message> is return

    Examples:
      | id | title                   | address    | description          | salary      | contract_type | author     | message   |
      | 9  | "Developpeur web"       | "paris"    | "dev web javascript" | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
      | 6  | "Commercial"            | "paris"    | "dev web javascript" | "4500 EURO" | "CDD"         | "wemanity" | "Success" |
      | 7  | "Conseiller commercial" | "paris"    | "dev web javascript" | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
      | 8  | "biz dev"               | "toulouse" | "commercial"         | "6666 EURO" | "CDI"         | "wemanity" | "Success" |


  @MissionUpdate
  Scenario Outline: Employer wants to update his mission
    Given The employer wants to change entierly the mission n°<id>
    When The employer update the mission <new_title>, <new_address>, <new_description>, <new_salary>, <new_contract_type>, <new_author>
    Then The mission must be modified <new_title>, <new_address>, <new_description>, <new_salary>, <new_contract_type>, <new_author> is return

    Examples:
      | id | new_title         | new_address | new_description      | new_salary  | new_contract_type | new_author |
      | 1  | "Developpeur web" | "paris"     | "dev web javascript" | "5000 EURO" | "CDI"             | "wemanity" |


  @MissionPartialUpdate
  Scenario Outline: Employer wants to update two arguments
    Given The employer wants to change the mission n°<id>
    When The employer update the mission <new_title>, <new_address>
    Then The mission must be modified <new_title>, <new_address> is return

    Examples:
      | id | new_title    | new_address |
      | 2  | "Commercial" | "Rouen"     |


  @DeactivateMission
  Scenario Outline: Employer wants to deactivate a mission
    Given An employer
    And There are current active missions as:
      | id | title                   | address | description           | salary      | contract_type | author     | message   |
      | 9  | "Developpeur web"       | "paris" | "dev web javascript"  | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
      | 6  | "Commercial"            | "paris" | "dev web java/spring" | "4500 EURO" | "CDD"         | "wemanity" | "Success" |
      | 7  | "Conseiller commercial" | "paris" | "dev web javascript"  | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
    When The employer deactivates the mission with n°<id>
      | id |
      | 9  |
    Then The mission must not appear in the list
      | id | title                   | address | description           | salary      | contract_type | author     | message   |
      | 6  | "Commercial"            | "paris" | "dev web java/spring" | "4500 EURO" | "CDD"         | "wemanity" | "Success" |
      | 7  | "Conseiller commercial" | "paris" | "dev web javascript"  | "5000 EURO" | "CDI"         | "wemanity" | "Success" |


  @ReactivateMission
  Scenario Outline: Employer wants to deactivate a mission
    Given An employer
    And There are current active missions as:
      | id | title                   | address | description           | salary      | contract_type | author     | message   |
      | 9  | "Developpeur web"       | "paris" | "dev web javascript"  | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
      | 6  | "Commercial"            | "paris" | "dev web java/spring" | "4500 EURO" | "CDD"         | "wemanity" | "Success" |
      | 7  | "Conseiller commercial" | "paris" | "dev web javascript"  | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
    When The employer deactivates the mission with n°<id>
      | id |
      | 9  |
    Then The mission must not appear in the list
      | id | title                   | address | description           | salary      | contract_type | author     | message   |
      | 6  | "Commercial"            | "paris" | "dev web java/spring" | "4500 EURO" | "CDD"         | "wemanity" | "Success" |
      | 7  | "Conseiller commercial" | "paris" | "dev web javascript"  | "5000 EURO" | "CDI"         | "wemanity" | "Success" |


  @MissionDetail
  Scenario Outline: Employer want to a mission detail
    Given An employer
    And A mission with n°<id>
    When The employer opens the mission with n°<id> for details
    Then The mission detail is displayed

    Examples:
      | id |
      | 1  |


  @MissionListing
  Scenario: The employer wants to list all current missions
    Given An employer
    And There are current missions as:
      | id | profil                  | client | address | projet | duration | description | stack | team-organisation | 
      | 9  | "Developpeur web"       | "paris" | "dev web javascript"  | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
    When The employer list all missions
    Then All missions appear in the list as followed:
      | id | title                   | address | description           | salary      | contract_type | author     | message   |
      | 9  | "Developpeur web"       | "paris" | "dev web javascript"  | "5000 EURO" | "CDI"         | "wemanity" | "Success" |


  @MissionSearching
  Scenario: The employer wants to search missions according to some keywords
    Given An employer
    And There are current missions as:
      | profil        | client | lieu | description | 
      | 9  | "Developpeur web"       | "paris" | "dev web javascript"  | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
      | 9  | "devops cloud"          | "paris" | "docker web java kubernetes"  | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
      | 9  | "Developpeur python"    | "paris" | "dev web python"  | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
    When The employer search missions with keywords
      | keywords |
      | java, kubernetes, docker |
    Then All missions appear in the list as followed:
      | id | title                   | address | description           | salary      | contract_type | author     | message   |
      | 9  | "devops cloud"       | "paris" | "docker web java kubernetes"  | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
