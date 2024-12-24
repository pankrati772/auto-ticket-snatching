const ObsClient = require("esdk-obs-nodejs");

exports = module.exports = class obs {
	constructor() {
		let obsClient = null;
	}
	// 创建ObsClient实例
	initObs(event, data) {
		console.log(event)
		return new Promise((resolve, reject) => {
			try {
				const from = JSON.parse(data);

				this.obsClient = new ObsClient(from);

				if (this.obsClient) {
					console.log("初始化成功");
					event.reply("success");
				} else {
					console.log("初始化失败");
					event.reply("success");
				}
			} catch (error) {
				console.error("发生错误", error);
				event.reply("success");
			}
		});
	}

	// 销毁关闭obsServer
	async closeObs() {
		this.obsServer.close();
	}
};
