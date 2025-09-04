const { exec } = require('child_process');

// Script para ejecutar seeds con ts-node
exec('npx ts-node src/database/seeds/seed.ts', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});
