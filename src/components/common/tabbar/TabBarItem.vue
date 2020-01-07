<template>
	<div id="tab-bar-item" @click="itemClick">
		<div v-if="isActive"><slot name="item-icon-active"></slot></div>
		<div v-else><slot name="item-icon"></slot></div>
		<div :class="{active:isActive}"><slot name="item-text"></slot></div>
	</div>
</template>

<script>
	export default{
		name:'TabBarItem',
		props:{
			path:String
		},
		methods:{
			itemClick(){
				this.$router.replace(this.path)
			}
		},
		computed:{
			isActive(){
				return this.$route.path == this.path
			}
		}
	}
</script>

<style scoped>
	#tab-bar-item{
		flex: 1;
		font-size: 12px;
	}
	#tab-bar-item img{
		width: 20px;
		height: 20px;
		margin-top: 5px;
		
	}
	.active {
		color:  var(--color-tint);
	}
</style>
