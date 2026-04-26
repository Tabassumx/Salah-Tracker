
/* ═══════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════ */
const AYAHS = [
  {ar:"إِنَّ مَعَ الْعُسْرِ يُسْرًا",tr:"Indeed, with hardship will be ease.",ref:"Quran 94:6"},
  {ar:"أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",tr:"Verily, in the remembrance of Allah do hearts find rest.",ref:"Quran 13:28"},
  {ar:"وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",tr:"And whoever fears Allah — He will make for him a way out.",ref:"Quran 65:2"},
  {ar:"وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",tr:"And seek help through patience and prayer.",ref:"Quran 2:45"},
  {ar:"إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",tr:"Indeed, Allah is with the patient.",ref:"Quran 2:153"},
  {ar:"وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",tr:"And He is with you wherever you are.",ref:"Quran 57:4"},
  {ar:"لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",tr:"Allah does not burden a soul beyond that it can bear.",ref:"Quran 2:286"},
  {ar:"وَأَقِمِ الصَّلَاةَ لِذِكْرِي",tr:"And establish prayer for My remembrance.",ref:"Quran 20:14"},
  {ar:"فَاذْكُرُونِي أَذْكُرْكُمْ",tr:"So remember Me; I will remember you.",ref:"Quran 2:152"},
  {ar:"إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",tr:"Indeed, Allah does not allow to be lost the reward of those who do good.",ref:"Quran 9:120"},
  {ar:"حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ",tr:"Maintain with care the prayers and the middle prayer.",ref:"Quran 2:238"},
  {ar:"وَبَشِّرِ الصَّابِرِينَ",tr:"And give good tidings to the patient.",ref:"Quran 2:155"},
  {ar:"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",tr:"Our Lord, give us good in this world and good in the Hereafter.",ref:"Quran 2:201"},
  {ar:"وَعَلَى اللَّهِ فَتَوَكَّلُوا إِن كُنتُم مُّؤْمِنِينَ",tr:"And upon Allah rely, if you are believers.",ref:"Quran 5:23"},
  {ar:"إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا",tr:"Indeed, prayer has been decreed upon the believers at specified times.",ref:"Quran 4:103"},
  {ar:"وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ",tr:"And do not despair of relief from Allah.",ref:"Quran 12:87"},
  {ar:"يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",tr:"O believers, seek help through patience and prayer.",ref:"Quran 2:153"},
  {ar:"وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ",tr:"And take provisions, for the best provision is fear of Allah.",ref:"Quran 2:197"},
  {ar:"إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ",tr:"Indeed, good deeds remove evil deeds.",ref:"Quran 11:114"},
  {ar:"وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ",tr:"Whatever good you put forward for yourselves — you will find it with Allah.",ref:"Quran 2:110"},
];

const FARD = [
  {id:'fajr',    name:'Fajr',    ar:'الفجر',  icon:'🌙', key:'Fajr'},
  {id:'dhuhr',   name:'Dhuhr',   ar:'الظهر',  icon:'☀️', key:'Dhuhr'},
  {id:'asr',     name:'Asr',     ar:'العصر',  icon:'🌤',  key:'Asr'},
  {id:'maghrib', name:'Maghrib', ar:'المغرب', icon:'🌅', key:'Maghrib'},
  {id:'isha',    name:'Isha',    ar:'العشاء',  icon:'🌃', key:'Isha'},
];

const EXTRA = [
  {id:'qiyam',    name:'Qiyam ul Layl', ar:'قيام الليل', icon:'⭐', note:'Voluntary night prayer'},
  {id:'tahajjud', name:'Tahajjud',      ar:'تهجد',        icon:'🌟', note:'Late night prayer'},
  {id:'duha',     name:'Duha',          ar:'صلاة الضحى',  icon:'🌄', note:'Mid-morning prayer'},
];


let S = {
  name:'', apiKey:'', lat:null, lon:null, city:'',
  pTimes:{}, manualTimes:{}, streakData:{}, todayKey:'',
};
let cdInterval = null;
let myChart = null;


function drawStars() {
  const c = document.getElementById('stars');
  c.width = innerWidth; c.height = innerHeight;
  const ctx = c.getContext('2d');
  for (let i = 0; i < 220; i++) {
    const x = Math.random()*c.width, y = Math.random()*c.height;
    const r = Math.random()*1.3, a = Math.random()*.65+.1;
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill();
  }
}
window.addEventListener('resize', drawStars);


window.onload = function() {
  drawStars();
  S.todayKey = dateKey(new Date());
  S.streakData = JSON.parse(localStorage.getItem('nur_streak')||'{}');
  S.manualTimes = JSON.parse(localStorage.getItem('nur_manual')||'{}');
  const saved = localStorage.getItem('nur_user');
  if (saved) {
    const u = JSON.parse(saved);
    S.name = u.name; S.apiKey = u.apiKey||'';
    document.getElementById('setup-overlay').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    loadApp();
  }
};



function startSetup() {
  const n = document.getElementById('in-name').value.trim();
  if (!n) { toast('Please enter your name 🌙'); return; }
  S.name = n; S.apiKey = document.getElementById('in-key').value.trim();
  localStorage.setItem('nur_user', JSON.stringify({name:S.name, apiKey:S.apiKey}));
  document.getElementById('setup-overlay').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  loadApp();
}

function resetApp() {
  if (!confirm('Reset all settings? Your streak data will be preserved.')) return;
  localStorage.removeItem('nur_user');
  location.reload();
}


function loadApp() {
  show('loading'); hide('main');
  navigator.geolocation.getCurrentPosition(
    async pos => {
      S.lat = pos.coords.latitude; S.lon = pos.coords.longitude;
      if (S.apiKey) S.city = await getCityName();
      else S.city = `${S.lat.toFixed(2)}°N, ${S.lon.toFixed(2)}°E`;
      await fetchPrayerTimes();
      renderAll();
    },
    () => {
      // fallback: Mecca
      S.lat=21.4225; S.lon=39.8262; S.city='Mecca (location unavailable)';
      fetchPrayerTimes().then(renderAll);
    },
    {timeout:10000}
  );
}


async function getCityName() {
  try {
    const r = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${S.lat}&lon=${S.lon}&limit=1&appid=${S.apiKey}`);
    const d = await r.json();
    if (d && d[0]) return `${d[0].name}, ${d[0].country}`;
  } catch(e) {}
  return `${S.lat.toFixed(2)}, ${S.lon.toFixed(2)}`;
}

async function fetchPrayerTimes() {
  try {
    const now = new Date();
    const url = `https://api.aladhan.com/v1/timings/${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}?latitude=${S.lat}&longitude=${S.lon}&method=3`;
    const r = await fetch(url);
    const d = await r.json();
    if (d.code === 200) {
      const t = d.data.timings;
      S.pTimes = {Fajr:t.Fajr, Dhuhr:t.Dhuhr, Asr:t.Asr, Maghrib:t.Maghrib, Isha:t.Isha};
    }
  } catch(e) { console.error('Prayer times fetch failed:', e); }
}


function renderAll() {
  hide('loading'); show('main');
  renderHeader(); renderAyah();
  renderFard(); renderExtra();
  renderManualInputs();
  startCountdown(); renderChart(); updateBadges();
}


function renderHeader() {
  const now = new Date();
  document.getElementById('hdr-date').textContent =
    now.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const h = now.getHours();
  const greet = h<5?'Good Night':h<12?'Good Morning':h<17?'Good Afternoon':'Good Evening';
  document.getElementById('hdr-greet').textContent = `${greet}, ${S.name} ✨`;
  document.getElementById('hdr-loc').textContent = S.city;
}


function renderAyah() {
  const a = AYAHS[Math.floor(Math.random()*AYAHS.length)];
  const set = (id,txt) => { const e=document.getElementById(id); if(e) e.textContent=txt; };
  set('ay-ar', a.ar);
  set('ay-tr', `"${a.tr}"`);
  set('ay-ref', `— ${a.ref}`);
}


function effectiveTimes() {
  const t = {};
  FARD.forEach(p => { t[p.id] = S.manualTimes[p.id] || S.pTimes[p.key] || '00:00'; });
  return t;
}

function nextPrayer() {
  const times = effectiveTimes();
  const now = new Date();
  const nowM = now.getHours()*60 + now.getMinutes();
  for (const p of FARD) {
    const t = times[p.id];
    if (!t) continue;
    const [hh,mm] = t.split(':').map(Number);
    if (hh*60+mm > nowM) return {p, t};
  }
  // wrap to Fajr next day
  const ft = times['fajr'];
  return ft ? {p:FARD[0], t:ft, tomorrow:true} : null;
}


function startCountdown() {
  if (cdInterval) clearInterval(cdInterval);
  tickCountdown();
  cdInterval = setInterval(tickCountdown, 1000);
}
function tickCountdown() {
  const nx = nextPrayer();
  if (!nx) return;
  const {p, t, tomorrow} = nx;
  document.getElementById('cd-name').textContent = `${p.icon} ${p.name} — ${p.ar}`;
  document.getElementById('cd-at').textContent = `at ${fmt12(t)}`;
  const now = new Date();
  const [hh,mm] = t.split(':').map(Number);
  let target = new Date(now);
  target.setHours(hh,mm,0,0);
  if (target<=now || tomorrow) target.setDate(target.getDate()+1);
  const diff = Math.max(0,target-now);
  const hrs = Math.floor(diff/3600000);
  const mins = Math.floor((diff%3600000)/60000);
  const secs = Math.floor((diff%60000)/1000);
  document.getElementById('ct-h').textContent = String(hrs).padStart(2,'0');
  document.getElementById('ct-m').textContent = String(mins).padStart(2,'0');
  document.getElementById('ct-s').textContent = String(secs).padStart(2,'0');
  // highlight next card
  FARD.forEach(pr => {
    const el = document.getElementById('pc-'+pr.id);
    if (!el) return;
    el.classList.toggle('next', pr.id===p.id && !el.classList.contains('done'));
  });
}

function makeCard(p, timeStr, done, extra=false) {
  const d = document.createElement('div');
  d.className = `card pcard${done?' done':''}${extra?' extra':''}`;
  d.id = 'pc-'+p.id;
  d.onclick = () => togglePrayer(p.id);
  const displayTime = extra ? `<div class="pcard-time" style="font-size:.82rem;color:var(--muted);font-weight:400">${p.note}</div>` :
    `<div class="pcard-time">${fmt12(timeStr)}</div>`;
  d.innerHTML = `
    <div class="pcard-check">${done?'✓':''}</div>
    <div class="pcard-icon">${p.icon}</div>
    <div class="pcard-name">${p.name}</div>
    <div class="pcard-arabic">${p.ar}</div>
    ${displayTime}
    <div class="pcard-status">${done?'Completed ✓':'Tap to mark'}</div>
  `;
  return d;
}

function renderFard() {
  const times = effectiveTimes();
  const today = S.streakData[S.todayKey]||{};
  const grid = document.getElementById('fard-grid');
  grid.innerHTML = '';
  FARD.forEach(p => grid.appendChild(makeCard(p, times[p.id], !!today[p.id])));
}

function renderExtra() {
  const today = S.streakData[S.todayKey]||{};
  const grid = document.getElementById('extra-grid');
  grid.innerHTML = '';
  EXTRA.forEach(p => grid.appendChild(makeCard(p, null, !!today[p.id], true)));
}

function togglePrayer(id) {
  if (!S.streakData[S.todayKey]) S.streakData[S.todayKey] = {};
  S.streakData[S.todayKey][id] = !S.streakData[S.todayKey][id];
  localStorage.setItem('nur_streak', JSON.stringify(S.streakData));
  const el = document.getElementById('pc-'+id);
  if (el) {
    const done = S.streakData[S.todayKey][id];
    el.classList.toggle('done', done);
    el.classList.toggle('next', false);
    el.querySelector('.pcard-check').textContent = done?'✓':'';
    el.querySelector('.pcard-status').textContent = done?'Completed ✓':'Tap to mark';
    if (done) toast(`${id.charAt(0).toUpperCase()+id.slice(1)} marked — MashaAllah! 🤲`);
  }
  updateBadges();
  renderChart();
}


function updateBadges() {
  const today = S.streakData[S.todayKey]||{};
  const doneToday = FARD.filter(p=>today[p.id]).length;
  document.getElementById('b-today').textContent = `${doneToday}/5`;
  document.getElementById('b-streak').textContent = currentStreak();
  document.getElementById('b-best').textContent = bestStreak();
  document.getElementById('b-total').textContent = totalPrayers();
}

function currentStreak() {
  let s=0, d=new Date();
  while(true){
    const k=dateKey(d), data=S.streakData[k]||{};
    if(!FARD.every(p=>data[p.id])) break;
    s++; d.setDate(d.getDate()-1);
  }
  return s;
}
function bestStreak() {
  let best=0,cur=0,prev=null;
  Object.keys(S.streakData).sort().forEach(k=>{
    const data=S.streakData[k];
    const all=FARD.every(p=>data[p.id]);
    if (all) {
      if (prev) {
        const p=new Date(prev); p.setDate(p.getDate()+1);
        cur = dateKey(p)===k ? cur+1 : 1;
      } else cur=1;
      best=Math.max(best,cur); prev=k;
    } else { cur=0; prev=null; }
  });
  return best;
}
function totalPrayers() {
  let n=0;
  Object.values(S.streakData).forEach(day=>{
    FARD.forEach(p=>{if(day[p.id])n++;});
  });
  return n;
}


function renderManualInputs() {
  const g = document.getElementById('manual-grid');
  g.innerHTML = '';
  FARD.forEach(p=>{
    const div=document.createElement('div');
    div.className='mi';
    div.innerHTML=`<label>${p.icon} ${p.name}</label><input type="time" id="mt-${p.id}" value="${S.manualTimes[p.id]||''}" />`;
    g.appendChild(div);
  });
}
function toggleManual() {
  document.getElementById('manual-inner').classList.toggle('open');
}
function saveManual() {
  FARD.forEach(p=>{
    const v = document.getElementById('mt-'+p.id)?.value;
    if(v) S.manualTimes[p.id]=v;
  });
  localStorage.setItem('nur_manual',JSON.stringify(S.manualTimes));
  renderFard(); startCountdown();
  document.getElementById('manual-inner').classList.remove('open');
  toast('Prayer times saved ✓');
}
function clearManual() {
  S.manualTimes={};
  localStorage.removeItem('nur_manual');
  renderManualInputs(); renderFard(); startCountdown();
  document.getElementById('manual-inner').classList.remove('open');
  toast('Using auto-calculated times');
}


function renderChart() {
  const labels=[], fardD=[], extraD=[];
  for(let i=6;i>=0;i--){
    const d=new Date(); d.setDate(d.getDate()-i);
    const k=dateKey(d), data=S.streakData[k]||{};
    labels.push(i===0?'Today':d.toLocaleDateString('en',{weekday:'short'}));
    fardD.push(FARD.filter(p=>data[p.id]).length);
    extraD.push(EXTRA.filter(p=>data[p.id]).length);
  }
  const ctx = document.getElementById('streak-chart').getContext('2d');
  if(myChart) myChart.destroy();
  myChart = new Chart(ctx,{
    type:'bar',
    data:{
      labels,
      datasets:[
        {label:'Fard',data:fardD,backgroundColor:'rgba(201,168,76,0.7)',borderColor:'#c9a84c',borderWidth:1,borderRadius:6,borderSkipped:false},
        {label:'Extra',data:extraD,backgroundColor:'rgba(150,110,210,0.45)',borderColor:'rgba(150,110,210,0.8)',borderWidth:1,borderRadius:6,borderSkipped:false},
      ]
    },
    options:{
      responsive:true,
      plugins:{
        legend:{labels:{color:'#7a8fb8',font:{family:'Outfit',size:12}}},
        tooltip:{backgroundColor:'#0c1230',borderColor:'#c9a84c',borderWidth:1,titleColor:'#e8cf82',bodyColor:'#f5e9ca',padding:10}
      },
      scales:{
        x:{grid:{color:'rgba(201,168,76,0.07)'},ticks:{color:'#7a8fb8',font:{family:'Outfit'}}},
        y:{min:0,max:5,grid:{color:'rgba(201,168,76,0.07)'},ticks:{color:'#7a8fb8',stepSize:1,font:{family:'Outfit'}}}
      }
    }
  });
}

function fmt12(t) {
  if(!t||t==='—'||t==='00:00') return '—';
  const [h,m]=t.split(':').map(Number);
  const ap=h>=12?'PM':'AM', h12=h%12||12;
  return `${h12}:${String(m).padStart(2,'0')} ${ap}`;
}
function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function show(id){document.getElementById(id)?.classList.remove('hidden')}
function hide(id){document.getElementById(id)?.classList.add('hidden')}

let toastT;
function toast(msg) {
  const el=document.getElementById('toast');
  el.textContent=msg; el.classList.add('show');
  clearTimeout(toastT);
  toastT=setTimeout(()=>el.classList.remove('show'),2800);
}


document.addEventListener('keydown',e=>{
  if(e.key==='Enter' && !document.getElementById('setup-overlay').classList.contains('hidden'))
    startSetup();
});