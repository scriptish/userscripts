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

exports.parse = function(aSource) {
  var headers = {};
  var foundMeta = false;
  var line;

  // do not 'optimize' by reusing this reg exp! it should not be reused!
  var metaRegExp = /\/\/[ \t]*(?:==(\/?UserScript)==|\@(\S+)(?:[ \t]+([^\r\f\n]+))?)/g;

  // read one line at a time looking for start meta delimiter or EOF
  while (line = metaRegExp.exec(aSource)) {
    if (line[1]) {
      if ("userscript" == line[1].toLowerCase()) {
        foundMeta = true; // start
        continue;
      } else {
        break; // done
      }
    }
    if (!foundMeta) continue;

    var header = line[2].toLowerCase();
    var value = line[3];

    if (!headers[header]) headers[header] = [value];
    else headers[header].push(value);
  }

  return headers;
};
