import {createStore} from 'vuex'

export default createStore({
    state: {
        isLogin: false,
        identity: ''
    },
    mutations: {
        login(state) {
            state.isLogin = true
        }
    },
    actions: {},
    modules: {}
})
