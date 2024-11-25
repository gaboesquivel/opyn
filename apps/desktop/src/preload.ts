import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', {
  example: () => console.log('Hello from the preload script!'),
})
