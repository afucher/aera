<template>
    <div>
        <div v-for="course in courses">
            {{course.name}} - {{course.courseLoad}}h
            <router-link :to="{ name: 'newGroup', 
                    params:{id: course.id}}">Nova Turma</router-link>
            <router-link :to="{ name: 'courseGroups', 
                    params:{id: course.id}}">Turmas</router-link>
                    
            <!--<button @click="deleteCourse(course)">X</button>-->
        </div>
        <router-view></router-view>
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
            this.$store.dispatch('loadCourses');
        },
        methods: {
            deleteCourse(course) {
                this.$store.dispatch(DELETE_COURSE, course)
            }
        }
        
    }
</script>