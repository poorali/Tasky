<template>
    <div data-testid="search" class="mt-5 relative opacity-95 hover:opacity-100 transition">
        <svg class="absolute top-2 left-3 z-10" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path fill="#666666"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
        </svg>
        <input type="text" v-on:input="search" data-testId="search-input"
               placeholder="Search for a task..."
               class="transition bg-white pl-10 py-1 rounded w-full border-white focus:border-green-900 outline-none border-b-2"/>
    </div>
</template>
<script>
import store from "../../..//stores/store";

export default {
    name: 'Search',
    methods: {
        search(e){
            this.$store.state.searchQuery = e.target.value;
        }
    },
    store
}
</script>