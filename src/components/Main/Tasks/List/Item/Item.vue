<template>
    <div class="bg-white rounded flex py-2 px-2 items-center mt-1">
        <div class="bg-white rounded-full ml-2 w-5 h-5 border-2 cursor-pointer border-gray-600 hover:border-green-600"
             @click="updateStatus"
             :class="{'bg-green-600 border-green-300': task.status === 'completed'}">
            <input type="checkbox" class="hidden" data-testId="task-item-check" value="1"
                   :checked="task.status==='completed'"/>
        </div>
        <div class="flex flex-col ml-5">
            <div data-testid="task-item-title" class="font-medium">{{ task.title }}</div>
            <div data-testid="task-item-date" v-if="task.date" class="text-sm">
                <span v-if="task.date && task.status === 'pending'">
                    <span v-if="task.date === this.$store.state.today">
                        Today
                    </span>
                    <span :class="{'text-red-500': task.date < this.$store.state.today}" v-else>
                        <span v-if="task.date < this.$store.state.today">Overdue -</span> {{ task.date }}
                    </span>
                </span>
                <span class="text-green-700" v-if="task.status === 'completed'">Completed</span>
            </div>
        </div>
        <div class="flex ml-auto mr-2">
            <button data-testid="task-item-edit" @click="() => {this.$store.state.updatingItem =  task}" class="mr-2">
                <svg class="fill-current hover:text-green-700" xmlns="http://www.w3.org/2000/svg" height="1em"
                     viewBox="0 0 512 512">
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                </svg>
            </button>
            <button data-testid="task-item-delete" @click="showModal = true;">
                <svg class="fill-current hover:text-green-700" xmlns="http://www.w3.org/2000/svg" height="1em"
                     viewBox="0 0 448 512">
                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
                </svg>
            </button>
        </div>
        <div data-testid="task-item-delete-modal" v-bind:class="{'hidden':!showModal}"
             class="fixed inset-0 flex items-center justify-center z-50 p-5">
            <div class="fixed inset-0 bg-black opacity-50"></div>
            <div class="z-10 w-96 bg-white rounded-lg shadow-lg p-4">
                <div class="text-lg font-semibold mb-4 flex justify-between items-center">
                    <h3>Confirm Delete</h3>
                    <svg data-testid="close-modal-button" @click="showModal = false" class="cursor-pointer"
                         xmlns="http://www.w3.org/2000/svg"
                         height="1em" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                </div>
                <div class="flex flex-col">
                    Are you sure deleting current item?
                </div>
                <div class="mt-4 flex justify-end">
                    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            data-testId="task-item-delete-yes" @click="deleteTask()">
                        Yes
                    </button>
                    <button data-testid="task-item-delete-no" class="px-4 py-2 bg-gray-300 rounded ml-2 hover:bg-gray-400" @click="showModal = false">
                        No
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export {default} from './Hooks'
</script>