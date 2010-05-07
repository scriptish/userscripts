
var prefService = require("preferences-service");
var tabBrowser = require("tab-browser");

exports.GM_addStyle = function GM_addStyle(doc, css) {
  var head = doc.getElementsByTagName("head")[0];
  var style = doc.createElement("style");
  if (head) {
    style.textContent = css;
    style.type = "text/css";
    head.appendChild(style);
  }
  return style;
}

exports.GM_openInTab = function GM_openInTab(url) {
  tabBrowser.addTab(url);
}

exports.GM_getValue = function GM_getValue(prefix, name, defVal) {
  return prefService.get(prefix + name, defVal);
}

exports.GM_setValue = function GM_setValue(prefix, name, val) {
  return prefService.set(prefix + name, val);
}
