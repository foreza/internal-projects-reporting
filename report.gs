


// Personal API key / token information stored here

var myApiKey = '643c73842fc31d67bb362f0a5729d306';
var myToken = '51d75685874c0b85cd96d162bf7f942fe0b5b1e5f1788cf8770ec56af5c270d3'




// Change board ID variables to correspond to the Project Management Trello

var projBoardId = '56abba87c3ab75ceb56cf40d';    // ID of the board       
var projListId = '56cf586ee0a27f3cf15b253b';     // ID of the list
var infoDelim = "ClientInfo";                    // Delimiter for the section that has the information needed for client information
var updateDelim = "UpdateText";                  // Delimiter for the section that has the information needed for project update
var noteDelim = "Notes"                          // Delimiter for the section that has the information needed for notes on the particular project




// A function that is called by the sendEmails() function in Email.gs, returns the parsed data

function reportGenerator(){
    
    // Unused for now, we don't need this
    
    var encode =  Utilities.base64Encode('username:password', Utilities.Charset.UTF_8);
    Logger.log(encode);

    var option = {
      headers : {
            Authorization: "Basic "+ encode
      }   
    }
    
    // Construct the URL based off the information provided in the variables above
    
    var url = "https://api.trello.com/1/boards/" 
    + projBoardId + "/cards?fields=name,idList,labels,desc,url&key=" 
    + myApiKey + "&token=" 
    + myToken;
    
    // Make an AJAX call to retrieve the information requested
    
    var response = UrlFetchApp.fetch(url, option).getContentText()
    
    // Parse the response into JSON 
    
    response = JSON.parse(response);
    
    // Declare a variable to hold our message body that will be constructed

    var msgBody = '';
    
    // Loop through the JSON object returned in the response for the update information we need
    // TODO: Optimize the route that is hit by the AJAX call so we can grab the specified list in one API call rather than sifting through all the lists/cards

    for (var i = 0; i < response.length; ++i){
    
        // [DEBUG] Log the response as we loop through each item in the list
        
        Logger.log(response[i].name);
          
          // If the id of the list matches what we are looking for in the projListId specified above, evaluate to true
          
          if (response[i].idList == projListId){
  
              // Add the card info to the message body after passing the response object to our 2 helper functions to grab the information needed for compiling the report
              
              msgBody += '<b><u>' + response[i].name + '</u></b>' + '<br/>' +
                      clientInfoParser(response[i].desc) + '<br/>' +
                      descriptionParser(response[i].desc) + '<br/>' +
                  '<br/>';
      }

    }
        
        // [DEBUG] Log the message body to the console so we can see it
                
        Logger.log(msgBody);
        
        return msgBody;
};




// Helper function called by reportGenerator() that takes the description as input and returns the client information from each card that is parsed 

function clientInfoParser(des){

    // Sets updateText to wherever the start of the specified delimiter
    
    var updateText = des.substring(des.indexOf(infoDelim)+infoDelim.length, des.indexOf(updateDelim));

    // For each instance of the delimiter (~), split the string
    
    var updateArray = updateText.split('~');
    
    // Clear the string
    
    updateText = '';

    // For each element of the array, concatenate it to the updateText
    
    for (var i = 1; i < updateArray.length; ++i){

        // We want to bold the text that are attributes - find the ":" in the string and set it equal to the bold attr
        
        var boldAttr = updateArray[i].substring(0, updateArray[i].indexOf(':'));

        // We then want to grab the rest of the string.
        
        var attrCont = updateArray[i].substring(updateArray[i].indexOf(':'));

        updateText += '<b>' + boldAttr + '</b>' + attrCont + '<br/>';
    }

    return updateText;
};




// Helper function called by reportGenerator() that takes a description as input and returns the proper information from each card that is parsed.

function descriptionParser(des){

    // Sets updateText to wherever the start of the specified delimiter
    
    var updateText = des.substring(des.indexOf(updateDelim)+updateDelim.length);

    // For each instance of the delimiter (@), split the string
    
    var updateArray = updateText.split('@');
    
    // Clear the string
    
    updateText = '';

    // For each element of the array, concatenate it to the updateText
    
    for (var i = 1; i < updateArray.length; ++i){
        updateText += ' - ' + updateArray[i] + '<br/>';
    }

    //console.log("After parse:", updateText);

    return updateText;
};

