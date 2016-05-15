# internal-projects-reporting

Objective:
This project allows for easy reporting for The Portal Consulting organization.

It grabs data from a specific project management trello board, aggregates the information in a presentable format, and sends it out to a specified list.

Spreadsheet of emails / names that the report sends to can be located here:
https://docs.google.com/spreadsheets/d/1H1ZaN2iEmy85RBr0ycj9Rz1NlA6igTRbDpz1GNqirWI/edit#gid=0

Link for executing the script is generated through the script editor, and cannot be shown publically.


**Changelog for 5/14/2016**

Author: Jason

- Added both google script files to versioning
- Edit README to describe how the code & application is maintained / supported
- Cleaned up and commented code
- Optimized several functions that were making unecessary calls 
- Obscure email / name / private data so the application itself can be sourced out

Known issues:
- Spreadsheet data for marking a row as "sent" is not placing in correct row 

TODOs:
- Further optimize application
- Allow easier selection / addition of new emails to the list
- Allow for custom messages to be sent
- Remove spreadsheet dependency
