const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'build', 'index.html');
const fallbackPath = path.join(__dirname, '..', 'build', '404.html');

if (!fs.existsSync(indexPath)) {
  console.error('build/index.html is missing. Run the production build first.');
  process.exit(1);
}

fs.copyFileSync(indexPath, fallbackPath);
