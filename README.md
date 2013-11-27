npm-package-bumper
==================

Bump an npm package.json version (minor, major, patch).

* Update: Now basically a wrapper for [bump-anything][] with its default configuration.

## Installation

`npm install npm-package-bumper`

## Usage

```javascript

var bumper = require("npm-package-bumper");

bumper.major("package.json");
bumper.minor("package.json");
bumper.patch("package.json");

```

That's it. Easy peasy.

## Documentation

See the [bump-anything][] documentation.

[bump-anything]: http://github.com/christianbradley/bump-anything