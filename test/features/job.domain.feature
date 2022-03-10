Feature: Creating a job

  @FullJob
  Scenario Outline: employers wants to created a job offer
    Given Employer has an offer
    When  The job offer has been created
    Then The job is created


# Scenario Outline: employers wants to created a job offer
#     Given Employer <title>, <address>, <description>, <salary>, <contract_type>, <author>
#     And Wants to created a job offer
#     When  The job offer has been created
#     Then The job  <message> is created

#     Examples:
#       | title             | address | description          | salary      | contract_type | author     | message   |
#       | "developpeur web" | "paris" | "dev web javascript" | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
