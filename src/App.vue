<template>
    <div id="app" class="flex">
        <WelcomeDialog v-if="!user"/>
        <template v-else>
            <Nav/>
            <div class="flex flex-col bg-green-400 h-screen w-full lg:w-10/12">
                <Header/>
                <Main/>
                <footer class="text-center text-sm pb-3">
                    Made with <span class="text-red-600">♥</span> by <a class="font-medium" href="https://github.com/poorali">@poorali</a>
                </footer>
            </div>
        </template>
    </div>
</template>

<script>
import WelcomeDialog from "./components/WelcomeDialog/WelcomeDialog.vue";
import Nav from "./components/Nav/Nav.vue";
import Header from "./components/Header/Header.vue";
import Main from "./components/Main/Main.vue";
import {mapState} from "vuex";

export default {
    name: 'App',
    components: {Main, Header, Nav, WelcomeDialog},
    computed: {...mapState({user: state => state.user})},
    beforeMount() {
        const user = localStorage.getItem('user');
        if (user) {
            this.$store.commit('updateUser', JSON.parse(user))
        }
        //Get Tasks from local storage
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            this.$store.commit('updateTasks', JSON.parse(tasks))
        }
    }
}
</script>