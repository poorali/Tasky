<template>
    <div data-testid="header">
        <h3>Header Component</h3>
    </div>
</template>
<script>
import {mapState} from "vuex";
export default {
    name: 'Header',
    computed:{
        ...mapState({user: state => state.user})
    }
}
</script>