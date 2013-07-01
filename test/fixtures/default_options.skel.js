var config = {
  paths: {
    underscore                      : "lodash"
  },
  shim: {
    underscore: {
      exports: '_'
    }
  }
};


// <INCLUDE-JS-FILES></INCLUDE-JS-FILES>


require.config(config);
