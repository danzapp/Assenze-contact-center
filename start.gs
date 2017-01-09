function doGet(e){     
   var template = HtmlService.createTemplateFromFile('Index');

  // Build and return HTML in NATIVE sandbox mode.
  return template.evaluate()
      .setTitle('Foglio giornaliero presenze e contact center')
      .setSandboxMode(HtmlService.SandboxMode.NATIVE);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}