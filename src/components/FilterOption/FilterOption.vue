<template>
    <div data-testid="filter" class="flex flex-row md:flex-col mt-4 w-full items-stretch">
        <button @click="updateFilter('pending')"
                data-testid="task-filter-all"
                class="w-full pl-3 mt-1 flex items-center hover:bg-gray-300 md:border-0 border-b-2 rounded-t border-green-500 md:rounded py-2 text-left"
                v-bind:class="{'bg-green-500 lg:bg-gray-300' :this.$store.state.filter === 'pending'}">
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-red-900" height="1em"
                 viewBox="0 0 448 512">
                <path d="M384 96V224H256V96H384zm0 192V416H256V288H384zM192 224H64V96H192V224zM64 288H192V416H64V288zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/>
            </svg>
            <span class="pl-3">All</span>
            <span class="ml-auto pr-3 text-gray-700 font-medium text-sm" v-if="todayCount" data-testid="task-filter-all-count">{{allCount}}</span>
        </button>
        <button @click="updateFilter('today')"
                data-testid="task-filter-today"
                class="w-full pl-3 mt-1 flex items-center   hover:bg-gray-300 md:border-0 border-b-2 rounded-t border-green-500 md:rounded py-2 text-left"
                v-bind:class="{'bg-green-500 lg:bg-gray-300' :this.$store.state.filter === 'today'}">
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-yellow-600" height="1em"
                 viewBox="0 0 512 512">
                <path d="M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/>
            </svg>
            <span class="pl-3">Today</span>
            <span class="ml-auto pr-3 text-gray-700 font-medium text-sm" v-if="todayCount" data-testid="task-filter-today-count">{{todayCount}}</span>
        </button>
        <button @click="updateFilter('completed')"
                data-testid="task-filter-completed"
                class="w-full pl-3 mt-1 flex items-center   hover:bg-gray-300 md:border-0 border-b-2 rounded-t border-green-500 md:rounded py-2 text-left"
                v-bind:class="{'bg-green-500 lg:bg-gray-300' :this.$store.state.filter === 'completed'}">
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-green-700" height="1em"
                 viewBox="0 0 448 512">
                <path d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
            </svg>
            <span class="pl-3">Completed</span>
        </button>
    </div>
</template>
<script>
export default {
    name: 'FilterOptions',
    methods: {
        updateFilter(filter = 'pending') {
            this.$store.state.filter = filter;
        }
    },
    computed: {
        todayCount() {
            return this.$store.state.tasks.filter(item => item.date === this.$store.state.today).length
        },
        allCount() {
            return this.$store.state.tasks.filter(item => item.status === 'pending').length
        }
    }
}
</script>