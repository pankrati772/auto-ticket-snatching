/*
 * @Author: PSB
 * @Date: 2023-03-24 16:33:53
 * @LastEditors: PSB
 * @LastEditTime: 2023-04-15 23:19:28
 * @FilePath: \auto-ticket-snatching\electron\utils.js
 */
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
        // 自动化逻辑
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
        await input.type('王嘉尔');
        //模拟键盘“回车”键
        await page.keyboard.press('Enter');
        //等待元素加载成功
        await page.waitForSelector('.search__itemlist > .item__main');
        // //获取元素innerText属性
        // const firstText = await page.$eval('.item__main');
        const firstText = await page.$eval('.search__itemlist > .item__main', el => el.innerHTML);
        const Text = await page.$$eval('div', divs => divs.map(item => item));
        console.log('firstText', firstText);
        console.log('Text', Text);
    }

    async autoTicket(event, autoFrom) {
        const from = JSON.parse(autoFrom)
        console.log(from)
        // 自动化逻辑
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
        // await page.goto("https://www.damai.cn/");
        await page.goto(from.url);
        //获取输入框元素并在输入框内输入‘手机’
        // const input = await page.$('.input-search');
        // await input.type(from.keyWord);
        // //模拟键盘“回车”键
        // await page.keyboard.press('Enter');
        // //等待元素加载成功
        // await page.waitForSelector('.search__itemlist > .item__main');
        // // //获取元素innerText属性
        // // const firstText = await page.$eval('.item__main');
        // const firstText = await page.$eval('.search__itemlist > .item__main', el => el.innerHTML);
        // const Text = await page.$$eval('div', divs => divs.map(item => item));
        // console.log('firstText', firstText);
        // console.log('Text', Text);
        
    }
}