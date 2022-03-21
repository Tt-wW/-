import {reqGetSearchInfo} from '@/api';

const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,data){
        state.searchList = data
    }
}
const actions = {
  async  getSearchList({commit},params={}){
        let result = await reqGetSearchInfo(params)
        if(result.code ==200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}

const getters = {
    // 空数组防止没网的情况下返回undifined
    goodsList(state){
        return state.searchList.goodsList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
}


export default {
    state,
    mutations,
    getters,
    actions
}