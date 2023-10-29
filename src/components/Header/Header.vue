<template>
    <div data-testid="header" class="p-5">
        <div class="flex justify-between items-center">
            <h3 class="text-2xl text-white font-bold" data-testid="welcome-message">Welcome <template v-if="user">{{user.name.split(' ')[0]}}</template></h3>
            <div class="block lg:hidden" data-testid="avatar">
                <Avatar/>
            </div>
        </div>
        <Search/>
    </div>
</template>
<script>
import Search from "./Search/Search.vue";
import Avatar from "../../components/Nav/Avatar/Avatar.vue";
import {mapState} from "vuex";
export default {
    name: 'Header',
    components: {Avatar, Search},
    computed: {
        ...mapState(['user'])
    },
}
</script>