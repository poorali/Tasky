<template>
    <div data-testid="welcome-dialog"
         class="bg-green-600 h-screen w-full flex flex-col justify-center items-center text-center transition-all">
        <h1 class="text-white  text-4xl font-bold animate-bounce">TODO Tracker</h1>
        <input type="text"
               v-on:keydown.enter="save"
               v-model="name"
               placeholder="What's your name?"
               class="text-white text-2xl bg-transparent border-b-2 mt-4 focus:outline-none w-80 lg:w-1/2"/>
        <button @click="save" class="transition py-1 px-10 rounded-full bg-white mt-4" v-bind:disabled="!name"
                v-bind:class="{'opacity-50 cursor-not-allowed': !name}">
            Save
        </button>
    </div>
</template>
<script>
export default {
    name: 'WelcomeDialog',
    data() {
        return {
            name: ''
        }
    },
    methods: {
        save() {
            const user = {name: this.name, registerDate: new Date().toDateString()};
            localStorage.setItem('user', JSON.stringify(user))
            this.$store.commit('updateUser', user)
        }
    }
}
</script>