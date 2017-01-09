var approvedDocFolderId = '0B4Y-h7pZmusUdE50eGdiZ1N5Umc' //Fogli presenza confermati
var originalDocFolderIdPersonale= '0B4Y-h7pZmusUd3lvZ2VYbUVEVEU' //Fogli presenza originali personale
var originalDocFolderIdDirigenti='0B4Y-h7pZmusUTGhoOEFNcGd2OU0' //Fogli presenza originali dirigenti
var originalDocFolderIdSegreteria='0B4Y-h7pZmusUWU1yejI3OFZSN28' //Fogli presenza originali segreteria
var user = searchUserData(Session.getActiveUser())
var ssAgenda = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1vJvjg-jssHkDZIo53KMddEP5wHE09QRcNHmiebC3k9s/edit#gid=1064596730')

/*
//PRODUZIONE
segreteria = 'p.rocchetti@aci.it, g.polidori@aci.it, s.antonielli@aci.it, da.zappala@aci.it, c.greblo@aci.it'
dirigenti = 'g.brandi@aci.it, a.astuto@aci.it' 
personale = 'm.amoroso@aci.it, s.antonielli@aci.it, r.benci@aci.it, i.bonitatibus@aci.it, a.cappelli@aci.it,'+
'cl.conti@aci.it, o.delvecchio@aci.it, r.diblasio@aci.it, r.dominici@aci.it, m.fazzi@aci.it, p.ferrari@aci.it,'+
'r.formosa@aci.it, s.lauri@aci.it, a.luchetti@aci.it, a.manfroi@aci.it, p.manieri@aci.it, c.moscatelli@aci.it,'+
'p.piccirilli@aci.it, a.pietrini@aci.it, a.pignataro@aci.it, g.polidori@aci.it, f.putaturo@aci.it, p.rocchetti@aci.it,'+
't.santucci@aci.it, m.schiavone@aci.it, e.semprini@aci.it, s.sinigaglia@aci.it, r.sposato@aci.it, f.stamati@aci.it,'+
'm.sterpetti@aci.it, d.sturniolo@aci.it, l.troisi@aci.it, a.ceolini@aci.it, r.derudas@aci.it, b.falcinelli@aci.it,'+
'm.fois@aci.it, c.greblo@aci.it, a.musto@aci.it, g.podesta@aci.it, a.vitto@aci.it, da.zappala@aci.it' // 00_Servizio Gestione PRA <
*/


// TEST
var dirigenti = 'da.zappala@aci.it' 
var personale = 'danielezappala@scenariopubblico.com' 
var segreteria = 'da.zappala@aci.it' 

var loader =  '<div id="loader" class="loader">' +
      '<svg class="circular" viewBox="25 25 50 50">'+
       ' <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>'+
      '</svg> </div>'
var progressivoRiepilogo = 0 
      