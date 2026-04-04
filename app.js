// ═══════════════════════════════════════════════════
// JI TABLE — all ratios from A4
// Used for CHORDS mode only.
// ═══════════════════════════════════════════════════
const JI = {
  'C3':1/5, 'D3':1/3, 'E3':3/8, 'F3':4/15, 'G3':4/9,
  'A3':1/2, 'Bb3':8/15, 'B3':9/16,
  'C4':3/5, 'C#4':5/8, 'D4':2/3, 'Eb4':16/25, 'E4':3/4,
  'F4':4/5, 'F#4':5/6, 'G4':8/9, 'G#4':15/16,
  'A4':1,   'Bb4':16/15,'B4':9/8,
  'C5':6/5, 'C#5':5/4, 'D5':4/3, 'Eb5':32/25,'E5':3/2,
  'F5':8/5, 'F#5':5/3, 'G5':16/9,'G#5':15/8,
  'A5':2,   'B5':9/4,  'C#6':5/2,'D6':8/3,   'E6':3,
};
JI['F3'] = 2/5;
JI['C3'] = 4/15;
JI['D#5'] = 32/25;
JI['Ab3'] = 15/32;
JI['Ab4'] = 15/16;
JI['C6']  = 12/5;
JI['D#6'] = 64/25;

function hz(note, baseA) {
  const r = JI[note];
  if (r == null) { console.warn('No JI for', note); return baseA; }
  return baseA * r;
}

// ═══════════════════════════════════════════════════
// CHORD LIBRARY
// ═══════════════════════════════════════════════════
const CHORDS = [
  {name:'D major',  inv:'Root',    notes:['D4','F#4','A4'],       test:'F#4', type:'Major 3rd'},
  {name:'D major',  inv:'Root',    notes:['D4','F#4','A4'],       test:'A4',  type:'Perfect 5th'},
  {name:'D major',  inv:'1st inv', notes:['F#4','A4','D5'],       test:'D5',  type:'Perfect 4th'},
  {name:'D major',  inv:'1st inv', notes:['F#4','A4','D5'],       test:'A4',  type:'Minor 3rd'},
  {name:'D major',  inv:'2nd inv', notes:['A3','D4','F#4'],       test:'F#4', type:'Major 3rd'},
  {name:'A major',  inv:'Root',    notes:['A3','C#4','E4'],       test:'C#4', type:'Major 3rd'},
  {name:'A major',  inv:'Root',    notes:['A3','C#4','E4'],       test:'E4',  type:'Perfect 5th'},
  {name:'A major',  inv:'1st inv', notes:['C#4','E4','A4'],       test:'A4',  type:'Perfect 4th'},
  {name:'A major',  inv:'2nd inv', notes:['E4','A4','C#5'],       test:'C#5', type:'Major 3rd'},
  {name:'G major',  inv:'Root',    notes:['G4','B4','D5'],        test:'B4',  type:'Major 3rd'},
  {name:'G major',  inv:'1st inv', notes:['B3','D4','G4'],        test:'D4',  type:'Minor 3rd'},
  {name:'G major',  inv:'2nd inv', notes:['D4','G4','B4'],        test:'G4',  type:'Perfect 4th'},
  {name:'E minor',  inv:'Root',    notes:['E4','G4','B4'],        test:'G4',  type:'Minor 3rd'},
  {name:'E minor',  inv:'Root',    notes:['E4','G4','B4'],        test:'B4',  type:'Perfect 5th'},
  {name:'E minor',  inv:'1st inv', notes:['G4','B4','E5'],        test:'E5',  type:'Perfect 4th'},
  {name:'B minor',  inv:'Root',    notes:['B3','D4','F#4'],       test:'D4',  type:'Minor 3rd'},
  {name:'B minor',  inv:'Root',    notes:['B3','D4','F#4'],       test:'F#4', type:'Perfect 5th'},
  {name:'B minor',  inv:'1st inv', notes:['D4','F#4','B4'],       test:'B4',  type:'Perfect 4th'},
  {name:'F♯ minor', inv:'Root',    notes:['F#4','A4','C#5'],      test:'A4',  type:'Minor 3rd'},
  {name:'D⁷',       inv:'Root',    notes:['D4','F#4','A4','C5'],  test:'C5',  type:'Minor 7th'},
  {name:'D⁷',       inv:'1st inv', notes:['F#4','A4','C5','D5'],  test:'A4',  type:'Major 3rd'},
  {name:'D⁷',       inv:'3rd inv', notes:['C4','D4','F#4','A4'],  test:'F#4', type:'Aug 4th'},
  {name:'A⁷',       inv:'Root',    notes:['A3','C#4','E4','G4'],  test:'G4',  type:'Minor 7th'},
  {name:'A⁷',       inv:'1st inv', notes:['C#4','E4','G4','A4'],  test:'C#4', type:'Major 3rd'},
  {name:'E⁷',       inv:'Root',    notes:['E4','G#4','B4','D5'],  test:'G#4', type:'Major 3rd'},
  {name:'Bm⁷',      inv:'Root',    notes:['B3','D4','F#4','A4'],  test:'A4',  type:'Minor 7th'},
  {name:'Dmaj⁷',    inv:'Root',    notes:['D4','F#4','A4','C#5'], test:'C#5', type:'Major 7th'},
  {name:'Em⁷',      inv:'Root',    notes:['E4','G4','B4','D5'],   test:'D5',  type:'Minor 7th'},
  {name:'C♯dim⁷',   inv:'Root',    notes:['C#4','E4','G4','Bb4'], test:'G4',  type:'Diminished 5th'},
  {name:'Asus4',    inv:'Root',    notes:['A3','D4','E4'],        test:'D4',  type:'Perfect 4th'},
  {name:'Dsus4',    inv:'Root',    notes:['D4','G4','A4'],        test:'G4',  type:'Perfect 4th'},
  {name:'D pedal',  inv:'Drone',   notes:['D3','A3','D4'],        test:'A3',  type:'Perfect 5th'},
  {name:'A pedal',  inv:'Drone',   notes:['A3','E4','A4'],        test:'E4',  type:'Perfect 5th'},
  {name:'D–A drone',inv:'Drone',   notes:['D3','A3','D4','A4'],   test:'A4',  type:'Octave'},
];

// ═══════════════════════════════════════════════════
// COMPREHENSIVE INTERVAL LIBRARY
// Drone = open string roots (G3, D4, A4, E5)
// All 12 chromatic intervals, multiple drone roots each
// id = unique string for localStorage persistence
// ═══════════════════════════════════════════════════
const INTERVALS = [
  // ── MINOR 2nd (16:15) — 112¢, 12¢ above ET ──────
  {id:'m2_G', drone:'G3', test:'Ab3', name:'G',  interval:'Minor 2nd',  group:'Seconds',
   note:'Minor 2nd — 16:15. Needs to feel tight and close. 12¢ above ET.'},
  {id:'m2_D', drone:'D4', test:'Eb4', name:'D',  interval:'Minor 2nd',  group:'Seconds',
   note:'Minor 2nd above D — the semitone. 16:15. Slightly higher than ET.'},
  {id:'m2_A', drone:'A4', test:'Bb4', name:'A',  interval:'Minor 2nd',  group:'Seconds',
   note:'Bb above A — 16:15. Tight, slightly higher than ET.'},
  {id:'m2_E', drone:'E5', test:'F5',  name:'E',  interval:'Minor 2nd',  group:'Seconds',
   note:'F above E — 16:15. 12¢ above ET.'},

  // ── MAJOR 2nd (9:8) — 204¢, 4¢ above ET ─────────
  {id:'M2_G', drone:'G3', test:'A3',  name:'G',  interval:'Major 2nd',  group:'Seconds',
   note:'Major 2nd — 9:8. Needs to feel open and high. 4¢ above ET.'},
  {id:'M2_D', drone:'D4', test:'E4',  name:'D',  interval:'Major 2nd',  group:'Seconds',
   note:'E above D — 9:8 whole tone. High and clear.'},
  {id:'M2_A', drone:'A4', test:'B4',  name:'A',  interval:'Major 2nd',  group:'Seconds',
   note:'B above A — pure 9:8. Should feel bright.'},
  {id:'M2_E', drone:'E5', test:'F#5', name:'E',  interval:'Major 2nd',  group:'Seconds',
   note:'F# above E — 9:8. 4¢ sharper than ET.'},

  // ── MINOR 3rd (6:5) — 316¢, 16¢ above ET ────────
  {id:'m3_G', drone:'G3', test:'Bb3', name:'G',  interval:'Minor 3rd',  group:'Thirds',
   note:'Minor 3rd — 6:5. Must be noticeably high vs ET. Dark and pure.'},
  {id:'m3_D', drone:'D4', test:'F4',  name:'D',  interval:'Minor 3rd',  group:'Thirds',
   note:'F above D — 6:5. 16¢ above ET. Let it rise.'},
  {id:'m3_A', drone:'A4', test:'C5',  name:'A',  interval:'Minor 3rd',  group:'Thirds',
   note:'C above A — 6:5. Sits 16¢ above ET — the sharpest common JI interval.'},
  {id:'m3_E', drone:'E5', test:'G5',  name:'E',  interval:'Minor 3rd',  group:'Thirds',
   note:'G above E — 6:5. Warm and pure. 16¢ above ET.'},

  // ── MAJOR 3rd (5:4) — 386¢, 14¢ below ET ────────
  {id:'M3_G', drone:'G3', test:'B3',  name:'G',  interval:'Major 3rd',  group:'Thirds',
   note:'Major 3rd — 5:4. 14¢ below ET. Violinists habitually play this sharp.'},
  {id:'M3_D', drone:'D4', test:'F#4', name:'D',  interval:'Major 3rd',  group:'Thirds',
   note:'F# above D — 5:4. The most commonly mistuned interval. Let it fall.'},
  {id:'M3_A', drone:'A4', test:'C#5', name:'A',  interval:'Major 3rd',  group:'Thirds',
   note:'C# above A — pure 5:4. Should lock with no beating.'},
  {id:'M3_E', drone:'E5', test:'G#5', name:'E',  interval:'Major 3rd',  group:'Thirds',
   note:'G# above E — 5:4. Low and rich against the open E.'},

  // ── PERFECT 4th (4:3) — 498¢, 2¢ below ET ───────
  {id:'P4_G', drone:'G3', test:'C4',  name:'G',  interval:'Perfect 4th', group:'4ths & 5ths',
   note:'Perfect 4th — 4:3. Rings cleanly. Very close to ET (2¢ below).'},
  {id:'P4_D', drone:'D4', test:'G4',  name:'D',  interval:'Perfect 4th', group:'4ths & 5ths',
   note:'G above D — 4:3. Both open strings — should ring with zero effort.'},
  {id:'P4_A', drone:'A4', test:'D5',  name:'A',  interval:'Perfect 4th', group:'4ths & 5ths',
   note:'D above A — 4:3. Two open strings ringing.'},
  {id:'P4_E', drone:'E5', test:'A5',  name:'E',  interval:'Perfect 4th', group:'4ths & 5ths',
   note:'A above E — pure 4th. Should lock cleanly.'},

  // ── AUGMENTED 4th (45:32) — 590¢, 10¢ above ET ──────
  {id:'A4_D', drone:'D4', test:'G#4', name:'D',  interval:'Aug 4th',    group:'4ths & 5ths',
   note:'Augmented 4th — 45:32. Tense and unstable. Wants to resolve. 10¢ above ET.'},
  {id:'A4_A', drone:'A4', test:'D#5', name:'A',  interval:'Aug 4th',    group:'4ths & 5ths',
   note:'Tritone above A — 45:32. The most dissonant interval. 10¢ above ET.'},

  // ── PERFECT 5th (3:2) — 702¢, 2¢ above ET ───────
  {id:'P5_G', drone:'G3', test:'D4',  name:'G',  interval:'Perfect 5th', group:'4ths & 5ths',
   note:'Perfect 5th — 3:2. The strongest interval. Should ring resonantly.'},
  {id:'P5_D', drone:'D4', test:'A4',  name:'D',  interval:'Perfect 5th', group:'4ths & 5ths',
   note:'A above D — open strings. Lock it with zero beats. 3:2.'},
  {id:'P5_A', drone:'A4', test:'E5',  name:'A',  interval:'Perfect 5th', group:'4ths & 5ths',
   note:'E above A — 3:2. Open string check. Should ring freely.'},
  {id:'P5_E', drone:'E5', test:'B5',  name:'E',  interval:'Perfect 5th', group:'4ths & 5ths',
   note:'B above E — 3:2. 2¢ sharper than ET.'},

  // ── MINOR 6th (8:5) — 814¢, 14¢ above ET ────────
  {id:'m6_G', drone:'G3', test:'Eb4', name:'G',  interval:'Minor 6th',  group:'6ths & 7ths',
   note:'Minor 6th — 8:5. 14¢ above ET. Warm and dark.'},
  {id:'m6_D', drone:'D4', test:'Bb4', name:'D',  interval:'Minor 6th',  group:'6ths & 7ths',
   note:'Bb above D — 8:5. Needs to feel slightly high vs ET.'},
  {id:'m6_A', drone:'A4', test:'F5',  name:'A',  interval:'Minor 6th',  group:'6ths & 7ths',
   note:'F above A — 8:5. The minor 6th sits above ET.'},
  {id:'m6_E', drone:'E5', test:'C6',  name:'E',  interval:'Minor 6th',  group:'6ths & 7ths',
   note:'C above E — 8:5. High and resonant.'},

  // ── MAJOR 6th (5:3) — 884¢, 16¢ below ET ────────
  {id:'M6_G', drone:'G3', test:'E4',  name:'G',  interval:'Major 6th',  group:'6ths & 7ths',
   note:'Major 6th — 5:3. 16¢ below ET. Often played sharp — let it fall.'},
  {id:'M6_D', drone:'D4', test:'B4',  name:'D',  interval:'Major 6th',  group:'6ths & 7ths',
   note:'B above D — 5:3. Pure major 6th, noticeably lower than ET.'},
  {id:'M6_A', drone:'A4', test:'F#5', name:'A',  interval:'Major 6th',  group:'6ths & 7ths',
   note:'F# above A — 5:3. Low and open. 16¢ below ET.'},
  {id:'M6_E', drone:'E5', test:'C#6', name:'E',  interval:'Major 6th',  group:'6ths & 7ths',
   note:'C# above E — 5:3. Pure 6th.'},

  // ── MINOR 7th (16:9) — 996¢, 4¢ below ET ────────
  {id:'m7_G', drone:'G3', test:'F4',  name:'G',  interval:'Minor 7th',  group:'6ths & 7ths',
   note:'Minor 7th — 16:9. Slightly below ET. Needs to feel unresolved.'},
  {id:'m7_D', drone:'D4', test:'C5',  name:'D',  interval:'Minor 7th',  group:'6ths & 7ths',
   note:'C above D — 16:9. The minor 7th. Pull it toward resolution.'},
  {id:'m7_A', drone:'A4', test:'G5',  name:'A',  interval:'Minor 7th',  group:'6ths & 7ths',
   note:'G above A — 16:9. 4¢ below ET.'},
  {id:'m7_E', drone:'E5', test:'D6',  name:'E',  interval:'Minor 7th',  group:'6ths & 7ths',
   note:'D above E — 16:9.'},

  // ── MAJOR 7th (15:8) — 1088¢, 12¢ below ET ──────
  {id:'M7_G', drone:'G3', test:'F#4', name:'G',  interval:'Major 7th',  group:'6ths & 7ths',
   note:'Major 7th — 15:8. 12¢ below ET. JI leading tone sits low — let it lock.'},
  {id:'M7_D', drone:'D4', test:'C#5', name:'D',  interval:'Major 7th',  group:'6ths & 7ths',
   note:'C# above D — 15:8. Pulls toward resolution. 12¢ below ET.'},
  {id:'M7_A', drone:'A4', test:'G#5', name:'A',  interval:'Major 7th',  group:'6ths & 7ths',
   note:'G# above A — 15:8. Leading tone energy. 12¢ below ET.'},
  {id:'M7_E', drone:'E5', test:'D#6', name:'E',  interval:'Major 7th',  group:'6ths & 7ths',
   note:'D# above E — 15:8. 12¢ below ET.'},

  // ── OCTAVE (2:1) ──────────────────────────────────
  {id:'P8_G', drone:'G3', test:'G4',  name:'G',  interval:'Octave',     group:'Octave',
   note:'Octave — 2:1 exact. Any deviation is instantly audible.'},
  {id:'P8_D', drone:'D4', test:'D5',  name:'D',  interval:'Octave',     group:'Octave',
   note:'D octave — 2:1. Should ring with zero beats.'},
  {id:'P8_A', drone:'A4', test:'A5',  name:'A',  interval:'Octave',     group:'Octave',
   note:'A octave — open string check. Lock it.'},
  {id:'P8_E', drone:'E5', test:'E6',  name:'E',  interval:'Octave',     group:'Octave',
   note:'E octave above open E string. Pure 2:1.'},
];

// Groups in display order
const INTERVAL_GROUPS = ['Seconds','Thirds','4ths & 5ths','6ths & 7ths','Octave'];

// ── Enabled intervals (persisted to localStorage) ──
let enabledIds = new Set();

function loadEnabled() {
  try {
    const saved = localStorage.getItem('intonation_enabled');
    if (saved) {
      enabledIds = new Set(JSON.parse(saved));
      // Filter out any stale ids not in current library
      enabledIds = new Set([...enabledIds].filter(id => INTERVALS.some(i => i.id === id)));
    }
  } catch(e) {}
  // Default: all enabled
  if (enabledIds.size === 0) enabledIds = new Set(INTERVALS.map(i => i.id));
}

function saveEnabled() {
  try { localStorage.setItem('intonation_enabled', JSON.stringify([...enabledIds])); } catch(e) {}
}

function enabledIntervals() {
  const arr = INTERVALS.filter(i => enabledIds.has(i.id));
  return arr.length > 0 ? arr : INTERVALS; // fallback: all if none selected
}

// ═══════════════════════════════════════════════════
// EQUAL TEMPERAMENT + JI RATIO SYSTEM (for INTERVALS drone mode)
// Drone plays at ET; test note = ET drone × JI ratio.
// ═══════════════════════════════════════════════════
const ET_SEMITONES = {
  'C3':-21, 'D3':-19, 'E3':-17, 'F3':-16, 'G3':-14,
  'A3':-12, 'Bb3':-11, 'B3':-10,
  'C4':-9, 'C#4':-8, 'D4':-7, 'Eb4':-6, 'D#4':-6, 'E4':-5,
  'F4':-4, 'F#4':-3, 'G4':-2, 'G#4':-1, 'Ab4':-1, 'Ab3':-13,
  'A4':0, 'Bb4':1, 'B4':2,
  'C5':3, 'C#5':4, 'D5':5, 'D#5':6, 'Eb5':6, 'E5':7,
  'F5':8, 'F#5':9, 'G5':10, 'G#5':11,
  'A5':12, 'Bb5':13, 'B5':14, 'C6':15, 'C#6':16, 'D6':17, 'D#6':18, 'Eb6':18, 'E6':19,
};

function etHz(note, baseA) {
  const s = ET_SEMITONES[note];
  if (s == null) { console.warn('No ET semitone for', note); return baseA; }
  return baseA * Math.pow(2, s / 12);
}

const JI_RATIOS = {
  'Minor 2nd':   16/15,   // 111.7¢ — 12¢ above ET
  'Major 2nd':   9/8,     // 203.9¢ — 4¢ above ET
  'Minor 3rd':   6/5,     // 315.6¢ — 16¢ above ET
  'Major 3rd':   5/4,     // 386.3¢ — 14¢ below ET
  'Perfect 4th': 4/3,     // 498.0¢ — 2¢ below ET
  'Aug 4th':     45/32,   // 590.2¢ — 10¢ above ET
  'Perfect 5th': 3/2,     // 702.0¢ — 2¢ above ET
  'Minor 6th':   8/5,     // 813.7¢ — 14¢ above ET
  'Major 6th':   5/3,     // 884.4¢ — 16¢ below ET
  'Minor 7th':   16/9,    // 996.1¢ — 4¢ below ET
  'Major 7th':   15/8,    // 1088.3¢ — 12¢ below ET
  'Octave':      2,       // 1200¢ — exact
};

// ═══════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════
const S = {
  pitch:440, timbre:'strings', timing:'sequential',
  mode:'listen', refType:'drone',
  fixedCents:12, wsCents:12, lisCents:16,
  answered:false, played:false,
  correct:0, total:0,
  q:null,
  wsLocked:null, wsStreak:0, wsTimer:null,
  // Tune It
  tuneActive:false,
  tuneStartOffset:0,
};

// ── Staircase ────────────────────────────────────
const SC_STEPS = [20,16,13,10,8,6,5,4,3];
const SC = { idx:0, streak:0, lastDir:null, reversals:0 };

function scCents() { return SC_STEPS[SC.idx]; }

function scUpdate(ok) {
  if (ok) {
    SC.streak++;
    if (SC.streak >= 2) {
      SC.streak = 0;
      const prev = SC.idx;
      SC.idx = Math.min(SC.idx+1, SC_STEPS.length-1);
      if (SC.idx !== prev) { if (SC.lastDir==='up') SC.reversals++; SC.lastDir='down'; }
    }
  } else {
    SC.streak = 0;
    const prev = SC.idx;
    SC.idx = Math.max(SC.idx-1, 0);
    if (SC.idx !== prev) { if (SC.lastDir==='down') SC.reversals++; SC.lastDir='up'; }
  }
  renderJND();
}

function renderJND() {
  const v = scCents();
  const el = document.getElementById('jndVal');
  el.textContent = v + ' ¢';
  el.className = 'jnd-val' + (SC.idx>=5?' up':SC.idx<=1?' down':'');
  const lbls = ['starting out','getting harder','building skill','good progress','sharp ears','very sensitive','professional range','elite','extraordinary'];
  document.getElementById('jndLbl').textContent = lbls[Math.min(SC.idx,lbls.length-1)];
  const pct = (SC.idx/(SC_STEPS.length-1))*100;
  const fill = document.getElementById('scFill');
  fill.style.width = pct+'%';
  fill.style.background = SC.idx>=5?'var(--intune)':SC.idx<=1?'var(--sharp)':'var(--accent)';
}

// ═══════════════════════════════════════════════════
// AUDIO ENGINE
// ═══════════════════════════════════════════════════
let AC=null, liveNodes=[], refOn=false, listenDroneNodes=[], listenNoteNodes=[];
let listenNoteTimer=null;
// Tune It live nodes — kept separate so frequency can be updated without recreation
let tuneOscNodes=[];   // [{osc, gainNode}] — oscillators whose frequency we update live
let tuneDroneNodes=[]; // sustained drone for tune it mode

function getCtx() {
  if (!AC) AC = new (window.AudioContext||window.webkitAudioContext)();
  if (AC.state==='suspended') AC.resume();
  return AC;
}

function stopAll() {
  const c=getCtx(), now=c.currentTime;
  liveNodes.forEach(n=>{
    try{if(n.gain){n.gain.cancelScheduledValues(now);n.gain.setValueAtTime(0,now);}}catch(e){}
    try{n.stop(now+0.03);}catch(e){}
    try{setTimeout(()=>{try{n.disconnect();}catch(e){}},80);}catch(e){}
  });
  liveNodes=[];
  listenDroneNodes=[];
  listenNoteNodes=[];
  tuneDroneNodes=[];
  tuneOscNodes=[];
  S.tuneActive=false;
  tunePhase='idle';
  if (listenNoteTimer) { clearTimeout(listenNoteTimer); listenNoteTimer=null; }
  refOn=false;
  document.getElementById('refDisp').classList.remove('playing');
  document.getElementById('btnRef').classList.remove('lit');
  // In listen+sequential the drone button has a different label
  const listenSeq = S.mode==='listen' && S.timing==='sequential';
  document.getElementById('btnRef').textContent = listenSeq ? '♩\u00A0 Play Drone' : refBtnLabel(false);
  document.getElementById('btnTest').classList.remove('lit');
  ['btnRW','btnRR','btnLisWrong','btnLisRight'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.classList.remove('lit');
  });
  ['fbWRow','fbRRow'].forEach(id=>{
    const el=document.getElementById(id);
    if(el){el.classList.remove('aw');el.classList.remove('ar');}
  });
}

// Sustained tone (infinite until stopAll)
function toneSus(freq, timbre, vib) {
  const c=getCtx(), now=c.currentTime, nodes=[];
  const master=c.createGain();
  master.gain.setValueAtTime(0,now);
  master.gain.linearRampToValueAtTime(0.18,now+0.1);
  master.connect(c.destination); nodes.push(master);
  if(timbre==='strings'||timbre==='mixed'){
    const w=timbre==='mixed'?0.65:1;
    const s1=c.createOscillator();s1.type='sawtooth';s1.frequency.value=freq;
    const s2=c.createOscillator();s2.type='sawtooth';s2.frequency.value=freq*1.003;
    const flt=c.createBiquadFilter();flt.type='lowpass';flt.frequency.value=freq*4.8;flt.Q.value=0.5;
    const g1=c.createGain();g1.gain.value=0.65*w;
    const g2=c.createGain();g2.gain.value=0.3*w;
    s1.connect(flt);s2.connect(flt);flt.connect(g1);g2.connect(master);g1.connect(master);
    if(vib){const lfo=c.createOscillator();lfo.frequency.value=5.1+Math.random()*0.7;const lg=c.createGain();lg.gain.value=freq*0.006;lfo.connect(lg);lg.connect(s1.frequency);lfo.start();nodes.push(lfo,lg);}
    s1.start();s2.start();nodes.push(s1,s2,flt,g1,g2);
  }
  if(timbre==='cello'){
    // Darker tone: lower cutoff, stronger body, slower deeper vibrato
    const s1=c.createOscillator();s1.type='sawtooth';s1.frequency.value=freq;
    const s2=c.createOscillator();s2.type='sawtooth';s2.frequency.value=freq*1.002;
    const flt=c.createBiquadFilter();flt.type='lowpass';flt.frequency.value=freq*3.5;flt.Q.value=0.7;
    // Boost low harmonics with a gentle peak
    const peak=c.createBiquadFilter();peak.type='peaking';peak.frequency.value=freq*2;peak.gain.value=4;peak.Q.value=1.5;
    const g1=c.createGain();g1.gain.value=0.7;
    const g2=c.createGain();g2.gain.value=0.35;
    s1.connect(flt);s2.connect(flt);flt.connect(peak);peak.connect(g1);g2.connect(master);g1.connect(master);
    if(vib){const lfo=c.createOscillator();lfo.frequency.value=4.0+Math.random()*0.4;const lg=c.createGain();lg.gain.value=freq*0.009;lfo.connect(lg);lg.connect(s1.frequency);lfo.start();nodes.push(lfo,lg);}
    s1.start();s2.start();nodes.push(s1,s2,flt,peak,g1,g2);
  }
  if(timbre==='pure'){
    // Single sawtooth, bright cutoff, NO vibrato ever — maximises beat audibility
    const s1=c.createOscillator();s1.type='sawtooth';s1.frequency.value=freq;
    const flt=c.createBiquadFilter();flt.type='lowpass';flt.frequency.value=freq*6;flt.Q.value=0.3;
    const g1=c.createGain();g1.gain.value=0.75;
    s1.connect(flt);flt.connect(g1);g1.connect(master);
    s1.start();nodes.push(s1,flt,g1);
  }
  if(timbre==='organ'||timbre==='mixed'){
    const w=timbre==='mixed'?0.4:1;
    [1,2,3].forEach((m,i)=>{const o=c.createOscillator();o.type='sine';o.frequency.value=freq*m;const g=c.createGain();g.gain.value=w*[0.5,0.2,0.08][i];o.connect(g);g.connect(master);o.start();nodes.push(o,g);});
  }
  return nodes;
}

// Fixed-duration tone
function toneDur(freq, dur, timbre, vib) {
  const c=getCtx(), now=c.currentTime, nodes=[];
  const master=c.createGain();
  master.gain.setValueAtTime(0,now);
  master.gain.linearRampToValueAtTime(0.18,now+0.09);
  master.gain.setValueAtTime(0.18,now+Math.max(0.1,dur-0.13));
  master.gain.linearRampToValueAtTime(0,now+dur);
  master.connect(c.destination); nodes.push(master);
  if(timbre==='strings'||timbre==='mixed'){
    const w=timbre==='mixed'?0.65:1;
    const s1=c.createOscillator();s1.type='sawtooth';s1.frequency.value=freq;
    const s2=c.createOscillator();s2.type='sawtooth';s2.frequency.value=freq*1.003;
    const flt=c.createBiquadFilter();flt.type='lowpass';flt.frequency.value=freq*4.8;flt.Q.value=0.5;
    const g1=c.createGain();g1.gain.value=0.65*w;
    const g2=c.createGain();g2.gain.value=0.3*w;
    s1.connect(flt);s2.connect(flt);flt.connect(g1);g2.connect(master);g1.connect(master);
    if(vib){const lfo=c.createOscillator();lfo.frequency.value=5.1+Math.random()*0.7;const lg=c.createGain();lg.gain.value=freq*0.006;lfo.connect(lg);lg.connect(s1.frequency);lfo.start();nodes.push(lfo,lg);}
    s1.start();s2.start();s1.stop(now+dur+0.1);s2.stop(now+dur+0.1);nodes.push(s1,s2,flt,g1,g2);
  }
  if(timbre==='cello'){
    const s1=c.createOscillator();s1.type='sawtooth';s1.frequency.value=freq;
    const s2=c.createOscillator();s2.type='sawtooth';s2.frequency.value=freq*1.002;
    const flt=c.createBiquadFilter();flt.type='lowpass';flt.frequency.value=freq*3.5;flt.Q.value=0.7;
    const peak=c.createBiquadFilter();peak.type='peaking';peak.frequency.value=freq*2;peak.gain.value=4;peak.Q.value=1.5;
    const g1=c.createGain();g1.gain.value=0.7;
    const g2=c.createGain();g2.gain.value=0.35;
    s1.connect(flt);s2.connect(flt);flt.connect(peak);peak.connect(g1);g2.connect(master);g1.connect(master);
    if(vib){const lfo=c.createOscillator();lfo.frequency.value=4.0+Math.random()*0.4;const lg=c.createGain();lg.gain.value=freq*0.009;lfo.connect(lg);lg.connect(s1.frequency);lfo.start();nodes.push(lfo,lg);}
    s1.start();s2.start();s1.stop(now+dur+0.1);s2.stop(now+dur+0.1);nodes.push(s1,s2,flt,peak,g1,g2);
  }
  if(timbre==='pure'){
    const s1=c.createOscillator();s1.type='sawtooth';s1.frequency.value=freq;
    const flt=c.createBiquadFilter();flt.type='lowpass';flt.frequency.value=freq*6;flt.Q.value=0.3;
    const g1=c.createGain();g1.gain.value=0.75;
    s1.connect(flt);flt.connect(g1);g1.connect(master);
    s1.start();s1.stop(now+dur+0.1);nodes.push(s1,flt,g1);
  }
  if(timbre==='organ'||timbre==='mixed'){
    const w=timbre==='mixed'?0.4:1;
    [1,2,3].forEach((m,i)=>{const o=c.createOscillator();o.type='sine';o.frequency.value=freq*m;const g=c.createGain();g.gain.value=w*[0.5,0.2,0.08][i];o.connect(g);g.connect(master);o.start();o.stop(now+dur+0.05);nodes.push(o,g);});
  }
  return nodes;
}

function playRefSus(withTest) {
  // Play reference sustained + optionally test pitch simultaneously
  const q=S.q;
  const isDrone = q.tmpl.isDrone;
  document.getElementById('refDisp').classList.add('playing');
  // Drone: no vibrato (open string character). Chord: vibrato.
  q.refFreqs.forEach(f=>{ liveNodes.push(...toneSus(f, S.timbre, !isDrone)); });
  if(withTest) {
    liveNodes.push(...toneSus(q.wrongFreq, S.timbre, false));
    document.getElementById('btnTest').classList.add('lit');
  }
}

// ═══════════════════════════════════════════════════
// TUNE IT ENGINE
// ═══════════════════════════════════════════════════
const TUNE_RANGE  = 25;   // ±25¢
const TUNE_HIT    = 5;    // ≤5¢ error = success
const TUNE_NEAR   = 2;    // ≤2¢ from just = glow in explore phase

// Phase: 'idle' | 'judge' | 'explore'
// judge phase: slider moves thumb only, no audio effect
// explore phase: slider controls live pitch so user can hear the difference

let tunePhase = 'idle';
let tuneSliderCents = 0;   // where the user placed the thumb
let tuneExploring = false;

// Build tick marks once on init
function tuneBuildTicks() {
  const container = document.getElementById('tuneTicks');
  if (!container) return;
  container.innerHTML = '';
  for (let c = -TUNE_RANGE; c <= TUNE_RANGE; c += 1) {
    if (c === 0) continue;
    const div = document.createElement('div');
    div.className = 'tune-tick' + (c % 5 === 0 ? ' major' : '');
    div.style.left = tuneCentsToPos(c) + '%';
    container.appendChild(div);
  }
}

function tuneCentsToPos(cents) {
  // Returns 0–100 percent position for a cents value
  return (cents / TUNE_RANGE) * 50 + 50;
}

function tunePosFromEvent(e) {
  const strip = document.getElementById('tuneStrip');
  const rect = strip.getBoundingClientRect();
  const x = (e.clientX ?? e.touches?.[0]?.clientX ?? rect.left) - rect.left;
  const pct = Math.max(0, Math.min(1, x / rect.width));
  return (pct - 0.5) * 2 * TUNE_RANGE; // → cents in [-TUNE_RANGE, TUNE_RANGE]
}

function tuneSetSlider(cents) {
  cents = Math.max(-TUNE_RANGE, Math.min(TUNE_RANGE, cents));
  tuneSliderCents = cents;
  const pos = tuneCentsToPos(cents);

  // Move thumb
  document.getElementById('tuneThumb').style.left = pos + '%';

  // Fill
  const fill = document.getElementById('tuneFill');
  if (cents >= 0) { fill.style.left = '50%'; fill.style.width = (pos-50)+'%'; }
  else            { fill.style.left = pos+'%'; fill.style.width = (50-pos)+'%'; }

  // Readout — show once user has dragged away from start position
  const ro = document.getElementById('tuneReadout');
  if (tuneDragActive || tunePhase === 'explore') {
    ro.textContent = cents === 0 ? '0 ¢' : (cents > 0 ? '+' : '') + cents.toFixed(1) + ' ¢';
  }

  // Always update live pitch when audio is active
  if (S.tuneActive) {
    tuneUpdateLivePitch(cents);
    // Near-just glow only shown in explore phase — not during judge (would reveal position)
    const absCents = S.q.centsActual + cents;
    const near = tunePhase === 'explore' && Math.abs(absCents) < TUNE_NEAR;
    document.getElementById('tuneThumb').className = 'tune-thumb' + (near ? ' near-just' : '');
    ro.className = 'tune-readout' + (near ? ' near' : '');
  } else {
    ro.className = 'tune-readout';
  }

  // Enable confirm once user has moved the slider
  if (tunePhase === 'judge') {
    document.getElementById('btnTuneConfirm').disabled = false;
  }
}

function tuneUpdateLivePitch(sliderDelta) {
  if (!S.q) return;
  // Absolute pitch = start offset + how far user has dragged
  const absCents = S.q.centsActual + sliderDelta;
  const newFreq = S.q.justFreq * Math.pow(2, absCents / 1200);
  tuneOscNodes.forEach(({osc, ratio}) => { osc.frequency.value = newFreq * ratio; });
}

function tuneConfirm() {
  if (tunePhase !== 'judge') return;
  tunePhase = 'explore';

  const actual = S.q.centsActual;  // how far out of tune the start was
  const guess  = tuneSliderCents;  // where user stopped (drag delta from start)
  const absGuess = actual + guess; // absolute pitch at confirm (0 = just)
  const error  = Math.abs(absGuess); // error = how far from just
  const isHit  = error <= TUNE_HIT;

  // Score
  S.total++;
  if (isHit) S.correct++;
  updateScore();

  // Result text
  const actualStr = actual > 0
    ? `+${actual.toFixed(1)}¢ sharp to start`
    : `${actual.toFixed(1)}¢ flat to start`;
  const guessErr = absGuess === 0 ? 'exactly just'
    : (absGuess > 0 ? '+' : '') + absGuess.toFixed(1) + '¢ from just';
  const mainMsg = isHit
    ? `✓ Good ear — ${error.toFixed(1)}¢ from just`
    : `${error.toFixed(1)}¢ from just — keep listening`;
  const resultClass = isHit ? 'hit' : error <= 12 ? 'near-miss' : 'miss';

  const fb = document.getElementById('tuneFbResult');
  fb.innerHTML = `<span>${mainMsg}</span><span class="tune-fb-acc">${guessErr}</span>`;
  fb.className = 'tune-fb-result ' + resultClass;

  document.getElementById('tuneFeedback').style.display = 'flex';
  document.getElementById('tuneFbExplore').style.display = '';

  // Just marker = drag position where absolute pitch = 0
  // i.e. sliderDelta = -actual, so strip position = tuneCentsToPos(-actual)
  const justSliderPos = -actual; // slider delta that lands on just
  const mg = document.getElementById('tuneMarkerGuess');
  const mj = document.getElementById('tuneMarkerJust');
  mg.style.left = tuneCentsToPos(guess)        + '%';
  mj.style.left = tuneCentsToPos(justSliderPos) + '%';
  mg.style.display = '';
  mj.style.display = '';

  document.getElementById('testBadge').classList.add('revealed');
  addTuneHistory(isHit, actual, absGuess);

  // Auto-play: current position → just
  tunePhase = 'idle'; // freeze drag during comparison
  document.getElementById('btnTuneConfirm').disabled = true;
  document.getElementById('tuneStatus').textContent = '← Your position';

  const dur = 1.5, gap = 0.5;
  setTimeout(() => {
    // Snap to just
    tuneUpdateLivePitch(-actual); // sliderDelta = -actual → absolute = 0¢
    document.getElementById('tuneStatus').textContent = '← Just intonation';

    setTimeout(() => {
      // Restore to user's guess position for explore
      tuneUpdateLivePitch(guess);
      tuneSetSlider(guess);
      tunePhase = 'explore';
      document.getElementById('tuneStatus').textContent =
        'Drag to explore. Green = just intonation — find it by ear.';
      document.getElementById('btnTuneNext').disabled = false;
    }, (dur + gap) * 1000);

  }, (dur + gap) * 1000);
}

function tuneStartLiveNote(initialCents) {
  const c = getCtx(), now = c.currentTime;
  const startFreq = S.q.justFreq * Math.pow(2, initialCents/1200);
  tuneOscNodes = [];
  const master = c.createGain();
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(0.18, now+0.1);
  master.connect(c.destination);
  liveNodes.push(master);
  const timbre = S.timbre;
  if (timbre==='strings'||timbre==='mixed') {
    const w = timbre==='mixed'?0.65:1;
    const s1=c.createOscillator(); s1.type='sawtooth'; s1.frequency.value=startFreq;
    const s2=c.createOscillator(); s2.type='sawtooth'; s2.frequency.value=startFreq*1.003;
    const flt=c.createBiquadFilter(); flt.type='lowpass'; flt.frequency.value=startFreq*4.8; flt.Q.value=0.5;
    const g1=c.createGain(); g1.gain.value=0.65*w;
    const g2=c.createGain(); g2.gain.value=0.3*w;
    s1.connect(flt); s2.connect(flt); flt.connect(g1); g2.connect(master); g1.connect(master);
    s1.start(); s2.start();
    liveNodes.push(s1,s2,flt,g1,g2);
    tuneOscNodes.push({osc:s1, ratio:1}, {osc:s2, ratio:1.003});
  }
  if (timbre==='cello') {
    const s1=c.createOscillator(); s1.type='sawtooth'; s1.frequency.value=startFreq;
    const s2=c.createOscillator(); s2.type='sawtooth'; s2.frequency.value=startFreq*1.002;
    const flt=c.createBiquadFilter(); flt.type='lowpass'; flt.frequency.value=startFreq*3.5; flt.Q.value=0.7;
    const peak=c.createBiquadFilter(); peak.type='peaking'; peak.frequency.value=startFreq*2; peak.gain.value=4; peak.Q.value=1.5;
    const g1=c.createGain(); g1.gain.value=0.7;
    const g2=c.createGain(); g2.gain.value=0.35;
    s1.connect(flt); s2.connect(flt); flt.connect(peak); peak.connect(g1); g2.connect(master); g1.connect(master);
    s1.start(); s2.start();
    liveNodes.push(s1,s2,flt,peak,g1,g2);
    tuneOscNodes.push({osc:s1, ratio:1}, {osc:s2, ratio:1.002});
  }
  if (timbre==='pure') {
    const s1=c.createOscillator(); s1.type='sawtooth'; s1.frequency.value=startFreq;
    const flt=c.createBiquadFilter(); flt.type='lowpass'; flt.frequency.value=startFreq*6; flt.Q.value=0.3;
    const g1=c.createGain(); g1.gain.value=0.75;
    s1.connect(flt); flt.connect(g1); g1.connect(master);
    s1.start();
    liveNodes.push(s1,flt,g1);
    tuneOscNodes.push({osc:s1, ratio:1});
  }
  if (timbre==='organ'||timbre==='mixed') {
    const w = timbre==='mixed'?0.4:1;
    [1,2,3].forEach((mult,i)=>{
      const o=c.createOscillator(); o.type='sine'; o.frequency.value=startFreq*mult;
      const g=c.createGain(); g.gain.value=w*[0.5,0.2,0.08][i];
      o.connect(g); g.connect(master); o.start();
      liveNodes.push(o,g);
      tuneOscNodes.push({osc:o, ratio:mult});
    });
  }
}

function addTuneHistory(isHit, startOffset, absGuess) {
  const tmpl = S.q.tmpl;
  const list  = document.getElementById('histList');
  const empty = document.getElementById('emptyH');
  if (empty) empty.remove();
  const el = document.createElement('div');
  el.className = 'hist-item';
  const startStr = (startOffset>0?'+':'')+startOffset.toFixed(1)+'¢';
  const errStr   = Math.abs(absGuess).toFixed(1)+'¢ err';
  el.innerHTML = `
    <div class="hdot ${isHit?'ok':'bad'}"></div>
    <span>${tmpl.name}</span>
    <span class="h-interval">${tmpl.type||tmpl.inv}</span>
    <span class="hans ${isHit?'ok':'bad'}">${startStr} / ${errStr}</span>
  `;
  list.insertBefore(el, list.firstChild);
}

// ── Drag + keyboard ──────────────────────────────
let tuneDragActive=false, tuneDragStartX=0, tuneDragStartCents=0;

function tunePointerDown(e) {
  if (tunePhase==='idle') return;
  tuneDragActive=true;
  tuneDragStartX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  tuneDragStartCents = tuneSliderCents;
  e.preventDefault();
}

function tunePointerMove(e) {
  if (!tuneDragActive || tunePhase==='idle') return;
  const strip = document.getElementById('tuneStrip');
  const x = e.clientX ?? e.touches?.[0]?.clientX ?? tuneDragStartX;
  const dx = x - tuneDragStartX;
  const deltaCents = (dx / strip.offsetWidth) * TUNE_RANGE * 2;
  tuneSetSlider(tuneDragStartCents + deltaCents);
  e.preventDefault();
}

function tunePointerUp() { tuneDragActive=false; }

function tuneKeyDown(e) {
  if (S.mode!=='tuneit' || tunePhase==='idle') return;
  const step = e.shiftKey ? 5 : 0.5;
  if (e.key==='ArrowLeft')  { tuneSetSlider(tuneSliderCents - step); e.preventDefault(); }
  if (e.key==='ArrowRight') { tuneSetSlider(tuneSliderCents + step); e.preventDefault(); }
}

function tuneInit() {
  const strip = document.getElementById('tuneStrip');
  strip.addEventListener('mousedown',  tunePointerDown);
  strip.addEventListener('touchstart', tunePointerDown, {passive:false});
  document.addEventListener('mousemove',  tunePointerMove);
  document.addEventListener('touchmove',  tunePointerMove, {passive:false});
  document.addEventListener('mouseup',    tunePointerUp);
  document.addEventListener('touchend',   tunePointerUp);
  document.addEventListener('keydown',    tuneKeyDown);
  tuneBuildTicks();
}

// ═══════════════════════════════════════════════════
// QUESTION GENERATION
// ═══════════════════════════════════════════════════
function generate() {
  const baseA = S.pitch;
  let tmpl, refFreqs, justFreq;

  if (S.refType==='drone') {
    let bi;
    if (S.mode==='woodshed' && S.wsLocked!==null) {
      bi = INTERVALS.find(i => i.id === S.wsLocked) || enabledIntervals()[0];
    } else {
      const pool = enabledIntervals();
      bi = pool[Math.floor(Math.random()*pool.length)];
    }
    tmpl = {
      name: bi.interval + ' / ' + bi.drone, inv: bi.interval, notes:[bi.drone], test:bi.test,
      type: bi.interval, droneNote:bi.drone, coachNote:bi.note, isDrone:true,
      intervalId: bi.id,
    };
    const droneFreq = etHz(bi.drone, baseA);
    refFreqs = [droneFreq];
    justFreq = droneFreq * (JI_RATIOS[bi.interval] || 1);
  } else {
    const c = CHORDS[Math.floor(Math.random()*CHORDS.length)];
    tmpl = {...c, isDrone:false, coachNote:''};
    refFreqs = c.notes.map(n=>hz(n,baseA));
    justFreq = hz(c.test, baseA);
  }

  const centsBase =
    S.mode==='listen'   ? S.lisCents :
    S.mode==='adaptive' ? scCents() :
    S.mode==='tuneit'   ? 0 :  // tuneit doesn't use centsBase for answer gen
    S.mode==='woodshed' ? S.wsCents :
    S.fixedCents;

  let answer, centsActual;
  if (S.mode==='listen') {
    answer = Math.random()<0.5?'sharp':'flat';
    centsActual = answer==='sharp' ? centsBase : -centsBase;
  } else if (S.mode==='tuneit') {
    // Random start offset: always out of tune, ±12–25¢, random direction
    const mag = 12 + Math.random()*13;
    const startOffset = parseFloat((Math.random()<0.5 ? mag : -mag).toFixed(1));
    S.tuneStartOffset = startOffset;
    answer = 'intune';
    centsActual = startOffset; // pitch starts this far from just
  } else {
    const roll=Math.random(), off=centsBase*(0.88+Math.random()*0.24);
    if (roll<0.33)     {answer='intune';centsActual=0;}
    else if(roll<0.66) {answer='sharp'; centsActual=off;}
    else               {answer='flat';  centsActual=-off;}
  }

  const wrongFreq = justFreq * Math.pow(2, centsActual/1200);

  S.q = {tmpl, refFreqs, wrongFreq, justFreq, answer, centsActual};
  S.tuneLocked = false;
  S.tuneCents = 0;
  S.answered = false;
  S.played = false;
}

// ═══════════════════════════════════════════════════
// PLAYBACK ACTIONS
// ═══════════════════════════════════════════════════
function playReference() {
  if (!S.q) { nextQuestion(); return; }

  if (S.mode==='tuneit') {
    if (refOn) { stopAll(); tunePhase='idle'; return; }
    stopAll();
    refOn=true;
    tunePhase='judge';
    const btn=document.getElementById('btnRef');
    btn.classList.add('lit');
    btn.textContent='◼\u00A0 Stop';
    document.getElementById('refDisp').classList.add('playing');
    // Drone sustained
    S.q.refFreqs.forEach(f=>{ liveNodes.push(...toneSus(f, S.timbre, false)); });
    // Pitch starts at centsActual (= tuneStartOffset, out of tune).
    // Slider starts at centre. Dragging shifts pitch relative to the start position.
    // Just = drag far enough that absolute pitch = 0¢.
    tuneStartLiveNote(S.q.centsActual);
    tuneSliderCents = 0;  // user's drag position relative to start (0 = no movement yet)
    S.tuneActive = true;
    document.getElementById('tuneThumb').style.left = '50%';
    document.getElementById('tuneFill').style.left = '50%';
    document.getElementById('tuneFill').style.width = '0%';
    document.getElementById('tuneReadout').textContent = '— ¢';
    document.getElementById('tuneReadout').className = 'tune-readout';
    document.getElementById('tuneStatus').textContent =
      'Drag to find just intonation — stop where it sounds right, then Confirm.';
    document.getElementById('btnTuneConfirm').disabled = true;
    return;
  }

  // Toggle off if already playing
  if (refOn) { stopAll(); return; }
  stopAll();
  refOn = true;

  const btn = document.getElementById('btnRef');
  btn.classList.add('lit');
  btn.textContent = refBtnLabel(true);

  const simul = S.timing==='simultaneous';
  playRefSus(simul);

  S.played = true;
  if (S.mode!=='listen') enableAnswers();
}

function playTestOnly() {
  if (!S.q) return;
  const btn = document.getElementById('btnTest');
  if (btn.classList.contains('lit')) { stopAll(); return; }
  stopAll();
  btn.classList.add('lit');
  liveNodes.push(...toneDur(S.q.wrongFreq, 3.5, S.timbre, false));
  S.played = true;
  if (S.mode!=='listen') enableAnswers();
  setTimeout(()=>btn.classList.remove('lit'), 3800);
}

// ── Listen mode playback ──────────────────────────
// Each button toggles: first press plays, second press stops.
// Sequential timing: drone plays alone first, then test pitch follows.
// Simultaneous timing: drone + test pitch play together.

// ── Listen mode playback ──────────────────────────
// Sequential: btnRef toggles the sustained drone. Out of Tune / In Tune
//   fire a single short note against the ringing drone.
// Simultaneous: each button plays drone + note together as one event.

function listenStopDrone() {
  const c = getCtx(), now = c.currentTime;
  listenDroneNodes.forEach(n => {
    try { if (n.gain) { n.gain.cancelScheduledValues(now); n.gain.setValueAtTime(0, now); } } catch(e){}
    try { n.stop(now + 0.03); } catch(e){}
    try { setTimeout(()=>{ try { n.disconnect(); } catch(e){} }, 80); } catch(e){}
  });
  listenDroneNodes = [];
}

function stopListenNote() {
  if (listenNoteTimer) { clearTimeout(listenNoteTimer); listenNoteTimer=null; }
  const c = getCtx(), now = c.currentTime;
  listenNoteNodes.forEach(n => {
    try { if (n.gain) { n.gain.cancelScheduledValues(now); n.gain.setValueAtTime(0, now); } } catch(e){}
    try { n.stop(now + 0.03); } catch(e){}
    try { setTimeout(()=>{ try { n.disconnect(); } catch(e){} }, 80); } catch(e){}
  });
  listenNoteNodes = [];
  // Remove note nodes from liveNodes too
  liveNodes = liveNodes.filter(n => !listenNoteNodes.includes(n));
}

function listenToggleDrone() {
  // Called by btnRef in listen+sequential mode
  const btn = document.getElementById('btnRef');
  if (btn.classList.contains('lit')) {
    listenStopDrone();
    btn.classList.remove('lit');
    btn.textContent = '♩\u00A0 Play Drone';
    document.getElementById('refDisp').classList.remove('playing');
    document.getElementById('listenStatus').textContent = 'Drone stopped. Press Play Drone to resume.';
  } else {
    btn.classList.add('lit');
    btn.textContent = '◼\u00A0 Stop Drone';
    document.getElementById('refDisp').classList.add('playing');
    document.getElementById('listenStatus').textContent = 'Drone playing — press Out of Tune or In Tune to hear each note.';
    S.q.refFreqs.forEach(f => { listenDroneNodes.push(...toneSus(f, S.timbre, false)); });
    liveNodes.push(...listenDroneNodes);
  }
}

function listenPlay(which) {
  const btnId = which==='wrong' ? 'btnLisWrong' : 'btnLisRight';
  const otherBtnId = which==='wrong' ? 'btnLisRight' : 'btnLisWrong';
  const freq = which==='wrong' ? S.q.wrongFreq : S.q.justFreq;
  const label = which==='wrong' ? '← Out of tune' : '← In tune';

  // Toggle off if already playing
  const isActive = document.getElementById(btnId).classList.contains('lit');

  if (S.timing === 'sequential') {
    // Note buttons are completely independent from the drone.
    // They only start/stop the test pitch — drone is unaffected.
    if (isActive) {
      // Stop just the note nodes
      stopListenNote();
      document.getElementById(btnId).classList.remove('lit');
      document.getElementById('listenStatus').textContent = 'Stopped.';
      return;
    }
    // Stop any currently playing note (not drone), then play new one
    stopListenNote();
    document.getElementById(btnId).classList.add('lit');
    document.getElementById(otherBtnId).classList.remove('lit');
    document.getElementById('listenStatus').textContent = label;
    const dur = 2.5;
    const noteNodes = toneDur(freq, dur, S.timbre, false);
    listenNoteNodes.push(...noteNodes);
    liveNodes.push(...noteNodes);
    listenNoteTimer = setTimeout(() => {
      document.getElementById(btnId).classList.remove('lit');
      if (which === 'right') {
        document.getElementById('listenStatus').textContent = 'Good. Press Next when ready, or keep comparing.';
        document.getElementById('btnNext').disabled = false;
      } else {
        document.getElementById('listenStatus').textContent = 'Now press In Tune to compare.';
      }
    }, dur * 1000);

  } else {
    // Simultaneous: stop everything, play drone + note together
    stopAll();
    if (isActive) {
      document.getElementById('listenStatus').textContent = 'Stopped. Press either button to listen again.';
      return;
    }
    document.getElementById(btnId).classList.add('lit');
    document.getElementById(otherBtnId).classList.remove('lit');
    document.getElementById('refDisp').classList.add('playing');
    document.getElementById('listenStatus').textContent = label;
    const dur = 3.0;
    S.q.refFreqs.forEach(f => { liveNodes.push(...toneDur(f, dur, S.timbre, false)); });
    liveNodes.push(...toneDur(freq, dur, S.timbre, false));
    setTimeout(() => {
      document.getElementById(btnId).classList.remove('lit');
      document.getElementById('refDisp').classList.remove('playing');
      if (which === 'right') {
        document.getElementById('listenStatus').textContent = 'Good. Press Next when ready, or compare again.';
        document.getElementById('btnNext').disabled = false;
      } else {
        document.getElementById('listenStatus').textContent = 'Now press In Tune to compare.';
      }
    }, dur * 1000);
  }
}

function listenPlayWrong() { listenPlay('wrong'); }
function listenPlayRight() { listenPlay('right'); }

// ── Wrong/correct comparison replay (judge panel) ─
function replayWrong() {
  stopAll();
  document.getElementById('btnRW').classList.add('lit');
  document.getElementById('fbWRow').classList.add('aw');
  const dur=3.2;
  S.q.refFreqs.forEach(f=>{liveNodes.push(...toneDur(f,dur,S.timbre,!S.q.tmpl.isDrone));});
  liveNodes.push(...toneDur(S.q.wrongFreq,dur,S.timbre,false));
  setTimeout(()=>{document.getElementById('btnRW').classList.remove('lit');document.getElementById('fbWRow').classList.remove('aw');},(dur+0.3)*1000);
}

function replayRight() {
  stopAll();
  document.getElementById('btnRR').classList.add('lit');
  document.getElementById('fbRRow').classList.add('ar');
  const dur=3.2;
  S.q.refFreqs.forEach(f=>{liveNodes.push(...toneDur(f,dur,S.timbre,!S.q.tmpl.isDrone));});
  liveNodes.push(...toneDur(S.q.justFreq,dur,S.timbre,false));
  setTimeout(()=>{document.getElementById('btnRR').classList.remove('lit');document.getElementById('fbRRow').classList.remove('ar');},(dur+0.3)*1000);
}

// Auto comparison on wrong answer — with coordinated timer (fix #7)
function autoCompare() {
  stopAll();
  document.getElementById('btnRW').classList.add('lit');
  document.getElementById('fbWRow').classList.add('aw');
  const dur=2.6, gap=0.7;

  S.q.refFreqs.forEach(f=>{liveNodes.push(...toneDur(f,dur,S.timbre,!S.q.tmpl.isDrone));});
  liveNodes.push(...toneDur(S.q.wrongFreq,dur,S.timbre,false));

  const TOTAL_MS = (dur+gap+dur+0.5)*1000;  // full comparison duration

  setTimeout(()=>{
    document.getElementById('btnRW').classList.remove('lit');
    document.getElementById('fbWRow').classList.remove('aw');
    stopAll();
    document.getElementById('btnRR').classList.add('lit');
    document.getElementById('fbRRow').classList.add('ar');
    S.q.refFreqs.forEach(f=>{liveNodes.push(...toneDur(f,dur,S.timbre,!S.q.tmpl.isDrone));});
    liveNodes.push(...toneDur(S.q.justFreq,dur,S.timbre,false));
    setTimeout(()=>{
      document.getElementById('btnRR').classList.remove('lit');
      document.getElementById('fbRRow').classList.remove('ar');
    },(dur+0.4)*1000);
  },(dur+gap)*1000);

  return TOTAL_MS; // caller uses this to schedule woodshed advance after comparison finishes
}

// ═══════════════════════════════════════════════════
// ANSWER LOGIC
// ═══════════════════════════════════════════════════
function submitAnswer(guess) {
  if (S.answered || !S.played) return;
  S.answered = true;
  S.total++;
  const ok = guess===S.q.answer;
  if (ok) { S.correct++; S.wsStreak++; } else { S.wsStreak=0; }

  if (S.mode==='adaptive') scUpdate(ok);

  const ids={flat:'btnFlat',intune:'btnInTune',sharp:'btnSharp'};
  document.getElementById(ids[guess]).classList.add(ok?'cfx':'wfx');
  setTimeout(()=>document.getElementById(ids[guess]).classList.remove('cfx','wfx'),700);

  disableAnswers();
  updateScore();
  showFeedback(ok, guess);
  addHistory(ok, guess);

  // Reveal test badge after answer (fix #2)
  document.getElementById('testBadge').classList.add('revealed');

  if (S.mode==='woodshed') {
    document.getElementById('wsStreakVal').textContent = S.wsStreak;
    // fix #7: woodshed waits for comparison to finish before advancing
    const delay = ok ? 1300 : autoCompare() + 400;
    S.wsTimer = setTimeout(()=>nextQuestion(), delay);
  } else {
    if (!ok) autoCompare();
    document.getElementById('btnNext').disabled = false;
    // fix #6: move focus to next button
    setTimeout(()=>document.getElementById('btnNext').focus(), 100);
  }
}

function showFeedback(ok, guess) {
  const labels={flat:'♭ Flat',intune:'◎ In Tune',sharp:'♯ Sharp'};
  const c=S.q.centsActual;
  const cStr=c===0?'exactly just intonation':(c>0?'+':'')+c.toFixed(1)+' ¢';

  const r=document.getElementById('fbResult');
  r.innerHTML=`<span>${ok?'✓ Correct':'✗ Wrong — was '+labels[S.q.answer]}</span><span class="fb-cents">${cStr}</span>`;
  r.className='fb-result vis '+(ok?'ok':'bad');

  const cmp=document.getElementById('fbCompare');
  if (!ok) {
    const offStr=Math.abs(c).toFixed(1)+' ¢ '+(c>0?'sharp':'flat');
    document.getElementById('fbWDesc').textContent=offStr+' — what you heard';
    document.getElementById('fbRDesc').textContent='Pure just intonation — '+S.q.tmpl.test+' in tune';
    cmp.classList.add('vis');
  } else {
    cmp.classList.remove('vis');
  }
}

function hideFeedback() {
  document.getElementById('fbResult').className='fb-result';
  document.getElementById('fbCompare').classList.remove('vis');
}

// ═══════════════════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════════════════
function refBtnLabel(playing) {
  const stop = playing ? '◼\u00A0' : '♩\u00A0';
  if (S.timing==='simultaneous') return stop+'Play Interval';
  return stop+(S.q&&S.q.tmpl.isDrone ? 'Play Drone' : 'Play Reference');
}

function enableAnswers()  { ['btnFlat','btnInTune','btnSharp'].forEach(id=>document.getElementById(id).disabled=false); }
function disableAnswers() { ['btnFlat','btnInTune','btnSharp'].forEach(id=>document.getElementById(id).disabled=true); }

function updateScore() {
  document.getElementById('scC').textContent=S.correct;
  document.getElementById('scT').textContent=S.total;
  document.getElementById('scP').textContent=S.total>0?Math.round(S.correct/S.total*100)+'%':'—';
}

// fix #8 — history shows interval type prominently
function addHistory(ok, guess) {
  const sym={flat:'♭',intune:'◎',sharp:'♯'};
  const tmpl=S.q.tmpl;
  const list=document.getElementById('histList');
  const empty=document.getElementById('emptyH');
  if(empty) empty.remove();
  const el=document.createElement('div');
  el.className='hist-item';
  el.innerHTML=`
    <div class="hdot ${ok?'ok':'bad'}"></div>
    <span>${tmpl.name}</span>
    <span class="h-interval">${tmpl.type||tmpl.inv}</span>
    <span class="hans ${ok?'ok':'bad'}">${sym[guess]} ${ok?'✓':'✗'}</span>
  `;
  list.insertBefore(el,list.firstChild);
}

function clearHistory() {
  document.getElementById('histList').innerHTML='<div class="empty-h" id="emptyH">No questions yet</div>';
  S.correct=0;S.total=0;updateScore();
}

// ═══════════════════════════════════════════════════
// QUESTION FLOW
// ═══════════════════════════════════════════════════
function nextQuestion() {
  if (S.wsTimer) { clearTimeout(S.wsTimer); S.wsTimer=null; }
  generate();
  stopAll();
  hideFeedback();
  disableAnswers();

  const tmpl=S.q.tmpl;
  document.getElementById('refName').textContent=tmpl.name;
  document.getElementById('refNotes').textContent=tmpl.isDrone ? tmpl.droneNote+' drone' : tmpl.notes.join(' · ');
  document.getElementById('invBadge').textContent=tmpl.inv+(tmpl.type&&tmpl.type!==tmpl.inv?' · '+tmpl.type:'');
  document.getElementById('invBadge').style.visibility='visible';
  // Hide test badge until answered (fix #2)
  const tb=document.getElementById('testBadge');
  tb.textContent='test: '+tmpl.test;
  tb.classList.remove('revealed');

  if (tmpl.isDrone && tmpl.coachNote) {
    document.getElementById('coachNote').textContent=tmpl.coachNote;
    document.getElementById('coachNote').style.display='block';
  } else {
    document.getElementById('coachNote').style.display='none';
  }

  // In listen+sequential: show btnRef as drone toggle, hide btnTest
  // In listen+simultaneous: hide both (listen buttons handle everything)
  // In judge modes: normal behaviour
  const listenSeq = S.mode==='listen' && S.timing==='sequential';
  const listenSimul = S.mode==='listen' && S.timing==='simultaneous';
  const isTune = S.mode==='tuneit';
  document.getElementById('btnRef').textContent = listenSeq ? '♩\u00A0 Play Drone' : isTune ? '♩\u00A0 Play Interval' : refBtnLabel(false);
  document.getElementById('btnRef').onclick = listenSeq ? listenToggleDrone : playReference;
  document.getElementById('btnRef').style.display = listenSimul ? 'none' : '';

  // Hide timing row in tuneit mode — always simultaneous
  document.getElementById('timingRow').style.display = S.mode==='tuneit' ? 'none' : '';
  // Sequential non-listen/non-tuneit: show test pitch button. Hide otherwise.
  document.getElementById('btnTest').style.display = (S.timing==='sequential' && S.mode!=='listen' && S.mode!=='tuneit') ? '' : 'none';

  document.getElementById('btnNext').disabled = (S.mode==='woodshed');

  // Panel visibility
  document.getElementById('listenPanel').style.display  = S.mode==='listen'   ? '' : 'none';
  document.getElementById('judgePanel').style.display   = (S.mode!=='listen' && S.mode!=='tuneit') ? '' : 'none';
  document.getElementById('tunePanel').style.display    = S.mode==='tuneit'   ? '' : 'none';
  document.getElementById('wsStreakBar').style.display  = S.mode==='woodshed' ? '' : 'none';
  document.getElementById('nextRow').style.display      = (S.mode==='woodshed'||S.mode==='tuneit') ? 'none' : '';

  // Listen mode: reset state
  if (S.mode==='listen') {
    listenStopDrone();
    const seq = S.timing==='sequential';
    document.getElementById('listenStatus').textContent = seq
      ? 'Press Play Drone to start the drone, then use Out of Tune / In Tune to hear each note.'
      : 'Press Out of Tune or In Tune to hear each version together with the drone.';
    document.getElementById('btnLisWrong').disabled=false;
    document.getElementById('btnLisRight').disabled=false;
    document.getElementById('btnNext').disabled=true;
  }

  // Woodshed auto-play
  if (S.mode==='woodshed') {
    setTimeout(()=>{ if(S.mode==='woodshed') playReference(); },300);
  }

  // Tune It reset
  if (S.mode==='tuneit') {
    tunePhase = 'idle';
    tuneSliderCents = 0;
    S.tuneActive = false;
    document.getElementById('tuneStatus').textContent =
      'Press Play Interval — listen, then drag the slider to mark how sharp or flat.';
    document.getElementById('tuneFeedback').style.display='none';
    document.getElementById('tuneFbExplore').style.display='none';
    document.getElementById('tuneMarkerGuess').style.display='none';
    document.getElementById('tuneMarkerJust').style.display='none';
    document.getElementById('tuneThumb').style.left='50%';
    document.getElementById('tuneFill').style.width='0%';
    document.getElementById('tuneReadout').textContent='— ¢';
    document.getElementById('tuneReadout').className='tune-readout';
    document.getElementById('tuneThumb').className='tune-thumb';
    document.getElementById('btnTuneConfirm').disabled=true;
    document.getElementById('btnTuneNext').disabled=true;
  }
}

// ═══════════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════════
const MODE_DESCS = {
  listen:   '<strong>Listen:</strong> No judgment — just hear the difference. Use the buttons to compare out-of-tune vs in-tune until your ear locks in.',
  adaptive: '<strong>Adaptive:</strong> Staircase training. Two correct in a row → gets harder. One wrong → eases back. Watch your threshold fall over sessions.',
  woodshed: '<strong>Fixed:</strong> Drill at a fixed cents offset. Lock to one interval or leave on random. Auto-advances after each answer.',
  tuneit:   '<strong>Tune It:</strong> Drone + test pitch play simultaneously. Mark on the slider how sharp or flat you hear it, then Confirm. Explore the difference afterward.',
};

function setMode(mode, btn) {
  S.mode=mode;
  if(S.wsTimer){clearTimeout(S.wsTimer);S.wsTimer=null;}
  btn.closest('.seg').querySelectorAll('button').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  stopAll();

  document.getElementById('listenCtrl').style.display   = mode==='listen'   ? 'flex':'none';
  document.getElementById('adaptiveCtrl').style.display = mode==='adaptive' ? 'flex':'none';
  document.getElementById('scBar').style.display        = mode==='adaptive' ? 'block':'none';
  document.getElementById('woodshedCtrl').style.display = mode==='woodshed' ? 'flex':'none';
  document.getElementById('scoreStrip').style.opacity   = (mode==='listen'||mode==='tuneit') ? '0.35':'1';
  document.getElementById('modeDesc').innerHTML = MODE_DESCS[mode];

  if(mode==='woodshed'){S.wsStreak=0;document.getElementById('wsStreakVal').textContent='0';}
  nextQuestion();
}

function setRefType(val, btn) {
  S.refType=val;
  btn.closest('.seg').querySelectorAll('button').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  stopAll();
  nextQuestion();
}

// fix #3: sequential default for drone
function setTiming(val, btn) {
  S.timing=val;
  document.querySelectorAll('#tSimul,#tSeq').forEach(b=>b.classList.remove('on'));
  document.getElementById(val==='simultaneous'?'tSimul':'tSeq').classList.add('on');
  if(btn){btn.closest('.seg').querySelectorAll('button').forEach(b=>b.classList.remove('on'));btn.classList.add('on');}
  document.getElementById('btnTest').style.display = val==='sequential' ? '' : 'none';
  stopAll();
}

function setSetting(key,val,btn) {
  S[key]=val;
  btn.closest('.seg').querySelectorAll('button').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  stopAll();
}

function onListenCentsChange() {
  const v=Math.max(2,Math.min(50,parseInt(document.getElementById('lisCentsIn').value)||16));
  S.lisCents=v; document.getElementById('lisCentsIn').value=v;
}
function onCentsChange() {
  const v=Math.max(2,Math.min(50,parseInt(document.getElementById('centsIn').value)||12));
  S.fixedCents=v; document.getElementById('centsIn').value=v;
}
function onWsCentsChange() {
  const v=Math.max(2,Math.min(50,parseInt(document.getElementById('wsCentsIn').value)||12));
  S.wsCents=v; document.getElementById('wsCentsIn').value=v;
}

// Woodshed interval selector — populated from enabled intervals
function setWsInterval(id) {
  S.wsLocked = id === '' ? null : id;
  S.wsStreak = 0;
  document.getElementById('wsStreakVal').textContent = '0';
  stopAll();
  nextQuestion();
}

function buildWsSelect() {
  const sel = document.getElementById('wsSelect');
  sel.innerHTML = '<option value="">Random</option>';
  INTERVAL_GROUPS.forEach(group => {
    const pool = enabledIntervals().filter(i => i.group === group);
    if (pool.length === 0) return;
    const og = document.createElement('optgroup');
    og.label = group;
    pool.forEach(bi => {
      const opt = document.createElement('option');
      opt.value = bi.id;
      opt.textContent = bi.interval + ' / ' + bi.drone;
      if (bi.id === S.wsLocked) opt.selected = true;
      og.appendChild(opt);
    });
    sel.appendChild(og);
  });
}

// ═══════════════════════════════════════════════════
// INTERVAL SELECTOR PANEL
// ═══════════════════════════════════════════════════
function toggleIsel() {
  const panel = document.getElementById('iselPanel');
  const arrow = document.getElementById('iselArrow');
  const open = panel.style.display !== 'none';
  panel.style.display = open ? 'none' : '';
  arrow.className = 'isel-arrow' + (open ? '' : ' open');
}

function buildIselPanel() {
  const container = document.getElementById('iselGroups');
  container.innerHTML = '';
  INTERVAL_GROUPS.forEach(group => {
    const items = INTERVALS.filter(i => i.group === group);
    const div = document.createElement('div');
    // Group header
    const hdr = document.createElement('div');
    hdr.className = 'isel-group-label';
    hdr.innerHTML = `<span>${group}</span>
      <span>
        <button onclick="iselGroup('${group}',true)">All</button>
        <button onclick="iselGroup('${group}',false)">None</button>
      </span>`;
    div.appendChild(hdr);
    // Items
    const itemsWrap = document.createElement('div');
    itemsWrap.className = 'isel-items';
    items.forEach(bi => {
      const label = document.createElement('label');
      label.className = 'isel-item' + (enabledIds.has(bi.id) ? ' on' : '');
      label.dataset.id = bi.id;
      label.innerHTML = `<input type="checkbox" ${enabledIds.has(bi.id)?'checked':''}
        onchange="iselToggle('${bi.id}',this.checked)">
        <span class="isel-item-label">${bi.interval}<br><span style="font-size:0.45rem;color:var(--muted)">${bi.drone}</span></span>`;
      itemsWrap.appendChild(label);
    });
    div.appendChild(itemsWrap);
    container.appendChild(div);
  });
  updateIselCount();
}

function updateIselCount() {
  const n = enabledIds.size;
  const total = INTERVALS.length;
  document.getElementById('iselCount').textContent = `(${n}/${total})`;
}

function iselToggle(id, checked) {
  if (checked) enabledIds.add(id);
  else enabledIds.delete(id);
  if (enabledIds.size === 0) { enabledIds.add(id); }
  // If the locked woodshed interval was just disabled, clear the lock
  if (!checked && S.wsLocked === id) { S.wsLocked = null; }
  const label = document.querySelector(`.isel-item[data-id="${id}"]`);
  if (label) label.className = 'isel-item' + (checked ? ' on' : '');
  saveEnabled();
  updateIselCount();
  buildWsSelect();
}

function iselGroup(group, enable) {
  INTERVALS.filter(i => i.group === group).forEach(i => {
    if (enable) enabledIds.add(i.id);
    else enabledIds.delete(i.id);
  });
  if (enabledIds.size === 0) enabledIds = new Set(INTERVALS.map(i => i.id));
  // Clear wsLocked if it's no longer enabled
  if (S.wsLocked && !enabledIds.has(S.wsLocked)) S.wsLocked = null;
  saveEnabled(); buildIselPanel(); buildWsSelect();
}

function iselAll() {
  enabledIds = new Set(INTERVALS.map(i => i.id));
  saveEnabled(); buildIselPanel(); buildWsSelect();
}

function iselNone() {
  enabledIds = new Set(INTERVALS.filter(i => i.group === INTERVAL_GROUPS[0]).map(i => i.id));
  if (S.wsLocked && !enabledIds.has(S.wsLocked)) S.wsLocked = null;
  saveEnabled(); buildIselPanel(); buildWsSelect();
}

function unlockAudio() {
  const c = getCtx();
  // Play a silent buffer to unlock
  const buf=c.createBuffer(1,1,22050);
  const src=c.createBufferSource();
  src.buffer=buf;
  src.connect(c.destination);
  src.start();
  document.getElementById('unlockScreen').style.display='none';
}

// ═══════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════
loadEnabled();
buildIselPanel();
buildWsSelect();
tuneInit();
document.getElementById('modeDesc').innerHTML = MODE_DESCS['listen'];
// Sequential default active (fix #3)
document.getElementById('tSeq').classList.add('on');
document.getElementById('tSimul').classList.remove('on');
nextQuestion();
