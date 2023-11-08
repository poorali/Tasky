import {task} from "../../../../lang/validations";
import DatePicker from 'vue2-datepicker';
import {mapState} from "vuex";

export default {
    name: 'TasksAdd',
    components: {DatePicker},
    data() {
        return {
            showModal: false,
            title: '',
            date: '',
            errors: {},
        }
    },
    methods: {
        toggleModal(mode = 'show') {
            this.showModal = !this.showModal;
            if (mode === 'show') {
                this.$nextTick(() => {
                    this.$refs.taskTitleInput.focus();
                })
            }
            if (mode === 'hide') {
                this.resetFields();
            }
        },
        resetFields() {
            this.date = '';
            this.title = '';
            this.errors = {};
            this.$store.state.updatingItem = null;
        },
        updateTask() {
            if (this.validate()) {
                //
                const payload = {title: this.title, date: this.date}
                this.$store.dispatch('addTask', payload)
                this.toggleModal('hide');
            }
        },
        validate() {
            if (this.title.trim().length === 0) {
                this.errors = {title: task.title.required}
                return false;
            }
            this.errors = {};
            return true
        }
    },
    computed: {
        ...mapState({updatingItem: state => state.updatingItem})
    },
    watch: {
        updatingItem(value) {
            if (value) {
                this.date = value.date;
                this.title = value.title;
                this.toggleModal('show')
            }
        }
    }
}