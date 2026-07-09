const hud = document.getElementById('hud');
const status = document.getElementById('status');
const subtitle = document.getElementById('subtitle');

const history = [];

// Rita 60 gradmarkeringar runt yttre ringen
const ticks = document.getElementById('ticks');
for (let i = 0; i < 60; i++) {
  const a = (i / 60) * Math.PI * 2;
  const long = i % 5 === 0;
  const r1 = 185, r2 = long ? 205 : 196;
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', 250 + r1 * Math.cos(a));
  line.setAttribute('y1', 250 + r1 * Math.sin(a));
  line.setAttribute('x2', 250 + r2 * Math.cos(a));
  line.setAttribute('y2', 250 + r2 * Math.sin(a));
  line.setAttribute('stroke', long ? '#5fb6ff' : '#2f5dbf');
  line.setAttribute('stroke-width', long ? 2.5 : 1.5);
  ticks.appendChild(line);
}

function setStatus(t) { status.textContent = 'JARVIS 1.0 · ' + t; }
function setSubtitle(t, isError = false) {
  subtitle.textContent = t;
  subtitle.classList.toggle('error', isError);
}

let speaking = false;

async function speak(text) {
  try {
    const b64 = await window.jarvis.tts(text);
    if (!b64) return;
    speaking = true;
    hud.classList.add('talking');
    const audio = new Audio('data:audio/mpeg;base64,' + b64);
    await new Promise((resolve) => {
      audio.onended = resolve;
      audio.onerror = resolve;
      audio.play().catch(resolve);
    });
  } finally {
    speaking = false;
    hud.classList.remove('talking');
  }
}

let busy = false;

async function send(text) {
  if (!text.trim() || busy) return;
  busy = true;
  history.push({ role: 'user', content: text });
  setStatus('TÄNKER…');
  setSubtitle('Du: ' + text);
  hud.classList.add('talking');

  const res = await window.jarvis.chat(history);
  hud.classList.remove('talking');
  setStatus(res.error ? 'FEL' : 'REDO · ' + res.provider.toUpperCase());
  setSubtitle(res.text, !!res.error);
  if (!res.error) {
    history.push({ role: 'assistant', content: res.text });
    await speak(res.text);
  }
  busy = false;
  setStatus('LYSSNAR…');
}

// Jarvis lyssnar hela tiden – ingen knapp behövs.
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SR) {
  const rec = new SR();
  rec.lang = 'sv-SE';
  rec.continuous = true;
  rec.interimResults = false;

  rec.onresult = (e) => {
    // Ignorera det Jarvis själv säger och input medan han jobbar
    if (speaking || busy) return;
    const last = e.results[e.results.length - 1];
    if (last.isFinal) send(last[0].transcript);
  };
  // Starta om lyssningen automatiskt om den stannar
  rec.onend = () => { try { rec.start(); } catch { /* redan startad */ } };
  rec.onerror = (e) => {
    if (e.error === 'not-allowed') {
      setSubtitle('Mikrofonåtkomst nekad – tillåt mikrofonen för att prata med Jarvis.', true);
    }
  };

  try {
    rec.start();
    setStatus('LYSSNAR…');
    setSubtitle('Hej! Jag är Jarvis. Prata med mig så svarar jag.');
  } catch {
    setSubtitle('Kunde inte starta mikrofonen.', true);
  }
} else {
  setSubtitle('Röstinmatning stöds inte i denna miljö.', true);
}
