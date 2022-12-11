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


// Set the env file
const config = dotenv.config({
  path: path.join(__dirname, `../env/${String(options.env)}.env`),
});

if (config.error) {
  throw config.error;
}
