# grunt-requirejs-config-gen

[![Build Status](https://secure.travis-ci.org/hiddentao/grunt-requirejs-config-gen.png)](http://travis-ci.org/hiddentao/grunt-requirejs-config-gen)

> Generates a RequireJS optimizer config file from a base config file.

For now this plugin generates:

 * The list of additional Javascript files to include as part of the [RequireJS optimization](http://requirejs.org/docs/optimization.html) step.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-requirejs-config-gen --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-requirejs-config-gen');
```

## The "requirejs_config_gen" task

### Overview
In your project's Gruntfile, add a section named `requirejs_config_gen` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  requirejs_config_gen: {
    default: {
      options: {
        input: 'path to skeleton file',
        baseUrl: 'base path for modules',
        output: 'path to output file'
      },
      includes: [ 'files to include' ]
    },
    libOnly: {
      includes: [ 'files to include' ]
    }
  },
})
```

### Options

#### options.input
Type: `String`
Default value: `null`

*Required.* The path to the skeleton configuration file, relative to the current directory.

#### options.output
Type: `String`
Default value: `null`

*Required.* The path to the output configuration file which will get generated.

#### options.baseUrl
Type: `String`
Default value: `./`

Same as RequireJS baseURL option - the path relative to which all modules are located.

### Usage Examples

The skeleton config file is expected to be structured similar to the following:

```js
var config = {
  paths: {
    underscore : "lodash"
  },
  shim: {
    underscore: {
      exports: '_'
    }
  }
};

// <INCLUDE-JS-FILES></INCLUDE-JS-FILES>

require.config(config);
```

Key things to note:

* The `config` variable. The plugin will assume that this exists.
* The `// <INCLUDE-JS-FILES></INCLUDE-JS-FILES>` tag. This gets replaced by the plugin with the `config.include...` calls.

Now let's assume we have two scripts we want to `include` - `js/1.js` and `js/2.js`, we can do them like this:

```js
grunt.initConfig({
  requirejs_config_gen: {
    default: {
      options: {
        input: 'config.js.skel',
        baseUrl: 'js',
        output: 'config.js'
      },
      includes: [ 'js/*.js' ]
    }
  }
})
```

If we run it we should get `config.js` which looks as follows:

```js
var config = {
  paths: {
    underscore : "lodash"
  },
  shim: {
    underscore: {
      exports: '_'
    }
  }
};

config.include = config.include || [];
config.include.push('js/1');
config.include.push('js/2');

require.config(config);
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License

MIT License
(c) [Ramesh Nair](http://hiddentao.com)

## Release History

 - 0.1.0 initial release

