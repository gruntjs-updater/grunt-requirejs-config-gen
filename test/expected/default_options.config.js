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
config.include.push('test/fixtures/files/1');
config.include.push('test/fixtures/files/2');


require.config(config);
