<template>
    <form @submit.prevent="login">
        <input type="text" placeholder="username" v-model="user.username">
        <input type="password" placeholder="password" v-model="user.password">
        <button type="submit">Login</button>
    </form>
</template>

<script>
import Auth from '../../services/AuthService.js'
export default {
    name: "Login",
    data: function(){
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login(){
            this.$store.dispatch('login', this.user);
        }
    }
}
</script>