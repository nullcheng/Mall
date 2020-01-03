<template>
	<div class="tab-control">
		<div v-for="(item,index) in titles" @click="itemClick(index)"
		 :class="{active: index === cur}" 
		class="tab-control-item">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name:'TabControl',
		props:{
			titles:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return{
				cur:0
			}
		},
		methods:{
			itemClick(index){
				this.cur = index;
				this.$emit('tabClick',index)
			}
		}
	}
</script>

<style>
	.tab-control{
		background-color: #fff;
		display: flex;
		text-align: center;
		font-size: 14px;
	}
	.tab-control-item {
		flex: 1;
		height: 40px;
		line-height: 40px;
	}
	.tab-control-item span {
		padding: 5px;
	}
	.active {
		color: var(--color-high-text);
	}
	.active span{
		border-bottom: 3px solid var(--color-high-text);
	}
</style>
