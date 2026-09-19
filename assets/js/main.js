/* ===================== PRELOADER ===================== */
(function(){
  const plnum = document.getElementById('plnum');
  const plbar = document.getElementById('plbar');
  const pre = document.getElementById('preloader');
  let n = 0;
  const t = setInterval(()=>{
    n += Math.random()*18;
    if(n>=100){ n=100; clearInterval(t);
      setTimeout(()=>{
        pre.classList.add('done');
        document.querySelector('.hero').classList.add('loaded');
      }, 250);
    }
    plnum.textContent = Math.floor(n);
    plbar.style.width = n+'%';
  }, 130);
})();

/* ===================== CUSTOM CURSOR ===================== */
(function(){
  if(window.matchMedia('(max-width:900px)').matches) return;
  const dot = document.getElementById('cdot');
  const ring = document.getElementById('cring');
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`; });
  function loop(){
    rx += (mx-rx)*0.16; ry += (my-ry)*0.16;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();
  document.querySelectorAll('a, button, .filter-btn, .field-photo, .proj-card, input, textarea, select').forEach(el=>{
    el.addEventListener('mouseenter', ()=>ring.classList.add('big'));
    el.addEventListener('mouseleave', ()=>ring.classList.remove('big'));
  });
})();

/* ===================== NAV SOLID ON SCROLL ===================== */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', ()=>{ header.classList.toggle('solid', window.scrollY>40); });

/* ===================== MAGNETIC BUTTONS ===================== */
document.querySelectorAll('.magnet').forEach(m=>{
  const el = m.querySelector('a,button');
  if(!el) return;
  m.addEventListener('mousemove', e=>{
    const r = m.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    el.style.transform = `translate(${x*0.28}px, ${y*0.5}px)`;
  });
  m.addEventListener('mouseleave', ()=>{ el.style.transform = 'translate(0,0)'; el.style.transition='transform .4s var(--ease)'; });
  m.addEventListener('mouseenter', ()=>{ el.style.transition='none'; });
});

/* ===================== TILT CARDS (field photos + project cards) ===================== */
function attachTilt(el, max){
  el.addEventListener('mousemove', e=>{
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left)/r.width;
    const py = (e.clientY - r.top)/r.height;
    const rotX = (py-0.5) * -max;
    const rotY = (px-0.5) * max;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    el.style.setProperty('--mx', (px*100)+'%');
    el.style.setProperty('--my', (py*100)+'%');
  });
  el.addEventListener('mouseleave', ()=>{ el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)'; });
}
document.querySelectorAll('[data-tilt]').forEach(el=>attachTilt(el, 10));
document.querySelectorAll('.proj-card').forEach(el=>attachTilt(el, 6));

/* ===================== SCROLL REVEAL ===================== */
const revealObs = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); revealObs.unobserve(en.target);} });
}, {threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));

/* ===================== PROJECT FILTERS ===================== */
const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.proj-card');
buttons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c=>c.classList.toggle('hide', f!=='all' && c.dataset.cat!==f));
  });
});

/* ===================== MOBILE BURGER ===================== */
const burger = document.querySelector('.burger');
const navEl = document.querySelector('nav');
burger.addEventListener('click', ()=>{
  const open = navEl.style.display === 'flex';
  navEl.style.display = open ? 'none' : 'flex';
  navEl.style.cssText += open ? '' : 'position:fixed; top:64px; left:0; right:0; background:rgba(6,7,10,0.97); flex-direction:column; padding:24px 32px; gap:18px; display:flex; z-index:400;';
});
