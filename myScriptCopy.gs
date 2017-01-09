function zeroPad(number, width) {

/**
* Converte un numero "number" in stringa anteponendo tanti zero in maniera che la lunghezza della stringa sia "width"
*
* @param {number} il numero al quale aggiungere gli zeri
* @param {width} il numero totale di cifre
* @return {string} restituisce il numero con gli zeri anteposti
*/

var string = String(number);
while (string.length < width)
string = "0" + string;
return string;
}


function filterByProperty(array, prop, value){
/**
* filtra l'array bidimensionale in base al valore "value" della colonna "prop"
*
* @param {array} l'array bidimensionale da filtrare
* @param {prop} il nome della "colonna" sulla quale applicare il filtro
* @return {value} il valore da filtrare 
*/

    var filtered = [];
    for(var i = 0; i < array.length; i++){

        var obj = array[i];

        for(var key in obj){
            if(typeof(obj[key] == "object")){
                var item = obj[key];
                if(item[prop] == value){
                    filtered.push(item);
                }
            }
        }

    }    

    return filtered;

}