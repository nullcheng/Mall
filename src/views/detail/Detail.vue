<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
		<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
			
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
			<detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
			<detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
			<goods-list :goods="recommends" ref="recommend"></goods-list>
			
		</scroll>
		<detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetalSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
	import DetailParamInfo from './childComps/DetailParamInfo.vue'
	import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
	import DetailBottomBar from './childComps/DetailBottomBar.vue'
	
	import Scroll from 'components/common/scroll/Scroll.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	
	
	
	import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
	import {debounce} from 'common/utils.js'
	import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
	
	export default{
		name:'Detail',
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			GoodsList,
			Scroll,
		},
		data(){
			return{
				iid:null,
				topImages:[],
				goods:{},
				shop:{},
				detailInfo:{},
				paramInfo:{},
				commentInfo:{},
				recommends:[],
				themeTopYs:[],
				getThemeTopY:null,
				currentIndex:0,
			}
		},
		created() {
			//1,保存传入的iid
			this.iid = this.$route.params.iid
			//2，根据iid请求详情数据
			getDetail(this.iid).then(res=>{
				//1,获取顶部图片轮播
				console.log(res)
				const data = res.result
				this.topImages = data.itemInfo.topImages
				
				//2,获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				//3,创建店铺信息
				this.shop = new Shop(data.shopInfo)
				
				//4,保存商品详情数据
				this.detailInfo = data.detailInfo
				
				//5，获取商品参数信息
				this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
				
				//6,取出评论信息
				if(data.rate.cRate !== 0){
					this.commentInfo = data.rate.list[0]
				}
			})
			//3，请求推荐商品数据
			getRecommend().then(res =>{
				 // console.log(res);
				this.recommends = res.data.list
			})
			
			//给getThemeTopY赋值(对给this.themeTopYs赋值操作进行防抖)
			this.getThemeTopY = debounce(()=>{
				this.themeTopYs = []
				
				this.themeTopYs.push(0);
				this.themeTopYs.push(this.$refs.params.$el.offsetTop-50)
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop-50)
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-50)
				
				// console.log(this.themeTopYs)
			},100)
		},
		mixins:[itemListenerMixin,backTopMixin],
		mounted() {},
		updated() {},
		destroyed() {
			this.$bus.$off('itemImgeLoad', this.itemImgListener)
		},
		methods:{
			imageLoad(){
				this.$refs.scroll.refresh()
				
				this.getThemeTopY()
				
			},
			titleClick(index){
				this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
			},
			contentScroll(position){
				//1,获取y值
				const positionY = -position.y
				//2,positionY和主题中的值进行对比
				let length = this.themeTopYs.length
				for(let i=0;i<length;i++){
					if(this.currentIndex !== i && ((i<length - 1 && positionY >= this.themeTopYs[i] && 
					positionY < this.themeTopYs[i+1]) || 
					(i === length - 1 && positionY >= this.themeTopYs[i]))){
						this.currentIndex = i;
						// console.log(this.currentIndex)
						this.$refs.nav.currentIndex = this.currentIndex
					}
				}
				
				//是否显示回到顶部
				this.isShowBackTop = (-position.y) > 1000
			},
			
			addToCart(){
				//1,获取购物车需要展示的信息
				const product = {}
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.newPrice;
				product.iid = this.iid;
				//2，将商品添加到购物车
				this.$store.dispatch('addCart',product)
			}
		}
	}
</script>

<style scoped>
	#detail {
		position: relative;
		background-color: #fff;
		z-index: 9;
		height: 100vh;
	}
	.content{
		height: calc(100% - 44px);
	}
	.detail-nav{
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
</style>
