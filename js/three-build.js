/* ===================== SCROLL-DRIVEN BUILDING SEQUENCE ===================== */
let buildSceneUpdate = null;
(function(){
  const canvas = document.getElementById('build-canvas');
  const section = document.getElementById('buildProcess');
  if(!window.THREE || !canvas || !section) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, 0.1, 200);
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  const RED = 0xff3b44, STEEL = 0x4d5567, SLAB = 0x2a2f3e, GLASS = 0x8fb4d9;

  const group = new THREE.Group();
  scene.add(group);

  const grid = new THREE.GridHelper(60, 30, 0x232838, 0x14161f);
  grid.position.y = -0.32;
  scene.add(grid);

  // foundation slab
  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(9.4, 0.6, 9.4),
    new THREE.MeshBasicMaterial({color:STEEL})
  );
  foundation.position.y = -0.3;
  foundation.scale.y = 0.001;
  foundation.visible = false;
  group.add(foundation);

  // columns: 3x3 grid, 8 floors tall
  const gridN = 3, floors = 8, floorH = 1.32, footprint = 7.2;
  const colHeight = floors * floorH;
  const columns = [];
  for(let i=0;i<gridN;i++){
    for(let j=0;j<gridN;j++){
      const geo = new THREE.BoxGeometry(0.3, colHeight, 0.3);
      geo.translate(0, colHeight/2, 0);
      const isCenter = (i===1 && j===1);
      const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color: isCenter ? RED : STEEL}));
      mesh.position.set((i-1)*(footprint/2), 0, (j-1)*(footprint/2));
      mesh.scale.y = 0.0001;
      group.add(mesh);
      columns.push(mesh);
    }
  }

  // floor slabs
  const floorMeshes = [];
  for(let f=0; f<floors; f++){
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(footprint+0.5, 0.13, footprint+0.5),
      new THREE.MeshBasicMaterial({color:SLAB})
    );
    mesh.position.y = (f+1) * floorH;
    mesh.visible = false;
    group.add(mesh);
    floorMeshes.push(mesh);
  }

  // glass envelope per floor band
  const envMeshes = [];
  for(let f=0; f<floors; f++){
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(footprint+0.02, floorH*0.84, footprint+0.02),
      new THREE.MeshBasicMaterial({color:GLASS, transparent:true, opacity:0, side:THREE.DoubleSide})
    );
    mesh.position.y = f*floorH + floorH*0.5 + 0.14;
    group.add(mesh);
    envMeshes.push(mesh);
  }

  // roof cap
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(footprint+1.1, 0.28, footprint+1.1),
    new THREE.MeshBasicMaterial({color:RED, transparent:true, opacity:0})
  );
  roof.position.y = colHeight + 0.14;
  roof.scale.set(0.001,1,0.001);
  group.add(roof);

  // ambient particles
  const pCount = 240;
  const pPos = new Float32Array(pCount*3);
  for(let i=0;i<pCount;i++){
    pPos[i*3] = (Math.random()-0.5)*46;
    pPos[i*3+1] = Math.random()*16 - 1;
    pPos[i*3+2] = (Math.random()-0.5)*46;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos,3));
  const points = new THREE.Points(pGeo, new THREE.PointsMaterial({color:0x556077, size:0.05, transparent:true, opacity:0.5}));
  scene.add(points);

  function ease(t){ t = t<0?0:t>1?1:t; return t*t*(3-2*t); }

  function update(p){
    const fp = ease(Math.min(p/0.07, 1));
    foundation.visible = p > 0.001;
    foundation.scale.y = Math.max(fp, 0.001);

    columns.forEach((c, idx)=>{
      const start = 0.05 + (idx/columns.length)*0.28;
      const t = ease((p-start)/0.10);
      c.scale.y = Math.max(t, 0.0001);
    });

    floorMeshes.forEach((fl, idx)=>{
      const start = 0.34 + (idx/floorMeshes.length)*0.26;
      fl.visible = p > start;
    });

    envMeshes.forEach((en, idx)=>{
      const start = 0.58 + (idx/envMeshes.length)*0.26;
      const t = ease((p-start)/0.12);
      en.material.opacity = t*0.55;
    });

    const rt = ease((p-0.86)/0.12);
    roof.material.opacity = rt;
    roof.scale.set(Math.max(rt,0.001), 1, Math.max(rt,0.001));

    const camP = ease(p);
    const startPos = new THREE.Vector3(17, 4, 21);
    const endPos = new THREE.Vector3(9.5, 8.8, 14.5);
    camera.position.lerpVectors(startPos, endPos, camP);
    camera.lookAt(0, 1 + camP*5.8, 0);

    group.rotation.y = -0.55 + camP*0.95;
  }

  function resize(){
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  }
  window.addEventListener('resize', resize);
  resize();
  update(0);

  let inView = true;
  const io = new IntersectionObserver((entries)=>{
    inView = entries[0].isIntersecting;
  }, {threshold:0});
  io.observe(section);

  function loop(){
    requestAnimationFrame(loop);
    points.rotation.y += 0.0006;
    if(inView) renderer.render(scene, camera);
  }
  loop();

  buildSceneUpdate = update;
})();

(function(){
  const section = document.getElementById('buildProcess');
  if(!section) return;
  const fill = document.getElementById('buildProgressFill');
  const pct = document.getElementById('buildPct');
  const num = document.getElementById('buildStageNum');
  const title = document.getElementById('buildStageTitle');
  const desc = document.getElementById('buildStageDesc');
  const ticks = document.querySelectorAll('.build-tick');

  const stages = [
    {p:0.00, num:'01', title:'Site & Foundation', desc:'Excavation, footing and slab works begin every build.'},
    {p:0.22, num:'02', title:'Structural Frame', desc:'Columns and beams rise on a fixed schedule, engineered for load.'},
    {p:0.46, num:'03', title:'Floor Slabs', desc:'Each level poured, cured and signed off before the next begins.'},
    {p:0.70, num:'04', title:'Envelope & Glazing', desc:'Walls, windows and cladding close the building in.'},
    {p:0.90, num:'05', title:'Handover', desc:'Finished, inspected, and ready to live up to its name.'},
  ];
  let lastStage = -1, ticking = false;

  function apply(){
    ticking = false;
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - innerHeight;
    const scrolled = -rect.top;
    let p = total > 0 ? scrolled/total : 0;
    p = Math.max(0, Math.min(1, p));

    if(buildSceneUpdate) buildSceneUpdate(p);
    fill.style.width = (p*100)+'%';
    pct.textContent = Math.round(p*100)+'%';

    let idx = 0;
    for(let i=0;i<stages.length;i++){ if(p >= stages[i].p) idx = i; }
    if(idx !== lastStage){
      lastStage = idx;
      num.textContent = stages[idx].num;
      title.textContent = stages[idx].title;
      desc.textContent = stages[idx].desc;
      ticks.forEach((t,i)=> t.classList.toggle('active', i<=idx));
    }
  }
  function onScroll(){
    if(!ticking){ ticking = true; requestAnimationFrame(apply); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  apply();
})();
