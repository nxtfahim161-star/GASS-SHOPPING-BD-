# GASS SHOPPING BD

A portfolio demo of a Bangladeshi online marketplace. Every product, brand, seller and review is fictional and nothing is sold or charged.

Plain HTML, CSS and JavaScript. No build step, no dependencies, so it runs as-is on GitHub Pages.

## Features

- Home with hero carousel, categories, flash sale countdown, voucher wallet and Mystery Box
- Search with suggestions, category filter, price, rating, brand and delivery filters, sorting
- Product page with a draggable 360° viewer, colour and size options, size guide, reviews, frequently bought together
- Simulated AR preview (a placed, draggable, resizable object on a room scene)
- Cart drawer, vouchers, free-delivery progress, wishlist and compare
- Delivery location for all 64 districts with fees and dates that change by area
- Checkout with address validation, cash on delivery, bKash, Nagad and card (demo only)
- Order tracking timeline that advances on its own
- Bangla and English, light and dark theme, works on phones

## Folder structure

```
gass-shopping-bd/
├── index.html
├── .nojekyll
├── css/
│   └── styles.css
├── js/
│   ├── data.js      products, vouchers, districts
│   ├── i18n.js      Bangla and English text
│   ├── art.js       product artwork and 360° viewer
│   ├── core.js      state, helpers, header, router
│   ├── views.js     pages and pop-ups
│   └── main.js      actions and events
└── .github/workflows/deploy.yml
```

## Run it locally

Open `index.html` in a browser. That is all.

## Put it on GitHub Pages

Option A, simplest:

1. Create a new repository on GitHub, for example `gass-shopping-bd`.
2. Upload all the files, keeping the folder structure.
3. Open **Settings → Pages**, set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, then Save.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/gass-shopping-bd/`.

Option B, with GitHub Actions: include `.github/workflows/deploy.yml`, then open **Settings → Pages** and set **Source** to **GitHub Actions**. Every push to `main` redeploys the site.

## Command line version

```bash
git init
git add .
git commit -m "Add GASS SHOPPING BD demo"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/gass-shopping-bd.git
git push -u origin main
```

## বাংলায় সংক্ষেপে

1. GitHub-এ নতুন একটি রিপোজিটরি খুলুন।
2. সব ফাইল ফোল্ডার-কাঠামো ঠিক রেখে আপলোড করুন।
3. Settings → Pages এ গিয়ে Source হিসেবে `main` ব্রাঞ্চ ও `/ (root)` বেছে Save করুন।
4. কিছুক্ষণ পর সাইট `https://আপনার-ইউজারনেম.github.io/gass-shopping-bd/` ঠিকানায় চালু হবে।

## Notes

Orders, wishlist and settings are saved only in your own browser (localStorage). Clearing site data resets them.
