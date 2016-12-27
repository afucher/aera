<template>
<div>
    <form action="">

    </form>
    <button @click="createCourse">Novo Curso</button>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    methods: {
        createCourse() {
            this.$store.dispatch('createCourse', {description: 'Curso Novo'});
        },
        a: function (){
            console.log(this.$store);
            this.$store.dispatch('createCourse');
        }
    }
}
</script>