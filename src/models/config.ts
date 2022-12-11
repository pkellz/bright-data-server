/* eslint-disable node/no-process-env */

export default {
  nodeEnv: (process.env.NODE_ENV || 'development'),
  port: (process.env.PORT || 0),
} as const;

