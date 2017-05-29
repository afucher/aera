<template>
<div>
    <CourseForm :hasGroup="hasGroup" :course="course" v-on:formSubmit="editCourse"></CourseForm>
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
            course : {},
            hasGroup: false
        }
    },
    mounted() {
        courseSrv.getCourse(this.$route.params.id).then(c => {
            this.course = c;
        });
        courseSrv.hasGroup(this.$route.params.id).then(has => {
            this.hasGroup = has;
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