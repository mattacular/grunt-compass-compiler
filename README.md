# grunt-compass-compiler

A [Grunt](http://gruntjs.com) plugin for compiling multiple Compass projects (ie. compiles against many config.rbs). This is useful for highly modular project structures such as those of Drupal and Wordpress.

## Getting Started

***IMPORTANT**: This plugin requires Grunt 0.4 or higher - it is recommended that you always run the latest version

Install the task:

```bash
npm install grunt-compass-compiler
```

Then add this line to your project's `Gruntfile.js`:

```js
grunt.loadNpmTasks('grunt-compass-compiler');
```

This allows you to use the 'compass' task to specify targets!

```js
	compass: {
		modules: {
			options: {
				css_dir: 'css',
				sass_dir: 'sass',
				javascripts_dir: 'js',
				output_style: (grunt.option('env') === 'prod') ? 'compressed' : 'expanded'
			},
			files: {
				src: ['sites/all/modules/**/*']
			}
		}
	}
```

The task will look for a 'config.rb' file in each target directory found. It will execute 'compass compile' along with any given option on each target.

```bash
grunt compass:modules --env=prod
```

Would execute each config.rb found anywhere inside "sites/all/modules" with:

```bash
compass compile --sass-dir=sass --javascripts-dir=js --css-dir=css --output-style=compressed
```

## Documentation

* The `compass` task is a [multi task](https://github.com/gruntjs/grunt/blob/master/docs/types_of_tasks.md#multi-tasks), meaning that it will implicitly iterate over all of its targets if no target is specified.

* Windows support is predictably absent

* You must have Compass in your system PATH or this task won't work

## Contributing

Feel free to fork if you see possible improvements or contact me directly if you want to contribute to this project (or just submit a pull request): mattacular@gmail.com

## Author

* [Matt Stills](http://www.mattstills.com)
  [![@mattacular on Twitter](https://secure.gravatar.com/avatar/fc34dc6cf17121952e967cdba43f76fe?s=70)](http://twitter.com/mattacular "Follow @mattacular on Twitter")

## License

This project is licensed under the [MIT](http://mths.be/mit) license.

