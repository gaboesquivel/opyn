import { BrowserWindow, app } from 'electron'

let mainWindow: BrowserWindow | null

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: `${__dirname}/preload.js`, // Preload script for secure IPC
      nodeIntegration: false, // Disable Node.js integration for security
      contextIsolation: true, // Enable context isolation
    },
  })

  // Load your Next.js app URL (local or deployed)
  mainWindow.loadURL('http://localhost:3000') // Replace with your production URL
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = new BrowserWindow({
      width: 1024,
      height: 768,
      webPreferences: {
        preload: `${__dirname}/preload.js`,
        nodeIntegration: false,
        contextIsolation: true,
      },
    })

    mainWindow.loadURL('http://localhost:3000')
  }
})
