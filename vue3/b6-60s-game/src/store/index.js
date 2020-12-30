import { createStore } from 'vuex';

export default createStore({
    state: {
        score: 0
    },
    mutations: {
        addScore (state, score) {
            state.score += score;
        },
        zeroing (state) {
            state.score = 0;
        }
    },
    actions: {
    },
    modules: {
    }
});
