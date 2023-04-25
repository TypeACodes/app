// Import necessary modules
import { build } from 'esbuild';
import { deploy } from './deploy';
import { ServerConfig } from './config/server';
import { App } from './app';

// Define function to build TypeScript files
async function buildFiles() {
  try {
    // Build app.ts
    await build({
      entryPoints: ['./src/app.ts'],
      outfile: './dist/app.js',
      bundle: true,
      minify: true,
      sourcemap: true,
      target: 'es2015'
    });

    // Build deploy.ts
    await build({
      entryPoints: ['./src/deploy.ts'],
      outfile: './dist/deploy.js',
      bundle: true,
      minify: true,
      sourcemap: true,
      target: 'es2015'
    });

    console.log('Build complete');

  } catch (err) {
    console.error(`Error building files: ${err.message}`);
    throw err;
  }
}

// Define function to run deployment
async function runDeployment() {
  try {
    const serverConfig: ServerConfig = {
      host: 'typeacode.com',
      port: 22,
      user: 'admin',
      password: process.env.PASSWORD
    };

    const filesToDeploy = ['./dist/app.js'];

    await deploy(serverConfig, filesToDeploy);

  } catch (err) {
    console.error(`Error deploying files: ${err.message}`);
    throw err;
  }
}

// Call buildFiles function to build TypeScript files
buildFiles()
  .then(() => {
    // Call runDeployment function to deploy files
    runDeployment();
  })
  .catch((err) => {
    console.error(`Error building files: ${err.message}`);
  });
