const GALLERIES = {"amazon": ["/assets/img/gallery/amazon/1.webp", "/assets/img/gallery/amazon/2.webp", "/assets/img/gallery/amazon/3.webp", "/assets/img/gallery/amazon/4.webp", "/assets/img/gallery/amazon/5.webp", "/assets/img/gallery/amazon/6.webp", "/assets/img/gallery/amazon/7.webp"], "asokoro5_render": ["/assets/img/gallery/asokoro5_render/1.webp", "/assets/img/gallery/asokoro5_render/2.webp", "/assets/img/gallery/asokoro5_render/3.webp", "/assets/img/gallery/asokoro5_render/4.webp", "/assets/img/gallery/asokoro5_render/5.webp"], "asokoro_hero": ["/assets/img/gallery/asokoro_hero/1.webp", "/assets/img/gallery/asokoro_hero/2.webp", "/assets/img/gallery/asokoro_hero/3.webp", "/assets/img/gallery/asokoro_hero/4.webp", "/assets/img/gallery/asokoro_hero/5.webp", "/assets/img/gallery/asokoro_hero/6.webp"], "council_lounge": ["/assets/img/gallery/council_lounge/1.webp"], "einstein": ["/assets/img/gallery/einstein/1.webp", "/assets/img/gallery/einstein/2.webp"], "firs2": ["/assets/img/gallery/firs2/1.webp", "/assets/img/gallery/firs2/2.webp", "/assets/img/gallery/firs2/3.webp", "/assets/img/gallery/firs2/4.webp", "/assets/img/gallery/firs2/5.webp", "/assets/img/gallery/firs2/6.webp"], "gudu": ["/assets/img/gallery/gudu/1.webp"], "guzape4": ["/assets/img/gallery/guzape4/1.webp"], "guzape_render": ["/assets/img/gallery/guzape_render/1.webp", "/assets/img/gallery/guzape_render/2.webp", "/assets/img/gallery/guzape_render/3.webp", "/assets/img/gallery/guzape_render/4.webp", "/assets/img/gallery/guzape_render/5.webp", "/assets/img/gallery/guzape_render/6.webp"], "heroes_owerri": ["/assets/img/gallery/heroes_owerri/1.webp", "/assets/img/gallery/heroes_owerri/2.webp"], "hexton": ["/assets/img/gallery/hexton/1.webp", "/assets/img/gallery/hexton/2.webp"], "jabi": ["/assets/img/gallery/jabi/1.webp", "/assets/img/gallery/jabi/2.webp", "/assets/img/gallery/jabi/3.webp"], "jahi": ["/assets/img/gallery/jahi/1.webp", "/assets/img/gallery/jahi/2.webp", "/assets/img/gallery/jahi/3.webp", "/assets/img/gallery/jahi/4.webp", "/assets/img/gallery/jahi/5.webp", "/assets/img/gallery/jahi/6.webp", "/assets/img/gallery/jahi/7.webp", "/assets/img/gallery/jahi/8.webp"], "katampe": ["/assets/img/gallery/katampe/1.webp", "/assets/img/gallery/katampe/2.webp", "/assets/img/gallery/katampe/3.webp", "/assets/img/gallery/katampe/4.webp", "/assets/img/gallery/katampe/5.webp", "/assets/img/gallery/katampe/6.webp"], "kukwaba20": ["/assets/img/gallery/kukwaba20/1.webp", "/assets/img/gallery/kukwaba20/2.webp", "/assets/img/gallery/kukwaba20/3.webp", "/assets/img/gallery/kukwaba20/4.webp", "/assets/img/gallery/kukwaba20/5.webp"], "kukwaba4": ["/assets/img/gallery/kukwaba4/1.webp"], "kukwaba_res": ["/assets/img/gallery/kukwaba_res/1.webp", "/assets/img/gallery/kukwaba_res/2.webp", "/assets/img/gallery/kukwaba_res/3.webp", "/assets/img/gallery/kukwaba_res/4.webp"], "mabushi": ["/assets/img/gallery/mabushi/1.webp", "/assets/img/gallery/mabushi/2.webp", "/assets/img/gallery/mabushi/3.webp", "/assets/img/gallery/mabushi/4.webp"], "palms_lounge": ["/assets/img/gallery/palms_lounge/1.webp", "/assets/img/gallery/palms_lounge/2.webp", "/assets/img/gallery/palms_lounge/3.webp", "/assets/img/gallery/palms_lounge/4.webp", "/assets/img/gallery/palms_lounge/5.webp", "/assets/img/gallery/palms_lounge/6.webp", "/assets/img/gallery/palms_lounge/7.webp", "/assets/img/gallery/palms_lounge/8.webp"], "ph_proposed": ["/assets/img/gallery/ph_proposed/1.webp"], "riverpark": ["/assets/img/gallery/riverpark/1.webp"], "ufams_fuel": ["/assets/img/gallery/ufams_fuel/1.webp", "/assets/img/gallery/ufams_fuel/2.webp"]};

/* ===================== LAZY-LOAD PROJECT CARD BACKGROUNDS ===================== */
(function(){
  const cards = document.querySelectorAll('.proj-card[data-bg]');
  if(!cards.length) return;
  if(!('IntersectionObserver' in window)){
    cards.forEach(c => c.style.backgroundImage = c.dataset.bg);
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        el.style.backgroundImage = el.dataset.bg;
        io.unobserve(el);
      }
    });
  }, {rootMargin: '400px 0px'});
  cards.forEach(c => io.observe(c));
})();



(function(){
  const lb = document.getElementById('lightbox');
  if(!lb) return;
  const lbImage = document.getElementById('lbImage');
  const lbTitle = document.getElementById('lbTitle');
  const lbLoc = document.getElementById('lbLoc');
  const lbCount = document.getElementById('lbCount');
  const lbThumbs = document.getElementById('lbThumbs');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbClose = document.getElementById('lbClose');

  let currentSet = [];
  let currentIndex = 0;

  function renderThumbs(){
    lbThumbs.innerHTML = '';
    currentSet.forEach((src, i)=>{
      const t = document.createElement('div');
      t.className = 'lb-thumb' + (i===currentIndex ? ' active' : '');
      t.innerHTML = `<img src="${src}" alt="" loading="lazy">`;
      t.addEventListener('click', ()=> showSlide(i));
      lbThumbs.appendChild(t);
    });
  }

  function showSlide(i){
    currentIndex = (i + currentSet.length) % currentSet.length;
    lbImage.classList.remove('show');
    setTimeout(()=>{
      lbImage.src = currentSet[currentIndex];
      lbImage.onload = ()=> lbImage.classList.add('show');
    }, 120);
    lbCount.textContent = (currentIndex+1) + ' / ' + currentSet.length;
    document.querySelectorAll('.lb-thumb').forEach((t,idx)=> t.classList.toggle('active', idx===currentIndex));
  }

  function openGallery(key, title, loc){
    currentSet = GALLERIES[key] || [];
    if(!currentSet.length) return;
    lbTitle.textContent = title;
    lbLoc.textContent = loc;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    renderThumbs();
    showSlide(0);
  }
  function closeGallery(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.proj-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      openGallery(card.dataset.gallery, card.dataset.title, card.dataset.loc);
    });
  });

  lbPrev.addEventListener('click', ()=> showSlide(currentIndex-1));
  lbNext.addEventListener('click', ()=> showSlide(currentIndex+1));
  lbClose.addEventListener('click', closeGallery);
  lb.addEventListener('click', (e)=>{ if(e.target === lb) closeGallery(); });
  document.addEventListener('keydown', (e)=>{
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') closeGallery();
    if(e.key==='ArrowLeft') showSlide(currentIndex-1);
    if(e.key==='ArrowRight') showSlide(currentIndex+1);
  });

  let touchX = null;
  lb.addEventListener('touchstart', e=>{ touchX = e.touches[0].clientX; });
  lb.addEventListener('touchend', e=>{
    if(touchX===null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if(dx > 50) showSlide(currentIndex-1);
    if(dx < -50) showSlide(currentIndex+1);
    touchX = null;
  });
})();

/* ===================== PROJECT FILTERS ===================== */
(function(){
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.proj-card');
  if(!buttons.length) return;
  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      buttons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(c=>c.classList.toggle('hide', f!=='all' && c.dataset.cat!==f));
    });
  });
})();
