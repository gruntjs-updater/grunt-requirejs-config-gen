var config = {
  shim: {
    jquery: {
      exports: '$'
    }
  }
};


config.include = config.include || [];
config.include.push('test/1');


require.config(config);
