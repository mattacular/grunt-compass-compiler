/*
 *	grunt-compass-compiler
 *	https://github.com/mattacular/grunt-compass-compiler
 *
 *	Copyright (c) 2013 mstills
 *	Licensed under the MIT license.
 */
module.exports = function (grunt) {
	'use strict';

	var _ = grunt.util._,
		fs = require('fs'),
		f = require('util').format,
		cp = require('child_process'),
		queue = require('async').queue,
		log = grunt.log;

	// the 'compass' task
	grunt.registerMultiTask('compass', 'Compile multiple Compass projects.', function () {
		var options = this.options({
			}),
			compilerOptions = {},
			files, targets = [],
			done = this.async(), childProcess;

		// gather a list of targets with a 'config.rb' from all the file matches found by Grunt's globbing engine
		this.files.forEach(function (f) {
			for (var i = 0; i < f.src.length; i += 1) {
				// filter out folders that don't have a config.rb (ignoring common sub-folders to speed things up)
				if (!f.src[i].match(/sass|css|js|img|inc[(?:lude)]|template[s]?/) && grunt.file.isDir(f.src[i])) {
					files = fs.readdirSync(f.src[i]);
					
					if (_.indexOf(files, 'config.rb') !== -1) {
						// contains config.rb, add it to the list of compile targets
						targets.push(f.src[i]);
					}
				}
			}
		});

		grunt.log.writeln('Compass projects found: ', f(targets));
		grunt.log.writeln();
		grunt.log.writeln('Compiling...\n');

		// use an async queue with concurrency of 1 to perform procedural execution of the 'compass compile' command in each target cwd
		var targetQueue = queue(function (task, callback) {
			childProcess = cp.exec('compass compile', { cwd: task.directory }); // @TODO allow compile-time options
			childProcess.stdout.on('data', function (d) { log.write(d); });

			// listen for process exit code
			childProcess.on('exit', function (code) {
				if (code !== 0) {
					log.error('Something bad happened. Make sure \'compass\' and \'sass\' are in your path!');
					return done(false);
				}
				log.writeln('\t`-->'.cyan + ' Done compiling Compass project @ ' + task.directory.cyan);
				callback(); // task is finished
			});
		}, 1);

		// queue each target
		_.each(targets, function (item, idx) {
			targetQueue.push({
				'directory': item
			});
		});

		// drain callback is run once all tasks in the queue have completed
		targetQueue.drain = function () {
			done();	// signal back to Grunt that this task has completed
		};

	});

};