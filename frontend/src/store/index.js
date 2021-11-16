import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        logged: false,
        token: null,
        isJS: null,
    },
    mutations: {
        login(state, info) {
            state.logged = true
            state.isJS = info.isJS
        },
        saveToken(state,info){
            state.token = info.token
        },
        logout(state) {

            state.logged = false
            state.token = null
            state.isJS = null
        }
    },
    plugins: [createPersistedState()],
})

