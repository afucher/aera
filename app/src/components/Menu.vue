<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Aera</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <template v-if="isAuthenticated">
                <router-link :exact=true tag="li" class="nav-item" :to="{ name: 'courses'}"><a class="nav-link">Cursos</a></router-link>
                <router-link :exact=true tag="li" class="nav-item" :to="{ name: 'groups'}"><a class="nav-link">Turmas</a></router-link>
                <router-link :exact=true tag="li" class="nav-item" :to="{ name: 'clients'}"><a class="nav-link">Clientes</a></router-link>
                <router-link :exact=true tag="li" class="nav-item" :to="{ name: 'payments'}"><a class="nav-link">Pagamentos</a></router-link>
            </template>
            <router-link  v-if="!isAuthenticated" :exact=true tag="li" :to="{ name: 'login'}"><a class="nav-link">Login</a></router-link>
                
            <li v-if="isAuthenticated" class="nav-item"><a href="#" @click.prevent="logout" class="nav-link">Logout</a></li>
        </ul>

    </div>
    </nav>
</template>
<script>
import Auth from '../services/AuthService.js'
export default {
    name: "Menu",
    methods: {
        logout(){
            this.$store.dispatch('logout');
            this.$router.push('/');
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    }

}
</script>