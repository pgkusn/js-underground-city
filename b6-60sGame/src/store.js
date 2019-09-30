import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        score: 0,
    },
    mutations: {
        updateScore(state, payload) {
            state.score = payload;
        }
    },
    actions: {

    }
})
