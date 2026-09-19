/* ===================== THREE.JS HERO SCENE ===================== */
(function(){
  const canvas = document.getElementById('hero-canvas');
  if(!window.THREE || !canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 0.1, 1000);
  camera.position.set(0, 4, 22);

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  const group = new THREE.Group();
  scene.add(group);

  const red = 0xff3b44;
  const wire = 0x39404f;

  // isometric "skyline" of wireframe towers built from box edges
  const towers = [
    {w:2.2,h:9,d:2.2,x:-6,z:-2, color:wire},
    {w:1.6,h:6,d:1.6,x:-3,z:1, color:wire},
    {w:2.8,h:13,d:2.8,x:0,z:-1, color:red},
    {w:1.8,h:7.5,d:1.8,x:3.4,z:1.5, color:wire},
    {w:2.2,h:10.5,d:2.2,x:6.6,z:-0.5, color:wire},
    {w:1.4,h:5,d:1.4,x:9.2,z:1.5, color:wire},
  ];
  towers.forEach(t=>{
    const geo = new THREE.BoxGeometry(t.w, t.h, t.d);
    const edges = new THREE.EdgesGeometry(geo);
    const mat = new THREE.LineBasicMaterial({color:t.color, transparent:true, opacity:t.color===red?0.9:0.35});
    const line = new THREE.LineSegments(edges, mat);
    line.position.set(t.x, t.h/2 - 4, t.z);
    group.add(line);
  });

  // ground grid
  const grid = new THREE.GridHelper(60, 30, 0x2a2f3b, 0x181c24);
  grid.position.y = -4;
  scene.add(grid);

  // particle field
  const pCount = 420;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount*3);
  for(let i=0;i<pCount;i++){
    pPos[i*3] = (Math.random()-0.5)*60;
    pPos[i*3+1] = (Math.random())*22 - 2;
    pPos[i*3+2] = (Math.random()-0.5)*60;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos,3));
  const pMat = new THREE.PointsMaterial({color:0x556077, size:0.06, transparent:true, opacity:0.55});
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  let mx=0,my=0, tx=0, ty=0;
  window.addEventListener('mousemove', e=>{
    mx = (e.clientX/innerWidth - 0.5);
    my = (e.clientY/innerHeight - 0.5);
  });

  function resize(){
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  }
  window.addEventListener('resize', resize);

  let started = false;
  function animate(){
    requestAnimationFrame(animate);
    tx += (mx - tx) * 0.03;
    ty += (my - ty) * 0.03;
    group.rotation.y = 0.5 + tx * 0.6;
    group.rotation.x = ty * 0.15;
    group.rotation.y += 0.0009;
    points.rotation.y += 0.00025;
    camera.position.x = tx * 3;
    camera.lookAt(0,1,0);
    renderer.render(scene, camera);
    if(!started){ started = true; canvas.classList.add('ready'); }
  }
  animate();
})();
