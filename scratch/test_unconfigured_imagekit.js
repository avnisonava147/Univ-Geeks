const fs = require('fs');
const http = require('http');

const envContent = fs.readFileSync('backend/.env', 'utf8');
const adminUserMatch = envContent.match(/^ADMIN_USERNAME=(.*)/m);
const adminPassMatch = envContent.match(/^ADMIN_PASSWORD=(.*)/m);
const username = adminUserMatch ? adminUserMatch[1].trim() : 'admin';
const password = adminPassMatch ? adminPassMatch[1].trim() : 'admin123';

const loginData = JSON.stringify({ username, password });
const loginReq = http.request({
  hostname: 'localhost', port: 8080, path: '/api/auth/login', method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(loginData) }
}, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    const token = JSON.parse(body).token;
    console.log('Login OK. Testing upload with unconfigured ImageKit...');
    
    const boundary = '----Boundary123';
    const multipart = Buffer.concat([
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="title"\r\n\r\nTest PYQ\r\n`),
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="subject"\r\n\r\nPhysics\r\n`),
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="classLevel"\r\n\r\nClass 12\r\n`),
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="year"\r\n\r\n2026\r\n`),
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="exam"\r\n\r\nCBSE\r\n`),
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="test.pdf"\r\nContent-Type: application/pdf\r\n\r\n%PDF-1.4\r\n`),
      Buffer.from(`--${boundary}--\r\n`)
    ]);

    const upReq = http.request({
      hostname: 'localhost', port: 8080, path: '/api/admin/pyqs', method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
        'Content-Length': multipart.length
      }
    }, (upRes) => {
      let upBody = '';
      upRes.on('data', c => upBody += c);
      upRes.on('end', () => {
        console.log('Upload Status:', upRes.statusCode);
        console.log('Upload Response Body:', JSON.parse(upBody));
      });
    });
    upReq.write(multipart);
    upReq.end();
  });
});
loginReq.write(loginData);
loginReq.end();
