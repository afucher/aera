<template>
    <div>
        <div v-for="course in courses">
            {{course.description}}
            <router-link :to="{ name: 'newGroup', 
                    params:{id: course.id}}">Nova Turma</router-link>
            <button @click="deleteCourse(course)">X</button>
        </div>
    </div>
</template>
 
<script>
import { DELETE_COURSE } from '../../vuex/mutation-types'
import {mapState} from 'vuex'
    export default {
        name: "AeraListCourse",
        computed: {
         ...mapState([
            'courses',
        ])},
        mounted() {
            this.$store.dispatch('loadCourses')
        },
        methods: {
            deleteCourse(course) {
                this.$store.dispatch(DELETE_COURSE, course)
            }
        }
        
    }
</script>