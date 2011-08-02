
var scripts = [	"test.user.js"];

var self = require("self");
var {UserScript} = require("userscript");

exports.main = function() {
  scripts.forEach(function(scriptName, index) {
    UserScript(self.data.url(scriptName));
  });
};

