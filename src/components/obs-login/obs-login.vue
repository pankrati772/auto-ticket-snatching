<template>
	<div class="obs-Login">
		<div class="title">
			<h1>OBS登录</h1>
		</div>
		<div class="from">
			<el-form :model="obsLoginFrom" :label-position="'top'" :size="'large'">
				<el-form-item label="ID">
					<el-input class="input" v-model="obsLoginFrom.id" />
				</el-form-item>
				<el-form-item label="密钥">
					<el-input type="password" class="input" v-model="obsLoginFrom.key" />
				</el-form-item>
				<el-form-item label="服务器地址">
					<el-input class="input" v-model="obsLoginFrom.server" />
				</el-form-item>
			</el-form>
		</div>
		<div class="button">
			<el-button type="primary" @click="initObs">登录</el-button>
			<el-button type="primary" @click="clearForm">清空</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const obsLoginFrom = ref({
	id: "RSOS68IDIWTSG0QWAXQF", // obsid
	key: "XKPmbzCoO5LdLzbZBcH8AcTRGQXlnhJVL5mjwcs6", //
	server: "https://obs.cn-south-1.myhuaweicloud.com",
});

// 初始化obs
function initObs() {
	const from = JSON.stringify(obsLoginFrom.value);
	console.log(from);
    // const res = (window as any).electronAPI.initOBS(from)
    // console.log(res)
	(window as any).electronAPI.initOBS(from)
}

//清空表单
function clearForm() {
	obsLoginFrom.value = {
		id: "", // obsid
		key: "", //
		server: "",
	}
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";
.obs-Login {
	width: 40vw;
	height: 100%;
	.from {
		@include CenterVertically;
	}
}
.input {
	width: 500px;
}
</style>
