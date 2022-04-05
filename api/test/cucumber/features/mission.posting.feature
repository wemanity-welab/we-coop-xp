Feature: CRUD MISSION
    @MissionPosting
    Scenario: A user wants to post a mission
        Given A user mission with details as shown in the table
            | id                | 1                       |
            | profil            | java                    |
            | client            | bnp                     |
            | address           | paris                   |
            | project           | we-coop                 |
            | duration          | 30                      |
            | description       | Java, Spring, Hibernate |
            | stack             | js                      |
            | team_organisation | business developer      |
        When The user posts the mission
        Then The mission is created as shown in the table
            | id                | 1                       |
            | profil            | java                    |
            | client            | bnp                     |
            | address           | paris                   |
            | project           | we-coop                 |
            | duration          | 30                      |
            | description       | Java, Spring, Hibernate |
            | stack             | js                      |
            | team_organisation | business developer      |

    # listing  mission
    @MissionListing
    Scenario: The user wants to list all current missions
        Given An employer are existing missions as followed
            | id | profil | client | address | project | duration | description   | stack | team_organisation  |
            | 1  | java   | bnp    | paris   | we-coop | 30       | developpement | js    | business developer |
            | 2  | java   | bnp    | paris   | we-coop | 30       | developpement | js    | business developer |
        When The employer list all missions
        Then All missions appear in the list as followed:
            | id | profil | client | address | project | duration | description   | stack | team_organisation  |
            | 1  | java   | bnp    | paris   | we-coop | 30       | developpement | js    | business developer |
            | 2  | java   | bnp    | paris   | we-coop | 30       | developpement | js    | business developer |

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
            | message | DATA REMOVED 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |





