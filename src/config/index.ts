/* eslint-disable node/no-process-env */

export default {
  nodeEnv: (process.env.NODE_ENV || 'development'),
  port: (process.env.PORT || 0),
  brightData_bearerToken: (process.env.API_KEY || ''),
  brightData_collectorId: (process.env.COLLECTOR_ID || ''),
  mongo_connectionString: (process.env.DB_CONNECTION_STRING || ''),
} as const;

