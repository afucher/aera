<template>
    <div>
        <ListCourse :courses="courses"></ListCourse>
        <NewCourse></NewCourse>
    </div>
</template>

<script>
import MyService from '../../services/CourseService';
import ListCourse from './ListCourse.vue';
import NewCourse from './NewCourse.vue';
    export default{
        data : () => {
            return {
                message: 'Seja bem-vindo',
                courses: []}
        },
        components:{ ListCourse, NewCourse },
        created : function() {
            this.service = new MyService();
            this.getCourses();
        },
        methods: {
            getCourses : function(){ 
                this.service.getCourses().then(r => {
                    this.courses = r;
                });
            },
            create : function(){
                let that = this;
                this.service.createCourse({description:"Curso 1"}).then((c) => this.courses.push(c));
            }
        }
    }   
</script>