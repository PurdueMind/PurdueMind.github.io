// Runs `react-scripts <command>` on any Node version.
//
// react-scripts 4 uses webpack 4, which needs OpenSSL's legacy provider on
// Node 17+. Older Node versions reject that flag, so it is only added when
// the running Node actually needs it.
const { spawnSync } = require('child_process');
const path = require('path');

const major = Number(process.versions.node.split('.')[0]);
const env = { ...process.env };

if (major >= 17 && !(env.NODE_OPTIONS || '').includes('--openssl-legacy-provider')) {
  env.NODE_OPTIONS = `${env.NODE_OPTIONS || ''} --openssl-legacy-provider`.trim();
}

const bin = path.join(__dirname, '..', 'node_modules', '.bin', 'react-scripts');
const result = spawnSync(bin, process.argv.slice(2), { stdio: 'inherit', env, shell: process.platform === 'win32' });

process.exit(result.status === null ? 1 : result.status);
