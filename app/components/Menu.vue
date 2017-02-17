<template>
    <nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Aera</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <template v-if="isAuthenticated">
                <router-link :exact=true tag="li" :to="{ name: 'courses'}"><a>Cursos</a></router-link>
                <router-link :exact=true tag="li" :to="{ name: 'groups'}"><a>Turmas</a></router-link>
                <router-link :exact=true tag="li" :to="{ name: 'clients'}"><a>Clientes</a></router-link>
            </template>
            <router-link  v-if="!isAuthenticated" :exact=true tag="li" :to="{ name: 'login'}"><a>Login</a></router-link>
            
            <li v-if="isAuthenticated"><a href="#" @click.prevent="logout">Logout</a></li>
        </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
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