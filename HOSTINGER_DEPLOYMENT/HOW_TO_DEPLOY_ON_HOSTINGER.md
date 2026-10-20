# Univ-Geeks Hostinger Single Web Hosting Deployment Guide

This directory contains the production-ready **Static Export** for your Univ-Geeks website, specifically optimized for **Hostinger Single Web Hosting** (`public_html`).

---

## 📁 What is in this Folder?

| Folder / File | What it is | Where to upload |
| :--- | :--- | :--- |
| **`hostinger_website_upload.zip`** | **The ready-to-upload archive** of the static website. Contains all HTML pages, CSS, JavaScript, images, and `.htaccess`. | Upload directly into Hostinger **`public_html`** and Extract. |
| **`1_HOSTINGER_WEBSITE_UPLOAD/`** | The uncompressed static website files (identical to the zip). | Alternative: use FileZilla or FTP to upload this folder's contents into `public_html`. |
| **`2_BACKEND_JAR_AND_CONFIG/`** | Contains `univgeeks-backend.jar`, `.env`, and `Dockerfile` for the Java Spring Boot backend. | Deploy to a Java cloud service (e.g. [Render.com](https://render.com) for free). |

---

## 🚀 How to Upload to Hostinger Single Web Hosting

### Step 1: Upload the Website Files to `public_html`
1. Log in to **Hostinger hPanel**.
2. Go to **Websites** → Click **Manage** next to your domain.
3. Open **File Manager** (Files → File Manager) → Click **Access files of [your domain]**.
4. Open the **`public_html`** directory.
5. If there is a default `default.php` or `index.php` from Hostinger, delete it.
6. Click the **Upload** icon (top right corner) → Choose **File** → Select:
   ```
   HOSTINGER_DEPLOYMENT/hostinger_website_upload.zip
   ```
7. Once uploaded, right-click `hostinger_website_upload.zip` → Click **Extract**.
8. Ensure all files (e.g., `index.html`, `notes.html`, `pyqs.html`, `.htaccess`, `_next/`) sit directly inside **`public_html`**.
9. You can now delete `hostinger_website_upload.zip` from `public_html` to save disk space.

---

## ⚡ What Does `.htaccess` Do?
Your upload includes an `.htaccess` file that automatically:
- Enables clean URLs (e.g. visiting `https://yourdomain.com/notes` opens `notes.html` seamlessly without showing `.html`).
- Ensures subfolder routes like `/pyqs/class-10/mathematics/2025` load cleanly without 404 errors.
- Sets browser caching for images, CSS, and JS for fast page loading.

---

## ☁️ Running the Backend (Spring Boot & MongoDB)

Hostinger Single Web Hosting does not run Java applications (`.jar` files). To enable admin logins and live PDF uploads:

1. Go to [Render.com](https://render.com) and create a free account.
2. Click **New +** → **Web Service** → Select **Docker** or connect your repository.
3. Use the files in `HOSTINGER_DEPLOYMENT/2_BACKEND_JAR_AND_CONFIG/` (which contains `univgeeks-backend.jar` and `Dockerfile`).
4. Render will provide a free HTTPS URL (e.g., `https://univgeeks-api.onrender.com`).
5. In your backend `.env`, set:
   ```env
   CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```
6. Your static Hostinger website will connect to this backend for real-time PDF fetching and admin functions!
