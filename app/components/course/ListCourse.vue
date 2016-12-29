<template>
    <div>
        <div v-for="course in courses">
            {{course.description}}
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