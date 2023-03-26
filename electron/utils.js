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
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized'],
            ignoreDefaultArgs: ['--enable-automation']
        }); // default is true
        const page = await browser.newPage();
        // page.setViewport({
        //     width: 1600,
        //     height:800
        // })
        await page.goto("https://www.damai.cn/");
        //获取输入框元素并在输入框内输入‘手机’
        const input = await page.$('.input-search');
        await input.type('薛之谦');
        //模拟键盘“回车”键
        await page.keyboard.press('Enter');
        //等待元素加载成功
        await page.waitForSelector('.search__itemlist > .item__main');
        // //获取元素innerText属性
        const firstText = await page.$eval('.search__itemlist > .item__main.>items__txt__title', el => el.innerText);
        console.log('firstText', firstText);
    }
}