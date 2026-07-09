const log = document.getElementById('log');
const form = document.getElementById('form');
const input = document.getElementById('input');
const micBtn = document.getElementById('mic');
const hud = document.getElementById('hud');
const status = document.getElementById('status');

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

function addMsg(text, cls) {
  const el = document.createElement('div');
  el.className = 'msg ' + cls;
  el.textContent = text;
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
  return el;
}

function setStatus(t) { status.textContent = 'JARVIS 1.0 · ' + t; }

async function speak(text) {
  try {
    const b64 = await window.jarvis.tts(text);
    if (!b64) return;
    hud.classList.add('talking');
    const audio = new Audio('data:audio/mpeg;base64,' + b64);
    audio.onended = () => hud.classList.remove('talking');
    await audio.play();
  } catch {
    hud.classList.remove('talking');
  }
}

async function send(text) {
  if (!text.trim()) return;
  addMsg(text, 'user');
  history.push({ role: 'user', content: text });
  input.value = '';
  setStatus('TÄNKER…');
  hud.classList.add('talking');

  const res = await window.jarvis.chat(history);
  hud.classList.remove('talking');
  setStatus(res.error ? 'FEL' : 'REDO · ' + res.provider.toUpperCase());
  addMsg(res.text, 'jarvis' + (res.error ? ' error' : ''));
  if (!res.error) {
    history.push({ role: 'assistant', content: res.text });
    speak(res.text);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  send(input.value);
});

// Röstinmatning via Web Speech API
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SR) {
  const rec = new SR();
  rec.lang = 'sv-SE';
  rec.interimResults = false;
  let listening = false;

  micBtn.addEventListener('click', () => {
    if (listening) { rec.stop(); return; }
    rec.start();
  });
  rec.onstart = () => {
    listening = true;
    micBtn.classList.add('listening');
    setStatus('LYSSNAR…');
  };
  rec.onend = () => {
    listening = false;
    micBtn.classList.remove('listening');
    setStatus('REDO');
  };
  rec.onresult = (e) => send(e.results[0][0].transcript);
} else {
  micBtn.disabled = true;
  micBtn.title = 'Röstinmatning stöds inte i denna miljö';
}

addMsg('Hej! Jag är Jarvis. Skriv något eller tryck på mikrofonen så pratar vi.', 'jarvis');
