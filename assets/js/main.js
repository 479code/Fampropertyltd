(function(){
  var h=document.getElementById('hdr'),b=document.getElementById('burger');
  function s(){h.classList.toggle('solid',window.scrollY>40)} s(); addEventListener('scroll',s,{passive:true});
  b.addEventListener('click',function(){var o=h.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  document.querySelectorAll('#menu a').forEach(function(a){a.addEventListener('click',function(){h.classList.remove('open')})});
  var rv=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){rv.forEach(function(e){e.classList.add('in')})}
  else{var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});rv.forEach(function(e){io.observe(e)})}
  function count(el){var n=+el.dataset.count,suf=el.dataset.suffix||'',t0=null;
    function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/1400,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
  var cs=document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window){var co=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){count(x.target);co.unobserve(x.target)}})},{threshold:.6});cs.forEach(function(e){co.observe(e)})}
})();
