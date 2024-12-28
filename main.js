// 初始化主进程
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require("path");

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 300,
        alwaysOnTop: true, // 窗口置顶
        x: 0, 
        y: 0,
        frame: false, // 去掉默认的菜单栏
        transparent: true, // 窗口透明
        webPreferences: {
            preload: path.resolve(__dirname, 'preload.js'), // 渲染进程js
            contextIsolation: true,
            enableRemoteModule: false,
        },
    })
    // 开发模式下自动打开开发者工具
    mainWindow.webContents.toggleDevTools()
    mainWindow.loadFile(path.resolve(__dirname, './index.html'))
}


app.whenReady().then(() => {
    createWindow()
    console.log('这里是主进程')

    
})

// 兼容mac用户使用习惯
app.on("window-all-closed",()=>{
    // macOS上，除非用户按下 Cmd + Q，否则应用及其菜单栏将保持激活状态
    if(process.platform !== "darwin"){
        app.quit()
    }
})

app.on("activate",()=>{
    createWindow()
})

