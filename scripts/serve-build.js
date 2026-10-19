// Serves the production `build` folder with plain Node (no dependencies).
// Unknown paths fall back to index.html so client-side routes like /People
// work on refresh, matching how the site behaves when hosted.
//
// Usage: npm run serve            (http://localhost:5000)
//        PORT=8080 npm run serve
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'build');
const port = Number(process.env.PORT) || 5000;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.webp': 'image/webp',
};

if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('No build found. Run `npm run build` first.');
  process.exit(1);
}

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let file = path.normalize(path.join(root, urlPath));

  // Refuse paths that escape the build folder
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end();
    return;
  }

  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    file = path.join(root, 'index.html');
  }

  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`Serving build/ at http://localhost:${port}`);
});
