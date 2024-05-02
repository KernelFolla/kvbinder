import { exec } from 'child_process';

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

module.exports = async function() {
  console.log('\nSetting up...\n');


  exec('npm run api:start', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting service: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`Error starting service: ${stderr}`);
      return;
    }
    console.log(`Service started: ${stdout}`);
  });

  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
