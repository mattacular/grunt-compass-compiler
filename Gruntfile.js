/*
 *	grunt-compass-compiler
 *	https://github.com/mattacular/grunt-compass-compiler
 *
 *	Copyright (c) 2013 mstills
 *	Licensed under the MIT license.
 */
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		// scripts to be linted
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/compass.js'
			]
		},
		compass: {
			glob: {
				options: {
					css_dir: 'css',
					sass_dir: 'sass',
					output_style: (grunt.option('env') === 'prod') ? 'compressed' : 'expanded'
				},
				files: {
					src: ['tests/modules/**/*']
				}
			},
			specific: {
				files: {
					src: ['tests/modules/rester', 'tests/modules/tester']
				}
			},
			compressed: {
				options: {
					// you may override settings in the targetted project's config.rb files here
					output_style: 'compressed'
				},
				files: {
					src: ['tests/modules/**/*']
				}
			}
		},
		clean: {
			css: {
				src: ['tests/modules/**/*.css']
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// lint and test before declaring a revision stable
	grunt.registerTask('default', ['jshint', 'clean:css', 'compass:glob']);
};