/*
 * grunt-requirejs-config-gen
 * https://github.com/home/grunt-requirejs-config-gen
 *
 * Copyright (c) 2013 Ramesh Nair
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    requirejs_config_gen: {
      default_options: {
        options: {
          input: 'test/fixtures/default_options.skel.js',
          output: 'tmp/default_options.config.js'
        },
        includes: [ 'test/fixtures/files/*.js' ]
      },
      custom_options: {
        options: {
          baseUrl: 'test/fixtures',
          input: 'test/fixtures/custom_options.skel.js',
          output: 'tmp/custom_options.config.js'
        },
        includes: [ 'test/fixtures/files/1.js' ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'requirejs_config_gen', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
