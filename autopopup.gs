function autoPopup(alertMessage) {

  var w = 400
  var h=200
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  var stili = "top="+top+", left="+left+", width="+w+", height="+h+", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no";
  var testo = window.open("", "", stili);
    
  testo.document.write("<html>\n");
  testo.document.write(" <head>\n");
  testo.document.write("  <title>Operazione non valida</title>\n");
  var style= "<!-- This CSS package applies Google styling; it should always be included. -->"+
    "<link rel='stylesheet'"+ 
    "href='https://ssl.gstatic.com/docs/script/css/add-ons.css'>"
  testo.document.write(style)
  testo.document.write("  <basefont size=2 face=Arial>\n");
  testo.document.write(" </head>\n");
  testo.document.write("<body topmargin=50>\n");
  testo.document.write("<div align=center><br>"+ alertMessage +"</a></div>\n");
  var buttonHtml = "<input type='button' class='btn btn-secondary' name='OK' value='OK' onclick='window.close()'>"
  testo.document.write("<div align=center><br>"+ buttonHtml +"</a></div>\n");
  testo.document.write("</body>\n");
  testo.document.write("</html>");
 }
