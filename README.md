npm-package-bumper
==================

Bump an npm package.json version (minor, major, patch).

* Update: Now basically a wrapper for [bump-anything][] with its default configuration.

## Installation

`npm install npm-package-bumper`

## Usage

```javascript

var bumper = require("npm-package-bumper").configure();

// or 'minor', or 'patch'
bumper.major("package.json").then(onResolve, onReject);

```

That's it. Easy peasy.

## Documentation

See the [bump-anything][] documentation.

[bump-anything]: http://github.com/christianbradley/bump-anything
