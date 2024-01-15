/*
 * @Author: PSB
 * @Date: 2023-03-24 14:46:11
 * @LastEditors: PSB
 * @LastEditTime: 2023-04-14 16:46:03
 * @FilePath: \auto-ticket-snatching\electron\preload.js
 */
// 所有Node.js API都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	setTitle: (title) => ipcRenderer.send("set-title", title),
	autoOpen: (autoFrom) => ipcRenderer.send("auto-open", autoFrom), // auto-open the window when the app first starts up.
	initOBS: (initOBS) => ipcRenderer.send("init-obs", initOBS),
});
window.addEventListener("DOMContentLoaded", () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector);
		if (element) element.innerText = text;
	};

	for (const dependency of ["chrome", "node", "electron"]) {
		replaceText(`${dependency}-version`, process.versions[dependency]);
	}
});
