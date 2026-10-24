/* ============================================================
   KIDS VALLEY NURSERY — script.js
   GSAP animations • Three.js 3D balloons • i18n (EN/AR + RTL)
   ============================================================ */
(() => {
'use strict';

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from((c || document).querySelectorAll(s));

/* ============================================================
   ⚙️ CONFIG — edit your links here
   ============================================================ */
const CONFIG = {
  phoneDisplay : '07 9004 5678',
  tel          : 'tel:+962790045678',
  waNumber     : '962790045678',                       // WhatsApp (country code, no "+")
  waMessage    : 'مرحباً Kids Valley 👋 أرغب بالاستفسار عن التسجيل في الحضانة.\nHi! I would like to ask about enrollment.',
  instagram    : 'https://www.instagram.com/kidsvalleynurseryjo/',
  facebook     : 'https://www.facebook.com/share/1Aa9WGXWls/?mibextid=wwXlfr'
};

const hasGsap  = typeof gsap !== 'undefined';
const hasST    = hasGsap && typeof ScrollTrigger !== 'undefined';
const reduced  = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (hasST) gsap.registerPlugin(ScrollTrigger);

let lang = 'en';
let introRan = false;
let menuOpen = false;

/* ============================================================
   🌍 TRANSLATIONS (EN / AR)
   ============================================================ */
const DICT = {
en: {
  doc_title:'Kids Valley Nursery — Amman | Ages 70 days to 5 years',
  logo_name:'Kids Valley', logo_sub:'NURSERY',
  nav_about:'About', nav_programs:'Programs', nav_videos:'Videos', nav_day:'A Day', nav_contact:'Contact', nav_cta:'WhatsApp us',
  hero_badge:'Yousef Bin Tashfeen St. 63, Amman',
  hero_title:'Where little *dreams* grow big',
  hero_sub:'A warm, safe & joyful nursery in the heart of Amman — welcoming children from 70 days to 5 years with learning, play and love, every single day.',
  hero_cta1:'WhatsApp us', hero_cta2:'Watch the fun',
  hero_chip1:'Ages: 70 days – 5 yrs', hero_chip2:'Daily fun & care',
  hero_tip:'Psst… click the sky to release a balloon', hero_scroll:'scroll',
  mq:['Ages 70 days to 5 years','Art & hand paint','Math every day','Kitchen corner','Active play','Birthday parties','Field trips','Loving care'],
  about_kicker:'About us', about_title:'A second home for your little one',
  about_p1:'Kids Valley Nursery is a cozy, colorful world created for children between 70 days and 5 years. From their very first day, our caring team makes sure every child feels safe, loved and free to explore.',
  about_p2:'Through daily art, math games, cooking, music and active play, we turn every moment into a happy step of growing up.',
  scene_chip:'Ages 70 days – 5 years',
  st1_s:'days', st1_l:'Our youngest little ones', st2_s:'yrs', st2_l:'Graduation age',
  st3_s:'K+', st3_l:'Instagram family', st4_s:'+', st4_l:'Memories shared',
  prog_kicker:'Our programs', prog_title:'Learn through play, every day',
  prog_sub:'Six little worlds of fun, carefully designed for growing minds.',
  p1t:'Art & Hand Paint', p1d:'Little artists explore colors, brushes and big imaginations.',
  p2t:'Math Every Day', p2d:'Numbers, shapes and puzzles woven playfully into every morning.',
  p3t:'Kitchen Corner', p3d:'Tiny chefs mix, pour and taste while learning healthy habits.',
  p4t:'Active Play', p4d:'Daily movement, dance and games that grow strong bodies.',
  p5t:'Values & Stories', p5d:'Kindness, faith and beautiful stories that warm little hearts.',
  p6t:'Celebrations & Trips', p6d:'Birthdays, costumes, trips and moments families remember forever.',
  vid_kicker:'Reels', vid_title:'Watch the valley come alive',
  vid_sub:'Hover to preview — click for sound', vid_sub_m:'Tap a video to play with sound',
  cap1:'Daily fun', cap2:'Little hands at work', cap3:'Smiles & celebrations',
  vid_cta:'More on Instagram',
  day_kicker:'Daily rhythm', day_title:'A day at Kids Valley', day_hint:'Drag to explore',
  d1t:'Welcome & hugs', d1d:'Drop-off, warm hugs and free play while friends arrive.',
  d2t:'Morning circle', d2d:'Songs, weather, calendar and our morning story.',
  d3t:'Learning corners', d3d:'Math games, letters and puzzles in small groups.',
  d4t:'Snack & kitchen corner', d4d:'Healthy bites — and tiny chefs love to help!',
  d5t:'Art & paint', d5d:'Brushes, glue, glitter… and a glorious mess.',
  d6t:'Active play', d6d:'Outdoor runs, dance and motor-skills games.',
  d7t:'Lunch & quiet time', d7d:'Lunch together, then soft music and rest.',
  d8t:'Warm goodbyes', d8d:'One last story, a goodbye song and hugs till tomorrow!',
  par_kicker:'Happy parents', par_title:'Words from the heart',
  q1:'“My daughter runs to the gate every morning — that says everything. Thank you, Kids Valley!”', n1:'Mother of Talia — KG1',
  q2:'“The daily photos and updates make us feel part of every moment. Truly a second home.”', n2:'Father of Zain',
  q3:'“From four months old, our son was held, loved and cared for like family.”', n3:'Mother of Kareem — Infants',
  con_kicker:'Visit us', con_title:'Come say hello',
  loc_t:'Location', loc_d:'Yousef Bin Tashfeen Bldg 63, Amman, Jordan', loc_l:'Get directions',
  tel_t:'Call us', tel_l:'Call now',
  hr_t:'Working hours', hr_d1:'Sunday – Thursday', hr_d2:'7:30 AM – 4:00 PM',
  fol_t:'Follow us', fol_d:'Daily photos, videos & updates',
  cta_t:'Places are limited for the new season — message us on WhatsApp today!', cta_b:'Chat on WhatsApp',
  foot_tag:'Growing happy little humans — from 70 days to 5 years.',
  foot_explore:'Explore', foot_touch:'Get in touch',
  foot_made1:'Made with', foot_made2:'in Amman',
  foot_rights:'Kids Valley Nursery — All rights reserved.',
  cursor_drag:'DRAG'
},
ar: {
  doc_title:'حضانة كيدز فالي — عمّان | من 70 يوماً إلى 5 سنوات',
  logo_name:'كيدز فالي', logo_sub:'حضانة',
  nav_about:'من نحن', nav_programs:'برامجنا', nav_videos:'الفيديوهات', nav_day:'يومنا', nav_contact:'تواصل', nav_cta:'واتساب',
  hero_badge:'شارع يوسف بن تاشفين 63، عمّان',
  hero_title:'حيث تكبر *الأحلام* الصغيرة',
  hero_sub:'حضانة دافئة وآمنة ومليئة بالبهجة في قلب عمّان — نستقبل الأطفال من عمر 70 يوماً حتى 5 سنوات، بتعلمٍ ولعبٍ وحبٍّ في كل يوم.',
  hero_cta1:'تواصل واتساب', hero_cta2:'شاهد الأجواء',
  hero_chip1:'الأعمار: 70 يوماً – 5 سنوات', hero_chip2:'مرح ورعاية كل يوم',
  hero_tip:'اضغط على السماء لتُطلق بالوناً', hero_scroll:'مرّر',
  mq:['من 70 يوماً إلى 5 سنوات','فنون ورسم يدوي','رياضيات كل يوم','ركن المطبخ','نشاط حركي','أعياد ميلاد','رحلات وفعاليات','رعاية مليئة بالحب'],
  about_kicker:'من نحن', about_title:'بيتٌ ثانٍ لصغيرك',
  about_p1:'حضانة كيدز فالي عالمٌ مريح ومليء بالألوان صُمم خصيصاً للأطفال من عمر 70 يوماً حتى 5 سنوات. من يومهم الأول، يهتم فريقنا بأن يشعر كل طفل بالأمان والحب وحرية الاستكشاف.',
  about_p2:'من خلال الفنون اليومية وألعاب الرياضيات والطبخ والموسيقى واللعب الحركي، نحوّل كل لحظة إلى خطوة سعيدة في رحلة النمو.',
  scene_chip:'من 70 يوماً – 5 سنوات',
  st1_s:'يوماً', st1_l:'عمر أصغر من نستقبل', st2_s:'سنوات', st2_l:'عمر التخرج',
  st3_s:'ألف+', st3_l:'عائلة إنستغرام', st4_s:'+', st4_l:'لحظة شاركناها',
  prog_kicker:'برامجنا', prog_title:'نتعلم باللعب، كل يوم',
  prog_sub:'ستة عوالم صغيرة مليئة بالمرح، مصممة بعناية للعقول النامية.',
  p1t:'فنون ورسم', p1d:'فنانون صغار يستكشفون الألوان والفرش وأفكاراً لا تنتهي.',
  p2t:'رياضيات كل يوم', p2d:'أرقام وأشكال وألغاز تُدمج بروح المرح في كل صباح.',
  p3t:'ركن المطبخ', p3d:'طهاة صغار يخلطون ويصبون ويتذوقون ويتعلمون عادات صحية.',
  p4t:'نشاط حركي', p4d:'حركة ورقص وألعاب يومية تبني أجساماً قوية وواثقة.',
  p5t:'قيم وقصص', p5d:'اللطف والإيمان وقصص جميلة تدفئ القلوب الصغيرة.',
  p6t:'احتفالات ورحلات', p6d:'أعياد ميلاد وأزياء ورحلات ولحظات تبقى في الذاكرة للأبد.',
  vid_kicker:'ريلز', vid_title:'شاهد الوادي وهو ينبض بالحياة',
  vid_sub:'مرّر للمعاينة — اضغط للصوت', vid_sub_m:'اضغط على الفيديو لتشغيله بالصوت',
  cap1:'مرح يومية', cap2:'أيادي صغيرة', cap3:'ابتسمات واحتفالات',
  vid_cta:'المزيد على إنستغرام',
  day_kicker:'إيقاع يومنا', day_title:'يوم في كيدز فالي', day_hint:'اسحب للاستكشاف',
  d1t:'الاستقبال والأحضان', d1d:'تسليم الأطفال، أحضان دافئة ولعب حر حتى يصل كل الأصدقاء.',
  d2t:'الحلقة الصباحية', d2d:'أغانٍ وتعلم عن الطقس والتاريخ وقصتنا الصباحية.',
  d3t:'زوايا التعلّم', d3d:'ألعاب رياضيات وحروف وألغاز ضمن مجموعات صغيرة.',
  d4t:'وجبة خفيفة وركن المطبخ', d4d:'وجبات صحية — وطهاة صغار يساعدون أحياناً!',
  d5t:'فنون ورسم', d5d:'فرش وصمغ ولمعان… وفوضى مبهجة.',
  d6t:'اللعب الحركي', d6d:'جري في الهواء الطلق ورقص وألعاب مهارات حركية.',
  d7t:'الغداء والراحة', d7d:'غداء صحي معاً، ثم وقت هادئ مع موسيقى ناعمة.',
  d8t:'وداع بحب', d8d:'قصة أخيرة وأغنية وداع وأحضان… إلى الغد!',
  par_kicker:'أولياء الأمور', par_title:'كلمات من القلب',
  q1:'«ابنتي تركض نحو البوابة كل صباح — وهذا بحد ذاته يقول كل شيء. شكراً كيدز فالي!»', n1:'أم تاليا — KG1',
  q2:'«الصور والتحديثات اليومية تجعلنا جزءاً من كل لحظة. إنه حقاً بيت ثانٍ.»', n2:'والد زين',
  q3:'«من عمر أربعة أشهر، كان ابننا بين أحضان دافئة ورعاية كأنها العائلة.»', n3:'أم كريم — قسم الرضّع',
  con_kicker:'زورونا', con_title:'يسعدنا لقاؤكم',
  loc_t:'الموقع', loc_d:'بناية يوسف بن تاشفين 63، عمّان، الأردن', loc_l:'احصل على الاتجاهات',
  tel_t:'اتصل بنا', tel_l:'اتصل الآن',
  hr_t:'أوقات العمل', hr_d1:'الأحد – الخميس', hr_d2:'7:30 صباحاً – 4:00 مساءً',
  fol_t:'تابعنا', fol_d:'صور وفيديوهات وتحديثات يومية',
  cta_t:'الأماكن محدودة للموسم الجديد — راسلنا على واتساب اليوم!', cta_b:'تحدث عبر واتساب',
  foot_tag:'ننمّي سعادة الصغار — من 70 يوماً إلى 5 سنوات.',
  foot_explore:'استكشف', foot_touch:'تواصل معنا',
  foot_made1:'صُنع بـ', foot_made2:'في عمّان',
  foot_rights:'حضانة كيدز فالي — جميع الحقوق محفوظة.',
  cursor_drag:'اسحب'
}};

const t = k => (DICT[lang] && DICT[lang][k]) || DICT.en[k] || '';

/* ============================================================
   🌐 LANGUAGE / RTL
   ============================================================ */
function buildHeroTitle(text){
  const el = $('#heroTitle'); if (!el) return;
  el.innerHTML = '';
  const words = text.split(' ');
  words.forEach((w, i) => {
    const hl = w.startsWith('*');
    const mask = document.createElement('span');
    mask.className = 'w' + (hl ? ' whl' : '');
    const inner = document.createElement('span');
    inner.className = 'wi' + (hl ? ' hl' : '');
    inner.textContent = w.replace(/\*/g, '');
    mask.appendChild(inner);
    el.appendChild(mask);
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
  });
}

function buildMarquee(items){
  const track = $('#mqTrack'); if (!track) return;
  track.innerHTML = '';
  const STAR = '<svg class="ic mq-star" aria-hidden="true"><use href="#i-star4"/></svg>';
  for (let c = 0; c < 2; c++){
    const chunk = document.createElement('div');
    chunk.className = 'mq-chunk';
    for (let r = 0; r < 2; r++){
      items.forEach(txt => {
        const s = document.createElement('span');
        s.className = 'mq-item';
        s.innerHTML = STAR;
        s.appendChild(document.createTextNode(txt));
        chunk.appendChild(s);
      });
    }
    track.appendChild(chunk);
  }
}

function applyLang(l){
  lang = l;
  const rtl = l === 'ar';
  const html = document.documentElement;
  html.lang = l;
  html.dir = rtl ? 'rtl' : 'ltr';
  $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  buildHeroTitle(t('hero_title'));
  buildMarquee(DICT[l].mq);
  const lb = $('#langLabel'); if (lb) lb.textContent = rtl ? 'EN' : 'عربي';
  document.title = t('doc_title');
  try { localStorage.setItem('kv-lang', l); } catch(e){}
  if (hasGsap && introRan && !reduced){
    gsap.fromTo('.hero .wi', {yPercent:120}, {yPercent:0, duration:.55, stagger:.04, ease:'power3.out'});
    if (hasST) ScrollTrigger.refresh();
  }
}

/* ============================================================
   💬 WHATSAPP / TEL LINKS
   ============================================================ */
function buildLinks(){
  const waHref = `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(CONFIG.waMessage)}`;
  $$('.js-wa').forEach(a => { a.href = waHref; });
}

/* ============================================================
   🎬 PRELOADER + HERO INTRO
   ============================================================ */
function splitLetters(el){
  const txt = el.textContent; el.innerHTML = '';
  [...txt].forEach(ch => {
    const s = document.createElement('span');
    s.className = 'pl';
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    el.appendChild(s);
  });
  return $$('.pl', el);
}

function heroIntro(){
  if (introRan) return; introRan = true;
  if (!hasGsap || reduced) return;
  const tl = gsap.timeline({defaults:{ease:'power3.out'}});
  tl.to('.hero .wi', {yPercent:0, duration:.85, stagger:.055})
    .fromTo('.hero-badge', {scale:0, rotate:-14}, {scale:1, rotate:0, duration:.6, ease:'back.out(1.8)'}, '-=.5')
    .to('.hero .hi', {opacity:1, y:0, duration:.7, stagger:.09}, '-=.45')
    .to('.hero-canvas', {opacity:1, duration:1}, '-=.9')
    .fromTo('.hero-float', {scale:0}, {scale:1, duration:.55, ease:'back.out(2)', stagger:.12}, '-=.7')
    .fromTo('.spin-badge', {scale:0}, {scale:1, duration:.55, ease:'back.out(2)'}, '-=.5')
    .fromTo('.hero-tip,.scroll-hint', {opacity:0}, {opacity:1, duration:.5}, '-=.3');
}

function initPreloader(){
  const pre = $('#preloader');
  let killed = false;
  const kill = () => {
    if (killed) return; killed = true;
    document.documentElement.classList.remove('lock');
    if (pre){ pre.classList.add('done'); setTimeout(() => pre.remove(), 600); }
    heroIntro();
  };
  if (!hasGsap || reduced){ setTimeout(kill, 500); return; }
  document.documentElement.classList.add('lock');
  gsap.set('.hero .wi', {yPercent:120});
  gsap.set('.hero .hi, .hero-float, .spin-badge, .hero-tip, .scroll-hint', {opacity:0});
  gsap.set('.hero .hi', {y:26});
  gsap.set('.hero-canvas', {opacity:0});
  const letters = splitLetters($('#preWord'));
  const tl = gsap.timeline();
  tl.from(letters, {y:28, opacity:0, duration:.5, stagger:.045, ease:'back.out(2)'})
    .from('.pre-balloon', {y:-46, opacity:0, duration:.6, ease:'back.out(2)'}, '-=.35')
    .to('.pre-bar i', {scaleX:1, duration:1.05, ease:'power2.inOut'}, '-=.25')
    .add(() => {
      gsap.to(pre, {yPercent:-100, duration:.75, ease:'power4.inOut',
        onComplete:() => { pre.remove(); }});
      document.documentElement.classList.remove('lock');
      heroIntro();
    }, '+=.1');
  setTimeout(kill, 4500); // safety net
}

/* ============================================================
   🎈 THREE.JS — 3D BALLOON WORLD
   ============================================================ */
function initHero3D(){
  const canvas = $('#hero3d');
  if (!canvas || typeof THREE === 'undefined' || reduced) return;
  try {
    const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, .1, 100);
    camera.position.set(0, 0, 16);

    scene.add(new THREE.AmbientLight(0xffffff, .8));
    const dirL = new THREE.DirectionalLight(0xffffff, .75);
    dirL.position.set(5, 8, 6); scene.add(dirL);
    scene.add(new THREE.HemisphereLight(0xfff2d9, 0xffd9e8, .55));

    const world = new THREE.Group(); scene.add(world);
    const PALETTE = [0xFF6B6B, 0xFFC93C, 0x2EC4B6, 0x56C3F0, 0x9B5DE5, 0xFF8FB1, 0x7ED957];
    const balloons = [], clouds = [], stars = [];
    const rand = (a, b) => a + Math.random() * (b - a);

    function makeBalloon(color, pos, targetScale){
      const g = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({color, roughness:.4, metalness:0});
      const body = new THREE.Mesh(new THREE.SphereGeometry(1, 30, 24), mat);
      body.scale.set(1, 1.18, 1);
      const knot = new THREE.Mesh(new THREE.ConeGeometry(.17, .32, 12), mat);
      knot.position.y = -1.3; knot.rotation.x = Math.PI;
      const string = new THREE.Mesh(
        new THREE.CylinderGeometry(.016, .016, 1.7, 6),
        new THREE.MeshBasicMaterial({color:0x2B2647})
      );
      string.position.y = -2.15;
      g.add(body, knot, string);
      g.position.copy(pos);
      g.userData = {
        s:0, ts:targetScale,
        bob:Math.random()*Math.PI*2, speed:rand(.5,1.1),
        rot:rand(-.25,.25), baseY:pos.y, amp:rand(.25,.65)
      };
      world.add(g); balloons.push(g);
      if (balloons.length > 26) world.remove(balloons.shift());
      return g;
    }

    const isSmall = innerWidth < 700;
    const COUNT = isSmall ? 8 : 13;
    for (let i = 0; i < COUNT; i++){
      makeBalloon(PALETTE[i % PALETTE.length],
        new THREE.Vector3(rand(-3, 6.8), rand(-3.6, 3.8), rand(-4, 2)),
        rand(.55, 1.05));
    }

    function makeCloud(pos, scale, speed){
      const g = new THREE.Group();
      const m = new THREE.MeshBasicMaterial({color:0xffffff});
      [[0,0,0,1.05],[1.05,.12,0,.8],[-1.05,.08,0,.85],[.25,.55,0,.72]].forEach(p => {
        const s = new THREE.Mesh(new THREE.SphereGeometry(p[3], 18, 14), m);
        s.position.set(p[0], p[1], p[2]); g.add(s);
      });
      g.position.copy(pos); g.scale.setScalar(scale);
      g.userData = {speed, baseX:pos.x};
      world.add(g); clouds.push(g);
    }
    makeCloud(new THREE.Vector3(-6.5, 3, -3), 1.5, .1);
    makeCloud(new THREE.Vector3(5.8, 3.6, -5), 1.25, .07);
    makeCloud(new THREE.Vector3(-3.6, -3.8, -4), 1.15, .085);

    for (let i = 0; i < 7; i++){
      const st = new THREE.Mesh(
        new THREE.OctahedronGeometry(rand(.16,.3), 0),
        new THREE.MeshBasicMaterial({color: Math.random() > .5 ? 0xFFC93C : 0xFF6B6B})
      );
      st.position.set(rand(-7,7), rand(-4,4), rand(-5,-1));
      st.userData = {s0:st.scale.x, p:Math.random()*Math.PI*2};
      world.add(st); stars.push(st);
    }

    // ---- interaction state
    let px = 0, py = 0, dragY = 0, dragging = false, downX = 0, downY = 0, moved = 0;
    addEventListener('pointermove', e => {
      px = (e.clientX / innerWidth) * 2 - 1;
      py = (e.clientY / innerHeight) * 2 - 1;
      if (dragging && e.pointerType === 'mouse'){
        dragY += (e.movementX || 0) * .004;
        moved += Math.abs(e.movementX || 0) + Math.abs(e.movementY || 0);
      }
    }, {passive:true});

    const hit = $('#heroHit');
    if (hit){
      hit.addEventListener('pointerdown', e => {
        if (e.pointerType !== 'mouse') return;
        dragging = true; moved = 0; downX = e.clientX; downY = e.clientY;
      });
      addEventListener('pointerup', e => {
        if (!dragging) return; dragging = false;
        const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
        if (dist < 6 && e.target === hit){ // click on the sky → release a balloon
          const r = canvas.getBoundingClientRect();
          const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
          const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
          const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov/2)) * camera.position.z;
          makeBalloon(PALETTE[Math.floor(Math.random()*PALETTE.length)],
            new THREE.Vector3(nx*halfH*camera.aspect, ny*halfH, rand(-2,1)),
            rand(.55,1));
        }
      });
    }

    // ---- sizing / visibility / loop
    const hero = $('.hero');
    let visible = true;
    if ('IntersectionObserver' in window){
      new IntersectionObserver(en => { visible = en[0].isIntersecting; }, {threshold:.02}).observe(hero);
    }
    function size(){
      const w = hero.clientWidth, h = hero.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    size(); addEventListener('resize', size);

    const clock = new THREE.Clock();
    (function tick(){
      requestAnimationFrame(tick);
      if (!visible) return;
      const tt = clock.getElapsedTime();
      balloons.forEach(b => {
        const u = b.userData;
        u.s += (u.ts - u.s) * .09;
        b.scale.setScalar(Math.max(u.s, .001));
        b.position.y = u.baseY + Math.sin(tt * u.speed + u.bob) * u.amp;
        b.rotation.z = Math.sin(tt * .6 + u.bob) * u.rot;
      });
      clouds.forEach(c => {
        c.position.x += c.userData.speed * .01;
        if (c.position.x > 10) c.position.x = -10;
      });
      stars.forEach(s => {
        s.rotation.y = tt * .8;
        s.scale.setScalar(s.userData.s0 * (1 + .28 * Math.sin(tt * 2 + s.userData.p)));
      });
      const targetY = px * .22 + dragY;
      world.rotation.y += (targetY - world.rotation.y) * .05;
      world.rotation.x += (-py * .14 - world.rotation.x) * .05;
      world.position.y = Math.min(scrollY, innerHeight) * .004;
      renderer.render(scene, camera);
    })();
  } catch(err){
    canvas.style.display = 'none';
  }
}

/* ============================================================
   🎞️ GSAP SCROLL REVEALS / COUNTERS / PARALLAX
   ============================================================ */
function initScrollFX(){
  if (!hasST || reduced) return;

  $$('[data-reveal]').forEach(el => {
    gsap.fromTo(el, {y:38, opacity:0}, {
      y:0, opacity:1, duration:.9, ease:'power3.out',
      delay:parseFloat(el.dataset.delay || 0),
      scrollTrigger:{trigger:el, start:'top 86%', once:true}
    });
  });

  $$('[data-stagger]').forEach(box => {
    gsap.fromTo(box.children, {y:36, opacity:0}, {
      y:0, opacity:1, duration:.8, stagger:.09, ease:'power3.out',
      scrollTrigger:{trigger:box, start:'top 84%', once:true}
    });
  });

  $$('[data-float]').forEach(el => {
    gsap.to(el, {
      yPercent:gsap.utils.random(-26, 26), xPercent:gsap.utils.random(-10, 10),
      ease:'none',
      scrollTrigger:{trigger:el.closest('section') || el, start:'top bottom', end:'bottom top', scrub:1.2}
    });
  });

  $$('.stat-num').forEach(el => {
    const end = +el.dataset.count || 0;
    ScrollTrigger.create({
      trigger:el, start:'top 88%', once:true,
      onEnter(){
        const o = {v:0};
        gsap.to(o, {v:end, duration:1.6, ease:'power2.out',
          onUpdate:() => el.textContent = Math.round(o.v)});
      }
    });
  });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
}

/* ============================================================
   🖱️ CUSTOM CURSOR
   ============================================================ */
function initCursor(){
  if (!matchMedia('(pointer:fine)').matches || reduced) return;
  document.documentElement.classList.add('has-cursor');
  const dot = $('#cDot'), ring = $('#cRing'), label = $('#cLabel');
  let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.translate = `${mx}px ${my}px`;
    dot.style.transform = 'translate(-50%,-50%)';
  }, {passive:true});
  (function loop(){
    rx += (mx - rx) * .16; ry += (my - ry) * .16;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', e => {
    const hot = e.target.closest('a,button,.v-card,.day-strip,[data-cursor]');
    ring.classList.toggle('grow', !!hot && !(hot.dataset && hot.dataset.cursor === 'drag'));
    const isDrag = !!(hot && hot.dataset && hot.dataset.cursor === 'drag');
    ring.classList.toggle('drag', isDrag);
    label.textContent = isDrag ? t('cursor_drag') : '';
  });
}

/* ============================================================
   📌 HEADER / PROGRESS / MENU / ACTIVE NAV
   ============================================================ */
function initHeader(){
  const header = $('#siteHeader'), bar = $('#progress'),
        toTop = $('#toTop'), burger = $('#burger'), menu = $('#mMenu');
  let lastY = 0, ticking = false;

  function onScroll(){
    const y = scrollY;
    header.classList.toggle('scrolled', y > 30);
    if (!menuOpen) header.classList.toggle('hide', y > lastY && y > 350);
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    toTop.classList.toggle('show', y > 650);
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking){ requestAnimationFrame(onScroll); ticking = true; } }, {passive:true});
  onScroll();

  toTop.addEventListener('click', () => scrollTo({top:0, behavior: reduced ? 'auto' : 'smooth'}));

  function setMenu(open){
    menuOpen = open;
    menu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    document.documentElement.classList.toggle('lock', open);
  }
  burger.addEventListener('click', () => setMenu(!menuOpen));
  $$('.m-link').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) setMenu(false); });

  // active nav highlighting
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        $$('.nav-a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
      });
    }, {rootMargin:'-40% 0px -55% 0px'});
    ['about','programs','videos','day','contact'].forEach(id => {
      const s = document.getElementById(id); if (s) io.observe(s);
    });
  }
}

/* ============================================================
   🎥 VIDEO CARDS (hover preview / tap to play with sound)
   ============================================================ */
function initVideos(){
  const cards = $$('.v-card');
  const hoverable = matchMedia('(hover:hover)').matches;
  const stopOthers = current => {
    cards.forEach(c => {
      const v = $('video', c);
      if (c !== current){ v.pause(); v.muted = true; c.classList.remove('sound-on'); }
    });
  };
  cards.forEach(card => {
    const v = $('video', card);
    const toggle = () => {
      if (v.paused){
        stopOthers(card);
        v.muted = false; card.classList.add('sound-on');
        v.play().catch(() => {});
      } else v.pause();
    };
    card.addEventListener('click', e => {
      if (e.target.closest('.v-snd')){
        v.muted = !v.muted;
        card.classList.toggle('sound-on', !v.muted);
        if (!v.paused) v.play().catch(() => {});
        return;
      }
      toggle();
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); }
    });
    if (hoverable){
      card.addEventListener('mouseenter', () => { stopOthers(card); v.muted = true; v.play().catch(() => {}); });
      card.addEventListener('mouseleave', () => { v.pause(); v.muted = true; v.currentTime = 0; card.classList.remove('sound-on'); });
    }
    v.addEventListener('play',  () => card.classList.add('playing'));
    v.addEventListener('pause', () => card.classList.remove('playing'));
  });
}

/* ============================================================
   ➡️ DAY STRIP — drag to scroll + progress
   ============================================================ */
function initDayStrip(){
  const strip = $('#dayStrip'), fill = $('#dayBar');
  if (!strip) return;
  let down = false, startX = 0, startScroll = 0, moved = 0;

  strip.addEventListener('pointerdown', e => {
    down = true; moved = 0; startX = e.clientX;
    startScroll = strip.scrollLeft;
    strip.classList.add('dragging');
    strip.setPointerCapture(e.pointerId);
  });
  strip.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    strip.scrollLeft = startScroll - dx;
  });
  ['pointerup','pointercancel'].forEach(ev =>
    strip.addEventListener(ev, () => { down = false; strip.classList.remove('dragging'); }));
  strip.addEventListener('click', e => {
    if (moved > 8){ e.preventDefault(); e.stopPropagation(); }
  }, true);

  const update = () => {
    const max = strip.scrollWidth - strip.clientWidth;
    const p = max > 0 ? Math.abs(strip.scrollLeft) / max : 0;
    fill.style.width = (10 + p * 90) + '%';
  };
  strip.addEventListener('scroll', update, {passive:true});
  addEventListener('resize', update);
  update();
}

/* ============================================================
   💬 TESTIMONIALS SLIDER
   ============================================================ */
function initSlider(){
  const track = $('#tTrack'), dotsBox = $('#tDots');
  if (!track) return;
  const slides = $$('.t-slide', track);
  let i = 0, timer;
  slides.forEach((_, k) => {
    const d = document.createElement('button');
    d.className = 't-dot' + (k === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Testimonial ' + (k + 1));
    d.addEventListener('click', () => go(k, true));
    dotsBox.appendChild(d);
  });
  const dots = $$('.t-dot', dotsBox);
  function go(k, manual){
    i = (k + slides.length) % slides.length;
    const rtl = document.documentElement.dir === 'rtl';
    track.style.transform = `translateX(${i * 100 * (rtl ? 1 : -1)}%)`;
    dots.forEach((d, n) => d.classList.toggle('active', n === i));
    if (manual) restart();
  }
  function restart(){ clearInterval(timer); timer = setInterval(() => go(i + 1), 6000); }
  $('#tPrev').addEventListener('click', () => go(i - 1, true));
  $('#tNext').addEventListener('click', () => go(i + 1, true));
  // swipe
  let sx = null;
  track.addEventListener('pointerdown', e => sx = e.clientX);
  track.addEventListener('pointerup', e => {
    if (sx === null) return;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 45) go(i + (dx < 0 ? 1 : -1), true);
    sx = null;
  });
  const wrap = $('.t-wrap');
  wrap.addEventListener('mouseenter', () => clearInterval(timer));
  wrap.addEventListener('mouseleave', restart);
  restart();
}

/* ============================================================
   🚀 INIT
   ============================================================ */
function init(){
  buildLinks();
  let saved = null;
  try { saved = localStorage.getItem('kv-lang'); } catch(e){}
  applyLang(saved === 'ar' ? 'ar' : 'en');   // ← change default language here ('ar' or 'en')

  $('#langBtn').addEventListener('click', () => applyLang(lang === 'en' ? 'ar' : 'en'));
  $('#year').textContent = new Date().getFullYear();

  initPreloader();
  initHero3D();
  initScrollFX();
  initCursor();
  initHeader();
  initVideos();
  initDayStrip();
  initSlider();
}

init();
})();