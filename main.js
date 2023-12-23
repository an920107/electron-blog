const { app, BrowserWindow } = require('electron/main')
const path = require('path')

const isDev = process.env.NODE_ENV !== 'production'

const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        title: 'Electron Blog',
        width: 1280,
        height: 720
    })

    if (isDev) mainWindow.webContents.openDevTools();
        
    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))
}

// 等價於 app.on('ready', () => {})
app.whenReady().then(() => {
    createMainWindow()

    // macOS 開啟使窗時，程式可能已經在啟動狀態
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createMainWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})