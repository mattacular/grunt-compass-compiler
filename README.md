# grunt-compass-compiler

A [Grunt](http://gruntjs.com) plugin for compiling multiple Compass projects (ie. it compiles against many config.rb targets). This is useful for highly modular project structures such as those of Drupal and Wordpress.

## Getting Started

**IMPORTANT**: This plugin requires at least ***Grunt 0.4*** or higher and ***Compass 0.12.2*** or higher - it is recommended that you always run the latest versions of both.

Ensure you have Compass installed and in your PATH by checking for its version. If you get an error, install it.

```bash
$ compass --version   # you should see version 0.12.2 or higher
$ gem install compass # if you get an error
```

Now install the Grunt task:

```bash
$ npm install grunt-compass-compiler
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
				// the semi-colon prefix will be added for output_style (ie. you don't need to pass ':compressed')
				output_style: (grunt.option('env') === 'prod') ? 'compressed' : 'expanded',
				// use something other than 'config.rb' to compile matched targets
				c: 'prod.rb'
				// experimental: folders that you know won't contain a compass config (do not use preceding or trailing slashes)
				ignore_pattern: /sass|css|js|img|images|inc|includes/,
				// use a single config.rb to compile all targets. must be an absolute path (POSIX, tilde is not allowed)
				external_config: '/absolute/path/config.rb' 
				// use something other than a config.rb file to locate compass projects (eg. a subfolder of a glob match)
				custom_match_pattern: /^folder$/
			},
			files: {
				src: ['sites/all/modules/**/*']
			}
		}
	}
```

The task will look for a 'prod.rb' (instead of config.rb) file in each target directory found. It will execute 'compass compile' along with any given option on each target.

```bash
$ grunt compass:modules --env=prod
```

Would compile each prod.rb found anywhere inside "sites/all/modules" by executing this command:

```bash
$ compass compile -c prod.rb --sass-dir=sass --javascripts-dir=js --css-dir=css --output-style=compressed
```

## Using Advanced Options

**Master Config.rb Strategy**

With the advanced options, you can use this plugin to compile a project with decentralized Compass modules (ie. modules that use Compass fatures in their *.scss or *.sass files) as usual but instead of having to duplicate your config.rb acorss eacch module, it is possibble but all using a centralized or master config.rb.

Consider a project with this structure:

```bash
$ ls /www/sites/all/modules
.
..
prod.rb
module1/
module2/
moduleN/
```

Where you have modules 1-N, and within each module directory you have a 'sass/' subdir with Compass sass that needs to be compiled:

```bash
$ ls /www/sites/all/modules/module1
.
..
module1.moudle
sass/
js/
css/
```

Notice that "module1/" does not contain a "config.rb" file. That is why we are using the "custom_match_pattern" below - the existence of the "sass/" folder will be enough to have this module picked up as a Compass project when the task runs.

The goal is to use prod.rb as the master config file to compile each individual modules' Compass files. Here is how you would configure the task:

```js
	compass: {
		modules: {
			options: {
				sass_dir: 'sass',
				external_config: '/www/sites/all/modules/prod.rb',
				custom_match_pattern: /^sass$/
			},
			files: {
				// this assumes the Gruntfile.js is located at /www/ (use dynamic expansion mode for more complex sourcing)
				src: ['sites/all/modules/**/*'] 
			}
		}
	}
```
The task would compile all sass in module1-moduleN using '/www/sites/all/modules/prod.rb'

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

