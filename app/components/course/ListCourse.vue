<template>
    <div>
        <div v-for="course in courses">
            {{course.description}}
        </div>
    </div>
</template>
 
<script>
    export default {
        name: "AeraListCourse",
        computed: {
            courses () {return this.$store.state.courses}
        },
        mounted() {
            this.$store.dispatch('loadCourses')
        }
    }
</script>