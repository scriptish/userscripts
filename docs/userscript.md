<!-- contributed by Erik Vold [erikvvold@gmail.com]  -->

The `userscript` module allows modules to create user scripts which automatically
start running on windows opened after the user script is created.


## Example ##
    var scripts = ["test.user.js"];
    var self = require("self");
    var {UserScript} = require("userscript");
    exports.main = function() {
      scripts.forEach(function(scriptName, index) {
        UserScript(self.data.url(scriptName));
      });
    };


<api name="UserScript">
@class

The module exports a `UserScript` constructor which allowing one to create a
user script.

<api name="UserScript">
@constructor
Creates a user script.

@param aURL {String}
  The url of a user script on the local file system, so this url can be a
  `resource:`, `file:`, or `chrome:` for example.
</api>

<api name="destroy">
@method
The user script will no longer be injected into new windows, you will have to
create a new user script in order to run the script again.
</api>
</api>
