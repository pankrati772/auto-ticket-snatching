/*
 * @Author: PSB
 * @Date: 2023-03-24 14:44:30
 * @LastEditors: PSB
 * @LastEditTime: 2023-05-25 17:15:57
 * @FilePath: \auto-ticket-snatching\electron\main.js
 */
// 控制应用生命周期和创建原生浏览器窗口的模组
let utils = require("./utils");
let obs = require("./obs.js");
const Utils = new utils();
const Obs = new obs();
const { app, BrowserWindow, ipcMain, remote } = require("electron");
const path = require("path");
function createWindow() {
	// 创建浏览器窗口
	const mainWindow = new BrowserWindow({
		width: 1600,
		height: 800,
		webPreferences: {
			devTools: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	// 打开开发工具
	if (!app.isPackaged) {
		console.log("开启工具");
		// mainWindow.webContents.openDevTools()
	}
	mainWindow.loadURL(
		app.isPackaged
			? `file://${path.join(__dirname, "../dist/index.html")}`
			: "http://localhost:5173/"
	);
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
	ipcMain.on("set-title", Utils.handleSetTitle);
	ipcMain.on("auto-open", Utils.autoTicket);
	ipcMain.on("init-obs", Obs.initObs);
	createWindow();

	app.on("activate", function () {
		// 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
		// 打开的窗口，那么程序会重新创建一个窗口。
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});
