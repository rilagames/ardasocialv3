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
const desktop = document.querySelector('#desktop');
const windowHost = document.querySelector('#windows');
const openWindows = new Map();
let topLayer = 10;
const menu = document.querySelector('#start-menu');
const startButton = document.querySelector('#start-button');
const titles = {about:'Hakkımda.docx — Word',projects:'Seçilmiş işler — Dosya Gezgini',notes:'Not defterim.txt — Not Defteri',skills:'Neler yaparım.xlsx — Excel'};
const badge = {about:'W',projects:'▰',notes:'≡',skills:'X'};

document.querySelector('#project-desktop').innerHTML = projects.map((p,i)=>`<button class="desktop-icon project-icon" data-open="project-${p.id}" style="--i:${i}"><img src="./assets/project-${p.id}.webp" alt="" width="61" height="66"><span>${p.title}</span></button>`).join('');

function aboutContent(){return `<div class="ribbon-tabs" aria-label="Belge görünümü"><span>Dosya</span><span class="selected">Giriş</span><span>Ekle</span><span>Düzen</span><span>Görünüm</span></div><div class="ribbon-tools" aria-hidden="true"><div class="tool-group"><span class="font-select">Georgia ⌄</span><span>12 ⌄</span></div><div class="tool-group"><b>B</b><i>I</i><u>U</u></div><span class="heading-style">AaBbCc</span><span>¶</span></div><div class="document-scroll"><article class="paper"><div class="eyebrow">MERHABA, BEN ARDA.</div><h1>Bir fikir.<br>Birkaç kelime.<br><em>Bir sürü ihtimal.</em></h1><p class="lead">Markalar için fikirler buluyor, kelimeleri bir araya getiriyor, sosyal medyada anlatılmaya değer hikâyeler kuruyorum.</p><p class="lead">Burası benim yaratıcı masaüstüm. Dosyaların arasında biraz metin, biraz strateji ve bolca fikir var.</p><div class="paper-rule"></div><div class="doc-bottom"><div class="signature">Arda Öztiryaki<small>Sosyal medya uzmanı & metin yazarı</small></div><button class="doc-cta" data-open="projects">İşlerime göz at <span>↗</span></button></div></article></div><div class="statusbar"><span>Sayfa 1 / 1 &nbsp; · &nbsp; Türkçe</span><span>Bir fikrin ilk taslağı. &nbsp; − ━━━ + &nbsp; %100</span></div>`}
function contentFor(id){
  if(id==='about')return aboutContent();
  if(id==='projects')return `<div class="window-body"><h2>Seçilmiş işler</h2><p class="section-desc">Farklı markalar, farklı sesler. Aynı merak.<br>Bir çalışmaya tıklayarak yakından inceleyebilirsin.</p><div class="project-grid">${projects.map(p=>`<button class="project-card" data-open="project-${p.id}"><img src="./assets/project-${p.id}.webp" alt="${p.title} — ${p.brand}" loading="lazy"><strong>${p.title}</strong><small>${p.brand}</small></button>`).join('')}</div></div><div class="statusbar"><span>${projects.length} öğe</span><span>Portfolyodan seçkiler</span></div>`;
  if(id==='notes')return `<article class="window-body notepad"><small>NOT DEFTERİ / 001</small><h2>Önce bir cümle.</h2><p class="section-desc">Bazen bir başlık, bazen bir kampanyanın çıkış noktası.<br>Bu masaüstü için yazılmış birkaç küçük not.</p><blockquote>Kaydırıp geçilen değil,<br>durup bakılan fikirler.</blockquote><blockquote>Her markanın bir sesi var.<br>Mesele, doğru kelimeleri bulmak.</blockquote><blockquote>İyi bir hikâye,<br>doğru bir soruyla başlar.</blockquote><small>ARDA’NIN NOTLARI · DEVAM EDECEK.</small></article>`;
  if(id==='skills')return `<div class="window-body"><h2>Fikirden yayına.</h2><p class="section-desc">Bir içeriğin yalnızca ne söylediği değil, ne zaman ve nasıl söylediği de önemli.</p><div class="skill-list">${[['Sosyal medya iletişimi','Markanın sesine uygun içerik fikirleri ve sosyal medya anlatıları.'],['Metin yazarlığı','Başlıklar, post metinleri, sloganlar ve kampanya fikirleri.'],['İçerik planlama','Birbiriyle konuşan içerikler ve tutarlı bir yayın akışı.'],['Yaratıcı konsept','Marka, mecra ve hedef kitleyi bir araya getiren çıkış noktaları.']].map(([a,b],i)=>`<div class="skill-row"><span>0${i+1}</span><div><h3>${a}</h3><p>${b}</p></div></div>`).join('')}</div></div>`;
  const p=projects.find(p=>id===`project-${p.id}`);
  return `<div class="window-body project-view"><img src="./assets/project-${p.id}.webp" alt="${p.brand}: ${p.title}"><div class="project-description"><small>${p.kind}</small><h2>${p.title}</h2><p>${p.description}</p><button class="doc-cta" data-open="projects">← Tüm işlere dön</button></div></div>`;
}
function updateTaskbar(id){document.querySelectorAll('.taskbar [data-open]').forEach(b=>{b.classList.toggle('running',openWindows.has(b.dataset.open));b.classList.toggle('current',b.dataset.open===id)})}
function focusWindow(win){win.style.zIndex=++topLayer;openWindows.forEach(w=>w.classList.toggle('active',w===win));updateTaskbar(win.dataset.id)}
function closeWindow(id){const win=openWindows.get(id);if(!win)return;win.remove();openWindows.delete(id);const remaining=[...openWindows.values()].filter(w=>!w.hidden).sort((a,b)=>Number(b.style.zIndex)-Number(a.style.zIndex));if(remaining[0])focusWindow(remaining[0]);else updateTaskbar(null)}
function openWindow(id){
  if(!titles[id]&&!projects.some(p=>id===`project-${p.id}`))return;
  toggleStart(false);
  if(openWindows.has(id)){const win=openWindows.get(id);win.hidden=false;focusWindow(win);win.querySelector('.close').focus({preventScroll:true});return}
  const p=projects.find(p=>id===`project-${p.id}`);
  const title=titles[id]||`${p.title} — ${p.brand}`;
  const win=document.createElement('section');win.className='window';win.dataset.id=id;win.setAttribute('role','dialog');win.setAttribute('aria-label',title);
  const offset=openWindows.size%5*22;
  const width=innerWidth>1600?760:innerWidth<=1000?590:690;
  const initialX=Math.max(0,Math.min(desktop.clientWidth-width,innerWidth>1100?145:35));
  win.style.transform=`translate(${Math.min(initialX+offset,Math.max(0,desktop.clientWidth-width))}px,${offset}px)`;
  win.dataset.x=Math.min(initialX+offset,Math.max(0,desktop.clientWidth-width));win.dataset.y=offset;
  win.innerHTML=`<div class="titlebar"><div class="title-label"><span class="mini-word">${badge[id]||'▧'}</span><span>${title}</span></div><div class="window-actions"><button data-action="minimize" aria-label="Küçült">−</button><button data-action="maximize" aria-label="Büyüt" aria-pressed="false">□</button><button data-action="close" class="close" aria-label="Kapat">×</button></div></div>${contentFor(id)}`;
  windowHost.append(win);openWindows.set(id,win);focusWindow(win);
  win.addEventListener('pointerdown',()=>focusWindow(win));
  win.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{
    if(b.dataset.action==='close')closeWindow(id);
    if(b.dataset.action==='minimize'){win.hidden=true;updateTaskbar(null);startButton.focus()}
    if(b.dataset.action==='maximize'){const max=win.classList.toggle('maximized');b.setAttribute('aria-pressed',max);b.setAttribute('aria-label',max?'Önceki boyut':'Büyüt')}
  }));
  const bar=win.querySelector('.titlebar');
  bar.addEventListener('dblclick',e=>{if(!e.target.closest('button'))win.querySelector('[data-action="maximize"]').click()});
  bar.addEventListener('pointerdown',e=>{
    if(e.target.closest('button')||win.classList.contains('maximized')||innerWidth<=760)return;
    const startX=e.clientX,startY=e.clientY,x=Number(win.dataset.x),y=Number(win.dataset.y);bar.setPointerCapture(e.pointerId);
    const move=e=>{const nx=Math.max(0,Math.min(desktop.clientWidth-win.offsetWidth,x+e.clientX-startX));const ny=Math.max(-50,Math.min(desktop.clientHeight-60,y+e.clientY-startY));win.dataset.x=nx;win.dataset.y=ny;win.style.transform=`translate(${nx}px,${ny}px)`};
    const stop=()=>{bar.removeEventListener('pointermove',move);bar.removeEventListener('pointerup',stop);bar.removeEventListener('pointercancel',stop)};
    bar.addEventListener('pointermove',move);bar.addEventListener('pointerup',stop);bar.addEventListener('pointercancel',stop);
  });
  win.querySelector('.close').focus({preventScroll:true});
}
function toggleStart(state){menu.hidden=state===undefined?!menu.hidden:!state;startButton.setAttribute('aria-expanded',String(!menu.hidden))}
document.addEventListener('click',e=>{const open=e.target.closest('[data-open]');if(open)openWindow(open.dataset.open);if(!e.target.closest('#start-menu, #start-button'))toggleStart(false)});
startButton.addEventListener('click',()=>toggleStart());
document.querySelector('#reset-desktop').addEventListener('click',()=>{[...openWindows.keys()].forEach(closeWindow);openWindow('about')});
let desktopHidden=false;
document.querySelector('#show-desktop').addEventListener('click',()=>{desktopHidden=!desktopHidden;openWindows.forEach(w=>{if(desktopHidden){w.dataset.wasHidden=String(w.hidden);w.hidden=true}else w.hidden=w.dataset.wasHidden==='true'});toggleStart(false);updateTaskbar(null)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!menu.hidden){toggleStart(false);startButton.focus();return}const top=[...openWindows.values()].filter(w=>!w.hidden).sort((a,b)=>Number(b.style.zIndex)-Number(a.style.zIndex))[0];if(top){closeWindow(top.dataset.id);startButton.focus()}}});
function tick(){const now=new Date();document.querySelector('#clock').textContent=new Intl.DateTimeFormat('tr-TR',{hour:'2-digit',minute:'2-digit'}).format(now);document.querySelector('#date').textContent=new Intl.DateTimeFormat('tr-TR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(now)}
tick();setInterval(tick,15000);openWindow('about');
window.addEventListener('resize',()=>{if(innerWidth<=760)return;openWindows.forEach(win=>{const x=Math.max(0,Math.min(Number(win.dataset.x),desktop.clientWidth-win.offsetWidth));const y=Math.max(-50,Math.min(Number(win.dataset.y),desktop.clientHeight-60));win.dataset.x=x;win.dataset.y=y;win.style.transform=`translate(${x}px,${y}px)`})});
