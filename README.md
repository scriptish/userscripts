# userscripts  [![Build Status](https://travis-ci.org/scriptish/userscripts.png)](https://travis-ci.org/scriptish/userscripts)

[![NPM](https://nodei.co/npm/userscripts.png?stars&downloads)](https://nodei.co/npm/userscripts/)
[![NPM](https://nodei.co/npm-dl/userscripts.png)](https://nodei.co/npm/userscripts)

## About

This package contains modules which allow one to easily package user scripts within their addon using the Add-on SDK.  The package can also be used to convert a user script into a add-on.

The module of particualy importance is the `userscript` module, which directly allows a consumer to 'create'/initialize/load user scripts.

## Example

    var self = require("self");
    var {UserScript} = require("userscript");
    exports.main = function() {
      UserScript(self.data.url("test.user.js"));
    };
