// Simple i18n helper (global t(key)) and UI binding
(function(){
  const strings = {
    en: {
      'nav.home':'Home','nav.solutions':'Solutions','nav.products':'Products','nav.about':'About','nav.contact':'Contact',
      'cta.register':'Register for Free','cta.feedback':'Feedback','footer.contact':'whoami.tech@gmail.com','footer.copy':'© WHOAMI — Free IT solutions for India',
      'product.learn':'Learn','product.download':'Download','gallery.title':'Screenshots','gallery.screenshot':'Screenshot','gallery.tip':'Tap to enlarge','register.form':'Register for Free'
    },
    hi: {
      'nav.home':'होम','nav.solutions':'सॉल्यूशंस','nav.products':'प्रोडक्ट्स','nav.about':'WHOAMI के बारे में','nav.contact':'संपर्क',
      'cta.register':'फ्री के लिए रजिस्टर करें','cta.feedback':'फीडबैक','footer.contact':'whoami.tech@gmail.com','footer.copy':'© WHOAMI — भारत के लिए मुफ्त IT सॉल्यूशन',
      'product.learn':'जानें','product.download':'डाउनलोड','gallery.title':'स्क्रीनशॉट','gallery.screenshot':'स्क्रीनशॉट','gallery.tip':'बड़ा करने के लिए टैप करें','register.form':'फ्री के लिए रजिस्टर'
    }
  };

  function detect(){ const navs = navigator.languages || [navigator.language]; return (navs[0] && navs[0].split('-')[0]) || 'en'; }
  function getLang(){ const saved = localStorage.getItem('site_lang') || (document.querySelector('#langSelect') && document.querySelector('#langSelect').value) || 'auto'; return saved === 'auto' ? detect() : saved; }

  window.t = function(key){ const lang = getLang(); return (strings[lang] && strings[lang][key]) || (strings['en'] && strings['en'][key]) || key; };

  function apply(){ document.querySelectorAll('[data-i18n]').forEach(el => { const k=el.getAttribute('data-i18n'); const val = t(k); if(val) el.textContent = val; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const k=el.getAttribute('data-i18n-placeholder'); const val = t(k); if(val) el.placeholder = val; });
    // update selectable UI labels
    document.querySelectorAll('[data-i18n-attr]').forEach(el => { const attr = el.getAttribute('data-i18n-attr'); const key = el.getAttribute('data-i18n-attr-key'); if(attr && key) el.setAttribute(attr, t(key)); });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const selects = document.querySelectorAll('#langSelect');
    selects.forEach(s => { s.value = localStorage.getItem('site_lang') || s.value || 'auto'; s.addEventListener('change', (e)=>{ localStorage.setItem('site_lang', e.target.value); apply(); }); });
    apply();
  });
})();