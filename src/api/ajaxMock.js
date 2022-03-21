
// 对请求mock接口的axios进行封装

import axios from 'axios'



let mockAjax = axios.create({
    baseURL:'/mock',
    timeout:5000
})

mockAjax.interceptors.request.use((config)=>{
   
    return config
})

mockAjax.interceptors.response.use((res)=>{
    // console.log("tw333");
    return res.data
},(error)=>{
    return error
})

export default mockAjax



