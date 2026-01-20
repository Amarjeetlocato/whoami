WHOAMI — Production-ready static website

Project structure
- index.html (Home)
- solutions.html (Solutions)
- products.html (Products list)
- about.html (About WHOAMI)
- contact.html (Contact)
- products/locato.html (Product page)
- products/bluechat.html
- products/free-websites.html
- assets/css/main.css
- assets/js/main.js

Features
- Modern, GoDaddy-inspired UI with bold hero and rounded cards
- Product cards are clickable <a> elements (component-based)
- Mobile-first, responsive grid
- Dark mode, system-theme-aware + toggle (saved in localStorage)
- Sticky navbar, smooth scrolling, accessible controls
- "Register for Free" links to a Google Form (replace with your form URL)
- Feedback button uses mailto:whoami.tech@gmail.com?subject=Feedback for WHOAMI
- Ready for GitHub Pages / Netlify (push this folder contents to repo root or configure)

How to add a product
- Add a new <a class="product-card" href="products/your-product.html">...</a> in products.html
- Add translations or copy content in your-product.html
- The CSS grid is flexible so adding items won't break layout

Replace placeholders
- Replace the REGISTER_FORM_URL in HTML files with your real Google Form URL

Deployment
- Static hosting supported (GitHub Pages / Netlify)

License: MIT (example)