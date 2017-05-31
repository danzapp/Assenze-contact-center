function searchUserData(userMail){
  //userMail="s.danieli@aci.it"
  
  //cerca i dati anagrifici dell'utente corrente a partire dalla mail
  //var personaleID = '14_3UOO85IgrQHUTTTMwmocrLkhXORuaTAWlmCy9wsLA'  // foglio Personale
  var teamId = '14_3UOO85IgrQHUTTTMwmocrLkhXORuaTAWlmCy9wsLA'
  var ss = SpreadsheetApp.openById(teamId)
  var sheet = ss.getSheetByName('Personale')
  var data = sheet.getDataRange().getValues()
  for (i=0; i<3; i++){
    data.shift()
  }
  
  for (var i=0; i<data.length; i++){
    if (data[i][1] == userMail){
      var userName = data[i][3] + " " + data[i][4]
      Logger.log(userName)
      return userName
    }
  }
  Logger.log(userMail + ": indirizzo non trovato" )
}



function getDateFromForm(form){
   Logger.log("date= " + form.date)
   var user = Session.getActiveUser()
   Logger.log("user " + user)
   componiPresenzeEturni(form.date, user)
}

function checkDevelopeMode(){
  var developeMode = false
  return developeMode
}

function estraiGiornate(){
Logger.log("estraiGiornate " + new Date())
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/a/aci.it/spreadsheets/d/1vJvjg-jssHkDZIo53KMddEP5wHE09QRcNHmiebC3k9s/edit?usp=sharing') 
  var sheet = ss.getSheetByName('Tabelle')
  var lastCol = sheet.getLastColumn()
  
  var range = sheet.getRange(1, 1)
  
  var rangeData = range.getValues()
  Logger.log("rangeData " + rangeData)
  
  var lastRow = 0;
  
  while ( range.offset(lastRow, 0).getValue() != "" ) {
    lastRow++;
  }
  
  Logger.log("lastRow = " + lastRow)
  
  var giornate= sheet.getRange(3, 4,lastRow-2).getValues()
  var dates = new Array()
  Logger.log("giornate length " + giornate.length)
  Logger.log("giornate length " + giornate)
  for (var i = 0; i<giornate.length; i++){
    var giornata = new Date (giornate[i])
    Logger.log(i + " giornata " + giornata)
    dates.push(dateToString(giornata))
  }
  Logger.log("giornate " + giornate)
  Logger.log("dates.length " + dates.length)
  Logger.log("dates " + dates)
  return dates.reverse()
}
  
function estraiPersonale() {
  var ssTeam = SpreadsheetApp.openByUrl('https://docs.google.com/a/aci.it/spreadsheets/d/1cZonGEpFtFkV2ABqZL1R5S-BItfeK-PCsRiW1yNHCnM/edit?usp=sharing') // al momento sta usando il foglio Team dallo spreadsheet Contact Center
  var sheetTeam = ssTeam.getSheetByName('Personale')
  var lastCol = sheetTeam.getLastColumn()
  var lastRow = sheetTeam.getLastRow()
  Logger.log(lastRow)
  var firstActiveRow = 2
  var activeRows = lastRow - (firstActiveRow - 1)
  var data = sheetTeam.getDataRange()
  var headers = data.getValues().shift()
  Logger.log(headers)
  //leggi il numero della colonna Cognome Nome
  var col = headers.indexOf("Cognome") + 1
  Logger.log("numero colonna Cognome Nome: " + col) 
  var personale = sheetTeam.getRange(firstActiveRow,col,activeRows,2).getValues()
  Logger.log(personale)
  return personale
}

function assentiByDate(date){
Logger.log("assentiByDate")
  
  //date = "07/21/2016"
  Logger.log("parameter date " + date)
  var dateTime = date.getTime()
  Logger.log('dateTime ' + dateTime)
  var assenti = [["Assente","Motivo","Note"]]
  Logger.log("assenti 2D " + assenti[0])
  var ssAgenda = SpreadsheetApp.openByUrl('https://docs.google.com/a/aci.it/spreadsheets/d/1vJvjg-jssHkDZIo53KMddEP5wHE09QRcNHmiebC3k9s/edit?usp=sharing') 
  var sheetAgenda = ssAgenda.getSheetByName('Agenda')
  var lastCol = sheetAgenda.getLastColumn()
  var lastRow = sheetAgenda.getLastRow()
  var firstActiveRow = 4
  var activeRows = lastRow - (firstActiveRow - 1)
  
    
    //leggi il numero della colonna Data
  
  
  var headers = sheetAgenda.getRange(1, 1,1,lastCol).getValues()
  
  var colDate = headers[0].indexOf("Data")
  
  //leggi il numero della colonna Personale
  var colPersonale = headers[0].indexOf("Personale")
  var colStatoRichiesta = headers[0].indexOf("Stato Richiesta")
  var colGiorniAssenza = headers[0].indexOf("Giorni di assenza")
  var colCodiciAssenza = headers[0].indexOf("Codici Assenza")
  var colNote = headers[0].indexOf("Note")
  
  var data = sheetAgenda.getRange(firstActiveRow, 1,lastRow,lastCol).getValues()
  
  for (var i=0; i<data.length-3; i++){
    var compareDate = new Date (data[i][colDate]).getTime() // converte data in Time per effettuare la comparazione tra date
    // Logger.log(i + " - " + date + " - " + compareDate + " VS " + dateTime) 
    if (compareDate === dateTime) {
      Logger.log("trovato " + data[i][colPersonale])
      if (data[i][colGiorniAssenza] != 0){
        if (data[i][colStatoRichiesta] != "Annullata"){
          var motivo = cercaMotivoAssenza(data[i][colCodiciAssenza]) // cerca il motivo associato al codice assenza
          var note = data[i][colNote]
          assenti.push([data[i][colPersonale],motivo,note])
          // assenti.push([data[i][colPersonale], motivo]) // inserisce il personale e il motivo di assenza
        }
      }
      else{
        Logger.log("assente non inserito in quanto richiesta ANNULLATA o solo Straordinario")
      }
    }
  }
 
  return assenti
}

function contactCenterByDate(date){
Logger.log("contactCenterByDate")
  Logger.log('date ' + date)
  var dateTime = date.getTime()
  Logger.log(typeof dateTime )
  Logger.log("dateTime " + dateTime)
  
  var turniContact = []
  var ssContact = SpreadsheetApp.openByUrl('https://docs.google.com/a/aci.it/spreadsheets/d/1cZonGEpFtFkV2ABqZL1R5S-BItfeK-PCsRiW1yNHCnM/edit?usp=sharing') 
  // individua il foglio turni contact del mese da estrarre
  var monthContact = date.getMonth()+1
  var monthContactString = zeroPad(monthContact,2)
  Logger.log ("monthContact " + monthContact)
  var nameSheetContact = monthContactString + " (" + Month[monthContact]+')'
  Logger.log("nameSheetContact " + nameSheetContact)
  var sheetContact = ssContact.getSheetByName(nameSheetContact)
  if (sheetContact == null){
    var turni = []
    return turni
  }
  
  //estrae i dati 
  var lastCol = sheetContact.getLastColumn()
  var lastRow = sheetContact.getLastRow()
  var firstActiveRow = 4
  var activeRows = lastRow - (firstActiveRow - 1)
  var data = sheetContact.getRange(3,2,9,lastCol).getValues()
  var dates = sheetContact.getRange(3,2,1,lastCol).getValues() // attenzione!! non so perché ma, al momento di leggere i valori le date vengono aumentate di 1 !!!!
  Logger.log (dates)
  
  
  // individua la data del turno contact da estrarre  
  for (var i=0; i<(dates[0].length - 1); i++){
    
     var compareDate = decrementDate(dates[0][i],0) // attenzione !! da giorno 5 gennaio sembra che le date non vengano più aumentate 
     Logger.log('compareDate ' + compareDate)
     Logger.log(i + " " + compareDate.getTime() + " - " + dateTime)
     if (compareDate.getTime() === dateTime) {
       var dateIndex = i+1 // corregge l'anomalia delle date aumentate di 1 
       var dateCol = i + 2
       Logger.log(i)
       Logger.log(dateCol)
       break
     }
 
  }
  var totaleTurniProgrammati = 0
  
  var turniNonCoperti = {
    totale: 0,
    normativa: 0,
    procedure: 0,
    forniture: 0
  }
  
  
  
  // legge i turni normativa dallo sheet
  Logger.log(sheetContact)
  Logger.log(dateCol)
  var sigleNormativa = sheetContact.getRange(7, dateCol, 3,1).getValues()
  
  // conta i turni non vuoti 
  for (var i = 0; i<sigleNormativa.length; i++){
    if (sigleNormativa[i]==''){ 
           Logger.log("Turno non coperto")
           turniNonCoperti.normativa =+1
           //riepilogoTurni =+ 'Normativa: ' + (3 - sigleNormativa.length) + ' '
       }
    
       else
       {
          totaleTurniProgrammati =+ 1
          
       }
   } 
  
  var sigleProcedure = sheetContact.getRange(10, dateCol, 1,1).getValues()
  
  // conta i turni non vuoti 
  for (var i=0; i<sigleProcedure.length; i++){
    if (sigleProcedure[i]==''){ 
           Logger.log("Turno non coperto")
           turniNonCoperti.procedure =+ 1
           //riepilogoTurni =+ 'Procedure: ' + (3 - sigleProcedure.length) + ' '
       }
       else
       {
          totaleTurniProgrammati =+ 1
       }
  }  
  
  // legge i turni forniture dallo sheet
  var sigleForniture = sheetContact.getRange(11, dateCol, 1,1).getValues()
  
  for (var i = 0; i<sigleForniture.length; i++){
   if (sigleForniture[i]==''){ 
           Logger.log("Turno non coperto")
           turniNonCoperti.forniture =+ 1
           //riepilogoTurni =+ 'Fornitrue: ' + (3 - sigleForniture.length) + ' '
       }
       else
       {
          totaleTurniProgrammati =+ 1
       }
  }
 
  turniNonCoperti.totale = turniNonCoperti.normativa + turniNonCoperti.procedure + turniNonCoperti.forniture
  Logger.log('turniNonCoperti ' + turniNonCoperti.totale)
  Logger.log('normativa ' + turniNonCoperti.normativa) 
  Logger.log('procedure ' + turniNonCoperti.procedure) 
  Logger.log('forniture ' + turniNonCoperti.forniture) 
  
 if (turniNonCoperti.totale > 0 ){
   

   
   var riepilogoTurni = 'Attenzione ci sono turni di Contact Center non coperti: ' 
   if (turniNonCoperti.normativa > 0) {
     riepilogoTurni = riepilogoTurni + 'Normativa: ' + turniNonCoperti.normativa
   }
   if (turniNonCoperti.procedure > 0) {
     riepilogoTurni = riepilogoTurni + 'Procedure: ' + turniNonCoperti.procedure
   }
  if (turniNonCoperti.forniture > 0) {
    riepilogoTurni  = riepilogoTurni +  'Forniture: ' + turniNonCoperti.forniture
   }
 }
 else
 {
     var riepilogoTurni = "Tutti i turni di Contact Center risultano coperti"
 }
 Logger.log(riepilogoTurni)
 
 //var messaggio = printConditionalString(costrutto, 'affermativa', turniNonCoperti.totale + 1,0,5,1) 

 
  Logger.log("Normativa " + sigleNormativa)
  Logger.log("Procedure " + sigleProcedure)
  Logger.log("Forniture " + sigleForniture)
  
  var turniSigle = sheetContact.getRange(7, dateCol, 5,1).getValues()
  Logger.log(turniSigle)
  // converti le sigle in Cognome Nome
  
  // leggi le prime 3 colonne di Team
  var sheetTeam = ssContact.getSheetByName('Personale')
  var lastRowTeam = sheetTeam.getLastRow()
  var lastColTeam = sheetTeam.getLastColumn()
  var personale = sheetTeam.getRange(1, 1,lastRowTeam,lastColTeam).getValues()
  
  // cerca sigle in "turnsSign" su "personale" e salva "Cognome Nome" su "turni"
  var turni = []
  for (var i=0; i<turniSigle.length; i++){
    Logger.log ('i ' + i)
    if (turniSigle[i] != ''){
       
      for (var j=1; j<personale.length; j++){
        Logger.log ('j ' + j)
        if (turniSigle[i] == personale[j][2]){
          turni.push(personale [j][0])
          Logger.log(personale[j][2])
        }  
      }
    }
    else
    {
     turni.push('')
      Logger.log('TURNO VUOTO **********************')
    }
  }
  Logger.log('turni: ' + turni)
  Logger.log('riepilogoTurni: ' + riepilogoTurni)
  return [turni, riepilogoTurni]
}

function componiPresenzeEturni (date, mode){

Logger.log("current User " + user)
Logger.log("mode " + mode)

//var date = "01/05/2017" // inserire una data e togliere il commento per testare la funzione 
//var mode = 'anteprima'
//var dateTime = new Date(date).getTime()
var date = stringToDateComplete(date)
var dateTime = date.getTime()
var personale = estraiPersonale()

// esclude specifici nominativi dal foglio presenze
// Moscatelli in quanto non più in organico SGP
// personale.splice(17,1)

Logger.log(personale)
Logger.log(personale.length)
var assenti = assentiByDate(date)
var turniArray = contactCenterByDate(date)
var turni = turniArray[0]
var contaTurni = turniArray[1]

Logger.log('turniArray ' + turniArray)
Logger.log('turni ' + turni)
Logger.log('contaTurni ' + contaTurni)
// crea prospetto presenze giornaliero

// crea la riga intestazioni
//var presenzeEturni = [["Nominativo","Assente","Motivo","Presidio Contact Center", "Note"]]
var presenzeEturni = new Array()
//crea una riga per ogni nominativo in "personale"
for (var i=0; i<personale.length; i++){
var nominativo = personale[i][0] // salva solo il cognome
//Logger.log(nominativo + "  scritto su presenzeEturni")
presenzeEturni.push([nominativo,"","","",""])
}
Logger.log('Presenze e turni')
Logger.log(JSON.stringify(presenzeEturni))
Logger.log ("intestazioni presenzeEturni " + presenzeEturni)
// inserisci "X" per gli assenti
//Logger.log("lunghezza array assenti " + assenti.length)
for (var i=0; i<assenti.length; i++){
  for (var j=0; j<presenzeEturni.length; j++){
    //Logger.log("confronto  " + assenti[i][0] + " con " +  presenzeEturni[j][0]) 
    if (assenti[i][0] == presenzeEturni[j][0]){
       presenzeEturni[j][1]="X" // inserisce la X in corrispondenza del personale assente
       presenzeEturni[j][2]=assenti[i][1] // inserisce il codice assenza in corrispondenza del personale assente
       presenzeEturni[j][4]=assenti[i][2] // inserisce le note 
       //Logger.log (assenti[i]  + " nominativo segnato come assente nel foglio presenze + codice assenza")
       break
       }
  }
  
 }

// INSERISCI TURNI CONTACT CENTER NEL FOGLIO PRESENZE

// legge i turni e li confronta con le assenze
incongruenze= new Array // definisci l'array in ambito globale
Logger.log("turni contact " + turni)
Logger.log("numeri turni contact " + turni.length)
for (var i=0; i<turni.length; i++){      
  Logger.log(i + ' ' + turni[i])
  for (var j=0; j<presenzeEturni.length; j++){
    Logger.log("i= "+i + " - " + turni[i] + " j= "+j+ " - " + presenzeEturni[j][0])
    if (turni[i] == presenzeEturni[j][0]){
    switch (true) {    
      case i<3:
             presenzeEturni[j][3]="Normativa"
             Logger.log(presenzeEturni[j][3])
             Logger.log(presenzeEturni[j][0] + " segnato come normativa")
        break;
      case i==3:
             presenzeEturni[j][3]="Procedure"
             Logger.log(presenzeEturni[j][3])
             Logger.log(presenzeEturni[j][0] + " segnato come procedure")
        break;

      case i==4:
             presenzeEturni[j][3]="Forniture"
             Logger.log(presenzeEturni[j][3])
             Logger.log(presenzeEturni[j][0] + " segnato come forniture")
         break;
    }
       
       Logger.log (turni[i]  + " segnato come turno contact " + presenzeEturni[j][3])
       // evidenzia i turni assegnati a personale assente 
       Logger.log(turni[i] + " - " + presenzeEturni[j][0] + " - " + presenzeEturni[j][1] + " - "  + presenzeEturni[j][3])
        if (presenzeEturni[j][1] == "X"){
        Logger.log(turni[i] + " - " + presenzeEturni[j][0])
            if (presenzeEturni[j][4]==""){
              presenzeEturni[j][4]="INCONGRUENZA tra assenza e turno contact center"
            }
            incongruenze.push(j)
            Logger.log("i= "+i + " - " + turni[i] + "j= "+j+ " - " + presenzeEturni[j][0])
          }  
        incongruenze.sort()
        break
       }
  }
 }

Logger.log("presenze e turni compilato " + JSON.stringify(presenzeEturni))
// verifica il modo e avvia la creazione del primo foglio (dirigenti)
Logger.log("array incogruenze " + incongruenze)
var destinatari = 'dirigenti'
Logger.log("Verrà prodotto il foglio " + destinatari)

var html = creaFoglioPresenze(assenti, turni, contaTurni, presenzeEturni, date, destinatari, mode, user)

// avvia la creazione del secondo foglio (personale) 
var destinatari = 'personale'
Logger.log("Verrà prodotto il foglio " + destinatari)

// elimina la colonna "motivo"
var indexCol = 2 //è l'indice della colonna "motivo"
presenzeEturni = replaceCol(presenzeEturni,indexCol) // rimuove la colonna "motivo"
html = html + creaFoglioPresenze(assenti, turni, contaTurni, presenzeEturni, date, destinatari, mode, user)


var userProperties = PropertiesService.getUserProperties();
var progressivoRiepilogo  = parseInt(userProperties.getProperty('Riepiloghi_prodotti')) +1 
userProperties.setProperties({
   'Riepiloghi_prodotti' : progressivoRiepilogo
});
Logger.log(progressivoRiepilogo)

return [html,  progressivoRiepilogo]

//inviaFoglioPresenzeByMail(presenzeEturni,date)

}

function creaFoglioPresenze(assenti, turni, contaTurni, presenzeEturni, date, destinatari, mode, user){

// crea documento foglio presenze
Logger.log("creaFoglioPresenze")
Logger.log("date " + date)
Logger.log("mode " + mode)

  var formattedDate = Utilities.formatDate(new Date(date), "CET", "dd/MM/yyyy")
  var dateTime = Utilities.formatDate(new Date(), "CET", "dd/MM/yyyy HH:mm")
  var textUser = 'Documento prodotto in data  ' + dateTime
  var title = 'Presenze e turni contact center del giorno ' + formattedDate + ' (' + destinatari + ')'
  var totaleAssenze = 'Totale Assenze: ' + (assenti.length - 1) // non conteggia le intestazioni di assenti
  var riepilogoTurni = contaTurni
  
  // crea il documento nella cartella fogli presenze originali  
  
  var doc = DocumentApp.create(title)
  var docId = doc.getId() //es.   1YpjtPm87EGxmPmAUiCpDRLLTm3uRT2EMjh4kLjo_McM/
  var docFile = DriveApp.getFileById(docId); 
  
  // individua la cartella in cui salvare a seconda del modo e dei destinatari
  if (mode == 'anteprima'){
    DriveApp.getFolderById(originalDocFolderIdSegreteria).addFile( docFile );
  }
  else
  {  if (destinatari=='dirigenti'){
      DriveApp.getFolderById(originalDocFolderIdDirigenti).addFile( docFile ); 
      }
      else
      {
       DriveApp.getFolderById(originalDocFolderIdPersonale).addFile( docFile ); 
      }
  }
  
  DriveApp.getRootFolder().removeFile(docFile) 
  // inserisce un Header nel doc
  var header = doc.addHeader()
  var titlePara = header.appendParagraph(title)
  var paraAssenze = header.appendParagraph(totaleAssenze)
  var paraAssenze = header.appendParagraph(riepilogoTurni)
  
  
  if (mode == 'anteprima'){
    header.appendParagraph('')
    header.appendParagraph('Prospetto in Anteprima per la Segreteria').setAttributes(styleHighlight)
    header.appendParagraph('').setAttributes(styleNormal)
  }
  
  //inserisce le intestazioni del foglio presenza nell'header della table
  var headers = ["Nominativo","Assente","Motivo","Presidio Contact Center", "Note"]
  var tableHeader = header.appendTable().appendTableRow()
  for (var c=0; c<headers.length; c++){
    var cell = tableHeader.appendTableCell()
    cell.setText(headers[c])
     // formatta come intestazioni della tabella
    cell.setAttributes(styleHeaderTable)
  }
  
  // inserisce il Body nel documento
  
  var body = doc.getBody()

  // inserisce nel Body la Table con presenzeEturni
  Logger.log("inserisce la table con presenze e turni \n" + presenzeEturni)
  var table = body.appendTable(presenzeEturni)
  table.setAttributes(styleTable)
  
  // evidenzia righe con incongruenza da array "incongruenze"
  Logger.log("evidenzia righe")
    
    for ( var i = 0; i < incongruenze.length; ++i ) {
      var rowAlert = incongruenze[i]// in quanto le intestazioni sono nell'header fuori dalla table
      var tablerow = table.getRow(rowAlert)
      for (var c=0; c<tablerow.getNumCells(); c++){
              tablerow.getCell(c).setAttributes(styleHighlight)
      } 
      // formatta le note con carattere 8
      tablerow.getCell(4).setAttributes(styleNote)
      Logger.log("Highlighted " + rowAlert)
    }
  // centra i paragrafi dentro le celle
  Logger.log("numero di righe " + table.getNumRows())
  for (var row = 0; row<table.getNumRows(); row++){
    for(var col = 1; col<4; col++){
      var cell = table.getCell(row,col)
      Logger.log("cella (" + row + "," + col + ") = " + cell.getText())
      var para = cell.getChild(0)
        para.setAttributes(styleCentered)
    }
  }
  
  //compone il messaggio HTML per l'applicazione web
  if (incongruenze.length >0){
      var alertKO = "Attenzione ! Nel foglio presenze allegato sono state riscontrate incongruenze"
      var alertOK=''
      var HTMLAlert = '<p class="alerts" style="font-size:12px; color:red">' + alertKO + '</p>'
   }
   else{
     var alertKO =''
     var alertOK = '<p class="alerts" style="font-size:12px">Il foglio non presenta incongruenze tra le assenze e i turni di Contact Center</p>'
     var HTMLAlert = '<p class="alerts" style="font-size:12px">' + alertOK + '</p>'
   }
    
  // formatta il titolo
  titlePara.setAttributes(styleTitle)
  
  // aggiunge e riempie Footer
  var footer = doc.addFooter()
  //var footerContent = textUser + "\n" + alertKO
  //footer.appendParagraph(footerContent).setAttributes(styleFooter)
  footer.appendParagraph(textUser).setAttributes(styleFooter)
  footer.appendParagraph(alertKO).setAttributes(styleAlert)
  
  
   Logger.log ("HTMLalert = " +  HTMLAlert)
   
    // esporta il documento in PDF
    
    //var pdf = exportToPDF(doc)
    //Logger.log("pdfUrl " + pdfUrl)
    var docUrl = doc.getUrl()
    doc.saveAndClose()
    
    //var UrlCutted = docUrl.slice(0, (docUrl.length - 13))// taglia ?usp=drivesdk dall'url
    var UrlCutted = docUrl
    Logger.log("UrlCutted " + UrlCutted)
    
    switch(destinatari) {
    case 'dirigenti':
        var destA = dirigenti
        //var destCC = 'da.zappala@aci.it'
        var msgDestinatari = "Dirigenti"
        break;
    case 'personale':
        var destA = personale
        //var destCC = segreteria
        var msgDestinatari = "Personale"
        break;
    default:
        var htmlWeb = '<p class="line">Attenzione destinatario non definito</p>'
        Logger.log(htmlWeb)
        return htmlWeb
   }
 
if (mode=="anteprima"){
  destA=segreteria
  //destA = 'da.zappala@aci.it'
  var subjectMode = "Anteprima "
  var destCC=''
  var htmlWeb = 
      '<p class="line">'+ dateTime + ': L\'anteprima del Foglio Presenze '+ msgDestinatari +' del giorno ' + formattedDate + ' è stato inviato alla Segreteria.</p>' +
      '<p class="line">Per inviare il documento definitivo usare la funzione Produci e Invia ai destinatari</p>' + HTMLAlert + 
      '<p class="line" ><a href="' + UrlCutted + '" target="_blank">Clicca qui per visualizzare il contenuto</a><br />'+
      '<p class="line">--------------------------------------------------------------------------------------------------------------------------</p>'
   var htmlMail =  
         '<body>' + 
            '<p>Al seguente link il Foglio Presenze ' + msgDestinatari +' e dei turni contact center per la giornata del ' + formattedDate +'</p>' +
            '<p><a href="' + UrlCutted + '">Clicca qui per visualizzare il contenuto</a></p>'+
            '<p>'+ HTMLAlert +'</p>' +
            '<p>Dopo aver verificato il contenuto potete inviare da <a href="https://script.google.com/a/macros/aci.it/s/AKfycbzPASkTrlEXcRz59V-W5SrqAU76dn3jHHnz3H-uASE/dev" target="blank">qui</a>'
          '</body>'
}
else
{
var subjectMode = ""
var htmlWeb = 
      '<p class="line">' + dateTime + ': Foglio presenze ' + msgDestinatari +' del ' + formattedDate + ' inviato ai destinatari</p>' + HTMLAlert + 
      '<p class="line" ><a href="' + UrlCutted + '" target="_blank">Clicca qui per visualizzare il contenuto</a><br />'+
      '<p class="line">-----------------------------------------------------------------------------------------------------------------------------</p>'

      var htmlMail =  
         '<body>' + 
            '<p>Al seguente link il Foglio presenze e dei turni contact center per la giornata del ' + formattedDate +  '  <br /> <br />' + UrlCutted + '<br />' + HTMLAlert
          '</body>'
}

Logger.log("mode " + mode)
Logger.log(" Destinatari = " + destinatari)
Logger.log('destA ' + destA)

MailApp.sendEmail({
    to: destA,
    cc: destCC, //'da.zappala@aci.it, c.greblo@aci.it', //per i TEST 'da.zappala@aci.it',//
    subject: subjectMode + 'Foglio delle presenze e dei turni contact center per la giornata del ' + formattedDate,
    htmlBody: htmlMail  
})
 

Logger.log("fine creazione e invio foglio presenze")
Logger.log(htmlWeb)
return htmlWeb
}


function triggerFoglioPresenza(){
  var user = 'programma'
  var today = new Date()
  
  if (!isHoliday(today)){
    var date = Utilities.formatDate(today, "GMT", "dd/MM/yyyy")
    componiPresenzeEturni(date, user)
  }
} 


function clearDoc(){

  // cancella tutto il contenuto del doc

  var docId = '12ksNFiO16WAzdMS5qfykDZ3jcCoL45VUq5hQQOOsS1A'
  var doc = DocumentApp.openById(docId)
  
  if (doc.getHeader() === null){
  }
  else{
    doc.getHeader().clear()
  }

  //doc.setText('')

  var body = doc.getBody();
  body.clear()

 // Remove all images in the document body.
 var imgs = body.getImages();
 for (var i = 0; i < imgs.length; i++) {
   imgs[i].removeFromParent();
 }
 
  doc.getFooter().clear()
  //salva e chiude il doc
  doc.saveAndClose()
  
}

function cercaMotivoAssenza(codiceAssenza){

var idFoglioInserimento = '1jYRU0gTixF_4qTRb0xyq712vu0RRBKiIq2g0Q84jowU'
var ss = SpreadsheetApp.openById(idFoglioInserimento)
var sheet = ss.getSheetByName('Codici')
var numRows = sheet.getLastRow()-1
//preleva le colonne Etichetta, Straordinario, Motivo)
var range = sheet.getRange(2, 7, numRows, 3)
var data = range.getValues()

for (x=0; x<numRows; x++){
    if (data[x][0] == codiceAssenza){
      return data[x][2]
    }
  }
     Logger.log("motivo non trovato per il codice " + codiceAssenza)
     var codAbbr = "COD. " + codiceAssenza.slice(0,2)
     return codAbbr
}

function exportToPDF(source, destinatari){
  Logger.log('exportToPdf')
  var approvedFolderId = '0B4Y-h7pZmusUdE50eGdiZ1N5Umc' //Fogli presenza confermati
  var originalFolderId = '0B4Y-h7pZmusUd3lvZ2VYbUVEVEU' //Fogli presenza originali
  var originalFolder = DriveApp.getFolderById(originalFolderId)
  var approvedFolder = DriveApp.getFolderById(approvedFolderId)
  var source,
      emailList,
      file,
      pdf,
      sourceName = source.getName(),
      pdfName = sourceName + '.pdf'
  var
      fileId = source.getId(),
      subject = sourceName,
      body = 'In allegato il ' + sourceName
  var attachment
  var sourceId = source.getId()
  var sourceFile = DriveApp.getFileById(sourceId).setName(source.getName())
  originalFolder.addFile(sourceFile)
  var pdf = DriveApp.getFileById(sourceId).getAs('application/pdf').getBytes()
  
  if (destinatari == 'dirigenti')
  {
    emailList = 'da.zappala@aci.it'
  }
  else{
    emailList = 'danielezappala@scenariopubblico.com'
  }
  
  attachment = {fileName: pdfName, 
                content:pdf, 
                mimeType:'application/pdf'};
  MailApp.sendEmail(emailList, 
                    subject,
                    body,
                   {attachments:[attachment]});
  return 
}
