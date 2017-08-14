<template>
<div>
    <CourseForm :course="course" v-on:formSubmit="createCourse"></CourseForm>
    <MyErrMsg :errorMessage="errorMessage"></MyErrMsg>
</div>
</template>

<script>
import CourseForm from './CourseForm.vue'
import MyErrMsg from '../util/ErrorMessage.vue'
export default {
    components:{CourseForm, MyErrMsg},
    data: function(){
        return {
            course : {},
            errorMessage: ""
        }
    },
    methods: {
        createCourse(course) {
            this.$validator.validateAll();
            if(this.errors.any()) return;
            const that = this;
            this.$store.dispatch('createCourse', this.course)
                .then((c)=>{
                    that.$router.push({name:'courses'})
                })
                .catch((err) => {
                    this.errorMessage = err;
                });
        }
    }
}
</script>