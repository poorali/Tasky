<template>
    <div data-testid="tasks-add" class="mt-auto">
        <button data-testId="add-task-modal-button"
                class=" flex items-center justify-center bg-green-900 opacity-90 transition-opacity hover:opacity-100 mb-3 text-white rounded py-2 w-full"
                @click="toggleModal()">
            <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
            </svg>
            <span class="ml-2">
                Add New Task
            </span>
        </button>
        <!-- Modal Code -->
        <div data-testid="add-task-modal" v-bind:class="{'hidden':!showModal}"
             class="fixed inset-0 flex items-center justify-center z-50 p-5">
            <div class="fixed inset-0 bg-black opacity-50"></div>
            <div class="z-10 w-96 bg-white rounded-lg shadow-lg p-4">
                <div class="text-lg font-semibold mb-4 flex justify-between items-center">
                    <h3>Add new task</h3>
                    <svg data-testid="close-modal-button" @click="toggleModal('hide')" class="cursor-pointer"
                         xmlns="http://www.w3.org/2000/svg"
                         height="1em" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                </div>
                <div class="flex flex-col">
                    <input type="text" id="TaskTitle" v-model="title"
                           data-testid="input-task-title" placeholder="Title"
                           ref="taskTitleInput"
                           class="border-b-2 py-2 pl-2 focus:outline-none"
                           @blur="validate()"
                           autofocus
                           v-bind:class="{'border-red-500 focus:border-red-500':errors.title,'focus:border-green-300':!errors.title}"
                    />
                    <span v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</span>

                    <date-picker data-testid="input-task-date"  v-model="date" class="w-full mt-4 py-2"
                                 :disabled-date="(date) => date < new Date().setHours(0,0,0,0)" placeholder="Due date"
                                 valueType="format">
                    </date-picker>

                </div>
                <div class="mt-4 flex justify-end">
                    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            data-testId="add-task-button" @click="updateTask()">
                        Save
                    </button>
                    <button class="px-4 py-2 bg-gray-300 rounded ml-2 hover:bg-gray-400" @click="toggleModal('hide')">
                        Cancel
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export {default} from './Hooks.js';
</script>
<style src="vue2-datepicker/index.css"></style>