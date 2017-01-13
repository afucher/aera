<template>
<div>
    <form @submit.prevent="createGroup">
        <input type="text" v-model="start_date"></input>
        <button type="submit">Nova Turma</button>
    </form>
    
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data: function(){
        return {
            start_date: '',
            end_date: '',
            start_hour: '',
            end_hour: ''
        }
    },
    methods: {
        createGroup(e) {
            e.preventDefault();
            let course = {
                start_date: this.start_date,
                end_date: this.end_date,
                start_hour: this.start_hour,
                end_hour: this.end_hour
            }
            this.$store.dispatch('createGroup', course);
        }
    }
}
</script>