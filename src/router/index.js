import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import ('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Shopcart = () => import('../views/shopcart/Shopcart.vue')

Vue.use(VueRouter)

const routes = [
	{
		path:'',
		redirect: '/home'
	},
	{
		path:'/home',
		component: Home,
		meta:{
			title:'首页'
		}
	},
	{
		path:'/category',
		component: Category,
		meta:{
			title:'分类'
		}
	},
	{
		path:'/shopcart',
		component: Shopcart,
		meta:{
			title:'购物车'
		}
	},
	{
		path:'/profile',
		component: Profile,
		meta:{
			title:'我的'
		}
	}
]

const router = new VueRouter({
	routes,
	mode:'history',
})

router.beforeEach((to,from,next)=>{
	document.title = to.matched[0].meta.title
	next()
})

export default router