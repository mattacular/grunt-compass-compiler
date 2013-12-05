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
		},
		{
			name: 'many',
			compare: 'test-many/tmp/test1.css',
			expected: 'test-many/expected/test1.css',
			assertion: 'The first of ten in the "many" test should match the expected folder.'
		},
		{
			name: 'many2',
			compare: 'test-many/tmp/test5.css',
			expected: 'test-many/expected/test5.css',
			assertion: 'The fifth of ten in the "many" test should match the expected folder.'
		},
		{
			name: 'many3',
			compare: 'test-many/tmp/test10.css',
			expected: 'test-many/expected/test10.css',
			assertion: 'The tenth of ten in the "many" test should match the expected folder.'
		},
		{
			name: 'external',
			compare: 'test-external-config/module1/tmp/test.css',
			expected: 'test-external-config/module1/expected/test.css',
			assertion: 'The first module should be compiled using external config.rb settings.'
		},
		{
			name: 'external2',
			compare: 'test-external-config/module2/tmp/test.css',
			expected: 'test-external-config/module2/expected/test.css',
			assertion: 'The second module should be compiled using external config.rb settings.'
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
