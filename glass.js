import * as THREE from './assets/vendor/three.module.min.js';

// Procedural glass sculpture.
const TAU = Math.PI * 2;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const vertex = `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;

// A small, persistent velocity field. Advection carries the pointer's wake forward;
// pressure projection and dissipation let it curl and settle instead of snapping back.
class FluidField {
  constructor() {
    this.w = 112; this.h = 80; this.n = this.w * this.h;
    this.u = new Float32Array(this.n); this.v = new Float32Array(this.n);
    this.nextU = new Float32Array(this.n); this.nextV = new Float32Array(this.n);
    this.p = new Float32Array(this.n); this.nextP = new Float32Array(this.n);
    this.div = new Float32Array(this.n); this.data = new Uint8Array(this.n * 4);
    this.texture = new THREE.DataTexture(this.data,this.w,this.h,THREE.RGBAFormat);
    this.texture.minFilter = this.texture.magFilter = THREE.LinearFilter;
    this.texture.generateMipmaps = false; this.energy = 0; this.clear();
  }
  clear() {
    this.u.fill(0); this.v.fill(0); this.energy = 0;
    for(let i=0;i<this.n;i++){this.data[i*4]=128;this.data[i*4+1]=128;this.data[i*4+2]=0;this.data[i*4+3]=255;}
    this.texture.needsUpdate = true;
  }
  sample(a,x,y) {
    x=clamp(x,0,this.w-1.001); y=clamp(y,0,this.h-1.001);
    const ix=Math.floor(x), iy=Math.floor(y), fx=x-ix, fy=y-iy, k=iy*this.w+ix;
    return (a[k]*(1-fx)+a[k+1]*fx)*(1-fy)+(a[k+this.w]*(1-fx)+a[k+this.w+1]*fx)*fy;
  }
  push(x,y,dx,dy) {
    const cx=x*this.w,cy=y*this.h,r=5.5;
    const forceX=clamp(dx*this.w*3.8,-16,16),forceY=clamp(dy*this.h*3.8,-16,16);
    for(let j=Math.max(1,Math.floor(cy-r*2));j<Math.min(this.h-1,cy+r*2);j++){
      for(let i=Math.max(1,Math.floor(cx-r*2));i<Math.min(this.w-1,cx+r*2);i++){
        const d=((i-cx)**2+(j-cy)**2)/(r*r),weight=Math.exp(-d*1.5),k=j*this.w+i;
        this.u[k]+=forceX*weight;this.v[k]+=forceY*weight;
      }
    }
    this.energy=1;
  }
  step(dt) {
    if(this.energy<.003)return;
    const step=Math.min(dt*60,2),decay=Math.exp(-dt*2.15),w=this.w,h=this.h;
    for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
      const k=y*w+x,px=x-this.u[k]*step*.65,py=y-this.v[k]*step*.65;
      this.nextU[k]=this.sample(this.u,px,py)*decay;
      this.nextV[k]=this.sample(this.v,px,py)*decay;
    }
    [this.u,this.nextU]=[this.nextU,this.u];[this.v,this.nextV]=[this.nextV,this.v];
    this.p.fill(0);
    for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
      const k=y*w+x;this.div[k]=-.5*(this.u[k+1]-this.u[k-1]+this.v[k+w]-this.v[k-w]);
    }
    for(let iteration=0;iteration<5;iteration++){
      for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
        const k=y*w+x;this.nextP[k]=(this.div[k]+this.p[k-1]+this.p[k+1]+this.p[k-w]+this.p[k+w])*.25;
      }
      [this.p,this.nextP]=[this.nextP,this.p];
    }
    let peak=0;
    for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
      const k=y*w+x;
      this.u[k]-=.5*(this.p[k+1]-this.p[k-1]);this.v[k]-=.5*(this.p[k+w]-this.p[k-w]);
      const ux=clamp(this.u[k]/18,-1,1),vy=clamp(this.v[k]/18,-1,1),speed=Math.hypot(ux,vy);
      this.data[k*4]=Math.round(128+ux*127);this.data[k*4+1]=Math.round(128+vy*127);
      this.data[k*4+2]=Math.round(clamp(speed)*255);peak=Math.max(peak,speed);
    }
    this.texture.needsUpdate=true;this.energy=peak;
    if(peak<.003)this.clear();
  }
  dispose(){this.texture.dispose();}
}

function studioEnvironment(renderer) {
  const w=512,h=256,data=new Float32Array(w*h*4);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const u=x/w,v=y/h,k=(y*w+x)*4;
    const card=(cx,cy,sx,sy)=>Math.exp(-Math.pow((u-cx)/sx,8)-Math.pow((v-cy)/sy,8));
    const key=card(.22,.29,.10,.065)*7,strip=card(.69,.4,.025,.28)*5,rim=card(.88,.25,.08,.018)*6;
    const aqua=Math.exp(-((u-.47)**2/.025+(v-.62)**2/.08))*1.7;
    const mint=Math.exp(-((u-.05)**2/.03+(v-.68)**2/.08))*1.2;
    data[k]=.055+key+strip*.76+rim+mint*.68+aqua*.14;
    data[k+1]=.09+key+strip*.94+rim+mint+aqua*.82;
    data[k+2]=.15+key+strip+rim+mint*.66+aqua;
    data[k+3]=1;
  }
  const source=new THREE.DataTexture(data,w,h,THREE.RGBAFormat,THREE.FloatType);
  source.mapping=THREE.EquirectangularReflectionMapping;source.needsUpdate=true;
  const generator=new THREE.PMREMGenerator(renderer);
  const target=generator.fromEquirectangular(source);source.dispose();generator.dispose();return target;
}

function sculptureGeometry(segments,sides) {
  const geometry=new THREE.BufferGeometry(),positions=new Float32Array((segments+1)*(sides+1)*3),uvs=new Float32Array((segments+1)*(sides+1)*2),indices=[];
  for(let i=0;i<=segments;i++)for(let j=0;j<=sides;j++){
    const k=i*(sides+1)+j;uvs[k*2]=i/segments;uvs[k*2+1]=j/sides;
    if(i<segments&&j<sides){const n=k+sides+1;indices.push(k,n,k+1,k+1,n,n+1);}
  }
  geometry.setAttribute('position',new THREE.BufferAttribute(positions,3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute('uv',new THREE.BufferAttribute(uvs,2));geometry.setIndex(indices);
  const center=new THREE.Vector3(),next=new THREE.Vector3(),tangent=new THREE.Vector3(),normal=new THREE.Vector3(),binormal=new THREE.Vector3();
  function curve(t,time,out){
    const r=1.5+.43*Math.cos(3*t);
    out.set(r*Math.cos(2*t)+.11*Math.sin(5*t-time*.52),r*Math.sin(2*t)+.12*Math.cos(4*t-time*.43),.66*Math.sin(3*t)+.16*Math.sin(4*t-time*.55));
    return out;
  }
  return {geometry,update(time,pointer){
    for(let i=0;i<=segments;i++){
      const t=i/segments*TAU;curve(t,time,center);curve(t+.001,time,next);tangent.subVectors(next,center).normalize();
      normal.set(-tangent.y,tangent.x,0).normalize();binormal.crossVectors(tangent,normal).normalize();
      const roll=t+.32*Math.sin(3*t-time*.28),cr=Math.cos(roll),sr=Math.sin(roll);
      const radius=.305*(1+.11*Math.sin(5*t-time*.7));
      const local=Math.exp(-((center.x-pointer.x)**2+(center.y-pointer.y)**2)*1.8)*pointer.force;
      for(let j=0;j<=sides;j++){
        const a=j/sides*TAU,ac=Math.cos(a)*radius*1.2,as=Math.sin(a)*radius*.94;
        const n=ac*cr-as*sr,b=ac*sr+as*cr,k=(i*(sides+1)+j)*3;
        positions[k]=center.x+normal.x*n+binormal.x*b;
        positions[k+1]=center.y+normal.y*n+binormal.y*b;
        positions[k+2]=center.z+normal.z*n+binormal.z*b+local*.12*Math.sin(t*3-time);
      }
    }
    geometry.attributes.position.needsUpdate=true;geometry.computeVertexNormals();
    // Weld the seam normals for a completely smooth closed tube.
    const normals=geometry.attributes.normal.array;
    for(let j=0;j<=sides;j++){
      const a=j*3,b=(segments*(sides+1)+j)*3;
      for(let c=0;c<3;c++){const v=(normals[a+c]+normals[b+c])*.5;normals[a+c]=normals[b+c]=v;}
    }
    for(let i=0;i<=segments;i++){
      const a=i*(sides+1)*3,b=a+sides*3;
      for(let c=0;c<3;c++){const v=(normals[a+c]+normals[b+c])*.5;normals[a+c]=normals[b+c]=v;}
    }
    geometry.attributes.normal.needsUpdate=true;geometry.computeBoundingSphere();
  }};
}

export function mountGlass() {
  const hosts=[...document.querySelectorAll('[data-glass]')],root=document.documentElement;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer: fine)'),systemDark=matchMedia('(prefers-color-scheme: dark)');
  const off=()=>reduced.matches||root.dataset.motion==='off';
  let dead=false,raf=0,last=0,time=0,active=null,dirty=true,visible=true,renderer=null;
  let width=1,height=1,lastPointer=null,hovered=false,pointerAge=10,trail=[];
  const mouse=new THREE.Vector2(),smoothMouse=new THREE.Vector2(),bend={x:0,y:0,force:0};
  const cursor=document.createElement('canvas');cursor.className='glass-cursor';cursor.setAttribute('aria-hidden','true');document.body.append(cursor);
  const cursorContext=cursor.getContext('2d');let cursorW=0,cursorH=0;
  const disposables=[];
  let scene,camera,sculpture,material,model,bg,renderTarget,maskTarget,maskMaterial,postScene,postCamera,postMaterial,fluid,environment,pointerLight;
  function dark(){return root.dataset.theme==='dark'||root.dataset.theme!=='light'&&systemDark.matches;}
  function palette(){
    if(!renderer)return;
    const isDark=dark(),styles=getComputedStyle(root);
    bg.material.uniforms.uPaper.value.set(styles.getPropertyValue('--paper').trim());
    bg.material.uniforms.uDark.value=+isDark;
    material.color.set(isDark?'#d6f5ff':'#ffffff');material.attenuationColor.set('#6bd5ed');
    material.envMapIntensity=isDark?1.5:1.15;material.roughness=isDark?.07:.055;
    postMaterial.uniforms.uDark.value=+isDark;dirty=true;request();
  }
  function initRenderer(){
    if(!hosts.length)return;
    try {
      renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
      renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
      renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
      renderer.domElement.className='glass-canvas';renderer.domElement.setAttribute('aria-hidden','true');
      renderer.domElement.addEventListener('webglcontextlost',lost);
      scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(35,1,.1,70);camera.position.set(0,0,10);
      environment=studioEnvironment(renderer);scene.environment=environment.texture;
      scene.add(new THREE.HemisphereLight('#d3fcff','#bff6ca',2));
      const key=new THREE.DirectionalLight('#ffffff',3);key.position.set(-3,5,5);scene.add(key);
      pointerLight=new THREE.PointLight('#e5ffff',14,20,2);pointerLight.position.set(1,2,4);scene.add(pointerLight);
      const rim=new THREE.DirectionalLight('#93eaf9',2.5);rim.position.set(5,-1,2);scene.add(rim);
      model=sculptureGeometry(fine.matches?224:144,fine.matches?24:18);
      material=new THREE.MeshPhysicalMaterial({color:'#d0f4ff',metalness:0,roughness:.095,transmission:1,thickness:.7,ior:1.46,clearcoat:1,clearcoatRoughness:.055,attenuationColor:'#38b4ed',attenuationDistance:3.2,iridescence:.12,iridescenceIOR:1.3,iridescenceThicknessRange:[100,240],side:THREE.DoubleSide});
      // The tint deepens through the upper bends; fine travelling normals animate the reflections.
      material.onBeforeCompile=shader=>{
        shader.uniforms.uRiverTime={value:0};material.userData.riverShader=shader;
        shader.vertexShader='varying vec3 vRiverPosition; varying vec2 vRiverUv;\n'+shader.vertexShader;
        shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n vRiverPosition=position;vRiverUv=uv;');
        shader.fragmentShader='uniform float uRiverTime; varying vec3 vRiverPosition; varying vec2 vRiverUv;\n'+shader.fragmentShader;
        shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
          float riverTint=smoothstep(-1.1,1.5,vRiverPosition.y+.15*sin(vRiverUv.x*12.56-uRiverTime*.3));
          diffuseColor.rgb*=mix(vec3(.96,1.,.99),vec3(.24,.69,1.),riverTint*.84);`);
        shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
          normal=normalize(normal+vec3(sin(vRiverUv.x*92.-uRiverTime*.8)*.015,cos(vRiverUv.x*64.+vRiverUv.y*6.28-uRiverTime*.6)*.011,0.));`);
      };
      sculpture=new THREE.Mesh(model.geometry,material);sculpture.scale.set(1.2,.86,1);sculpture.rotation.set(.32,-.2,-.2);scene.add(sculpture);
      const bgMaterial=new THREE.ShaderMaterial({vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`
        varying vec2 vUv;uniform vec3 uPaper;uniform float uTime;uniform float uDark;
        void main(){vec2 p=vUv;float t=uTime*.025;
          float wave=sin(p.x*10.+p.y*6.+sin(p.y*6.-t)*1.4+t);
          float band=pow(.5+.5*wave,5.);float second=pow(.5+.5*sin(p.x*8.-p.y*8.+t*.7),12.);
          vec3 aqua=mix(vec3(.58,.92,.97),vec3(.025,.23,.30),uDark);
          vec3 mint=mix(vec3(.86,1.,.76),vec3(.09,.30,.29),uDark);
          vec3 col=mix(uPaper,aqua,band*.55);col=mix(col,mint,second*.32);
          float edge=smoothstep(0.,.17,p.x)*smoothstep(0.,.17,1.-p.x)*smoothstep(0.,.18,p.y)*smoothstep(0.,.18,1.-p.y);
          gl_FragColor=vec4(col,1.);
        }`,uniforms:{uPaper:{value:new THREE.Color('#f1fbed')},uTime:{value:0},uDark:{value:0}},depthWrite:false});
      bg=new THREE.Mesh(new THREE.PlaneGeometry(27,19),bgMaterial);bg.position.z=-4;bg.renderOrder=-1;scene.add(bg);
      fluid=new FluidField();renderTarget=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType,depthBuffer:true,samples:fine.matches?4:2});
      maskTarget=new THREE.WebGLRenderTarget(1,1,{depthBuffer:true,samples:fine.matches?4:2});
      maskMaterial=new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide,toneMapped:false});
      postMaterial=new THREE.ShaderMaterial({vertexShader:vertex,fragmentShader:`
        varying vec2 vUv;uniform sampler2D uScene;uniform sampler2D uFlow;uniform sampler2D uMask;uniform float uDark;uniform float uContact;
        void main(){vec2 velocity=(texture2D(uFlow,vUv).rg-vec2(128./255.))*2.;
          float speed=length(velocity);vec2 displacement=velocity*.19;
          vec4 original=texture2D(uScene,clamp(vUv-displacement,vec2(.001),vec2(.999)));
          vec4 red=texture2D(uScene,clamp(vUv-displacement*1.16,vec2(.001),vec2(.999)));
          vec4 blue=texture2D(uScene,clamp(vUv-displacement*.86,vec2(.001),vec2(.999)));
          vec3 color=vec3(red.r,original.g,blue.b);
          color+=vec3(.035,.11,.13)*smoothstep(.03,.55,speed);
          // Keep the editorial text readable over the sculpture in the dark theme.
          float safe=mix(1.,smoothstep(.18,.56,vUv.x*.50+vUv.y*.65),uDark*(1.-uContact)*.82);
          safe*=mix(1.,.62,uDark*uContact);
          float mask=texture2D(uMask,clamp(vUv-displacement,vec2(.001),vec2(.999))).r;
          gl_FragColor=vec4(color,mask*safe);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,uniforms:{uScene:{value:renderTarget.texture},uMask:{value:maskTarget.texture},uFlow:{value:fluid.texture},uDark:{value:0},uContact:{value:0}},transparent:true,depthTest:false,depthWrite:false});
      postScene=new THREE.Scene();postCamera=new THREE.Camera();const quad=new THREE.Mesh(new THREE.PlaneGeometry(2,2),postMaterial);postScene.add(quad);
      const engine=renderer;
      disposables.push(()=>{model.geometry.dispose();material.dispose();bg.geometry.dispose();bgMaterial.dispose();renderTarget.dispose();maskTarget.dispose();maskMaterial.dispose();postMaterial.dispose();quad.geometry.dispose();environment.dispose();fluid.dispose();engine.dispose();engine.forceContextLoss();});
      palette();
    }catch(error){
      console.warn('Glass artwork unavailable; using the still artwork.',error);renderer?.dispose();renderer=null;
    }
  }
  function lost(event){event.preventDefault();if(active)active.classList.remove('glass-live');event.target.remove();renderer=null;dirty=false;}
  function sizeCursor(){cursorW=innerWidth;cursorH=innerHeight;const dpr=Math.min(devicePixelRatio,1.5);cursor.width=cursorW*dpr;cursor.height=cursorH*dpr;cursorContext?.setTransform(dpr,0,0,dpr,0,0);}
  function chooseHost(){
    if(!renderer)return;
    let chosen=null,best=0;
    for(const host of hosts){const b=host.getBoundingClientRect(),amount=Math.max(0,Math.min(innerHeight,b.bottom)-Math.max(0,b.top));if(amount>best){best=amount;chosen=host;}}
    if(chosen!==active){
      active?.classList.remove('glass-live');active=chosen;lastPointer=null;fluid.clear();
      if(active){active.append(renderer.domElement);dirty=true;}
    }
    if(active){
      const b=active.getBoundingClientRect();
      if(width!==b.width||height!==b.height||dirty){
        width=Math.max(1,b.width);height=Math.max(1,b.height);
        const ratio=Math.min(devicePixelRatio||1,fine.matches?1.4:1.1,Math.sqrt(1700000/(width*height)));
        renderer.setPixelRatio(ratio);renderer.setSize(width,height,false);renderTarget.setSize(Math.round(width*ratio),Math.round(height*ratio));maskTarget.setSize(Math.round(width*ratio),Math.round(height*ratio));
        camera.aspect=width/height;camera.updateProjectionMatrix();
      }
    }
  }
  function resize(){dirty=true;sizeCursor();chooseHost();request();}
  function scroll(){chooseHost();request();}
  function pointer(event){
    if(off()||!fine.matches||event.pointerType==='touch')return;
    const x=event.clientX,y=event.clientY,stamp=performance.now();
    const grid=6,cellX=Math.round(x/grid)*grid,cellY=Math.round(y/grid)*grid;
    if(!trail.length||trail[0].x!==cellX||trail[0].y!==cellY){trail.unshift({x:cellX,y:cellY,t:stamp});trail=trail.slice(0,25);}
    if(active&&renderer){
      const b=active.getBoundingClientRect(),nx=(x-b.left)/b.width,ny=1-(y-b.top)/b.height;
      hovered=nx>=0&&nx<=1&&ny>=0&&ny<=1;
      if(hovered){
        mouse.set((nx-.5)*2,(ny-.5)*2);pointerAge=0;
        if(lastPointer){const dx=nx-lastPointer.x,dy=ny-lastPointer.y,d=Math.hypot(dx,dy);if(d<.25){const steps=Math.max(1,Math.ceil(d/.025));for(let i=1;i<=steps;i++)fluid.push(lastPointer.x+dx*i/steps,lastPointer.y+dy*i/steps,dx/steps,dy/steps);}}
        lastPointer={x:nx,y:ny};
      }else lastPointer=null;
    }
    request();
  }
  function leave(){lastPointer=null;hovered=false;mouse.set(0,0);request();}
  function drawCursor(stamp){
    if(!cursorContext)return;
    cursorContext.clearRect(0,0,cursorW,cursorH);trail=trail.filter(p=>stamp-p.t<520);
    if(off()||!fine.matches){trail=[];return;}
    cursorContext.fillStyle=dark()?'#94ebf8':'#147aaf';
    for(const p of trail){const life=1-(stamp-p.t)/520;cursorContext.globalAlpha=life*.52;cursorContext.beginPath();cursorContext.arc(p.x,p.y,1.5*life+.35,0,TAU);cursorContext.fill();}
    cursorContext.globalAlpha=1;
  }
  function frame(stamp){
    raf=0;if(dead||!visible)return;
    const dt=Math.min((stamp-last)/1000||.016,.04);last=stamp;
    drawCursor(stamp);
    if(renderer&&active){
      const still=off(),isContact=active.dataset.glass==='contact';
      if(!still||dirty){
        if(!still)time+=dt;pointerAge+=dt;
        smoothMouse.lerp(still?new THREE.Vector2():mouse,1-Math.exp(-dt*3.5));
        bend.x=smoothMouse.x*2.2;bend.y=smoothMouse.y*2;bend.force=still?0:Math.exp(-pointerAge*1.4);
        model.update(still?0:time,bend);
        if(material.userData.riverShader)material.userData.riverShader.uniforms.uRiverTime.value=still?0:time;
        const narrow=width<760,viewHeight=2*Math.tan(THREE.MathUtils.degToRad(35/2))*10,viewWidth=viewHeight*width/height;
        const size=Math.min(viewWidth/(narrow?7.9:10.3),viewHeight/(narrow?9.5:6.5));
        sculpture.scale.set(size*1.55,size*.75,size);
        sculpture.position.set(narrow||isContact?0:viewWidth*.10,viewHeight*(isContact?0:.015),0);
        sculpture.rotation.set(.32+smoothMouse.y*.11,-.2+smoothMouse.x*.16,(isContact?.72:-.25)+Math.sin(time*.13)*.025);
        pointerLight.position.set(smoothMouse.x*5-1,smoothMouse.y*4+2,4);
        camera.position.x=smoothMouse.x*.18;camera.position.y=smoothMouse.y*.12;camera.lookAt(0,0,0);
        bg.scale.set(viewWidth*1.4/27,viewHeight*1.4/19,1);bg.material.uniforms.uTime.value=time;postMaterial.uniforms.uContact.value=+isContact;
        if(still)fluid.clear();else fluid.step(dt);
        renderer.setRenderTarget(renderTarget);renderer.clear();renderer.render(scene,camera);
        bg.visible=false;scene.overrideMaterial=maskMaterial;
        renderer.setRenderTarget(maskTarget);renderer.clear();renderer.render(scene,camera);
        scene.overrideMaterial=null;bg.visible=true;
        renderer.setRenderTarget(null);renderer.clear();renderer.render(postScene,postCamera);
        active.classList.add('glass-live');dirty=false;
      }
    }
    if((renderer&&active&&!off())||trail.length)request();
  }
  function request(){if(!raf&&!dead&&visible)raf=requestAnimationFrame(frame);}
  function motion(){trail=[];lastPointer=null;mouse.set(0,0);smoothMouse.set(0,0);fluid?.clear();dirty=true;request();}
  function visibility(){visible=!document.hidden;if(visible){last=performance.now();chooseHost();request();}else{cancelAnimationFrame(raf);raf=0;}}
  initRenderer();sizeCursor();chooseHost();
  const themeObserver=new MutationObserver(records=>{if(records.some(r=>r.attributeName==='data-theme'))palette();});themeObserver.observe(root,{attributes:true,attributeFilter:['data-theme']});
  const resizeObserver=new ResizeObserver(resize);hosts.forEach(h=>resizeObserver.observe(h));
  addEventListener('pointermove',pointer,{passive:true});document.addEventListener('pointerleave',leave);
  addEventListener('scroll',scroll,{passive:true});addEventListener('resize',resize);addEventListener('portfolio-motion',motion);
  reduced.addEventListener('change',motion);systemDark.addEventListener('change',palette);document.addEventListener('visibilitychange',visibility);request();
  return ()=>{
    dead=true;cancelAnimationFrame(raf);themeObserver.disconnect();resizeObserver.disconnect();
    removeEventListener('pointermove',pointer);document.removeEventListener('pointerleave',leave);removeEventListener('scroll',scroll);removeEventListener('resize',resize);removeEventListener('portfolio-motion',motion);
    reduced.removeEventListener('change',motion);systemDark.removeEventListener('change',palette);document.removeEventListener('visibilitychange',visibility);
    renderer?.domElement.removeEventListener('webglcontextlost',lost);renderer?.domElement.remove();cursor.remove();hosts.forEach(h=>h.classList.remove('glass-live'));
    disposables.forEach(fn=>fn());
  };
}

export { FluidField, sculptureGeometry };
