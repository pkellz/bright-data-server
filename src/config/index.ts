/* eslint-disable node/no-process-env */

export default {
  nodeEnv: (process.env.NODE_ENV || 'development'),
  port: (process.env.PORT || 0),
  brightData_bearerToken: (process.env.BEARER_TOKEN || ''),
  brightData_collectorId: (process.env.COLLECTOR_ID || ''),
} as const;

