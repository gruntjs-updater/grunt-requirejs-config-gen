var config = {
  shim: {
    jquery: {
      exports: '$'
    }
  }
};


config.include = config.include || [];
config.include.push('files/1');


require.config(config);
