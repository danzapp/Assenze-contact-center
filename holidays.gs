function isHoliday(date){
var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1jYRU0gTixF_4qTRb0xyq712vu0RRBKiIq2g0Q84jowU/edit#gid=1168446062')
var sheet = ss.getSheetByName("Festività")
var numRows = sheet.getLastRow()-1
var d = date.getDay()
if (d == 6 || d == 0){
  Logger.log("sab o dom" )
  return true
}
var holidays = sheet.getRange(2, 2, numRows).getValues()
   for(var i=0; i<holidays.length; i++) {
     var dateHolidays = new Date(holidays[i])
     if (dateHolidays.getTime() === date.getTime()) {
       Logger.log ("true")
       return true;
     }
   }
}