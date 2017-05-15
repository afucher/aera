<template>
<div>
    <CourseForm :course="course" v-on:formSubmit="editCourse"></CourseForm>
</div>
</template>

<script>
import CourseService from '../../services/CourseService'
import CourseForm from './CourseForm.vue'
const courseSrv = new CourseService();
import { mapActions } from 'vuex'
export default {
    components:{CourseForm},
    data: function(){
        return {
            course : {}
        }
    },
    mounted() {
        courseSrv.getCourse(this.$route.params.id).then(c => {
            this.course = c;
            //this.$store.dispatch('setClient', c);
        });
    },
    methods: {
        editCourse(course) {
            //this.$store.dispatch('createCourse', course);
        }
    }
}
</script>