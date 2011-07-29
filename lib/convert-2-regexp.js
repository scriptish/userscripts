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
 *   Nils Maier <MaierMan@web.de>
 *   Erik Vold <erikvvold@gmail.com>
 *
 * ***** END LICENSE BLOCK ***** */

"user strict";

const RE_REGEXP = /^\/(.*)\/(i)?$/;
const RE_ESCAPE = /[{}()\[\]\\^$.?]/g;
const RE_WILD = /\*+/g;
const RE_TLD = /^\^[^\/]*(?:\/\/)?[^\/]*\\\.tld(?:\/.*)?\$$/;

exports.convert2RegExp = function Scriptish_convert2RegExp(aPattern, aNoTLD, forceString) {
  var s = aPattern.toString().trim(), m;

  // Already a regexp?
  if (!forceString && (m = s.match(RE_REGEXP))) {
    return new RegExp(m[1], m[2]);
  }

  var res = "^" + s
    .replace(RE_ESCAPE, "\\$&")
    .replace(RE_WILD, ".*")
    + "$";
  var regExp = new RegExp(res, "i");
  regExp.isTLD = !aNoTLD && RE_TLD.test(res);
  return regExp;
}
