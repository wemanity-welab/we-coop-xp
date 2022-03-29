Feature: CRUD MISSION
    @MissionPosting
    Scenario: Posting mission
        Given A Client give a mission
            | id                | "1"             |
            | profil            | "java"          |
            | client            | "bnp"           |
            | address           | "paris"         |
            | project           | "we-coop"       |
            | duration          | "30"            |
            | description       | "developpement" |
            | stack             | "js"            |
            | team_organisation | "bus"           |
        When The mission has been created
        Then The mission is created and a message is return
            | id                | "1"             |
            | profil            | "java"          |
            | client            | "bnp"           |
            | address           | "paris"         |
            | project           | "we-coop"       |
            | duration          | "30"            |
            | description       | "developpement" |
            | stack             | "js"            |
            | team_organisation | "bus"           |

    # listing de mission
    @MissionListing
    Scenario: The employer wants to list all current missions
        Given An employer has several currents missions
            | id  | profil | client | address | project   | duration | description     | stack | team_organisation |
            | "1" | "java" | "bnp"  | "paris" | "we-coop" | "30"     | "developpement" | "js"  | "bus"             |
            | "2" | "java" | "bnp"  | "paris" | "we-coop" | "30"     | "developpement" | "js"  | "bus"             |

        When The employer list all missions
        Then All missions appear in the list as followed:
            | id  | profil | client | address | project   | duration | description     | stack | team_organisation |
            | "1" | "java" | "bnp"  | "paris" | "we-coop" | "30"     | "developpement" | "js"  | "bus"             |
            | "2" | "java" | "bnp"  | "paris" | "we-coop" | "30"     | "developpement" | "js"  | "bus"             |

