Feature: Creating a job
  @wip
  @FullJob
  Scenario Outline: Creates a job offer
    Given Creating a job offer with <title>, <address>, <description>, <salary>, <contract_type>, <author>
    When I save the job offer
    Then I received a <message> created

    Examples:
      | title             | address | description          | salary      | contract_type | author     | message   |
      | "developpeur web" | "paris" | "dev web javascript" | "5000 EURO" | "CDI"         | "wemanity" | "Success" |

  @wip
  @IncompleteExample
  Scenario Outline: Creates an incomplete example
    Given Writing a description with <description>
    When I save the description
    Then I received a <message> message

    Examples:
      | description | message                       |
      | ""          | "Cannot create empty example" |

  @api
  @PostExample
  Scenario Outline: Testing post request
    Given Writing a job offer with <title>, <address>, <description>, <salary>, <contract_type>, <author>
    When I submit the job offer
    Then I received a <message> message


    Examples:
      | title             | address | description          | salary      | contract_type | author     | message   |
      | "developpeur web" | "paris" | "dev web javascript" | "5000 EURO" | "CDI"         | "wemanity" | "Success" |

# Examples:
#   | description       | message                       |
#   | "salut c'est moi" | "Success"                     |
#   | ""                | "Cannot create empty example" |

