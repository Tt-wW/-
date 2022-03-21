import Vue from 'vue'
import VueRouter from 'vue-router'



import routes from './routes'
import store from '@/store'


Vue.use(VueRouter)
// let originPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function(location,resolve,reject){
//     if(resolve && reject){
//         originPush.call(this,location,resolve,reject) 
//     //注意，如果不改变this，那么是windows，但是我们需要指向VueRouter实例对象
//     }else{
//     originPush.call(this,()=>{},()=>{})
//     }
// }

const originalReplace = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalReplace.call(this, location).catch(err => err);
};




let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {
            y: 0
        }
    }
})


// 全局前置路由守卫，可以解决自动登录和刷新用户信息,vuex不是持久化存储，刷新页面里面的数据如果没有派发会消失
router.beforeEach(async (to, from, next) => {
    // 如果伪造token会怎么样？==》这里没有解决,如果伪造token，应该跳转到login，这里报错
    // 假如是免登录，应该在后台对token进行校验，即后台设置一个拦截器，你获取用户信息的时候，对token进行判断，是否正确，不正确就gg
    // 所以我这里自己修改了代码，即使自行更改token也没用
    // next()
    let token = store.state.user.token
    // 因为空对象是true，所以使用对象中的值进行判断
    // let name = store.state.user.userInfo.name
    let userInfo = store.state.user.userInfo
    let name = ''
    if (userInfo) {
        name = userInfo.name
    }
    // let name = store.state.user.userInfo.name
    if (token) {
        if (name) {
            next()
        } else {

            try {
                // 解决刷新页面导致vuex的数据消失的bug
                await store.dispatch('getUserInfo')
                next()
            } catch (error) {
                // 登录过期
                await store.dispatch('userLogOut').then(() => {
                    next('/login')
                })
            }
        }
    } else {
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        //未登录去上面这些路由-----登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 || toPath.indexOf('/shopcart') != -1) {
            //把未登录的时候想去去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect=' + toPath);
        } else {
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }
    }
})

export default router