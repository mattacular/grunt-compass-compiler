var grunt	= require('grunt'),
	fs		= require('fs');

exports.handlebars = function (test) {
	'use strict';

	var i, actual, expected, activeTest, tests;

	// define tests for the handlebars task here
	tests = [
		{
			name: 'vanilla',
			files: ['test-no-options/expected/test.css'],
			assertion: 'The vanilla (no options) compiled output should match expected folder.'
		},
		{
			name: 'all',
			files: ['test-all-options/expected/test.css'], 
			assertion: 'The "all options" output should match the expected folder.'
		}
	];

	test.expect(tests.length);

	for (i = 0; i < tests.length; i += 1) {
		activeTest = tests[i];


		actual = grunt.file.read('tmp/out' + activeTest.prefix + '.compiled.js');
		expected = grunt.file.read('test/expected/helloWorld' + activeTest.prefix + '.compiled.js');

		test.equal(actual, expected, activeTest.assertion);
	}

	test.done();
};