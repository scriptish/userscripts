/* ***** BEGIN LICENSE BLOCK *****
 * Version: MIT/X11 License
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Contributor(s):
 *   Erik Vold <erikvvold@gmail.com> (original author)
 *
 * ***** END LICENSE BLOCK ***** */

var {Services} = require("services");
var obs = require("observer-service");
var sandboxFactory = require("userscript-sandbox");

var userscripts = [];

// TODO: register obs only when there is a userscript
obs.add("content-document-global-created", docReady);
obs.add("chrome-document-global-created", docReady);

function docReady(safeWin, data) {
  let href = (safeWin.location.href
      || (safeWin.frameElement && safeWin.frameElement.src)) || "";

  safeWin.addEventListener("load", function() {
    userscripts.forEach(function(script) {
      // check that the userscript should be run on this page
      if (!script.matchesURL(href))
        return;

      sandboxFactory.evalInSandbox(
          script._source,
          sandboxFactory.createSandbox(safeWin, script, href),
          script.jsversion);
    });
  }, true);
}

exports.register = function(aScript) {
  unregister(aScript);
  userscripts.push(aScript);
};

var unregister = exports.unregister = function unregister(aScript) {
  for (var i = userscripts.length - 1; ~i; i--) {
    if (userscripts[i] == aScript) {
      userscripts.splice(i, 1);
      break;
    }
  }
};
