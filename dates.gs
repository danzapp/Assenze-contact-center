 
var Month = {1: 'gennaio', 2: 'febbraio', 3: 'marzo', 4: 'aprile', 5: 'maggio', 6: 'giugno', 7: 'luglio', 8: 'agosto', 9: 'settembre', 10: 'ottobre', 11: 'novembre', 12: 'dicembre'} 

function stringToDate(stringDate){
    Logger.log("stringToDate")
    var splitted = stringDate.split("/")
    Logger.log (splitted)
    return splitted
 } 
 
 function stringToDateComplete(stringDate){
   Logger.log("stringToDate")
   //var stringDate = "21/07/2016"
   Logger.log(typeof stringDate )
   var splitted = stringDate.split("/")
   var dd = splitted[0]
   var MM = splitted[1]
   var yyyy = splitted[2]
   var concat = yyyy+"/"+ MM + "/" + dd
   var date = new Date(concat)
   return date
 }
function dateToString(date){
  Logger.log(date)
  var dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  var res = dateUTC.toISOString().slice(0, 10).replace(/-/g, '')
  Logger.log(res)
  var dd = res.substring(6,8)
  var MM = res.substring(4,6)
  var yyyy = res.substring(0,4)
  var stringDate = dd+"/"+ MM + "/" + yyyy
  Logger.log(stringDate)
return stringDate
}

function incrementDate(date, d){
Logger.log("incrementDate")
//var parseDate = date.split ("/")
//var dd = parseDate[0]
//var MM = parseDate[1]
//var yyyy = parseDate[2]
//var date = new Date (yyyy,MM-1,dd)
var thisDate = date.getDate()
var incDate = new Date()
//incDate.setHours(0,0,0,0)
//ATTENZIONE ! imposta la data a mezzanotte !! sulla funzione decrementDate è stata usata, qui no ma sarebbe opportuno
incDate.setDate(thisDate + d)
Logger.log("thisDate " + thisDate + "date " + date + "incDate " + incDate)
return incDate;
}

function decrementDate(date, d){
Logger.log("decrementDate")
var thisDate = date.getDate()
var decDate = new Date()
decDate.setHours(0,0,0,0)
decDate.setDate(thisDate - d)
Logger.log("thisDate " + thisDate + "date " + date + "decDate " + decDate)
return decDate;
}

function addDays(date, amount) {
  var tzOff = date.getTimezoneOffset() * 60 * 1000,
      t = date.getTime(),
      d = new Date(),
      tzOff2;

  t += (1000 * 60 * 60 * 24) * amount;
  d.setTime(t);

  tzOff2 = d.getTimezoneOffset() * 60 * 1000;
  if (tzOff != tzOff2) {
    var diff = tzOff2 - tzOff;
    t += diff;
    d.setTime(t);
  }

  return d;
}

