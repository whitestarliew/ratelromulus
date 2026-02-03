# How to Deploy Your App

Since you have a **React** application (which is static after building), you cannot just "upload the code" like a standard HTML website. You must deploy the **Build Output** (`dist` folder).

Here are the two best ways to do this, depending on your hosting setup.

---

## Option 1: Shared Hosting (cPanel) — *Most Likely Case*
If you pay for "Web Hosting" (Shared/WordPress hosting) and use cPanel:

### Step 1: Prepare the Files
1. On your computer, inside the `online_app` folder, make sure you have run the build command:
   ```bash
   npm run build
   ```
2. Locate the **`dist`** folder created inside `online_app`.
3. **Zip** the contents of the `dist` folder. (Select all files inside `dist` -> Right Click -> Send to Compressed Folder).

### Step 2: Create Subdomain
1. Log into your **cPanel**.
2. Look for **"Domains"** or **"Subdomains"**.
3. Create a new Subdomain:
   - **Subdomain**: `app` (or your desired subdomain)
   - **Domain**: `your-domain.com`
   - **Document Root**: This will auto-fill (usually `/public_html/app` or `/app.your-domain.com`). **Remember this path.**
4. Click **Create**.

### Step 3: Upload Files
1. Go to **cPanel File Manager**.
2. Navigate to the **Document Root** folder you just created (e.g., `public_html/app`).
3. Click **Upload** and upload your `dist.zip` file.
4. Right-click the uploaded zip -> **Extract**.
5. **Important**: Ensure the files (`index.html`, `assets/`, etc.) are directly in this folder, not inside a subfolder.
6. Delete the zip file.

**Done!** Go to `app.your-domain.com`.

---

## Option 2: Vercel / Netlify (Recommended for React)
If you want easier updates (automatic deployment when you push to GitHub), use Vercel.

1. Go to [Vercel.com](https://vercel.com) and Sign Up.
2. Click **"Add New..."** -> **"Project"**.
3. Import your GitHub repository.
4. **CRITICAL STEP**: In the "Configure Project" screen:
   - Find **"Root Directory"**.
   - Click "Edit" and select `online_app`.
   - *Vite* framework presets should auto-detect.
5. Click **Deploy**.

### Pointing the Domain (DNS)
Once deployed on Vercel:
1. Go to Vercel Project Settings -> **Domains**.
2. Add `app.your-domain.com`.
3. Vercel will give you a **CNAME** value (e.g., `cname.vercel-dns.com`).
4. Go to your Domain Registrar (e.g., Namecheap) -> **Advanced DNS**.
5. Add a new Record:
   - **Type**: `CNAME Record`
   - **Host**: `app`
   - **Value**: (The value Vercel gave you)
   - **TTL**: Automatic

This method is better because every time you run `git push`, the site updates automatically!
