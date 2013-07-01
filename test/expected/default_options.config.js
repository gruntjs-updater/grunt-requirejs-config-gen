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


config.include = config.include || [];
config.include.push('files/1');
config.include.push('files/2');


require.config(config);
