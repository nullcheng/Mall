<template>
	<div id="tab-bar">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name:'TabBar'
	}
</script>

<style scoped>
	#tab-bar{
		display: flex;
		text-align: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 49px;
		background-color: #e6e6e6;
		z-index: 1;
	}
</style>
