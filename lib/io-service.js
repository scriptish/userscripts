
var ioService = Cc["@mozilla.org/network/io-service;1"]
                  .getService(Ci.nsIIOService);

exports.getProtocolFlags = function getProtocolFlags(aScheme) {
  return ioService.getProtocolFlags(aScheme);
}

exports.allowPort = function allowPort(aPort, aScheme){
  return ioService.allowPort(aPort, aScheme);
}

exports.extractScheme = function extractScheme(urlString){
  return ioService.extractScheme(urlString);
}
