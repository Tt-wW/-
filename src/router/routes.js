export default [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/center',
        component: () => import("@/pages/Center"),
        meta: {
            show: true
        },
        name: 'center',
        children: [
            // 当 /user/:id 匹配成功，
            // UserHome 会被渲染在 User 的 <router-view> 中
            {
                path: 'myorder',
                component: () => import('@/pages/Center/myOrder')
            },
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/groupOrder')
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            },

            // ...其他子路由
        ]
    },
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            show: true
        },
        name: 'paysuccess'
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: {
            show: true
        },
        name: 'pay'
    },
    {
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: {
            show: true
        },
        name: 'trade'
    },
    {
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: {
            show: true
        },
        name: 'shopcart'
    },
    {
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: {
            show: true
        },
        name: 'addcartsuccess'
    },
    {
        path: '/detail/:skuid?',
        component: () => import('@/pages/Detail'),
        meta: {
            show: true
        }
    },
    {
        path: '/home',
        component: () => import('@/pages/Home/MyHome.vue'),
        meta: {
            show: true
        }
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: {
            show: false
        },
        name: 'login'
    },
    {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: {
            show: false
        }
    },
    {
        path: '/search/:keyWord?',
        component: () => import('@/pages/Search'),
        meta: {
            show: true
        },
        name: 'search',
        // props:true
    }
]