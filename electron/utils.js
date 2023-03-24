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
        await page.goto("https://www.jd.com");
        //获取输入框元素并在输入框内输入‘手机’
        const input = await page.$('#key');
        await input.type('手机');
        //模拟键盘“回车”键
        await page.keyboard.press('Enter');
        //等待元素加载成功
        await page.waitForSelector('#J_goodsList > ul > li:nth-child(1)');
        //获取元素innerText属性
        const firstText = await page.$eval('#J_goodsList > ul > li:nth-child(1)', el => el.innerText);
        console.log('firstText', firstText);
    }
}