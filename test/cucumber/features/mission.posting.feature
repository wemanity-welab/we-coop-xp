Feature: CRUD MISSION


    @MissionPosting
    Scenario: A user wants to post a mission
        Given A user mission with details as shown in the table
            | id                | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d |
            | profil            | devOps                               |
            | client            | decathlon                            |
            | address           | paris                                |
            | project           | we-coop                              |
            | duration          | 30                                   |
            | description       | Java, Spring, Hibernate              |
            | stack             | js                                   |
            | team_organisation | business developer                   |
        When The user posts the mission
        Then The mission is created as shown in the table
            | id                | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d |
            | profil            | devOps                               |
            | client            | decathlon                            |
            | address           | paris                                |
            | project           | we-coop                              |
            | duration          | 30                                   |
            | description       | Java, Spring, Hibernate              |
            | stack             | js                                   |
            | team_organisation | business developer                   |


    # listing  mission
    @MissionListing
    Scenario: The user wants to list all current missions
        Given An employer are existing missions as followed
            | id                                   | profil     | client | address | project | duration | description   | stack | team_organisation  |
            | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d | javascript | metro  | paris   | we-coop | 30       | developpement | js    | business developer |
            | 89v67i0c-ddaf-44bd-b7d1-6d4d7787878r | java       | bnp    | paris   | we-coop | 30       | developpement | java  | business developer |
        When The employer list all missions
        Then All missions appear in the list as followed:
            | id                                   | profil     | client | address | project | duration | description   | stack | team_organisation  |
            | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d | javascript | metro  | paris   | we-coop | 30       | developpement | js    | business developer |
            | 89v67i0c-ddaf-44bd-b7d1-6d4d7787878r | java       | bnp    | paris   | we-coop | 30       | developpement | java  | business developer |


    #upadte mission
    @MissionUpdating
    Scenario: A client wants to update a posted mission
        Given An existing mission with details as followed
            | id                | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
            | profil            | fullstack developer Java             |
            | client            | societé genérale                     |
            | address           | paris                                |
            | project           | we-coop                              |
            | duration          | 20                                   |
            | description       | Java, Spring, Hibernate              |
            | stack             | React                                |
            | team_organisation | prod                                 |
        When The user updates a few attributes of the mission as shown
            | profil      | fullstack developer Java/Kotlin |
            | description | Java/Kotlin, Spring, Hibernate  |
            | stack       | NodeJS                          |
        Then The mission is modified as followed
            | id                | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
            | profil            | fullstack developer Java/Kotlin      |
            | client            | societé genérale                     |
            | address           | paris                                |
            | project           | we-coop                              |
            | duration          | 20                                   |
            | description       | Java/Kotlin, Spring, Hibernate       |
            | stack             | NodeJS                               |
            | team_organisation | prod                                 |


    # delete mission
    @MissionDeleting
    Scenario: The user wants to delete a mission
        Given an existing mission with details as followed
            | id                | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
            | profil            | fullstack developer Java             |
            | client            | societé genérale                     |
            | address           | paris                                |
            | project           | we-coop                              |
            | duration          | 20                                   |
            | description       | Java, Spring, Hibernate              |
            | stack             | React                                |
            | team_organisation | prod                                 |
        When The user delete the mission with n°<id>
            | id | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
        Then A message <message> is shown
            | message | Mission deleted |


    @MissionSearching
    Scenario: The employer wants to search missions according to some keywords
        Given An Employer who wants to search a mission and there are existing missions as followed
            | id                                   | profil                     | client | address        | project  | duration | description                          | stack                                                   | team_organisation |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c1 | Developpeur Java           | Paris  | 6 Rue de Paris | Wemanity | 12 mois  | dev web Java                         | Java, Spring, MySQL                                     | idk               |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c2 | Developpeur Nodejs         | Paris  | 6 Rue de Paris | Wemanity | 12 mois  | dev web Javascript docker kubernetes | Fullstack Javascript, docker, kubernetes                | idk               |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c3 | Developpeur Nodejs Reactjs | Paris  | 6 Rue de Paris | Wemanity | 12 mois  | dev web Javascript typescript docker | Reactjs, Nodejs, MongoDB, Expressjs, docker, typescript | idk               |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c4 | Developpeur Python Angular | Paris  | 6 Rue de Paris | Wemanity | 12 mois  | dev web python                       | Python, Angular                                         | idk               |
        When The employer search missions with keywords
            | keywords           |
            | node, docker, Java |
        Then Missions list appear as followed:
            | id                                   | profil                     | client | address        | project  | duration | description                          | stack                                                   | team_organisation |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c1 | Developpeur Java           | Paris  | 6 Rue de Paris | Wemanity | 12 mois  | dev web Java                         | Java, Spring, MySQL                                     | idk               |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c2 | Developpeur Nodejs         | Paris  | 6 Rue de Paris | Wemanity | 12 mois  | dev web Javascript docker kubernetes | Fullstack Javascript, docker, kubernetes                | idk               |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c3 | Developpeur Nodejs Reactjs | Paris  | 6 Rue de Paris | Wemanity | 12 mois  | dev web Javascript typescript docker | Reactjs, Nodejs, MongoDB, Expressjs, docker, typescript | idk               |




