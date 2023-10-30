<template>
    <div class="flex flex-col items-center text-center" v-if="user">
        <div class="text-gray-700 rounded-full flex w-10 h-10 bg-white lg:text-white lg:bg-gray-800">
            <span class="m-auto">{{ user.name.split(' ').slice(0, 2).map((item) => item.split('')[0].toUpperCase()).join('') }}</span>
        </div>
        <h3 class="font-medium text-white lg:text-gray-600 text-xs mt-2">
            Register Date:
            <br/>
            <span class="font-light">{{ user.registerDate }}</span>
        </h3>
    </div>
</template>
<script>
import {mapState} from "vuex";

export default {
    name: 'Avatar', computed: {
        ...mapState(['user'])
    },

}
</script>

