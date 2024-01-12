<!--
 * @Author: PSB
 * @Date: 2023-03-26 19:37:01
 * @LastEditors: PSB
 * @LastEditTime: 2023-08-04 14:36:28
 * @FilePath: \auto-ticket-snatching\src\views\index\index.vue
-->
<template>
	<div>
		<el-form :model="autoFrom">
			<el-form-item label="抢票网站">
				<el-input v-model="autoFrom.url" />
			</el-form-item>
			<el-form-item label="搜索关键词">
				<el-input v-model="autoFrom.keyWord" />
			</el-form-item>
			<el-form-item label="用户名">
				<el-input v-model="autoFrom.userName" />
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="autoFrom.passWord" />
			</el-form-item>
		</el-form>
		<el-button @click="goAuto">启动自动化</el-button>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const autoFrom = ref({
	url: "https://passport.damai.cn/login", // 抢票网站地址
	// url: "https://www.damai.cn/", // 抢票网站地址
	keyWord: "王嘉尔", // 抢票关键词
	userName: '17702084823',
	passWord: ''
});
function goAuto() {
	// 判断是否时壳打开 否则提示启用客户端
	// console.log((window as any).electronAPI)
	// console.log(autoFrom.value)
	// (window as any).electronAPI.autoOpen(autoFrom.value)
	(window as any).electronAPI
		? go()
		: alert("请启动客户端");
}
function go() {
	const from = JSON.stringify(autoFrom.value); // serialize the object to a string for the URL query parameter.  This is important for the browser to cache
	(window as any).electronAPI.autoOpen(from)
}
</script>

<style></style>
