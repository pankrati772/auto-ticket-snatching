<template>
	<div>
		这个是首页
		<el-button @click="goAuto">启动自动化</el-button>
	</div>
</template>

<script setup lang="ts">
function goAuto() {
	(window as any).electronAPI && (window as any).electronAPI.setTitle("132") || alert('请启动客户端')
}
</script>

<style></style>
