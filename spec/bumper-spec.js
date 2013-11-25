var expect = require("chai").expect,
	sinon = require("sinon");

describe("Bumper", function() {
	"use strict";

	var updated = void 0,
		path = "path/to/package.json",
		readPackage,
		writePackage,
		sandbox,
		Bumper,
		bumper,
		defaultBumper;

	beforeEach(function() {
		sandbox = sinon.sandbox.create();

		readPackage = sandbox.spy(function() {
			return '{ "version": "1.1.1" }';
		});

		writePackage = sandbox.spy(function(path, text) {
			updated = JSON.parse(text);
		});

		Bumper = require("../src/bumper").createClass({
			writePackage: writePackage,
			readPackage: readPackage
		});

		defaultBumper = new Bumper();
		bumper = new Bumper({ filePath: path });
	});

	afterEach(function() {
		updated = void 0;
		sandbox.restore();
	});

	it("defaults the filePath", function() {
		defaultBumper.execute("major");
		expect(defaultBumper.filePath).to.eql("package.json");
		sinon.assert.calledWith(readPackage, "package.json");
		sinon.assert.calledWith(writePackage, "package.json");
	});

	it("uses the supplied filePath", function() {
		bumper.execute("patch");
		expect(bumper.filePath).to.eql(path);
		sinon.assert.calledWith(readPackage, path);
		sinon.assert.calledWith(writePackage, path);
	});

	it("bumps major version", function() {
		var expected = "2.0.0";
		expect(bumper.major()).to.eql(expected);
		expect(updated.version).to.eql(expected);
	});

	it("bumps minor version", function() {
		var expected = "1.2.0";
		expect(bumper.minor()).to.eql(expected);
		expect(updated.version).to.eql(expected);
	});

	it("bumps patch version", function() {
		var expected = "1.1.2";
		expect(bumper.patch()).to.eql(expected);
		expect(updated.version).to.eql(expected);
	});

});
