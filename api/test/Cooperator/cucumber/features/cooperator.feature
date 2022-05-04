Feature: CRUD COOPERATOR


    @CooperatorPosting
    Scenario: An employer wants to create a cooperator
        Given An employer that want to save cooperator details as shown in the table
            | id          | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d |
            | lastName    | Mickael                              |
            | firstName   | Zonton                               |
            | phoneNumber | 0000000000                           |
            | email       | mzonto@yahoo.fr                      |
            | practice    | Tech                                 |
            | m3          | Aurelien                             |
            | mentor      | François Eric                        |
        When The employer write cooperator details and submit it
        Then The cooperator is created as shown in the table
            | id          | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d |
            | lastName    | Mickael                              |
            | firstName   | Zonton                               |
            | phoneNumber | 0000000000                           |
            | email       | mzonto@yahoo.fr                      |
            | practice    | Tech                                 |
            | m3          | Aurelien                             |
            | mentor      | François Eric                        |


    @CooperatorListing
    Scenario: An employer wants to display a cooperators list
        Given An employer that wants to display an existing cooperators list as followed
            | id                                   | lastName | firstName | phoneNumber | email             | practice | m3       | mentor        |
            | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d | Mickael  | Zonton    | 0000000000  | mzonto@yahoo.fr   | Tech     | Aurelien | François Eric |
            | 72c95f9b-ddaf-44bd-b7d1-2e4d1380492d | George   | Michael   | 0000000000  | gmichael@yahoo.fr | Tech     | Aurelien | François Eric |
        When The employer display the cooperators list
        Then All cooperators appear in the list as followed:
            | id                                   | lastName | firstName | phoneNumber | email             | practice | m3       | mentor        |
            | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d | Mickael  | Zonton    | 0000000000  | mzonto@yahoo.fr   | Tech     | Aurelien | François Eric |
            | 72c95f9b-ddaf-44bd-b7d1-2e4d1380492d | George   | Michael   | 0000000000  | gmichael@yahoo.fr | Tech     | Aurelien | François Eric |


    @CooperatorUpdating
    Scenario: An employer wants to update cooperator data
        Given An employer that want to update cooperator data, they are display as shown in the table
            | id          | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d |
            | lastName    | Mickael                              |
            | firstName   | Zonton                               |
            | phoneNumber | 0000000000                           |
            | email       | mzonto@yahoo.fr                      |
            | practice    | Tech                                 |
            | m3          | Aurelien                             |
            | mentor      | François Eric                        |
        When The employer write few attributes of the cooperator as shown and submit it
            | phoneNumber | 0111111110              |
            | email       | mickaelzonton@gmail.com |
        Then The cooperator is modified as followed
            | id          | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d |
            | lastName    | Mickael                              |
            | firstName   | Zonton                               |
            | phoneNumber | 0111111110                           |
            | email       | mickaelzonton@gmail.com              |
            | practice    | Tech                                 |
            | m3          | Aurelien                             |
            | mentor      | François Eric                        |


    @CooperatorDeleting
    Scenario: The employer wants to delete a cooperator
        Given An employer that wants to delete an existing cooperator as followed
            | id          | 72c95f9b-ddaf-44bd-b7d1-2e4d1380492d |
            | lastName    | George                               |
            | firstName   | Michael                              |
            | phoneNumber | 0000000000                           |
            | email       | gmichael@yahoo.fr                    |
            | practice    | Tech                                 |
            | m3          | Aurelien                             |
            | mentor      | François Eric                        |
        When The employer delete the cooperator n°<id>
            | id | 72c95f9b-ddaf-44bd-b7d1-2e4d1380492d |
        Then A message is shown
            | message | Cooperateur n°72c95f9b-ddaf-44bd-b7d1-2e4d1380492d supprimé. |


# @MissionSearching
# Scenario: The employer wants to search missions according to some keywords
#     Given An Employer who wants to search a mission and there are existing missions as followed
#         | id                                   | profile                    | client | title    | description                          |
#         | 6ba7b810-9dad-11d1-80b4-00c04fd430c1 | Developpeur Java           | Paris  | Wemanity | dev web Java                         |
#         | 6ba7b810-9dad-11d1-80b4-00c04fd430c2 | Developpeur Nodejs         | Paris  | Wemanity | dev web Javascript docker kubernetes |
#         | 6ba7b810-9dad-11d1-80b4-00c04fd430c3 | Developpeur Nodejs Reactjs | Paris  | Wemanity | dev web Javascript typescript docker |
#         | 6ba7b810-9dad-11d1-80b4-00c04fd430c4 | Developpeur Python Angular | Paris  | Wemanity | dev web python                       |
#     When The employer search missions with keywords
#         | keywords           |
#         | node, docker, Java |
#     Then Missions list appear as followed:
#         | id                                   | profile                    | client | title    | description                          |
#         | 6ba7b810-9dad-11d1-80b4-00c04fd430c1 | Developpeur Java           | Paris  | Wemanity | dev web Java                         |
#         | 6ba7b810-9dad-11d1-80b4-00c04fd430c2 | Developpeur Nodejs         | Paris  | Wemanity | dev web Javascript docker kubernetes |
#         | 6ba7b810-9dad-11d1-80b4-00c04fd430c3 | Developpeur Nodejs Reactjs | Paris  | Wemanity | dev web Javascript typescript docker |
