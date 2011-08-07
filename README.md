# User Scripts Jetpack Package

## About

This package contains modules which allow one to easily package user scripts within their addon using the Add-on SDK.  The package can also be used to convert a user script into a add-on.

The module of particualy importance is the `userscript` module, which directly allows a consumer to 'create'/initialize/load user scripts.

## Dependencies

* [vold-utils](https://github.com/erikvold/vold-utils-jplib)
* addon-kit (shipped with Add-on SDK)
* api-utils (shipped with Add-on SDK)

## Example

    var self = require("self");
    var {UserScript} = require("userscript");
    exports.main = function() {
      UserScript(self.data.url("test.user.js"));
    };
