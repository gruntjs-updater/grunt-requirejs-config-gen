/*
 * grunt-requirejs-config-gen
 * https://github.com/hiddentao/grunt-requirejs-config-gen
 *
 * Copyright (c) 2013 Ramesh Nair
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var fs = require('fs'),
    path = require('path');


  grunt.registerMultiTask('requirejs_config_gen', 'Generates RequireJS optimizer config file from a base config file', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      input: null,
      output: null,
      baseUrl: './'
    });

    if (!options.input) {
      throw new Error('Path to RequireJS skeleton config file must be provided as "input" option');
    }

    if (!options.output) {
      throw new Error('Path to RequireJS output config file must be provided as "output" option');
    }

    if (!options.baseUrl) {
      throw new Error('Base path for require() calls needs to be provided as "baseUrl" option');
    }

    var baseFolder = path.resolve(options.baseUrl);
    
    // read skeleton file
    var skeletonConfig = fs.readFileSync(options.input, 'utf-8');

    if (!(this.data.includes instanceof Array)) {
      throw new Error('The "includes" parameter must be an array');
    }

    // Concat specified files.
    var includes = grunt.file.expand({filter: 'isFile'}, this.data.includes);

    var includeList = includes.map(function(filePath) {
      var fullPath = path.resolve(filePath);

      var pos = fullPath.indexOf(baseFolder);
      if (-1 !== pos) {
        fullPath = fullPath.substr(pos + baseFolder.length);
        if ('/' === fullPath.charAt(0)) {
          fullPath = fullPath.substr(1);
        }
      }

      var fileNameNoExt = path.basename(fullPath, '.js');
      var dirName = path.dirname(fullPath);
      return 'config.include.push(\'' + dirName + '/' + fileNameNoExt + '\');';
    });

    // now replace the skeleton placeholder
    var includeSrc =
      "config.include = config.include || [];\n" +
      includeList.join("\n");
    skeletonConfig = skeletonConfig.replace('// <INCLUDE-JS-FILES></INCLUDE-JS-FILES>', includeSrc);

    // write output file
    grunt.file.write(options.output, skeletonConfig);

    // Print a success message.
    grunt.log.writeln('File "' + options.output + '" written.');
  });

};
