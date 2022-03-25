Feature: Api Testing MISSIONS
    In order to manage missions
    As a developer
    I want to make sure CRUD operations through REST API works fine


    @PostMission
    Scenario Outline: create a mission
        Given A mission <id>, <title>, <address>, <description>, <salary>, <contract_type>, <author>
        When I send post request to <url>
        Then response should have a status <status>

        Examples:
            | id | title             | address | description          | salary      | contract_type | author     | url         | status |
            | 9  | "Developpeur web" | "paris" | "dev web javascript" | "5000 EURO" | "CDI"         | "wemanity" | "/missions" | 201    |

