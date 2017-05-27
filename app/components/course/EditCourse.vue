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
        });
    },
    methods: {
        editCourse(course) {
            this.$store.dispatch('updateCourse', this.course)
                //.catch((err) => this.errorMessage = err.body.message);
        }
    }
}
</script>