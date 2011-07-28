
var {Cc, Ci, Cu} = require("chrome");
var {GM_API} = require("greasemonkey-api");

exports.createSandbox = function createSandbox(safeWin, userScript) {
  var script = userScript.source;
  var sandbox = new Cu.Sandbox(safeWin);
  sandbox.window = safeWin;
  sandbox.document = sandbox.window.document;
  sandbox.__proto__ = safeWin;
  var api = new GM_API(userScript, null, null, safeWin);

  for (var key in api) {
    sandbox[key] = api[key];
  }

  return sandbox;
};

exports.evalInSandbox = function(code, sandbox, jsVersion) {
  Cu.evalInSandbox("(function(){"+code+"})();", sandbox, "1.8");
};