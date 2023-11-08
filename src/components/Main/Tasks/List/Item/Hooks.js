export default {
    name: 'TaskItem',
    props: {task: Object},
    data() {
        return {
            showModal: false
        }
    },
    methods: {
        updateStatus() {
            this.$store.dispatch('status', {
                id: this.task.id,
                status: this.task.status === 'pending' ? 'completed' : 'pending'
            })
        },
        deleteTask() {
            this.$store.dispatch('deleteTask', {id: this.task.id})
            this.showModal = false;
        }
    }
}