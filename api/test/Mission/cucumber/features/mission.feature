Feature: CRUD MISSION


    @MissionPosting
    Scenario: A user wants to post a mission
        Given A user mission with details as shown in the table
            | id          | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d |
            | profile     | devOps                               |
            | client      | decathlon                            |
            | title       | we-coop                              |
            | description | Java, Spring, Hibernate              |
        When The user posts the mission
        Then The mission is created as shown in the table
            | id          | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d |
            | profile     | devOps                               |
            | client      | decathlon                            |
            | title       | we-coop                              |
            | description | Java, Spring, Hibernate              |


    # listing  mission
    @MissionListing
    Scenario: The user wants to list all current missions
        Given An employer are existing missions as followed
            | id                                   | profile    | client | title   | description   |
            | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d | javascript | metro  | we-coop | developpement |
            | 89v67i0c-ddaf-44bd-b7d1-6d4d7787878r | java       | bnp    | we-coop | developpement |
        When The employer list all missions
        Then All missions appear in the list as followed:
            | id                                   | profile    | client | title   | description   |
            | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d | javascript | metro  | we-coop | developpement |
            | 89v67i0c-ddaf-44bd-b7d1-6d4d7787878r | java       | bnp    | we-coop | developpement |


    #upadte mission
    @MissionUpdating
    Scenario: A client wants to update a posted mission
        Given An existing mission with details as followed
            | id          | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
            | profile     | fullstack developer Java             |
            | client      | societé genérale                     |
            | title       | we-coop                              |
            | description | Java, Spring, Hibernate              |
        When The user updates a few attributes of the mission as shown
            | profile     | fullstack developer Java/Kotlin |
            | description | Java/Kotlin, Spring, Hibernate  |
        Then The mission is modified as followed
            | id          | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
            | profile     | fullstack developer Java/Kotlin      |
            | client      | societé genérale                     |
            | title       | we-coop                              |
            | description | Java/Kotlin, Spring, Hibernate       |


    # delete mission
    @MissionDeleting
    Scenario: The user wants to delete a mission
        Given an existing mission with details as followed
            | id          | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
            | profile     | fullstack developer Java             |
            | client      | societé genérale                     |
            | title       | we-coop                              |
            | description | Java, Spring, Hibernate              |
        When The user delete the mission with n°<id>
            | id | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
        Then A message <message> is shown
            | message | Mission n°6ba7b810-9dad-11d1-80b4-00c04fd430c8 supprimée. |


    @MissionSearching
    Scenario: The employer wants to search missions according to some keywords
        Given An Employer who wants to search a mission and there are existing missions as followed
            | id                                   | profile                    | client | title    | description                          |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c1 | Developpeur Java           | Paris  | Wemanity | dev web Java                         |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c2 | Developpeur Nodejs         | Paris  | Wemanity | dev web Javascript docker kubernetes |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c3 | Developpeur Nodejs Reactjs | Paris  | Wemanity | dev web Javascript typescript docker |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c4 | Developpeur Python Angular | Paris  | Wemanity | dev web python                       |
        When The employer search missions with keywords
            | keywords           |
            | node, docker, Java |
        Then Missions list appear as followed:
            | id                                   | profile                    | client | title    | description                          |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c1 | Developpeur Java           | Paris  | Wemanity | dev web Java                         |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c2 | Developpeur Nodejs         | Paris  | Wemanity | dev web Javascript docker kubernetes |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c3 | Developpeur Nodejs Reactjs | Paris  | Wemanity | dev web Javascript typescript docker |
