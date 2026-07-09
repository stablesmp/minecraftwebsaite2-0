# JARVIS 1.0

En AI-assistent för datorn med Jarvis-inspirerat HUD-gränssnitt, röst in (tal-igenkänning)
och röst ut (ElevenLabs). Byggd med Electron.

## Funktioner
- Futuristiskt HUD: pulserande hexagon-kärna, roterande ringar, gradmarkeringar och hörnparenteser
- Chatta med AI via text eller mikrofon (svenska)
- Jarvis svarar med röst via ElevenLabs
- OpenAI (gpt-4o-mini) används först; om det misslyckas faller den automatiskt tillbaka till Google Gemini

## Kom igång
1. Installera [Node.js](https://nodejs.org) (v20+)
2. Klona repot och installera beroenden:
   ```bash
   npm install
   ```
3. Kopiera `.env.example` till `.env` och fyll i dina API-nycklar:
   - `OPENAI_API_KEY` – från https://platform.openai.com/api-keys (börjar med `sk-`)
   - `GEMINI_API_KEY` – från https://aistudio.google.com/apikey
   - `ELEVENLABS_API_KEY` – från https://elevenlabs.io
4. Starta:
   ```bash
   npm start
   ```

## Säkerhet
Lägg aldrig API-nycklar i koden eller i git — endast i `.env` (som är gitignorad).
Om en nyckel råkat delas offentligt: rotera den direkt hos leverantören.
