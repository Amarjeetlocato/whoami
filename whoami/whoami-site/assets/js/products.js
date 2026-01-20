(function(){
  async function fetchJson(paths){
    for (const path of paths){
      try { const res = await fetch(path); if (!res.ok) throw new Error('not ok'); const data = await res.json(); return {data, base:path}; } catch(e) { /* try next */ }
    }
    return null;
  }

  function renderCard(product){
    const lang = window.t ? (localStorage.getItem('site_lang') === 'auto' ? (navigator.language||'en').split('-')[0] : (localStorage.getItem('site_lang')||'en')) : 'en';
    const tr = (product.translations && product.translations[lang]) || (product.translations && product.translations['en']) || {};

    const a = document.createElement('a');
    a.className = 'product-card';
    if (product.featured) { a.classList.add('featured'); const fb = document.createElement('div'); fb.className = 'featured-badge'; fb.textContent = 'Featured'; a.appendChild(fb); }
    a.href = product.url;
    a.setAttribute('aria-label', (tr.title||product.slug) + ' — ' + (tr.description||product.description||''));

    const imgWrap = document.createElement('div');
    imgWrap.style.backgroundImage = `url(${product.image})`;
    imgWrap.style.backgroundSize = 'cover';
    imgWrap.style.borderRadius = '10px';
    imgWrap.style.height = '120px';
    imgWrap.style.marginBottom = '12px';

    const title = document.createElement('div'); title.className = 'title'; title.textContent = tr.title || product.title || product.slug;
    const desc = document.createElement('div'); desc.className = 'desc'; desc.textContent = tr.description || product.description || '';
    const meta = document.createElement('div'); meta.className = 'meta';
    const tag = document.createElement('span'); tag.className = 'tag'; tag.textContent = product.tag;
    const action = document.createElement('span'); action.style.fontWeight = '700'; action.style.color = 'var(--accent)'; action.textContent = (window.t ? window.t('product.learn') : 'Learn');
    meta.appendChild(tag); meta.appendChild(action);

    a.appendChild(imgWrap); a.appendChild(title); a.appendChild(desc); a.appendChild(meta);
    return a;
  }

  function injectJsonLd(products){
    const items = products.map(p => ({"@type":"Product","name":p.title,"description":p.description,"url":(new URL(p.url, location.href)).href}));
    const org = {"@context":"https://schema.org","@type":"Organization","name":"WHOAMI","url":location.origin + location.pathname.split('/').slice(0, -1).join('/') + '/',"sameAs":["https://youtube.com/","https://instagram.com/","https://facebook.com/","https://linkedin.com/","https://twitter.com/"],"makesOffer": items };
    const s = document.createElement('script'); s.type='application/ld+json'; s.textContent = JSON.stringify(org); document.head.appendChild(s);
  }

  async function init(){
    const possible = ['assets/data/products.json','../assets/data/products.json','/assets/data/products.json'];
    const res = await fetchJson(possible);
    if (!res) return;
    const products = res.data || [];

    // Populate main products list if container exists
    const grid = document.getElementById('productsGrid') || document.getElementById('homeProducts') || document.querySelector('.products-grid');
    if (grid){
      grid.setAttribute('aria-busy','true');
      grid.innerHTML = '';
      const target = (location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname.endsWith('/')) ? products.slice(0,3) : products;
      target.forEach(p => grid.appendChild(renderCard(p)));
      grid.setAttribute('aria-busy','false');
    }

    // If on a product detail page (slug in URL), render dynamic product content
    const path = (location.pathname.split('/').pop() || '').replace('.html','');
    const product = products.find(p => p.slug === path || p.id === path);
    if (product){
      const lang = window.t ? (localStorage.getItem('site_lang') === 'auto' ? (navigator.language||'en').split('-')[0] : (localStorage.getItem('site_lang')||'en')) : 'en';
      const tr = (product.translations && product.translations[lang]) || (product.translations && product.translations['en']) || {};

      let container = document.getElementById('productContent');
      if (!container){
        container = document.createElement('div'); container.id = 'productContent'; document.querySelector('main') && document.querySelector('main').appendChild(container);
      }
      container.innerHTML = '';

      const h = document.createElement('h2'); h.textContent = tr.title || product.title; container.appendChild(h);
      const p = document.createElement('p'); p.style.color = 'var(--muted)'; p.textContent = tr.description || product.description || ''; container.appendChild(p);

      // screenshot gallery
      if (product.screenshots && product.screenshots.length){
        const gTitle = document.createElement('h3'); gTitle.textContent = window.t ? window.t('gallery.title') : 'Screenshots'; container.appendChild(gTitle);
        const tip = document.createElement('div'); tip.className='muted small'; tip.textContent = window.t ? window.t('gallery.tip') : 'Click to enlarge'; container.appendChild(tip);
        const gallery = document.createElement('div'); gallery.className = 'screenshots';
        product.screenshots.forEach((src, i)=>{
          // Create screenshot item div (100% width, auto height)
          const screenshotItem = document.createElement('div');
          screenshotItem.className = 'screenshot-item';
          
          // Create anchor tag with image
          const link = document.createElement('a');
          link.href = 'javascript:void(0)';
          link.style.cursor = 'pointer';
          link.addEventListener('click', (e)=>{ e.preventDefault(); openLightbox(src); });
          
          const img = document.createElement('img');
          img.src = src;
          img.alt = (tr.title || product.title) + ' screenshot ' + (i+1);
          img.loading='lazy';
          img.tabIndex=0;
          img.addEventListener('keydown', (e)=>{ if (e.key==='Enter') openLightbox(src); });
          
          link.appendChild(img);
          screenshotItem.appendChild(link);
          
          // Create description below
          const description = document.createElement('div');
          description.className = 'screenshot-description';
          description.textContent = (window.t? window.t('gallery.screenshot') : 'Screenshot') + ' ' + (i+1) + ' - ' + (tr.title || product.title);
          
          screenshotItem.appendChild(description);
          gallery.appendChild(screenshotItem);
        });
        container.appendChild(gallery);
      }

      // CTA
      const cta = document.createElement('a'); cta.className='btn'; cta.href = product.url; cta.textContent = tr.cta || (window.t? window.t('cta.register') : 'Register'); container.appendChild(cta);

      // lightbox
      function openLightbox(src){
        let lb = document.getElementById('lightbox');
        if (!lb){ lb = document.createElement('div'); lb.id='lightbox'; lb.addEventListener('click', ()=>{ lb.style.display='none'; }); document.body.appendChild(lb); }
        if (!lb.querySelector('img')) lb.innerHTML = '<img src="" alt="">';
        lb.querySelector('img').src = src; lb.style.display='flex';
      }
    }

    // Inject JSON-LD for SEO
    injectJsonLd(products);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();