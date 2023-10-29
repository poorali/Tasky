import vue from 'vue'
import vuex from 'vuex'
import TaskStore from './modules/task'

vue.use(vuex);

const store = new vuex.Store({
    state: {
        user: null
    },
    mutations: {
        updateUser(state, user) {
            state.user = user;
        }
    },
    modules: {
        task: TaskStore,
    }
});
export default store;
