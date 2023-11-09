<template>
    <div data-testid="tasks-list" class="w-full max-h-96 overflow-y-auto">
        <div v-if="getList.length === 0" class="flex items-center justify-center flex-col mt-10" key="not-found">
            <img src="../../../../assets/404.svg" title="Not Found" alt="Not Found"/>
            <span class="text-white font-medium  mt-3">There is no task</span>
        </div>
        <transition-group v-else name="task-list" tag="div">
            <div v-for="(value,index) in getList" :data-testid="'task-item-' + index" :key="'task-' + index + value.id">
                <TaskItem :task="value"/>
            </div>
        </transition-group>
    </div>
</template>
<script>
export {default} from './Hooks.js'
</script>
<style>
.task-list-enter-active, .task-list-leave-active {
    transition: all 0s;
}

.task-list-enter, .task-list-leave-to {
    opacity: 0;
}
</style>