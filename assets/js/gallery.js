const GALLERIES = {"amazon": ["/assets/img/gallery/amazon/1.webp", "/assets/img/gallery/amazon/2.webp", "/assets/img/gallery/amazon/3.webp", "/assets/img/gallery/amazon/4.webp", "/assets/img/gallery/amazon/5.webp", "/assets/img/gallery/amazon/6.webp", "/assets/img/gallery/amazon/7.webp"], "asokoro5_render": ["/assets/img/gallery/asokoro5_render/1.webp", "/assets/img/gallery/asokoro5_render/2.webp", "/assets/img/gallery/asokoro5_render/3.webp", "/assets/img/gallery/asokoro5_render/4.webp", "/assets/img/gallery/asokoro5_render/5.webp"], "asokoro_hero": ["/assets/img/gallery/asokoro_hero/1.webp", "/assets/img/gallery/asokoro_hero/2.webp", "/assets/img/gallery/asokoro_hero/3.webp", "/assets/img/gallery/asokoro_hero/4.webp", "/assets/img/gallery/asokoro_hero/5.webp", "/assets/img/gallery/asokoro_hero/6.webp"], "council_lounge": ["/assets/img/gallery/council_lounge/1.webp"], "einstein": ["/assets/img/gallery/einstein/1.webp", "/assets/img/gallery/einstein/2.webp"], "firs2": ["/assets/img/gallery/firs2/1.webp", "/assets/img/gallery/firs2/2.webp", "/assets/img/gallery/firs2/3.webp", "/assets/img/gallery/firs2/4.webp", "/assets/img/gallery/firs2/5.webp", "/assets/img/gallery/firs2/6.webp"], "gudu": ["/assets/img/gallery/gudu/1.webp"], "guzape4": ["/assets/img/gallery/guzape4/1.webp"], "guzape_render": ["/assets/img/gallery/guzape_render/1.webp", "/assets/img/gallery/guzape_render/2.webp", "/assets/img/gallery/guzape_render/3.webp", "/assets/img/gallery/guzape_render/4.webp", "/assets/img/gallery/guzape_render/5.webp", "/assets/img/gallery/guzape_render/6.webp"], "heroes_owerri": ["/assets/img/gallery/heroes_owerri/1.webp", "/assets/img/gallery/heroes_owerri/2.webp"], "hexton": ["/assets/img/gallery/hexton/1.webp", "/assets/img/gallery/hexton/2.webp"], "jabi": ["/assets/img/gallery/jabi/1.webp", "/assets/img/gallery/jabi/2.webp", "/assets/img/gallery/jabi/3.webp"], "jahi": ["/assets/img/gallery/jahi/1.webp", "/assets/img/gallery/jahi/2.webp", "/assets/img/gallery/jahi/3.webp", "/assets/img/gallery/jahi/4.webp", "/assets/img/gallery/jahi/5.webp", "/assets/img/gallery/jahi/6.webp", "/assets/img/gallery/jahi/7.webp", "/assets/img/gallery/jahi/8.webp"], "katampe": ["/assets/img/gallery/katampe/1.webp", "/assets/img/gallery/katampe/2.webp", "/assets/img/gallery/katampe/3.webp", "/assets/img/gallery/katampe/4.webp", "/assets/img/gallery/katampe/5.webp", "/assets/img/gallery/katampe/6.webp"], "kukwaba20": ["/assets/img/gallery/kukwaba20/1.webp", "/assets/img/gallery/kukwaba20/2.webp", "/assets/img/gallery/kukwaba20/3.webp", "/assets/img/gallery/kukwaba20/4.webp", "/assets/img/gallery/kukwaba20/5.webp"], "kukwaba4": ["/assets/img/gallery/kukwaba4/1.webp"], "kukwaba_res": ["/assets/img/gallery/kukwaba_res/1.webp", "/assets/img/gallery/kukwaba_res/2.webp", "/assets/img/gallery/kukwaba_res/3.webp", "/assets/img/gallery/kukwaba_res/4.webp"], "mabushi": ["/assets/img/gallery/mabushi/1.webp", "/assets/img/gallery/mabushi/2.webp", "/assets/img/gallery/mabushi/3.webp", "/assets/img/gallery/mabushi/4.webp"], "palms_lounge": ["/assets/img/gallery/palms_lounge/1.webp", "/assets/img/gallery/palms_lounge/2.webp", "/assets/img/gallery/palms_lounge/3.webp", "/assets/img/gallery/palms_lounge/4.webp", "/assets/img/gallery/palms_lounge/5.webp", "/assets/img/gallery/palms_lounge/6.webp", "/assets/img/gallery/palms_lounge/7.webp", "/assets/img/gallery/palms_lounge/8.webp"], "ph_proposed": ["/assets/img/gallery/ph_proposed/1.webp"], "riverpark": ["/assets/img/gallery/riverpark/1.webp"], "ufams_fuel": ["/assets/img/gallery/ufams_fuel/1.webp", "/assets/img/gallery/ufams_fuel/2.webp"]};

(function(){
  const lb=document.getElementById('lightbox'); if(!lb) return;
  const $=id=>document.getElementById(id);
  const img=$('lbImage'),title=$('lbTitle'),loc=$('lbLoc'),count=$('lbCount'),thumbs=$('lbThumbs');
  let set=[],i=0,last=null;
  function show(n){
    i=(n+set.length)%set.length; img.classList.remove('show');
    img.onload=()=>img.classList.add('show'); img.src=set[i];
    count.textContent=(i+1)+' / '+set.length;
    thumbs.querySelectorAll('img').forEach((t,k)=>t.classList.toggle('active',k===i));
    const a=thumbs.children[i]; if(a&&a.scrollIntoView) a.scrollIntoView({inline:'center',block:'nearest'});
  }
  function open(c){
    set=GALLERIES[c.dataset.gallery]||[]; if(!set.length) return; last=c;
    title.textContent=c.dataset.title; loc.textContent=c.dataset.loc;
    thumbs.innerHTML=''; set.forEach((s,k)=>{const t=document.createElement('img');t.src=s;t.alt='';t.loading='lazy';t.onclick=()=>show(k);thumbs.appendChild(t);});
    lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; show(0); $('lbClose').focus();
  }
  function close(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');document.body.style.overflow='';if(last)last.focus();}
  document.querySelectorAll('.proj-card').forEach(c=>{
    c.addEventListener('click',()=>open(c));
    c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(c);}});
  });
  $('lbPrev').onclick=()=>show(i-1); $('lbNext').onclick=()=>show(i+1); $('lbClose').onclick=close;
  lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('lb-stage'))close();});
  document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close(); if(e.key==='ArrowLeft')show(i-1); if(e.key==='ArrowRight')show(i+1);});
  let x=null; lb.addEventListener('touchstart',e=>{x=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',e=>{if(x===null)return;const d=e.changedTouches[0].clientX-x;if(d>50)show(i-1);if(d<-50)show(i+1);x=null;});
  /* filters */
  const fb=document.querySelectorAll('.fb'),cards=document.querySelectorAll('#pgrid .proj-card');
  fb.forEach(b=>b.addEventListener('click',()=>{fb.forEach(o=>o.classList.remove('active'));b.classList.add('active');
    cards.forEach(c=>c.classList.toggle('hide',b.dataset.filter!=='all'&&c.dataset.cat!==b.dataset.filter));}));
})();
