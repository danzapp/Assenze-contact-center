function compareDate() {
  var date1 = new Date("07/21/2016").getTime()
  var date2 = new Date("07/21/2016").getTime()
  if (date1 == date2) {
    Logger.log (date1 + "is equal to " + date2)
  }
  else
  {
    Logger.log (date1 + " is NOT equal to " + date2)
  }
  
}

function testGetMonth(){
var date = "2016-07-21"
Logger.log(date)
var month = date.getMonth() + 1
Logger.log (month)
}

function replaceCol(arr2d, colIndex) {
/*
var arr2d=[["a", "b", "c"], ["1","X","1"],["2",,,"1"]]
var colIndex = 1
*/
    for (var i = 0; i < arr2d.length; i++) {
      for (var y=0; y<arr2d[i].length; y++){
          if(arr2d[i][2] !='') { 
              arr2d[i][2] = '---'
          }
      }
     }
  Logger.log("array con colonna rimossa " + arr2d);
  return arr2d
  //[["a", "b"],["a", "b"],["a", "b",]];
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


function sum(myArray){
    if(typeof Array.prototype.sum !== 'function') {

	Arra.prototype.sum = function() {

		var total = 0;
	
		for(var i = 0; i < this.length; i += 1) {
	
			total += this[i];
	
		}
        Logger.log("totale elementi rxc= " + total)
		return total;

	};
  }
}

function printConditionalString( proposizione, quantum, min, max, target ){
 var costrutto = {
    verbo : {
      singolare: 'risulta',
      plurale: 'risultano'
    },
    sostantivo: {
      singolare: 'turno',
      plurale: 'turni'
    },
    aggettivo: {
      principale: {
         singolare: 'scoperto',
         plurale: 'scoperti'
      }, 
      
      contrario:   {
         singolare: 'coperto',
         plurale: 'coperti'
      }
     
   }
   
  }
   
var errore = []
errore[1] = 'La quantità eccede i limiti'
var messaggio

  if (quantum < min || quantum > max) {
    Logger.log (errore[1] )
    return errore[1]
  }
  
     
  switch (quantum) {
      
    case 0: 
      if (proposizione == 'affermazione' ){
        messaggio = 'nessun' + costrutto.sostantivo.singolare + ' ' + costrutto.verbo.singolare + ' ' + costrutto.aggettivo.principale.singolare + '.'
      }
      else {
        messaggio = costrutto.verbo.plurale  + ' ' +  costrutto.sostantivo.plurale + ' ' +   costrutto.aggettivo.principale.plurale + '.'
      }
      break;   
    case 1:
      
        messaggio = costrutto.verbo.singolare + ' ' + quantum + ' '  + costrutto.sostantivo.singolare + ' ' + costrutto.aggettivo.principale.singolare + '.'
      break;
      
    default : 
      messaggio = costrutto.verbo.plurale + ' ' + quantum + ' ' + costrutto.sostantivo.plurale + ' ' + costrutto.aggettivo.principale.plurale + '.'
  }
  
  Logger.log(messaggio)
  return messaggio
}