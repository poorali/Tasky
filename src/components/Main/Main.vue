<template>
    <div data-testid="main" class="px-5 flex flex-col h-screen">
        <Add/>
        <div class="h-full flex flex-col items-center">
            <Actions/>
            <List/>
        </div>
    </div>
</template>
<script>
import Actions from "../Main/Actions/Actions.vue";
import List from "../Main/Tasks/List/List.vue";
import Add from "../Main/Tasks/Add/Add.vue";

export default {
    name: 'Main',
    components: {Actions, List, Add}
}
</script>