import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex);

const store = new vuex.Store({
    state: {
        user: null,
        today: new Date().toISOString().split('T')[0],
        tasks: [],
        searchQuery: '',
        filter: 'pending', // 'Enum: all,completed,today'
        selectedItems: [], //For Group action
        updatingItem: null,
    },
    mutations: {
        updateUser(state, user) {
            state.user = user;
        },
        add(state, payload) {
            if (state.updatingItem) {
                const key = state.tasks.findIndex(item => item.id === state.updatingItem.id);
                state.tasks[key].title = payload.title
                state.tasks[key].date = payload.date
            } else {
                payload.status = 'pending';
                //Generate new id
                payload.id = 1;
                if (state.tasks.length !== 0) {
                    payload.id = state.tasks[state.tasks.length - 1].id + 1
                }
                state.tasks = [...state.tasks, ...[payload]]
                //Update localstorage
            }
            this.commit('updateStorage')
        },
        delete(state, payload) {
            state.tasks.find(item => item.id === payload.id).status = 'deleted'
            this.commit('updateStorage')
        },
        status(state, payload) {
            state.tasks.find(item => item.id === payload.id).status = payload.status;
            this.commit('updateStorage')
        },
        updateStorage(state) {
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        updateTasks(state, tasks) {
            state.tasks = tasks;
        }
    },
    actions: {
        addTask(state, payload) {
            state.commit('add', payload)
        },
        deleteTask(state, payload) {
            state.commit('delete', payload)
        },
        status: (state, payload) => {
            state.commit('status', payload)
        },
    }
});
export default store;
