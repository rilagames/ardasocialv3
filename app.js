const projects = [
  {id:2,title:'Bavulunuz hazırsa',brand:'New Inn',kind:'Sosyal medya · Turizm',description:'Seyahat, İstanbul ve konaklama fikrini aynı karede buluşturan sosyal medya çalışması.'},
  {id:9,title:'Dışarıdan şık.',brand:'Lenovo Legion',kind:'Sosyal medya · Teknoloji',description:'Legion dünyasından bir çalışma: gündelik kullanım ve oyun deneyimini bir araya getiren görsel anlatım.'},
  {id:12,title:'İstanbul’u keşfet',brand:'New Inn',kind:'Sosyal medya · Şehir yaşamı',description:'İstanbul’un simgelerinden yola çıkan, şehri keşfetmeye davet eden içerik.'},
  {id:23,title:'Baba büyüksün',brand:'Fuzul',kind:'Sosyal medya · Özel gün',description:'Babalar Günü için hazırlanmış kampanya iletişimi ve sosyal medya içeriği.'},
  {id:38,title:'Kendi yolunu bul',brand:'Fuzul',kind:'Sosyal medya · Kampanya',description:'Otomobil ve yolculuk fikri etrafında şekillenen kampanya çalışması.'},
  {id:3,title:'Yeni bir şehir',brand:'New Inn',kind:'Sosyal medya · Konaklama',description:'Şehir yaşamı ve konaklama deneyimini odağına alan sosyal medya çalışması.'},
  {id:41,title:'Bir evden fazlası',brand:'Fuzul',kind:'Sosyal medya · Yaşam',description:'Ev ve yaşam temasını görsel bir fikirle ele alan portfolyo çalışması.'},
  {id:18,title:'Aranıyor!',brand:'New Inn',kind:'Sosyal medya · Yaratıcı içerik',description:'İlan dilini yaratıcı bir sosyal medya fikrine dönüştüren içerik.'},
  {id:42,title:'Yeni bir bakış',brand:'Fuzul',kind:'Sosyal medya · Marka iletişimi',description:'Mimari ve yaşam odağında hazırlanmış marka iletişimi çalışması.'},
];

function aboutContent(){return `<div class="ribbon-tabs" aria-label="Belge görünümü"><span>Dosya</span><span class="selected">Giriş</span><span>Ekle</span><span>Düzen</span><span>Görünüm</span></div><div class="ribbon-tools" aria-hidden="true"><div class="tool-group"><span class="font-select">Georgia ⌄</span><span>12 ⌄</span></div><div class="tool-group"><b>B</b><i>I</i><u>U</u></div><span class="heading-style">AaBbCc</span><span>¶</span></div><div class="document-scroll"><article class="paper"><div class="eyebrow">MERHABA, BEN ARDA.</div><h1>Bir fikir.<br>Birkaç kelime.<br><em>Bir sürü ihtimal.</em></h1><p class="lead">Markalar için fikirler buluyor, kelimeleri bir araya getiriyor, sosyal medyada anlatılmaya değer hikâyeler kuruyorum.</p><p class="lead">Burası benim yaratıcı masaüstüm. Dosyaların arasında biraz metin, biraz strateji ve bolca fikir var.</p><div class="paper-rule"></div><div class="doc-bottom"><div class="signature">Arda Öztiryaki<small>Sosyal medya uzmanı & metin yazarı</small></div><button class="doc-cta" data-open="projects">İşlerime göz at <span>↗</span></button></div></article></div><div class="statusbar"><span>Sayfa 1 / 1 &nbsp; · &nbsp; Türkçe</span><span>Bir fikrin ilk taslağı. &nbsp; − ━━━ + &nbsp; %100</span></div>`}

const desktop = document.querySelector('#desktop');
const canvas = document.querySelector('#icon-canvas');
const iconViewport = document.querySelector('#desktop-icons');
const windowHost = document.querySelector('#windows');
const openWindows = new Map();
const menu = document.querySelector('#start-menu');
const startButton = document.querySelector('#start-button');
const contextMenu = document.querySelector('#context-menu');
const experienceNames = ['Appen', 'Krombera', 'Fevreka'];
const titles = {
  about: 'Hakkımda.docx — Word', projects: 'Seçilmiş işler — Works',
  notes: 'Not defterim.txt — Not Defteri', skills: 'Neler yaparım.xlsx — Excel',
  experience: 'Önceki tecrübelerim — Dosya Gezgini',
  ...Object.fromEntries(experienceNames.map(name => [`experience-${name}`, `${name}.txt — Not Defteri`])),
};
const badges = {about:'W',projects:'W',notes:'≡',skills:'X',experience:'▰'};
let topLayer = 10;
let contextTarget = null;
let contextReturnFocus = null;
let desktopSnapshot = null;
const suppressOpenUntil = new WeakMap();
const positionKey = () => `arda-desktop-positions-v2-${innerWidth <= 760 ? 'mobile' : 'desktop'}`;
const announce = text => { document.querySelector('#desktop-announcement').textContent = text; };
const clamp = (value, min, max) => Math.max(min, Math.min(Math.max(min, max), value));

canvas.insertAdjacentHTML('beforeend', projects.map(p => `<button class="desktop-icon project-icon" data-open="project-${p.id}"><img src="./assets/project-${p.id}.webp" alt="" draggable="false" width="61" height="66"><span>${p.title}</span></button>`).join(''));
const icons = [...canvas.querySelectorAll('.desktop-icon')];

function projectGrid() {
  return projects.map(p => `<button class="social-post" data-open="project-${p.id}" aria-label="${p.title} — ${p.brand}"><img src="./assets/project-${p.id}.webp" alt="${p.title} — ${p.brand}" loading="lazy"><span class="post-overlay"><strong>${p.title}</strong><small>${p.brand} ↗</small></span></button>`).join('');
}
function portfolioContent() {
  return `<div class="social-body"><div class="social-grid-label"><span aria-hidden="true">▦</span> SEÇİLMİŞ İŞLER</div><div class="social-grid">${projectGrid()}</div></div>`;
}
function projectContent(project) {
  const index = projects.indexOf(project);
  return `<div class="social-body"><header class="works-detail-header"><button data-portfolio-back aria-label="Seçilmiş işlere geri dön">← Geri</button><span>${project.title}</span><small>${index + 1} / ${projects.length}</small></header><img class="social-post-image" src="./assets/project-${project.id}.webp" alt="${project.brand}: ${project.title}"><div class="social-post-details"><div class="social-post-controls"><span>${project.brand}</span><div class="post-navigation"><button data-project-step="-1" aria-label="Önceki çalışma">‹</button><button data-project-step="1" aria-label="Sonraki çalışma">›</button></div></div><p><strong>${project.title}</strong><br>${project.description}</p></div></div>`;
}
function showPortfolioView(win, projectId = null) {
  const body = win.querySelector('.social-body');
  const wasDetail = Boolean(win.dataset.projectId);
  if (projectId !== null) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    if (!wasDetail) win.dataset.feedScroll = body.scrollTop;
    win.dataset.projectId = projectId;
    body.outerHTML = projectContent(project);
    win.querySelector('[data-portfolio-back]').focus({preventScroll:true});
  } else {
    const previousId = win.dataset.projectId;
    delete win.dataset.projectId;
    if (wasDetail) {
      body.outerHTML = portfolioContent();
      win.querySelector('.social-body').scrollTop = Number(win.dataset.feedScroll) || 0;
      win.querySelector(`[data-open="project-${previousId}"]`)?.focus({preventScroll:true});
    }
  }
}
function contentFor(id) {
  if (id === 'about') return aboutContent();
  if (id === 'projects') return portfolioContent();
  if (id === 'experience') return `<div class="explorer-toolbar"><span aria-hidden="true">▰</span><span>Bu bilgisayar</span><span>›</span><span>Önceki tecrübelerim</span></div><div class="explorer-body"><header class="experience-heading"><h2>Önceki tecrübelerim</h2><p>Birlikte çalıştığım ekipler.</p></header><div class="file-list-head"><span>Ad</span><span>Tür</span></div>${experienceNames.map(name => `<button class="experience-file" data-open="experience-${name}" aria-label="${name}.txt"><span class="file-icon note-file" aria-hidden="true">≡<span>≡</span></span><strong>${name}.txt</strong><small>Metin belgesi</small></button>`).join('')}</div><div class="statusbar"><span>3 öğe</span><span>Önceki tecrübelerim</span></div>`;
  if (id.startsWith('experience-')) {
    const name = experienceNames.find(name => id === `experience-${name}`);
    return `<div class="experience-document"><h2>${name}</h2><p>Detaylar daha sonra eklenecek.</p></div><div class="statusbar"><span>${name}.txt</span><span>Türkçe · UTF-8</span></div>`;
  }
  if (id === 'notes') return `<article class="window-body notepad"><small>NOT DEFTERİ / 001</small><h2>Önce bir cümle.</h2><p class="section-desc">Bazen bir başlık, bazen bir kampanyanın çıkış noktası.<br>Bu masaüstü için yazılmış birkaç küçük not.</p><blockquote>Kaydırıp geçilen değil,<br>durup bakılan fikirler.</blockquote><blockquote>Her markanın bir sesi var.<br>Mesele, doğru kelimeleri bulmak.</blockquote><blockquote>İyi bir hikâye,<br>doğru bir soruyla başlar.</blockquote><small>ARDA’NIN NOTLARI · DEVAM EDECEK.</small></article>`;
  if (id === 'skills') return `<div class="window-body"><h2>Fikirden yayına.</h2><p class="section-desc">Bir içeriğin yalnızca ne söylediği değil, ne zaman ve nasıl söylediği de önemli.</p><div class="skill-list">${[['Sosyal medya iletişimi','Markanın sesine uygun içerik fikirleri ve sosyal medya anlatıları.'],['Metin yazarlığı','Başlıklar, post metinleri, sloganlar ve kampanya fikirleri.'],['İçerik planlama','Birbiriyle konuşan içerikler ve tutarlı bir yayın akışı.'],['Yaratıcı konsept','Marka, mecra ve hedef kitleyi bir araya getiren çıkış noktaları.']].map(([a,b],i) => `<div class="skill-row"><span>0${i+1}</span><div><h3>${a}</h3><p>${b}</p></div></div>`).join('')}</div></div>`;
  return projectContent(projects.find(p => id === `project-${p.id}`));
}

function focusWindow(win) {
  win.style.zIndex = ++topLayer;
  openWindows.forEach(w => w.classList.toggle('active', w === win && !w.hidden));
}
function focusRemainingWindow() {
  const top = [...openWindows.values()].filter(w => !w.hidden).sort((a,b) => Number(b.style.zIndex) - Number(a.style.zIndex))[0];
  if (top) { focusWindow(top); top.querySelector('.close').focus({preventScroll:true}); }
  else { startButton.focus({preventScroll:true}); }
}
function closeWindow(id) {
  const win = openWindows.get(id);
  if (!win) return;
  win.remove(); openWindows.delete(id); focusRemainingWindow();
}
function setWindowPosition(win, x, y) {
  win.dataset.x = x; win.dataset.y = y;
  win.style.transform = `translate(${x}px,${y}px)`;
}
function openWindow(id, projectId = null) {
  const project = projects.find(p => id === `project-${p.id}`);
  if (project) return openWindow('projects', project.id);
  if (!titles[id]) return;
  toggleStart(false); closeContext(); desktopSnapshot = null;
  if (openWindows.has(id)) {
    const win = openWindows.get(id); win.hidden = false; focusWindow(win);
    if (id === 'projects') showPortfolioView(win, projectId);
    if (projectId === null) win.querySelector('.close').focus({preventScroll:true});
    return win;
  }
  const title = titles[id];
  const win = document.createElement('section');
  win.className = `window${id === 'projects' ? ' social-window' : ''}`;
  win.dataset.id = id; win.setAttribute('role','dialog'); win.setAttribute('aria-label',title);
  const offset = openWindows.size % 5 * 22;
  const width = innerWidth > 1600 ? 760 : innerWidth <= 1000 ? 590 : 690;
  const x = clamp((innerWidth > 1100 ? 145 : 35) + offset, 0, desktop.clientWidth - width);
  setWindowPosition(win, x, offset);
  win.innerHTML = `<div class="titlebar"><div class="title-label">${id === 'projects' ? '<img class="title-works-icon" src="./assets/works.svg" alt="" width="18" height="18">' : `<span class="mini-word">${badges[id] || '≡'}</span>`}<span>${title}</span></div><div class="window-actions"><button data-action="minimize" aria-label="Küçült">−</button><button data-action="maximize" aria-label="Büyüt" aria-pressed="false">□</button><button data-action="close" class="close" aria-label="Kapat">×</button></div></div>${contentFor(id)}`;
  windowHost.append(win); openWindows.set(id,win); focusWindow(win);
  win.addEventListener('pointerdown', () => focusWindow(win));
  win.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.action === 'close') closeWindow(id);
    if (button.dataset.action === 'minimize') { win.hidden = true; focusRemainingWindow(); }
    if (button.dataset.action === 'maximize') {
      const max = win.classList.toggle('maximized');
      button.setAttribute('aria-pressed', String(max)); button.setAttribute('aria-label',max ? 'Önceki boyut' : 'Büyüt');
    }
  }));
  const bar = win.querySelector('.titlebar');
  bar.addEventListener('dblclick', e => { if (!e.target.closest('button')) win.querySelector('[data-action="maximize"]').click(); });
  bar.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('button') || win.classList.contains('maximized') || innerWidth <= 760) return;
    const startX=e.clientX, startY=e.clientY, x=Number(win.dataset.x), y=Number(win.dataset.y);
    bar.setPointerCapture(e.pointerId);
    const move = event => setWindowPosition(win, clamp(x + event.clientX-startX,0,desktop.clientWidth-win.offsetWidth), clamp(y+event.clientY-startY,-65,desktop.clientHeight-60));
    const stop = () => { bar.removeEventListener('pointermove',move); bar.removeEventListener('pointerup',stop); bar.removeEventListener('pointercancel',stop); };
    bar.addEventListener('pointermove',move); bar.addEventListener('pointerup',stop); bar.addEventListener('pointercancel',stop);
  });
  if (id === 'projects' && projectId !== null) showPortfolioView(win, projectId);
  else win.querySelector('.close').focus({preventScroll:true});
  return win;
}

function readPositions() {
  try { const data = JSON.parse(localStorage.getItem(positionKey()) || '{}'); return data && typeof data === 'object' && !Array.isArray(data) ? data : {}; }
  catch { return {}; }
}
function savePositions() {
  const positions = Object.fromEntries(icons.map(icon => [icon.dataset.open, {
    x: Number(icon.dataset.x) / Math.max(1, canvas.clientWidth - icon.offsetWidth),
    y: Number(icon.dataset.y) / Math.max(1, canvas.clientHeight - icon.offsetHeight),
  }]));
  try { localStorage.setItem(positionKey(), JSON.stringify(positions)); } catch { /* The desktop still works without browser storage. */ }
}
function placeIcon(icon, x, y) {
  const nx = clamp(x,0,canvas.clientWidth-icon.offsetWidth), ny = clamp(y,0,canvas.clientHeight-icon.offsetHeight);
  icon.style.left = `${nx}px`; icon.style.top = `${ny}px`;
  icon.dataset.x = nx; icon.dataset.y = ny;
}
function layoutIcons({reset=false,sort=false}={}) {
  const mobile = innerWidth <= 760;
  const columns = Math.max(2, Math.floor(iconViewport.clientWidth/104));
  canvas.style.height = `${mobile ? Math.max(iconViewport.clientHeight, Math.ceil(icons.length/columns)*111) : Math.max(iconViewport.clientHeight,525)}px`;
  const saved = reset ? {} : readPositions();
  const ordered = sort ? [...icons].sort((a,b) => a.innerText.localeCompare(b.innerText,'tr')) : icons;
  ordered.forEach((icon,i) => {
    let x,y;
    if (mobile || sort) {
      const cols = mobile ? columns : Math.max(2,Math.floor(canvas.clientWidth/116));
      x = (i%cols)*canvas.clientWidth/cols + (canvas.clientWidth/cols-100)/2;
      y = Math.floor(i/cols)*111;
    } else if (i < 5) { x=0; y=i*104; }
    else {
      const j=i-5, area=Math.min(420,canvas.clientWidth*.38), step=area/3;
      x=canvas.clientWidth-area+(j%3)*step+(step-100)/2;
      y=12+Math.floor(j/3)*139+(j%3===1?25:0);
    }
    const pos = saved[icon.dataset.open];
    if (pos && Number.isFinite(pos.x) && Number.isFinite(pos.y)) {
      x=clamp(pos.x,0,1)*(canvas.clientWidth-icon.offsetWidth);
      y=clamp(pos.y,0,1)*(canvas.clientHeight-icon.offsetHeight);
    }
    icon.dataset.defaultX=x; icon.dataset.defaultY=y;
    placeIcon(icon,x,y);
  });
  if (reset) savePositions();
}
function selectIcon(icon) { icons.forEach(item => item.classList.toggle('selected', item === icon)); }
icons.forEach(icon => {
  icon.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    selectIcon(icon); closeContext();
    icon.setPointerCapture(e.pointerId);
    const startX=e.clientX, startY=e.clientY, x=Number(icon.dataset.x), y=Number(icon.dataset.y);
    let dragging=false;
    const move = event => {
      if (!dragging && Math.hypot(event.clientX-startX,event.clientY-startY)<6) return;
      if (!dragging) { dragging=true; icon.setPointerCapture(e.pointerId); icon.classList.add('dragging'); }
      event.preventDefault();
      placeIcon(icon, x+event.clientX-startX, y+event.clientY-startY);
    };
    const stop = event => {
      icon.removeEventListener('pointermove',move); icon.removeEventListener('pointerup',stop); icon.removeEventListener('pointercancel',stop);
      if (dragging) {
        icon.classList.remove('dragging'); suppressOpenUntil.set(icon, performance.now()+400);
        if (event.type === 'pointercancel') placeIcon(icon,x,y);
        else { savePositions(); announce(`${icon.innerText} taşındı.`); }
      }
    };
    icon.addEventListener('pointermove',move); icon.addEventListener('pointerup',stop); icon.addEventListener('pointercancel',stop);
  });
  icon.addEventListener('keydown', e => {
    if (e.altKey && ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)) {
      e.preventDefault();
      const dx=e.key==='ArrowLeft'?-12:e.key==='ArrowRight'?12:0, dy=e.key==='ArrowUp'?-12:e.key==='ArrowDown'?12:0;
      placeIcon(icon,Number(icon.dataset.x)+dx,Number(icon.dataset.y)+dy);savePositions();
    }
    if (e.key==='ContextMenu'||(e.shiftKey&&e.key==='F10')) {
      e.preventDefault();const box=icon.getBoundingClientRect();showContext(box.x+30,box.y+35,icon);
    }
  });
});

function closeContext(restore=false) {
  contextMenu.hidden=true;
  if (restore && contextReturnFocus?.isConnected) contextReturnFocus.focus({preventScroll:true});
}
function showContext(x,y,icon=null) {
  toggleStart(false);contextTarget=icon;contextReturnFocus=icon || document.activeElement;
  if(icon)selectIcon(icon);
  const item=(action,symbol,label,hint='')=>`<button role="menuitem" data-context="${action}"><span aria-hidden="true">${symbol}</span><span>${label}</span>${hint?`<span class="menu-hint">${hint}</span>`:''}</button>`;
  contextMenu.innerHTML=(icon ? item('open','↗','Aç')+item('reset-one','↶','Simge konumunu sıfırla')+'<hr role="separator">' : '')+item('sort','⇅','Ada göre sırala')+item('refresh','↻','Yenile')+'<hr role="separator">'+item('projects','◎','Seçilmiş işler')+item('experience','▰','Önceki tecrübelerim')+'<hr role="separator">'+item('desktop','▣','Masaüstünü göster')+item('reset','⊞','Simgeleri varsayılana döndür');
  contextMenu.hidden=false;
  contextMenu.style.left=`${clamp(x,8,innerWidth-contextMenu.offsetWidth-8)}px`;
  contextMenu.style.top=`${clamp(y,8,innerHeight-contextMenu.offsetHeight-8)}px`;
  contextMenu.querySelector('button').focus({preventScroll:true});
}
function showDesktop() {
  if (desktopSnapshot) {
    desktopSnapshot.forEach((wasHidden,id) => {const win=openWindows.get(id);if(win)win.hidden=wasHidden;});desktopSnapshot=null;
  } else {
    desktopSnapshot=new Map([...openWindows].map(([id,win]) => [id,win.hidden]));
    openWindows.forEach(win => {win.hidden=true;});
  }
  toggleStart(false);closeContext();
}
contextMenu.addEventListener('click', e => {
  const action=e.target.closest('[data-context]')?.dataset.context;if(!action)return;
  closeContext(true);
  if(action==='open'&&contextTarget)openWindow(contextTarget.dataset.open);
  if(action==='projects'||action==='experience')openWindow(action);
  if(action==='desktop')showDesktop();
  if(action==='sort'){layoutIcons({reset:true,sort:true});announce('Simgeler ada göre sıralandı.');}
  if(action==='reset'){layoutIcons({reset:true});announce('Simge konumları sıfırlandı.');}
  if(action==='refresh'){layoutIcons();tick();announce('Masaüstü yenilendi.');}
  if(action==='reset-one'&&contextTarget){
    const target=contextTarget, stored=readPositions();delete stored[target.dataset.open];
    try{localStorage.setItem(positionKey(),JSON.stringify(stored));}catch{}
    layoutIcons();announce(`${target.innerText} varsayılan konumuna döndü.`);
  }
});
contextMenu.addEventListener('keydown', e => {
  const items=[...contextMenu.querySelectorAll('button')], index=items.indexOf(document.activeElement);
  if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)) {
    e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?items.length-1:(index+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;items[next].focus();
  }
  if(e.key==='Tab')closeContext();
});
desktop.addEventListener('contextmenu', e => {
  if(e.target.closest('.window'))return;
  e.preventDefault();showContext(e.clientX,e.clientY,e.target.closest('.desktop-icon'));
});
document.addEventListener('pointerdown', e => {
  if (!e.target.closest('#context-menu')) closeContext();
  if (!e.target.closest('.paper')) window.getSelection()?.removeAllRanges();
});
document.addEventListener('selectstart', e => {
  const element = e.target.nodeType === Node.ELEMENT_NODE ? e.target : e.target.parentElement;
  if (!element?.closest('.paper')) e.preventDefault();
});
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
    e.preventDefault();
    const paper = document.querySelector('.window.active[data-id="about"]:not([hidden]) .paper');
    const selection = window.getSelection();
    selection?.removeAllRanges();
    if (paper && selection) {
      const range = document.createRange(); range.selectNodeContents(paper); selection.addRange(range);
    }
  }
});
function toggleStart(state) { menu.hidden=state===undefined?!menu.hidden:!state;startButton.setAttribute('aria-expanded',String(!menu.hidden)); }
startButton.addEventListener('click', () => {closeContext();toggleStart();});
document.addEventListener('click', e => {
  const trigger=e.target.closest('[data-open]');
  if(trigger && !(trigger.classList.contains('desktop-icon') && performance.now()<(suppressOpenUntil.get(trigger)||0)))openWindow(trigger.dataset.open);
  if(!e.target.closest('#start-menu, #start-button'))toggleStart(false);
  if(e.target.closest('#desktop-icons') && !e.target.closest('.desktop-icon'))selectIcon(null);
  const back = e.target.closest('[data-portfolio-back]');
  if (back) showPortfolioView(back.closest('.window'));
  const step = e.target.closest('[data-project-step]');
  if (step) {
    const win = step.closest('.window');
    const index = projects.findIndex(p => p.id === Number(win.dataset.projectId));
    const next = projects[(index + Number(step.dataset.projectStep) + projects.length) % projects.length];
    showPortfolioView(win, next.id);
  }
});
document.querySelector('#reset-desktop').addEventListener('click', () => {
  [...openWindows.keys()].forEach(closeWindow);desktopSnapshot=null;layoutIcons({reset:true});openWindow('about');
});
document.querySelector('#show-desktop').addEventListener('click',showDesktop);
document.addEventListener('keydown', e => {
  if(e.key!=='Escape')return;
  if(!contextMenu.hidden){e.preventDefault();closeContext(true);return;}
  if(!menu.hidden){toggleStart(false);startButton.focus();return;}
  const top=[...openWindows.values()].filter(w=>!w.hidden).sort((a,b)=>Number(b.style.zIndex)-Number(a.style.zIndex))[0];
  if (top?.dataset.projectId) showPortfolioView(top);
  else if (top) closeWindow(top.dataset.id);
});
function tick() {
  const now=new Date();
  document.querySelector('#clock').textContent=new Intl.DateTimeFormat('tr-TR',{hour:'2-digit',minute:'2-digit'}).format(now);
  document.querySelector('#date').textContent=new Intl.DateTimeFormat('tr-TR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(now);
}
window.addEventListener('resize', () => {
  closeContext();layoutIcons();
  if(innerWidth<=760)return;
  openWindows.forEach(win => setWindowPosition(win,clamp(Number(win.dataset.x),0,desktop.clientWidth-win.offsetWidth),clamp(Number(win.dataset.y),-65,desktop.clientHeight-60)));
});
layoutIcons();tick();setInterval(tick,15000);openWindow('about');
