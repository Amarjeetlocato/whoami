// WHOAMI main JS: theme, sticky nav, mobile menu, accessibility
(() => {
  const themeToggle = () => document.querySelectorAll('#themeToggle');
  // Theme handling
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  function applyTheme(theme){
    if (theme === 'dark') document.documentElement.classList.add('dark'), document.body.classList.add('dark');
    else document.documentElement.classList.remove('dark'), document.body.classList.remove('dark');
    document.querySelectorAll('#themeToggle').forEach(b => b.textContent = theme === 'dark' ? '☀️' : '🌙');
  }

  const savedTheme = localStorage.getItem('theme');
  applyTheme(savedTheme || (prefersDark.matches ? 'dark' : 'light'));
  if (!savedTheme) prefersDark.addEventListener('change', e => applyTheme(e.matches ? 'dark' : 'light'));

  document.addEventListener('click', (e) => {
    const t = e.target.closest('#themeToggle');
    if (t){
      const next = document.body.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    }
  });

  // Sticky header shadow toggle on scroll
  const header = document.querySelector('.header');
  if (header){
    const obs = new IntersectionObserver(([e]) => header.classList.toggle('scrolled', !e.isIntersecting), {threshold:[0,1]});
    const sentinel = document.createElement('div'); sentinel.style.cssText='position:relative;top:0;'; document.body.prepend(sentinel); obs.observe(sentinel);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if (href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // keyboard focus outline improvement
  function handleFirstTab(e){ if (e.key === 'Tab') document.documentElement.classList.add('show-focus-outline'); window.removeEventListener('keydown', handleFirstTab); }
  window.addEventListener('keydown', handleFirstTab);
})();