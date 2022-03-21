import {
    reqCartList,
    reqDeleteCartById,
    reqUpdateCheckedById
} from '@/api/index'

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    async getCartList({
        commit
    }) {
        //   这里采用.then试试
        await reqCartList().then(
            (result) => {
                // console.log(result);
                commit('GETCARTLIST', result.data)
            },
            () => {
                return Promise.reject(new Error('faile'))
            }
        )

    },

    async deleteCartListById({
        commit
    }, skuId) {
        await reqDeleteCartById(skuId).then(
            () => {

                return 'success'
            },
            (error) => {
                return Promise.reject(new Error(error))
            }
        )
    },

    async updateCheckedById({
        commit
    }, {
        skuId,
        isChecked
    }) {
        await reqUpdateCheckedById(skuId, isChecked).then(
            () => {
                return 'success'
            },
            (error) => {
                return Promise.reject(new Error(error))
            }
        )
    },

    deleteAllCheckedCart({
        dispatch,
        getters
    }) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListById', item.skuId) : ''
            PromiseAll.push(promise)
        })
        // 调用多次接口，所以如果全成功就成功，失败一个就失败

        return Promise.all(PromiseAll)
    },

    //修改全部产品的状态
    updateAllCartIsChecked({
        dispatch,
        state
    }, isChecked) {
        //数组
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch("updateCheckedById", {
                skuId: item.skuId,
                isChecked,
            });
            promiseAll.push(promise);
        });
        //最终返回结果
        return Promise.all(promiseAll);
    },
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },

}



export default {
    state,
    mutations,
    actions,
    getters
}