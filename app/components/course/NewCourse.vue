<template>
<div>
    <CourseForm :course="course" v-on:formSubmit="createCourse"></CourseForm>
</div>
</template>

<script>
import CourseForm from './CourseForm.vue'
import { mapActions } from 'vuex'
export default {
    components:{CourseForm},
    data: function(){
        return {
            course : {}
        }
    },
    methods: {
        createCourse(course) {
            this.$store.dispatch('createCourse', course);
        }
    }
}
</script>