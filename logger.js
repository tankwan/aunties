var bunyan = require('bunyan');

var bunyanConfig = {
  name: 'auntie-api',
  streams: [
    {
      stream: process.stdout,
      level: 'info'
    }
  ],
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  }
}

// Add source file if in development mode
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
  bunyanConfig.src = true
}

module.exports = bunyan.createLogger(bunyanConfig);
