Feature: Creating a example

@FullExample
Scenario Outline: Creates a fully completed example
  Given Writing a example with <description>
  When I save the example
  Then I received a <message> message

Examples:
| description | message |
|  "yes" | "Success" |

@IncompleteExample
Scenario Outline: Creates an incomplete example
  Given Writing a example with <description>
  When I save the example
  Then I received a <message> message

Examples:
| description | message |
|  "" | "Cannot create empty example" |

@api
@PostExample
Scenario Outline: Testing post request 
Given Writing a example with <description>
When I submit the example
Then I received a <message> message

Examples:
| description | message |
| "salut c'est moi" | "Success" |
| "" | "Cannot create empty example" |

