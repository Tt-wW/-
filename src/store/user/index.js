import {
    reqGetCode,
    reqUserRegister,
    reqUserLogin,
    reqUserInfo,
    reqLogOut
} from '@/api'
import {
    setToken,
    getToken,
    removeToken
} from '@/utils/user_token'




const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}

const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEARALL(state){
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}

const actions = {
    async getCode({
        commit
    }, phone) {
        await reqGetCode(phone).then(
            (result) => {
                commit('GETCODE', result.data)
            },
            (error) => {
                return Promise.reject(new Error(error))
            }
        )
    },
    async userRegister({
        commit
    }, user) {
        await reqUserRegister(user).then(
            (result) => {
                return 'ok'
            },
            (error) => {
                return Promise.reject(new Error(error))
            }
        )
    },
    async userLogin({
        commit
    }, data) {
        await reqUserLogin(data).then(
            (result) => {
                commit('USERLOGIN', result.data.token)
                // 持久化存储
                setToken(result.data.token)
                return 'success'
            },
            (error) => {
                router.push('/login')
                return Promise.reject(new Error(error))
            }
        )
    },
    async getUserInfo({
        commit
    }) {
        await reqUserInfo().then(
            (result) => {
                commit('GETUSERINFO', result.data)
                return 'success'
            },
            (error) => {
                return Promise.reject(new Error(error))
            }
        )
    },
    async userLogOut({
        commit
    }) {
        await reqLogOut().then(
            () => {
                commit('CLEARALL')
                return "success"
            },
            (error) => {
                return Promise.reject(new Error(error))
            }
        )
    }
}

const getters = {}


export default {
    state,
    mutations,
    actions,
    getters
}