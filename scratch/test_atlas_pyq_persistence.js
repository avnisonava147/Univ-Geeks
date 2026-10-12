const fs = require('fs');
const http = require('http');

const envContent = fs.readFileSync('backend/.env', 'utf8');
const adminUserMatch = envContent.match(/^ADMIN_USERNAME=(.*)/m);
const adminPassMatch = envContent.match(/^ADMIN_PASSWORD=(.*)/m);

const username = adminUserMatch ? adminUserMatch[1].trim() : 'admin';
const password = adminPassMatch ? adminPassMatch[1].trim() : 'admin123';

console.log('Testing with Admin username:', username);

function request(options, data, isMultipart = false) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body ? (tryParse(body)) : null,
          rawBody: body
        });
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(data);
    }
    req.end();
  });
}

function tryParse(str) {
  try { return JSON.parse(str); } catch { return str; }
}

async function run() {
  const timestamp = Date.now();
  const uniqueTitle = `Atlas Real Persistence Test Paper ${timestamp}`;
  const uniqueSubject = `Physics-${timestamp}`;
  
  console.log('\n--- STEP 1: Admin Login ---');
  const loginBody = JSON.stringify({ username, password });
  const loginRes = await request({
    hostname: 'localhost',
    port: 8080,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(loginBody)
    }
  }, loginBody);

  console.log('Login Status:', loginRes.statusCode);
  if (loginRes.statusCode !== 200 || !loginRes.body.token) {
    console.error('Login failed:', loginRes.body);
    process.exit(1);
  }
  const token = loginRes.body.token;
  console.log('Token acquired successfully.');

  console.log('\n--- STEP 2: Upload Uniquely Named Test PYQ ---');
  const pdfBytes = fs.readFileSync('backend/uploads/9b0049db_sample_test_paper.pdf');
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);

  function makeField(name, val) {
    return `--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${val}\r\n`;
  }

  let bodyParts = [
    Buffer.from(makeField('title', uniqueTitle)),
    Buffer.from(makeField('subject', uniqueSubject)),
    Buffer.from(makeField('classLevel', 'Class 12')),
    Buffer.from(makeField('year', '2026')),
    Buffer.from(makeField('exam', 'CBSE')),
    Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="atlas_verify_test_${timestamp}.pdf"\r\nContent-Type: application/pdf\r\n\r\n`),
    pdfBytes,
    Buffer.from(`\r\n--${boundary}--\r\n`)
  ];

  const multipartBody = Buffer.concat(bodyParts);

  const uploadRes = await request({
    hostname: 'localhost',
    port: 8080,
    path: '/api/admin/pyqs',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': multipartBody.length
    }
  }, multipartBody);

  console.log('Upload Status:', uploadRes.statusCode);
  console.log('Upload Response:', uploadRes.body);

  if (uploadRes.statusCode !== 201) {
    console.error('Upload failed!');
    process.exit(1);
  }

  const uploadedId = uploadRes.body.id;
  const fileUrl = uploadRes.body.fileUrl;
  console.log(`Uploaded Document ID: ${uploadedId}`);
  console.log(`Uploaded File URL: ${fileUrl}`);

  console.log('\n--- STEP 3: Admin PYQ List Verification ---');
  const adminListRes = await request({
    hostname: 'localhost',
    port: 8080,
    path: '/api/admin/pyqs',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log('Admin List Status:', adminListRes.statusCode);
  const foundInAdmin = Array.isArray(adminListRes.body) && adminListRes.body.some(p => p.id === uploadedId || p.title === uniqueTitle);
  console.log('Found in Admin List:', foundInAdmin);

  console.log('\n--- STEP 4: Admin Dashboard Stats Verification ---');
  const statsRes = await request({
    hostname: 'localhost',
    port: 8080,
    path: '/api/admin/dashboard/stats',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log('Dashboard Stats Status:', statsRes.statusCode);
  console.log('Dashboard Stats Response:', statsRes.body);

  console.log('\n--- STEP 5: Public Next.js Frontend Retrieval Verification ---');
  const publicRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: `/api/pyqs?subject=${encodeURIComponent(uniqueSubject)}`,
    method: 'GET'
  });
  console.log('Public API Status via Next.js Proxy:', publicRes.statusCode);
  console.log('Public API Results count:', Array.isArray(publicRes.body) ? publicRes.body.length : 0);
  const foundInPublic = Array.isArray(publicRes.body) && publicRes.body.some(p => p.id === uploadedId || p.title === uniqueTitle);
  console.log('Found in Public List:', foundInPublic);

  console.log('\n--- STEP 6: PDF Serving via Next.js Proxy ---');
  const pdfRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: fileUrl,
    method: 'GET'
  });
  console.log('PDF Download/Stream Status:', pdfRes.statusCode);
  console.log('PDF Content-Type:', pdfRes.headers['content-type']);
  console.log('PDF Content-Length:', pdfRes.headers['content-length']);

  console.log('\n[SUMMARY RESULT]');
  console.log({
    uploadedId,
    uniqueTitle,
    foundInAdmin,
    foundInPublic,
    pdfServingOk: pdfRes.statusCode === 200,
    totalPyqsCount: statsRes.body ? statsRes.body.totalPyqs : null
  });
}

run().catch(console.error);
