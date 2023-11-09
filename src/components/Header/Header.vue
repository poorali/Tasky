<template>
    <div data-testid="header" class="p-5">
        <div class="flex justify-between items-center">
            <h3 class="text-2xl text-white font-bold" data-testid="welcome-message">Welcome <template v-if="user">{{user.name.split(' ')[0]}}</template></h3>
            <div class="block lg:hidden" data-testid="avatar">
                <Avatar/>
            </div>
        </div>
        <Search/>
        <div class="flex md:hidden">
            <FilterOptions/>
        </div>

    </div>
</template>
<script>
import Search from "./Search/Search.vue";
import Avatar from "../../components/Avatar/Avatar.vue";
import {mapState} from "vuex";
import FilterOptions from "../FilterOption/FilterOption.vue";
export default {
    name: 'Header',
    components: {FilterOptions, Avatar, Search},
    computed: {
        ...mapState(['user'])
    },
}
</script>