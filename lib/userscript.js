
var Script = exports.Script = function Script(config) {
  this._config = config;
  this._observers = [];

  this._downloadURL = null; // Only for scripts not installed
  this._tempFile = null; // Only for scripts not installed
  this._basedir = null;
  this._filename = null;

  this._name = null;
  this._namespace = null;
  this._description = null;
  this._enabled = true;
  this._includes = [];
  this._excludes = [];
  this._requires = [];
  this._resources = [];
  this._unwrap = false;

  this.source = "";
}

Script.prototype = {
  get prefPrefix () {
    return ["greasemonkey.scriptvals.",
             this._namespace,
             "/",
             this._name,
             "."].join("");
  },

  matchesURL: function(url) {
    var test = function(pattern) {
      return pattern.test(url);
    }

    return this._includes.some(test) && !this._excludes.some(test);
  },

  _changed: function(event, data) {
    if(this._config) {
      this._config._changed(this, event, data);
    }
  },

  get name() { return this._name; },
  get namespace() { return this._namespace; },
  get description() { return this._description; },

  get enabled() { return this._enabled; },
  set enabled(enabled) {
    this._enabled = enabled;
    this._changed("edit-enabled", enabled);
  },

  get includes() { return this._includes.concat(); },
  get excludes() { return this._excludes.concat(); },
  addInclude: function(url) {
    this._includes.push(url);
    this._changed("edit-include-add", url);
  },
  removeIncludeAt: function(index) {
    this._includes.splice(index, 1);
    this._changed("edit-include-remove", index);
  },
  addExclude: function(url) {
    this._excludes.push(url);
    this._changed("edit-exclude-add", url);
  },
  removeExcludeAt: function(index) {
    this._excludes.splice(index, 1);
    this._changed("edit-exclude-remove", index);
  },

  get requires() { return this._requires.concat(); },
  get resources() { return this._resources.concat(); },
  get unwrap() { return this._unwrap; }
};
