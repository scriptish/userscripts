
var convert2RegExp = require("convert-2-regexp").convert2RegExp;
var userscript = require("userscript");

exports.parse = function(source) {
  var script = new userscript.Script();
  script.source = source;
  script._enabled = true;

  // read one line at a time looking for start meta delimiter or EOF
  var lines = source.match(/.+/g);
  var lnIdx = 0;
  var result = {};
  var foundMeta = false;

  while ((result = lines[lnIdx++])) {
    if (result.indexOf("// ==UserScript==") == 0) {
      foundMeta = true;
      break;
    }
  }

  // gather up meta lines
  if (foundMeta) {
    // used for duplicate resource name detection
    var previousResourceNames = {};

    while ((result = lines[lnIdx++])) {
      if (result.indexOf("// ==/UserScript==") == 0) {
        break;
      }

      var match = result.match(/\/\/ \@(\S+)(?:\s+([^\n]+))?/);
      if (match === null) continue;

      var header = match[1];
      var value = match[2];
      if (value) { // @header <value>
        switch (header) {
          case "name":
          case "namespace":
          case "description":
            script["_" + header] = value;
            break;
          case "include":
            script._includes.push(convert2RegExp(value));
            break;
          case "exclude":
            script._excludes.push(convert2RegExp(value));
            break;
          }
        }
      }
    }

    // if no meta info, default to reasonable values
    if (script._name == null) script._name = parseScriptName(uri);
    if (script._namespace == null) script._namespace = uri.host;
    if (!script._description) script._description = "";
    if (script._includes.length == 0) script._includes.push("*");

    return script;
  }