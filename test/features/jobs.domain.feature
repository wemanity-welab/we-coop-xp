Feature: Creating a job

  @FullJob
  Scenario Outline: Creates a job offer
    Given creating a job offer with "<title>", "<address>", "<description>", "<salary>", "<contract_type>", "<author>", "<created_at>", "<updated_at>"
    When I save the job offer
    Then I received a <message> message

  Example:
      | title           | address | description        | salary    | contract_type | author   | created_at | updated_at | message |
      | developpeur web | paris   | dev web javascript | 5000 EURO | CDI           | wemanity | 23/02/2022 | 23/02/2022 | Success |

  @wip
  @IncompleteExample
  Scenario Outline: Creates an incomplete example
    Given Writing a example with <description>
    When I save the example
    Then I received a <message> message

  Example:
      | description | message                       |
      | ""          | "Cannot create empty example" |

  @wip
  @api
  @PostExample
  Scenario Outline: Testing post request
    Given Writing a example with <description>
    When I submit the example
    Then I received a <message> message

  Example:
      | description       | message                       |
      | "salut c'est moi" | "Success"                     |
      | ""                | "Cannot create empty example" |

