import Vue from 'vue'
import Router from './bobo-router'

Vue.use(Router)

//未登录无法跳转路由
const shoudLoginRouter = ['changePassword', 'accountSafe', 'myFans', 'myFollow',
	'myInfo', 'myLevel', 'myNotice', 'myRelease', 'noticeList', 'noticeDetail', 'promote', 'proShare', 'reportUser',
	'setSignature', 'setUserName','myFavorite','sendPost',"sitting"
]
// 路由配置 页面中全部使用this.$Router来操作路由，以实现路由的全局管理
const router = new Router()

// 路由全局拦截器 在这里处理登录、授权等相关操作
router.beforeEach(function(to, from, next) {

	// if (to.page) {
	// 	const token = uni.getStorageSync('token')
	// 	let splitArr = to.page.split('/')
	// 	const routerName = splitArr[splitArr.length - 1]
	// 	token || shoudLoginRouter.map(item => {
	// 		if (routerName == item) {
	// 			next({
	// 				page: '/pages/login',
	// 			})
	// 			return
	// 		}
	// 	})
	// }
	next()

})

// 路由后置拦截器
router.afterEach(function(to, from) {
	console.log('后置守卫')
})

// 路由跳转出错处理
router.onError(function(e) {
	console.log('错误：', e.message || '路由跳转失败')
})

export default router
