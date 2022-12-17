import path from 'path';
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';

// Setup command line options

const options = commandLineArgs([
  {
    name: 'env',
    alias: 'e',
    defaultValue: 'development',
    type: String,
  },
]);

const configOptions = options.env !== 'production' ? { path: path.join(__dirname, `../${String(options.env)}.env`) } : {};

// Set the env file
dotenv.config(configOptions);

// if (config.error) {
//   throw config.error;
// }
