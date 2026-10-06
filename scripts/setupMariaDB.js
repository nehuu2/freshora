import https from 'https';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ZIP_URL = 'https://legacy-downloads.mariadb.com/MariaDB/mariadb-10.11.8/winx64-packages/mariadb-10.11.8-winx64.zip';
const ZIP_PATH = 'C:\\Freshora\\mariadb.zip';
const EXTRACT_DIR = 'C:\\Freshora\\db_extract';
const FINAL_DIR = 'C:\\Freshora\\mariadb';

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('1. Downloading MariaDB portable...');
  await download(ZIP_URL, ZIP_PATH);
  console.log('2. Download finished. Extracting...');

  execSync(`powershell -Command "Expand-Archive -Path '${ZIP_PATH}' -DestinationPath '${EXTRACT_DIR}' -Force"`, { stdio: 'inherit' });
  
  const entries = fs.readdirSync(EXTRACT_DIR);
  const sourceFolder = path.join(EXTRACT_DIR, entries[0]);

  if (fs.existsSync(FINAL_DIR)) {
    fs.rmSync(FINAL_DIR, { recursive: true, force: true });
  }
  fs.renameSync(sourceFolder, FINAL_DIR);
  fs.rmSync(EXTRACT_DIR, { recursive: true, force: true });
  fs.rmSync(ZIP_PATH, { force: true });

  console.log('3. Initializing database directory...');
  const installDb = path.join(FINAL_DIR, 'bin', 'mariadb-install-db.exe');
  const dataDir = path.join(FINAL_DIR, 'data');
  execSync(`"${installDb}" --datadir="${dataDir}"`, { stdio: 'inherit' });

  console.log('✓ MariaDB successfully installed and initialized at ' + FINAL_DIR);
}

run().catch((err) => {
  console.error('Setup failed:', err);
  process.exit(1);
});
