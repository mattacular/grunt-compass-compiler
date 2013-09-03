var grunt	= require('grunt'),
	fs		= require('fs');

exports.compass = function (test) {
	'use strict';

	var i, actual, expected, activeTest, tests;

	// define tests for the compass task here
	tests = [
		{
			name: 'vanilla',
			compare: 'test-no-options/tmp/test.css',
			expected: 'test-no-options/expected/test.css',
			assertion: 'The vanilla (no options) compiled output should match expected folder.'
		},
		{
			name: 'all',
			compare: 'test-all-options/tmp/test.css',
			expected: 'test-all-options/expected/test.css',
			assertion: 'The "all options" output should match the expected folder.'
		}
	];

	test.expect(tests.length);

	for (i = 0; i < tests.length; i += 1) {
		activeTest = tests[i];

		actual = grunt.file.read('tests/modules/' + activeTest.compare);
		expected = grunt.file.read('tests/modules/' + activeTest.expected);

		test.equal(actual, expected, activeTest.assertion);
	}

	test.done();
};