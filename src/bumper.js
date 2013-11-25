function createClass(config) {
	"use strict";

	if(!config) config = {};

	var semver = require("semver"),
		extend = config.extend || require("lodash").extend,
		readPackage = config.readPackage || function(path) {
			return require("fs").readFileSync(path, "utf8")
		},
		writePackage = config.writePackage || function(path, text) {
			return require("fs").writeFileSync(path, text, "utf8");
		},
		serialize = config.serialize || function(data) {
			return JSON.stringify(data, null, 2);
		},
		deserialize = config.deserialize || function(text) {
			return JSON.parse(text);
		};

	/**
	 * BumpPackageVersion Task Class
	 * @param {object} params
	 */
	function Bumper(params) { extend(this, params); }

	// Default file path
	Bumper.prototype.filePath = "package.json";

	/**
	 * Execute the task
	 * @param  {string} type Version type (major, minor, patch)
	 * @return {string}      new bumped version
	 */
	Bumper.prototype.execute = function(type) {
		var path = this.filePath, text, data, serialized;

		// Read the package and deserialize
		text = readPackage(path),
		data = deserialize(text),

		// Set the version, serialize, and write
		data.version = semver.inc(data.version, type);
		serialized = serialize(data);
		writePackage(path, serialized);

		return data.version;
	}

	// Bump minor version
	Bumper.prototype.minor = function() {
		return this.execute("minor");
	}

	// Bump major version
	Bumper.prototype.major = function() {
		return this.execute("major");
	}

	// Bump patch version
	Bumper.prototype.patch = function() {
		return this.execute("patch");
	}

	return Bumper;
}

module.exports = {
	createClass: createClass
};