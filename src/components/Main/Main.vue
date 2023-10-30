<template>
    <div data-testid="main">
        <Actions/>
        <List/>
        <Add/>
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