import vue from 'vue'
import vuex from 'vuex'
import TaskStore from './modules/task'

vue.use(vuex);

const store = new vuex.Store({
    state: {
        name: null,
        registerDate: null
    },
    modules: {
        task: TaskStore,
    }
});
export default store;
