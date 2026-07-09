const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const OPENAI_KEY = process.env.OPENAI_API_KEY || '';
const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const ELEVENLABS_KEY = process.env.ELEVENLABS_API_KEY || '';
const ELEVENLABS_VOICE = process.env.ELEVENLABS_VOICE_ID || 'JBFqnCBsd6RMkjVDRZzb';

const SYSTEM_PROMPT =
  'Du är Jarvis, en hjälpsam svensk AI-assistent på användarens dator. ' +
  'Svara kort, vänligt och konkret på svenska om inte användaren skriver på ett annat språk.';

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 750,
    backgroundColor: '#050a18',
    title: 'JARVIS 1.0',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

async function askOpenAI(messages) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages]
    })
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

async function askGemini(messages) {
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents
      })
    }
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

// Prioritet: OpenAI först, Gemini som fallback om OpenAI misslyckas eller saknar kvot.
ipcMain.handle('jarvis:chat', async (_event, messages) => {
  const errors = [];
  if (OPENAI_KEY) {
    try {
      return { text: await askOpenAI(messages), provider: 'openai' };
    } catch (e) {
      errors.push(e.message);
    }
  }
  if (GEMINI_KEY) {
    try {
      return { text: await askGemini(messages), provider: 'gemini' };
    } catch (e) {
      errors.push(e.message);
    }
  }
  return {
    text: 'Jag kunde inte nå någon AI-tjänst. Kontrollera API-nycklarna i .env.\n' + errors.join('\n'),
    provider: 'none',
    error: true
  };
});

ipcMain.handle('jarvis:tts', async (_event, text) => {
  if (!ELEVENLABS_KEY) return null;
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_KEY
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2'
      })
    }
  );
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  return buf.toString('base64');
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
