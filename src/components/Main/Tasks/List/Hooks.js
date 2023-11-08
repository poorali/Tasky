import TaskItem from "./Item/Item.vue";
import store from "../../../../stores/store";

export default {
    name: 'TasksList',
    store: store,
    components: {TaskItem},
    computed: {
        getList() {
            //Filter tasks
            const state = new Object(this.$store.state);
            let tasks = state.tasks.filter((item) => item.status !== 'deleted');
            tasks = tasks.filter((item) => {
                if (state.searchQuery === '') {
                    return state.filter === 'today' ? item.date === state.today : item.status === state.filter;
                } else {
                    return item.title.toLowerCase().includes(state.searchQuery.toLowerCase())
                }
            });

            tasks = tasks.sort((a, b) => {
                if (a.date === null) {
                    return 1; // Move items with null dates to the end
                }
                if (b.date === null) {
                    return -1; // Move items with null dates to the end
                }
                // Sort by date in ascending order
                const dateComparison = new Date(a.date) - new Date(b.date);
                if (dateComparison !== 0) {
                    return dateComparison; // If dates are not equal, sort by date
                }
                return a.id - b.id;
            })
            return tasks;
        }
    }
}