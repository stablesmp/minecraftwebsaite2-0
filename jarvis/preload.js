const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('jarvis', {
  chat: (messages) => ipcRenderer.invoke('jarvis:chat', messages),
  tts: (text) => ipcRenderer.invoke('jarvis:tts', text)
});
