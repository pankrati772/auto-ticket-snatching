const { app, BrowserWindow, ipcMain } = require('electron')
const puppeteer = require('puppeteer');
// 定义一个utils的类来存储操控的方法
exports = module.exports = class utils {

    // 更改壳标题
    async handleSetTitle(event, title) {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        console.log(title, '收到的值')
        //   A()
        win.setTitle(title)
        const browser = await puppeteer.launch({ headless: false }); // default is true
        const page = await browser.newPage();
        page.setViewport({
            width: 1920,
            height:1080
        })
        await page.goto('https://xr-test.gacmotor.com/trumpchi');
    }
}