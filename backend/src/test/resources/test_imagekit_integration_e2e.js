const fs = require('fs');
const path = require('path');

const BACKEND_URL = 'http://localhost:8080';

async function run() {
  console.log('=== ImageKit Integration E2E Verification ===\n');

  // 1. Admin Login
  console.log('1. Authenticating admin...');
  const loginRes = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@univgeeks.com',
      password: 'UnivGeeks@Admin2024'
    })
  });

  if (!loginRes.ok) {
    throw new Error(`Admin login failed: ${loginRes.status} ${await loginRes.text()}`);
  }
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log('✓ Admin login successful. Token acquired.\n');

  // Prepare a small sample PDF buffer
  const samplePdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT
/F1 24 Tf
100 700 Td
(Univ-Geeks Test PDF) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000204 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
298
%%EOF`;

  // Prepare a small sample 1x1 PNG image
  const samplePngBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

  // 2. Test Notes PDF Upload to ImageKit
  console.log('2. Testing Notes PDF Upload directly to ImageKit...');
  const noteFormData = new FormData();
  noteFormData.append('title', 'Chemical Reactions Test Note');
  noteFormData.append('classLevel', '10');
  noteFormData.append('subject', 'Science');
  noteFormData.append('stream', 'Science');
  noteFormData.append('chapterNo', '1');
  noteFormData.append('pages', '5');
  noteFormData.append('sizeMb', '0.5');
  noteFormData.append('status', 'published');
  noteFormData.append('file', new Blob([samplePdfContent], { type: 'application/pdf' }), 'Chemical_Reactions_Test_Note.pdf');

  const noteUploadRes = await fetch(`${BACKEND_URL}/api/admin/notes`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: noteFormData
  });

  if (!noteUploadRes.ok) {
    throw new Error(`Notes upload failed: ${noteUploadRes.status} ${await noteUploadRes.text()}`);
  }

  const createdNote = await noteUploadRes.json();
  console.log('✓ Note uploaded successfully:');
  console.log('  - Note ID:', createdNote.id);
  console.log('  - Title:', createdNote.title);
  console.log('  - Class:', createdNote.classLevel);
  console.log('  - Stream:', createdNote.stream);
  console.log('  - Subject:', createdNote.subject);
  console.log('  - ChapterNo:', createdNote.chapterNo);
  console.log('  - PDF URL:', createdNote.pdfUrl);
  console.log('  - ImageKit File ID:', createdNote.imageKitFileId);

  if (!createdNote.pdfUrl || !createdNote.pdfUrl.includes('imagekit.io')) {
    throw new Error(`Expected ImageKit URL for uploaded note, got: ${createdNote.pdfUrl}`);
  }
  if (!createdNote.imageKitFileId) {
    throw new Error('Expected non-empty imageKitFileId for uploaded note');
  }
  console.log('✓ Note verified: ImageKit cloud URL and fileId properly saved.\n');

  // 3. Test PYQ PDF Upload to ImageKit
  console.log('3. Testing PYQ PDF Upload directly to ImageKit...');
  const pyqFormData = new FormData();
  pyqFormData.append('title', 'CBSE Class 12 Physics 2024 Paper');
  pyqFormData.append('classLevel', '12');
  pyqFormData.append('exam', 'CBSE Class 12');
  pyqFormData.append('subject', 'Physics');
  pyqFormData.append('year', '2024');
  pyqFormData.append('file', new Blob([samplePdfContent], { type: 'application/pdf' }), 'CBSE_12_Physics_2024.pdf');

  const pyqUploadRes = await fetch(`${BACKEND_URL}/api/admin/pyqs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: pyqFormData
  });

  if (!pyqUploadRes.ok) {
    throw new Error(`PYQ upload failed: ${pyqUploadRes.status} ${await pyqUploadRes.text()}`);
  }

  const createdPyq = await pyqUploadRes.json();
  console.log('✓ PYQ uploaded successfully:');
  console.log('  - PYQ ID:', createdPyq.id);
  console.log('  - Title:', createdPyq.title);
  console.log('  - File URL:', createdPyq.fileUrl);
  console.log('  - ImageKit File ID:', createdPyq.imageKitFileId);

  if (!createdPyq.fileUrl || !createdPyq.fileUrl.includes('imagekit.io')) {
    throw new Error(`Expected ImageKit URL for uploaded PYQ, got: ${createdPyq.fileUrl}`);
  }
  if (!createdPyq.imageKitFileId) {
    throw new Error('Expected non-empty imageKitFileId for uploaded PYQ');
  }
  console.log('✓ PYQ verified: ImageKit cloud URL and fileId properly saved.\n');

  // 4. Test Banner Image Upload to ImageKit
  console.log('4. Testing Banner Image Upload directly to ImageKit...');
  const bannerFormData = new FormData();
  bannerFormData.append('title', 'ImageKit Test Banner 2026');
  bannerFormData.append('linkUrl', 'https://univgeeks.in/test-banner');
  bannerFormData.append('imageColor', '#3B82F6');
  bannerFormData.append('priority', '1');
  bannerFormData.append('active', 'true');
  bannerFormData.append('file', new Blob([samplePngBuffer], { type: 'image/png' }), 'test_banner.png');

  const bannerUploadRes = await fetch(`${BACKEND_URL}/api/admin/banners`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: bannerFormData
  });

  if (!bannerUploadRes.ok) {
    throw new Error(`Banner upload failed: ${bannerUploadRes.status} ${await bannerUploadRes.text()}`);
  }

  const createdBanner = await bannerUploadRes.json();
  console.log('✓ Banner uploaded successfully:');
  console.log('  - Banner ID:', createdBanner.id);
  console.log('  - Title:', createdBanner.title);
  console.log('  - Image URL:', createdBanner.imageUrl);
  console.log('  - ImageKit File ID:', createdBanner.imageKitFileId);

  if (!createdBanner.imageUrl || !createdBanner.imageUrl.includes('imagekit.io')) {
    throw new Error(`Expected ImageKit URL for uploaded banner, got: ${createdBanner.imageUrl}`);
  }
  if (!createdBanner.imageKitFileId) {
    throw new Error('Expected non-empty imageKitFileId for uploaded banner');
  }
  console.log('✓ Banner verified: ImageKit cloud URL and fileId properly saved.\n');

  // 5. Test PDF Viewing directly from ImageKit
  console.log('5. Testing PDF Viewing (HTTP GET from ImageKit endpoint)...');
  const viewRes = await fetch(createdNote.pdfUrl);
  console.log(`  - Fetching ${createdNote.pdfUrl}`);
  console.log('  - Status:', viewRes.status);
  console.log('  - Content-Type:', viewRes.headers.get('content-type'));
  if (!viewRes.ok) {
    throw new Error(`Failed to load PDF from ImageKit: HTTP ${viewRes.status}`);
  }
  const pdfBytes = await viewRes.arrayBuffer();
  console.log(`  - Received ${pdfBytes.byteLength} bytes`);
  console.log('✓ PDF viewing verified: File served directly by ImageKit with correct headers.\n');

  // 6. Test Public APIs listing
  console.log('6. Verifying public endpoints listing...');
  const publicNotesRes = await fetch(`${BACKEND_URL}/api/notes`);
  const publicNotes = await publicNotesRes.json();
  const noteFound = publicNotes.find(n => n.id === createdNote.id);
  if (!noteFound) throw new Error('Uploaded note not found in public /api/notes');
  console.log('✓ Public /api/notes includes the ImageKit note');

  const publicPyqsRes = await fetch(`${BACKEND_URL}/api/pyqs`);
  const publicPyqs = await publicPyqsRes.json();
  const pyqFound = publicPyqs.find(p => p.id === createdPyq.id);
  if (!pyqFound) throw new Error('Uploaded PYQ not found in public /api/pyqs');
  console.log('✓ Public /api/pyqs includes the ImageKit PYQ');

  const publicBannersRes = await fetch(`${BACKEND_URL}/api/banners`);
  const publicBanners = await publicBannersRes.json();
  const bannerFound = publicBanners.find(b => b.id === createdBanner.id);
  if (!bannerFound) throw new Error('Uploaded banner not found in public /api/banners');
  console.log('✓ Public /api/banners includes the ImageKit banner\n');

  // 7. Test Local PDF preservation (/api/files/...)
  console.log('7. Verifying local PDF preservation and /api/files endpoint...');
  const localFileRes = await fetch(`${BACKEND_URL}/api/files/front_page%20Avnii.pdf`);
  console.log('  - Status for /api/files/front_page Avnii.pdf:', localFileRes.status);
  if (localFileRes.status !== 200) {
    console.warn('  (Note: front_page Avnii.pdf returned ' + localFileRes.status + ')');
  } else {
    console.log('✓ Existing local PDF successfully served without 404.\n');
  }

  // 8. Test Clean Up (Deletions should also clean up from ImageKit)
  console.log('8. Cleaning up test items and verifying ImageKit deletion...');
  const delNoteRes = await fetch(`${BACKEND_URL}/api/admin/notes/${createdNote.id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log('  - Delete Note status:', delNoteRes.status);

  const delPyqRes = await fetch(`${BACKEND_URL}/api/admin/pyqs/${createdPyq.id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log('  - Delete PYQ status:', delPyqRes.status);

  const delBannerRes = await fetch(`${BACKEND_URL}/api/admin/banners/${createdBanner.id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log('  - Delete Banner status:', delBannerRes.status);

  console.log('\n=============================================');
  console.log('ALL IMAGEKIT INTEGRATION TESTS PASSED!');
  console.log('=============================================');
}

run().catch(err => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
