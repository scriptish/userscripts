
var GM = require("greasemonkey-api");

exports.createSandbox = function createSandbox(safeWin, userScript) {
  var script = userScript.source;
  var sandbox = new Cu.Sandbox(safeWin);
  sandbox.window = safeWin;
  sandbox.document = sandbox.window.document;
  sandbox.__proto__ = safeWin;

  var pref_prefix = userScript.prefPrefix;

  sandbox.GM_addStyle = function(css) {
    return GM.GM_addStyle(sandbox.document, css);
  };
  sandbox.GM_openInTab = function(url) {
    GM.GM_openInTab(url);
  };
  sandbox.GM_getValue = function(name, defVal) {
    return GM.GM_getValue(pref_prefix, name, defVal);
  };
  sandbox.GM_setValue = function(name, val) {
    GM.GM_setValue(pref_prefix, name, val);
  };
  sandbox.GM_registerMenuCommand = function() {};


  return sandbox;
};

exports.evalInSandbox = function(code, sandbox, jsVersion) {
  Cu.evalInSandbox("(function(){"+code+"})();", sandbox, "1.8");
};