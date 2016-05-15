
var EMAIL_SENT = "EMAIL_SENT";    // Set a variable to avoid repeats.
var EMAIL_NOT_SENT = "EMAIL_NOT_SENT";




// This function is called by the doGet() function when the web application is run

function sendEmails() {

  // Set the subject to today's date and time
 
  var subject = "Portal - Internal - Ongoing projects & Status " + getCurrentDateTime(); 
  
  // Open the spreadsheet where the app is located. 
  // TODO: Make application more robust // allow for easy editing of mail list.

  var sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1H1ZaN2iEmy85RBr0ycj9Rz1NlA6igTRbDpz1GNqirWI/edit#gid=0');
  
  // Set the dataRange to start from the second row of the spreadsheet, and get the range of the data
  
  var dataRange = getEntryRange(sheet) + 1;
  
  // Fetch the data in the specified range.
  
  var data = sheet.getRange('A2:H' + dataRange).getValues();
  
  // Create the message through the report Generator
  
  var message = reportGenerator();
  
  // For each row in the data, determine whether the person needs an email sent by the control value specified; if so, send it. 
  
  for (var i = 0; i < data.length; ++i){
    
    // Create a variable to store the data for the row
    
    var row = data[i];
 
    // Grab the relevant data for personalizing the report
 
    var fname = row[0];         // First column - first name [not in use]
    var lname = row[1];         // Second column - last name [not in use]
    var emailAddress = row[2];  // Third column - email address  
    var control = row[3];       // Fourth column - control variable
    var personalMsg = row[4]    // Fifth column - custom message [not in use]
      
    // Send the email, handle based on control
    
      if (control == 0) {
        
        // Control value = 0, do not send email.
        
        sheet.getRange('F' + 2 + i).setValue(EMAIL_NOT_SENT);
      
      }
      
      // Control value = 1, send email.
       
      if (control == 1) {  
        
        MailApp.sendEmail(
        emailAddress, 
        subject, 
        'body', {                       
           htmlBody: message                 
          });
        
        // Set the value in the sheet to indicate email was sent, and set a "last sent" date
        
        sheet.getRange('F' + 2 + i).setValue(EMAIL_SENT);
        sheet.getRange('G' + 2 + i).setValue(getCurrentDateTime());
        
      }

      SpreadsheetApp.flush();
    
   }    
};



// This function may be called by the doGet() function when the web application is run

function sendTestEmails() {
  
  // To be worked on
  
};


// This function is called by the sendEmails() function, and returns today's date/ current time 

function getCurrentDateTime() {
  
  // Create the date / time object
  
  var rawTime = new Date();              // Create a new Date() object
  var dd = rawTime.getDate();            // Get the Day from the date object
  var mm = rawTime.getMonth()+1;         // Get the Month from the date object, add one to account for the fact January is 0
  var yyyy = rawTime.getFullYear();      // Get the Year from the date object
  
  // Prefix the day with a 0 if the day is less than the 10th of the month
  
  if(dd < 10) {
  
      dd = '0' + dd;
      
  } 
  
  // Prefix the month with a 0 if the month is before October

  if (mm < 10) {
  
      mm = '0' + mm;
      
  } 
  
  return mm + '/' + dd + '/' + yyyy;
};

// This function returns the range of the report 

function getEntryRange(sheet) {
  
  // Set a variable for incrementing as we look through the sheet
  
  var rangeCount = 1;
  
  // Have a while loop that increments by one for each time we find a valid value in the spreadsheet
  
  while (rangeCount < 1000){
  
    // Access the value; if it is empty, return rangeCount; otherwise, continue to increment the counter
    
    if ((sheet.getRange("A" + rangeCount)).getValue() != ""){
    
      ++rangeCount;
      
      } else {
      
      return rangeCount;
    
    }
  
  }
  
  // If somehow we make it past the ceiling, return the ceiling
  
  return rangeCount;

};


// [WORK IN PROGRESS] This function is called by the google app on page load.

function doGet() {
    sendEmails();
  return HtmlService.createHtmlOutputFromFile('Index')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

