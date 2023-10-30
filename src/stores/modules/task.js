export default {
    state: {
        tasks: [],
        visibleTasks: [],
        searchQuery: '',
        filter: 'all', // 'Enum: all,completed,today'
        selectedItems: [], //For Group action
        updatingItem: null,
    },
    mutations: {
        add(state, payload) {
            payload.status = 'pending';
            //Generate new id
            payload.id = 1;
            if (state.tasks.length !== 0) {
                payload.id = state.tasks[state.tasks.length - 1].id + 1
            }
            state.tasks = [...state.tasks, ...[payload]]
            //Update localstorage
            this.commit('updateStorage')
        },
        updateStorage(state) {
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        }
    },
    actions: {
        addTask(state, payload) {
            state.commit('add', payload)
        },
    }
}