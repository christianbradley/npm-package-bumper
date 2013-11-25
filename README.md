npm-package-bumper
==================

Bump an npm package.json version (minor, major, patch).
Uses [semver](https://github.com/isaacs/node-semver) for versioning.


## Basic Example

The default implementation will use a filePath of "package.json".

```javascript
var bump = require("npm-package-bumper");

bump.major();
// or
bump.minor();
// or
bump.patch();

```

That's it. Easy peasy.


## Configuration

Designed to be highly configurable through dependency injection and class
configuration.

If you'd like a custom "bumper", simply create a new configured class, and
then create a new class instance:

```javascript
var config = { /* class configuration options */ },
	params = { /* class instance parameters */ },
	Bumper = require("npm-package-bumper").bumper.createClass(config),
	bumper = new Bumper(params);

	bumper.major(); // or minor or patch
```

### Class Configuration

The configuration object for Bumper classes allows you to inject dependencies
and customize the default behavior to your needs.


#### config.extend

Extend an object using provided sources.
Uses [lodash](http://lodash.com) "extend" by default.

```javascript
function extend(target, s1 /* ...s2, s3 */ ) {
	// extend and return object
}
```


#### config.readPackage

A synchronous function for reading the package contents.
Defaults to `fs.readFileSync` with "utf8" encoding.

```javascript
function readPackage(path) {
	// read package file from filesystem
}
```


#### config.writePackage

A synchronous function for writing the package contents.
Defaults to `fs.writeFileSync` with "utf8" encoding.

```javascript
function writePackage(path, content) {
	// writes package file to filesystem
}
```


#### config.serialize

A serialization function for converting the package object to JSON.
Defaults to `JSON.stringify` with 2 spaces indentation.

```javascript
function serialize(data) {
	// returns stringified data
}
```


#### config.deserialize

A deserialization function for converting JSON to a Javascript object.
Defaults to `JSON.parse` with no customization.

```javascript
function deserialize(serialized) {
	// return an object
}
```


### Class Parameters

The following parameter(s) are used to create class instances.

#### params.filePath

The filePath that will be passed to readPackage and writePackage functions.
Defaults to "package.json";

```
new Bumper({ filePath: "path/to/package.json" });
```


## API

The index (ie: `require` call) exposes the following objects and methods:

#### major(), minor(), patch()

Using the default configuration, bump the specified version of the local "package.json".

#### bumper

Exposes the inner bumper namespace:

#### bumper.createClass(config) => Bumper

Create a custom `Bumper` class using the provided configuration.

#### new Bumper(config).execute(type)

Bump `type` version ("patch", "major", "minor").

#### new Bumper(config).major()

Bump major version.

#### new Bumper(config).minor()

Bump minor version.

#### new Bumper(config).patch()

Bump patch version.


