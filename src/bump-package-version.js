function factory(config) {

	var semver = require("semver"),
		extend = require("lodash").extend,
		$ = {
			readPackage: function(path) {
				return require("fs").readFileSync(path, "utf8")
			},
			writePackage: function(path, text) {
				return require("fs").writeFileSync(path, text, "utf8");
			},
			serialize: function(data) {
				return JSON.stringify(data, null, 2);
			},
			deserialize: JSON.parse
		};

	// Override default configuration if provided
	if(config !== void 0) extend($, config);

	/**
	 * BumpPackageVersion Task Class
	 * @param {object} params
	 */
	function BumpPackageVersion(params) { extend(this, params); }

	// Default file path
	BumpPackageVersion.prototype.filePath = "package.json";

	/**
	 * Execute the task
	 * @param  {string} type Version type (major, minor, patch)
	 * @return {string}      new bumped version
	 */
	BumpPackageVersion.prototype.execute = function(type) {
		var path = this.filePath, text, data, serialized;

		// Read the package and deserialize
		text = $.readPackage(path),
		data = $.deserialize(text),

		// Set the version, serialize, and write
		data.version = semver.inc(data.version, type);
		serialized = $.serialize(data);
		$.writePackage(path, serialized);

		return data.version;
	}

	// Bump minor version
	BumpPackageVersion.prototype.minor = function() {
		return this.execute("minor");
	}

	// Bump major version
	BumpPackageVersion.prototype.major = function() {
		return this.execute("major");
	}

	// Bump patch version
	BumpPackageVersion.prototype.patch = function() {
		return this.execute("patch");
	}

	return BumpPackageVersion;
}

module.exports = factory;