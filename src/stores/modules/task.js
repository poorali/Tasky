export default {
    state: {
        tasks: null,
        visibleTasks:null,
        searchQuery: '',
        filter: 'all', // 'Enum: all,completed,today'
        selectedItems: [], //For Group action
        updatingItem: null,
    }
}