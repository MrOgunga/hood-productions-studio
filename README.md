# Hood Productions — Website Edit Guide
## Everything You Need to Customize This Site

---

## 📁 Folder Structure
```
hood-productions/
├── index.html          ← Main page (all sections live here)
├── netlify.toml        ← Netlify deploy config
├── css/
│   └── style.css       ← All styles & design
├── js/
│   └── main.js         ← Interactions, chatbot, form, gallery
└── images/             ← Put ALL your images here
    ├── logo.png            ← Your logo file
    ├── favicon.png         ← Tab icon (square, 32x32 or 64x64)
    ├── og-image.jpg        ← Preview image for WhatsApp/LinkedIn shares (1200x630px)
    └── clients/            ← Client logo images (optional)
```

---

## 🔴 ESSENTIAL EDITS (Do These First)

### 1. Your Logo
- Open `index.html`
- Search for `<!-- EDIT: Replace below img tag with your logo file`
- Replace `<span class="logo-placeholder">HOOD<span class="accent">.</span></span>` with:
  ```html
  <img src="images/logo.png" alt="Hood Productions" style="height:40px;width:auto;" />
  ```
- Do this in BOTH the navbar and footer sections

### 2. WhatsApp Number
- Open `js/main.js`
- Find: `const phone = '2348000000000';`
- Replace with your actual WhatsApp number (no + or spaces)
- Example: `const phone = '2348012345678';`

### 3. Studio Address
- Open `index.html`
- Search for `EDIT: Replace with real studio address`
- Update the address text
- Also update the Google Maps iframe src (instructions below)

### 4. Google Maps Embed
- Go to maps.google.com
- Search your studio address
- Click Share → Embed a map → Copy HTML
- Paste the iframe `src="..."` value into index.html
- Search for `EDIT: Replace src with your actual Google Maps embed`

### 5. Contact Details
- Search `hello@hoodproductions.com` → replace with your email
- Search `+234 800 000 0000` → replace with your phone number

### 6. Social Media Links
- In the footer, find the social links section
- Replace each `href="#"` with your actual URLs:
  - Instagram: `href="https://instagram.com/yourhandle"`
  - TikTok: `href="https://tiktok.com/@yourhandle"`
  - YouTube: `href="https://youtube.com/@yourchannel"`
  - Twitter/X: `href="https://x.com/yourhandle"`
  - Facebook: `href="https://facebook.com/yourpage"`
  - LinkedIn: `href="https://linkedin.com/company/yourpage"`

---

## 🎨 DESIGN EDITS

### Change Brand Color (currently red #e63329)
- Open `css/style.css`
- Find: `--accent: #e63329;`
- Replace with your brand color hex code

### Hero Background Video
- Upload your showreel to: `videos/showreel.mp4`
- Open `index.html`, find the `<video>` tag
- Change the `src` to: `videos/showreel.mp4`

---

## 🖼️ GALLERY EDITS

### Replace Placeholder Images
- Upload your photos to `images/gallery/`
- In `index.html`, find each `<div class="gallery-item">`
- Replace `src="https://images.unsplash.com/..."` with `src="images/gallery/your-photo.jpg"`
- Keep `data-category="video"` or `data-category="photo"` on each item

### Add More Gallery Items
Copy this block inside `<div class="gallery-grid">`:
```html
<div class="gallery-item" data-category="photo">
  <img src="images/gallery/your-photo.jpg" alt="Description" loading="lazy" />
  <div class="gallery-overlay"><span>Your Caption</span></div>
</div>
```
Use `class="gallery-item tall"` for portrait images, `class="gallery-item wide"` for landscape.

---

## 💰 PRICING EDITS
- Search `EDIT: Update price` in index.html
- Change `$500` and `$1,500` to your actual prices

---

## ✉️ NETLIFY FORM SETUP (Make Contact Form Work)
1. Change the form tag in index.html from:
   ```html
   <form class="contact-form" id="contactForm">
   ```
   To:
   ```html
   <form name="contact" method="POST" data-netlify="true" class="contact-form" id="contactForm">
   ```
2. Add this hidden input inside the form (first child):
   ```html
   <input type="hidden" name="form-name" value="contact" />
   ```
3. Open `js/main.js` and delete the `contactForm.addEventListener('submit', ...)` block
4. Netlify will email you every submission automatically

---

## 🌐 DEPLOYING TO NETLIFY
1. Push this folder to a GitHub repo
2. Go to netlify.com → Add new site → Import from GitHub
3. Select your repo → Deploy
4. Set your custom domain in Site settings → Domain management

---

## 📝 BLOG POSTS
- Each blog card in index.html links to `href="#"`
- Create separate HTML files for each post (e.g., `blog/post-1.html`)
- Update the href links accordingly

---

## 🆘 NEED HELP?
All editable areas are marked with `<!-- EDIT: ... -->` comments in the HTML.
Search for `EDIT:` in VSCode to find every customizable section quickly.
