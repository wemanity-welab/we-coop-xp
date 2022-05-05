Feature: CRUD COOPERATOR


    @CooperatorPosting
    Scenario: An employer wants to create a cooperator
        Given An employer that want to save cooperator details as shown in the table
            | id          | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d |
            | lastName    | Mickael                              |
            | firstName   | Zonton                               |
            | phoneNumber | 0000000000                           |
            | email       | mzonto@gmail.com                     |
            | practice    | Tech                                 |
            | m3          | Aurelien                             |
            | mentor      | François Eric                        |
        When The employer write cooperator details and submit it
        Then The cooperator is created as shown in the table
            | id          | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d |
            | lastName    | Mickael                              |
            | firstName   | Zonton                               |
            | phoneNumber | 0000000000                           |
            | email       | mzonto@gmail.com                     |
            | practice    | Tech                                 |
            | m3          | Aurelien                             |
            | mentor      | François Eric                        |


    @CooperatorListing
    Scenario: An employer wants to display a cooperators list
        Given An employer that wants to display an existing cooperators list as followed
            | id                                   | lastName | firstName | phoneNumber | email              | practice | m3       | mentor        |
            | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d | Mickael  | Zonton    | 0000000000  | mzonto@gmail.com   | Tech     | Aurelien | François Eric |
            | 72c95f9b-ddaf-44bd-b7d1-2e4d1380492d | George   | Michael   | 0000000000  | gmichael@gmail.com | Tech     | Aurelien | François Eric |
        When The employer display the cooperators list
        Then All cooperators appear in the list as followed:
            | id                                   | lastName | firstName | phoneNumber | email              | practice | m3       | mentor        |
            | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d | Mickael  | Zonton    | 0000000000  | mzonto@gmail.com   | Tech     | Aurelien | François Eric |
            | 72c95f9b-ddaf-44bd-b7d1-2e4d1380492d | George   | Michael   | 0000000000  | gmichael@gmail.com | Tech     | Aurelien | François Eric |


    @CooperatorUpdating
    Scenario: An employer wants to update cooperator data
        Given An employer that want to update cooperator data, they are display as shown in the table
            | id          | 72c95f9b-ddaf-44bd-b7d1-2e4d1380491d |
            | lastName    | Mickael                              |
            | firstName   | Zonton                               |
            | phoneNumber | 0000000000                           |
            | email       | mzonto@gmail.com                     |
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
            | email       | gmichael@gmail.com                   |
            | practice    | Tech                                 |
            | m3          | Aurelien                             |
            | mentor      | François Eric                        |
        When The employer delete the cooperator n°<id>
            | id | 72c95f9b-ddaf-44bd-b7d1-2e4d1380492d |
        Then A message is shown
            | message | Cooperateur n°72c95f9b-ddaf-44bd-b7d1-2e4d1380492d supprimé. |


    @CooperatorSearching
    Scenario: The employer wants to search cooperators according to some keywords
        Given An Employer who wants to search a cooperator and there are existing cooperators as followed
            | id                                   | lastName | firstName | phoneNumber | email               | practice | m3       | mentor        |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c1 | George   | Michael   | 0000000000  | gmichael@gmail.com  | Tech     | Aurelien | François Eric |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c2 | Antoine  | Gayoso    | 0000000000  | agayoso@gmail.com   | Tech     | Aurelien | François Eric |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c3 | Samira   | Houacine  | 0000000000  | shouacine@gmail.com | Tech     | Aurelien | François Eric |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c4 | Mickael  | Zonton    | 0000000000  | mzonton@gmail.com   | Tech     | Aurelien | François Eric |
        When The employer search cooperators with keywords
            | keywords                          |
            | Samira, George, agayoso@gmail.com |
        Then Cooperators list appear as followed:
            | id                                   | lastName | firstName | phoneNumber | email               | practice | m3       | mentor        |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c1 | George   | Michael   | 0000000000  | gmichael@gmail.com  | Tech     | Aurelien | François Eric |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c2 | Antoine  | Gayoso    | 0000000000  | agayoso@gmail.com   | Tech     | Aurelien | François Eric |
            | 6ba7b810-9dad-11d1-80b4-00c04fd430c3 | Samira   | Houacine  | 0000000000  | shouacine@gmail.com | Tech     | Aurelien | François Eric |