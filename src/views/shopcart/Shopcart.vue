<template>
	<div class="cart">
		<!-- 导航 -->
		<nav-bar class="nav-bar">
			<div slot="center">购物车({{cartLength}})</div>
		</nav-bar>
		
		<!-- 商品列表 -->
		<cart-list></cart-list>
		
		<!-- 底部汇总 -->
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	
	import CartList from './childComps/CartList.vue'
	
	import {mapGetters} from 'vuex'
	
	export default {
		name:'Shopcart',
		components:{
			NavBar,
			CartList,
		},
		computed:{
			...mapGetters(['cartLength'])
		}
	}
</script>

<style scoped>
	.cart {
		height:100vh;
	}
	.nav-bar{
		background-color: var(--color-tint);
		color: #fff;
		font-weight: 700;
	}
</style>
