// Basic interactivity: emergency banner dismiss, accordion, carousel, year
document.addEventListener('DOMContentLoaded', function(){
  // Year
  const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Emergency banner dismiss (store in cookie)
  const banner = document.getElementById('emergency-banner');
  const dismiss = document.getElementById('dismiss-banner');
  if(dismiss && banner){
    dismiss.addEventListener('click', function(){
      banner.style.display='none';
      document.cookie = 'dismissEmergency=1;path=/;max-age=' + (60*60*24*7);
    });
    // check cookie
    if(document.cookie.split(';').some(c=>c.trim().startsWith('dismissEmergency='))){ banner.style.display='none'; }
  }

  // Accordion
  document.querySelectorAll('.acc-trigger').forEach(btn => {
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const panel = btn.nextElementSibling; if(panel) panel.style.display = expanded ? 'none' : 'block';
    });
  });

  // Simple testimonial carousel
  const carousel = document.getElementById('testimonials');
  if(carousel){
    const slides = carousel.querySelectorAll('.slide');
    let idx = 0; const interval = parseInt(carousel.dataset.interval) || 5000;
    function show(i){ slides.forEach((s,si)=> s.classList.toggle('active', si===i)); }
    show(idx);
    let timer = setInterval(()=>{ idx = (idx+1)%slides.length; show(idx); }, interval);
    carousel.addEventListener('mouseover', ()=> clearInterval(timer));
    carousel.addEventListener('mouseout', ()=> timer = setInterval(()=>{ idx = (idx+1)%slides.length; show(idx); }, interval));
  }

  // Mobile menu toggle
  const mobile = document.querySelector('.mobile-menu');
  if(mobile){ mobile.addEventListener('click', ()=>{
    const nav = document.querySelector('.main-nav'); if(nav) nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
  }); }
});
