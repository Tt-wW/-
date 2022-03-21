import {
    reqCategoryList,
    reqBanners,
    reqFloors
} from '@/api'


const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}


const mutations = {
    CATEGORYLIST(state, data) {
        state.categoryList = data.slice(0, 16)
    },
    GETBANNERS(state, data) {
        state.bannerList = data
    },
    GETFLOORS(state, data) {
        state.floorList = data
    },
}


const getters = {}


const actions = {
    // axios返回值是个promise
    async categoryList({
        commit
    }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },

    async getBanner({
        commit
    }) {
        let result = await reqBanners()
        if (result.code == 200) {
            commit('GETBANNERS', result.data)
        }
    },

    async getFloors({
        commit
    }) {
        let result = await reqFloors()
        if (result.code == 200) {
            commit('GETFLOORS', result.data)
        }
    }
}


export default {
    state,
    mutations,
    getters,
    actions
}