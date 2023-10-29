<template>
  <div data-testid="nav" class="p-2 bg-gray-200 h-screen hidden lg:flex flex-col w-1/6">
      <div data-testid="avatar" class="hidden lg:block">
          <Avatar/>
      </div>
      <FilterOption/>
  </div>
</template>
<script>
import Avatar from "./Avatar/Avatar.vue";
import FilterOption from "../FilterOption/FilterOption.vue";

export default {
    name: 'Nav',
    components: {FilterOption, Avatar}
}
</script>