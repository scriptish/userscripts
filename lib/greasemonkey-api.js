
var {Services} = require("services");
var prefService = require("preferences-service");
var tabBrowser = require("tab-browser");
var clipboard = require("clipboard");

function GM_API(aScript, aURL, aWinID, aSafeWin, aUnsafeContentWin, aChromeWin) {
  var document = aSafeWin.document;
  var windowID = aWinID;

  this.GM_addStyle = function GM_addStyle(css) {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    if (head) {
      style.textContent = css;
      style.type = "text/css";
      head.appendChild(style);
    }
    return style;
  };

  this.GM_getValue = function GM_getValue(name, defVal) {
    return prefService.get(aScript.prefPrefix + name, defVal);
  };

  this.GM_setValue = function GM_setValue(name, val) {
    return prefService.set(aScript.prefPrefix + name, val);
  };
};
exports.GM_API = GM_API;

GM_API.prototype.GM_openInTab = function GM_openInTab(url) {
  tabBrowser.addTab(url);
};

GM_API.prototype.GM_setClipboard = function GM_setClipboard(aData, aType) {
  return clipboard.set(aData, aType);
};

GM_API.prototype.GM_generateUUID = function GM_generateUUID() (
    Services.uuid.generateUUID().toString());

GM_API.prototype.GM_registerMenuCommand = function() {};
