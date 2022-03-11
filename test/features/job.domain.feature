Feature: CRUD JOB


    @CreateJob
    Scenario Outline: Employers wants to created a job offer
        Given Writing a job offer with <id>, <title>, <address>, <description>, <salary>, <contract_type>, <author>
        When The job offer has been created
        Then The job is created and a message <message> is return

        Examples:
            | id | title                   | address    | description          | salary      | contract_type | author     | message   |
            | 9  | "Developpeur web"       | "paris"    | "dev web javascript" | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
            | 6  | "Commercial"            | "paris"    | "dev web javascript" | "4500 EURO" | "CDD"         | "wemanity" | "Success" |
            | 7  | "Conseiller commercial" | "paris"    | "dev web javascript" | "5000 EURO" | "CDI"         | "wemanity" | "Success" |
            | 8  | "biz dev"               | "toulouse" | "commercial"         | "6666 EURO" | "CDI"         | "wemanity" | "Success" |


    @UpdateJob
    Scenario Outline: Employer wants to update his job offer
        Given The employer wants to change a job offer which exist already
        When The employer update the job offer <new_title>, <new_address>, <new_description>, <new_salary>, <new_contract_type>, <new_author>
        Then The job offer must be modified and <new_title>, <new_address>, <new_description>, <new_salary>, <new_contract_type>, <new_author> is return

        Examples:
            | new_title         | new_address | new_description      | new_salary  | new_contract_type | new_author |
            | "Developpeur web" | "paris"     | "dev web javascript" | "5000 EURO" | "CDI"             | "wemanity" |



# <id>, <title>, <address>, <description>, <salary>, <contract_type>, <author>