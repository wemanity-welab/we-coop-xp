Feature: CRUD MISSION

  @CreateJob
  Scenario Outline: Employers wants to created a mission
    Given Writing a mission with <id>, <title>, <address>, <description>, <salary>, <contract_type>, <author>
    When The mission has been created
    Then The mission is created and a message <message> is return

    Examples:
      | id | title                   | address    | description          | salary      | contract_type | author     | message   |
      | 9  | "Developpeur web"       | "paris"    | "dev web javascript" | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
      | 6  | "Commercial"            | "paris"    | "dev web javascript" | "4500 EURO" | "CDD"         | "wemanity" | "Success" |
      | 7  | "Conseiller commercial" | "paris"    | "dev web javascript" | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
      | 8  | "biz dev"               | "toulouse" | "commercial"         | "6666 EURO" | "CDI"         | "wemanity" | "Success" |


  @UpdateJobEntirely
  Scenario Outline: Employer wants to update his mission
    Given The employer wants to change a mission which exist already
    When The employer update the mission <new_title>, <new_address>, <new_description>, <new_salary>, <new_contract_type>, <new_author>
    Then The mission must be modified <new_title>, <new_address>, <new_description>, <new_salary>, <new_contract_type>, <new_author> is return

    Examples:
      | new_title         | new_address | new_description      | new_salary  | new_contract_type | new_author |
      | "Developpeur web" | "paris"     | "dev web javascript" | "5000 EURO" | "CDI"             | "wemanity" |


  @UpdateJobPartially
  Scenario Outline: Employer wants to update two arguments
    Given The employer wants to change a mission which exist
    When The employer update the mission <new_title>, <new_address>
    Then The mission must be modified <new_title>, <new_address> is return

    Examples:
      | new_title    | new_address |
      | "Commercial" | "Rouen"     |

  @DeleteJob
  Scenario Outline: Employer wants to remove a mission
    Given The employer wants to delete a mission which exist with an id <id>
    When The employer delete the mission
    Then The mission must not appear in the list

    Examples:
      | id |
      | 4  |

  @ReadJob
  Scenario Outline: Employer want to read a mission
    Given The employer want to read a mission wich exist
    When The employer find the mission with an id <id>
    Then The mission must appear

    Examples:
      | id |
      | 1  |