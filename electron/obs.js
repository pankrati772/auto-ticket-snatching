const ObsClient = require("esdk-obs-nodejs");

exports = module.exports = class obs {
    constructor(){
        let obsClient = null
    }
	//创建ObsClient实例
	async initObs() {
		console.log("test,123");
		this.obsClient = new ObsClient({
			//推荐通过环境变量获取AKSK，这里也可以使用其他外部引入方式传入，如果使用硬编码可能会存在泄露风险。
			//您可以登录访问管理控制台获取访问密钥AK/SK，获取方式请参见https://support.huaweicloud.com/usermanual-ca/ca_01_0003.html
			access_key_id: "RSOS68IDIWTSG0QWAXQF",
			secret_access_key: "XKPmbzCoO5LdLzbZBcH8AcTRGQXlnhJVL5mjwcs6",
			server: "https://obs.cn-south-1.myhuaweicloud.com",
		});

		this.obsClient.listObjects(
			{
				Bucket: "psb",
			},
			(err, result) => {
				if (err) {
					console.error("Error-->" + err);
				} else {
					console.log("Status-->" + result.CommonMsg.Status);
					if (result.CommonMsg.Status < 300 && result.InterfaceResult) {
						const { Contents = [] } = result.InterfaceResult;
						for (let i = 0; i < Contents.length; i++) {
							console.log("Contents[" + i + "]:");
							console.log("Key-->" + Contents[i]["Key"]);
							console.log("LastModified-->" + Contents[i]["LastModified"]);
							console.log(
								"Size-->" + result.InterfaceResult.Contents[i]["Size"]
							);
						}
					}
				}
			}
		);
		console.log(this.obsClient, "初始化成功");

	}

	// 销毁关闭obsServer
	async closeObs() {
		this.obsServer.close();
	}
};
