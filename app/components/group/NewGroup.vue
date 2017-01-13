<template>
<div>
    <form @submit.prevent="createGroup">
        <input type="text" v-model="course.start_date"></input>
        <button type="submit">Nova Turma</button>
    </form>
    
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data: function(){
        return {
            course : {
                start_date: '',
                end_date: '',
                start_hour: '',
                end_hour: '',
                course_id: this.$route.params.id
            }
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
            this.$store.dispatch('createGroup', this.course);
        }
    }
}
</script>