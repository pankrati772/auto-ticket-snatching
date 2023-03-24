/*
 * @Author: PSB
 * @Date: 2023-03-24 14:44:30
 * @LastEditors: PSB
 * @LastEditTime: 2023-03-24 16:51:14
 * @FilePath: \auto-ticket-snatching\electron\main.js
 */
// 控制应用生命周期和创建原生浏览器窗口的模组
// import { A } from './utils'
let utils = require('./utils')
const Utils = new utils()
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // 加载 index.html
  mainWindow.loadURL(
    app.isPackaged
      ? `file://${path.join(__dirname, '../dist/index.html')}`
      : 'http://localhost:5173/'
  );

  // 打开开发工具
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools()
  }
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  ipcMain.on('set-title', Utils.handleSetTitle)
  createWindow()

  app.on('activate', function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
