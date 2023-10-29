<template>
    <div id="app" class="flex">
        <WelcomeDialog v-if="!user"/>
        <template v-else>
            <Nav/>
            <div class="flex flex-col">
                <Header/>
                <Main/>
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
    }
}
</script>