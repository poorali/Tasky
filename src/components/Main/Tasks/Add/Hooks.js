import {task} from "../../../../lang/validations";
import DatePicker from 'vue2-datepicker';

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
            if(mode === 'show'){
                this.$nextTick(() => {
                    this.$refs.taskTitleInput.focus();
                })
            }
            if(mode === 'hide'){
                this.resetFields();
            }
        },
        resetFields() {
            this.date = '';
            this.title = '';
            this.errors = {};
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
}