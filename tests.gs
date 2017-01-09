function retrieveEmailsFromGoogleContacts(){

var idTeam = '1cZonGEpFtFkV2ABqZL1R5S-BItfeK-PCsRiW1yNHCnM'
var ss = SpreadsheetApp.openById(idTeam)
var sheet = ss.getSheetByName('Team')


//indicare il numero di righe riservate agli headers
var headerNumRows = 1

var numRows = sheet.getLastRow()-headerNumRows
var numCols = sheet.getLastColumn()

Logger.log(numRows)
Logger.log(numCols)

stop

var range = sheet.getRange(1, 1, numRows, numCols)
var data = range.getValues()
//Logger.log("data =" + data)

// inserire l'indice della colonna che contiene il cognome nel formato (AMOROSO )
var cognomeIndex = 0
// inserire la colonna che contiene il contatto nel formato (Monica Amoroso m.amoroso@aci.it)
var contactIndex = 9

// inserire l'indice della colonna che dovrà contenere la mail
var mailIndex=10

for (var x=0; x<numRows; x++){
    // preleva il cognome dalla tabella
    var cognome = data[x][cognomeIndex]
Logger.log("x = " + x + " - " + cognome)
  for (var j=0; j<numRows; j++){
    var contatto = data[j][contactIndex]
    
    //Logger.log("email = " + email)
    var cognomeContatto = (contatto.split(" "))[1].toUpperCase();
    Logger.log(cognomeContatto)
    //Logger.log(cognomeContatto)
    if (cognome == cognomeContatto){
    var email = (contatto.split(" "))[2];
    Logger.log("estrai mail " + email)
      sheet.getRange(x+2, mailIndex+1).setValue(email)
      break
    }
  }
}  
}


function compactEmailsToString(){
  var idTeam = '1cZonGEpFtFkV2ABqZL1R5S-BItfeK-PCsRiW1yNHCnM'
var ss = SpreadsheetApp.openById(idTeam)
var sheet = ss.getSheetByName('Team')
var numRows = sheet.getLastRow()-1
var numCols = sheet.getLastColumn()-1

// inserire l'indice della colonna che ospita la mail
var mailIndex=10

var range = sheet.getRange(2, mailIndex, numRows, 1)
var emailsArray = range.getValues()
Logger.log(emailsArray)
var emailsString = ""
for (var i=0; i<emailsArray.length; i++){
  emailsString = emailsString+emailsArray[i]+", "
}
emailsString = emailsString.substring(0,emailsString.length-2)
Logger.log(emailsString)
}


function formattingTable(table){

 
 var tablerows = table.getNumRows();
 var tableHeader = table.getRow(0)
 for (var c=0; c<tableHeader.getNumCells(); c++){
   var cell = tableHeader.getChild(c)
   cell.getChild(0).asParagraph().setAttributes(styleHeaderCell)
 }  
 for (var r=1; r<tablerows; r++){
   var tableRow = table.getRow(r)
   for (var c=0; c<tableRow.getNumCells(); c++){
     var cell = tableRow.getChild(c)
     if (c==0){
        cell.getChild(0).asParagraph().setAttributes(styleFirstColumnCell)
     }
     else{
       cell.getChild(0).asParagraph().setAttributes(styleCell)
     }
   }
 }
}