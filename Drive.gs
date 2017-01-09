function moveFile(doc, destFolder){

doc.saveAndClose()

// var destFolder = DriveApp.getFolderById('0B4Y-h7pZmusUQ29oVkVCNUwySFE')

var docUrl = doc.getUrl()
var docId = doc.getId()
var fileDoc = DriveApp.getFileById(docId)
var folders = fileDoc.getParents()
while (folders.hasNext()){
  var folder = folders.next()
}

var folderId = folder.getId()

destFolder.addFile(fileDoc)

folder.removeFile(fileDoc)
    
Logger.log("doc " + docUrl)

}



function cutString(){
var docId = '1EgxV2ZU7K3VOMR_Jw5Bj1_bwc3dKMn1YZwpNx18FbMc'
var fileDoc = DriveApp.getFileById(docId)
var docUrl = fileDoc.getUrl()
var stringUrl = docUrl
var stringUrlCutted = stringUrl.slice(0, (stringUrl.length - 13)) // taglia ?usp=drivesdk dal url
    
  var a= "prova/54321"
  s = a.slice(0, (a.length - 5))
  Logger.log(s)
}
