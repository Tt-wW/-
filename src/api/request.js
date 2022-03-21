//对axios进行二次封装
import axios from 'axios'
import store from '@/store'


// 进度条，记得引样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
let requests = axios.create({
    baseURL:'/api',
    timeout:5000
})


// 请求拦截器
requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    NProgress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    NProgress.done()
    return res.data
},(error)=>{
    return error
})

export default requests

